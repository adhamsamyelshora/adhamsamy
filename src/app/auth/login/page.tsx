'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [error, setError] = useState('');
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    const result = await signIn('credentials', { ...values, callbackUrl: '/dashboard', redirect: false });
    if (result?.error) setError('Invalid credentials');
    if (result?.ok) window.location.href = '/dashboard';
  };

  return (
    <main className="mx-auto mt-20 max-w-md rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Login</h2>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <input className="w-full rounded border p-2" placeholder="Email" {...form.register('email')} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" {...form.register('password')} />
        {error && <p className="text-red-500">{error}</p>}
        <button className="rounded bg-black px-4 py-2 text-white" type="submit">Sign in</button>
      </form>
      <Link className="mt-3 inline-block underline" href="/auth/register">Register</Link>
    </main>
  );
}
