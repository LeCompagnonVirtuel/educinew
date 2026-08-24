# Phase 2.7 LXP Validation Documentation

## Executive Summary

The EduCI LXP validation system comprises 447 Zod schemas providing comprehensive input validation across the entire platform. This documentation covers validation patterns, custom validators, schema composition, and best practices for maintaining type-safe validation.

---

## Validation Architecture

### Validation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Validation Flow                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Request                                                         │
│    │                                                             │
│    ▼                                                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │               Middleware Validation                      │    │
│  │  - Headers validation                                    │    │
│  │  - Query params validation                               │    │
│  │  - Route params validation                               │    │
│  └─────────────────────────────────────────────────────────┘    │
│    │                                                             │
│    ▼                                                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │               Body Validation                            │    │
│  │  - Request body schema                                   │    │
│  │  - File upload validation                                │    │
│  │  - Nested object validation                              │    │
│  └─────────────────────────────────────────────────────────┘    │
│    │                                                             │
│    ▼                                                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │               Business Validation                        │    │
│  │  - Custom validators                                     │    │
│  │  - Database checks                                       │    │
│  │  - Permission checks                                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│    │                                                             │
│    ▼                                                             │
│  Response                                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Validation Schemas

### Common Schemas

```typescript
// src/validators/common.schema.ts

import { z } from 'zod';

// ID validation
export const idSchema = z.string().uuid('Invalid UUID format');

// Email validation
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(255, 'Email must be at most 255 characters');

// Password validation
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain at least one uppercase, one lowercase, one number, and one special character'
  );

// Name validation
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(100, 'Name must be at most 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters');

// Slug validation
export const slugSchema = z
  .string()
  .min(1, 'Slug is required')
  .max(100, 'Slug must be at most 100 characters')
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug must be lowercase with hyphens'
  );

// Phone validation
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

// URL validation
export const urlSchema = z.string().url('Invalid URL format');

// Date validation
export const dateSchema = z.string().datetime('Invalid date format');

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Search schema
export const searchSchema = paginationSchema.extend({
  q: z.string().max(200).optional(),
  filters: z.record(z.unknown()).optional(),
});
```

### User Validation Schemas

```typescript
// src/validators/user.schema.ts

import { z } from 'zod';
import { emailSchema, passwordSchema, nameSchema } from './common.schema';

// Create user schema
export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  role: z.enum(['admin', 'instructor', 'student', 'moderator']),
  tenantId: z.string().uuid(),
});

// Update user schema
export const updateUserSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional(),
});

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  tenantId: z.string().uuid().optional(),
});

// Register schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: nameSchema,
  lastName: nameSchema,
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'New password must be different from current password',
  path: ['newPassword'],
});

// User preferences schema
export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.string().min(2).max(5),
  timezone: z.string(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

// Profile update schema
export const updateProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional(),
  socialLinks: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
  }).optional(),
  preferences: userPreferencesSchema.optional(),
});

// User query schema
export const userQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  role: z.enum(['admin', 'instructor', 'student', 'moderator']).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  search: z.string().max(200).optional(),
  sortBy: z.enum(['createdAt', 'email', 'lastName']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
```

### Course Validation Schemas

