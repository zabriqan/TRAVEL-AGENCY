"use client";

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

type LinkCardProps = {
   title: string;
   subtext: string;
   href: string;
};

export default function LinkCard({ title, subtext, href }: LinkCardProps) {
   return (
      <Link href={href} className='border group hover:text-primary border-gray-200 hover:bg-gray-100 transition rounded-lg px-4 py-3 flex flex-col'>
         <div className='flex items-center justify-between gap-2'>
            <h6 className='text-lg font-semibold'>{title}</h6>
            <ChevronRightIcon className='w-5 md:opacity-0 opacity-100 group-hover:opacity-100 transition-[opacity]' />
         </div>
         <p className='text-sm'>{subtext}</p>
      </Link>
   );
}
