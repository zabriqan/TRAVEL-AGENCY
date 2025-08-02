"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { kebabCaseToTitleCase } from '../lib/utils';
import clsx from 'clsx';
import z from 'zod';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
   const [linkParts, setLinkParts] = useState<({ href: `/${string}`; text: string })[]>([])

   const pathname = usePathname();

   useEffect(() => {
      const parts = pathname.split('/')
      setLinkParts([...(parts.map((part, i) => ({ href: parts.slice(0, i + 1).join('/') as `/${string}`, text: part }))).slice(1)])
   }, [pathname])

   if (linkParts.length > 1)
      return (
         <div className='mb-3 mt-3 flex items-center'>
            {linkParts.map(({ href, text }, i) => (
               <div key={href} className='flex items-center'>
                  <Link href={href} className={clsx('font-semibold block leading-4 hover:underline', i === linkParts.length - 1 ? 'text-primary' : 'text-gray-600')}>
                     {z.uuid().safeParse(text).success ? text : kebabCaseToTitleCase(text)}
                  </Link>
                  {i !== linkParts.length - 1 && <ChevronRight className='w-4.5' />}
               </div>
            ))
            }
         </div >
      )
}
