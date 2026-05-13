const ROADMAP_POOL = {
  "DevOps Engineer": ["Docker Fundamentals", "Kubernetes Basics", "CI/CD with GitHub Actions", "Infrastructure as Code: Terraform", "Monitoring with Prometheus/Grafana", "AWS Deployment Patterns"],
  "AI/ML Engineer": ["Python for ML", "Scikit-Learn Workflow", "Model Evaluation Metrics", "Feature Engineering", "MLOps Introduction", "Model Deployment with FastAPI"],
  "Cloud Engineer": ["Cloud Foundations", "AWS Core Services", "Networking & IAM", "Containerized Deployments", "Cloud Security Baselines", "Cost Optimization"],
  "Backend Developer": ["REST API Design", "Database Indexing", "Caching with Redis", "Async Job Processing", "System Design Fundamentals", "Observability"],
  "Frontend Developer": ["Advanced React Patterns", "State Management", "Performance Optimization", "Accessibility", "Design Systems", "Frontend Testing"],
  "Full Stack Developer": ["Service Architecture", "Auth & Security", "Frontend/Backend Contracts", "Scalable Data Models", "Deployment Strategy", "Product Analytics"],
  "Data Analyst": ["SQL Deep Dive", "Data Cleaning", "Exploratory Analysis", "Dashboard Storytelling", "Statistical Thinking", "Business Insights"],
  Cybersecurity: ["Threat Modeling", "Secure Coding", "Vulnerability Scanning", "Identity & Access Control", "Incident Response Basics", "Cloud Security Posture"],
  "Mobile App Developer": ["App Architecture", "State & Navigation", "API Integration", "Performance Profiling", "Offline-first Strategies", "Release Pipeline"],
  default: ["Communication of Impact", "Portfolio Project Enhancement", "ATS Optimization", "Problem Solving Stories", "Interview Mock Practice", "Career Narrative Crafting"]
};

function prettyWeeks(items) {
  return items.slice(0, 6).map((item, idx) => ({ week: `Week ${idx + 1}`, focus: item }));
}

export function buildExtendedInsights(result, selectedPaths) {
  const score = Number(result?.score || 0);
  const skills = result?.skills_detected || [];
  const matches = result?.career_matches || {};
  const topCareer = Object.entries(matches).sort((a, b) => b[1] - a[1])[0]?.[0] || selectedPaths[0] || "Backend Developer";

  const roadmapSource = ROADMAP_POOL[topCareer] || ROADMAP_POOL.default;
  const roadmap = prettyWeeks(roadmapSource);

  const readiness = [
    { metric: "Resume Strength", value: Math.min(100, Math.max(25, score + 6)) },
    { metric: "Interview Readiness", value: Math.min(100, Math.max(20, score - 8)) },
    { metric: "Technical Depth", value: Math.min(100, Math.max(18, score + skills.length * 2)) },
    { metric: "Industry Readiness", value: Math.min(100, Math.max(22, score - 3 + selectedPaths.length * 3)) }
  ];

  const radar = [
    { axis: "Problem Solving", value: Math.min(98, score + 10) },
    { axis: "Delivery", value: Math.min(95, score + 2) },
    { axis: "Architecture", value: Math.min(92, score - 4) },
    { axis: "Tooling", value: Math.min(96, score + skills.length) },
    { axis: "Collaboration", value: Math.min(94, score - 6) },
    { axis: "Scalability", value: Math.min(91, score - 2) }
  ];

  const xp = Math.max(180, score * 12 + skills.length * 35 + selectedPaths.length * 50);
  const level = Math.max(1, Math.floor(xp / 350));
  const xpInLevel = xp % 350;

  const insights = [
    `You are strongest in ${topCareer.toLowerCase()}, with the highest compatibility in your profile map.`,
    `Your profile can grow faster by strengthening deployment and real-world implementation evidence.`,
    `Prioritize ${roadmap[1]?.focus || "practical projects"} next to increase recruiter confidence in your trajectory.`
  ];

  const achievements = [
    { title: "Profile Ignition", unlocked: score >= 40 },
    { title: "Skill Mapper", unlocked: skills.length >= 3 },
    { title: "Career Explorer", unlocked: selectedPaths.length >= 2 },
    { title: "Readiness Climber", unlocked: score >= 70 }
  ];

  return { roadmap, readiness, radar, xp, level, xpInLevel, insights, achievements, topCareer };
}
