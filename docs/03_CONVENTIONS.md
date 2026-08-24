# EduCI - Development Conventions

Version : 1.0.0

Document : 03_CONVENTIONS.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit les conventions de développement obligatoires pour l'ensemble de la plateforme EduCI.

Toutes les fonctionnalités, tous les composants, toutes les API, toutes les tables, tous les écrans et tous les services doivent respecter ces conventions.

Aucune exception sans validation technique.

---

# Convention Générale

Toujours privilégier :

• Lisibilité

• Cohérence

• Réutilisabilité

• Simplicité

• Sécurité

• Performance

• Évolutivité

---

# Convention de Langage

Le code est écrit en anglais.

Les interfaces utilisateur sont traduites.

Exemple

StudentService.ts

et non

ServiceEleve.ts

---

# Convention des Dossiers

Toujours respecter :

src/

app/

components/

modules/

hooks/

services/

types/

validators/

utils/

providers/

contexts/

lib/

constants/

assets/

styles/

tests/

Ne jamais créer de dossiers inutiles.

---

# Convention des Modules

Chaque module possède exactement la même structure.

Exemple :

students/

components/

hooks/

services/

types/

validators/

utils/

pages/

tests/

Le générateur ne doit jamais mélanger plusieurs modules.

---

# Convention des Composants React

Nom :

PascalCase

Exemple

StudentCard.tsx

AttendanceTable.tsx

PaymentDialog.tsx

Chaque composant :

Une seule responsabilité.

Maximum recommandé :

300 lignes.

Au-delà :

Découper.

---

# Convention des Hooks

Toujours commencer par :

use

Exemple

useStudents()

usePayments()

useAttendance()

Un hook ne doit jamais contenir d'affichage.

Uniquement de la logique.

---

# Convention des Services

Les appels API sont interdits dans les composants.

Toujours passer par :

services/

Exemple

studentService.ts

paymentService.ts

attendanceService.ts

---

# Convention des Types

Tous les modèles utilisent TypeScript.

Interdiction d'utiliser any sauf justification exceptionnelle.

Toujours créer :

interfaces

types

enums

clairs.

---

# Convention des Validators

Toutes les validations passent par Zod.

Aucune validation directement dans les composants.

---

# Convention des Formulaires

Tous les formulaires utilisent :

React Hook Form

+

Zod

Validation :

Frontend

Backend

Base de données

---

# Convention des Pages

Une page ne contient pas toute la logique.

Elle assemble :

Composants

Hooks

Services

Layout

---

# Convention Layout

Tous les écrans utilisent :

Layout principal

Header

Sidebar

Breadcrumb

Footer (si nécessaire)

Jamais de duplication.

---

# Convention des Boutons

Chaque bouton doit gérer :

Loading

Disabled

Erreur

Succès

Confirmation si action critique

Retour visuel

---

# Convention des Tables

Toutes les tables doivent proposer :

Recherche

Tri

Pagination

Filtres

Export

Responsive

État vide

Chargement

---

# Convention des Modales

Toutes les modales doivent :

Pouvoir être fermées

Supporter ESC

Être accessibles

Être responsives

Bloquer les doubles clics

---

# Convention des Notifications

Centralisées.

Utiliser le même composant.

Types :

Success

Error

Warning

Info

---

# Convention des Couleurs

Toujours utiliser les variables de thème.

Jamais de couleurs codées en dur.

---

# Convention Responsive

Desktop

Laptop

Tablette

Mobile

Aucun débordement.

Aucun scroll horizontal.

---

# Convention Mobile

Navigation fluide.

Zones tactiles minimum 44 px.

Animations légères.

Compatible Android et iPhone.

---

# Convention API

Toutes les routes :

Authentification

Validation

Permissions

Logs

Gestion erreurs

Réponse uniforme

---

# Format Réponse API

Toujours :

success

message

data

meta

errors

timestamp

requestId

Jamais de réponse incohérente.

---

# Convention Erreurs

Toujours retourner :

Code

Message

Cause

Solution

Log

---

# Convention Base de Données

Toutes les tables possèdent :

id UUID

created_at

updated_at

created_by (si pertinent)

school_id (si pertinent)

deleted_at (si soft delete)

---

# Convention Multi-Tenant

Toutes les requêtes métier filtrent :

school_id

Aucune exception.

---

# Convention QR Code

Toujours :

UUID

Version

Date

Signature

Historique

Jamais de données sensibles dans le QR.

---

# Convention Money Fusion

Une seule passerelle.

Configuration propre à chaque établissement.

Validation obligatoire avant activation.

Historique complet.

---

# Convention Auth

Toujours vérifier :

Session

Utilisateur

Permissions

Établissement

Statut du compte

Avant toute action.

---

# Convention Sécurité

Validation côté client.

Validation côté serveur.

Validation SQL.

Aucune confiance au frontend.

---

# Convention Storage

Tous les fichiers :

Nom unique

Permissions

Quota

Type MIME vérifié

Taille maximale contrôlée

---

# Convention Emails

Templates centralisés.

Variables dynamiques.

Versionnés.

Historique.

---

# Convention Logs

Toutes les actions critiques sont journalisées.

Connexion

Déconnexion

Création

Modification

Suppression

Paiement

QR

Présence

Erreur

---

# Convention Performance

Toujours utiliser :

Lazy Loading

Memoization

Pagination

Dynamic Import

Optimisation Images

Cache

---

# Convention Accessibilité

Navigation clavier.

ARIA Labels.

Contraste.

Focus visible.

Lecteurs d'écran compatibles.

---

# Convention Git

Une fonctionnalité = un commit.

Messages :

feat:

fix:

refactor:

docs:

test:

perf:

chore:

---

# Convention Branches

main

develop

feature/

hotfix/

release/

Jamais de développement direct sur main.

---

# Convention Documentation

Chaque nouveau module met à jour :

Architecture

API

Base

README

Roadmap

Tests

---

# Convention Tests

Obligatoires :

Tests Unitaires

Tests Intégration

Tests E2E

Tests Responsive

Tests Mobile

Tests API

Tests Sécurité

---

# Convention Audit

Avant toute validation :

✓ Build OK

✓ Lint OK

✓ TypeScript OK

✓ Tests OK

✓ Responsive OK

✓ Permissions OK

✓ Logs OK

✓ API OK

✓ Mobile OK

✓ QR OK

✓ Money Fusion OK

✓ Production Ready

---

# Règle d'Or

Le générateur de code doit toujours agir comme un ingénieur logiciel Senior travaillant sur une plateforme SaaS Enterprise.

Chaque ligne de code doit être pensée pour plusieurs années d'évolution.

La qualité prime toujours sur la rapidité.

Aucune dette technique volontaire ne doit être introduite.

Ce document est obligatoire pour tous les développements présents et futurs de la plateforme EduCI.