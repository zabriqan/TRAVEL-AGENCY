import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  // Next.js 15 cookie store
  // const store = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /** SSR reads */
        getAll: async () => (await cookies()).getAll(),

        /** SSR writes – silently ignored inside Server Components */
        setAll: (all) => {
          try {
            all.forEach(async ({ name, value, options }) =>
              (await cookies()).set(name, value, options as CookieOptions),
            );
          } catch {
            /* called from a Server Component – that's fine, middleware will refresh instead */
          }
        },
      },
    },
  );
}
