# EduCI Event Bus

> **Phase 3 — Enterprise Integration**
> Complete Event Bus documentation for the EduCI platform

---

## Table of Contents

1. [Overview](#1-overview)
2. [Publish/Subscribe Model](#2-publishsubscribe-model)
3. [Topics and Subscriptions](#3-topics-and-subscriptions)
4. [Consumer Groups](#4-consumer-groups)
5. [Priority Queues](#5-priority-queues)
6. [Delayed Events](#6-delayed-events)
7. [Saga Orchestration](#7-saga-orchestration)
8. [Domain Events](#8-domain-events)
9. [Event Streaming](#9-event-streaming)
10. [Event Filtering](#10-event-filtering)
11. [Correlation IDs](#11-correlation-ids)
12. [Event Schema Registry](#12-event-schema-registry)
13. [Event Store](#13-event-store)
14. [Monitoring and Troubleshooting](#14-monitoring-and-troubleshooting)

---

## 1. Overview

### 1.1 Purpose

The EduCI Event Bus is the backbone of the integration architecture, enabling loose coupling between services through event-driven communication. It provides reliable, ordered, and durable message delivery with support for complex event processing patterns.

### 1.2 Key Features

| Feature | Description |
|---|---|
| **Publish/Subscribe** | Decoupled message distribution |
| **Topic-based Routing** | Hierarchical topic structure |
| **Consumer Groups** | Load-balanced message consumption |
| **Priority Queues** | Critical message prioritization |
| **Delayed Events** | Time-based event scheduling |
| **Saga Support** | Distributed transaction orchestration |
| **Event Streaming** | Real-time event processing |
| **Dead Letter Queue** | Failed message handling |
| **Schema Registry** | Event schema validation and evolution |
| **Replay** | Event history replay capability |

### 1.3 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     EduCI Event Bus                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Producers                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │Service A │  │Service B │  │Service C │                  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                  │
│       │              │              │                        │
│       ▼              ▼              ▼                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  Topic Router                        │   │
│  │  student.* │ academic.* │ financial.* │ system.*    │   │
│  └─────────────────────────────────────────────────────┘   │
│       │              │              │                        │
│       ▼              ▼              ▼                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │Consumer  │  │Consumer  │  │Consumer  │                  │
│  │Group A   │  │Group B   │  │Group C   │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Event Store │ Schema Registry │ Dead Letter Queue           │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Publish/Subscribe Model

### 2.1 Core Concepts

```typescript
interface DomainEvent<T = any> {
  id: string;
  type: string;
  version: number;
  timestamp: Date;
  correlationId: string;
  causationId?: string;
  aggregateId: string;
  aggregateType: string;
  metadata: Record<string, any>;
  payload: T;
}
```

### 2.2 Publishing Events

```typescript
// Simple publish
const eventId = await eventBus.publish('student.created', {
  id: generateId(),
  type: 'student.created',
  version: 1,
  timestamp: new Date(),
  correlationId: req.headers['x-request-id'],
  aggregateId: student.id,
  aggregateType: 'Student',
  metadata: { schoolId: student.schoolId },
  payload: {
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
  },
});

// Batch publish
const eventIds = await eventBus.publishBatch('grade.submitted', [event1, event2]);
```

### 2.3 Subscribing to Events

```typescript
// Specific event
const subId = await eventBus.subscribe('student.created', handler, {
  consumerGroup: 'notification-handlers',
  startPosition: 'latest',
  maxConcurrency: 5,
});

// Pattern matching
const subId = await eventBus.subscribe('student.*', handler, {
  consumerGroup: 'audit-service',
});

// Multiple topics
const subId = await eventBus.subscribe(
  ['student.created', 'student.updated'],
  handler,
  { consumerGroup: 'external-sync' }
);
```

### 2.4 Subscription Options

```typescript
interface SubscriptionOptions {
  consumerGroup?: string;
  startPosition?: 'earliest' | 'latest' | 'offset';
  maxConcurrency?: number;
  batchSize?: number;
  blockTimeout?: number;
  autoAck?: boolean;
  deadLetterQueue?: boolean;
  retryPolicy?: {
    maxRetries: number;
    backoffMultiplier: number;
    initialDelay: number;
  };
  filter?: (event: DomainEvent) => boolean;
}
```

---

## 3. Topics and Subscriptions

### 3.1 Topic Structure

```
educi.events
├── student.*          → student-service, analytics, notifications
├── teacher.*          → teacher-service, notifications
├── academic.*         → academic-service, reporting
├── financial.*        → finance-service, accounting
├── document.*         → document-service, compliance
├── attendance.*       → attendance-service, alerts
├── communication.*    → notification-service
├── integration.*      → integration-service, monitoring
├── automation.*       → automation-engine, audit
├── security.*         → security-service, SIEM
└── system.*           → health-monitor, alerting
```

### 3.2 Topic Configuration

```typescript
const topicConfig = {
  'student.*': {
    partitions: 8,
    replicationFactor: 3,
    retentionDays: 30,
    maxMessageSize: 1048576,   // 1MB
    compression: 'snappy',
  },
  'academic.*': {
    partitions: 16,
    replicationFactor: 3,
    retentionDays: 90,
    maxMessageSize: 2097152,   // 2MB
    compression: 'lz4',
  },
  'financial.*': {
    partitions: 8,
    replicationFactor: 3,
    retentionDays: 365,
    maxMessageSize: 1048576,
    compression: 'zstd',
    requiredAcks: 'all',
  },
  'system.*': {
    partitions: 4,
    replicationFactor: 2,
    retentionDays: 7,
    maxMessageSize: 524288,
    compression: 'none',
  },
};
```

### 3.3 Subscription Management

```typescript
const subscriptions = await eventBus.listSubscriptions({ topic: 'student.*' });
const subscription = await eventBus.getSubscription(subscriptionId);
await eventBus.updateSubscription(subscriptionId, { maxConcurrency: 10 });
await eventBus.deleteSubscription(subscriptionId);
await eventBus.pauseSubscription(subscriptionId);
await eventBus.resumeSubscription(subscriptionId);
```

---

## 4. Consumer Groups

### 4.1 Concept

Consumer groups enable load-balanced consumption. Each message is delivered to exactly one consumer within a group.

```
Topic: student.created (8 partitions)
         │
         ▼
┌────────────────────────────────────────────┐
│  Consumer Group: notification-handlers      │
│  Consumer 1: Partitions [0, 1, 2]         │
│  Consumer 2: Partitions [3, 4]            │
│  Consumer 3: Partitions [5, 6, 7]         │
└────────────────────────────────────────────┘
```

### 4.2 Configuration

```typescript
const consumerGroups = {
  'notification-handlers': {
    name: 'notification-handlers',
    topics: ['student.*', 'grade.*', 'payment.*'],
    autoOffsetReset: 'latest',
    sessionTimeout: 30000,
    heartbeatInterval: 10000,
    maxPollInterval: 300000,
    maxPollRecords: 100,
    enableAutoCommit: false,
  },
  'analytics-service': {
    name: 'analytics-service',
    topics: ['student.*', 'academic.*', 'financial.*'],
    autoOffsetReset: 'earliest',
    sessionTimeout: 30000,
    heartbeatInterval: 10000,
    maxPollRecords: 500,
    enableAutoCommit: true,
  },
};
```

### 4.3 Consumer Implementation

```typescript
class EventConsumer {
  private consumer: Consumer;
  private isRunning = false;

  constructor(
    private config: ConsumerGroupConfig,
    private handler: (event: DomainEvent) => Promise<void>
  ) {}

  async start(): Promise<void> {
    this.isRunning = true;
    this.consumer = kafka.consumer({ groupId: this.config.name });

    await this.consumer.connect();
    await this.consumer.subscribe({
      topics: this.config.topics,
      fromBeginning: this.config.autoOffsetReset === 'earliest',
    });

    await this.consumer.run({
      eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
        for (const message of batch.messages) {
          try {
            const event = JSON.parse(message.value?.toString() || '{}');
            await this.handler(event);
            resolveOffset(message.offset);
            await heartbeat();
          } catch (error) {
            await this.sendToDLQ(batch.topic, message, error);
          }
        }
      },
    });
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    await this.consumer?.disconnect();
  }
}
```

### 4.4 Monitoring

```typescript
const status = await eventBus.getConsumerGroupStatus('notification-handlers');
// Returns: { name, state, members: [{ id, host, partitions, lag }], totalLag }
```

---

## 5. Priority Queues

### 5.1 Priority Levels

```typescript
enum EventPriority {
  CRITICAL = 0,    // Security alerts, payment failures
  HIGH = 1,        // Grade submissions, attendance alerts
  NORMAL = 2,      // Standard events
  LOW = 3,         // Analytics, reporting
  BATCH = 4,       // Bulk operations
}
```

### 5.2 Priority Configuration

```typescript
const priorityConfig = {
  [EventPriority.CRITICAL]: {
    queueName: 'events-critical',
    maxRetries: 3,
    retryDelay: 1000,
    processingTimeout: 30000,
    alertOnFailure: true,
  },
  [EventPriority.HIGH]: {
    queueName: 'events-high',
    maxRetries: 5,
    retryDelay: 5000,
    processingTimeout: 60000,
  },
  [EventPriority.NORMAL]: {
    queueName: 'events-normal',
    maxRetries: 5,
    retryDelay: 10000,
    processingTimeout: 120000,
  },
  [EventPriority.LOW]: {
    queueName: 'events-low',
    maxRetries: 3,
    retryDelay: 30000,
    processingTimeout: 300000,
  },
  [EventPriority.BATCH]: {
    queueName: 'events-batch',
    maxRetries: 3,
    retryDelay: 60000,
    processingTimeout: 600000,
  },
};
```

### 5.3 Priority Routing

```typescript
const priorityRouting = {
  'security.threat.detected': EventPriority.CRITICAL,
  'payment.failed': EventPriority.CRITICAL,
  'grade.submitted': EventPriority.HIGH,
  'attendance.alert': EventPriority.HIGH,
  'student.created': EventPriority.NORMAL,
  'document.uploaded': EventPriority.NORMAL,
  'analytics.event': EventPriority.LOW,
  'report.generated': EventPriority.LOW,
  'bulk.import': EventPriority.BATCH,
};
```

---

## 6. Delayed Events

### 6.1 Configuration

```typescript
// Delay by duration
await eventBus.publish('workflow.reminder', event, {
  delay: 3600000,  // 1 hour
});

// Schedule for specific time
await eventBus.publish('notification.scheduled', event, {
  scheduledAt: new Date('2026-07-30T09:00:00Z'),
});
```

### 6.2 Delayed Event Store

```typescript
interface DelayedEvent {
  id: string;
  topic: string;
  event: DomainEvent;
  scheduledAt: Date;
  priority: EventPriority;
  retryCount: number;
  maxRetries: number;
  status: 'pending' | 'processing' | 'delivered' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const pendingEvents = await eventBus.getDelayedEvents({
  status: 'pending',
  scheduledBefore: new Date(),
  limit: 100,
});
```

### 6.3 Use Cases

- Follow-up reminders (24h delay)
- Payment retry (1h delay)
- Session timeout (30min delay)
- Scheduled notifications

---

## 7. Saga Orchestration

### 7.1 Saga Definition

```typescript
interface SagaStep {
  name: string;
  action: (context: SagaContext) => Promise<any>;
  compensation: (context: SagaContext) => Promise<void>;
  timeout?: number;
}

interface SagaConfig {
  name: string;
  steps: SagaStep[];
  onFailure: 'compensate' | 'fail' | 'skip';
  timeout: number;
  events: {
    started: string;
    completed: string;
    failed: string;
    stepCompleted: string;
    stepFailed: string;
  };
}
```

### 7.2 Enrollment Saga

```typescript
const enrollmentSaga: SagaConfig = {
  name: 'student-enrollment',
  steps: [
    { name: 'validate-data', action: validate, compensation: noOp, timeout: 30000 },
    { name: 'reserve-seat', action: reserve, compensation: release, timeout: 60000 },
    { name: 'create-enrollment', action: create, compensation: cancel, timeout: 60000 },
    { name: 'assign-advisor', action: assign, compensation: unassign, timeout: 30000 },
    { name: 'generate-schedule', action: generate, compensation: delete, timeout: 120000 },
    { name: 'send-welcome', action: welcome, compensation: cancelWelcome, timeout: 30000 },
  ],
  onFailure: 'compensate',
  timeout: 600000,
  events: {
    started: 'enrollment.saga.started',
    completed: 'enrollment.saga.completed',
    failed: 'enrollment.saga.failed',
    stepCompleted: 'enrollment.saga.step.completed',
    stepFailed: 'enrollment.saga.step.failed',
  },
};
```

### 7.3 Execution

```typescript
class SagaOrchestrator {
  async startSaga(sagaName: string, data: Record<string, any>, correlationId: string): Promise<string> {
    const saga = this.sagas.get(sagaName);
    const sagaId = generateId();
    const context: SagaContext = { sagaId, correlationId, data, completedSteps: [] };

    await this.eventBus.publish(saga.events.started, { sagaId, sagaName, data });
    await this.executeSteps(saga, context);
    return sagaId;
  }

  private async executeSteps(saga: SagaConfig, context: SagaContext): Promise<void> {
    for (const step of saga.steps) {
      try {
        const result = await withTimeout(step.action(context), step.timeout || 60000);
        context.data[step.name] = result;
        context.completedSteps.push(step.name);
        await this.eventBus.publish(saga.events.stepCompleted, { sagaId: context.sagaId, step: step.name });
      } catch (error) {
        if (saga.onFailure === 'compensate') await this.compensate(saga, context);
        await this.eventBus.publish(saga.events.failed, { sagaId: context.sagaId, failedStep: step.name });
        throw error;
      }
    }
    await this.eventBus.publish(saga.events.completed, { sagaId: context.sagaId, result: context.data });
  }

  private async compensate(saga: SagaConfig, context: SagaContext): Promise<void> {
    for (const stepName of [...context.completedSteps].reverse()) {
      const step = saga.steps.find(s => s.name === stepName);
      if (step) await step.compensation(context).catch(console.error);
    }
  }
}
```

---

## 8. Domain Events

### 8.1 Event Categories

| Category | Events |
|---|---|
| **Student** | created, updated, enrolled, graduated, withdrawn, suspended |
| **Teacher** | created, updated, assigned, unassigned |
| **Academic** | grade.submitted, grade.updated, grade.published, exam.scheduled, exam.completed |
| **Financial** | payment.received, payment.failed, invoice.generated, invoice.paid, subscription.created |
| **Document** | uploaded, signed, approved, rejected, shared |
| **Attendance** | marked, alert, corrected |
| **Communication** | message.sent, message.delivered, notification.delivered |
| **Integration** | connector.connected, connector.error, sync.completed |
| **Automation** | workflow.started, workflow.completed, workflow.failed |
| **Security** | authentication.success, authentication.failure, threat.detected |
| **System** | health.check, deployment.completed, migration.failed |

### 8.2 Event Envelope

```typescript
{
  "id": "evt_abc123",
  "type": "student.created",
  "version": 1,
  "timestamp": "2026-07-29T10:00:00Z",
  "correlationId": "req_xyz789",
  "aggregateId": "stu_456",
  "aggregateType": "Student",
  "metadata": {
    "schoolId": "school_123",
    "createdBy": "user_789",
    "source": "api"
  },
  "payload": {
    "id": "stu_456",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
}
```

---

## 9. Event Streaming

### 9.1 Real-time Stream

```typescript
const stream = eventBus.stream('educi.events', {
  consumerGroup: 'analytics',
  fromBeginning: false,
  batchSize: 100,
  blockTimeout: 5000,
});

for await (const event of stream) {
  await processEvent(event);
  await event.ack();
}
```

### 9.2 Windowed Aggregation

```typescript
const windowedStream = eventBus.windowedStream('payment.received', {
  windowSize: '5m',
  slideInterval: '1m',
  aggregate: (events) => ({
    count: events.length,
    totalAmount: events.reduce((sum, e) => sum + e.payload.amount, 0),
  }),
});

for await (const window of windowedStream) {
  await updateDashboard(window);
}
```

### 9.3 Stream Processing

```typescript
// Filter → Map → Aggregate pipeline
const pipeline = eventBus.pipeline('student.*')
  .filter(event => event.metadata.schoolId === 'school_123')
  .map(event => ({ ...event, enriched: true }))
  .window('10m')
  .aggregate(events => ({ count: events.length }))
  .sink(analyticsSink);
```

---

## 10. Event Filtering

### 10.1 Server-side Filters

```typescript
const subscription = await eventBus.subscribe('student.*', handler, {
  filter: {
    schools: ['school_123', 'school_456'],
    eventTypes: ['student.created', 'student.updated'],
    conditions: [
      { field: 'payload.grade', operator: 'gte', value: 9 },
      { field: 'metadata.source', operator: 'eq', value: 'api' },
    ],
  },
});
```

### 10.2 Client-side Filters

```typescript
const subscription = await eventBus.subscribe('student.*', handler, {
  filter: (event) => {
    return event.metadata.schoolId === 'school_123'
      && event.payload.grade >= 9;
  },
});
```

### 10.3 Content-based Routing

```typescript
const routingRules = [
  { pattern: 'payment.failed', target: 'critical-handler' },
  { pattern: 'student.created', target: 'notification-handler' },
  { pattern: 'grade.submitted', target: 'analytics-handler' },
  { pattern: '*', target: 'audit-handler' },
];
```

---

## 11. Correlation IDs

### 11.1 Propagation

```
Request → API Gateway (generates correlationId) →
  Service A (propagates correlationId) →
    Event Bus (includes correlationId in event) →
      Service B (logs with correlationId) →
        Webhook (includes correlationId in headers)
```

### 11.2 Implementation

```typescript
// Middleware to extract/generate correlation ID
function correlationMiddleware(req: Request, res: Response, next: NextFunction) {
  const correlationId = req.headers['x-correlation-id'] as string || generateId();
  req.correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);
  next();
}

// Propagate in events
const event = {
  ...baseEvent,
  correlationId: req.correlationId,
};

// Propagate in outgoing requests
await axios.get(url, {
  headers: { 'X-Correlation-ID': req.correlationId },
});
```

### 11.3 Tracing

```typescript
// End-to-end trace
const trace = await eventBus.trace(correlationId);
// Returns all events and service calls for this request
```

---

## 12. Event Schema Registry

### 12.1 Schema Definition

```typescript
const studentCreatedSchema = {
  type: 'object',
  required: ['id', 'type', 'version', 'timestamp', 'payload'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    type: { type: 'string', const: 'student.created' },
    version: { type: 'number', minimum: 1 },
    timestamp: { type: 'string', format: 'date-time' },
    correlationId: { type: 'string' },
    aggregateId: { type: 'string' },
    aggregateType: { type: 'string', const: 'Student' },
    metadata: { type: 'object' },
    payload: {
      type: 'object',
      required: ['id', 'firstName', 'lastName', 'email'],
      properties: {
        id: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string', format: 'email' },
        grade: { type: 'number' },
        schoolId: { type: 'string' },
      },
    },
  },
};
```

### 12.2 Schema Evolution

| Version | Change | Compatible |
|---|---|---|
| v1 → v2 | Add optional field | Yes |
| v2 → v3 | Add required field | No (breaking) |
| v3 → v4 | Rename field | No (breaking) |
| v4 → v5 | Remove optional field | Yes |

---

## 13. Event Store

### 13.1 Storage

```typescript
interface StoredEvent {
  id: string;
  type: string;
  aggregateId: string;
  aggregateType: string;
  version: number;
  timestamp: Date;
  data: Record<string, any>;
  metadata: Record<string, any>;
  correlationId: string;
}

// Query events
const events = await eventStore.query({
  aggregateType: 'Student',
  aggregateId: 'stu_123',
  fromVersion: 1,
  toVersion: 10,
  fromTimestamp: new Date('2026-01-01'),
  toTimestamp: new Date('2026-07-29'),
  types: ['student.created', 'student.updated'],
  limit: 100,
});
```

### 13.2 Event Replay

```typescript
// Replay events for aggregate reconstruction
const events = await eventStore.getEvents('Student', 'stu_123');
const student = events.reduce((state, event) => applyEvent(state, event), initialState);

// Replay from timestamp
const events = await eventStore.replay({
  fromTimestamp: new Date('2026-07-01'),
  types: ['student.*'],
  handler: async (event) => {
    await rebuildProjection(event);
  },
});
```

---

## 14. Monitoring and Troubleshooting

### 14.1 Key Metrics

| Metric | Type | Description |
|---|---|---|
| `event_bus_published_total` | Counter | Events published |
| `event_bus_consumed_total` | Counter | Events consumed |
| `event_bus_delivery_latency` | Histogram | Delivery latency |
| `event_bus_consumer_lag` | Gauge | Consumer lag |
| `event_bus_dlq_size` | Gauge | Dead letter queue size |
| `event_bus_retry_total` | Counter | Event retries |

### 14.2 Alert Rules

```yaml
groups:
  - name: event-bus
    rules:
      - alert: HighConsumerLag
        expr: event_bus_consumer_lag > 1000
        for: 5m
        labels:
          severity: warning

      - alert: EventBusDown
        expr: up{job="event-bus"} == 0
        for: 1m
        labels:
          severity: critical

      - alert: HighDeliveryLatency
        expr: histogram_quantile(0.95, event_bus_delivery_latency) > 5
        for: 5m
        labels:
          severity: warning
```

### 14.3 Debugging

```typescript
// Check topic status
const topicStatus = await eventBus.getTopicStatus('student.created');
// Returns: { partitions, replicationFactor, retention, messageCount, bytes }

// Check consumer group lag
const lag = await eventBus.getConsumerLag('notification-handlers');
// Returns: { totalLag, perPartitionLag }

// Inspect specific event
const event = await eventStore.getEvent('evt_abc123');

// Dead letter queue inspection
const dlqEntries = await eventBus.getDLQ('notification-handlers', { limit: 50 });
```

---

*EduCI Event Bus — Phase 3 Documentation*
*Last Updated: 2026-07-29*
