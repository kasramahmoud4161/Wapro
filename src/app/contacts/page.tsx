"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios"; // ایمپورت صحیح (default import)
import { useSocket } from "@/hooks/useSocket";
import { 
  Users, Search, UserPlus, MoreVertical, 
  Phone, Notebook, Loader2, Tag as TagIcon 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// تعریف اینترفیس دقیق طبق دیتابیس
interface Note {
  text: string;
  author?: string;
}

interface Tag {
  id: number;
  name: string;
  color?: string;
}

interface Contact {
  id: number;
  phone: string;
  name?: string;
  pushName?: string;
  createdAt: string;
  notes: Note[];
  tags: Tag[];
  _count?: {
    conversations: number;
  };
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const socket = useSocket();

  // دریافت مخاطبین از API
  const fetchContacts = async () => {
    try {
      // ✅ درخواست به کنترلر CRM
      const { data } = await api.get("/crm/contacts", {
        params: { search: searchTerm || undefined }
      });
      setContacts(data);
    } catch (e) {
      console.error("خطا در دریافت مخاطبین", e);
    } finally {
      setLoading(false);
    }
  };

  // لود اولیه و جستجو (Debounce شده)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // آپدیت زنده با سوکت
  useEffect(() => {
    if (!socket) return;

    // وقتی پیام جدیدی میاد، ممکنه مخاطب جدید ساخته شده باشه
    socket.on("new_message", () => {
      fetchContacts();
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket]);

  return (
    <div className="space-y-8 pb-20 p-6 md:p-8 max-w-[1800px] mx-auto">
      {/* هدر صفحه */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-[1000] italic tracking-tighter text-white uppercase leading-none">
            Real <span className="text-green-500">Contacts</span>
          </h2>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-3">
            بانک اطلاعاتی مشتریان (زنده)
          </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="جستجوی نام یا شماره..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-3 pr-12 pl-6 text-xs text-white outline-none focus:border-green-500/30 transition-all placeholder:text-slate-600"
            />
          </div>
          <button className="p-3.5 bg-green-600 hover:bg-green-500 text-white rounded-2xl transition-all shadow-lg shadow-green-900/20">
            <UserPlus size={20} />
          </button>
        </div>
      </div>

      {/* محتوا */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="animate-spin text-green-500" size={40} />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">در حال همگام‌سازی...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 bg-[#0a0a0a] border border-dashed border-white/10 rounded-[40px]">
           <Users size={48} className="mx-auto text-slate-700 mb-6" />
           <p className="text-slate-500 font-black uppercase tracking-widest">هنوز مخاطبی ثبت نشده است</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {contacts.map((contact, i) => (
              <motion.div 
                key={contact.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-[#0a0a0a] border border-white/5 rounded-[32px] group hover:border-white/10 hover:bg-[#0f0f0f] transition-all relative overflow-hidden flex flex-col"
              >
                {/* دکمه آپشن */}
                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="text-slate-500 hover:text-white transition-colors">
                     <MoreVertical size={18} />
                   </button>
                </div>

                {/* هدر کارت */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[18px] flex items-center justify-center text-white font-black text-xl shadow-inner">
                    {contact.name?.[0] || contact.pushName?.[0] || <Phone size={20} className="text-slate-600" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight mb-1">
                      {contact.name || contact.pushName || 'مخاطب ناشناس'}
                    </h3>
                    <p className="text-xs font-mono font-medium text-green-500 tracking-wider" dir="ltr">
                      +{contact.phone}
                    </p>
                  </div>
                </div>

                {/* تگ‌ها */}
                {contact.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {contact.tags.map(tag => (
                      <span key={tag.id} className="px-2 py-1 bg-white/5 rounded-md text-[9px] text-slate-400 border border-white/5 flex items-center gap-1">
                        <TagIcon size={8} /> {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* اطلاعات فوتر */}
                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[9px] font-bold text-slate-600 uppercase">تاریخ عضویت</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(contact.createdAt).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                  
                  {/* آخرین یادداشت */}
                  {contact.notes.length > 0 ? (
                    <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-1 text-blue-400/80">
                        <Notebook size={10} />
                        <span className="text-[8px] font-black uppercase">یادداشت فنی</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">
                        {contact.notes[0].text}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                      <span className="text-[9px] text-slate-600 italic">بدون یادداشت</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-5 border-t border-white/5 flex gap-2">
                   <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all">
                     مشاهده پروفایل
                   </button>
                   <button className="flex-1 py-3 bg-green-600/10 hover:bg-green-600 hover:text-white text-green-500 border border-green-600/20 hover:border-green-600 rounded-xl text-xs font-bold transition-all">
                     ارسال پیام
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}