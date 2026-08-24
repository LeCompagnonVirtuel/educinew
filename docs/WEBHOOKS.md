# EduCI Webhook Platform

> **Phase 3 — Enterprise Integration**
> Complete Webhook Platform documentation for the EduCI platform

---

## Table of Contents

1. [Overview](#1-overview)
2. [Webhook CRUD](#2-webhook-crud)
3. [Secret Management](#3-secret-management)
4. [Request Signing](#4-request-signing)
5. [Retry Policies](#5-retry-policies)
6. [Dead Letter Queue](#6-dead-letter-queue)
7. [Event Types](#7-event-types)
8. [Webhook Testing](#8-webhook-testing)
9. [Webhook Templates](#9-webhook-templates)
10. [Delivery Monitoring](#10-delivery-monitoring)
11. [Replay Protection](#11-replay-protection)
12. [Security Best Practices](#12-security-best-practices)
13. [Webhook Management API](#13-webhook-management-api)
14. [Integration Examples](#14-integration-examples)

---

## 1. Overview

### 1.1 Purpose

The EduCI Webhook Platform enables real-time event notification to external systems. When specific events occur within EduCI (e.g., a student is created, a grade is submitted), the platform delivers HTTP POST requests to configured URLs with signed payloads.

### 1.2 Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   EduCI Service   │────►│   Event Bus      │────►│  Webhook Engine   │
│   (Producer)      │     │                  │     │                   │
└──────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                           │
                                                           ▼
                                                 ┌──────────────────┐
                                                 │   Dispatcher     │
                                                 │   ┌────────────┐ │
                                                 │   │  Queue      │ │
                                                 │   └────────────┘ │
                                                 │   ┌────────────┐ │
                                                 │   │  Retrier    │ │
                                                 │   └────────────┘ │
                                                 │   ┌────────────┐ │
                                                 │   │  DLQ        │ │
                                                 │   └────────────┘ │
                                                 └────────┬─────────┘
                                                          │
                    ┌─────────────────────────────────────┼─────────────────────────────────────┐
                    │                                     │                                     │
              ┌─────▼─────┐                       ┌───────▼───────┐                       ┌─────▼─────┐
              │ Webhook 1 │                       │   Webhook 2   │                       │ Webhook 3 │
              │ Partner A │                       │   Partner B   │                       │ Partner C │
              └───────────┘                       └───────────────┘                       └───────────┘
```

### 1.3 Key Features

| Feature | Description |
|---|---|
| **CRUD Operations** | Create, read, update, delete webhooks |
| **Event Filtering** | Subscribe to specific event types |
| **Secret Management** | Encrypted secret storage with rotation |
| **Request Signing** | HMAC-SHA256 payload signatures |
| **Retry Policies** | Configurable exponential backoff |
| **Dead Letter Queue** | Failed delivery storage and replay |
| **Delivery Monitoring** | Real-time delivery status tracking |
| **Webhook Testing** | Test delivery before going live |
| **Replay Protection** | Idempotency keys prevent duplicates |
| **Rate Limiting** | Per-webhook delivery rate limits |

---

## 2. Webhook CRUD

### 2.1 Create Webhook

```typescript
// Request
POST /api/v1/webhooks
Content-Type: application/json
Authorization: Bearer <token>

{
  "url": "https://partner.example.com/educi-webhook",
  "events": [
    "student.created",
    "student.updated",
    "grade.submitted"
  ],
  "description": "Student data sync for Partner A",
  "secret": "whsec_custom_secret_here",
  "active": true,
  "metadata": {
    "schoolId": "school_123",
    "department": "registrar",
    "environment": "production"
  },
  "retryPolicy": {
    "maxRetries": 5,
    "backoffMultiplier": 2,
    "initialDelay": 1000,
    "maxDelay": 300000
  },
  "filters": {
    "schools": ["school_123", "school_456"],
    "departments": ["registrar", "academics"],
    "conditions": [
      {
        "field": "payload.status",
        "operator": "eq",
        "value": "active"
      }
    ]
  },
  "headers": {
    "X-Custom-Header": "custom-value"
  },
  "timeout": 30000,
  "contentFormat": "json"
}

// Response
{
  "success": true,
  "data": {
    "id": "wh_abc123def456",
    "url": "https://partner.example.com/educi-webhook",
    "events": ["student.created", "student.updated", "grade.submitted"],
    "description": "Student data sync for Partner A",
    "secret": "whsec_****",
    "active": true,
    "metadata": {
      "schoolId": "school_123",
      "department": "registrar",
      "environment": "production"
    },
    "retryPolicy": {
      "maxRetries": 5,
      "backoffMultiplier": 2,
      "initialDelay": 1000,
      "maxDelay": 300000
    },
    "filters": {
      "schools": ["school_123", "school_456"],
      "departments": ["registrar", "academics"],
      "conditions": [
        {
          "field": "payload.status",
          "operator": "eq",
          "value": "active"
        }
      ]
    },
    "headers": {
      "X-Custom-Header": "custom-value"
    },
    "timeout": 30000,
    "contentFormat": "json",
    "createdAt": "2026-07-29T10:00:00Z",
    "updatedAt": "2026-07-29T10:00:00Z",
    "deliveryStats": {
      "total": 0,
      "successful": 0,
      "failed": 0,
      "pending": 0
    }
  },
  "requestId": "req_xyz789"
}
```

### 2.2 List Webhooks

```typescript
// Request
GET /api/v1/webhooks?active=true&limit=50&cursor=wh_abc123
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": [
    {
      "id": "wh_abc123def456",
      "url": "https://partner.example.com/educi-webhook",
      "events": ["student.created", "student.updated", "grade.submitted"],
      "active": true,
      "createdAt": "2026-07-29T10:00:00Z",
      "deliveryStats": {
        "total": 1250,
        "successful": 1245,
        "failed": 5,
        "pending": 0
      }
    },
    {
      "id": "wh_xyz789abc123",
      "url": "https://notifications.example.com/webhook",
      "events": ["payment.received"],
      "active": true,
      "createdAt": "2026-07-28T15:00:00Z",
      "deliveryStats": {
        "total": 89,
        "successful": 89,
        "failed": 0,
        "pending": 0
      }
    }
  ],
  "pagination": {
    "cursor": "wh_xyz789abc123",
    "hasMore": true
  },
  "requestId": "req_abc123"
}
```

### 2.3 Get Webhook

```typescript
// Request
GET /api/v1/webhooks/wh_abc123def456
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": {
    "id": "wh_abc123def456",
    "url": "https://partner.example.com/educi-webhook",
    "events": ["student.created", "student.updated", "grade.submitted"],
    "description": "Student data sync for Partner A",
    "active": true,
    "createdAt": "2026-07-29T10:00:00Z",
    "updatedAt": "2026-07-29T10:00:00Z",
    "lastTriggeredAt": "2026-07-29T14:30:00Z",
    "deliveryStats": {
      "total": 1250,
      "successful": 1245,
      "failed": 5,
      "pending": 0,
      "successRate": 99.6,
      "avgLatency": 245
    }
  },
  "requestId": "req_abc123"
}
```

### 2.4 Update Webhook

```typescript
// Request
PUT /api/v1/webhooks/wh_abc123def456
Content-Type: application/json
Authorization: Bearer <token>

{
  "url": "https://partner.example.com/educi-webhook-v2",
  "events": [
    "student.created",
    "student.updated",
    "grade.submitted",
    "document.uploaded"
  ],
  "retryPolicy": {
    "maxRetries": 7
  }
}

// Response
{
  "success": true,
  "data": {
    "id": "wh_abc123def456",
    "url": "https://partner.example.com/educi-webhook-v2",
    "events": ["student.created", "student.updated", "grade.submitted", "document.uploaded"],
    "updatedAt": "2026-07-29T15:00:00Z"
  },
  "requestId": "req_abc123"
}
```

### 2.5 Delete Webhook

```typescript
// Request
DELETE /api/v1/webhooks/wh_abc123def456
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": {
    "id": "wh_abc123def456",
    "deleted": true,
    "deletedAt": "2026-07-29T15:00:00Z"
  },
  "requestId": "req_abc123"
}
```

### 2.6 Toggle Webhook

```typescript
// Request
POST /api/v1/webhooks/wh_abc123def456/toggle
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": {
    "id": "wh_abc123def456",
    "active": false,
    "updatedAt": "2026-07-29T15:00:00Z"
  },
  "requestId": "req_abc123"
}
```

---

## 3. Secret Management

### 3.1 Secret Storage

```typescript
// Secrets are stored encrypted using AES-256-GCM
interface WebhookSecret {
  id: string;
  webhookId: string;
  name: string;
  encryptedValue: string;  // AES-256-GCM encrypted
  iv: string;              // Initialization vector
  tag: string;             // Authentication tag
  algorithm: 'aes-256-gcm';
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  rotationPolicy?: {
    enabled: boolean;
    intervalDays: number;
    lastRotated?: Date;
  };
}
```

### 3.2 Secret Generation

```typescript
// Generate a secure webhook secret
function generateWebhookSecret(): string {
  const bytes = crypto.randomBytes(32);
  return `whsec_${bytes.toString('base64url')}`;
}

// Secret format
// whsec_[base64url-encoded 32 bytes]
// Example: whsec_MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE
```

### 3.3 Secret Rotation

```typescript
// Automatic secret rotation
const rotationConfig = {
  enabled: true,
  intervalDays: 90,
  gracePeriodDays: 7,  // Keep old secret valid during rotation
  notifyBefore: 14,    // Days before expiry to notify
};

// Manual secret rotation
POST /api/v1/webhooks/wh_abc123/rotate-secret
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": {
    "oldSecret": "whsec_****",
    "newSecret": "whsec_new_secret_here",
    "validUntil": "2026-08-05T15:00:00Z",
    "message": "Old secret will remain valid for 7 days"
  }
}
```

### 3.4 Secret Access

```typescript
// Retrieve secret (masked by default)
GET /api/v1/webhooks/wh_abc123/secret
Authorization: Bearer <token>

// Response (masked)
{
  "success": true,
  "data": {
    "name": "webhook-secret",
    "masked": "whsec_****def456",
    "createdAt": "2026-07-29T10:00:00Z",
    "expiresAt": "2026-10-27T10:00:00Z",
    "rotationPolicy": {
      "enabled": true,
      "intervalDays": 90
    }
  }
}

// Retrieve secret (full - requires admin)
GET /api/v1/webhooks/wh_abc123/secret?reveal=true
Authorization: Bearer <admin-token>

// Response (full)
{
  "success": true,
  "data": {
    "name": "webhook-secret",
    "value": "whsec_MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE",
    "createdAt": "2026-07-29T10:00:00Z"
  }
}
```

---

## 4. Request Signing

### 4.1 HMAC-SHA256 Signing

Every webhook delivery is signed using HMAC-SHA256 with the webhook's secret.

```typescript
// Signing algorithm
function signWebhookPayload(
  payload: string,
  secret: string,
  timestamp: string
): string {
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  return `sha256=${signature}`;
}

// Headers sent with each webhook delivery
interface WebhookHeaders {
  'Content-Type': 'application/json';
  'X-Webhook-ID': string;           // Webhook identifier
  'X-Webhook-Timestamp': string;    // Unix timestamp (seconds)
  'X-Webhook-Signature': string;    // HMAC-SHA256 signature
  'X-Webhook-Event': string;        // Event type
  'X-Webhook-Delivery': string;     // Unique delivery ID
  'X-Webhook-Retry': string;        // Retry attempt number
  'User-Agent': string;             // EduCI-Webhook/1.0
}
```

### 4.2 Signature Verification

```typescript
// Node.js verification
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
  timestamp: string,
  tolerance: number = 300  // 5 minutes
): boolean {
  // 1. Check timestamp tolerance
  const now = Math.floor(Date.now() / 1000);
  const webhookTimestamp = parseInt(timestamp);
  if (Math.abs(now - webhookTimestamp) > tolerance) {
    throw new Error('Timestamp too old or too new');
  }

  // 2. Compute expected signature
  const expectedSignature = signWebhookPayload(payload, secret, timestamp);

  // 3. Constant-time comparison
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Express middleware
function verifyWebhook(secret: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers['x-webhook-signature'] as string;
    const timestamp = req.headers['x-webhook-timestamp'] as string;
    const body = JSON.stringify(req.body);

    if (!verifyWebhookSignature(body, signature, secret, timestamp)) {
      return res.status(401).json({
        error: {
          code: 'INVALID_SIGNATURE',
          message: 'Webhook signature verification failed',
        },
      });
    }

    next();
  };
}
```

### 4.3 Signature Example

```typescript
// Webhook delivery example
const webhookPayload = {
  id: 'evt_abc123',
  type: 'student.created',
  timestamp: '2026-07-29T10:00:00Z',
  data: {
    id: 'stu_456',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    grade: 10,
    schoolId: 'school_123',
  },
};

const secret = 'whsec_MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE';
const timestamp = Math.floor(Date.now() / 1000).toString();
const payload = JSON.stringify(webhookPayload);
const signature = signWebhookPayload(payload, secret, timestamp);

// Headers
{
  'Content-Type': 'application/json',
  'X-Webhook-ID': 'wh_abc123def456',
  'X-Webhook-Timestamp': '1700000000',
  'X-Webhook-Signature': 'sha256=a1b2c3d4e5f6...',
  'X-Webhook-Event': 'student.created',
  'X-Webhook-Delivery': 'del_xyz789',
  'X-Webhook-Retry': '1',
  'User-Agent': 'EduCI-Webhook/1.0',
}

// Body
{
  "id": "evt_abc123",
  "type": "student.created",
  "timestamp": "2026-07-29T10:00:00Z",
  "data": {
    "id": "stu_456",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "grade": 10,
    "schoolId": "school_123"
  }
}
```

---

## 5. Retry Policies

### 5.1 Default Retry Schedule

```
Attempt 1:  Immediate delivery
Attempt 2:  1 second delay
Attempt 3:  4 seconds delay
Attempt 4:  16 seconds delay
Attempt 5:  64 seconds delay
Attempt 6:  300 seconds delay (max)
Attempt 7:  300 seconds delay (max)
```

### 5.2 Exponential Backoff

```typescript
interface RetryPolicy {
  maxRetries: number;              // Maximum retry attempts
  backoffMultiplier: number;       // Multiplier for delay
  initialDelay: number;            // Initial delay in ms
  maxDelay: number;                // Maximum delay in ms
  jitter: boolean;                 // Add random jitter
  retryableStatusCodes: number[];  // HTTP codes that trigger retry
}

const defaultRetryPolicy: RetryPolicy = {
  maxRetries: 5,
  backoffMultiplier: 2,
  initialDelay: 1000,
  maxDelay: 300000,
  jitter: true,
  retryableStatusCodes: [408, 429, 500, 502, 503, 504],
};

// Calculate delay for attempt
function calculateRetryDelay(
  attempt: number,
  policy: RetryPolicy
): number {
  let delay = policy.initialDelay * Math.pow(policy.backoffMultiplier, attempt - 1);
  delay = Math.min(delay, policy.maxDelay);
  
  if (policy.jitter) {
    delay = delay * (0.5 + Math.random() * 0.5);
  }
  
  return Math.floor(delay);
}

// Example delays
// Attempt 1: 1000ms
// Attempt 2: 2000ms
// Attempt 3: 4000ms
// Attempt 4: 8000ms
// Attempt 5: 16000ms
// Attempt 6: 32000ms (capped at 300000ms)
```

### 5.3 Retryable Status Codes

| Code | Description | Retry |
|---|---|---|
| `200` | Success | No |
| `201` | Created | No |
| `202` | Accepted | No |
| `400` | Bad Request | No |
| `401` | Unauthorized | No |
| `403` | Forbidden | No |
| `404` | Not Found | No |
| `408` | Request Timeout | Yes |
| `429` | Too Many Requests | Yes (with delay) |
| `500` | Internal Server Error | Yes |
| `502` | Bad Gateway | Yes |
| `503` | Service Unavailable | Yes |
| `504` | Gateway Timeout | Yes |

### 5.4 Custom Retry Policies

```typescript
// Create webhook with custom retry policy
POST /api/v1/webhooks
{
  "url": "https://partner.example.com/webhook",
  "events": ["payment.received"],
  "retryPolicy": {
    "maxRetries": 10,
    "backoffMultiplier": 1.5,
    "initialDelay": 500,
    "maxDelay": 600000,
    "jitter": true,
    "retryableStatusCodes": [408, 429, 500, 502, 503, 504]
  }
}
```

---

## 6. Dead Letter Queue

### 6.1 DLQ Overview

Failed webhook deliveries after max retries are moved to the Dead Letter Queue (DLQ) for manual review and replay.

```typescript
interface DeadLetterEntry {
  id: string;
  webhookId: string;
  deliveryId: string;
  event: string;
  payload: Record<string, any>;
  headers: Record<string, string>;
  attempts: DeliveryAttempt[];
  lastError: string;
  lastStatusCode: number;
  createdAt: Date;
  replayable: boolean;
  metadata: Record<string, any>;
}

interface DeliveryAttempt {
  attempt: number;
  timestamp: Date;
  statusCode: number;
  responseHeaders: Record<string, string>;
  responseBody?: string;
  duration: number;
  error?: string;
}
```

### 6.2 DLQ API

```typescript
// List dead letters
GET /api/v1/webhooks/dead-letters?webhookId=wh_abc123&limit=50

// Response
{
  "success": true,
  "data": [
    {
      "id": "dl_abc123",
      "webhookId": "wh_abc123def456",
      "deliveryId": "del_xyz789",
      "event": "student.created",
      "payload": {
        "id": "stu_456",
        "firstName": "John",
        "lastName": "Doe"
      },
      "attempts": [
        {
          "attempt": 1,
          "timestamp": "2026-07-29T10:00:00Z",
          "statusCode": 503,
          "duration": 30000,
          "error": "Service Unavailable"
        },
        {
          "attempt": 2,
          "timestamp": "2026-07-29T10:00:01Z",
          "statusCode": 503,
          "duration": 30000,
          "error": "Service Unavailable"
        }
      ],
      "lastError": "Service Unavailable",
      "lastStatusCode": 503,
      "createdAt": "2026-07-29T10:05:00Z",
      "replayable": true
    }
  ],
  "pagination": {
    "total": 5,
    "limit": 50
  }
}

// Replay dead letter
POST /api/v1/webhooks/dead-letters/dl_abc123/replay
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": {
    "deliveryId": "del_new123",
    "status": "queued",
    "message": "Delivery queued for replay"
  }
}

// Delete dead letter
DELETE /api/v1/webhooks/dead-letters/dl_abc123
Authorization: Bearer <token>

// Bulk replay
POST /api/v1/webhooks/dead-letters/bulk-replay
{
  "ids": ["dl_abc123", "dl_def456", "dl_ghi789"]
}
```

### 6.3 DLQ Retention

```typescript
const dlqConfig = {
  retentionDays: 30,           // Keep failed deliveries for 30 days
  maxEntries: 10000,           // Maximum DLQ entries per webhook
  alertThreshold: 100,         // Alert when DLQ exceeds this count
  autoCleanup: true,           // Auto-remove after retention period
  compression: true,           // Compress old entries
};
```

---

## 7. Event Types

### 7.1 Complete Event Reference

#### Student Events

| Event | Description | Payload |
|---|---|---|
| `student.created` | New student enrolled | Student object |
| `student.updated` | Student information changed | Updated fields |
| `student.enrolled` | Student enrolled in course | Enrollment details |
| `student.graduated` | Student graduated | Graduation record |
| `student.withdrawn` | Student withdrew | Withdrawal record |
| `student.suspended` | Student suspended | Suspension details |

#### Teacher Events

| Event | Description | Payload |
|---|---|---|
| `teacher.created` | New teacher added | Teacher object |
| `teacher.updated` | Teacher information changed | Updated fields |
| `teacher.assigned` | Teacher assigned to course | Assignment details |
| `teacher.unassigned` | Teacher removed from course | Removal details |

#### Academic Events

| Event | Description | Payload |
|---|---|---|
| `grade.submitted` | Grade submitted | Grade record |
| `grade.updated` | Grade modified | Updated grade |
| `grade.published` | Grades published to students | Publication details |
| `exam.scheduled` | Exam scheduled | Exam details |
| `exam.completed` | Exam completed | Results summary |
| `report.generated` | Report card generated | Report details |
| `report.delivered` | Report delivered to parent | Delivery status |

#### Financial Events

| Event | Description | Payload |
|---|---|---|
| `payment.received` | Payment received | Payment record |
| `payment.failed` | Payment failed | Error details |
| `payment.refunded` | Payment refunded | Refund record |
| `invoice.generated` | Invoice created | Invoice details |
| `invoice.paid` | Invoice paid | Payment details |
| `invoice.overdue` | Invoice overdue | Overdue details |
| `subscription.created` | Subscription created | Subscription details |
| `subscription.updated` | Subscription changed | Change details |
| `subscription.cancelled` | Subscription cancelled | Cancellation details |

#### Document Events

| Event | Description | Payload |
|---|---|---|
| `document.uploaded` | Document uploaded | Document metadata |
| `document.signed` | Document signed | Signature details |
| `document.approved` | Document approved | Approval details |
| `document.rejected` | Document rejected | Rejection reasons |
| `document.shared` | Document shared | Sharing details |

#### Attendance Events

| Event | Description | Payload |
|---|---|---|
| `attendance.marked` | Attendance recorded | Attendance record |
| `attendance.alert` | Absence threshold reached | Alert details |
| `attendance.corrected` | Attendance corrected | Correction details |

#### Communication Events

| Event | Description | Payload |
|---|---|---|
| `message.sent` | Message sent | Message details |
| `message.delivered` | Message delivered | Delivery status |
| `message.read` | Message read | Read receipt |
| `notification.delivered` | Notification delivered | Delivery details |

#### Integration Events

| Event | Description | Payload |
|---|---|---|
| `connector.connected` | Connector connected | Connection details |
| `connector.disconnected` | Connector disconnected | Disconnection details |
| `connector.error` | Connector error | Error details |
| `sync.started` | Data sync started | Sync details |
| `sync.completed` | Data sync completed | Sync summary |
| `sync.failed` | Data sync failed | Error details |

#### Automation Events

| Event | Description | Payload |
|---|---|---|
| `workflow.started` | Workflow execution started | Execution details |
| `workflow.completed` | Workflow completed | Result summary |
| `workflow.failed` | Workflow failed | Error details |
| `workflow.step.completed` | Workflow step completed | Step result |
| `workflow.step.failed` | Workflow step failed | Error details |
| `workflow.approval.requested` | Approval requested | Approval details |
| `workflow.approval.granted` | Approval granted | Grant details |
| `workflow.approval.rejected` | Approval rejected | Rejection details |

### 7.2 Event Payload Structure

```typescript
interface WebhookEvent {
  id: string;                    // Unique event ID
  type: string;                  // Event type
  timestamp: string;             // ISO 8601 timestamp
  version: string;               // Event schema version
  correlationId: string;         // Request correlation ID
  data: Record<string, any>;     // Event-specific data
  metadata?: Record<string, any>; // Additional metadata
}
```

---

## 8. Webhook Testing

### 8.1 Test Delivery

```typescript
// Send test webhook
POST /api/v1/webhooks/wh_abc123/test
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": {
    "deliveryId": "del_test_abc123",
    "status": "delivered",
    "statusCode": 200,
    "duration": 245,
    "responseBody": "OK",
    "request": {
      "url": "https://partner.example.com/educi-webhook",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "X-Webhook-ID": "wh_abc123def456",
        "X-Webhook-Timestamp": "1700000000",
        "X-Webhook-Signature": "sha256=test...",
        "X-Webhook-Event": "test.ping",
        "X-Webhook-Delivery": "del_test_abc123",
        "User-Agent": "EduCI-Webhook/1.0"
      },
      "body": {
        "id": "evt_test_abc123",
        "type": "test.ping",
        "timestamp": "2026-07-29T10:00:00Z",
        "data": {
          "message": "This is a test webhook delivery"
        }
      }
    },
    "response": {
      "statusCode": 200,
      "headers": {
        "content-type": "application/json"
      },
      "body": "OK"
    }
  },
  "requestId": "req_test_abc123"
}
```

### 8.2 Test with Custom Payload

```typescript
// Send test with custom payload
POST /api/v1/webhooks/wh_abc123/test
Content-Type: application/json
Authorization: Bearer <token>

