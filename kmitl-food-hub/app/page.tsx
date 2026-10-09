import Image from "next/image";
import Link from "next/link";
import { Store, Bus, Users, Shield, Search, ChevronDown, MapPin, CheckCircle } from "lucide-react";
import StoreCard from "@/components/StoreCard";

const MOCK_STORES = [
  {
    id: "1",
    name: "ร้านป้าแจ๋ว อาหารตามสั่ง",
    description: "อาหารตามสั่งรสเด็ด ขวัญใจเด็กวิศวะ",
    category: "อาหารตามสั่ง",
    rating: 4.8,
    reviews: 128,
    priceRange: "฿40-60",
    location: "โรงอาหารพระเทพ",
    status: "ACTIVE" as const,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "2",
    name: "ข้าวมันไก่เฮียชัย",
    description: "ข้าวมันไก่ตอนเนื้อนุ่ม น้ำจิ้มรสเด็ด",
    category: "ข้าวมันไก่",
    rating: 4.5,
    reviews: 96,
    priceRange: "฿45-55",
    location: "โรงอาหาร C",
    status: "ACTIVE" as const,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "3",
    name: "ก๋วยเตี๋ยวเรือลุงป้อม",
    description: "ก๋วยเตี๋ยวเรืออยุธยาแท้ น้ำตกเข้มข้น",
    category: "ก๋วยเตี๋ยว",
    rating: 4.9,
    reviews: 215,
    priceRange: "฿20-50",
    location: "โรงอาหารพระเทพ",
    status: "CLOSED" as const,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "4",
    name: "Coffee & Space",
    description: "คาเฟ่บรรยากาศดี มีที่นั่งทำงาน",
    category: "เครื่องดื่ม",
    rating: 4.7,
    reviews: 154,
    priceRange: "฿50-100",
    location: "ตึกเรียนรวม 1",
    status: "ACTIVE" as const,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=60"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 flex flex-col items-center justify-center text-center px-4 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-80 z-0"></div>
        <div className="z-10 max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            ศูนย์รวมข้อมูลร้านอาหาร & เครือข่ายรถรับส่ง <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8490B] to-orange-400">อัฉริยะ สจล.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
            ค้นหาร้านอาหารที่ถูกใจและเช็คเส้นทางรถ EV ในสถาบันได้ง่ายๆ พร้อมระบบรีวิวที่เชื่อถือได้
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button className="px-8 py-3 rounded-full bg-[#C8490B] text-white font-medium hover:bg-orange-700 transition shadow-lg flex items-center gap-2">
              <Store size={20} />
              ดูร้านอาหาร
            </button>
            <button className="px-8 py-3 rounded-full bg-white text-[#C8490B] border-2 border-[#C8490B] font-medium hover:bg-orange-50 transition shadow-sm flex items-center gap-2">
              <Bus size={20} />
              เส้นทาง EV
            </button>
          </div>

          <div className="w-full max-w-2xl bg-white p-2 rounded-full shadow-md flex items-center border border-gray-200">
            <div className="flex items-center px-4 text-gray-500 border-r border-gray-200 gap-2 cursor-pointer">
              <span>หมวดหมู่</span>
              <ChevronDown size={16} />
            </div>
            <input 
              type="text" 
              placeholder="ค้นหาร้านอาหาร หรือ สายรถ EV..." 
              className="flex-grow px-4 py-2 outline-none bg-transparent"
            />
            <button className="p-3 rounded-full bg-[#C8490B] text-white hover:bg-orange-700 transition">
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-orange-50 rounded-full text-[#C8490B] mb-4">
              <Store size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">124</h3>
            <p className="text-gray-500 font-medium">ร้านอาหาร</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-orange-50 rounded-full text-[#C8490B] mb-4">
              <Bus size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">6</h3>
            <p className="text-gray-500 font-medium">สายรถ EV</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-orange-50 rounded-full text-[#C8490B] mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">4890+</h3>
            <p className="text-gray-500 font-medium">นักศึกษา</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-orange-50 rounded-full text-[#C8490B] mb-4">
              <Shield size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">99.98%</h3>
            <p className="text-gray-500 font-medium">Uptime</p>
          </div>
        </div>
      </section>

      {/* Popular Stores Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">ร้านอาหารยอดนิยมประจำสัปดาห์</h2>
              <p className="text-gray-600">คัดสรรร้านเด็ดรีวิวดีโดยนักศึกษา สจล.</p>
            </div>
            <Link href="/stores" className="text-[#C8490B] font-medium hover:underline hidden sm:block">
              ดูทั้งหมด
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_STORES.map((store) => (
              <StoreCard key={store.id} {...store} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/stores" className="text-[#C8490B] font-medium hover:underline">
              ดูทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      {/* EV Transport Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">เส้นทางรถ EV สจล.</h2>
          <p className="text-gray-600 text-center mb-10">เช็คเส้นทางและป้ายจอดรถไฟฟ้าภายในสถาบัน</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((route) => (
              <div key={route} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-[#C8490B] font-bold text-xl">
                    {route}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">สายที่ {route}</h3>
                    <p className="text-sm text-gray-500">สถานีรถไฟพระจอมเกล้า - หอพัก</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 relative pl-4 border-l-2 border-gray-200 ml-6">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#C8490B]"></div>
                    <p className="text-sm">สถานีรถไฟ</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300"></div>
                    <p className="text-sm">คณะวิศวกรรมศาสตร์</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300"></div>
                    <p className="text-sm">หอพักนักศึกษา</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
            <p className="text-gray-400">ระบบรักษาความปลอดภัยระดับองค์กร เพื่อความมั่นใจของทุกคน</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <Shield className="text-[#C8490B] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Zero Trust Auth</h3>
              <p className="text-gray-400 text-sm">ตรวจสอบสิทธิ์ทุกครั้งที่มีการเข้าถึงข้อมูล ไม่มีการไว้ใจอุปกรณ์หรือเครือข่ายใดๆ เป็นพิเศษ</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <CheckCircle className="text-[#C8490B] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Profanity Filter</h3>
              <p className="text-gray-400 text-sm">ระบบคัดกรองคำหยาบคายและเนื้อหาไม่เหมาะสมอัตโนมัติ เพื่อรักษาสภาพแวดล้อมที่ดีในชุมชน</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <Users className="text-[#C8490B] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Super Admin Oversight</h3>
              <p className="text-gray-400 text-sm">ระบบควบคุมดูแลโดยแอดมินระดับสูง เพื่อจัดการข้อมูลและระงับบัญชีที่มีพฤติกรรมไม่เหมาะสม</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#C8490B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">พบร้านอาหารดีๆ ให้เราช่วยรีวิวได้เลย</h2>
          <p className="text-orange-100 mb-10 text-lg">ร่วมเป็นส่วนหนึ่งในการสร้างฐานข้อมูลร้านอาหารที่ดีที่สุดของสถาบัน</p>
          <button className="px-8 py-4 rounded-full bg-white text-[#C8490B] font-bold text-lg hover:bg-gray-50 transition shadow-xl">
            เพิ่มร้านอาหารใหม่
          </button>
        </div>
      </section>
    </div>
  );
}
