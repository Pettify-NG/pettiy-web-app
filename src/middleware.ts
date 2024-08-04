import { jwtDecode } from 'jwt-decode';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // const headers = new Headers(request.headers);
  // const cookies = request.cookies;

  // const token = cookies.get('pettify-token');

  // if (token && token.value !== "") {
  //   const decoded = jwtDecode(token.value);

  //   const now = new Date().getTime();
  //   const expiryDate = (decoded.exp as number) * 1000;

  //   const tokenExpired = now > expiryDate;

  //   if (tokenExpired)
  //     return NextResponse.redirect(new URL('/auth/admin/login', request.url));
  //   else return NextResponse.next();
  // } else return NextResponse.redirect(new URL('/auth/admin/login', request.url));
  NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*',],
};
