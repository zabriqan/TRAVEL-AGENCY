"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { kebabCaseToTitleCase } from '../lib/utils';
import clsx from 'clsx';

export default function Breadcrumbs() {
   const [linkParts, setLinkParts] = useState<({ href: `/${string}`; text: string })[]>([])

   const pathname = usePathname();

   useEffect(() => {
      const parts = pathname.split('/')
      setLinkParts([...(parts.map((part, i) => ({ href: parts.slice(0, i + 1).join('/') as `/${string}`, text: kebabCaseToTitleCase(part) }))).slice(1)])
   }, [pathname])

   if (linkParts.length > 1)
      return (
         <div className='mb-1'>
            {linkParts.map(({ href, text }, i) => (
               <Fragment key={href}>
                  <Link href={href} className={clsx('text-lg font-semibold hover:underline', i === linkParts.length - 1 ? 'text-primary' : 'text-gray-600' )}>
                  {text}
               </Link>
                  { i !== linkParts.length - 1 && <span className='text-lg font-semibold inline-block mx-1'>/</span>}
         </Fragment>
      ))
}
         </div >
      )
}