{
  "eventType": "student.created",
  "payload": {
    "id": "stu_test_123",
    "firstName": "Test",
    "lastName": "Student",
    "email": "test@example.com",
    "grade": 10,
    "schoolId": "school_123"
  }
}
```

### 8.3 Webhook Inspector

```typescript
// Get recent deliveries for inspection
GET /api/v1/webhooks/wh_abc123/deliveries?limit=10
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": [
    {
      "id": "del_abc123",
      "event": "student.created",
      "status": "delivered",
      "statusCode": 200,
      "duration": 245,
      "timestamp": "2026-07-29T14:30:00Z",
      "request": {
        "url": "https://partner.example.com/educi-webhook",
        "method": "POST",
        "headers": { ... },
        "body": { ... }
      },
      "response": {
        "statusCode": 200,
        "headers": { ... },
        "body": "OK"
      }
    }
  ]
}
```

---

## 9. Webhook Templates

### 9.1 Pre-built Templates

| Template ID | Name | Events | Use Case |
|---|---|---|---|
| `tpl_student_sync` | Student Sync | `student.*` | SIS integration |
| `tpl_grade_notify` | Grade Notification | `grade.*` | Parent notification |
| `tpl_payment_processor` | Payment Processor | `payment.*`, `invoice.*` | Financial system |
| `tpl_document_archive` | Document Archive | `document.*` | Compliance archival |
| `tpl_attendance_alert` | Attendance Alert | `attendance.*` | Parent notification |
| `tpl_workflow_monitor` | Workflow Monitor | `workflow.*` | Process monitoring |

### 9.2 Using Templates

```typescript
// Create webhook from template
POST /api/v1/webhooks/from-template
Content-Type: application/json
Authorization: Bearer <token>

