"use client";
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";

export type SummaryData = {
  avg: number;
  total: number;
  trend: number; // percent up/down
  dist: { stars: number; pct: number }[]; // e.g., [{stars:5,pct:70}]
  pos: number;
  neg: number;
  snippet: string;
};

export function SummaryInsights({ data }: { data: SummaryData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card p-4 flex items-center gap-4">
        <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2"><Star className="w-5 h-5 text-amber-600"/></div>
        <div>
          <div className="text-xs text-slate-500">Average Rating</div>
          <div className="text-xl font-semibold">{data.avg.toFixed(1)} / 5.0</div>
          <div className="text-xs text-slate-500">{data.total} Reviews</div>
        </div>
        <div className={`ml-auto inline-flex items-center gap-1 text-sm ${data.trend>=0?'text-emerald-600':'text-rose-600'}`}>
          {data.trend>=0 ? <ArrowUpRight className="w-4 h-4"/> : <ArrowDownRight className="w-4 h-4"/>}
          {Math.abs(data.trend)}%
        </div>
      </div>

      <div className="card p-4">
        <div className="text-xs text-slate-500 mb-2">Rating Distribution</div>
        <div className="space-y-2">
          {data.dist.map((d)=> (
            <div key={d.stars} className="flex items-center gap-2">
              <span className="w-8 text-sm">{d.stars}★</span>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded">
                <div className="h-2 bg-indigo-500 rounded" style={{ width: `${d.pct}%`}}/>
              </div>
              <span className="w-10 text-right text-xs text-slate-500">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <div className="text-xs text-slate-500 mb-2">Sentiment</div>
        <div className="flex items-center gap-6">
          <div>
            <div className="text-xs text-slate-500">Positive</div>
            <div className="text-lg font-semibold text-emerald-600">{data.pos}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Negative</div>
            <div className="text-lg font-semibold text-rose-600">{data.neg}</div>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300">
          “{data.snippet}”
        </div>
      </div>
    </div>
  );
}
