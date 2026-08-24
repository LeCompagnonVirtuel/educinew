# Gestion des Actifs Documentation

## Executive Summary

The Assets module (Gestion des Actifs) provides comprehensive lifecycle management for all campus physical assets including equipment, furniture, IT hardware, vehicles, and educational materials. It tracks asset location, condition, depreciation, maintenance history, and insurance coverage.

The system maintains a centralized inventory with barcode/QR code identification, enabling rapid stock-taking and loss prevention. It integrates with the Maintenance module for work order generation and with Finance for depreciation calculations and replacement budgeting.

Asset management reduces procurement costs through better utilization visibility, prevents unexpected equipment failures through proactive maintenance scheduling, and ensures insurance compliance with automated valuation updates.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│          Asset Service                   │
├──────────┬──────────┬────────────────────┤
│ Inventory│Lifecycle │  Procurement       │
│ Manager  │ Tracker  │  Module            │
├──────────┴──────────┴────────────────────┤
│    Barcode / RFID / QR Scanner API       │
├──────────────────────────────────────────┤
│    Maintenance Integration               │
│    Finance Integration (Depreciation)    │
├──────────────────────────────────────────┤
│         PostgreSQL (Asset Schema)        │
└──────────────────────────────────────────┘
```

Inventory Manager handles asset registration, location tracking, and stock-taking. Lifecycle Tracker manages condition assessments, depreciation calculations, and disposal workflows. Procurement Module handles purchase orders and vendor management.

## Entity Relationships

### AssetCategory

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | Category name |
| parent_category_id | UUID | FK to self (hierarchy) |
| depreciation_method | ENUM | `straight_line`, `declining_balance`, `none` |
| useful_life_years | INTEGER | Depreciation period |
| salvage_percent | DECIMAL(5,2) | Residual value percentage |

### Asset

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| category_id | UUID | FK to asset_category |
| campus_id | UUID | FK to campus |
| name | VARCHAR(200) | Asset name |
| description | TEXT | Detailed description |
| serial_number | VARCHAR(100) | Manufacturer serial |
| barcode | VARCHAR(50) | Internal barcode |
| purchase_date | DATE | Acquisition date |
| purchase_price | DECIMAL(12,2) | Original cost |
| current_value | DECIMAL(12,2) | Depreciated value |
| condition_status | ENUM | `new`, `good`, `fair`, `poor`, `decommissioned` |
| location_id | UUID | FK to room (nullable) |
| assigned_to_id | UUID | FK to staff (nullable) |
| warranty_expiry | DATE | Warranty end date |
| insurance_value | DECIMAL(12,2) | Insured amount |
| status | ENUM | `active`, `maintenance`, `retired`, `disposed` |
| metadata | JSONB | Additional properties |

### AssetTransfer

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| asset_id | UUID | FK to asset |
| from_location_id | UUID | FK to room |
| to_location_id | UUID | FK to room |
| transferred_by | UUID | FK to staff |
| transfer_date | TIMESTAMP | When transferred |
| reason | TEXT | Transfer justification |
| condition_at_transfer | ENUM | Condition when moved |

### AssetMaintenance

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| asset_id | UUID | FK to asset |
| maintenance_type | ENUM | `preventive`, `corrective`, `inspection` |
| scheduled_date | DATE | Planned maintenance |
| completed_date | DATE | Actual completion |
| vendor_id | UUID | FK to vendor (nullable) |
| cost | DECIMAL(10,2) | Maintenance cost |
| description | TEXT | Work performed |
| status | ENUM | `scheduled`, `in_progress`, `completed`, `cancelled` |

### ProcurementOrder

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| requested_by | UUID | FK to staff |
| approved_by | UUID | FK to admin (nullable) |
| order_date | DATE | When ordered |
| expected_delivery | DATE | Expected arrival |
| vendor_id | UUID | FK to vendor |
| items | JSONB | Ordered items with quantities |
| total_amount | DECIMAL(12,2) | Order total |
| status | ENUM | `draft`, `pending_approval`, `approved`, `ordered`, `delivered`, `cancelled` |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/assets` | List all assets | admin, asset_manager |
| POST | `/api/v1/assets` | Register new asset | asset_manager |
| GET | `/api/v1/assets/:id` | Asset details | admin, asset_manager |
| PUT | `/api/v1/assets/:id` | Update asset | asset_manager |
| POST | `/api/v1/assets/:id/transfer` | Transfer asset location | asset_manager |
| POST | `/api/v1/assets/:id/assign` | Assign to staff | admin |
| POST | `/api/v1/assets/:id/decommission` | Retire asset | admin |
| GET | `/api/v1/assets/scan/:barcode` | Lookup by barcode | all |
| GET | `/api/v1/assets/inventory` | Full inventory report | admin, asset_manager |
| POST | `/api/v1/assets/stock-take` | Submit stock-take results | asset_manager |
| GET | `/api/v1/assets/maintenance` | Maintenance schedule | asset_manager |
| POST | `/api/v1/assets/:id/maintenance` | Schedule maintenance | asset_manager |
| GET | `/api/v1/assets/procurement` | List procurement orders | admin, asset_manager |
| POST | `/api/v1/assets/procurement` | Create procurement order | asset_manager |
| PUT | `/api/v1/assets/procurement/:id/approve` | Approve procurement | admin |
| GET | `/api/v1/assets/depreciation` | Depreciation report | admin, finance |
| GET | `/api/v1/assets/categories` | List categories | admin, asset_manager |

