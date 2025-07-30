'use server';
import { supabaseServer } from '@/lib/utils/supabase/server';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabaseServer()
    .auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);
}
