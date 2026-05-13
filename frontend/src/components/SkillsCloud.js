import { motion } from "framer-motion";

function SkillsCloud({ skills = [] }) {
  return (
    <article className="glass-card px-6 py-6 sm:px-7">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Skills Detected</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Your Current Technical Stack</h3>

      <div className="mt-5 flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <motion.span
              key={`${skill}-${index}`}
              initial={{ opacity: 0, scale: 0.86, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.04 * index }}
              className="skill-pill"
            >
              {skill}
            </motion.span>
          ))
        ) : (
          <p className="text-sm text-slate-300">No skills detected from this resume.</p>
        )}
      </div>
    </article>
  );
}

export default SkillsCloud;
