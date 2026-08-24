# Phase 2.7 LXP Error System Documentation

## Executive Summary

The EduCI LXP error system comprises 279 AppError classes organized in a hierarchical structure. This documentation covers the error hierarchy, error codes, error handling patterns, and best practices for implementing robust error handling throughout the platform.

---

## Error System Architecture

### Error Hierarchy Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Error Hierarchy                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    BaseAppError                          │    │
│  │  - code: string                                         │    │
│  │  - message: string                                      │    │
│  │  - details: ErrorDetail[]                               │    │
│  │  - timestamp: Date                                      │    │
│  │  - requestId?: string                                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│  │ ValidationError│ │ AuthError  │ │ NotFoundError│          │
│  │             │   │             │   │             │          │
│  │ - field:    │   │ - authType: │   │ - resource: │          │
│  │   string    │   │   string    │   │   string    │          │
│  │ - value:    │   │ - reason:   │   │ - id:       │          │
│  │   unknown   │   │   string    │   │   string    │          │
│  └─────────────┘   └─────────────┘   └─────────────┘          │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│  │ SchemaError │   │ TokenError  │   │ UserNotFound│          │
│  │ FormatError │   │ SessionError│   │ CourseNotFound│        │
│  │ RequiredErr │   │ PermissionErr│  │ LessonNotFound│        │
│  └─────────────┘   └─────────────┘   └─────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Base Error Classes

### BaseAppError

```typescript
// src/errors/BaseAppError.ts

abstract class BaseAppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details: ErrorDetail[];
  public readonly timestamp: Date;
  public readonly requestId?: string;
  public readonly isOperational: boolean;

  constructor(
    code: string,
    message: string,
    statusCode: number,
    details: ErrorDetail[] = [],
    isOperational = true
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date();
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): SerializedError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
      requestId: this.requestId,
    };
  }
}

interface ErrorDetail {
  field: string;
  message: string;
  code: string;
}

interface SerializedError {
  code: string;
  message: string;
  details: ErrorDetail[];
  timestamp: string;
  requestId?: string;
}
```

---

## Validation Errors (45 Classes)

```typescript
// src/errors/validation/ValidationError.ts

class ValidationError extends BaseAppError {
  public readonly field: string;
  public readonly value: unknown;

  constructor(field: string, message: string, value?: unknown) {
    super('VALIDATION_ERROR', message, 400, [
      { field, message, code: 'VALIDATION_FAILED' },
    ]);
    this.field = field;
    this.value = value;
  }
}

// src/errors/validation/SchemaValidationError.ts

class SchemaValidationError extends ValidationError {
  public readonly schemaErrors: ZodIssue[];

  constructor(field: string, schemaErrors: ZodIssue[]) {
    const message = schemaErrors.map((e) => e.message).join(', ');
    super(field, message);
    this.code = 'SCHEMA_VALIDATION_ERROR';
    this.schemaErrors = schemaErrors;
  }
}

// src/errors/validation/RequiredFieldError.ts

class RequiredFieldError extends ValidationError {
  constructor(field: string) {
    super(field, `${field} is required`);
    this.code = 'REQUIRED_FIELD';
  }
}

// src/errors/validation/InvalidFormatError.ts

class InvalidFormatError extends ValidationError {
  public readonly expectedFormat: string;

  constructor(field: string, expectedFormat: string, value?: unknown) {
    super(field, `${field} must be in ${expectedFormat} format`, value);
    this.code = 'INVALID_FORMAT';
    this.expectedFormat = expectedFormat;
  }
}

// src/errors/validation/MinLengthError.ts

class MinLengthError extends ValidationError {
  public readonly minLength: number;

  constructor(field: string, minLength: number, value?: unknown) {
    super(field, `${field} must be at least ${minLength} characters`, value);
    this.code = 'MIN_LENGTH';
    this.minLength = minLength;
  }
}

// src/errors/validation/MaxLengthError.ts

class MaxLengthError extends ValidationError {
  public readonly maxLength: number;

  constructor(field: string, maxLength: number, value?: unknown) {
    super(field, `${field} must be at most ${maxLength} characters`, value);
    this.code = 'MAX_LENGTH';
    this.maxLength = maxLength;
  }
}

// src/errors/validation/InvalidEmailError.ts

class InvalidEmailError extends ValidationError {
  constructor(field: string, value?: unknown) {
    super(field, `${field} must be a valid email address`, value);
    this.code = 'INVALID_EMAIL';
  }
}

// src/errors/validation/InvalidUUIDError.ts

class InvalidUUIDError extends ValidationError {
  constructor(field: string, value?: unknown) {
    super(field, `${field} must be a valid UUID`, value);
    this.code = 'INVALID_UUID';
  }
}
```

