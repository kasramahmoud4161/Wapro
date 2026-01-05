'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronRight, User, 
  LayoutDashboard, LogOut, Settings, 
  Sparkles, ChevronDown 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logos';

export const Navbar = () => {
  // 1. دریافت اطلاعات کاربر از کانتکست
  const { user, loading, logout } = useAuth();
  
  // 2. مدیریت وضعیت‌ها (State)
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // 3. افکت اسکرول و کلیک خارج از منو
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 4. بستن منوها هنگام تغییر صفحه
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  // لینک‌های نوبار
  const navItems = [
    { name: 'خانه', href: '/' },
    { name: 'امکانات', href: '/features' },
    { name: 'تعرفه‌ها', href: '/pricing' },
    { name: 'تماس', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-6 py-2.5 border ${
            scrolled 
              ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]' 
              : 'bg-transparent border-transparent'
          }`}
        >
          
          {/* --- لوگو --- */}
          <Link href="/" className="z-50 group flex items-center gap-2">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-600 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-green-500/20">
               <Logo className="text-white w-5 h-5" /> 
            </div>
            <span className="font-bold text-lg tracking-tight text-white hidden sm:block">
              WaPro<span className="text-green-500">.</span>
            </span>
          </Link>

          {/* --- لینک‌های وسط (دسکتاپ) --- */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-white/5 border border-white/5 rounded-full p-1 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-inner"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* --- دکمه‌های سمت چپ (ورود/پروفایل) --- */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-green-500 animate-spin" />
            ) : user ? (
              // 🟢 حالت لاگین شده
              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all ${
                    profileMenuOpen 
                      ? 'bg-white/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                      : 'bg-[#1a1a1a] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold text-xs shadow-inner">
                    {user.firstName ? user.firstName[0].toUpperCase() : <User size={14} />}
                  </div>
                  <span className="text-sm font-medium text-slate-200 max-w-[100px] truncate">
                    {user.firstName || 'کاربر'}
                  </span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* منوی دراپ‌داون پروفایل */}
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-60 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 backdrop-blur-3xl z-50 origin-top-left"
                    >
                       <div className="px-3 py-3 border-b border-white/5 mb-2 bg-white/[0.03] rounded-xl relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <p className="text-xs text-green-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> آنلاین
                          </p>
                          <p className="text-sm text-white truncate font-medium dir-ltr text-right">{user.email}</p>
                       </div>
                       
                       <div className="space-y-1">
                         <Link href="/dashboard" className="block">
                           <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer group/item">
                             <LayoutDashboard size={16} className="text-slate-500 group-hover/item:text-green-400 transition-colors" />
                             <span className="text-sm font-medium">داشبورد</span>
                           </div>
                         </Link>
                         <Link href="/dashboard/settings" className="block">
                           <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer group/item">
                             <Settings size={16} className="text-slate-500 group-hover/item:text-green-400 transition-colors" />
                             <span className="text-sm font-medium">تنظیمات</span>
                           </div>
                         </Link>
                       </div>
                       
                       <div className="h-px bg-white/5 my-2" />
                       
                       <button 
                         onClick={logout}
                         className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all cursor-pointer text-left group/logout"
                       >
                         <LogOut size={16} className="group-hover/logout:text-red-500" />
                         <span className="text-sm font-medium">خروج</span>
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // ⚪ حالت مهمان (لاگین نشده)
              <>
                <Link href="/login" className="text-slate-400 hover:text-white text-sm font-medium px-4 transition-colors">
                  ورود
                </Link>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden bg-white text-black px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      شروع کنید <Sparkles size={14} className="text-purple-600" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* --- دکمه منوی موبایل (همبرگری) --- */}
          <button 
            className="md:hidden text-white p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* --- منوی موبایل (کشویی) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-40 p-4 md:hidden"
          >
            <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-5 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px] pointer-events-none" />
              
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                      pathname === item.href 
                        ? "bg-white/10 text-white font-bold" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={16} className={`transition-transform ${pathname === item.href ? 'text-green-400 translate-x-1' : 'text-slate-600'}`} />
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg flex justify-center items-center gap-2">
                        <LayoutDashboard size={18} /> داشبورد
                      </button>
                    </Link>
                    <button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-red-400 font-medium border border-white/5 flex justify-center items-center gap-2"
                    >
                      <LogOut size={18} /> خروج
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-3 rounded-xl bg-[#1A1A1A] text-white border border-white/10 font-bold">ورود</button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-3 rounded-xl bg-white text-black font-bold">ثبت نام</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};