"use client";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { d: "01", a: 24, b: 18 },
  { d: "02", a: 20, b: 22 },
  { d: "03", a: 28, b: 19 },
  { d: "04", a: 26, b: 24 },
  { d: "05", a: 22, b: 20 },
  { d: "06", a: 30, b: 25 },
];

export function OrdersLine() {
  return (
    <div className="space-y-3">
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#eef2f7" vertical={false} />
            <XAxis dataKey="d" stroke="#94a3b8" tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e5e7eb" }} />
            <Line type="monotone" dataKey="a" stroke="#4c6fff" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="b" stroke="#a5b4fc" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500"/> Last 6 days</div>
        <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-200"/> Last Week</div>
      </div>
    </div>
  );
}
