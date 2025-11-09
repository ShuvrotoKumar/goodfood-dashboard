"use client";
import { X } from "lucide-react";

export function ConfirmModal({ open, title, description, confirmText = "Confirm", tone = "danger", onClose, onConfirm }:{
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  tone?: "danger" | "default";
  onClose: () => void;
  onConfirm: () => void;
}){
  if(!open) return null;
  const color = tone === "danger" ? "bg-rose-600 hover:bg-rose-500" : "bg-indigo-600 hover:bg-indigo-500";
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <div className="font-semibold">{title}</div>
            <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4"/></button>
          </div>
          <div className="p-4 text-sm text-slate-700 dark:text-slate-300">
            {description}
          </div>
          <div className="p-4 flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Cancel</button>
            <button onClick={onConfirm} className={`px-3 py-1.5 rounded-lg text-white ${color}`}>{confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
