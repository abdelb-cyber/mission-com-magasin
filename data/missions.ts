import { MissionDefinition, DragItem, MatchScenario, SceneElement, DigitalToolChoice } from '@/types'

// ========================================
// DÉFINITIONS DES 7 MISSIONS
// ========================================

export const MISSIONS: MissionDefinition[] = [
  {
    id: 1,
    title: 'Distinguer ILV et PLV',
    description: 'Triez les supports de communication en les classant dans la bonne catégorie : ILV (information) ou PLV (publicité).',
    icon: '🔀',
    color: 'bg-blue-700',
    type: 'drag-sort',
    maxScore: 100,
    estimatedTime: '5-7 min',
  },
  {
    id: 2,
    title: 'Le bon support au bon moment',
    description: 'Face à des situations concrètes en magasin, choisissez le support de communication le plus adapté.',
    icon: '🎯',
    color: 'bg-green-700',
    type: 'match-objective',
    maxScore: 100,
    estimatedTime: '6-8 min',
  },
  {
    id: 3,
    title: 'Diagnostic rayon',
    description: 'Observez une scène de magasin et identifiez les erreurs de communication sur le lieu de vente.',
    icon: '🔍',
    color: 'bg-amber-700',
    type: 'scene-diagnostic',
    maxScore: 100,
    estimatedTime: '5-8 min',
  },
  {
    id: 4,
    title: 'Construire une ILV efficace',
    description: 'Composez une signalétique d\'information claire et conforme pour un rayon du magasin.',
    icon: '🏗️',
    color: 'bg-indigo-700',
    type: 'build-ilv',
    maxScore: 100,
    estimatedTime: '7-10 min',
  },
  {
    id: 5,
    title: 'Créer une PLV percutante',
    description: 'Concevez une publicité sur le lieu de vente efficace en respectant les 4 règles d\'or.',
    icon: '🎨',
    color: 'bg-pink-700',
    type: 'build-plv',
    maxScore: 100,
    estimatedTime: '7-10 min',
  },
  {
    id: 6,
    title: 'Réglementation en vue',
    description: 'Comparez des versions conformes et non conformes, puis corrigez les erreurs réglementaires.',
    icon: '⚖️',
    color: 'bg-red-700',
    type: 'regulation',
    maxScore: 100,
    estimatedTime: '5-7 min',
  },
  {
    id: 7,
    title: 'Parcours digital',
    description: 'Placez les outils digitaux aux bons endroits du parcours client en magasin.',
    icon: '📱',
    color: 'bg-purple-700',
    type: 'digital-tools',
    maxScore: 100,
    estimatedTime: '5-8 min',
  },
]

// ========================================
// MISSION 1 – Données pour le tri ILV / PLV
// ========================================

export const DRAG_ITEMS: DragItem[] = [
  {
    id: 'item-1',
    label: 'Plan du magasin',
    description: 'Panneau situé à l\'entrée indiquant l\'emplacement des rayons.',
    category: 'ilv',
    svgType: 'plan-magasin',
  },
  {
    id: 'item-2',
    label: 'Panneau d\'entrée de rayon',
    description: 'Signalétique suspendue indiquant le nom et le contenu du rayon.',
    category: 'ilv',
    svgType: 'panneau-rayon',
  },
  {
    id: 'item-3',
    label: 'Marquage au sol',
    description: 'Flèches ou lignes au sol guidant le client dans le magasin.',
    category: 'ilv',
    svgType: 'marquage-sol',
  },
  {
    id: 'item-4',
    label: 'Étiquette de prix',
    description: 'Information réglementaire indiquant le prix unitaire et au litre/kilo.',
    category: 'ilv',
    svgType: 'etiquette-prix',
  },
  {
    id: 'item-5',
    label: 'Fiche conseil',
    description: 'Document informatif aidant le client à choisir un produit.',
    category: 'ilv',
    svgType: 'fiche-conseil',
  },
  {
    id: 'item-6',
    label: 'Bandeau de gondole',
    description: 'Bande indiquant la catégorie de produits sur l\'étagère.',
    category: 'ilv',
    svgType: 'bandeau-gondole',
  },
  {
    id: 'item-7',
    label: 'Stop-trottoir',
    description: 'Chevalet publicitaire posé devant le magasin pour attirer les passants.',
    category: 'plv',
    svgType: 'stop-trottoir',
  },
  {
    id: 'item-8',
    label: 'Totem publicitaire',
    description: 'Présentoir vertical mettant en avant une marque ou une promotion.',
    category: 'plv',
    svgType: 'totem',
  },
  {
    id: 'item-9',
    label: 'Kakemono',
    description: 'Bannière verticale déroulante utilisée pour promouvoir un produit.',
    category: 'plv',
    svgType: 'kakemono',
  },
  {
    id: 'item-10',
    label: 'Stop-rayon',
    description: 'Étiquette perpendiculaire au rayon attirant l\'œil sur une offre.',
    category: 'plv',
    svgType: 'stop-rayon',
  },
  {
    id: 'item-11',
    label: 'Display de comptoir',
    description: 'Petit présentoir de marque posé près de la caisse.',
    category: 'plv',
    svgType: 'display',
  },
  {
    id: 'item-12',
    label: 'Vitrophanie',
    description: 'Adhésif promotionnel collé sur la vitrine du magasin.',
    category: 'plv',
    svgType: 'vitrophanie',
  },
]

