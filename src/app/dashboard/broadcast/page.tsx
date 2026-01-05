'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Image as ImageIcon, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import api from '@/lib/axios';

export default function BroadcastPage() {
  const [phones, setPhones] = useState('');
  const [message, setMessage] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSend = async () => {
    // تبدیل رشته شماره‌ها به آرایه و تمیزکاری
    const phoneList = phones.split(/[\n,]+/).map(p => p.trim()).filter(p => p.length > 5);
    
    if (phoneList.length === 0 || !message) {
      setStatus({ type: 'error', msg: 'لطفاً لیست شماره‌ها و متن پیام را وارد کنید.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // ارسال به اندپوینت bulk که در کنترلر ساختیم
      await api.post('/whatsapp/bulk', {
        phones: phoneList,
        message,
        mediaUrl: mediaUrl || undefined
      });
      
      setStatus({ type: 'success', msg: `کمپین با موفقیت برای ${phoneList.length} نفر در صف ارسال قرار گرفت.` });
      setPhones('');
      setMessage('');
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'خطا در ارسال کمپین. لطفاً اتصال واتساپ را چک کنید.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="ارسال انبوه" />
      
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
        
        {/* --- ستون چپ: فرم ارسال --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col h-full overflow-y-auto"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Users size={20} className="text-green-500" /> گیرندگان
            </h3>
            <p className="text-xs text-slate-500 mb-3">شماره‌ها را وارد کنید (هر شماره در یک خط یا جدا شده با کاما)</p>
            <textarea
              value={phones}
              onChange={(e) => setPhones(e.target.value)}
              placeholder="989120000000&#10;989350000000"
              className="w-full h-32 bg-[#050505] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-green-500/50 focus:outline-none transition-colors font-mono resize-none"
            />
            <div className="text-right text-xs text-slate-600 mt-1">
              {phones.split(/[\n,]+/).filter(p => p.trim().length > 5).length} مخاطب شناسایی شد
            </div>
          </div>

          <div className="mb-6 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Send size={20} className="text-blue-500" /> محتوای پیام
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="متن پیام خود را اینجا بنویسید..."
              className="flex-1 w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500/50 focus:outline-none transition-colors resize-none mb-4"
            />
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-[#050505] border border-white/10 rounded-xl flex items-center px-4">
                <ImageIcon size={16} className="text-slate-500" />
                <input 
                  type="text" 
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="لینک تصویر (اختیاری)..."
                  className="w-full bg-transparent border-none text-sm text-white px-3 py-3 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {status && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl mb-4 flex items-center gap-3 text-sm ${
                status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {status.msg}
            </motion.div>
          )}

          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'در حال پردازش...' : <>ارسال پیام <Send size={18} /></>}
          </button>
        </motion.div>

        {/* --- ستون راست: پیش‌نمایش موبایل --- */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="absolute inset-0 bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[380px] h-[750px] bg-black border-[10px] border-[#1a1a1a] rounded-[3rem] shadow-2xl overflow-hidden relative"
          >
            {/* نوار وضعیت گوشی */}
            <div className="h-7 bg-[#000] flex justify-between items-center px-6 pt-2">
              <span className="text-[10px] text-white font-medium">9:41</span>
              <div className="flex gap-1.5">
                <div className="w-4 h-2.5 bg-white rounded-[2px]" />
                <div className="w-4 h-2.5 bg-white rounded-[2px]" />
              </div>
            </div>

            {/* هدر واتساپ */}
            <div className="bg-[#075E54] h-16 flex items-center px-4 gap-3 shadow-md relative z-10">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs">You</div>
              <div>
                <p className="text-white font-bold text-sm">مشتری احتمالی</p>
                <p className="text-white/70 text-[10px]">آنلاین</p>
              </div>
            </div>

            {/* پس‌زمینه چت */}
            <div className="flex-1 bg-[#0D1418] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] opacity-90 p-4 overflow-y-auto">
              {/* حباب پیام */}
              {message && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#005C4B] p-2 rounded-lg rounded-tr-none ml-auto max-w-[85%] shadow-sm relative group"
                >
                  {mediaUrl && (
                    <div className="mb-2 rounded-md overflow-hidden bg-black/20">
                      <img src={mediaUrl} alt="Preview" className="w-full h-32 object-cover" />
                    </div>
                  )}
                  <p className="text-white text-sm whitespace-pre-wrap leading-relaxed">{message}</p>
                  <div className="text-[10px] text-white/50 text-right mt-1 flex justify-end gap-1">
                    10:00 <span className="text-blue-400">✓✓</span>
                  </div>
                  {/* مثلث گوشه پیام */}
                  <div className="absolute top-0 -right-2 w-0 h-0 border-[8px] border-transparent border-t-[#005C4B] border-l-[#005C4B]" />
                </motion.div>
              )}
              
              {!message && (
                <div className="flex items-center justify-center h-full opacity-30">
                  <p className="text-white text-xs text-center">پیش‌نمایش پیام شما<br/>اینجا نمایش داده می‌شود</p>
                </div>
              )}
            </div>

            {/* فوتر چت (تایپ بار) */}
            <div className="bg-[#1e2428] p-3 flex items-center gap-2">
              <div className="flex-1 bg-[#2a2f32] h-9 rounded-full" />
              <div className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center">
                <Send size={16} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </>
  );
}