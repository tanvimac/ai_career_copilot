function GlassCard({ title, subtitle, children, className = "" }) {
  return (
    <section className={`glass-panel rounded-2xl p-5 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {subtitle && <p className="text-xs uppercase tracking-[0.18em] text-brand-peach/85">{subtitle}</p>}
          {title && <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>}
        </div>
      )}
      {children}
    </section>
  );
}

export default GlassCard;
