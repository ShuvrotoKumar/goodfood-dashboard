"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Role, UserRow } from "./UserCard";

export function UserModal({ open, initial, onClose, onSave }:{
  open: boolean;
  initial?: UserRow;
  onClose: () => void;
  onSave: (u: UserRow) => void;
}){
  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>(initial?.role || "Manager");
  const [active, setActive] = useState<boolean>(initial?.active ?? true);

  useEffect(()=>{
    if(open){
      setName(initial?.name || "");
      setEmail(initial?.email || "");
      setPhone("");
      setRole(initial?.role || "Manager");
      setActive(initial?.active ?? true);
    }
  },[open, initial]);

  if(!open) return null;

  const canSave = name.trim().length>1 && /.+@.+\..+/.test(email);
  const submit = () => {
    if(!canSave) return;
    const id = initial?.id || Math.random().toString(36).slice(2,7);
    const u: UserRow = { id, name: name.trim(), email: email.trim(), role, active, lastLoginISO: initial?.lastLoginISO || new Date().toISOString(), avatar: initial?.avatar };
    onSave(u);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="font-semibold">{initial? 'Edit User' : 'Add New User'}</div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4"/></button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm">Full Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
          </div>
          <div>
            <label className="text-sm">Role</label>
            <select value={role} onChange={(e)=>setRole(e.target.value as Role)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
              {(['Admin','Manager','Delivery'] as const).map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input id="active" type="checkbox" checked={active} onChange={(e)=>setActive(e.target.checked)} />
            <label htmlFor="active" className="text-sm">Active</label>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Cancel</button>
            <button onClick={submit} className={`px-3 py-1.5 rounded-lg text-white ${canSave? 'bg-indigo-600 hover:bg-indigo-500':'bg-slate-400 cursor-not-allowed'}`}>Save User</button>
          </div>
        </div>
      </div>
    </div>
  );
}
