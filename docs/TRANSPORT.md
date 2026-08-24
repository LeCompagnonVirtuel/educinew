# Transport Scolaire Documentation

## Executive Summary

The Transport module manages all school transportation operations including route planning, vehicle tracking, student assignments, and parent notifications. It integrates with GPS hardware for real-time location monitoring, calculates accurate ETAs, and provides parents with live visibility into their child's commute.

The system optimizes routes based on student addresses, traffic patterns, and school schedules. It handles multi-stop routes with configurable pickup/drop-off sequences and supports special needs transportation with accessibility requirements.

Transport reduces parent anxiety through transparent tracking, cuts fuel costs by 15% through route optimization, and eliminates manual attendance with automated RFID-based boarding confirmation.

## Architecture Overview

```
┌──────────────────────────────────────┐
│         Transport Service            │
├──────────┬──────────┬────────────────┤
│  Route   │ Vehicle  │   Trip         │
│  Engine  │ Tracker  │   Manager      │
├──────────┴──────────┴────────────────┤
│         GPS Provider Adapter         │
│   (GPSOne / Teltonika / Custom)     │
├──────────────────────────────────────┤
│      TimescaleDB (Location History)  │
└──────────────────────────────────────┘
```

Route Engine computes optimal stop sequences using a modified traveling salesman heuristic. Vehicle Tracker maintains persistent WebSocket connections to GPS hardware and publishes location events every 10 seconds. Trip Manager orchestrates scheduled trips, handles delays, and triggers parent notifications.

## Entity Relationships

### TransportRoute

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | Route display name |
| direction | ENUM | `pickup` or `dropoff` |
| color | VARCHAR(7) | Map display color (hex) |
| estimated_duration_min | INTEGER | Average trip duration |
| max_capacity | INTEGER | Maximum students |
| stops | JSONB | Ordered stop list |

### TransportStop

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| route_id | UUID | FK to route |
| name | VARCHAR(100) | Stop name |
| latitude | DECIMAL(10,8) | GPS latitude |
| longitude | DECIMAL(11,8) | GPS longitude |
| sequence | INTEGER | Order on route |
| arrival_offset_min | INTEGER | Minutes from first stop |
| students_expected | INTEGER | Count of assigned students |

### Vehicle

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| license_plate | VARCHAR(20) | Unique identifier |
| capacity | INTEGER | Passenger capacity |
| type | ENUM | `bus`, `minibus`, `van` |
| gps_device_id | VARCHAR(50) | Linked IoT device |
| status | ENUM | `active`, `maintenance`, `retired` |
| fuel_type | ENUM | `diesel`, `electric`, `hybrid` |

### Trip

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| route_id | UUID | FK to route |
| vehicle_id | UUID | FK to vehicle |
| driver_id | UUID | FK to staff |
| date | DATE | Trip date |
| scheduled_departure | TIME | Planned start |
| actual_departure | TIME | Actual start |
| status | ENUM | `scheduled`, `in_progress`, `completed`, `cancelled` |

### StudentAssignment

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| student_id | UUID | FK to student |
| route_id | UUID | FK to route |
| stop_id | UUID | FK to stop |
| direction | ENUM | `pickup` or `dropoff` |
| school_year | VARCHAR(9) | e.g., "2025-2026" |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/transport/routes` | List routes with stops | admin, transport_manager |
| POST | `/api/v1/transport/routes` | Create route | admin |
| PUT | `/api/v1/transport/routes/:id` | Update route | admin |
| DELETE | `/api/v1/transport/routes/:id` | Soft delete route | admin |
| POST | `/api/v1/transport/routes/:id/stops` | Add stop to route | transport_manager |
| GET | `/api/v1/transport/vehicles` | List vehicles | admin, driver |
| POST | `/api/v1/transport/vehicles` | Register vehicle | admin |
| PUT | `/api/v1/transport/vehicles/:id` | Update vehicle | admin |
| GET | `/api/v1/transport/trips` | List trips (filtered by date) | admin, driver, parent |
| POST | `/api/v1/transport/trips` | Create scheduled trip | admin |
| PUT | `/api/v1/transport/trips/:id/start` | Start trip | driver |
| PUT | `/api/v1/transport/trips/:id/complete` | Complete trip | driver |
| POST | `/api/v1/transport/trips/:id/checkin` | Board student (RFID) | driver |
| GET | `/api/v1/transport/locations/live` | Live vehicle positions | parent, admin |
| GET | `/api/v1/transport/locations/:vehicle_id/history` | Location history | admin |
| POST | `/api/v1/transport/assignments` | Assign student to route | admin |
| GET | `/api/v1/transport/assignments?student=:id` | Student route info | parent |
| GET | `/api/v1/transport/eta/:trip_id` | Current ETA calculation | parent |

## Configuration Reference

```yaml
transport:
  gps_providers:
    - name: "gpsone"
      api_url: "https://api.gpsone.example.com"
      api_key: "${GPSONE_API_KEY}"
      polling_interval_seconds: 10

  route_optimization:
    enabled: true
    algorithm: "nearest_neighbor_tsp"
    max_stops_per_route: 50
    rebalance_interval_hours: 24

  notifications:
    parent_eta_alert_minutes: 5
    delay_threshold_minutes: 10
    channels: ["push", "sms"]
    quiet_hours: "22:00-06:00"

  rfid:
    device_type: "mifare_ultralight"
    checkin_timeout_seconds: 30
    duplicate_window_seconds: 300

  maintenance:
    inspection_interval_km: 5000
    oil_change_interval_km: 10000
    alert_before_days: 7
```

## Security Considerations

- Driver authentication via RFID badge plus PIN for trip start/end
- GPS data encrypted in transit (TLS 1.3) and at rest (AES-256)
- Parent access scoped to their children's assignments only via RLS
- Vehicle location history retained 90 days, then aggregated
- RFID check-in logs immutable once written (append-only table)
- Emergency vehicle immobilization requires dual-authorization
- API rate limiting: 100 requests/minute per user for location endpoints

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Live Bus Map | Real-time vehicle position on map with route overlay |
| ETA Display | Dynamic ETA updated every 10 seconds with traffic data |
| Boarding Alert | Push notification when child boards or exits bus |
| Route Details | View all stops, estimated times, and current progress |
| Delay Alerts | Automatic notification when vehicle is delayed > threshold |
| History | View past trips, actual routes taken, and check-in times |
| Emergency | One-tap contact driver or school administration |

## Testing Strategy

**GPS Simulation**: Mock GPS provider publishes scripted location sequences at configurable speeds and intervals. Tests validate ETA accuracy within 2-minute tolerance.

**Route Optimization**: Unit tests verify optimization algorithm produces routes within 10% of optimal for benchmark datasets of 10-50 stops.

**Concurrent Check-in**: Load test simulates 200 students checking in within 2-minute window at school arrival. Validates no duplicate entries and correct attendance records.

**Real-time WebSocket**: Integration test connects multiple WebSocket clients, publishes location updates, and verifies all clients receive updates within 2 seconds.

**Offline Resilience**: Driver app stores check-ins locally when offline; sync test validates conflict resolution when connectivity restores.

**GPS Device Integration**: Hardware-in-the-loop tests with Teltonika FMB devices validate correct parsing of NMEA sentences and command delivery.
