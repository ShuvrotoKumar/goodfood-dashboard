"use client";
import { useMemo, useState } from "react";

export type PaymentRow = {
  id: string;
  date: string; // ISO
  amount: number; // cents or smallest unit
  method: string; // label
  status: "Completed" | "Failed" | "Pending";
};

export function PaymentHistory({ rows }: { rows: PaymentRow[] }){
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | PaymentRow["status"]>("All");
  const filtered = useMemo(()=>{
    const term = q.toLowerCase();
    return rows.filter(r => {
      const s = status === "All" || r.status === status;
      const m = [r.method, r.status, r.amount.toString()].join(" ").toLowerCase().includes(term);
      return s && m;
    });
  },[rows,q,status]);
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 flex-wrap">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search amount or method" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2"/>
        <select value={status} onChange={(e)=>setStatus(e.target.value as any)} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2">
          {(["All","Completed","Failed","Pending"] as const).map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Payment Date</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Payment Method</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="py-2">{new Date(r.date).toLocaleDateString()}</td>
                <td className="py-2">{formatCurrency(r.amount)}</td>
                <td className="py-2">{r.method}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${r.status==='Completed'?'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300': r.status==='Failed'?'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300':'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>{r.status}</span>
                </td>
              </tr>
            ))}
            {filtered.length===0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-500">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatCurrency(cents: number){
  // Simple USD-ish formatter; adapt as needed
  return `$${(cents/100).toFixed(2)}`;
}
