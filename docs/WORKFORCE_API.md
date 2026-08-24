# WORKFORCE_API - API Externes

Phase 4.4 - Module Workforce API

---

## 1. Objectif

API RESTful pour intégrations externes : entreprises, plateformes emploi, systèmes RH, et partenaires.

## 2. Authentification

```typescript
// API Key Authentication
headers: {
  'X-API-Key': 'workforce_live_xxxx',
  'X-School-Id': 'school-uuid',
  'Content-Type': 'application/json'
}

// Rate Limiting
// - Standard: 100 req/min
// - Premium: 1000 req/min
// - Enterprise: Custom
```

## 3. Endpoints Principaux

### GET /api/v1/workforce/skills
```bash
curl -X GET "https://api.educi.app/v1/workforce/skills" \
  -H "X-API-Key: workforce_live_xxxx" \
  -H "X-School-Id: school-uuid"
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "React",
      "category": "TECHNICAL",
      "level_required": "INTERMEDIATE",
      "industry_relevance": ["IT", "Digital"]
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "per_page": 20
  }
}
```

### GET /api/v1/workforce/jobs
```bash
curl -X GET "https://api.educi.app/v1/workforce/jobs?industry=IT&location=Dakar" \
  -H "X-API-Key: workforce_live_xxxx" \
  -H "X-School-Id: school-uuid"
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Développeur React",
      "company": "TechCorp",
      "location": "Dakar",
      "salary_min": 500000,
      "salary_max": 800000,
      "skills_required": ["React", "TypeScript"],
      "application_url": "https://apply.educi.app/jobs/uuid"
    }
  ],
  "filters": {
    "available_filters": ["industry", "location", "job_type", "salary_min", "skills"]
  }
}
```

### POST /api/v1/workforce/jobs (Enterprise)
```bash
curl -X POST "https://api.educi.app/v1/workforce/jobs" \
  -H "X-API-Key: workforce_enterprise_xxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Data Engineer",
    "description": "Pipeline de données",
    "location": "Abidjan",
    "job_type": "FULL_TIME",
    "salary_min": 700000,
    "salary_max": 1200000,
    "required_skills": ["Python", "Spark", "Airflow"]
  }'
```

### GET /api/v1/workforce/talents/search
```bash
curl -X GET "https://api.educi.app/v1/workforce/talents/search?skills=React,Node.js&availability=immediately" \
  -H "X-API-Key: workforce_enterprise_xxxx"
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "headline": "Full Stack Developer",
      "skills": ["React", "Node.js", "TypeScript"],
      "availability": "IMMEDIATELY",
      "location": "Dakar",
      "experience_years": 3,
      "match_score": 92.5
    }
  ]
}
```

### POST /api/v1/workforce/verify
```bash
curl -X POST "https://api.educi.app/v1/workforce/verify" \
  -H "Content-Type: application/json" \
  -d '{
    "verification_code": "CERT-2024-XXXX"
  }'
```

**Response:**
```json
{
  "valid": true,
  "credential": {
    "type": "CERTIFICATE",
    "title": "Licence Informatique",
    "holder": "Jean Dupont",
    "issuing_org": "Université de Dakar",
    "issue_date": "2024-06-15",
    "status": "VALID"
  }
}
```

## 4. Webhooks

```typescript
const WebhookEvents = {
  'job.created': 'Nouvelle offre créée',
  'job.applied': 'Nouvelle candidature',
  'application.status_changed': 'Statut candidature modifié',
  'talent.matched': 'Nouveau match talent-emploi',
  'credential.verified': 'Credential vérifié'
};

// Webhook Payload Example
{
  "event": "job.created",
  "timestamp": "2024-10-15T14:30:00Z",
  "data": {
    "job_id": "uuid",
    "title": "Développeur React",
    "company": "TechCorp"
  },
  "signature": "hmac-sha256-xxxx"
}
```

## 5. Rate Limits

| Plan | Requests/min | Burst |
|------|--------------|-------|
| Free | 60 | 10 |
| Standard | 100 | 20 |
| Premium | 500 | 50 |
| Enterprise | 1000 | 100 |

## 6. Error Handling

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retry_after": 60
  }
}

// Error Codes
// 400 - BAD_REQUEST
// 401 - UNAUTHORIZED
// 403 - FORBIDDEN
// 404 - NOT_FOUND
// 429 - RATE_LIMIT_EXCEEDED
// 500 - INTERNAL_ERROR
```

## 7. SDKs

```typescript
// JavaScript/TypeScript
import { WorkforceClient } from '@educi/workforce-sdk';

const client = new WorkforceClient({
  apiKey: process.env.WORKFORCE_API_KEY,
  schoolId: process.env.SCHOOL_ID
});

const skills = await client.skills.list({ category: 'TECHNICAL' });
const jobs = await client.jobs.search({ location: 'Dakar' });
```

## 8. Documentation

- OpenAPI/Swagger: `https://api.educi.app/docs`
- Postman Collection: Available on request
- Changelog: `https://api.educi.app/changelog`

## 9. Security

- TLS 1.3 obligatoire
- IP whitelisting disponible
- HMAC signature pour webhooks
- Audit trail complet
- Rotation API keys
