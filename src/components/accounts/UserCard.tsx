"use client";
import { Pencil, Trash2, Shield } from "lucide-react";

export type Role = "Admin" | "Manager" | "Delivery";
export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  lastLoginISO: string;
  avatar?: string;
};

export function UserCard({ u, onView, onEdit, onDelete, onAssign }: {
  u: UserRow;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAssign: (id: string) => void;
}){
  return (
    <div className="card p-4 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <img src={u.avatar || `https://i.pravatar.cc/64?u=${u.id}`} className="w-12 h-12 rounded-full object-cover"/>
        <div className="min-w-0">
          <div className="font-semibold truncate">{u.name}</div>
          <div className="text-xs text-slate-500 truncate">{u.email}</div>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full ${u.role==='Admin'?'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300':u.role==='Manager'?'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300':'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'}`}>{u.role}</span>
            <span className={`px-2 py-0.5 rounded-full ${u.active?'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300':'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{u.active? 'Active' : 'Inactive'}</span>
            <span className="text-slate-500">Last login: {timeAgo(u.lastLoginISO)}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={()=>onView(u.id)} className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">View</button>
          <button onClick={()=>onEdit(u.id)} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 inline-flex items-center gap-1 text-sm"><Pencil className="w-4 h-4"/> Edit</button>
          <button onClick={()=>onAssign(u.id)} className="px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 inline-flex items-center gap-1 text-sm"><Shield className="w-4 h-4"/> Assign</button>
          <button onClick={()=>onDelete(u.id)} className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 inline-flex items-center gap-1 text-sm"><Trash2 className="w-4 h-4"/> Delete</button>
        </div>
      </div>
    </div>
  );
}

function timeAgo(iso: string){
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff/86400000); if(d>0) return `${d} day${d>1?'s':''} ago`;
  const h = Math.floor(diff/3600000); if(h>0) return `${h} hour${h>1?'s':''} ago`;
  const m = Math.floor(diff/60000); return `${m} min ago`;
}
