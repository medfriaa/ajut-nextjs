const SCENES = [
  {
    label: "INSTALATOR",
    line: "NU MAI AI LUMINĂ?",
    sub: "Spune-ne ce s-a întâmplat.",
  },
  {
    label: "ELECTRICIAN",
    line: "ȚEAVA CURGE?",
    sub: "Găsim omul potrivit, azi.",
  },
  {
    label: "CURĂȚENIE",
    line: "CASA ARE NEVOIE DE TINE.",
    sub: "Sau de cineva care știe cum.",
  },
];

function WorkerSilhouette({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 200 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={"rim" + variant} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E0973A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2F6B4F" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={"body" + variant} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E1712" />
          <stop offset="100%" stopColor="#1A3327" />
        </linearGradient>
      </defs>
      {variant === 0 && (
        <g>
          <ellipse cx="100" cy="240" rx="70" ry="10" fill="#000" opacity="0.15" />
          <rect x="60" y="60" width="80" height="110" rx="16" fill={"url(#body" + variant + ")"} />
          <circle cx="100" cy="35" r="28" fill={"url(#body" + variant + ")"} />
          <rect x="55" y="55" width="90" height="115" rx="16" fill="none" stroke={"url(#rim" + variant + ")"} strokeWidth="2.5" opacity="0.7" />
          <rect x="75" y="165" width="20" height="70" rx="8" fill={"url(#body" + variant + ")"} />
          <rect x="105" y="165" width="20" height="70" rx="8" fill={"url(#body" + variant + ")"} />
          <rect x="150" y="90" width="14" height="55" rx="6" fill="#E0973A" transform="rotate(25 150 90)" />
        </g>
      )}
      {variant === 1 && (
        <g>
          <ellipse cx="100" cy="240" rx="70" ry="10" fill="#000" opacity="0.15" />
          <rect x="30" y="180" width="8" height="60" fill="#204A37" />
          <rect x="162" y="180" width="8" height="60" fill="#204A37" />
          <rect x="30" y="180" width="140" height="6" fill="#204A37" />
          <circle cx="100" cy="70" r="26" fill={"url(#body" + variant + ")"} />
          <rect x="72" y="94" width="56" height="90" rx="14" fill={"url(#body" + variant + ")"} />
          <rect x="68" y="90" width="64" height="95" rx="14" fill="none" stroke={"url(#rim" + variant + ")"} strokeWidth="2.5" opacity="0.7" />
          <rect x="95" y="40" width="10" height="36" fill="#E0973A" transform="rotate(-10 100 55)" />
        </g>
      )}
      {variant === 2 && (
        <g>
          <ellipse cx="100" cy="240" rx="70" ry="10" fill="#000" opacity="0.15" />
          <rect x="65" y="70" width="70" height="100" rx="16" fill={"url(#body" + variant + ")"} />
          <circle cx="100" cy="45" r="26" fill={"url(#body" + variant + ")"} />
          <rect x="60" y="65" width="80" height="105" rx="16" fill="none" stroke={"url(#rim" + variant + ")"} strokeWidth="2.5" opacity="0.7" />
          <rect x="30" y="90" width="45" height="12" rx="6" fill="#2F6B4F" transform="rotate(-15 50 95)" />
          <rect x="80" y="175" width="18" height="65" rx="8" fill={"url(#body" + variant + ")"} />
          <rect x="102" y="175" width="18" height="65" rx="8" fill={"url(#body" + variant + ")"} />
        </g>
      )}
    </svg>
  );
}

export default function HumanMoment() {
  return (
    <div className="-mx-5">
      {SCENES.map((scene, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center justify-end px-8 pb-14 overflow-hidden"
          style={{
            height: "92vh",
            background: "radial-gradient(ellipse at 50% 30%, #1A3327, #0E1712 70%)",
          }}
        >
          <div className="absolute top-10 text-white/35 text-[11px] font-semibold tracking-[0.3em]">
            {scene.label}
          </div>
          <div className="absolute" style={{ width: "170px", height: "220px", top: "18%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}>
            <WorkerSilhouette variant={i} />
          </div>
          <div className="relative text-center">
            <h3 className="font-serif text-white text-[30px] font-medium leading-tight mb-2">
              {scene.line}
            </h3>
            <p className="text-white/60 text-[14px]">{scene.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
