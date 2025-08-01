import Button from '@/app/components/button';
import { createClient } from '@/app/lib/utils/supabase/server';
import Link from 'next/link';
import React from 'react';
import Table from './table';

export default async function Page() {
    const supabase = createClient();

    
    const { data } = await supabase
        .from('chart_of_accounts')
        .select('id,created_at,account_code,account_name,account_type')
        .order('created_at', { ascending: false });


    return (
        <div>
            <Link href='/admin-panel/chart-of-accounts/add' className=''>
                <Button size='sm'>
                    Add Chart of Account
                </Button>
            </Link>
            <Table data={data} />
        </div>
    );
}