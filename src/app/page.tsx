'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Zap, Shield, Globe, Bot, 
  BarChart3, CheckCircle2, MessageSquare, 
  Users, Smartphone, Database, PlayCircle
} from 'lucide-react';
import { Footer } from '@/components/Footer';

// --- کامپوننت‌های UI کوچک برای تمیز ماندن کد ---

const SectionBadge = ({ text }: { text: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
    </span>
    {text}
  </div>
);

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors group">
    <div className="mt-1">
      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
        <Icon size={20} />
      </div>
    </div>
    <div>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-[#030303] min-h-screen text-white selection:bg-green-500/30 font-sans">
      
      {/* 1. HERO SECTION: با تمرکز بر محصول */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 border-b border-white/5 overflow-hidden">
        {/* افکت‌های پس‌زمینه */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div style={{ opacity }}>
            <SectionBadge text="نسل جدید CRM واتساپ" />
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
              ارتباطات خود را <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                اتوماتیک کنید
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              پلتفرم WaPro به شما کمک می‌کند فروش، پشتیبانی و بازاریابی خود را در واتساپ یکپارچه کنید. 
              پاسخگویی ۲۴ ساعته با هوش مصنوعی، بدون نیاز به نیروی انسانی اضافه.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/register">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2">
                  شروع رایگان <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/pricing">
                <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm">
                  <PlayCircle size={18} /> تعرفه‌ها
                </button>
              </Link>
            </div>
          </motion.div>

          {/* تصویر محصول (Dashboard Preview) */}
          <motion.div 
            style={{ y, rotateX: 5 }}
            className="relative mx-auto max-w-5xl perspective-1000"
          >
            <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden aspect-[16/9] group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-50" />
              
              {/* شبیه‌سازی هدر پنل */}
              <div className="h-12 border-b border-white/10 bg-[#111] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="ml-4 px-3 py-1 rounded bg-white/5 text-[10px] text-slate-500 font-mono">dashboard.wapro.ai</div>
              </div>

              {/* محتوای پنل (موکاپ) */}
              <div className="flex h-full">
                {/* سایدبار */}
                <div className="w-64 border-l border-white/10 bg-[#0c0c0c] p-4 space-y-2 hidden md:block">
                  <div className="h-8 bg-green-500/20 rounded-lg w-full mb-6 animate-pulse" />
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-10 bg-white/5 rounded-lg w-full" />
                  ))}
                </div>
                {/* محتوای اصلی */}
                <div className="flex-1 p-6 grid grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-6">
                    <div className="h-32 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-500/20 p-6 flex flex-col justify-between">
                       <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-black">AI</div>
                       <div className="space-y-2">
                         <div className="h-2 w-32 bg-white/20 rounded" />
                         <div className="h-2 w-20 bg-white/10 rounded" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-white/5 rounded-2xl" />
                      <div className="h-24 bg-white/5 rounded-2xl" />
                    </div>
                  </div>
                  <div className="col-span-1 bg-white/5 rounded-2xl border border-white/5" />
                </div>
              </div>
            </div>
            
            {/* انعکاس زیر تصویر */}
            <div className="absolute -bottom-20 left-4 right-4 h-24 bg-green-500 blur-[100px] opacity-20 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* 2. LOGOS: اعتبار اجتماعی */}
      <section className="py-10 border-b border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-500 font-medium mb-8">اعتماد شده توسط بیش از ۵۰۰ کسب‌وکار پیشرو</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 grayscale opacity-40 hover:opacity-100 transition-all duration-500">
            {['Snapp', 'Digikala', 'Divar', 'Bazaar', 'Torob'].map((brand) => (
              <span key={brand} className="text-xl font-bold font-mono">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION: چرا ما؟ (Bento Grid) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">همه‌چیز برای مدیریت واتساپ</h2>
            <p className="text-slate-400 text-lg">
              ما فقط یک ابزار ارسال پیام نیستیم. WaPro یک سیستم‌عامل کامل برای مدیریت ارتباط با مشتریان شماست.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* کارت بزرگ: چت‌بات */}
            <div className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <Bot className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">چت‌بات هوشمند (AI)</h3>
                  <p className="text-slate-400 max-w-md">پاسخگویی خودکار به سوالات مشتریان با استفاده از هوش مصنوعی. تعریف سناریوهای پیچیده بدون کدنویسی.</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-xs">ChatGPT-4</span>
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-xs">پاسخگویی ۲۴/۷</span>
                </div>
              </div>
            </div>

            {/* کارت کوچک: ارسال انبوه */}
            <div className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <MessageSquare className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">ارسال انبوه</h3>
                <p className="text-slate-400 text-sm">کمپین‌های تبلیغاتی با نرخ دلیوری ۹۹٪ و گزارش لحظه‌ای.</p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
            </div>

            {/* کارت کوچک: امنیت */}
            <div className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <Shield className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">ضد مسدودی</h3>
                <p className="text-slate-400 text-sm">الگوریتم‌های مدیریت صف و تاخیر هوشمند برای حفظ امنیت شماره.</p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-red-500/20 blur-3xl rounded-full" />
            </div>

            {/* کارت عریض: CRM */}
            <div className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <Users className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">مدیریت مشتریان (CRM)</h3>
                  <p className="text-slate-400 max-w-md">دسته‌بندی مشتریان، برچسب‌گذاری (Tagging) و ذخیره تاریخچه مکالمات در دیتابیس ابری.</p>
                </div>
                {/* Visual Representation */}
                <div className="hidden sm:flex flex-col gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-40 h-8 bg-white/10 rounded-lg animate-pulse" />
                  <div className="w-40 h-8 bg-white/10 rounded-lg animate-pulse delay-75" />
                  <div className="w-40 h-8 bg-white/10 rounded-lg animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATISTICS: آمار واقعی */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'پیام پردازش شده', value: '+10M' },
            { label: 'آپتایم سرور', value: '99.9%' },
            { label: 'رضایت مشتریان', value: '4.9/5' },
            { label: 'پاسخگویی هوشمند', value: '24/7' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm text-green-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DEVELOPERS: بخش فنی */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <SectionBadge text="برای توسعه‌دهندگان" />
            <h2 className="text-3xl md:text-5xl font-black mb-6">API قدرتمند و منعطف</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              سیستم خود را در کمتر از ۱۰ دقیقه به واتساپ متصل کنید. وب‌هوک‌های (Webhooks) لحظه‌ای برای دریافت پیام‌ها و API ساده برای ارسال پیام.
            </p>
            <ul className="space-y-4 mb-8">
              {['مستندات کامل (Swagger)', 'نمونه کد Node.js و Python', 'توکن‌های امنیتی JWT'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-green-500" size={20} /> {item}
                </li>
              ))}
            </ul>
            <button className="text-green-400 font-bold hover:text-green-300 transition-colors flex items-center gap-2">
              مطالعه مستندات API <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="flex-1 w-full">
            <div className="bg-[#111] rounded-2xl border border-white/10 p-6 shadow-2xl font-mono text-xs md:text-sm overflow-x-auto">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-slate-300">
                <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> axios.<span className="text-blue-400">post</span>(<span className="text-green-400">'{'/api/v1/send'}'</span>, {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-orange-400">phone</span>: <span className="text-green-400">"989123456789"</span>,
                <br />
                &nbsp;&nbsp;<span className="text-orange-400">message</span>: <span className="text-green-400">"سلام! سفارش شما ثبت شد 📦"</span>,
                <br />
                &nbsp;&nbsp;<span className="text-orange-400">priority</span>: <span className="text-blue-400">true</span>
                <br />
                {'}'});
                <br />
                <br />
                <span className="text-slate-500">// Response: 200 OK</span>
                <br />
                <span className="text-slate-500">// {'{'} id: "msg_123...", status: "sent" {'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA: فراخوان نهایی */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-green-900/20 to-black border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
              آماده شروع هستید؟
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              همین امروز ربات خود را بسازید. ۱۴ روز تست رایگان بدون نیاز به کارت اعتباری.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <button className="px-10 py-5 bg-white text-black font-black text-xl rounded-2xl hover:scale-105 transition-transform shadow-2xl">
                  ساخت حساب رایگان
                </button>
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate-500">تضمین بازگشت وجه ۳۰ روزه • لغو در هر زمان</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}