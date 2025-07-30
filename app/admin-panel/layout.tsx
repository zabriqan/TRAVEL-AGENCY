import React from 'react'
import { createClient } from '../lib/utils/supabase/server'
import { redirect } from 'next/navigation';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect('/login');

    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Welcome, {user.email}</p>
            {children}
        </div>
    )
}
