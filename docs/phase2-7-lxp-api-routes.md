# Phase 2.7 LXP API Routes Documentation

## Executive Summary

The EduCI LXP API layer comprises 120 route files implementing RESTful APIs with comprehensive authentication, authorization, and validation. This documentation covers route structure, middleware, request/response patterns, and security best practices.

---

## API Architecture

### Route Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                      API Route Architecture                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Client Request                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Middleware Stack                       │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │  CORS    │ │  Rate    │ │  Auth    │ │  Tenant  │   │    │
│  │  │          │ │  Limit   │ │          │ │  Resolve │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Route Handler                          │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │ Validate │ │ Execute  │ │ Transform│ │ Respond  │   │    │
│  │  │ Input    │ │ Service  │ │ Output   │ │ Client   │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Response                               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Route Files Overview

| Module | Routes | File Path |
|--------|--------|-----------|
| Auth | 12 | `src/routes/auth/` |
| Users | 8 | `src/routes/users/` |
| Courses | 15 | `src/routes/courses/` |
| Enrollments | 10 | `src/routes/enrollments/` |
| Lessons | 12 | `src/routes/lessons/` |
| Quizzes | 14 | `src/routes/quizzes/` |
| Assignments | 8 | `src/routes/assignments/` |
| Analytics | 10 | `src/routes/analytics/` |
| Notifications | 8 | `src/routes/notifications/` |
| Payments | 10 | `src/routes/payments/` |
| Media | 8 | `src/routes/media/` |
| Certificates | 7 | `src/routes/certificates/` |
| **Total** | **120** | |

---

## Authentication Routes

```typescript
// src/routes/auth/auth.routes.ts

import { Router } from 'express';
import { validate, authenticate } from '../../middleware';
import { authController } from '../../controllers';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  refreshTokenSchema,
} from '../../validators';

const router = Router();

// Public routes
router.post(
  '/login',
  validate(loginSchema),
  authController.login
);

router.post(
  '/register',
  validate(registerSchema),
  authController.register
);

router.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  authController.resetPassword
);

router.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  authController.refreshToken
);

// Protected routes
router.post(
  '/logout',
  authenticate,
  authController.logout
);

router.post(
  '/change-password',
  authenticate,
  validate(changePasswordSchema),
  authController.changePassword
);

router.get(
  '/me',
  authenticate,
  authController.getCurrentUser
);

router.post(
  '/verify-email',
  authenticate,
  authController.verifyEmail
);

router.post(
  '/enable-mfa',
  authenticate,
  authController.enableMFA
);

router.post(
  '/verify-mfa',
  authenticate,
  authController.verifyMFA
);

router.post(
  '/disable-mfa',
  authenticate,
  authController.disableMFA
);

export default router;
```

---

## Course Routes

```typescript
// src/routes/courses/courses.routes.ts

import { Router } from 'express';
import { validate, authenticate, authorize } from '../../middleware';
import { courseController } from '../../controllers';
import {
  createCourseSchema,
  updateCourseSchema,
  courseQuerySchema,
} from '../../validators';
import { asyncHandler } from '../../utils';

const router = Router();

// Public routes
router.get(
  '/',
  validate(courseQuerySchema, 'query'),
  asyncHandler(courseController.listCourses)
);

router.get(
  '/:id',
  asyncHandler(courseController.getCourse)
);

router.get(
  '/slug/:slug',
  asyncHandler(courseController.getCourseBySlug)
);

router.get(
  '/:id/stats',
  asyncHandler(courseController.getCourseStatistics)
);

// Protected routes - Instructor/Admin
router.post(
  '/',
  authenticate,
  authorize('course:create'),
  validate(createCourseSchema),
  asyncHandler(courseController.createCourse)
);

router.put(
  '/:id',
  authenticate,
  authorize('course:update'),
  validate(updateCourseSchema),
  asyncHandler(courseController.updateCourse)
);

router.delete(
  '/:id',
  authenticate,
  authorize('course:delete'),
  asyncHandler(courseController.deleteCourse)
);

router.post(
  '/:id/publish',
  authenticate,
  authorize('course:publish'),
  asyncHandler(courseController.publishCourse)
);

router.post(
  '/:id/archive',
  authenticate,
  authorize('course:publish'),
  asyncHandler(courseController.archiveCourse)
);

// Module routes
router.post(
  '/:courseId/modules',
  authenticate,
  authorize('course:update'),
  asyncHandler(courseController.createModule)
);

router.put(
  '/:courseId/modules/:moduleId',
  authenticate,
  authorize('course:update'),
  asyncHandler(courseController.updateModule)
);

router.delete(
  '/:courseId/modules/:moduleId',
  authenticate,
  authorize('course:update'),
  asyncHandler(courseController.deleteModule)
);

// Lesson routes
router.post(
  '/:courseId/modules/:moduleId/lessons',
  authenticate,
  authorize('course:update'),
  asyncHandler(courseController.createLesson)
);

router.put(
  '/:courseId/modules/:moduleId/lessons/:lessonId',
  authenticate,
  authorize('course:update'),
  asyncHandler(courseController.updateLesson)
);

router.delete(
  '/:courseId/modules/:moduleId/lessons/:lessonId',
  authenticate,
  authorize('course:update'),
  asyncHandler(courseController.deleteLesson)
);

export default router;
```

