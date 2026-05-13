export function ringMetrics(score) {
  const radius = 64;
  const c = 2 * Math.PI * radius;
  const val = Math.max(0, Math.min(100, Number(score) || 0));
  return { c, offset: c - (val / 100) * c, val };
}

export function buildDerived(result, selectedPaths) {
  const score = Number(result?.score || 0);
  const skills = result?.skills_detected || [];
  const sortedMatches = Object.entries(result?.career_matches || {}).sort((a, b) => b[1] - a[1]);
  const top = sortedMatches[0]?.[0] || selectedPaths[0] || "Backend Developer";

  const roadmapMap = {
    "DevOps Engineer": ["Docker Basics", "Kubernetes Core", "CI/CD Pipelines", "Terraform", "Monitoring", "Cloud Deployment"],
    "AI/ML Engineer": ["ML Foundations", "Feature Engineering", "Evaluation", "MLOps", "Model Serving", "Production Iteration"],
    "Cloud Engineer": ["Cloud Services", "IAM", "Networking", "Containers", "Cost Optimization", "Observability"],
    default: ["API Design", "Database Tuning", "Caching", "System Design", "Testing", "Deployment"]
  };

  const roadmap = (roadmapMap[top] || roadmapMap.default).map((focus, i) => ({ week: `Week ${i + 1}`, focus }));
  const certifications = top.includes("DevOps") ? ["AWS SAA", "CKA"] : top.includes("Cloud") ? ["AWS SAA", "AZ-104"] : ["AWS CCP", "Meta Front-End"];

  const readiness = [
    { label: "Resume Strength", value: Math.max(28, Math.min(99, score + 6)) },
    { label: "Interview Readiness", value: Math.max(22, Math.min(96, score - 7)) },
    { label: "Technical Depth", value: Math.max(25, Math.min(98, score + skills.length * 2)) }
  ];

  const radar = [
    { axis: "Problem Solving", value: Math.min(97, score + 7) },
    { axis: "Architecture", value: Math.min(95, score - 3) },
    { axis: "Execution", value: Math.min(96, score + 1) },
    { axis: "Tooling", value: Math.min(95, score + skills.length) },
    { axis: "Communication", value: Math.min(93, score - 6) }
  ];

  const insights = [
    `Strongest trajectory: ${top}.`,
    "Add clearer production impact and measurable outcomes to improve shortlist conversion.",
    `Prioritize ${roadmap[1]?.focus || "hands-on projects"} this week for faster score lift.`
  ];

  const xp = score * 12 + skills.length * 30;
  const level = Math.max(1, Math.floor(xp / 350));
  const progress = Math.round(((xp % 350) / 350) * 100);

  return { top, roadmap, certifications, readiness, radar, insights, xp, level, progress, sortedMatches };
}
