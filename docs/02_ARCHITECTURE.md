# EduCI - Architecture Technique Enterprise

Version : 1.0.0

Document : 02_ARCHITECTURE.md

Statut : Architecture Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit l'architecture officielle de la plateforme EduCI.

Aucun développement ne peut être réalisé sans respecter cette architecture.

Toute évolution future devra conserver cette structure.

---

# Vision Technique

EduCI est un ERP SaaS Enterprise Multi-Tenant.

Architecture :

Client

↓

API

↓

Services

↓

Base de données

↓

Stockage

↓

Notifications

↓

Temps Réel

Chaque couche est indépendante.

Chaque couche est testable.

Chaque couche est évolutive.

---

# Stack Technique

Frontend Web

Next.js 14+

TypeScript

TailwindCSS

Shadcn UI

React Hook Form

Zod

TanStack Query

Framer Motion

Lucide Icons

---

Application Mobile

React Native

Expo

Expo Router

TypeScript

React Query

Expo Camera

Expo Location

Expo Notifications

Expo Secure Store

---

Backend

Next.js API Routes

Supabase

PostgreSQL

Supabase Auth

Supabase Storage

Supabase Realtime

Edge Functions (si nécessaire)

---

Services externes

Money Fusion

Resend Email

OpenStreetMap

Leaflet

Firebase Push (option)

Cloudflare CDN

---

Architecture Générale

EduCI

├── Web

├── Mobile

├── Backend

├── Database

├── Storage

├── Documentation

├── Monitoring

└── CI/CD

---

Architecture Frontend

Le frontend est organisé par modules.

Exemple :

src/

app/

components/

modules/

hooks/

providers/

contexts/

services/

types/

utils/

lib/

assets/

styles/

---

Architecture des Modules

Chaque module possède :

pages

components

hooks

types

services

validators

utils

tests

Exemple :

modules/

students/

components/

hooks/

services/

types/

validators/

tests/

---

Principe

Chaque module doit être totalement indépendant.

Aucun module ne doit contenir la logique métier d'un autre.

---

Architecture Backend

Backend organisé par domaines.

Exemple :

api/

auth/

schools/

students/

teachers/

payments/

attendance/

reports/

notifications/

settings/

transport/

Chaque domaine possède :

routes

services

repositories

validators

middlewares

types

---

Architecture Base de Données

Organisation :

Authentification

↓

Etablissements

↓

Utilisateurs

↓

Académique

↓

Finances

↓

Transport

↓

Communication

↓

Logs

Toutes les tables métier sont reliées à :

school_id

---

Architecture Multi-Tenant

Chaque établissement constitue un tenant.

Isolation obligatoire.

Une école ne peut jamais accéder :

aux élèves

aux enseignants

aux paiements

aux QR

aux documents

d'une autre école.

Toutes les requêtes doivent appliquer le filtre school_id.

---

Architecture des Utilisateurs

Hiérarchie :

Super Admin EduCI

↓

Administrateur

↓

Direction

↓

Personnel

↓

Parents

↓

Élèves

Tous héritent :

Profil

Permissions

Historique

Notifications

QR

---

Architecture QR Code

Chaque utilisateur possède :

UUID

↓

QR sécurisé

↓

Signature

↓

Date

↓

Version

↓

Historique

Le QR ne contient jamais d'informations sensibles.

Il contient uniquement un identifiant sécurisé.

---

Architecture Pointage

Caméra

↓

Lecture QR

↓

Validation

↓

Contrôle Permissions

↓

Enregistrement

↓

Historique

↓

Statistiques

↓

Temps Réel

---

Architecture Paiement

Parent

↓

Money Fusion

↓

Validation Serveur

↓

Comptabilité

↓

Facture

↓

Notification

↓

Dashboard

EduCI ne conserve jamais les fonds.

Chaque établissement possède sa propre configuration Money Fusion.

---

Architecture Documents

Chaque document possède :

UUID

Version

Auteur

Établissement

Date

Historique

Permissions

QR de vérification

---

Architecture Notifications

Evènement

↓

Notification

↓

Email

↓

Push

↓

Temps Réel

↓

Historique

Toutes les notifications sont centralisées.

---

Architecture Emails

Tous les emails passent par un service unique.

Templates centralisés.

Variables dynamiques.

Historique.

Journal.

Gestion des erreurs.

---

Architecture Temps Réel

Realtime utilisé pour :

Messages

Présences

Paiements

Dashboard

Transport

Notifications

Pointages

Jamais pour des traitements lourds.

---

Architecture Storage

Buckets :

logos

avatars

documents

bulletins

signatures

photos

imports

exports

Chaque bucket possède :

Policies

Permissions

Quota

Historique

---

Architecture Mobile

Le mobile partage :

Services

Types

API

Validation

avec le Web.

Aucune logique métier ne doit être dupliquée.

---

Architecture Responsive

Toutes les interfaces doivent être compatibles :

320 px

375 px

390 px

414 px

768 px

1024 px

1280 px

1440 px

1920 px

2560 px

Aucun débordement.

---

Architecture API

Toutes les API respectent :

Validation Zod

Authentification

Permissions

Logs

Gestion erreurs

Réponse normalisée

Temps de réponse optimisé

---

Architecture Sécurité

Toutes les routes :

JWT

RBAC

RLS

Validation

Rate Limiting

Audit

HTTPS

Headers

---

Architecture Monitoring

Logs

Performance

Paiements

Emails

API

Supabase

Realtime

Storage

Erreurs

---

Architecture IA (Future)

Prévoir des modules IA :

Assistant pédagogique

Correction automatique

Analyse des résultats

Prévisions

Recommandations

Détection anomalies

sans modifier l'architecture actuelle.

---

Architecture des Dépendances

Un module ne peut dépendre que :

de ses composants ;

des services communs ;

des hooks communs ;

des utilitaires communs.

Jamais d'un autre module directement.

---

Architecture Tests

Chaque module possède :

Tests Unitaires

Tests Intégration

Tests E2E

Tests Responsive

Tests Mobile

Tests Permissions

Tests API

---

Architecture CI/CD

Chaque déploiement déclenche :

Lint

Type Check

Build

Tests

Audit

Optimisation

Déploiement

Monitoring

Rollback automatique en cas d'échec.

---

Principes SOLID

Tous les développements doivent respecter :

Single Responsibility

Open Closed

Liskov

Interface Segregation

Dependency Inversion

---

Principes DRY

Aucune duplication.

Toute logique commune doit être mutualisée.

---

Principes KISS

Toujours privilégier :

la simplicité,

la lisibilité,

la maintenabilité.

---

Architecture Long Terme

L'architecture doit permettre d'ajouter :

Nouveaux modules

Nouveaux pays

Nouvelles langues

Nouveaux services

Nouvelles API

Nouveaux partenaires

sans casser les modules existants.

---

Validation

Une fonctionnalité est conforme uniquement si :

✓ respecte cette architecture ;

✓ respecte le Multi-Tenant ;

✓ respecte les conventions ;

✓ est documentée ;

✓ est testée ;

✓ est responsive ;

✓ est sécurisée ;

✓ est synchronisée Web + Mobile ;

✓ est prête pour la production.

Ce document constitue la référence technique officielle d'EduCI.