---

## Enrollment Routes

```typescript
// src/routes/enrollments/enrollments.routes.ts

import { Router } from 'express';
import { validate, authenticate, authorize } from '../../middleware';
import { enrollmentController } from '../../controllers';
import {
  createEnrollmentSchema,
  enrollmentQuerySchema,
  updateEnrollmentStatusSchema,
  bulkEnrollmentSchema,
} from '../../validators';

const router = Router();

// User routes
router.post(
  '/',
  authenticate,
  validate(createEnrollmentSchema),
  enrollmentController.enroll
);

router.get(
  '/my',
  authenticate,
  enrollmentController.getMyEnrollments
);

router.get(
  '/my/active',
  authenticate,
  enrollmentController.getActiveEnrollments
);

router.get(
  '/my/completed',
  authenticate,
  enrollmentController.getCompletedEnrollments
);

router.post(
  '/:courseId/unenroll',
  authenticate,
  enrollmentController.unenroll
);

router.get(
  '/:courseId/can-enroll',
  authenticate,
  enrollmentController.canEnroll
);

// Instructor/Admin routes
router.get(
  '/course/:courseId',
  authenticate,
  authorize('enrollment:read'),
  validate(enrollmentQuerySchema, 'query'),
  enrollmentController.getCourseEnrollments
);

router.get(
  '/course/:courseId/stats',
  authenticate,
  authorize('enrollment:read'),
  enrollmentController.getCourseEnrollmentStats
);

router.put(
  '/:id/status',
  authenticate,
  authorize('enrollment:update'),
  validate(updateEnrollmentStatusSchema),
  enrollmentController.updateStatus
);

router.post(
  '/bulk',
  authenticate,
  authorize('enrollment:create'),
  validate(bulkEnrollmentSchema),
  enrollmentController.bulkEnroll
);

export default router;
```

---

## Quiz Routes

```typescript
// src/routes/quizzes/quizzes.routes.ts

import { Router } from 'express';
import { validate, authenticate, authorize } from '../../middleware';
import { quizController } from '../../controllers';
import {
  createQuizSchema,
  updateQuizSchema,
  submitQuizAttemptSchema,
} from '../../validators';

const router = Router();

// Instructor routes
router.post(
  '/',
  authenticate,
  authorize('quiz:create'),
  validate(createQuizSchema),
  quizController.createQuiz
);

router.put(
  '/:id',
  authenticate,
  authorize('quiz:update'),
  validate(updateQuizSchema),
  quizController.updateQuiz
);

router.delete(
  '/:id',
  authenticate,
  authorize('quiz:delete'),
  quizController.deleteQuiz
);

// Student routes
router.get(
  '/:id',
  authenticate,
  quizController.getQuiz
);

router.get(
  '/:id/questions',
  authenticate,
  quizController.getQuizQuestions
);

router.post(
  '/:id/start',
  authenticate,
  quizController.startAttempt
);

router.get(
  '/:id/attempts',
  authenticate,
  quizController.getUserAttempts
);

router.get(
  '/attempts/:attemptId',
  authenticate,
  quizController.getAttempt
);

router.post(
  '/attempts/:attemptId/submit',
  authenticate,
  validate(submitQuizAttemptSchema),
  quizController.submitAttempt
);

// Analytics routes
router.get(
  '/:id/stats',
  authenticate,
  authorize('analytics:read'),
  quizController.getQuizStatistics
);

router.get(
  '/:id/questions/stats',
  authenticate,
  authorize('analytics:read'),
  quizController.getQuestionStatistics
);

export default router;
```

---

## Analytics Routes

