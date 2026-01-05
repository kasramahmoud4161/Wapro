"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Plus, MessageSquare, Copy, Trash2, Loader2 } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export default function CannedResponsesPage() {
  const [responses, setResponses] = useState<any[]>([]);
  const [shortcut, setShortcut] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchCanned(); }, []);

  const fetchCanned = async () => {
    try {
      const { data } = await api.get("/whatsapp/canned");
      setResponses(data);
    } catch (e) { toast.error("خطا در بارگذاری پاسخ‌ها"); }
  };

  const handleAdd = async () => {
    if (!shortcut || !content) return;
    setLoading(true);
    try {
      await api.post("/whatsapp/canned", { shortcut, content });
      toast.success("پاسخ آماده ذخیره شد");
      setShortcut(""); setContent("");
      fetchCanned();
    } catch (e) { toast.error("خطا در ذخیره"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10 text-right">
        <h1 className="text-3xl font-black text-white italic">پاسخ‌های <span className="text-[#25D366]">آماده</span></h1>
        <p className="text-gray-500 mt-2">با تعریف میان‌بر، سرعت پاسخگویی تیم خود را تا ۱۰ برابر افزایش دهید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 h-fit">
           <div className="space-y-5">
              <div className="text-right">
                <label className="text-xs font-black text-gray-500 uppercase">میان‌بر (Shortcut)</label>
                <input 
                  placeholder="مثلا: card" 
                  className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-left text-[#25D366] font-mono outline-none focus:border-[#25D366]/40"
                  value={shortcut} onChange={e => setShortcut(e.target.value)}
                />
              </div>
              <div className="text-right">
                <label className="text-xs font-black text-gray-500 uppercase">متن کامل پاسخ</label>
                <textarea 
                  placeholder="شماره کارت و اطلاعات واریز..." 
                  className="w-full mt-2 h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-right text-white outline-none focus:border-[#25D366]/40"
                  value={content} onChange={e => setContent(e.target.value)}
                />
              </div>
              <button onClick={handleAdd} disabled={loading} className="w-full py-4 bg-white/10 hover:bg-[#25D366] hover:text-black text-white font-black rounded-xl transition-all flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <>افزودن به لیست <Plus size={18}/></>}
              </button>
           </div>
        </div>

        <div className="space-y-4">
           {responses.map((res, i) => (
             <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-[#25D366]/30 transition-all">
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white"><Copy size={14}/></button>
                   <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-red-400"><Trash2 size={14}/></button>
                </div>
                <div className="text-right">
                   <div className="bg-[#25D366]/10 text-[#25D366] text-[10px] font-black px-2 py-0.5 rounded w-fit ml-auto mb-2 uppercase tracking-tighter">/{res.shortcut}</div>
                   <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{res.content}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}