"use client";
import { useMemo, useState } from "react";
import { PaymentCard, type PayMethod } from "@/components/payment/PaymentCard";
import { PaymentMethodModal } from "@/components/payment/PaymentMethodModal";
import { PaymentHistory, type PaymentRow } from "@/components/payment/PaymentHistory";
import { Toggle } from "@/components/settings/Toggle";

export default function Page(){
  const [methods, setMethods] = useState<PayMethod[]>([
    { id: "pm1", kind: "card", brand: "Visa", last4: "1234", exp: "12/27", default: true },
    { id: "pm2", kind: "paypal", email: "finance@demo.com" },
    { id: "pm3", kind: "bank", bankName: "Local Bank", last4: "8899" },
  ]);
  const [selectedId, setSelectedId] = useState<string>("pm1");
  const [currency, setCurrency] = useState("USD $");
  const [autoPay, setAutoPay] = useState(false);
  const [billing, setBilling] = useState({ street: "123 Food St", city: "Flavor Town", state: "CA", zip: "94016", email: "billing@demo.com", phone: "+1 555-0100" });
  const [modal, setModal] = useState<{ open: boolean; initial?: PayMethod }>({ open: false });
  const [toast, setToast] = useState("");

  const showToast = (t: string) => { setToast(t); setTimeout(()=>setToast(""), 1500); };

  const selected = useMemo(()=> methods.find(m=>m.id===selectedId) || methods[0], [methods, selectedId]);
  const setDefault = (id: string) => setMethods(arr => arr.map(m => ({ ...m, default: m.id === id })));
  const remove = (id: string) => { setMethods(arr => arr.filter(m => m.id !== id)); if(selectedId===id && methods.length>1){ setSelectedId(methods.find(m=>m.id!==id)?.id || ""); } showToast("Payment method removed"); };
  const savePm = (pm: PayMethod) => {
    setMethods(arr => {
      const exists = arr.some(x=>x.id===pm.id);
      const next = exists ? arr.map(x=>x.id===pm.id? pm : x) : [pm, ...arr];
      if(pm.default) {
        return next.map(x=> ({ ...x, default: x.id === pm.id }));
      }
      return next;
    });
    setSelectedId(pm.id);
    showToast("Payment method saved");
  };

  const rows: PaymentRow[] = [
    { id: "t1", date: new Date().toISOString(), amount: 5000, method: "Visa •••• 1234", status: "Completed" },
    { id: "t2", date: new Date(Date.now()-86400000).toISOString(), amount: 2999, method: "PayPal finance@demo.com", status: "Failed" },
    { id: "t3", date: new Date(Date.now()-2*86400000).toISOString(), amount: 12000, method: "Local Bank •••• 8899", status: "Completed" },
    { id: "t4", date: new Date(Date.now()-3*86400000).toISOString(), amount: 7999, method: "Visa •••• 1234", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Payment Settings</h1>

      {toast && (
        <div className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 text-sm">{toast}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Linked Payment Methods</div>
              <button onClick={()=>setModal({ open: true })} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Add New</button>
            </div>
            <div className="mt-4 grid gap-3">
              {methods.map(m => (
                <div key={m.id} className={`cursor-pointer rounded-lg border ${selected?.id===m.id?'border-indigo-300 dark:border-indigo-800':'border-slate-200 dark:border-slate-700'} p-1`} onClick={()=>setSelectedId(m.id)}>
                  <PaymentCard m={m} onEdit={(id)=>{ const init = methods.find(x=>x.id===id); setModal({ open: true, initial: init }); }} onRemove={remove} onSetDefault={(id)=>{ setDefault(id); showToast("Default payment set"); }} />
                </div>
              ))}
              {methods.length===0 && (
                <div className="text-center text-slate-500">No payment methods yet.</div>
              )}
            </div>
          </div>

          <div className="card p-6">
            <div className="text-lg font-semibold">Billing Information</div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Street</label>
                <input value={billing.street} onChange={(e)=>setBilling({...billing, street: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
              <div>
                <label className="text-sm">City</label>
                <input value={billing.city} onChange={(e)=>setBilling({...billing, city: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
              <div>
                <label className="text-sm">State</label>
                <input value={billing.state} onChange={(e)=>setBilling({...billing, state: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
              <div>
                <label className="text-sm">ZIP Code</label>
                <input value={billing.zip} onChange={(e)=>setBilling({...billing, zip: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
              <div>
                <label className="text-sm">Billing Email</label>
                <input type="email" value={billing.email} onChange={(e)=>setBilling({...billing, email: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
              <div>
                <label className="text-sm">Phone</label>
                <input value={billing.phone} onChange={(e)=>setBilling({...billing, phone: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>showToast("Billing saved")} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Save Changes</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <div className="text-lg font-semibold">Payment Preferences</div>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="text-sm">Default Payment Method</label>
                <select value={methods.find(m=>m.default)?.id || selected?.id} onChange={(e)=>{ setDefault(e.target.value); showToast("Default payment updated"); }} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                  {methods.map(m => (
                    <option key={m.id} value={m.id}>{m.kind==='card'? `${m.brand} •••• ${m.last4}` : m.kind==='paypal'? `PayPal ${m.email}` : `${m.bankName} •••• ${m.last4}`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm">Auto-Pay</label>
                <div className="mt-2"><Toggle checked={autoPay} onChange={(v)=>{ setAutoPay(v); showToast(v? 'Auto-Pay enabled' : 'Auto-Pay disabled'); }} /></div>
                <div className="text-xs text-slate-500 mt-1">Automatically charge for recurring payments.</div>
              </div>
              <div>
                <label className="text-sm">Currency</label>
                <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                  {['USD $','EUR €','GBP £','IDR Rp'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Payment Method Details</div>
              <div className="flex gap-2">
                <button onClick={()=>setModal({ open:true, initial: selected })} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Edit</button>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-700 dark:text-slate-300">
              {selected ? (
                <div className="space-y-1">
                  <div><span className="text-slate-500">Type:</span> {selected.kind}</div>
                  {selected.kind==='card' && <div><span className="text-slate-500">Card:</span> {selected.brand} •••• {selected.last4} (exp {selected.exp})</div>}
                  {selected.kind==='paypal' && <div><span className="text-slate-500">PayPal:</span> {selected.email}</div>}
                  {selected.kind==='bank' && <div><span className="text-slate-500">Bank:</span> {selected.bankName} •••• {selected.last4}</div>}
                </div>
              ) : (
                <div>No payment method selected.</div>
              )}
            </div>
          </div>

          <PaymentHistory rows={rows} />
        </div>
      </div>

      <PaymentMethodModal open={modal.open} initial={modal.initial} onClose={()=>setModal({ open:false })} onSave={savePm} />
    </div>
  );
}
