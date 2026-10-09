import { createClient } from '@/utils/supabase/server';
import { Ban, Unlock, ShieldAlert } from 'lucide-react';

export default async function UsersPage() {
  const supabase = createClient();
  const { data: users } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between">
          <input type="text" placeholder="Search users by email..." className="border border-gray-300 rounded-md text-sm p-2 flex-1 max-w-sm" />
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-medium text-gray-600">User ID</th>
              <th className="p-4 font-medium text-gray-600">Email</th>
              <th className="p-4 font-medium text-gray-600">Role</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600">Ban Until</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {users?.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4 text-gray-500 font-mono text-xs">{user.id.substring(0,8)}</td>
                <td className="p-4 font-medium">{user.email || 'N/A'}</td>
                <td className="p-4">
                  <select defaultValue={user.role} className="border-gray-300 rounded text-xs p-1">
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  </select>
                </td>
                <td className="p-4">
                  <span className={\`px-2 py-1 rounded-full text-xs \${user.is_banned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}\`}>
                    {user.is_banned ? 'BANNED' : 'ACTIVE'}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{user.ban_until ? new Date(user.ban_until).toLocaleDateString() : '-'}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    {user.is_banned ? (
                      <button className="flex items-center text-green-600 hover:text-green-800 text-xs font-medium"><Unlock size={14} className="mr-1"/> Unban</button>
                    ) : (
                      <button className="flex items-center text-red-600 hover:text-red-800 text-xs font-medium"><Ban size={14} className="mr-1"/> Ban</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
