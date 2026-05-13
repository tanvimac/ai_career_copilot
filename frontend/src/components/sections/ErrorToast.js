import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

function ErrorToast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed right-4 top-4 z-[60] w-[calc(100%-2rem)] max-w-md rounded-xl border border-red-300/40 bg-red-500/15 p-4 text-red-100 backdrop-blur">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <p className="flex-1 text-sm">{message}</p>
            <button type="button" className="rounded bg-white/10 px-2 py-0.5 text-xs" onClick={onClose}>Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ErrorToast;
