# Internat Documentation

## Executive Summary

The Boarding module (Internat) manages residential student life including room allocation, bed assignments, supervision schedules, evening check-in, and weekend activities. It provides boarding staff with tools for daily operations while giving parents visibility into their child's residential experience.

The system handles the complete boarding lifecycle from enrollment through room assignment, daily routines, disciplinary tracking, and departure. It integrates with attendance for check-in verification and with transport for weekend departure/return logistics.

Boarding operations benefit from digitized room inspection checklists, automated curfew compliance tracking, and activity scheduling that integrates with the academic calendar.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│           Boarding Service               │
├──────────┬──────────┬────────────────────┤
│   Room   │Supervision│  Activity         │
│ Manager  │  Engine   │  Planner          │
├──────────┴──────────┴────────────────────┤
│    Attendance Integration                │
│    (Check-in / Check-out Events)         │
├──────────────────────────────────────────┤
│    Transport Integration                 │
│    (Weekend Departure Coordination)      │
├──────────────────────────────────────────┤
│          PostgreSQL (Boarding Schema)     │
└──────────────────────────────────────────┘
```

Room Manager handles bed assignments, room inspections, and occupancy tracking. Supervision Engine manages duty rosters, evening rounds, and incident escalation. Activity Planner schedules weekend and evening activities with resource allocation.

## Entity Relationships

### BoardingHouse

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | House name |
| capacity | INTEGER | Total bed capacity |
| gender | ENUM | `male`, `female`, `mixed` |
| age_range | JSONB | Min/max student age |
| house_parent_id | UUID | FK to staff (house parent) |
| common_areas | JSONB | Shared facility list |

### BoardingRoom

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| house_id | UUID | FK to boarding_house |
| number | VARCHAR(10) | Room number |
| floor | INTEGER | Floor level |
| capacity | INTEGER | Max occupants (1-4) |
| en_suite | BOOLEAN | Private bathroom |
| accessible | BOOLEAN | Wheelchair accessible |
| status | ENUM | `available`, `full`, `maintenance` |

### Bed

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| room_id | UUID | FK to boarding_room |
| label | VARCHAR(10) | Bed identifier (A, B, C, D) |
| position | ENUM | `lower`, `upper`, `single` |
| student_id | UUID | FK to student (nullable) |
| assignment_start | DATE | Allocation start date |
| assignment_end | DATE | Allocation end date |

### SupervisionShift

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| house_id | UUID | FK to boarding_house |
| staff_id | UUID | FK to staff |
| shift_type | ENUM | `evening`, `night`, `weekend` |
| start_time | TIMESTAMP | Shift start |
| end_time | TIMESTAMP | Shift end |
| responsibilities | TEXT[] | Duties list |

### EveningCheckIn

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| student_id | UUID | FK to student |
| date | DATE | Check-in date |
| check_in_time | TIMESTAMP | When checked in |
| method | ENUM | `rfid`, `manual`, `app` |
| location | VARCHAR(50) | Check-in location |
| supervisor_id | UUID | FK to staff verifying |

### RoomInspection

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| room_id | UUID | FK to boarding_room |
| inspector_id | UUID | FK to staff |
| inspection_date | DATE | When inspected |
| cleanliness_score | INTEGER | 1-10 rating |
| items_checked | JSONB | Checklist responses |
| issues_found | TEXT[] | Problem descriptions |
| follow_up_required | BOOLEAN | Needs re-inspection |

### WeekendActivity

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| house_id | UUID | FK to boarding_house |
| name | VARCHAR(200) | Activity name |
| date | DATE | Activity date |
| start_time | TIME | Start time |
| end_time | TIME | End time |
| location | VARCHAR(100) | Where held |
| max_participants | INTEGER | Capacity limit |
| supervisor_id | UUID | FK to staff |
| status | ENUM | `scheduled`, `ongoing`, `completed`, `cancelled` |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/boarding/houses` | List boarding houses | admin, house_parent |
| POST | `/api/v1/boarding/houses` | Create boarding house | admin |
| GET | `/api/v1/boarding/houses/:id` | House details | admin, house_parent |
| GET | `/api/v1/boarding/rooms?house=:id` | List rooms in house | admin, house_parent |
| POST | `/api/v1/boarding/rooms` | Create room | admin |
| GET | `/api/v1/boarding/rooms/:id/occupancy` | Room occupancy status | admin, house_parent |
| POST | `/api/v1/boarding/beds/assign` | Assign student to bed | admin |
| DELETE | `/api/v1/boarding/beds/:id/assign` | Remove student from bed | admin |
| POST | `/api/v1/boarding/checkin` | Student evening check-in | supervisor |
| GET | `/api/v1/boarding/checkin?date=:date` | Check-in status report | supervisor, admin |
| GET | `/api/v1/boarding/checkin/missing` | Students not checked in | supervisor |
| GET | `/api/v1/boarding/inspections` | List inspections | admin, house_parent |
| POST | `/api/v1/boarding/inspections` | Create room inspection | house_parent |
| GET | `/api/v1/boarding/activities` | List weekend activities | all |
| POST | `/api/v1/boarding/activities` | Create activity | house_parent, admin |
| POST | `/api/v1/boarding/activities/:id/enroll` | Enroll student in activity | student |
| GET | `/api/v1/boarding/supervision/roster` | View duty roster | supervisor, admin |
| GET | `/api/v1/boarding/dashboard` | Boarding overview | admin, house_parent |