{
  "templateId": "tpl_student_sync",
  "url": "https://partner.example.com/educi-webhook",
  "overrides": {
    "description": "Student sync for Partner A",
    "filters": {
      "schools": ["school_123"]
    }
  }
}

// Response
{
  "success": true,
  "data": {
    "id": "wh_new_abc123",
    "url": "https://partner.example.com/educi-webhook",
    "events": ["student.created", "student.updated", "student.enrolled", "student.graduated"],
    "description": "Student sync for Partner A",
    "templateUsed": "tpl_student_sync",
    "createdAt": "2026-07-29T10:00:00Z"
  }
}
```

### 9.3 Custom Templates

```typescript
// Save webhook as template
POST /api/v1/webhooks/wh_abc123/save-as-template
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Custom Student Sync",
  "description": "Custom template for student synchronization",
  "public": false
}
```

---

## 10. Delivery Monitoring

### 10.1 Delivery Status

```typescript
interface DeliveryStatus {
  id: string;
  webhookId: string;
  eventId: string;
  event: string;
  status: 'queued' | 'delivering' | 'delivered' | 'failed' | 'retrying';
  attempt: number;
  maxAttempts: number;
  statusCode?: number;
  duration?: number;
  error?: string;
  nextRetryAt?: Date;
  createdAt: Date;
  deliveredAt?: Date;
}
```

### 10.2 Delivery Statistics

```typescript
// Get webhook delivery statistics
GET /api/v1/webhooks/wh_abc123/stats?period=7d

