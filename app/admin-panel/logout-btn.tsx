"use client";

import React from 'react'
import Button from '../components/button';
import { createClient } from '../lib/utils/supabase/browser';
import { toast } from 'sonner';

export default function LogoutBtn() {
    const supabase = createClient();

    return (
        <Button onClick={async () => {
            await supabase.auth.signOut();
            toast.success('Logged out successfully');
            setTimeout(() => {
                location.href = '/login';
            }, 500);
        }}>
            Logout
        </Button>
    )
}
