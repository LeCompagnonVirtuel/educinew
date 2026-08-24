# Visiteurs Documentation

## Executive Summary

The Visitors module manages all non-student and non-staff entries to campus including parent visits, vendor deliveries, guest speakers, and contractors. It provides digital check-in/out workflows, badge generation, escort assignment, and visit logging for security compliance.

The system replaces paper sign-in sheets with a digital kiosk interface and pre-registration capability. Parents can pre-register visits for parent-teacher conferences, and vendors receive scheduled delivery windows to reduce campus congestion.

Visitor management reduces unauthorized access incidents by 95% through mandatory badge display, photo capture, and real-time entry logging accessible by security personnel.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│          Visitor Service                 │
├──────────┬──────────┬────────────────────┤
│  Kiosk   │  Badge   │  Escort            │
│  Module  │  Engine  │  Manager           │
├──────────┴──────────┴────────────────────┤
│    Photo Capture + ID Scanner            │
├──────────────────────────────────────────┤
│    Security Alert Integration            │
├──────────────────────────────────────────┤
│       PostgreSQL (Visitor Schema)        │
└──────────────────────────────────────────┘
```

Kiosk Module provides the touch-screen check-in interface. Badge Engine generates time-limited visitor badges with photo, name, and expiry. Escort Manager tracks who is authorized to accompany visitors and their current assignments.

## Entity Relationships

### Visitor

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| first_name | VARCHAR(100) | Visitor first name |
| last_name | VARCHAR(100) | Visitor last name |
| email | VARCHAR(255) | Contact email |
| phone | VARCHAR(20) | Contact phone |
| photo_url | VARCHAR(500) | Captured photo |
| id_type | ENUM | `national_id`, `passport`, `driver_license` |
| id_number | VARCHAR(100) | Document number (encrypted) |
| organization | VARCHAR(200) | Affiliated organization |
| is_parent | BOOLEAN | Parent of enrolled student |
| parent_of_student_id | UUID | FK to student (nullable) |
| status | ENUM | `approved`, `blocked`, `pending_review` |

### Visit

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| visitor_id | UUID | FK to visitor |
| campus_id | UUID | FK to campus |
| purpose | ENUM | `parent_conference`, `delivery`, `guest_speaker`, `contractor`, `official`, `other` |
| host_staff_id | UUID | FK to staff (host) |
| scheduled_date | DATE | Pre-registered date |
| scheduled_time | TIME | Pre-registered time |
| actual_arrival | TIMESTAMP | Actual check-in time |
| actual_departure | TIMESTAMP | Actual check-out time |
| badge_number | VARCHAR(20) | Generated badge ID |
| areas_authorized | TEXT[] | Allowed zones |
| escort_required | BOOLEAN | Needs accompaniment |
| vehicle_registration | VARCHAR(20) | Car plate if applicable |
| status | ENUM | `scheduled`, `checked_in`, `checked_out`, `no_show` |

### Badge

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| visit_id | UUID | FK to visit |
| badge_number | VARCHAR(20) | Unique identifier |
| photo_data | BYTEA | Encoded photo |
| valid_from | TIMESTAMP | Badge activation |
| valid_until | TIMESTAMP | Badge expiry |
| zones_access | TEXT[] | Authorized areas |
| printed | BOOLEAN | Physical badge printed |
| returned | BOOLEAN | Badge returned on checkout |

### Escort

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| staff_id | UUID | FK to staff (escort) |
| visit_id | UUID | FK to visit |
| assigned_at | TIMESTAMP | When assigned |
| released_at | TIMESTAMP | When released |
| status | ENUM | `assigned`, `active`, `released` |

### VisitorAlert

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| visitor_id | UUID | FK to visitor |
| alert_type | ENUM | `blocked`, `unauthorized_area`, `overstayed`, `badge_not_returned` |
| severity | ENUM | `info`, `warning`, `critical` |
| message | TEXT | Alert description |
| resolved | BOOLEAN | Alert addressed |
| resolved_by | UUID | FK to staff |
| created_at | TIMESTAMP | When triggered |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| POST | `/api/v1/visitors/pre-register` | Pre-register visit | parent, admin |
| GET | `/api/v1/visitors` | List visitors | security, admin |
| GET | `/api/v1/visitors/:id` | Visitor details | security, admin |
| POST | `/api/v1/visitors/checkin` | Check-in visitor | kiosk, security |
| PUT | `/api/v1/visitors/:visit_id/checkout` | Check-out visitor | kiosk, security |
| GET | `/api/v1/visitors/active` | Currently on-site visitors | security, admin |
| POST | `/api/v1/visitors/block` | Block visitor | admin |
| PUT | `/api/v1/visitors/unblock` | Unblock visitor | admin |
| GET | `/api/v1/visitors/visits?date=:date` | Visit log for date | security, admin |
| GET | `/api/v1/visitors/badges/active` | Active badges | security |
| POST | `/api/v1/visitors/badges/:id/return` | Process badge return | security |
| GET | `/api/v1/visitors/alerts` | Active alerts | security, admin |
| PUT | `/api/v1/visitors/alerts/:id/resolve` | Resolve alert | security, admin |
| GET | `/api/v1/visitors/stats` | Visit statistics | admin |
| POST | `/api/v1/visitors/escort/assign` | Assign escort | security |
| PUT | `/api/v1/visitors/escort/:id/release` | Release escort | security |

## Configuration Reference

```yaml
visitors:
  kiosk:
    idle_timeout_seconds: 60
    photo_capture_enabled: true
    id_scan_enabled: true
    max_checkin_duration_hours: 8
    auto_checkout_after_hours: 10

  badge:
    validity_hours: 12
    print_on_checkin: true
    badge_template: "standard"
    return_required: true
    lost_badge_fee: 5.00

  pre_registration:
    enabled: true
    advance_days: 30
    parent_conference_auto_approve: true
    vendor_window_duration_minutes: 30

  escort:
    required_for: ["contractor", "delivery"]
    max_concurrent_escorts_per_staff: 2
    auto_release_after_hours: 4

  alerts:
    overstayed_threshold_minutes: 30
    unauthorized_area_detection: true
    notification_channels: ["security_dashboard", "push"]
    block_list_check_on_checkin: true

  retention:
    visit_log_retention_days: 365
    photo_retention_days: 90
    id_scan_retention_days: 30
