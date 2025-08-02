import Button from '@/app/components/button'
import { createClient } from '@/app/lib/utils/supabase/server';
import Link from 'next/link'
import React from 'react'
import Table from './table';

export default async function Page() {
    const supabase = createClient();
    const { data } = await supabase.from('expenses').select('id,amount,expense_type,created_at,chart_of_account_id').order('created_at', { ascending: false });

    return (
        <div>
            <Link href='/admin-panel/expenses/add' className=''>
                <Button size='sm'>
                    Add Expense
                </Button>
            </Link>
            <Table data={data} />
        </div>
    )
}