// ========================================
// MISSION 2 – Scénarios d'association support/objectif
// ========================================

export const MATCH_SCENARIOS: MatchScenario[] = [
  {
    id: 'scenario-1',
    situation: 'Un client entre dans le magasin de bricolage et cherche le rayon peinture. Il semble perdu et regarde autour de lui.',
    objectif: 'orienter',
    correctSupportId: 'plan-magasin',
    supports: [
      { id: 'plan-magasin', label: 'Plan du magasin à l\'entrée', svgType: 'plan-magasin' },
      { id: 'stop-rayon', label: 'Stop-rayon promotionnel', svgType: 'stop-rayon' },
      { id: 'kakemono', label: 'Kakemono de marque', svgType: 'kakemono' },
    ],
    feedback: 'Le plan du magasin est le support d\'ILV idéal pour orienter un client perdu. Il permet de localiser rapidement chaque rayon.',
  },
  {
    id: 'scenario-2',
    situation: 'Le magasin lance une opération "2ème pot de peinture à -50%". L\'objectif est d\'attirer les clients vers le rayon peinture depuis l\'allée centrale.',
    objectif: 'attirer-zone-froide',
    correctSupportId: 'totem',
    supports: [
      { id: 'etiquette', label: 'Étiquette de prix', svgType: 'etiquette-prix' },
      { id: 'totem', label: 'Totem publicitaire dans l\'allée', svgType: 'totem' },
      { id: 'fiche-conseil', label: 'Fiche conseil peinture', svgType: 'fiche-conseil' },
    ],
    feedback: 'Le totem publicitaire, visible de loin dans l\'allée centrale, est le meilleur support pour attirer les clients vers une zone froide avec une offre promotionnelle.',
  },
  {
    id: 'scenario-3',
    situation: 'Un client hésite entre deux types de peinture (acrylique et glycéro). Il a besoin de comprendre les différences pour faire le bon choix.',
    objectif: 'informer',
    correctSupportId: 'fiche-conseil',
    supports: [
      { id: 'fiche-conseil', label: 'Fiche conseil comparative', svgType: 'fiche-conseil' },
      { id: 'vitrophanie', label: 'Vitrophanie en vitrine', svgType: 'vitrophanie' },
      { id: 'display', label: 'Display de comptoir', svgType: 'display' },
    ],
    feedback: 'La fiche conseil comparative est un support d\'ILV qui aide le client dans son processus de décision en détaillant les caractéristiques de chaque produit.',
  },
  {
    id: 'scenario-4',
    situation: 'Une marque de peinture premium souhaite mettre en avant son nouveau produit "anti-humidité" directement dans le rayon.',
    objectif: 'promouvoir',
    correctSupportId: 'stop-rayon',
    supports: [
      { id: 'marquage', label: 'Marquage au sol', svgType: 'marquage-sol' },
      { id: 'stop-rayon', label: 'Stop-rayon avec visuel produit', svgType: 'stop-rayon' },
      { id: 'panneau-rayon', label: 'Panneau d\'entrée de rayon', svgType: 'panneau-rayon' },
    ],
    feedback: 'Le stop-rayon est le support de PLV le plus efficace pour promouvoir un produit spécifique directement dans le rayon, car il capte le regard du client au moment de la décision d\'achat.',
  },
  {
    id: 'scenario-5',
    situation: 'C\'est samedi matin, le magasin veut inciter les passants dans la rue à entrer pour profiter des soldes peinture.',
    objectif: 'declencher-achat',
    correctSupportId: 'stop-trottoir',
    supports: [
      { id: 'stop-trottoir', label: 'Stop-trottoir devant l\'entrée', svgType: 'stop-trottoir' },
      { id: 'bandeau', label: 'Bandeau de gondole', svgType: 'bandeau-gondole' },
      { id: 'fiche-produit', label: 'Fiche produit', svgType: 'fiche-produit' },
    ],
    feedback: 'Le stop-trottoir est le support de PLV extérieur par excellence : posé devant l\'entrée, il attire l\'attention des passants et les incite à entrer dans le magasin.',
  },
  {
    id: 'scenario-6',
    situation: 'Le rayon peinture est réorganisé : les sous-familles (murs, boiseries, sols, extérieur) doivent être clairement identifiables.',
    objectif: 'orienter',
    correctSupportId: 'panneau-rayon',
    supports: [
      { id: 'panneau-rayon', label: 'Panneaux de sous-rayon', svgType: 'panneau-rayon' },
      { id: 'kakemono', label: 'Kakemono promotionnel', svgType: 'kakemono' },
      { id: 'totem', label: 'Totem publicitaire', svgType: 'totem' },
    ],
    feedback: 'Les panneaux de sous-rayon (ILV) permettent de structurer l\'offre et d\'aider le client à se repérer rapidement parmi les sous-familles du rayon.',
  },
]

