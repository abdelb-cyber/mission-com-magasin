'use client'

// Illustration d'ambiance pour la page d'accueil : scène de magasin stylisée

export default function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Ciel / fond */}
      <rect width="320" height="200" fill="#EFF6FF" rx="12"/>

      {/* Magasin */}
      <rect x="60" y="60" width="200" height="120" fill="white" stroke="#93C5FD" strokeWidth="2" rx="4"/>

      {/* Toit */}
      <polygon points="40,60 280,60 260,30 60,30" fill="#1E40AF"/>
      <text x="160" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">BRICO+</text>

      {/* Vitrine gauche */}
      <rect x="75" y="80" width="60" height="60" fill="#DBEAFE" rx="3" stroke="#93C5FD" strokeWidth="1"/>
      {/* Adhésif vitrine */}
      <rect x="80" y="90" width="50" height="20" rx="4" fill="#F97316" opacity="0.85"/>
      <text x="105" y="103" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">SOLDES -30%</text>
      {/* Produits en vitrine */}
      <rect x="82" y="118" width="12" height="18" rx="2" fill="#BFDBFE"/>
      <rect x="97" y="118" width="12" height="18" rx="2" fill="#BBF7D0"/>
      <rect x="112" y="118" width="12" height="18" rx="2" fill="#FDE68A"/>

      {/* Porte */}
      <rect x="145" y="90" width="30" height="90" fill="#3B82F6" rx="2"/>
      <circle cx="170" cy="135" r="3" fill="#FDE68A"/>

      {/* Vitrine droite */}
      <rect x="185" y="80" width="60" height="60" fill="#DBEAFE" rx="3" stroke="#93C5FD" strokeWidth="1"/>
      {/* Écran digital */}
      <rect x="195" y="85" width="40" height="25" rx="2" fill="#111827"/>
      <rect x="198" y="88" width="34" height="19" fill="#7C3AED" rx="1"/>
      <text x="215" y="100" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">NOUVEAU</text>
      {/* Produits */}
      <rect x="192" y="118" width="12" height="18" rx="2" fill="#FECACA"/>
      <rect x="207" y="118" width="12" height="18" rx="2" fill="#E9D5FF"/>
      <rect x="222" y="118" width="12" height="18" rx="2" fill="#BFDBFE"/>

      {/* Stop-trottoir */}
      <g transform="translate(30, 130)">
        <polygon points="5,50 10,5 35,5 40,50" fill="#F97316" stroke="#EA580C" strokeWidth="1"/>
        <polygon points="8,47 12,8 33,8 37,47" fill="white"/>
        <text x="22" y="25" textAnchor="middle" fill="#EA580C" fontSize="6" fontWeight="bold">PROMO</text>
        <text x="22" y="35" textAnchor="middle" fill="#111827" fontSize="5">Peinture</text>
      </g>

      {/* Totem */}
      <g transform="translate(270, 100)">
        <rect x="10" y="60" width="20" height="6" rx="1" fill="#6B7280"/>
        <rect x="16" y="10" width="8" height="52" fill="#9CA3AF"/>
        <rect x="2" y="5" width="36" height="30" rx="3" fill="#7C3AED"/>
        <text x="20" y="20" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">-20%</text>
        <text x="20" y="28" textAnchor="middle" fill="white" fontSize="4">Peinture</text>
      </g>

      {/* Sol / trottoir */}
      <rect x="0" y="180" width="320" height="20" fill="#E5E7EB" rx="0"/>

      {/* Personnages simplifiés */}
      {/* Personne 1 */}
      <g transform="translate(120, 150)">
        <circle cx="10" cy="5" r="6" fill="#F59E0B"/>
        <rect x="5" y="12" width="10" height="16" rx="3" fill="#3B82F6"/>
        <rect x="2" y="28" width="5" height="10" rx="2" fill="#1E40AF"/>
        <rect x="13" y="28" width="5" height="10" rx="2" fill="#1E40AF"/>
      </g>

      {/* Personne 2 avec panier */}
      <g transform="translate(250, 145)">
        <circle cx="10" cy="5" r="6" fill="#EC4899"/>
        <rect x="5" y="12" width="10" height="16" rx="3" fill="#22C55E"/>
        <rect x="2" y="28" width="5" height="12" rx="2" fill="#15803D"/>
        <rect x="13" y="28" width="5" height="12" rx="2" fill="#15803D"/>
        {/* Panier */}
        <rect x="18" y="20" width="12" height="10" rx="2" fill="#F97316" opacity="0.7"/>
      </g>
    </svg>
  )
}
