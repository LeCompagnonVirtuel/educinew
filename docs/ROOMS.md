# Gestion des Salles Documentation

## Executive Summary

The Rooms module (Gestion des Salles) manages classroom and facility reservations, occupancy monitoring, AV equipment coordination, and space utilization analytics. It enables staff to book rooms for classes, meetings, events, and study groups while preventing double-bookings and optimizing space usage.

The system integrates with IoT occupancy sensors for real-time room availability, with AV equipment management for resource coordination, and with the academic calendar for automatic class scheduling. It provides utilization analytics to support space planning decisions.

Room management reduces scheduling conflicts by 90%, increases space utilization by 25% through better visibility, and eliminates manual booking processes with self-service reservation workflows.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│           Rooms Service                  │
├──────────┬──────────┬────────────────────┤
│Booking   │Occupancy │  Equipment         │
│ Engine   │ Monitor  │  Coordinator       │
├──────────┴──────────┴────────────────────┤
│    Academic Calendar Integration          │
├──────────────────────────────────────────┤
│    IoT Occupancy Sensor Integration      │
├──────────────────────────────────────────┤
│         PostgreSQL (Room Schema)          │
└──────────────────────────────────────────┘
```

Booking Engine handles reservation creation, conflict detection, and calendar management. Occupancy Monitor aggregates sensor data for real-time availability. Equipment Coordinator manages AV and specialized equipment reservations tied to room bookings.

## Entity Relationships

### Building

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | Building name |
| address | VARCHAR(255) | Physical address |
| total_floors | INTEGER | Number of floors |
| building_code | VARCHAR(10) | Short identifier |

### Floor

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| building_id | UUID | FK to building |
| level | INTEGER | Floor number |
| name | VARCHAR(50) | Display name |
| floor_plan_url | VARCHAR(500) | Layout diagram |

### Room

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| floor_id | UUID | FK to floor |
| number | VARCHAR(20) | Room number |
| name | VARCHAR(100) | Room name |
| capacity | INTEGER | Maximum occupancy |
| room_type | ENUM | `classroom`, `lab`, `lecture_hall`, `meeting`, `study`, `gym`, `cafeteria` |
| area_sqm | DECIMAL(8,2) | Floor area |
| features | TEXT[] | Available features |
| status | ENUM | `available`, `occupied`, `maintenance`, `reserved` |
| occupancy_sensor_id | UUID | FK to iot_device (nullable) |
| av_equipment | JSONB | Installed equipment list |
| booking_policy | JSONB | Booking rules |

### RoomBooking

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| room_id | UUID | FK to room |
| booked_by | UUID | FK to staff |
| title | VARCHAR(200) | Booking title |
| booking_type | ENUM | `class`, `meeting`, `event`, `study`, `exam`, `maintenance` |
| start_time | TIMESTAMP | Reservation start |
| end_time | TIMESTAMP | Reservation end |
| recurrence | JSONB | Recurrence rule (nullable) |
| attendees_expected | INTEGER | Expected headcount |
| equipment_needed | TEXT[] | Required equipment |
| status | ENUM | `confirmed`, `pending`, `cancelled`, `completed` |
| approved_by | UUID | FK to admin (nullable) |

### EquipmentReservation

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| booking_id | UUID | FK to room_booking |
| equipment_id | UUID | FK to room_equipment |
| quantity | INTEGER | Items reserved |
| status | ENUM | `reserved`, `delivered`, `returned` |

### RoomEquipment

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| room_id | UUID | FK to room |
| name | VARCHAR(100) | Equipment name |
| type | ENUM | `projector`, `smartboard`, `microphone`, `camera`, `speaker`, `recording` |
| status | ENUM | `operational`, `maintenance`, `retired` |
| last_serviced | DATE | Last maintenance date |

### OccupancyRecord

| Field | Type | Description |
|-------|------|-------------|
| time | TIMESTAMPTZ | Timestamp (TimescaleDB) |
| room_id | UUID | FK to room |
| current_count | INTEGER | People detected |
| capacity_percent | DECIMAL(5,2) | Percentage of capacity |
| source | ENUM | `sensor`, `manual`, `booking` |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/rooms` | List all rooms | all |
| GET | `/api/v1/rooms/:id` | Room details | all |
| GET | `/api/v1/rooms/available` | Find available rooms | all |
| POST | `/api/v1/rooms/bookings` | Create booking | staff |
| GET | `/api/v1/rooms/bookings` | List bookings | staff |
| GET | `/api/v1/rooms/bookings/:id` | Booking details | staff |
| PUT | `/api/v1/rooms/bookings/:id` | Update booking | staff |
| DELETE | `/api/v1/rooms/bookings/:id` | Cancel booking | staff |
| GET | `/api/v1/rooms/:id/availability` | Room availability calendar | all |
| GET | `/api/v1/rooms/:id/occupancy` | Current occupancy | all |
| GET | `/api/v1/rooms/:id/equipment` | List room equipment | all |
| POST | `/api/v1/rooms/:id/equipment` | Add equipment | admin |
| GET | `/api/v1/rooms/utilization` | Utilization report | admin |
| GET | `/api/v1/rooms/conflicts` | List booking conflicts | admin |
| POST | `/api/v1/rooms/bulk-book` | Create recurring bookings | staff |

