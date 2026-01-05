'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Send, ShieldCheck, Zap, 
  Activity, Globe, Server, Cpu, 
  Terminal, ArrowUpRight, Wifi 
} from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { ConnectionManager } from '@/components/dashboard/ConnectionManager';

// --- 1. کامپوننت کارت هولوگرافیک (Stats Card) ---
const HoloCard = ({ title, value, sub, icon: Icon, color, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/5 p-6 group"
    >
      {/* نور پس‌زمینه */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${color}-500/10 blur-[40px] rounded-full group-hover:bg-${color}-500/20 transition-all duration-500`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/10">
            <span>+12%</span> <ArrowUpRight size={12} />
          </div>
        </div>
        
        <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</h3>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <p className="text-xs text-slate-600 mt-4 flex items-center gap-1">
           <Activity size={12} className={`text-${color}-500`} /> {sub}
        </p>
      </div>

      {/* خط نئونی پایین */}
      <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${color}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  );
};

// --- 2. کامپوننت ترمینال زنده (System Logs) ---
const LiveTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const messages = [
      "Syncing contacts from device...",
      "Message queue optimized [Capacity: 98%]",
      "AI Bot responding to +98912...",
      "Webhook event received: STATUS_READ",
      "Gateway latency: 24ms (Stable)",
      "Encryption keys rotated successfully",
    ];
    
    // شبیه‌سازی لاگ‌های زنده
    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 6)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#080808] border border-white/5 rounded-3xl p-6 font-mono text-xs overflow-hidden relative h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
        <Terminal size={14} className="text-green-500" />
        <span className="text-slate-400 font-bold tracking-widest">SYSTEM_LOGS</span>
        <div className="ml-auto flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-3 flex-1 overflow-hidden relative">
         {/* اسکن لاین */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan pointer-events-none z-10" />
        
        {logs.map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-green-400/80 truncate border-l-2 border-green-500/20 pl-3 py-1"
          >
            <span className="text-slate-600 mr-2 opacity-50">$</span>
            {log}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- 3. کامپوننت نقشه جهان (Abstract Map) ---
const WorldMap = () => {
  return (
    <div className="relative w-full h-full min-h-[350px] flex items-center justify-center bg-[#080808] rounded-3xl overflow-hidden border border-white/5 group">
      {/* شبکه شطرنجی متحرک */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* گرادینت محیطی */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

      {/* دایره‌های رادار */}
      <div className="absolute w-[500px] h-[500px] border border-green-500/5 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute w-[300px] h-[300px] border border-green-500/10 rounded-full animate-ping-slow" />
      
      {/* کره مرکزی */}
      <div className="relative z-10 w-32 h-32 rounded-full bg-black border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.1)] flex items-center justify-center">
        <Globe size={48} className="text-slate-700 group-hover:text-green-500 transition-colors duration-500" />
      </div>

      {/* نقاط فعال (Pings) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_10px_#22c55e]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1.5, 0],
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`
          }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      
      <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[10px] text-green-400 flex items-center gap-2">
        <Wifi size={12} className="animate-pulse" />
        <span className="font-mono">SERVER: THR-01 [CONNECTED]</span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <>
      <Header title="نمای کلی سیستم" />
      
      <div className="p-6 md:p-8 space-y-8 max-w-[1800px] mx-auto pb-20">
        
        {/* --- Section 1: Top Metrics --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HoloCard 
            title="پیام‌های ارسال شده" value="1.2M" 
            sub="نرخ تحویل ۹۹٪" icon={Send} color="green" delay={0.1} 
          />
          <HoloCard 
            title="مخاطبین فعال" value="14,205" 
            sub="۵۴۰ مخاطب جدید" icon={Users} color="blue" delay={0.2} 
          />
          <HoloCard 
            title="پاسخ‌های هوشمند" value="8,430" 
            sub="صرفه‌جویی ۱۰۵ ساعت" icon={Zap} color="yellow" delay={0.3} 
          />
          <HoloCard 
            title="وضعیت سرویس" value="99.9%" 
            sub="پایدار و امن" icon={ShieldCheck} color="purple" delay={0.4} 
          />
        </div>

        {/* --- Section 2: Main Control Center --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-[500px]">
          
          {/* ستون اول: اتصال واتساپ */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="xl:col-span-1 h-full"
          >
             <ConnectionManager />
          </motion.div>
          
          {/* ستون دوم و سوم: نقشه و ترمینال */}
          <div className="xl:col-span-2 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-6 h-full">
            
            {/* نقشه جهان */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="h-full"
            >
              <WorldMap />
            </motion.div>

            {/* ترمینال و وضعیت منابع */}
            <div className="flex flex-col gap-6 h-full">
               
               {/* ترمینال */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.7 }}
                 className="flex-1"
               >
                 <LiveTerminal />
               </motion.div>

               {/* کارت منابع سیستم (Resource Usage) */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
                 className="h-32 bg-[#080808] border border-white/5 rounded-3xl p-6 flex items-center justify-between relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />
                 
                 <div className="relative z-10">
                    <p className="text-slate-500 text-xs font-bold mb-1">CPU LOAD</p>
                    <div className="text-2xl font-mono font-bold text-white flex items-baseline gap-2">
                       12% <span className="text-[10px] text-green-400 font-normal">NORMAL</span>
                    </div>
                 </div>

                 <div className="relative z-10 pl-6 border-l border-white/10">
                    <p className="text-slate-500 text-xs font-bold mb-1">MEMORY</p>
                    <div className="text-2xl font-mono font-bold text-white flex items-baseline gap-2">
                       2.4<span className="text-sm text-slate-500">GB</span>
                    </div>
                 </div>

                 <div className="relative z-10 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-blue-400">
                    <Server size={24} />
                 </div>
               </motion.div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}