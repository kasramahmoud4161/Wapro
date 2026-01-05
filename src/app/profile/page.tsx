"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios"; //
import { User, Mail, Shield, Globe, Settings, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // بارگذاری دیتای واقعی کاربر و تنظیمات وب‌هوک
    const loadData = async () => {
      try {
        const [userRes, webRes] = await Promise.all([
          api.get("/auth/me"),
          api.get("/whatsapp/webhook").catch(() => ({ data: { url: "" } }))
        ]);
        setUser(userRes.data);
        setWebhookUrl(webRes.data.url || "");
      } catch (e) {
        console.error("Session expired");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="flex justify-center py-40"><Loader2 className="animate-spin text-[#25D366]" size={40} /></div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* کارت هویت (Identity Card) */}
        <div className="lg:col-span-4">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[50px] p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#25D366]/10 to-transparent" />
            <div className="relative w-24 h-24 bg-white text-black rounded-[30px] mx-auto flex items-center justify-center font-[1000] text-3xl mb-6 shadow-2xl">
              {user?.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-black text-white">{user?.name}</h2>
            <p className="text-[10px] text-[#25D366] font-black uppercase tracking-[0.3em] mt-2 italic">Enterprise Access</p>
            
            <div className="mt-12 space-y-4">
               <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between text-right">
                  <span className="text-[10px] font-black text-gray-600 uppercase">Email Address</span>
                  <span className="text-xs text-gray-300 font-bold">{user?.email}</span>
               </div>
               <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                  <Shield size={16} className="text-[#25D366]" />
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Two-Factor Active</span>
               </div>
            </div>
          </div>
        </div>

        {/* تنظیمات فنی (Infrastructure Settings) */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-[#0a0a0a] border border-white/5 rounded-[50px] p-12">
              <div className="flex items-center gap-4 mb-10">
                 <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Globe size={20} /></div>
                 <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Webhook Configuration</h3>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Real-time Data Stream</p>
                 </div>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-gray-500 leading-relaxed text-right">
                  برای دریافت رویدادهای زنده (مانند دریافت پیام جدید) آدرس API سرور خود را در بخش زیر وارد کنید. تمام درخواست‌ها به صورت POST ارسال می‌شوند.
                </p>
                <input 
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://api.yourdomain.com/webhook"
                  className="w-full bg-black border border-white/10 rounded-3xl p-6 text-sm font-mono text-[#25D366] outline-none focus:border-[#25D366]/40 transition-all shadow-inner"
                />
                <button className="w-full py-5 bg-white text-black rounded-[2rem] font-[1000] text-xs uppercase tracking-[0.3em] hover:bg-[#25D366] transition-all flex items-center justify-center gap-3">
                  Update Infrastructure <Save size={18} />
                </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}