```typescript
// src/validators/course.schema.ts

import { z } from 'zod';
import { slugSchema, nameSchema, idSchema } from './common.schema';

// Create course schema
export const createCourseSchema = z.object({
  title: nameSchema,
  slug: slugSchema,
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be at most 5000 characters'),
  shortDescription: z
    .string()
    .min(10, 'Short description must be at least 10 characters')
    .max(200, 'Short description must be at most 200 characters'),
  categoryId: idSchema,
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  language: z.string().min(2).max(5),
  price: z.number().min(0).max(100000),
  currency: z.string().length(3),
  tags: z.array(z.string()).max(10),
  prerequisites: z.array(idSchema).max(5),
  learningObjectives: z.array(z.string()).min(1).max(20),
});

// Update course schema
export const updateCourseSchema = createCourseSchema.partial();

// Course query schema
export const courseQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  category: idSchema.optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  language: z.string().optional(),
  status: z.enum(['draft', 'review', 'published', 'archived']).optional(),
  instructorId: idSchema.optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  search: z.string().max(200).optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z
    .enum(['createdAt', 'title', 'price', 'rating', 'enrolledCount'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Course module schema
export const createModuleSchema = z.object({
  title: nameSchema,
  description: z.string().max(1000).optional(),
  order: z.number().int().min(0).optional(),
});

// Lesson schema
export const createLessonSchema = z.object({
  title: nameSchema,
  description: z.string().max(1000).optional(),
  type: z.enum(['video', 'article', 'quiz', 'assignment', 'interactive']),
  duration: z.number().int().min(1),
  order: z.number().int().min(0).optional(),
  isFree: z.boolean().default(false),
});

// Lesson content schemas
export const videoContentSchema = z.object({
  type: z.literal('video'),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  duration: z.number().int().min(1),
  transcript: z.string().optional(),
});

export const articleContentSchema = z.object({
  type: z.literal('article'),
  content: z.string().min(1),
  readTime: z.number().int().min(1),
});

export const quizContentSchema = z.object({
  type: z.literal('quiz'),
  quizId: idSchema,
  passingScore: z.number().min(0).max(100),
});

export const assignmentContentSchema = z.object({
  type: z.literal('assignment'),
  instructions: z.string().min(1),
  dueDate: z.string().datetime().optional(),
  maxSubmissions: z.number().int().min(1).optional(),
});

export const lessonContentSchema = z.discriminatedUnion('type', [
  videoContentSchema,
  articleContentSchema,
  quizContentSchema,
  assignmentContentSchema,
]);
```

### Enrollment Validation Schemas

```typescript
// src/validators/enrollment.schema.ts

import { z } from 'zod';
import { idSchema } from './common.schema';

// Create enrollment schema
export const createEnrollmentSchema = z.object({
  userId: idSchema,
  courseId: idSchema,
});

// Enrollment query schema
export const enrollmentQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  userId: idSchema.optional(),
  courseId: idSchema.optional(),
  status: z.enum(['active', 'completed', 'paused', 'dropped']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  sortBy: z.enum(['enrolledAt', 'lastAccessedAt']).default('enrolledAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Update enrollment status schema
export const updateEnrollmentStatusSchema = z.object({
  status: z.enum(['active', 'completed', 'paused', 'dropped']),
  reason: z.string().max(500).optional(),
});

// Bulk enrollment schema
export const bulkEnrollmentSchema = z.object({
  userIds: z.array(idSchema).min(1).max(100),
  courseId: idSchema,
});
```

### Assessment Validation Schemas

```typescript
// src/validators/assessment.schema.ts

import { z } from 'zod';
import { idSchema, nameSchema } from './common.schema';

// Question option schema
export const questionOptionSchema = z.object({
  content: z.string().min(1).max(500),
  isCorrect: z.boolean(),
});

// Create question schema
export const createQuestionSchema = z.object({
  type: z.enum(['multiple_choice', 'single_choice', 'true_false', 'fill_blank', 'essay']),
  content: z.string().min(1).max(2000),
  options: z.array(questionOptionSchema).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().max(1000).optional(),
  points: z.number().int().min(1).max(100),
}).refine(
  (data) => {
    if (data.type === 'multiple_choice' || data.type === 'single_choice') {
      return data.options && data.options.length >= 2;
    }
    return true;
  },
  {
    message: 'Multiple choice questions must have at least 2 options',
    path: ['options'],
  }
);

// Create quiz schema
export const createQuizSchema = z.object({
  title: nameSchema,
  description: z.string().max(1000).optional(),
  lessonId: idSchema,
  timeLimit: z.number().int().min(1).max(480),
  passingScore: z.number().min(0).max(100),
  maxAttempts: z.number().int().min(1).max(10),
  questions: z.array(createQuestionSchema).min(1).max(100),
  settings: z.object({
    shuffleQuestions: z.boolean().default(false),
    shuffleOptions: z.boolean().default(false),
    showResults: z.boolean().default(true),
    showExplanations: z.boolean().default(true),
    allowReview: z.boolean().default(true),
  }),
});

// Submit quiz attempt schema
export const submitQuizAttemptSchema = z.object({
  quizId: idSchema,
  answers: z.array(
    z.object({
      questionId: idSchema,
      answer: z.union([z.string(), z.array(z.string())]),
    })
  ),
});

// Grade submission schema
export const gradeSubmissionSchema = z.object({
  submissionId: idSchema,
  score: z.number().min(0).max(100),
  feedback: z.string().max(2000).optional(),
  rubricScores: z
    .array(
      z.object({
        criterionId: idSchema,
        score: z.number().min(0).max(100),
        feedback: z.string().max(500).optional(),
      })
    )
    .optional(),
});
```

