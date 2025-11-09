"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { PayMethod } from "./PaymentCard";

export function PaymentMethodModal({ open, initial, onClose, onSave }: {
  open: boolean;
  initial?: PayMethod;
  onClose: () => void;
  onSave: (pm: PayMethod) => void;
}){
  const [kind, setKind] = useState<PayMethod["kind"]>(initial?.kind || "card");
  const [brand, setBrand] = useState(initial?.brand || "Visa");
  const [last4, setLast4] = useState(initial?.last4 || "");
  const [exp, setExp] = useState(initial?.exp || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [bankName, setBankName] = useState(initial?.bankName || "");
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    if(open){
      setKind(initial?.kind || "card");
      setBrand(initial?.brand || "Visa");
      setLast4(initial?.last4 || "");
      setExp(initial?.exp || "");
      setEmail(initial?.email || "");
      setBankName(initial?.bankName || "");
      setSaving(false);
    }
  },[open, initial]);

  if(!open) return null;

  const valid = () => {
    if(kind === "card") return last4.length===4 && !!brand && /^(0[1-9]|1[0-2])\/(\d{2})$/.test(exp);
    if(kind === "paypal") return /.+@.+\..+/.test(email);
    if(kind === "bank") return !!bankName && last4.length===4;
    return false;
  };

  const submit = () => {
    if(!valid()) return;
    setSaving(true);
    const id = initial?.id || Math.random().toString(36).slice(2,7);
    const pm: PayMethod = { id, kind, brand, last4, exp, email, bankName, default: initial?.default };
    setTimeout(()=>{ onSave(pm); onClose(); }, 600);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="font-semibold">{initial? 'Edit' : 'Add'} Payment Method</div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4"/></button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm">Type</label>
            <select value={kind} onChange={(e)=>setKind(e.target.value as PayMethod["kind"])} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Account</option>
            </select>
          </div>

          {kind === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Card Brand</label>
                <select value={brand} onChange={(e)=>setBrand(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                  {['Visa','Mastercard','Amex'].map(b=> <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm">Last 4 digits</label>
                <input value={last4} onChange={(e)=>setLast4(e.target.value.replace(/\D/g,'' ).slice(0,4))} placeholder="1234" className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
              </div>
              <div>
                <label className="text-sm">Expiry (MM/YY)</label>
                <input value={exp} onChange={(e)=>setExp(e.target.value)} placeholder="12/27" className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
              </div>
            </div>
          )}

          {kind === 'paypal' && (
            <div>
              <label className="text-sm">PayPal Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email@example.com" className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
            </div>
          )}

          {kind === 'bank' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Bank Name</label>
                <input value={bankName} onChange={(e)=>setBankName(e.target.value)} placeholder="Bank name" className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
              </div>
              <div>
                <label className="text-sm">Last 4 digits</label>
                <input value={last4} onChange={(e)=>setLast4(e.target.value.replace(/\D/g,'' ).slice(0,4))} placeholder="1234" className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Cancel</button>
            <button onClick={submit} className={`px-3 py-1.5 rounded-lg text-white ${valid()? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-400 cursor-not-allowed'}`}>{saving? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
