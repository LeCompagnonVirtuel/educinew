# EduCI - UI / UX Guidelines

Version : 1.0.0

Document : 09_UI_UX_GUIDELINES.md

Statut : Design System Officiel

Classification : Production Enterprise

Auteur : CTO - EduCI

---

# Objectif

Ce document définit les standards officiels de l'interface utilisateur (UI) et de l'expérience utilisateur (UX) de la plateforme EduCI.

Toute nouvelle page, tout composant, toute animation et toute interaction doit respecter ce guide.

Aucune exception.

---

# Philosophie

EduCI doit transmettre immédiatement :

Professionnalisme

Confiance

Modernité

Rapidité

Simplicité

Innovation

L'utilisateur doit comprendre une interface en moins de 5 secondes.

---

# Inspirations

Les interfaces doivent s'inspirer de :

Apple

Stripe

Linear

Notion

Vercel

Google Material 3

Microsoft Fluent

Framer

Jamais d'interface surchargée.

---

# Style Visuel

Minimaliste

Épuré

Premium

Lumineux

Animations fluides

Espaces généreux

Hiérarchie claire

---

# Palette Principale

Couleur primaire

Bleu institutionnel EduCI

Couleur secondaire

Bleu clair

Couleur d'accent

Vert succès

Couleur danger

Rouge

Couleur avertissement

Orange

Couleur information

Cyan

Couleur fond

Blanc

Couleur texte

Gris très foncé

Les couleurs doivent être définies dans les Design Tokens.

Jamais codées en dur.

---

# Mode Sombre

Prévu dès la conception.

Tous les composants doivent fonctionner :

Mode Clair

Mode Sombre

Mode Système

---

# Typographie

Police principale :

Inter

Police secondaire :

Poppins

Titres :

SemiBold

Corps :

Regular

Boutons :

Medium

Les tailles sont centralisées.

---

# Grille

Utiliser une grille 8 px.

Tous les espacements respectent :

8

16

24

32

40

48

64

Jamais de valeurs aléatoires.

---

# Coins Arrondis

Petits composants

8 px

Cartes

16 px

Dialogues

20 px

Boutons

12 px

---

# Ombres

Très discrètes.

Éviter les effets lourds.

Privilégier la profondeur légère.

---

# Icônes

Lucide Icons uniquement.

Même taille dans toute la plateforme.

Toujours accompagnées d'un texte lorsque nécessaire.

---

# Boutons

Types :

Primary

Secondary

Outline

Ghost

Danger

Success

Chaque bouton possède :

Hover

Focus

Disabled

Loading

Success

Error

Aucun bouton sans retour visuel.

---

# Champs de Formulaire

Tous les champs utilisent :

Label

Placeholder

Aide

Validation

Erreur

Succès

Icône si utile

---

# Messages

Types :

Succès

Erreur

Information

Avertissement

Tous utilisent le même composant.

---

# Tableaux

Toutes les tables proposent :

Recherche

Tri

Pagination

Filtres

Export

Colonnes configurables

Responsive

État vide

Chargement

---

# Cartes (Cards)

Toutes les cartes possèdent :

Titre

Description

Icône

Action

Animation légère

---

# Dialogues

Toutes les modales doivent :

être centrées

être accessibles

être responsives

bloquer les doubles clics

supporter ESC

supporter la navigation clavier

---

# Navigation Web

Sidebar fixe

Header fixe

Breadcrumb

Recherche globale

Notifications

Profil utilisateur

Navigation fluide

---

# Navigation Mobile

Bottom Navigation

Gestes natifs

Retour Android

Swipe lorsque pertinent

Navigation rapide

---

# Dashboard

Le tableau de bord affiche :

KPI

Graphiques

Activités récentes

Notifications

Actions rapides

Calendrier

Paiements

Présences

Jamais un écran vide.

---

# Splash Screen

Animation 3D fluide.

Logo officiel.

Sous-titre.

Transition douce.

Durée :

2 à 3 secondes maximum.

Aucune répétition inutile du logo.

---

# Animations

Framer Motion obligatoire.

Animations :

Fade

Slide

Scale

Opacity

Micro-interactions

Jamais d'animations agressives.

60 FPS.

---

# Temps de Chargement

Pendant le chargement :

Skeleton

Spinner

Progress

Jamais d'écran blanc.

---

# États des Écrans

Chaque écran possède :

Loading

Erreur

Vide

Succès

Connexion perdue

Aucune situation sans feedback.

---

# Responsive

Support officiel :

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

# Mobile

Compatible :

Android

iPhone

Tablettes

Orientation portrait obligatoire.

Paysage uniquement lorsque nécessaire.

---

# Accessibilité

Conforme WCAG 2.1 AA.

Contraste suffisant.

Navigation clavier.

ARIA Labels.

Lecteurs d'écran.

Zones tactiles ≥ 44 px.

---

# QR Code

Affichage clair.

Possibilité de :

Zoom

Téléchargement

Partage

Plein écran

Scanner rapide.

---

# Paiements

Interface simple.

Montant visible.

Statut en temps réel.

Historique clair.

Reçus accessibles.

Jamais d'ambiguïté.

---

# Notifications

Centre de notifications unifié.

Catégories.

Lecture.

Archivage.

Recherche.

---

# Recherche

Recherche globale intelligente.

Résultats instantanés.

Suggestions.

Historique.

---

# Formulaires Longs

Découpage par étapes.

Barre de progression.

Sauvegarde automatique.

Validation à chaque étape.

---

# Performance UX

Temps de réponse perçu :

< 100 ms pour les interactions.

Animations :

≤ 300 ms.

Transitions :

Fluides.

---

# Cohérence

Même composant

↓

Même comportement

↓

Même animation

↓

Même couleur

↓

Même logique

sur toute la plateforme.

---

# Design Tokens

Toutes les valeurs doivent être centralisées :

Couleurs

Espacements

Rayons

Typographie

Durées

Ombres

Breakpoints

---

# Bibliothèque de Composants

Tous les composants sont réutilisables.

Interdiction de recréer un composant existant.

---

# Validation

Une interface est conforme uniquement si :

✓ Responsive

✓ Accessible

✓ Fluide

✓ Moderne

✓ Cohérente

✓ Rapide

✓ Testée

✓ Compatible Web

✓ Compatible Mobile

✓ Conforme au Design System

---

# Vision Long Terme

EduCI doit offrir une expérience utilisateur comparable aux meilleurs SaaS mondiaux.

Chaque écran doit donner l'impression d'utiliser une plateforme premium, fiable et intuitive.

L'objectif est qu'un utilisateur puisse accomplir ses tâches avec un minimum de clics et sans formation préalable.

---

# Règle Finale

Toute évolution graphique ou fonctionnelle doit respecter ce Design System.

En cas de doute, privilégier :

la simplicité,

la cohérence,

la lisibilité,

la rapidité,

et l'accessibilité.

Ce document constitue la référence officielle UI/UX de la plateforme EduCI.