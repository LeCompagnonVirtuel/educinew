# EduCI - Glossary

Version : 1.0.0

Document : 15_GLOSSARY.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document constitue le glossaire officiel de la plateforme EduCI.

Il définit tous les termes métier, techniques et fonctionnels utilisés dans la documentation et dans le code.

Toute nouvelle terminologie doit être ajoutée ici avant d'être utilisée dans la plateforme.

---

# A

## Academic Year

Année scolaire officielle d'un établissement.

Une seule année scolaire peut être active à un instant donné.

---

## Admin d'établissement

Utilisateur principal d'un établissement.

Dispose des droits d'administration complets uniquement sur son établissement.

---

## API

Application Programming Interface.

Ensemble des points d'accès permettant aux applications Web et Mobile de communiquer avec le Backend.

---

## API Key

Clé privée utilisée pour authentifier un service externe.

Exemple :

Money Fusion

Supabase

Service Email

---

## Audit Log

Historique de toutes les actions critiques réalisées dans la plateforme.

---

# B

## Backend

Serveur contenant toute la logique métier de la plateforme.

---

## Business Rule

Règle métier officielle décrivant le comportement attendu d'une fonctionnalité.

---

## Build

Compilation de l'application avant son déploiement.

---

## Bug

Comportement inattendu ou incorrect d'une fonctionnalité.

---

# C

## Classe

Regroupement pédagogique d'élèves.

---

## Conducteur

Utilisateur mobile chargé du transport scolaire.

Dispose d'un QR Code personnel et d'une géolocalisation temps réel.

---

## CI/CD

Continuous Integration / Continuous Deployment.

Pipeline automatisé de tests et de déploiement.

---

## Cache

Stockage temporaire des données afin d'améliorer les performances.

---

# D

## Dashboard

Tableau de bord principal adapté au rôle connecté.

---

## Database

Base de données principale d'EduCI.

---

## Déploiement

Publication d'une nouvelle version de la plateforme.

---

## Design System

Ensemble des règles officielles de conception UI/UX.

---

# E

## Élève

Utilisateur mobile inscrit dans un établissement.

Possède :

Matricule

QR Code

Profil

Notes

Bulletins

Présences

---

## Enseignant

Utilisateur pouvant gérer ses classes, saisir les notes et effectuer le pointage.

---

## Établissement

Organisation scolaire utilisant EduCI.

Chaque établissement est indépendant des autres.

---

# F

## Frontend

Interface utilisateur Web ou Mobile.

---

## Feature

Nouvelle fonctionnalité développée.

---

## Facture

Document généré automatiquement après un paiement validé.

---

# G

## Géolocalisation

Position GPS utilisée pour :

Transport

Pointage

Suivi des véhicules

---

## Git

Système de gestion de versions utilisé par le projet.

---

# H

## HTTPS

Protocole sécurisé utilisé pour toutes les communications.

---

## Historique

Liste chronologique des actions enregistrées.

---

# I

## Import

Ajout massif de données via un fichier (Excel, CSV, etc.).

---

## Invitation

Email envoyé à un utilisateur créé par l'administration afin qu'il active son compte.

---

## Incident

Événement disciplinaire ou technique enregistré dans la plateforme.

---

# J

## JWT

JSON Web Token.

Jeton sécurisé utilisé pour authentifier les utilisateurs.

---

# L

## Logs

Enregistrements techniques et fonctionnels des événements de la plateforme.

---

## Licence

Autorisation accordée à un établissement pour utiliser EduCI.

---

# M

## Matricule

Identifiant unique attribué à un utilisateur.

Exemple élève :

16137807D

---

## Money Fusion

Unique partenaire officiel de paiement d'EduCI.

Chaque établissement configure sa propre clé API Money Fusion.

---

## Migration

Modification versionnée de la base de données.

---

## Multi-Tenant

Architecture permettant à plusieurs établissements d'utiliser la même plateforme tout en isolant totalement leurs données.

