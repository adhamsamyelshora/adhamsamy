'use client';

import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-end gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} type="button">
        Toggle theme
      </Button>
      <Button onClick={() => signOut({ callbackUrl: '/auth/login' })} type="button">
        Logout
      </Button>
    </header>
  );
}
