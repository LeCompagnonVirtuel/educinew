# Configuration — Phase 3.3 Assessment Engine

24 config sections in `packages/config/src/phase3-3-assessment.ts` (265 lines).

## Config Sections

| # | Config Object | Purpose | Key Values |
|---|--------------|---------|------------|
| 1 | `ASSESSMENT_ENGINE_CONFIG` | Core exam settings | MAX_QUESTIONS: 200, TIME_LIMIT: 180min, PASSING: 60, MAX_ATTEMPTS: 3 |
| 2 | `QUESTION_BANK_CONFIG` | Question bank limits | MAX_PER_CATEGORY: 5000, MAX_TAGS: 10, DIFFICULTY_LEVELS: 4, BLOOM_LEVELS: 6 |
| 3 | `CERTIFICATION_CONFIG` | Certificate settings | TYPES: 5, TEMPLATES: 4, LEVELS: 8, BADGE_TYPES: 4, BLOCKCHAIN: 4 networks |
| 4 | `COMPETENCY_ASSESSMENT_CONFIG` | Competency rules | TEST_TYPES: 3, PORTFOLIO_TYPES: 4, METHODS: 5, SKILL_LEVELS: 5, RUBRIC_MAX: 20 |
| 5 | `NATIONAL_EXAM_CONFIG` | National exam rules | TYPES: 6, CENTER_STATUSES: 4, REGISTRATION_DEADLINES: 3 tiers |
| 6 | `ACCREDITATION_CONFIG` | Accreditation rules | TYPES: 4, COMPLIANCE: 4, AUDIT_FREQ: 3, EVIDENCE_PER_STD: 5 |
| 7 | `INTEGRITY_CONFIG` | Integrity thresholds | PLAGIARISM: 0.2, AI_DETECTION: 0.85, IDENTITY_METHODS: 4 |
| 8 | `PORTFOLIO_CONFIG` | Portfolio settings | TYPES: 5, VISIBILITY: 4, MAX_ITEMS: 500, FILE_TYPES: 9, MAX_SIZE: 100MB |
| 9 | `RESEARCH_CONFIG` | Research settings | PROJECT_STATUSES: 7, PUBLICATION_TYPES: 6, GRANT_STATUSES: 7 |
| 10 | `INTERNATIONAL_CONFIG` | International standards | EXAM_TYPES: 4, CREDIT_SYSTEMS: 4, RECOGNITION: 5, COUNTRY_RULES: 7 |
| 11 | `AI_ASSESSMENT_CONFIG` | AI features | FEEDBACK_TYPES: 4, PREDICTION_MODELS: 4, MODERATION: 4, RISK_WEIGHTS |
| 12 | `GRADING_CONFIG` | Grading rules | GRADE_SCALES: 5, METHODS: 5, RUBRIC_LEVELS: 5, AUTO_CONFIDENCE: 0.9 |
| 13 | `EXAM_SESSION_CONFIG` | Session management | TIMEOUT: 30min, MAX_CONCURRENT: 5, HEARTBEAT: 30s, AUTO_SAVE: 60s |
| 14 | `PROCTORING_CONFIG` | Proctoring settings | MODES: 4, FACE_MODEL: YOLO_V8, EYE_TRACKING: 0.8, SCREEN_QUALITY: 720P |
| 15 | `CORRECTION_CONFIG` | Correction settings | DOUBLE_MARKING_TOLERANCE: 10%, MODERATION_RATE: 0.15, WORKLOAD_MAX: 100 |
| 16 | `RESULTS_CONFIG` | Results publishing | METHODS: 4, RANKING: 4, RETENTION: 60 months, NOTIFICATIONS: 4 |
| 17 | `DOCUMENT_CONFIG` | Document processing | PDF_ENGINE: PUPPETEER, IMAGE_MAX: 10MB, VIDEO_MAX: 1hr, OCR: TESSERACT |
| 18 | `SECURITY_CONFIG` | Security settings | ENCRYPTION: AES-256-GCM, RETENTION: 10yr, AUDIT: 2555 days, RATE_LIMIT: 100/min |
| 19 | `OFFLINE_CONFIG` | Offline sync | SYNC_INTERVAL: 5min, MAX_ENTRIES: 10000, CONFLICT: SERVER_WINS, STORAGE: 500MB |
| 20 | `NOTIFICATION_CONFIG` | Notifications | TEMPLATES: 6, SMS: true, PUSH: true, BATCH_SIZE: 100, QUIET_HOURS: true |
| 21 | `REPORT_CONFIG` | Reports | TYPES: 5, SCHEDULED: 5, RETENTION: 365 days, FORMATS: 4, MAX_ROWS: 100000 |
| 22 | `ANALYTICS_CONFIG` | Analytics | REFRESH: 300s, AGGREGATION: 3600s, REAL_TIME: true, RETENTION: 5yr |
| 23 | `API_CONFIG` | API settings | RATE_LIMIT: 60/min, MAX_PAGE: 200, DEFAULT_PAGE: 20, FILTER_OPS: 8 |
| 24 | `MOBILE_CONFIG` | Mobile features | OFFLINE: true, PUSH: true, BIOMETRIC: true, CAMERA: true, QR: true |

## Usage

```typescript
import { ASSESSMENT_ENGINE_CONFIG, CERTIFICATION_CONFIG } from '@educi/config';

// In service
if (attemptCount >= ASSESSMENT_ENGINE_CONFIG.MAX_ATTEMPTS) {
  throw new Error('Max attempts reached');
}

// In validator
if (!CERTIFICATION_CONFIG.CERTIFICATE_TYPES.includes(type)) {
  throw new Error('Invalid certificate type');
}
```

## Environment Overrides

Some configs can be overridden via environment variables:

```typescript
export const getAssessmentConfig = () => ({
  ...ASSESSMENT_ENGINE_CONFIG,
  MAX_ATTEMPTS: parseInt(process.env.MAX_ATTEMPTS || String(ASSESSMENT_ENGINE_CONFIG.MAX_ATTEMPTS)),
});
```
