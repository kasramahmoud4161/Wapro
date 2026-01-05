"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Shield, Mail, BadgeCheck, Trash2, Loader2, UserCog } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", signature: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchAgents(); }, []);

  const fetchAgents = async () => {
    try {
      const { data } = await api.get("/whatsapp/agents");
      setAgents(data);
    } catch (e) { toast.error("خطا در دریافت لیست اپراتورها"); }
  };

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/whatsapp/agents", formData);
      toast.success("اپراتور جدید با موفقیت اضافه شد");
      setFormData({ name: "", email: "", password: "", signature: "" });
      fetchAgents();
    } catch (e) { toast.error("خطا در ثبت اپراتور"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-end mb-10 text-right">
        <div>
           <h1 className="text-3xl font-black text-white flex items-center gap-3 justify-end">
             مدیریت <span className="text-[#25D366]">اپراتورها</span> <UserCog size={32} />
           </h1>
           <p className="text-gray-500 mt-2">دسترسی‌های تیم پشتیبانی و فروش را مدیریت کنید.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* فرم ثبت نام اپراتور */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 h-fit">
          <h3 className="text-white font-bold mb-6 text-right flex items-center justify-end gap-2">
            افزودن اپراتور <UserPlus size={18} className="text-[#25D366]" />
          </h3>
          <form onSubmit={handleAddAgent} className="space-y-4">
            <input 
              placeholder="نام و نام خانوادگی" 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white text-right outline-none focus:border-[#25D366]/40"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required
            />
            <input 
              placeholder="ایمیل (برای ورود)" 
              type="email"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white text-left outline-none focus:border-[#25D366]/40"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required
            />
            <input 
              placeholder="رمز عبور" 
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white text-left outline-none focus:border-[#25D366]/40"
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required
            />
            <textarea 
              placeholder="امضای اختصاصی (مثلا: ارادتمند، علی)" 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white text-right outline-none focus:border-[#25D366]/40"
              value={formData.signature} onChange={e => setFormData({...formData, signature: e.target.value})}
            />
            <button disabled={loading} className="w-full py-4 bg-[#25D366] text-black font-black rounded-xl hover:scale-[1.02] transition-all">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "ثبت اپراتور"}
            </button>
          </form>
        </div>

        {/* لیست اپراتورها */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <tr>
                <th className="p-6">عملیات</th>
                <th className="p-6">وضعیت</th>
                <th className="p-6">نقش</th>
                <th className="p-6">اپراتور</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {agents.map((agent, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6"><Trash2 size={16} className="text-gray-600 hover:text-red-400 cursor-pointer" /></td>
                  <td className="p-6">
                    <span className="flex items-center justify-end gap-1.5 text-[#25D366] text-[10px] font-bold">
                       Online <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    </span>
                  </td>
                  <td className="p-6 text-xs text-gray-400 font-bold">{agent.role}</td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-3">
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{agent.name}</p>
                        <p className="text-[10px] text-gray-500">{agent.email}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-xs font-bold">{agent.name[0]}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}