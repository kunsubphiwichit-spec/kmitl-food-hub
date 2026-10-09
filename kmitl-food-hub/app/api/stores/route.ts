import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import DOMPurify from 'isomorphic-dompurify';

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'ACTIVE'; // default public view
    const limit = parseInt(searchParams.get('limit') || '20');

    // Basic rate limit check could be implemented here via Redis or DB
    
    // Check if user is admin to allow seeing non-active stores
    let allowAllStatus = false;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (profile?.role === 'ADMIN' || profile?.role === 'SUPER_ADMIN') {
        allowAllStatus = true;
      }
    }

    let query = supabase.from('stores').select('*');
    
    if (!allowAllStatus) {
      query = query.eq('status', 'ACTIVE');
    } else if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.ilike('name', \`%\${search}%\`);
    }
    
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.limit(limit);

    if (error) throw error;

    return NextResponse.json({ data }, { 
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate',
        'X-Content-Type-Options': 'nosniff',
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'ADMIN' && profile?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { name, description, lat, lng, category } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Sanitize description
    const cleanDescription = DOMPurify.sanitize(description || '');

    const { data, error } = await supabase.from('stores').insert({
      name,
      description: cleanDescription,
      lat,
      lng,
      category,
      status: 'ACTIVE',
      owner_id: user.id
    }).select().single();

    if (error) throw error;

    // Log audit
    await supabase.from('audit_logs').insert({
      admin_id: user.id,
      action: 'CREATE_STORE',
      target_id: data.id,
      details: { name }
    });

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
