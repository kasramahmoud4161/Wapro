'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-2 cursor-pointer group"
      whileHover="hover"
    >
      {/* بخش آیکون لوگو */}
      <div className="relative">
        <motion.div
          variants={{
            hover: { rotate: 180, scale: 1.1 }
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-10 h-10 bg-gradient-to-tr from-green-500 to-emerald-300 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]"
        >
          <Zap className="text-black w-6 h-6 fill-current" />
        </motion.div>
        
        {/* افکت نوری پشت آیکون */}
        <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      {/* بخش متنی لوگو */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tighter leading-none bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:to-white transition-all">
          WaPro
        </span>
        <span className="text-[10px] font-bold text-green-500 tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity -mt-1 duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
          Marketing
        </span>
      </div>
    </motion.div>
  );
};