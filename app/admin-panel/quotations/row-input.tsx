import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export default function RowInput({ type, value, onChange, placeholder }: { type: HTMLInputTypeAttribute, value: string, onChange: ChangeEventHandler<HTMLInputElement>, placeholder?: string }) {
   return <input value={value} onChange={onChange} className='px-2.5 py-1.5 text-sm rounded-md outline-none border border-gray-200 focus:border-primary transition' placeholder={placeholder} type={type} />
}