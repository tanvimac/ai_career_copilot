import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Orbit } from "lucide-react";

function LandingHero({ hasResult }) {
  return (
    <section className="panel-glass relative overflow-hidden p-6 sm:p-8 lg:p-10">
      <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-brand-magenta/35 to-brand-plum/25 blur-3xl" />
      <div className="absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-gradient-to-br from-brand-orange/30 to-brand-peach/20 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-peach/35 bg-brand-peach/10 px-4 py-1 text-xs uppercase tracking-[0.23em] text-brand-peach"
          >
            <Sparkles className="h-3.5 w-3.5" /> AI Career Copilot
          </motion.p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Build your next role with an
            <span className="warm-gradient-text"> intelligent career mentor</span>
          </h1>
          <p className="mt-5 max-w-2xl text-brand-cream/80">
            Personalized role guidance, skill-gap intelligence, learning roadmap generation, and readiness signals that feel like a product designed for ambitious builders.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="soft-chip">AI Skill Advisor</span>
            <span className="soft-chip">Job Readiness Platform</span>
            <span className="soft-chip">Career Match Engine</span>
          </div>
        </div>

        <div className="grid gap-3">
          {[{ icon: BrainCircuit, label: "Adaptive mentoring", note: "Personalized by interests + resume signals" }, { icon: Orbit, label: "Trajectory intelligence", note: "Roadmap and progress loops" }].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
              <item.icon className="h-5 w-5 text-brand-peach" />
              <p className="mt-2 text-sm font-medium text-white">{item.label}</p>
              <p className="mt-1 text-xs text-brand-cream/70">{item.note}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-brand-orange/35 bg-brand-orange/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">State</p>
            <p className="mt-1 text-lg font-medium text-white">{hasResult ? "Dashboard Ready" : "Awaiting Analysis"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
