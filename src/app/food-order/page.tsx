"use client";
import { useMemo, useState } from "react";
import { ActiveOrderCard, Order } from "@/components/food-order/ActiveOrderCard";
import { MenuCategory, MenuItem } from "@/components/food-order/MenuCategory";
import { HistoryTable, HistoryRow } from "@/components/food-order/HistoryTable";
import { SummaryCard, Summary } from "@/components/food-order/SummaryCard";

const initialOrders: Order[] = [
  {
    id: "1042",
    customer: { name: "Sarah Lee", phone: "+62 812-555-0101" },
    items: [
      { name: "Fresh Salad Bowl", qty: 1 },
      { name: "Chicken Noodles", qty: 2 },
    ],
    status: "Pending",
    total: 165000,
  },
  {
    id: "1041",
    customer: { name: "John Carter" },
    items: [{ name: "Smoothie Fruits", qty: 2 }],
    status: "Preparing",
    total: 90000,
  },
];

const menuData: { title: string; items: MenuItem[] }[] = [
  {
    title: "Main Courses",
    items: [
      { id: "mc1", name: "Chicken Noodles", desc: "Spicy soy sauce", price: 75000, icon: "🍜" },
      { id: "mc2", name: "Fresh Salad Bowl", desc: "Seasonal greens", price: 45000, icon: "🥗" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { id: "ds1", name: "Smoothie Fruits", desc: "Mixed berries", price: 45000, icon: "🍓" },
    ],
  },
];

const historyRows: HistoryRow[] = [
  { id: "1020", date: "2020-12-01", customer: "Michael", items: "Salad, Noodles", status: "Completed", total: 120000 },
  { id: "1021", date: "2020-12-01", customer: "Ariana", items: "Smoothie", status: "Cancelled", total: 45000 },
  { id: "1032", date: "2020-12-02", customer: "Dani", items: "Noodles", status: "Completed", total: 75000 },
];

export default function Page() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [summary, setSummary] = useState<Summary>({ items: [], tip: 0, taxRate: 0.1, paid: false });

  const onAccept = (id: string) => setOrders((os) => os.map(o => o.id === id ? { ...o, status: "Preparing" } : o));
  const onCancel = (id: string) => setOrders((os) => os.filter(o => o.id !== id));
  const onComplete = (id: string) => setOrders((os) => os.map(o => o.id === id ? { ...o, status: "Delivered" } : o));
  const addToOrder = (item: MenuItem) => setSummary((s) => {
    const existing = s.items.find(i => i.id === item.id);
    const nextItems = existing
      ? s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      : [...s.items, { id: item.id, name: item.name, qty: 1, price: item.price }];
    return { ...s, items: nextItems };
  });
  const payNow = () => setSummary((s) => ({ ...s, paid: true }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Food Order</h1>

      {/* Active Orders + Menu + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Orders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map(o => (
              <ActiveOrderCard key={o.id} order={o} onAccept={onAccept} onCancel={onCancel} onComplete={onComplete} />
            ))}
          </div>

          {/* Menu Section */}
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuData.map(cat => (
                <MenuCategory key={cat.title} title={cat.title} items={cat.items} onAdd={addToOrder} />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <SummaryCard data={summary} onPay={payNow} />
        </div>
      </div>

      {/* Order History */}
      <HistoryTable rows={historyRows} />
    </div>
  );
}
