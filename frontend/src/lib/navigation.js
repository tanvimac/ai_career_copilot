import {
  LayoutDashboard,
  UserRoundPlus,
  FileSearch,
  Route,
  Radar,
  Briefcase,
  FolderCode,
  BookOpenText,
  MessageSquareCode,
  Github,
  LineChart,
  Bot,
  Settings,
  ShieldCheck
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "command-center", label: "Command Center", icon: LayoutDashboard },
  { id: "onboarding", label: "Onboarding", icon: UserRoundPlus },
  { id: "resume-studio", label: "Resume Studio", icon: FileSearch },
  { id: "career-roadmap", label: "Career Roadmap", icon: Route },
  { id: "skills-intel", label: "Skills Intelligence", icon: Radar },
  { id: "job-match", label: "Job Match", icon: Briefcase },
  { id: "project-lab", label: "Project Lab", icon: FolderCode },
  { id: "learning-hub", label: "Learning Hub", icon: BookOpenText },
  { id: "interview-lab", label: "Interview Lab", icon: MessageSquareCode },
  { id: "profile-analyzers", label: "GitHub + LinkedIn", icon: Github },
  { id: "market-insights", label: "Market Insights", icon: LineChart },
  { id: "ai-assistant", label: "AI Assistant", icon: Bot },
  { id: "auth-security", label: "Auth & Security", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings }
];
