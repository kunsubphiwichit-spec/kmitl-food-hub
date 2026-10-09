'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'กรุณากรอกชื่อ';
    if (!formData.email.trim()) newErrors.email = 'กรุณากรอกอีเมล';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    if (!formData.subject) newErrors.subject = 'กรุณาเลือกหัวข้อ';
    if (!formData.message.trim()) newErrors.message = 'กรุณากรอกข้อความ';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);

    try {
      // Mock API call to /api/contact
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setErrors({ form: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ติดต่อเรา</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            มีข้อสงสัย ข้อเสนอแนะ หรือพบปัญหาการใช้งานระบบ แจ้งให้เราทราบได้เลย
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
              <Phone className="w-6 h-6 text-orange-600 mt-1 mr-4 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">เบอร์โทรศัพท์</h3>
                <p className="text-gray-600">+66 2 329 8000</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
              <Mail className="w-6 h-6 text-orange-600 mt-1 mr-4 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">อีเมล</h3>
                <p className="text-gray-600">support@kmitlfoodhub.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
              <MapPin className="w-6 h-6 text-orange-600 mt-1 mr-4 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">ที่อยู่</h3>
                <p className="text-gray-600">
                  สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง<br />
                  1 ซอยฉลองกรุง 1 เขตลาดกระบัง กรุงเทพฯ 10520
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
              <Clock className="w-6 h-6 text-orange-600 mt-1 mr-4 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">เวลาทำการ</h3>
                <p className="text-gray-600">จันทร์ - ศุกร์: 08:30 - 16:30 น.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ส่งข้อความถึงเรา</h2>
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด
                </div>
              )}

              {errors.form && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-3" />
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ - นามสกุล</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-orange-200 focus:border-orange-500'}`}
                      placeholder="นาย ทดสอบ ระบบ"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-orange-200 focus:border-orange-500'}`}
                      placeholder="example@kmitl.ac.th"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">หัวข้อ</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.subject ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-orange-200 focus:border-orange-500'}`}
                  >
                    <option value="">เลือกหัวข้อ...</option>
                    <option value="support">สอบถามข้อมูลทั่วไป</option>
                    <option value="bug">แจ้งปัญหาการใช้งาน</option>
                    <option value="feedback">ข้อเสนอแนะ</option>
                    <option value="business">ติดต่อธุรกิจ</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ข้อความ</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-shadow ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-orange-200 focus:border-orange-500'}`}
                    placeholder="รายละเอียดที่ต้องการติดต่อ..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'กำลังส่งข้อมูล...' : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> ส่งข้อความ
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://maps.google.com/maps?q=13.7274,100.7798&z=15&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
