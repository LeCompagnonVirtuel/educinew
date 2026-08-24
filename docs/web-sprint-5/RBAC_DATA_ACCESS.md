# RBAC Data Access — EduCI Sprint 5

## withRole Distribution

| Module | withRole Count | Roles Applied |
|--------|---------------|---------------|
| finance/ | 69 | ADMIN, DIRECTEUR, COMPTABLE |
| students/ | 12 | ADMIN, DIRECTEUR, SECRETAIRE |
| teachers/ | 14 | ADMIN, DIRECTEUR |
| schools/ | 3 | ADMIN, DIRECTEUR, SUPER_ADMIN |
| health/ | 14 | ADMIN, DIRECTEUR, INFIRMIER |
| wellbeing/ | 12 | ADMIN, DIRECTEUR, SURVEILLANT |
| bullying/ | 14 | ADMIN, DIRECTEUR, SURVEILLANT |
| safeguarding/ | 14 | ADMIN, DIRECTEUR |
| incidents/ | 12 | ADMIN, DIRECTEUR, SURVEILLANT |
| safety/ | 12 | ADMIN, DIRECTEUR |
| exams/ | 15 | ADMIN, DIRECTEUR, ENSEIGNANT |
| enterprise/ | ~200 | Various |
| Other | ~48 | Various |
| **Total** | **439** | |

## DELETE Operations RBAC

All DELETE handlers in sensitive modules require withRole:
- Students: ADMIN, DIRECTEUR, SECRETAIRE
- Teachers: ADMIN, DIRECTEUR
- Schools: ADMIN, DIRECTEUR, SUPER_ADMIN
- Health: ADMIN, DIRECTEUR, INFIRMIER
- Finance: ADMIN, DIRECTEUR, COMPTABLE

## SUPER_ADMIN Bypass

SUPER_ADMIN bypasses all withRole checks (handled in SecurityContext internals). This allows platform-level administrative operations without module-specific restrictions.

## Restore Operations RBAC

All restore routes require elevated roles (ADMIN, DIRECTEUR minimum).
