import { motion } from "framer-motion";

function ScoreCard({ score = 0, level = "Unknown", filename = "resume" }) {
  const value = Math.max(0, Math.min(100, Number(score) || 0));
  const circumference = 2 * Math.PI * 68;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <article className="glass-card h-full px-6 py-6 sm:px-7">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Resume Snapshot</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Overall Readiness Score</h3>
      <p className="mt-1 truncate text-sm text-slate-300">{filename}</p>

      <div className="mt-6 grid items-center gap-5 sm:grid-cols-[0.95fr_1.05fr]">
        <div className="relative mx-auto h-44 w-44">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160" role="img" aria-label="Resume score gauge">
            <circle cx="80" cy="80" r="68" fill="none" className="stroke-slate-700/70" strokeWidth="14" />
            <motion.circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              className="stroke-cyan-300"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-semibold text-white">{value}</span>
            <span className="text-xs uppercase tracking-[0.18em] text-cyan-200/85">out of 100</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/90">Candidate Level</p>
            <p className="mt-1 text-lg font-medium text-white">{level}</p>
          </div>
          <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Recommendation</p>
            <p className="mt-1 text-sm text-slate-200">
              Boost core role-aligned skills and re-upload to increase your score trajectory.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ScoreCard;
