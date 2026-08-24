# AUDIT GLOBAL - EduCI ERP SaaS Multi-Tenant

**Date :** 2026-07-21  
**Réalisé par :** Architecte Logiciel Principal  
**Version :** 1.0  
**Statut :** Phase d'analyse uniquement (aucune modification)

---

## 1. VUE D'ENSEMBLE DE L'ARCHITECTURE

| Métrique | Valeur |
|----------|--------|
| **Total fichiers** (hors node_modules/.git/.next) | 851 |
| **Pages web (routes)** | 146 |
| **Routes API** | 35 |
| **Composants** | 62 fichiers (.tsx) |
| **Hooks** | 8 |
| **Services domaine** | 28 |
| **Tables base de données** | 101 |
| **Écrans mobile** | 58 (40 screens + 18 tabs) |
| **Migrations SQL** | 30+ |
| **Tests unitaires** | 10 fichiers |
| **Tests E2E** | 3 fichiers |

### Stack technique

| Couche | Technologies |
|--------|-------------|
| **Frontend Web** | Next.js 14 App Router, TypeScript 5.4, TailwindCSS 3.4, Framer Motion 12, Recharts, Lucide |
| **Mobile** | Expo SDK 55, React Native 0.83, React Navigation 7 |
| **Backend** | Supabase (Auth, Database, Storage, Realtime, RLS) |
| **Monitoring** | Sentry (Next.js SDK) |
| **Paiement** | Money Fusion (seul gateway actif) |
| **CI/CD** | GitHub Actions (4 workflows), Vercel (auto-deploy main) |
| **Tests** | Vitest 4, Playwright, Testing Library |

---

## 2. CARTOGRAPHIE DES DOSSIERS

### `/web/src/app/` — 146 pages (routes)

| Dossier | Rôle | Fichiers |
|---------|------|----------|
| `app/dashboard/` | Dashboard principal admin | 1 (1066 lignes) |
| `app/students/` | Gestion élèves | 1 (1343 lignes) |
| `app/teachers/` | Gestion enseignants | 1 (1109 lignes) |
| `app/classes/` | Gestion classes | 1 (1458 lignes) |
| `app/grades/` | Saisie notes | 1 (1685 lignes) |
| `app/attendance/` | Pointage présences | 1 (1279 lignes) |
| `app/payments/` | Paiements | 1 (1448 lignes) |
| `app/bulletin/` | Bulletins scolaires | 1 (982 lignes) |
| `app/messages/` | Messagerie | 1 (1051 lignes) |
| `app/transport/` | Transport scolaire | 1 (515 lignes) |
| `app/timetable/` | Emploi du temps | 1 (903 lignes) |
| `app/pointage/` | Système pointage QR | 1 (987 lignes) |
| `app/cantine/` | Cantine | 1 (853 lignes) |
| `app/library/` | Bibliothèque | 1 (403 lignes) |
| `app/infirmerie/` | Infirmerie | 1 (569 lignes) |
| `app/nouvelle-annee/` | Passage année scolaire | 1 (1218 lignes) |
| `app/directeur/` | Dashboard directeur | 1 (290 lignes) |
| `app/settings/` | Paramètres | 2 (1068 + 309 2FA) |
| `app/api/` | API Routes | 35 routes |
| Public (about, features, pricing...) | Marketing | ~25 pages |
| Auth (login, register, verify...) | Authentification | ~12 pages |
| Superadmin | Super administration | 6 pages |

### `/web/src/components/` — 62 fichiers

| Dossier | Rôle | Fichiers | Lignes max |
|---------|------|----------|-----------|
| `layout/` | Shell app (sidebar, topbar, nav) | 7 | ~200/fichier |
| `ui/` | Composants réutilisables | 14 | ~150/fichier |
| `onboarding/` | Wizard inscription école | 10 | 867 max |
| `settings/` | Panneaux paramètres | 10 | 666 max |
| `auth/` | Pages connexion/inscription | 4 | 373 max |
| `registration/` | Contexte inscription | 2 | 393 max |
| `branding/` | Branding école | 4 | 427 max |
| `map/` | Cartes (transport, école) | 3 | 434 max |
| `brand/` | Logo EduCI | 1 | - |
| `support/` | Support client | 1 | - |
| Racine | ErrorBoundary, Providers, Realtime | 3 | - |

### `/web/src/lib/` — Services & utilitaires