// Response
{
  "success": true,
  "data": {
    "period": {
      "start": "2026-07-22T00:00:00Z",
      "end": "2026-07-29T00:00:00Z"
    },
    "summary": {
      "totalDeliveries": 1250,
      "successful": 1245,
      "failed": 5,
      "successRate": 99.6,
      "avgLatency": 245,
      "p95Latency": 450,
      "p99Latency": 890
    },
    "byEvent": {
      "student.created": {
        "total": 500,
        "successful": 498,
        "failed": 2
      },
      "student.updated": {
        "total": 600,
        "successful": 599,
        "failed": 1
      },
      "grade.submitted": {
        "total": 150,
        "successful": 148,
        "failed": 2
      }
    },
    "byHour": [
      { "hour": 0, "deliveries": 10 },
      { "hour": 1, "deliveries": 5 },
      { "hour": 9, "deliveries": 150 },
      { "hour": 10, "deliveries": 200 },
      { "hour": 14, "deliveries": 180 }
    ],
    "errors": [
      {
        "statusCode": 503,
        "count": 3,
        "lastOccurrence": "2026-07-29T14:30:00Z"
      },
      {
        "statusCode": 504,
        "count": 2,
        "lastOccurrence": "2026-07-28T11:00:00Z"
      }
    ]
  }
}
```

### 10.3 Real-time Monitoring

```typescript
// WebSocket subscription for delivery updates
const ws = new WebSocket('wss://api.educi.com/ws/webhooks');