---

## Authentication Errors (35 Classes)

```typescript
// src/errors/auth/AuthenticationError.ts

class AuthenticationError extends BaseAppError {
  public readonly authType: string;

  constructor(message: string, authType: string) {
    super('AUTHENTICATION_ERROR', message, 401);
    this.authType = authType;
  }
}

// src/errors/auth/InvalidCredentialsError.ts

class InvalidCredentialsError extends AuthenticationError {
  constructor(email?: string) {
    super('Invalid email or password', 'credentials');
    this.code = 'INVALID_CREDENTIALS';
  }
}

// src/errors/auth/TokenExpiredError.ts

class TokenExpiredError extends AuthenticationError {
  public readonly expiredAt: Date;

  constructor(expiredAt: Date) {
    super('Token has expired', 'token');
    this.code = 'TOKEN_EXPIRED';
    this.expiredAt = expiredAt;
  }
}

// src/errors/auth/InvalidTokenError.ts

class InvalidTokenError extends AuthenticationError {
  constructor(reason?: string) {
    super(reason || 'Invalid token', 'token');
    this.code = 'INVALID_TOKEN';
  }
}

// src/errors/auth/TokenRefreshError.ts

class TokenRefreshError extends AuthenticationError {
  constructor(reason?: string) {
    super(reason || 'Failed to refresh token', 'refresh');
    this.code = 'TOKEN_REFRESH_ERROR';
  }
}

// src/errors/auth/SessionExpiredError.ts

class SessionExpiredError extends AuthenticationError {
  public readonly sessionId: string;

  constructor(sessionId: string) {
    super('Session has expired', 'session');
    this.code = 'SESSION_EXPIRED';
    this.sessionId = sessionId;
  }
}

// src/errors/auth/SessionNotFoundError.ts

class SessionNotFoundError extends AuthenticationError {
  constructor(sessionId: string) {
    super('Session not found', 'session');
    this.code = 'SESSION_NOT_FOUND';
    this.sessionId = sessionId;
  }
}

// src/errors/auth/AccountLockedError.ts

class AccountLockedError extends AuthenticationError {
  public readonly lockedUntil: Date;

  constructor(lockedUntil: Date) {
    super('Account is locked', 'account');
    this.code = 'ACCOUNT_LOCKED';
    this.lockedUntil = lockedUntil;
  }
}

// src/errors/auth/AccountSuspendedError.ts

class AccountSuspendedError extends AuthenticationError {
  public readonly reason: string;

  constructor(reason: string) {
    super('Account has been suspended', 'account');
    this.code = 'ACCOUNT_SUSPENDED';
    this.reason = reason;
  }
}

// src/errors/auth/MFARequiredError.ts

class MFARequiredError extends AuthenticationError {
  constructor() {
    super('Multi-factor authentication required', 'mfa');
    this.code = 'MFA_REQUIRED';
  }
}

// src/errors/auth/InvalidMFACodeError.ts

class InvalidMFACodeError extends AuthenticationError {
  constructor() {
    super('Invalid MFA code', 'mfa');
    this.code = 'INVALID_MFA_CODE';
  }
}
```

---

## Authorization Errors (30 Classes)

