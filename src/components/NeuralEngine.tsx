'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, MessageSquare, Zap, 
  Database, ArrowRight, BrainCircuit,
  Share2, ShieldCheck, Sparkles
} from 'lucide-react';

// تعریف نوع داده برای نودها
interface Node {
  id: number;
  type: 'trigger' | 'action' | 'ai';
  title: string;
  icon: any;
  x: number;
  y: number;
  status: 'active' | 'idle' | 'processing';
}

export const NeuralEngine = () => {
  // داده‌های ساختگی اما زنده برای نمایش
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, type: 'trigger', title: 'پیام ورودی', icon: MessageSquare, x: 20, y: 50, status: 'active' },
    { id: 2, type: 'ai', title: 'تحلیل هوش مصنوعی', icon: BrainCircuit, x: 50, y: 30, status: 'processing' },
    { id: 3, type: 'action', title: 'ذخیره در CRM', icon: Database, x: 50, y: 70, status: 'idle' },
    { id: 4, type: 'action', title: 'پاسخ هوشمند', icon: Zap, x: 80, y: 50, status: 'idle' },
  ]);

  // شبیه‌سازی فعالیت شبکه (پالس زدن)
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        status: Math.random() > 0.5 ? 'active' : 'processing'
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-[#030303] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      
      {/* 1. پس‌زمینه شبکه (Grid) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* 2. افکت نورانی متحرک پس‌زمینه */}
      <motion.div 
        animate={{ 
          background: [
            'radial-gradient(600px at 0% 0%, rgba(34, 197, 94, 0.15), transparent 80%)',
            'radial-gradient(600px at 100% 100%, rgba(34, 197, 94, 0.15), transparent 80%)',
            'radial-gradient(600px at 0% 0%, rgba(34, 197, 94, 0.15), transparent 80%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 3. پنل کناری (ابزارها) */}
      <div className="absolute left-6 top-6 bottom-6 w-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center py-6 gap-6 z-20">
        {[Bot, Database, ShieldCheck, Sparkles].map((Icon, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.2, color: '#22c55e' }}
            className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center text-slate-400 cursor-pointer border border-white/5"
          >
            <Icon size={20} />
          </motion.div>
        ))}
      </div>

      {/* 4. ناحیه اصلی نودها */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-3xl h-full mx-auto">
          
          {/* خطوط اتصال (SVG Lines) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.1)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.5)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
              </linearGradient>
            </defs>
            {/* اتصال دستی برای دمو */}
            <Connection start={{x: '20%', y: '50%'}} end={{x: '50%', y: '30%'}} />
            <Connection start={{x: '20%', y: '50%'}} end={{x: '50%', y: '70%'}} />
            <Connection start={{x: '50%', y: '30%'}} end={{x: '80%', y: '50%'}} />
            <Connection start={{x: '50%', y: '70%'}} end={{x: '80%', y: '50%'}} />
          </svg>

          {/* رندر کردن نودها */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              layoutId={`node-${node.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="relative group cursor-pointer">
                {/* حلقه درخشان دور نود */}
                <motion.div 
                  animate={{ scale: node.status === 'processing' ? [1, 1.2, 1] : 1, opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute -inset-4 rounded-full blur-xl ${
                    node.type === 'ai' ? 'bg-purple-500/30' : 'bg-green-500/20'
                  }`} 
                />
                
                {/* بدنه نود */}
                <div className="relative w-48 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-green-500/50 transition-all shadow-xl">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    node.type === 'ai' ? 'bg-purple-500/20 text-purple-400' : 
                    node.type === 'trigger' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    <node.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold mb-1">{node.title}</h4>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
                      {node.status === 'active' ? 'Live' : 'Ready'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 5. ترمینال پایین (Status Log) */}
      <div className="absolute bottom-6 right-6 left-28 h-12 bg-black/80 backdrop-blur border border-white/10 rounded-xl flex items-center px-4 font-mono text-[10px] text-green-400 gap-2 overflow-hidden">
        <span className="animate-pulse">❯</span>
        <Typewriter text="System initialized... Neural Engine v2.0 connected... Waiting for input..." />
      </div>

    </div>
  );
};

// کامپوننت خط اتصال با انیمیشن جریان دیتا
const Connection = ({ start, end }: { start: {x: string, y: string}, end: {x: string, y: string} }) => {
  return (
    <>
      {/* خط پایه */}
      <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      {/* پالس نورانی که حرکت می‌کند */}
      <motion.circle 
        r="3" 
        fill="#22c55e"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <animateMotion dur="2s" repeatCount="indefinite" path={`M${parseFloat(start.x) * 8},${parseFloat(start.y) * 6} L${parseFloat(end.x) * 8},${parseFloat(end.y) * 6}`} /> 
        {/* Note: SVG paths in React need careful calc, here simplified for demo. For real generic line animation we use strokeDashoffset */}
      </motion.circle>
      {/* خط رویی گرادینت */}
      <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="url(#lineGradient)" strokeWidth="1" />
    </>
  );
};

// افکت تایپ متن
const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayed}</span>;
}