'use client'

// Scène de rayon de magasin de bricolage (rayon peinture) en SVG
// Les erreurs sont visuellement compréhensibles sans indice externe

export default function StoreScene({ className = '' }: { className?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 340" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Date du jour affichée en haut */}
      <rect x="280" y="2" width="115" height="16" rx="3" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="0.5"/>
      <text x="337" y="13" textAnchor="middle" fill="#6B7280" fontSize="7">📅 Aujourd&apos;hui : 22 mars</text>

      {/* Sol */}
      <rect x="0" y="280" width="400" height="60" fill="#E5E7EB"/>

      {/* Mur du fond */}
      <rect x="0" y="18" width="400" height="262" fill="#F9FAFB"/>

      {/* ===== ZONE 1 : Panneau "PEINTURE" (correct) ===== */}
      <g>
        <rect x="130" y="22" width="140" height="32" rx="4" fill="#1E40AF"/>
        <text x="200" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PEINTURE</text>
        <rect x="190" y="14" width="20" height="10" fill="#6B7280"/>
      </g>

      {/* ===== GONDOLE GAUCHE ===== */}
      <g>
        <rect x="15" y="62" width="170" height="210" fill="none" stroke="#D1D5DB" strokeWidth="1"/>
        <rect x="15" y="62" width="170" height="3" fill="#9CA3AF"/>
        <rect x="15" y="112" width="170" height="3" fill="#9CA3AF"/>
        <rect x="15" y="162" width="170" height="3" fill="#9CA3AF"/>
        <rect x="15" y="212" width="170" height="3" fill="#9CA3AF"/>
        <rect x="15" y="262" width="170" height="3" fill="#9CA3AF"/>

        {/* ZONE 5 : Bandeau de gondole ILLISIBLE (ERREUR) — texte volontairement minuscule */}
        <rect x="15" y="56" width="170" height="8" rx="1" fill="#3B82F6"/>
        <text x="100" y="62" textAnchor="middle" fill="white" fontSize="2.5" fontWeight="bold">
          PEINTURES INTÉRIEURES MURS PLAFONDS ACRYLIQUE GLYCÉRO BOISERIES
        </text>

        {/* Pots de peinture */}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`p1-${j}`} x={22 + j*27} y={67} width={22} height={42} rx="3"
            fill={['#BFDBFE','#BBF7D0','#FDE68A','#FECACA','#E9D5FF','#BFDBFE'][j]}
            stroke={['#93C5FD','#86EFAC','#FCD34D','#FCA5A5','#D8B4FE','#93C5FD'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`p2-${j}`} x={22 + j*27} y={117} width={22} height={42} rx="3"
            fill={['#FDE68A','#BFDBFE','#BBF7D0','#E9D5FF','#FECACA','#FDE68A'][j]}
            stroke={['#FCD34D','#93C5FD','#86EFAC','#D8B4FE','#FCA5A5','#FCD34D'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`p3-${j}`} x={22 + j*27} y={167} width={22} height={42} rx="3"
            fill={['#FECACA','#FDE68A','#BFDBFE','#BBF7D0','#BFDBFE','#E9D5FF'][j]}
            stroke={['#FCA5A5','#FCD34D','#93C5FD','#86EFAC','#93C5FD','#D8B4FE'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`p4-${j}`} x={22 + j*27} y={217} width={22} height={42} rx="3"
            fill={['#BBF7D0','#E9D5FF','#FECACA','#BFDBFE','#FDE68A','#BBF7D0'][j]}
            stroke={['#86EFAC','#D8B4FE','#FCA5A5','#93C5FD','#FCD34D','#86EFAC'][j]}
            strokeWidth="1"/>
        ))}
      </g>

      {/* ===== ZONE 4 : Stop-rayon PROMO (correct) ===== */}
      <g>
        <rect x="185" y="115" width="55" height="28" rx="3" fill="#EF4444"/>
        <text x="212" y="128" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PROMO</text>
        <text x="212" y="138" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="800">2+1</text>
      </g>

      {/* ===== GONDOLE DROITE ===== */}
      <g>
        <rect x="215" y="62" width="170" height="210" fill="none" stroke="#D1D5DB" strokeWidth="1"/>
        <rect x="215" y="62" width="170" height="3" fill="#9CA3AF"/>
        <rect x="215" y="112" width="170" height="3" fill="#9CA3AF"/>
        <rect x="215" y="162" width="170" height="3" fill="#9CA3AF"/>
        <rect x="215" y="212" width="170" height="3" fill="#9CA3AF"/>
        <rect x="215" y="262" width="170" height="3" fill="#9CA3AF"/>

        {[0,1,2,3,4,5].map(j => (
          <rect key={`pr1-${j}`} x={222 + j*27} y={67} width={22} height={42} rx="3"
            fill={['#FDE68A','#BFDBFE','#FECACA','#BBF7D0','#E9D5FF','#BFDBFE'][j]}
            stroke={['#FCD34D','#93C5FD','#FCA5A5','#86EFAC','#D8B4FE','#93C5FD'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`pr2-${j}`} x={222 + j*27} y={117} width={22} height={42} rx="3"
            fill={['#BFDBFE','#FDE68A','#BBF7D0','#FECACA','#BFDBFE','#E9D5FF'][j]}
            stroke={['#93C5FD','#FCD34D','#86EFAC','#FCA5A5','#93C5FD','#D8B4FE'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`pr3-${j}`} x={222 + j*27} y={167} width={22} height={42} rx="3"
            fill={['#E9D5FF','#FECACA','#BFDBFE','#FDE68A','#BBF7D0','#FECACA'][j]}
            stroke={['#D8B4FE','#FCA5A5','#93C5FD','#FCD34D','#86EFAC','#FCA5A5'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`pr4-${j}`} x={222 + j*27} y={217} width={22} height={42} rx="3"
            fill={['#BBF7D0','#BFDBFE','#FDE68A','#E9D5FF','#FECACA','#BBF7D0'][j]}
            stroke={['#86EFAC','#93C5FD','#FCD34D','#D8B4FE','#FCA5A5','#86EFAC'][j]}
            strokeWidth="1"/>
        ))}
      </g>

      {/* ===== ZONE 2 : Étiquette prix SANS prix au litre (ERREUR) ===== */}
      <g>
        <rect x="300" y="160" width="55" height="30" rx="2" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
        <rect x="300" y="160" width="55" height="8" rx="2" fill="#22C55E"/>
        <text x="327" y="167" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">PRIX</text>
        <text x="327" y="178" textAnchor="middle" fill="#111827" fontSize="5">Peinture Acryl.</text>
        <text x="327" y="187" textAnchor="middle" fill="#111827" fontSize="8" fontWeight="bold">34,90€ TTC</text>
      </g>

      {/* ===== ZONE 8 : Promo EXPIRÉE toujours affichée (ERREUR) — date clairement passée ===== */}
      <g>
        <rect x="100" y="112" width="82" height="38" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5"/>
        <text x="141" y="126" textAnchor="middle" fill="#92400E" fontSize="7" fontWeight="bold">-30% PEINTURE</text>
        <text x="141" y="138" textAnchor="middle" fill="#92400E" fontSize="5.5">Offre valable</text>
        <text x="141" y="147" textAnchor="middle" fill="#DC2626" fontSize="5.5" fontWeight="bold">jusqu&apos;au 15 janvier</text>
      </g>

      {/* ===== ZONE 3 : Kakemono MASQUANT la fiche conseil (ERREUR) ===== */}
      {/* Fiche conseil DERRIÈRE — dépasse largement à gauche et en bas du kakemono */}
      <g>
        {/* Fiche conseil visible : dépasse à gauche et en bas */}
        <rect x="172" y="152" width="42" height="72" rx="3" fill="white" stroke="#3B82F6" strokeWidth="2"/>
        {/* En-tête bleu de la fiche visible en haut à gauche */}
        <rect x="172" y="152" width="42" height="12" rx="3" fill="#3B82F6"/>
        <rect x="172" y="160" width="42" height="4" fill="#3B82F6"/>
        <text x="193" y="161" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">CONSEIL</text>
        {/* Lignes de texte visibles en bas sous le kakemono */}
        <rect x="176" y="208" width="34" height="2" rx="1" fill="#93C5FD"/>
        <rect x="176" y="213" width="28" height="2" rx="1" fill="#93C5FD"/>
        <rect x="176" y="218" width="30" height="2" rx="1" fill="#93C5FD"/>
        {/* Check marks visibles en bas */}
        <circle cx="179" y="213" cy="213" r="1.5" fill="#3B82F6"/>
      </g>
      {/* Kakemono PAR-DESSUS au centre — plus petit que la fiche */}
      <g>
        <rect x="183" y="162" width="26" height="52" rx="2" fill="#EC4899" stroke="#DB2777" strokeWidth="1.5"/>
        <text x="196" y="178" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">ColorPlus</text>
        <text x="196" y="193" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">-25%</text>
        <text x="196" y="208" textAnchor="middle" fill="white" fontSize="4">Gamme Pro</text>
      </g>

      {/* ===== ZONE 6 : Fiche produit ABSENTE — emplacement vide avec crochet ===== */}
      <g>
        {/* Crochet/support vide sur l'étagère */}
        <rect x="355" y="213" width="26" height="3" fill="#9CA3AF"/>
        <rect x="362" y="210" width="4" height="6" fill="#6B7280" rx="1"/>
        <rect x="370" y="210" width="4" height="6" fill="#6B7280" rx="1"/>
        {/* Zone vide avec label */}
        <rect x="352" y="216" width="30" height="44" rx="2" fill="#FEF2F2" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4,3"/>
        <text x="367" y="234" textAnchor="middle" fill="#9CA3AF" fontSize="4.5">Fiche</text>
        <text x="367" y="243" textAnchor="middle" fill="#9CA3AF" fontSize="4.5">produit</text>
        <text x="367" y="255" textAnchor="middle" fill="#D1D5DB" fontSize="10">∅</text>
      </g>

      {/* ===== ZONE 7 : Marquage au sol vers caisse (correct) ===== */}
      <g>
        <polygon points="200,288 210,302 206,302 206,318 194,318 194,302 190,302" fill="#3B82F6" opacity="0.5"/>
        <text x="200" y="332" textAnchor="middle" fill="#3B82F6" fontSize="6">Caisse →</text>
      </g>

      {/* ===== ZONES 9-10 : Zones non-erreur (pièges) ===== */}
      {/* Zone 9 : pots bien rangés */}
      {/* Zone 10 : produits correctement placés — pas de visuel spécial, ce sont les pots normaux */}
    </svg>
  )
}
