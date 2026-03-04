'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) });
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [message, setMessage] = useState('');
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    const res = await fetch('/api/register', { method: 'POST', body: JSON.stringify(values) });
    setMessage(res.ok ? 'Registered! Go login.' : 'Registration failed');
  };

  return (
    <main className="mx-auto mt-20 max-w-md rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Register</h2>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <input className="w-full rounded border p-2" placeholder="Name" {...form.register('name')} />
        <input className="w-full rounded border p-2" placeholder="Email" {...form.register('email')} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" {...form.register('password')} />
        {message && <p>{message}</p>}
        <button className="rounded bg-black px-4 py-2 text-white" type="submit">Create account</button>
      </form>
      <Link className="mt-3 inline-block underline" href="/auth/login">Back to login</Link>
    </main>
  );
}