ws.send(JSON.stringify({
  action: 'subscribe',
  webhookId: 'wh_abc123',
  events: ['delivery.completed', 'delivery.failed']
}));

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Delivery update:', data);
};

// Events
{
  "event": "delivery.completed",
  "data": {
    "deliveryId": "del_abc123",
    "webhookId": "wh_abc123",
    "statusCode": 200,
    "duration": 245
  }
}

{
  "event": "delivery.failed",
  "data": {
    "deliveryId": "del_def456",
    "webhookId": "wh_abc123",
    "statusCode": 503,
    "error": "Service Unavailable",
    "attempt": 3,
    "maxAttempts": 5
  }
}
```

### 10.4 Alerts

```typescript
// Configure webhook alerts
PUT /api/v1/webhooks/wh_abc123/alerts
Content-Type: application/json
Authorization: Bearer <token>

{
  "enabled": true,
  "channels": ["email", "slack"],
  "conditions": {
    "failureRate": {
      "threshold": 5,           // Alert if failure rate > 5%
      "window": "1h"            // Over 1 hour window
    },
    "consecutiveFailures": {
      "threshold": 3            // Alert after 3 consecutive failures
    },
    "deliveryLatency": {
      "p95Threshold": 5000,     // Alert if P95 latency > 5 seconds
      "window": "5m"
    },
    "dlqSize": {
      "threshold": 50           // Alert if DLQ has > 50 entries
    }
  },
  "recipients": [
    {
      "type": "email",
      "address": "team@example.com"
    },
    {
      "type": "slack",
      "webhook": "https://hooks.slack.com/services/..."
    }
  ]
}
```

---

## 11. Replay Protection

### 11.1 Idempotency Keys

Every webhook delivery includes a unique delivery ID to prevent duplicate processing.

```typescript
// Delivery ID structure
// del_[timestamp]_[random]
// Example: del_1700000000_abc123

