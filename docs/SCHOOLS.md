# EduCI Schools Module

Phase 1.2 — Gestion des établissements scolaires.

## Architecture

```
web/src/features/schools/
├── types.ts                    # Types et interfaces
├── validators/
│   ├── schemas.ts             # Schémas Zod (8)
│   └── index.ts
├── repositories/
│   ├── school.repository.ts   # Supabase Repository
│   └── index.ts
├── services/
│   ├── school.service.ts      # Service principal
│   ├── audit-school.service.ts
│   ├── slug.service.ts
│   ├── logo.service.ts
│   ├── settings.service.ts
│   ├── validation.service.ts
│   └── index.ts
├── hooks/
│   ├── useSchools.ts          # Liste avec filtres
│   ├── useSchool.ts           # Détail + update + logo
│   ├── useCreateSchool.ts     # Création
│   ├── useUpdateSchool.ts     # Mise à jour
│   ├── useDeleteSchool.ts     # Archive/Supprime/Restore
│   ├── useSchoolSettings.ts   # Paramètres
│   └── index.ts
└── index.ts                   # Exports publics

mobile/features/schools/
├── repositories/
│   ├── school.repository.ts
│   └── index.ts
├── services/
│   ├── school.service.ts
│   └── index.ts
├── hooks/
│   └── index.ts
└── index.ts

web/src/app/api/schools/
├── route.ts                   # GET (list) + POST (create)
├── [id]/
│   ├── route.ts               # GET + PATCH + DELETE
│   └── settings/
│       └── route.ts           # GET + PATCH settings
```

## Flow

Page → Hook → Service → Repository → Supabase

## Schéma Base de Données

- `schools` — Table principale (name, email, phone, address, city, region, country, is_active...)
- `school_branding` — Branding personnalisé (couleurs, logo, fonts, directeur...)
- `students`, `teachers`, `classes` — Relations (comptées via `_count`)

## Types

```typescript
School              # Entité complète avec _count
SchoolSettings      # Paramètres (langue, timezone, devise, grading...)
SchoolBranding      # Branding complet (100+ champs)
SchoolPlan          # FREE | STARTER | PRO | ENTERPRISE
SchoolStatus        # ACTIVE | SUSPENDED | ARCHIVED | PENDING
SchoolLimits        # maxStudents, maxTeachers, maxStorageMb...
SchoolStatistics    # studentsCount, teachersCount, classesCount...
SchoolCreationRequest
SchoolUpdateRequest
```

## Plans et Limites

| Plan | Élèves | Enseignants | Stockage | SMS/mois | Modules |
|------|--------|-------------|----------|----------|---------|
| FREE | 100 | 10 | 500 MB | 0 | students, teachers, classes, grades, attendance |
| STARTER | 500 | 50 | 2 GB | 500 | + payments, transport, messages |
| PRO | 2 000 | 200 | 10 GB | 5 000 | + ai, library, cantine, marketplace |
| ENTERPRISE | 100 000 | 10 000 | 100 GB | 100 000 | + enterprise, analytics, api |

## API Routes

| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | /api/schools | Liste avec filtres | SUPER_ADMIN, ADMIN |
| POST | /api/schools | Créer un établissement | SUPER_ADMIN |
| GET | /api/schools/[id] | Détail | Authentifié |
| PATCH | /api/schools/[id] | Modifier | SUPER_ADMIN, ADMIN |
| DELETE | /api/schools/[id] | Supprimer | SUPER_ADMIN |
| GET | /api/schools/[id]/settings | Paramètres | Authentifié |
| PATCH | /api/schools/[id]/settings | Modifier paramètres | SUPER_ADMIN, ADMIN |

## Hooks

```typescript
useSchools()                     // { data, loading, error, fetchSchools, fetchSchool }
useSchool(schoolId?)             // { school, loading, error, fetchSchool, updateSchool, uploadLogo }
useCreateSchool()                // { createSchool, loading, error }
useUpdateSchool()                // { updateSchool, loading, error }
useDeleteSchool()                // { archiveSchool, deleteSchool, restoreSchool, loading, error }
useSchoolSettings(schoolId?)     // { settings, loading, error, fetchSettings, updateSettings }
```

## Validation Zod

8 schémas : CreateSchoolSchema, UpdateSchoolSchema, SchoolSettingsSchema, UploadLogoSchema, ArchiveSchoolSchema, RestoreSchoolSchema, DeleteSchoolSchema, SlugSchema, SchoolFiltersSchema

## Tests

36 tests unitaires :
- `tests/schools/validators.test.ts` — 18 tests de validation
- `tests/schools/limits.test.ts` — 8 tests des limites par plan
- `tests/schools/errors.test.ts` — 10 tests des erreurs

## Sécurité

- RBAC : SUPER_ADMIN crée/supprime, ADMIN modifie
- Multi-tenant : toutes les requêtes vérifient school_id
- Validation Zod sur toutes les entrées
- Audit logging pour chaque action
- Upload logo : validation type et taille (5MB max)