| Dossier | Rôle | Fichiers |
|---------|------|----------|
| `api/domains/` | Services métier Supabase | 28 |
| `api/` | Wrappers, validation, sécurité | 18 |
| `payments/` | Orchestrateur paiement Money Fusion | 6 |
| `supabase/` | Clients Supabase (browser/server) | 2 |
| `realtime/` | Gestionnaire temps réel | 3 |
| `navigation/` | Config navigation | 2 |
| `auth/` | Politique mot de passe, sessions | 2 |
| Racine | Utils, rôles, export, traductions | 8 |

### `/web/src/hooks/` — 8 hooks

| Hook | Rôle |
|------|------|
| `useAuth` | Authentification, session, rôle |
| `useSchool` | Données école courante |
| `useRealtime` | Souscriptions temps réel |
| `useLanguage` | i18n |
| `useExportBranding` | Export avec branding |
| `useScrollRestore` | Restauration scroll |
| `useSidebarStore` | État sidebar |
| `useSupport` | Support intégré |

### `/mobile/` — Application complète

| Zone | Fichiers |
|------|----------|
| Screens | 40 |
| Tabs | 18 |
| Services | 17 |
| Components | 13 |
| Hooks | 3 |
| Context | 3 |
| Constants | 4 |

### `/supabase/` — Base de données

| Zone | Contenu |
|------|---------|
| Migrations | 30+ fichiers SQL |
| Tables | 101 |
| Fonctions | 40+ |
| Triggers | 36 |
| Buckets storage | 8 |
| seed.sql | Données démo |

---

## 3. AUDIT DES MODULES — Avancement

| Module | Avancement | Fonctionnalités OK | Manquantes | Problèmes |
|--------|:---------:|-------------------|------------|-----------|
| **Dashboard** | 90% | Stats, graphiques, KPI | Vue par rôle complète | Page >1000 lignes |
| **Élèves** | 85% | CRUD, import, QR, documents | Historique académique complet | Page >1300 lignes |
| **Enseignants** | 80% | CRUD, import, check-in | Évaluation performance | Page >1100 lignes |
| **Parents** | 70% | Dashboard, suivi enfants | Communication directe école | Limité côté web |
| **Personnel** | 75% | CRUD, invitations, pointage | Congés, planning | - |
| **Classes** | 85% | CRUD, matières, effectifs | Sous-groupes, options | Page >1400 lignes |
| **Pointage/QR** | 90% | Scan, HMAC, multi-méthode | Historique consolidé | Architecture complexe |
| **Paiements** | 85% | Money Fusion, factures, wallet | Rappels auto, échéancier | Webhook non signé |
| **Transport** | 70% | Bus CRUD, tracking, trips | Notifications parents temps réel | - |
| **Bulletins** | 80% | Génération, validation, PDF | Export multi-format | - |
| **Notes** | 85% | Saisie, calcul, validation | Import notes en masse optimisé | Page >1600 lignes |
| **Présences** | 85% | Multi-méthode, stats | Alertes automatiques parents | - |
| **Emploi du temps** | 75% | Affichage, créneaux | Gestion conflits auto | - |
| **Messagerie** | 75% | Inbox, conversations, annonces | Pièces jointes, groupes | - |
| **Bibliothèque** | 60% | Catalogue, emprunts | Recherche avancée, amendes | Nouveau module |
| **Cantine** | 60% | Menus, abonnements | Service quotidien complet | Nouveau module |
| **Infirmerie** | 60% | Consultations, dossiers | Alertes urgence, historique | Nouveau module |
| **Nouvelle Année** | 65% | Wizard multi-étapes | Archivage, migration données | Nouveau module |
| **Directeur** | 50% | Dashboard stats | Rapports, décisions | Nouveau module |
| **Comptabilité** | 75% | Finance dashboard, transactions | Exports comptables | - |
| **Paramètres** | 80% | Branding, sécurité, calendar | Import/export config | - |
| **2FA** | 40% | Page configuration | Backend TOTP complet | UI seulement |
| **Super Admin** | 70% | Monitoring, config, logs | Gestion multi-écoles avancée | Pas de useAuth |
| **Mobile** | 85% | 58 écrans, offline, push | Sync conflits, biométrie | React 19 (web=18) |
| **Marketplace** | 50% | Listings, achats | Paiement intégré, livraison | - |
| **IA** | 60% | Chat, quiz, exam-prep | Suivi progrès, recommandations | - |
| **Notifications** | 75% | In-app, push mobile | Email digest, SMS | - |

