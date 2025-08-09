import React from 'react'
import LinkCard from './link-card'

export default async function AdminPanelHome() {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <LinkCard href='/admin-panel/expenses' title='Expenses' subtext='Manage internal and external expenses' />
            <LinkCard href='/admin-panel/customers' title='Customers' subtext='Manage customers and their info' />
            <LinkCard href='/admin-panel/quotations' title='Quotations' subtext='Create and update quotations for customers' />
            <LinkCard href='/admin-panel/chart-of-accounts' title='Chart of Accounts' subtext='Manage accounts to be used in expenses etc.' />
            <LinkCard href='/admin-panel/packages' title='Packages' subtext='Manage packages and their info' />
        </div>
    )
}