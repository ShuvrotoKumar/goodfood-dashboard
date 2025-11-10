"use client";
 type Item = { name: string; price: string; img: string };
 const items: Item[] = [
  { name: "Fresh Salad Bowl", price: "IDR 45.000", img: "https://images.unsplash.com/photo-1552803534-426f7a2a54b4?w=64&h=64&fit=crop&auto=format&q=60" },
  { name: "Chicken Noodles", price: "IDR 75.000", img: "https://images.unsplash.com/photo-1604909052743-18a0f5b4f46b?w=64&h=64&fit=crop&auto=format&q=60" },
  { name: "Smoothie Fruits", price: "IDR 45.000", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=64&h=64&fit=crop&auto=format&q=60" },
  { name: "Hot Chicken Wings", price: "IDR 45.000", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=64&h=64&fit=crop&auto=format&q=60" },
];

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">' +
      '<rect width="80" height="80" rx="40" fill="#E5E7EB"/>' +
      '<text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-size="28">🍽️</text>' +
    '</svg>'
  );

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
          {items.map((it: Item) => (
            <li key={it.name} className="flex items-center gap-4 p-4">
              <img
                className="rounded-full object-cover w-10 h-10"
                src={it.img}
                alt={it.name}
                width={40}
                height={40}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== FALLBACK) target.src = FALLBACK;
                }}
              />
              <div className="text-slate-700">{it.name}</div>
              <div className="ml-auto text-slate-500">{it.price}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
