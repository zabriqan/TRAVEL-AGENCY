import React from 'react'
import { createClient } from '../lib/utils/supabase/server'
import { redirect } from 'next/navigation';
import Button from '../components/button';
import LogoutBtn from './logout-btn';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect('/login');

    return (
        <div className='container mx-auto p-4'>
            <div className="flex items-center justify-between p-3">
                <div className="flex flex-col">
                    <a href="/admin-panel"> <h1 className='text-2xl font-bold'>Admin Panel</h1></a>
                    <p className='mb-4'>Welcome, {user.email}</p>
                </div>
                <LogoutBtn />
            </div>
            <div className="p-2 md:p-3 lg:p-5">{children}</div>
        </div>
    )
}
