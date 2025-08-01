import React from 'react'
import LinkCard from './link-card'

export default async function AdminPanelHome() {
    

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 '>
            <LinkCard href='/admin-panel/expenses' title='Expenses' subtext='Manage internal and external expenses' />   
            <LinkCard href='/admin-panel/customers' title='Customers' subtext='Manage internal and external expenses' />         
            <LinkCard href='/admin-panel/chart-of-accounts' title='Chart of Accounts' subtext='Manage internal and external expenses' />
        </div>
    )
}