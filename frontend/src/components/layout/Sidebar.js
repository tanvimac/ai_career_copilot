import { NAV_ITEMS } from "../../lib/navigation";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="glass-panel h-[calc(100vh-2rem)] overflow-hidden rounded-2xl p-4">
        <div className="mb-4 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-peach"><Sparkles className="h-3.5 w-3.5" /> AI Career Copilot</p>
          <h1 className="mt-2 text-xl font-semibold text-white">Career OS</h1>
          <p className="mt-1 text-xs text-brand-text/70">Futuristic career intelligence platform</p>
        </div>

        <div className="space-y-1 overflow-y-auto pb-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const selected = activePage === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 2 }}
                onClick={() => onNavigate(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected ? "border-brand-orange/50 bg-brand-orange/15 text-white" : "border-transparent text-brand-text/80 hover:border-white/10 hover:bg-white/5 hover:text-white"}`}
                type="button"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
