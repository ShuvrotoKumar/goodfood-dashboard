"use client";
import { useMemo, useState } from "react";
import { ManageFilters, Filters } from "@/components/manage-menu/ManageFilters";
import { MenuItemCard, MenuCardItem } from "@/components/manage-menu/MenuItemCard";
import { ItemModal, ItemForm } from "@/components/manage-menu/ItemModal";

const seedItems: MenuCardItem[] = [
  { id: "1", name: "Margherita Pizza", desc: "Classic cheese & tomato", price: 120000, category: "Mains", available: true },
  { id: "2", name: "Chicken Noodles", desc: "Spicy soy sauce", price: 75000, category: "Mains", available: true },
  { id: "3", name: "Fresh Salad Bowl", desc: "Seasonal greens", price: 45000, category: "Starters", available: true },
  { id: "4", name: "Smoothie Fruits", desc: "Mixed berries", price: 45000, category: "Desserts", available: true },
  { id: "5", name: "Iced Tea", desc: "Lemon & mint", price: 25000, category: "Drinks", available: false },
];

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"] as const;

export default function Page() {
  const [items, setItems] = useState<MenuCardItem[]>(seedItems);
  const [filters, setFilters] = useState<Filters>({ q: "", category: "all", availability: "all" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuCardItem | undefined>(undefined);

  const filtered = useMemo(() => {
    const q = filters.q.toLowerCase();
    return items.filter((i) => {
      const matchQ = [i.name, i.desc, i.category].join(" ").toLowerCase().includes(q);
      const matchC = filters.category === "all" || i.category.toLowerCase() === filters.category.toLowerCase();
      const matchA = filters.availability === "all" || (filters.availability === "available" ? i.available : !i.available);
      return matchQ && matchC && matchA;
    });
  }, [items, filters]);

  const onToggle = (id: string, next: boolean) => setItems((arr) => arr.map(i => i.id === id ? { ...i, available: next } : i));
  const onDelete = (id: string) => setItems((arr) => arr.filter(i => i.id !== id));
  const onEdit = (id: string) => {
    setEditing(items.find(i => i.id === id));
    setModalOpen(true);
  };
  const openAdd = () => { setEditing(undefined); setModalOpen(true); };

  const onSave = (data: ItemForm) => {
    if (editing) {
      setItems((arr) => arr.map(i => i.id === editing.id ? { ...i, ...data, id: editing.id } as MenuCardItem : i));
    } else {
      const id = Math.random().toString(36).slice(2, 8);
      setItems((arr) => [{ id, name: data.name, desc: data.desc, price: data.price, category: data.category, image: data.image, available: data.available }, ...arr]);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manage Menu</h1>

      <ManageFilters
        value={filters}
        categories={["Starters", "Mains", "Desserts", "Drinks"]}
        onChange={setFilters}
        onAdd={openAdd}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((it) => (
          <MenuItemCard key={it.id} item={it} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full card p-6 text-center text-slate-500">No items match your filters.</div>
        )}
      </div>

      {/* Optional analytics snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4"><div className="text-sm text-slate-500">Top-Selling</div><div className="text-lg font-semibold mt-1">Chicken Noodles</div></div>
        <div className="card p-4"><div className="text-sm text-slate-500">Least Popular</div><div className="text-lg font-semibold mt-1">Iced Tea</div></div>
        <div className="card p-4"><div className="text-sm text-slate-500">Avg Price (Mains)</div><div className="text-lg font-semibold mt-1">IDR 97.500</div></div>
      </div>

      <ItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editing ? { id: editing.id, name: editing.name, desc: editing.desc || "", category: editing.category, price: editing.price, image: editing.image, available: editing.available } : undefined}
        onSave={onSave}
        categories={["Starters", "Mains", "Desserts", "Drinks"]}
      />
    </div>
  );
}
