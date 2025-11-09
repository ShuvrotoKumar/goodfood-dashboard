"use client";
import { Plus, Search, Filter } from "lucide-react";

export type Filters = {
  q: string;
  category: string;
  availability: "all" | "available" | "out";
};

export function ManageFilters({ value, categories, onChange, onAdd }: {
  value: Filters;
  categories: string[];
  onChange: (f: Filters) => void;
  onAdd: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="p-4 flex flex-wrap items-center gap-3">
        <div className="relative w-64 max-w-full">
          <input
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            placeholder="Search dishes"
            className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-2 text-sm outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500">Category</label>
          <select
            value={value.category}
            onChange={(e) => onChange({ ...value, category: e.target.value })}
            className="rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm px-2 py-2"
          >
            <option value="all">All</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500">Availability</label>
          <select
            value={value.availability}
            onChange={(e) => onChange({ ...value, availability: e.target.value as Filters["availability"] })}
            className="rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm px-2 py-2"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>

        <div className="ml-auto" />
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-3 py-2 text-sm font-medium shadow hover:shadow-md hover:bg-emerald-500 active:scale-[.99]"
        >
          <Plus className="w-4 h-4"/> Add New Dish
        </button>
      </div>
    </div>
  );
}
