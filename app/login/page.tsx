"use client";

import { signIn } from '@/app/lib/actions';
import Form from '../components/form';
import { FormEvent, useTransition } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export default function Login() {
  const [isPending, start] = useTransition();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    start(async() => {
      const res = await signIn(fd);
      if (!res.ok) {
        toast.error(res.error || 'Error')
        return;
      }
      toast.success(res.message || 'Success');
      redirect('/admin-panel')
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-80 sm:w-[400px] bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <Form
          fields={[
            {
              id: "email",
              label: "Email",
              type: "email",
              placeholder: "Enter your email",
              required: true,
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter your password",
              required: true,
            },
          ]}
          onSubmit={handleSubmit}
          button={{
            children: "Submit",
            disabled: isPending,
            type: "submit",
          }}
        />
      </div>
    </div>
  );
}

