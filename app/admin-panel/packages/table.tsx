"use client";

import React from 'react'
import StandardTable, { EditButton } from '@/app/components/standard-table';
import { Package } from '@/app/lib/types';


export default function customerTable({ data }: { data: Package[] | null }) {
    return (
        <div>
            {data ? <StandardTable<Package>
                data={data}
                columns={[
                    {
                        key: 'actions', title: 'Actions', render: (row) => (
                            <EditButton href={`/admin-panel/packages/${row.id}`} />
                        )
                    },
                    { key: 'id', title: 'ID' },
                    { key: 'heading', title: 'Heading', searchable: true },
                    { key: 'subheading', title: 'Sub Heading', searchable: true },
                    { key: 'route', title: 'Route', searchable: true },
                    { key: 'duration', title: 'Duration', searchable: true },
                    { key: 'pdf_url', title: 'PDF URL' },
                    { key: 'poster_url', title: 'Poster URL' },
                    { key: 'misc_text', title: 'Details', searchable: true },
                    { key: 'created_at', title: 'Created At', render: (row) => new Date(row.created_at).toLocaleString(), searchable: true },
                ]}
            /> : (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No Package found.
                </div>
            )}
        </div>
    )
}

