'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/lib/axios';
import { Loader2 } from 'lucide-react';

interface User {
  id: number;
  email: string;
  name?: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // لیست صفحاتی که نیاز به لاگین ندارند
  const publicRoutes = ['/', '/login', '/register', '/pricing', '/contact', '/features'];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('token');

    // اگر توکن نداریم و در صفحه محافظت شده هستیم -> برو به لاگین
    if (!token) {
      if (!publicRoutes.includes(pathname)) {
        router.push('/login');
      }
      setLoading(false);
      return;
    }

    try {
      // دریافت اطلاعات کاربر از بک‌اند
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (error) {
      console.error('Login failed/expired');
      localStorage.removeItem('token');
      setUser(null);
      if (!publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=0; path=/;';
    setUser(null);
    router.push('/login');
  };

  // نمایش لودینگ تمام صفحه هنگام چک کردن توکن
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#030303] flex items-center justify-center">
        <Loader2 className="animate-spin text-green-500" size={48} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);