'use client';

import { motion } from 'framer-motion';
import { 
  Bot, Users, Send, ShieldCheck, Zap, 
  Globe, Database, BarChart3, Code2, Headphones 
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const features = [
  {
    icon: Send,
    color: "green",
    title: "ارسال انبوه هوشمند",
    desc: "ارسال هزاران پیام در دقیقه بدون خطر مسدودی. سیستم مدیریت صف هوشمند ما تضمین می‌کند پیام‌های شما با نرخ ۱۰۰٪ به دست مشتریان می‌رسد."
  },
  {
    icon: Bot,
    color: "purple",
    title: "چت‌بات مبتنی بر هوش مصنوعی",
    desc: "پاسخگویی خودکار ۲۴ ساعته. ربات ما می‌تواند به سوالات متداول پاسخ دهد، سفارش ثبت کند و مشتریان را راهنمایی کند، حتی وقتی شما خواب هستید."
  },
  {
    icon: Users,
    color: "blue",
    title: "مدیریت پیشرفته مخاطبین (CRM)",
    desc: "دسته‌بندی مشتریان، افزودن برچسب (Tag)، یادداشت‌گذاری و مشاهده تاریخچه کامل تعاملات هر مشتری در یک نگاه."
  },
  {
    icon: ShieldCheck,
    color: "emerald",
    title: "امنیت End-to-End",
    desc: "تمام پیام‌ها و داده‌های شما با پروتکل‌های رمزنگاری پیشرفته محافظت می‌شوند. حریم خصوصی شما و مشتریانتان خط قرمز ماست."
  },
  {
    icon: BarChart3,
    color: "yellow",
    title: "گزارش‌گیری و آنالیتیکس",
    desc: "داده‌های دقیق از کمپین‌های خود دریافت کنید. نرخ باز شدن پیام‌ها، نرخ کلیک و عملکرد کلی سیستم را به صورت نموداری ببینید."
  },
  {
    icon: Code2,
    color: "pink",
    title: "API قدرتمند برای توسعه‌دهندگان",
    desc: "سرویس ما را به سایت یا اپلیکیشن خود متصل کنید. مستندات کامل API برای ارسال پیام، دریافت وب‌هوک و مدیریت اکانت."
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden font-sans">
      <Navbar />

      <main className="pt-32 pb-20 relative">
        
        {/* هدر صفحه */}
        <div className="text-center px-6 max-w-4xl mx-auto mb-20 relative z-10">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-green-400 mb-4"
          >
            POWERFUL CAPABILITIES
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
          >
            ابزارهایی برای <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500">رشد بی‌توقف کسب‌وکارتان</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            پلتفرم ما مجموعه‌ای کامل از ابزارهای بازاریابی و پشتیبانی واتساپ را در اختیار شما قرار می‌دهد تا بتوانید ارتباطی موثرتر و سریع‌تر با مشتریان خود داشته باشید.
          </motion.p>
        </div>

        {/* شبکه ویژگی‌ها */}
        <div className="px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#0a0a0a] border border-white/5 hover:border-white/10 p-8 rounded-[32px] group relative overflow-hidden transition-all duration-300"
            >
              {/* افکت هاور رنگی */}
              <div className={`absolute inset-0 bg-${feature.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 flex items-center justify-center mb-6 text-${feature.color}-400 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <feature.icon size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-7 relative z-10">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* بخش Call to Action */}
        <div className="mt-32 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/20 blur-[100px] rounded-full" />
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">آماده شروع هستید؟</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              همین حالا ثبت‌نام کنید و از تمام این امکانات به صورت رایگان (برای ۱۴ روز) استفاده کنید. بدون نیاز به کارت اعتباری.
            </p>
            
            <button className="bg-white text-black hover:bg-slate-200 font-bold px-10 py-4 rounded-xl text-lg transition-all transform hover:scale-105 relative z-10">
              شروع رایگان
            </button>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}