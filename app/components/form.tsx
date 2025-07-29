"use client";

import { Fragment } from "react";
import { Field, Label } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Button from "./button"; // ⬅️ Import your reusable Button

type FieldType = {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "tel" | "select" | "textarea";
  placeholder?: string;
  rows?: number;
  options?: string[]; // for select dropdown
  required?: boolean;
};

type FormProps = {
  fields: FieldType[];
  onSubmit: (data: Record<string, string>) => void;
  submitText?: string;
  className?: string;
  btnClassName?: string;
};

export default function Form({
  fields,
  onSubmit,
  submitText = "Submit",
  className,
  btnClassName
}: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
                  <option key={opt} value={opt}>
                    {opt}
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
          </Field>
        </Fragment>
      ))}

      {/* Reusable Button instead of <button> */}
      <Button type="submit" variant="primary" className={btnClassName}>
        {submitText}
      </Button>
    </form>
  );
}
