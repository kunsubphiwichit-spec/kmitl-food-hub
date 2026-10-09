import { createClient } from '@/utils/supabase/server';
import { Edit, Trash, Check, X } from 'lucide-react';

export default async function StoresPage() {
  const supabase = createClient();
  const { data: stores } = await supabase.from('stores').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">จัดการร้านอาหาร</h1>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">Add New Store</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex space-x-2">
          <select className="border border-gray-300 rounded-md text-sm p-2">
            <option value="">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PENDING">PENDING</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
          <input type="text" placeholder="Search stores..." className="border border-gray-300 rounded-md text-sm p-2 flex-1 max-w-sm" />
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-medium text-gray-600">ID</th>
              <th className="p-4 font-medium text-gray-600">Name</th>
              <th className="p-4 font-medium text-gray-600">Category</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {stores?.map((store: any) => (
              <tr key={store.id} className="hover:bg-gray-50">
                <td className="p-4 text-gray-500 font-mono text-xs">{store.id.substring(0,8)}</td>
                <td className="p-4 font-medium">{store.name}</td>
                <td className="p-4 text-gray-500">{store.category || 'N/A'}</td>
                <td className="p-4">
                  <span className={\`px-2 py-1 rounded-full text-xs \${store.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}\`}>
                    {store.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-800" title="Approve"><Check size={18} /></button>
                    <button className="text-yellow-600 hover:text-yellow-800" title="Reject"><X size={18} /></button>
                    <button className="text-blue-600 hover:text-blue-800" title="Edit"><Edit size={18} /></button>
                    <button className="text-red-600 hover:text-red-800" title="Delete"><Trash size={18} /></button>
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
