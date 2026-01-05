// src/app/logo-preview/page.tsx
"use client";
import { WaProLogo } from "@/components/Logos";

export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-16">
      <h1 className="text-white text-3xl font-black mb-10">WaPro Logo Concepts</h1>

      {/* Concept 1: Quantum Bolt */}
      <div className="flex items-center gap-4 group">
        <WaProLogo variant="bolt" className="w-16 h-16" />
        <div className="text-4xl font-black italic tracking-tighter text-white">
          WA<span className="text-[#25D366] group-hover:blur-[2px] transition-all">PRO</span>
        </div>
      </div>

      {/* Concept 2: Nexus W */}
      <div className="flex items-center gap-4 group">
        <WaProLogo variant="nexus" className="w-16 h-16" />
        <div className="text-4xl font-black tracking-[0.2em] text-white uppercase">
          WA<span className="text-[#25D366] font-thin">PRO</span>
          <span className="block text-xs text-gray-500 tracking-normal opacity-50">Enterprise Network</span>
        </div>
      </div>

      {/* Concept 3: Ascend Arrow */}
      <div className="flex items-center gap-4 group">
        <WaProLogo variant="ascend" className="w-16 h-16" />
        <div className="text-4xl font-black tracking-tighter text-white lowercase">
          wa<span className="text-[#25D366] underline decoration-4 underline-offset-4">pro.</span>io
        </div>
      </div>
    </div>
  );
}