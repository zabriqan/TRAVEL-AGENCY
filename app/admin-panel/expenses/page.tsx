import Button from '@/app/components/button'
import Link from 'next/link'
import React from 'react'

export default function ExpensesPage() {
    return (
        <div>
            {/* TODO: Create a standard table */}
            <Link href='/admin-panel/expenses/add' className=''>
                <Button size='sm'>
                    Add Expense
                </Button>
            </Link>
        </div>
    )
}
