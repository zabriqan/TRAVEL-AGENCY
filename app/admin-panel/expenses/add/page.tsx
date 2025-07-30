import Form from '@/app/components/form'
import React from 'react'

export default function Page() {
    return (
        <div>
            <Form
                fields={[
                    { id: "expense_type", label: "Expense Type", type: "select", options: ["internal", "external"], required: true },
                    { id: "amount", label: "Amount", type: "number", required: true },
                ]}
                button={{
                    type: "submit",
                    children: "Add Expense"
                }}
            />
        </div>
    )
}