// ========================================
// MISSION 3 – Éléments de la scène diagnostic
// ========================================

// Positions alignées sur le SVG StoreScene.tsx (viewBox 400x340)
// x,y,width,height en % du viewBox
export const SCENE_ELEMENTS: SceneElement[] = [
  {
    id: 'scene-1',
    x: 32, y: 4, width: 36, height: 11,
    label: 'Panneau "PEINTURE" au-dessus du rayon',
    isError: false,
  },
  {
    id: 'scene-2',
    x: 74, y: 46, width: 15, height: 10,
    label: 'Étiquette prix sans prix au litre',
    isError: true,
    errorDescription: 'L\'étiquette prix affiche 34,90€ TTC mais ne mentionne pas le prix au litre, ce qui est une obligation réglementaire pour les produits vendus en volume.',
    correctionHint: 'Ajouter le prix unitaire au litre (ici 13,96 €/L) sur chaque étiquette.',
  },
  {
    id: 'scene-3',
    x: 45, y: 44, width: 10, height: 22,
    label: 'Kakemono publicitaire masquant la fiche conseil',
    isError: true,
    errorDescription: 'Le kakemono ColorPlus -25% est collé juste devant la fiche conseil (visible en bleu derrière). Le client ne peut pas lire les informations produit.',
    correctionHint: 'Déplacer le kakemono pour ne pas masquer la signalétique informative du rayon.',
  },
  {
    id: 'scene-4',
    x: 46, y: 33, width: 14, height: 9,
    label: 'Stop-rayon promo 2+1 bien positionné',
    isError: false,
  },
  {
    id: 'scene-5',
    x: 3, y: 16, width: 43, height: 3,
    label: 'Bandeau de gondole illisible (texte trop petit)',
    isError: true,
    errorDescription: 'Le bandeau de gondole utilise une police minuscule. Le texte est illisible à distance de lecture normale (plus de 50 cm).',
    correctionHint: 'Utiliser une taille de police minimum de 14mm pour une lecture confortable à 1 mètre.',
  },
  {
    id: 'scene-6',
    x: 87, y: 62, width: 9, height: 15,
    label: 'Emplacement vide : fiche produit absente',
    isError: true,
    errorDescription: 'L\'emplacement prévu pour la fiche produit est vide (symbole ∅). Le client n\'a aucune information technique sur la peinture à cet endroit du rayon.',
    correctionHint: 'Installer une fiche produit avec les caractéristiques, le rendement et les conseils d\'application.',
  },
  {
    id: 'scene-7',
    x: 46, y: 84, width: 12, height: 14,
    label: 'Marquage au sol orientant vers la caisse',
    isError: false,
  },
  {
    id: 'scene-8',
    x: 24, y: 32, width: 22, height: 12,
    label: 'Promotion expirée : "jusqu\'au 15 janvier" encore affichée',
    isError: true,
    errorDescription: 'Nous sommes le 22 mars. Cette affiche promotionnelle (-30% jusqu\'au 15 janvier) est périmée depuis plus de 2 mois. C\'est une publicité trompeuse.',
    correctionHint: 'Retirer immédiatement toute communication promotionnelle dont la date de validité est dépassée.',
  },
  {
    id: 'scene-9',
    x: 55, y: 19, width: 25, height: 13,
    label: 'Rangée de pots bien alignés sur l\'étagère',
    isError: false,
  },
  {
    id: 'scene-10',
    x: 3, y: 48, width: 20, height: 15,
    label: 'Produits correctement positionnés et rangés',
    isError: false,
  },
  {
    id: 'scene-11',
    x: 55, y: 35, width: 25, height: 13,
    label: 'Étagères droites proprement installées',
    isError: false,
  },
  {
    id: 'scene-12',
    x: 3, y: 64, width: 20, height: 13,
    label: 'Pots de peinture face visible vers le client',
    isError: false,
  },
  {
    id: 'scene-13',
    x: 55, y: 64, width: 25, height: 13,
    label: 'Gamme complète de couleurs présentée',
    isError: false,
  },
]

