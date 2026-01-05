'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // اگر فایل utils ندارید، پایین توضیح دادم چکار کنید*
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// *نکته: اگر پوشه lib/utils ندارید، برای الان import { cn } را حذف کنید و به جای cn(styles) از تمپلت لیترال استفاده کنید.
// اما پیشنهاد میکنم فایل lib/utils.ts را بسازید (کدش را پایین‌تر میگذارم).

export const GlassCard = ({ children, className, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, type: "spring", stiffness: 100 }}
      className={`glass-panel rounded-2xl p-6 relative overflow-hidden ${className || ''}`}
    >
      {/* افکت درخشش ملایم در بالای کارت */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {children}
    </motion.div>
  );
};