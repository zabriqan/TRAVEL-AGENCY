"use client";

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react'

export default function TypeSwitcher() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const types = ['domestic', 'international', 'umrah'];
   const [pending, start] = useTransition();

   const urlParamType = searchParams.get('type');

   return (
      <div className={clsx('flex flex-col gap-0.5 text-sm md:text-base', { 'opacity-40 cursor-not-allowed': pending })}>
         Filters:
         <div className="flex items-center gap-1.5">
            {types.map(type => (
               <button
                  key={type}
                  disabled={pending}
                  onClick={() => {
                     start(() => {
                        const params = new URLSearchParams(window.location.search);
                        if (urlParamType === type) {
                           params.delete('type');
                        } else {
                           params.set('type', type);
                        }
                        router.push(`?${params.toString()}`);
                     })
                  }}
                  className={clsx('capitalize font-medium px-3.5 py-1 rounded-full transition', urlParamType === type ? 'bg-primary hover:bg-primary-dark text-white' : 'bg-gray-200 hover:bg-gray-300')}
               >
                  {type}
               </button>
            ))}
         </div>
      </div>
   )
}
