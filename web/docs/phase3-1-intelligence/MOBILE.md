# Mobile — Phase 3.1 Intelligence (Écrans React Native)

## Vue d'ensemble

L'application mobile EduCI (React Native/Expo) contient 38 écrans dans `mobile/app/screens/`. Les écrans Intelligence pour la phase 3.1 seront ajoutés dans le dossier `mobile/features/intelligence/`.

## Écrans existants (38)

### Authentification & Onboarding

| Écran | Fichier | Description |
|-------|---------|-------------|
| `SplashScreen` | `SplashScreen.tsx` | Écran de démarrage |
| `LoginScreen` | `LoginScreen.tsx` | Connexion |
| `RegisterScreen` | `RegisterScreen.tsx` | Inscription |
| `ForgotPasswordScreen` | `ForgotPasswordScreen.tsx` | Mot de passe oublié |
| `OTPVerificationScreen` | `OTPVerificationScreen.tsx` | Vérification OTP |
| `FirstLoginScreen` | `FirstLoginScreen.tsx` | Premier login |
| `OnboardingScreen` | `OnboardingScreen.tsx` | Onboarding |
| `QRLoginScreen` | `QRLoginScreen.tsx` | Connexion QR |
| `AdminRedirectScreen` | `AdminRedirectScreen.tsx` | Redirection admin |

### Étudiants

| Écran | Fichier | Description |
|-------|---------|-------------|
| `StudentScheduleScreen` | `StudentScheduleScreen.tsx` | Emploi du temps |
| `StudentAssignmentsScreen` | `StudentAssignmentsScreen.tsx` | Devoirs |
| `StudentDocumentsScreen` | `StudentDocumentsScreen.tsx` | Documents |
| `ReportCardScreen` | `ReportCardScreen.tsx` | Bulletin |
| `ExamPrepScreen` | `ExamPrepScreen.tsx` | Préparation examens |
| `QuizScreen` | `QuizScreen.tsx` | Quiz |

### Parents

| Écran | Fichier | Description |
|-------|---------|-------------|
| `ParentAttendanceScreen` | `ParentAttendanceScreen.tsx` | Présence enfant |
| `ParentGradesScreen` | `ParentGradesScreen.tsx` | Notes enfant |
| `ParentScheduleScreen` | `ParentScheduleScreen.tsx` | Emploi du temps enfant |
| `ParentDocumentsScreen` | `ParentDocumentsScreen.tsx` | Documents enfant |
| `ChildProfileScreen` | `ChildProfileScreen.tsx` | Profil enfant |

### Enseignants & Personnel

| Écran | Fichier | Description |
|-------|---------|-------------|
| `TeacherCheckinScreen` | `TeacherCheckinScreen.tsx` | Pointage enseignant |
| `TeacherSettingsScreen` | `TeacherSettingsScreen.tsx` | Paramètres enseignant |
| `StaffCheckinScreen` | `StaffCheckinScreen.tsx` | Pointage personnel |

### Présence & QR

| Écran | Fichier | Description |
|-------|---------|-------------|
| `AttendanceHistoryScreen` | `AttendanceHistoryScreen.tsx` | Historique présence |
| `QRBadgeScreen` | `QRBadgeScreen.tsx` | Badge QR |
| `QRScannerScreen` | `QRScannerScreen.tsx` | Scanner QR |
| `PremiumCheckInScreen` | `PremiumCheckInScreen.tsx` | Pointage premium |
| `PremiumAttendanceHistoryScreen` | `PremiumAttendanceHistoryScreen.tsx` | Historique premium |
| `PremiumQRScannerScreen` | `PremiumQRScannerScreen.tsx` | Scanner QR premium |

### Paiements

| Écran | Fichier | Description |
|-------|---------|-------------|
| `MakePaymentScreen` | `MakePaymentScreen.tsx` | Effectuer un paiement |
| `PaymentConfirmationScreen` | `PaymentConfirmationScreen.tsx` | Confirmation paiement |

### Autres

| Écran | Fichier | Description |
|-------|---------|-------------|
| `NotificationsScreen` | `NotificationsScreen.tsx` | Notifications |
| `AnnouncementsScreen` | `AnnouncementsScreen.tsx` | Annonces |
| `SettingsScreen` | `SettingsScreen.tsx` | Paramètres |
| `DocumentViewerScreen` | `DocumentViewerScreen.tsx` | Visionneuse documents |
| `DriverScreen` | `DriverScreen.tsx` | Chauffeur transport |
| `SurveillanceScreen` | `SurveillanceScreen.tsx` | Surveillance |
| `VisitorRegisterScreen` | `VisitorRegisterScreen.tsx` | Registre visiteurs |

## Écrans Intelligence (Phase 3.1 — à venir)

Les écrans Intelligence seront ajoutés dans `mobile/features/intelligence/screens/` :

| Écran | Description |
|-------|-------------|
| `IntelligenceDashboardScreen` | Tableau de bord exécutif |
| `IntelligenceScoresScreen` | Scores d'intelligence |
| `IntelligenceAlertsScreen` | Alertes IA |
| `IntelligenceInsightsScreen` | Insights et analyses |
| `IntelligenceRecommendationsScreen` | Recommandations |
| `IntelligenceKPIScreen` | KPIs intelligents |
| `IntelligencePredictiveScreen` | Modèles prédictifs |
| `IntelligenceRiskScreen` | Évaluations de risque |
| `IntelligenceEarlyWarningsScreen` | Alertes précoces |
| `IntelligenceKnowledgeBaseScreen` | Base de connaissances |
| `IntelligenceNLPScreen` | Tâches NLP |
| `IntelligenceReportsScreen` | Rapports analytics |
| `IntelligenceSettingsScreen` | Paramètres intelligence |

## Architecture mobile

```
mobile/
├── app/
│   ├── screens/          # 38 écrans existants
│   ├── hooks/            # Hooks React Native
│   ├── context/          # Context providers
│   └── navigation.tsx    # Navigation stack
├── features/
│   └── intelligence/     # Phase 3.1 (à venir)
│       ├── screens/
│       ├── hooks/
│       └── services/
├── components/           # Composants partagés
├── services/             # Services API
└── utils/                # Utilitaires
```

## Navigation

La navigation est gérée via React Navigation avec une structure de navigation par rôles :

```typescript
// mobile/app/navigation.tsx
- AuthStack: Login, Register, ForgotPassword, OTP
- StudentTabs: Schedule, Assignments, Documents, ReportCard
- ParentTabs: Attendance, Grades, Schedule, Documents
- TeacherTabs: Checkin, Settings
- IntelligenceStack: Dashboard, Scores, Alerts, Insights (Phase 3.1)
```

## Connexion API

Les écrans mobiles consomment les mêmes API routes Next.js que le web :

```typescript
// Exemple d'appel API depuis le mobile
const response = await fetch(`${API_URL}/api/intelligence/scores?schoolId=${schoolId}`);
const { data } = await response.json();
```
