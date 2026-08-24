# HEALTH API MODULE

Phase 4.6 — API Santé Scolaire

---

## 1. Vision

API RESTful pour le module santé. Validation Zod, RBAC, rate limiting et logging.

---

## 2. RBAC Matrix

| Endpoint | SUPER_ADMIN | ADMIN | INFIRMIER | ENSEIGNANT | PARENT | ELEVE |
|----------|-------------|-------|-----------|------------|--------|-------|
| GET profiles | All | School | School | Students | Children | Self |
| POST profiles | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| PUT profiles | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| GET visits | All | School | School | Students | Children | Self |
| POST visits | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| GET alerts | All | School | School | School | ✗ | ✗ |
| POST alerts | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| GET analytics | All | School | School | ✗ | ✗ | ✗ |

---

## 3. Validation Schemas (Zod)

```typescript
// lib/validations/health.ts
import { z } from "zod";

export const HealthProfileSchema = z.object({
  student_id: z.string().uuid(),
  blood_type: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  allergies: z.array(z.string()).optional(),
  chronic_conditions: z.array(z.string()).optional(),
  medications: z.array(z.object({
    name: z.string(),
    dosage: z.string(),
    frequency: z.string(),
    duration: z.string()
  })).optional(),
  emergency_contact_name: z.string().min(1).max(255),
  emergency_contact_phone: z.string().min(1).max(50),
  doctor_name: z.string().max(255).optional(),
  doctor_phone: z.string().max(50).optional(),
  insurance_number: z.string().max(100).optional()
});

export const HealthVisitSchema = z.object({
  student_id: z.string().uuid(),
  reason: z.string().min(1),
  symptoms: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  medication_prescribed: z.array(z.object({
    name: z.string(),
    dosage: z.string(),
    frequency: z.string(),
    duration: z.string()
  })).optional(),
  follow_up_date: z.string().datetime().optional(),
  severity: z.enum(["low", "medium", "high", "critical"])
});

export const HealthAlertSchema = z.object({
  alert_type: z.string().min(1),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  target_roles: z.array(z.string()).optional()
});
```

---

## 4. API Example — Requête

```bash
# Créer profil santé
curl -X POST https://api.educi.com/api/health/profiles \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "blood_type": "A+",
    "allergies": ["Arachides", "Pollin"],
    "emergency_contact_name": "Marie Dupont",
    "emergency_contact_phone": "+221 77 123 45 67"
  }'
```

```bash
# Consulter visites
curl https://api.educi.com/api/health/visits?student_id=<uuid>&limit=10 \
  -H "Authorization: Bearer <token>"
```

---

## 5. Rate Limiting

| Endpoint | Limite | Fenêtre |
|----------|--------|---------|
| GET | 100 requêtes | 1 minute |
| POST | 20 requêtes | 1 minute |
| PUT | 30 requêtes | 1 minute |
| DELETE | 10 requêtes | 1 minute |

---

## 6. Error Responses

```json
// 400 Validation Error
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid request body",
  "details": [
    { "field": "student_id", "message": "Invalid UUID" },
    { "field": "severity", "message": "Must be low, medium, high, or critical" }
  ]
}

// 403 Forbidden
{
  "error": "FORBIDDEN",
  "message": "Insufficient permissions for this resource"
}

// 404 Not Found
{
  "error": "NOT_FOUND",
  "message": "Health profile not found"
}

// 429 Rate Limited
{
  "error": "RATE_LIMITED",
  "message": "Too many requests",
  "retry_after": 30
}
```

---

## 7. Middleware Stack

```
Request → CORS → Auth (JWT) → RBAC → Rate Limit → Validation (Zod)
         → School Isolation → Logger → Handler → Response
```

---

## 8. Logging

```typescript
// Chaque requête logguée
{
  "timestamp": "2026-08-08T10:30:00Z",
  "method": "POST",
  "path": "/api/health/visits",
  "user_id": "uuid-user",
  "school_id": "uuid-school",
  "role": "INFIRMIER",
  "status": 201,
  "duration_ms": 145,
  "ip": "192.168.1.100"
}
```

---

## 9. Architecture

```
Route Handler → validateRequest() → checkRBAC() → getSchoolId()
    → HealthService → HealthRepository → Supabase
    → logRequest() → formatResponse()
```

---

*Phase 4.6 — EduCI Documentation*