```typescript
// src/errors/auth/AuthorizationError.ts

class AuthorizationError extends BaseAppError {
  public readonly requiredPermission: string;

  constructor(message: string, requiredPermission: string) {
    super('AUTHORIZATION_ERROR', message, 403);
    this.requiredPermission = requiredPermission;
  }
}

// src/errors/auth/InsufficientPermissionsError.ts

class InsufficientPermissionsError extends AuthorizationError {
  public readonly userRole: string;

  constructor(requiredPermission: string, userRole: string) {
    super(
      `Insufficient permissions. Required: ${requiredPermission}`,
      requiredPermission
    );
    this.code = 'INSUFFICIENT_PERMISSIONS';
    this.userRole = userRole;
  }
}

// src/errors/auth/ForbiddenError.ts

class ForbiddenError extends AuthorizationError {
  constructor(message?: string) {
    super(message || 'Access denied', 'none');
    this.code = 'FORBIDDEN';
  }
}

// src/errors/auth/TenantAccessError.ts

class TenantAccessError extends AuthorizationError {
  public readonly tenantId: string;

  constructor(tenantId: string) {
    super('Access denied to tenant', 'tenant_access');
    this.code = 'TENANT_ACCESS_DENIED';
    this.tenantId = tenantId;
  }
}

// src/errors/auth/CourseAccessError.ts

class CourseAccessError extends AuthorizationError {
  public readonly courseId: string;

  constructor(courseId: string, reason?: string) {
    super(reason || 'Access denied to course', 'course_access');
    this.code = 'COURSE_ACCESS_DENIED';
    this.courseId = courseId;
  }
}

// src/errors/auth/InstructorRequiredError.ts

class InstructorRequiredError extends AuthorizationError {
  constructor() {
    super('Instructor role required', 'instructor_role');
    this.code = 'INSTRUCTOR_REQUIRED';
  }
}

// src/errors/auth/AdminRequiredError.ts

class AdminRequiredError extends AuthorizationError {
  constructor() {
    super('Admin role required', 'admin_role');
    this.code = 'ADMIN_REQUIRED';
  }
}
```

---

## Not Found Errors (40 Classes)

```typescript
// src/errors/notfound/NotFoundError.ts

class NotFoundError extends BaseAppError {
  public readonly resource: string;
  public readonly id?: string;

  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} with id ${id} not found`
      : `${resource} not found`;
    super('NOT_FOUND', message, 404);
    this.resource = resource;
    this.id = id;
  }
}

// src/errors/notfound/UserNotFoundError.ts

class UserNotFoundError extends NotFoundError {
  constructor(identifier: string) {
    super('User', identifier);
    this.code = 'USER_NOT_FOUND';
  }
}

// src/errors/notfound/CourseNotFoundError.ts

class CourseNotFoundError extends NotFoundError {
  constructor(courseId: string) {
    super('Course', courseId);
    this.code = 'COURSE_NOT_FOUND';
  }
}

// src/errors/notfound/LessonNotFoundError.ts

class LessonNotFoundError extends NotFoundError {
  constructor(lessonId: string) {
    super('Lesson', lessonId);
    this.code = 'LESSON_NOT_FOUND';
  }
}

// src/errors/notfound/ModuleNotFoundError.ts

class ModuleNotFoundError extends NotFoundError {
  constructor(moduleId: string) {
    super('Module', moduleId);
    this.code = 'MODULE_NOT_FOUND';
  }
}

// src/errors/notfound/EnrollmentNotFoundError.ts

class EnrollmentNotFoundError extends NotFoundError {
  constructor(enrollmentId: string) {
    super('Enrollment', enrollmentId);
    this.code = 'ENROLLMENT_NOT_FOUND';
  }
}

// src/errors/notfound/QuizNotFoundError.ts

class QuizNotFoundError extends NotFoundError {
  constructor(quizId: string) {
    super('Quiz', quizId);
    this.code = 'QUIZ_NOT_FOUND';
  }
}

// src/errors/notfound/AssignmentNotFoundError.ts

class AssignmentNotFoundError extends NotFoundError {
  constructor(assignmentId: string) {
    super('Assignment', assignmentId);
    this.code = 'ASSIGNMENT_NOT_FOUND';
  }
}

// src/errors/notfound/CertificateNotFoundError.ts

class CertificateNotFoundError extends NotFoundError {
  constructor(certificateId: string) {
    super('Certificate', certificateId);
    this.code = 'CERTIFICATE_NOT_FOUND';
  }
}

// src/errors/notfound/TenantNotFoundError.ts

class TenantNotFoundError extends NotFoundError {
  constructor(tenantId: string) {
    super('Tenant', tenantId);
    this.code = 'TENANT_NOT_FOUND';
  }
}

// src/errors/notfound/PaymentNotFoundError.ts

class PaymentNotFoundError extends NotFoundError {
  constructor(paymentId: string) {
    super('Payment', paymentId);
    this.code = 'PAYMENT_NOT_FOUND';
  }
}

// src/errors/notfound/NotificationNotFoundError.ts