// ========================================
// MISSION 4 – Options pour construire une ILV
// ========================================

export const ILV_BUILD_OPTIONS = {
  elements: [
    // Bons éléments ILV
    { id: 'panneau-suspendu', label: 'Panneau suspendu', category: 'signalétique', points: 15, isCorrect: true },
    { id: 'flechage', label: 'Fléchage directionnel', category: 'orientation', points: 15, isCorrect: true },
    { id: 'bandeau', label: 'Bandeau de gondole', category: 'information', points: 15, isCorrect: true },
    { id: 'etiquette', label: 'Étiquette prix conforme', category: 'réglementaire', points: 20, isCorrect: true },
    { id: 'fiche-info', label: 'Fiche information produit', category: 'conseil', points: 15, isCorrect: true },
    { id: 'plan', label: 'Plan du rayon', category: 'orientation', points: 10, isCorrect: true },
    { id: 'separateur', label: 'Séparateur de sous-famille', category: 'organisation', points: 10, isCorrect: true },
    // Pièges : éléments PLV à ne PAS sélectionner pour une ILV
    { id: 'stop-rayon-promo', label: 'Stop-rayon promotionnel', category: 'promotion', points: -15, isCorrect: false },
    { id: 'kakemono-marque', label: 'Kakemono de marque', category: 'publicité', points: -15, isCorrect: false },
    { id: 'totem-pub', label: 'Totem publicitaire', category: 'publicité', points: -10, isCorrect: false },
  ],
  criteria: [
    { id: 'lisibilite', label: 'Lisibilité', description: 'Les textes sont lisibles à bonne distance', maxPoints: 20 },
    { id: 'coherence', label: 'Cohérence', description: 'Les éléments forment un ensemble logique', maxPoints: 20 },
    { id: 'utilite', label: 'Utilité', description: 'Chaque élément sert un objectif d\'information', maxPoints: 20 },
    { id: 'conformite', label: 'Conformité', description: 'Les obligations réglementaires sont respectées', maxPoints: 20 },
    { id: 'accessibilite', label: 'Accessibilité', description: 'L\'information est accessible à tous les clients', maxPoints: 20 },
  ],
}

// ========================================
// MISSION 5 – Options pour construire une PLV
// ========================================

export const PLV_BUILD_OPTIONS = {
  visuels: [
    { id: 'photo-produit', label: 'Photo du produit en situation' },
    { id: 'illustration', label: 'Illustration graphique colorée' },
    { id: 'avant-apres', label: 'Avant/Après rénovation' },
    { id: 'logo-marque', label: 'Logo de la marque uniquement' },
  ],
  promesses: [
    { id: 'promo-prix', label: '-30% sur toute la gamme' },
    { id: 'qualite', label: 'Peinture n°1 des professionnels' },
    { id: 'facilite', label: 'Résultat parfait en 1 seule couche' },
    { id: 'eco', label: 'Formule éco-responsable' },
  ],
  emplacements: [
    { id: 'entree', label: 'Entrée du magasin', points: 10 },
    { id: 'allee-centrale', label: 'Allée centrale', points: 15 },
    { id: 'tete-gondole', label: 'Tête de gondole rayon peinture', points: 20 },
    { id: 'caisse', label: 'Zone de caisse', points: 5 },
  ],
  formats: [
    { id: 'stop-rayon', label: 'Stop-rayon' },
    { id: 'totem', label: 'Totem' },
    { id: 'kakemono', label: 'Kakemono' },
    { id: 'display', label: 'Display comptoir' },
  ],
  reglesOr: [
    { id: 'visibilite', label: 'Visibilité', description: 'Le support est visible à distance et capte l\'attention.' },
    { id: 'lisibilite', label: 'Lisibilité', description: 'Le message principal se lit en moins de 3 secondes.' },
    { id: 'comprehension', label: 'Compréhension', description: 'L\'offre est claire et sans ambiguïté.' },
    { id: 'incitation', label: 'Incitation à l\'achat', description: 'Le support donne envie d\'acheter le produit.' },
  ],
}

