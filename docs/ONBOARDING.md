# EduCI Onboarding Module

Phase 1.3 — Assistant complet de création d'un établissement.

## Architecture

```
web/src/features/onboarding/
├── types.ts                          # Types et interfaces
├── validators/
│   ├── schemas.ts                    # 13 schémas Zod
│   └── index.ts
├── repositories/
│   ├── onboarding.repository.ts      # Supabase Repository
│   └── index.ts
├── services/
│   ├── onboarding.service.ts         # Service orchestrateur
│   ├── wizard.service.ts             # Gestion du wizard
│   ├── validation.service.ts         # Validation par étape
│   ├── audit-onboarding.service.ts   # Audit logging
│   ├── branding.service.ts           # Branding et logo
│   ├── academic-setup.service.ts     # Configuration académique
│   ├── school-initialization.service.ts  # Création atomique
│   └── index.ts
├── hooks/
│   ├── useOnboarding.ts             # Hook principal
│   ├── useWizard.ts                 # Gestion d'état wizard
│   ├── useSchoolInitialization.ts   # Initialisation école
│   ├── useBranding.ts               # Branding
│   └── index.ts
└── index.ts                         # Exports publics

mobile/features/onboarding/
├── repositories/
│   ├── onboarding.repository.ts
│   └── index.ts
├── services/
│   ├── onboarding.service.ts
│   └── index.ts
├── hooks/
│   └── index.ts
└── index.ts

web/src/app/api/onboarding/
├── route.ts              # GET (draft) + POST (create)
├── validate/
│   └── route.ts          # POST (validate step)
└── finish/
    └── route.ts          # POST (complete onboarding)
```

## Étapes du Wizard (8)

| # | Étape | Description |
|---|-------|-------------|
| 1 | `general_info` | Nom, email, téléphone, adresse, ville, GPS, logo |
| 2 | `admin_info` | Type école, date création, langues, devise, fuseau horaire |
| 3 | `academic_config` | Année scolaire, trimestres, notation, mentions |
| 4 | `pedagogic_structure` | Niveaux, classes, sections, séries, effectifs |
| 5 | `director_creation` | Nom, prénom, email, téléphone, mot de passe |
| 6 | `modules` | Paiement, transport, bibliothèque, cantine, santé... |
| 7 | `branding` | Logo, couleurs, police, favicon, slogan |
| 8 | `validation` | Résumé, cohérence, doublons, quotas, finalisation |

## Schémas Zod (13)

1. `GeneralInfoSchema` — Validation informations générales
2. `AdminInfoSchema` — Validation informations administratives
3. `AcademicConfigSchema` — Validation configuration académique
4. `PedagogicStructureSchema` — Validation structure pédagogique
5. `DirectorSchema` — Validation directeur (mot de passe fort)
6. `ModulesSchema` — Validation modules
7. `BrandingSchema` — Validation branding
8. `OnboardingDataSchema` — Validation complète
9. `CompleteOnboardingSchema` — Validation finalisation
10. `OnboardingStepSchema` — Validation étape
11. `SaveDraftSchema` — Validation sauvegarde
12. `UploadLogoSchema` — Validation upload logo
13. `OnboardingFiltersSchema` — Validation filtres

## Services (7)

| Service | Rôle |
|---------|------|
| `OnboardingService` | Orchestrateur principal |
| `WizardService` | Gestion étapes, progression |
| `ValidationService` | Validation par étape et complète |
| `AuditOnboardingService` | Logging événements |
| `BrandingService` | Logo, couleurs, configuration visuelle |
| `AcademicSetupService` | Année scolaire, niveaux, sections |
| `SchoolInitializationService` | Création atomique école + directeur + année + niveaux |

## Hooks (4)

```typescript
useOnboarding()                    // CRUD complet onboarding
useWizard()                        // Gestion wizard (steps, data, progression)
useSchoolInitialization()          // Initialisation école
useBranding()                      // Branding et logo
```

## API Routes

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/onboarding | Récupérer draft en cours |
| POST | /api/onboarding | Créer nouvel onboarding |
| POST | /api/onboarding/validate | Valider une étape |
| POST | /api/onboarding/finish | Finaliser et créer l'école |

## Flow Complet

```
1. Utilisateur clique "Créer mon école"
2. POST /api/onboarding → Crée le draft
3. Wizard affiche Étape 1
4. Utilisateur remplit → POST /api/onboarding/validate
5. Avance étape → POST /api/onboarding/validate
6. ... (8 étapes)
7. Étape 8: Résumé + validation
8. POST /api/onboarding/finish
   → Crée school
   → Crée directeur (auth.users)
   → Crée année scolaire
   → Crée niveaux et sections
   → Marque onboarding COMPLETED
9. Redirection vers Dashboard
```

## Sécurité

- RBAC : Seul l'utilisateur connecté peut créer son onboarding
- Validation Zod sur toutes les entrées
- Slug unique (via school name)
- Email unique
- Mot de passe fort (8+ chars, majuscule, minuscule, chiffre)
- Rate limiting (10 req/minute)
- Audit logging complet
- Transactions atomiques (rollback en cas d'erreur)

## Tests

**113 tests** répartis en 9 fichiers :
- `validators.test.ts` — Tests de tous les schémas Zod
- `errors.test.ts` — Tests des erreurs onboarding
- `config.test.ts` — Tests de la configuration
- `wizard.test.ts` — Tests de logique wizard
- `services.test.ts` — Tests du ValidationService
- `academic-setup.test.ts` — Tests du AcademicSetupService
- `branding.test.ts` — Tests du BrandingService
- `audit.test.ts` — Tests de l'AuditService
- `data-flow.test.ts` — Tests du flow de données complet