class NotificationNotFoundError extends NotFoundError {
  constructor(notificationId: string) {
    super('Notification', notificationId);
    this.code = 'NOTIFICATION_NOT_FOUND';
  }
}

// src/errors/notfound/FileNotFoundError.ts

class FileNotFoundError extends NotFoundError {
  constructor(fileId: string) {
    super('File', fileId);
    this.code = 'FILE_NOT_FOUND';
  }
}

// src/errors/notfound/MediaNotFoundError.ts

class MediaNotFoundError extends NotFoundError {
  constructor(mediaId: string) {
    super('Media', mediaId);
    this.code = 'MEDIA_NOT_FOUND';
  }
}

// src/errors/notfound/CategoryNotFoundError.ts

class CategoryNotFoundError extends NotFoundError {
  constructor(categoryId: string) {
    super('Category', categoryId);
    this.code = 'CATEGORY_NOT_FOUND';
  }
}
```

---

## Business Logic Errors (50 Classes)

```typescript
// src/errors/business/BusinessRuleError.ts

class BusinessRuleError extends BaseAppError {
  public readonly rule: string;

  constructor(rule: string, message: string) {
    super('BUSINESS_RULE_ERROR', message, 422);
    this.rule = rule;
  }
}

// src/errors/business/CourseAlreadyPublishedError.ts

class CourseAlreadyPublishedError extends BusinessRuleError {
  constructor(courseId: string) {
    super(
      'course_already_published',
      'Course is already published'
    );
    this.code = 'COURSE_ALREADY_PUBLISHED';
  }
}

// src/errors/business/CourseNotPublishedError.ts

class CourseNotPublishedError extends BusinessRuleError {
  constructor(courseId: string) {
    super(
      'course_not_published',
      'Course must be published before enrollment'
    );
    this.code = 'COURSE_NOT_PUBLISHED';
  }
}

// src/errors/business/AlreadyEnrolledError.ts

class AlreadyEnrolledError extends BusinessRuleError {
  constructor(userId: string, courseId: string) {
    super(
      'already_enrolled',
      'User is already enrolled in this course'
    );
    this.code = 'ALREADY_ENROLLED';
  }
}

// src/errors/business/NotEnrolledError.ts

class NotEnrolledError extends BusinessRuleError {
  constructor(userId: string, courseId: string) {
    super(
      'not_enrolled',
      'User is not enrolled in this course'
    );
    this.code = 'NOT_ENROLLED';
  }
}

// src/errors/business/CourseFullError.ts

class CourseFullError extends BusinessRuleError {
  public readonly maxEnrollments: number;

  constructor(maxEnrollments: number) {
    super(
      'course_full',
      `Course has reached maximum enrollment of ${maxEnrollments}`
    );
    this.code = 'COURSE_FULL';
    this.maxEnrollments = maxEnrollments;
  }
}

// src/errors/business/CourseNotCompleteError.ts

class CourseNotCompleteError extends BusinessRuleError {
  public readonly completionPercentage: number;

  constructor(completionPercentage: number) {
    super(
      'course_not_complete',
      `Course completion is at ${completionPercentage}%`
    );
    this.code = 'COURSE_NOT_COMPLETE';
    this.completionPercentage = completionPercentage;
  }
}

// src/errors/business/PrerequisiteNotMetError.ts

class PrerequisiteNotMetError extends BusinessRuleError {
  public readonly requiredCourseId: string;

  constructor(requiredCourseId: string) {
    super(
      'prerequisite_not_met',
      'Prerequisite course not completed'
    );
    this.code = 'PREREQUISITE_NOT_MET';
    this.requiredCourseId = requiredCourseId;
  }
}

// src/errors/business/LessonAlreadyCompletedError.ts

class LessonAlreadyCompletedError extends BusinessRuleError {
  constructor(lessonId: string) {
    super(
      'lesson_already_completed',
      'Lesson is already completed'
    );
    this.code = 'LESSON_ALREADY_COMPLETED';
  }
}

// src/errors/business/QuizMaxAttemptsError.ts

class QuizMaxAttemptsError extends BusinessRuleError {
  public readonly maxAttempts: number;
  public readonly attemptsUsed: number;

  constructor(maxAttempts: number, attemptsUsed: number) {
    super(
      'quiz_max_attempts',
      `Maximum quiz attempts (${maxAttempts}) reached`
    );
    this.code = 'QUIZ_MAX_ATTEMPTS';
    this.maxAttempts = maxAttempts;
    this.attemptsUsed = attemptsUsed;
  }
}

