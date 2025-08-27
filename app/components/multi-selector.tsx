"use client";

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useState, type Key } from 'react';
import { twMerge } from 'tailwind-merge';

// Helper: pick keys of T whose values match V
type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];

type MultiSelectorProps<
  T,
  KKey extends KeysMatching<T, Key>,
  KDisp extends KeysMatching<T, string>
> = {
  options: T[];
  keyField: KKey;        // value type must be React.Key (string|number)
  displayField: KDisp;   // value type must be string
  multiple?: boolean;
  name?: string;
  className?: string;
};

export default function MultiSelector<
  T,
  KKey extends KeysMatching<T, Key>,
  KDisp extends KeysMatching<T, string>
>({ options, keyField, displayField, multiple, name, className }: MultiSelectorProps<T, KKey, KDisp>) {
  const [query, setQuery] = useState('');
  // keep your existing defaulting logic; you may want to guard empty options in real use
  const [selected, setSelected] = useState<any>(multiple ? [] : options.length ? options[0] : null);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          (option[displayField] as string).toLowerCase().includes(query.toLowerCase())
        );

  return (
    <>
      <Combobox
        multiple={multiple}
        value={selected}
        onChange={(value: any) => setSelected(value)}
        onClose={() => setQuery('')}
      >
        <div className={twMerge('flex text-sm md:text-base gap-1 pl-2.5 md:pl-3.5 pr-1.5 py-1.5 flex-1 rounded-full border border-gray-300 focus-within:border-primary outline-none transition', className)}>
          <ComboboxInput
            displayValue={(value: any | any[]) =>(
              multiple
                ? (value as T[]).map((d) => d[displayField]).join(', ')
                : (value as T | null)?.[displayField]
            ) as string}
            onChange={(event) => setQuery(event.target.value)}
            className={'outline-none min-w-0 flex-1'}
            placeholder={`Select option${multiple ? 's' : ''}`}
          />
          <ComboboxButton className="grid place-items-center">
            <ChevronDownIcon className="size-4.5 text-gray-500" aria-hidden />
          </ComboboxButton>
        </div>

        <ComboboxOptions anchor="bottom" className="border border-gray-300 [--anchor-gap:0.5rem] p-1 rounded-xl empty:invisible bg-white relative z-50">
          {filteredOptions.map((item) => (
            <ComboboxOption
              key={item[keyField] as Key} // already constrained to Key
              value={item}
              className="data-focus:bg-gray-200 cursor-pointer group flex items-center gap-1 rounded-md px-1 py-0.5"
            >
              <CheckIcon className="invisible size-4 group-data-selected:visible" />
              {item[displayField] as string}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>

      {name && <input type="hidden" name={name} value={JSON.stringify(selected)} />}
    </>
  );
}
