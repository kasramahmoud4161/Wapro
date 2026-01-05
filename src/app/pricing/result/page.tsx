'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Home } from 'lucide-react';
import { useEffect } from 'react';

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const status = searchParams.get('status');
  const refId = searchParams.get('ref');
  const plan = searchParams.get('plan');

  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-[40px] p-10 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* نور پس‌زمینه */}
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${isSuccess ? 'from-green-500 to-emerald-500' : 'from-red-500 to-orange-500'}`} />
        
        <div className="mb-6 flex justify-center">
          {isSuccess ? (
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
              <CheckCircle2 size={48} />
            </div>
          ) : (
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
              <XCircle size={48} />
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          {isSuccess ? 'پرداخت موفقیت‌آمیز بود' : 'پرداخت ناموفق بود'}
        </h2>
        
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          {isSuccess 
            ? `تبریک! حساب شما به پلن ${plan} ارتقا یافت. از امکانات جدید لذت ببرید.`
            : 'متاسفانه تراکنش انجام نشد. اگر مبلغی کسر شده، طی ۷۲ ساعت به حساب شما بازمی‌گردد.'}
        </p>

        {isSuccess && (
          <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/5">
            <p className="text-xs text-slate-500 mb-1">کد رهگیری تراکنش</p>
            <p className="text-lg font-mono font-bold text-white tracking-widest">{refId}</p>
          </div>
        )}

        <div className="space-y-3">
          <button 
            onClick={() => router.push('/dashboard')}
            className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isSuccess 
                ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isSuccess ? 'ورود به داشبورد' : 'بازگشت و تلاش مجدد'} <ArrowRight size={18} />
          </button>
          
          {!isSuccess && (
            <button onClick={() => router.push('/')} className="text-slate-500 text-sm hover:text-white transition-colors">
              انصراف و بازگشت به خانه
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
}