// Receiver implementation
const processedDeliveries = new Set<string>();

function handleWebhook(req: Request, res: Response) {
  const deliveryId = req.headers['x-webhook-delivery'] as string;
  
  // Check if already processed
  if (processedDeliveries.has(deliveryId)) {
    return res.status(200).json({ duplicate: true });
  }
  
  // Process webhook
  processWebhookPayload(req.body);
  
  // Mark as processed
  processedDeliveries.add(deliveryId);
  
  // Store for deduplication window (24 hours)
  redis.setex(`webhook:${deliveryId}`, 86400, 'processed');
  
  res.status(200).json({ success: true });
}
```

### 11.2 Timestamp Validation

```typescript
// Validate webhook timestamp
function validateTimestamp(timestamp: string, tolerance: number = 300): boolean {
  const now = Math.floor(Date.now() / 1000);
  const webhookTime = parseInt(timestamp);
  
  // Reject if timestamp is too old or too far in the future
  return Math.abs(now - webhookTime) <= tolerance;
}

// Use in handler
app.post('/webhook', (req, res) => {
  const timestamp = req.headers['x-webhook-timestamp'] as string;
  
  if (!validateTimestamp(timestamp)) {
    return res.status(400).json({
      error: 'Invalid or expired timestamp'
    });
  }
  
  // Process webhook...
});
```

### 11.3 Replay Protection Headers

```typescript
// Headers for replay protection
{
  'X-Webhook-ID': 'wh_abc123def456',           // Webhook identifier
  'X-Webhook-Timestamp': '1700000000',         // Unix timestamp
  'X-Webhook-Signature': 'sha256=...',         // HMAC signature
  'X-Webhook-Delivery': 'del_1700000000_abc',  // Unique delivery ID
  'X-Webhook-Retry': '1',                      // Retry attempt
}
```

---

## 12. Security Best Practices

### 12.1 Endpoint Security

```typescript
// 1. Always verify signatures
app.post('/webhook', verifyWebhook(secret), (req, res) => {
  // Process verified webhook
});

