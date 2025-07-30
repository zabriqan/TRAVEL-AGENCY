import { updateSession } from '@/lib/utils/supabase/middleware';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return updateSession(request);
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|svg|gif|webp)$).*)',
  ],
};
