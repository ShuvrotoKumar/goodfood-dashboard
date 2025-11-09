"use client";

export type Summary = {
  items: { id: string; name: string; qty: number; price: number }[];
  taxRate?: number; // 0.1 = 10%
  tip?: number;
  paid?: boolean;
};

export function SummaryCard({ data, onPay }: { data: Summary; onPay: () => void }) {
  const subtotal = data.items.reduce((s, it) => s + it.qty * it.price, 0);
  const tax = Math.round(subtotal * (data.taxRate ?? 0.1));
  const tip = data.tip ?? 0;
  const total = subtotal + tax + tip;
  return (
    <div className="card p-5 sticky top-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${data.paid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>{data.paid ? 'Paid' : 'Unpaid'}</span>
      </div>
      <ul className="divide-y divide-slate-200 dark:divide-slate-800 mb-4">
        {data.items.map(it => (
          <li key={it.id} className="py-2 flex items-center">
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-slate-500">x{it.qty}</div>
            </div>
            <div className="text-sm">IDR {(it.qty * it.price).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>IDR {subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Tax</span><span>IDR {tax.toLocaleString()}</span></div>
        {tip ? <div className="flex justify-between"><span className="text-slate-500">Tip</span><span>IDR {tip.toLocaleString()}</span></div> : null}
        <div className="h-px my-2 bg-slate-200 dark:bg-slate-800" />
        <div className="flex justify-between text-base font-semibold"><span>Total</span><span>IDR {total.toLocaleString()}</span></div>
      </div>
      <button
        onClick={onPay}
        className="mt-4 w-full rounded-xl bg-indigo-600 text-white py-2.5 font-medium shadow hover:shadow-md hover:bg-indigo-500 active:scale-[.99] transition"
      >
        Pay Now
      </button>
    </div>
  );
}