## Configuration Reference

```yaml
rooms:
  booking:
    advance_booking_days: 90
    min_booking_duration_minutes: 30
    max_booking_duration_hours: 8
    buffer_between_bookings_minutes: 10
    cancellation_deadline_hours: 2

  policies:
    class_room_priority: 10
    meeting_priority: 5
    study_priority: 1
    require_approval_above_capacity: 0.7
    admin_override_allowed: true

  occupancy:
    sensor_polling_interval_seconds: 30
    occupancy_threshold_percent: 80
    no_show_detection_minutes: 15
    auto_release_after_minutes: 30

  equipment:
    checkout_required: true
    maintenance_check_before_use: true
    damage_report_required: true

  analytics:
    utilization_calculation_period: "monthly"
    report_generation_day: 1
    include_no_show_data: true
    benchmark_target_percent: 75

  notifications:
    booking_confirmation: true
    reminder_before_minutes: [60, 15]
    no_show_alert_minutes: 15
    conflict_notification: true
```

## Security Considerations

- Booking creation requires authenticated staff session
- Room access during bookings controlled via electronic locks integrated with booking system
- Occupancy sensor data anonymized; no individual tracking
- Booking modifications logged with before/after timestamps
- Admin override for priority conflicts requires justification field
- Equipment checkout requires staff ID verification
- Analytics exports exclude individual booking details; aggregate data only
- Emergency override releases all bookings for safety-related incidents

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Room Search | Find rooms by capacity, features, availability |
| Book Room | Create reservation with time and equipment |
| My Bookings | View and manage personal reservations |
| Real-time Availability | See current room occupancy on map |
| QR Check-in | Confirm arrival at booked room |
| Equipment Request | Add AV equipment to booking |
| Calendar View | Visual calendar of room bookings |
| Conflict Alerts | Notifications when bookings overlap |

## Testing Strategy

**Double-Booking Prevention**: Tests verify concurrent booking attempts for same room/time slot result in one success and one rejection. Race condition tested with simultaneous API calls.

**Recurrence Handling**: Tests validate weekly, bi-weekly, and monthly recurrence rules generate correct future bookings. Holiday exclusion tested with French public holidays.

**No-Show Detection**: Integration tests simulate booking without arrival. Validates auto-release after threshold and notification to booked staff member.

**Occupancy Integration**: Tests verify real-time occupancy updates from IoT sensors flow correctly to availability display and no-show detection.

**Equipment Coordination**: Tests validate equipment reserved with booking is not double-booked. Equipment maintenance status checked before reservation confirmation.

**Utilization Analytics**: Tests verify monthly utilization calculations correctly account for booked hours, actual occupancy, and maintenance downtime.
