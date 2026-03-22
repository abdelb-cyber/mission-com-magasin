# Mission Com'Magasin – BTS MCO

Application web pédagogique gamifiée pour les étudiants en BTS MCO.
Thème : **la communication sur le lieu de vente** (ILV, PLV, réglementation, digitalisation).

## Fonctionnalités

### Espace apprenant
- Page d'accueil avec rejoindre une classe ou mode entraînement
- Dashboard avec progression et score
- **7 missions interactives variées** :
  1. **Distinguer ILV et PLV** – Tri de cartes illustrées (ILV vs PLV)
  2. **Le bon support au bon moment** – Scénarios en magasin avec choix de support
  3. **Diagnostic rayon** – Scène interactive à cliquer pour repérer les erreurs
  4. **Construire une ILV efficace** – Atelier de composition visuelle évalué sur 5 critères
  5. **Créer une PLV percutante** – Création guidée en 4 étapes avec mockup
  6. **Réglementation en vue** – Comparaison conforme/non conforme avec détection d'erreurs
  7. **Parcours digital** – Plan de magasin interactif avec choix d'outils digitaux
- Feedback pédagogique immédiat après chaque activité
- Page résultats détaillés

### Espace formateur
- Création de sessions nommées
- Code de session unique pour les apprenants
- **QR code généré automatiquement** (projetable)
- Suivi des participants et de leurs scores
- Classement en temps réel
- Export CSV des résultats

## Stack technique

| Technologie | Usage |
|---|---|
| **Next.js 15** (App Router) | Framework React |
| **TypeScript** | Typage |
| **Tailwind CSS** | Styles |
| **Supabase** | Base de données (optionnel) |
| **qrcode.react** | Génération QR code |
| **lucide-react** | Icônes |
| **Vercel** | Déploiement |

## Lancer en local

```bash
# 1. Installer les dépendances
npm install --legacy-peer-deps

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```

## Configuration Supabase (optionnel)

L'application fonctionne **sans Supabase** grâce au localStorage.
Pour activer la persistance en base de données :

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter le fichier `lib/schema.sql` dans l'éditeur SQL de Supabase
3. Copier l'URL du projet et la clé anon
4. Modifier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_ici
```

### Schéma de la base de données

| Table | Description |
|---|---|
| `sessions` | Sessions de formation (nom, code, statut) |
| `learners` | Apprenants (pseudo, session, score total) |
| `attempts` | Tentatives de mission (score, détails, temps) |
| `leaderboard` | Vue calculée : classement par session |

## Déploiement sur Vercel

```bash
# 1. Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# 2. Déployer
vercel

# 3. Configurer les variables d'environnement
# Dans le dashboard Vercel > Settings > Environment Variables :
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Redéployer en production
vercel --prod
```

L'URL publique sera de la forme : `https://mission-com-magasin.vercel.app`

## Générer le QR code

1. Aller dans l'**Espace formateur** (`/formateur`)
2. Créer une session
3. Cliquer sur **Afficher le QR code**
4. Projeter le QR code aux apprenants
5. Les apprenants scannent et arrivent directement dans la session

## Arborescence du projet

```
mission-com-magasin/
├── app/
│   ├── layout.tsx              # Layout global
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css             # Styles globaux
│   ├── apprenant/
│   │   ├── dashboard/page.tsx  # Dashboard apprenant
│   │   ├── mission/[id]/page.tsx # Page mission dynamique
│   │   └── resultats/page.tsx  # Résultats détaillés
│   └── formateur/
│       ├── page.tsx            # Dashboard formateur
│       └── session/[id]/page.tsx # Détail session + QR code
├── components/
│   ├── ui/                     # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ScoreDisplay.tsx
│   │   ├── FeedbackBanner.tsx
│   │   └── MissionCard.tsx
│   ├── missions/               # Les 7 missions interactives
│   │   ├── Mission1DragSort.tsx
│   │   ├── Mission2MatchObjective.tsx
│   │   ├── Mission3SceneDiagnostic.tsx
│   │   ├── Mission4BuildILV.tsx
│   │   ├── Mission5BuildPLV.tsx
│   │   ├── Mission6Regulation.tsx
│   │   └── Mission7DigitalTools.tsx
│   └── svg/                    # Illustrations SVG pédagogiques
│       ├── SupportSVG.tsx      # 20+ supports ILV/PLV en SVG
│       ├── StoreScene.tsx      # Scène de rayon pour diagnostic
│       ├── StorePlan.tsx       # Plan de magasin pour parcours digital
│       └── HeroIllustration.tsx
├── data/
│   └── missions.ts             # Données pédagogiques complètes
├── lib/
│   ├── store.ts                # Store local (localStorage)
│   ├── supabase.ts             # Client Supabase
│   └── schema.sql              # Schéma SQL Supabase
├── types/
│   └── index.ts                # Types TypeScript
└── README.md
```

## Direction artistique

- **Design** : flat design moderne, couleurs sobres avec touches dynamiques
- **Typographie** : Inter (Google Fonts)
- **Palette** : bleu primaire (#2563eb), orange accent (#f97316), vert succès, rouge erreur
- **UX** : mobile-first, boutons 48px minimum, contrastes accessibles
- **Illustrations** : 100% SVG dans le code (aucune dépendance externe)

## Mécaniques pédagogiques

| Mission | Mécanique | Compétence |
|---|---|---|
| 1 | Tri de cartes visuelles | Distinguer ILV / PLV |
| 2 | Choix multiple contextuel | Associer support et objectif |
| 3 | Zones cliquables sur scène | Diagnostiquer des erreurs |
| 4 | Composition multi-critères | Concevoir une ILV |
| 5 | Création guidée par étapes | Concevoir une PLV |
| 6 | Comparaison avant/après | Vérifier la conformité |
| 7 | Parcours sur plan interactif | Choisir l'outil digital |

## Licence

Usage pédagogique – BTS MCO.
