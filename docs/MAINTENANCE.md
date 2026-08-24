# Maintenance Documentation

## Executive Summary

The Maintenance module manages work orders, preventive maintenance schedules, vendor coordination, and facility repairs across all campus buildings. It provides a ticketing system for maintenance requests from staff and students, tracks repair progress, and ensures compliance with building safety regulations.

The system automates preventive maintenance scheduling based on asset type, usage patterns, and manufacturer recommendations. It manages vendor relationships including service level agreements, emergency response contracts, and cost tracking.

Maintenance reduces facility downtime by 35% through preventive scheduling, cuts emergency repair costs by 20% through early issue detection, and provides transparent reporting for facilities budget planning.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│         Maintenance Service              │
├──────────┬──────────┬────────────────────┤
│Work Order│Schedule  │  Vendor            │
│  Engine  │ Manager  │  Coordinator       │
├──────────┴──────────┴────────────────────┤
│    Asset Integration (Condition Data)     │
├──────────────────────────────────────────┤
│    IoT Sensor Integration (Predictive)   │
├──────────────────────────────────────────┤
│       PostgreSQL (Maintenance Schema)     │
└──────────────────────────────────────────┘
```

Work Order Engine handles request intake, prioritization, assignment, and tracking. Schedule Manager generates and manages preventive maintenance calendars. Vendor Coordinator manages contracts, purchase orders, and service quality metrics.

## Entity Relationships

### WorkOrder

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| title | VARCHAR(200) | Work order title |
| description | TEXT | Detailed issue description |
| category | ENUM | `plumbing`, `electrical`, `hvac`, `structural`, `it`, `general` |
| priority | ENUM | `low`, `medium`, `high`, `emergency` |
| reported_by | UUID | FK to staff/student |
| assigned_to | UUID | FK to staff (nullable) |
| vendor_id | UUID | FK to vendor (nullable) |
| location_id | UUID | FK to room |
| asset_id | UUID | FK to asset (nullable) |
| reported_date | TIMESTAMP | When reported |
| scheduled_date | DATE | Planned completion |
| completed_date | TIMESTAMP | Actual completion |
| estimated_cost | DECIMAL(10,2) | Cost estimate |
| actual_cost | DECIMAL(10,2) | Final cost |
| status | ENUM | `open`, `assigned`, `in_progress`, `waiting_parts`, `completed`, `closed` |
| photos | TEXT[] | Photo evidence URLs |

### MaintenanceSchedule

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| asset_id | UUID | FK to asset |
| maintenance_type | ENUM | `preventive`, `predictive`, `corrective` |
| frequency | VARCHAR(50) | `daily`, `weekly`, `monthly`, `quarterly`, `annual` |
| last_performed | TIMESTAMP | Previous execution |
| next_scheduled | TIMESTAMP | Next due date |
| instructions | TEXT | Step-by-step procedure |
| estimated_duration_min | INTEGER | Expected time |
| assigned_team | UUID[] | Staff IDs |

### Vendor

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(200) | Company name |
| contact_name | VARCHAR(200) | Primary contact |
| phone | VARCHAR(20) | Phone number |
| email | VARCHAR(255) | Contact email |
| specialties | TEXT[] | Service areas |
| sla_response_hours | INTEGER | Guaranteed response time |
| rating | DECIMAL(3,2) | Performance rating |
| contract_expiry | DATE | Agreement end date |
| status | ENUM | `active`, `suspended`, `inactive` |

### SparePart

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(200) | Part name |
| part_number | VARCHAR(50) | Manufacturer part number |
| category | VARCHAR(100) | Part category |
| stock_quantity | INTEGER | Current inventory |
| min_stock | INTEGER | Reorder threshold |
| unit_cost | DECIMAL(10,2) | Cost per unit |
| supplier_id | UUID | FK to vendor |
| location | VARCHAR(100) | Storage location |

### WorkOrderPart

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| work_order_id | UUID | FK to work_order |
| part_id | UUID | FK to spare_part |
| quantity_used | INTEGER | Parts consumed |
| unit_cost | DECIMAL(10,2) | Cost at time of use |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| POST | `/api/v1/maintenance/work-orders` | Submit work order | all |
| GET | `/api/v1/maintenance/work-orders` | List work orders | admin, facilities |
| GET | `/api/v1/maintenance/work-orders/:id` | Work order details | admin, facilities |
| PUT | `/api/v1/maintenance/work-orders/:id` | Update work order | admin, facilities |
| PUT | `/api/v1/maintenance/work-orders/:id/assign` | Assign technician | admin |
| PUT | `/api/v1/maintenance/work-orders/:id/complete` | Mark complete | technician |
| PUT | `/api/v1/maintenance/work-orders/:id/close` | Close work order | admin |
| GET | `/api/v1/maintenance/schedules` | List maintenance schedules | facilities |
| POST | `/api/v1/maintenance/schedules` | Create schedule | facilities |
| PUT | `/api/v1/maintenance/schedules/:id` | Update schedule | facilities |
| POST | `/api/v1/maintenance/schedules/:id/execute` | Record execution | technician |
| GET | `/api/v1/maintenance/vendors` | List vendors | admin |
| POST | `/api/v1/maintenance/vendors` | Add vendor | admin |
| GET | `/api/v1/maintenance/vendors/:id/performance` | Vendor metrics | admin |
| GET | `/api/v1/maintenance/spare-parts` | Inventory listing | facilities |
| POST | `/api/v1/maintenance/spare-parts` | Add spare part | facilities |
| POST | `/api/v1/maintenance/spare-parts/:id/reorder` | Trigger reorder | facilities |
| GET | `/api/v1/maintenance/dashboard` | Facilities dashboard | admin, facilities |

## Configuration Reference

```yaml
maintenance:
  work_orders:
    auto_assignment: true
    priority_rules:
      emergency: { response_hours: 1, completion_hours: 4 }
      high: { response_hours: 4, completion_hours: 24 }
      medium: { response_hours: 8, completion_hours: 72 }
      low: { response_hours: 24, completion_hours: 168 }

  scheduling:
    auto_generate_from_assets: true
    buffer_days_before_due: 3
    allow_overdue_days: 7
    blackout_hours: ["22:00-06:00"]

  vendors:
    performance_review_frequency: "quarterly"
    min_rating_to_maintain: 3.0
    emergency_contract_required: true

  spare_parts:
    auto_reorder_enabled: true
    lead_time_days: 7
    emergency_supplier: true

  notifications:
    request_confirmation: true
    assignment_alert: true
    completion_notification: true
    overdue_escalation_hours: 24
    channels: ["email", "push"]

  reporting:
    monthly_summary: true
    cost_by_category: true
    vendor_comparison: true
    predictive_analytics: true
