import { NextRequest, NextResponse } from 'next/server';
import { getServerSideUser } from './lib/payload-utils';

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { user } = await getServerSideUser(cookies);

  const protectedRoutes = [
    '/user',
    '/user-info',
    '/user-lottery',
    '/user-referral',
    '/user-transaction',
    '/contest',
    '/cart',
    '/checkout',
    '/winner',
  ];

  const isProtectedRoute = (url: string) => {
    return protectedRoutes.some((route) => url.startsWith(route));
  };

  if (user && ['/login', '/register'].includes(nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }

  if (!user && isProtectedRoute(nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`);
  }

  return NextResponse.next();
}
