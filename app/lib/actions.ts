'use server';

import { createClient } from '@/app/lib/utils/supabase/server';

export async function signIn(formData: FormData): Promise<{ ok: true, message: string } | { ok: false, error: string }> {
  try {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // TODO: Validate email and password using zod

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    
    console.log('Sign In Data:', data);

    return { ok: true, message: "Sign in successful!" };
  } catch (error) {
    console.error('Sign In Error:', error);
    return { ok: false, error: "Failed to sign in." };
  }
}
