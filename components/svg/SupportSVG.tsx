'use client'

import { SupportSVGType } from '@/types'

interface SupportSVGProps {
  type: SupportSVGType
  size?: number
  className?: string
}

// Composant SVG réutilisable qui dessine chaque type de support ILV/PLV
export default function SupportSVG({ type, size = 80, className = '' }: SupportSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} xmlns="http://www.w3.org/2000/svg">
      {renderSupport(type)}
    </svg>
  )
}

function renderSupport(type: SupportSVGType) {
  switch (type) {
    case 'plan-magasin':
      return (
        <g>
          {/* Fond carte */}
          <rect x="8" y="8" width="64" height="64" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
          {/* Grille du plan */}
          <line x1="8" y1="30" x2="72" y2="30" stroke="#93C5FD" strokeWidth="1"/>
          <line x1="8" y1="50" x2="72" y2="50" stroke="#93C5FD" strokeWidth="1"/>
          <line x1="30" y1="8" x2="30" y2="72" stroke="#93C5FD" strokeWidth="1"/>
          <line x1="52" y1="8" x2="52" y2="72" stroke="#93C5FD" strokeWidth="1"/>
          {/* Rayons */}
          <rect x="12" y="12" width="15" height="15" rx="2" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1"/>
          <rect x="33" y="12" width="15" height="15" rx="2" fill="#BBF7D0" stroke="#22C55E" strokeWidth="1"/>
          <rect x="55" y="33" width="15" height="15" rx="2" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1"/>
          {/* Point "Vous êtes ici" */}
          <circle cx="22" cy="60" r="5" fill="#EF4444"/>
          <circle cx="22" cy="60" r="3" fill="white"/>
          <text x="30" y="63" fontSize="6" fill="#EF4444" fontWeight="bold">Vous êtes ici</text>
        </g>
      )

    case 'panneau-rayon':
      return (
        <g>
          {/* Support accroché */}
          <rect x="35" y="4" width="10" height="8" fill="#6B7280" rx="1"/>
          {/* Panneau */}
          <rect x="10" y="12" width="60" height="28" rx="4" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="1.5"/>
          <text x="40" y="30" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PEINTURE</text>
          {/* Sous-panneaux */}
          <rect x="10" y="45" width="28" height="14" rx="3" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1"/>
          <text x="24" y="55" textAnchor="middle" fill="#1E40AF" fontSize="6" fontWeight="600">Murs</text>
          <rect x="42" y="45" width="28" height="14" rx="3" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1"/>
          <text x="56" y="55" textAnchor="middle" fill="#1E40AF" fontSize="6" fontWeight="600">Boiserie</text>
        </g>
      )

    case 'marquage-sol':
      return (
        <g>
          {/* Sol */}
          <rect x="5" y="40" width="70" height="35" rx="3" fill="#F3F4F6"/>
          {/* Flèches au sol */}
          <polygon points="40,45 55,60 48,60 48,72 32,72 32,60 25,60" fill="#3B82F6" opacity="0.8"/>
          <polygon points="40,45 55,60 48,60 48,72 32,72 32,60 25,60" fill="none" stroke="#1D4ED8" strokeWidth="1.5"/>
          {/* Ligne pointillée */}
          <line x1="15" y1="56" x2="25" y2="56" stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3"/>
          <line x1="55" y1="56" x2="65" y2="56" stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3"/>
          {/* Label */}
          <text x="40" y="20" textAnchor="middle" fill="#6B7280" fontSize="7">Sol</text>
          <rect x="15" y="10" width="50" height="16" rx="3" fill="none" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,2"/>
        </g>
      )

    case 'etiquette-prix':
      return (
        <g>
          {/* Étiquette */}
          <rect x="8" y="15" width="64" height="50" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
          {/* Barre couleur */}
          <rect x="8" y="15" width="64" height="10" rx="4" fill="#22C55E"/>
          <rect x="8" y="21" width="64" height="4" fill="#22C55E"/>
          {/* Texte */}
          <text x="40" y="38" textAnchor="middle" fill="#111827" fontSize="7" fontWeight="600">Peinture Acryl.</text>
          <text x="40" y="50" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="800">34,90€</text>
          <text x="40" y="60" textAnchor="middle" fill="#6B7280" fontSize="6">13,96 €/L</text>
        </g>
      )

    case 'fiche-conseil':
      return (
        <g>
          {/* Feuille */}
          <rect x="12" y="5" width="56" height="70" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
          {/* En-tête */}
          <rect x="12" y="5" width="56" height="14" rx="3" fill="#3B82F6"/>
          <rect x="12" y="15" width="56" height="4" fill="#3B82F6"/>
          <text x="40" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">CONSEIL</text>
          {/* Lignes de texte */}
          <rect x="18" y="25" width="40" height="3" rx="1" fill="#E5E7EB"/>
          <rect x="18" y="32" width="44" height="3" rx="1" fill="#E5E7EB"/>
          <rect x="18" y="39" width="35" height="3" rx="1" fill="#E5E7EB"/>
          {/* Check marks */}
          <circle cx="22" cy="50" r="4" fill="#22C55E" opacity="0.2"/>
          <text x="22" y="52" textAnchor="middle" fill="#22C55E" fontSize="6">✓</text>
          <rect x="30" y="48" width="30" height="3" rx="1" fill="#E5E7EB"/>
          <circle cx="22" cy="60" r="4" fill="#22C55E" opacity="0.2"/>
          <text x="22" y="62" textAnchor="middle" fill="#22C55E" fontSize="6">✓</text>
          <rect x="30" y="58" width="28" height="3" rx="1" fill="#E5E7EB"/>
        </g>
      )

    case 'fiche-produit':
      return (
        <g>
          <rect x="12" y="5" width="56" height="70" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
          {/* Image produit */}
          <rect x="18" y="10" width="44" height="25" rx="2" fill="#F3F4F6"/>
          <circle cx="40" cy="22" r="8" fill="#BFDBFE"/>
          {/* Lignes info */}
          <rect x="18" y="40" width="44" height="3" rx="1" fill="#111827"/>
          <rect x="18" y="47" width="38" height="2" rx="1" fill="#9CA3AF"/>
          <rect x="18" y="53" width="30" height="2" rx="1" fill="#9CA3AF"/>
          <rect x="18" y="59" width="35" height="2" rx="1" fill="#9CA3AF"/>
          <rect x="18" y="65" width="20" height="4" rx="1" fill="#3B82F6"/>
        </g>
      )

    case 'bandeau-gondole':
      return (
        <g>
          {/* Étagère */}
          <rect x="5" y="50" width="70" height="4" fill="#9CA3AF"/>
          <rect x="5" y="35" width="70" height="4" fill="#9CA3AF"/>
          {/* Bandeau */}
          <rect x="5" y="28" width="70" height="10" rx="2" fill="#1E40AF"/>
          <text x="40" y="35" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PEINTURES INT.</text>
          {/* Produits sur étagère */}
          <rect x="10" y="40" width="10" height="13" rx="1" fill="#BFDBFE"/>
          <rect x="23" y="40" width="10" height="13" rx="1" fill="#BBF7D0"/>
          <rect x="36" y="40" width="10" height="13" rx="1" fill="#FDE68A"/>
          <rect x="49" y="40" width="10" height="13" rx="1" fill="#FECACA"/>
          <rect x="62" y="42" width="8" height="11" rx="1" fill="#E9D5FF"/>
        </g>
      )

    case 'separateur':
      return (
        <g>
          <rect x="5" y="20" width="70" height="4" fill="#9CA3AF"/>
          <rect x="5" y="55" width="70" height="4" fill="#9CA3AF"/>
          {/* Séparateur vertical */}
          <rect x="37" y="24" width="6" height="31" rx="1" fill="#3B82F6" opacity="0.8"/>
          <text x="25" y="42" textAnchor="middle" fill="#6B7280" fontSize="6">Mate</text>
          <text x="55" y="42" textAnchor="middle" fill="#6B7280" fontSize="6">Satin</text>
          {/* Produits */}
          <rect x="10" y="26" width="8" height="12" rx="1" fill="#BFDBFE"/>
          <rect x="20" y="26" width="8" height="12" rx="1" fill="#BFDBFE"/>
          <rect x="50" y="26" width="8" height="12" rx="1" fill="#FDE68A"/>
          <rect x="60" y="26" width="8" height="12" rx="1" fill="#FDE68A"/>
        </g>
      )

    case 'stop-trottoir':
      return (
        <g>
          {/* Chevalet */}
          <polygon points="20,75 25,15 55,15 60,75" fill="#F97316" stroke="#EA580C" strokeWidth="1.5"/>
          <polygon points="22,73 27,18 53,18 58,73" fill="white"/>
          {/* Contenu */}
          <text x="40" y="35" textAnchor="middle" fill="#EA580C" fontSize="8" fontWeight="800">SOLDES</text>
          <text x="40" y="47" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">-30%</text>
          <text x="40" y="57" textAnchor="middle" fill="#6B7280" fontSize="6">Peintures</text>
          {/* Sol */}
          <rect x="0" y="73" width="80" height="7" fill="#E5E7EB" rx="1"/>
        </g>
      )

    case 'totem':
      return (
        <g>
          {/* Base */}
          <rect x="28" y="68" width="24" height="8" rx="2" fill="#6B7280"/>
          {/* Colonne */}
          <rect x="36" y="10" width="8" height="60" fill="#9CA3AF"/>
          {/* Panneau */}
          <rect x="10" y="8" width="60" height="40" rx="4" fill="#7C3AED" stroke="#6D28D9" strokeWidth="1.5"/>
          {/* Contenu */}
          <text x="40" y="22" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">NOUVEAU</text>
          <circle cx="40" cy="32" r="8" fill="white" opacity="0.3"/>
          <text x="40" y="35" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PROMO</text>
          <text x="40" y="44" textAnchor="middle" fill="#FDE68A" fontSize="6">-20% peinture</text>
        </g>
      )

    case 'kakemono':
      return (
        <g>
          {/* Support haut */}
          <rect x="22" y="3" width="36" height="5" rx="2" fill="#6B7280"/>
          {/* Bannière */}
          <rect x="24" y="8" width="32" height="60" rx="2" fill="#EC4899" stroke="#DB2777" strokeWidth="1"/>
          {/* Contenu */}
          <text x="40" y="22" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">ColorPlus</text>
          <circle cx="40" cy="35" r="10" fill="white" opacity="0.2"/>
          <text x="40" y="38" textAnchor="middle" fill="white" fontSize="8" fontWeight="800">-25%</text>
          <text x="40" y="52" textAnchor="middle" fill="white" fontSize="5">Gamme Premium</text>
          <text x="40" y="60" textAnchor="middle" fill="#FDE68A" fontSize="5">En rayon →</text>
          {/* Pied */}
          <rect x="32" y="68" width="16" height="8" rx="2" fill="#6B7280"/>
        </g>
      )

    case 'stop-rayon':
      return (
        <g>
          {/* Étagère */}
          <rect x="0" y="30" width="10" height="40" fill="#9CA3AF"/>
          {/* Drapeau perpendiculaire */}
          <rect x="10" y="35" width="60" height="30" rx="4" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5"/>
          {/* Contenu */}
          <text x="40" y="48" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">OFFRE SPÉCIALE</text>
          <text x="40" y="58" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="800">2+1 GRATUIT</text>
          {/* Flèche */}
          <polygon points="68,50 75,45 75,55" fill="#EF4444"/>
        </g>
      )

    case 'display':
      return (
        <g>
          {/* Présentoir */}
          <rect x="12" y="25" width="56" height="50" rx="4" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
          {/* En-tête marque */}
          <rect x="12" y="25" width="56" height="16" rx="4" fill="#F97316"/>
          <rect x="12" y="37" width="56" height="4" fill="#F97316"/>
          <text x="40" y="37" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">ColorPro</text>
          {/* Mini produits */}
          <rect x="18" y="47" width="12" height="20" rx="2" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="1"/>
          <rect x="34" y="47" width="12" height="20" rx="2" fill="#BBF7D0" stroke="#86EFAC" strokeWidth="1"/>
          <rect x="50" y="47" width="12" height="20" rx="2" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1"/>
        </g>
      )

    case 'drapeau':
      return (
        <g>
          {/* Mât */}
          <rect x="18" y="5" width="4" height="70" fill="#6B7280"/>
          {/* Drapeau */}
          <polygon points="22,8 70,8 65,25 70,42 22,42" fill="#3B82F6" stroke="#2563EB" strokeWidth="1"/>
          <text x="44" y="22" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">SOLDES</text>
          <text x="44" y="33" textAnchor="middle" fill="white" fontSize="8" fontWeight="800">-40%</text>
          {/* Base */}
          <circle cx="20" cy="75" r="5" fill="#6B7280"/>
        </g>
      )

    case 'vitrophanie':
      return (
        <g>
          {/* Vitrine */}
          <rect x="5" y="5" width="70" height="70" rx="3" fill="#DBEAFE" opacity="0.3" stroke="#93C5FD" strokeWidth="1.5"/>
          {/* Reflet */}
          <line x1="60" y1="8" x2="72" y2="20" stroke="white" strokeWidth="2" opacity="0.6"/>
          <line x1="55" y1="8" x2="72" y2="25" stroke="white" strokeWidth="1" opacity="0.4"/>
          {/* Adhésif promotionnel */}
          <rect x="12" y="20" width="56" height="40" rx="6" fill="#F97316" opacity="0.9"/>
          <text x="40" y="34" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">SOLDES</text>
          <text x="40" y="45" textAnchor="middle" fill="white" fontSize="10" fontWeight="800">-40%</text>
          <text x="40" y="55" textAnchor="middle" fill="#FDE68A" fontSize="5" fontWeight="bold">sur toute la peinture</text>
        </g>
      )

    case 'borne-interactive':
      return (
        <g>
          {/* Pied */}
          <rect x="30" y="55" width="20" height="18" fill="#6B7280" rx="2"/>
          <rect x="25" y="70" width="30" height="6" rx="2" fill="#4B5563"/>
          {/* Écran */}
          <rect x="12" y="5" width="56" height="52" rx="4" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
          <rect x="16" y="9" width="48" height="38" rx="2" fill="#3B82F6"/>
          {/* Interface écran */}
          <text x="40" y="22" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">BIENVENUE</text>
          <rect x="22" y="28" width="36" height="8" rx="3" fill="white" opacity="0.9"/>
          <text x="40" y="34" textAnchor="middle" fill="#3B82F6" fontSize="5" fontWeight="600">Rechercher</text>
          <rect x="22" y="38" width="16" height="6" rx="2" fill="#22C55E"/>
          <rect x="42" y="38" width="16" height="6" rx="2" fill="#F97316"/>
        </g>
      )

    case 'affichage-digital':
      return (
        <g>
          {/* Écran suspendu */}
          <rect x="35" y="2" width="10" height="6" fill="#6B7280" rx="1"/>
          <rect x="8" y="8" width="64" height="40" rx="3" fill="#111827" stroke="#374151" strokeWidth="1.5"/>
          <rect x="12" y="12" width="56" height="32" rx="2" fill="#0EA5E9"/>
          {/* Contenu digital */}
          <text x="40" y="24" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PROMO DU JOUR</text>
          <text x="40" y="34" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="800">-30%</text>
          <text x="40" y="42" textAnchor="middle" fill="white" fontSize="5">Rayon Peinture →</text>
          {/* Indicateur digital */}
          <circle cx="40" cy="54" r="3" fill="#22C55E"/>
        </g>
      )

    case 'etiquette-connectee':
      return (
        <g>
          {/* Étiquette e-ink */}
          <rect x="8" y="18" width="64" height="44" rx="4" fill="white" stroke="#111827" strokeWidth="2"/>
          {/* Écran e-paper */}
          <rect x="12" y="22" width="56" height="36" rx="2" fill="#F9FAFB"/>
          <text x="40" y="34" textAnchor="middle" fill="#111827" fontSize="7" fontWeight="600">Paint Pro Mat</text>
          <text x="40" y="46" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="800">29,90€</text>
          <text x="40" y="54" textAnchor="middle" fill="#6B7280" fontSize="5">11,96 €/L</text>
          {/* Indicateur wifi */}
          <path d="M60,24 Q64,20 68,24" fill="none" stroke="#22C55E" strokeWidth="1"/>
          <path d="M62,26 Q64,24 66,26" fill="none" stroke="#22C55E" strokeWidth="1"/>
          <circle cx="64" cy="27" r="1" fill="#22C55E"/>
          {/* QR code mini */}
          <rect x="14" y="24" width="10" height="10" fill="#111827" rx="1"/>
          <rect x="16" y="26" width="2" height="2" fill="white"/>
          <rect x="20" y="26" width="2" height="2" fill="white"/>
          <rect x="16" y="30" width="2" height="2" fill="white"/>
        </g>
      )

    case 'vitrine-digitale':
      return (
        <g>
          {/* Cadre vitrine */}
          <rect x="5" y="5" width="70" height="70" rx="3" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
          {/* Écran */}
          <rect x="9" y="9" width="62" height="54" rx="2" fill="#7C3AED"/>
          {/* Contenu */}
          <text x="40" y="24" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">BRICO+</text>
          <rect x="20" y="30" width="40" height="20" rx="3" fill="white" opacity="0.15"/>
          <text x="40" y="42" textAnchor="middle" fill="white" fontSize="6">Tout pour peindre</text>
          <text x="40" y="52" textAnchor="middle" fill="#FDE68A" fontSize="5">Ouvert Lun-Sam 9h-19h</text>
          {/* Barre LED */}
          <rect x="9" y="63" width="62" height="3" rx="1" fill="#22C55E" opacity="0.8"/>
          {/* Reflet */}
          <line x1="60" y1="10" x2="68" y2="18" stroke="white" strokeWidth="1.5" opacity="0.3"/>
        </g>
      )

    case 'robot-accueil':
      return (
        <g>
          {/* Corps */}
          <rect x="22" y="30" width="36" height="30" rx="8" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5"/>
          {/* Tête */}
          <rect x="25" y="10" width="30" height="22" rx="6" fill="white" stroke="#9CA3AF" strokeWidth="1.5"/>
          {/* Yeux */}
          <circle cx="35" cy="20" r="4" fill="#3B82F6"/>
          <circle cx="45" cy="20" r="4" fill="#3B82F6"/>
          <circle cx="35" cy="19" r="1.5" fill="white"/>
          <circle cx="45" cy="19" r="1.5" fill="white"/>
          {/* Sourire */}
          <path d="M35,26 Q40,30 45,26" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Écran sur le torse */}
          <rect x="28" y="36" width="24" height="14" rx="3" fill="#3B82F6"/>
          <text x="40" y="45" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">AIDE ?</text>
          {/* Roues */}
          <circle cx="30" cy="62" r="4" fill="#6B7280"/>
          <circle cx="50" cy="62" r="4" fill="#6B7280"/>
        </g>
      )

    default:
      return (
        <g>
          <rect x="10" y="10" width="60" height="60" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5"/>
          <text x="40" y="44" textAnchor="middle" fill="#9CA3AF" fontSize="8">?</text>
        </g>
      )
  }
}