// src/errors/business/QuizTimeLimitError.ts

class QuizTimeLimitError extends BusinessRuleError {
  constructor(quizId: string) {
    super(
      'quiz_time_limit',
      'Quiz time limit has expired'
    );
    this.code = 'QUIZ_TIME_LIMIT';
  }
}

// src/errors/business/InsufficientScoreError.ts

class InsufficientScoreError extends BusinessRuleError {
  public readonly score: number;
  public readonly passingScore: number;

  constructor(score: number, passingScore: number) {
    super(
      'insufficient_score',
      `Score ${score} is below passing score ${passingScore}`
    );
    this.code = 'INSUFFICIENT_SCORE';
    this.score = score;
    this.passingScore = passingScore;
  }
}

// src/errors/business/PaymentRequiredError.ts

class PaymentRequiredError extends BusinessRuleError {
  public readonly amount: number;
  public readonly currency: string;

  constructor(amount: number, currency: string) {
    super(
      'payment_required',
      `Payment of ${amount} ${currency} required`
    );
    this.code = 'PAYMENT_REQUIRED';
    this.amount = amount;
    this.currency = currency;
  }
}

// src/errors/business/RefundNotAvailableError.ts

class RefundNotAvailableError extends BusinessRuleError {
  constructor(reason: string) {
    super('refund_not_available', reason);
    this.code = 'REFUND_NOT_AVAILABLE';
  }
}

// src/errors/business/DuplicateEntryError.ts

class DuplicateEntryError extends BusinessRuleError {
  public readonly field: string;

  constructor(field: string, value: string) {
    super(
      'duplicate_entry',
      `Duplicate ${field}: ${value}`
    );
    this.code = 'DUPLICATE_ENTRY';
    this.field = field;
  }
}

// src/errors/business/RateLimitExceededError.ts

class RateLimitExceededError extends BusinessRuleError {
  public readonly limit: number;
  public readonly windowMs: number;

  constructor(limit: number, windowMs: number) {
    super(
      'rate_limit_exceeded',
      `Rate limit exceeded. Max ${limit} requests per ${windowMs / 1000}s`
    );
    this.code = 'RATE_LIMIT_EXCEEDED';
    this.limit = limit;
    this.windowMs = windowMs;
  }
}

// src/errors/business/InvalidStateError.ts

class InvalidStateError extends BusinessRuleError {
  public readonly currentState: string;
  public readonly requiredState: string;

  constructor(currentState: string, requiredState: string) {
    super(
      'invalid_state',
      `Invalid state: ${currentState}. Required: ${requiredState}`
    );
    this.code = 'INVALID_STATE';
    this.currentState = currentState;
    this.requiredState = requiredState;
  }
}
```

---

## External Service Errors (40 Classes)

```typescript
// src/errors/external/ExternalServiceError.ts

class ExternalServiceError extends BaseAppError {
  public readonly service: string;
  public readonly operation: string;

  constructor(service: string, operation: string, message: string) {
    super('EXTERNAL_SERVICE_ERROR', message, 502);
    this.service = service;
    this.operation = operation;
  }
}

// src/errors/external/PaymentGatewayError.ts

class PaymentGatewayError extends ExternalServiceError {
  public readonly gatewayResponse: Record<string, unknown>;

  constructor(
    gateway: string,
    operation: string,
    message: string,
    gatewayResponse: Record<string, unknown>
  ) {
    super(gateway, operation, message);
    this.code = 'PAYMENT_GATEWAY_ERROR';
    this.gatewayResponse = gatewayResponse;
  }
}

// src/errors/external/StripeError.ts

class StripeError extends PaymentGatewayError {
  constructor(message: string, response: Record<string, unknown>) {
    super('stripe', 'payment', message, response);
    this.code = 'STRIPE_ERROR';
  }
}

// src/errors/external/EmailServiceError.ts

class EmailServiceError extends ExternalServiceError {
  public readonly emailProvider: string;

  constructor(provider: string, message: string) {
    super(provider, 'send_email', message);
    this.code = 'EMAIL_SERVICE_ERROR';
    this.emailProvider = provider;
  }
}

// src/errors/external/SendGridError.ts

