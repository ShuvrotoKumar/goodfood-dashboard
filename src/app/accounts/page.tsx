"use client";
import { useMemo, useState } from "react";
import { UsersFilters, type UsersFilter } from "@/components/accounts/UsersFilters";
import { UserCard, type UserRow, type Role } from "@/components/accounts/UserCard";
import { UserModal } from "@/components/accounts/UserModal";
import { ConfirmModal } from "@/components/settings/ConfirmModal";

const seed: UserRow[] = [
  { id: "u1", name: "John Doe", email: "john@demo.com", role: "Admin", active: true, lastLoginISO: new Date(Date.now()-3600_000).toISOString() },
  { id: "u2", name: "Jane Smith", email: "jane@demo.com", role: "Manager", active: true, lastLoginISO: new Date(Date.now()-2*3600_000).toISOString() },
  { id: "u3", name: "Ravi Patel", email: "ravi@demo.com", role: "Delivery", active: false, lastLoginISO: new Date(Date.now()-3*86400_000).toISOString() },
];

const defaultPerms: Record<Role, string[]> = {
  Admin: ["View orders","Edit menu","Manage payments","Manage users","View analytics"],
  Manager: ["View orders","Edit menu","View analytics"],
  Delivery: ["View deliveries"],
};

export default function Page(){
  const [users, setUsers] = useState<UserRow[]>(seed);
  const [activeId, setActiveId] = useState<string>(seed[0].id);
  const [filters, setFilters] = useState<UsersFilter>({ q: "", status: "All", role: "All" });
  const [modal, setModal] = useState<{ open: boolean; initial?: UserRow }>({ open: false });
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; id?: string }>({ open: false });
  const [toast, setToast] = useState("");

  const showToast = (t: string) => { setToast(t); setTimeout(()=>setToast(""), 1400); };

  const visible = useMemo(()=>{
    const term = filters.q.toLowerCase();
    return users.filter(u => {
      const mQ = [u.name,u.email,u.role].join(" ").toLowerCase().includes(term);
      const mS = filters.status === "All" || (filters.status === "Active" ? u.active : !u.active);
      const mR = filters.role === "All" || u.role === filters.role;
      return mQ && mS && mR;
    });
  },[users, filters]);

  const selected = users.find(u => u.id === activeId);
  const selectedPerms = useMemo(()=> new Set(defaultPerms[(selected?.role||"Manager") as Role]), [selected?.role]);
  const [customPerms, setCustomPerms] = useState<Record<string, Set<string>>>({});

  const permsFor = (u: UserRow) => customPerms[u.id] ?? new Set(defaultPerms[u.role]);
  const togglePerm = (p: string) => {
    if(!selected) return;
    setCustomPerms(prev => {
      const cur = new Set(permsFor(selected));
      if(cur.has(p)) cur.delete(p); else cur.add(p);
      return { ...prev, [selected.id]: cur };
    });
  };

  const onSaveUser = (u: UserRow) => {
    setUsers(arr => {
      const exists = arr.some(x=>x.id===u.id);
      return exists ? arr.map(x=>x.id===u.id? u : x) : [u, ...arr];
    });
    setActiveId(u.id);
    showToast("User saved");
  };
  const onDelete = (id: string) => setUsers(arr => arr.filter(u => u.id !== id));

  const updateSelected = (patch: Partial<UserRow>) => {
    if(!selected) return;
    setUsers(arr => arr.map(u => u.id===selected.id ? { ...u, ...patch } : u));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Accounts</h1>

      {toast && (<div className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 text-sm">{toast}</div>)}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card p-0 overflow-hidden">
            <UsersFilters value={filters} onChange={setFilters} />
            <div className="p-4 flex items-center justify-between">
              <div className="text-lg font-semibold">User Accounts</div>
              <button onClick={()=>setModal({ open:true })} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Add New User</button>
            </div>
            <div className="px-4 pb-4 grid gap-3">
              {visible.map(u => (
                <div key={u.id} className={`rounded-lg border ${u.id===activeId?'border-indigo-300 dark:border-indigo-800':'border-slate-200 dark:border-slate-700'} p-1`}>
                  <div onClick={()=>setActiveId(u.id)} className="cursor-pointer">
                    <UserCard u={u} onView={setActiveId} onEdit={(id)=>{ const init = users.find(x=>x.id===id); setModal({ open:true, initial: init }); }} onDelete={(id)=>setConfirmDelete({ open:true, id })} onAssign={(id)=>setActiveId(id)} />
                  </div>
                </div>
              ))}
              {visible.length===0 && (<div className="text-center text-slate-500">No users match your filters.</div>)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">User Details</div>
              {selected && (
                <div className="flex gap-2">
                  <button onClick={()=>setModal({ open:true, initial: selected })} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Edit</button>
                  <button onClick={()=>setConfirmDelete({ open:true, id: selected.id })} className="px-3 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-500">Delete</button>
                </div>
              )}
            </div>
            {selected ? (
              <div className="mt-4 grid gap-4">
                <div className="flex items-center gap-4">
                  <img src={selected.avatar || `https://i.pravatar.cc/80?u=${selected.id}`} className="w-16 h-16 rounded-full"/>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div>
                      <label className="text-sm">Full Name</label>
                      <input value={selected.name} onChange={(e)=>updateSelected({ name: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
                    </div>
                    <div>
                      <label className="text-sm">Email</label>
                      <input type="email" value={selected.email} onChange={(e)=>updateSelected({ email: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
                    </div>
                    <div className="md:col-span-2 text-xs text-slate-500">Last login: {new Date(selected.lastLoginISO).toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm">Role</label>
                  <select value={selected.role} onChange={(e)=>updateSelected({ role: e.target.value as Role })} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                    {(['Admin','Manager','Delivery'] as const).map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Permissions</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Array.from(new Set([...(defaultPerms[selected.role]||[]), ...(permsFor(selected))])).map(p => (
                      <label key={p} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={permsFor(selected).has(p)} onChange={()=>togglePerm(p)} />
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={selected.active} onChange={(e)=>updateSelected({ active: e.target.checked })}/> Active</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" onChange={()=>{}}/> Lock account</label>
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={()=>showToast("Changes saved") } className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Save Changes</button>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-slate-500">Select a user to view details.</div>
            )}
          </div>

          <div className="card p-6">
            <div className="text-lg font-semibold">User Activity Logs</div>
            <div className="mt-2 text-sm text-slate-500">Recent actions will appear here. (Demo placeholder)</div>
          </div>
        </div>
      </div>

      <UserModal open={modal.open} initial={modal.initial} onClose={()=>setModal({ open:false })} onSave={onSaveUser} />
      <ConfirmModal open={confirmDelete.open} onClose={()=>setConfirmDelete({ open:false })} onConfirm={()=>{ if(confirmDelete.id) onDelete(confirmDelete.id); setConfirmDelete({ open:false }); showToast("User deleted"); }} title="Delete User" description="Are you sure you want to delete this user?" confirmText="Delete" tone="danger" />
    </div>
  );
}
