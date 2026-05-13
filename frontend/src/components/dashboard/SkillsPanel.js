import { motion } from "framer-motion";

function SkillsPanel({ skills }) {
  return (
    <article className="panel-glass px-6 py-6">
      <p className="text-xs uppercase tracking-[0.24em] text-brand-peach/80">Interactive Skill Map</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Detected Skill Strengths</h3>

      <div className="mt-5 flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill, idx) => (
            <motion.span
              key={`${skill}-${idx}`}
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
              className="glow-chip"
            >
              {skill}
            </motion.span>
          ))
        ) : (
          <p className="text-sm text-brand-cream/70">No skills were detected from the resume content.</p>
        )}
      </div>
    </article>
  );
}

export default SkillsPanel;
