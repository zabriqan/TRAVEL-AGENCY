import React from 'react'
import LinkCard from './link-card'

export default async function AdminPanelHome() {
    

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 '>
            <LinkCard href='/admin-panel/expenses' title='Expenses' subtext='Manage internal and external expenses' />            
        </div>
    )
}