---

## Custom Validators

### File Upload Validators

```typescript
// src/validators/file.validators.ts

import { z } from 'zod';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const imageFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.enum(ALLOWED_IMAGE_TYPES as [string, ...string[]]),
  size: z.number().max(MAX_FILE_SIZE),
  buffer: z.instanceof(Buffer),
});

export const videoFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.enum(ALLOWED_VIDEO_TYPES as [string, ...string[]]),
  size: z.number().max(1024 * 1024 * 1024), // 1GB
  buffer: z.instanceof(Buffer),
});

export const documentFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.enum(ALLOWED_DOCUMENT_TYPES as [string, ...string[]]),
  size: z.number().max(50 * 1024 * 1024), // 50MB
  buffer: z.instanceof(Buffer),
});
```

### Date Range Validators

```typescript
// src/validators/date.validators.ts

import { z } from 'zod';

export const dateRangeSchema = z
  .object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: 'Start date must be before end date',
    path: ['endDate'],
  });

export const futureDateSchema = z
  .string()
  .datetime()
  .refine((date) => new Date(date) > new Date(), {
    message: 'Date must be in the future',
  });

export const pastDateSchema = z
  .string()
  .datetime()
  .refine((date) => new Date(date) < new Date(), {
    message: 'Date must be in the past',
  });

export const businessHoursSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)')
  .refine((time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 9 && hours < 17;
  }, {
    message: 'Time must be within business hours (9:00-17:00)',
  });
```

### Business Rule Validators

```typescript
// src/validators/business.validators.ts

import { z } from 'zod';

// Slug uniqueness validator
export const uniqueSlugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
  .refine(
    async (slug) => {
      const existing = await prisma.course.findUnique({ where: { slug } });
      return !existing;
    },
    { message: 'Slug already exists' }
  );

// Password strength validator
export const strongPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine(
    (password) => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    },
    {
      message:
        'Password must contain at least one uppercase, one lowercase, one number, and one special character',
    }
  );

// Credit card validator
export const creditCardSchema = z
  .string()
  .regex(/^\d{16}$/, 'Invalid credit card number')
  .refine(
    (cardNumber) => {
      // Luhn algorithm
      const digits = cardNumber.split('').map(Number);
      let sum = 0;
      let isEven = false;

      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];

        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }

        sum += digit;
        isEven = !isEven;
      }

      return sum % 10 === 0;
    },
    { message: 'Invalid credit card number' }
  );

// Date of birth validator (must be 18+)
export const adultBirthDateSchema = z
  .string()
  .datetime()
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= 18;
    },
    { message: 'Must be at least 18 years old' }
  );
```

---

## Validation Middleware

```typescript
// src/middleware/validate.ts

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors/validation/ValidationError';

type ValidationTarget = 'body' | 'query' | 'params';

export function validate(
  schema: ZodSchema,
  target: ValidationTarget = 'body'
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[target]);
      req[target] = data;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        next(new ValidationError(
          validationErrors[0].field,
          validationErrors[0].message
        ));
      } else {
        next(error);
      }
    }
  };
}

// Combined validation middleware
export function validateRequest(schemas: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        next(new ValidationError(
          validationErrors[0].field,
          validationErrors[0].message
        ));
      } else {
        next(error);
      }
    }
  };
}
```

---

## Schema Composition Patterns

### Extending Schemas

```typescript
// Base schema
const baseUserSchema = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
});

// Extended schemas
const createUserSchema = baseUserSchema.extend({
  password: passwordSchema,
  role: z.enum(['admin', 'instructor', 'student']),
});

const updateUserSchema = baseUserSchema.partial();

const userProfileSchema = baseUserSchema.extend({
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
});
```

### Discriminated Unions

