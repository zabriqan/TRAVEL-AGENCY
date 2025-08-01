import Button from '@/app/components/button';
import { createClient } from '@/app/lib/utils/supabase/server';
import Link from 'next/link';
import React from 'react';
import Table from './table';

export default async function Page() {
    const supabase = createClient();

    // Fetch data with error handling
    const { data } = await supabase
        .from('customer_master')
        .select('id,created_at,customer_name,contact_no,email_address')
        .order('created_at', { ascending: false });



    return (
        <div>
            <Link href='/admin-panel/customers/add' className=''>
                <Button size='sm'>
                    Add Customer
                </Button>
            </Link>
            <Table data={data} />
        </div>
    );
}