```typescript
// src/routes/analytics/analytics.routes.ts

import { Router } from 'express';
import { authenticate, authorize } from '../../middleware';
import { analyticsController } from '../../controllers';

const router = Router();

// User analytics
router.get(
  '/user/me',
  authenticate,
  analyticsController.getMyAnalytics
);

router.get(
  '/user/:userId',
  authenticate,
  authorize('analytics:read'),
  analyticsController.getUserAnalytics
);

router.get(
  '/user/:userId/goals',
  authenticate,
  analyticsController.getUserGoals
);

router.put(
  '/user/:userId/goals/:goalId',
  authenticate,
  analyticsController.updateUserGoal
);

router.get(
  '/user/:userId/streak',
  authenticate,
  analyticsController.getLearningStreak
);

// Course analytics
router.get(
  '/course/:courseId',
  authenticate,
  authorize('analytics:read'),
  analyticsController.getCourseAnalytics
);

router.get(
  '/course/:courseId/lessons',
  authenticate,
  authorize('analytics:read'),
  analyticsController.getCourseLessonAnalytics
);

router.get(
  '/course/:courseId/enrollments',
  authenticate,
  authorize('analytics:read'),
  analyticsController.getCourseEnrollmentAnalytics
);

// Tenant analytics
router.get(
  '/tenant',
  authenticate,
  authorize('analytics:read'),
  analyticsController.getTenantAnalytics
);

router.get(
  '/tenant/engagement',
  authenticate,
  authorize('analytics:read'),
  analyticsController.getEngagementMetrics
);

router.get(
  '/tenant/leaderboard',
  authenticate,
  authorize('analytics:read'),
  analyticsController.getLeaderboard
);

export default router;
```

---

## Notification Routes

```typescript
// src/routes/notifications/notifications.routes.ts

import { Router } from 'express';
import { authenticate, authorize } from '../../middleware';
import { notificationController } from '../../controllers';

const router = Router();

// User routes
router.get(
  '/',
  authenticate,
  notificationController.getMyNotifications
);

router.get(
  '/unread-count',
  authenticate,
  notificationController.getUnreadCount
);

router.put(
  '/:id/read',
  authenticate,
  notificationController.markAsRead
);

router.put(
  '/read-all',
  authenticate,
  notificationController.markAllAsRead
);

router.delete(
  '/:id',
  authenticate,
  notificationController.deleteNotification
);

// Admin routes
router.post(
  '/send',
  authenticate,
  authorize('notification:send'),
  notificationController.sendNotification
);

router.post(
  '/send-bulk',
  authenticate,
  authorize('notification:send'),
  notificationController.sendBulkNotifications
);

router.post(
  '/send-template',
  authenticate,
  authorize('notification:send'),
  notificationController.sendTemplateNotification
);

export default router;
```

---

## Middleware Stack

```typescript
// src/middleware/index.ts

import { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { authenticate } from './authenticate';
import { authorize } from './authorize';
import { validate } from './validate';
import { tenantResolver } from './tenantResolver';
import { errorHandler } from './errorHandler';
import { requestLogger } from './requestLogger';

export function setupMiddleware(app: Router): void {
  // Security headers
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
    })
  );

  // Compression
  app.use(compression());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP',
    })
  );

  // Request logging
  app.use(requestLogger);

  // Tenant resolution
  app.use(tenantResolver);
}

export function setupErrorHandling(app: Router): void {
  app.use(errorHandler);
}

export { authenticate, authorize, validate };
```

---

## Authentication Middleware

```typescript
// src/middleware/authenticate.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Redis } from 'ioredis';
import { TokenExpiredError, InvalidTokenError } from '../errors';

const redis = new Redis(process.env.REDIS_URL);

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new InvalidTokenError('No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Check if token is blacklisted
    const isBlacklisted = await redis.get(`blacklist:${token}`);
    if (isBlacklisted) {
      throw new InvalidTokenError('Token has been revoked');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    // Attach user to request
    req.user = decoded.user;
    req.tenantId = decoded.tenantId;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new TokenExpiredError(error.expiredAt));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new InvalidTokenError(error.message));
    } else {
      next(error);
    }
  }
}

interface JWTPayload {
  user: {
    id: string;
    email: string;
    role: string;
  };
  tenantId: string;
}
```

---

## Authorization Middleware

```typescript
// src/middleware/authorize.ts

import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, InsufficientPermissionsError } from '../errors';

const PERMISSIONS: Record<string, string[]> = {
  admin: ['*'],
  instructor: [
    'course:create',
    'course:update',
    'course:delete',
    'course:publish',
    'quiz:create',
    'quiz:update',
    'quiz:delete',
    'analytics:read',
    'enrollment:read',
    'enrollment:update',
  ],
  student: [
    'course:read',
    'quiz:read',
    'quiz:attempt',
    'enrollment:create',
    'enrollment:read',
  ],
};

export function authorize(...requiredPermissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      next(new ForbiddenError('User not authenticated'));
      return;
    }

    const userPermissions = PERMISSIONS[user.role] || [];

    // Admin has all permissions
    if (userPermissions.includes('*')) {
      next();
      return;
    }

    // Check if user has required permissions
    const hasPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      next(
        new InsufficientPermissionsError(
          requiredPermissions.join(', '),
          user.role
        )
      );
      return;
    }

    next();
  };
}
```

---

## Tenant Resolution Middleware

