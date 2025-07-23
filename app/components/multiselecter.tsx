'use client';

import { Fragment } from 'react';
import { Listbox, ListboxButton, Transition } from '@headlessui/react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

interface MultiSelectProps {
  options: string[];
  selected: string[];
  setSelected: (value: string[]) => void;
  label?: string;
}

export default function MultiSelect({ options, selected, setSelected, label = 'Select Destinations' }: MultiSelectProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <Listbox value={selected} onChange={setSelected} multiple>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded bg-secondary-light p-4 text-left text-sm shadow-sm">
            <span className="block truncate">
              {selected.length === 0 ? label : selected.join(', ')}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white  text-sm shadow-lg">
              {options.map((option, idx) => (
                <Listbox.Option key={idx} value={option} as={Fragment}>
                  {({ active, selected: isSelected }) => (
                    <li
                      className={`relative cursor-pointer select-none py-2 pl-10 pr-4 list-none ${active ? 'bg-secondary-light text-white' : 'text-gray-700'
                        }`}
                      onClick={() => toggleOption(option)}
                    >
                      <span className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>{option}</span>
                      {isSelected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

