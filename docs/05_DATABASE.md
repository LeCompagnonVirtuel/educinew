# EduCI - Database Architecture

Version : 1.0.0

Document : 05_DATABASE.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit l'architecture officielle de la base de données EduCI.

Toutes les tables, relations, migrations, contraintes, politiques de sécurité (RLS), index, fonctions SQL et optimisations doivent respecter ce document.

La base de données est le cœur de la plateforme. Toute évolution doit préserver la cohérence, les performances et l'isolation des données entre établissements.

---

# Moteur de Base de Données

SGBD

PostgreSQL (Supabase)

Extensions autorisées

UUID

pgcrypto

pg_trgm

PostGIS (option)

Supabase Realtime

Supabase Storage

---

# Architecture Générale

La base est organisée par domaines métiers.

Authentification

↓

Établissements

↓

Utilisateurs

↓

Académique

↓

Présences

↓

QR Codes

↓

Paiements

↓

Transport

↓

Communication

↓

Bibliothèque

↓

Documents

↓

Administration

↓

Logs

Chaque domaine est indépendant mais relié par des clés étrangères.

---

# Principe Multi-Tenant

EduCI est une plateforme SaaS Multi-Tenant.

Chaque établissement possède son propre espace logique.

Toutes les tables métier doivent contenir :

school_id UUID NOT NULL

Exception :

tables de référence globales (pays, régions, villes, matières de référence, langues, devises, etc.).

Aucune donnée métier ne doit être accessible entre deux établissements.

---

# Identifiants

Toutes les tables utilisent :

id UUID PRIMARY KEY

Jamais d'identifiant auto-incrémenté.

---

# Colonnes Standard

Chaque table métier contient au minimum :

id

created_at

updated_at

created_by

updated_by

school_id

status

deleted_at (soft delete lorsque pertinent)

---

# Règles de Nommage

Tables :

snake_case

Exemple

students

teachers

payments

attendance_records

Colonnes :

snake_case

Jamais de CamelCase.

---

# Relations

Utiliser uniquement :

Foreign Keys

ON UPDATE CASCADE

ON DELETE RESTRICT

ou

ON DELETE SET NULL

selon le besoin métier.

Jamais de suppression en cascade sans justification.

---

# Domaines de Données

Le schéma est organisé autour des domaines suivants :

01_auth

02_schools

03_users

04_students

05_parents

06_teachers

07_staff

08_classes

09_subjects

10_academic

11_grades

12_report_cards

13_attendance

14_qr_codes

15_transport

16_payments

17_library

18_documents

19_notifications

20_logs

---

# Gestion des Établissements

Chaque établissement possède :

UUID

Code établissement

Nom

Logo

Adresse

Ville

Pays

Devise

Fuseau horaire

Configuration

Année scolaire active

Configuration Money Fusion

Statut

---

# Utilisateurs

Chaque utilisateur possède :

UUID

Photo

Nom

Prénom

Email

Téléphone

QR Code

Profil

Permissions

Historique

Dernière connexion

Statut

---

# Élèves

Chaque élève possède :

Matricule (ex. 16137807D)

Classe

Niveau

Parent(s)

Photo

QR Code

Historique

Présences

Notes

Paiements

Documents

---

# Enseignants

Chaque enseignant possède :

Matricule

Spécialité

Matières

Classes

QR

Présences

Emploi du temps

Historique

---

# Parents

Chaque parent possède :

Coordonnées

Enfants associés

Historique des paiements

Historique des échanges

QR

---

# QR Codes

Une table dédiée.

Chaque QR contient :

UUID

Utilisateur

Type

Date de génération

Version

Signature

Statut

Historique

Jamais de données personnelles dans le QR.

---

# Présences

Tables séparées :

Présence Élèves

Présence Enseignants

Présence Personnel

Chaque enregistrement contient :

Date

Heure

Mode (QR, manuel, caméra)

Utilisateur

Établissement

Auteur du pointage

---

# Paiements

Money Fusion uniquement.

La base enregistre :

Référence Money Fusion

Transaction

Montant

Devise

Statut

Facture

Reçu

Historique

Jamais les données bancaires sensibles.

---

# Documents

Tous les documents possèdent :

UUID

Auteur

Version

Type

Stockage

Permissions

Historique

Signature numérique (si applicable)

---

# Notifications

Chaque notification contient :

Destinataire

Canal

Message

Type

Date

Statut

Historique de lecture

---

# Logs

Toutes les actions critiques sont enregistrées :

Connexion

Déconnexion

Création

Modification

Suppression

Paiement

Scan QR

Pointage

Erreur

Configuration

Chaque log contient :

Utilisateur

Établissement

Adresse IP

Appareil

Navigateur

Date

Action

Résultat

---

# Index

Créer des index sur :

school_id

user_id

student_id

teacher_id

parent_id

payment_reference

matricule

created_at

updated_at

email

status

Optimiser les recherches fréquentes.

---

# Contraintes

Toutes les données critiques possèdent :

NOT NULL

UNIQUE

CHECK

FOREIGN KEY

DEFAULT

Aucune donnée incohérente ne doit être insérée.

---

# Row Level Security (RLS)

Toutes les tables métier utilisent RLS.

Chaque policy vérifie :

Authentification

Rôle

school_id

Permissions

Les ressources globales utilisent des policies de lecture adaptées.

---

# Migrations

Toutes les modifications passent par des migrations versionnées.

Jamais de modification directe en production.

Chaque migration doit être réversible.

---

# Sauvegardes

Prévoir :

Sauvegardes automatiques

Snapshots

Restauration rapide

Historique

Tests de restauration

---

# Performance

Objectifs :

Requêtes optimisées

Index adaptés

Pas de SELECT *

Pagination obligatoire

Jointures maîtrisées

Temps de réponse inférieur à 200 ms pour les requêtes courantes.

---

# Sécurité

Validation des données

Protection contre les injections SQL

RLS obligatoire

Journalisation

Chiffrement des secrets

Suppression logique lorsque nécessaire

---

# Évolutivité

La structure doit permettre d'ajouter :

Nouveaux modules

Nouveaux rôles

Nouveaux pays

Nouvelles fonctionnalités

Sans casser les relations existantes.

---

# Documentation

Toute nouvelle table doit être documentée avec :

Objectif

Colonnes

Relations

Contraintes

Policies

Index

Cas d'utilisation

---

# Validation

Une modification de la base est validée uniquement si :

✓ Migration créée

✓ Migration testée

✓ RLS vérifiées

✓ Contraintes vérifiées

✓ Index optimisés

✓ Documentation mise à jour

✓ Compatible Multi-Tenant

✓ Compatible Production

---

# Règle Finale

La base de données EduCI est un actif critique.

Toute évolution doit privilégier :

la cohérence,

la sécurité,

les performances,

la maintenabilité,

et l'évolutivité.

Aucune modification ne doit compromettre l'intégrité des données des établissements.