// ========================================
// MISSION 6 – Cas de réglementation
// ========================================

export const REGULATION_CASES = [
  {
    id: 'reg-1',
    title: 'Étiquetage de prix',
    description: 'Observez cette étiquette de prix pour un pot de peinture de 2,5L. Quelles erreurs contient-elle ?',
    // On n'affiche plus 2 colonnes. On montre UNE étiquette avec des erreurs à trouver.
    etiquette: {
      productName: 'Peinture Acrylique',
      price: '34,90 €',
      pricePerUnit: '',
      origin: '',
      reference: '',
      volume: '2,5 L',
    },
    // Mélange de vraies erreurs et de faux choix
    choices: [
      { id: 'r1-a', text: 'Prix au litre manquant (obligatoire)', isError: true },
      { id: 'r1-b', text: 'Dénomination incomplète (finition et couleur manquantes)', isError: true },
      { id: 'r1-c', text: 'Référence produit absente', isError: true },
      { id: 'r1-d', text: 'Le prix TTC n\'est pas affiché', isError: false },
      { id: 'r1-e', text: 'Le volume n\'est pas indiqué', isError: false },
      { id: 'r1-f', text: 'La police d\'écriture est trop petite', isError: false },
    ],
  },
  {
    id: 'reg-2',
    title: 'Promotion en vitrine',
    description: 'Observez cette vitrine promotionnelle. Quelles informations manquent ou sont incorrectes ?',
    etiquette: {
      message: 'MÉGA PROMO PEINTURE -20%',
      visual: 'Grande affiche colorée en vitrine avec un pot de peinture',
    },
    choices: [
      { id: 'r2-a', text: 'Dates de validité de l\'offre manquantes', isError: true },
      { id: 'r2-b', text: 'Produits concernés non précisés', isError: true },
      { id: 'r2-c', text: 'Prix de référence (avant réduction) non affiché', isError: true },
      { id: 'r2-d', text: 'Conditions de l\'offre absentes', isError: true },
      { id: 'r2-e', text: 'Le pourcentage de réduction est illégal', isError: false },
      { id: 'r2-f', text: 'L\'affiche devrait être à l\'intérieur, pas en vitrine', isError: false },
      { id: 'r2-g', text: 'Le mot MÉGA est interdit dans les promotions', isError: false },
    ],
  },
  {
    id: 'reg-3',
    title: 'Fiche produit chimique',
    description: 'Observez cette fiche produit pour une peinture glycéro. Quelles informations obligatoires manquent ?',
    etiquette: {
      nom: 'Peinture Glycéro Blanche',
      volume: '2,5 L',
      prix: '42,90 €',
      rendement: '',
      sechage: '',
      composition: '',
      pictogrammes: '',
    },
    choices: [
      { id: 'r3-a', text: 'Pictogrammes de sécurité absents (obligatoire pour produits chimiques)', isError: true },
      { id: 'r3-b', text: 'Informations de composition manquantes', isError: true },
      { id: 'r3-c', text: 'Rendement non indiqué', isError: true },
      { id: 'r3-d', text: 'Temps de séchage non mentionné', isError: true },
      { id: 'r3-e', text: 'Le nom commercial de la marque est absent', isError: false },
      { id: 'r3-f', text: 'Le code-barres EAN est manquant', isError: false },
      { id: 'r3-g', text: 'La date de fabrication doit être indiquée', isError: false },
    ],
  },
]

// ========================================
// MISSION 7 – Parcours digital
// ========================================