---

## 4. AUDIT DES ROUTES

### Routes mortes / inutilisées potentielles

| Route | Problème |
|-------|----------|
| `/superadmin/*` (6 pages) | Manque useAuth — protégé uniquement par middleware |
| `/email-logs` | Manque useAuth — protégé uniquement par middleware |
| `/auth/admin/login` | Doublon avec `/login` |
| `/auth/admin/register` | Doublon avec `/register` |
| `/auth/parent/login` | Doublon avec `/login` |
| `/auth/student/login` | Doublon avec `/login` |
| `/auth/teacher/login` | Doublon avec `/login` |
| `/auth/select-role` | Peut-être inutilisé |
| `/teacher-settings` | Doublon potentiel avec `/settings` |
| `/teacher-profile` | Doublon potentiel avec `/profile` |
| `/student-dashboard` | Doublon avec `/student` |
| `/parent-dashboard` | Doublon avec `/parent` |
| `/create-school` | Doublon avec `/register` flow |

### Routes non référencées dans la navigation

| Route | Accessible via |
|-------|---------------|
| `/grade-entry` | Middleware TEACHER seulement |
| `/mark-attendance` | Middleware TEACHER seulement |
| `/my-classes` | Middleware TEACHER seulement |
| `/schedule` | Middleware TEACHER seulement |
| `/assignments` | Pas dans middleware |

### Routes avec protection middleware mais sans useAuth dans la page

7 pages protégées routes qui ne vérifient pas le rôle côté client (risque si middleware bypassé) :
- `/email-logs`
- `/superadmin/page`
- `/superadmin/config`
- `/superadmin/logs`
- `/superadmin/modules`
- `/superadmin/monitoring`
- `/superadmin/subscriptions`

---

## 5. AUDIT DES COMPOSANTS

### Composants > 300 lignes (violation convention)

| Composant | Lignes | Action recommandée |
|-----------|--------|-------------------|
| `OnboardingAssistant.tsx` | 867 | Découper en sous-composants |
| `ClassesSettings.tsx` | 666 | Découper CRUD/formulaire |
| `LivePreview.tsx` | 636 | Extraction templates |
| `CalendarSettings.tsx` | 592 | Extraction calendrier |
| `GatewaySettings.tsx` | 574 | Extraction formulaire |
| `IdentityGenerator.tsx` | 498 | Découper |
| `PaymentsSettings.tsx` | 489 | Découper |
| `SmartValidation.tsx` | 479 | Découper |
| `OnboardingContext.tsx` | 461 | OK (contexte lourd) |
| `SchoolExplorer.tsx` | 434 | Extraction carte/liste |
| `SetupWizard.tsx` | 427 | Découper steps |

### Pages > 500 lignes (violation convention service/page < 500)

| Page | Lignes |
|------|--------|
| `grades/page.tsx` | 1685 |
| `classes/page.tsx` | 1458 |
| `payments/page.tsx` | 1448 |
| `students/page.tsx` | 1343 |
| `attendance/page.tsx` | 1279 |
| `nouvelle-annee/page.tsx` | 1218 |
| `teachers/page.tsx` | 1109 |
| `settings/page.tsx` | 1068 |
| `dashboard/page.tsx` | 1066 |
| `messages/page.tsx` | 1051 |
| `pointage/page.tsx` | 987 |
| `bulletin/page.tsx` | 982 |
| `timetable/page.tsx` | 903 |
| `announcements/page.tsx` | 898 |
| `cantine/page.tsx` | 853 |
| `teacher-checkin/page.tsx` | 569 |
| `profile/page.tsx` | 569 |
| `infirmerie/page.tsx` | 569 |
| `bulk-import/page.tsx` | 549 |
| `users/page.tsx` | 518 |
| `pricing/page.tsx` | 518 |
| `transport/page.tsx` | 515 |

**22 pages violent la convention des 300 lignes max par composant.**

### Composants potentiellement réutilisables (non extraits)

- Tables de données (pattern répété dans 15+ pages)
- Modales CRUD (pattern répété dans 10+ pages)
- Formulaires de filtre (pattern répété dans 8+ pages)
- Stat cards avec graphiques (pattern répété dans 6+ pages)
- Onglets/Tabs (pattern répété dans 12+ pages)

---

## 6. AUDIT DE LA BASE DE DONNÉES

### 101 tables identifiées

Voir inventaire complet dans la section database audit.

