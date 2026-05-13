import { Bell, Flame, Search } from "lucide-react";

function Topbar({ user }) {
  return (
    <header className="glass-panel mb-4 flex items-center justify-between rounded-2xl p-4">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-brand-text/75">
        <Search className="h-4 w-4" />
        Search modules, insights, roadmaps...
      </div>
      <div className="flex items-center gap-3">
        <button className="icon-chip" type="button"><Bell className="h-4 w-4" /></button>
        <div className="icon-chip flex items-center gap-2 text-brand-peach"><Flame className="h-4 w-4" /> {user.streak} day streak</div>
        <div className="rounded-xl border border-brand-magenta/40 bg-brand-magenta/15 px-3 py-2 text-sm text-white">
          {user.name} · {user.plan}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
