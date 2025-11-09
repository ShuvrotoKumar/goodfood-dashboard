import { Search, ChevronDown, Bell, Menu } from "lucide-react";

type Props = { onMenu?: () => void };

export function Topbar({ onMenu }: Props) {
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
          <div className="flex items-center justify-end space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-200 grid place-items-center">🍔</div>
            <div className="text-sm">Delicious Burger</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
}
