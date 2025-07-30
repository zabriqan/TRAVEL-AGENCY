import React from 'react'
import { createClient } from '../lib/utils/supabase/server'
import { redirect } from 'next/navigation';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect('/login');

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold'>Admin Panel</h1>
            <p className='mb-4'>Welcome, {user.email}</p>
            {children}
        </div>
    )
}
