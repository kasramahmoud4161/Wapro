import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// ✅ اتصال به پورت ۳۰۰۰
const SOCKET_URL = 'http://localhost:3000';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // سوکت نیاز به توکن دارد، اگر نباشد وصل نمی‌شویم
    if (!token) return;

    const newSocket = io(SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      },
      transports: ['websocket'],
      autoConnect: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};