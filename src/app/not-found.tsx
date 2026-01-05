import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      
      {/* Icon with glow */}
      <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#25D366] blur-[60px] opacity-20 rounded-full" />
          <div className="relative w-24 h-24 rounded-[32px] bg-[#111] border border-white/10 flex items-center justify-center text-[#25D366]">
              <AlertTriangle size={48} />
          </div>
      </div>

      <h1 className="text-6xl font-black text-white mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-4">صفحه پیدا نشد</h2>
      <p className="text-gray-500 max-w-md mb-8">
        متاسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد یا حذف شده است.
      </p>

      <Link href="/">
        <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-[#25D366] hover:scale-105 transition-all">
            بازگشت به خانه
        </button>
      </Link>
    </div>
  );
}