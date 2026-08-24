# EduCI - Testing Guide

Version : 1.0.0

Document : 12_TESTING_GUIDE.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit la stratégie officielle de tests d'EduCI.

Aucune fonctionnalité ne peut être mise en production sans avoir passé avec succès les tests décrits dans ce document.

Les tests couvrent le Web, le Mobile, le Backend, la Base de données, les API, les paiements, les QR Codes et les intégrations externes.

---

# Philosophie

La qualité est une responsabilité collective.

Chaque fonctionnalité doit être :

• développée

↓

• testée

↓

• validée

↓

• documentée

↓

• déployée

Jamais l'inverse.

---

# Objectifs Qualité

Garantir :

• la stabilité

• la sécurité

• les performances

• la compatibilité

• la fiabilité

• la maintenabilité

---

# Pyramide des Tests

Tests Unitaires

↓

Tests d'Intégration

↓

Tests End-to-End

↓

Tests Manuels

↓

Tests de Production

---

# Couverture Minimale

Objectif global :

90 % minimum

Modules critiques :

95 % minimum

Paiements :

100 %

Authentification :

100 %

Permissions RBAC :

100 %

QR Codes :

100 %

Présences :

100 %

---

# Types de Tests

## 1. Tests Unitaires

Vérifier :

Fonctions

Hooks

Services

Utilitaires

Calculs

Business Rules

Validation Zod

Objectif :

Chaque fonction critique doit être testée indépendamment.

---

## 2. Tests d'Intégration

Vérifier :

Frontend ↔ API

API ↔ Backend

Backend ↔ Base de données

Backend ↔ Money Fusion

Backend ↔ Emails

Backend ↔ Notifications

---

## 3. Tests End-to-End (E2E)

Simuler un utilisateur réel.

Exemples :

Création d'un établissement

Invitation d'un enseignant

Activation via email

Connexion

Création d'un élève

Paiement de scolarité

Scan QR

Pointage

Consultation d'un bulletin

Déconnexion

---

## 4. Tests Multi-Tenant

Vérifier que :

Un établissement ne voit jamais les données d'un autre.

Tester :

API

Base

RLS

Exports

QR

Paiements

Notifications

---

## 5. Tests RBAC

Pour chaque rôle :

Super Admin

Administrateur

Directeur

Secrétaire

Comptable

Enseignant

Parent

Élève

Conducteur

Personnel

Vérifier :

Menus

Écrans

Boutons

API

Exports

Imports

Actions

---

## 6. Tests Mobile

Tester :

Android

iPhone

Tablettes

Orientation

Caméra

QR

GPS

Notifications

Connexion

Déconnexion

Synchronisation

Mode hors ligne

---

## 7. Tests Responsive

Vérifier les résolutions :

320 px

360 px

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

## 8. Tests API

Toutes les routes doivent être testées.

Vérifier :

Authentification

Permissions

Validation

Réponses

Codes HTTP

Temps de réponse

Pagination

Filtres

Recherche

---

## 9. Tests Base de Données

Vérifier :

Contraintes

Relations

RLS

Triggers

Fonctions SQL

Migrations

Index

Performances

---

## 10. Tests QR Codes

Créer automatiquement un QR lors de :

Création d'un élève

Création d'un parent

Création d'un enseignant

Création d'un conducteur

Création du personnel

Vérifier :

Lecture

Validation

Unicité

Historique

Régénération

Expiration (si applicable)

---

## 11. Tests Paiements

Money Fusion uniquement.

Tester :

Configuration API

Paiement réussi

Paiement refusé

Webhook

Double notification

Remboursement

Facture

Reçu PDF

Historique

---

## 12. Tests Authentification

Tester :

Inscription

Confirmation Email

Connexion

Déconnexion

Mot de passe oublié

Session expirée

Compte désactivé

Compte suspendu

---

## 13. Tests Sécurité

Tester :

Injection SQL

XSS

CSRF

JWT invalide

Permissions

Escalade de privilèges

Brute Force

Rate Limit

---

## 14. Tests Performance

Objectifs :

Chargement < 2 s

API < 200 ms

QR < 2 s

Paiement < 5 s

Dashboard < 2 s

---

## 15. Tests Notifications

Tester :

Push

Email

Temps réel

Historique

Lecture

Archivage

---

## 16. Tests Géolocalisation

Tester :

Conducteurs

Bus

Pointages GPS

Autorisations

Précision

Perte réseau

---

## 17. Tests Documents

Upload

Téléchargement

Suppression

Permissions

Historique

Versionnement

---

# Jeux de Données

Prévoir des données réalistes :

Établissements

Classes

Élèves

Parents

Enseignants

Personnel

Paiements

Bus

QR Codes

Documents

---

# Outils Recommandés

Tests Unitaires :

Vitest

Tests E2E :

Playwright

Tests API :

Postman

Newman

Tests Mobile :

Detox

Expo

Tests Performance :

Lighthouse

k6

---

# Régression

Avant chaque release :

Relancer :

Tous les tests unitaires

Tous les tests API

Tous les tests Mobile

Tous les tests Web

Tous les tests Paiements

Tous les tests QR

---

# Critères de Validation

Une fonctionnalité est validée uniquement si :

✓ Les tests unitaires réussissent

✓ Les tests d'intégration réussissent

✓ Les tests E2E réussissent

✓ Les tests Mobile réussissent

✓ Les tests Responsive réussissent

✓ Les tests de sécurité réussissent

✓ Les performances sont conformes

✓ La documentation est à jour

---

# Gestion des Bugs

Chaque bug doit comporter :

Identifiant

Description

Module

Priorité

Reproductibilité

Captures

Logs

Responsable

Statut

Date de correction

---

# Priorité des Bugs

P0

Bloquant

P1

Critique

P2

Majeur

P3

Mineur

P4

Cosmétique

Aucun bug P0 ou P1 n'est autorisé en production.

---

# Recette Fonctionnelle

Avant chaque mise en production :

Validation :

Technique

Fonctionnelle

Métier

Sécurité

Performance

UX/UI

---

# Checklist Finale

Avant le déploiement :

✓ Tous les tests réussissent

✓ Aucun bug critique

✓ Couverture minimale atteinte

✓ Paiements validés

✓ QR validés

✓ Emails validés

✓ Mobile validé

✓ Responsive validé

✓ Documentation mise à jour

✓ Audit terminé

---

# Vision Long Terme

Les tests doivent être automatisés autant que possible.

Chaque nouvelle fonctionnalité doit être accompagnée de ses propres scénarios de tests.

La plateforme doit viser une qualité de niveau Enterprise avec une intégration continue garantissant une détection précoce des régressions.

---

# Règle Finale

Aucune fonctionnalité ne peut être considérée comme terminée tant qu'elle n'a pas été testée conformément à ce guide.

Les tests sont une étape obligatoire du cycle de développement d'EduCI et constituent un prérequis à toute mise en production.