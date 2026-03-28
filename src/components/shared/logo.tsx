export const AcademyLogo = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(180deg,#fff2e7,#ffffff)] shadow-panel">
      <div className="absolute inset-x-4 top-5 h-1 rounded-full bg-brand-orange/80" />
      <div className="absolute inset-x-4 top-8 h-1 rounded-full bg-brand-orange/70" />
      <div className="absolute inset-x-4 top-11 h-1 rounded-full bg-brand-orange/60" />
      <span className="relative text-3xl">⚾</span>
    </div>
    <div className="mt-3 text-[13px] font-extrabold uppercase tracking-[0.3em] text-brand-navy">
      Baseball
    </div>
    <div className="mt-1 text-[10px] uppercase tracking-[0.45em] text-brand-orange">
      Academy
    </div>
  </div>
)
