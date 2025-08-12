import Button from '@/app/components/button';
import { createClient } from '@/app/lib/utils/supabase/server';
import Link from 'next/link';
import React from 'react';
import Table from './table';

export default async function Page() {
    const supabase = createClient();

    const { data } = await supabase.from('packages')
        .select("id, created_at, heading, subheading, route, duration, pdf_url, poster_url, misc_text")
        .order('created_at', { ascending: false });

    return (
        <div>
            <Link href='/admin-panel/packages/add' className=''>
                <Button size='sm' className=''>
                    Add Package
                </Button>
            </Link>
            <Table data={data} />
        </div>
    );
}