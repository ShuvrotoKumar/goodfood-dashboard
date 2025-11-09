"use client";

export type SettingsKey = "account" | "notifications" | "general" | "payment" | "team" | "privacy";

const entries: { key: SettingsKey; label: string }[] = [
  { key: "account", label: "Account" },
  { key: "notifications", label: "Notifications" },
  { key: "general", label: "General" },
  { key: "payment", label: "Payment" },
  { key: "team", label: "Team & Permissions" },
  { key: "privacy", label: "Privacy & Security" },
];

export function SettingsSidebar({ value, onChange }: { value: SettingsKey; onChange: (v: SettingsKey)=>void }){
  return (
    <nav className="card p-2 sticky top-4">
      <ul className="space-y-1">
        {entries.map(e=> (
          <li key={e.key}>
            <button
              onClick={()=>onChange(e.key)}
              className={`w-full text-left px-3 py-2 rounded-md transition ${value===e.key ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              {e.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