// 2. Use HTTPS only
// Webhook URLs must start with https://

// 3. Validate timestamps
// Reject webhooks with timestamps older than 5 minutes

// 4. Implement idempotency
// Use delivery ID to prevent duplicate processing

// 5. Return 200 quickly
// Process asynchronously if needed

// 6. Log all webhook deliveries
// For debugging and audit purposes
```

### 12.2 Secret Management

```typescript
// 1. Use strong secrets
const secret = crypto.randomBytes(32).toString('base64url');

// 2. Rotate secrets regularly
// Every 90 days for production

// 3. Store secrets securely
// Use encrypted storage, not environment variables

// 4. Never log secrets
// Mask secrets in logs and error messages

// 5. Use separate secrets per webhook
// Isolate security impact
```

### 12.3 Rate Limiting

```typescript
// Implement rate limiting on webhook endpoints
const webhookRateLimit = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 100,              // 100 requests per minute
  keyGenerator: (req) => req.headers['x-webhook-id'] || req.ip,
  message: {
    error: 'Too many webhook deliveries',
  },
});

app.post('/webhook', webhookRateLimit, verifyWebhook(secret), handler);
```

---

## 13. Webhook Management API

### 13.1 Complete API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/webhooks` | List webhooks |
| `POST` | `/api/v1/webhooks` | Create webhook |
| `GET` | `/api/v1/webhooks/:id` | Get webhook |
| `PUT` | `/api/v1/webhooks/:id` | Update webhook |
| `DELETE` | `/api/v1/webhooks/:id` | Delete webhook |
| `POST` | `/api/v1/webhooks/:id/toggle` | Toggle webhook |
| `POST` | `/api/v1/webhooks/:id/test` | Test webhook |
| `POST` | `/api/v1/webhooks/:id/rotate-secret` | Rotate secret |
| `GET` | `/api/v1/webhooks/:id/secret` | Get secret |
| `GET` | `/api/v1/webhooks/:id/deliveries` | List deliveries |
| `GET` | `/api/v1/webhooks/:id/stats` | Get statistics |
| `GET` | `/api/v1/webhooks/:id/deliveries/:deliveryId` | Get delivery |
| `POST` | `/api/v1/webhooks/:id/deliveries/:deliveryId/replay` | Replay delivery |
| `GET` | `/api/v1/webhooks/dead-letters` | List dead letters |
| `POST` | `/api/v1/webhooks/dead-letters/:id/replay` | Replay dead letter |
| `POST` | `/api/v1/webhooks/dead-letters/bulk-replay` | Bulk replay |
| `DELETE` | `/api/v1/webhooks/dead-letters/:id` | Delete dead letter |
| `POST` | `/api/v1/webhooks/from-template` | Create from template |
| `PUT` | `/api/v1/webhooks/:id/alerts` | Configure alerts |

