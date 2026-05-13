import { AnimatePresence, motion } from "framer-motion";

function LoadingOverlay({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-xl rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.23em] text-brand-peach/85">AI Deep Analysis</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Scanning resume intelligence layers</h3>
            <div className="mt-4 space-y-3">
              <div className="loading-strip" />
              <div className="loading-strip w-5/6" />
              <div className="loading-strip w-4/6" />
            </div>
            <div className="mt-4 flex gap-2"><span className="pulse-node" /><span className="pulse-node" /><span className="pulse-node" /><span className="pulse-node" /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingOverlay;