## Configuration Reference

```yaml
assets:
  identification:
    barcode_format: "CODE128"
    qr_code_enabled: true
    rfid_enabled: false
    auto_generate_barcode: true

  depreciation:
    default_method: "straight_line"
    revaluation_frequency: "annual"
    calendar_year_basis: true
    disposal_account: "asset_disposal"

  stock_take:
    frequency: "annual"
    allow_partial_stock_take: true
    discrepancy_threshold_percent: 5
    require_photos_for_discrepancy: true

  procurement:
    approval_threshold: 1000.00
    multi_level_approval_above: 5000.00
    preferred_vendors_only: false

  maintenance:
    preventive_schedule_enabled: true
    default_maintenance_interval_days: 90
    warranty_claim_alert_days: 30

  insurance:
    revaluation_frequency: "annual"
    coverage_types: ["fire", "theft", "damage"]
    claim_notification_deadline_days: 48

  retention:
    asset_record_retention_years: 10
    procurement_document_years: 7
    disposal_record_years: 10
```

## Security Considerations

- Asset values visible only to asset managers and finance roles
- Procurement approval workflow enforces segregation of duties
- Disposal requires dual authorization for assets above threshold
- Barcode/RFID scanning logs include user ID and location
- Financial data (purchase price, depreciation) encrypted in transit
- Audit trail for all asset state changes with before/after values
- Insurance documents stored in secure document vault with access logging

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Barcode Scanner | Scan asset barcode for instant info |
| Asset Lookup | Search assets by name, serial, or location |
| Report Issue | Report asset damage or malfunction |
| Stock-Take | Mobile stock-take with photo capture |
| Transfer Asset | Initiate location transfer via scan |
| Maintenance History | View maintenance log for scanned asset |
| My Assigned Assets | View assets assigned to current user |

## Testing Strategy

**Depreciation Calculation**: Tests validate straight-line and declining balance methods against reference datasets. Edge cases include mid-year acquisition and partial disposal.

**Stock-Take Workflow**: Integration tests simulate stock-take submission with matches, discrepancies, and missing items. Validates inventory count updates and discrepancy report generation.

**Barcode Operations**: Tests verify unique barcode generation, scan-to-lookup response time < 200ms, and duplicate barcode prevention.

**Procurement Approval**: Tests validate multi-level approval workflow, threshold-based routing, and budget limit enforcement.

**Asset Lifecycle**: End-to-end tests cover registration, transfer, maintenance scheduling, and decommissioning with disposal record creation.

**Maintenance Scheduling**: Tests verify preventive maintenance generation based on configurable intervals and integration with work order creation.
