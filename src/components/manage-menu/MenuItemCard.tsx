"use client";
import { Pencil, Trash2 } from "lucide-react";

export type MenuCardItem = {
  id: string;
  name: string;
  desc?: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
};

export function MenuItemCard({ item, onEdit, onDelete, onToggle }: {
  item: MenuCardItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, next: boolean) => void;
}) {
  return (
    <div className="card overflow-hidden transition hover:shadow-md dark:hover:shadow-none">
      <div className="flex gap-4 p-4">
        <img
          src={item.image || `https://picsum.photos/seed/${item.id}/96/96`}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="truncate">
              <div className="font-semibold truncate">{item.name}</div>
              {item.desc && <div className="text-sm text-slate-500 truncate">{item.desc}</div>}
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 whitespace-nowrap">{item.category}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-indigo-700 dark:text-indigo-300 font-semibold">IDR {item.price.toLocaleString()}</div>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm select-none">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={(e) => onToggle(item.id, e.target.checked)}
                  className="accent-emerald-600 w-4 h-4"
                />
                {item.available ? <span className="text-emerald-600">Available</span> : <span className="text-rose-600">Out</span>}
              </label>
              <button onClick={() => onEdit(item.id)} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 inline-flex items-center gap-1 text-sm">
                <Pencil className="w-4 h-4"/> Edit
              </button>
              <button onClick={() => onDelete(item.id)} className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 inline-flex items-center gap-1 text-sm">
                <Trash2 className="w-4 h-4"/> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
