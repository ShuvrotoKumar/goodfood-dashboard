"use client";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "01", this: 58, last: 28 },
  { day: "02", this: 42, last: 18 },
  { day: "03", this: 64, last: 30 },
  { day: "04", this: 72, last: 36 },
  { day: "05", this: 86, last: 44 },
  { day: "06", this: 70, last: 36 },
  { day: "07", this: 52, last: 28 },
  { day: "08", this: 80, last: 40 },
  { day: "09", this: 46, last: 24 },
  { day: "10", this: 64, last: 30 },
  { day: "11", this: 90, last: 46 },
  { day: "12", this: 60, last: 26 },
];

export function RevenueChart() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-500">Revenue</div>
          <div className="text-3xl font-semibold">IDR 7.852.000</div>
          <div className="text-xs text-emerald-600 mt-1">▲ 2.1% vs last week</div>
          <div className="text-xs text-slate-400 mt-2">Sales from 1-12 Dec, 2020</div>
        </div>
        <button className="text-indigo-600 text-sm hover:underline">View Report</button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid stroke="#eef2f7" vertical={false} />
            <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis hide />
            <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: 12, borderColor: "#e5e7eb" }} />
            <Bar radius={[6, 6, 0, 0]} dataKey="last" fill="#e5e7eb" />
            <Bar radius={[6, 6, 0, 0]} dataKey="this" fill="#4c6fff">
              <LabelList dataKey="" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500"/> Last 6 days</div>
        <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300"/> Last Week</div>
      </div>
    </div>
  );
}
