'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Plus, MoreHorizontal, User, 
  Tag, Trash2, Download, Upload 
} from 'lucide-react';
import { Header } from '@/components/dashboard/Header';

// داده‌های نمونه (بعداً از API می‌خوانیم)
const initialContacts = [
  { id: 1, name: 'علی رضایی', phone: '989123456789', tags: ['مشتری جدید', 'VIP'], status: 'active' },
  { id: 2, name: 'سارا محمدی', phone: '989350000000', tags: ['خرید اول'], status: 'inactive' },
  { id: 3, name: 'شرکت تکنو', phone: '982100000000', tags: ['همکار'], status: 'active' },
  { id: 4, name: 'کاربر ناشناس', phone: '989191234567', tags: [], status: 'active' },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');

  // فیلتر کردن
  const filteredContacts = contacts.filter(c => 
    c.name.includes(searchTerm) || c.phone.includes(searchTerm)
  );

  return (
    <>
      <Header title="مدیریت مخاطبین" />
      
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6">
        
        {/* نوار ابزار بالا */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0a0a0a] border border-white/5 p-4 rounded-2xl">
          
          {/* جستجو */}
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="جستجو با نام یا شماره..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pr-10 pl-4 text-sm text-white focus:border-green-500/50 focus:outline-none transition-all"
            />
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl text-sm transition-colors">
              <Upload size={16} /> <span className="hidden md:inline">ایمپورت اکسل</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl text-sm transition-colors">
              <Download size={16} /> <span className="hidden md:inline">خروجی</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-green-900/20 transition-all">
              <Plus size={18} /> مخاطب جدید
            </button>
          </div>
        </div>

        {/* جدول مخاطبین */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden min-h-[500px]">
          <table className="w-full text-right">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase font-mono">
              <tr>
                <th className="px-6 py-4 font-medium">نام مخاطب</th>
                <th className="px-6 py-4 font-medium">شماره موبایل</th>
                <th className="px-6 py-4 font-medium">برچسب‌ها</th>
                <th className="px-6 py-4 font-medium">وضعیت</th>
                <th className="px-6 py-4 font-medium text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredContacts.map((contact, index) => (
                <motion.tr 
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        {contact.name[0]}
                      </div>
                      <span className="text-white font-medium text-sm">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-300 text-sm tracking-wider">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {contact.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-400 flex items-center gap-1">
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                      {contact.tags.length === 0 && <span className="text-slate-600 text-xs">-</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'active' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/10' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/10'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${contact.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      {contact.status === 'active' ? 'فعال' : 'مسدود'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {filteredContacts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <User size={48} className="mb-4 opacity-20" />
              <p>مخاطبی یافت نشد</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
}