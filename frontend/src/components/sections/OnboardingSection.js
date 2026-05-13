import { motion } from "framer-motion";
import { CAREER_PATHS, EXPERIENCE_LEVELS, TECH_STACKS } from "../../data/options";

function ChipSet({ items, selected, onToggle }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => {
        const active = selected.includes(item);
        return (
          <button key={item} type="button" onClick={() => onToggle(item)} className={`pill ${active ? "pill-active" : ""}`}>
            {item}
          </button>
        );
      })}
    </div>
  );
}

function OnboardingSection({ selectedPaths, setSelectedPaths, experience, setExperience, techStack, setTechStack }) {
  const toggle = (value, setter) => setter((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]));

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-brand-peach/85">Step 1 · Onboarding</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Personalize your AI mentor</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CAREER_PATHS.map((path, idx) => {
          const Icon = path.icon;
          const active = selectedPaths.includes(path.label);
          return (
            <motion.button key={path.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.02 }} type="button" onClick={() => toggle(path.label, setSelectedPaths)} className={`career-tile ${active ? "career-tile-active" : ""}`}>
              <Icon className="h-5 w-5" /> <span>{path.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="text-sm text-white">Experience level</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXPERIENCE_LEVELS.map((level) => (
              <button key={level} type="button" onClick={() => setExperience(level)} className={`pill ${experience === level ? "pill-active" : ""}`}>{level}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-white">Preferred tech stack</p>
          <ChipSet items={TECH_STACKS} selected={techStack} onToggle={(item) => toggle(item, setTechStack)} />
        </div>
      </div>
    </section>
  );
}

export default OnboardingSection;
