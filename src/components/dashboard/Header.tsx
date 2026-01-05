'use client';

import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Header = ({ title }: { title: string }) => {
  const { user } = useAuth();

  return (
    <header className="h-20 border-b border-white/5 bg-[#020202]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300">
      
      {/* عنوان صفحه و بردکرامب */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {title}
        </h2>
        <p className="text-[10px] text-slate-500 font-mono mt-0.5">WAPRO SYSTEM V2.0</p>
      </div>

      <div className="flex items-center gap-6">
        
        {/* نوار جستجو */}
        <div className="hidden md:flex items-center bg-white/5 rounded-xl px-4 py-2 border border-white/5 focus-within:border-green-500/30 focus-within:bg-white/10 transition-all group w-64">
          <Search size={16} className="text-slate-500 group-focus-within:text-green-400 transition-colors" />
          <input 
            type="text" 
            placeholder="جستجو در پنل..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full ml-2 placeholder:text-slate-600"
          />
        </div>

        {/* دکمه اعلان */}
        <button className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] animate-ping" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
        </button>

        {/* پروفایل کاربر */}
        <div className="flex items-center gap-3 pl-2 border-l border-white/10 ml-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white leading-none mb-1">{user?.firstName || 'کاربر'} {user?.lastName}</p>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider">{user?.email || 'GUEST_USER'}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 p-[1px] shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center text-white font-bold">
              {user?.firstName?.[0] || <User size={18} className="text-green-400" />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