## Configuration Reference

```yaml
boarding:
  checkin:
    curfew_time: "21:30"
    grace_period_minutes: 15
    late_checkin_notification: true
    methods: ["rfid", "manual", "app"]
    auto_checkout_time: "07:00"

  supervision:
    shift_duration_hours: 8
    max_consecutive_nights: 3
    min_staff_per_shift: 2
    round_interval_minutes: 60

  inspection:
    frequency: "daily"
    checklist_template: "standard"
    score_threshold_for_followup: 5
    photo_evidence_required: false

  activities:
    max_weekly_per_student: 3
    sign_up_deadline_hours: 24
    cancellation_penalty: false

  weekends:
    departure_day: "friday"
    departure_time: "16:00"
    return_day: "sunday"
    return_time: "19:00"
    transport_coordination: true

  privacy:
    room_assignments_visible_to: ["house_parent", "admin"]
    inspection_photos_retention_days: 90
    incident_reports_parent_notification: true
```

## Security Considerations

- Room assignments accessible only to house parents and administrators
- Evening check-in data immutable once recorded; overrides require admin approval
- Inspection records linked to staff ID for accountability
- Student location within boarding house tracked via RFID during supervised hours only
- Weekend departure requires parent authorization recorded in system
- Emergency lockdown protocol sends mass notification to all boarders simultaneously
- CCTV in common areas with 30-day retention; no cameras in rooms or bathrooms

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Check-In | RFID or app-based evening check-in |
| Room Details | View room assignment and roommate info |
| Activity Calendar | Browse and enroll in weekend activities |
| Inspection Results | View personal room inspection scores |
| Curfew Status | Real-time countdown to curfew |
| Weekend Departure | Request departure, view transport schedule |
| House Notices | Read announcements from house parent |
| Emergency Contacts | Quick access to house parent and emergency numbers |

## Testing Strategy

**Room Allocation**: Tests validate assignment prevents double-booking, respects gender/age constraints, and handles room swaps correctly.

**Check-In Flow**: Integration tests simulate RFID check-in at multiple readers simultaneously. Validates duplicate check-in prevention and late check-in flagging.

**Supervision Roster**: Tests verify roster generation respects shift limits, minimum staffing, and staff availability preferences.

**Inspection Checklist**: Tests validate checklist scoring, issue aggregation, and follow-up requirement detection.

**Weekend Coordination**: End-to-end tests verify departure request triggers transport booking, parent notification, and student status update.

**Emergency Lockdown**: Critical path test validates mass notification reaches all boarders within 60 seconds and lockdown status reflected on dashboard.
