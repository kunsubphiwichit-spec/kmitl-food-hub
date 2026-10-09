import Link from "next/link";
import { Shield, Github, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex flex-col mb-4 inline-block">
            <p className="font-bold text-white text-2xl flex items-center gap-1">
              KMITL <span className="text-[#C8490B]">HUB</span>
            </p>
            <p className="text-xs font-semibold text-gray-400 tracking-wider">FOOD & TRANSPORT</p>
          </Link>
          <p className="text-sm text-gray-400 mb-6 line-clamp-3">
            แพลตฟอร์มศูนย์รวมข้อมูลร้านอาหารและเครือข่ายรถรับส่งภายในสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><Github size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><Mail size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">บริการ</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/stores" className="hover:text-[#C8490B] transition">ค้นหาร้านอาหาร</Link></li>
            <li><Link href="/transport" className="hover:text-[#C8490B] transition">เส้นทางรถ EV</Link></li>
            <li><Link href="/suggest" className="hover:text-[#C8490B] transition">แนะนำร้านใหม่</Link></li>
            <li><Link href="/reviews" className="hover:text-[#C8490B] transition">รีวิวล่าสุด</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">นักพัฒนา & ระบบ</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/api-docs" className="hover:text-[#C8490B] transition">API Documentation</Link></li>
            <li><Link href="/security" className="hover:text-[#C8490B] transition">Campus Security Protocols</Link></li>
            <li><Link href="/telemetry" className="hover:text-[#C8490B] transition">System Telemetry</Link></li>
            <li><Link href="/status" className="hover:text-[#C8490B] transition">System Status</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">ความปลอดภัย</h4>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-2 text-green-400">
              <Shield size={18} />
              <span className="font-semibold text-sm">OWASP Top 10 Compliant</span>
            </div>
            <p className="text-xs text-gray-400">
              ระบบได้รับการตรวจสอบและป้องกันตามมาตรฐานความปลอดภัยระดับสากล
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} KMITL Food & Transport Hub Enterprise Edition. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
