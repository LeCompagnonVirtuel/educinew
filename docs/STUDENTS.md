# EduCI Students Module

Phase 1.4 — Module complet de gestion des élèves.

## Architecture

```
web/src/features/students/
├── types.ts                          # 30+ types et interfaces
├── validators/
│   ├── schemas.ts                    # 22 schémas Zod
│   └── index.ts
├── repositories/
│   ├── student.repository.ts         # Supabase Repository
│   └── index.ts
├── services/
│   ├── student.service.ts            # Service CRUD principal
│   ├── promotion.service.ts          # Promotion / répétition
│   ├── transfer.service.ts           # Transferts
│   ├── guardian.service.ts           # Tuteurs / parents
│   ├── medical.service.ts            # Dossiers médicaux
│   ├── photo.service.ts              # Photos de profil
│   ├── qrcode.service.ts             # QR codes
│   ├── student-card.service.ts       # Cartes étudiant
│   ├── timeline.service.ts           # Fil d'actualité
│   ├── statistics.service.ts         # Statistiques
│   ├── search.service.ts             # Recherche avancée
│   ├── validation.service.ts         # Validation métier
│   ├── audit-student.service.ts      # Audit logging
│   └── index.ts
├── hooks/
│   ├── useStudents.ts               # Liste et pagination
│   ├── useStudent.ts                # Détail élève
│   ├── useCreateStudent.ts          # Création
│   ├── useUpdateStudent.ts          # Modification
│   ├── useDeleteStudent.ts          # Suppression
│   ├── useArchiveStudent.ts         # Archivage
│   ├── useRestoreStudent.ts         # Restauration
│   ├── useTransferStudent.ts        # Transfert
│   ├── usePromotion.ts              # Promotion / répétition
│   ├── useStudentMedical.ts         # Dossier médical
│   ├── useStudentGuardian.ts        # Tuteurs
│   ├── useStudentPhoto.ts           # Photo
│   ├── useStudentQRCode.ts          # QR code
│   ├── useStudentCard.ts            # Carte
│   ├── useStudentTimeline.ts        # Timeline
│   ├── useStudentStatistics.ts      # Statistiques
│   ├── useStudentSearch.ts          # Recherche
│   └── index.ts
└── index.ts                          # Exports publics

mobile/features/students/
├── repositories/
│   ├── student.repository.ts
│   └── index.ts
├── services/
│   ├── student.service.ts
│   └── index.ts
├── hooks/
│   └── index.ts
└── index.ts

web/src/app/api/students/
├── route.ts                          # GET (list) + POST (create)
├── search/route.ts                   # GET (search)
├── statistics/route.ts               # GET (statistics)
├── import/route.ts                   # POST (import CSV/Excel)
├── export/route.ts                   # GET (export CSV/PDF/JSON)
├── [id]/route.ts                     # GET + PATCH + DELETE
├── [id]/archive/route.ts             # POST (archive)
├── [id]/restore/route.ts             # POST (restore)
├── [id]/promote/route.ts             # POST (promote / repeat)
├── [id]/transfer/route.ts            # POST (transfer)
├── [id]/card/route.ts                # GET (student card data)
├── [id]/qrcode/route.ts              # GET (QR code data)
├── [id]/photo/route.ts               # POST (upload photo)
└── [id]/timeline/route.ts            # GET (timeline events)
```

## Types Principaux (30+)

| Type | Description |
|------|-------------|
| `Student` | Élève complet (tous les champs DB) |
| `StudentProfile` | Profil étendu avec relations |
| `StudentEnrollment` | Inscription en classe |
| `StudentAcademicRecord` | Dossier académique |
| `StudentParent` | Parent / tuteur |
| `StudentGuardian` | Tuteur légal |
| `StudentEmergencyContact` | Contact d'urgence |
| `StudentMedicalRecord` | Dossier médical |
| `StudentVaccination` | Vaccination |
| `StudentAllergy` | Allergie |
| `StudentDisability` | Handicap |
| `StudentTransport` | Transport scolaire |
| `StudentCard` | Carte étudiant |
| `StudentQRCode` | QR code |
| `StudentPhoto` | Photo |
| `StudentDocument` | Document joint |
| `StudentAttendanceSummary` | Résumé assiduité |
| `StudentGradeSummary` | Résumé notes |
| `StudentPaymentSummary` | Résumé paiements |
| `StudentLibrarySummary` | Résumé bibliothèque |
| `StudentCanteenSummary` | Résumé cantine |
| `StudentDisciplineSummary` | Résumé discipline |
| `StudentTimeline` | Fil d'actualité |
| `StudentStatistics` | Statistiques globales |
| `StudentPromotion` | Promotion / répétition |
| `StudentTransfer` | Transfert |
| `StudentArchive` | Archivage |
| `StudentImport` | Import CSV/Excel |
| `StudentExport` | Export |
| `StudentFilters` | Filtres de recherche |
| `StudentSearch` | Recherche avancée |
| `StudentDashboard` | Tableau de bord |

## Enums

| Enum | Valeurs |
|------|---------|
| `StudentStatus` | `ACTIVE`, `INACTIVE`, `TRANSFERRED`, `GRADUATED`, `SUSPENDED`, `ARCHIVED` |
| `StudentGender` | `M`, `F`, `OTHER`, `UNKNOWN` |
| `BloodGroup` | `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`, `UNKNOWN` |
| `StudentReligion` | `CHRISTIAN`, `MUSLIM`, `OTHER`, `UNKNOWN` |

