'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Plus, Trash2, Shield, 
  MessageSquare, UserCircle 
} from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import api from '@/lib/axios';
import { GlassInput } from '@/components/ui/GlassInput'; // اگر ندارید، اینپوت معمولی بگذارید

interface Agent {
  id: number;
  name: string;
  _count?: {
    conversations: number;
  };
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [newAgentName, setNewAgentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // دریافت لیست ایجنت‌ها
  const fetchAgents = async () => {
    try {
      const { data } = await api.get('/crm/agents');
      setAgents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // افزودن ایجنت جدید
  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    setIsSubmitting(true);
    try {
      await api.post('/crm/agents', { name: newAgentName });
      setNewAgentName('');
      fetchAgents(); // رفرش لیست
    } catch (error) {
      alert('خطا در ایجاد اپراتور');
    } finally {
      setIsSubmitting(false);
    }
  };

  // حذف ایجنت
  const handleDelete = async (id: number) => {
    if (!confirm('آیا از حذف این اپراتور اطمینان دارید؟')) return;
    try {
      await api.delete(`/crm/agents/${id}`);
      setAgents(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="مدیریت تیم و اپراتورها" />
      
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* فرم افزودن (سمت چپ) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 sticky top-28">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
              <Shield size={32} className="text-blue-400" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">تعریف اپراتور جدید</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              با تعریف اپراتورها می‌توانید مکالمات واتساپ را بین اعضای تیم خود تقسیم کنید و عملکرد آن‌ها را رصد کنید.
            </p>

            <form onSubmit={handleAddAgent} className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-2 block">نام نمایشی اپراتور</label>
                <div className="bg-[#050505] border border-white/10 rounded-xl flex items-center px-4 focus-within:border-blue-500/50 transition-colors">
                  <UserCircle size={20} className="text-slate-500" />
                  <input 
                    type="text" 
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="مثال: پشتیبانی فروش"
                    className="w-full bg-transparent border-none text-white text-sm py-4 px-3 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'در حال ثبت...' : <><Plus size={20} /> ایجاد اپراتور</>}
              </button>
            </form>
          </div>
        </motion.div>

        {/* لیست ایجنت‌ها (سمت راست) */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center text-slate-500 mt-20">در حال بارگذاری...</div>
          ) : agents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
              <Users size={48} className="text-slate-700 mb-4" />
              <p className="text-slate-500">هیچ اپراتوری تعریف نشده است</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {agents.map((agent, i) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-[#0a0a0a] border border-white/5 hover:border-white/10 p-5 rounded-2xl flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-black border border-white/10 flex items-center justify-center text-white font-bold text-lg">
                        {agent.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{agent.name}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                          <MessageSquare size={10} />
                          <span>{agent._count?.conversations || 0} گفتگو فعال</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDelete(agent.id)}
                      className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="حذف اپراتور"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </>
  );
}