'use client';

import { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style
import 'react-date-range/dist/theme/default.css'; // Theme style
import { addDays, format } from 'date-fns';

interface Props {
  selectedRange: Range
  setSelectedRange: Dispatch<SetStateAction<Range>>
}

export default function DateRangePickerBox({ selectedRange, setSelectedRange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (ranges: RangeKeyDict) => {
    setSelectedRange(ranges.selection);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 w-full max-w-sm" ref={ref}>
      <div
        className="flex items-center justify-between cursor-pointer px-4 py-4 rounded shadow-sm text-sm bg-secondary-light"
        onClick={() => setOpen(!open)}
      >
        <span>
          {format(selectedRange.startDate ?? new Date(), 'dd/MM/yyyy')} → {format(selectedRange.endDate ?? addDays(new Date(0), 7), 'dd/MM/yyyy')}
        </span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <div style={{zIndex: 9999}} className="absolute z-50 shadow-lg pt-1 rounded-lg">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={[selectedRange]}
            months={1}
            direction="horizontal"
          />
        </div>
      )}
    </div>
  );
}
