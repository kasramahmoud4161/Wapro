'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Send, Paperclip, MoreVertical, 
  Phone, Video, Mic, Check, CheckCheck 
} from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import api from '@/lib/axios'; // کلاینت Axios ما
import { useSocket } from '@/hooks/useSocket'; // هوک سوکت ما

// تعریف تایپ‌ها
interface Chat {
  id: number;
  name: string;
  phone: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  status?: string;
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  
  const socket = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ۱. دریافت لیست چت‌ها هنگام لود صفحه
  const fetchChats = async () => {
    try {
      const { data } = await api.get('/whatsapp/conversations');
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch chats', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // ۲. دریافت پیام‌ها وقتی روی چت کلیک می‌شود
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/whatsapp/messages/${selectedChat}`);
        setMessages(data);
        setTimeout(scrollToBottom, 100);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // ۳. اسکرول خودکار به پایین
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ۴. گوش دادن به پیام‌های جدید از طریق سوکت
  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', (newMsg: any) => {
      // اگر پیام مال چت فعلی است، به لیست اضافه کن
      if (selectedChat && newMsg.conversationId === selectedChat) {
        setMessages((prev) => [...prev, newMsg]);
        setTimeout(scrollToBottom, 100);
      }
      
      // آپدیت لیست چت‌ها (جابجایی به بالا و تغییر متن آخرین پیام)
      fetchChats(); 
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket, selectedChat]);

  // ۵. ارسال پیام
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChat) return;

    // آپدیت سریع UI (Optimistic UI)
    const tempMsg = {
      id: Date.now(),
      text: messageText,
      sender: 'me' as const,
      time: new Date().toISOString(),
      status: 'pending'
    };
    setMessages([...messages, tempMsg]);
    setMessageText('');
    setTimeout(scrollToBottom, 100);

    try {
      const activeChat = chats.find(c => c.id === selectedChat);
      if (!activeChat) return;

      await api.post('/whatsapp/send-text', {
        phone: activeChat.phone,
        message: tempMsg.text
      });
      
      // پیام با موفقیت ارسال شد (می‌توانید وضعیت را به sent تغییر دهید)
      fetchChats(); // آپدیت سایدبار
    } catch (error) {
      console.error('Send failed', error);
      alert('خطا در ارسال پیام');
    }
  };

  return (
    <>
      <Header title="چت‌های زنده" />
      
      <div className="h-[calc(100vh-140px)] p-4 md:p-6 max-w-[1800px] mx-auto overflow-hidden">
        <div className="flex h-full gap-6 bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* --- سایدبار لیست چت‌ها --- */}
          <div className={`w-full md:w-80 lg:w-96 flex flex-col border-l border-white/5 bg-[#050505] ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
            
            {/* جستجو */}
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="جستجو..." 
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-sm text-white focus:outline-none focus:border-green-500/50 transition-all"
                />
              </div>
            </div>

            {/* لیست چت‌ها */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {loading ? (
                <div className="text-center text-slate-500 mt-10">در حال دریافت گفتگوها...</div>
              ) : chats.length === 0 ? (
                <div className="text-center text-slate-500 mt-10 text-sm">هنوز هیچ گفتگویی ندارید.</div>
              ) : (
                chats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center gap-3 ${
                      selectedChat === chat.id ? 'bg-white/10 border border-white/5' : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold border border-white/10">
                        {chat.avatar}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`text-sm font-bold truncate ${selectedChat === chat.id ? 'text-white' : 'text-slate-200'}`}>
                          {chat.name}
                        </h4>
                        <span className="text-[10px] text-slate-500">
                          {new Date(chat.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate max-w-[140px]">{chat.lastMsg}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* --- بخش اصلی چت --- */}
          <div className={`flex-1 flex flex-col bg-[#020202] relative ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
            
            {selectedChat ? (
              <>
                {/* هدر چت */}
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]/50 backdrop-blur-md z-10">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedChat(null)} className="md:hidden text-slate-400">←</button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-800 flex items-center justify-center text-white font-bold text-sm">
                      {chats.find(c => c.id === selectedChat)?.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">
                        {chats.find(c => c.id === selectedChat)?.name}
                      </h3>
                      <p className="text-slate-500 text-xs">
                        {chats.find(c => c.id === selectedChat)?.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-slate-400">
                    <MoreVertical size={20} className="cursor-pointer hover:text-white" />
                  </div>
                </div>

                {/* لیست پیام‌ها */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('/chat-bg-dark.png')] bg-repeat bg-[length:400px] relative">
                  <div className="absolute inset-0 bg-[#020202]/90 pointer-events-none" />
                  
                  <div className="relative z-10 space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed relative shadow-lg ${
                          msg.sender === 'me' ? 'bg-[#005c4b] text-white rounded-tr-none' : 'bg-[#202c33] text-white rounded-tl-none'
                        }`}>
                          {msg.text}
                          <div className="text-[10px] text-white/50 text-right mt-1 flex justify-end gap-1 items-center">
                            {new Date(msg.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            {msg.sender === 'me' && <CheckCheck size={14} className="text-blue-400" />}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* اینپوت پیام */}
                <div className="p-4 bg-[#0a0a0a] border-t border-white/5 relative z-10">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-3 max-w-4xl mx-auto">
                    <button type="button" className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                      <Paperclip size={20} />
                    </button>
                    
                    <div className="flex-1 bg-[#1e2428] rounded-2xl flex items-center px-4 py-1 border border-transparent focus-within:border-green-500/30 transition-all">
                      <input 
                        type="text" 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="پیامی بنویسید..."
                        className="w-full bg-transparent border-none text-white text-sm py-3 focus:outline-none placeholder:text-slate-500 text-right dir-rtl"
                      />
                    </div>

                    <button type="submit" className="p-3 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg">
                      {messageText.trim() ? <Send size={20} /> : <Mic size={20} />}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-6">👋</div>
                <h2 className="text-2xl font-bold text-white mb-2">گفتگوهای واتساپ</h2>
                <p className="text-sm">یک مخاطب را انتخاب کنید تا چت‌های واقعی را ببینید.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}