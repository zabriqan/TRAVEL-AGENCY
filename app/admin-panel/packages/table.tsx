"use client";

import React from 'react'
import StandardTable, { EditButton } from '@/app/components/standard-table';
import { packages } from '@/app/lib/types';


export default function customerTable({ data }: { data: packages[] | null }) {
    return (
        <div>
            {data ? <StandardTable<packages>
                data={data}
                columns={[
                    { key: 'id', title: 'ID' },
                    { key: 'heading', title: 'Heading', searchable: true },
                    { key: 'subheading', title: 'Sub Heading', searchable: true },
                    { key: 'route', title: 'Route', searchable: true },
                    { key: 'duration', title: 'Duration', searchable: true },
                    { key: 'pdf_url', title: 'pdf url', searchable: true },
                    { key: 'poster_url', title: 'poster url', searchable: true },
                    { key: 'misc_text', title: 'Details', searchable: true },
                    { key: 'created_at', title: 'Created at', render: (row) => new Date(row.created_at).toLocaleString(), searchable: true },
                    {
                        key: 'actions', title: 'Actions', render: (row) => (
                            <EditButton href={`/admin-panel/packages/${row.id}`} />
                        )
                    }
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No Package found.
                </div>
            )}
        </div>
    )
}

