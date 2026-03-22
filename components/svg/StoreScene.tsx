'use client'

// Scène de rayon de magasin de bricolage (rayon peinture) en SVG
// Les zones sont numérotées et correspondent aux SCENE_ELEMENTS dans data/missions.ts

interface StoreSceneProps {
  className?: string
}

export default function StoreScene({ className = '' }: StoreSceneProps) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 320" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Sol */}
      <rect x="0" y="270" width="400" height="50" fill="#E5E7EB"/>

      {/* Mur du fond */}
      <rect x="0" y="0" width="400" height="270" fill="#F9FAFB"/>

      {/* ===== ZONE 1 : Panneau "PEINTURE" (correct) ===== */}
      <g id="zone-panneau">
        <rect x="130" y="8" width="140" height="32" rx="4" fill="#1E40AF"/>
        <text x="200" y="29" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PEINTURE</text>
        <rect x="190" y="0" width="20" height="10" fill="#6B7280"/>
      </g>

      {/* ===== GONDOLE GAUCHE ===== */}
      <g id="gondole-gauche">
        <rect x="15" y="50" width="170" height="210" fill="none" stroke="#D1D5DB" strokeWidth="1"/>
        {/* Étagères */}
        <rect x="15" y="50" width="170" height="3" fill="#9CA3AF"/>
        <rect x="15" y="100" width="170" height="3" fill="#9CA3AF"/>
        <rect x="15" y="150" width="170" height="3" fill="#9CA3AF"/>
        <rect x="15" y="200" width="170" height="3" fill="#9CA3AF"/>
        <rect x="15" y="250" width="170" height="3" fill="#9CA3AF"/>

        {/* ZONE 5 : Bandeau de gondole ILLISIBLE (ERREUR) */}
        <rect x="15" y="44" width="170" height="8" rx="1" fill="#3B82F6"/>
        <text x="100" y="50" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">
          PEINTURES INTÉRIEURES MURS ET PLAFONDS ACRYLIQUE ET GLYCÉRO
        </text>

        {/* Pots de peinture - étagère 1 */}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`pot1-${j}`} x={22 + j*27} y={55} width={22} height={42} rx="3"
            fill={['#BFDBFE','#BBF7D0','#FDE68A','#FECACA','#E9D5FF','#BFDBFE'][j]}
            stroke={['#93C5FD','#86EFAC','#FCD34D','#FCA5A5','#D8B4FE','#93C5FD'][j]}
            strokeWidth="1"/>
        ))}

        {/* Pots - étagère 2 */}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`pot2-${j}`} x={22 + j*27} y={105} width={22} height={42} rx="3"
            fill={['#FDE68A','#BFDBFE','#BBF7D0','#E9D5FF','#FECACA','#FDE68A'][j]}
            stroke={['#FCD34D','#93C5FD','#86EFAC','#D8B4FE','#FCA5A5','#FCD34D'][j]}
            strokeWidth="1"/>
        ))}

        {/* Pots - étagère 3 */}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`pot3-${j}`} x={22 + j*27} y={155} width={22} height={42} rx="3"
            fill={['#FECACA','#FDE68A','#BFDBFE','#BBF7D0','#BFDBFE','#E9D5FF'][j]}
            stroke={['#FCA5A5','#FCD34D','#93C5FD','#86EFAC','#93C5FD','#D8B4FE'][j]}
            strokeWidth="1"/>
        ))}

        {/* Pots - étagère 4 */}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`pot4-${j}`} x={22 + j*27} y={205} width={22} height={42} rx="3"
            fill={['#BBF7D0','#E9D5FF','#FECACA','#BFDBFE','#FDE68A','#BBF7D0'][j]}
            stroke={['#86EFAC','#D8B4FE','#FCA5A5','#93C5FD','#FCD34D','#86EFAC'][j]}
            strokeWidth="1"/>
        ))}
      </g>

      {/* ===== ZONE 4 : Stop-rayon PROMO (correct) ===== */}
      <g id="zone-stop-rayon">
        <rect x="185" y="105" width="55" height="28" rx="3" fill="#EF4444"/>
        <text x="212" y="118" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PROMO</text>
        <text x="212" y="128" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="800">2+1</text>
      </g>

      {/* ===== GONDOLE DROITE ===== */}
      <g id="gondole-droite">
        <rect x="215" y="50" width="170" height="210" fill="none" stroke="#D1D5DB" strokeWidth="1"/>
        <rect x="215" y="50" width="170" height="3" fill="#9CA3AF"/>
        <rect x="215" y="100" width="170" height="3" fill="#9CA3AF"/>
        <rect x="215" y="150" width="170" height="3" fill="#9CA3AF"/>
        <rect x="215" y="200" width="170" height="3" fill="#9CA3AF"/>
        <rect x="215" y="250" width="170" height="3" fill="#9CA3AF"/>

        {/* Pots droite */}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`potr1-${j}`} x={222 + j*27} y={55} width={22} height={42} rx="3"
            fill={['#FDE68A','#BFDBFE','#FECACA','#BBF7D0','#E9D5FF','#BFDBFE'][j]}
            stroke={['#FCD34D','#93C5FD','#FCA5A5','#86EFAC','#D8B4FE','#93C5FD'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`potr2-${j}`} x={222 + j*27} y={105} width={22} height={42} rx="3"
            fill={['#BFDBFE','#FDE68A','#BBF7D0','#FECACA','#BFDBFE','#E9D5FF'][j]}
            stroke={['#93C5FD','#FCD34D','#86EFAC','#FCA5A5','#93C5FD','#D8B4FE'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`potr3-${j}`} x={222 + j*27} y={155} width={22} height={42} rx="3"
            fill={['#E9D5FF','#FECACA','#BFDBFE','#FDE68A','#BBF7D0','#FECACA'][j]}
            stroke={['#D8B4FE','#FCA5A5','#93C5FD','#FCD34D','#86EFAC','#FCA5A5'][j]}
            strokeWidth="1"/>
        ))}
        {[0,1,2,3,4,5].map(j => (
          <rect key={`potr4-${j}`} x={222 + j*27} y={205} width={22} height={42} rx="3"
            fill={['#BBF7D0','#BFDBFE','#FDE68A','#E9D5FF','#FECACA','#BBF7D0'][j]}
            stroke={['#86EFAC','#93C5FD','#FCD34D','#D8B4FE','#FCA5A5','#86EFAC'][j]}
            strokeWidth="1"/>
        ))}
      </g>

      {/* ===== ZONE 2 : Étiquette prix SANS prix au litre (ERREUR) ===== */}
      <g id="zone-etiquette">
        <rect x="300" y="148" width="50" height="28" rx="2" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
        <text x="325" y="160" textAnchor="middle" fill="#111827" fontSize="6">Peinture</text>
        <text x="325" y="172" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">34,90€</text>
      </g>

      {/* ===== ZONE 8 : Promo EXPIRÉE toujours affichée (ERREUR) ===== */}
      <g id="zone-promo-expiree">
        <rect x="110" y="100" width="72" height="35" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5"/>
        <text x="146" y="115" textAnchor="middle" fill="#92400E" fontSize="7" fontWeight="bold">-30% PEINTURE</text>
        <text x="146" y="127" textAnchor="middle" fill="#92400E" fontSize="5.5">Jusqu&apos;au 15 janv.</text>
      </g>

      {/* ===== ZONE 3 : Kakemono MASQUANT la fiche conseil (ERREUR) ===== */}
      <g id="zone-kakemono">
        <rect x="186" y="150" width="28" height="60" rx="2" fill="#EC4899" opacity="0.9"/>
        <text x="200" y="172" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">ColorPlus</text>
        <text x="200" y="188" textAnchor="middle" fill="white" fontSize="7" fontWeight="800">-25%</text>
      </g>

      {/* ===== ZONE 6 : Fiche produit ABSENTE (ERREUR) ===== */}
      <g id="zone-fiche-absente">
        <rect x="355" y="200" width="28" height="45" rx="2" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="4,3"/>
        <text x="369" y="220" textAnchor="middle" fill="#D1D5DB" fontSize="5">Fiche</text>
        <text x="369" y="230" textAnchor="middle" fill="#D1D5DB" fontSize="5">produit</text>
        <text x="369" y="240" textAnchor="middle" fill="#D1D5DB" fontSize="8">?</text>
      </g>

      {/* ===== ZONE 7 : Marquage au sol vers caisse (correct) ===== */}
      <g id="zone-marquage">
        <polygon points="200,275 210,290 206,290 206,308 194,308 194,290 190,290" fill="#3B82F6" opacity="0.5"/>
        <text x="200" y="318" textAnchor="middle" fill="#3B82F6" fontSize="6">Caisse →</text>
      </g>
    </svg>
  )
}
