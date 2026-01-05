'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020202] text-white flex font-sans selection:bg-green-500/30 selection:text-green-200 overflow-hidden">
      
      {/* پس‌زمینه ثابت (Base Layer) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* نویز بافت‌دار */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />
        
        {/* نورهای محیطی (Ambient Lights) */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-green-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      {/* سایدبار سمت راست */}
      <Sidebar />

      {/* محتوای اصلی (سمت چپ سایدبار) */}
      <main className="flex-1 md:mr-72 relative min-h-screen transition-all duration-300 flex flex-col">
        
        {/* کانتینر اسکرول‌شونده محتوا */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-0 scroll-smooth">
          {children}
        </div>

      </main>
    </div>
  );
}