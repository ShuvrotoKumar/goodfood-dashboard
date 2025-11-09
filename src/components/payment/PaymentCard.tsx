"use client";
import { CreditCard, Trash2, Pencil, Banknote, Wallet } from "lucide-react";

export type PayMethod = {
  id: string;
  kind: "card" | "paypal" | "bank";
  brand?: string;         // Visa, Mastercard
  last4?: string;         // 4 digits
  exp?: string;           // MM/YY
  email?: string;         // PayPal email
  bankName?: string;      // Bank name
  default?: boolean;
};

export function PaymentCard({ m, onEdit, onRemove, onSetDefault }: {
  m: PayMethod;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onSetDefault: (id: string) => void;
}){
  const label = m.kind === 'card' ? `${m.brand || 'Card'} •••• ${m.last4}`
              : m.kind === 'paypal' ? `PayPal ${m.email || ''}`
              : `${m.bankName || 'Bank'} •••• ${m.last4 || ''}`;
  const icon = m.kind === 'card' ? <CreditCard className="w-5 h-5"/> : m.kind === 'paypal' ? <Wallet className="w-5 h-5"/> : <Banknote className="w-5 h-5"/>;
  return (
    <div className={`p-4 rounded-lg border border-slate-200 dark:border-slate-700 card-shadow ${m.default? 'ring-1 ring-indigo-200 dark:ring-indigo-800':''}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 grid place-items-center text-slate-600">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{label}</div>
          <div className="text-xs text-slate-500">{m.kind==='card' && m.exp ? `exp ${m.exp}` : ''}</div>
        </div>
        {m.default && <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">Default</span>}
      </div>
      <div className="mt-3 flex gap-2">
        {!m.default && <button onClick={()=>onSetDefault(m.id)} className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Set Default</button>}
        <button onClick={()=>onEdit(m.id)} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 inline-flex items-center gap-1 text-sm"><Pencil className="w-4 h-4"/> Edit</button>
        <button onClick={()=>onRemove(m.id)} className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 inline-flex items-center gap-1 text-sm"><Trash2 className="w-4 h-4"/> Remove</button>
      </div>
    </div>
  );
}