```typescript
// Content type validation
const baseContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

const videoContentSchema = baseContentSchema.extend({
  type: z.literal('video'),
  videoUrl: z.string().url(),
  duration: z.number().int().min(1),
});

const articleContentSchema = baseContentSchema.extend({
  type: z.literal('article'),
  content: z.string().min(1),
  readTime: z.number().int().min(1),
});

const quizContentSchema = baseContentSchema.extend({
  type: z.literal('quiz'),
  quizId: z.string().uuid(),
  passingScore: z.number().min(0).max(100),
});

const contentSchema = z.discriminatedUnion('type', [
  videoContentSchema,
  articleContentSchema,
  quizContentSchema,
]);
```

### Conditional Validation

```typescript
// Conditional fields based on type
const conditionalSchema = z
  .object({
    type: z.enum(['video', 'article', 'quiz']),
    videoUrl: z.string().url().optional(),
    content: z.string().optional(),
    quizId: z.string().uuid().optional(),
  })
  .refine(
    (data) => {
      switch (data.type) {
        case 'video':
          return !!data.videoUrl;
        case 'article':
          return !!data.content;
        case 'quiz':
          return !!data.quizId;
        default:
          return false;
      }
    },
    {
      message: 'Required field missing for content type',
    }
  );
```

---

## Validation Reference Table

| Schema | Fields | File Path |
|--------|--------|-----------|
| `createUserSchema` | email, password, firstName, lastName, role | `src/validators/user.schema.ts` |
| `loginSchema` | email, password, tenantId | `src/validators/user.schema.ts` |
| `registerSchema` | email, password, confirmPassword, firstName, lastName | `src/validators/user.schema.ts` |
| `createCourseSchema` | title, slug, description, categoryId, level, price | `src/validators/course.schema.ts` |
| `createModuleSchema` | title, description, order | `src/validators/course.schema.ts` |
| `createLessonSchema` | title, type, duration, order, isFree | `src/validators/course.schema.ts` |
| `createEnrollmentSchema` | userId, courseId | `src/validators/enrollment.schema.ts` |
| `createQuizSchema` | title, lessonId, timeLimit, passingScore, questions | `src/validators/assessment.schema.ts` |
| `submitQuizAttemptSchema` | quizId, answers | `src/validators/assessment.schema.ts` |
| `gradeSubmissionSchema` | submissionId, score, feedback | `src/validators/assessment.schema.ts` |
| `createNotificationSchema` | userId, type, title, message | `src/validators/notification.schema.ts` |
| `createPaymentSchema` | amount, currency, method | `src/validators/payment.schema.ts` |
| `createCertificateSchema` | userId, courseId, templateId | `src/validators/certificate.schema.ts` |
| `createWebhookSchema` | url, events, secret | `src/validators/webhook.schema.ts` |

---

## Best Practices

### 1. Always Validate Input

```typescript
// Bad
router.post('/courses', async (req, res) => {
  const course = await createCourse(req.body);
  res.json(course);
});

// Good
router.post(
  '/',
  validate(createCourseSchema),
  async (req, res) => {
    const course = await createCourse(req.body);
    res.json(course);
  }
);
```

### 2. Use Type Inference

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Infer type from schema
type CreateUserInput = z.infer<typeof createUserSchema>;
// { email: string; password: string }
```

### 3. Validate Early

```typescript
// Validate at the API boundary
// Then trust data within the service layer
```

### 4. Provide Helpful Error Messages

```typescript
const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .max(255, 'Email must be at most 255 characters');
```

### 5. Use Transform for Sanitization

```typescript
const nameSchema = z
  .string()
  .min(1)
  .transform((name) => name.trim())
  .transform((name) => name.replace(/\s+/g, ' '));
```

---

## Security Considerations

### 1. Prevent Injection

```typescript
// Sanitize user input
const sanitizeSchema = z
  .string()
  .transform((str) => str.replace(/[<>]/g, ''));
```

### 2. Limit Input Size

```typescript
const safeStringSchema = z.string().max(10000);
```

### 3. Validate File Types

```typescript
const safeFileSchema = z.object({
  mimetype: z.enum(['image/jpeg', 'image/png', 'application/pdf']),
  size: z.number().max(10 * 1024 * 1024), // 10MB
});
```

---

## References

- `src/validators/` - All validation schemas
- `src/middleware/validate.ts` - Validation middleware
- `src/errors/validation/` - Validation errors
- `src/types/` - Type definitions

---

*Last Updated: Phase 2.7 - LXP Validation Documentation*