export const DIGITAL_JOURNEY: DigitalToolChoice[] = [
  {
    id: 'digital-1',
    etape: 'Arrivée devant le magasin',
    description: 'Le client passe devant la vitrine du magasin un dimanche. Le magasin est fermé mais souhaite communiquer sur ses offres.',
    correctTool: 'vitrine-digitale',
    tools: [
      { id: 'vitrine-digitale', name: 'Vitrine digitale', icon: '🖥️' },
      { id: 'borne', name: 'Borne interactive', icon: '📱' },
      { id: 'robot', name: 'Robot d\'accueil', icon: '🤖' },
    ],
    justification: 'La vitrine digitale fonctionne même quand le magasin est fermé et permet d\'afficher les promotions en cours pour donner envie au client de revenir.',
  },
  {
    id: 'digital-2',
    etape: 'Entrée du magasin',
    description: 'Le client entre dans le magasin et souhaite trouver rapidement le rayon peinture et les promotions en cours.',
    correctTool: 'borne',
    tools: [
      { id: 'borne', name: 'Borne interactive d\'orientation', icon: '📱' },
      { id: 'etiquette', name: 'Étiquette connectée', icon: '🏷️' },
      { id: 'affichage', name: 'Affichage digital suspendu', icon: '📺' },
    ],
    justification: 'La borne interactive à l\'entrée permet au client de rechercher un produit, localiser un rayon et découvrir les promotions du moment.',
  },
  {
    id: 'digital-3',
    etape: 'Navigation dans les allées',
    description: 'Le client marche dans les allées et le magasin veut l\'orienter vers le rayon peinture en promotion.',
    correctTool: 'affichage',
    tools: [
      { id: 'affichage', name: 'Écran d\'affichage digital', icon: '📺' },
      { id: 'robot', name: 'Robot d\'accueil', icon: '🤖' },
      { id: 'etiquette', name: 'Étiquette connectée', icon: '🏷️' },
    ],
    justification: 'Les écrans d\'affichage digital dans les allées permettent de diffuser des messages promotionnels dynamiques et orientent les flux clients.',
  },
  {
    id: 'digital-4',
    etape: 'Dans le rayon peinture',
    description: 'Le client est devant le rayon et compare les prix et les caractéristiques de plusieurs peintures.',
    correctTool: 'etiquette',
    tools: [
      { id: 'etiquette', name: 'Étiquette électronique', icon: '🏷️' },
      { id: 'vitrine-digitale', name: 'Vitrine digitale', icon: '🖥️' },
      { id: 'borne', name: 'Borne interactive', icon: '📱' },
    ],
    justification: 'Les étiquettes électroniques permettent un affichage dynamique des prix, des promotions et peuvent être scannées pour obtenir plus d\'informations produit.',
  },
  {
    id: 'digital-5',
    etape: 'Besoin de conseil',
    description: 'Le client hésite et a besoin d\'un conseil technique sur le choix de peinture pour une pièce humide.',
    correctTool: 'borne-conseil',
    tools: [
      { id: 'borne-conseil', name: 'Borne conseil interactive', icon: '📱' },
      { id: 'affichage', name: 'Écran d\'affichage', icon: '📺' },
      { id: 'vitrine-digitale', name: 'Vitrine digitale', icon: '🖥️' },
    ],
    justification: 'La borne conseil interactive dans le rayon permet au client de répondre à un questionnaire guidé et d\'obtenir une recommandation personnalisée.',
  },
]

// ========================================
// SYNTHÈSES PÉDAGOGIQUES
// ========================================

export const SYNTHESES = {
  ilvVsPlv: {
    ilv: {
      definition: 'L\'ILV (Information sur le Lieu de Vente) regroupe tous les supports destinés à informer, orienter et guider le client dans le point de vente.',
      objectifs: ['Orienter le client', 'Informer sur les produits', 'Faciliter le repérage', 'Respecter les obligations réglementaires'],
      exemples: ['Plan du magasin', 'Panneaux de rayon', 'Étiquettes prix', 'Fiches conseil', 'Marquage au sol'],
    },
    plv: {
      definition: 'La PLV (Publicité sur le Lieu de Vente) regroupe les supports promotionnels qui attirent l\'attention, mettent en valeur des produits et incitent à l\'achat.',
      objectifs: ['Attirer l\'attention', 'Promouvoir un produit', 'Déclencher l\'achat', 'Créer du trafic en magasin'],
      exemples: ['Stop-rayon', 'Totem', 'Kakemono', 'Display', 'Vitrophanie', 'Stop-trottoir'],
    },
  },
}
