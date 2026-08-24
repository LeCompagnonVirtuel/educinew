# Phase 2.7 LXP Repository Documentation

## Executive Summary

The EduCI LXP repository layer comprises 600+ methods providing data access across all domain entities. This documentation covers repository patterns, query building, multi-tenancy, caching strategies, and best practices for database operations.

---

## Repository Architecture

### Repository Pattern Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Repository Architecture                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                     Service Layer                        │    │
│  │  - Business logic                                        │    │
│  │  - Domain validation                                     │    │
│  │  - Transaction management                                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Repository Layer                       │    │
│  │  - Data access                                           │    │
│  │  - Query building                                        │    │
│  │  - Caching                                               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│  │   Prisma    │   │    Redis    │   │  External   │          │
│  │    ORM      │   │   Cache     │   │   APIs      │          │
│  └─────────────┘   └─────────────┘   └─────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Base Repository

```typescript
// src/repositories/BaseRepository.ts

import { PrismaClient, Prisma } from '@prisma/client';
import { Redis } from 'ioredis';

export abstract class BaseRepository<T, ID = string> {
  protected prisma: PrismaClient;
  protected redis: Redis;
  protected tableName: string;
  protected cachePrefix: string;
  protected defaultTTL: number = 3600;

  constructor(prisma: PrismaClient, redis: Redis) {
    this.prisma = prisma;
    this.redis = redis;
    this.tableName = this.getTableName();
    this.cachePrefix = `${this.tableName}:`;
  }

  protected abstract getTableName(): string;

  // Cache key generation
  protected getCacheKey(id: ID): string {
    return `${this.cachePrefix}${id}`;
  }

  protected getListCacheKey(filters: Record<string, unknown>): string {
    const filterHash = this.hashFilters(filters);
    return `${this.cachePrefix}list:${filterHash}`;
  }

  private hashFilters(filters: Record<string, unknown>): string {
    return Buffer.from(JSON.stringify(filters)).toString('base64');
  }

  // Cache operations
  protected async getFromCache<R>(key: string): Promise<R | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  protected async setCache(key: string, value: unknown, ttl?: number): Promise<void> {
    await this.redis.setex(key, ttl || this.defaultTTL, JSON.stringify(value));
  }

  protected async invalidateCache(key: string): Promise<void> {
    await this.redis.del(key);
  }

  protected async invalidateListCache(): Promise<void> {
    const keys = await this.redis.keys(`${this.cachePrefix}list:*`);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Common CRUD operations
  async findById(id: ID, tenantId?: string): Promise<T | null> {
    const cacheKey = this.getCacheKey(id);
    const cached = await this.getFromCache<T>(cacheKey);
    if (cached) return cached;

    const result = await (this.prisma as any)[this.tableName].findUnique({
      where: { id, ...(tenantId && { tenantId }) },
    });

    if (result) {
      await this.setCache(cacheKey, result);
    }

    return result;
  }

  async findMany(
    filters: Record<string, unknown>,
    options: QueryOptions = {}
  ): Promise<{ items: T[]; total: number }> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(filters);

    const [items, total] = await Promise.all([
      (this.prisma as any)[this.tableName].findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      (this.prisma as any)[this.tableName].count({ where }),
    ]);

    return { items, total };
  }

  async create(data: Prisma.InputType<T>, tenantId?: string): Promise<T> {
    const result = await (this.prisma as any)[this.tableName].create({
      data: {
        ...data,
        ...(tenantId && { tenantId }),
      },
    });

    await this.invalidateListCache();
    return result;
  }

  async update(id: ID, data: Prisma.UpdateType<T>): Promise<T> {
    const result = await (this.prisma as any)[this.tableName].update({
      where: { id },
      data,
    });

    await this.invalidateCache(this.getCacheKey(id));
    await this.invalidateListCache();
    return result;
  }

  async delete(id: ID): Promise<void> {
    await (this.prisma as any)[this.tableName].delete({
      where: { id },
    });

    await this.invalidateCache(this.getCacheKey(id));
    await this.invalidateListCache();
  }

  async exists(filters: Record<string, unknown>): Promise<boolean> {
    const where = this.buildWhereClause(filters);
    const count = await (this.prisma as any)[this.tableName].count({ where });
    return count > 0;
  }

  async count(filters: Record<string, unknown>): Promise<number> {
    const where = this.buildWhereClause(filters);
    return (this.prisma as any)[this.tableName].count({ where });
  }

  // Query builder helpers
  protected buildWhereClause(filters: Record<string, unknown>): Record<string, unknown> {
    const where: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value === undefined || value === null) continue;

      if (Array.isArray(value)) {
        where[key] = { in: value };
      } else if (typeof value === 'object' && 'operator' in value) {
        const { operator, value: operand } = value as { operator: string; value: unknown };
        switch (operator) {
          case 'contains':
            where[key] = { contains: operand, mode: 'insensitive' };
            break;
          case 'startsWith':
            where[key] = { startsWith: operand, mode: 'insensitive' };
            break;
          case 'gt':
            where[key] = { gt: operand };
            break;
          case 'lt':
            where[key] = { lt: operand };
            break;
          default:
            where[key] = operand;
        }
      } else {
        where[key] = value;
      }
    }

    return where;
  }
}

interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

---

## User Repository

```typescript
// src/repositories/UserRepository.ts

