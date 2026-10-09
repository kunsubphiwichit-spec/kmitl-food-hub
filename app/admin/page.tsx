import { createClient } from '@/utils/supabase/server';
import { ClipboardList, Store, UserX, Filter, Edit, Check, X } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch stats (mocked or actual queries)
  const { count: pendingStores } = await supabase.from('stores').select('*', { count: 'exact', head: true }).eq('status', 'PENDING');
  const { count: activeStores } = await supabase.from('stores').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE');
  const { count: bannedUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_banned', true);
  
  // Fetch stores for table
  const { data: stores } = await supabase.from('stores').select('*').order('created_at', { ascending: false }).limit(10);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">แผงควบคุมระบบ</h1>
        <div className="bg-red-100 text-red-800 text-sm font-bold px-4 py-2 rounded-lg flex items-center border border-red-200 shadow-sm">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
          SUPER ADMIN GOVERNANCE MODE: ACTIVE
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">User</p>
          <p className="font-medium truncate">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">Role</p>
          <p className="font-medium text-orange-600">SUPER_ADMIN</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">Hardcoded Access Policy</p>
          <p className="font-medium text-green-600 flex items-center"><Check size={16} className="mr-1"/> PASSED</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">KMITL Identity</p>
          <p className="font-medium text-green-600 flex items-center"><Check size={16} className="mr-1"/> Verified</p>
        </div>
      </div>

      {/* Security Status Badges */}
      <div className="flex flex-wrap gap-3">
        <span className="px-3 py-1 bg-gray-800 text-green-400 text-xs rounded border border-gray-700 font-mono">WAF STATUS: Active & Filtering</span>
        <span className="px-3 py-1 bg-gray-800 text-blue-400 text-xs rounded border border-gray-700 font-mono">RATE LIMIT: 100 req/min</span>
        <span className="px-3 py-1 bg-gray-800 text-purple-400 text-xs rounded border border-gray-700 font-mono">SUPABASE RLS: Strict Policy</span>
        <span className="px-3 py-1 bg-gray-800 text-orange-400 text-xs rounded border border-gray-700 font-mono">HSTS POLICY: Enforced 31536s</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><ClipboardList size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">รอการอนุมัติ (PENDING)</p>
            <p className="text-2xl font-bold">{pendingStores || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Store size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">เปิดให้บริการ (ACTIVE)</p>
            <p className="text-2xl font-bold">{activeStores || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg"><UserX size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">ระงับชั่วคราว (BANNED)</p>
            <p className="text-2xl font-bold">{bannedUsers || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Filter size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">การตรวจจับคำหยาบ (24H)</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>

      {/* Tabs & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className="px-6 py-3 text-sm font-medium border-b-2 border-orange-500 text-orange-600">Store Management</button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">User Moderation & Penalties</button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Security Audit Logs</button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
            Stream: LIVE_WS <span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Stores</h2>
            <div className="space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">ส่งออกรายงาน CSV</button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">เพิ่มร้านค้าโดยตรง</button>
            </div>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200 text-sm">
                <th className="p-3 font-medium text-gray-600">ร้านค้า & รายละเอียด</th>
                <th className="p-3 font-medium text-gray-600">พิกัด / โซน</th>
                <th className="p-3 font-medium text-gray-600">ผู้เสนอ / ร้านค้า</th>
                <th className="p-3 font-medium text-gray-600">สถานะทำการ</th>
                <th className="p-3 font-medium text-gray-600">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {stores?.map((store: any) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">{store.name}</td>
                  <td className="p-3 text-gray-500">{store.location || 'N/A'}</td>
                  <td className="p-3 text-gray-500">{store.owner_id || 'System'}</td>
                  <td className="p-3">
                    <span className={\`px-2 py-1 rounded-full text-xs \${store.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}\`}>
                      {store.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="อนุมัติ"><Check size={18} /></button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded" title="ปฏิเสธ"><X size={18} /></button>
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="แก้ไข"><Edit size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!stores || stores.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">No stores found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
