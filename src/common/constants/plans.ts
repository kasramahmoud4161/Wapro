export const PLAN_LIMITS: Record<string, any> = {
  FREE: {
    name: 'رایگان',
    price: 0,
    maxMessages: 100,      // محدودیت پیام در ماه
    maxAgents: 1,          // محدودیت تعداد ایجنت
    maxSessions: 1,        // محدودیت تعداد اکانت واتساپ متصل
    hasChatbot: false,     // دسترسی به ربات
    hasCRM: true
  },
  PRO: {
    name: 'حرفه‌ای',
    price: 490000,
    maxMessages: 10000,
    maxAgents: 5,
    maxSessions: 3,
    hasChatbot: true,
    hasCRM: true
  },
  ENTERPRISE: {
    name: 'سازمانی',
    price: 1900000,
    maxMessages: 1000000, // نامحدود
    maxAgents: 50,
    maxSessions: 10,
    hasChatbot: true,
    hasCRM: true
  }
};