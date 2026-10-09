'use client';

import React, { useState } from 'react';
import { Store, Plus, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function SuggestPage() {
  const [formData, setFormData] = useState({
    storeName: '',
    category: '',
    description: '',
    location: '',
    phone: '',
    openingHours: '',
    imageUrl: '',
    userName: '',
    userEmail: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mock API call to /api/suggest
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ส่งข้อมูลสำเร็จ!</h2>
          <p className="text-gray-600 mb-6">ขอบคุณที่ร่วมแบ่งปันร้านอร่อยกับเรา</p>
          
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-8 inline-block">
            <span className="font-semibold">Status: PENDING - รอแอดมินอนุมัติ</span>
          </div>
          
          <button 
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                storeName: '', category: '', description: '', location: '', 
                phone: '', openingHours: '', imageUrl: '', userName: '', userEmail: ''
              });
            }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            เสนอร้านอื่นเพิ่มเติม
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">แนะนำร้านใหม่</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            รู้จักร้านเด็ดในสถาบัน หรือร้านเปิดใหม่? ส่งข้อมูลมาให้เราตรวจสอบและเพิ่มเข้าสู่ระบบ เพื่อแบ่งปันให้เพื่อนๆ ชาวลาดกระบังได้รู้จัก
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 sticky top-6">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" /> ขั้นตอนการพิจารณา
              </h3>
              <ol className="space-y-4 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  <span>คุณส่งข้อมูลร้านที่ต้องการแนะนำ</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  <span>แอดมินตรวจสอบความถูกต้องและพิกัดของร้าน</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  <span>ร้านจะถูกเพิ่มเข้าระบบและแสดงในหน้าค้นหา</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-4 mb-6">ข้อมูลร้าน</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อร้าน <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.storeName}
                    onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                    placeholder="เช่น ข้าวมันไก่วิศวะ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่ <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-white"
                  >
                    <option value="">เลือกหมวดหมู่...</option>
                    <option value="food">อาหาร (Food)</option>
                    <option value="drink">เครื่องดื่ม (Drink/Cafe)</option>
                    <option value="transport">การเดินทาง (Transport)</option>
                    <option value="other">อื่นๆ (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">โซน/พิกัด <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                    placeholder="เช่น โรงอาหารวิศวะ, ซอยเกกี"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">คำอธิบายร้านสั้นๆ</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                    placeholder="จุดเด่นของร้าน เมนูแนะนำ..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์ติดต่อ (ถ้ามี)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เวลาเปิด-ปิด (ถ้าทราบ)</label>
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => setFormData({...formData, openingHours: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                    placeholder="เช่น 08:00 - 17:00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL รูปภาพร้าน (ทางเลือก)</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold border-b pb-4 pt-6 mb-6">ข้อมูลผู้แนะนำ (ทางเลือก)</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อของคุณ</label>
                  <input
                    type="text"
                    value={formData.userName}
                    onChange={(e) => setFormData({...formData, userName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                  <input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:bg-gray-400"
                >
                  {isSubmitting ? 'กำลังส่งข้อมูล...' : (
                    <>
                      <Plus className="w-5 h-5 mr-2" /> ส่งข้อมูลแนะนำร้าน
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
