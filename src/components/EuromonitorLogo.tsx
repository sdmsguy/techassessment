interface Props {
  size?: 'sm' | 'md' | 'lg';
  white?: boolean;
}

export default function EuromonitorLogo({ size = 'md', white = false }: Props) {
  const sizes = {
    sm: { icon: 'w-7 h-7', iconInner: 'w-4 h-4', text: 'text-base', sub: 'text-[8px]' },
    md: { icon: 'w-10 h-10', iconInner: 'w-5 h-5', text: 'text-xl', sub: 'text-[9px]' },
    lg: { icon: 'w-14 h-14', iconInner: 'w-7 h-7', text: 'text-3xl', sub: 'text-xs' },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className={`${s.icon} rounded-xl bg-gradient-to-br from-euro-orange to-euro-orange-dark flex items-center justify-center shadow-lg shadow-euro-orange/20`}>
        <svg viewBox="0 0 24 24" className={`${s.iconInner} text-white`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div className="leading-tight">
        <h1 className={`${s.text} font-extrabold tracking-tight ${white ? 'text-white' : 'text-euro-dark'}`}>
          euromonitor
        </h1>
        <p className={`${s.sub} font-bold uppercase tracking-[0.25em] ${white ? 'text-white/70' : 'text-euro-orange'}`}>
          Technical Assessment
        </p>
      </div>
    </div>
  );
}
