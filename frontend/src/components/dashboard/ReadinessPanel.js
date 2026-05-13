import { motion } from "framer-motion";

function ReadinessPanel({ result, readiness, topCareer }) {
  return (
    <article className="panel-glass px-6 py-6">
      <p className="text-xs uppercase tracking-[0.24em] text-brand-peach/80">AI Job Readiness Meter</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Readiness Intelligence</h3>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-brand-peach/35 bg-brand-peach/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">Resume Score</p>
          <p className="mt-2 text-5xl font-semibold text-white">{result.score}</p>
          <p className="mt-2 text-sm text-brand-cream/80">Best-fit role: {topCareer}</p>
        </div>

        <div className="space-y-3">
          {readiness.map((item, idx) => (
            <div key={item.metric}>
              <div className="mb-1 flex justify-between text-xs uppercase tracking-[0.15em] text-brand-cream/80">
                <span>{item.metric}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.9, delay: idx * 0.06 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-magenta via-brand-orange to-brand-peach"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ReadinessPanel;