import { BaseRepository } from './BaseRepository';
import { User, UserRole, UserStatus } from '@prisma/client';

export class UserRepository extends BaseRepository<User> {
  protected getTableName(): string {
    return 'user';
  }

  // Find by email
  async findByEmail(email: string, tenantId?: string): Promise<User | null> {
    const cacheKey = `${this.cachePrefix}email:${email}`;
    const cached = await this.getFromCache<User>(cacheKey);
    if (cached) return cached;

    const result = await this.prisma.user.findFirst({
      where: {
        email,
        ...(tenantId && { tenantId }),
      },
    });

    if (result) {
      await this.setCache(cacheKey, result);
    }

    return result;
  }

  // Find by username
  async findByUsername(username: string, tenantId?: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        username,
        ...(tenantId && { tenantId }),
      },
    });
  }

  // Find users by role
  async findByRole(
    role: UserRole,
    tenantId: string,
    options: QueryOptions = {}
  ): Promise<{ items: User[]; total: number }> {
    return this.findMany({ role, tenantId }, options);
  }

  // Find active users
  async findActiveUsers(tenantId: string): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      where: {
        tenantId,
        status: 'active',
      },
    });
    return result;
  }

  // Search users
  async search(
    query: string,
    tenantId: string,
    options: QueryOptions = {}
  ): Promise<{ items: User[]; total: number }> {
    return this.findMany(
      {
        tenantId,
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { username: { contains: query, mode: 'insensitive' } },
        ],
      },
      options
    );
  }

  // Update last login
  async updateLastLogin(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }

  // Increment login attempts
  async incrementLoginAttempts(userId: string): Promise<number> {
    const result = await this.prisma.user.update({
      where: { id: userId },
      data: {
        loginAttempts: { increment: 1 },
      },
      select: { loginAttempts: true },
    });
    return result.loginAttempts;
  }

  // Reset login attempts
  async resetLoginAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { loginAttempts: 0 },
    });
  }

  // Lock account
  async lockAccount(userId: string, until: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        status: 'suspended',
        lockedUntil: until,
      },
    });
  }

  // Get user with profile
  async findWithProfile(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        preferences: true,
      },
    });
  }

  // Get user with enrollments
  async findWithEnrollments(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: {
          include: {
            course: true,
          },
          orderBy: { enrolledAt: 'desc' },
        },
      },
    });
  }

  // Bulk create users
  async bulkCreate(
    users: Array<{ email: string; firstName: string; lastName: string }>,
    tenantId: string
  ): Promise<User[]> {
    const result = await this.prisma.user.createMany({
      data: users.map((user) => ({
        ...user,
        tenantId,
        status: 'pending',
        role: 'student',
      })),
    });

    await this.invalidateListCache();
    return this.findMany({ tenantId }).then((r) => r.items);
  }

  // Get user statistics
  async getStatistics(userId: string): Promise<UserStatistics> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: {
          select: {
            status: true,
            progress: true,
          },
        },
        certificates: {
          select: { id: true },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      totalEnrollments: user.enrollments.length,
      completedCourses: user.enrollments.filter((e) => e.status === 'completed').length,
      certificatesEarned: user.certificates.length,
      averageProgress:
        user.enrollments.reduce((acc, e) => acc + (e.progress?.percentage || 0), 0) /
        (user.enrollments.length || 1),
    };
  }
}