### Tables potentiellement inutilisées

| Table | Raison |
|-------|--------|
| `registration_drafts` (v1) | Remplacé par `registration_drafts_v2` |
| `subscriptions.stripe_subscription_id` | Stripe interdit — colonne orpheline |
| `payment_transactions.flutterwave_id` | Flutterwave interdit — colonne orpheline |
| `payment_transactions.flw_reference` | Flutterwave interdit — colonne orpheline |
| `exam_categories` | Pas d'interface web visible |
| `exams` | Pas d'interface CRUD web |
| `teacher_badges` | Pas d'interface visible |
| `room_assignments` | Pas d'interface visible |

### Colonnes orphelines (vestiges d'anciens providers)

| Table | Colonne | Raison |
|-------|---------|--------|
| `payment_transactions` | `flutterwave_id` | Provider supprimé |
| `payment_transactions` | `flw_reference` | Provider supprimé |
| `subscriptions` | `stripe_subscription_id` | Stripe interdit |

### Relations manquantes

| Manque | Impact |
|--------|--------|
| `exam_categories.school_id` | Pas d'isolation multi-tenant |
| `quiz_questions` → isolation | RLS `USING (true)` = OUVERT |
| `marketplace_listings.school_id` | Isolation via join seulement |

---

## 7. AUDIT MULTI-TENANT

### Conformité school_id

| Catégorie | Tables | Status |
|-----------|--------|--------|
| Tables avec school_id direct | 73 | ✓ CONFORME |
| Tables isolées via FK (join) | 12 | ⚠️ ACCEPTABLE |
| Tables système (sans school_id) | 10 | ✓ ATTENDU |
| Tables référence (lookup) | 3 | ✓ ATTENDU |
| **Tables SANS isolation** | **3** | **✗ CRITIQUE** |

### Problèmes critiques multi-tenant

| # | Table | Risque | Détail |
|---|-------|--------|--------|
| 1 | `quiz_questions` | **CRITIQUE** | RLS `FOR SELECT USING (true)` — toutes les données visibles par tous |
| 2 | `exam_categories` | **ÉLEVÉ** | Pas de school_id, pas d'isolation |
| 3 | `library_books` + 8 tables (migration 20260718) | **ÉLEVÉ** | RLS utilise `current_setting('app.current_school_id')` au lieu de `get_user_school_id()` — pattern incompatible |

### Incohérence RLS entre migrations

- **Migrations 001-016** : Pattern `get_user_school_id()` + `is_super_admin()`
- **Migration 20260718** : Pattern `current_setting('app.current_school_id', true)::uuid`

Ces deux patterns NE SONT PAS interchangeables. Le second nécessite un `SET LOCAL` par transaction que l'application ne fait pas actuellement.

---

## 8. AUDIT DES PERMISSIONS (RBAC)

### Couverture par rôle

| Rôle | Routes middleware | Dashboard dédié | Pages accessibles |
|------|:-----------------:|:---------------:|:-----------------:|
| SUPER_ADMIN | 47 routes | `/superadmin` | Toutes |
| ADMIN | 44 routes | `/dashboard` | Toutes sauf superadmin |
| DIRECTEUR | 18 routes | `/directeur` | Vue académique |
| COMPTABLE | 11 routes | `/comptable` | Finance + cantine |
| SECRETAIRE | 9 routes | `/secretaire` | Élèves + documents |
| CENSEUR | 11 routes | `/censeur` | Discipline + notes |
| SURVEILLANT | 11 routes | `/surveillant` | Pointage + visiteurs |
| TEACHER | 22 routes | `/teacher-dashboard` | Cours + notes |
| PARENT | 11 routes | `/parent` | Suivi enfants |
| STUDENT | 14 routes | `/student` | Cours + notes |
| CHAUFFEUR | 7 routes | `/driver-dashboard` | Transport |

### Problèmes identifiés

| # | Problème | Sévérité |
|---|----------|----------|
| 1 | Pas de rôle BIBLIOTHECAIRE dans middleware | Moyenne |
| 2 | Pas de rôle INFIRMIER dans middleware | Moyenne |
| 3 | Pas de rôle RH dans middleware | Faible |
| 4 | Table `permissions` existe mais n'est pas utilisée dans le code | Haute |
| 5 | RBAC middleware ≠ RBAC API (duplication logique) | Moyenne |

---

## 9. AUDIT QR CODE

### Architecture

