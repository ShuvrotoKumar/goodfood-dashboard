"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export type HistoryRow = {
  id: string;
  date: string;
  customer: string;
  items: string;
  status: "Completed" | "Cancelled";
  total: number;
};

export function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter(r => [r.id, r.date, r.customer, r.items, r.status].join(" ").toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">Order History</div>
        <div className="relative w-64 max-w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by customer, order #, or status"
            className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-9 pr-3 py-2 text-sm outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Order #</th>
              <th className="py-2 pr-4">Customer</th>
              <th className="py-2 pr-4">Items</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-0 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{r.date}</td>
                <td className="py-2 pr-4 font-mono">#{r.id}</td>
                <td className="py-2 pr-4">{r.customer}</td>
                <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{r.items}</td>
                <td className="py-2 pr-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${r.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'}`}>{r.status}</span>
                </td>
                <td className="py-2 pr-0 text-right">IDR {r.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
