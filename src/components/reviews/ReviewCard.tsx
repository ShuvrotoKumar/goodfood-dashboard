"use client";
import { MessageCircle, Pin, Trash2, Star } from "lucide-react";
import { useState } from "react";

export type Review = {
  id: string;
  customer: string;
  avatar?: string;
  rating: number; // 1-5
  date: string;
  text: string;
  item: string;
  order: string;
};

export function ReviewCard({ r, onReply, onHide, onPin }: {
  r: Review;
  onReply: (id: string) => void;
  onHide: (id: string) => void;
  onPin: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isPositive = r.rating >= 4;
  const preview = r.text.length > 160 && !expanded ? r.text.slice(0, 160) + "…" : r.text;
  return (
    <div className="card p-4 transition hover:shadow-md dark:hover:shadow-none">
      <div className="flex items-start gap-3">
        <img src={r.avatar || `https://i.pravatar.cc/48?u=${r.id}`} className="w-10 h-10 rounded-full"/>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <div className="font-semibold truncate">{r.customer}</div>
              <div className="text-xs text-slate-500">{new Date(r.date).toLocaleDateString()}</div>
            </div>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${isPositive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'}`}>
              <Star className="w-3.5 h-3.5 text-amber-500"/> {r.rating.toFixed(1)}
            </div>
          </div>
          <div className="mt-2 text-slate-700 dark:text-slate-300">
            {preview} {r.text.length>160 && (
              <button onClick={()=>setExpanded(v=>!v)} className="text-indigo-600 hover:underline ml-1 text-sm">
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
          <div className="mt-2 text-xs text-slate-500">Item: {r.item} · Order #{r.order}</div>
          <div className="mt-3 flex gap-2">
            <button onClick={()=>onReply(r.id)} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 inline-flex items-center gap-1 text-sm"><MessageCircle className="w-4 h-4"/> Reply</button>
            <button onClick={()=>onHide(r.id)} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 inline-flex items-center gap-1 text-sm"><Trash2 className="w-4 h-4"/> Hide</button>
            <button onClick={()=>onPin(r.id)} className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-700 inline-flex items-center gap-1 text-sm"><Pin className="w-4 h-4"/> Pin</button>
          </div>
        </div>
      </div>
    </div>
  );
}
