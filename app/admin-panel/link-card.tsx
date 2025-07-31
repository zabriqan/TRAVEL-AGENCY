"use client";

import Link from 'next/link'
import React from 'react'

type LinkCardProps = {
   title: string;
   subtext: string;
   href: string;
};

export default function LinkCard({ title, subtext, href }: LinkCardProps) {
   return (
      <Link href={href} className='border border-gray-200 hover:bg-gray-100 transition rounded-lg px-4 py-3 flex flex-col'>
         <h6 className='text-lg font-semibold'>{title}</h6>
         <p className='text-sm'>{subtext}</p>
      </Link>
   );
}
