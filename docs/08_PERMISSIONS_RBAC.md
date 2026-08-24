# EduCI - Role Based Access Control (RBAC)

Version : 1.0.0

Document : 08_PERMISSIONS_RBAC.md

Statut : Référence Officielle

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit le système officiel de gestion des rôles et des permissions (RBAC) de la plateforme EduCI.

Toutes les autorisations de la plateforme doivent être basées sur ce document.

Aucune permission ne doit être codée en dur.

Toutes les vérifications passent par le moteur RBAC.

---

# Principe Général

Chaque utilisateur possède :

• un compte Supabase Auth

• un profil

• un rôle

• un établissement

• une liste de permissions

• un niveau hiérarchique

Les permissions sont toujours contrôlées :

Frontend

↓

Backend

↓

Row Level Security

↓

Audit

---

# Hiérarchie Officielle

Niveau 0

Super Admin EduCI

↓

Niveau 1

Administrateur d'établissement

↓

Niveau 2

Directeur

↓

Niveau 3

Secrétaire

Comptable

Responsable RH

Surveillant Général

↓

Niveau 4

Enseignant

Bibliothécaire

Infirmier

Conducteur

Personnel Administratif

↓

Niveau 5

Parent

↓

Niveau 6

Élève

↓

Niveau 7

Visiteur

---

# Types de Permissions

Chaque permission appartient à une catégorie.

view

create

update

delete

approve

validate

publish

archive

restore

export

import

print

download

upload

manage

assign

configure

audit

---

# Modules Officiels

Dashboard

Établissements

Utilisateurs

Élèves

Parents

Enseignants

Personnel

Classes

Matières

Examens

Notes

Bulletins

Présences

QR Codes

Paiements

Transport

Bibliothèque

Infirmerie

Discipline

Documents

Messagerie

Notifications

Paramètres

Rapports

Logs

Support

---

# SUPER ADMIN EDUCI

Accès total.

Peut :

Créer des établissements

Suspendre un établissement

Supprimer un établissement

Voir tous les établissements

Voir toutes les statistiques

Créer des administrateurs

Réinitialiser un compte

Voir les logs globaux

Gérer les licences

Configurer Money Fusion global

Gérer les versions

Déployer

Maintenance

Support

Audit

Monitoring

Sauvegardes

Aucune restriction.

---

# ADMINISTRATEUR D'ÉTABLISSEMENT

Accès total uniquement à son établissement.

Peut :

Créer les utilisateurs

Créer les classes

Créer les matières

Créer les années scolaires

Créer les emplois du temps

Créer les examens

Créer les paiements

Créer les QR

Créer les documents

Inviter des utilisateurs

Gérer les permissions locales

Configurer Money Fusion

Gérer les transports

Voir les statistiques

Exporter les données

Importer Excel

Ne peut jamais accéder aux autres établissements.

---

# DIRECTEUR

Peut :

Voir tous les tableaux de bord

Valider les bulletins

Valider les examens

Voir les finances

Voir les présences

Voir les statistiques

Approuver certaines actions

Consulter les rapports

Ne peut pas modifier la configuration technique.

---

# SECRÉTAIRE

Peut :

Créer des élèves

Modifier les élèves

Créer les parents

Créer les enseignants

Créer les dossiers

Imprimer les documents

Gérer les inscriptions

Gérer les transferts

Ne peut pas modifier les paramètres critiques.

---

# COMPTABLE

Peut :

Créer les factures

Enregistrer les paiements

Voir les paiements

Exporter la comptabilité

Créer les reçus

Relancer les parents

Consulter Money Fusion

Jamais modifier les notes.

---

# RESPONSABLE RH

Peut :

Créer le personnel

Modifier les contrats

Gérer les congés

Voir les présences du personnel

Exporter RH

---

# ENSEIGNANT

Peut :

Voir uniquement ses classes

Voir uniquement ses élèves

Scanner les QR des élèves

Faire les présences

Saisir les notes

Modifier ses notes avant validation

Voir son emploi du temps