interface UserStatistics {
  totalEnrollments: number;
  completedCourses: number;
  certificatesEarned: number;
  averageProgress: number;
}
```

---

## Course Repository

```typescript
// src/repositories/CourseRepository.ts

import { BaseRepository } from './BaseRepository';
import { Course, CourseStatus, CourseLevel } from '@prisma/client';

export class CourseRepository extends BaseRepository<Course> {
  protected getTableName(): string {
    return 'course';
  }

  // Find by slug
  async findBySlug(slug: string, tenantId?: string): Promise<Course | null> {
    return this.prisma.course.findFirst({
      where: {
        slug,
        ...(tenantId && { tenantId }),
      },
    });
  }

  // Find published courses
  async findPublished(
    tenantId: string,
    options: QueryOptions = {}
  ): Promise<{ items: Course[]; total: number }> {
    return this.findMany(
      {
        tenantId,
        status: 'published',
      },
      options
    );
  }

  // Find by instructor
  async findByInstructor(
    instructorId: string,
    tenantId: string,
    options: QueryOptions = {}
  ): Promise<{ items: Course[]; total: number }> {
    return this.findMany(
      {
        instructorId,
        tenantId,
      },
      options
    );
  }

  // Find by category
  async findByCategory(
    categoryId: string,
    tenantId: string,
    options: QueryOptions = {}
  ): Promise<{ items: Course[]; total: number }> {
    return this.findMany(
      {
        categoryId,
        tenantId,
        status: 'published',
      },
      options
    );
  }

  // Search courses
  async search(
    query: string,
    tenantId: string,
    options: CourseSearchOptions = {}
  ): Promise<{ items: Course[]; total: number }> {
    const filters: Record<string, unknown> = {
      tenantId,
      status: 'published',
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
      ],
    };

    if (options.categoryId) {
      filters.categoryId = options.categoryId;
    }

    if (options.level) {
      filters.level = options.level;
    }

    if (options.language) {
      filters.language = options.language;
    }

    if (options.minPrice !== undefined) {
      filters.price = { gte: options.minPrice };
    }

    if (options.maxPrice !== undefined) {
      filters.price = { ...filters.price, lte: options.maxPrice };
    }

