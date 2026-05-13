function GamificationPanel({ extendedData }) {
  const progress = Math.round((extendedData.xpInLevel / 350) * 100);

  return (
    <article className="panel-glass px-6 py-6">
      <p className="text-xs uppercase tracking-[0.24em] text-brand-peach/80">Gamified Progression</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">XP, Level, and Achievements</h3>

      <div className="mt-5 rounded-2xl border border-brand-orange/35 bg-brand-orange/10 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-peach/85">Current Level</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-4xl font-semibold text-white">{extendedData.level}</p>
          <p className="text-sm text-brand-cream/80">{extendedData.xp} XP total</p>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-black/35">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-magenta to-brand-peach" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {extendedData.achievements.map((badge) => (
          <div
            key={badge.title}
            className={`rounded-xl border px-3 py-2 text-sm ${
              badge.unlocked
                ? "border-brand-peach/50 bg-brand-peach/15 text-white"
                : "border-white/10 bg-black/30 text-brand-cream/70"
            }`}
          >
            {badge.title}
          </div>
        ))}
      </div>
    </article>
  );
}

export default GamificationPanel;
