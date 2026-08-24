# API Documentation — EduCI Phase 4.0

**Version:** 4.0.0  
**Status:** Active  
**Last Updated:** 2026-08-06

---

## Overview

EduCI exposes a RESTful API built on Supabase Edge Functions. All endpoints follow consistent patterns for authentication, validation, and error handling.

---

## Base URL

```
https://<project-ref>.supabase.co/functions/v1
```

---

## Authentication

### JWT Token

```http
Authorization: Bearer <supabase-jwt-token>
```

### School Context

```http
X-School-ID: <school-uuid>
```

---

## Request Format

### Headers

```http
Content-Type: application/json
Authorization: Bearer <token>
X-School-ID: <uuid>
X-Request-ID: <uuid> // Optional, auto-generated if missing
```

### Body

All request bodies must be valid JSON matching the endpoint's Zod schema.

---

## Response Format

### Success

```json
{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": []
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid auth |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SCHOOL_MISMATCH` | 403 | Cross-school access denied |

---

## Pagination

### Query Parameters

| Parameter | Default | Max |
|-----------|---------|-----|
| `page` | 1 | - |
| `limit` | 20 | 100 |
| `sort` | `created_at` | - |
| `order` | `desc` | - |

### Response Meta

```json
{
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

## Endpoint Modules

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create account |
| POST | `/auth/login` | Sign in |
| POST | `/auth/logout` | Sign out |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/reset-password` | Request reset |

### Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | List students |
| POST | `/students` | Create student |
| GET | `/students/:id` | Get student |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Soft delete |

### Teachers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/teachers` | List teachers |
| POST | `/teachers` | Create teacher |
| GET | `/teachers/:id` | Get teacher |
| PUT | `/teachers/:id` | Update teacher |

### Classes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/classes` | List classes |
| POST | `/classes` | Create class |
| GET | `/classes/:id` | Get class |
| PUT | `/classes/:id` | Update class |

### Grades

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/grades` | List grades |
| POST | `/grades` | Submit grades |
| GET | `/grades/student/:id` | Student grades |
| GET | `/grades/class/:id` | Class grades |

### Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/attendance` | List records |
| POST | `/attendance` | Mark attendance |
| GET | `/attendance/student/:id` | Student attendance |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/payments` | List payments |
| POST | `/payments/initiate` | Create payment |
| GET | `/payments/:id` | Get payment status |
| POST | `/payments/webhook` | Money Fusion webhook |

### Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reports` | List reports |
| POST | `/reports/generate` | Generate report |
| GET | `/reports/:id` | Get report |
| GET | `/reports/:id/download` | Download report |

### AI Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/copilot/query` | Send copilot query |
| POST | `/ai/studio/generate` | Generate content |
| GET | `/ai/insights/:type` | Get AI insights |

---

## Validation

All inputs validated with Zod schemas:

```typescript
const CreateStudentSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string().datetime(),
  email: z.string().email().optional(),
  parentId: z.string().uuid(),
  schoolId: z.string().uuid(),
});
```

---

## Rate Limits

| Scope | Limit | Window |
|-------|-------|--------|
| Per user | 100 requests | 1 minute |
| Per school | 1000 requests | 1 minute |
| Auth endpoints | 5 requests | 1 minute |
| AI endpoints | 20 requests | 1 minute |

---

## Versioning

API version in URL path: `/functions/v1/`

Breaking changes require new version. Deprecation notice: 6 months minimum.

---

## Related Documentation

- [SECURITY.md](SECURITY.md) — Security Documentation
- [OPERATIONS.md](OPERATIONS.md) — Operations Guide
- [PERFORMANCE.md](PERFORMANCE.md) — Performance Guide
