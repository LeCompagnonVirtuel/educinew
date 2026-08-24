# EduCI - Project Vision

Version : 1.0.0

Document : 00_PROJECT_VISION.md

Statut : Document Fondateur

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Vision

EduCI est une plateforme ERP SaaS Enterprise de gestion scolaire conçue pour accompagner la transformation numérique des établissements d'enseignement en Afrique.

La plateforme ne doit pas être une simple application scolaire.

Elle doit devenir l'écosystème numérique central d'un établissement.

EduCI doit permettre à chaque école de gérer l'ensemble de ses activités depuis une plateforme unique, sécurisée, moderne et évolutive.

Notre ambition est de devenir la référence africaine des ERP scolaires.

---

# Mission

Permettre à chaque établissement scolaire africain de gérer facilement :

• son administration

• ses enseignants

• ses élèves

• ses parents

• ses finances

• ses ressources humaines

• ses transports

• ses bibliothèques

• ses communications

• ses documents

• ses statistiques

• ses paiements

• ses présences

• ses examens

• ses bulletins

• sa sécurité

sur une seule plateforme.

---

# Ambition

Construire une solution capable d'accueillir :

plusieurs milliers d'établissements,

plusieurs millions d'utilisateurs,

sans perte de performance.

EduCI doit pouvoir être utilisée aussi bien :

par une petite école privée,

qu'une université nationale.

---

# Valeurs

Toutes les décisions doivent respecter :

Simplicité

Fiabilité

Rapidité

Sécurité

Scalabilité

Accessibilité

Innovation

Transparence

Qualité

---

# Philosophie Produit

EduCI n'est pas une démonstration.

Chaque fonctionnalité doit être pensée comme un produit fini.

Chaque écran doit pouvoir être utilisé en production.

Chaque bouton doit fonctionner.

Chaque donnée doit être réelle.

Chaque action doit avoir une logique métier.

Aucun écran vide.

Aucun faux bouton.

Aucune fonctionnalité simulée.

---

# Objectifs Fonctionnels

La plateforme doit permettre :

Création d'établissements

Administration complète

Gestion académique

Gestion financière

Gestion documentaire

Gestion RH

Gestion des transports

Gestion des paiements

Gestion des présences

Gestion des QR Codes

Gestion des examens

Gestion des bulletins

Communication interne

Application Mobile

Tableau de bord décisionnel

API

Statistiques

Exports

Notifications

---

# Public Cible

Ecoles primaires

Collèges

Lycées

Etablissements techniques

Centres de formation

Universités

Instituts supérieurs

Organismes de formation

---

# Typologie des Utilisateurs

Super Admin EduCI

Administrateur établissement

Directeur

Secrétaire

Comptable

Enseignant

Surveillant

Bibliothécaire

Conducteur

Infirmier

Personnel administratif

Parent

Élève

Visiteur

Chaque utilisateur possède un profil adapté à son rôle.

---

# Architecture Produit

EduCI est développé selon une architecture SaaS Multi-Tenant.

Chaque établissement est totalement indépendant.

Les données ne doivent jamais être partagées entre deux établissements.

Le filtrage par school_id est obligatoire pour toutes les données métier.

---

# Identité des Etablissements

Chaque établissement possède automatiquement :

Identifiant unique

Code établissement

Logo

Charte graphique

Configuration

Année scolaire

Configuration Money Fusion

Configuration académique

Configuration documentaire

Configuration régionale

Toutes les ressources sont isolées par établissement.

---

# Paiements

EduCI n'encaisse jamais les paiements.

Chaque établissement reçoit directement les paiements sur son propre compte Money Fusion.

Money Fusion est le partenaire de paiement officiel.

Aucune autre passerelle ne doit être intégrée.

---

# QR Codes

Chaque utilisateur possède automatiquement un QR Code personnel.

Le QR permet :

Identification

Pointage

Validation

Authentification selon le contexte

Traçabilité

Chaque QR est :

Unique

Sécurisé

Régénérable

Non réutilisable

---

# Authentification

La plateforme utilise Supabase Auth.

Aucun système parallèle.

Tous les accès sont sécurisés.

Toutes les sessions sont contrôlées.

Toutes les permissions sont vérifiées.

---

# Mobile

Le mobile est destiné uniquement à :

Élèves

Parents

Enseignants

Personnel

Conducteurs

L'administration complète est réalisée exclusivement sur l'application Web.

---

# Web

Le Web constitue le centre administratif.

Toutes les fonctionnalités avancées sont accessibles depuis l'interface Web.

---

# Responsive

La plateforme doit fonctionner parfaitement sur :

Android

iPhone

Tablettes

Desktop

Laptop

Ultra Wide

TV

Aucun débordement d'écran.

Aucune perte de fonctionnalité.

---

# Langues

Architecture multilingue.

Français par défaut.

Prévoir :

Anglais

Espagnol

Portugais

Arabe

sans modifier l'architecture.

---

# Localisation

Optimisée pour toute l'Afrique.

Support de :

Tous les pays africains

Toutes les devises

Toutes les villes

Toutes les régions

Indicatifs téléphoniques

Fuseaux horaires

Formats de date

---

# Performance

Objectifs :

Chargement rapide

Navigation fluide

Temps réel

Faible consommation réseau

Faible consommation batterie

Optimisation maximale

---

# Sécurité

Les données des établissements sont confidentielles.

Toutes les communications sont sécurisées.

Toutes les API sont protégées.

Toutes les permissions sont contrôlées.

Toutes les actions importantes sont enregistrées dans un journal d'audit.

---

# Evolution

EduCI doit pouvoir accueillir de nouveaux modules sans modifier les anciens.

Toute nouvelle fonctionnalité doit être modulaire.

La rétrocompatibilité est obligatoire.

---

# Qualité

Aucune fonctionnalité ne peut être considérée terminée tant que :

elle n'est pas testée ;

elle n'est pas documentée ;

elle n'est pas responsive ;

elle n'est pas sécurisée ;

elle n'est pas synchronisée avec les autres modules.

---

# Vision Long Terme

EduCI doit devenir la plateforme de référence de la gestion scolaire en Afrique.

La plateforme devra évoluer vers un écosystème complet comprenant :

ERP scolaire

Application Mobile

Portail Parents

Portail Élèves

Portail Enseignants

Marketplace éducative

API publique

Services IA

Analyse prédictive

Business Intelligence

Automatisation

Signature électronique

Archivage numérique

Interopérabilité avec les systèmes ministériels lorsque cela est possible.

---

# Devise du Projet

"Une seule plateforme. Une seule vérité. Une gestion scolaire sans compromis."

---

# Engagement

Chaque décision technique, fonctionnelle ou graphique prise dans le cadre du développement d'EduCI doit respecter ce document.

En cas de conflit entre plusieurs choix de conception, la solution retenue sera toujours celle qui offre :

- la meilleure sécurité ;
- la meilleure évolutivité ;
- la meilleure maintenabilité ;
- la meilleure expérience utilisateur ;
- la meilleure qualité de production.

Ce document constitue la référence stratégique du projet et doit guider toutes les phases de conception, de développement, de test et de déploiement.