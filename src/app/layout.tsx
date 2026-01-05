import type { Metadata } from "next";
import { Inter } from "next/font/google"; // یا فونت فارسی دلخواه شما
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AIBackground } from "@/components/ui/AIBackground";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WaPro AI - دستیار هوشمند واتساپ",
  description: "اتوماسیون و مدیریت واتساپ با قدرت هوش مصنوعی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className={`${inter.className} bg-black min-h-screen relative overflow-x-hidden selection:bg-green-500/30 selection:text-green-200`}>
        
        {/* کانتکست احراز هویت */}
        <AuthProvider>
          
          {/* ۱. پس‌زمینه هوشمند و متحرک (در تمام صفحات ثابت است) */}
          <AIBackground />
          
          {/* ۲. لایه نویز برای حس سینمایی */}
          <div className="fixed inset-0 bg-noise opacity-[0.04] pointer-events-none z-0" />

          {/* ۳. نویگیشن بار */}
          <Navbar />

          {/* ۴. محتوای اصلی */}
          <main className="relative z-10 pt-20 flex flex-col min-h-screen">
            {children}
          </main>

          {/* ۵. مدیریت نوتیفیکیشن‌ها */}
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: 'rgba(20, 20, 20, 0.8)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
          
        </AuthProvider>
      </body>
    </html>
  );
}