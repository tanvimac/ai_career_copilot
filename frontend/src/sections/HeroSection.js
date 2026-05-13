import { motion } from "framer-motion";

function HeroSection({ file, onFileChange, onAnalyze, isLoading, hasResult }) {
  return (
    <section className="glass-card relative overflow-hidden px-6 py-7 sm:px-10 sm:py-10">
      <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-1 text-xs uppercase tracking-[0.24em] text-cyan-200"
          >
            AI Career Copilot
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Turn your resume into a
            <span className="gradient-text"> career acceleration roadmap.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-2xl text-slate-300"
          >
            Instant scoring, role-fit analytics, detected strengths, and skill-gap intelligence to help you move faster toward your next high-impact role.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-panel rounded-2xl border border-white/15 p-5"
        >
          <p className="text-sm font-medium text-cyan-100">Resume Upload</p>
          <p className="mt-1 text-sm text-slate-300">PDF, DOC, DOCX</p>

          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-cyan-300/40 bg-slate-900/50 px-4 py-6 text-center transition hover:border-cyan-200/70 hover:bg-slate-900/80">
            <span className="text-sm text-slate-200">Drop your file here or click to browse</span>
            <span className="mt-1 text-xs text-slate-400">Max performance with clear skill keywords</span>
            <input
              type="file"
              className="hidden"
              onChange={onFileChange}
              accept=".pdf,.doc,.docx"
            />
          </label>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="max-w-[68%] truncate text-sm text-slate-300">
              {file ? file.name : "No resume selected"}
            </p>
            <button
              type="button"
              onClick={onAnalyze}
              disabled={isLoading}
              className="neon-btn disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Analyzing..." : hasResult ? "Re-analyze" : "Analyze Resume"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