## Schémas Zod (22)

1. `CreateStudentSchema` — Création élève
2. `UpdateStudentSchema` — Mise à jour partielle
3. `ArchiveStudentSchema` — Archivage
4. `RestoreStudentSchema` — Restauration
5. `DeleteStudentSchema` — Suppression (confirmation "SUPPRIMER")
6. `TransferStudentSchema` — Transfert
7. `PromotionStudentSchema` — Promotion / répétition
8. `GuardianSchema` — Tuteur
9. `EmergencyContactSchema` — Contact d'urgence
10. `MedicalSchema` — Dossier médical
11. `VaccinationSchema` — Vaccination
12. `PhotoSchema` — Upload photo
13. `DocumentSchema` — Document
14. `QRCodeSchema` — QR code
15. `StudentCardSchema` — Carte étudiant
16. `ImportSchema` — Import CSV/Excel
17. `ExportSchema` — Export PDF/CSV/JSON/Excel
18. `FiltersSchema` — Filtres (20 champs)
19. `SearchSchema` — Recherche
20. `EnrollmentSchema` — Inscription
21. `TimelineSchema` — Événement timeline
22. `StatisticsSchema` — Paramètres statistiques

## Services (13)

| Service | Rôle |
|---------|------|
| `StudentService` | CRUD principal, archivage, restauration |
| `PromotionService` | Promotion et répétition |
| `TransferService` | Transferts inter-établissements |
| `GuardianService` | Gestion tuteurs / parents |
| `MedicalService` | Dossier médical complet |
| `PhotoService` | Upload et gestion photos |
| `QRCodeService` | Génération QR codes |
| `StudentCardService` | Cartes étudiant |
| `TimelineService` | Fil d'actualité |
| `StatisticsService` | Statistiques et dashboard |
| `SearchService` | Recherche avancée |
| `ValidationService` | Validation métier (Create, Update, Import) |
| `AuditStudentService` | Audit logging |

## Hooks (17)

```typescript
useStudents(filters)                 // Liste paginée avec filtres
useStudent(id)                       // Détail élève
useCreateStudent()                   // Mutation création
useUpdateStudent()                   // Mutation mise à jour
useDeleteStudent()                   // Mutation suppression
useArchiveStudent()                  // Mutation archivage
useRestoreStudent()                  // Mutation restauration
useTransferStudent()                 // Mutation transfert
usePromotion()                       // Mutation promotion / répétition
useStudentMedical(studentId)         // Dossier médical
useStudentGuardian(studentId)        // Tuteurs
useStudentPhoto(studentId)           // Photo
useStudentQRCode(studentId)          // QR code
useStudentCard(studentId)            // Carte
useStudentTimeline(studentId)        // Timeline
useStudentStatistics(schoolId)       // Statistiques
useStudentSearch(query)              // Recherche
```

## API Routes (14)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/students | Liste paginée avec filtres |
| POST | /api/students | Créer un élève |
| GET | /api/students/search | Recherche avancée |
| GET | /api/students/statistics | Statistiques |
| POST | /api/students/import | Import CSV/Excel |
| GET | /api/students/export | Export CSV/JSON |
| GET | /api/students/[id] | Détail élève |
| PATCH | /api/students/[id] | Modifier élève |
| DELETE | /api/students/[id] | Supprimer élève |
| POST | /api/students/[id]/archive | Archiver |
| POST | /api/students/[id]/restore | Restaurer |
| POST | /api/students/[id]/promote | Promouvoir / Répéter |
| POST | /api/students/[id]/transfer | Transférer |
| GET | /api/students/[id]/card | Carte étudiant |
| GET | /api/students/[id]/qrcode | QR code |
| POST | /api/students/[id]/photo | Upload photo |
| GET | /api/students/[id]/timeline | Fil d'actualité |

## Sécurité

- **RBAC** : `SUPER_ADMIN`, `ADMIN`, `SECRETAIRE` pour CRUD ; `SUPER_ADMIN`, `ADMIN` pour archivage/suppression/transfert
- **Multi-tenant** : Toutes les requêtes vérifient `school_id`
- **Validation Zod** sur toutes les entrées
- **Matricule auto-généré** : `STU` + année + 6 chars aléatoires
- **Suppression safe** : Confirmation textuelle "SUPPRIMER" requise
- **Photo max 5MB** : PNG, JPEG, WebP uniquement
- **Import max 10MB** : CSV, XLS, XLSX
- **Import limit** : 500 élèves par import
- **Timeline** : Toutes les actions enregistrées
- **Audit logging** : Actions critiques tracées
- **Query parameter safety** : `url.pathname.split('/').filter(Boolean)` pour extraire l'ID

## Tests

**107 tests** répartis en 6 fichiers :
- `validators.test.ts` — Tests de tous les schémas Zod
- `errors.test.ts` — Tests des erreurs étudiant
- `config.test.ts` — Tests de la configuration
- `types.test.ts` — Tests des types
- `services.test.ts` — Tests du ValidationService
- `data-flow.test.ts` — Tests du flow de données complet
