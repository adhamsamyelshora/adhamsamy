import { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <section className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </section>
    </div>
  );
}
