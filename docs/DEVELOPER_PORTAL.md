# EduCI Developer Portal

> **Phase 3 — Enterprise Integration**
> Complete Developer Portal documentation for the EduCI platform

---

## Table of Contents

1. [Overview](#1-overview)
2. [Developer Dashboard](#2-developer-dashboard)
3. [Application Management](#3-application-management)
4. [API Key Management](#4-api-key-management)
5. [Webhook Console](#5-webhook-console)
6. [SDK Downloads](#6-sdk-downloads)
7. [API Explorer](#7-api-explorer)
8. [Interactive Playground](#8-interactive-playground)
9. [Code Samples](#9-code-samples)
10. [Usage Analytics](#10-usage-analytics)
11. [Rate Limits](#11-rate-limits)
12. [Error Reference](#12-error-reference)
13. [Support](#13-support)

---

## 1. Overview

### 1.1 Purpose

The Developer Portal provides a centralized hub for developers to interact with EduCI's APIs, manage integrations, and access resources for building applications.

### 1.2 Key Features

| Feature | Description |
|---|---|
| **Developer Dashboard** | Overview of apps, keys, and usage |
| **Application Management** | Create, configure, and manage apps |
| **API Key Management** | Generate, rotate, and revoke keys |
| **Webhook Console** | Test and monitor webhooks |
| **SDK Downloads** | Multi-language SDKs |
| **API Explorer** | Interactive API documentation |
| **Playground** | Test API calls in browser |
| **Code Samples** | Quickstart guides and examples |
| **Usage Analytics** | Track API usage and errors |
| **Rate Limit Monitoring** | View current limits and usage |

### 1.3 Portal URL

- **Production**: https://developers.educi.com
- **Sandbox**: https://sandbox-developers.educi.com

---

## 2. Developer Dashboard

### 2.1 Dashboard Overview

```typescript
// Dashboard API
GET /api/v1/developer/dashboard

// Response
{
  "summary": {
    "applications": 5,
    "activeApiKeys": 8,
    "totalRequests30d": 125000,
    "successRate": 99.2,
    "activeWebhooks": 12
  },
  "recentActivity": [
    {
      "type": "api_call",
      "description": "GET /api/v1/students",
      "timestamp": "2026-07-29T14:30:00Z",
      "status": 200
    },
    {
      "type": "webhook_delivery",
      "description": "student.created → partner.example.com",
      "timestamp": "2026-07-29T14:25:00Z",
      "status": 200
    }
  ],
  "alerts": [
    {
      "type": "rate_limit",
      "message": "API key approaching rate limit",
      "severity": "warning"
    }
  ]
}
```

### 2.2 Quick Links

| Link | Description |
|---|---|
| **My Apps** | Manage applications |
| **API Keys** | View and manage keys |
| **Webhooks** | Configure webhooks |
| **SDKs** | Download SDKs |
| **Docs** | API documentation |
| **Support** | Get help |

---

## 3. Application Management

### 3.1 Create Application

```typescript
// Create app
POST /api/v1/developer/apps
{
  "name": "My Student App",
  "description": "Mobile app for student portal",
  "type": "mobile",
  "platforms": ["ios", "android"],
  "redirectUris": [
    "myapp://callback",
    "https://myapp.example.com/callback"
  ],
  "webhooks": [
    {
      "url": "https://myapp.example.com/webhooks",
      "events": ["student.updated", "grade.submitted"]
    }
  ]
}

// Response
{
  "success": true,
  "data": {
    "id": "app_abc123",
    "name": "My Student App",
    "clientId": "client_xyz789",
    "clientSecret": "secret_abc123...",
    "type": "mobile",
    "createdAt": "2026-07-29T10:00:00Z"
  }
}
```

### 3.2 Application Settings

```typescript
// Update app settings
PUT /api/v1/developer/apps/app_abc123
{
  "name": "My Student App v2",
  "description": "Updated description",
  "webhooks": [
    {
      "url": "https://myapp.example.com/webhooks/v2",
      "events": ["student.created", "student.updated", "grade.submitted"]
    }
  ]
}

// Get app details
GET /api/v1/developer/apps/app_abc123

// Delete app
DELETE /api/v1/developer/apps/app_abc123
```

### 3.3 Application Types

| Type | Description | OAuth Flow |
|---|---|---|
| **Web** | Server-side web apps | Authorization Code |
| **Mobile** | iOS/Android apps | Authorization Code + PKCE |
| **SPA** | Single-page apps | Authorization Code + PKCE |
| **CLI** | Command-line tools | Client Credentials |
| **Server** | Backend services | Client Credentials |

---

## 4. API Key Management

### 4.1 Generate API Key

```typescript
// Generate new key
POST /api/v1/developer/apps/app_abc123/keys
{
  "name": "Production Key",
  "type": "live",
  "permissions": [
    "students:read",
    "grades:read",
    "grades:write"
  ],
  "expiresAt": "2027-07-29T00:00:00Z",
  "rateLimit": {
    "tier": "professional"
  },
  "ipWhitelist": [
    "192.168.1.0/24",
    "10.0.0.0/8"
  ]
}

// Response
{
  "success": true,
  "data": {
    "id": "key_abc123",
    "name": "Production Key",
    "key": "educi_live_abc123def456ghi789",
    "type": "live",
    "permissions": ["students:read", "grades:read", "grades:write"],
    "expiresAt": "2027-07-29T00:00:00Z",
    "createdAt": "2026-07-29T10:00:00Z"
  }
}
```

### 4.2 Key Types

| Type | Prefix | Rate Limit | Use Case |
|---|---|---|---|
| **Live** | `educi_live_` | Standard | Production |
| **Test** | `educi_test_` | Reduced | Development |
| **Restricted** | `educi_restricted_` | Custom | Limited scope |
| **Admin** | `educi_admin_` | High | Administrative |

### 4.3 Key Management

```typescript
// List keys
GET /api/v1/developer/apps/app_abc123/keys

// Rotate key
POST /api/v1/developer/apps/app_abc123/keys/key_abc123/rotate

// Revoke key
DELETE /api/v1/developer/apps/app_abc123/keys/key_abc123

// Update key
PUT /api/v1/developer/apps/app_abc123/keys/key_abc123
{
  "name": "Updated Key Name",
  "permissions": ["students:read"]
}
```

### 4.4 Key Security

```typescript
// Key security best practices
const keySecurity = {
  // Store keys securely
  storage: 'Use environment variables or secrets manager',
  
  // Never commit keys
  gitignore: '.env, *.key, secrets.json',
  
  // Rotate regularly
  rotation: 'Every 90 days',
  
  // Use least privilege
  permissions: 'Only grant necessary permissions',
  
  // Monitor usage
  monitoring: 'Track unusual activity',
};
```

---

## 5. Webhook Console

### 5.1 Test Webhook

```typescript
// Test webhook endpoint
POST /api/v1/developer/webhooks/test
{
  "url": "https://myapp.example.com/webhook",
  "event": "student.created",
  "payload": {
    "id": "stu_test_123",
    "firstName": "Test",
    "lastName": "Student",
    "email": "test@example.com"
  }
}

// Response
{
  "success": true,
  "data": {
    "deliveryId": "del_test_abc123",
    "statusCode": 200,
    "duration": 245,
    "response": {
      "headers": { "content-type": "application/json" },
      "body": "OK"
    }
  }
}
```

### 5.2 Webhook Logs

```typescript
// Get webhook delivery logs
GET /api/v1/developer/webhooks/deliveries?webhookId=wh_abc123&limit=50

// Response
{
  "deliveries": [
    {
      "id": "del_abc123",
      "event": "student.created",
      "statusCode": 200,
      "duration": 245,
      "timestamp": "2026-07-29T14:30:00Z",
      "request": {
        "headers": { ... },
        "body": { ... }
      },
      "response": {
        "headers": { ... },
        "body": "OK"
      }
    }
  ]
}
```

### 5.3 Webhook Inspector

```typescript
// Get webhook details
GET /api/v1/developer/webhooks/wh_abc123

// Get webhook stats
GET /api/v1/developer/webhooks/wh_abc123/stats

// Replay failed delivery
POST /api/v1/developer/webhooks/del_abc123/replay
```

---

## 6. SDK Downloads

### 6.1 Available SDKs

| Language | Package | Version | Install |
|---|---|---|---|
| **JavaScript/TypeScript** | `@educi/sdk` | 3.x | `npm install @educi/sdk` |
| **Python** | `educi-sdk` | 3.x | `pip install educi-sdk` |
| **Java** | `com.educi:sdk` | 3.x | Maven/Gradle |
| **Go** | `github.com/educi/sdk-go` | 3.x | `go get github.com/educi/sdk-go` |
| **PHP** | `educi/sdk` | 3.x | `composer require educi/sdk` |
| **Ruby** | `educi-sdk` | 3.x | `gem install educi-sdk` |

### 6.2 SDK Quick Start

```javascript
// JavaScript/TypeScript
import { EduCI } from '@educi/sdk';

const client = new EduCI({ apiKey: process.env.EDUCI_API_KEY });

// List students
const students = await client.students.list({
  schoolId: 'school_123',
  limit: 50,
});

// Create student
const student = await client.students.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  schoolId: 'school_123',
});

// Submit grade
const grade = await client.grades.create({
  studentId: student.id,
  courseId: 'crs_789',
  score: 95,
});
```

```python
# Python
from educi import EduCIClient

client = EduCIClient(api_key=os.environ["EDUCI_API_KEY"])

# List students
students = client.students.list(school_id="school_123", limit=50)

# Create student
student = client.students.create(
    first_name="John",
    last_name="Doe",
    email="john.doe@example.com",
    school_id="school_123"
)

# Submit grade
grade = client.grades.create(
    student_id=student.id,
    course_id="crs_789",
    score=95
)
```

```go
// Go
package main

import (
    "fmt"
    educi "github.com/educi/sdk-go"
)

func main() {
    client := educi.NewClient("your-api-key")
    
    // List students
    students, err := client.Students.List(&educi.StudentListParams{
        SchoolID: educi.String("school_123"),
        Limit:    educi.Int64(50),
    })
    
    fmt.Println(students)
}
```

### 6.3 SDK Configuration

```typescript
// Advanced configuration
const client = new EduCI({
  apiKey: process.env.EDUCI_API_KEY,
  baseUrl: 'https://api.educi.com',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  logger: console,
  userAgent: 'MyApp/1.0.0',
  headers: {
    'X-Custom-Header': 'custom-value',
  },
});
```

---

## 7. API Explorer

### 7.1 Interactive Documentation

The API Explorer provides interactive documentation where you can:

- Browse all API endpoints
- See request/response schemas
- Make test API calls
- View authentication requirements
- Download OpenAPI specification

### 7.2 API Reference

```yaml
openapi: 3.1.0
info:
  title: EduCI API
  version: 2.0.0
  description: EduCI Educational Management Platform API

paths:
  /students:
    get:
      summary: List students
      operationId: listStudents
      tags: [Students]
      parameters:
        - name: cursor
          in: query
          schema:
            type: string
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StudentListResponse'
    post:
      summary: Create student
      operationId: createStudent
      tags: [Students]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateStudentRequest'
      responses:
        '201':
          description: Created
```

---

## 8. Interactive Playground

### 8.1 API Playground

```typescript
// Playground API
GET /api/v1/developer/playground

// Execute test request
POST /api/v1/developer/playground/execute
{
  "method": "GET",
  "path": "/api/v1/students",
  "params": {
    "schoolId": "school_123",
    "limit": 10
  },
  "headers": {
    "X-API-Key": "educi_test_..."
  }
}

// Response
{
  "status": 200,
  "headers": {
    "content-type": "application/json",
    "x-request-id": "req_abc123"
  },
  "body": {
    "data": [...],
    "pagination": { ... }
  },
  "duration": 150,
  "size": 1024
}
```

### 8.2 Environment Variables

```typescript
// Playground environment
{
  "EDUCI_API_KEY": "educi_test_...",
  "SCHOOL_ID": "school_123",
  "STUDENT_ID": "stu_456",
  "COURSE_ID": "crs_789"
}
```

---

## 9. Code Samples

### 9.1 Quickstart Examples

| Example | Language | Description |
|---|---|---|
| **Hello World** | JavaScript | Basic API call |
| **Student CRUD** | Python | Create, read, update, delete |
| **Grade Submission** | Go | Submit grades |
| **Webhook Handler** | Node.js | Handle webhooks |
| **File Upload** | Python | Upload documents |

### 9.2 Example Code

```javascript
// Quickstart: Hello World
import { EduCI } from '@educi/sdk';

const client = new EduCI({
  apiKey: process.env.EDUCI_API_KEY,
});

async function main() {
  // List students
  const students = await client.students.list({
    limit: 10,
  });
  
  console.log(`Found ${students.data.length} students`);
  
  for (const student of students.data) {
    console.log(`${student.firstName} ${student.lastName}`);
  }
}

main().catch(console.error);
```

```python
# Quickstart: Webhook Handler
from flask import Flask, request, jsonify
import hmac
import hashlib

app = Flask(__name__)
WEBHOOK_SECRET = "your-webhook-secret"

def verify_signature(payload, signature, timestamp):
    signed_payload = f"{timestamp}.{payload}"
    expected = hmac.new(
        WEBHOOK_SECRET.encode(),
        signed_payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, f"sha256={expected}")

@app.route("/webhook", methods=["POST"])
def webhook():
    signature = request.headers.get("X-Webhook-Signature")
    timestamp = request.headers.get("X-Webhook-Timestamp")
    
    if not verify_signature(request.data.decode(), signature, timestamp):
        return jsonify({"error": "Invalid signature"}), 401
    
    event = request.json
    print(f"Received event: {event['type']}")
    
    return jsonify({"success": True}), 200

if __name__ == "__main__":
    app.run(port=3000)
```

---

## 10. Usage Analytics

### 10.1 Usage Dashboard

```typescript
// Get usage analytics
GET /api/v1/developer/usage?period=30d

// Response
{
  "period": {
    "start": "2026-06-29",
    "end": "2026-07-29"
  },
  "summary": {
    "totalRequests": 125000,
    "successfulRequests": 124000,
    "failedRequests": 1000,
    "successRate": 99.2,
    "averageLatency": 150,
    "p95Latency": 450
  },
  "byEndpoint": [
    {
      "endpoint": "GET /api/v1/students",
      "requests": 50000,
      "errors": 200,
      "avgLatency": 120
    },
    {
      "endpoint": "POST /api/v1/grades",
      "requests": 30000,
      "errors": 150,
      "avgLatency": 200
    }
  ],
  "byStatus": {
    "200": 124000,
    "400": 500,
    "401": 300,
    "429": 200,
    "500": 100
  },
  "byDay": [
    { "date": "2026-07-23", "requests": 4500 },
    { "date": "2026-07-24", "requests": 5200 },
    { "date": "2026-07-25", "requests": 3800 }
  ]
}
```

### 10.2 Error Analysis

```typescript
// Get error details
GET /api/v1/developer/usage/errors?limit=50

// Response
{
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "count": 500,
      "endpoints": ["POST /api/v1/students"],
      "lastOccurrence": "2026-07-29T14:30:00Z",
      "sample": {
        "error": "Email is required"
      }
    }
  ]
}
```

### 10.3 Performance Metrics

```typescript
// Get performance metrics
GET /api/v1/developer/usage/performance

// Response
{
  "latency": {
    "p50": 100,
    "p95": 450,
    "p99": 1200,
    "max": 5000
  },
  "throughput": {
    "requestsPerSecond": 45,
    "peakRPS": 120
  },
  "uptime": 99.99
}
```

---

## 11. Rate Limits

### 11.1 Current Limits

```typescript
// Get current rate limit status
GET /api/v1/developer/rate-limits

// Response
{
  "tier": "professional",
  "limits": {
    "requestsPerMinute": {
      "limit": 1000,
      "remaining": 742,
      "reset": 1700000060
    },
    "requestsPerHour": {
      "limit": 20000,
      "remaining": 18500,
      "reset": 1700003660
    },
    "requestsPerDay": {
      "limit": 200000,
      "remaining": 185000,
      "reset": 1700086400
    }
  }
}
```

### 11.2 Rate Limit Headers

```typescript
// Response headers
{
  "X-RateLimit-Limit": "1000",
  "X-RateLimit-Remaining": "742",
  "X-RateLimit-Reset": "1700000060",
  "X-RateLimit-Policy": "professional"
}
```

### 11.3 Rate Limit Tiers

| Tier | Requests/min | Requests/hour | Requests/day |
|---|---|---|---|
| **Free** | 60 | 1,000 | 10,000 |
| **Basic** | 300 | 5,000 | 50,000 |
| **Professional** | 1,000 | 20,000 | 200,000 |
| **Enterprise** | 5,000 | 100,000 | 1,000,000 |
| **Unlimited** | 50,000 | 1,000,000 | 10,000,000 |

---

## 12. Error Reference

### 12.1 HTTP Status Codes

| Code | Description |
|---|---|
| `200` | Success |
| `201` | Created |
| `204` | No Content |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `422` | Unprocessable Entity |
| `429` | Too Many Requests |
| `500` | Internal Server Error |
| `502` | Bad Gateway |
| `503` | Service Unavailable |

### 12.2 Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ],
    "documentation": "https://docs.educi.com/errors/VALIDATION_ERROR"
  },
  "requestId": "req_abc123"
}
```

---

## 13. Support

### 13.1 Support Channels

| Channel | Description | Response Time |
|---|---|---|
| **Documentation** | Self-service docs | Immediate |
| **Community Forum** | Developer community | 24 hours |
| **Email Support** | Email support | 48 hours |
| **Priority Support** | Dedicated support | 4 hours |
| **Enterprise Support** | Dedicated engineer | 1 hour |

### 13.2 Contact

- **Email**: developers@educi.com
- **Forum**: https://community.educi.com
- **Status Page**: https://status.educi.com
- **GitHub**: https://github.com/educi-platform

---

*EduCI Developer Portal — Phase 3 Documentation*
*Last Updated: 2026-07-29*
