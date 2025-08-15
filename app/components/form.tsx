"use client";

import { FormEventHandler, Fragment, ReactNode } from "react";
import { Field, Label } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Button from "./button"; // ⬅️ Import your reusable Button

type FieldType = {
  id: string;
  label?: string;
  type?: "hidden" | "text" | "email" | "number" | "password" | "tel" | "select" | "textarea";
  placeholder?: string;
  rows?: number;
  options?: { value: string; label?: string }[]; // for select dropdown
  required?: boolean;
  error?: { errors: any };
  defaultValue?: string | number;
  value?: string;
  disabled?: boolean;
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
  children?: ReactNode
};

export default function Form({
  fields,
  onSubmit,
  action,
  className,
  button,
  children
}: FormProps) {

  return (
    <form
      action={action}
      onSubmit={onSubmit}
      className={twMerge("space-y-3", className)}
    >
      {fields.map((field) => {
        const isVisible = field.type !== "hidden"
        return (
          <Fragment key={field.id}>
            <Field className="flex flex-col gap-1">
              {isVisible && <Label htmlFor={field.id} className="text-sm font-medium text-gray-700">
                {field.label}
              </Label>}

              {field.type === "textarea" ? (
                <textarea
                  disabled={field.disabled}
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={field.rows ?? 3}
                  defaultValue={field.defaultValue}
                  className="text-sm border border-gray-300 focus:border-primary transition rounded px-2.5 py-1.5 outline-none disabled:opacity-50"
                />
              ) : field.type === "select" && field.options ? (
                <select
                  disabled={field.disabled}
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  defaultValue={field.defaultValue}
                  className="text-sm border border-gray-300 focus:border-primary transition rounded px-2.5 py-1.5 outline-none disabled:opacity-50"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(({ value, label }) => (
                    <option key={value} value={value} className="text-sm">
                      {label ?? value.toUpperCase()}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  disabled={field.disabled}
                  type={field.type || "text"}
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={field.value}
                  defaultValue={field.defaultValue}
                  className="text-sm border border-gray-300 focus:border-primary transition rounded px-2.5 py-1.5 outline-none disabled:opacity-50"
                />
              )}
              {(field.error && isVisible) && <span className='text-xs text-red-500'>{String(field.error?.errors)}</span>}
            </Field>
          </Fragment>
        )
      })}
      {children}

      <Button disabled={button.disabled} type={button.type} variant={button.variant} size={button.size} className={button.className}>
        {button.children || "Submit"}
      </Button>
    </form>
  );
}