---

## 14. Integration Examples

### 14.1 Node.js Receiver

```typescript
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json({ limit: '1mb' }));

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

function verifySignature(payload: string, signature: string, timestamp: string): boolean {
  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = `sha256=${crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(signedPayload)
    .digest('hex')}`;
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'] as string;
  const timestamp = req.headers['x-webhook-timestamp'] as string;
  const deliveryId = req.headers['x-webhook-delivery'] as string;
  const eventType = req.headers['x-webhook-event'] as string;
  
  // Verify signature
  const payload = JSON.stringify(req.body);
  if (!verifySignature(payload, signature, timestamp)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Validate timestamp (5 minute tolerance)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) {
    return res.status(400).json({ error: 'Invalid timestamp' });
  }
  
  // Check for duplicate delivery
  if (isAlreadyProcessed(deliveryId)) {
    return res.status(200).json({ duplicate: true });
  }
  
  // Process based on event type
  switch (eventType) {
    case 'student.created':
      handleStudentCreated(req.body);
      break;
    case 'grade.submitted':
      handleGradeSubmitted(req.body);
      break;
    default:
      console.log(`Unhandled event: ${eventType}`);
  }
  
  // Mark as processed
  markAsProcessed(deliveryId);
  
  res.status(200).json({ success: true });
});

app.listen(3000, () => {
  console.log('Webhook receiver running on port 3000');
});
```

### 14.2 Python Receiver

```python
from flask import Flask, request, jsonify
import hmac
import hashlib
import time
import os

app = Flask(__name__)
WEBHOOK_SECRET = os.environ.get('WEBHOOK_SECRET')

def verify_signature(payload: bytes, signature: str, timestamp: str) -> bool:
    signed_payload = f"{timestamp}.".encode() + payload
    expected = hmac.new(
        WEBHOOK_SECRET.encode(),
        signed_payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, f"sha256={expected}")

@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('X-Webhook-Signature')
    timestamp = request.headers.get('X-Webhook-Timestamp')
    delivery_id = request.headers.get('X-Webhook-Delivery')
    event_type = request.headers.get('X-Webhook-Event')
    
    # Verify signature
    if not verify_signature(request.data, signature, timestamp):
        return jsonify({'error': 'Invalid signature'}), 401
    
    # Validate timestamp
    now = int(time.time())
    if abs(now - int(timestamp)) > 300:
        return jsonify({'error': 'Invalid timestamp'}), 400
    
    # Process webhook
    data = request.json
    
    if event_type == 'student.created':
        handle_student_created(data)
    elif event_type == 'grade.submitted':
        handle_grade_submitted(data)
    
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(port=3000)
```

### 14.3 Webhook URL Validation

```typescript
// Validate webhook URL before saving
async function validateWebhookUrl(url: string): Promise<{
  valid: boolean;
  error?: string;
  responseTime?: number;
}> {
  try {
    // Must be HTTPS
    if (!url.startsWith('https://')) {
      return { valid: false, error: 'URL must use HTTPS' };
    }
    
    // Must be a valid URL
    new URL(url);
    
    // Test connectivity
    const start = Date.now();
    const response = await fetch(url, {
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'EduCI-Webhook-Validator/1.0',
      },
    });
    const responseTime = Date.now() - start;
    
    if (response.ok) {
      return { valid: true, responseTime };
    }
    
    return {
      valid: false,
      error: `Server returned ${response.status}`,
      responseTime,
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message || 'Failed to connect to URL',
    };
  }
}
```

---

*EduCI Webhook Platform — Phase 3 Documentation*
*Last Updated: 2026-07-29*
