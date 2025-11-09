"use client";
import { HelpCircle, Wrench, User, CreditCard, Truck, BookOpen, MessageSquare, Search } from "lucide-react";

export type HelpTopic = {
  id: string;
  title: string;
  steps?: string[];
  media?: { screenshot?: string; video?: string };
  related?: string[]; // other topic ids
};

export type HelpCategory = {
  key: string;
  label: string;
  icon: React.ReactNode;
  topics: HelpTopic[];
};

export function HelpCategories({ categories, selectedId, onSelect }: {
  categories: HelpCategory[];
  selectedId?: string;
  onSelect: (topicId: string) => void;
}){
  return (
    <div className="card p-0 overflow-hidden">
      <div className="p-3 border-b border-slate-200 dark:border-slate-800">
        <div className="relative">
          <input placeholder="Search help topics" className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-2 outline-none" onChange={(e)=>{/* parent filters can be added later */}}/>
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
        </div>
      </div>
      <div className="p-2 space-y-2">
        {categories.map(cat => (
          <details key={cat.key} className="bg-slate-50/60 dark:bg-slate-900/40 rounded-lg">
            <summary className="list-none cursor-pointer select-none p-3 flex items-center gap-2">
              <span className="w-6 h-6 text-slate-600">{cat.icon}</span>
              <span className="font-medium">{cat.label}</span>
            </summary>
            <div className="px-2 pb-2">
              <ul className="space-y-1">
                {cat.topics.map(t => (
                  <li key={t.id}>
                    <button onClick={()=>onSelect(t.id)} className={`w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 ${selectedId===t.id? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300':''}`}>{t.title}</button>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export const defaultCategories: HelpCategory[] = [
  { key: 'faq', label: 'General FAQ', icon: <HelpCircle className="w-5 h-5"/>, topics: [
    { id:'t-reset-pass', title:'How to reset your password', steps:["Go to Login page","Click 'Forgot password?'","Enter your registered email","Check your inbox and follow the link"], related:['t-change-pass'] },
    { id:'t-change-pass', title:'How to change your password', steps:["Open Settings > Account","Click 'Change Password'","Enter old & new passwords","Save"], related:['t-reset-pass'] },
  ]},
  { key: 'troubleshoot', label:'Troubleshooting', icon:<Wrench className="w-5 h-5"/>, topics:[
    { id:'t-cannot-login', title:'I cannot log in', steps:["Verify email and password","Use 'Forgot password'","Check CAPS lock","Try a different browser" ] },
  ]},
  { key: 'account', label:'Account & Billing Support', icon:<User className="w-5 h-5"/>, topics:[
    { id:'t-update-profile', title:'Update profile info', steps:["Go to Settings > Account","Edit name and email","Click Save Changes"] },
  ]},
  { key: 'payment', label:'Payment Issues', icon:<CreditCard className="w-5 h-5"/>, topics:[
    { id:'t-update-payment', title:'Update payment method', steps:["Go to Payment Settings","Click Add New or Edit","Fill details and Save"], related:['t-payment-failed'] },
    { id:'t-payment-failed', title:'Payment failed', steps:["Check card details/expiry","Ensure sufficient balance","Try another method","Contact bank if persists"] },
  ]},
  { key: 'orders', label:'Orders & Delivery Help', icon:<Truck className="w-5 h-5"/>, topics:[
    { id:'t-track-order', title:'Track orders', steps:["Open Food Order page","Check Active Orders and History","Use order number to search"] },
  ]},
  { key: 'guides', label:'User Guides & Tutorials', icon:<BookOpen className="w-5 h-5"/>, topics:[
    { id:'t-manage-menu', title:'Manage your menu', steps:["Open Manage Menu","Use filters and Add New Dish","Edit, toggle availability, and save" ] },
  ]},
  { key: 'contact', label:'Contact Support', icon:<MessageSquare className="w-5 h-5"/>, topics:[
    { id:'t-contact', title:'How to contact support', steps:["Use the form in Contact Support section","Email support@yourapp.com","Start live chat from Help page"] },
  ]},
];
