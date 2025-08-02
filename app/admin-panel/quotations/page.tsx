import Button from '@/app/components/button';
import { createClient } from '@/app/lib/utils/supabase/server'
import Link from 'next/link';
import React from 'react'
import Table from './table';

export default async function Page() {
   const supabase = createClient();
   const { data } = await supabase.from('quotations').select('id,booking_no,stops,prices,costs,created_at,customer_id');

   return (
      <div>
         <Link href='/admin-panel/quotations/create'>
            <Button size='sm'>
               Create Quotation
            </Button>
         </Link>
         <Table data={data} />
      </div>
   )
}
