"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export type FAQ = { q: string; a: string };

export function FAQAccordion({ items }: { items: FAQ[] }){
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="card p-4">
      <div className="text-lg font-semibold mb-2">FAQ</div>
      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={i}>
              <button onClick={()=>setOpen(isOpen? null : i)} className="w-full flex items-center justify-between py-3 text-left">
                <span className="font-medium">{it.q}</span>
                {isOpen ? <Minus className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
              </button>
              {isOpen && (
                <div className="pb-4 text-sm text-slate-600 dark:text-slate-300">{it.a}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
