import { motion } from "framer-motion";
import ScoreCard from "../components/ScoreCard";
import SkillsCloud from "../components/SkillsCloud";
import CareerMatches from "../components/CareerMatches";
import SkillGapPanel from "../components/SkillGapPanel";

function DashboardSection({ result }) {
  return (
    <section className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <ScoreCard score={result.score} level={result.level} filename={result.filename} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          <CareerMatches careerMatches={result.career_matches || {}} />
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SkillsCloud skills={result.skills_detected || []} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
          <SkillGapPanel skillGaps={result.skill_gaps || {}} />
        </motion.div>
      </div>
    </section>
  );
}

export default DashboardSection;
