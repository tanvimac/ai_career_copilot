import { motion } from "framer-motion";

function CareerMatches({ careerMatches = {} }) {
  const entries = Object.entries(careerMatches).sort((a, b) => b[1] - a[1]);

  return (
    <article className="glass-card h-full px-6 py-6 sm:px-7">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Career Match Analytics</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Role Alignment Heatmap</h3>

      <div className="mt-6 space-y-4">
        {entries.length > 0 ? (
          entries.map(([role, value], index) => {
            const clamped = Math.max(0, Math.min(100, Number(value) || 0));
            return (
              <div key={role}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-100">{role}</p>
                  <p className="text-sm font-semibold text-cyan-200">{clamped}%</p>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800/90">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${clamped}%` }}
                    transition={{ delay: index * 0.08, duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 via-cyan-300 to-blue-400"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-300">No role matches available yet.</p>
        )}
      </div>
    </article>
  );
}

export default CareerMatches;
