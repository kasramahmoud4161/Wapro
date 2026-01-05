'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MailCheck, ArrowRight, RefreshCw, Loader2 } from 'lucide-react';
import { OTPInput } from '@/components/ui/OTPInput';
import { Logo } from '@/components/Logos';
import api from '@/lib/axios';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // تایمر ارسال مجدد
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleVerify = async (code: string) => {
    if (code.length !== 6) return;
    setLoading(true);
    
    try {
      // درخواست تایید به بک‌اند
      // فرض بر این است که اندپوینت تایید /auth/verify-email است
      await api.post('/auth/verify-email', { email, code });
      
      // هدایت به داشبورد یا لاگین بعد از موفقیت
      router.push('/dashboard'); 
    } catch (error) {
      alert('کد وارد شده اشتباه یا منقضی شده است.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      await api.post('/auth/resend-code', { email });
      setResendTimer(60);
      alert('کد جدید ارسال شد.');
    } catch (error) {
      alert('خطا در ارسال مجدد کد.');
    }
  };

  if (!email) {
    return <div className="text-white text-center pt-20">ایمیل یافت نشد. لطفاً دوباره ثبت نام کنید.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303] relative overflow-hidden p-6">
      
      {/* پس‌زمینه نوری */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center">
          
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <MailCheck size={40} className="text-green-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">تایید ایمیل</h1>
          <p className="text-slate-400 text-sm mb-8">
            ما یک کد ۶ رقمی به <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">{email}</span> ارسال کردیم.
            <br/> لطفاً آن را وارد کنید.
          </p>

          <div className="mb-8">
            <OTPInput onComplete={handleVerify} />
          </div>

          <div className="flex flex-col items-center gap-4">
            {loading ? (
              <div className="flex items-center gap-2 text-green-400 font-bold">
                <Loader2 className="animate-spin" /> در حال بررسی...
              </div>
            ) : (
              <p className="text-xs text-slate-500">کد به صورت خودکار بررسی می‌شود</p>
            )}

            <button 
              onClick={handleResend}
              disabled={resendTimer > 0}
              className={`flex items-center gap-2 text-sm transition-colors ${
                resendTimer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-white hover:text-green-400'
              }`}
            >
              <RefreshCw size={14} className={resendTimer > 0 ? 'animate-spin' : ''} />
              {resendTimer > 0 ? `ارسال مجدد در ${resendTimer} ثانیه` : 'ارسال مجدد کد'}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// برای جلوگیری از خطای بیلد در نکست، محتوا باید در Suspense باشد چون از useSearchParams استفاده شده
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-20">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}