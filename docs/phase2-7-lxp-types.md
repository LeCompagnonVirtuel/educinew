# Phase 2.7 LXP Type System Documentation

## Executive Summary

The EduCI LXP type system comprises 350+ interfaces and 106 enums, providing comprehensive type safety across the entire platform. This documentation covers the type hierarchy, relationships, usage patterns, and best practices for working with the type system.

---

## Type System Architecture

### Type Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                      Type System Categories                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Entity    │  │   Value     │  │   Domain    │             │
│  │   Types     │  │   Object    │  │   Event     │             │
│  │             │  │   Types     │  │   Types     │             │
│  │ - User      │  │ - Email     │  │ - Created   │             │
│  │ - Course    │  │ - Money     │  │ - Updated   │             │
│  │ - Lesson    │  │ - Date      │  │ - Deleted   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   API       │  │   Config    │  │   UI        │             │
│  │   Types     │  │   Types     │  │   Types     │             │
│  │             │  │             │  │             │             │
│  │ - Request   │  │ - Database  │  │ - Component │             │
│  │ - Response  │  │ - Feature   │  │ - Props     │             │
│  │ - Error     │  │ - Tenant    │  │ - State     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Entity Types

### User Types

```typescript
// src/types/user.types.ts

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: SocialLinks;
  preferences: UserPreferences;
}

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

type UserRole = 'admin' | 'instructor' | 'student' | 'moderator';
type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';
```

### Course Types

```typescript
// src/types/course.types.ts

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail?: string;
  trailer?: string;
  instructorId: string;
  categoryId: string;
  level: CourseLevel;
  language: string;
  price: number;
  currency: string;
  status: CourseStatus;
  publishedAt?: Date;
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  prerequisites: string[];
  learningObjectives: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  isPublished: boolean;
}

interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: LessonType;
  content: LessonContent;
  duration: number;
  order: number;
  isFree: boolean;
  isPublished: boolean;
}

type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type CourseStatus = 'draft' | 'review' | 'published' | 'archived';
type LessonType = 'video' | 'article' | 'quiz' | 'assignment' | 'interactive';
```

### Enrollment Types

```typescript
// src/types/enrollment.types.ts

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
  progress: EnrollmentProgress;
  certificateId?: string;
}

interface EnrollmentProgress {
  percentage: number;
  completedLessons: string[];
  currentLessonId?: string;
  timeSpent: number;
  lastActivity: Date;
}

interface LessonProgress {
  id: string;
  enrollmentId: string;
  lessonId: string;
  status: LessonProgressStatus;
  startedAt: Date;
  completedAt?: Date;
  timeSpent: number;
  score?: number;
}

type EnrollmentStatus = 'active' | 'completed' | 'paused' | 'dropped';
type LessonProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';
```

---

## Assessment Types

```typescript
// src/types/assessment.types.ts

interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
  questions: Question[];
  settings: QuizSettings;
}

interface Question {
  id: string;
  quizId: string;
  type: QuestionType;
  content: string;
  options?: QuestionOption[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  order: number;
}

interface QuestionOption {
  id: string;
  content: string;
  isCorrect: boolean;
}

interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: QuizAnswer[];
  score: number;
  startedAt: Date;
  completedAt?: Date;
  status: AttemptStatus;
}

interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  timeSpent: number;
}

type QuestionType = 'multiple_choice' | 'single_choice' | 'true_false' | 'fill_blank' | 'essay';
type AttemptStatus = 'in_progress' | 'completed' | 'timed_out' | 'abandoned';

interface QuizSettings {
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showResults: boolean;
  showExplanations: boolean;
  allowReview: boolean;
}
```

---

## Analytics Types

```typescript
// src/types/analytics.types.ts

interface LearningEvent {
  id: string;
  userId: string;
  courseId: string;
  eventType: LearningEventType;
  metadata: EventMetadata;
  timestamp: Date;
}

type LearningEventType =
  | 'course_started'
  | 'lesson_started'
  | 'lesson_completed'
  | 'quiz_attempted'
  | 'quiz_passed'
  | 'assignment_submitted'
  | 'certificate_earned';

interface EventMetadata {
  lessonId?: string;
  quizId?: string;
  score?: number;
  duration?: number;
  device?: string;
  location?: string;
}

interface UserAnalytics {
  userId: string;
  totalCoursesEnrolled: number;
  coursesCompleted: number;
  totalLearningTime: number;
  averageScore: number;
  streakDays: number;
  lastActiveAt: Date;
  learningGoals: LearningGoal[];
}

interface CourseAnalytics {
  courseId: string;
  totalEnrollments: number;
  completionRate: number;
  averageRating: number;
  averageScore: number;
  dropOffRate: number;
  popularLessons: LessonAnalytics[];
  engagementMetrics: EngagementMetrics;
}

interface LessonAnalytics {
  lessonId: string;
  viewCount: number;
  completionRate: number;
  averageTimeSpent: number;
  skipRate: number;
  rating: number;
}

interface EngagementMetrics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  averageSessionDuration: number;
  averageLessonsPerSession: number;
}

interface LearningGoal {
  id: string;
  type: GoalType;
  target: number;
  current: number;
  deadline?: Date;
  status: GoalStatus;
}

type GoalType = 'courses_completed' | 'hours_learned' | 'streak_days' | 'certificates_earned';
type GoalStatus = 'active' | 'completed' | 'failed' | 'expired';
```

