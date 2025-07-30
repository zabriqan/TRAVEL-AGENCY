import { updateSession } from '@/app/lib/utils/supabase/middleware';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  /**
   * Match everything **except** Next.js assets & common binary files.
   * (No capturing groups – Next 15 throws if you add them.)
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