    return this.findMany(filters, options);
  }

  // Get course with full details
  async findWithDetails(courseId: string): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        category: true,
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  // Get course statistics
  async getStatistics(courseId: string): Promise<CourseStatistics> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        enrollments: {
          select: {
            status: true,
            progress: true,
            enrolledAt: true,
          },
        },
        modules: {
          select: {
            lessons: {
              select: { id: true },
            },
          },
        },
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    const totalLessons = course.modules.reduce(
      (acc, module) => acc + module.lessons.length,
      0
    );

    return {
      totalEnrollments: course.enrollments.length,
      completedEnrollments: course.enrollments.filter((e) => e.status === 'completed').length,
      completionRate:
        (course.enrollments.filter((e) => e.status === 'completed').length /
          (course.enrollments.length || 1)) *
        100,
      averageProgress:
        course.enrollments.reduce((acc, e) => acc + (e.progress?.percentage || 0), 0) /
        (course.enrollments.length || 1),
      totalLessons,
      averageRating: course.rating,
      totalReviews: course.reviewCount,
    };
  }

  // Publish course
  async publish(courseId: string): Promise<Course> {
    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        status: 'published',
        publishedAt: new Date(),
      },
    });
  }

  // Archive course
  async archive(courseId: string): Promise<Course> {
    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        status: 'archived',
      },
    });
  }

  // Get popular courses
  async findPopular(tenantId: string, limit: number = 10): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: {
        tenantId,
        status: 'published',
      },
      orderBy: {
        enrolledCount: 'desc',
      },
      take: limit,
    });
  }

  // Get recent courses
  async findRecent(tenantId: string, limit: number = 10): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: {
        tenantId,
        status: 'published',
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
    });
  }

  // Get courses by tags
  async findByTags(
    tags: string[],
    tenantId: string,
    limit: number = 10
  ): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: {
        tenantId,
        status: 'published',
        tags: {
          hasSome: tags,
        },
      },
      take: limit,
    });
  }
}

interface CourseSearchOptions extends QueryOptions {
  categoryId?: string;
  level?: CourseLevel;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface CourseStatistics {
  totalEnrollments: number;
  completedEnrollments: number;
  completionRate: number;
  averageProgress: number;
  totalLessons: number;
  averageRating: number;
  totalReviews: number;
}
```

---

## Enrollment Repository

```typescript
// src/repositories/EnrollmentRepository.ts

import { BaseRepository } from './BaseRepository';
import { Enrollment, EnrollmentStatus } from '@prisma/client';

export class EnrollmentRepository extends BaseRepository<Enrollment> {
  protected getTableName(): string {
    return 'enrollment';
  }

  // Find user enrollment in course
  async findByUserAndCourse(
    userId: string,
    courseId: string
  ): Promise<Enrollment | null> {
    return this.prisma.enrollment.findFirst({
      where: {
        userId,
        courseId,
      },
    });
  }

  // Find user enrollments
  async findByUser(
    userId: string,
    options: EnrollmentQueryOptions = {}
  ): Promise<{ items: Enrollment[]; total: number }> {
    const filters: Record<string, unknown> = {
      userId,
    };

    if (options.status) {
      filters.status = options.status;
    }

    return this.findMany(filters, options);
  }

  // Find course enrollments
  async findByCourse(
    courseId: string,
    options: EnrollmentQueryOptions = {}
  ): Promise<{ items: Enrollment[]; total: number }> {
    const filters: Record<string, unknown> = {
      courseId,
    };

    if (options.status) {
      filters.status = options.status;
    }

    return this.findMany(filters, options);
  }

