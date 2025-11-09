"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", href: "/" },
  { label: "Food Order", href: "/food-order" },
  { label: "Manage Menu", href: "/manage-menu" },
  { label: "Customer Review", href: "/customer-review" },
];
const others = [
  { label: "Settings", href: "/settings" },
  { label: "Payment", href: "/payment" },
  { label: "Accounts", href: "/accounts" },
  { label: "Help", href: "/help" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="bg-sidebar dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 border-l-2 border-l-[#3B82F6] p-4">
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white grid place-items-center font-bold">G</div>
        <div className="font-semibold">GOODFOOD</div>
      </div>
      <nav className="mt-6 space-y-6 text-slate-600 dark:text-slate-300">
        <div>
          <div className="px-2 text-xs uppercase text-slate-400 dark:text-slate-500 mb-2">Menu</div>
          <ul className="space-y-1">
            {menu.map((i) => {
              const active = i.href === "/" ? pathname === "/" : pathname?.startsWith(i.href);
              return (
                <li key={i.href}>
                  <Link href={i.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-300' : 'hover:bg-white dark:hover:bg-slate-900'}`}>
                    <span className={`inline-flex w-5 h-5 rounded-md border ${active ? 'bg-indigo-600 border-indigo-600' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'}`}></span>
                    <span>{i.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="px-2 text-xs uppercase text-slate-400 dark:text-slate-500 mb-2">Others</div>
          <ul className="space-y-1">
            {others.map((i) => {
              const active = pathname?.startsWith(i.href);
              return (
                <li key={i.href}>
                  <Link href={i.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-indigo-50 text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-300' : 'hover:bg-white dark:hover:bg-slate-900'}`}>
                    <span className={`inline-flex w-5 h-5 rounded-md border ${active ? 'bg-indigo-600 border-indigo-600' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'}`}></span>
                    <span>{i.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
