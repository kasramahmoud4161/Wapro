'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/Navbar'; // فرض بر این است که نوبار دارید
import { Footer } from '@/components/Footer'; // فرض بر این است که فوتر دارید

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // اینجا می‌توانید لاجیک ارسال واقعی به API را اضافه کنید
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden font-sans selection:bg-green-500/30">
      <Navbar />

      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* پس‌زمینه نوری */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            با ما در <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">ارتباط باشید</span>
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            سوالی دارید؟ یا می‌خواهید مشاوره رایگان دریافت کنید؟ تیم پشتیبانی ما ۲۴/۷ آماده پاسخگویی به شماست.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          
          {/* ستون اطلاعات تماس */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-green-500/30 transition-colors group">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">ایمیل پشتیبانی</h3>
              <p className="text-slate-400 mb-4">برای همکاری‌های سازمانی و سوالات فنی</p>
              <a href="wtplatform9859@gmail.com" className="text-lg font-mono hover:text-green-400 transition-colors">wtplatform9859@gmail.com</a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-colors group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">تماس تلفنی</h3>
              <p className="text-slate-400 mb-4">شنبه تا چهارشنبه، ۹ صبح تا ۵ عصر</p>
              <a href="tel:+989364156320" className="text-lg font-mono hover:text-blue-400 transition-colors" dir="ltr">+989364156320</a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-colors group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">دفتر مرکزی</h3>
              <p className="text-slate-400">نیشابور، خیابان پانزده خرداد .پانزده خرداد ۴</p>
            </div>
          </motion.div>

          {/* ستون فرم ارسال پیام */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare className="text-green-500" /> ارسال پیام مستقیم
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400 mr-1">نام و نام خانوادگی</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-green-500/50 focus:outline-none transition-all placeholder:text-slate-600"
                  placeholder="مثال: علی رضایی"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 mr-1">ایمیل شما</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-green-500/50 focus:outline-none transition-all placeholder:text-slate-600"
                  placeholder="name@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 mr-1">پیام شما</label>
                <textarea 
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-green-500/50 focus:outline-none transition-all placeholder:text-slate-600 resize-none"
                  placeholder="چطور می‌توانیم کمکتان کنیم؟"
                />
              </div>

              <button 
                type="submit"
                disabled={isSent}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isSent ? 'پیام ارسال شد ✓' : <>ارسال پیام <Send size={20} /></>}
              </button>
            </form>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
}