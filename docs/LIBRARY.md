# Bibliothèque Enterprise Documentation

## Executive Summary

The Library module provides a complete digital catalog management system with loan tracking, reservations, inter-library exchanges, and reading analytics. It supports barcode and QR code scanning for physical items, integrates with e-book platforms for digital lending, and generates reading habit reports for teachers and parents.

The system manages the full lifecycle of library materials from acquisition through cataloging, circulation, and eventual decommissioning. It handles student memberships, overdue notifications, fine calculation, and reading challenge gamification.

Library operations benefit from automated inventory management, reducing manual cataloging effort by 60%. Reading analytics provide teachers with insights into student literacy development across grade levels.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│            Library Service               │
├──────────┬──────────┬────────────────────┤
│ Catalog  │ Circulation│   Analytics      │
│ Manager  │  Engine   │   Engine          │
├──────────┴──────────┴────────────────────┤
│         Barcode / QR Scanner API         │
├──────────────────────────────────────────┤
│    E-book Provider Adapters              │
│    (OverDrive / Bibliotheca / Custom)    │
├──────────────────────────────────────────┤
│          PostgreSQL (Library Schema)      │
└──────────────────────────────────────────┘
```

Catalog Manager handles item metadata, classifications (Dewey Decimal or custom), and search indexing. Circulation Engine manages loans, returns, renewals, and reservations. Analytics Engine generates reading statistics and popular item reports.

## Entity Relationships

### Library

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | Library name |
| loan_policy | JSONB | Configurable loan rules |
| operating_hours | JSONB | Weekly schedule |
| max_concurrent_loans | INTEGER | Per-student limit |

### Collection

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| library_id | UUID | FK to library |
| name | VARCHAR(100) | Collection name (e.g., "Fiction") |
| classification_system | ENUM | `dewey`, `custom` |
| loan_duration_days | INTEGER | Default loan period |
| fine_per_day | DECIMAL(5,2) | Late return fine |

### LibraryItem

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| collection_id | UUID | FK to collection |
| isbn | VARCHAR(13) | ISBN or null |
| barcode | VARCHAR(50) | Unique physical barcode |
| title | VARCHAR(255) | Book title |
| author | VARCHAR(255) | Author name |
| publication_year | INTEGER | Year published |
| language | VARCHAR(10) | ISO 639-1 code |
| format | ENUM | `book`, `ebook`, `audiobook`, `dvd` |
| status | ENUM | `available`, `on_loan`, `reserved`, `damaged`, `retired` |
| location | VARCHAR(50) | Shelf/section code |
| metadata | JSONB | Additional fields |

### Loan

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| item_id | UUID | FK to library_item |
| student_id | UUID | FK to student |
| loan_date | TIMESTAMP | Checkout timestamp |
| due_date | TIMESTAMP | Expected return |
| return_date | TIMESTAMP | Actual return (null if active) |
| renewals_count | INTEGER | Times renewed |
| fine_amount | DECIMAL(7,2) | Accumulated fine |
| status | ENUM | `active`, `returned`, `overdue`, `lost` |

### Reservation

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| item_id | UUID | FK to library_item |
| student_id | UUID | FK to student |
| reservation_date | TIMESTAMP | When reserved |
| expiry_date | TIMESTAMP | Pickup deadline |
| status | ENUM | `pending`, `ready`, `fulfilled`, `expired` |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/library/search` | Full-text search catalog | all |
| GET | `/api/v1/library/items/:id` | Item details | all |
| POST | `/api/v1/library/items` | Add item to catalog | librarian |
| PUT | `/api/v1/library/items/:id` | Update item metadata | librarian |
| DELETE | `/api/v1/library/items/:id` | Retire item | librarian |
| POST | `/api/v1/library/items/:id/scan` | Check-in or check-out via barcode | librarian |
| POST | `/api/v1/library/loans` | Create loan | librarian |
| PUT | `/api/v1/library/loans/:id/return` | Process return | librarian |
| POST | `/api/v1/library/loans/:id/renew` | Renew loan | student, librarian |
| GET | `/api/v1/library/loans?student=:id` | Student's active loans | student, parent |
| GET | `/api/v1/library/overdue` | List overdue items | librarian |
| POST | `/api/v1/library/reservations` | Reserve item | student |
| DELETE | `/api/v1/library/reservations/:id` | Cancel reservation | student |
| GET | `/api/v1/library/stats/popular` | Popular items report | admin, librarian |
| GET | `/api/v1/library/stats/reading-habits` | Reading analytics | teacher, admin |
| GET | `/api/v1/library/inventory` | Full inventory report | librarian |

## Configuration Reference

```yaml
library:
  search:
    engine: "postgresql_full_text"
    min_score_threshold: 0.3
    max_results: 100
    fuzzy_matching: true

  loan:
    default_duration_days: 14
    max_renewals: 3
    max_concurrent_loans: 5
    reservation_expiry_hours: 72

  fines:
    enabled: true
    grace_period_days: 2
    max_fine_amount: 25.00
    payment_methods: ["cash", "online"]
    waiver_threshold_days: 30

  notifications:
    due_reminder_days: [3, 1]
    overdue_days: [1, 3, 7, 14]
    reservation_ready_hours: 24
    channels: ["push", "email"]

  inventory:
    auto_shelf_location: true
    barcode_format: "EAN13"
    rfid_enabled: false

  analytics:
    reading_goal_books_per_month: 2
    leaderboard_enabled: true
    grade_level_bands: true
```

## Security Considerations

- Student loan history visible only to the student, their parents, and librarians
- Search results exclude items flagged as restricted by age group
- Barcode scanning requires active librarian session with MFA
- Fine payment transactions PCI-DSS compliant via Stripe integration
- Item metadata modifications logged with before/after diffs
- E-book DRM handled by provider adapters; no local content storage
- Rate limiting: 30 searches/minute, 10 loans/minute per session

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Barcode Scanner | Scan item barcode for instant info and loan status |
| Search Catalog | Full-text search with filters for language, format, level |
| My Loans | View active loans, due dates, and renewal options |
| Reservations | Place and manage item reservations |
| Reading Log | Track personal reading with time and pages |
| Recommendations | AI-powered suggestions based on reading history |
| Overdue Alerts | Push notifications for approaching and past due dates |
| Reading Challenges | Participate in gamified reading goals |

## Testing Strategy

**Catalog Search**: Tests validate search relevance with 500-book seed dataset across multiple languages, formats, and metadata combinations. Fuzzy matching tolerance verified for common typos.

**Loan Lifecycle**: Integration tests cover complete lifecycle: checkout, renewal, overdue notification, return, and fine calculation. Edge cases include same-day checkout/return and item reported lost.

**Concurrent Reservations**: Race condition tests simulate two students reserving the last copy simultaneously. Validates FIFO queue and proper notification to second student.

**Barcode Processing**: Unit tests validate EAN-13 barcode generation and parsing. Integration test verifies scanner input flows correctly through API to loan creation.

**Fine Calculation**: Tests verify correct fine computation including grace periods, maximum caps, and holiday exclusions. Holiday calendar integration tested with French public holidays.

**Analytics Generation**: Tests validate reading habit aggregation correctly groups by grade level, time period, and genre. Performance test ensures report generation completes within 5 seconds for 10,000 loans.
