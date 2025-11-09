"use client";
import { CheckCircle2, Clock3, Loader2, Phone, XCircle } from "lucide-react";

type Item = { name: string; qty: number };
export type Order = {
  id: string;
  customer: { name: string; phone?: string };
  items: Item[];
  status: "Pending" | "Preparing" | "Delivered";
  total: number;
};

export function ActiveOrderCard({ order, onAccept, onCancel, onComplete }: {
  order: Order;
  onAccept: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  const statusColor = order.status === "Pending" ? "bg-amber-400" : order.status === "Preparing" ? "bg-indigo-500" : "bg-emerald-500";
  const statusWidth = order.status === "Pending" ? "w-1/3" : order.status === "Preparing" ? "w-2/3" : "w-full";
  return (
    <div className="card p-5 flex flex-col gap-4 transition hover:shadow-md dark:hover:shadow-none">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Order #{order.id}</div>
        <div className="text-sm text-slate-500 flex items-center gap-2">
          <Phone className="w-4 h-4" /> {order.customer.phone ?? ""}
        </div>
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300">{order.customer.name}</div>
      <ul className="text-sm space-y-1">
        {order.items.map((it, idx) => (
          <li key={idx} className="flex"><span className="w-8 text-slate-500">x{it.qty}</span>{it.name}</li>
        ))}
      </ul>
      <div className="h-2 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full ${statusWidth} ${statusColor}`}></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">IDR {order.total.toLocaleString()}</div>
        <div className="flex gap-2">
          {order.status === "Pending" && (
            <button onClick={() => onAccept(order.id)} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition inline-flex items-center gap-1 text-sm"><Loader2 className="w-4 h-4"/> Accept</button>
          )}
          {order.status !== "Delivered" && (
            <button onClick={() => onCancel(order.id)} className="px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition inline-flex items-center gap-1 text-sm"><XCircle className="w-4 h-4"/> Cancel</button>
          )}
          {order.status !== "Delivered" && (
            <button onClick={() => onComplete(order.id)} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition inline-flex items-center gap-1 text-sm"><CheckCircle2 className="w-4 h-4"/> Complete</button>
          )}
          {order.status === "Delivered" && (
            <span className="inline-flex items-center gap-1 text-emerald-600 text-sm"><CheckCircle2 className="w-4 h-4"/> Delivered</span>
          )}
        </div>
      </div>
    </div>
  );
}
