"use client";
import { Search } from "lucide-react";
import type { Role } from "./UserCard";

export type UsersFilter = {
  q: string;
  status: "All" | "Active" | "Inactive";
  role: "All" | Role;
};

export function UsersFilters({ value, onChange }: { value: UsersFilter; onChange: (v: UsersFilter)=>void }){
  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <input
            value={value.q}
            onChange={(e)=>onChange({ ...value, q: e.target.value })}
            placeholder="Search name, email, or role"
            className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-3 py-2 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
        </div>
        <select value={value.status} onChange={(e)=>onChange({ ...value, status: e.target.value as UsersFilter["status"] })} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2">
          {(["All","Active","Inactive"] as const).map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={value.role} onChange={(e)=>onChange({ ...value, role: e.target.value as UsersFilter["role"] })} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2">
          {(["All","Admin","Manager","Delivery"] as const).map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
    </div>
  );
}
