"use client";
import { Filter, RotateCcw, Search } from "lucide-react";

export type ReviewsFilterValue = {
  q: string;
  rating: "all" | 5 | 4 | 3 | 2 | 1;
  range: "7d" | "30d" | "all";
  category: "all" | string;
  sort: "newest" | "oldest" | "high" | "low";
};

export function ReviewsFilters({ value, onChange, onClear, categories }: {
  value: ReviewsFilterValue;
  onChange: (v: ReviewsFilterValue) => void;
  onClear: () => void;
  categories: string[];
}) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <input
            value={value.q}
            onChange={(e)=>onChange({ ...value, q: e.target.value })}
            placeholder="Search name, keyword, or order #"
            className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-3 py-2 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <PillSelect label="Rating" value={String(value.rating)} onChange={(v)=>onChange({ ...value, rating: v==="all"?"all":Number(v) as any })} options={[{v:"all",l:"All"},{v:"5",l:"5★"},{v:"4",l:"4★"},{v:"3",l:"3★"},{v:"2",l:"2★"},{v:"1",l:"1★"}]}/>
          <PillSelect label="Time" value={value.range} onChange={(v)=>onChange({ ...value, range: v as any })} options={[{v:"7d",l:"Last 7d"},{v:"30d",l:"30d"},{v:"all",l:"All"}]}/>
          <PillSelect label="Item" value={value.category} onChange={(v)=>onChange({ ...value, category: v })} options={[{v:"all",l:"All"}, ...categories.map(c=>({v:c,l:c}))]}/>
          <PillSelect label="Sort" value={value.sort} onChange={(v)=>onChange({ ...value, sort: v as any })} options={[{v:"newest",l:"Newest"},{v:"oldest",l:"Oldest"},{v:"high",l:"Highest"},{v:"low",l:"Lowest"}]}/>
          <button onClick={onClear} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"><RotateCcw className="w-4 h-4"/> Clear</button>
        </div>
      </div>
    </div>
  );
}

function PillSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string)=>void; options: { v: string; l: string }[] }){
  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-xs text-slate-500">{label}</span>
      <div className="relative">
        <select value={value} onChange={(e)=>onChange(e.target.value)} className="appearance-none pl-3 pr-8 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
          {options.map(o=> <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
        <Filter className="pointer-events-none w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2"/>
      </div>
    </div>
  );
}
