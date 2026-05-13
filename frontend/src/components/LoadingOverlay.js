import { AnimatePresence, motion } from "framer-motion";

function LoadingOverlay({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink-950/70 px-6 backdrop-blur-sm"
        >
          <div className="glass-card w-full max-w-lg px-6 py-6">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">AI Engine</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Analyzing your resume</h3>
            <p className="mt-2 text-sm text-slate-300">Extracting skills, computing role fit, and building your career intelligence dashboard.</p>

            <div className="mt-5 flex gap-2">
              <div className="loader-dot" />
              <div className="loader-dot" />
              <div className="loader-dot" />
            </div>

            <div className="mt-5 space-y-3">
              <div className="skeleton h-3 w-5/6" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-4/6" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingOverlay;
