"use client";
import { useMemo, useState } from "react";
import { HelpCategories, defaultCategories, type HelpCategory, type HelpTopic } from "@/components/help/HelpCategories";
import { FAQAccordion, type FAQ } from "@/components/help/FAQAccordion";

const faqItems: FAQ[] = [
  { q: "How do I place an order?", a: "Go to the Food Order page, browse the menu categories, add items to your order, and complete payment from the summary." },
  { q: "How do I manage my menu?", a: "Open Manage Menu to add, edit, or toggle availability of dishes. Use filters and the Add New button." },
  { q: "What payment methods are supported?", a: "Cards (Visa/Mastercard), PayPal, and bank transfers. Configure in Payment Settings." },
  { q: "How do I reset my password?", a: "From the login screen, click 'Forgot password?' and follow the email instructions." },
];

export default function Page(){
  const [cats] = useState<HelpCategory[]>(defaultCategories);
  // Default to first topic
  const first = cats[0]?.topics[0]?.id;
  const [selectedId, setSelectedId] = useState<string | undefined>(first);
  const topicsById = useMemo(()=>{
    const map: Record<string, HelpTopic> = {};
    cats.forEach(c => c.topics.forEach(t => { map[t.id] = t; }));
    return map;
  },[cats]);
  const selected = selectedId ? topicsById[selectedId] : undefined;

  // Contact form state
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const canSubmit = contact.name.trim() && /.+@.+\..+/.test(contact.email) && contact.message.trim();
  const submit = () => { if(!canSubmit) return; setSent(true); setTimeout(()=>setSent(false), 1500); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Help & Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div>
          <HelpCategories categories={cats} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{selected ? selected.title : "Select a help topic"}</div>
            </div>
            {selected ? (
              <div className="mt-4 space-y-4">
                {selected.steps && (
                  <ol className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    {selected.steps.map((s, i) => (<li key={i}>{s}</li>))}
                  </ol>
                )}
                {selected.media?.screenshot && (
                  <div className="mt-2">
                    <img src={selected.media.screenshot} alt="screenshot" className="rounded-lg border border-slate-200 dark:border-slate-800 mx-auto" />
                    <div className="text-center text-xs text-slate-500 mt-1">Screenshot</div>
                  </div>
                )}
                {selected.media?.video && (
                  <div className="text-sm"><a className="text-indigo-600 hover:underline" href={selected.media.video} target="_blank">Watch video tutorial</a></div>
                )}
                {selected.related && selected.related.length>0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-sm text-slate-500 mb-2">Related Topics</div>
                    <div className="flex flex-wrap gap-2">
                      {selected.related.map(id => (
                        <button key={id} onClick={()=>setSelectedId(id)} className="px-2 py-1 rounded-full text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                          {topicsById[id]?.title || id}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <button onClick={()=>{ const contactEl = document.getElementById('contact-support'); contactEl?.scrollIntoView({ behavior:'smooth' }); }} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Contact Support</button>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-slate-500">Choose a topic from the left to view instructions.</div>
            )}
          </div>

          <FAQAccordion items={faqItems} />

          <div id="contact-support" className="card p-6">
            <div className="text-lg font-semibold">Contact Support</div>
            <div className="mt-2 text-sm text-slate-500">Our team will respond within 24-48 hours.</div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Your Name</label>
                <input value={contact.name} onChange={(e)=>setContact({...contact, name: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input type="email" value={contact.email} onChange={(e)=>setContact({...contact, email: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm">Message</label>
                <textarea rows={4} value={contact.message} onChange={(e)=>setContact({...contact, message: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"/>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>setContact({ name:"", email:"", message:"" })} className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
              <button onClick={submit} className={`px-3 py-2 rounded-lg text-white ${canSubmit? 'bg-indigo-600 hover:bg-indigo-500':'bg-slate-400 cursor-not-allowed'}`}>{sent? 'Submitted ✓' : 'Submit'}</button>
            </div>
            <div className="mt-4 text-sm">
              <div>Customer Support Phone: <span className="font-medium">+1-800-123-4567</span></div>
              <div>Live Chat: <button className="text-indigo-600 hover:underline">Start Chat</button> (demo)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