---

## API Types

### Request Types

```typescript
// src/types/api.types.ts

interface APIRequest<T = unknown> {
  body?: T;
  query?: Record<string, string | string[]>;
  params?: Record<string, string>;
  headers: RequestHeaders;
  user?: User;
  tenant: TenantContext;
}

interface RequestHeaders {
  authorization?: string;
  contentType?: string;
  accept?: string;
  userAgent?: string;
  xRequestid?: string;
}

interface PaginationQuery {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface SearchQuery extends PaginationQuery {
  q?: string;
  filters?: FilterParams;
}

interface FilterParams {
  [key: string]: string | number | boolean | string[];
}
```

### Response Types

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: ResponseMeta;
}

interface ResponseMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface APIError {
  code: string;
  message: string;
  details?: ErrorDetail[];
}

interface ErrorDetail {
  field: string;
  message: string;
  code: string;
}

// Paginated response helper
type PaginatedResponse<T> = APIResponse<{
  items: T[];
  meta: ResponseMeta;
}>;

// List response helper
type ListResponse<T> = APIResponse<{
  items: T[];
  total: number;
}>;
```

---

## Configuration Types

```typescript
// src/types/config.types.ts

interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  ssl: boolean;
  poolSize: number;
}

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  keyPrefix: string;
}

interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshExpiresIn: string;
  bcryptRounds: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
}

interface StorageConfig {
  provider: StorageProvider;
  bucket: string;
  region?: string;
  accessKey?: string;
  secretKey?: string;
  baseUrl: string;
}

type StorageProvider = 's3' | 'minio' | 'local' | 'azure' | 'gcs';

interface FeatureFlags {
  enableRegistration: boolean;
  enableSSO: boolean;
  enableAI: boolean;
  enableMobile: boolean;
  enableAnalytics: boolean;
  enableNotifications: boolean;
  enablePayments: boolean;
  enableCertificates: boolean;
}

interface TenantConfig {
  tenantId: string;
  name: string;
  domain: string;
  features: FeatureFlags;
  limits: TenantLimits;
  branding: TenantBranding;
}

interface TenantLimits {
  maxUsers: number;
  maxCourses: number;
  maxStorageGB: number;
  maxAPIRequestsPerMinute: number;
  maxConcurrentUsers: number;
}

interface TenantBranding {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  favicon?: string;
  customCss?: string;
}
```

---

## UI Component Types

```typescript
// src/types/ui.types.ts

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number | string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

// Form types
interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: ValidationRule[];
}

type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'multi_select'
  | 'date'
  | 'file'
  | 'checkbox'
  | 'radio';

interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: string | number | RegExp;
  message: string;
  validator?: (value: unknown) => boolean;
}
```

---

## Enum Reference

### Status Enums

| Enum | Values | File Path |
|------|--------|-----------|
| `UserStatus` | `active`, `inactive`, `suspended`, `pending` | `src/enums/user.enums.ts` |
| `CourseStatus` | `draft`, `review`, `published`, `archived` | `src/enums/course.enums.ts` |
| `EnrollmentStatus` | `active`, `completed`, `paused`, `dropped` | `src/enums/enrollment.enums.ts` |
| `PaymentStatus` | `pending`, `completed`, `failed`, `refunded` | `src/enums/payment.enums.ts` |
| `NotificationStatus` | `unread`, `read`, `archived` | `src/enums/notification.enums.ts` |

### Role & Permission Enums

| Enum | Values | File Path |
|------|--------|-----------|
| `UserRole` | `admin`, `instructor`, `student`, `moderator` | `src/enums/user.enums.ts` |
| `Permission` | `create`, `read`, `update`, `delete`, `manage` | `src/enums/permission.enums.ts` |

### Content Type Enums

| Enum | Values | File Path |
|------|--------|-----------|
| `LessonType` | `video`, `article`, `quiz`, `assignment`, `interactive` | `src/enums/content.enums.ts` |
| `ContentType` | `course`, `lesson`, `quiz`, `assignment`, `certificate` | `src/enums/content.enums.ts` |
| `MediaType` | `image`, `video`, `audio`, `document`, `archive` | `src/enums/media.enums.ts` |

### Assessment Enums

| Enum | Values | File Path |
|------|--------|-----------|
| `QuestionType` | `multiple_choice`, `single_choice`, `true_false`, `fill_blank`, `essay` | `src/enums/assessment.enums.ts` |
| `AttemptStatus` | `in_progress`, `completed`, `timed_out`, `abandoned` | `src/enums/assessment.enums.ts` |
| `GradeStatus` | `pending`, `graded`, `reviewed`, `appealed` | `src/enums/assessment.enums.ts` |

### Analytics Enums

| Enum | Values | File Path |
|------|--------|-----------|
| `LearningEventType` | `course_started`, `lesson_started`, `lesson_completed`, etc. | `src/enums/analytics.enums.ts` |
| `MetricType` | `counter`, `gauge`, `histogram`, `summary` | `src/enums/analytics.enums.ts` |
| `ReportType` | `user_progress`, `course_performance`, `engagement` | `src/enums/analytics.enums.ts` |

### Notification Enums

| Enum | Values | File Path |
|------|--------|-----------|
| `NotificationType` | `info`, `warning`, `success`, `error` | `src/enums/notification.enums.ts` |
| `NotificationChannel` | `email`, `push`, `sms`, `in_app` | `src/enums/notification.enums.ts` |
| `NotificationPriority` | `low`, `medium`, `high`, `urgent` | `src/enums/notification.enums.ts` |

---

## Type Utilities

### Utility Types

```typescript
// src/types/utils.types.ts

// Make specific fields required
type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Make specific fields optional
type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Extract keys by value type
type KeysByType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Omit by value type
type OmitByType<T, U> = Omit<T, KeysByType<T, U>>;

// Make nullable
type Nullable<T> = T | null;

// Make optional
type Optional<T> = T | undefined;

// Brand type for type safety
type Brand<K, T> = T & { __brand: K };

// Example branded types
type UserID = Brand<'UserID', string>;
type CourseID = Brand<'CourseID', string>;
type OrderID = Brand<'OrderID', string>;
```

### Type Guards

```typescript
// src/types/guards.types.ts

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    'role' in obj
  );
}

function isCourse(obj: unknown): obj is Course {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'instructorId' in obj
  );
}

function isAPIError(obj: unknown): obj is APIError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'code' in obj &&
    'message' in obj
  );
}

// Usage in runtime checks
function handleResponse<T>(response: APIResponse<T>) {
  if (isAPIError(response.error)) {
    console.error(response.error.code, response.error.message);
  }
}
```

---

## Type Mapping Patterns

### Entity to DTO Mapping

```typescript
// src/types/mappers.types.ts

// Entity types (database models)
interface UserEntity {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

// DTO types (API responses)
interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Mapper type
type EntityToDTOMapper<TEntity, TDTO> = (entity: TEntity) => TDTO;

// Usage
const userMapper: EntityToDTOMapper<UserEntity, UserDTO> = (entity) => ({
  id: entity.id,
  email: entity.email,
  firstName: entity.first_name,
  lastName: entity.last_name,
  role: entity.role,
  createdAt: entity.created_at,
  updatedAt: entity.updated_at,
});
```

---

## Best Practices

### 1. Use Strict Types

```typescript
// Bad
function processUser(user: any) {
  return user.name;
}

// Good
function processUser(user: User): string {
  return user.firstName;
}
```

### 2. Leverage Discriminated Unions

```typescript
type LessonContent =
  | { type: 'video'; videoUrl: string; duration: number }
  | { type: 'article'; content: string; readTime: number }
  | { type: 'quiz'; quizId: string; passingScore: number };

function getLessonDuration(content: LessonContent): number {
  switch (content.type) {
    case 'video':
      return content.duration;
    case 'article':
      return content.readTime * 60;
    case 'quiz':
      return 0;
  }
}
```

### 3. Use Branded Types for IDs

```typescript
// Prevent mixing up IDs
function enrollUser(userId: UserID, courseId: CourseID): Promise<Enrollment> {
  // Implementation
}

// Type-safe calls
enrollUser(userId, courseId); // Valid
enrollUser(courseId, userId); // Type error!
```

### 4. Prefer Interfaces for Object Shapes

```typescript
// Use interfaces for object shapes (better error messages)
interface Course {
  id: string;
  title: string;
}

// Use type aliases for unions and intersections
type CourseStatus = 'draft' | 'published' | 'archived';
type CourseWithModules = Course & { modules: CourseModule[] };
```

---

## References

- `src/types/` - Type definitions
- `src/enums/` - Enum definitions
- `src/interfaces/` - Interface definitions
- `prisma/schema.prisma` - Database types

---

*Last Updated: Phase 2.7 - LXP Type System Documentation*
