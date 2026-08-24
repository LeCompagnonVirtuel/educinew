# EduCI Teachers Module

Phase 1.5 — Module complet de gestion des enseignants.

## Architecture

```
web/src/features/teachers/
├── types.ts                          # 30+ types et interfaces
├── validators/
│   ├── schemas.ts                    # 23 schémas Zod
│   └── index.ts
├── repositories/
│   ├── teacher.repository.ts         # Supabase Repository
│   └── index.ts
├── services/
│   ├── teacher.service.ts            # Service CRUD principal
│   ├── assignment.service.ts         # Affectations
│   ├── schedule.service.ts           # Emplois du temps
│   ├── availability.service.ts       # Disponibilités
│   ├── contract.service.ts           # Contrats
│   ├── leave.service.ts              # Congés
│   ├── payroll.service.ts            # Paie
│   ├── evaluation.service.ts         # Évaluations
│   ├── qualification.service.ts      # Diplômes
│   ├── certification.service.ts      # Certifications
│   ├── statistics.service.ts         # Statistiques
│   ├── search.service.ts             # Recherche
│   ├── validation.service.ts         # Validation métier
│   ├── audit-teacher.service.ts      # Audit logging
│   └── index.ts
├── hooks/
│   ├── useTeachers.ts               # Liste et pagination
│   ├── useTeacher.ts                # Détail enseignant
│   ├── useCreateTeacher.ts          # Création
│   ├── useUpdateTeacher.ts          # Modification
│   ├── useDeleteTeacher.ts          # Suppression
│   ├── useArchiveTeacher.ts         # Archivage
│   ├── useRestoreTeacher.ts         # Restauration
│   ├── useTeacherAssignments.ts     # Affectations
│   ├── useTeacherSchedule.ts        # Emploi du temps
│   ├── useTeacherAvailability.ts    # Disponibilités
│   ├── useTeacherLeave.ts           # Congés
│   ├── useTeacherPayroll.ts         # Paie
│   ├── useTeacherEvaluation.ts      # Évaluations
│   ├── useTeacherStatistics.ts      # Statistiques
│   ├── useTeacherSearch.ts          # Recherche
│   └── index.ts
└── index.ts                          # Exports publics

mobile/features/teachers/
├── repositories/
│   ├── teacher.repository.ts
│   └── index.ts
├── services/
│   ├── student.service.ts
│   └── index.ts
├── hooks/
│   └── index.ts
└── index.ts

web/src/app/api/teachers/
├── route.ts                          # GET (list) + POST (create)
├── search/route.ts                   # GET (search)
├── statistics/route.ts               # GET (statistics)
├── payroll/route.ts                  # GET (payroll)
├── import/route.ts                   # POST (import)
├── export/route.ts                   # GET (export)
├── [id]/route.ts                     # GET + PATCH + DELETE
├── [id]/archive/route.ts             # POST (archive)
├── [id]/restore/route.ts             # POST (restore)
├── [id]/assignments/route.ts         # GET (assignments)
├── [id]/schedule/route.ts            # GET (schedule)
├── [id]/availability/route.ts        # GET (availability)
├── [id]/leave/route.ts               # GET (leaves)
├── [id]/evaluations/route.ts         # GET (evaluations)
├── [id]/contracts/route.ts           # GET (contracts)
└── [id]/timeline/route.ts            # GET (timeline)
```

## Types Principaux (30+)

| Type | Description |
|------|-------------|
| `Teacher` | Enseignant complet |
| `TeacherProfile` | Profil étendu |
| `TeacherAssignment` | Affectation classe/matière |
| `TeacherContract` | Contrat de travail |
| `TeacherDepartment` | Département |
| `TeacherSubject` | Matière enseignée |
| `TeacherSchedule` | Emploi du temps |
| `TeacherAvailability` | Disponibilité |
| `TeacherAttendance` | Présence |
| `TeacherPayrollSummary` | Résumé paie |
| `TeacherLeave` | Congé |
| `TeacherQualification` | Diplôme |
| `TeacherCertification` | Certification |
| `TeacherExperience` | Expérience |
| `TeacherEmergencyContact` | Contact d'urgence |
| `TeacherMedicalRecord` | Dossier médical |
| `TeacherEvaluation` | Évaluation |
| `TeacherPerformance` | Performance |
| `TeacherStatistics` | Statistiques |
| `TeacherTimeline` | Fil d'actualité |
| `TeacherImport` | Import |
| `TeacherExport` | Export |
| `TeacherFilters` | Filtres |
| `TeacherSearch` | Recherche |
| `TeacherDashboard` | Tableau de bord |

## Enums

| Enum | Valeurs |
|------|---------|
| `TeacherStatus` | `ACTIVE`, `INACTIVE`, `SUSPENDED`, `ARCHIVED`, `ON_LEAVE`, `CONTRACT_ENDED` |
| `TeacherGender` | `M`, `F`, `OTHER`, `UNKNOWN` |
| `TeacherEmploymentType` | `FULL_TIME`, `PART_TIME`, `CONTRACT`, `VOLUNTEER`, `INTERN` |
| `TeacherContractType` | `CDI`, `CDD`, `VACATAIRE`, `CONSULTANT`, `STAGE` |
| `TeacherGrade` | `A1` à `D3` (12 niveaux) |
| `TeacherSpeciality` | 17 spécialités (Maths, Physique, etc.) |
| `TeacherLeaveType` | `MALADIE`, `MATERNITE`, `PATERNITE`, `ANNUEL`, `EXCEPTIONNEL`, `SANS_SOLDE`, `FORMATION` |
| `TeacherEvaluationType` | `PEDAGOGIQUE`, `ADMINISTRATIVE`, `ANNUELLE`, `PROBATION` |

