import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import OnboardingSection from "./components/sections/OnboardingSection";
import UploadSection from "./components/sections/UploadSection";
import DashboardSection from "./components/dashboard/DashboardSection";
import LoadingOverlay from "./components/sections/LoadingOverlay";
import ErrorToast from "./components/sections/ErrorToast";
import { buildDerived, ringMetrics } from "./utils/analysis";

import { uploadResumeUrl } from "./lib/api";

function App() {
  const [selectedPaths, setSelectedPaths] = useState([]);
  const [experience, setExperience] = useState("Intermediate");
  const [techStack, setTechStack] = useState([]);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const derived = useMemo(() => (result ? buildDerived(result, selectedPaths) : null), [result, selectedPaths]);
  const ring = ringMetrics(result?.score || 0);

  const analyze = async () => {
    if (!selectedPaths.length) return setError("Select at least one career interest.");
    if (!experience) return setError("Choose an experience level.");
    if (!techStack.length) return setError("Select preferred tech stack.");
    if (!file) return setError("Upload a resume file to start analysis.");

    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const response = await fetch(uploadResumeUrl, { method: "POST", body: fd });
      if (!response.ok) throw new Error("AI analysis failed. Please retry.");
      const data = await response.json();
      setResult(data);
    } catch (e) {
      setError(e.message || "Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="pointer-events-none fixed inset-0">
        <div className="nebula nebula-a" />
        <div className="nebula nebula-b" />
        <div className="nebula nebula-c" />
        <div className="grid-overlay" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
        <Navbar />
        <HeroSection />
        <OnboardingSection
          selectedPaths={selectedPaths}
          setSelectedPaths={setSelectedPaths}
          experience={experience}
          setExperience={setExperience}
          techStack={techStack}
          setTechStack={setTechStack}
        />
        <UploadSection
          file={file}
          setFile={setFile}
          dragOver={dragOver}
          setDragOver={setDragOver}
          onAnalyze={analyze}
          isLoading={isLoading}
        />

        <AnimatePresence mode="wait">
          {result && derived ? (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <DashboardSection result={result} derived={derived} ring={ring} />
            </motion.div>
          ) : (
            <motion.section key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel rounded-3xl p-8 text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-peach/80">Dashboard Preview</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Your premium analysis dashboard appears after upload</h2>
              <p className="mx-auto mt-3 max-w-3xl text-brand-text/80">Get ATS score, role fit, missing skills, interview readiness, roadmap timeline, and AI suggestions in one clean workspace.</p>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <LoadingOverlay show={isLoading} />
      <ErrorToast message={error} onClose={() => setError("")} />
    </div>
  );
}

export default App;
