import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <header className="glass-panel rounded-2xl px-5 py-3">
      <div className="flex items-center justify-between">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-white"><Sparkles className="h-4 w-4 text-brand-peach" /> AI Career Copilot</p>
        <button type="button" className="cta-btn">Start Analysis</button>
      </div>
    </header>
  );
}

export default Navbar;