| Aspect | Implementation |
|--------|---------------|
| **Format** | `EDUCI:v2:{type}:{userId}:{schoolId}:{timestamp}:{signature}` |
| **Signature** | HMAC-SHA256 avec clé serveur |
| **Stockage** | Table `qr_codes` + `class_qr_codes` + `document_qr_codes` |
| **Génération** | Triggers auto (on student/teacher/staff created) + API batch |
| **Scan** | `/api/pointage/scan` avec vérification signature + expiry |
| **Profils avec QR** | Élèves, Enseignants, Personnel, Classes, Documents |
| **Sécurité** | Timing-safe comparison, anti-replay (30s window), cross-school rejected |

### Problèmes

| # | Problème | Sévérité |
|---|----------|----------|
| 1 | Format legacy `EDUCI:S:...` encore accepté | Faible |
| 2 | Pas de limite de régénération par utilisateur | Faible |
| 3 | Pas de rôle check sur `/api/pointage/qr` (tout utilisateur peut générer) | Haute |

---

## 10. AUDIT PAIEMENTS

### Architecture Money Fusion

| Composant | Status |
|-----------|--------|
| Provider Money Fusion | ✓ Présent (`lib/payments/providers/moneyfusion.ts`) |
| Orchestrateur | ✓ Présent (`lib/payments/orchestrator.ts`) |
| Registry | ✓ Présent (`lib/payments/registry.ts`) |
| Webhook handler | ✓ Présent mais **SANS vérification signature** |
| Gateway config (DB) | ✓ Chiffrement AES-GCM des credentials |
| Initiation paiement | ✓ API `/api/payments/initiate` |
| Confirmation webhook | ⚠️ `/api/payments/webhook/money-fusion` |

### Conformité "Money Fusion uniquement"

| Vérification | Status |
|--------------|--------|
| Stripe supprimé du code | ✓ (mais `stripe_subscription_id` en DB) |
| Flutterwave supprimé du code | ✓ (mais `flutterwave_id` en DB) |
| CinetPay absent | ✓ |
| Autres providers absents | ✓ |
| CSP autorise `pay.moneyfusion.net` | ✓ |

### Problèmes critiques

| # | Problème | Sévérité |
|---|----------|----------|
| 1 | **Webhook SANS vérification HMAC** — `webhook-verify.ts` existe mais n'est pas utilisé | CRITIQUE |
| 2 | Pas de role check sur `/api/payments/initiate` | Haute |
| 3 | Colonnes orphelines (flutterwave_id, stripe_subscription_id) | Faible |

---

## 11. AUDIT SÉCURITÉ

### Points forts

| Aspect | Implementation |
|--------|---------------|
| CSRF | ✓ Origin/Host validation sur toutes mutations API |
| Headers sécurité | ✓ CSP, X-Frame-Options DENY, HSTS, X-Content-Type-Options |
| Auth metadata distrust | ✓ Toujours DB, jamais user_metadata |
| Token hashing | ✓ HMAC-SHA256 avant stockage |
| Privilege escalation | ✓ Role hierarchy dans create-user |
| QR signature | ✓ HMAC-SHA256 + timing-safe |
| Password policy | ✓ Politique de force + brute-force lockout |
| Service role isolation | ✓ Jamais exposé côté client |

### Vulnérabilités identifiées

| # | Problème | Sévérité | Détail |
|---|----------|----------|--------|
| 1 | **Webhook Money Fusion non signé** | CRITIQUE | Spoofing possible si référence connue |
| 2 | **quiz_questions RLS ouvert** | CRITIQUE | `USING (true)` = zéro isolation |
| 3 | **9 tables RLS incompatible** (current_setting) | HAUTE | Pattern non supporté par l'app |
| 4 | **Pas de rate limiting** sur la majorité des API | HAUTE | DoS / brute-force possible |
| 5 | `web/.env` trackée dans git | HAUTE | Contient SUPABASE_URL publique (OK) mais mauvaise pratique |
| 6 | `mobile/.env.production` trackée dans git | HAUTE | Peut contenir secrets |
| 7 | 7 pages sans useAuth (superadmin, email-logs) | MOYENNE | Double protection middleware mais risque si bypass |
| 8 | `dangerouslySetInnerHTML` (1 usage) | MOYENNE | `OnboardingAssistant.tsx` — vérifier sanitization |
| 9 | `console.log` en production (1 fichier) | FAIBLE | `RealtimeManager.ts` |
| 10 | In-memory rate limit (upload-logo) | FAIBLE | Ne scale pas multi-instance |

