"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Users, MessageSquare, AlertCircle, 
  CheckCircle2, Clock, Trash2, ListPlus, 
  FileText, Zap, Loader2, Sparkles, Paperclip 
} from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export default function BulkMessaging() {
  const [phones, setPhones] = useState("");
  const [message, setMessage] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // ۱: ورود اطلاعات، ۲: تایید ارسال

  const handleSendBulk = async () => {
    // ۱. استخراج، تمیز کردن و اعتبارسنجی شماره‌ها (تبدیل به فرمت ۹۸)
    const phoneList = phones
      .split(/[\n,]+/)
      .map(p => p.trim().replace(/\D/g, '')) // حذف تمام کاراکترهای غیر عددی
      .filter(p => p.length >= 10) // فیلتر شماره‌های خیلی کوتاه
      .map(p => {
        if (p.startsWith('0')) return '98' + p.substring(1); // تبدیل 0912 به 98912
        if (!p.startsWith('98') && p.startsWith('9')) return '98' + p; // اضافه کردن ۹۸ اگر وجود نداشت
        return p;
      });

    if (phoneList.length === 0) {
      toast.error("لطفاً شماره‌ها را با فرمت صحیح (مثل 98912 یا 0912) وارد کنید");
      return;
    }
    if (!message.trim()) {
      toast.error("متن پیام نمی‌تواند خالی باشد");
      return;
    }

    setLoading(true);
    try {
      // فراخوانی اندپوینت ارسال انبوه از بک‌اَند
      const { data } = await api.post("/whatsapp/send-bulk", {
        phones: phoneList,
        message: message,
        mediaUrl: mediaUrl || undefined
      });

      if (data.success) {
        toast.success(`کمپین با موفقیت برای ${phoneList.length} مخاطب در صف قرار گرفت`);
        setStep(2);
      }
    } catch (e: any) {
      const errorMsg = e.response?.data?.message || "خطا در برقراری ارتباط با سرور";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPhones("");
    setMessage("");
    setMediaUrl("");
    setStep(1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 min-h-[80vh]">
      
      {/* هدر صفحه */}
      <div className="mb-10 text-right">
        <div className="flex items-center justify-end gap-3 mb-2">
            <h1 className="text-3xl font-black text-white">ارسال انبوه <span className="text-[#25D366]">هوشمند</span></h1>
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366]">
                <Zap size={28} fill="currentColor" />
            </div>
        </div>
        <p className="text-gray-500 font-medium">پیام‌های خود را به صورت زمان‌بندی شده و ایمن برای هزاران مخاطب ارسال کنید.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
          >
            {step === 1 ? (
              <div className="space-y-6">
                {/* لیست شماره‌ها */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest bg-[#25D366]/10 px-2 py-1 rounded-md">لیست گیرندگان</span>
                    <label className="text-sm font-bold text-gray-300">شماره موبایل‌ها</label>
                  </div>
                  <div className="relative group">
                    <textarea 
                      placeholder="989120000000 یا 09120000000"
                      className="w-full h-40 bg-black/20 border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-[#25D366]/40 transition-all thin-scrollbar text-right"
                      dir="ltr"
                      value={phones}
                      onChange={(e) => setPhones(e.target.value)}
                    />
                  </div>
                </div>

                {/* متن پیام */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-1 rounded-md">محتوای تبلیغاتی</span>
                    <label className="text-sm font-bold text-gray-300">متن پیام</label>
                  </div>
                  <textarea 
                    placeholder="متن پیام خود را اینجا بنویسید..."
                    className="w-full h-48 bg-black/20 border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-[#25D366]/40 transition-all thin-scrollbar text-right"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* فایل پیوست */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-300 mr-1 flex items-center justify-end gap-2">
                     لینک عکس یا فایل <Paperclip size={14} className="text-gray-500" />
                  </label>
                  <input 
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#25D366]/30 transition-all text-left"
                    dir="ltr"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleSendBulk}
                  disabled={loading}
                  className="w-full h-16 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl text-black font-black text-lg shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>تایید و شروع عملیات <Send size={20} /></>}
                </button>
              </div>
            ) : (
              <div className="text-center py-10">
                <CheckCircle2 size={48} className="text-[#25D366] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">عملیات با موفقیت ثبت شد</h3>
                <p className="text-gray-500 mb-8">پیام‌ها در صف ارسال قرار گرفتند.</p>
                <button onClick={resetForm} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold">ارسال کمپین جدید</button>
              </div>
            )}
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6">
             <h4 className="text-white font-black mb-6 text-right text-sm">پیش‌نمایش در موبایل</h4>
             <div className="bg-[#050505] rounded-2xl p-4 min-h-[150px] border border-white/5">
                <div className="bg-[#005c4b] text-white p-3 rounded-xl rounded-tr-none text-right text-xs leading-relaxed">
                    {message || "متن شما اینجا نمایش داده می‌شود..."}
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}