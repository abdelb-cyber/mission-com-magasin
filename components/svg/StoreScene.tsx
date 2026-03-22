'use client'

// Scène de rayon de magasin de bricolage (rayon peinture) en SVG
// Utilisée dans la Mission 3 (diagnostic) et comme illustration

interface StoreSceneProps {
  width?: number
  height?: number
  className?: string
  showErrors?: boolean
}

export default function StoreScene({ width = 400, height = 300, className = '', showErrors = false }: StoreSceneProps) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Sol */}
      <rect x="0" y="240" width="400" height="60" fill="#E5E7EB"/>
      <line x1="0" y1="240" x2="400" y2="240" stroke="#D1D5DB" strokeWidth="1"/>

      {/* Mur du fond */}
      <rect x="0" y="0" width="400" height="240" fill="#F9FAFB"/>

      {/* Panneau rayon suspendu */}
      <rect x="120" y="10" width="160" height="35" rx="4" fill="#1E40AF"/>
      <text x="200" y="33" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">PEINTURE</text>
      <rect x="190" y="0" width="20" height="12" fill="#6B7280"/>

      {/* Gondole gauche - Étagères */}
      <g transform="translate(20, 55)">
        {/* Structure gondole */}
        <rect x="0" y="0" width="150" height="180" fill="none" stroke="#9CA3AF" strokeWidth="1"/>
        {/* Étagères */}
        {[0, 45, 90, 135].map((y, i) => (
          <g key={`shelf-l-${i}`}>
            <rect x="0" y={y} width="150" height="4" fill="#9CA3AF"/>
            {/* Pots de peinture */}
            {[0, 1, 2, 3, 4].map((j) => (
              <rect key={`pot-${i}-${j}`} x={5 + j * 30} y={y + 6} width={25} height={35} rx="3"
                fill={['#BFDBFE', '#BBF7D0', '#FDE68A', '#FECACA', '#E9D5FF'][j]}
                stroke={['#93C5FD', '#86EFAC', '#FCD34D', '#FCA5A5', '#D8B4FE'][j]}
                strokeWidth="1"
              />
            ))}
          </g>
        ))}
        {/* Bandeau de gondole (avec erreur potentielle) */}
        <rect x="0" y="-6" width="150" height="8" rx="1" fill="#3B82F6" opacity="0.9"/>
        <text x="75" y="0" textAnchor="middle" fill="white" fontSize={showErrors ? "3" : "5"} fontWeight="bold">
          PEINTURES INTÉRIEURES MURS ET PLAFONDS
        </text>
        {showErrors && (
          <rect x="0" y="-6" width="150" height="8" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" rx="1"/>
        )}
      </g>

      {/* Gondole droite */}
      <g transform="translate(230, 55)">
        <rect x="0" y="0" width="150" height="180" fill="none" stroke="#9CA3AF" strokeWidth="1"/>
        {[0, 45, 90, 135].map((y, i) => (
          <g key={`shelf-r-${i}`}>
            <rect x="0" y={y} width="150" height="4" fill="#9CA3AF"/>
            {[0, 1, 2, 3, 4].map((j) => (
              <rect key={`pot-r-${i}-${j}`} x={5 + j * 30} y={y + 6} width={25} height={35} rx="3"
                fill={['#FDE68A', '#BFDBFE', '#FECACA', '#BBF7D0', '#E9D5FF'][j]}
                stroke={['#FCD34D', '#93C5FD', '#FCA5A5', '#86EFAC', '#D8B4FE'][j]}
                strokeWidth="1"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Stop-rayon sur gondole gauche */}
      <g transform="translate(170, 100)">
        <rect x="0" y="0" width="55" height="25" rx="3" fill="#EF4444"/>
        <text x="27" y="11" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">PROMO</text>
        <text x="27" y="20" textAnchor="middle" fill="#FDE68A" fontSize="7" fontWeight="800">2+1</text>
      </g>

      {/* Étiquette prix (avec erreur potentielle : pas de prix au litre) */}
      <g transform="translate(280, 150)">
        <rect x="0" y="0" width="40" height="22" rx="2" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
        <text x="20" y="10" textAnchor="middle" fill="#111827" fontSize="5">Peinture</text>
        <text x="20" y="19" textAnchor="middle" fill="#111827" fontSize="7" fontWeight="bold">34,90€</text>
        {showErrors && (
          <rect x="0" y="0" width="40" height="22" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,2" rx="2"/>
        )}
      </g>

      {/* Promo expirée (erreur) */}
      {showErrors && (
        <g transform="translate(130, 80)">
          <rect x="0" y="0" width="80" height="35" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1"/>
          <text x="40" y="14" textAnchor="middle" fill="#92400E" fontSize="6" fontWeight="bold">-30% PEINTURE</text>
          <text x="40" y="24" textAnchor="middle" fill="#92400E" fontSize="5">Jusqu&apos;au 15 janv.</text>
          <rect x="0" y="0" width="80" height="35" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" rx="3"/>
        </g>
      )}

      {/* Marquage au sol */}
      <g transform="translate(180, 250)">
        <polygon points="20,0 30,15 26,15 26,30 14,30 14,15 10,15" fill="#3B82F6" opacity="0.5"/>
        <text x="20" y="42" textAnchor="middle" fill="#3B82F6" fontSize="5">Caisse →</text>
      </g>

      {/* Kakemono masquant une fiche (erreur) */}
      {showErrors && (
        <g transform="translate(165, 140)">
          <rect x="0" y="0" width="30" height="55" rx="2" fill="#EC4899" opacity="0.9"/>
          <text x="15" y="20" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">ColorPlus</text>
          <text x="15" y="35" textAnchor="middle" fill="white" fontSize="6" fontWeight="800">-25%</text>
          <rect x="0" y="0" width="30" height="55" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" rx="2"/>
        </g>
      )}

      {/* Espace fiche produit manquante (erreur) */}
      {showErrors && (
        <g transform="translate(325, 170)">
          <rect x="0" y="0" width="45" height="35" rx="2" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2"/>
          <text x="22" y="15" textAnchor="middle" fill="#EF4444" fontSize="5" fontWeight="600">Fiche</text>
          <text x="22" y="24" textAnchor="middle" fill="#EF4444" fontSize="5" fontWeight="600">absente</text>
        </g>
      )}
    </svg>
  )
}