### Fichiers .env trackés dans git

| Fichier | Risque |
|---------|--------|
| `web/.env` | Contient SUPABASE_URL + ANON_KEY (publiques) — risque faible |
| `mobile/.env.production` | À vérifier contenu — potentiellement dangereux |

---

## 12. AUDIT API

### Résumé sécurité par route

| Route | Auth | Validation | school_id | Role | Rate Limit |
|-------|:----:|:----------:|:---------:|:----:|:----------:|
| `GET /api/health` | ✗ | N/A | ✗ | ✗ | ✗ |
| `GET/PATCH /api/profile` | ✓ | ✓ | N/A | ✗ | ✗ |
| `GET/POST /api/students` | ✓ | Zod | ✓ | ✓ | ✗ |
| `GET/POST /api/attendance` | ✓ | Zod | ✓ | ✓ | ✗ |
| `GET/POST/PATCH /api/grades` | ✓ | Zod | ✓ | ✓ | ✗ |
| `GET/POST /api/payments` | ✓ | Zod | ✓ | ✓ | ✗ |
| `POST /api/payments/initiate` | ✓ | Partiel | ✓ | **✗** | ✗ |
| `POST /api/payments/webhook/money-fusion` | ✗ | Partiel | Implicite | N/A | ✗ |
| `GET/POST/PATCH /api/visitors` | ✓ | Zod | ✓ | ✓ | ✗ |
| `GET/POST /api/staff` | ✓ | Zod | ✓ | ✓ | ✗ |
| `POST /api/staff/invite` | ✓ | Manuel | ✓ | ✓ | ✗ |
| `POST /api/surveillance/scan` | ✓ | Zod | ✓ | ✓ | ✗ |
| `POST /api/pointage/scan` | ✓ | Zod | ✓ | **✗** | ✗ |
| `POST/GET /api/pointage/qr` | ✓ | Zod | ✓ | **✗** | ✗ |
| `GET /api/admin/stats` | ✓ | N/A | ✓ | ✓ | ✗ |
| `POST /api/admin/create-user` | ✓ | Manuel | ✓ | ✓ | ✗ |
| Auth routes (activate, verify...) | Mixte | ✓ | N/A | N/A | Partiel |
| Registration routes | Token | ✓ | N/A | N/A | Partiel |

### API sans rate limiting (risque DoS)

35/35 routes API n'ont pas de rate limiting côté application (sauf 4 auth routes avec rate limit DB).

---

## 13. AUDIT DÉPENDANCES

### Web — 16 dépendances production

| Package | Status |
|---------|--------|
| `@tanstack/react-query` | ⚠️ Installé mais quasi-inutilisé (seul Providers.tsx) |
| `bcryptjs` (devDep) | ⚠️ Aucun import trouvé — inutilisé |
| `xlsx` | ⚠️ Licence problématique pour usage commercial |
| Toutes les autres | ✓ Utilisées |

### Incohérences versions

| Package | Web | Mobile |
|---------|-----|--------|
| React | 18.3 | 19.2 |
| TypeScript | 5.4 | 5.9 |
| @types/react | 18.3 | 19.2 |

### Shared Types inutilisés

Le dossier `shared/types/index.ts` (552 lignes, 26 interfaces) n'est importé par aucun projet. Types dupliqués séparément dans web et mobile.

---

## 14. AUDIT PERFORMANCES

### Points d'attention

| Aspect | Status | Détail |
|--------|--------|--------|
| Lazy Loading | ✓ | `dynamic()` pour Recharts, Leaflet |
| Server Components | ⚠️ | Toutes les pages sont `'use client'` |
| Bundle splitting | ✓ | Next.js automatic code splitting |
| Images optimisées | ⚠️ | Pas d'usage systématique de `next/image` |
| Pagination | Partiel | Présent sur certaines listes |
| Virtualisation | ✗ | Pas de virtualisation pour grandes listes |
| Output standalone | ✓ | `next.config.js` configuré |
| Compression | ✓ | `compress: true` |

### Pages lourdes (>1000 lignes = logique client excessive)

22 pages dépassent 500 lignes. La plus lourde (`grades/page.tsx`) fait 1685 lignes — tout est côté client avec logique métier, états, et UI mélangés.

---

## 15. AUDIT TESTS

### Couverture actuelle

