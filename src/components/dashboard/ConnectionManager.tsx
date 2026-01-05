'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, Smartphone, LogOut, CheckCircle2 } from 'lucide-react';
import api from '@/lib/axios';
import { useSocket } from '@/hooks/useSocket';

export const ConnectionManager = () => {
  const [status, setStatus] = useState<'CONNECTED' | 'DISCONNECTED' | 'LOADING'>('LOADING');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const socket = useSocket();

  // دریافت وضعیت اولیه
  const fetchStatus = async () => {
    try {
      const { data } = await api.get('/whatsapp/status');
      setStatus(data.status);
      if (data.qr) setQrCode(data.qr);
    } catch (error) {
      console.error('Error fetching status:', error);
      setStatus('DISCONNECTED');
    }
  };

  useEffect(() => {
    fetchStatus();

    if (socket) {
      // شنیدن ایونت QR Code جدید
      socket.on('qr_code', ({ qr }) => {
        setQrCode(qr);
        setStatus('DISCONNECTED');
      });

      // شنیدن تغییر وضعیت اتصال
      socket.on('connection_status', ({ status }) => {
        setStatus(status);
        if (status === 'CONNECTED') setQrCode(null);
      });
    }

    return () => {
      if (socket) {
        socket.off('qr_code');
        socket.off('connection_status');
      }
    };
  }, [socket]);

  // ایجاد جلسه جدید
  const handleConnect = async () => {
    setQrCode(null);
    setStatus('LOADING');
    try {
      await api.post('/whatsapp/session');
      // منتظر می‌مانیم تا سوکت QR را بفرستد
    } catch (error) {
      alert('خطا در ایجاد نشست جدید');
      setStatus('DISCONNECTED');
    }
  };

  // خروج
  const handleLogout = async () => {
    if(!confirm('آیا مطمئن هستید که می‌خواهید ارتباط واتساپ را قطع کنید؟')) return;
    try {
      await api.delete('/whatsapp/logout');
      setStatus('DISCONNECTED');
      setQrCode(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
      {/* افکت نوری پس‌زمینه */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            وضعیت اتصال
            {status === 'CONNECTED' && <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"/>}
          </h3>
          <p className="text-slate-500 text-sm mt-1">مدیریت ارتباط با سرورهای واتساپ</p>
        </div>
        <div className={`p-3 rounded-xl border ${status === 'CONNECTED' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {status === 'CONNECTED' ? <Wifi size={24} /> : <WifiOff size={24} />}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[300px] relative z-10">
        <AnimatePresence mode="wait">
          
          {/* حالت ۱: لودینگ */}
          {status === 'LOADING' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <RefreshCw className="animate-spin text-green-500" size={40} />
              <p className="text-slate-400 animate-pulse">در حال بررسی وضعیت...</p>
            </motion.div>
          )}

          {/* حالت ۲: نمایش QR Code */}
          {status === 'DISCONNECTED' && qrCode && (
            <motion.div
              key="qr"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative p-4 bg-white rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.2)] group-qr">
                <QRCodeSVG value={qrCode} size={220} level="H" />
                
                {/* خط اسکن متحرک روی QR */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-green-500/50 shadow-[0_0_15px_#22c55e] backdrop-blur-sm"
                />
              </div>
              <p className="mt-6 text-slate-300 text-sm flex items-center gap-2">
                <Smartphone size={16} /> با واتساپ گوشی اسکن کنید
              </p>
            </motion.div>
          )}

          {/* حالت ۳: دکمه شروع (اگر QR هنوز نیامده) */}
          {status === 'DISCONNECTED' && !qrCode && (
            <motion.div
              key="start"
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Smartphone size={32} className="text-slate-400" />
              </div>
              <button 
                onClick={handleConnect}
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 hover:shadow-green-500/30 flex items-center gap-2 mx-auto"
              >
                ایجاد اتصال جدید <RefreshCw size={18} />
              </button>
            </motion.div>
          )}

          {/* حالت ۴: متصل شده */}
          {status === 'CONNECTED' && (
            <motion.div
              key="connected"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">اتصال برقرار است</h3>
              <p className="text-slate-400 mb-8">ربات شما آماده دریافت و ارسال پیام است.</p>
              
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 mx-auto"
              >
                <LogOut size={18} /> قطع ارتباط
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};