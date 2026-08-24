# EduCI - API Specification

Version : 1.0.0

Document : 06_API_SPECIFICATION.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit les standards de toutes les API d'EduCI.

Toutes les API doivent respecter cette spécification.

Aucune exception.

---

# Philosophie

Les API EduCI doivent être :

RESTful

Prévisibles

Versionnées

Sécurisées

Documentées

Testables

Rapides

Scalables

---

# Architecture API

Client Web

↓

Client Mobile

↓

API Gateway

↓

Middleware

↓

Validation

↓

Permissions

↓

Business Logic

↓

Repository

↓

Supabase

↓

Response

---

# Versionnement

Toutes les API utilisent :

/api/v1/

Exemple

/api/v1/auth/login

/api/v1/students

/api/v1/payments

Jamais d'API sans version.

---

# Ressources

Toutes les ressources utilisent :

GET

POST

PUT

PATCH

DELETE

Jamais de verbes dans les URL.

Correct :

/students

Incorrect :

/createStudent

---

# Structure des Routes

/auth

/schools

/users

/students

/parents

/teachers

/classes

/subjects

/grades

/report-cards

/attendance

/qrcodes

/payments

/transport

/messages

/documents

/settings

/dashboard

/logs

/notifications

---

# Authentification

Toutes les routes privées exigent :

JWT Supabase

Session valide

Utilisateur actif

Établissement actif

Permissions valides

---

# Middleware

Toutes les routes passent obligatoirement par :

Authentication

↓

School Validation

↓

Permission Validation

↓

Rate Limiting

↓

Logging

↓

Business Logic

↓

Response Formatter

---

# Format des Réponses

Toutes les réponses utilisent exactement ce format :

success

message

data

meta

errors

timestamp

requestId

apiVersion

Jamais de format différent.

---

# Pagination

Toutes les listes utilisent :

page

limit

total

pages

next

previous

---

# Recherche

Toutes les API de liste doivent supporter :

search

sort

order

filters

pagination

---

# Codes HTTP

200

Succès

201

Création

204

Suppression

400

Erreur utilisateur

401

Non authentifié

403

Accès refusé

404

Introuvable

409

Conflit

422

Validation

429

Trop de requêtes

500

Erreur serveur

---

# Validation

Toutes les requêtes sont validées avec :

Zod

Aucune donnée ne doit atteindre la logique métier sans validation.

---

# Erreurs

Toutes les erreurs retournent :

code

message

details

field

timestamp

requestId

documentation

---

# API Auth

Connexion

Déconnexion

Inscription

Activation Email

Réinitialisation Mot de passe

Renouvellement Session

Profil

---

# API Établissements

Création

Modification

Configuration

Logo

Documents

Money Fusion

Statistiques

---

# API Utilisateurs

CRUD

Recherche

Activation

Désactivation

Permissions

Historique

Photo

QR Code

---

# API Élèves

CRUD

Import Excel

Export

QR

Présences

Bulletins

Notes

Paiements

Historique

---

# API Enseignants

CRUD

QR

Présences

Matières

Classes

Emploi du temps

Historique

---

# API Parents

CRUD

Enfants

Paiements

Messages

QR

Historique

---

# API Présences

Scan QR

Validation

Correction

Historique

Statistiques

Temps réel

---

# API QR Code

Génération

Régénération

Validation

Historique

Désactivation

---

# API Paiements

Money Fusion uniquement.

Endpoints :

Configuration

Création paiement

Webhook

Confirmation

Historique

Factures

Reçus

Remboursement (si autorisé)

---

# API Dashboard

Statistiques

KPIs

Graphiques

Présences

Paiements

Messages

Activités

Temps réel

---

# API Notifications

Lecture

Suppression

Préférences

Historique

Push

Email

---

# API Transport

Bus

Conducteurs

GPS

Trajets

Pointages

Historique

---

# API Documents

Upload

Téléchargement

Suppression

Versions

Permissions

Signature

---

# API Logs

Audit

Connexions

Actions

Paiements

QR

Présences

Historique

---

# API Administration

Utilisateurs

Rôles

Permissions

Sauvegardes

Configuration

Maintenance

---

# Money Fusion

Une seule intégration officielle.

Toutes les transactions utilisent :

Webhook sécurisé

Signature

Validation serveur

Historique

Journal

Aucune validation côté client.

---

# Webhooks

Money Fusion

Email

Notifications

Temps réel

Tous les Webhooks :

Authentifiés

Journalisés

Rejouables

Idempotents

---

# Rate Limiting

Toutes les API sont protégées.

Limiter :

Connexion

OTP

Paiements

Création comptes

Imports

Uploads

---

# Uploads

Contrôler :

Type MIME

Taille

Virus (prévoir)

Permissions

Quota

---

# Sécurité

HTTPS obligatoire.

JWT obligatoire.

Headers sécurisés.

CSRF si nécessaire.

Validation Zod.

Permissions.

RLS.

---

# Documentation

Toutes les API doivent être documentées avec :

Description

Paramètres

Réponses

Erreurs

Exemples

Permissions

Cas d'utilisation

---

# Performance

Objectifs :

Temps moyen < 200 ms

Pagination

Cache

Compression

Optimisation SQL

Pas de SELECT *

---

# Journalisation

Toutes les requêtes critiques enregistrent :

Utilisateur

Établissement

IP

Device

Navigateur

Durée

Résultat

Erreur éventuelle

---

# Version Future

Les futures versions :

v2

v3

v4

ne devront jamais casser les API existantes.

Compatibilité descendante obligatoire.

---

# Tests

Chaque endpoint possède :

Test Unitaire

Test Intégration

Test Sécurité

Test Charge

Test Permissions

Test Multi-Tenant

---

# Définition de Production Ready

Une API est prête uniquement si :

✓ Authentifiée

✓ Validée

✓ Documentée

✓ Testée

✓ Journalisée

✓ Sécurisée

✓ Compatible Multi-Tenant

✓ Compatible Mobile

✓ Compatible Web

✓ Compatible Money Fusion (si concernée)

✓ Conforme aux performances attendues

---

# Règle Finale

Les API constituent le contrat officiel entre :

Frontend Web

Application Mobile

Backend

Supabase

Services externes

Toute modification doit préserver la stabilité des clients existants.

Aucune rupture de contrat n'est autorisée sans changement de version majeure.