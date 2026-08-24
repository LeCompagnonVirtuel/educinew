# Smart Campus API Reference Documentation

## Executive Summary

This document provides the comprehensive API reference for all Smart Campus Phase 2.8 endpoints. All APIs follow RESTful conventions, use JSON for request/response bodies, and require JWT authentication unless noted. The API base URL follows the pattern `https://{campus}.educi.local/api/v1/`.

Rate limiting is enforced at 100 requests per minute per authenticated user for standard endpoints and 1000 per minute for read-only analytics endpoints. All responses include standard headers: `X-Request-Id`, `X-Rate-Limit-Remaining`, and `X-Response-Time`.

The API uses consistent error response format across all modules with machine-readable error codes and human-readable messages. Pagination follows cursor-based pattern for stable results across concurrent modifications.

## Authentication

All requests require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

### Token Claims

```json
{
  "sub": "user-uuid",
  "campus_id": "campus-uuid",
  "roles": ["teacher", "staff"],
  "permissions": ["academic:read", "attendance:write"],
  "iat": 1690000000,
  "exp": 1690003600
}
```

### Refresh Flow

```
POST /api/v1/auth/refresh
{
  "refresh_token": "rt_abc123..."
}

Response:
{
  "access_token": "eyJhbGci...",
  "refresh_token": "rt_def456...",
  "expires_in": 3600
}
```

## Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "capacity",
        "message": "Must be a positive integer"
      }
    ],
    "request_id": "req_abc123",
    "timestamp": "2025-07-22T10:30:00Z"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTHENTICATION_REQUIRED` | 401 | Missing or invalid token |
| `INSUFFICIENT_PERMISSIONS` | 403 | Role lacks required permission |
| `RESOURCE_NOT_FOUND` | 404 | Entity does not exist |
| `VALIDATION_ERROR` | 422 | Request body validation failed |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `CONFLICT` | 409 | State conflict (e.g., double-booking) |
| `EMERGENCY_OVERRIDE` | 423 | Emergency protocol active |
| `DEVICE_OFFLINE` | 503 | IoT device not responding |

## Pagination

All list endpoints support cursor-based pagination:

```
GET /api/v1/campus/sensors?limit=20&cursor=eyJpZCI6...
```

### Response Envelope

```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "has_more": true,
    "total_count": 542
  }
}
```

## Campus Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/campus/overview` | Dashboard summary with module stats |
| `GET` | `/api/v1/campus/modules` | List enabled modules and health |
| `POST` | `/api/v1/campus/alerts/subscribe` | Subscribe to alert channel |
| `DELETE` | `/api/v1/campus/alerts/subscribe/:id` | Unsubscribe from alerts |
| `GET` | `/api/v1/campus/events/stream` | SSE event stream |
| `GET` | `/api/v1/campus/reports/summary` | Aggregated analytics |

### Campus Overview Response

```json
{
  "data": {
    "campus_id": "campus-paris-01",
    "name": "EduCI Paris Campus",
    "modules": {
      "transport": { "status": "active", "vehicles_online": 12, "active_trips": 5 },
      "library": { "status": "active", "items_on_loan": 342, "overdue": 18 },
      "cafeteria": { "status": "active", "orders_today": 287, "capacity_percent": 65 },
      "medical": { "status": "active", "visits_today": 12, "pending_vaccinations": 8 },
      "boarding": { "status": "active", "checked_in": 156, "total_boarders": 162 },
      "security": { "status": "active", "active_alerts": 2, "cameras_online": 48 },
      "environment": { "status": "active", "aqi": 42, "energy_today_kwh": 2450 }
    },
    "updated_at": "2025-07-22T10:30:00Z"
  }
}
```

## Transport Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/transport/routes` | List routes |
| `POST` | `/api/v1/transport/routes` | Create route |
| `GET` | `/api/v1/transport/routes/:id` | Route with stops |
| `PUT` | `/api/v1/transport/routes/:id` | Update route |
| `GET` | `/api/v1/transport/vehicles` | List vehicles |
| `POST` | `/api/v1/transport/vehicles` | Register vehicle |
| `GET` | `/api/v1/transport/trips` | List trips |
| `POST` | `/api/v1/transport/trips` | Create trip |
| `PUT` | `/api/v1/transport/trips/:id/start` | Start trip |
| `PUT` | `/api/v1/transport/trips/:id/complete` | Complete trip |
| `POST` | `/api/v1/transport/trips/:id/checkin` | Board student |
| `GET` | `/api/v1/transport/locations/live` | Live positions |
| `GET` | `/api/v1/transport/locations/:id/history` | Location history |
| `POST` | `/api/v1/transport/assignments` | Assign student |
| `GET` | `/api/v1/transport/eta/:trip_id` | Current ETA |

