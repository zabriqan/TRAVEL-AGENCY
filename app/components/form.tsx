"use client";

import { FormEventHandler, Fragment } from "react";
import { Field, Label } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Button from "./button"; // ⬅️ Import your reusable Button

type FieldType = {
  id: string;
  label: string;
  type?: "text" | "email" | "number" | "password" | "tel" | "select" | "textarea";
  placeholder?: string;
  rows?: number;
  options?: string[]; // for select dropdown
  required?: boolean;
  error?: { errors: any };
};

type FormProps = {
  fields: FieldType[];
  onSubmit?: FormEventHandler<HTMLFormElement>;
  action?: string | ((formData: FormData) => void | Promise<void>) | undefined;
  className?: string;
  button: {
    className?: string;
    children?: React.ReactNode | string;
    type?: "submit" | "button" | "reset";
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
  }
};

export default function Form({
  fields,
  onSubmit,
  action,
  className,
  button
}: FormProps) {

  return (
    <form
      action={action}
      onSubmit={onSubmit}
      className={twMerge("space-y-3", className)}
    >
      {fields.map((field) => (
        <Fragment key={field.id}>
          <Field className="flex flex-col gap-1">
            <Label htmlFor={field.id} className="text-sm font-medium text-gray-700">
              {field.label}
            </Label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                rows={field.rows ?? 3}
                className="border border-gray-300 focus:border-primary transition rounded px-3 py-1.5 outline-none"
              />
            ) : field.type === "select" && field.options ? (
              <select
                id={field.id}
                name={field.id}
                required={field.required}
                className="border border-gray-300 focus:border-primary transition rounded px-3 py-1.5 outline-none"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt} className="text-sm">
                    {opt.toUpperCase()}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                className="border border-gray-300 focus:border-primary transition rounded px-3 py-1.5 outline-none"
              />
            )}
            {field.error && <span className='text-xs text-red-500'>{String(field.error?.errors)}</span>}
          </Field>
        </Fragment>
      ))}

      {/* Reusable Button instead of <button> */}
      <Button disabled={button.disabled} type={button.type} variant={button.variant} size={button.size} className={button.className}>
        {button.children || "Submit"}
      </Button>
    </form>
  );
}
