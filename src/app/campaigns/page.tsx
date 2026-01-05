"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Users, FileText, Image as ImageIcon, Sparkles, CheckCircle } from "lucide-react";

export default function Campaigns() {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-5xl mx-auto px-4">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">ارسال انبوه</h1>
          <p className="text-gray-400 mt-1">ساخت و مدیریت کمپین‌های تبلیغاتی</p>
        </div>
        <button className="px-5 py-2 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 font-medium text-sm flex items-center gap-2">
            <Sparkles size={16} />
            ۲۰ اعتبار باقی‌مانده
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
            {/* Step 1: Audience */}
            <div className="p-6 rounded-[32px] bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-xl group hover:border-[#25D366]/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                        <Users size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">۱. انتخاب مخاطبین</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectBox title="همه مخاطبین" sub="1,240 کاربر" active />
                    <SelectBox title="مشتریان VIP" sub="45 کاربر" />
                    <SelectBox title="لیدهای جدید" sub="120 کاربر" />
                    <div className="border border-dashed border-white/20 rounded-2xl flex items-center justify-center text-gray-500 cursor-pointer hover:border-[#25D366] hover:text-[#25D366] transition-colors p-4">
                        + آپلود اکسل
                    </div>
                </div>
            </div>

            {/* Step 2: Content */}
            <div className="p-6 rounded-[32px] bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-xl group hover:border-[#25D366]/30 transition-colors">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                        <FileText size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">۲. متن پیام</h3>
                </div>
                
                <div className="relative">
                    <textarea 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#25D366] transition-colors min-h-[150px] resize-none"
                        placeholder="متن پیام تبلیغاتی خود را اینجا بنویسید..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition"><ImageIcon size={18}/></button>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button className="w-full py-4 rounded-full bg-[#25D366] text-black font-bold text-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2">
                <Send size={20} />
                ارسال کمپین
            </button>
        </motion.div>

        {/* RIGHT: Preview */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
        >
            <div className="sticky top-32">
                <h3 className="text-gray-400 mb-4 text-sm font-medium">پیش‌نمایش پیام</h3>
                <div className="w-[300px] h-[600px] bg-[#111] border-[8px] border-[#222] rounded-[40px] relative overflow-hidden shadow-2xl mx-auto">
                    {/* Fake Phone Screen */}
                    <div className="absolute top-0 w-full h-16 bg-[#005c4b] z-10 flex items-center px-4 pt-4">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-white/20"></div>
                             <div className="w-24 h-3 bg-white/20 rounded-full"></div>
                        </div>
                    </div>
                    
                    {/* Background WhatsApp Doodle */}
                    <div className="absolute inset-0 bg-[#0b141a] pt-20 px-4">
                         <div className="absolute inset-0 opacity-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-[length:300px]" />
                         
                         {message && (
                             <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#005c4b] p-3 rounded-lg rounded-tr-none text-white text-sm relative z-10 shadow-sm"
                             >
                                 {message}
                                 <span className="text-[10px] text-gray-300 block text-left mt-1">12:30 PM</span>
                             </motion.div>
                         )}
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}

function SelectBox({ title, sub, active }: any) {
    return (
        <div className={`p-4 rounded-2xl border cursor-pointer transition-all ${active ? 'bg-[#25D366]/10 border-[#25D366] text-white' : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'}`}>
            <div className="flex justify-between items-center">
                <h4 className="font-bold">{title}</h4>
                {active && <CheckCircle size={18} className="text-[#25D366]" />}
            </div>
            <p className="text-xs mt-1 opacity-70">{sub}</p>
        </div>
    )
}