import { motion } from "framer-motion";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { Bot, Trophy } from "lucide-react";

function DashboardSection({ result, derived, ring }) {
  const barColors = ["#ff8857", "#e746a0", "#ffb48a", "#8f4f76"];

  return (
    <section className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <article className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">Step 3 · Resume Analysis</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">ATS & Readiness</h3>
          <div className="mt-5 grid items-center gap-5 sm:grid-cols-[0.85fr_1.15fr]">
            <div className="relative mx-auto h-44 w-44">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="64" strokeWidth="14" className="stroke-white/10" fill="none" />
                <motion.circle cx="80" cy="80" r="64" strokeWidth="14" strokeLinecap="round" className="stroke-brand-orange" fill="none" strokeDasharray={ring.c} initial={{ strokeDashoffset: ring.c }} animate={{ strokeDashoffset: ring.offset }} transition={{ duration: 1.1 }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-semibold text-white">{ring.val}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-brand-peach/85">ATS Score</p>
              </div>
            </div>
            <div className="space-y-3">
              {derived.readiness.map((r, idx) => (
                <div key={r.label}>
                  <div className="mb-1 flex justify-between text-xs uppercase tracking-[0.12em] text-brand-text/80"><span>{r.label}</span><span>{r.value}%</span></div>
                  <div className="h-2.5 rounded-full bg-white/10">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${r.value}%` }} transition={{ delay: idx * 0.06 }} className="h-full rounded-full bg-gradient-to-r from-[#e746a0] via-[#ff8857] to-[#ffd3a5]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">Step 4 · AI Insights</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Strengths & Weak Areas</h3>
          <div className="mt-4 space-y-2">
            {derived.insights.map((i) => <div key={i} className="mission"><Bot className="h-4 w-4 text-brand-magenta" /> {i}</div>)}
          </div>
          <div className="mt-4 rounded-xl border border-brand-magenta/35 bg-brand-magenta/10 p-3 text-sm text-brand-text">Improvement suggestion: strengthen impact metrics and deployment experience.</div>
        </article>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">Career Match & Skill Analysis</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="h-64 rounded-2xl border border-white/10 bg-black/20 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={derived.radar} outerRadius="72%">
                  <PolarGrid stroke="rgba(255,255,255,0.15)" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "#f2d1ba", fontSize: 10 }} />
                  <Radar dataKey="value" stroke="#ff8857" fill="#e746a0" fillOpacity={0.35} />
                  <Tooltip contentStyle={{ background: "#2a1722", border: "1px solid rgba(255,255,255,0.18)" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-64 rounded-2xl border border-white/10 bg-black/20 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={derived.sortedMatches.map(([name, value]) => ({ name, value }))} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fill: "#f2d1ba", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#2a1722", border: "1px solid rgba(255,255,255,0.18)" }} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                    {derived.sortedMatches.map((x, i) => <Cell key={`${x[0]}-${i}`} fill={barColors[i % barColors.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">{result.skills_detected.map((s) => <span key={s} className="chip-glow">{s}</span>)}</div>
        </article>

        <article className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">Gamification</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">XP & Achievements</h3>
          <div className="mt-4 rounded-2xl border border-brand-orange/35 bg-brand-orange/10 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-brand-peach/85">Level {derived.level}</p>
            <p className="mt-1 text-3xl font-semibold text-white">{derived.xp} XP</p>
            <div className="mt-3 h-2.5 rounded-full bg-black/40"><div className="h-full rounded-full bg-gradient-to-r from-[#e746a0] to-[#ff8857]" style={{ width: `${derived.progress}%` }} /></div>
          </div>
          <div className="mt-3 space-y-2">{["Resume Optimizer", "Roadmap Explorer", "Interview Builder"].map((a) => <div key={a} className="mission"><Trophy className="h-4 w-4 text-brand-peach" /> {a}</div>)}</div>
        </article>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <article className="glass-panel rounded-3xl p-6 xl:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">Step 5 · Career Roadmap</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Weekly Learning Timeline</h3>
          <div className="mt-4 space-y-3">{derived.roadmap.map((step) => <div key={step.week} className="timeline-glow"><span>{step.week}</span><p>{step.focus}</p><em>Planned</em></div>)}</div>
          <p className="mt-4 text-sm text-brand-text/80">Recommended certifications: {derived.certifications.join(" · ")}</p>
        </article>

        <article className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">Step 6 · Interview Prep</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Interview Readiness</h3>
          <div className="mt-4 space-y-2">
            <div className="mission">Technical: Explain your most scalable project architecture.</div>
            <div className="mission">Technical: How would you reduce deployment failure rates?</div>
            <div className="mission">HR: Describe a high-pressure collaboration challenge you solved.</div>
          </div>
          <div className="mt-4 rounded-xl border border-brand-orange/35 bg-brand-orange/10 p-3 text-sm text-brand-text">Readiness score: {derived.readiness[1]?.value || 60}%</div>
          <details className="mt-3 rounded-xl border border-brand-orange/35 bg-brand-orange/10 p-3">
            <summary className="cursor-pointer text-sm font-medium text-white">Missing skills</summary>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.values(result.skill_gaps || {}).flat().map((g) => <span key={g} className="chip-glow">{g}</span>)}
            </div>
          </details>
        </article>
      </div>
    </section>
  );
}

export default DashboardSection;