| Type | Fichiers | Couverture estimée |
|------|----------|-------------------|
| Unitaires (Vitest) | 10 | ~5% du code |
| Intégration | 3 | ~2% des flux |
| E2E (Playwright) | 3 | ~3% des parcours |
| **Total** | **16** | **< 10%** |

### Tests existants

**Unitaires :** api-clients, mappers, email, domains, UI composants, utils, reexports
**Intégration :** auth flow, platform, registration flow
**E2E :** auth, landing, navigation

### Modules sans aucun test

- Paiements (aucun test du flux Money Fusion)
- QR Code / Pointage
- Bulletins / Notes
- Transport
- Cantine / Bibliothèque / Infirmerie
- Dashboard
- Mobile (aucun test Detox)

---

## 16. AUDIT UX/UI

### Points forts

| Aspect | Status |
|--------|--------|
| Design system | ✓ TailwindCSS cohérent |
| Animations | ✓ Framer Motion |
| Icônes | ✓ Lucide React |
| Responsive | ✓ Mobile-first |
| Dark Mode | ✗ Non implémenté |
| Skeleton loading | ✓ Composant existant |
| Empty states | ✓ Composant existant |
| Error states | ✓ ErrorBoundary + route errors |
| Toasts | ✓ Pattern existant |

### Problèmes UX

| # | Problème | Sévérité |
|---|----------|----------|
| 1 | Pas de Dark Mode malgré la convention | Moyenne |
| 2 | Pas d'accessibilité WCAG AA systématique | Moyenne |
| 3 | Pages trop longues (scroll infini sans virtualisation) | Faible |
| 4 | Formulaires très longs sans sauvegarde intermédiaire | Faible |

---

## 17. AUDIT MOBILE

### Status : Application COMPLÈTE (production-ready)

| Aspect | Status |
|--------|--------|
| 58 écrans | ✓ Tous les rôles couverts |
| Offline | ✓ offlineQueue, cacheManager, networkManager |
| Push notifications | ✓ expo-notifications |
| QR Scanner | ✓ expo-camera |
| GPS check-in | ✓ expo-location |
| Secure storage | ✓ expo-secure-store |
| Deep linking | ✓ 40+ routes mappées |
| OTA Updates | ✓ expo-updates |
| Realtime | ✓ RealtimeManager |
| Haptics | ✓ expo-haptics |
| Role-based nav | ✓ 7 navigateurs par rôle |

### Problèmes

| # | Problème | Sévérité |
|---|----------|----------|
| 1 | React 19 (mobile) vs React 18 (web) — risque incompatibilité shared | Moyenne |
| 2 | Aucun test (Detox/Jest) | Haute |
| 3 | shared/types non importés (duplication) | Moyenne |
| 4 | Pas de biométrie (Face ID / fingerprint) | Faible |

---

## 18. RAPPORT FINAL — SCORES

### Score Global de Qualité : **62/100**

| Dimension | Score | Détail |
|-----------|:-----:|--------|
| **Sécurité** | 55/100 | Webhook non signé, RLS critique ouvert, pas de rate limit global |
| **Performance** | 68/100 | Pas de Server Components, pages trop lourdes, pas de virtualisation |
| **Maintenabilité** | 52/100 | 22 pages >500 lignes, types `any`, architecture page monolithique |
| **Multi-tenant** | 72/100 | 3 tables sans isolation, incohérence RLS pattern |
| **Tests** | 15/100 | <10% couverture, 0 tests mobile |
| **UX/UI** | 75/100 | Design cohérent mais pas de Dark Mode, pas WCAG AA |
| **Architecture** | 65/100 | Pattern Page→Hook→Service respecté partiellement, trop de logique dans pages |
| **Préparation production** | 58/100 | CI/CD OK, monitoring OK, mais tests et sécurité insuffisants |

---

## 19. ERREURS PAR PRIORITÉ

### CRITIQUES (à corriger immédiatement)

| # | Erreur | Impact |
|---|--------|--------|
| C1 | Webhook Money Fusion sans vérification HMAC | Fraude financière possible |
| C2 | `quiz_questions` RLS `USING (true)` | Fuite de données inter-écoles |
| C3 | 9 tables (migration 20260718) RLS incompatible | Données inaccessibles OU non isolées |

### HAUTES (à corriger avant production)

