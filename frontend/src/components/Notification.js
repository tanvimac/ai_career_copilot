import { AnimatePresence, motion } from "framer-motion";

function Notification({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-md rounded-xl border border-rose-300/40 bg-rose-500/20 p-4 text-rose-50 shadow-2xl backdrop-blur"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm">{message}</p>
            <button type="button" onClick={onClose} className="rounded bg-rose-200/20 px-2 py-0.5 text-xs font-semibold hover:bg-rose-200/30">
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;
