"use client";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function ChangePasswordModal({ open, onClose, onChange }: { open: boolean; onClose: () => void; onChange: (oldP: string, nextP: string) => void; }){
  const [oldP, setOldP] = useState("");
  const [nextP, setNextP] = useState("");
  const [confirm, setConfirm] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(()=>{ if(open){ setOldP(""); setNextP(""); setConfirm(""); setSent(false);} },[open]);

  const strength = useMemo(()=>{
    const v = nextP;
    let s = 0;
    if(v.length >= 8) s++;
    if(/[A-Z]/.test(v)) s++;
    if(/[0-9]/.test(v)) s++;
    if(/[^A-Za-z0-9]/.test(v)) s++;
    return s; // 0-4
  },[nextP]);
  const canSave = oldP.length>0 && nextP.length>=8 && nextP===confirm;

  const submit = () => {
    if(!canSave) return;
    onChange(oldP, nextP);
    setSent(true);
    setTimeout(()=>onClose(), 800);
  };

  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="font-semibold">Change Password</div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4"/></button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm">Old password</label>
            <input type="password" value={oldP} onChange={(e)=>setOldP(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 outline-none"/>
          </div>
          <div>
            <label className="text-sm">New password</label>
            <input type="password" value={nextP} onChange={(e)=>setNextP(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 outline-none"/>
            <div className="mt-2 h-2 bg-slate-100 dark:bg-slate-800 rounded">
              <div className={`h-2 rounded ${strength<=1?'bg-rose-500 w-1/4': strength===2?'bg-amber-500 w-2/4': strength===3?'bg-lime-500 w-3/4':'bg-emerald-500 w-full'}`}/>
            </div>
            <div className="text-xs text-slate-500 mt-1">Use 8+ chars with mix of upper, number, symbol.</div>
          </div>
          <div>
            <label className="text-sm">Confirm new password</label>
            <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 outline-none"/>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Cancel</button>
            <button onClick={submit} className={`px-3 py-1.5 rounded-lg text-white ${canSave? 'bg-indigo-600 hover:bg-indigo-500':'bg-slate-400 cursor-not-allowed'}`}>{sent? 'Saved ✓' : 'Save'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
