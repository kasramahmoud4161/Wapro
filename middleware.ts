import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// صفحاتی که نیاز به لاگین دارند
const protectedRoutes = ['/dashboard', '/chat', '/campaigns', '/settings', '/contacts']
// صفحات مربوط به احراز هویت
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // ۱. اگر کاربر لاگین کرده و در صفحه اصلی (/) است -> هدایت به داشبورد
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // ۲. محافظت از صفحات خصوصی (اگر توکن ندارد -> برو لاگین)
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // ۳. اگر کاربر لاگین کرده و می‌خواهد دوباره لاگین/ثبت‌نام کند -> هدایت به داشبورد
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // این پترن باعث می‌شود میدل‌ور روی تمام فایل‌ها به جز عکس‌ها و فایل‌های استاتیک اجرا شود
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}