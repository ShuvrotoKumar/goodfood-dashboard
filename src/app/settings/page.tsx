"use client";
import { useEffect, useMemo, useState } from "react";
import { SettingsSidebar, type SettingsKey } from "@/components/settings/SettingsSidebar";
import { Toggle } from "@/components/settings/Toggle";
import { ChangePasswordModal } from "@/components/settings/ChangePasswordModal";
import { ConfirmModal } from "@/components/settings/ConfirmModal";

type Payment = { id: string; brand: string; last4: string; exp: string; default?: boolean };
type Member = { id: string; name: string; email: string; role: "Admin" | "Manager" | "Delivery" };

export default function Page(){
  const [tab, setTab] = useState<SettingsKey>("account");
  const [name, setName] = useState("Delicious Burger");
  const [email, setEmail] = useState("owner@example.com");
  const [marketing, setMarketing] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [generalNotif, setGeneralNotif] = useState(true);
  const [deliveryNotif, setDeliveryNotif] = useState(true);
  const [customAlerts, setCustomAlerts] = useState(false);
  const [theme, setTheme] = useState<"light"|"dark">("light");
  const [language, setLanguage] = useState("English");
  const [tz, setTz] = useState("UTC");
  const [currency, setCurrency] = useState("USD $");
  const [payments, setPayments] = useState<Payment[]>([
    { id: "pm1", brand: "Visa", last4: "4242", exp: "12/27", default: true },
    { id: "pm2", brand: "Mastercard", last4: "4444", exp: "04/26" },
  ]);
  const [billing, setBilling] = useState({ line1: "123 Food St", city: "Flavor Town", zip: "10001", country: "USA" });
  const [members, setMembers] = useState<Member[]>([
    { id: "u1", name: "Alice Nguyen", email: "alice@demo.com", role: "Admin" },
    { id: "u2", name: "Ben Carter", email: "ben@demo.com", role: "Manager" },
    { id: "u3", name: "Ravi Patel", email: "ravi@demo.com", role: "Delivery" },
  ]);
  const [twoFA, setTwoFA] = useState(false);
  const [ipList, setIpList] = useState<string[]>(["192.168.1.10", "10.0.0.5"]);
  const [dataSharing, setDataSharing] = useState(true);

  const [showPwd, setShowPwd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmRemovePm, setConfirmRemovePm] = useState<{ open: boolean; id?: string }>({ open: false });
  const [toast, setToast] = useState<string>("");

  useEffect(()=>{
    const stored = localStorage.getItem("theme");
    if(stored === "dark" || stored === "light") {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  },[]);
  useEffect(()=>{
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  },[theme]);

  const saveToast = (msg: string) => {
    setToast(msg);
    setTimeout(()=>setToast(""), 1500);
  };

  const addPayment = () => {
    const id = Math.random().toString(36).slice(2,7);
    setPayments(p => [...p, { id, brand: "Visa", last4: String(Math.floor(Math.random()*9000)+1000), exp: "01/28" }]);
    saveToast("Payment method added");
  };
  const removePayment = (id: string) => setPayments(p => p.filter(pm => pm.id !== id));
  const setDefaultPayment = (id: string) => setPayments(p => p.map(pm => ({ ...pm, default: pm.id === id })));
  const addMember = () => setMembers(m => [{ id: Math.random().toString(36).slice(2,7), name: "New Teammate", email: "new@demo.com", role: "Manager" }, ...m]);
  const removeMember = (id: string) => setMembers(m => m.filter(x => x.id !== id));
  const addIP = (ip: string) => { if(!ip) return; setIpList(l => [...l, ip]); };
  const removeIP = (ip: string) => setIpList(l => l.filter(x => x !== ip));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {toast && (
        <div className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 text-sm">{toast}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <div>
          <SettingsSidebar value={tab} onChange={setTab} />
        </div>

        <div className="space-y-6">
          {tab === "account" && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="text-lg font-semibold">Profile Information</div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-[96px_1fr] gap-4 items-center">
                  <div className="w-24 h-24 rounded-full bg-amber-200 grid place-items-center text-3xl">🍔</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-600">Display name</label>
                      <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600">Email</label>
                      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 outline-none" />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button onClick={()=>saveToast("Profile updated") } className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="text-lg font-semibold">Change Password</div>
                <div className="mt-2 text-sm text-slate-600">Update your password regularly to keep your account secure.</div>
                <div className="mt-4">
                  <button onClick={()=>setShowPwd(true)} className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Update Password</button>
                </div>
              </div>

              <div className="card p-6">
                <div className="text-lg font-semibold">Email Preferences</div>
                <div className="mt-4 space-y-3">
                  <Toggle checked={marketing} onChange={setMarketing} label="Receive marketing emails" />
                  <Toggle checked={orderUpdates} onChange={setOrderUpdates} label="Order updates" />
                  <Toggle checked={systemNotifications} onChange={setSystemNotifications} label="System notifications" />
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={()=>saveToast("Email preferences updated")} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Save</button>
                </div>
              </div>

              <div className="card p-6">
                <div className="text-lg font-semibold text-rose-600">Delete Account</div>
                <div className="mt-2 text-sm text-slate-600">Deleting your account is permanent. This action cannot be undone.</div>
                <div className="mt-4">
                  <button onClick={()=>setConfirmDelete(true)} className="px-3 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-500">Delete My Account</button>
                </div>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="text-lg font-semibold">General Notifications</div>
                <div className="mt-4 space-y-3">
                  <Toggle checked={generalNotif} onChange={setGeneralNotif} label="Enable general notifications (orders, payments, reviews)" />
                </div>
              </div>
              <div className="card p-6">
                <div className="text-lg font-semibold">Delivery Notifications</div>
                <div className="mt-4 space-y-3">
                  <Toggle checked={deliveryNotif} onChange={setDeliveryNotif} label="Notify when order confirmed, dispatched, completed" />
                </div>
              </div>
              <div className="card p-6">
                <div className="text-lg font-semibold">Custom Alerts</div>
                <div className="mt-4 space-y-3">
                  <Toggle checked={customAlerts} onChange={setCustomAlerts} label="Low stock alert / High-volume orders" />
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={()=>saveToast("Notification settings updated")} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Save</button>
                </div>
              </div>
            </div>
          )}

          {tab === "general" && (
            <div className="space-y-6">
              <div className="card p-6 grid gap-4">
                <div>
                  <div className="text-lg font-semibold">Dashboard Theme</div>
                  <div className="mt-3 flex gap-3">
                    <button onClick={()=>setTheme("light")} className={`px-3 py-2 rounded-lg border ${theme==='light'?'border-indigo-300 bg-indigo-50 text-indigo-700':'border-slate-200 dark:border-slate-700'}`}>Light</button>
                    <button onClick={()=>setTheme("dark")} className={`px-3 py-2 rounded-lg border ${theme==='dark'?'border-indigo-300 bg-indigo-50 text-indigo-700':'border-slate-200 dark:border-slate-700'}`}>Dark</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Language</label>
                    <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                      {['English','Spanish','French','Indonesian'].map(l=> <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm">Time Zone</label>
                    <select value={tz} onChange={(e)=>setTz(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                      {['UTC','GMT+7','GMT+8','PST','EST'].map(z=> <option key={z}>{z}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm">Currency</label>
                    <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                      {['USD $','EUR €','IDR Rp','GBP £'].map(c=> <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={()=>saveToast("General settings updated")} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Save</button>
                </div>
              </div>
            </div>
          )}

          {tab === "payment" && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Linked Payment Methods</div>
                  <button onClick={addPayment} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Add Method</button>
                </div>
                <div className="mt-4 grid gap-3">
                  {payments.map(pm => (
                    <div key={pm.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 grid place-items-center text-sm">{pm.brand}</div>
                      <div className="text-sm text-slate-700 dark:text-slate-300">•••• •••• •••• {pm.last4} · exp {pm.exp}</div>
                      <div className="ml-auto flex items-center gap-2">
                        {!pm.default && <button onClick={()=>setDefaultPayment(pm.id)} className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Set Default</button>}
                        <button onClick={()=>setConfirmRemovePm({ open: true, id: pm.id })} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <div className="text-lg font-semibold">Billing Address</div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Address</label>
                    <input value={billing.line1} onChange={(e)=>setBilling({...billing, line1: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
                  </div>
                  <div>
                    <label className="text-sm">City</label>
                    <input value={billing.city} onChange={(e)=>setBilling({...billing, city: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
                  </div>
                  <div>
                    <label className="text-sm">ZIP</label>
                    <input value={billing.zip} onChange={(e)=>setBilling({...billing, zip: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
                  </div>
                  <div>
                    <label className="text-sm">Country</label>
                    <input value={billing.country} onChange={(e)=>setBilling({...billing, country: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={()=>saveToast("Billing updated")} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Save</button>
                </div>
              </div>
            </div>
          )}

          {tab === "team" && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Team Members</div>
                  <button onClick={addMember} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Add Member</button>
                </div>
                <div className="mt-4 grid gap-3">
                  {members.map(m => (
                    <div key={m.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 grid place-items-center">{m.name[0]}</div>
                      <div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <div className="text-xs text-slate-500">{m.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select value={m.role} onChange={(e)=>setMembers(arr=>arr.map(x=>x.id===m.id?{...x, role: e.target.value as Member["role"]}:x))} className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 text-sm">
                          {(['Admin','Manager','Delivery'] as const).map(r=> <option key={r}>{r}</option>)}
                        </select>
                        <span className={`px-2 py-1 rounded-full text-xs ${m.role==='Admin'?'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300': m.role==='Manager'?'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300':'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'}`}>{m.role}</span>
                        <button onClick={()=>removeMember(m.id)} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <div className="text-lg font-semibold">Account Activity</div>
                <div className="mt-3 text-sm text-slate-500">Recent changes will appear here. (Demo placeholder)</div>
              </div>
            </div>
          )}

          {tab === "privacy" && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="text-lg font-semibold">Security</div>
                <div className="mt-4 space-y-3">
                  <Toggle checked={twoFA} onChange={setTwoFA} label="Enable two-factor authentication (2FA)" />
                </div>
              </div>
              <div className="card p-6">
                <div className="text-lg font-semibold">IP Address Whitelisting</div>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500">
                        <th className="py-2">IP Address</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ipList.map(ip => (
                        <tr key={ip} className="border-t border-slate-200 dark:border-slate-800">
                          <td className="py-2">{ip}</td>
                          <td className="py-2 text-right"><button onClick={()=>removeIP(ip)} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Remove</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex gap-2">
                  <input id="newip" placeholder="Add IP e.g. 203.0.113.1" className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2" />
                  <button onClick={()=>{ const el = document.getElementById('newip') as HTMLInputElement|null; addIP(el?.value||''); if(el) el.value=''; }} className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Add</button>
                </div>
              </div>
              <div className="card p-6">
                <div className="text-lg font-semibold">Data Privacy</div>
                <div className="mt-4 space-y-3">
                  <Toggle checked={dataSharing} onChange={setDataSharing} label="Allow anonymous data for analytics & improvements" />
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={()=>saveToast("Data exported") } className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Export Data</button>
                  <button onClick={()=>saveToast("Privacy preferences updated")} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChangePasswordModal open={showPwd} onClose={()=>setShowPwd(false)} onChange={() => saveToast("Password updated") } />
      <ConfirmModal open={confirmDelete} onClose={()=>setConfirmDelete(false)} onConfirm={()=>{ setConfirmDelete(false); saveToast("Account deletion requested"); }} title="Delete Account" description="Are you sure you want to delete your account? This action cannot be undone." confirmText="Delete" tone="danger" />
      <ConfirmModal open={confirmRemovePm.open} onClose={()=>setConfirmRemovePm({ open:false })} onConfirm={()=>{ if(confirmRemovePm.id) removePayment(confirmRemovePm.id); setConfirmRemovePm({ open:false }); saveToast("Payment removed"); }} title="Remove Payment Method" description="This payment method will be removed from your account." confirmText="Remove" />
    </div>
  );
}
