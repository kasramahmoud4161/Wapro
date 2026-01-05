"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Search, MoreVertical, Phone, Video, 
  Smile, Paperclip, CheckCheck, User, MessageSquare, 
  Loader2, Zap, Clock
} from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export default function ChatPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  // بخش پاسخ‌های آماده
  const [cannedResponses, setCannedResponses] = useState<any[]>([]);
  const [showCanned, setShowCanned] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();

  // ۱. دریافت لیست گفتگوها و پاسخ‌های آماده در ابتدای کار
  useEffect(() => {
    fetchConversations();
    fetchCannedResponses();
  }, []);

  // ۲. مدیریت اسکرول خودکار به آخرین پیام
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ۳. گوش دادن به پیام‌های جدید با امنیت بالا (جلوگیری از خطای Undefined)
  useEffect(() => {
    if (!socket) return;

    socket.on('message:new', (data: { conversationId: number; message: any }) => {
      // بروزرسانی لیست گفتگوها برای نمایش آخرین پیام در سایدبار
      setConversations((prev) => {
        return prev.map(chat => {
          if (chat.id === data.conversationId) {
            return { ...chat, messages: [data.message], lastMessageAt: data.message.createdAt };
          }
          return chat;
        });
      });

      // افزودن پیام به لیست پیام‌های فعلی (تنها اگر این گفتگو باز باشد)
      if (selectedChat && data.conversationId === selectedChat.id) {
        setMessages((prev) => {
          // جلوگیری از ثبت پیام‌های تکراری
          if (prev.find(m => m.id === data.message.id)) return prev;
          return [...prev, data.message];
        });
      }
    });

    return () => { socket.off('message:new'); };
  }, [socket, selectedChat]);

  const fetchConversations = async () => {
    try {
      const { data } = await api.get("/whatsapp/conversations");
      setConversations(data);
    } catch (e) {
      console.error("خطا در دریافت گفتگوها");
    } finally {
      setLoading(false);
    }
  };

  const fetchCannedResponses = async () => {
    try {
      const { data } = await api.get("/whatsapp/canned");
      setCannedResponses(data);
    } catch (e) { console.error("خطا در دریافت پاسخ‌های آماده"); }
  };

  const loadChat = async (chat: any) => {
    setSelectedChat(chat);
    setLoading(true);
    try {
      const { data } = await api.get(`/whatsapp/messages/${chat.id}`);
      setMessages(data);
    } catch (e) {
      setMessages([]);
      toast.error("خطا در بارگذاری تاریخچه پیام‌ها");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const finalMessage = textToSend || inputText;
    if (!finalMessage.trim() || !selectedChat || isSending) return;

    setIsSending(true);
    try {
      // اعتبارسنجی و تمیز کردن شماره موبایل
      let targetPhone = selectedChat.contact.phone.replace(/\D/g, '');
      if (targetPhone.startsWith('0')) targetPhone = '98' + targetPhone.substring(1);

      await api.post("/whatsapp/send/text", {
        phone: targetPhone,
        message: finalMessage
      });

      setInputText("");
      setShowCanned(false);
    } catch (e) {
      toast.error("ارسال پیام با خطا مواجه شد");
    } finally {
      setIsSending(false);
    }
  };

  // مدیریت نمایش لیست پاسخ‌های آماده با زدن کلید "/"
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);
    if (val.startsWith("/")) {
      setShowCanned(true);
    } else {
      setShowCanned(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[82vh] flex gap-4 px-4 overflow-hidden">
      
      {/* لیست گفتگوها (Sidebar) */}
      <motion.aside 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-[380px] flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden"
      >
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-black text-white mb-4">گفتگوها</h2>
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#25D366] transition-colors" size={18} />
            <input 
              type="text"
              placeholder="جستجو در مخاطبین..."
              className="w-full bg-black/20 border border-white/5 rounded-2xl py-3 pr-12 pl-4 text-sm text-white outline-none focus:border-[#25D366]/30 transition-all text-right"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto thin-scrollbar">
          {loading && conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 opacity-30">
              <Loader2 className="animate-spin mb-2" />
              <span className="text-sm">بارگذاری...</span>
            </div>
          ) : (
            conversations.map((chat, i) => (
              <motion.div
                key={chat.id}
                onClick={() => loadChat(chat)}
                className={`p-4 flex items-center gap-4 cursor-pointer transition-all border-l-4 ${
                  selectedChat?.id === chat.id 
                  ? 'bg-[#25D366]/10 border-[#25D366]' 
                  : 'hover:bg-white/5 border-transparent'
                }`}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {chat.contact?.pushName?.[0] || "#"}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full border-2 border-[#050505]" />
                </div>
                
                <div className="flex-1 min-w-0 text-right">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[10px] text-gray-500 font-bold">
                      {chat.lastMessageAt ? new Date(chat.lastMessageAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                    </span>
                    <h4 className="font-bold text-gray-100 truncate">{chat.contact?.pushName || chat.contact?.phone}</h4>
                  </div>
                  <p className="text-xs text-gray-500 truncate" dir="auto">
                    {chat.messages?.[0]?.text || 'بدون پیام'}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.aside>

      {/* محیط اصلی چت */}
      <motion.main className="flex-1 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden relative shadow-2xl">
        <AnimatePresence mode="wait">
          {selectedChat ? (
            <motion.div key="chat-active" className="flex-1 flex flex-col">
              {/* هدر */}
              <div className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#25D366] to-[#128C7E] flex items-center justify-center text-black font-black shadow-lg">
                    {selectedChat.contact?.pushName?.[0]}
                  </div>
                  <div className="text-right">
                    <h3 className="text-white font-bold text-lg leading-tight">{selectedChat.contact?.pushName || selectedChat.contact?.phone}</h3>
                    <div className="flex items-center gap-1.5 justify-end">
                      <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                      <span className="text-[11px] text-[#25D366] font-bold uppercase">متصل</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Phone size={20}/></button>
                  <button className="p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Video size={20}/></button>
                  <button className="p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"><MoreVertical size={20}/></button>
                </div>
              </div>

              {/* پیام‌ها */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 thin-scrollbar bg-[url('/bg-pattern.png')] bg-repeat bg-center opacity-90" ref={scrollRef}>
                {messages.map((msg, i) => (
                  <motion.div key={i} className={`flex ${msg.isFromMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-4 rounded-3xl relative shadow-lg ${
                      msg.isFromMe 
                      ? 'bg-gradient-to-br from-[#005c4b] to-[#004d40] text-white rounded-tr-none border border-[#25D366]/20' 
                      : 'bg-[#1a1a1a] text-gray-200 rounded-tl-none border border-white/10'
                    }`}>
                      <p className="text-[15px] leading-relaxed mb-1" dir="auto">{msg.text}</p>
                      <div className={`flex items-center justify-end gap-1 text-[10px] font-bold opacity-60 ${msg.isFromMe ? 'text-[#25D366]' : 'text-gray-400'}`}>
                        <span>{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        {msg.isFromMe && <CheckCheck size={14} />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* پنل پاسخ‌های آماده */}
              <AnimatePresence>
                {showCanned && cannedResponses.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-28 left-8 right-8 bg-[#111] border border-white/10 rounded-2xl p-2 shadow-2xl z-50">
                    <p className="text-[10px] font-black text-gray-500 p-2 uppercase border-b border-white/5 mb-1">پاسخ‌های آماده</p>
                    {cannedResponses.map((res) => (
                      <button key={res.id} onClick={() => handleSend(res.content)} className="w-full text-right p-3 hover:bg-white/5 rounded-xl transition-all flex items-center justify-between group">
                         <Zap size={14} className="text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="text-right">
                           <span className="text-[#25D366] font-bold text-xs">/{res.shortcut}</span>
                           <p className="text-xs text-gray-400 truncate w-60">{res.content}</p>
                         </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ورودی پیام */}
              <div className="p-6 bg-black/20 backdrop-blur-md border-t border-white/5">
                <div className="flex items-center gap-3 bg-white/5 rounded-[24px] p-2 border border-white/10 focus-within:border-[#25D366]/40 transition-all">
                  <button className="p-3 rounded-2xl hover:bg-white/10 text-gray-400 transition-all"><Smile size={22}/></button>
                  <button className="p-3 rounded-2xl hover:bg-white/10 text-gray-400 transition-all"><Paperclip size={22}/></button>
                  <input 
                    type="text"
                    placeholder="پیامی بنویسید (با / پاسخ آماده)..."
                    className="flex-1 bg-transparent border-none outline-none text-white text-[15px] px-2 text-right font-medium"
                    dir="auto"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button onClick={() => handleSend()} disabled={!inputText.trim() || isSending} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${inputText.trim() ? 'bg-[#25D366] text-black' : 'bg-white/5 text-gray-600'}`}>
                    {isSending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} fill="currentColor" />}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] mb-8 shadow-2xl">
                <MessageSquare size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-black text-white mb-3">واتساپ <span className="text-[#25D366]">پرو</span></h3>
              <p className="text-gray-500 max-w-sm font-medium">یک گفتگو را برای شروع مدیریت پیام‌ها انتخاب کنید.</p>
            </div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}