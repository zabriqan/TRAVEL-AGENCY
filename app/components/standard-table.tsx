"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultTableDataRenderer } from "../lib/utils";

export default function StandardTable<T>({ data, columns }: {
    data: T[];
    columns: BasicColumnType<T>[];
}) {
    const [filteredData, setFilteredData] = useState<T[]>(data);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        setFilteredData(data.filter(row => {
            return columns.some(column => {
                if (!column.searchable) return false;
                const value = row[column.key];
                return String(value).toLowerCase().includes(searchValue);
            });
        }));
    }

    useEffect(() => {
        setFilteredData(data)
    }, [data])


    return (
        <>
            <div className="mb-2 mt-4">
                <input
                    onChange={handleSearchChange}
                    type="text" placeholder={`Search in ${data.length} records`}
                    className="border px-3 py-1.5 text-sm border-gray-200 w-full rounded-md outline-none focus:border-primary transition"
                />
            </div>
            {filteredData.length === 0 ? (
                <div className="p-4 text-center md:text-lg text-gray-500">
                    No data found.
                </div>
            ) : (
                <div className='overflow-x-auto rounded-lg'>
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                {columns.map((col, i) => (
                                    <th className="px-2 md:px-3.5 py-2 text-nowrap text-xs md:text-sm font-semibold text-start" key={i}>
                                        {col.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, i) => (
                                <tr key={i} className='group border-t border-gray-200'>
                                    {columns.map((col, j) => (
                                        <td key={j} className='group-even:bg-gray-50 group-odd:bg-white group-last:pb-2.5 px-2 md:px-3.5 py-1.5 text-nowrap text-sm md:text-base'>
                                            {col.render ? col.render(row) : defaultTableDataRenderer(row, col)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export function EditButton({ href }: { href: string }) {
    return (
        <Link href={href}>
            <button className="px-2 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
                Edit
            </button>
        </Link>
    )
}