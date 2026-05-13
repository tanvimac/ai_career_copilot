import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="glass-panel rounded-3xl p-7 sm:p-10">
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
        Premium AI Career Intelligence
        <span className="warm-gradient-text"> built for ambitious professionals</span>
      </motion.h1>
      <p className="mt-4 max-w-3xl text-brand-text/85">
        Analyze your resume, map your career fit, uncover missing skills, and receive a practical learning roadmap with an elegant, startup-grade experience.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="chip-glow">AI Mentor</span>
        <span className="chip-glow">Skill Advisor</span>
        <span className="chip-glow">Readiness Platform</span>
      </div>
    </section>
  );
}

export default HeroSection;