## Library Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/library/search` | Full-text catalog search |
| `GET` | `/api/v1/library/items/:id` | Item details |
| `POST` | `/api/v1/library/items` | Add catalog item |
| `PUT` | `/api/v1/library/items/:id` | Update item |
| `POST` | `/api/v1/library/items/:id/scan` | Barcode scan |
| `POST` | `/api/v1/library/loans` | Create loan |
| `PUT` | `/api/v1/library/loans/:id/return` | Process return |
| `POST` | `/api/v1/library/loans/:id/renew` | Renew loan |
| `GET` | `/api/v1/library/overdue` | Overdue items |
| `POST` | `/api/v1/library/reservations` | Reserve item |
| `GET` | `/api/v1/library/stats/popular` | Popular items |

## Cafeteria Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/cafeteria/menus` | Get menus |
| `POST` | `/api/v1/cafeteria/menus` | Create menu |
| `GET` | `/api/v1/cafeteria/recipes` | List recipes |
| `POST` | `/api/v1/cafeteria/recipes` | Create recipe |
| `POST` | `/api/v1/cafeteria/orders` | Place order |
| `GET` | `/api/v1/cafeteria/orders` | List orders |
| `PUT` | `/api/v1/cafeteria/orders/:id/cancel` | Cancel order |
| `POST` | `/api/v1/cafeteria/meal-plans` | Create meal plan |
| `GET` | `/api/v1/cafeteria/capacity` | Capacity status |

## Medical Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/medical/profiles/:student_id` | Medical profile |
| `POST` | `/api/v1/medical/profiles` | Create profile |
| `POST` | `/api/v1/medical/visits` | Check-in |
| `GET` | `/api/v1/medical/visits` | List visits |
| `PUT` | `/api/v1/medical/visits/:id/discharge` | Discharge |
| `POST` | `/api/v1/medical/administrations` | Log medication |
| `GET` | `/api/v1/medical/vaccinations` | Vaccination records |
| `POST` | `/api/v1/medical/vaccinations` | Record vaccination |
| `POST` | `/api/v1/medical/emergency/:student_id` | Emergency protocol |

## Security Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/security/incidents` | Report incident |
| `GET` | `/api/v1/security/incidents` | List incidents |
| `PUT` | `/api/v1/security/incidents/:id/resolve` | Resolve incident |
| `GET` | `/api/v1/security/cameras` | List cameras |
| `GET` | `/api/v1/security/access/logs` | Access logs |
| `POST` | `/api/v1/security/emergency/lockdown` | Lockdown |
| `POST` | `/api/v1/security/emergency/all-clear` | All clear |

## IoT Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/iot/devices` | List devices |
| `POST` | `/api/v1/iot/devices` | Register device |
| `POST` | `/api/v1/iot/devices/:id/command` | Send command |
| `GET` | `/api/v1/iot/telemetry/aggregated` | Aggregated data |
| `GET` | `/api/v1/iot/alerts` | Active alerts |
| `POST` | `/api/v1/iot/thresholds` | Create threshold |

## Environment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/environment/zones` | List zones |
| `GET` | `/api/v1/environment/readings` | Recent readings |
| `GET` | `/api/v1/environment/aqi` | Air quality index |
| `GET` | `/api/v1/environment/energy` | Energy consumption |
| `GET` | `/api/v1/environment/sustainability/report` | Sustainability report |

## Server-Sent Events

Real-time event stream for live updates:

```
GET /api/v1/campus/events/stream
Accept: text/event-stream
Authorization: Bearer {token}
```

### Event Types

| Event | Module | Payload |
|-------|--------|---------|
| `vehicle_location` | Transport | `{ vehicle_id, lat, lng, speed, heading }` |
| `trip_status` | Transport | `{ trip_id, status, delay_minutes }` |
| `loan_created` | Library | `{ loan_id, item_id, student_id }` |
| `overdue_alert` | Library | `{ item_id, student_id, days_overdue }` |
| `order_status` | Cafeteria | `{ order_id, status }` |
| `sick_bay_visit` | Medical | `{ visit_id, student_id, severity }` |
| `security_alert` | Security | `{ alert_type, severity, zone }` |
| `sensor_reading` | IoT | `{ device_id, parameter, value }` |
| `environmental_alert` | Environment | `{ zone_id, alert_type, value }` |
| `emergency_protocol` | Security | `{ protocol_type, initiated_by }` |

## Webhook Configuration

Outbound webhooks for external integrations:

```json
{
  "url": "https://external.system.example.com/webhook",
  "events": ["security_alert", "emergency_protocol"],
  "secret": "whsec_abc123...",
  "active": true
}
```

## Testing Strategy

**Contract Tests**: Pact-based consumer-driven tests validate API response schemas against client expectations. Run on every PR.

**Load Tests**: k6 scripts simulate expected peak loads. Acceptable thresholds: p95 < 500ms, error rate < 1%.

**Integration Tests**: Supertest-based route tests validate authentication, authorization, and business logic for each endpoint.

**E2E Tests**: Playwright scenarios validate critical user journeys end-to-end including API interactions and UI rendering.
