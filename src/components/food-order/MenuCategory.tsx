"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";

export type MenuItem = { id: string; name: string; desc?: string; price: number; icon?: string };

export function MenuCategory({ title, items, onAdd }: {
  title: string;
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium">{title}</span>
        {open ? <ChevronDown className="w-4 h-4"/> : <ChevronRight className="w-4 h-4"/>}
      </button>
      {open && (
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {items.map(it => (
            <li key={it.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition">
              {it.icon && <span className="w-7 h-7 grid place-items-center rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600">{it.icon}</span>}
              <div className="flex-1">
                <div className="font-medium">{it.name}</div>
                {it.desc && <div className="text-xs text-slate-500">{it.desc}</div>}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mr-3">IDR {it.price.toLocaleString()}</div>
              <button
                onClick={() => onAdd(it)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 active:scale-[.98] transition"
                aria-label={`Add ${it.name}`}
              >
                <Plus className="w-4 h-4"/> Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
