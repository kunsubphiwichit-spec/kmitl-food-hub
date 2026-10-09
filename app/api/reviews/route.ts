import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import DOMPurify from 'isomorphic-dompurify';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('is_banned').eq('id', user.id).single();
    if (profile?.is_banned) {
      return NextResponse.json({ error: 'Account is banned' }, { status: 403 });
    }

    const { store_id, rating, comment } = await req.json();

    if (!store_id || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Server-side profanity check mock
    const profanityList = ['badword1', 'badword2'];
    const hasProfanity = profanityList.some(word => comment?.toLowerCase().includes(word));
    
    if (hasProfanity) {
      // Log profanity attempt
      await supabase.from('audit_logs').insert({
        admin_id: 'SYSTEM',
        action: 'PROFANITY_BLOCKED',
        target_id: user.id,
        details: { comment_attempt: comment }
      });
      return NextResponse.json({ error: 'Content violates community guidelines' }, { status: 400 });
    }

    const sanitizedComment = DOMPurify.sanitize(comment || '');

    const { data, error } = await supabase.from('reviews').insert({
      store_id,
      user_id: user.id,
      rating,
      comment: sanitizedComment
    }).select().single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const store_id = searchParams.get('store_id');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!store_id) return NextResponse.json({ error: 'store_id required' }, { status: 400 });

  const { data, error } = await supabase.from('reviews')
    .select('*, profiles(email, full_name)')
    .eq('store_id', store_id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}
