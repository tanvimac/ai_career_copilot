function SkillGapPanel({ skillGaps = {} }) {
  const entries = Object.entries(skillGaps);

  return (
    <article className="glass-card h-full px-6 py-6 sm:px-7">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Skill Gap Analyzer</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Missing Skills & Suggestions</h3>

      <div className="mt-5 space-y-4">
        {entries.length > 0 ? (
          entries.map(([role, gaps]) => (
            <div key={role} className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-4">
              <p className="text-sm font-semibold text-amber-100">For {role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(gaps || []).map((gap) => (
                  <span key={`${role}-${gap}`} className="rounded-full border border-amber-100/25 bg-amber-100/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-amber-100">
                    {gap}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-amber-100/85">
                Suggested action: Add demonstrable project outcomes for these skills to improve fit.
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-300">No missing skills flagged. Great baseline profile.</p>
        )}
      </div>
    </article>
  );
}

export default SkillGapPanel;