Télécharger ses documents

Voir ses notifications

Jamais accéder aux finances.

---

# SURVEILLANT

Peut :

Scanner les QR

Pointer les élèves

Voir les absences

Créer un incident

Consulter les retards

Imprimer les rapports

---

# BIBLIOTHÉCAIRE

Peut :

Ajouter un livre

Modifier un livre

Créer un emprunt

Créer un retour

Voir les statistiques bibliothèque

---

# INFIRMIER

Peut :

Créer un dossier médical

Ajouter une consultation

Créer une urgence

Voir les traitements

Jamais accéder aux notes.

---

# CONDUCTEUR

Application Mobile uniquement.

Peut :

Voir son véhicule

Voir son trajet

Scanner les QR

Pointer montée

Pointer descente

Partager sa géolocalisation

Voir les notifications

Ne voit jamais les finances.

---

# PERSONNEL ADMINISTRATIF

Peut :

Voir son planning

Pointer sa présence

Voir ses notifications

Télécharger ses documents

Modifier son profil

---

# PARENT

Application Mobile.

Peut :

Voir uniquement ses enfants

Voir les paiements

Payer la scolarité

Télécharger les bulletins

Voir les présences

Voir les devoirs

Recevoir les notifications

Contacter l'établissement

Télécharger les reçus

Jamais accéder aux autres élèves.

---

# ÉLÈVE

Application Mobile.

Peut :

Voir son profil

Voir ses notes

Voir ses bulletins

Voir son QR

Voir son emploi du temps

Voir ses devoirs

Voir ses présences

Recevoir les annonces

Télécharger ses documents

Modifier uniquement certaines informations personnelles autorisées.

---

# VISITEUR

Peut uniquement :

Créer un compte

Consulter les informations publiques

Contacter le support

---

# Permissions Techniques

Toutes les permissions sont stockées en base.

Jamais codées en dur.

Exemple :

students.view

students.create

students.update

students.delete

students.import

students.export

payments.view

payments.create

payments.validate

attendance.scan

attendance.edit

transport.track

library.borrow

reports.export

settings.manage

---

# Contrôle Backend

Chaque API vérifie :

JWT

↓

Utilisateur

↓

Établissement

↓

Permission

↓

Business Rules

↓

Exécution

Aucun contournement.

---

# Contrôle Frontend

Les menus

Les boutons

Les écrans

Les actions

Les exports

Les imports

Les modales

doivent respecter les permissions.

Un bouton interdit n'est jamais affiché.

---

# Contrôle Base de Données

Toutes les tables utilisent :

Row Level Security

Les policies vérifient :

school_id

role

permission

statut

---

# Héritage

Les rôles supérieurs héritent des permissions inférieures sauf restriction explicite.

Exemple :

Administrateur

↓

Directeur

↓

Enseignant

L'administrateur possède également les permissions de consultation des niveaux inférieurs lorsque cela est cohérent.

---

# Audit

Chaque refus d'accès est journalisé.

Informations :

Utilisateur

Permission demandée

Module

Adresse IP

Date

Appareil

---

# Permissions Futures

Le système doit permettre :

Création de nouveaux rôles

Création de nouvelles permissions

Désactivation d'une permission

Groupes de permissions

Permissions temporaires

Permissions conditionnelles

sans modifier l'architecture.

---

# Validation

Une fonctionnalité est conforme uniquement si :

✓ vérifie le rôle

✓ vérifie la permission

✓ vérifie le school_id

✓ respecte les RLS

✓ journalise les accès

✓ bloque les accès non autorisés

✓ fonctionne sur Web et Mobile

---

# Règle Finale

Le RBAC constitue la base de la sécurité fonctionnelle d'EduCI.

Aucune action, aucun écran, aucune API, aucun bouton et aucune donnée ne peut être accessible sans une vérification explicite des permissions.

Toute nouvelle fonctionnalité devra déclarer ses permissions avant d'être développée.

Ce document est la référence unique pour l'ensemble du contrôle d'accès de la plateforme EduCI.