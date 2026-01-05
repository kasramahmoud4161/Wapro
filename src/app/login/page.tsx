'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { GlassInput } from '@/components/ui/GlassInput';
import { Logo } from '@/components/Logos';
import api from '@/lib/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.access_token;

      // ۱. ذخیره در LocalStorage برای استفاده در Axios (درخواست‌های API)
      localStorage.setItem('token', token);

      // ۲. ذخیره در Cookie برای استفاده در Middleware (محافظت از صفحات)
      // این کوکی برای ۷ روز تنظیم می‌شود
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      // هدایت به داشبورد
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Login Error:', error);
      alert('ایمیل یا رمز عبور اشتباه است.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303] relative overflow-hidden p-6 font-sans">
      
      {/* پس‌زمینه متحرک */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <div className="scale-125"><Logo /></div>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">خوش آمدید</h1>
          <p className="text-slate-400">وارد حساب کاربری خود شوید</p>
        </div>

        <div className="bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* نوار رنگی بالای کارت */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />

          <form onSubmit={handleLogin} className="space-y-6">
            <GlassInput 
              icon={Mail} 
              type="email" 
              placeholder="name@company.com" 
              label="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <div className="space-y-2">
              <GlassInput 
                icon={Lock} 
                type="password" 
                placeholder="••••••••" 
                label="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end">
                <Link href="/forgot-password">
                  <span className="text-xs text-slate-500 hover:text-green-400 transition-colors cursor-pointer">
                    رمز عبور را فراموش کردید؟
                  </span>
                </Link>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full group relative bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-green-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <>ورود به پنل <ArrowRight size={18} /></>}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            حساب کاربری ندارید؟{' '}
            <Link href="/register">
              <span className="text-green-400 font-bold hover:underline cursor-pointer">ثبت نام کنید</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}