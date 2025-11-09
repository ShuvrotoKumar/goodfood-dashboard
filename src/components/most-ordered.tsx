import Image from "next/image";

const items = [
  { name: "Fresh Salad Bowl", price: "IDR 45.000", img: "https://images.unsplash.com/photo-1552803534-426f7a2a54b4?w=64&q=60" },
  { name: "Chicken Noodles", price: "IDR 75.000", img: "https://images.unsplash.com/photo-1604909052743-18a0f5b4f46b?w=64&q=60" },
  { name: "Smoothie Fruits", price: "IDR 45.000", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=64&q=60" },
  { name: "Hot Chicken Wings", price: "IDR 45.000", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=64&q=60" },
];

export function MostOrdered() {
  return (
    <div className="grid grid-cols-2 gap-0">
      <div className="p-6">
        <div className="text-sm text-slate-500">Most Ordered Food</div>
        <div className="text-xs text-slate-400">Adipisicing elit, sed do eiusmod tempor</div>
      </div>
      <div className="p-6 text-right">
        <button className="text-indigo-600 bg-indigo-50/70 border border-indigo-100 hover:bg-indigo-50 transition text-sm px-3 py-1 rounded-lg">View Report</button>
      </div>
      <div className="col-span-2 border-t border-slate-100" />
      <div className="col-span-2">
        <ul className="divide-y divide-slate-100">
          {items.map((it) => (
            <li key={it.name} className="flex items-center gap-4 p-4">
              <Image className="rounded-full object-cover" src={it.img} alt={it.name} width={40} height={40} unoptimized />
              <div className="text-slate-700">{it.name}</div>
              <div className="ml-auto text-slate-500">{it.price}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