## Schémas Zod (23)

1. `CreateTeacherSchema` — Création enseignant
2. `UpdateTeacherSchema` — Mise à jour partielle
3. `ArchiveTeacherSchema` — Archivage
4. `RestoreTeacherSchema` — Restauration
5. `DeleteTeacherSchema` — Suppression (confirmation "SUPPRIMER")
6. `AssignmentSchema` — Affectation
7. `SubjectSchema` — Matière
8. `ScheduleSchema` — Emploi du temps
9. `AvailabilitySchema` — Disponibilité
10. `ContractSchema` — Contrat
11. `LeaveSchema` — Congé
12. `PayrollSchema` — Paie
13. `QualificationSchema` — Diplôme
14. `CertificationSchema` — Certification
15. `EvaluationSchema` — Évaluation
16. `TeacherMedicalSchema` — Dossier médical
17. `EmergencyContactSchema` — Contact d'urgence
18. `TeacherImportSchema` — Import CSV/Excel
19. `TeacherExportSchema` — Export
20. `TeacherFiltersSchema` — Filtres (20 champs)
21. `TeacherSearchSchema` — Recherche
22. `TeacherStatisticsSchema` — Statistiques
23. `TeacherTimelineSchema` — Timeline

## Services (14)

| Service | Rôle |
|---------|------|
| `TeacherService` | CRUD principal, archivage, restauration |
| `AssignmentService` | Affectations classes/matières |
| `ScheduleService` | Emplois du temps, détection conflits |
| `AvailabilityService` | Disponibilités |
| `ContractService` | Contrats de travail |
| `LeaveService` | Demandes de congé, validation |
| `PayrollService` | Paie, calcul heures supplémentaires |
| `EvaluationService` | Évaluations pédagogiques |
| `QualificationService` | Diplômes |
| `CertificationService` | Certifications |
| `StatisticsService` | Statistiques et dashboard |
| `SearchService` | Recherche avancée |
| `ValidationService` | Validation métier |
| `AuditTeacherService` | Audit logging |

## Hooks (15)

```typescript
useTeachers(filters)                 // Liste paginée avec filtres
useTeacher(id)                       // Détail enseignant
useCreateTeacher()                   // Mutation création
useUpdateTeacher()                   // Mutation mise à jour
useDeleteTeacher()                   // Mutation suppression
useArchiveTeacher()                  // Mutation archivage
useRestoreTeacher()                  // Mutation restauration
useTeacherAssignments(teacherId)     // Affectations
useTeacherSchedule(teacherId)        // Emploi du temps
useTeacherAvailability(teacherId)    // Disponibilités
useTeacherLeave(teacherId)           // Congés
useTeacherPayroll(schoolId)          // Paie
useTeacherEvaluation(teacherId)      // Évaluations
useTeacherStatistics(schoolId)       // Statistiques
useTeacherSearch(query)              // Recherche
```

## API Routes (16)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/teachers | Liste paginée avec filtres |
| POST | /api/teachers | Créer un enseignant |
| GET | /api/teachers/search | Recherche avancée |
| GET | /api/teachers/statistics | Statistiques |
| GET | /api/teachers/payroll | Paie |
| POST | /api/teachers/import | Import CSV/Excel |
| GET | /api/teachers/export | Export CSV/JSON |
| GET | /api/teachers/[id] | Détail enseignant |
| PATCH | /api/teachers/[id] | Modifier enseignant |
| DELETE | /api/teachers/[id] | Supprimer enseignant |
| POST | /api/teachers/[id]/archive | Archiver |
| POST | /api/teachers/[id]/restore | Restaurer |
| GET | /api/teachers/[id]/assignments | Affectations |
| GET | /api/teachers/[id]/schedule | Emploi du temps |
| GET | /api/teachers/[id]/availability | Disponibilités |
| GET | /api/teachers/[id]/leave | Congés |
| GET | /api/teachers/[id]/evaluations | Évaluations |
| GET | /api/teachers/[id]/contracts | Contrats |
| GET | /api/teachers/[id]/timeline | Fil d'actualité |

## Sécurité

- **RBAC** : `SUPER_ADMIN`, `ADMIN`, `SECRETAIRE` pour CRUD ; `SUPER_ADMIN`, `ADMIN` pour archivage/suppression
- **Multi-tenant** : Toutes les requêtes vérifient `school_id`
- **Validation Zod** sur toutes les entrées
- **Matricule auto-généré** : `TCH` + année + 6 chars aléatoires
- **Suppression safe** : Confirmation textuelle "SUPPRIMER" requise
- **Emploi du temps** : Détection automatique des conflits horaires
- **Congés** : Validation des limites (30 jours/an, 15 jours maladie consécutifs)
- **Paie** : Calcul automatique heures supplémentaires (x1.5)
- **Évaluations** : Critères prédéfinis + score maximum 20
- **Timeline** : Toutes les actions enregistrées
- **Audit logging** : Actions critiques tracées

## Tests

**150+ tests** répartis en 9 fichiers :
- `validators.test.ts` — Tests de tous les schémas Zod
- `validators-extended.test.ts` — Tests étendus des schémas
- `errors.test.ts` — Tests des erreurs enseignant
- `config.test.ts` — Tests de la configuration
- `config-extended.test.ts` — Tests étendus de la configuration
- `types.test.ts` — Tests des types
- `types-extended.test.ts` — Tests étendus des types
- `services.test.ts` — Tests du ValidationService
- `audit.test.ts` — Tests de l'AuditService
- `permissions.test.ts` — Tests des permissions RBAC
- `data-flow.test.ts` — Tests du flow de données complet
