import { BotMessageSquare } from "lucide-react";

function InsightPanel({ insights }) {
  return (
    <article className="panel-glass px-6 py-6">
      <p className="text-xs uppercase tracking-[0.24em] text-brand-peach/80">Personalized AI Insights</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Mentor Highlights</h3>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {insights.map((insight, idx) => (
          <div key={`insight-${idx}`} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <BotMessageSquare className="h-5 w-5 text-brand-peach" />
            <p className="mt-2 text-sm text-brand-cream/90">{insight}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default InsightPanel;
