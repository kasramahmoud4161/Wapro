"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, MessageSquare, Trash2, Zap, 
  Search, ShieldCheck, Loader2, Sparkles,
  Bot, Hash, ArrowLeftRight
} from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<any[]>([]);
  const [trigger, setTrigger] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ۱. دریافت لیست کلمات کلیدی از بک‌اَند
  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      const { data } = await api.get("/whatsapp/keywords");
      setKeywords(data);
    } catch (e) {
      toast.error("خطا در بارگذاری کلمات کلیدی");
    } finally {
      setFetching(false);
    }
  };

  // ۲. افزودن کلمه کلیدی جدید
  const handleAddKeyword = async () => {
    if (!trigger.trim() || !response.trim()) {
      toast.error("لطفاً هر دو فیلد کلمه و پاسخ را پر کنید");
      return;
    }

    setLoading(true);
    try {
      await api.post("/whatsapp/keywords", { trigger, response });
      toast.success("پاسخ خودکار با موفقیت فعال شد");
      setTrigger("");
      setResponse("");
      fetchKeywords(); // بروزرسانی لیست
    } catch (e) {
      toast.error("خطا در ثبت کلمه کلیدی");
    } finally {
      setLoading(false);
    }
  };

  // ۳. حذف کلمه کلیدی
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/whatsapp/keywords/${id}`);
      setKeywords(keywords.filter(k => k.id !== id));
      toast.success("کلمه کلیدی حذف شد");
    } catch (e) {
      toast.error("خطا در حذف کلمه");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* هدر صفحه */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="text-right order-2 md:order-1">
          <div className="flex items-center justify-end gap-3 mb-2">
            <h1 className="text-3xl font-black text-white">پاسخگوی <span className="text-[#25D366]">هوشمند</span></h1>
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366]">
              <Bot size={28} />
            </div>
          </div>
          <p className="text-gray-500 font-medium">ربات خود را طوری تنظیم کنید که به سوالات پرتکرار مشتریان فوراً پاسخ دهد.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* فرم افزودن (سمت راست) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366]/5 blur-3xl rounded-full" />
            
            <h3 className="text-white font-bold mb-6 flex items-center justify-end gap-2">
              قانون جدید <Plus size={18} className="text-[#25D366]" />
            </h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 mr-1 uppercase">کلمه کلیدی (Trigger)</label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#25D366] transition-colors" size={16} />
                  <input 
                    type="text"
                    placeholder="مثلاً: سلام، قیمت، مشاوره"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-4 pl-12 text-white text-right outline-none focus:border-[#25D366]/40 transition-all font-medium"
                    value={trigger}
                    onChange={(e) => setTrigger(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 mr-1 uppercase">پاسخ ربات (Response)</label>
                <textarea 
                  placeholder="متن پاسخ خودکار را بنویسید..."
                  className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-4 text-white text-right outline-none focus:border-[#25D366]/40 transition-all thin-scrollbar font-medium"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                />
              </div>

              <button 
                onClick={handleAddKeyword}
                disabled={loading}
                className="w-full py-4 bg-[#25D366] text-black font-black rounded-2xl shadow-lg shadow-[#25D366]/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <> فعال‌سازی پاسخگو <Zap size={18} fill="currentColor" /> </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-[32px] p-6">
            <h4 className="flex items-center justify-end gap-2 text-blue-400 font-bold mb-3 text-sm">
              چگونه کار می‌کند؟ <Sparkles size={16} />
            </h4>
            <p className="text-[11px] text-gray-400 text-right leading-relaxed">
              وقتی مشتری کلمه کلیدی شما را ارسال کند، سیستم در کمتر از ۱ ثانیه پاسخ تنظیم شده را برای او می‌فرستد. این کار باعث افزایش رضایت مشتری و صرفه‌جویی در وقت شما می‌شود.
            </p>
          </div>
        </motion.div>

        {/* لیست کلمات (سمت چپ) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col min-h-[500px]"
        >
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
             <div className="bg-[#25D366]/10 px-3 py-1 rounded-full border border-[#25D366]/20 text-[10px] font-black text-[#25D366]">
               {keywords.length} فعال
             </div>
             <h3 className="text-white font-bold">لیست قوانین فعال</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 thin-scrollbar">
            {fetching ? (
              <div className="flex items-center justify-center h-40 opacity-30">
                <Loader2 className="animate-spin" />
              </div>
            ) : keywords.length === 0 ? (
              <div className="text-center py-20 opacity-20">
                <MessageSquare size={64} className="mx-auto mb-4" />
                <p className="font-bold">هنوز هیچ پاسخگوی خودکاری ثبت نشده است</p>
              </div>
            ) : (
              <AnimatePresence>
                {keywords.map((kw) => (
                  <motion.div 
                    key={kw.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group bg-black/20 border border-white/5 rounded-2xl p-5 hover:border-[#25D366]/30 transition-all flex items-center justify-between"
                  >
                    <button 
                      onClick={() => handleDelete(kw.id)}
                      className="p-3 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex items-center gap-6 flex-1 justify-end px-4">
                      <div className="text-right flex-1">
                        <p className="text-xs text-gray-500 mb-1 font-black uppercase">پاسخ سیستم</p>
                        <p className="text-sm text-gray-300 font-medium">{kw.response}</p>
                      </div>
                      
                      <div className="hidden sm:block text-gray-700">
                        <ArrowLeftRight size={18} />
                      </div>

                      <div className="text-right w-32">
                        <p className="text-[10px] text-[#25D366] mb-1 font-black uppercase bg-[#25D366]/5 px-2 py-0.5 rounded w-fit ml-auto">کلمه کلیدی</p>
                        <p className="text-md text-white font-black">"{kw.trigger}"</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}