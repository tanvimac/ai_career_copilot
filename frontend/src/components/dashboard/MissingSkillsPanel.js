function MissingSkillsPanel({ gaps }) {
  const entries = Object.entries(gaps);

  return (
    <article className="panel-glass px-6 py-6">
      <p className="text-xs uppercase tracking-[0.24em] text-brand-peach/80">Missing Skills Visualizer</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Growth Opportunities</h3>

      <div className="mt-5 space-y-3">
        {entries.length > 0 ? (
          entries.map(([role, skills]) => (
            <details key={role} className="group rounded-2xl border border-brand-magenta/30 bg-brand-magenta/10 p-4 open:shadow-[0_0_26px_rgba(231,70,160,0.22)]">
              <summary className="cursor-pointer list-none text-sm font-semibold text-white">{role}</summary>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={`${role}-${skill}`} className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3 py-1 text-xs uppercase tracking-[0.08em] text-brand-peach">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-brand-cream/70">Learning path: build one project per missing skill and attach measurable outcomes.</p>
            </details>
          ))
        ) : (
          <p className="text-sm text-brand-cream/70">No high-priority gaps detected for selected tracks.</p>
        )}
      </div>
    </article>
  );
}

export default MissingSkillsPanel;
