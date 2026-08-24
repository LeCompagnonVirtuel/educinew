# Cantine Documentation

## Executive Summary

The Cafeteria module manages school meal operations including menu planning, online ordering, nutrition tracking, allergen management, and capacity monitoring. It enables parents to pre-order meals, tracks student dietary requirements, and provides kitchen staff with daily preparation lists.

The system maintains nutritional databases per recipe, generates balanced weekly menus, and flags allergen conflicts in real-time. It integrates with point-of-sale hardware for on-site meal purchases and supports cashless payment via student ID cards.

Cafeteria reduces food waste by 25% through accurate demand forecasting, improves student nutrition compliance with government guidelines, and eliminates manual order tallying with digital ordering workflows.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│           Cafeteria Service              │
├──────────┬──────────┬────────────────────┤
│  Menu    │  Order   │  Nutrition         │
│  Planner │  Engine  │  Calculator        │
├──────────┴──────────┴────────────────────┤
│    Payment Gateway (Stripe / Local POS)  │
├──────────────────────────────────────────┤
│    Allergen Database + Recipe Store      │
├──────────────────────────────────────────┤
│          PostgreSQL (Cafeteria Schema)    │
└──────────────────────────────────────────┘
```

Menu Planner generates weekly menus respecting nutritional constraints and budget targets. Order Engine handles pre-orders, on-site purchases, and cancellation workflows. Nutrition Calculator computes per-meal nutritional values and daily student intake tracking.

## Entity Relationships

### Cafeteria

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | Cafeteria name |
| daily_capacity | INTEGER | Max meals per day |
| operating_hours | JSONB | Service time windows |
| payment_methods | JSONB | Accepted payment types |

### Menu

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| cafeteria_id | UUID | FK to cafeteria |
| date | DATE | Menu date |
| meal_type | ENUM | `breakfast`, `lunch`, `snack` |
| name | VARCHAR(100) | Menu display name |
| price | DECIMAL(5,2) | Base price |
| nutritional_info | JSONB | Calculated nutrition |
| available_quantity | INTEGER | Prepared portions |

### MenuItem

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| menu_id | UUID | FK to menu |
| recipe_id | UUID | FK to recipe |
| course | ENUM | `starter`, `main`, `dessert`, `side` |
| portion_size_grams | INTEGER | Standard portion |

### Recipe

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(200) | Recipe name |
| ingredients | JSONB | Ingredient list with quantities |
| allergens | TEXT[] | Allergen codes |
| nutritional_values | JSONB | Per-100g nutrition |
| preparation_time_min | INTEGER | Prep time |
| difficulty | ENUM | `easy`, `medium`, `hard` |
| image_url | VARCHAR(500) | Recipe photo |

### Order

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| student_id | UUID | FK to student |
| menu_id | UUID | FK to menu |
| order_date | TIMESTAMP | When ordered |
| status | ENUM | `pending`, `confirmed`, `served`, `cancelled` |
| payment_method | VARCHAR(50) | Payment type used |
| amount_paid | DECIMAL(5,2) | Amount charged |
| special_requests | TEXT | Customization notes |

### MealPlan

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| student_id | UUID | FK to student |
| cafeteria_id | UUID | FK to cafeteria |
| week_start | DATE | Week commencing |
| days | JSONB | Daily meal selections |
| total_price | DECIMAL(7,2) | Weekly total |
| status | ENUM | `active`, `cancelled` |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/cafeteria/menus?date=:date` | Get menu for date | all |
| POST | `/api/v1/cafeteria/menus` | Create menu | admin, kitchen_manager |
| PUT | `/api/v1/cafeteria/menus/:id` | Update menu | admin, kitchen_manager |
| GET | `/api/v1/cafeteria/recipes` | List recipes | admin, kitchen_manager |
| POST | `/api/v1/cafeteria/recipes` | Create recipe | kitchen_manager |
| GET | `/api/v1/cafeteria/recipes/:id/nutrition` | Nutrition details | all |
| POST | `/api/v1/cafeteria/orders` | Place order | student, parent |
| GET | `/api/v1/cafeteria/orders?student=:id` | Student orders | student, parent |
| PUT | `/api/v1/cafeteria/orders/:id/cancel` | Cancel order | student, parent |
| GET | `/api/v1/cafeteria/orders/daily` | Daily order summary | kitchen_manager |
| PUT | `/api/v1/cafeteria/orders/:id/serve` | Mark as served | kitchen_staff |
| POST | `/api/v1/cafeteria/meal-plans` | Create weekly plan | parent |
| GET | `/api/v1/cafeteria/meal-plans?student=:id` | Student meal plan | parent |
| GET | `/api/v1/cafeteria/capacity` | Current capacity status | admin |
| GET | `/api/v1/cafeteria/allergens` | Allergen reference list | all |
| GET | `/api/v1/cafeteria/stats/waste` | Waste analytics | admin |

