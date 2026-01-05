'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logo } from '@/components/Logos';
import { 
  LayoutDashboard, Users, Send, MessageSquare, 
  Bot, Settings, LogOut, PieChart, Sparkles 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'اتاق فرمان', href: '/dashboard' },
  { icon: Send, label: 'ارسال انبوه', href: '/dashboard/broadcast' },
  { icon: Users, label: 'مخاطبین', href: '/dashboard/contacts' },
  { icon: Bot, label: 'ربات هوشمند', href: '/dashboard/chatbot' },
  { icon: MessageSquare, label: 'چت‌ها', href: '/dashboard/chat' },
  { icon: PieChart, label: 'گزارشات', href: '/dashboard/reports' },
  { icon: Settings, label: 'تنظیمات', href: '/dashboard/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="fixed right-0 top-0 h-screen w-72 bg-[#050505]/80 backdrop-blur-xl border-l border-white/5 flex flex-col z-50 hidden md:flex shadow-2xl">
      
      {/* لوگو با افکت درخشان */}
      <div className="h-24 flex items-center justify-center border-b border-white/5 relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-green-500/5 blur-xl group-hover:bg-green-500/10 transition-all duration-500" />
        <Link href="/" className="relative z-10 scale-110">
          <Logo />
        </Link>
      </div>

      {/* منوی اصلی */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 no-scrollbar">
        <div className="text-xs font-mono text-slate-600 mb-4 px-4 uppercase tracking-widest flex items-center gap-2">
          <Sparkles size={10} className="text-green-500" /> Main Modules
        </div>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className="relative group">
                {/* پس‌زمینه فعال (نئون) */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-green-500/10 rounded-xl border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-green-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                  <item.icon size={22} className={isActive ? 'drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]' : ''} />
                  <span className="font-medium text-sm tracking-wide">{item.label}</span>
                  
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="mr-auto w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" 
                    />
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* پنل کاربری پایین */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="bg-gradient-to-r from-green-900/10 to-transparent p-4 rounded-2xl border border-white/5 mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-slate-400 uppercase">Plan Usage</span>
            <span className="text-[10px] text-white font-bold">75%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
          </div>
        </div>

        <button 
          onClick={logout}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={18} />
          <span className="font-medium text-xs uppercase tracking-wider">Disconnect</span>
        </button>
      </div>
    </aside>
  );
};