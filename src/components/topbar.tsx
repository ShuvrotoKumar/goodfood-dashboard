"use client";
import { Search, ChevronDown, Bell, Menu, User, Settings, CreditCard, HelpCircle, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = { onMenu?: () => void };

export function Topbar({ onMenu }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="h-16 border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 px-4 md:px-8">
      <div className="h-full flex items-center gap-3 md:gap-6">
        <button
          aria-label="Open menu"
          onClick={onMenu}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="w-full max-w-3xl">
          <div className="relative">
            <input
              placeholder="Search"
              className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-4 py-2 outline-none shadow-sm focus:ring-2 focus:ring-indigo-200"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-5">
          <div className="relative">
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center justify-end space-x-3 group"
            >
              <div className="w-8 h-8 rounded-full bg-amber-200 grid place-items-center">🍔</div>
              <div className="text-sm">Delicious Burger</div>
              <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-700" />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg overflow-hidden z-50">
                <div className="px-3 py-2 text-xs text-slate-500">Signed in as</div>
                <div className="px-3 pb-2 text-sm font-medium">delicious@goodfood.com</div>
                <div className="divider-h" />
                <nav className="py-1">
                  <a href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <User className="w-4 h-4 text-slate-500" /> Profile
                  </a>
                  <a href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <Settings className="w-4 h-4 text-slate-500" /> Settings
                  </a>
                  <a href="/billing" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <CreditCard className="w-4 h-4 text-slate-500" /> Billing
                  </a>
                  <a href="/help" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <HelpCircle className="w-4 h-4 text-slate-500" /> Help
                  </a>
                  <button
                    onClick={async () => {
                      setOpen(false);
                      try { await fetch("/api/logout", { method: "POST" }); } catch {}
                      window.location.href = "/login";
                    }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <LogOut className="w-4 h-4 text-slate-500" /> Logout
                  </button>
                </nav>
              </div>
            )}
          </div>
          <button
            onClick={async () => {
              try {
                await fetch("/api/logout", { method: "POST" });
              } catch {}
              window.location.href = "/login";
            }}
            className="text-sm px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
