
import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getCookies: () => request.cookies,
    setCookies: response.cookies,
  });
  await supabase.auth.getUser();             // refresh if expired
  return response;
}
