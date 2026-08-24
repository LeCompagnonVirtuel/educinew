# Interoperability — API Reference

> Version : 1.0
> Base URL : `https://api.educi.com/v1/interop`

---

## 1. Authentication

Toutes les requêtes API nécessitent un JWT Bearer token.

```bash
curl -X GET "https://api.educi.com/v1/interop/connectors" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

### Scopes Requis

| Scope | Description |
|-------|-------------|
| `interop:read` | Lecture des connecteurs |
| `interop:write` | Création/modification connecteurs |
| `interop:sync` | Déclenchement synchronisation |
| `interop:audit` | Accès aux logs d'audit |
| `interop:admin` | Administration complète |

---

## 2. Connectors

### 2.1 List Connectors

```http
GET /api/v1/interop/connectors?school_id={school_id}&status={status}
```

**Response 200:**
```json
{
  "data": [
    {
      "id": "conn_abc123",
      "name": "Moodle LTI",
      "type": "lti",
      "status": "active",
      "school_id": "school_123",
      "last_sync": "2026-08-07T10:00:00Z",
      "sync_count": 1247,
      "error_rate": 0.02,
      "created_at": "2026-01-15T08:00:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "per_page": 20
  }
}
```

### 2.2 Create Connector

```http
POST /api/v1/interop/connectors
```

**Request Body:**
```json
{
  "name": "Canvas LTI",
  "type": "lti",
  "school_id": "school_123",
  "config": {
    "platform_id": "https://canvas.instructure.com",
    "client_id": "10000000000042",
    "deployment_id": "1:12345",
    "jwks_url": "https://canvas.instructure.com/api/lti/security/jwks",
    "auth_url": "https://canvas.instructure.com/login/oauth2/token",
    "redirect_uris": [
      "https://educi.com/api/v1/interop/lti/callback"
    ]
  },
  "scopes": [
    "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",
    "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",
    "https://purl.imsglobal.org/spec/lti-ags/scope/score"
  ],
  "metadata": {
    "vendor": "Instructure",
    "version": "1.3",
    "environment": "production"
  }
}
```

**Response 201:**
```json
{
  "id": "conn_def456",
  "name": "Canvas LTI",
  "type": "lti",
  "status": "pending_verification",
  "verification_url": "https://api.educi.com/v1/interop/connectors/conn_def456/verify",
  "client_secret_preview": "s3cr***",
  "created_at": "2026-08-07T14:30:00Z"
}
```

### 2.3 Delete Connector

```http
DELETE /api/v1/interop/connectors/{connector_id}
```

**Response 204:** No Content

---

## 3. LTI Endpoints

### 3.1 Initiate Login

```http
POST /api/v1/interop/lti/login
```

**Request Body:**
```json
{
  "connector_id": "conn_abc123",
  "iss": "https://moodle.example.com",
  "login_hint": "user_789",
  "target_link_uri": "https://educi.com/lti/launch",
  "lti_message_hint": "message_hint_value",
  "client_id": "edu_ci_lti_client"
}
```

**Response 200:**
```json
{
  "authorization_endpoint": "https://moodle.example.com/mod/lti/launch.php",
  "params": {
    "iss": "https://api.educi.com",
    "client_id": "edu_ci_lti_client",
    "login_hint": "user_789",
    "lti_deployment_id": "1",
    "target_link_uri": "https://educi.com/lti/launch",
    "response_type": "id_token",
    "response_mode": "form_post",
    "scope": "openid",
    "nonce": "n-0S6-wzA2Mj",
    "prompt": "none"
  }
}
```

### 3.2 Launch

```http
POST /api/v1/interop/lti/launch
```

**Request Body (form-urlencoded):**
```
id_token=eyJhbGciOiJSUzI1NiIs...
```

**Response 302:** Redirect to resource with session

### 3.3 Grade Service

```http
POST /api/v1/interop/lti/grades/{connector_id}/scores
```

**Request Body:**
```json
{
  "line_item_url": "https://moodle.example.com/mod/lti/scores.php?id=42",
  "score": {
    "userId": "user_789",
    "scoreGiven": 85,
    "scoreMaximum": 100,
    "timestamp": "2026-08-07T10:30:00Z",
    "activityProgress": "Completed",
    "gradingProgress": "FullyGraded",
    "comment": "Excellent travail"
  }
}
```

---

## 4. xAPI Endpoints

### 4.1 Send Statement

```http
POST /api/v1/interop/xapi/statements
```

**Request Body:**
```json
{
  "connector_id": "conn_xapi789",
  "statement": {
    "actor": {
      "mbox": "mailto:student@example.com",
      "name": "Élève Test"
    },
    "verb": {
      "id": "http://adlnet.gov/expapi/verbs/completed",
      "display": { "fr": "a terminé" }
    },
    "object": {
      "id": "https://educi.com/courses/math-6eme/leçon-1",
      "definition": {
        "name": { "fr": "Mathématiques 6ème - Leçon 1" },
        "type": "http://adlnet.gov/expapi/activities/lesson"
      }
    },
    "result": {
      "score": {
        "scaled": 0.85,
        "raw": 85,
        "max": 100
      },
      "completion": true,
      "success": true,
      "duration": "PT45M"
    },
    "context": {
      "contextActivities": {
        "parent": [{
          "id": "https://educi.com/courses/math-6eme"
        }],
        "grouping": [{
          "id": "https://educi.com/schools/school_123"
        }]
      }
    }
  }
}
```

**Response 201:**
```json
{
  "id": "stmt_abc123def456",
  "stored": "2026-08-07T10:30:00Z",
  "voided": false
}
```

### 4.2 Query Statements

```http
GET /api/v1/interop/xapi/statements?connector_id={id}&verb={verb}&since={date}
```

---

## 5. CalDAV Endpoints

### 5.1 Sync Calendar

```http
POST /api/v1/interop/caldav/{connector_id}/sync
```

**Request Body:**
```json
{
  "calendar_id": "cal_school_123",
  "since": "2026-08-01T00:00:00Z",
  "filter": {
    "components": ["VEVENT"],
    "calendar_types": ["classes", "exams", "events"]
  }
}
```

**Response 200:**
```json
{
  "sync_token": "sync_token_abc123",
  "created": 15,
  "updated": 3,
  "deleted": 1,
  "events": [
    {
      "uid": "event_789@educi.com",
      "summary": "Cours de Mathématiques 6ème A",
      "dtstart": "2026-08-08T08:00:00",
      "dtend": "2026-08-08T09:30:00",
      "rrule": "FREQ=WEEKLY;BYDAY=MO",
      "location": "Salle 204",
      "attendees": ["teacher_42", "class_6eme_a"]
    }
  ]
}
```

---

## 6. SSO / OIDC Endpoints

### 6.1 Discover Provider

```http
GET /api/v1/interop/oidc/discover?domain=school.example.com
```

**Response 200:**
```json
{
  "provider": "Keycloak",
  "issuer": "https://keycloak.example.com/realms/school",
  "authorization_endpoint": "https://keycloak.example.com/realms/school/protocol/openid-connect/auth",
  "token_endpoint": "https://keycloak.example.com/realms/school/protocol/openid-connect/token",
  "jwks_uri": "https://keycloak.example.com/realms/school/protocol/openid-connect/certs",
  "scopes_supported": ["openid", "profile", "email", "roles"],
  "response_types_supported": ["code", "id_token"]
}
```

### 6.2 Initiate SSO

```http
POST /api/v1/interop/oidc/authorize
```

**Request Body:**
```json
{
  "connector_id": "conn_oidc123",
  "redirect_uri": "https://educi.com/auth/callback",
  "scope": "openid profile email",
  "state": "xyz123",
  "nonce": "nonce_abc"
}
```

**Response 302:** Redirect to IdP

---

## 7. Webhooks

### 7.1 Register Webhook

```http
POST /api/v1/interop/webhooks
```

**Request Body:**
```json
{
  "url": "https://partner.example.com/webhook/educi",
  "events": [
    "connector.sync.completed",
    "connector.sync.failed",
    "statement.received",
    "grade.posted"
  ],
  "secret": "webhook_secret_abc",
  "school_id": "school_123"
}
```

### 7.2 Webhook Payload

```json
{
  "event": "connector.sync.completed",
  "timestamp": "2026-08-07T10:30:00Z",
  "data": {
    "connector_id": "conn_abc123",
    "connector_name": "Moodle LTI",
    "records_synced": 42,
    "duration_ms": 3200,
    "school_id": "school_123"
  },
  "signature": "sha256=abc123def456"
}
```

---

## 8. Error Codes

| Code | HTTP | Description |
|------|------|-------------|
| `INTEROP_001` | 400 | Invalid connector configuration |
| `INTEROP_002` | 401 | Authentication failed |
| `INTEROP_003` | 403 | Scope insufficient |
| `INTEROP_004` | 404 | Connector not found |
| `INTEROP_005` | 409 | Connector already exists |
| `INTEROP_006` | 422 | Invalid LTI token |
| `INTEROP_007` | 429 | Rate limit exceeded |
| `INTEROP_008` | 500 | Sync engine error |
| `INTEROP_009` | 502 | External service unavailable |
| `INTEROP_010` | 503 | Interop gateway overloaded |
