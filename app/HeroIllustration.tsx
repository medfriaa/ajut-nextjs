export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2F6B4F" />
          <stop offset="100%" stopColor="#204A37" />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0EFEA" />
        </linearGradient>
        <linearGradient id="toolGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E0973A" />
          <stop offset="100%" stopColor="#C97A1F" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#12261E" floodOpacity="0.12" />
        </filter>
      </defs>

      <ellipse cx="200" cy="250" rx="150" ry="14" fill="#12261E" opacity="0.06" />

      <g filter="url(#softShadow)">
        <polygon points="200,40 320,100 320,220 80,220 80,100" fill="url(#wallGrad)" stroke="#E7E4DC" strokeWidth="1.5" />
        <polygon points="200,40 340,105 320,115 200,60 80,115 60,105" fill="url(#roofGrad)" />
        <rect x="175" y="150" width="50" height="70" rx="3" fill="#2F6B4F" opacity="0.85" />
        <rect x="105" y="140" width="45" height="45" rx="3" fill="#E7F0EA" stroke="#2F6B4F" strokeWidth="2" />
        <rect x="250" y="140" width="45" height="45" rx="3" fill="#E7F0EA" stroke="#2F6B4F" strokeWidth="2" />
      </g>

      <g transform="translate(40, 170) rotate(-18)" filter="url(#softShadow)">
        <rect x="0" y="0" width="14" height="70" rx="6" fill="url(#toolGrad)" />
        <circle cx="7" cy="0" r="16" fill="url(#toolGrad)" />
        <circle cx="7" cy="0" r="7" fill="#FAF9F6" />
      </g>

      <g transform="translate(330, 150) rotate(22)" filter="url(#softShadow)">
        <rect x="0" y="0" width="12" height="60" rx="5" fill="#2F6B4F" />
        <polygon points="-14,0 26,0 12,-30 0,-30" fill="#2F6B4F" />
      </g>

      <circle cx="70" cy="60" r="5" fill="#E0973A" opacity="0.6" />
      <circle cx="340" cy="70" r="4" fill="#2F6B4F" opacity="0.5" />
      <circle cx="355" cy="180" r="6" fill="#E0973A" opacity="0.4" />
    </svg>
  );
}
