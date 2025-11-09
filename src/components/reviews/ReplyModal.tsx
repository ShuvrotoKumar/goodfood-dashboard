"use client";
import { Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Review } from "./ReviewCard";

export function ReplyModal({ open, review, onClose, onSend }: {
  open: boolean;
  review?: Review;
  onClose: () => void;
  onSend: (id: string, message: string) => void;
}){
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(()=>{ if(open){ setMsg(""); setSent(false);} },[open]);
  if(!open || !review) return null;
  const send = () => {
    if(!msg.trim()) return;
    onSend(review.id, msg.trim());
    setSent(true);
    setTimeout(()=>{ onClose(); }, 800);
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="font-semibold">Reply to Review</div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4"/></button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <img src={review.avatar || `https://i.pravatar.cc/48?u=${review.id}`} className="w-10 h-10 rounded-full"/>
            <div>
              <div className="font-semibold">{review.customer}</div>
              <div className="text-xs text-slate-500">{new Date(review.date).toLocaleString()}</div>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"><Star className="w-3.5 h-3.5"/> {review.rating.toFixed(1)}</div>
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
            {review.text}
          </div>
          <div className="text-xs text-slate-500">Item: {review.item} · Order #{review.order}</div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">Your reply</label>
            <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} rows={4} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 outline-none" placeholder="Type your response..."/>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Cancel</button>
            <button onClick={send} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500">{sent? 'Sent ✓' : 'Send Reply'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
