import ReadinessPanel from "./ReadinessPanel";
import CompatibilityPanel from "./CompatibilityPanel";
import RoadmapPanel from "./RoadmapPanel";
import SkillsPanel from "./SkillsPanel";
import MissingSkillsPanel from "./MissingSkillsPanel";
import InsightPanel from "./InsightPanel";
import GamificationPanel from "./GamificationPanel";

function DashboardExperience({ result, extendedData, selectedPaths }) {
  return (
    <section className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <ReadinessPanel result={result} readiness={extendedData.readiness} topCareer={extendedData.topCareer} />
        <GamificationPanel extendedData={extendedData} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <CompatibilityPanel careerMatches={result.career_matches || {}} radar={extendedData.radar} selectedPaths={selectedPaths} />
        <RoadmapPanel roadmap={extendedData.roadmap} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <SkillsPanel skills={result.skills_detected || []} />
        <MissingSkillsPanel gaps={result.skill_gaps || {}} />
      </div>

      <InsightPanel insights={extendedData.insights} />
    </section>
  );
}

export default DashboardExperience;