```typescript
// src/middleware/tenantResolver.ts

import { Request, Response, NextFunction } from 'express';
import { TenantNotFoundError } from '../errors';
import { tenantService } from '../services';

export async function tenantResolver(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get tenant from header or subdomain
    const tenantId =
      req.headers['x-tenant-id'] as string ||
      extractTenantFromSubdomain(req.hostname);

    if (!tenantId) {
      // Use default tenant if multi-tenancy is disabled
      if (process.env.MULTI_TENANCY_ENABLED !== 'true') {
        req.tenantId = process.env.DEFAULT_TENANT || 'default';
        next();
        return;
      }
      throw new TenantNotFoundError('unknown');
    }

    // Verify tenant exists
    const tenant = await tenantService.getTenant(tenantId);
    if (!tenant) {
      throw new TenantNotFoundError(tenantId);
    }

    req.tenantId = tenantId;
    req.tenant = tenant;

    next();
  } catch (error) {
    next(error);
  }
}

function extractTenantFromSubdomain(hostname: string): string | null {
  const parts = hostname.split('.');
  if (parts.length > 2) {
    return parts[0];
  }
  return null;
}
```

---

## Request Validation Middleware

```typescript
// src/middleware/validate.ts

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors';

type ValidationTarget = 'body' | 'query' | 'params';

export function validate(
  schema: ZodSchema,
  target: ValidationTarget = 'body'
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = schema.parse(req[target]);
      req[target] = data;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        next(
          new ValidationError(
            firstError.path.join('.'),
            firstError.message
          )
        );
      } else {
        next(error);
      }
    }
  };
}
```

---

## Error Handler Middleware

```typescript
// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { BaseAppError } from '../errors';
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

## API Response Format

```typescript
// src/types/api.types.ts

// Success response
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: ResponseMeta;
}

// Error response
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ErrorDetail[];
  };
  meta?: ResponseMeta;
}

// Pagination meta
interface ResponseMeta {
  requestId: string;
  timestamp: string;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

// Error detail
interface ErrorDetail {
  field: string;
  message: string;
  code: string;
}
```

---

## API Versioning

```typescript
// src/routes/index.ts

import { Router } from 'express';
import v1Routes from './v1';
import v2Routes from './v2';

const router = Router();

// v1 routes (current stable)
router.use('/v1', v1Routes);

// v2 routes (beta)
router.use('/v2', v2Routes);

// Redirect to latest version
router.get('/', (req, res) => {
  res.redirect('/api/v1');
});

export default router;
```

---

## Rate Limiting

```typescript
// src/middleware/rateLimit.ts

import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Global rate limiter
export const globalRateLimit = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter (stricter)
export const authRateLimit = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts',
  standardHeaders: true,
  legacyHeaders: false,
});

// API rate limiter
export const apiRateLimit = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many API requests',
  standardHeaders: true,
  legacyHeaders: false,
});
```

---

## Best Practices

### 1. Use Consistent Naming

```typescript
// Resources - plural nouns
GET    /api/v1/courses
POST   /api/v1/courses
GET    /api/v1/courses/:id
PUT    /api/v1/courses/:id
DELETE /api/v1/courses/:id

// Nested resources
GET    /api/v1/courses/:courseId/modules
POST   /api/v1/courses/:courseId/modules
```

### 2. Use Proper HTTP Methods

```typescript
// GET - Read
// POST - Create
// PUT - Update (full)
// PATCH - Update (partial)
// DELETE - Delete
```

### 3. Return Appropriate Status Codes

```typescript
// 200 - OK
// 201 - Created
// 204 - No Content
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 409 - Conflict
// 422 - Unprocessable Entity
// 429 - Too Many Requests
// 500 - Internal Server Error
```

### 4. Use Pagination

```typescript
GET /api/v1/courses?page=1&limit=10&sortBy=createdAt&sortOrder=desc
```

### 5. Filter and Search

```typescript
GET /api/v1/courses?category=programming&level=beginner&q=javascript
```

---

## Security Considerations

### 1. Always Validate Input

```typescript
router.post(
  '/',
  validate(createCourseSchema),
  courseController.createCourse
);
```

### 2. Use Authentication

```typescript
router.get(
  '/me',
  authenticate,
  userController.getCurrentUser
);
```

### 3. Implement Authorization

```typescript
router.delete(
  '/:id',
  authenticate,
  authorize('course:delete'),
  courseController.deleteCourse
);
```

### 4. Rate Limit Sensitive Routes

```typescript
router.post(
  '/login',
  authRateLimit,
  validate(loginSchema),
  authController.login
);
```

### 5. Sanitize Output

```typescript
// Never expose internal IDs or sensitive data
const userDTO = {
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  // Never include password hash
};
```

---

## References

- `src/routes/` - All route files
- `src/middleware/` - Middleware implementations
- `src/controllers/` - Controller implementations
- `src/validators/` - Validation schemas
- `src/errors/` - Error classes

---

*Last Updated: Phase 2.7 - LXP API Routes Documentation*
