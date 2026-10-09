import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export const SUPER_ADMIN_EMAIL = 'kunsubphiwichit@gmail.com';

export type User = Database['public']['Tables']['users']['Row'];

export async function getCurrentUser(supabase: SupabaseClient<Database>): Promise<User | null> {
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  if (authError || !session?.user) return null;

  const { data: user, error: dbError } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (dbError || !user) return null;
  return user;
}

export async function requireAuth(supabase: SupabaseClient<Database>): Promise<User> {
  const user = await getCurrentUser(supabase);
  if (!user) throw new Error('Unauthorized: Authentication required');
  if (isUserBanned(user)) throw new Error('Unauthorized: User is banned');
  return user;
}

export async function requireAdmin(supabase: SupabaseClient<Database>): Promise<User> {
  const user = await requireAuth(supabase);
  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden: Admin access required');
  }
  return user;
}

export async function requireSuperAdmin(supabase: SupabaseClient<Database>): Promise<User> {
  const user = await requireAuth(supabase);
  if (!isSuperAdmin(user)) {
    throw new Error('Forbidden: Super Admin access required');
  }
  return user;
}

export function isSuperAdmin(user: User): boolean {
  return user.role === 'SUPER_ADMIN' || user.email === SUPER_ADMIN_EMAIL;
}

export function isUserBanned(user: User): boolean {
  if (!user.is_banned) return false;
  if (!user.ban_until) return true;
  return new Date(user.ban_until) > new Date();
}
