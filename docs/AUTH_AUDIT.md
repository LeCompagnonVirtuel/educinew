# AUTH_AUDIT.md — Audit Architecture Authentification EduCI

**Date:** 2026-07-22
**Phase:** 1.1 — Fondation & Authentification
**Auditeur:** Lead Software Architect

---

## 1. Résumé Exécutif

L'architecture auth actuelle est fonctionnelle et repose sur Supabase Auth avec gestion cookie via `@supabase/ssr`. Le code respecte un pattern DB-first pour les rôles et school_id (jamais depuis `user_metadata`). Cependant, l'architecture présente une dette technique significative : monolithique (middleware 262 lignes), absence de Repository Pattern, couche service minimale, aucun test, et logging console au lieu de `@educi/logger`.

---

## 2. Forces

| # | Force | Détail |
|---|-------|--------|
| 1 | **DB-first role resolution** | Rôle et school_id toujours lus depuis `public.users`, jamais depuis `user_metadata` client-writable |
| 2 | **RLS complet** | 90 migrations avec politiques RLS sur toutes les tables |
| 3 | **Multi-tenant strict** | `getAuthenticatedSchoolId()`, `scopedQuery()`, `verifySchoolOwnership()` |
| 4 | **CSRF protection** | Origin/Host header validation sur tous les API routes mutating |
| 5 | **Security headers** | CSP, HSTS, X-Frame-Options, X-Content-Type-Options complets |
| 6 | **Rate limiting** | Côté serveur (RPC) et côté client (sessionStorage) |
| 7 | **Login identifier flexible** | Email, matricule, téléphone via RPC `resolve_login_identifier` |
| 8 | **Audit trail** | Événements login/logout/password logués dans `audit_logs` |
| 9 | **Password policy** | Validation longueur, complexité, messages bilingues |
| 10 | **Session manager** | Tracking device côté client avec device ID persistant |

---

## 3. Faiblesses

| # | Faiblesse | Sévérité | Impact |
|---|-----------|----------|--------|
| 1 | **Middleware monolithique** | Élevée | 262 lignes, 6 responsabilités mélangées (CSRF, auth, email check, first login, RBAC, headers) |
| 2 | **Pas de Repository Pattern** | Élevée | Appels Supabase directs dans les pages/hooks (violations du DDD) |
| 3 | **Service layer minimal** | Élevée | `sbAuth` est un objet avec des méthodes, pas un vrai service avec interfaces |
| 4 | **Aucun test auth** | Élevée | 0 tests unitaires/intégration pour l'authentification |
| 5 | **Logging console** | Moyenne | `console.error` au lieu de `@educi/logger` pour les erreurs auth |
| 6 | **Pas de schémas Zod** | Moyenne | Validation manuelle dans `RoleLoginPage` mais pas partout |
| 7 | **Doublon types** | Moyenne | `User` type défini dans `@educi/types` ET re-défini dans le web local |
| 8 | **localStorage pour user cache** | Moyenne | Données utilisateur en JSON dans localStorage (XSS risk) |
| 9 | **Session manager client-side** | Faible | Tracking device uniquement côté client, pas de révocation serveur |
| 10 | **Mobile: double stockage token** | Moyenne | Supabase persistSession + AuthContext stockage manuel (deux sources de vérité) |
| 11 | **Edge Functions: auth dupliquée** | Moyenne | 9/11 functions duppliquent le pattern auth au lieu d'utiliser `_shared/auth.ts` |
| 12 | **MFA désactivé** | Moyenne | Columns `two_factor_secret`/`two_factor_enabled` existent mais MFA off |
| 13 | **Email confirmations disabled** | Élevée | `enable_confirmations = false` dans config.toml |
| 14 | `bcryptjs` inutilisé | Faible | Dans devDeps web sans utilisation |

---

## 4. Dette Technique

| # | Dette | Priorité | Effort estimé |
|---|-------|----------|---------------|
| 1 | Refactoriser middleware en modules | Haute | 2-3 jours |
| 2 | Créer Repository Pattern pour auth | Haute | 3-4 jours |
| 3 | Créer les services auth (8 services) | Haute | 4-5 jours |
| 4 | Ajouter tous les schémas Zod | Haute | 1-2 jours |
| 5 | Unifier types dans @educi/types | Haute | 1 jour |
| 6 | Centraliser erreurs dans @educi/errors | Haute | 1 jour |
| 7 | Remplacer console par @educi/logger | Moyenne | 1 jour |
| 8 | Créer tests auth | Haute | 3-4 jours |
| 9 | Synchroniser mobile auth | Haute | 2-3 jours |
| 10 | Standardiser edge functions auth | Moyenne | 1-2 jours |

---

## 5. Risques

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|-------------|--------|------------|
| 1 | Privilege escalation via metadata | Faible (corrigé) | Critique | DB-first pattern maintenu |
| 2 | XSS via localStorage user data | Moyenne | Élevé | Supprimer localStorage cache, utiliser uniquement cookies |
| 3 | Session fixation | Faible | Élevé | Supabase gère nativement |
| 4 | Timing attack sur login | Moyenne | Moyen | Rate limiting + messages génériques |
| 5 | CSRF bypass | Faible | Élevé | Origin check + SameSite cookies |
| 6 | Refresh token leakage | Faible | Élevé | HttpOnly cookies + rotation |
| 7 | Multi-tenant leakage | Faible | Critique | RLS + scopedQuery |
| 8 | Mobile token drift | Moyenne | Moyen | Unified storage strategy |

---

## 6. Plan de Migration

### Phase 1.1 — Fondation (EN COURS)
1. Créer les erreurs auth dans `@educi/errors`
2. Ajouter types auth dans `@educi/types`
3. Ajouter config auth dans `@educi/config`
4. Créer les schémas Zod
5. Refactoriser middleware en modules
6. Créer Repository Pattern
7. Créer les 8 services
8. Synchroniser mobile
9. Créer tests
10. Documentation

### Phase 1.2 — Fonctionnalités (FUTUR)
- MFA (TOTP, SMS)
- Refresh token rotation serveur
- Session revocation multi-device
- Audit log amélioré
- Password history

---

## 7. Décision

**GO** — L'architecture existante est suffisamment solide pour supporter la refonte. Aucune régression的功能nelle à craindre. La migration peut se faire de manière incrémentale sans casser l'existant.
