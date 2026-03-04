import Link from 'next/link';

const navItems = [
  ['Dashboard', '/dashboard'],
  ['Food', '/dashboard/food'],
  ['Weight', '/dashboard/weight'],
  ['Tasks', '/dashboard/tasks'],
  ['Money', '/dashboard/money'],
  ['Work', '/dashboard/work'],
  ['Profile', '/dashboard/profile']
];

export function Sidebar() {
  return (
    <aside className="w-60 border-r border-slate-200 p-4 dark:border-slate-800">
      <h1 className="mb-6 text-lg font-semibold">smsm assistant</h1>
      <nav className="space-y-2">
        {navItems.map(([label, href]) => (
          <Link className="block rounded p-2 hover:bg-slate-100 dark:hover:bg-slate-800" href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
