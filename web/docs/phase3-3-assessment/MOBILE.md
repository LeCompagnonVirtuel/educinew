# Mobile — Phase 3.3 Assessment Engine

React Native screens for the assessment module. 15 screens covering the most critical mobile flows.

## Screens

### Exam Taking

| # | Screen | Description |
|---|--------|-------------|
| 1 | `ExamListScreen` | List available exams with status, countdown |
| 2 | `ExamDetailScreen` | Exam details, instructions, start button |
| 3 | `ExamTakingScreen` | Active exam: questions, timer, navigation |
| 4 | `ExamResultScreen` | Score, breakdown, pass/fail status |

### Certificate & Credentials

| # | Screen | Description |
|---|--------|-------------|
| 5 | `CertificateWalletScreen` | All certificates and badges |
| 6 | `CertificateDetailScreen` | Certificate info, QR code, verify button |
| 7 | `TranscriptScreen` | Academic transcript view |

### Competency & Portfolio

| # | Screen | Description |
|---|--------|-------------|
| 8 | `SkillMatrixScreen` | Student skill matrix with levels |
| 9 | `PortfolioScreen` | Portfolio items, upload, share |
| 10 | `CompetencyReportScreen` | Competency report with radar chart |

### Integrity

| # | Screen | Description |
|---|--------|-------------|
| 11 | `IntegrityDashboardScreen` | Integrity overview, recent violations |
| 12 | `PlagiarismReportScreen` | Plagiarism detection results |

### National Exam

| # | Screen | Description |
|---|--------|-------------|
| 13 | `ExamCenterScreen` | Find exam centers, seat availability |
| 14 | `RegistrationScreen` | National exam registration flow |
| 15 | `ResultsScreen` | National exam results, ranking |

## Mobile Config

From `packages/config/src/phase3-3-assessment.ts`:

```typescript
export const MOBILE_CONFIG = {
  OFFLINE_SYNC_ENABLED: true,
  PUSH_NOTIFICATION_ENABLED: true,
  BIOMETRIC_AUTH_ENABLED: true,
  CAMERA_CAPTURE_ENABLED: true,
  QR_SCANNER_ENABLED: true,
  FILE_DOWNLOAD_MAX_SIZE_MB: 50,
} as const;
```

## Offline Support

- Exam questions cached for offline access
- Auto-sync when connection restored
- Conflict resolution: server wins
- Max 10,000 offline entries
- Compression enabled for sync

## Key Features

- **QR Scanner**: Verify certificates on-the-go
- **Camera**: Capture evidence for portfolios
- **Biometric Auth**: Face ID / fingerprint for secure exam access
- **Push Notifications**: Exam reminders, result availability
- **Offline Mode**: Take exams without internet (cached questions)
