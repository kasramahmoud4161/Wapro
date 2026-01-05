'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Shield } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

// تعریف پلن‌ها (باید با بک‌اند هماهنگ باشد)
const plans = [
  {
    id: 'FREE',
    name: 'رایگان',
    price: '۰',
    period: 'همیشگی',
    desc: 'برای تست سیستم و کسب‌وکارهای کوچک',
    features: ['۱۰۰ پیام در ماه', '۱ ایجنت', 'بدون ربات هوشمند', 'پشتیبانی ایمیلی'],
    color: 'slate',
    icon: Shield
  },
  {
    id: 'PRO',
    name: 'حرفه‌ای',
    price: '۴۹۰,۰۰۰',
    period: 'ماهانه',
    desc: 'برای استارتاپ‌ها و تیم‌های در حال رشد',
    features: ['۱۰,۰۰۰ پیام در ماه', '۵ ایجنت', 'ربات هوشمند (پایه)', 'پشتیبانی تیکت', 'اتصال به CRM'],
    color: 'blue',
    icon: Zap,
    popular: true
  },
  {
    id: 'ENTERPRISE',
    name: 'سازمانی',
    price: '۱,۹۰۰,۰۰۰',
    period: 'ماهانه',
    desc: 'برای شرکت‌های بزرگ با نیازهای خاص',
    features: ['پیام نامحدود', 'ایجنت نامحدود', 'ربات هوشمند پیشرفته (GPT-4)', 'پشتیبانی تلفنی ۲۴/۷', 'IP اختصاصی'],
    color: 'purple',
    icon: Crown
  }
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handlePurchase = async (planKey: string) => {
    // چک کردن اینکه آیا کاربر لاگین است؟
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login?redirect=/pricing');
      return;
    }

    setLoading(planKey);
    try {
      const { data } = await api.post('/payment/buy', { planKey });
      // هدایت به درگاه پرداخت
      window.location.href = data.url;
    } catch (error) {
      alert('خطا در اتصال به درگاه پرداخت');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-green-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            تعرفه‌های <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">شفاف و منعطف</span>
          </h1>
          <p className="text-slate-400 text-lg">
            پلنی را انتخاب کنید که با نیازهای امروز شما همخوانی دارد. هر زمان که بخواهید می‌توانید ارتقا دهید.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-[32px] border ${plan.popular ? 'bg-[#0f0f0f] border-blue-500/50 shadow-2xl shadow-blue-900/10' : 'bg-[#0a0a0a] border-white/5'} flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  پیشنهاد ویژه
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${plan.color}-500/10 text-${plan.color}-400 border border-${plan.color}-500/20`}>
                <plan.icon size={28} />
              </div>

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-6 h-10">{plan.desc}</p>

              <div className="mb-8">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-slate-500 text-sm mr-2">تومان / {plan.period}</span>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                      <Check size={12} />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePurchase(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {loading === plan.id ? 'در حال انتقال...' : 'انتخاب پلن'}
              </button>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}