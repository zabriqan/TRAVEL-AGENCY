import React from 'react'
import { createClient } from '../lib/utils/supabase/server'
import { redirect } from 'next/navigation';
import LogoutBtn from './logout-btn';
import Link from 'next/link';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect('/login');

    return (
        <div className='container mx-auto p-4'>
            <div className="flex items-start justify-between py-3">
                <div className="flex flex-col">
                    <Link href="/admin-panel" className='hover:text-primary'>
                        <h1 className='text-2xl font-bold'>Admin Panel</h1>
                    </Link>
                    <p className='mb-4 text-gray-700'>Welcome, {user.email}</p>
                </div>
                <LogoutBtn />
            </div>
            <div className="py-2 md:py-3 lg:py-5">{children}</div>
        </div>
    )
}
