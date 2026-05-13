import { Braces, Brain, CloudCog, Database, Shield, Smartphone, Layers, Monitor, BarChart3 } from "lucide-react";

export const CAREER_PATHS = [
  { id: "devops", label: "DevOps Engineer", icon: CloudCog },
  { id: "aiml", label: "AI/ML Engineer", icon: Brain },
  { id: "cloud", label: "Cloud Engineer", icon: Database },
  { id: "backend", label: "Backend Developer", icon: Braces },
  { id: "frontend", label: "Frontend Developer", icon: Monitor },
  { id: "fullstack", label: "Full Stack Developer", icon: Layers },
  { id: "data", label: "Data Analyst", icon: BarChart3 },
  { id: "cyber", label: "Cybersecurity", icon: Shield },
  { id: "mobile", label: "Mobile App Developer", icon: Smartphone }
];

export const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];
export const TECH_STACKS = ["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "SQL", "TypeScript", "Terraform"];