---

# N

## Notification

Message envoyé à un utilisateur.

Types :

Push

Email

Système

---

# O

## Onboarding

Processus guidé de configuration après l'inscription d'un établissement.

---

## OTP

Code temporaire de validation.

Non utilisé dans la version officielle d'EduCI (validation par lien email).

---

# P

## Parent

Utilisateur mobile pouvant suivre ses enfants, consulter les bulletins et payer les frais de scolarité.

---

## Paiement

Transaction réalisée exclusivement via Money Fusion.

---

## Permission

Autorisation accordée à un rôle pour effectuer une action.

---

## Pointage

Enregistrement de présence d'un élève, enseignant ou membre du personnel.

---

## Production

Environnement utilisé par les utilisateurs réels.

---

# Q

## QR Code

Code unique généré automatiquement pour chaque utilisateur.

Utilisé pour :

Présences

Transport

Identification

---

# R

## RBAC

Role Based Access Control.

Gestion des permissions par rôle.

---

## RLS

Row Level Security.

Protection des données par ligne dans Supabase.

---

## Responsive

Capacité d'une interface à s'adapter à toutes les tailles d'écran.

---

## Release

Nouvelle version publiée de la plateforme.

---

# S

## SaaS

Software as a Service.

EduCI est distribué sous forme de plateforme SaaS.

---

## School ID

Identifiant unique d'un établissement.

Présent dans toutes les données métier.

---

## Session

Connexion active d'un utilisateur.

---

## Soft Delete

Suppression logique.

Les données restent restaurables.

---

## Splash Screen

Écran d'ouverture de l'application mobile.

---

## Supabase

Plateforme Backend officielle utilisée par EduCI.

---

# T

## Tableau de Bord

Vue principale adaptée au rôle de l'utilisateur.

---

## Token

Jeton d'authentification sécurisé.

---

## Transport

Module de gestion des véhicules scolaires et des conducteurs.

---

# U

## Upload

Téléversement de documents ou d'images.

---

## Utilisateur

Toute personne possédant un compte EduCI.

---

# V

## Validation

Confirmation qu'une action respecte les règles métier.

---

## Version

Numéro officiel d'une release.

Format :

MAJOR.MINOR.PATCH

---

# W

## Webhook

Notification automatique envoyée par Money Fusion vers le Backend pour confirmer un paiement.

---

# X

## XSS

Cross Site Scripting.

Type d'attaque informatique contre les applications Web.

---

# Z

## Zod

Bibliothèque utilisée pour valider les formulaires et les données côté Frontend et Backend.

---

# Acronymes

API : Application Programming Interface

CI/CD : Continuous Integration / Continuous Deployment

CSV : Comma-Separated Values

GPS : Global Positioning System

HTTPS : HyperText Transfer Protocol Secure

JWT : JSON Web Token

KPI : Key Performance Indicator

MFA : Multi-Factor Authentication

OTP : One-Time Password

PDF : Portable Document Format

QR : Quick Response

RBAC : Role Based Access Control

RLS : Row Level Security

SaaS : Software as a Service

SQL : Structured Query Language

UI : User Interface

UX : User Experience

UUID : Universally Unique Identifier

---

# Modules Officiels EduCI

Authentification

Onboarding

Établissements

Utilisateurs

Élèves

Parents

Enseignants

Personnel

Conducteurs

Classes

Matières

Examens

Notes

Bulletins

Présences

QR Codes

Paiements

Money Fusion

Transport

Bibliothèque

Infirmerie

Discipline

Documents

Messagerie

Notifications

Rapports

Support

Administration

Paramètres

Audit

Logs

---

# Principe de Mise à Jour

Toute nouvelle fonctionnalité, nouveau module, nouveau rôle, nouvelle technologie ou nouveau terme introduit dans EduCI doit être ajouté à ce glossaire avant sa mise en production.

Le Glossaire constitue la référence terminologique officielle de la plateforme.