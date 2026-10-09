import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { days, reason } = body;

    let ban_until = null;
    if (days !== 'permanent') {
      const date = new Date();
      date.setDate(date.getDate() + (parseInt(days) || 7));
      ban_until = date.toISOString();
    } else {
      // Permanent ban represented by far future date or specific flag
      const date = new Date();
      date.setFullYear(date.getFullYear() + 100);
      ban_until = date.toISOString();
    }

    const { data, error } = await supabase.from('profiles')
      .update({ is_banned: true, ban_until })
      .eq('id', params.id)
      .select().single();

    if (error) throw error;

    await supabase.from('audit_logs').insert({
      admin_id: user.id,
      action: 'BAN_USER',
      target_id: params.id,
      details: { days, reason }
    });

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
