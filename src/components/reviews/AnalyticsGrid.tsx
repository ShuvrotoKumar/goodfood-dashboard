"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const lineData = [
  { d: "Mon", avg: 4.2 },{ d: "Tue", avg: 4.5 },{ d: "Wed", avg: 4.6 },{ d: "Thu", avg: 4.4 },{ d: "Fri", avg: 4.7 },{ d: "Sat", avg: 4.8 },{ d: "Sun", avg: 4.6 },
];
const barData = [
  { item: "Pizza", c: 120 },{ item: "Burger", c: 85 },{ item: "Drinks", c: 60 },{ item: "Salad", c: 35 },
];
const pieData = [
  { name: "Positive", value: 78 },{ name: "Negative", value: 22 },
];
const COLORS = ["#10b981", "#ef4444"];

export function AnalyticsGrid(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card p-4">
        <div className="text-xs text-slate-500 mb-2">Average Rating Over Time</div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="d" stroke="#94a3b8" tickLine={false} axisLine={false}/>
              <YAxis domain={[3.5,5]} hide/>
              <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ fontSize: 12 }}/>
              <Line type="monotone" dataKey="avg" stroke="#f59e0b" strokeWidth={3} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card p-4">
        <div className="text-xs text-slate-500 mb-2">Most Reviewed Items</div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="item" stroke="#94a3b8" tickLine={false} axisLine={false}/>
              <YAxis hide/>
              <Tooltip contentStyle={{ fontSize: 12 }}/>
              <Bar dataKey="c" fill="#6366f1" radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card p-4">
        <div className="text-xs text-slate-500 mb-2">Keyword Cloud (sample)</div>
        <div className="flex flex-wrap gap-2">
          {['fast','tasty','fresh','late','cold','friendly','spicy','packaging'].map(k=> (
            <span key={k} className="px-2 py-1 rounded-full text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">#{k}</span>
          ))}
        </div>
      </div>
      <div className="card p-4">
        <div className="text-xs text-slate-500 mb-2">Positive vs Negative</div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12 }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
