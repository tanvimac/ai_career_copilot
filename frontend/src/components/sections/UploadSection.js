import { UploadCloud } from "lucide-react";

function UploadSection({ file, setFile, dragOver, setDragOver, onAnalyze, isLoading }) {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-brand-peach/85">Step 2 · Resume Upload</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Drop your resume for AI analysis</h2>

      <div
        className={`upload-zone mt-5 ${dragOver ? "upload-zone-active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          setFile(e.dataTransfer.files?.[0] || null);
        }}
      >
        <UploadCloud className="mx-auto h-9 w-9 text-brand-peach" />
        <p className="mt-2 text-white">Drag & drop PDF or DOCX</p>
        <p className="text-sm text-brand-text/70">ATS score, skill fit, roadmap, and interview prep generated in one flow.</p>
        <input className="mx-auto mt-4 block text-xs text-brand-text" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-brand-text/80">{file ? file.name : "No file selected"}</p>
        <button type="button" onClick={onAnalyze} className="cta-btn" disabled={isLoading}>{isLoading ? "AI Analyzing..." : "Analyze Resume"}</button>
      </div>
    </section>
  );
}

export default UploadSection;