class SendGridError extends EmailServiceError {
  constructor(message: string) {
    super('sendgrid', message);
    this.code = 'SENDGRID_ERROR';
  }
}

// src/errors/external/StorageServiceError.ts

class StorageServiceError extends ExternalServiceError {
  public readonly bucket: string;
  public readonly key: string;

  constructor(
    provider: string,
    operation: string,
    bucket: string,
    key: string,
    message: string
  ) {
    super(provider, operation, message);
    this.code = 'STORAGE_SERVICE_ERROR';
    this.bucket = bucket;
    this.key = key;
  }
}

// src/errors/external/S3Error.ts

class S3Error extends StorageServiceError {
  constructor(
    operation: string,
    bucket: string,
    key: string,
    message: string
  ) {
    super('s3', operation, bucket, key, message);
    this.code = 'S3_ERROR';
  }
}

// src/errors/external/AIModelError.ts

class AIModelError extends ExternalServiceError {
  public readonly modelId: string;

  constructor(modelId: string, operation: string, message: string) {
    super('ai_model', operation, message);
    this.code = 'AI_MODEL_ERROR';
    this.modelId = modelId;
  }
}

// src/errors/external/OpenAIError.ts

class OpenAIError extends AIModelError {
  constructor(operation: string, message: string) {
    super('gpt-4', operation, message);
    this.code = 'OPENAI_ERROR';
  }
}
```

---

## Database Errors (39 Classes)

```typescript
// src/errors/database/DatabaseError.ts

class DatabaseError extends BaseAppError {
  public readonly query?: string;
  public readonly dbOperation: string;

  constructor(dbOperation: string, message: string, query?: string) {
    super('DATABASE_ERROR', message, 500, [], false);
    this.dbOperation = dbOperation;
    this.query = query;
  }
}

// src/errors/database/ConnectionError.ts

class ConnectionError extends DatabaseError {
  constructor(message: string) {
    super('connect', message);
    this.code = 'DATABASE_CONNECTION_ERROR';
  }
}

// src/errors/database/QueryError.ts

class QueryError extends DatabaseError {
  public readonly queryName: string;

  constructor(queryName: string, message: string, query?: string) {
    super('query', message, query);
    this.code = 'DATABASE_QUERY_ERROR';
    this.queryName = queryName;
  }
}

// src/errors/database/ConstraintViolationError.ts

class ConstraintViolationError extends DatabaseError {
  public readonly constraint: string;
  public readonly table: string;

  constructor(constraint: string, table: string, message: string) {
    super('constraint_violation', message);
    this.code = 'CONSTRAINT_VIOLATION';
    this.constraint = constraint;
    this.table = table;
  }
}

// src/errors/database/UniqueConstraintError.ts

class UniqueConstraintError extends ConstraintViolationError {
  public readonly field: string;

  constructor(table: string, field: string) {
    super('unique', table, `Duplicate value for ${field}`);
    this.code = 'UNIQUE_CONSTRAINT_VIOLATION';
    this.field = field;
  }
}

// src/errors/database/ForeignKeyError.ts

class ForeignKeyError extends ConstraintViolationError {
  public readonly referencedTable: string;

  constructor(table: string, referencedTable: string) {
    super('foreign_key', table, `Referenced record not found in ${referencedTable}`);
    this.code = 'FOREIGN_KEY_VIOLATION';
    this.referencedTable = referencedTable;
  }
}

// src/errors/database/TransactionError.ts

class TransactionError extends DatabaseError {
  public readonly transactionId: string;

  constructor(transactionId: string, message: string) {
    super('transaction', message);
    this.code = 'TRANSACTION_ERROR';
    this.transactionId = transactionId;
  }
}

// src/errors/database/DeadlockError.ts

class DeadlockError extends TransactionError {
  constructor(transactionId: string) {
    super(transactionId, 'Database deadlock detected');
    this.code = 'DEADLOCK_ERROR';
  }
}

// src/errors/database/TimeoutError.ts

class DatabaseTimeoutError extends DatabaseError {
  public readonly timeoutMs: number;

