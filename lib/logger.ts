import { supabaseAdmin } from './supabase';

export enum AuditAction {
  STORE_APPROVE = 'STORE_APPROVE',
  STORE_REJECT = 'STORE_REJECT',
  STORE_DELETE = 'STORE_DELETE',
  STORE_UPDATE = 'STORE_UPDATE',
  USER_BAN = 'USER_BAN',
  USER_UNBAN = 'USER_UNBAN',
  USER_ROLE_CHANGE = 'USER_ROLE_CHANGE',
  REVIEW_DELETE = 'REVIEW_DELETE',
  REVIEW_FLAG = 'REVIEW_FLAG',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
}

export async function logAuditAction(
  adminId: string,
  action: AuditAction,
  targetId: string,
  details: object,
  req?: Request
): Promise<void> {
  let ip = null;
  let userAgent = null;

  if (req) {
    ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    userAgent = req.headers.get('user-agent');
  }

  const { error } = await supabaseAdmin.from('audit_logs').insert({
    admin_id: adminId,
    action,
    target_id: targetId,
    details,
    ip_address: ip,
    user_agent: userAgent,
  });

  if (error) {
    console.error('Failed to insert audit log:', error);
  }
}

export function logSecurityEvent(event: string, details: object): void {
  console.error(`SECURITY EVENT: ${event}`, JSON.stringify(details));
}
