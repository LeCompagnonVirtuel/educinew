# Phase 2.7 LXP Enterprise Overview

## Executive Summary

The EduCI Learning Experience Platform (LXP) is a comprehensive enterprise-grade learning management system built with Domain-Driven Design principles. This documentation covers the architecture, module structure, technology stack, and system design patterns used throughout the platform.

The LXP supports multi-tenancy, real-time collaboration, offline mobile capabilities, and integrates with external learning content providers while maintaining strict security and data isolation standards.

---

## Architecture Overview

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EduCI LXP Platform                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   Web App   │  │ Mobile App  │  │ Admin Panel │  │  API Client │       │
│  │  (Next.js)  │  │(React Native│  │  (Next.js)  │  │   (REST)    │       │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘       │
│         │                │                │                │               │
│         └────────────────┼────────────────┼────────────────┘               │
│                          │                │                                │
│                          ▼                ▼                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        API Gateway Layer                            │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │   │
│  │  │   Auth   │ │  Rate    │ │   Log    │ │  Cache   │ │  Queue   │ │   │
│  │  │  Middleware│ │ Limiter │ │  Middleware│ │ Manager │ │ Manager  │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                          │                                                │
│                          ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     Service Layer (60 Services)                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │   │
│  │  │ Learning │ │  User    │ │ Content  │ │Analytics │ │ Notifi-  │ │   │
│  │  │ Service  │ │ Service  │ │ Service  │ │ Service  │ │ cation   │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │   │
│  │  │ Payment  │ │  Media   │ │   AI     │ │ Assessment│ │ Certif-  │ │   │
│  │  │ Service  │ │ Service  │ │ Service  │ │ Service  │ │ icate    │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                          │                                                │
│                          ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                   Repository Layer (600+ Methods)                   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │   │
│  │  │  User    │ │ Course   │ │ Lesson   │ │ Progress │ │  Enroll  │ │   │
│  │  │  Repo    │ │  Repo    │ │  Repo    │ │  Repo    │ │  Repo    │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                          │                                                │
│                          ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      Database Layer                                 │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │  PostgreSQL  │  │    Redis     │  │    S3/MinIO  │              │   │
│  │  │  (Primary)   │  │   (Cache)    │  │  (Storage)   │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Module Structure

### Core Domain Modules

| Module | Description | Key Entities | File Path |
|--------|-------------|--------------|-----------|
| `auth` | Authentication & Authorization | User, Role, Permission, Session | `src/domains/auth/` |
| `learning` | Course & Lesson Management | Course, Lesson, Module, Enrollment | `src/domains/learning/` |
| `content` | Content Management | Article, Video, Document, Media | `src/domains/content/` |
| `assessment` | Quizzes & Assignments | Quiz, Question, Submission, Grade | `src/domains/assessment/` |
| `analytics` | Learning Analytics | Event, Metric, Report, Dashboard | `src/domains/analytics/` |
| `notification` | Notifications & Messaging | Notification, Message, Channel | `src/domains/notification/` |
| `payment` | Payment & Billing | Transaction, Invoice, Plan | `src/domains/payment/` |
| `media` | Media Management | File, Upload, Transcoding | `src/domains/media/` |
| `ai` | AI/ML Integration | Recommendation, Prediction, Model | `src/domains/ai/` |
| `certificate` | Certification | Certificate, Badge, Credential | `src/domains/certificate/` |

### Module Internal Structure

```
src/domains/learning/
├── entities/
│   ├── Course.ts
│   ├── Lesson.ts
│   ├── Module.ts
│   └── Enrollment.ts
├── repositories/
│   ├── CourseRepository.ts
│   ├── LessonRepository.ts
│   └── EnrollmentRepository.ts
├── services/
│   ├── CourseService.ts
│   ├── EnrollmentService.ts
│   └── ProgressService.ts
├── validators/
│   ├── course.schema.ts
│   └── enrollment.schema.ts
├── errors/
│   ├── CourseErrors.ts
│   └── EnrollmentErrors.ts
├── hooks/
│   ├── useCourse.ts
│   ├── useEnrollment.ts
│   └── useProgress.ts
├── routes/
│   ├── courses.ts
│   ├── lessons.ts
│   └── enrollments.ts
├── types/
│   ├── course.types.ts
│   └── enrollment.types.ts
├── config/
│   └── learning.config.ts
└── index.ts
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework, SSR/SSG |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| React Query | 5.x | Server state management |
| Zustand | 4.x | Client state management |
| React Hook Form | 7.x | Form management |
| Zod | 3.x | Schema validation |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x | Runtime |
| Express.js | 4.x | HTTP framework |
| Prisma | 5.x | ORM |
| PostgreSQL | 16.x | Primary database |
| Redis | 7.x | Caching, queues |
| BullMQ | 4.x | Job queues |
| JWT | - | Authentication |
| bcrypt | - | Password hashing |

### Mobile

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.73.x | Mobile framework |
| Expo | 50.x | Development platform |
| React Navigation | 6.x | Navigation |
| AsyncStorage | - | Local storage |
| react-native-mmkv | - | Fast local storage |

### DevOps

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Kubernetes | Orchestration |
| GitHub Actions | CI/CD |
| Terraform | Infrastructure as Code |
| Prometheus | Metrics |
| Grafana | Monitoring dashboards |

---

## Domain-Driven Design Breakdown

### Bounded Contexts

```
┌─────────────────────────────────────────────────────────────────┐
│                    EduCI LXP Bounded Contexts                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │  Identity &     │    │  Learning       │                     │
│  │  Access Context │◄──►│  Context        │                     │
│  │                 │    │                 │                     │
│  │  - User         │    │  - Course       │                     │
│  │  - Role         │    │  - Lesson       │                     │
│  │  - Permission   │    │  - Enrollment   │                     │
│  │  - Session      │    │  - Progress     │                     │
│  └────────┬────────┘    └────────┬────────┘                     │
│           │                      │                              │
│           │    ┌─────────────────┼─────────────────┐           │
│           │    │                 │                 │           │
│           ▼    ▼                 ▼                 ▼           │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐│
│  │  Content        │    │  Assessment     │    │  Analytics  ││
│  │  Context        │    │  Context        │    │  Context    ││
│  │                 │    │                 │    │             ││
│  │  - Article      │    │  - Quiz         │    │  - Event    ││
│  │  - Video        │    │  - Question     │    │  - Metric   ││
│  │  - Document     │    │  - Submission   │    │  - Report   ││
│  │  - Media        │    │  - Grade        │    │  - Dashboard││
│  └─────────────────┘    └─────────────────┘    └─────────────┘│
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐│
│  │  Notification   │    │  Payment        │    │  Certificate││
│  │  Context        │    │  Context        │    │  Context    ││
│  │                 │    │                 │    │             ││
│  │  - Notification │    │  - Transaction  │    │  - Certificate││
│  │  - Message      │    │  - Invoice      │    │  - Badge    ││
│  │  - Channel      │    │  - Plan         │    │  - Credential││
│  └─────────────────┘    └─────────────────┘    └─────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Aggregates and Aggregate Roots

| Aggregate Root | Aggregates | Invariants |
|----------------|------------|------------|
| `User` | Profile, Preferences, Settings | Email must be unique, username required |
| `Course` | Modules, Lessons, Prerequisites | Must have at least one module |
| `Enrollment` | Progress, Certificates | User can only enroll once per course |
| `Quiz` | Questions, Answers, Attempts | Time limit must be positive |
| `Payment` | Transactions, Invoices | Amount must be positive |

### Domain Events

```typescript
// Example domain events
interface DomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: string;
  timestamp: Date;
  version: number;
}

// Course-related events
interface CourseCreatedEvent extends DomainEvent {
  eventType: 'course.created';
  payload: {
    courseId: string;
    title: string;
    instructorId: string;
  };
}

interface CoursePublishedEvent extends DomainEvent {
  eventType: 'course.published';
  payload: {
    courseId: string;
    publishedAt: Date;
  };
}

// Enrollment-related events
interface EnrollmentCompletedEvent extends DomainEvent {
  eventType: 'enrollment.completed';
  payload: {
    enrollmentId: string;
    courseId: string;
    userId: string;
    completedAt: Date;
  };
}
```

---

## Multi-Tenancy Architecture

### Tenant Isolation Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    Multi-Tenancy Model                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Request Flow:                                               │
│                                                              │
│  Client ──► API Gateway ──► Tenant Resolver ──► Service     │
│                                          │                  │
│                                          ▼                  │
│                                   ┌─────────────┐           │
│                                   │  Tenant     │           │
│                                   │  Context    │           │
│                                   │             │           │
│                                   │ - tenantId  │           │
│                                   │ - config    │           │
│                                   │ - features  │           │
│                                   └─────────────┘           │
│                                          │                  │
│                                          ▼                  │
│                                   ┌─────────────┐           │
│                                   │  Database   │           │
│                                   │  (Row-level │           │
│                                   │   security) │           │
│                                   └─────────────┘           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Tenant Configuration

```typescript
interface TenantConfig {
  tenantId: string;
  name: string;
  domain: string;
  features: TenantFeatures;
  limits: TenantLimits;
  branding: TenantBranding;
}

interface TenantFeatures {
  enableAnalytics: boolean;
  enableAI: boolean;
  enableMobile: boolean;
  enableSSO: boolean;
  maxConcurrentUsers: number;
}

interface TenantLimits {
  maxUsers: number;
  maxCourses: number;
  maxStorageGB: number;
  maxAPIRequestsPerMinute: number;
}
```

---

## Security Architecture

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Flow                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Client sends credentials                                 │
│           │                                                  │
│           ▼                                                  │
│  2. Auth Service validates credentials                       │
│           │                                                  │
│           ▼                                                  │
│  3. Generate JWT tokens (access + refresh)                   │
│           │                                                  │
│           ▼                                                  │
│  4. Store refresh token in Redis                             │
│           │                                                  │
│           ▼                                                  │
│  5. Return tokens to client                                  │
│           │                                                  │
│           ▼                                                  │
│  6. Client includes access token in headers                  │
│           │                                                  │
│           ▼                                                  │
│  7. Middleware validates token and extracts tenant            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Role-Based Access Control (RBAC)

```typescript
// Permission matrix
const PERMISSIONS = {
  // Course permissions
  'course:create': ['admin', 'instructor'],
  'course:read': ['admin', 'instructor', 'student'],
  'course:update': ['admin', 'instructor'],
  'course:delete': ['admin'],
  'course:publish': ['admin', 'instructor'],

  // User permissions
  'user:create': ['admin'],
  'user:read': ['admin', 'instructor'],
  'user:update': ['admin', 'user'],
  'user:delete': ['admin'],

  // Analytics permissions
  'analytics:read': ['admin', 'instructor'],
  'analytics:export': ['admin'],
} as const;
```

---

## Event-Driven Architecture

### Event Bus Integration

```typescript
// Event publishing
interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishBatch(events: DomainEvent[]): Promise<void>;
}

// Event consumption
interface EventConsumer {
  subscribe(
    eventType: string,
    handler: (event: DomainEvent) => Promise<void>
  ): void;
  unsubscribe(eventType: string): void;
}

// Example usage
const courseService = {
  async publishCourse(courseId: string): Promise<void> {
    const course = await this.courseRepository.findById(courseId);

    // Update course status
    course.status = 'published';
    await this.courseRepository.save(course);

    // Publish domain event
    await this.eventPublisher.publish({
      eventId: generateId(),
      eventType: 'course.published',
      aggregateId: courseId,
      timestamp: new Date(),
      version: 1,
      payload: {
        courseId,
        publishedAt: new Date(),
      },
    });
  },
};
```

---

## Configuration Management

### Environment Configuration

```typescript
// Configuration hierarchy
interface AppConfig {
  // Database
  database: {
    host: string;
    port: number;
    name: string;
    ssl: boolean;
  };

  // Redis
  redis: {
    host: string;
    port: number;
    password?: string;
  };

  // Authentication
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
    refreshExpiresIn: string;
  };

  // Storage
  storage: {
    provider: 's3' | 'minio' | 'local';
    bucket: string;
    region?: string;
  };

  // Features
  features: {
    enableRegistration: boolean;
    enableSSO: boolean;
    enableAI: boolean;
  };
}
```

---

## Best Practices

### Code Organization

1. **Domain-Driven Structure**: Keep domain logic isolated from infrastructure
2. **Separation of Concerns**: Each layer has specific responsibilities
3. **Dependency Inversion**: Depend on abstractions, not implementations
4. **CQRS Pattern**: Separate read and write operations where appropriate

### Performance

1. **Database Indexing**: Use composite indexes for common queries
2. **Caching Strategy**: Implement Redis caching for frequently accessed data
3. **Lazy Loading**: Load related data only when needed
4. **Connection Pooling**: Use connection pools for database connections

### Security

1. **Input Validation**: Validate all inputs using Zod schemas
2. **SQL Injection Prevention**: Use parameterized queries via Prisma
3. **XSS Protection**: Sanitize user inputs and outputs
4. **CSRF Protection**: Implement CSRF tokens for state-changing operations
5. **Rate Limiting**: Apply rate limits to prevent abuse

---

## API Versioning Strategy

```typescript
// Versioned API routes
// /api/v1/courses
// /api/v2/courses

interface APIVersion {
  version: string;
  baseUrl: string;
  deprecated: boolean;
  sunsetDate?: Date;
}

const API_VERSIONS: APIVersion[] = [
  {
    version: 'v1',
    baseUrl: '/api/v1',
    deprecated: false,
  },
  {
    version: 'v2',
    baseUrl: '/api/v2',
    deprecated: true,
    sunsetDate: new Date('2025-06-01'),
  },
];
```

---

## Monitoring and Observability

### Metrics Collection

```typescript
// Custom metrics
const metrics = {
  // Request metrics
  httpRequestDuration: Histogram;
  httpRequestTotal: Counter;

  // Business metrics
  courseEnrollments: Counter;
  lessonCompletions: Counter;
  userActiveSessions: Gauge;

  // System metrics
  databaseQueryDuration: Histogram;
  cacheHitRatio: Gauge;
  queueProcessingTime: Histogram;
};
```

### Health Check Endpoints

```typescript
// Health check response
interface HealthCheck {
  status: 'healthy' | 'unhealthy' | 'degraded';
  version: string;
  uptime: number;
  checks: {
    database: CheckResult;
    redis: CheckResult;
    storage: CheckResult;
  };
}

interface CheckResult {
  status: 'pass' | 'fail';
  latency: number;
  message?: string;
}
```

---

## References

- `src/domains/` - Domain modules
- `src/services/` - Service implementations
- `src/repositories/` - Data access layer
- `src/middleware/` - API middleware
- `src/config/` - Configuration files
- `prisma/schema.prisma` - Database schema

---

*Last Updated: Phase 2.7 - LXP Enterprise Documentation*
