'use client';

import Link from 'next/link';
import { 
  Github, Twitter, Linkedin, Instagram, 
  ArrowLeft, Heart 
} from 'lucide-react';
import { Logo } from '@/components/Logos'; // مطمئن شوید مسیر لوگو درست است

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-[#020202] pt-20 pb-10 overflow-hidden font-sans">
      
      {/* 1. افکت نوری پس‌زمینه (Glow Effect) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* بخش اصلی (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* ستون ۱: برند و توضیحات */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-800 flex items-center justify-center shadow-lg shadow-green-900/20 group-hover:scale-105 transition-transform">
                <Logo className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white group-hover:text-green-400 transition-colors">
                WaPro<span className="text-green-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              پلتفرم جامع اتوماسیون واتساپ با قدرت هوش مصنوعی. 
              ما به کسب‌وکارها کمک می‌کنیم تا فروش، پشتیبانی و تعامل با مشتریان خود را ۲۴/۷ و بدون وقفه مدیریت کنند.
            </p>
            
            {/* شبکه‌های اجتماعی */}
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-green-400 hover:border-green-500/30 transition-all group/icon"
                >
                  <Icon size={18} className="group-hover/icon:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* ستون ۲: محصول */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-bold text-white mb-6">محصول</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {['امکانات', 'تعرفه‌ها', 'چت‌بات AI', 'ارسال انبوه', 'API توسعه‌دهندگان'].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون ۳: شرکت */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-6">شرکت</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {['درباره ما', 'تماس با ما', 'وبلاگ', 'فرصت‌های شغلی', 'شرکای تجاری'].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون ۴: خبرنامه */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-white mb-6">عضویت در خبرنامه</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              از آخرین بروزرسانی‌ها، تخفیف‌های ویژه و آموزش‌های رایگان واتساپ مارکتینگ باخبر شوید.
            </p>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
              <div className="relative flex bg-black rounded-xl p-1 border border-white/10">
                <input 
                  type="email" 
                  placeholder="ایمیل شما..." 
                  className="w-full bg-transparent border-none text-white text-sm px-3 py-2 focus:outline-none placeholder:text-slate-600"
                />
                <button className="bg-white/10 hover:bg-green-500 hover:text-black text-white p-2 rounded-lg transition-colors">
                  <ArrowLeft size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* خط جداکننده */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* بخش پایینی (کپی‌رایت) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} WaPro AI. تمامی حقوق محفوظ است.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">قوانین و مقررات</Link>
            <Link href="#" className="hover:text-white transition-colors">حریم خصوصی</Link>
            <Link href="#" className="hover:text-white transition-colors">پشتیبانی</Link>
          </div>

          <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span>ساخته شده با</span>
            <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
            <span>برای پیشرفت شما</span>
          </div>
        </div>

      </div>
    </footer>
  );
};