  // Update progress
  async updateProgress(
    enrollmentId: string,
    lessonId: string,
    timeSpent: number
  ): Promise<Enrollment> {
    const enrollment = await this.findById(enrollmentId);
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    const completedLessons = enrollment.progress?.completedLessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    // Calculate progress percentage
    const totalLessons = await this.prisma.lesson.count({
      where: {
        module: {
          courseId: enrollment.courseId,
        },
      },
    });

    const percentage = totalLessons > 0
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;

    return this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        progress: {
          completedLessons,
          percentage,
          timeSpent: (enrollment.progress?.timeSpent || 0) + timeSpent,
          lastActivity: new Date(),
        },
        lastAccessedAt: new Date(),
        ...(percentage === 100 && {
          status: 'completed',
          completedAt: new Date(),
        }),
      },
    });
  }

  // Complete enrollment
  async complete(enrollmentId: string): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: 'completed',
        completedAt: new Date(),
        progress: {
          percentage: 100,
        },
      },
    });
  }

  // Get enrollment with course details
  async findWithCourse(enrollmentId: string): Promise<Enrollment | null> {
    return this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }

  // Get user's active enrollments
  async findActiveByUser(userId: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: {
        userId,
        status: 'active',
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            slug: true,
          },
        },
      },
      orderBy: { lastAccessedAt: 'desc' },
    });
  }

  // Get enrollment statistics
  async getStatistics(courseId: string): Promise<EnrollmentStatistics> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { courseId },
      select: {
        status: true,
        progress: true,
        enrolledAt: true,
        completedAt: true,
      },
    });

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return {
      total: enrollments.length,
      active: enrollments.filter((e) => e.status === 'active').length,
      completed: enrollments.filter((e) => e.status === 'completed').length,
      dropped: enrollments.filter((e) => e.status === 'dropped').length,
      recentEnrollments: enrollments.filter(
        (e) => new Date(e.enrolledAt) > thirtyDaysAgo
      ).length,
      averageProgress:
        enrollments.reduce((acc, e) => acc + (e.progress?.percentage || 0), 0) /
        (enrollments.length || 1),
    };
  }

  // Check if user can enroll
  async canEnroll(userId: string, courseId: string): Promise<boolean> {
    const existing = await this.findByUserAndCourse(userId, courseId);
    return !existing;
  }

  // Bulk enroll
  async bulkEnroll(
    userIds: string[],
    courseId: string
  ): Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.createMany({
      data: userIds.map((userId) => ({
        userId,
        courseId,
        status: 'active',
        enrolledAt: new Date(),
        progress: {
          percentage: 0,
          completedLessons: [],
          timeSpent: 0,
        },
      })),
    });

    return this.findByCourse(courseId).then((r) => r.items);
  }
}

interface EnrollmentQueryOptions extends QueryOptions {
  status?: EnrollmentStatus;
}

interface EnrollmentStatistics {
  total: number;
  active: number;
  completed: number;
  dropped: number;
  recentEnrollments: number;
  averageProgress: number;
}
```

---

## Quiz Repository

```typescript
// src/repositories/QuizRepository.ts

import { BaseRepository } from './BaseRepository';
import { Quiz, QuizAttempt } from '@prisma/client';

export class QuizRepository extends BaseRepository<Quiz> {
  protected getTableName(): string {
    return 'quiz';
  }

