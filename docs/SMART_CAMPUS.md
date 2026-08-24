# Smart Campus Enterprise Overview

## Executive Summary

Phase 2.8 Smart Campus transforms EduCI into a comprehensive campus management platform integrating IoT sensors, real-time monitoring, and intelligent automation across all physical campus operations. The system connects transportation, library, cafeteria, medical, boarding, and security modules through a unified event bus, enabling proactive management and data-driven decisions.

Smart Campus serves as the operational backbone for physical campus infrastructure, bridging digital learning management with facility operations. It provides administrators with a single-pane-of-glass view of all campus activities, from bus GPS tracking to library occupancy, cafeteria meal planning, and environmental sensor readings.

The platform targets a 40% reduction in operational overhead through automated workflows, predictive maintenance, and centralized resource allocation. It supports multi-campus deployments with hierarchical permission models and real-time synchronization across geographically distributed facilities.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Smart Campus Core                    │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│Transport │ Library  │Cafeteria │ Medical  │  Boarding   │
│ Module   │ Module   │ Module   │ Module   │   Module    │
├──────────┴──────────┴──────────┴──────────┴─────────────┤
│              Event Bus (Redis Streams)                  │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ Security │  Assets  │Maintenance│  Rooms  │Environment  │
│ Module   │ Module   │  Module   │ Module  │   Module    │
├──────────┴──────────┴──────────┴──────────┴─────────────┤
│              IoT Gateway (MQTT / WebSocket)             │
├─────────────────────────────────────────────────────────┤
│            PostgreSQL + TimescaleDB (Time-series)       │
└─────────────────────────────────────────────────────────┘
```

Each module operates as an independent bounded context with its own database schema, API routes, and service layer. Cross-module communication flows through Redis Streams event bus, ensuring loose coupling and eventual consistency.

The IoT Gateway handles protocol translation from MQTT device messages to internal events. Sensor data is persisted in TimescaleDB hypertables for efficient time-series queries and aggregation.

## Entity Relationship Overview

```
Campus ─┬─ Building ─┬─ Floor ─┬─ Room
        │             │         └─ Sensor
        │             └─ Zone
        ├─ TransportRoute ─┬─ Vehicle
        │                   └─ Stop
        ├─ BoardingHouse ─┬─ Room ─┬─ Bed
        │                  └─ Student
        ├─ Library ─┬─ Collection ─┬─ Item
        │            └─ Loan
        ├─ Cafeteria ─┬─ MealPlan
        │              └─ Order
        └─ MedicalRecord ─┬─ Visit
                           └─ Prescription
```

Every entity references a `campus_id` for multi-tenant isolation. Audit trails link operations to `user_id` and `session_id` for compliance tracking.

## Module Descriptions

| Module | Purpose | Key Entities | Real-time Features |
|--------|---------|--------------|-------------------|
| Transport | Bus tracking, route optimization | Route, Vehicle, Stop, Trip | GPS live map, ETA updates |
| Library | Catalog, loans, reservations | Collection, Item, Loan, Reservation | Availability notifications |
| Cafeteria | Meal planning, orders, nutrition | MealPlan, Menu, Order, Allergy | Order status, capacity alerts |
| Medical | Health records, visits, vaccines | Patient, Visit, Prescription, Vaccine | Emergency alerts |
| Boarding | Room allocation, supervision | House, Room, Bed, Supervision | Night check-in status |
| Visitors | Check-in/out, badges, parents | Visitor, Visit, Badge, Escort | Entry/exit notifications |
| Assets | Equipment inventory, lifecycle | Asset, Category, MaintenanceLog | Depreciation alerts |
| Maintenance | Work orders, schedules, vendors | WorkOrder, Schedule, Vendor | SLA breach warnings |
| Rooms | Booking, utilization, AV | Room, Booking, Equipment | Occupancy sensors |
| Security | Incidents, cameras, access | Incident, Camera, AccessLog | Real-time alerts |
| Environment | Sensors, energy, air quality | Sensor, Reading, Alert, Threshold | Environmental dashboards |

## Configuration Reference

```yaml
# smart-campus.config.yml
campus:
  id: "campus-paris-01"
  name: "EduCI Paris Campus"
  timezone: "Europe/Paris"
  locale: "fr-FR"

