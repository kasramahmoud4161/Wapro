'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
}

export const GlassInput = ({ icon: Icon, label, className, ...props }: GlassInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className={`text-xs uppercase tracking-widest font-bold ml-1 transition-colors duration-300 ${isFocused ? 'text-green-400' : 'text-slate-500'}`}>
          {label}
        </label>
      )}
      
      <div className="relative group">
        {/* نور پس‌زمینه هنگام فوکوس */}
        <div 
          className={`absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl opacity-0 transition-opacity duration-500 blur-md ${
            isFocused ? 'opacity-50' : 'group-hover:opacity-20'
          }`} 
        />
        
        <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden transition-colors duration-300">
          
          {Icon && (
            <div className={`pl-4 transition-colors duration-300 ${isFocused ? 'text-green-400' : 'text-slate-500'}`}>
              <Icon size={20} />
            </div>
          )}

          <input
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={`w-full bg-transparent text-white p-4 outline-none placeholder:text-slate-600 transition-all ${className}`}
          />
        </div>
      </div>
    </div>
  );
};