"use client";

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean)=>void; label?: string }){
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={()=>onChange(!checked)}
      className={`inline-flex items-center gap-2 select-none ${label? '': ''}`}
    >
      <span className={`w-10 h-6 rounded-full transition-colors ${checked? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}> 
        <span className={`block w-5 h-5 bg-white rounded-full shadow -mt-[22px] ml-[2px] transition-transform ${checked? 'translate-x-4' : ''}`}></span>
      </span>
      {label && <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>}
    </button>
  );
}