modules:
  transport:
    enabled: true
    gps_polling_interval_seconds: 30
    route_cache_ttl: 3600
    max_stops_per_route: 50

  library:
    enabled: true
    max_loan_days: 14
    max_renewals: 3
    late_fee_per_day: 0.50

  cafeteria:
    enabled: true
    meal_buffer_minutes: 15
    capacity_alert_threshold: 0.85
    allergen_strict_mode: true

  medical:
    enabled: true
    record_retention_years: 10
    emergency_notification_channels: ["sms", "push"]
    vaccine_schedule_source: "who"

  boarding:
    enabled: true
    max_students_per_room: 4
    supervision_hours: "22:00-06:00"
    curfew_time: "21:30"

  security:
    enabled: true
    camera_retention_days: 30
    incident_auto_escalation_minutes: 15
    access_control_integration: "salto"

iot:
  mqtt_broker: "mqtt://iot.educi.local:1883"
  mqtt_topic_prefix: "educi/campus"
  sensor_polling_interval: 60
  data_retention_days: 365
  alert_cooldown_seconds: 300

events:
  bus: "redis"
  redis_url: "redis://localhost:6379"
  stream_max_length: 100000
  consumer_group: "smart-campus"
```

## Security Considerations

- **Data Isolation**: Each campus uses a PostgreSQL schema with Row-Level Security policies enforcing tenant isolation
- **IoT Device Authentication**: All sensors authenticate via X.509 certificates provisioned through the asset management module
- **API Authentication**: JWT tokens with campus-scoped claims; refresh tokens rotated every 7 days
- **Sensitive Data**: Medical records encrypted at rest using AES-256; access logged with justification fields
- **Network Segmentation**: IoT devices on isolated VLAN; MQTT traffic encrypted via TLS 1.3
- **Audit Trail**: All state changes logged with `user_id`, `timestamp`, `action`, and `previous_state`
- **RBAC Integration**: Campus modules respect the global permission model from Phase 2.1

## Mobile App Features

| Feature | iOS | Android | Description |
|---------|-----|---------|-------------|
| Live Bus Map | Yes | Yes | Real-time vehicle positions with ETA |
| QR Check-in | Yes | Yes | Scan QR at bus stops and library |
| Meal Ordering | Yes | Yes | Pre-order meals, allergen filters |
| Room Booking | Yes | Yes | Reserve study rooms and facilities |
| Visitor Pass | Yes | Yes | Generate visitor QR codes |
| Emergency Alert | Yes | Yes | One-tap SOS with GPS broadcast |
| Sensor Dashboard | Yes | Yes | View environmental readings |
| Push Notifications | Yes | Yes | Module-specific alert subscriptions |

## API Endpoint Reference

| Method | Endpoint | Module | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/campus/overview` | Core | Campus dashboard summary |
| GET | `/api/v1/campus/modules` | Core | List enabled modules |
| POST | `/api/v1/campus/alerts/subscribe` | Core | Subscribe to alert channel |
| GET | `/api/v1/campus/sensors` | Environment | List all sensors |
| GET | `/api/v1/campus/sensors/:id/readings` | Environment | Sensor time-series data |
| POST | `/api/v1/campus/iot/telemetry` | IoT | Ingest sensor telemetry |
| GET | `/api/v1/campus/events/stream` | Events | Server-sent events stream |
| GET | `/api/v1/campus/reports/summary` | Analytics | Aggregated campus report |

## Testing Strategy

**Unit Tests**: Each module service contains Jest test suites covering business logic, validation, and edge cases. Mock external dependencies (IoT gateway, GPS providers) using dependency injection.

**Integration Tests**: API route tests validate request/response contracts, authentication, and authorization. Database tests use transactional fixtures with automatic rollback.

**IoT Simulation**: A test harness publishes synthetic MQTT messages to validate sensor ingestion pipelines end-to-end. Device firmware updates tested in staging environment only.

**Performance Tests**: k6 scripts simulate peak loads: 500 concurrent cafeteria orders, 1000 GPS updates/minute, 200 library searches/second. Thresholds enforced in CI pipeline.

**E2E Tests**: Playwright scenarios cover critical user journeys: visitor check-in flow, bus tracking session, library loan lifecycle. Run nightly against staging campus.
