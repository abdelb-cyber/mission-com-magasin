'use client'

// Plan stylisé du magasin de bricolage – utilisé dans la Mission 7 (parcours digital)

interface StorePlanProps {
  activeStep?: number
  className?: string
}

export default function StorePlan({ activeStep = -1, className = '' }: StorePlanProps) {
  const steps = [
    { id: 0, x: 180, y: 285, label: 'Vitrine' },
    { id: 1, x: 180, y: 240, label: 'Entrée' },
    { id: 2, x: 180, y: 160, label: 'Allée centrale' },
    { id: 3, x: 280, y: 100, label: 'Rayon Peinture' },
    { id: 4, x: 280, y: 55, label: 'Borne Conseil' },
  ]

  return (
    <svg width="100%" height="100%" viewBox="0 0 360 320" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Murs du magasin */}
      <rect x="20" y="20" width="320" height="270" rx="6" fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="2"/>

      {/* Entrée */}
      <rect x="140" y="280" width="80" height="12" fill="#3B82F6" rx="2"/>
      <text x="180" y="290" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">ENTRÉE</text>

      {/* Allée centrale */}
      <rect x="150" y="100" width="60" height="180" fill="#EFF6FF" rx="3"/>

      {/* Rayons */}
      {/* Rayon Jardin */}
      <rect x="30" y="30" width="100" height="60" rx="4" fill="#BBF7D0" stroke="#86EFAC" strokeWidth="1"/>
      <text x="80" y="55" textAnchor="middle" fill="#15803D" fontSize="7" fontWeight="600">Jardin</text>
      <text x="80" y="65" textAnchor="middle" fill="#15803D" fontSize="5">Outillage ext.</text>

      {/* Rayon Électricité */}
      <rect x="30" y="100" width="100" height="60" rx="4" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1"/>
      <text x="80" y="125" textAnchor="middle" fill="#92400E" fontSize="7" fontWeight="600">Électricité</text>
      <text x="80" y="135" textAnchor="middle" fill="#92400E" fontSize="5">Éclairage</text>

      {/* Rayon Plomberie */}
      <rect x="30" y="170" width="100" height="60" rx="4" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="1"/>
      <text x="80" y="195" textAnchor="middle" fill="#1E40AF" fontSize="7" fontWeight="600">Plomberie</text>
      <text x="80" y="205" textAnchor="middle" fill="#1E40AF" fontSize="5">Sanitaire</text>

      {/* RAYON PEINTURE (mis en avant) */}
      <rect x="230" y="30" width="100" height="90" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5"/>
      <rect x="230" y="30" width="100" height="18" rx="4" fill="#1E40AF"/>
      <rect x="230" y="42" width="100" height="6" fill="#1E40AF"/>
      <text x="280" y="43" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PEINTURE</text>
      {/* Sous-zones peinture */}
      <text x="250" y="65" fill="#1E40AF" fontSize="5">Murs</text>
      <text x="250" y="78" fill="#1E40AF" fontSize="5">Boiseries</text>
      <text x="250" y="91" fill="#1E40AF" fontSize="5">Sols</text>
      <text x="295" y="65" fill="#1E40AF" fontSize="5">Outils</text>
      <text x="295" y="78" fill="#1E40AF" fontSize="5">Accessoires</text>

      {/* Rayon Quincaillerie */}
      <rect x="230" y="135" width="100" height="55" rx="4" fill="#E9D5FF" stroke="#D8B4FE" strokeWidth="1"/>
      <text x="280" y="158" textAnchor="middle" fill="#6B21A8" fontSize="7" fontWeight="600">Quincaillerie</text>
      <text x="280" y="168" textAnchor="middle" fill="#6B21A8" fontSize="5">Visserie</text>

      {/* Caisses */}
      <rect x="30" y="245" width="100" height="35" rx="4" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1"/>
      <text x="80" y="266" textAnchor="middle" fill="#991B1B" fontSize="7" fontWeight="600">CAISSES</text>

      {/* Parcours client (ligne pointillée) */}
      <path d="M180,275 L180,240 L180,160 L280,100 L280,55"
        fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6,4"/>

      {/* Points du parcours */}
      {steps.map((step) => (
        <g key={step.id}>
          <circle cx={step.x} cy={step.y} r={activeStep === step.id ? 10 : 7}
            fill={activeStep === step.id ? '#F97316' : '#FB923C'} opacity={activeStep === step.id ? 1 : 0.6}
            className={activeStep === step.id ? 'animate-pulse-glow' : ''}
          />
          <text x={step.x} y={step.y + 3} textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
            {step.id + 1}
          </text>
        </g>
      ))}

      {/* Légende */}
      <g transform="translate(25, 295)">
        <circle cx="5" cy="0" r="3" fill="#F97316"/>
        <text x="12" y="3" fill="#6B7280" fontSize="5">Parcours client</text>
      </g>
    </svg>
  )
}