  // Find quiz with questions
  async findWithQuestions(quizId: string): Promise<Quiz | null> {
    return this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  // Find quiz by lesson
  async findByLesson(lessonId: string): Promise<Quiz | null> {
    return this.prisma.quiz.findFirst({
      where: { lessonId },
      include: {
        questions: true,
      },
    });
  }

  // Get user attempts
  async getUserAttempts(
    quizId: string,
    userId: string
  ): Promise<QuizAttempt[]> {
    return this.prisma.quizAttempt.findMany({
      where: {
        quizId,
        userId,
      },
      orderBy: { startedAt: 'desc' },
    });
  }

  // Get user attempt count
  async getUserAttemptCount(quizId: string, userId: string): Promise<number> {
    return this.prisma.quizAttempt.count({
      where: {
        quizId,
        userId,
      },
    });
  }

  // Create attempt
  async createAttempt(
    quizId: string,
    userId: string
  ): Promise<QuizAttempt> {
    return this.prisma.quizAttempt.create({
      data: {
        quizId,
        userId,
        status: 'in_progress',
        startedAt: new Date(),
        answers: [],
        score: 0,
      },
    });
  }

  // Complete attempt
  async completeAttempt(
    attemptId: string,
    answers: Array<{ questionId: string; answer: string | string[]; isCorrect: boolean }>,
    score: number
  ): Promise<QuizAttempt> {
    return this.prisma.quizAttempt.update({
      where: { id: attemptId },
      data: {
        status: 'completed',
        completedAt: new Date(),
        answers,
        score,
      },
    });
  }

  // Get quiz statistics
  async getStatistics(quizId: string): Promise<QuizStatistics> {
    const attempts = await this.prisma.quizAttempt.findMany({
      where: { quizId },
      select: {
        score: true,
        status: true,
        startedAt: true,
        completedAt: true,
      },
    });

    const completedAttempts = attempts.filter((a) => a.status === 'completed');
    const scores = completedAttempts.map((a) => a.score);

    return {
      totalAttempts: attempts.length,
      completedAttempts: completedAttempts.length,
      averageScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
      highestScore: scores.length > 0 ? Math.max(...scores) : 0,
      lowestScore: scores.length > 0 ? Math.min(...scores) : 0,
      passRate:
        (scores.filter((s) => s >= 70).length / (scores.length || 1)) * 100,
    };
  }
}

interface QuizStatistics {
  totalAttempts: number;
  completedAttempts: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
}
```

---

## Multi-Tenancy Implementation

```typescript
// src/repositories/middleware/TenantMiddleware.ts

import { Prisma } from '@prisma/client';

export function tenantMiddleware(tenantId: string): Prisma.Middleware {
  return async (params, next) => {
    // Add tenantId to all queries
    if (params.action === 'findMany' || params.action === 'findFirst') {
      params.args.where = {
        ...params.args.where,
        tenantId,
      };
    }

    if (params.action === 'create') {
      params.args.data = {
        ...params.args.data,
        tenantId,
      };
    }

    return next(params);
  };
}

// Usage
const prisma = new PrismaClient();
prisma.$use(tenantMiddleware(currentTenantId));
```

---

## Query Patterns

### Pagination

```typescript
async function paginatedQuery<T>(
  model: any,
  filters: Record<string, unknown>,
  options: PaginationOptions
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    model.findMany({
      where: filters,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    model.count({ where: filters }),
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
}
```

### Aggregation

```typescript
async function aggregateStats(model: any, filters: Record<string, unknown>) {
  const result = await model.aggregate({
    where: filters,
    _count: true,
    _avg: {
      score: true,
      progress: true,
    },
    _sum: {
      timeSpent: true,
    },
    _min: {
      score: true,
    },
    _max: {
      score: true,
    },
  });

  return {
    count: result._count,
    averages: {
      score: result._avg.score,
      progress: result._avg.progress,
    },
    totals: {
      timeSpent: result._sum.timeSpent,
    },
    ranges: {
      minScore: result._min.score,
      maxScore: result._max.score,
    },
  };
}
```

---

## Best Practices

### 1. Use Transactions for Complex Operations

```typescript
async function enrollUserInCourse(userId: string, courseId: string) {
  return this.prisma.$transaction(async (tx) => {
    // Check if already enrolled
    const existing = await tx.enrollment.findFirst({
      where: { userId, courseId },
    });

    if (existing) {
      throw new AlreadyEnrolledError(userId, courseId);
    }

    // Create enrollment
    const enrollment = await tx.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'active',
        enrolledAt: new Date(),
      },
    });

    // Increment course enrollment count
    await tx.course.update({
      where: { id: courseId },
      data: {
        enrolledCount: { increment: 1 },
      },
    });

    return enrollment;
  });
}
```

### 2. Use Select to Limit Data

```typescript
const user = await this.prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    role: true,
  },
});
```

### 3. Use Include for Relations

```typescript
const course = await this.prisma.course.findUnique({
  where: { id: courseId },
  include: {
    instructor: true,
    modules: {
      include: {
        lessons: true,
      },
    },
  },
});
```

### 4. Cache Frequently Accessed Data

```typescript
async findById(id: string): Promise<User | null> {
  const cacheKey = `user:${id}`;
  const cached = await this.redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const user = await this.prisma.user.findUnique({ where: { id } });
  if (user) {
    await this.redis.setex(cacheKey, 3600, JSON.stringify(user));
  }
  return user;
}
```

### 5. Use Connection Pooling

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection pooling is handled by Prisma
}
```

---

## References

- `src/repositories/` - All repository implementations
- `prisma/schema.prisma` - Database schema
- `src/repositories/BaseRepository.ts` - Base repository class
- `src/repositories/middleware/` - Repository middleware

---

*Last Updated: Phase 2.7 - LXP Repository Documentation*
