import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, ArrowRight } from "lucide-react";

function UploadExperience({ file, onFileSelect, onAnalyze, selectedCount, isLoading }) {
  const inputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const dropped = event.dataTransfer.files?.[0];
    onFileSelect(dropped || null);
  };

  return (
    <section className="panel-glass px-6 py-7 sm:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-brand-peach/80">Step 2</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Upload your resume for deep AI analysis</h2>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          className={`relative rounded-2xl border border-dashed p-6 transition ${
            isDragOver
              ? "border-brand-orange bg-brand-orange/15 shadow-[0_0_36px_rgba(255,136,87,0.25)]"
              : "border-brand-peach/35 bg-black/25"
          }`}
        >
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,105,180,0.16),transparent_60%)]" />
          <div className="relative flex flex-col items-center text-center">
            <UploadCloud className="h-9 w-9 text-brand-peach" />
            <p className="mt-3 text-lg font-medium text-white">Drag & drop resume here</p>
            <p className="mt-1 text-sm text-brand-cream/75">PDF, DOC, DOCX with project-based achievements</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-5 rounded-xl border border-brand-magenta/45 bg-brand-magenta/20 px-4 py-2 text-sm font-medium text-brand-peach transition hover:bg-brand-magenta/30"
            >
              Browse Files
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
            />
          </div>
        </motion.div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-brand-peach" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-cream/70">Active Resume</p>
              <p className="max-w-[240px] truncate text-sm font-medium text-white">{file ? file.name : "No file selected"}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-peach/85">Personalization Scope</p>
            <p className="mt-1 text-sm text-white">{selectedCount} career path{selectedCount === 1 ? "" : "s"} selected</p>
          </div>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={isLoading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-magenta to-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isLoading ? "AI Analyzing..." : "Launch AI Analysis"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default UploadExperience;
