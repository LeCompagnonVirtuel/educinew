# EduCI API Gateway

> **Phase 3 — Enterprise Integration**
> Complete API Gateway documentation for the EduCI platform

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture](#2-architecture)
3. [Authentication Methods](#3-authentication-methods)
4. [Rate Limiting](#4-rate-limiting)
5. [API Versioning](#5-api-versioning)
6. [Request Validation](#6-request-validation)
7. [Response Handling](#7-response-handling)
8. [API Analytics](#8-api-analytics)
9. [SDK Generation](#9-sdk-generation)
10. [Gateway Configuration](#10-gateway-configuration)
11. [Security Headers](#11-security-headers)
12. [CORS Configuration](#12-cors-configuration)
13. [Circuit Breaker Pattern](#13-circuit-breaker-pattern)
14. [API Lifecycle Management](#14-api-lifecycle-management)
15. [Monitoring and Logging](#15-monitoring-and-logging)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. Overview

### 1.1 Purpose

The EduCI API Gateway serves as the centralized entry point for all external API requests to the EduCI platform. It handles cross-cutting concerns including authentication, authorization, rate limiting, request validation, logging, and analytics, allowing downstream services to focus on business logic.

### 1.2 Key Responsibilities

| Responsibility | Description |
|---|---|
| **Authentication** | Verify API keys, OAuth tokens, JWTs, and OIDC tokens |
| **Authorization** | Enforce access control policies |
| **Rate Limiting** | Prevent abuse and ensure fair usage |
| **Request Validation** | Validate request schemas and content types |
| **Response Transformation** | Normalize responses across services |
| **Logging** | Record all API requests and responses |
| **Analytics** | Track usage patterns, latency, and errors |
| **Caching** | Cache responses where appropriate |
| **Circuit Breaking** | Protect against cascading failures |
| **Load Balancing** | Distribute requests across service instances |

### 1.3 Architecture

```
                         ┌─────────────────────────────┐
                         │       Load Balancer          │
                         └──────────────┬──────────────┘
                                        │
                         ┌──────────────▼──────────────┐
                         │       API Gateway            │
                         │  ┌────────────────────────┐  │
                         │  │    Rate Limiter         │  │
                         │  └────────────────────────┘  │
                         │  ┌────────────────────────┐  │
                         │  │    Authenticator        │  │
                         │  └────────────────────────┘  │
                         │  ┌────────────────────────┐  │
                         │  │    Authorizer           │  │
                         │  └────────────────────────┘  │
                         │  ┌────────────────────────┐  │
                         │  │    Validator            │  │
                         │  └────────────────────────┘  │
                         │  ┌────────────────────────┐  │
                         │  │    Router               │  │
                         │  └────────────────────────┘  │
                         │  ┌────────────────────────┐  │
                         │  │    Circuit Breaker      │  │
                         │  └────────────────────────┘  │
                         └──────────────┬──────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
          ┌─────────▼─────────┐ ┌──────▼──────┐ ┌─────────▼─────────┐
          │   Student Service │ │  Academic   │ │   Finance Service │
          └───────────────────┘ │  Service    │ └───────────────────┘
                                └─────────────┘
```

---

## 2. Architecture

### 2.1 Request Flow

```
Client → TLS Termination → Rate Limiter → Authentication →
Authorization → Request Validation → Route Matching →
Circuit Breaker → Service Proxy → Response Transformation →
Logging → Client
```

### 2.2 Middleware Pipeline

```typescript
// Gateway middleware pipeline
const gateway = createGateway({
  middleware: [
    // 1. Security headers
    helmetMiddleware(),
    
    // 2. CORS
    corsMiddleware(corsConfig),
    
    // 3. Request ID generation
    requestIdMiddleware(),
    
    // 4. Rate limiting
    rateLimitMiddleware(rateLimitConfig),
    
    // 5. Authentication
    authMiddleware(authConfig),
    
    // 6. Authorization
    authorizationMiddleware(authzConfig),
    
    // 7. Request validation
    validationMiddleware(validationConfig),
    
    // 8. Request logging
    requestLoggerMiddleware(),
    
    // 9. Circuit breaker
    circuitBreakerMiddleware(circuitBreakerConfig),
    
    // 10. Service proxy
    serviceProxyMiddleware(proxyConfig),
    
    // 11. Response transformation
    responseTransformerMiddleware(),
    
    // 12. Response logging
    responseLoggerMiddleware(),
  ],
});
```

### 2.3 Service Registry

```typescript
const serviceRegistry = {
  'student-service': {
    url: process.env.STUDENT_SERVICE_URL || 'http://student-service:3001',
    healthCheck: '/health',
    timeout: 30000,
    retries: 3,
    circuitBreaker: {
      timeout: 30000,
      errorThresholdPercentage: 50,
      resetTimeout: 30000,
    },
  },
  'academic-service': {
    url: process.env.ACADEMIC_SERVICE_URL || 'http://academic-service:3002',
    healthCheck: '/health',
    timeout: 30000,
    retries: 3,
  },
  'finance-service': {
    url: process.env.FINANCE_SERVICE_URL || 'http://finance-service:3003',
    healthCheck: '/health',
    timeout: 60000,
    retries: 2,
  },
  'document-service': {
    url: process.env.DOCUMENT_SERVICE_URL || 'http://document-service:3004',
    healthCheck: '/health',
    timeout: 60000,
    retries: 2,
  },
  'notification-service': {
    url: process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3005',
    healthCheck: '/health',
    timeout: 15000,
    retries: 3,
  },
};
```

---

## 3. Authentication Methods

### 3.1 API Key Authentication

The simplest authentication method for server-to-server integrations.

```typescript
// Request
GET /api/v1/students HTTP/1.1
Host: api.educi.com
X-API-Key: educi_live_abc123def456

// Configuration
const apiKeyAuth = {
  type: 'api-key',
  header: 'X-API-Key',
  queryParam: 'api_key',  // Alternative
  location: 'header',
  lookup: async (key: string) => {
    return await db.apiKeys.findOne({
      key: key,
      active: true,
      expiresAt: { $gt: new Date() },
    });
  },
};
```

**API Key Structure:**
```
educi_live_abc123def456ghi789
│      │    │
│      │    └── Random string (32 chars)
│      └── Environment (live = production, test = sandbox)
└── Prefix
```

**Key Types:**

| Type | Prefix | Rate Limit | Use Case |
|---|---|---|---|
| **Live** | `educi_live_` | Standard | Production integrations |
| **Test** | `educi_test_` | Reduced | Development/testing |
| **Restricted** | `educi_restricted_` | Custom | Limited-scope access |
| **Admin** | `educi_admin_` | High | Administrative operations |

### 3.2 OAuth 2.0 Authentication

For third-party applications requiring delegated access.

```typescript
// OAuth2 Configuration
const oauth2Config = {
  authorizationEndpoint: '/oauth/authorize',
  tokenEndpoint: '/oauth/token',
  revocationEndpoint: '/oauth/revoke',
  scopes: [
    'students:read',
    'students:write',
    'grades:read',
    'grades:write',
    'finance:read',
    'documents:read',
    'documents:write',
    'admin:read',
    'admin:write',
  ],
  grantTypes: {
    authorizationCode: true,
    clientCredentials: true,
    implicit: false,  // Disabled for security
    password: false,  // Deprecated
  },
  tokenSettings: {
    accessTokenTTL: 3600,        // 1 hour
    refreshTokenTTL: 2592000,    // 30 days
    idTokenTTL: 3600,            // 1 hour
    allowRefreshTokenRotation: true,
    maxRefreshTokens: 5,
  },
};
```

**Authorization Code Flow:**

```
1. Client redirects to:
   GET /oauth/authorize?
     response_type=code&
     client_id=CLIENT_ID&
     redirect_uri=https://app.example.com/callback&
     scope=students:read+grades:read&
     state=random_state

2. User authenticates and authorizes

3. EduCI redirects to:
   https://app.example.com/callback?code=AUTH_CODE&state=random_state

4. Client exchanges code for tokens:
   POST /oauth/token
   Content-Type: application/x-www-form-urlencoded

   grant_type=authorization_code&
   code=AUTH_CODE&
   redirect_uri=https://app.example.com/callback&
   client_id=CLIENT_ID&
   client_secret=CLIENT_SECRET

5. Response:
   {
     "access_token": "eyJhbGciOiJSUzI1NiIs...",
     "token_type": "Bearer",
     "expires_in": 3600,
     "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
     "scope": "students:read grades:read"
   }
```

**Client Credentials Flow:**

```
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&
client_id=SERVICE_CLIENT_ID&
client_secret=SERVICE_CLIENT_SECRET&
scope=students:read
```

### 3.3 JWT (JSON Web Token) Authentication

For stateless authentication and microservice-to-microservice communication.

```typescript
// JWT Configuration
const jwtConfig = {
  algorithm: 'RS256',
  issuer: 'https://auth.educi.com',
  audience: 'https://api.educi.com',
  publicKeyEndpoint: '/.well-known/jwks.json',
  clockTolerance: 30,  // seconds
  maxTokenAge: 3600,   // 1 hour
  claims: {
    required: ['sub', 'iss', 'exp', 'iat', 'scope'],
    optional: ['school_id', 'role', 'permissions'],
  },
};
```

**JWT Token Structure:**

```json
// Header
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key-2024-01"
}

// Payload
{
  "sub": "user_123",
  "iss": "https://auth.educi.com",
  "aud": "https://api.educi.com",
  "exp": 1700000000,
  "iat": 1699996400,
  "scope": "students:read grades:read",
  "school_id": "school_456",
  "role": "teacher",
  "permissions": ["view_students", "submit_grades"]
}

// Signature
RSASHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  privateKey
)
```

**Token Validation:**

```typescript
async function validateJWT(token: string): Promise<JWTClaims> {
  // 1. Verify signature
  const decoded = jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
    issuer: 'https://auth.educi.com',
    audience: 'https://api.educi.com',
  });
  
  // 2. Check expiration
  if (decoded.exp < Date.now() / 1000) {
    throw new TokenExpiredError('Token has expired');
  }
  
  // 3. Check audience
  if (decoded.aud !== 'https://api.educi.com') {
    throw new InvalidAudienceError('Invalid audience');
  }
  
  // 4. Check issuer
  if (decoded.iss !== 'https://auth.educi.com') {
    throw new InvalidIssuerError('Invalid issuer');
  }
  
  // 5. Check scope
  if (!decoded.scope) {
    throw new InvalidScopeError('No scope provided');
  }
  
  return decoded;
}
```

### 3.4 OpenID Connect (OIDC) Authentication

For enterprise SSO and identity federation.

```typescript
// OIDC Configuration
const oidcConfig = {
  issuer: process.env.OIDC_ISSUER,
  clientId: process.env.OIDC_CLIENT_ID,
  clientSecret: process.env.OIDC_CLIENT_SECRET,
  discoveryEndpoint: '/.well-known/openid-configuration',
  scopes: ['openid', 'profile', 'email', 'groups'],
  tokenEndpointAuthMethod: 'client_secret_basic',
  responseTypes: ['code'],
  pkce: true,
  claimsMapping: {
    email: 'email',
    name: 'name',
    groups: 'groups',
    schoolId: 'custom:school_id',
    role: 'custom:role',
  },
};
```

**OIDC Discovery Document:**

```json
{
  "issuer": "https://auth.educi.com",
  "authorization_endpoint": "https://auth.educi.com/oauth/authorize",
  "token_endpoint": "https://auth.educi.com/oauth/token",
  "userinfo_endpoint": "https://auth.educi.com/userinfo",
  "jwks_uri": "https://auth.educi.com/.well-known/jwks.json",
  "registration_endpoint": "https://auth.educi.com/oauth/register",
  "scopes_supported": ["openid", "profile", "email", "groups"],
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "client_credentials"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256"],
  "token_endpoint_auth_methods_supported": ["client_secret_basic", "client_secret_post"],
  "claims_supported": ["sub", "iss", "aud", "exp", "iat", "name", "email", "groups"],
  "code_challenge_methods_supported": ["S256"]
}
```

### 3.5 Authentication Selection

```typescript
// Middleware to select authentication method
async function authenticate(req: Request): Promise<AuthResult> {
  // Check for API Key
  const apiKey = req.headers['x-api-key'];
  if (apiKey) {
    return await authenticateApiKey(apiKey);
  }
  
  // Check for Bearer token
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    // Check if JWT
    if (isJWT(token)) {
      return await authenticateJWT(token);
    }
    
    // Check if OAuth2 access token
    return await authenticateOAuth2(token);
  }
  
  // Check for Basic auth (OIDC client)
  if (req.headers.authorization?.startsWith('Basic ')) {
    return await authenticateOIDCClient(req);
  }
  
  throw new AuthenticationError('No valid authentication provided');
}
```

---

## 4. Rate Limiting

### 4.1 Rate Limit Tiers

```typescript
const rateLimitTiers = {
  free: {
    requestsPerMinute: 60,
    requestsPerHour: 1000,
    requestsPerDay: 10000,
    burstLimit: 10,
    concurrencyLimit: 5,
    description: 'Basic access for small projects',
  },
  basic: {
    requestsPerMinute: 300,
    requestsPerHour: 5000,
    requestsPerDay: 50000,
    burstLimit: 50,
    concurrencyLimit: 20,
    description: 'Standard access for growing applications',
  },
  professional: {
    requestsPerMinute: 1000,
    requestsPerHour: 20000,
    requestsPerDay: 200000,
    burstLimit: 200,
    concurrencyLimit: 50,
    description: 'High-volume access for businesses',
  },
  enterprise: {
    requestsPerMinute: 5000,
    requestsPerHour: 100000,
    requestsPerDay: 1000000,
    burstLimit: 1000,
    concurrencyLimit: 200,
    description: 'Maximum access for enterprises',
  },
  unlimited: {
    requestsPerMinute: 50000,
    requestsPerHour: 1000000,
    requestsPerDay: 10000000,
    burstLimit: 5000,
    concurrencyLimit: 1000,
    description: 'Unlimited access for partners',
  },
};
```

### 4.2 Rate Limit Algorithms

```typescript
// Token Bucket Algorithm
class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  
  constructor(
    private capacity: number,
    private refillRate: number  // tokens per second
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  
  consume(tokens: number = 1): boolean {
    this.refill();
    
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    
    return false;
  }
  
  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    const refillAmount = elapsed * this.refillRate;
    
    this.tokens = Math.min(this.capacity, this.tokens + refillAmount);
    this.lastRefill = now;
  }
}

// Sliding Window Algorithm
class SlidingWindow {
  private window: Map<string, number[]> = new Map();
  
  constructor(
    private windowSize: number,  // milliseconds
    private maxRequests: number
  ) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowSize;
    
    // Get existing requests in window
    const requests = this.window.get(key) || [];
    const validRequests = requests.filter(r => r > windowStart);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.window.set(key, validRequests);
    
    return true;
  }
  
  getRemaining(key: string): number {
    const now = Date.now();
    const windowStart = now - this.windowSize;
    const requests = this.window.get(key) || [];
    const validRequests = requests.filter(r => r > windowStart);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
  
  getResetTime(key: string): Date {
    const requests = this.window.get(key) || [];
    if (requests.length === 0) {
      return new Date();
    }
    
    const oldestRequest = Math.min(...requests);
    return new Date(oldestRequest + this.windowSize);
  }
}
```

### 4.3 Rate Limit Headers

```typescript
// Response headers for rate limiting
interface RateLimitHeaders {
  'X-RateLimit-Limit': string;        // Maximum requests allowed
  'X-RateLimit-Remaining': string;    // Remaining requests
  'X-RateLimit-Reset': string;        // Reset timestamp
  'X-RateLimit-Policy': string;       // Rate limit policy
  'Retry-After': string;              // Seconds until retry (on 429)
}

// Example response
{
  'X-RateLimit-Limit': '1000',
  'X-RateLimit-Remaining': '742',
  'X-RateLimit-Reset': '1700000060',
  'X-RateLimit-Policy': 'professional',
  'X-RateLimit-Window': '60',
}
```

### 4.4 Rate Limit Response

```json
// HTTP 429 Too Many Requests
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset": 1700000060,
      "retryAfter": 60,
      "policy": "professional"
    },
    "documentation": "https://docs.educi.com/api/rate-limits"
  }
}
```

### 4.5 Endpoint-Specific Limits

```typescript
const endpointLimits = {
  // Public endpoints (lower limits)
  'GET /api/v1/health': { requestsPerMinute: 600 },
  'GET /api/v1/public/*': { requestsPerMinute: 120 },
  
  // Read endpoints
  'GET /api/v1/students': { requestsPerMinute: 300 },
  'GET /api/v1/students/:id': { requestsPerMinute: 600 },
  
  // Write endpoints (stricter limits)
  'POST /api/v1/students': { requestsPerMinute: 60 },
  'PUT /api/v1/students/:id': { requestsPerMinute: 120 },
  'DELETE /api/v1/students/:id': { requestsPerMinute: 30 },
  
  // Expensive operations
  'POST /api/v1/reports/generate': { requestsPerMinute: 10 },
  'POST /api/v1/export/*': { requestsPerMinute: 5 },
  'POST /api/v1/ai/*': { requestsPerMinute: 30 },
  
  // Webhook delivery (outbound)
  'WEBHOOK_DELIVERY': { requestsPerMinute: 1000 },
};
```

---

## 5. API Versioning

### 5.1 Versioning Strategies

#### URI Versioning (Primary)

```bash
# v1 endpoints
GET /api/v1/students
POST /api/v1/students
GET /api/v1/students/:id

# v2 endpoints (breaking changes)
GET /api/v2/students
POST /api/v2/students
GET /api/v2/students/:id
```

#### Header Versioning

```bash
# Request
GET /api/students HTTP/1.1
Host: api.educi.com
Accept: application/vnd.educi.v1+json

# Response
HTTP/1.1 200 OK
Content-Type: application/vnd.educi.v1+json
```

#### Query Parameter Versioning

```bash
GET /api/students?version=1
GET /api/students?version=2
```

### 5.2 Version Lifecycle

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Draft  │───►│ Preview │───►│ Current │───►│ Sunset  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                      │              │
                                      │              ▼
                                      │         ┌─────────┐
                                      └────────►│ Retired │
                                                └─────────┘
```

| Phase | Duration | Description |
|---|---|---|
| **Draft** | 2-4 weeks | Internal testing, not public |
| **Preview** | 1-2 months | Beta access for selected partners |
| **Current** | Active | Full production support |
| **Sunset** | 6 months | Deprecated, migration notices |
| **Retired** | — | Removed, returns 410 Gone |

### 5.3 Deprecation Headers

```typescript
// Deprecation notice headers
{
  'Deprecation': 'true',
  'Sunset': 'Sat, 01 Jul 2027 00:00:00 GMT',
  'Link': '<https://docs.educi.com/api/migration/v1-to-v2>; rel="deprecation"',
  'X-API-Deprecation-Notice': 'v1 will be retired on 2027-07-01. Please migrate to v2.',
}
```

### 5.4 Version Configuration

```typescript
const versionConfig = {
  versions: {
    v1: {
      status: 'current',
      releaseDate: '2024-01-01',
      sunsetDate: '2027-07-01',
      baseUrl: '/api/v1',
      features: ['basic-crud', 'webhooks', 'api-keys'],
    },
    v2: {
      status: 'current',
      releaseDate: '2025-06-01',
      sunsetDate: null,
      baseUrl: '/api/v2',
      features: ['basic-crud', 'webhooks', 'api-keys', 'event-bus', 'automation', 'ai'],
      breakingChanges: [
        'Pagination changed from offset to cursor-based',
        'Date format standardized to ISO 8601',
        'Error response format updated',
        'Authentication header format changed',
      ],
    },
  },
  defaultVersion: 'v2',
  unsupportedVersionBehavior: 'redirect-to-latest',
};
```

---

## 6. Request Validation

### 6.1 Schema Validation

```typescript
import { z } from 'zod';

// Student creation schema
const CreateStudentSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  dateOfBirth: z.string().datetime(),
  schoolId: z.string().uuid(),
  grade: z.number().int().min(1).max(12),
  parentEmail: z.string().email().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Request validation middleware
function validateRequest(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      req.validated = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Request validation failed',
            details: error.errors.map(e => ({
              path: e.path.join('.'),
              message: e.message,
              code: e.code,
            })),
          },
        });
      }
      next(error);
    }
  };
}
```

### 6.2 Content Type Validation

```typescript
const contentTypes = {
  json: ['application/json', 'application/vnd.educi+json'],
  formData: ['multipart/form-data'],
  urlEncoded: ['application/x-www-form-urlencoded'],
  binary: ['application/octet-stream'],
  xml: ['application/xml', 'text/xml'],
};

function validateContentType(allowedTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentType = req.headers['content-type']?.split(';')[0];
    
    if (!contentType || !allowedTypes.includes(contentType)) {
      return res.status(415).json({
        error: {
          code: 'UNSUPPORTED_MEDIA_TYPE',
          message: `Content-Type must be one of: ${allowedTypes.join(', ')}`,
        },
      });
    }
    
    next();
  };
}
```

### 6.3 Request Size Limits

```typescript
const sizeLimits = {
  json: '10mb',
  formData: '50mb',
  urlEncoded: '1mb',
  fileUpload: '100mb',
  bulkOperation: '10mb',
};

// Apply size limits per endpoint
const endpointSizeLimits = {
  'POST /api/v1/students': '100kb',
  'POST /api/v1/students/import': '10mb',
  'POST /api/v1/documents/upload': '100mb',
  'POST /api/v1/reports/generate': '1mb',
};
```

---

## 7. Response Handling

### 7.1 Standard Response Format

```typescript
// Success response
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: {
      cursor: string | null;
      hasMore: boolean;
      total?: number;
    };
    rateLimit?: {
      limit: number;
      remaining: number;
      reset: number;
    };
  };
  requestId: string;
  timestamp: string;
}

// Error response
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any[];
    documentation?: string;
  };
  requestId: string;
  timestamp: string;
}
```

### 7.2 HTTP Status Codes

| Code | Usage |
|---|---|
| `200` | Success |
| `201` | Created |
| `202` | Accepted (async operation) |
| `204` | No Content (delete success) |
| `400` | Bad Request (validation error) |
| `401` | Unauthorized (authentication failed) |
| `403` | Forbidden (authorization failed) |
| `404` | Not Found |
| `409` | Conflict (duplicate resource) |
| `415` | Unsupported Media Type |
| `422` | Unprocessable Entity |
| `429` | Too Many Requests (rate limit) |
| `500` | Internal Server Error |
| `502` | Bad Gateway (service unavailable) |
| `503` | Service Unavailable (maintenance) |
| `504` | Gateway Timeout |

### 7.3 Pagination

```typescript
// Cursor-based pagination (preferred)
const cursorPagination = {
  request: {
    limit: 50,              // Items per page
    cursor: 'eyJpZCI6MTAwfQ',  // Cursor from previous response
    sort: 'createdAt',
    order: 'desc',
  },
  response: {
    data: [...],
    pagination: {
      cursor: 'eyJpZCI6MTUwfQ',
      hasMore: true,
      total: 1250,
    },
  },
};

// Offset-based pagination (deprecated in v2)
const offsetPagination = {
  request: {
    page: 1,
    limit: 50,
    sort: 'created_at',
    order: 'desc',
  },
  response: {
    data: [...],
    pagination: {
      page: 1,
      limit: 50,
      total: 1250,
      totalPages: 25,
    },
  },
};
```

---

## 8. API Analytics

### 8.1 Metrics Collected

| Metric | Type | Description |
|---|---|---|
| `api_requests_total` | Counter | Total requests by endpoint, method, status |
| `api_request_duration_seconds` | Histogram | Request latency distribution |
| `api_request_size_bytes` | Histogram | Request body size |
| `api_response_size_bytes` | Histogram | Response body size |
| `api_auth_failures_total` | Counter | Authentication failures |
| `api_rate_limit_hits_total` | Counter | Rate limit violations |
| `api_error_total` | Counter | Errors by type and endpoint |

### 8.2 Analytics Dashboard

```typescript
// Analytics queries
const analyticsQueries = {
  // Requests per minute by endpoint
  requestsPerMinute: `
    sum(rate(api_requests_total[1m])) by (endpoint, method)
  `,
  
  // Error rate
  errorRate: `
    sum(rate(api_requests_total{status=~"5.."}[5m])) /
    sum(rate(api_requests_total[5m])) * 100
  `,
  
  // P95 latency
  p95Latency: `
    histogram_quantile(0.95, 
      sum(rate(api_request_duration_seconds_bucket[5m])) by (le, endpoint)
    )
  `,
  
  // Top consumers
  topConsumers: `
    topk(10, sum(rate(api_requests_total[1h])) by (api_key))
  `,
  
  // Geographic distribution
  geoDistribution: `
    sum(rate(api_requests_total[1h])) by (country)
  `,
};
```

### 8.3 Usage Reports

```typescript
interface UsageReport {
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageLatency: number;
    p95Latency: number;
    p99Latency: number;
    uniqueConsumers: number;
    totalDataTransferred: number;
  };
  byEndpoint: Array<{
    endpoint: string;
    method: string;
    requests: number;
    errors: number;
    avgLatency: number;
  }>;
  byConsumer: Array<{
    apiKey: string;
    appName: string;
    requests: number;
    errors: number;
  }>;
  byStatus: Record<string, number>;
  byHour: Array<{
    hour: number;
    requests: number;
  }>;
}
```

---

## 9. SDK Generation

### 9.1 OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: EduCI API
  version: 2.0.0
  description: EduCI Educational Management Platform API
  contact:
    name: EduCI API Support
    email: api-support@educi.com
    url: https://docs.educi.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.educi.com/api/v2
    description: Production
  - url: https://sandbox.api.educi.com/api/v2
    description: Sandbox

security:
  - apiKey: []
  - bearerAuth: []
  - oauth2: [students:read, grades:read]

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
            maximum: 100
        - name: schoolId
          in: query
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/StudentListResponse'

components:
  securitySchemes:
    apiKey:
      type: apiKey
      in: header
      name: X-API-Key
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.educi.com/oauth/authorize
          tokenUrl: https://auth.educi.com/oauth/token
          scopes:
            students:read: Read student data
            students:write: Modify student data
            grades:read: Read grade data
            grades:write: Submit grades

  schemas:
    Student:
      type: object
      properties:
        id:
          type: string
          format: uuid
        firstName:
          type: string
        lastName:
          type: string
        email:
          type: string
          format: email
        grade:
          type: integer
        enrolledAt:
          type: string
          format: date-time
```

### 9.2 Generated SDKs

```bash
# Generate SDK from OpenAPI spec
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-axios \
  -o sdk/typescript \
  --additional-properties=supportsES6=true,withInterfaces=true

npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g python \
  -o sdk/python

npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g java \
  -o sdk/java
```

---

## 10. Gateway Configuration

### 10.1 Full Configuration

```typescript
// config/gateway.ts
export const gatewayConfig = {
  // Server
  server: {
    port: parseInt(process.env.GATEWAY_PORT || '3000'),
    host: process.env.GATEWAY_HOST || '0.0.0.0',
    trustProxy: true,
    keepAliveTimeout: 65000,
    headersTimeout: 66000,
  },

  // TLS
  tls: {
    enabled: process.env.NODE_ENV === 'production',
    certPath: process.env.TLS_CERT_PATH,
    keyPath: process.env.TLS_KEY_PATH,
    minVersion: 'TLSv1.3',
  },

  // CORS
  cors: {
    origins: [
      'https://app.educi.com',
      'https://admin.educi.com',
      'https://*.educi.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-API-Key',
      'X-Request-ID',
      'X-Idempotency-Key',
    ],
    exposedHeaders: [
      'X-Request-ID',
      'X-RateLimit-Limit',
      'X-RateLimit-Remaining',
      'X-RateLimit-Reset',
    ],
    credentials: true,
    maxAge: 86400,
  },

  // Rate Limiting
  rateLimit: {
    store: 'redis',
    redisUrl: process.env.REDIS_URL,
    defaultTier: 'basic',
    keyGenerator: (req: Request) => {
      return req.headers['x-api-key'] || req.ip || 'unknown';
    },
    skip: (req: Request) => {
      return req.path === '/health' || req.path === '/metrics';
    },
  },

  // Authentication
  auth: {
    jwt: {
      publicKey: process.env.JWT_PUBLIC_KEY,
      issuer: 'https://auth.educi.com',
      audience: 'https://api.educi.com',
      algorithms: ['RS256'],
    },
    oauth2: {
      introspectionEndpoint: 'https://auth.educi.com/oauth/introspect',
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
    },
    apiKey: {
      header: 'X-API-Key',
      lookup: async (key: string) => {
        return await db.apiKeys.findOne({ key, active: true });
      },
    },
  },

  // Circuit Breaker
  circuitBreaker: {
    timeout: 30000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000,
    volumeThreshold: 10,
    loggingEnabled: true,
  },

  // Proxy
  proxy: {
    timeout: 30000,
    retries: 3,
    retryDelay: 1000,
    followRedirects: true,
    rejectUnauthorized: true,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
    requestLog: true,
    responseLog: true,
    errorLog: true,
    sensitiveHeaders: ['authorization', 'x-api-key', 'cookie'],
  },

  // Monitoring
  monitoring: {
    metrics: true,
    tracing: true,
    healthCheck: true,
    readinessCheck: true,
  },
};
```

---

## 11. Security Headers

### 11.1 Helmet Configuration

```typescript
import helmet from 'helmet';

const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.educi.com'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'none'"],
      frameSrc: ["'none'"],
      reportUri: '/api/security/csp-report',
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
  frameguard: {
    action: 'deny',
  },
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true,
  permittedCrossDomainPolicies: {
    permittedPolicies: 'none',
  },
});
```

### 11.2 Custom Security Headers

```typescript
function customSecurityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // HSTS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  
  // Cross-origin policies
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  
  // Cache control for API responses
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  
  next();
}
```

---

## 12. CORS Configuration

### 12.1 CORS Options

```typescript
import cors from 'cors';

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (mobile apps, curl)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check against allowed origins
    const allowedOrigins = [
      'https://app.educi.com',
      'https://admin.educi.com',
      'https://localhost:3000',  // Development
      'https://localhost:5173',  // Vite dev server
    ];
    
    // Check wildcard patterns
    const wildcardPatterns = [/^https:\/\/.*\.educi\.com$/];
    
    if (allowedOrigins.includes(origin) || wildcardPatterns.some(p => p.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-API-Key',
    'X-Request-ID',
    'X-Idempotency-Key',
    'X-Webhook-Signature',
  ],
  exposedHeaders: [
    'X-Request-ID',
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'X-Total-Count',
  ],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
```

### 12.2 Preflight Handling

```typescript
// Handle preflight requests
app.options('*', cors(corsOptions));

// Or specific endpoint
app.options('/api/v1/*', cors(corsOptions));
```

---

## 13. Circuit Breaker Pattern

### 13.1 States

```
CLOSED ──(failures > threshold)──► OPEN
   ▲                                  │
   │                          (timeout expires)
   │                                  ▼
   └──(success)────────────── HALF-OPEN ──(failure)──► OPEN
```

### 13.2 Implementation

```typescript
import CircuitBreaker from 'opossum';

class ServiceCircuitBreaker {
  private breakers: Map<string, CircuitBreaker> = new Map();

  createBreaker(serviceName: string, options?: CircuitBreaker.Options): CircuitBreaker {
    const defaultOptions: CircuitBreaker.Options = {
      timeout: 30000,              // 30 seconds
      errorThresholdPercentage: 50,
      resetTimeout: 30000,         // 30 seconds
      volumeThreshold: 10,
      rollingCountTimeout: 10000,
      rollingCountBuckets: 10,
      name: serviceName,
      enabled: true,
    };

    const breaker = new CircuitBreaker(
      async (request: ServiceRequest) => {
        return await this.proxyRequest(serviceName, request);
      },
      { ...defaultOptions, ...options }
    );

    // Event handlers
    breaker.on('open', () => {
      logger.warn(`Circuit breaker OPEN for ${serviceName}`);
      metrics.increment(`circuit_breaker.open`, { service: serviceName });
    });

    breaker.on('halfOpen', () => {
      logger.info(`Circuit breaker HALF-OPEN for ${serviceName}`);
      metrics.increment(`circuit_breaker.half_open`, { service: serviceName });
    });

    breaker.on('close', () => {
      logger.info(`Circuit breaker CLOSED for ${serviceName}`);
      metrics.increment(`circuit_breaker.closed`, { service: serviceName });
    });

    breaker.on('fallback', () => {
      logger.warn(`Circuit breaker fallback for ${serviceName}`);
      metrics.increment(`circuit_breaker.fallback`, { service: serviceName });
    });

    breaker.fallback(() => {
      return {
        status: 503,
        body: {
          error: {
            code: 'SERVICE_UNAVAILABLE',
            message: `Service ${serviceName} is temporarily unavailable`,
            retryAfter: 30,
          },
        },
      };
    });

    this.breakers.set(serviceName, breaker);
    return breaker;
  }

  async execute(serviceName: string, request: ServiceRequest): Promise<ServiceResponse> {
    const breaker = this.breakers.get(serviceName);
    if (!breaker) {
      throw new Error(`No circuit breaker found for ${serviceName}`);
    }

    return breaker.fire(request);
  }

  getState(serviceName: string): string | undefined {
    const breaker = this.breakers.get(serviceName);
    return breaker?.open ? 'open' : breaker?.halfOpen ? 'half-open' : 'closed';
  }
}
```

### 13.3 Configuration per Service

```typescript
const circuitBreakerConfig = {
  'student-service': {
    timeout: 30000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000,
    volumeThreshold: 10,
  },
  'payment-service': {
    timeout: 60000,
    errorThresholdPercentage: 30,
    resetTimeout: 60000,
    volumeThreshold: 5,
  },
  'notification-service': {
    timeout: 15000,
    errorThresholdPercentage: 60,
    resetTimeout: 15000,
    volumeThreshold: 20,
  },
  'ai-service': {
    timeout: 120000,
    errorThresholdPercentage: 40,
    resetTimeout: 30000,
    volumeThreshold: 10,
  },
};
```

---

## 14. API Lifecycle Management

### 14.1 Lifecycle Stages

```typescript
const apiLifecycle = {
  stages: {
    design: {
      duration: '1-2 weeks',
      activities: [
        'OpenAPI specification',
        'API review board approval',
        'Security review',
        'SDK impact assessment',
      ],
    },
    develop: {
      duration: '2-4 weeks',
      activities: [
        'Implementation',
        'Unit tests',
        'Integration tests',
        'SDK generation',
        'Documentation',
      ],
    },
    test: {
      duration: '1-2 weeks',
      activities: [
        'Internal testing',
        'Partner beta testing',
        'Load testing',
        'Security testing',
      ],
    },
    deploy: {
      duration: '1 week',
      activities: [
        'Canary deployment (10%)',
        'Gradual rollout (25%, 50%, 100%)',
        'Monitoring',
        'Rollback plan',
      ],
    },
    monitor: {
      duration: 'Ongoing',
      activities: [
        'Performance monitoring',
        'Error tracking',
        'Usage analytics',
        'Partner feedback',
      ],
    },
    deprecate: {
      duration: '6 months',
      activities: [
        'Sunset notice',
        'Migration guide',
        'Partner notifications',
        'Compatibility layer',
      ],
    },
    retire: {
      duration: '1 month',
      activities: [
        'Final sunset notice',
        'Endpoint removal',
        'Documentation archive',
        'SDK update',
      ],
    },
  },
};
```

### 14.2 Deprecation Policy

```typescript
const deprecationPolicy = {
  notice: {
    minimumAdvance: '6 months',
    channels: ['email', 'dashboard', 'docs', 'headers'],
    frequency: ['initial', '3-months', '1-month', '1-week'],
  },
  migration: {
    guides: true,
    tools: true,
    support: true,
    timeline: '6 months',
  },
  compatibility: {
    deprecatedHeaders: true,
    redirectOldVersions: true,
    maintainDeprecatedEndpoints: '6 months',
  },
};
```

---

## 15. Monitoring and Logging

### 15.1 Request Logging

```typescript
interface RequestLog {
  requestId: string;
  timestamp: Date;
  method: string;
  path: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  body?: any;
  clientIp: string;
  userAgent: string;
  apiKey?: string;
  userId?: string;
  schoolId?: string;
  duration: number;
  statusCode: number;
  responseSize: number;
  error?: string;
  upstreamService?: string;
  upstreamDuration?: number;
}

// Request logger middleware
function requestLogger() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    const requestId = req.headers['x-request-id'] as string || generateRequestId();

    // Capture response
    const originalJson = res.json;
    let responseBody: any;
    res.json = function(body: any) {
      responseBody = body;
      return originalJson.call(this, body);
    };

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      
      const log: RequestLog = {
        requestId,
        timestamp: new Date(),
        method: req.method,
        path: req.path,
        query: req.query as Record<string, string>,
        headers: sanitizeHeaders(req.headers),
        body: req.body,
        clientIp: req.ip || req.socket.remoteAddress || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        apiKey: req.headers['x-api-key'] as string,
        userId: (req as any).auth?.userId,
        schoolId: (req as any).auth?.schoolId,
        duration,
        statusCode: res.statusCode,
        responseSize: JSON.stringify(responseBody || {}).length,
        error: responseBody?.error?.code,
        upstreamService: (req as any).upstreamService,
        upstreamDuration: (req as any).upstreamDuration,
      };

      // Log to structured logger
      logger.info('API Request', log);

      // Send to metrics
      metrics.histogram('api_request_duration', duration, {
        method: req.method,
        path: req.path,
        status: res.statusCode,
      });
      metrics.increment('api_requests', {
        method: req.method,
        path: req.path,
        status: res.statusCode,
      });
    });

    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-ID', requestId);
    
    next();
  };
}
```

### 15.2 Health Checks

```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    services: await checkServices(),
    disk: await checkDisk(),
    memory: await checkMemory(),
  };

  const healthy = Object.values(checks).every(c => c.status === 'ok');
  
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'unhealthy',
    version: process.env.APP_VERSION,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    checks,
  });
});

// Readiness check (for Kubernetes)
app.get('/ready', async (req, res) => {
  const ready = await isReady();
  res.status(ready ? 200 : 503).json({ ready });
});
```

---

## 16. Troubleshooting

### 16.1 Common Error Codes

| Code | HTTP Status | Description | Solution |
|---|---|---|---|
| `GATEWAY_001` | 401 | Missing authentication | Add `X-API-Key` or `Authorization` header |
| `GATEWAY_002` | 401 | Invalid API key | Check key format and validity |
| `GATEWAY_003` | 403 | Insufficient permissions | Check OAuth scopes or API key permissions |
| `GATEWAY_004` | 429 | Rate limit exceeded | Wait for reset or upgrade tier |
| `GATEWAY_005` | 400 | Invalid request body | Validate request against schema |
| `GATEWAY_006` | 404 | Resource not found | Check resource ID and endpoint |
| `GATEWAY_007` | 500 | Internal server error | Contact support with request ID |
| `GATEWAY_008` | 502 | Upstream service error | Retry with exponential backoff |
| `GATEWAY_009` | 504 | Upstream timeout | Reduce request complexity or retry |
| `GATEWAY_010` | 503 | Service unavailable | Check status page for maintenance |

### 16.2 Debug Mode

```bash
# Enable debug logging
curl -H "X-Debug: true" https://api.educi.com/api/v1/students

# Response includes debug information
{
  "data": [...],
  "debug": {
    "requestId": "req_abc123",
    "duration": 45,
    "upstreamService": "student-service",
    "upstreamDuration": 38,
    "cacheHit": false,
    "rateLimitRemaining": 999,
    "authMethod": "api-key",
    "route": "GET /api/v1/students",
  }
}
```

### 16.3 Status Page

- **URL**: https://status.educi.com
- **API**: https://status.educi.com/api/v2/summary
- **Subscribe**: Email, Slack, webhook notifications

---

*EduCI API Gateway — Phase 3 Documentation*
*Last Updated: 2026-07-29*
