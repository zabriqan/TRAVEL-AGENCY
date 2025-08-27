"use client";

import { useState } from 'react'
import { Package } from '@/app/lib/types'
import { ChevronUpIcon, ClockIcon, DownloadIcon, InfoIcon, MapIcon } from 'lucide-react'
import clsx from 'clsx';

export default function TourCard({ pkg }: { pkg: Omit<Package, 'id'> }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='relative h-[28rem] border rounded-xl border-gray-200 overflow-hidden flex items-end'>
      <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${pkg.poster_url})` }}></div>
      <div className='relative bg-white max-h-full overflow-y-auto px-5 py-4 backdrop-blur-md flex flex-col w-full'>
        <div className="mb-0.5">
          <span className="text-xs tracking-normal font-medium capitalize px-2 py-0.5 rounded-full bg-primary text-white">{pkg.package_type}</span>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h2 className='text-xl font-bold'>{pkg.heading}</h2>
            <p className={clsx('-mt-0.5 text-gray-700', isExpanded ? 'line-clamp-2' : 'line-clamp-1')}>{pkg.subheading}</p>
          </div>
          <button onClick={() => setIsExpanded(prev => !prev)} className='flex items-center gap-1 text-nowrap text-sm bg-gray-100 hover:bg-gray-200 transition py-1 px-3.5 rounded-full'>
            {isExpanded ? "Hide details" : "View details"}
            <ChevronUpIcon className={clsx('w-4.5', {'rotate-180': isExpanded})} />
          </button>
        </div>
        {isExpanded && (
          <>
            <div className='font-medium text-gray-700 flex flex-col gap-0.5 mt-3'>
              <p className='flex items-start gap-1.5'>
                <MapIcon className='w-5 flex-none' />
                {pkg.route}
              </p>
              <p className='flex items-start gap-1.5'>
                <ClockIcon className='w-5 flex-none' />
                {pkg.duration}
              </p>
              <div className='flex items-start gap-1.5'>
                <InfoIcon className='w-5 flex-none' />
                <div>
                  {pkg.misc_text.split('\n').map((line, index) => (
                    <><span key={index}>{line}</span><br /></>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a
                href={pkg.pdf_url}
                download={`${pkg.heading.replace(/\s+/g, "")}.pdf`}
                className='text-sm text-blue-500 hover:underline flex items-center gap-1'
              >
                <DownloadIcon className='w-4.5' />
                Download Details
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
