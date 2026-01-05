'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { GlassInput } from '@/components/ui/GlassInput';
import { Logo } from '@/components/Logos';
import api from '@/lib/axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ ساخت دیتا برای ارسال: ترکیب نام و نام خانوادگی
      const payload = {
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
      };

      // ارسال به بک‌اند
      await api.post('/auth/register', payload);
      
      // هدایت کاربر
      window.location.href = `/verify-email?email=${encodeURIComponent(formData.email)}`;
      
    } catch (error: any) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || 'ثبت نام انجام نشد.';
      alert(Array.isArray(message) ? message.join(' - ') : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303] relative overflow-hidden p-6 font-sans">
      {/* پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-green-500/10 blur-[150px] rounded-full" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Link href="/"><div className="scale-125"><Logo /></div></Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center justify-center gap-2">
            شروع کنید <Sparkles className="text-green-400 w-6 h-6 animate-pulse" />
          </h1>
          <p className="text-slate-400 text-lg">ساخت اکانت رایگان</p>
        </div>

        <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassInput icon={User} type="text" placeholder="نام" label="نام" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
              <GlassInput type="text" placeholder="نام خانوادگی" label="نام خانوادگی" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            </div>
            <GlassInput icon={Mail} type="email" placeholder="name@example.com" label="آدرس ایمیل" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <GlassInput icon={Lock} type="password" placeholder="••••••••" label="رمز عبور" required minLength={6} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
              {loading ? <><Loader2 className="animate-spin" /> در حال پردازش...</> : <>ساخت حساب <ArrowRight size={20} /></>}
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-slate-500">
             قبلاً ثبت نام کرده‌اید؟ <Link href="/login"><span className="text-white font-bold hover:text-green-400 ml-1">وارد شوید</span></Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}