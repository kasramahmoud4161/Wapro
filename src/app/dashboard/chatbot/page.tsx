'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Save, Power, Sparkles, MessageSquare, RefreshCcw } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';

export default function ChatbotPage() {
  const [isBotActive, setIsBotActive] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState(
    "تو یک دستیار هوشمند فروش هستی. نام تو 'سارا' است. با مشتریان مودبانه صحبت کن و محصولات ما را معرفی کن. اگر قیمت خواستند، به لیست قیمت ارجاع بده."
  );

  return (
    <>
      <Header title="پیکربندی هوش مصنوعی" />
      
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ستون تنظیمات (چپ) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          
          {/* کارت وضعیت */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex items-center justify-between relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${isBotActive ? 'from-green-500/10' : 'from-red-500/10'} to-transparent transition-colors duration-500`} />
            
            <div className="relative z-10 flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isBotActive ? 'bg-green-500 text-black' : 'bg-white/10 text-slate-400'}`}>
                <Bot size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">وضعیت ربات پاسخگو</h3>
                <p className="text-slate-400 text-sm mt-1">
                  {isBotActive ? 'ربات فعال است و به پیام‌ها پاسخ می‌دهد.' : 'ربات غیرفعال است (خاموش).'}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsBotActive(!isBotActive)}
              className={`relative z-10 w-16 h-8 rounded-full p-1 transition-colors duration-300 ${isBotActive ? 'bg-green-600' : 'bg-white/10'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${isBotActive ? 'translate-x-0' : '-translate-x-8'}`} />
            </button>
          </div>

          {/* ویرایشگر پرامپت (مغز ربات) */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col h-[500px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-purple-500" /> دستورالعمل سیستم (System Prompt)
              </h3>
              <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">GPT-4 Turbo</span>
            </div>
            
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              در اینجا شخصیت، لحن و دانش ربات را تعریف کنید. هرچه دقیق‌تر بنویسید، پاسخ‌ها بهتر خواهند بود.
            </p>

            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="flex-1 bg-[#050505] border border-white/10 rounded-xl p-4 text-sm text-slate-200 leading-7 focus:border-purple-500/50 focus:outline-none transition-colors resize-none font-mono"
            />

            <div className="flex justify-end mt-4">
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-900/20 transition-all">
                <Save size={18} /> ذخیره تغییرات
              </button>
            </div>
          </div>
        </motion.div>

        {/* ستون تست (راست) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col h-full"
        >
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-400" /> تست زنده
            </h3>
            <button className="text-slate-500 hover:text-white p-1 rounded hover:bg-white/10">
              <RefreshCcw size={14} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {/* پیام کاربر */}
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                سلام، قیمت پکیج طلایی چنده؟
              </div>
            </div>
            
            {/* پاسخ ربات */}
            <div className="flex justify-start items-end gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white">AI</div>
              <div className="bg-white/10 text-slate-200 px-4 py-2 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                سلام دوست عزیز! 👋 پکیج طلایی ما شامل تمام امکانات پیشرفته است و قیمت آن ماهانه ۹۹۰ هزار تومان می‌باشد. آیا مایلید امکانات کامل آن را برایتان بفرستم؟
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <input 
              type="text" 
              placeholder="پیام خود را بنویسید..."
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

      </div>
    </>
  );
}