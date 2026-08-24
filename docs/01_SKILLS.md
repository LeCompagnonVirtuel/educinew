# SKILLS.md

# EduCI Production Enterprise Development Rules

Version : 1.0.0

Ce document définit les règles obligatoires que tout générateur de code doit respecter pendant le développement de la plateforme EduCI.

Ces règles sont prioritaires sur toutes les autres.

Aucune fonctionnalité ne doit être développée sans respecter ce document.

---

# Vision

EduCI est une plateforme ERP SaaS de gestion scolaire Enterprise destinée aux établissements africains.

Le niveau attendu est comparable à :

- Google Workspace
- Microsoft 365
- PowerSchool
- Blackboard
- Canvas LMS
- Pronote
- Moodle Enterprise

La plateforme doit être :

• Moderne

• Stable

• Evolutive

• Sécurisée

• Multi-tenant

• Responsive

• Mobile First

• Cloud Native

---

# Objectif

Chaque développement doit être :

100 % Production Ready.

Pas de démonstration.

Pas de faux composants.

Pas de mock inutiles.

Pas de code temporaire.

---

# Règle n°1

Ne jamais casser une fonctionnalité existante.

Toute modification doit être rétrocompatible.

---

# Règle n°2

Toujours rechercher si une fonctionnalité existe déjà avant d'en créer une nouvelle.

Ne jamais créer de doublons.

---

# Règle n°3

Toujours réutiliser les composants existants lorsque c'est pertinent.

---

# Règle n°4

Chaque nouveau module doit être synchronisé avec :

Frontend Web

Application Mobile

Backend

Supabase

Permissions

Logs

Notifications

Temps réel

---

# Architecture

Toujours respecter l'architecture modulaire.

Exemple

/modules

/auth

/students

/teachers

/payments

/qrcode

/dashboard

/settings

etc.

Ne jamais créer des fichiers géants.

---

# Taille maximale

Composant React

300 lignes maximum.

Fonctions

60 lignes maximum.

Un fichier = une responsabilité.

---

# Base de données

Toute table doit :

avoir une clé primaire UUID ;

avoir created_at et updated_at ;

être liée à school_id (si applicable) ;

respecter les politiques RLS ;

être indexée si nécessaire.

---

# Multi-tenant

Toutes les données métier doivent appartenir à un établissement.

Aucune donnée ne doit être visible entre deux établissements.

Toutes les requêtes doivent filtrer par school_id, sauf pour les ressources globales (ex. liste des pays, villes, matières de référence).

---

# Authentification

Utiliser Supabase Auth.

Jamais de système parallèle.

Toujours vérifier :

session

permissions

rôle

établissement

avant toute action.

---

# Gestion des rôles

Tous les rôles utilisent le même moteur RBAC.

Ne jamais coder des permissions en dur.

Toujours passer par :

roles

permissions

policies

middleware

---

# Utilisateurs

Les comptes suivants existent :

Super Admin EduCI

Administrateur établissement

Directeur

Secrétaire

Comptable

Enseignant

Surveillant

Parent

Élève

Conducteur

Bibliothécaire

Infirmier

Personnel

Chaque rôle possède :

profil

permissions

QR

photo

historique

journal

---

# QR Code

Chaque utilisateur possède un QR unique.

Jamais de duplication.

Jamais de QR statique.

Le QR doit être régénérable.

---

# Paiements

La plateforme utilise uniquement :

Money Fusion

Aucune autre passerelle.

Chaque établissement possède sa propre configuration.

EduCI ne reçoit jamais les paiements.

---

# Mobile

Le mobile est destiné uniquement à :

Élèves

Parents

Enseignants

Personnel

Conducteurs

L'Administrateur utilise exclusivement l'interface Web.

---

# Responsive

Toutes les pages doivent fonctionner sur :

Android

iPhone

Tablettes

Desktop

Laptop

Ultra Wide

Sans débordement.

---

# UX

Chaque page doit toujours contenir :

Loading

Empty State

Erreur

Succès

Retry

Skeleton

Animations fluides

Transitions

---

# Formulaires

Tous les formulaires doivent :

valider les données ;

afficher les erreurs ;

empêcher les doublons ;

être accessibles ;

être compatibles clavier.

---

# Sécurité

Toujours protéger :

API

Routes

Actions

Uploads

Storage

Permissions

JWT

Sessions

Cookies

Headers

Rate Limit

---

# Logs

Chaque action importante doit être enregistrée :

connexion

déconnexion

création

modification

suppression

paiement

scan QR

pointage

erreur

---

# Performances

Toujours utiliser :

Lazy Loading

Dynamic Import

Pagination

Virtualisation

Optimisation des images

Cache

Memoization

---

# API

Toutes les API doivent :

être validées ;

être documentées ;

retourner des erreurs normalisées ;

être sécurisées.

---

# TypeScript

Interdiction du type any sauf justification exceptionnelle.

Créer des interfaces claires.

---

# Qualité du code

Code lisible.

Commentaires uniquement lorsque nécessaires.

Pas de duplication.

Respect du principe SOLID.

Respect du principe DRY.

Respect du principe KISS.

---

# Git

Un commit = une fonctionnalité.

Messages explicites.

---

# Tests

Avant toute validation :

Lint

Type Check

Tests Unitaires

Tests d'intégration

Tests E2E

Responsive

Permissions

Mobile

---

# Audit

Avant de clôturer une tâche :

Vérifier :

✓ aucun bug

✓ aucune régression

✓ aucune erreur console

✓ aucune erreur réseau

✓ responsive OK

✓ mobile OK

✓ permissions OK

✓ backend OK

✓ base OK

✓ API OK

✓ QR OK

✓ paiement OK

---

# Documentation

Chaque nouveau module doit mettre à jour :

README

Architecture

API

Base de données

Flux métier

---

# Règle finale

Le générateur doit toujours agir comme le CTO d'EduCI.

En cas de doute :

Choisir la solution la plus robuste,

la plus sécurisée,

la plus évolutive,

la plus maintenable,

et la plus adaptée à un environnement SaaS Enterprise utilisé par plusieurs milliers d'établissements scolaires.

Ne jamais privilégier une solution rapide au détriment de la qualité.