| # | Erreur | Impact |
|---|--------|--------|
| H1 | Pas de rate limiting global sur API | DoS, brute-force |
| H2 | `exam_categories` sans school_id | Isolation manquante |
| H3 | Pas de role check sur `/api/pointage/qr` | Génération QR non autorisée |
| H4 | Pas de role check sur `/api/payments/initiate` | Paiement non autorisé |
| H5 | Table `permissions` non utilisée dans le code | RBAC incomplet |
| H6 | `mobile/.env.production` dans git | Secrets potentiellement exposés |
| H7 | Couverture tests < 10% | Régressions non détectées |
| H8 | `web/.env` dans git (même si public) | Mauvaise hygiène |

### MOYENNES (à planifier)

| # | Erreur | Impact |
|---|--------|--------|
| M1 | 22 pages > 500 lignes | Maintenabilité |
| M2 | 11 composants > 300 lignes | Maintenabilité |
| M3 | `@tanstack/react-query` inutilisé | Bundle size |
| M4 | shared/types non partagés | Duplication, drift |
| M5 | Toutes pages en `use client` | Performance SSR |
| M6 | Pas de Dark Mode | UX |
| M7 | Routes auth dupliquées | Confusion |
| M8 | React 18 vs 19 web/mobile | Risque compatibilité |
| M9 | Pas de rôles BIBLIOTHECAIRE/INFIRMIER dans middleware | Accès incomplet |
| M10 | `dangerouslySetInnerHTML` sans sanitization vérifiée | XSS potentiel |

### FAIBLES (dette technique acceptable)

| # | Erreur | Impact |
|---|--------|--------|
| F1 | Colonnes orphelines (flutterwave_id, stripe_subscription_id) | Bruit DB |
| F2 | `bcryptjs` inutilisé | Dépendance morte |
| F3 | 1 console.log en production | Log bruit |
| F4 | Format QR legacy encore accepté | Transition inachevée |
| F5 | In-memory rate limit (upload-logo) | Ne scale pas |
| F6 | `registration_drafts` v1 encore présent | Table morte |
| F7 | `xlsx` licence commerciale | Risque légal mineur |
| F8 | Tables exam_categories, teacher_badges, room_assignments sans UI | Code mort potentiel |

---

## 20. DETTE TECHNIQUE

| Catégorie | Estimation |
|-----------|-----------|
| Pages monolithiques à refactorer | 22 pages |
| Composants à découper | 11 composants |
| Tests à écrire | ~200 tests minimum |
| RLS à corriger | 12 tables |
| Rate limiting à implémenter | 30+ routes |
| Types `any` à résoudre | `api/index.ts` + nombreux callbacks |
| Server Components à migrer | 146 pages (toutes en client) |
| Rôles manquants middleware | 3 rôles |

---

## 21. FEUILLE DE ROUTE CORRECTIONS

### Phase 1 — Sécurité critique (Semaine 1)

1. Implémenter vérification HMAC webhook Money Fusion
2. Corriger RLS `quiz_questions` (ajouter school_id)
3. Migrer RLS des 9 tables (current_setting → get_user_school_id)
4. Ajouter role check sur `/api/pointage/qr` et `/api/payments/initiate`
5. Retirer `.env` files du tracking git

### Phase 2 — Sécurité haute (Semaine 2)

6. Implémenter rate limiting global (middleware ou Edge Function)
7. Ajouter school_id sur `exam_categories`
8. Ajouter useAuth dans les 7 pages superadmin
9. Utiliser table `permissions` pour RBAC dynamique
10. Audit `mobile/.env.production` et nettoyage

### Phase 3 — Qualité (Semaines 3-4)

11. Écrire tests critiques (paiements, auth, QR, multi-tenant)
12. Refactorer les 5 plus grosses pages (grades, classes, payments, students, attendance)
13. Supprimer dépendances inutilisées
14. Unifier shared/types entre web et mobile

### Phase 4 — Performance (Semaine 5)

15. Migrer pages appropriées vers Server Components
16. Implémenter virtualisation pour grandes listes
17. Dark Mode
18. Accessibilité WCAG AA

### Phase 5 — Nettoyage (Semaine 6)

19. Supprimer routes mortes/dupliquées
20. Supprimer colonnes orphelines
21. Nettoyer tables mortes
22. Implémenter rôles manquants (BIBLIOTHECAIRE, INFIRMIER)

---

*Ce document sert de référence pour toutes les phases suivantes. Aucune nouvelle fonctionnalité ne doit être développée tant que les erreurs CRITIQUES ne sont pas résolues.*
