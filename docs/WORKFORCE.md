# WORKFORCE & EMPLOYMENT - Module Overview

Phase 4.4 - EduCI ERP

---

## 1. Vision

Module intégré de gestion de la main-d'œuvre et de l'emploi, connectant directement la formation scolaire au marché du travail. Conçu pour les institutions d'Afrique cherchant à maximiser l'insertion professionnelle de leurs diplômés.

## 2. Périmetre

| Module | Description |
|--------|-------------|
| SKILLS | Compétences et certifications |
| CAREER | Gestion des carrières |
| EMPLOYMENT | Offres et candidatures |
| LIFELONG_LEARNING | Formation continue |
| CORPORATE_LEARNING | Apprentissage entreprise |
| TALENT_MARKETPLACE | Place de marché talents |
| CAREER_WALLET | Portfolio numérique |
| LABOR_INTELLIGENCE | Données marché travail |
| EDUCATION_EMPLOYMENT | Pont éducation-emploi |
| WORKFORCE_AI | IA prédictive |
| WORKFORCE_API | API externes |
| WORKFORCE_SECURITY | Sécurité |
| WORKFORCE_AUDIT | Audit trail |

## 3. Architecture

```
Page → Hook → Service → Repository → Supabase
```

Aucune logique métier dans les pages. Aucun accès Supabase direct dans les composants UI.

## 4. Données Clés

| Table | Description |
|-------|-------------|
| workforce_skills | Compétences enregistrées |
| workforce_certifications | Certifications professionnelles |
| workforce_jobs | Offres d'emploi |
| workforce_applications | Candidatures |
| workforce_companies | Entreprises partenaires |
| workforce_internships | Stages |
| workforce_placements | Insertions professionnelles |

## 5. Multi-tenant

Chaque requête inclut `school_id` :
```typescript
.eq("school_id", schoolId)
```

RLS n'est jamais la seule protection.

## 6. Flux Principal

```
Élève → Formation → Compétences → Portfolio → Candidature → Placement → Suivi
```

## 7. KPIs

- Taux d'insertion professionnelle
- Nombre de partenariats entreprises
- Temps moyen de placement
- Satisfaction employeurs
- Compétences les plus demandées
- Taux de conversion candidature/embauche

## 8. Dépendances

- Phase 1-3 : Fondations complètes
- Phase 4.1-4.3 : Modules académiques
- Supabase Auth & RLS
- Money Fusion (frais certification)

## 9. Validation Phase 4.4

- [ ] Architecture validée
- [ ] BDD validée (RLS + Index)
- [ ] API validée (Zod + RBAC)
- [ ] Frontend validé (Responsive + Dark Mode)
- [ ] Tests unitaires OK
- [ ] Tests intégration OK
- [ ] Documentation à jour
- [ ] Aucune régression
