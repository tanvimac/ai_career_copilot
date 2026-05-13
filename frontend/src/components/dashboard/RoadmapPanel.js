import { motion } from "framer-motion";

function RoadmapPanel({ roadmap }) {
  return (
    <article className="panel-glass px-6 py-6">
      <p className="text-xs uppercase tracking-[0.24em] text-brand-peach/80">AI Career Roadmap</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Your 3-Month Learning Trajectory</h3>

      <div className="mt-5 space-y-3">
        {roadmap.map((step, idx) => (
          <motion.div
            key={step.week}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="relative rounded-2xl border border-white/10 bg-black/25 p-4 pl-8"
          >
            <div className="absolute left-3 top-5 h-2.5 w-2.5 rounded-full bg-brand-orange shadow-[0_0_18px_rgba(255,136,87,0.8)]" />
            {idx < roadmap.length - 1 && <div className="absolute left-[15px] top-8 h-[calc(100%-12px)] w-px bg-gradient-to-b from-brand-orange/70 to-transparent" />}
            <p className="text-xs uppercase tracking-[0.18em] text-brand-peach/75">{step.week}</p>
            <p className="mt-1 text-sm font-medium text-white">{step.focus}</p>
          </motion.div>
        ))}
      </div>
    </article>
  );
}

export default RoadmapPanel;
