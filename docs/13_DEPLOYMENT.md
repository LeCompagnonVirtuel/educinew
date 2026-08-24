# EduCI - Deployment Guide

Version : 1.0.0

Document : 13_DEPLOYMENT.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit la stratégie officielle de déploiement de la plateforme EduCI.

Il couvre les environnements, les pipelines CI/CD, la sécurité des déploiements, le monitoring, les sauvegardes et la reprise après incident.

Toute mise en production doit respecter ce document.

---

# Philosophie

Les déploiements doivent être :

Automatisés

Fiables

Sécurisés

Réversibles

Traçables

Sans interruption de service lorsque cela est possible.

---

# Architecture de Production

Clients Web

↓

CDN

↓

Frontend

↓

API Backend

↓

Supabase

↓

Stockage

↓

Services externes

↓

Money Fusion

↓

Service Email

↓

Notifications

---

# Environnements

## Local

Utilisé uniquement par les développeurs.

Contient des données de test.

Jamais connecté à la production.

---

## Development

Développement partagé.

Tests internes.

Déploiements fréquents.

---

## Staging

Copie fidèle de la production.

Validation métier.

Tests E2E.

Recette.

---

## Production

Environnement officiel.

Utilisateurs réels.

Haute disponibilité.

Surveillance permanente.

---

# Branches Git

main

Production

develop

Développement

feature/*

Nouvelles fonctionnalités

hotfix/*

Corrections urgentes

release/*

Préparation d'une version

---

# Pipeline CI/CD

Chaque commit déclenche automatiquement :

Installation des dépendances

↓

Analyse statique

↓

Lint

↓

Compilation

↓

Tests unitaires

↓

Tests d'intégration

↓

Tests E2E

↓

Audit sécurité

↓

Build

↓

Déploiement (selon l'environnement)

---

# Conditions de Déploiement

Un déploiement est autorisé uniquement si :

✓ Build réussi

✓ Lint réussi

✓ Tests réussis

✓ Couverture minimale atteinte

✓ Audit sécurité validé

✓ Migrations validées

✓ Variables d'environnement présentes

---

# Variables d'Environnement

Toutes les clés sensibles doivent être stockées hors du code.

Exemples :

SUPABASE_URL

SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE

RESEND_API_KEY

MONEY_FUSION_API_KEY

APP_URL

JWT_SECRET

Aucune clé ne doit être versionnée.

---

# Base de Données

Toutes les migrations sont versionnées.

Les migrations doivent être :

Réversibles

Testées

Documentées

Aucune modification manuelle en production.

---

# Sauvegardes

Sauvegarde quotidienne.

Sauvegarde avant chaque migration.

Conservation :

7 jours

30 jours

90 jours

1 an

Tests réguliers de restauration.

---

# Monitoring

Surveiller en permanence :

API

Base de données

Paiements

Emails

Notifications

Temps de réponse

Consommation mémoire

CPU

Stockage

---

# Journalisation

Toutes les opérations critiques sont historisées.

Connexion

Paiement

Création de compte

Suppression

Modification

Erreur serveur

Webhook

Déploiement

---

# Alertes

Déclencher une alerte en cas de :

Erreur 500 répétée

API indisponible

Échec Money Fusion

Échec Email

Échec sauvegarde

Temps de réponse anormal

Tentatives d'intrusion

---

# Haute Disponibilité

Objectif :

99,9 % de disponibilité minimum.

Prévoir :

Redondance

Rollback

Reprise automatique

Maintenance planifiée

---

# Rollback

Chaque déploiement doit pouvoir être annulé.

Le retour arrière doit restaurer :

Code

Base compatible

Configuration

Variables

---

# Sécurité

Toutes les communications utilisent HTTPS.

Les certificats doivent être renouvelés automatiquement.

Les secrets sont chiffrés.

Les accès administrateurs sont limités.

---

# Déploiement Mobile

Android

Build AAB signé.

Publication via Google Play Console.

Déploiement progressif recommandé.

---

iOS

Build signé.

Validation TestFlight.

Publication App Store.

Déploiement progressif recommandé.

---

# Déploiement Web

Le Frontend est publié automatiquement après validation du pipeline.

Le cache CDN est invalidé après chaque nouvelle version.

---

# Déploiement Backend

Le Backend est redémarré sans interruption de service si possible.

Les migrations sont exécutées avant l'ouverture du trafic.

---

# Déploiement Base de Données

Les migrations doivent être :

Ordonnées

Versionnées

Journalisées

Réversibles

---

# Vérifications Post-Déploiement

Contrôler :

Connexion

Création d'établissement

Création d'utilisateur

Paiements

Emails

QR Codes

Présences

Notifications

Dashboard

API

---

# Plan de Reprise

En cas d'incident majeur :

Identifier le problème

Bloquer les nouvelles opérations critiques

Restaurer la dernière sauvegarde si nécessaire

Effectuer un rollback

Analyser les journaux

Corriger définitivement

Documenter l'incident

---

# Maintenance

Les maintenances doivent être :

Planifiées

Communiquées

Journalisées

Les interruptions doivent être réduites au minimum.

---

# Documentation

Chaque déploiement doit enregistrer :

Version

Date

Auteur

Description

Modules concernés

Correctifs

Évolutions

Durée

Résultat

---

# KPI de Production

Disponibilité ≥ 99,9 %

Temps API < 200 ms

Temps de chargement < 2 s

Taux d'échec des déploiements < 2 %

Sauvegarde quotidienne réussie : 100 %

---

# Checklist Production

Avant chaque mise en production :

✓ Tests validés

✓ Build validé

✓ Lint validé

✓ Variables d'environnement vérifiées

✓ Sauvegarde réalisée

✓ Migrations validées

✓ Monitoring actif

✓ Alertes configurées

✓ Rollback disponible

✓ Documentation mise à jour

---

# Vision Long Terme

Le processus de déploiement doit permettre des mises à jour fréquentes, sûres et transparentes.

L'objectif est de garantir une plateforme disponible, performante et évolutive sans interruption significative pour les établissements.

---

# Règle Finale

Aucune version d'EduCI ne peut être déployée en production sans respecter l'intégralité des règles définies dans ce document.

Ce guide constitue la référence officielle de déploiement et d'exploitation de la plateforme.