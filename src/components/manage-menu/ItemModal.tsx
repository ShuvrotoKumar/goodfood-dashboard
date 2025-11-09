"use client";
import { useEffect, useState } from "react";

export type ItemForm = {
  id?: string;
  name: string;
  desc: string;
  category: string;
  price: number;
  image?: string;
  available: boolean;
};

export function ItemModal({ open, onClose, initial, onSave, categories }: {
  open: boolean;
  onClose: () => void;
  initial?: ItemForm;
  onSave: (data: ItemForm) => void;
  categories: string[];
}) {
  const [form, setForm] = useState<ItemForm>(initial ?? { name: "", desc: "", category: categories[0] || "Main", price: 0, image: "", available: true });
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initial ?? { name: "", desc: "", category: categories[0] || "Main", price: 0, image: "", available: true });
      setError("");
    }
  }, [open, initial, categories]);

  if (!open) return null;

  const submit = () => {
    if (!form.name.trim()) return setError("Name is required");
    if (!form.category) return setError("Category is required");
    if (form.price <= 0) return setError("Price must be greater than 0");
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[560px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl overflow-auto">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="text-lg font-semibold">{initial ? "Edit Dish" : "Add New Dish"}</div>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm text-slate-500">Dish Name <span className="text-rose-500">*</span></label>
            <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"/>

            <label className="text-sm text-slate-500">Description</label>
            <textarea value={form.desc} onChange={(e)=>setForm({...form, desc: e.target.value})} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 h-24"/>

            <label className="text-sm text-slate-500">Category <span className="text-rose-500">*</span></label>
            <select value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <label className="text-sm text-slate-500">Price (IDR) <span className="text-rose-500">*</span></label>
            <input type="number" min={0} value={form.price} onChange={(e)=>setForm({...form, price: Number(e.target.value)})} className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"/>

            <label className="inline-flex items-center gap-2 text-sm mt-2">
              <input type="checkbox" checked={form.available} onChange={(e)=>setForm({...form, available: e.target.checked})} className="accent-emerald-600"/>
              Available
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-500">Upload Image</label>
            <input type="url" value={form.image || ""} onChange={(e)=>setForm({...form, image: e.target.value})} placeholder="Paste image URL" className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"/>
            <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-3 text-center text-sm text-slate-500">Drag & drop not implemented (demo) — paste an image URL above.</div>
            {form.image ? <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-lg border border-slate-200 dark:border-slate-800"/> : null}
          </div>
        </div>
        {error && <div className="px-5 text-rose-600 text-sm">{error}</div>}
        <div className="p-5 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
          <button onClick={onClose} className="rounded-lg px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Cancel</button>
          <button onClick={submit} className="rounded-lg px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-500">Save</button>
        </div>
      </div>
    </div>
  );
}