```

## Security Considerations

- Work order submission requires authenticated session; anonymous reporting via security hotline only
- Emergency work orders bypass normal assignment queue and trigger immediate alerts
- Vendor access limited to assigned work orders; no browsing of other facilities data
- Financial data (costs, budgets) restricted to admin and finance roles
- Photo evidence stored in secure object storage with retention policy
- Maintenance schedule modifications logged with before/after timestamps
- Spare part inventory changes require transaction records for audit trail

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Submit Request | Report issue with photo and location |
| Track Status | View work order progress and updates |
| Technician View | Assigned work orders with completion form |
| Barcode Scan | Scan asset barcode to pre-fill work order |
| Photo Capture | Add evidence photos to work orders |
| Schedule View | See upcoming preventive maintenance |
| Parts Lookup | Check spare part availability |

## Testing Strategy

**Work Order Lifecycle**: Integration tests cover submission, assignment, progress update, completion, and closure. Edge cases include priority escalation and part availability blocks.

**Preventive Schedule**: Tests validate automatic work order generation from schedules, frequency calculations, and overdue detection.

**Vendor Performance**: Tests verify rating calculations based on response time, completion quality, and cost variance.

**Spare Part Management**: Tests validate inventory decrement on use, reorder trigger at threshold, and emergency procurement workflow.

**Priority Escalation**: Tests verify emergency response SLA tracking, automatic escalation at threshold, and notification delivery.

**Cost Tracking**: Tests validate cost aggregation by category, vendor, and time period for financial reporting accuracy.
