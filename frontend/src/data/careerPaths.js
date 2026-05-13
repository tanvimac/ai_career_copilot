import {
  CloudCog,
  Cpu,
  Server,
  Braces,
  MonitorSmartphone,
  Layers,
  BarChart3,
  Shield,
  Smartphone
} from "lucide-react";

export const CAREER_PATHS = [
  { id: "devops-engineer", label: "DevOps Engineer", icon: CloudCog, color: "from-fuchsia-400/40 to-orange-400/30" },
  { id: "aiml-engineer", label: "AI/ML Engineer", icon: Cpu, color: "from-rose-400/40 to-amber-400/30" },
  { id: "cloud-engineer", label: "Cloud Engineer", icon: Server, color: "from-orange-400/35 to-pink-400/35" },
  { id: "backend-developer", label: "Backend Developer", icon: Braces, color: "from-violet-400/35 to-rose-400/30" },
  { id: "frontend-developer", label: "Frontend Developer", icon: MonitorSmartphone, color: "from-pink-400/40 to-amber-400/30" },
  { id: "full-stack-developer", label: "Full Stack Developer", icon: Layers, color: "from-orange-400/40 to-fuchsia-400/30" },
  { id: "data-analyst", label: "Data Analyst", icon: BarChart3, color: "from-amber-400/40 to-rose-400/30" },
  { id: "cybersecurity", label: "Cybersecurity", icon: Shield, color: "from-fuchsia-500/35 to-red-400/30" },
  { id: "mobile-app-developer", label: "Mobile App Developer", icon: Smartphone, color: "from-rose-400/35 to-violet-400/30" }
];