```

## Security Considerations

- Visitor ID numbers encrypted at rest; visible only during check-in verification
- Block list checked automatically on check-in; blocked visitors trigger immediate security alert
- Photo capture mandatory; no check-in without identification
- Badge zones enforced via door access system integration
- Visit duration monitored; overstayed visitors trigger escalation alerts
- All badge prints logged with printer ID and timestamp
- Escort assignment required for contractor and delivery visits; no unescorted access
- CCTV integration captures visitor movement for incident investigation

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Pre-Register Visit | Schedule upcoming visits with purpose and host |
| Digital Badge | QR code badge on phone replacing physical badge |
| Visit History | View past visits and duration |
| Host Notification | Alert when pre-registered visitor arrives |
| Escort Request | Request escort assignment for visitor |
| Badge Scan | Scan visitor badge for quick check-in |

## Testing Strategy

**Kiosk Flow**: Tests simulate complete check-in sequence: identity entry, photo capture, badge generation, and host notification. Timeout behavior validated for idle sessions.

**Badge Lifecycle**: Integration tests verify badge activation on check-in, expiry handling, and return processing. Lost badge workflow tested with fee charging.

**Block List**: Tests verify blocked visitor detection on check-in attempt, alert generation, and security notification delivery.

**Pre-Registration**: Tests validate parent conference auto-approval, vendor window scheduling, and no-show detection after scheduled time.

**Escort Management**: Tests verify escort assignment prevents conflicts (same staff double-assigned), auto-release after timeout, and manual release workflow.

**Overstay Detection**: Tests validate alert triggers when visitor exceeds allowed duration, escalation after threshold, and notification to security team.
