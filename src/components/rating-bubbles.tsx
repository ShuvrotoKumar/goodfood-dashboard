export function RatingBubbles() {
  return (
    <div>
      <div className="mb-4">
        <div className="text-sm text-slate-500">Your Rating</div>
        <div className="text-xs text-slate-400">Lorem ipsum dolor sit amet, consectetur</div>
      </div>
      <div className="flex items-end gap-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-cyan-200/60 border-4 border-white grid place-items-center text-cyan-700 text-sm font-semibold shadow-card">92%</div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-slate-500 text-sm">Packaging</div>
        </div>
        <div className="relative">
          <div className="w-36 h-36 rounded-full bg-orange-300/70 border-4 border-white grid place-items-center text-orange-700 text-xl font-semibold shadow-card">85%</div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-slate-500 text-sm">Food Taste</div>
        </div>
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-indigo-200/70 border-4 border-white grid place-items-center text-indigo-700 text-sm font-semibold shadow-card">85%</div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-slate-500 text-sm">Hygiene</div>
        </div>
      </div>
    </div>
  );
}
