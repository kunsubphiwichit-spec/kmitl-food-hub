import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { LayoutDashboard, Store, Bus, Shield, LogOut } from 'lucide-react';
import { ReactNode } from 'react';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Assuming super admin is checked via role in user metadata or a specific table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'SUPER_ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-orange-500">KMITL Food Hub</h1>
          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full mt-2 inline-block">CONSOLE V2.4</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 text-orange-500 bg-gray-800 transition-colors">
            <LayoutDashboard size={20} />
            <span>แดชบอร์ด</span>
          </Link>
          <Link href="/admin/stores" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Store size={20} />
            <span>จัดการร้านอาหาร</span>
          </Link>
          <Link href="/admin/ev" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Bus size={20} />
            <span>จัดการรถรับส่ง EV</span>
          </Link>
          <Link href="/admin/audit-logs" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Shield size={20} />
            <span>ตรวจสอบสิทธิ์ & PDPA</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-400 mb-4 space-y-1">
            <p>Environment: Production-TH</p>
            <p className="flex items-center"><Shield size={12} className="mr-1"/> ISO/IEC 27001</p>
          </div>
          <Link href="/" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
            <LogOut size={16} />
            <span>กลับหน้าหลัก</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center space-x-4">
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">SUPER ADMIN</span>
            <span className="text-sm font-medium">{user.email}</span>
            <span className="flex items-center text-xs text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Zero Trust Active
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Session: {user.id.substring(0, 8)}...
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
