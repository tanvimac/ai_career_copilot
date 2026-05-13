import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { UploadCloud, Bot, CheckCircle2, Trophy, ArrowRight } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import { GOALS, INTERESTS, ROADMAP, MARKET } from "../lib/mockData";

const API_URL = "http://127.0.0.1:8000/upload-resume";

function PillPicker({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = value.includes(item);
        return (
          <button key={item} type="button" onClick={() => onChange(active ? value.filter((x) => x !== item) : [...value, item])} className={`pill ${active ? "pill-active" : ""}`}>
            {item}
          </button>
        );
      })}
    </div>
  );
}

function CommandCenter({ resume }) {
  const score = resume?.result?.score || 0;
  const career = resume?.result?.career_matches || {};
  const chart = Object.entries(career).map(([name, value]) => ({ name, value }));
  const trend = [
    { week: "W1", xp: 120 },
    { week: "W2", xp: 240 },
    { week: "W3", xp: 370 },
    { week: "W4", xp: 510 },
    { week: "W5", xp: 680 }
  ];
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <GlassCard subtitle="Career Intelligence" title="Mission Status" className="xl:col-span-2">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="stat"><p>ATS Score</p><h4>{score || 72}</h4></div>
          <div className="stat"><p>Interview Readiness</p><h4>{Math.min(99, (score || 72) - 5)}%</h4></div>
          <div className="stat"><p>Dream Job Fit</p><h4>{Math.min(98, (score || 72) + 3)}%</h4></div>
        </div>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <defs><linearGradient id="xp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff8857" stopOpacity={0.8} /><stop offset="100%" stopColor="#ff8857" stopOpacity={0.06} /></linearGradient></defs>
              <XAxis dataKey="week" tick={{ fill: "#f0cbb2" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#f0cbb2" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#2a1822", border: "1px solid #ffffff22" }} />
              <Area type="monotone" dataKey="xp" stroke="#ff8857" fill="url(#xp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard subtitle="Daily Missions" title="Progress Rewards">
        {["Rewrite 3 bullet points", "Practice 5 interview Qs", "Apply to 4 matching roles"].map((m) => (
          <div key={m} className="mission"><CheckCircle2 className="h-4 w-4 text-brand-peach" /> {m}</div>
        ))}
        <div className="mt-4 rounded-xl border border-brand-orange/35 bg-brand-orange/10 p-3 text-sm text-brand-text">Level 7 · 680 XP</div>
      </GlassCard>
      <GlassCard subtitle="AI Match Engine" title="Top Compatibility" className="xl:col-span-3">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart.length ? chart : [{ name: "DevOps", value: 75 }, { name: "Backend", value: 61 }, { name: "AI/ML", value: 55 }]}>
              <XAxis dataKey="name" tick={{ fill: "#f0cbb2", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#f0cbb2" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#2a1822", border: "1px solid #ffffff22" }} />
              <Bar dataKey="value" fill="#ff5fa2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}

function Onboarding({ onboarding, dispatch }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <GlassCard subtitle="Onboarding" title="Career Goal Selection">
        <PillPicker items={GOALS} value={onboarding.goals} onChange={(v) => dispatch({ type: "SET_ONBOARDING", payload: { goals: v } })} />
      </GlassCard>
      <GlassCard subtitle="Onboarding" title="Interest Selection">
        <PillPicker items={INTERESTS} value={onboarding.interests} onChange={(v) => dispatch({ type: "SET_ONBOARDING", payload: { interests: v } })} />
      </GlassCard>
      <GlassCard subtitle="Onboarding" title="Experience Level" className="xl:col-span-2">
        <div className="flex gap-2">
          {["Beginner", "Mid Level", "Advanced"].map((level) => (
            <button key={level} type="button" onClick={() => dispatch({ type: "SET_ONBOARDING", payload: { experience: level } })} className={`pill ${onboarding.experience === level ? "pill-active" : ""}`}>{level}</button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function ResumeStudio({ resume, dispatch, onboarding }) {
  const [drag, setDrag] = useState(false);
  const upload = async () => {
    if (!resume.file) {
      dispatch({ type: "SET_RESUME_ERROR", payload: "Please upload a resume file first." });
      return;
    }
    dispatch({ type: "RESUME_LOADING", payload: true });
    try {
      const fd = new FormData();
      fd.append("file", resume.file);
      const res = await fetch(API_URL, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Unable to analyze resume now.");
      const data = await res.json();
      dispatch({ type: "SET_RESUME_RESULT", payload: data });
    } catch (e) {
      dispatch({ type: "SET_RESUME_ERROR", payload: e.message || "Server connection failed." });
    } finally {
      dispatch({ type: "RESUME_LOADING", payload: false });
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <GlassCard subtitle="AI Resume Upload System" title="Resume Studio">
        <div
          className={`upload-zone ${drag ? "upload-zone-active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); dispatch({ type: "SET_RESUME_FILE", payload: e.dataTransfer.files?.[0] || null }); }}
        >
          <UploadCloud className="h-8 w-8 text-brand-peach" />
          <p className="mt-2 text-white">Drag & drop resume (PDF/DOCX)</p>
          <p className="text-sm text-brand-text/70">Role-aware analysis for {onboarding.interests.join(", ") || "your goals"}</p>
          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => dispatch({ type: "SET_RESUME_FILE", payload: e.target.files?.[0] || null })} className="mt-4 block text-xs text-brand-text" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-brand-text/80">{resume.file ? resume.file.name : "No file chosen"}</p>
          <button type="button" onClick={upload} disabled={resume.loading} className="cta-btn">{resume.loading ? "AI Scanning..." : "Analyze Resume"} <ArrowRight className="h-4 w-4" /></button>
        </div>
        {resume.error && <p className="mt-3 rounded-lg border border-red-400/40 bg-red-500/15 px-3 py-2 text-sm text-red-100">{resume.error}</p>}
      </GlassCard>
      <GlassCard subtitle="AI Resume Insights" title="Optimization Engine">
        <div className="space-y-2 text-sm text-brand-text">
          {[
            "ATS score and formatting analysis",
            "Keyword optimization suggestions",
            "Weak bullet point detection",
            "Role-specific rewriting recommendations",
            "Achievement impact enhancement"
          ].map((x) => <div key={x} className="mission"><Bot className="h-4 w-4 text-brand-magenta" /> {x}</div>)}
        </div>
      </GlassCard>
      {resume.result && (
        <GlassCard subtitle="Live Output" title="Resume Analysis Result" className="xl:col-span-2">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="stat"><p>Score</p><h4>{resume.result.score}</h4></div>
            <div className="stat"><p>Level</p><h4>{resume.result.level}</h4></div>
            <div className="stat"><p>Skills Detected</p><h4>{resume.result.skills_detected.length}</h4></div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

function RoadmapPage() {
  return <GlassCard subtitle="AI Career Roadmap Generator" title="3-Month Learning Sequence">{ROADMAP.map((r) => <div key={r.phase} className="timeline-row"><span>{r.phase}</span><p>{r.focus}</p><em>{r.status}</em></div>)}</GlassCard>;
}

function SkillsIntelPage() {
  const radar = [{ axis: "Backend", value: 78 }, { axis: "Cloud", value: 68 }, { axis: "DevOps", value: 63 }, { axis: "Data", value: 52 }, { axis: "System Design", value: 58 }];
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <GlassCard subtitle="Skill Analysis" title="Technical Skill Radar Chart">
        <div className="h-72"><ResponsiveContainer><RadarChart data={radar}><PolarGrid stroke="#ffffff25" /><PolarAngleAxis dataKey="axis" tick={{ fill: "#f0cbb2", fontSize: 11 }} /><Radar dataKey="value" stroke="#ff8857" fill="#ff8857" fillOpacity={0.3} /></RadarChart></ResponsiveContainer></div>
      </GlassCard>
      <GlassCard subtitle="Industry Demand" title="Trending Skill Detection">{["Kubernetes", "Terraform", "LLM Ops", "System Design", "AWS Security"].map((s) => <div key={s} className="mission"><Trophy className="h-4 w-4 text-brand-orange" /> {s}</div>)}</GlassCard>
    </div>
  );
}

function GenericFeaturePage({ title, subtitle, features }) {
  return (
    <GlassCard subtitle={subtitle} title={title}>
      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((f) => <motion.div key={f} whileHover={{ y: -2 }} className="feature-tile">{f}</motion.div>)}
      </div>
    </GlassCard>
  );
}

function MarketInsightsPage() {
  return (
    <GlassCard subtitle="Market & Career Insights" title="Salary and Hiring Trends">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MARKET.map((m) => <div key={m.name} className="stat"><p>{m.name}</p><h4>{m.salary}</h4><span>{m.demand}% demand</span></div>)}
      </div>
    </GlassCard>
  );
}

function AssistantPage() {
  const [q, setQ] = useState("");
  const response = useMemo(() => (q ? `AI Mentor: Focus on measurable impact, ${q.toLowerCase().includes("devops") ? "deployability" : "skill-to-role alignment"}, and weekly execution loops.` : ""), [q]);
  return (
    <GlassCard subtitle="AI Assistant" title="Real-Time Career Guidance">
      <textarea className="chat-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask for resume rewrite, roadmap advice, or role strategy..." />
      {response && <div className="mt-3 rounded-xl border border-brand-magenta/35 bg-brand-magenta/10 p-3 text-sm text-brand-text">{response}</div>}
    </GlassCard>
  );
}

export function renderPage(page, state, dispatch) {
  switch (page) {
    case "command-center":
      return <CommandCenter resume={state.resume} />;
    case "onboarding":
      return <Onboarding onboarding={state.onboarding} dispatch={dispatch} />;
    case "resume-studio":
      return <ResumeStudio resume={state.resume} dispatch={dispatch} onboarding={state.onboarding} />;
    case "career-roadmap":
      return <RoadmapPage />;
    case "skills-intel":
      return <SkillsIntelPage />;
    case "job-match":
      return <GenericFeaturePage subtitle="Job Match Features" title="Resume vs Job Match Engine" features={["Job description upload", "LinkedIn job link analysis", "Missing keywords detection", "Dream job compatibility checker"]} />;
    case "project-lab":
      return <GenericFeaturePage subtitle="AI Project Recommender" title="Portfolio Project Intelligence" features={["Resume-based project ideas", "Career-track project roadmap", "Tech stack recommendations", "GitHub project strategy"]} />;
    case "learning-hub":
      return <GenericFeaturePage subtitle="Learning System" title="AI Learning Hub" features={["Weekly learning schedules", "Daily career tasks", "Course + YouTube + docs recommendations", "Certification pathways"]} />;
    case "interview-lab":
      return <GenericFeaturePage subtitle="Interview Prep" title="Mock Interview Studio" features={["Technical + HR interview sets", "Difficulty progression", "AI feedback loops", "Interview readiness scoring"]} />;
    case "profile-analyzers":
      return <GenericFeaturePage subtitle="GitHub + LinkedIn Analyzer" title="Profile Quality Intelligence" features={["Repository quality analysis", "README optimization", "LinkedIn profile audit", "Contribution consistency tracking"]} />;
    case "market-insights":
      return <MarketInsightsPage />;
    case "ai-assistant":
      return <AssistantPage />;
    case "auth-security":
      return <GenericFeaturePage subtitle="Authentication Features" title="Identity and Session Layer" features={["Google login", "GitHub login", "Secure session management", "Profile security controls"]} />;
    case "settings":
      return <GenericFeaturePage subtitle="Platform Settings" title="Preferences & Saved State" features={["Resume history", "AI analysis history", "Saved roadmaps", "Widget configuration"]} />;
    default:
      return <CommandCenter resume={state.resume} />;
  }
}
