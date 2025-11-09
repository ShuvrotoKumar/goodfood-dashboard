"use client";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6D83FF", "#A8B1FF", "#E5E7EB"];
const data = [
  { name: "Afternoon", value: 40 },
  { name: "Evening", value: 32 },
  { name: "Morning", value: 28 },
];

function Tip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  const label = p.name as string;
  const value = p.value as number;
  const time = label === "Afternoon" ? "1pm - 4pm" : label === "Morning" ? "7am - 11am" : "6pm - 9pm";
  const orders = label === "Afternoon" ? "1.890 orders" : `${Math.round(value * 60)} orders`;
  return (
    <div className="rounded-xl bg-indigo-700 text-white px-4 py-3 shadow-xl border border-indigo-800">
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-xs opacity-80">{time}</div>
      <div className="mt-1 text-lg font-semibold">{orders}</div>
    </div>
  );
}

export function OrderDonut() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-500">Order Time</div>
          <div className="text-xs text-slate-400 mt-1">From 1-6 Dec, 2020</div>
        </div>
        <button className="text-indigo-600 text-sm hover:underline">View Report</button>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<Tip />} wrapperStyle={{ outline: "none" }} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}} />
            {d.name}
            <span className="ml-auto text-slate-400">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
