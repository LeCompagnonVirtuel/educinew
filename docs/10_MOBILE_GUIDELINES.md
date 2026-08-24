# EduCI - Mobile Development Guidelines

Version : 1.0.0

Document : 10_MOBILE_GUIDELINES.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit les standards officiels de développement des applications mobiles EduCI.

Toutes les applications mobiles doivent respecter ces règles afin de garantir une expérience fluide, rapide, sécurisée et cohérente avec la plateforme Web.

---

# Philosophie Mobile

EduCI Mobile n'est pas une copie du site Web.

Chaque écran doit être pensé pour une utilisation tactile.

Les interfaces doivent privilégier :

• Rapidité

• Simplicité

• Fluidité

• Lisibilité

• Productivité

---

# Plateformes supportées

Android

Version minimale :

Android 10 (API 29)

Version recommandée :

Android 14+

---

iOS

Version minimale :

iOS 16

Version recommandée :

Dernière version stable

---

# Technologies

React Native

Expo

Expo Router

TypeScript

React Query

Supabase

React Hook Form

Zod

NativeWind

Reanimated

React Native Gesture Handler

Expo Camera

Expo Notifications

Expo Secure Store

Expo Location

Expo Image

Expo FileSystem

Expo Linking

Expo Splash Screen

Expo Updates

---

# Architecture

Présentation

↓

Navigation

↓

Hooks

↓

Services

↓

Repository

↓

API

↓

Supabase

---

# Navigation

Utiliser Expo Router.

Navigation :

Authentification

↓

Onboarding

↓

Application

↓

Sous-modules

La navigation doit rester identique sur Android et iOS.

---

# Authentification

Connexion

Inscription

Confirmation Email

Mot de passe oublié

Déconnexion

Renouvellement automatique des sessions

Les sessions sont stockées uniquement dans Secure Store.

---

# Synchronisation

Toutes les données proviennent du Backend.

Jamais de logique métier locale.

Les données sont synchronisées automatiquement.

---

# Mode Hors Ligne

Prévoir un mode Offline pour :

Consultation des données déjà téléchargées

QR Code

Présences

Emploi du temps

Notifications déjà reçues

Les écritures sont synchronisées automatiquement dès le retour d'Internet.

---

# Gestion du Cache

Utiliser React Query.

Les données doivent être :

mises en cache

rafraîchies automatiquement

invalidées intelligemment

---

# Notifications Push

Utiliser Expo Notifications.

Support :

Paiements

Présences

Messages

Annonces

Urgences

Transport

Toutes les notifications ouvrent directement la bonne page.

---

# Caméra

Utiliser Expo Camera.

Fonctionnalités :

QR Code

Scan sécurisé

Prise de photo

Recadrage automatique

Autorisations système

Gestion des refus

---

# QR Codes

Tous les utilisateurs disposent d'un QR personnel.

Le mobile doit pouvoir :

Afficher

Scanner

Partager

Télécharger

Actualiser

Valider

Le scan doit fonctionner même en faible luminosité.

---

# Géolocalisation

Utiliser Expo Location.

Fonctionnalités :

Position Conducteur

Position Bus

Pointage GPS

Historique

Calcul distance

Permissions

---

# Uploads

Photos

Documents

Justificatifs

Profil

Tous les fichiers sont compressés avant l'envoi.

---

# Images

Utiliser Expo Image.

Prévoir :

Lazy Loading

Cache

Compression

Placeholder

---

# Performances

Objectifs :

Ouverture < 2 secondes

Navigation < 200 ms

Animation 60 FPS

Consommation mémoire optimisée

Faible consommation batterie

---

# Splash Screen

Animation officielle EduCI.

Logo vectoriel.

Fond propre.

Animation 3D.

Transition fluide.

Durée maximale :

3 secondes.

---

# Design

Respecter :

09_UI_UX_GUIDELINES.md

Aucune différence visuelle majeure avec la version Web.

---

# Responsive

Support officiel :

Petits Android

Android pliables

Grandes tablettes

iPhone SE

iPhone Standard

iPhone Pro Max

iPad

Aucun débordement.

---

# Permissions Système

Caméra

Notifications

Position

Stockage

Photos

Toutes les permissions doivent être demandées uniquement lorsque nécessaire.

---

# Sécurité

Secure Store

HTTPS

JWT

Aucun secret dans l'application.

Aucune clé API sensible embarquée.

---

# Gestion des Erreurs

Toutes les erreurs affichent :

Titre

Description

Solution

Bouton Réessayer

Journalisation

---

# Accessibilité

Support :

TalkBack

VoiceOver

Polices dynamiques

Contraste

Zones tactiles ≥ 44 px

---

# Applications Officielles

Application Élève

Application Parent

Application Enseignant

Application Conducteur

Application Personnel

Toutes partagent le même Design System.

Les menus sont adaptés selon le rôle connecté.

---

# Synchronisation Temps Réel

Utiliser Supabase Realtime pour :

Présences

Messages

Notifications

Paiements

QR

Transport

---

# Optimisation Réseau

Compression

Pagination

Cache

Préchargement

Requêtes minimales

---

# Gestion Batterie

Limiter :

GPS permanent

Animations lourdes

Requêtes inutiles

Rafraîchissements excessifs

---

# Publication

Android :

Google Play Console

Signature officielle

App Bundle (.aab)

---

iOS :

Apple App Store

TestFlight

Signature Apple

---

# Monitoring

Intégrer :

Crash Reporting

Analytics

Performances

Erreurs JavaScript

Erreurs natives

---

# Tests

Tests unitaires

Tests d'intégration

Tests UI

Tests caméra

Tests QR

Tests GPS

Tests hors ligne

Tests notifications

Tests Android

Tests iPhone

---

# Checklist Production

Avant publication :

✓ Build Android réussi

✓ Build iOS réussi

✓ QR fonctionnel

✓ Caméra fonctionnelle

✓ GPS fonctionnel

✓ Notifications opérationnelles

✓ Synchronisation OK

✓ Responsive validé

✓ Tests terminés

✓ Performances validées

✓ Sécurité vérifiée

✓ Compatible Play Store

✓ Compatible App Store

---

# Vision Long Terme

Les applications EduCI doivent offrir une expérience comparable aux meilleures applications SaaS mondiales.

Les utilisateurs doivent pouvoir réaliser toutes leurs tâches quotidiennes rapidement, même avec une connexion Internet limitée.

Le mobile constitue un pilier stratégique de la plateforme, au même titre que le Web.

---

# Règle Finale

Toute nouvelle fonctionnalité mobile doit être pensée "Mobile First".

Les applications Android et iOS doivent rester parfaitement synchronisées avec le Backend et la plateforme Web, tout en respectant les contraintes spécifiques des appareils mobiles.

Ce document constitue la référence officielle du développement mobile d'EduCI.