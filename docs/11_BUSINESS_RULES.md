# EduCI - Business Rules

Version : 1.0.0

Document : 11_BUSINESS_RULES.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit les règles métier officielles de la plateforme EduCI.

Toutes les fonctionnalités Web, Mobile, Backend et Base de données doivent respecter ces règles.

En cas de conflit entre une implémentation et ce document, ce document prévaut.

---

# Principe Général

EduCI est une plateforme SaaS Multi-Tenant destinée aux établissements scolaires africains.

Chaque établissement est totalement indépendant.

Les données, utilisateurs, paiements et documents sont strictement isolés.

---

# Cycle de Vie d'un Établissement

1. Demande de création d'un établissement.
2. Validation du formulaire.
3. Création du compte administrateur.
4. Envoi d'un email de confirmation.
5. Activation via le lien sécurisé.
6. Vérification de l'adresse email.
7. Finalisation de l'onboarding.
8. Configuration de l'établissement.
9. Configuration de Money Fusion.
10. Activation officielle.
11. Accès au tableau de bord.

Un établissement non activé ne peut jamais accéder à la plateforme.

---

# Code Établissement

Chaque établissement reçoit automatiquement un code unique.

Format :

EDUCI-SYS-ABJ-12343

Structure :

EDUCI

↓

SYS

↓

Abréviation de la ville

↓

Numéro unique

Exemples :

EDUCI-SYS-ABJ-00001

EDUCI-SYS-BKE-00002

EDUCI-SYS-YAM-00003

L'abréviation dépend automatiquement de la ville choisie.

Le code est définitif.

---

# Année Scolaire

Un établissement possède une seule année scolaire active.

Une nouvelle année ne peut être activée qu'après clôture de la précédente.

Toutes les données restent historisées.

---

# Création des Utilisateurs

Les comptes sont créés uniquement par :

Super Admin EduCI

ou

Administrateur d'établissement

Aucun utilisateur interne ne crée lui-même son compte.

---

# Invitation

Lors de la création d'un compte :

création du profil

↓

création des permissions

↓

génération du QR

↓

envoi du mail d'invitation

↓

activation par l'utilisateur

↓

création du mot de passe

↓

première connexion

↓

acceptation des conditions

↓

compte actif

---

# Vérification Email

L'inscription est validée uniquement après clic sur le lien sécurisé envoyé par email.

Aucun accès sans validation.

---

# Matricule Élève

Chaque élève possède un matricule unique.

Format officiel :

16137807D

Le matricule ne change jamais.

Il est utilisé pour :

Connexion

QR

Examens

Présences

Bulletins

Documents

Paiements

---

# Matricule Personnel

Chaque membre du personnel reçoit un identifiant unique selon son rôle.

Jamais de doublon.

---

# QR Code

Chaque utilisateur reçoit automatiquement un QR Code.

Types :

Élève

Parent

Enseignant

Personnel

Conducteur

QR Code :

unique

signé

sécurisé

versionné

horodaté

Le QR ne contient aucune donnée personnelle.

---

# Présence Élèves

Le pointage est possible :

par QR Code

par caméra

par validation manuelle (si autorisée)

Chaque pointage enregistre :

date

heure

appareil

auteur

établissement

position GPS (si activée)

---

# Présence Enseignants

Même fonctionnement.

L'enseignant peut pointer :

à l'entrée

à la sortie

Le directeur visualise les statistiques.

---

# Pointage Personnel

Séparé des enseignants.

Historique indépendant.

---

# Paiements

Money Fusion est l'unique solution de paiement autorisée.

Chaque établissement configure sa propre clé API Money Fusion.

Format attendu :

https://pay.moneyfusion.net/nomdubusiness/xxxxxxxxxxxxxxxx/pay/

Une clé est validée avant activation.

---

# Validation Paiement

Flux :

Parent

↓

Money Fusion

↓

Webhook sécurisé

↓

Backend

↓

Validation

↓

Facture

↓

Reçu

↓

Notification

↓

Historique

Jamais de validation côté client.

---

# Notes

Les notes sont saisies uniquement par les enseignants autorisés.

Après validation :

elles deviennent verrouillées.

Toute modification nécessite une autorisation spécifique.

---

# Bulletins

Calcul automatique.

Les moyennes utilisent les coefficients officiels.

Chaque bulletin est :

généré en PDF

archivé

téléchargeable

historisé

---

# Transport

Chaque conducteur est affecté à un ou plusieurs véhicules.

Le conducteur partage sa position GPS.

Les parents suivent le trajet en temps réel.

Les montées et descentes des élèves sont validées par QR Code.

---

# Bibliothèque

Chaque emprunt possède :

date

durée

statut

historique

retour

retard

---

# Infirmerie

Toutes les consultations sont historisées.

Les données médicales sont accessibles uniquement aux personnes autorisées.

---

# Discipline

Chaque incident contient :

type

gravité

description

date

responsable

sanction

historique

---

# Notifications

Les notifications sont envoyées pour :

Paiements

Présences

Absences

Retards

Messages

Examens

Résultats

Transport

Urgences

---

# Documents

Chaque document possède :

version

historique

auteur

permissions

signature numérique (si applicable)

---

# Multi-Tenant

Toutes les données sont liées à un établissement.

Aucun partage entre établissements.

---

# Suppression

Les suppressions sont logiques (Soft Delete).

Les données restent auditables.

---

# Audit

Toutes les actions critiques sont enregistrées :

Connexion

Création

Modification

Suppression

Paiement

Scan QR

Présence

Export

Import

Configuration

---

# Règles Mobile

Les applications mobiles concernent :

Élèves

Parents

Enseignants

Conducteurs

Personnel

L'administrateur d'établissement utilise exclusivement l'interface Web.

---

# Règles Web

Le tableau de bord Web est réservé :

Super Admin EduCI

Administrateur d'établissement

Directeur

Secrétaire

Comptable

Responsables autorisés

---

# Performances

Toute action utilisateur doit répondre rapidement.

Objectifs :

Navigation < 200 ms

Chargement < 2 s

Paiement < 5 s

Scan QR < 2 s

---

# Journalisation

Chaque événement critique possède :

ID

Utilisateur

Établissement

Horodatage

Adresse IP

Appareil

Action

Résultat

---

# Évolutivité

Les règles métier doivent permettre l'ajout futur :

de nouveaux rôles

de nouveaux modules

de nouveaux pays

de nouvelles devises

sans casser l'existant.

---

# Validation

Une fonctionnalité est conforme uniquement si :

✓ respecte les règles métier

✓ respecte les permissions

✓ respecte le Multi-Tenant

✓ est documentée

✓ est testée

✓ est compatible Web

✓ est compatible Mobile

✓ est compatible Production

---

# Règle Finale

Toute implémentation de la plateforme EduCI doit respecter strictement ce document.

Les règles métier définies ici constituent la source officielle de vérité (Single Source of Truth) pour le fonctionnement de l'ensemble de la plateforme.