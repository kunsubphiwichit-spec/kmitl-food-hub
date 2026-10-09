import { createClient } from '@/utils/supabase/server';
import { Download } from 'lucide-react';

export default async function AuditLogsPage() {
  const supabase = createClient();
  const { data: logs } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(50);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Security Audit Logs</h1>
          <p className="text-sm text-gray-500 mt-1">PDPA Compliance: All access is logged and monitored.</p>
        </div>
        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 flex items-center">
          <Download size={16} className="mr-2" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-medium text-gray-600">Timestamp</th>
              <th className="p-4 font-medium text-gray-600">Admin ID</th>
              <th className="p-4 font-medium text-gray-600">Action</th>
              <th className="p-4 font-medium text-gray-600">Target</th>
              <th className="p-4 font-medium text-gray-600">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm font-mono text-xs">
            {logs?.map((log: any) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="p-4 text-gray-500">{new Date(log.created_at).toLocaleString()}</td>
                <td className="p-4">{log.admin_id?.substring(0,8) || 'SYSTEM'}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-100 rounded text-gray-800 font-semibold">{log.action}</span>
                </td>
                <td className="p-4">{log.target_id || '-'}</td>
                <td className="p-4 text-gray-500 truncate max-w-xs">{JSON.stringify(log.details)}</td>
              </tr>
            ))}
            {(!logs || logs.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 font-sans text-sm">No audit logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
