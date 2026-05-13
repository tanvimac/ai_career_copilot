import {
  PolarGrid,
  PolarAngleAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

function CompatibilityPanel({ careerMatches, radar, selectedPaths }) {
  const matchEntries = Object.entries(careerMatches).map(([name, score]) => ({ name, score }));
  const colors = ["#ff8e63", "#ff5fa2", "#ca6bff", "#ffd3a5", "#ff7f50"];

  return (
    <article className="panel-glass px-6 py-6">
      <p className="text-xs uppercase tracking-[0.24em] text-brand-peach/80">AI Career Match Engine</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Compatibility Landscape</h3>
      <p className="mt-1 text-sm text-brand-cream/75">Focused for: {selectedPaths.join(", ") || "General exploration"}</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="h-64 rounded-2xl border border-white/10 bg-black/25 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radar} outerRadius="72%">
              <PolarGrid stroke="rgba(255,255,255,0.15)" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: "#f8d0b6", fontSize: 10 }} />
              <Radar dataKey="value" stroke="#ff9d7a" fill="#ff7f50" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-64 rounded-2xl border border-white/10 bg-black/25 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={matchEntries} layout="vertical" margin={{ top: 8, right: 8, left: 14, bottom: 8 }}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" tick={{ fill: "#ffe4d1", fontSize: 11 }} width={118} />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.06)" }} contentStyle={{ background: "#201318", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10 }} />
              <Bar dataKey="score" radius={[0, 12, 12, 0]}>
                {matchEntries.map((entry, idx) => (
                  <Cell key={`${entry.name}-${idx}`} fill={colors[idx % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  );
}

export default CompatibilityPanel;
