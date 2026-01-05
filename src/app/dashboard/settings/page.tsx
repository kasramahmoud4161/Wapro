'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Zap, Save, Key, Crown } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { GlassInput } from '@/components/ui/GlassInput'; // مطمئن شوید مسیر درست است
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });

  // پر کردن فرم با اطلاعات کاربر
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email || ''
      }));
    }
  }, [user]);

  return (
    <>
      <Header title="تنظیمات حساب" />
      
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
        
        {/* کارت پروفایل */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ستون چپ: اطلاعات پایه */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
              <User className="text-green-500" />
              <h3 className="text-lg font-bold text-white">مشخصات فردی</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-slate-400">نام کامل</label>
                <div className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white">
                  {formData.name || '---'}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400">ایمیل</label>
                <div className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white opacity-70 cursor-not-allowed flex items-center justify-between">
                  {formData.email}
                  <Shield size={14} className="text-green-500" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Key size={16} className="text-blue-400" /> تغییر رمز عبور
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlassInput 
                  placeholder="رمز عبور فعلی" 
                  type="password" 
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                />
                <GlassInput 
                  placeholder="رمز عبور جدید" 
                  type="password" 
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
              </div>
              <button className="mt-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                <Save size={16} /> ذخیره تغییرات
              </button>
            </div>
          </motion.div>

          {/* ستون راست: پلن و وضعیت */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <Crown size={32} className="text-green-400" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">پلن حرفه‌ای</h3>
            <p className="text-slate-400 text-xs mb-6">اعتبار تا ۲۹ اسفند ۱۴۰۴</p>

            <div className="w-full space-y-4 mb-8">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">پیام‌های ارسال شده</span>
                <span className="text-white font-mono">12,450 / 50,000</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[25%] bg-green-500 rounded-full" />
              </div>
            </div>

            <button className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <Zap size={16} /> ارتقاء پلن
            </button>
          </motion.div>

        </div>
      </div>
    </>
  );
}