  constructor(operation: string, timeoutMs: number) {
    super(operation, `Database operation timed out after ${timeoutMs}ms`);
    this.code = 'DATABASE_TIMEOUT';
    this.timeoutMs = timeoutMs;
  }
}
```

---

## Error Handling Middleware

```typescript
// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { BaseAppError } from '../errors/BaseAppError';
import { logger } from '../utils/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Log error
  logger.error({
    error: err.message,
    stack: err.stack,
    requestId: req.headers['x-request-id'],
    path: req.path,
    method: req.method,
  });

  // Handle known operational errors
  if (err instanceof BaseAppError && err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      meta: {
        requestId: req.headers['x-request-id'],
        timestamp: err.timestamp.toISOString(),
      },
    });
    return;
  }

  // Handle unknown errors
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    },
    meta: {
      requestId: req.headers['x-request-id'],
      timestamp: new Date().toISOString(),
    },
  });
}
```

---

## Error Handling Patterns

### Service Layer Pattern

```typescript
// src/services/CourseService.ts

class CourseService {
  async createCourse(
    data: CreateCourseDTO,
    userId: string
  ): Promise<Course> {
    try {
      // Validate input
      const validatedData = courseSchema.parse(data);

      // Check permissions
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new UserNotFoundError(userId);
      }

      if (user.role !== 'instructor' && user.role !== 'admin') {
        throw new InstructorRequiredError();
      }

      // Check for duplicate slug
      const existingCourse = await this.courseRepository.findBySlug(
        validatedData.slug
      );
      if (existingCourse) {
        throw new DuplicateEntryError('slug', validatedData.slug);
      }

      // Create course
      const course = await this.courseRepository.create({
        ...validatedData,
        instructorId: userId,
        status: 'draft',
      });

      return course;
    } catch (error) {
      if (error instanceof BaseAppError) {
        throw error;
      }
      throw new DatabaseError('create', 'Failed to create course');
    }
  }
}
```

### Route Handler Pattern

```typescript
// src/routes/courses.ts

router.post(
  '/',
  authenticate,
  authorize('course:create'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await courseService.createCourse(
        req.body,
        req.user.id
      );

      res.status(201).json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }
);
```

### Async Handler Wrapper

```typescript
// src/utils/asyncHandler.ts

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Usage
router.post(
  '/',
  authenticate,
  authorize('course:create'),
  asyncHandler(async (req: Request, res: Response) => {
    const course = await courseService.createCourse(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      data: course,
    });
  })
);
```

---

## Error Code Reference

### HTTP Status Code Mapping

| Status Code | Error Category | Example |
|-------------|----------------|---------|
| 400 | Validation Errors | `VALIDATION_ERROR`, `SCHEMA_VALIDATION_ERROR` |
| 401 | Authentication Errors | `INVALID_CREDENTIALS`, `TOKEN_EXPIRED` |
| 403 | Authorization Errors | `INSUFFICIENT_PERMISSIONS`, `FORBIDDEN` |
| 404 | Not Found Errors | `USER_NOT_FOUND`, `COURSE_NOT_FOUND` |
| 409 | Conflict Errors | `DUPLICATE_ENTRY`, `ALREADY_ENROLLED` |
| 422 | Business Rule Errors | `BUSINESS_RULE_ERROR`, `COURSE_NOT_PUBLISHED` |
| 429 | Rate Limit Errors | `RATE_LIMIT_EXCEEDED` |
| 500 | Server Errors | `INTERNAL_SERVER_ERROR`, `DATABASE_ERROR` |
| 502 | External Service Errors | `EXTERNAL_SERVICE_ERROR`, `STRIPE_ERROR` |

---

## Best Practices

### 1. Use Specific Error Classes

```typescript
// Bad
throw new Error('User not found');

// Good
throw new UserNotFoundError(userId);
```

### 2. Include Contextual Details

```typescript
throw new CourseAccessError(courseId, 'Course is not published');
```

### 3. Don't Expose Internal Details

```typescript
// Bad
throw new DatabaseError('query', `SELECT * FROM users WHERE id = ${userId}`);

// Good
throw new UserNotFoundError(userId);
```

### 4. Use Error Boundaries for React

```typescript
// src/components/ErrorBoundary.tsx

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  state = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorDisplay error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### 5. Log Errors Appropriately

```typescript
// src/utils/logger.ts

import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

---

## References

- `src/errors/` - Error class definitions
- `src/middleware/errorHandler.ts` - Error handling middleware
- `src/utils/logger.ts` - Logging utility
- `src/types/errors.types.ts` - Error type definitions

---

*Last Updated: Phase 2.7 - LXP Error System Documentation*