## Configuration Reference

```yaml
cafeteria:
  ordering:
    advance_order_days: 7
    cancellation_deadline_hours: 2
    max_orders_per_student_per_day: 3
    default_payment_method: "student_card"

  nutrition:
    compliance_standard: "french_school_meals"
    daily_calorie_target:
      primary: 550
      middle: 700
      high: 850
    allergen_strict_mode: true
    notify_on_allergen_conflict: true

  capacity:
    alert_threshold_percent: 85
    hard_limit_percent: 100
    buffer_minutes: 15

  waste:
    tracking_enabled: true
    weigh_every_nth_meal: 5
    report_frequency: "weekly"

  kitchen:
    prep_list_generation_time: "06:00"
    ingredient_order_lead_days: 2
    supplier_integration: true

  payment:
    stripe_enabled: true
    stripe_product_id: "${STRIPE_MEAL_PRODUCT}"
    student_card_reader: "gate_parking"
    cash_accepted: true
    lunch_account_topup_enabled: true
```

## Security Considerations

- Allergen data treated as safety-critical; modifications require supervisor approval
- Payment processing PCI-DSS Level 1 via Stripe; no card data stored locally
- Student meal preferences encrypted at rest; visible only to parents and kitchen staff
- Order modification audit trail prevents unauthorized changes after cutoff
- POS device authentication via mutual TLS certificates
- Nutritional data validated against reference databases on recipe creation
- Cash handling reconciliation reports generated daily with supervisor sign-off

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Daily Menu | View today's menu with photos and nutritional info |
| Pre-Order | Order meals up to 7 days in advance |
| Allergen Filter | Filter menus based on student allergen profile |
| Meal History | View past meals consumed and nutritional totals |
| Weekly Plan | Subscribe to automatic weekly meal selections |
| Balance Check | View lunch account balance and top up |
| Order Status | Track order from confirmation to serving |
| Waste Feedback | Rate portion sizes to help reduce waste |

## Testing Strategy

**Menu Creation**: Tests validate nutritional calculator correctly computes totals from recipe ingredients. Allergen detection verified against FDA top-9 allergen list.

**Order Placement**: Integration tests simulate peak ordering: 300 orders in 10-minute window. Validates inventory decrements correctly and no over-selling occurs.

**Cancellation Workflow**: Tests verify cancellation blocked after deadline, partial refunds handled correctly, and kitchen prep list updates immediately.

**Allergen Safety**: Critical path tests validate order rejected when containing student's declared allergen. Tests cover cross-contamination warnings and ingredient substitution suggestions.

**Payment Processing**: Stripe integration tests use test mode to validate charges, refunds, and payment failure handling. Student card reader mocked for offline payment scenarios.

**Capacity Management**: Load test validates capacity alerts trigger at threshold, walk-in orders blocked at limit, and dashboard reflects real-time occupancy.
