import { motion } from "framer-motion";
import { CAREER_PATHS } from "../../data/careerPaths";

function InterestSelector({ selectedPaths, onTogglePath }) {
  return (
    <section className="panel-glass px-6 py-7 sm:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-peach/80">Step 1</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">What career paths excite you most?</h2>
          <p className="mt-1 text-sm text-brand-cream/75">Choose multiple to shape your AI mentor strategy.</p>
        </div>
        <div className="rounded-full border border-brand-magenta/35 bg-brand-magenta/15 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-brand-peach">
          {selectedPaths.length} Selected
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CAREER_PATHS.map((path, idx) => {
          const isSelected = selectedPaths.includes(path.label);
          const Icon = path.icon;
          return (
            <motion.button
              key={path.id}
              type="button"
              onClick={() => onTogglePath(path.label)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? "border-brand-peach/60 bg-brand-peach/15 shadow-[0_0_26px_rgba(255,180,138,0.35)]"
                  : "border-white/10 bg-black/25 hover:border-brand-magenta/45 hover:bg-black/35"
              }`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 transition group-hover:opacity-100`} />
              <div className="relative">
                <Icon className={`h-5 w-5 ${isSelected ? "text-brand-peach" : "text-brand-cream/70"}`} />
                <p className="mt-3 font-medium text-white">{path.label}</p>
                <p className="mt-1 text-xs text-brand-cream/70">AI-tailored mentorship tracks</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export default InterestSelector;
