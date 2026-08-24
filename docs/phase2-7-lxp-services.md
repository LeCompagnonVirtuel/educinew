# Phase 2.7 LXP Service Layer Documentation

## Executive Summary

The EduCI LXP service layer comprises 60 service classes implementing business logic across all domain modules. This documentation covers service patterns, dependency injection, transaction management, error handling, and best practices for implementing robust business logic.

---

## Service Architecture

### Service Layer Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Service Layer Architecture                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    API Routes                            │    │
│  │  - Request handling                                      │    │
│  │  - Input validation                                      │    │
│  │  - Response formatting                                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Service Layer                          │    │
│  │  - Business logic                                        │    │
│  │  - Domain validation                                     │    │
│  │  - Transaction management                                │    │
│  │  - Event publishing                                      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│  │ Repository  │   │  External   │   │   Event     │          │
│  │   Layer     │   │   Services  │   │   Bus       │          │
│  └─────────────┘   └─────────────┘   └─────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Base Service

```typescript
// src/services/BaseService.ts

import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { EventPublisher } from '../events/EventPublisher';
import { Logger } from '../utils/logger';

export abstract class BaseService {
  protected prisma: PrismaClient;
  protected redis: Redis;
  protected eventPublisher: EventPublisher;
  protected logger: Logger;

  constructor(
    prisma: PrismaClient,
    redis: Redis,
    eventPublisher: EventPublisher
  ) {
    this.prisma = prisma;
    this.redis = redis;
    this.eventPublisher = eventPublisher;
    this.logger = new Logger(this.constructor.name);
  }

  // Transaction helper
  protected async transaction<T>(
    fn: (tx: PrismaClient) => Promise<T>
  ): Promise<T> {
    return this.prisma.$transaction(fn);
  }

  // Cache helpers
  protected async getCached<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  protected async setCache(key: string, value: unknown, ttl: number = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  protected async invalidateCache(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Event publishing helpers
  protected async publishEvent(eventType: string, payload: Record<string, unknown>): Promise<void> {
    await this.eventPublisher.publish({
      eventId: this.generateId(),
      eventType,
      aggregateId: payload.id as string,
      timestamp: new Date(),
      version: 1,
      payload,
    });
  }

  // ID generation
  protected generateId(): string {
    return crypto.randomUUID();
  }
}
```

---

## User Service

```typescript
// src/services/UserService.ts

import { BaseService } from './BaseService';
import { UserRepository } from '../repositories/UserRepository';
import {
  CreateUserInput,
  UpdateUserInput,
  UserQueryOptions,
} from '../types/user.types';
import { UserNotFoundError, DuplicateEntryError } from '../errors';
import bcrypt from 'bcrypt';

export class UserService extends BaseService {
  private userRepository: UserRepository;

  constructor(
    prisma: PrismaClient,
    redis: Redis,
    eventPublisher: EventPublisher,
    userRepository: UserRepository
  ) {
    super(prisma, redis, eventPublisher);
    this.userRepository = userRepository;
  }

  async createUser(input: CreateUserInput): Promise<User> {
    // Check for existing email
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new DuplicateEntryError('email', input.email);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 12);

    // Create user
    const user = await this.userRepository.create({
      ...input,
      password: hashedPassword,
      status: 'active',
    });

    // Publish event
    await this.publishEvent('user.created', {
      userId: user.id,
      email: user.email,
    });

    this.logger.info(`User created: ${user.id}`);
    return user;
  }

  async updateUser(userId: string, input: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const updatedUser = await this.userRepository.update(userId, input);

    await this.publishEvent('user.updated', {
      userId: updatedUser.id,
      changes: input,
    });

    return updatedUser;
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async listUsers(
    tenantId: string,
    options: UserQueryOptions
  ): Promise<{ items: User[]; total: number }> {
    return this.userRepository.findMany({ tenantId }, options);
  }

  async searchUsers(
    query: string,
    tenantId: string
  ): Promise<User[]> {
    const results = await this.userRepository.search(query, tenantId, {
      limit: 20,
    });
    return results.items;
  }

  async updateUserStatus(
    userId: string,
    status: 'active' | 'inactive' | 'suspended'
  ): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const updatedUser = await this.userRepository.update(userId, { status });

    await this.publishEvent('user.statusChanged', {
      userId,
      oldStatus: user.status,
      newStatus: status,
    });

    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    await this.userRepository.delete(userId);

    await this.publishEvent('user.deleted', { userId });
  }

  async getUserStatistics(userId: string): Promise<UserStatistics> {
    return this.userRepository.getStatistics(userId);
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

## Course Service

```typescript
// src/services/CourseService.ts

import { BaseService } from './BaseService';
import { CourseRepository } from '../repositories/CourseRepository';
import { UserRepository } from '../repositories/UserRepository';
import {
  CreateCourseInput,
  UpdateCourseInput,
  CourseSearchOptions,
} from '../types/course.types';
import {
  CourseNotFoundError,
  CourseNotPublishedError,
  DuplicateEntryError,
  InstructorRequiredError,
} from '../errors';

export class CourseService extends BaseService {
  private courseRepository: CourseRepository;
  private userRepository: UserRepository;

  constructor(
    prisma: PrismaClient,
    redis: Redis,
    eventPublisher: EventPublisher,
    courseRepository: CourseRepository,
    userRepository: UserRepository
  ) {
    super(prisma, redis, eventPublisher);
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
  }

  async createCourse(
    input: CreateCourseInput,
    instructorId: string
  ): Promise<Course> {
    // Verify instructor exists and has correct role
    const instructor = await this.userRepository.findById(instructorId);
    if (!instructor) {
      throw new UserNotFoundError(instructorId);
    }

    if (instructor.role !== 'instructor' && instructor.role !== 'admin') {
      throw new InstructorRequiredError();
    }

    // Check for duplicate slug
    const existingCourse = await this.courseRepository.findBySlug(input.slug);
    if (existingCourse) {
      throw new DuplicateEntryError('slug', input.slug);
    }

    // Create course
    const course = await this.courseRepository.create({
      ...input,
      instructorId,
      status: 'draft',
      enrolledCount: 0,
      rating: 0,
      reviewCount: 0,
    });

    await this.publishEvent('course.created', {
      courseId: course.id,
      instructorId,
      title: course.title,
    });

    this.logger.info(`Course created: ${course.id}`);
    return course;
  }

  async updateCourse(
    courseId: string,
    input: UpdateCourseInput,
    userId: string
  ): Promise<Course> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new CourseNotFoundError(courseId);
    }

    // Check ownership
    if (course.instructorId !== userId) {
      throw new ForbiddenError('Not course owner');
    }

    const updatedCourse = await this.courseRepository.update(courseId, input);

    await this.publishEvent('course.updated', {
      courseId,
      changes: input,
    });

    return updatedCourse;
  }

  async getCourse(courseId: string): Promise<Course> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new CourseNotFoundError(courseId);
    }
    return course;
  }

  async getCourseWithDetails(courseId: string): Promise<Course> {
    const course = await this.courseRepository.findWithDetails(courseId);
    if (!course) {
      throw new CourseNotFoundError(courseId);
    }
    return course;
  }

  async listCourses(
    tenantId: string,
    options: CourseSearchOptions
  ): Promise<{ items: Course[]; total: number }> {
    return this.courseRepository.findMany({ tenantId }, options);
  }

  async searchCourses(
    query: string,
    tenantId: string,
    options: CourseSearchOptions = {}
  ): Promise<{ items: Course[]; total: number }> {
    return this.courseRepository.search(query, tenantId, options);
  }

  async publishCourse(courseId: string, userId: string): Promise<Course> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new CourseNotFoundError(courseId);
    }

    if (course.instructorId !== userId) {
      throw new ForbiddenError('Not course owner');
    }

    if (course.status === 'published') {
      throw new CourseAlreadyPublishedError(courseId);
    }

    const publishedCourse = await this.courseRepository.publish(courseId);

    await this.publishEvent('course.published', {
      courseId,
      publishedAt: publishedCourse.publishedAt,
    });

    return publishedCourse;
  }

  async archiveCourse(courseId: string, userId: string): Promise<Course> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new CourseNotFoundError(courseId);
    }

    if (course.instructorId !== userId) {
      throw new ForbiddenError('Not course owner');
    }

    const archivedCourse = await this.courseRepository.archive(courseId);

    await this.publishEvent('course.archived', { courseId });

    return archivedCourse;
  }

  async getPopularCourses(
    tenantId: string,
    limit: number = 10
  ): Promise<Course[]> {
    return this.courseRepository.findPopular(tenantId, limit);
  }

  async getRecentCourses(
    tenantId: string,
    limit: number = 10
  ): Promise<Course[]> {
    return this.courseRepository.findRecent(tenantId, limit);
  }

  async getCourseStatistics(courseId: string): Promise<CourseStatistics> {
    return this.courseRepository.getStatistics(courseId);
  }

  async deleteCourse(courseId: string, userId: string): Promise<void> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new CourseNotFoundError(courseId);
    }

    if (course.instructorId !== userId) {
      throw new ForbiddenError('Not course owner');
    }

    if (course.enrolledCount > 0) {
      throw new BusinessRuleError(
        'course_has_enrollments',
        'Cannot delete course with active enrollments'
      );
    }

    await this.courseRepository.delete(courseId);

    await this.publishEvent('course.deleted', { courseId });
  }
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

## Enrollment Service

```typescript
// src/services/EnrollmentService.ts

import { BaseService } from './BaseService';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { CourseRepository } from '../repositories/CourseRepository';
import { UserRepository } from '../repositories/UserRepository';
import {
  EnrollmentNotFoundError,
  CourseNotFoundError,
  UserNotFoundError,
  AlreadyEnrolledError,
  CourseNotPublishedError,
  CourseFullError,
} from '../errors';

export class EnrollmentService extends BaseService {
  private enrollmentRepository: EnrollmentRepository;
  private courseRepository: CourseRepository;
  private userRepository: UserRepository;

  constructor(
    prisma: PrismaClient,
    redis: Redis,
    eventPublisher: EventPublisher,
    enrollmentRepository: EnrollmentRepository,
    courseRepository: CourseRepository,
    userRepository: UserRepository
  ) {
    super(prisma, redis, eventPublisher);
    this.enrollmentRepository = enrollmentRepository;
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
  }

  async enrollUser(
    userId: string,
    courseId: string
  ): Promise<Enrollment> {
    // Check user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    // Check course exists
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new CourseNotFoundError(courseId);
    }

    // Check course is published
    if (course.status !== 'published') {
      throw new CourseNotPublishedError(courseId);
    }

    // Check if already enrolled
    const existingEnrollment = await this.enrollmentRepository.findByUserAndCourse(
      userId,
      courseId
    );
    if (existingEnrollment) {
      throw new AlreadyEnrolledError(userId, courseId);
    }

    // Check course capacity
    if (course.maxEnrollments && course.enrolledCount >= course.maxEnrollments) {
      throw new CourseFullError(course.maxEnrollments);
    }

    // Create enrollment
    const enrollment = await this.enrollmentRepository.create({
      userId,
      courseId,
      status: 'active',
      enrolledAt: new Date(),
      progress: {
        percentage: 0,
        completedLessons: [],
        timeSpent: 0,
      },
    });

    // Increment course enrollment count
    await this.courseRepository.update(courseId, {
      enrolledCount: { increment: 1 },
    });

    await this.publishEvent('enrollment.created', {
      enrollmentId: enrollment.id,
      userId,
      courseId,
    });

    this.logger.info(`User ${userId} enrolled in course ${courseId}`);
    return enrollment;
  }

  async unenrollUser(
    userId: string,
    courseId: string,
    reason?: string
  ): Promise<void> {
    const enrollment = await this.enrollmentRepository.findByUserAndCourse(
      userId,
      courseId
    );
    if (!enrollment) {
      throw new EnrollmentNotFoundError(`${userId}-${courseId}`);
    }

    await this.enrollmentRepository.update(enrollment.id, {
      status: 'dropped',
    });

    // Decrement course enrollment count
    await this.courseRepository.update(courseId, {
      enrolledCount: { decrement: 1 },
    });

    await this.publishEvent('enrollment.dropped', {
      enrollmentId: enrollment.id,
      userId,
      courseId,
      reason,
    });
  }

  async getEnrollment(enrollmentId: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findById(enrollmentId);
    if (!enrollment) {
      throw new EnrollmentNotFoundError(enrollmentId);
    }
    return enrollment;
  }

  async getUserEnrollments(
    userId: string,
    options?: EnrollmentQueryOptions
  ): Promise<{ items: Enrollment[]; total: number }> {
    return this.enrollmentRepository.findByUser(userId, options);
  }

  async getCourseEnrollments(
    courseId: string,
    options?: EnrollmentQueryOptions
  ): Promise<{ items: Enrollment[]; total: number }> {
    return this.enrollmentRepository.findByCourse(courseId, options);
  }

  async updateProgress(
    enrollmentId: string,
    lessonId: string,
    timeSpent: number
  ): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findById(enrollmentId);
    if (!enrollment) {
      throw new EnrollmentNotFoundError(enrollmentId);
    }

    const updatedEnrollment = await this.enrollmentRepository.updateProgress(
      enrollmentId,
      lessonId,
      timeSpent
    );

    // Check if course is completed
    if (updatedEnrollment.status === 'completed' && enrollment.status !== 'completed') {
      await this.publishEvent('enrollment.completed', {
        enrollmentId,
        userId: enrollment.userId,
        courseId: enrollment.courseId,
      });
    }

    return updatedEnrollment;
  }

  async getActiveEnrollments(userId: string): Promise<Enrollment[]> {
    return this.enrollmentRepository.findActiveByUser(userId);
  }

  async getEnrollmentStatistics(courseId: string): Promise<EnrollmentStatistics> {
    return this.enrollmentRepository.getStatistics(courseId);
  }

  async canEnroll(userId: string, courseId: string): Promise<boolean> {
    return this.enrollmentRepository.canEnroll(userId, courseId);
  }

  async bulkEnroll(
    userIds: string[],
    courseId: string
  ): Promise<Enrollment[]> {
    // Verify course exists and is published
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new CourseNotFoundError(courseId);
    }

    if (course.status !== 'published') {
      throw new CourseNotPublishedError(courseId);
    }

    // Filter out already enrolled users
    const enrollmentsToCreate: string[] = [];
    for (const userId of userIds) {
      const canEnroll = await this.enrollmentRepository.canEnroll(userId, courseId);
      if (canEnroll) {
        enrollmentsToCreate.push(userId);
      }
    }

    if (enrollmentsToCreate.length === 0) {
      return [];
    }

    const enrollments = await this.enrollmentRepository.bulkEnroll(
      enrollmentsToCreate,
      courseId
    );

    // Update enrollment count
    await this.courseRepository.update(courseId, {
      enrolledCount: { increment: enrollmentsToCreate.length },
    });

    await this.publishEvent('enrollment.bulkCreated', {
      courseId,
      userIds: enrollmentsToCreate,
      count: enrollmentsToCreate.length,
    });

    return enrollments;
  }
}

interface EnrollmentQueryOptions {
  page?: number;
  limit?: number;
  status?: 'active' | 'completed' | 'paused' | 'dropped';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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

## Assessment Service

```typescript
// src/services/AssessmentService.ts

import { BaseService } from './BaseService';
import { QuizRepository } from '../repositories/QuizRepository';
import {
  QuizNotFoundError,
  QuizMaxAttemptsError,
  QuizTimeLimitError,
  InsufficientScoreError,
} from '../errors';

export class AssessmentService extends BaseService {
  private quizRepository: QuizRepository;

  constructor(
    prisma: PrismaClient,
    redis: Redis,
    eventPublisher: EventPublisher,
    quizRepository: QuizRepository
  ) {
    super(prisma, redis, eventPublisher);
    this.quizRepository = quizRepository;
  }

  async getQuiz(quizId: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findById(quizId);
    if (!quiz) {
      throw new QuizNotFoundError(quizId);
    }
    return quiz;
  }

  async getQuizWithQuestions(quizId: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findWithQuestions(quizId);
    if (!quiz) {
      throw new QuizNotFoundError(quizId);
    }
    return quiz;
  }

  async startQuizAttempt(quizId: string, userId: string): Promise<QuizAttempt> {
    const quiz = await this.quizRepository.findById(quizId);
    if (!quiz) {
      throw new QuizNotFoundError(quizId);
    }

    // Check attempt count
    const attemptCount = await this.quizRepository.getUserAttemptCount(
      quizId,
      userId
    );

    if (attemptCount >= quiz.maxAttempts) {
      throw new QuizMaxAttemptsError(quiz.maxAttempts, attemptCount);
    }

    // Create attempt
    const attempt = await this.quizRepository.createAttempt(quizId, userId);

    await this.publishEvent('quiz.attemptStarted', {
      quizId,
      userId,
      attemptId: attempt.id,
    });

    return attempt;
  }

  async submitQuizAttempt(
    attemptId: string,
    answers: QuizAnswer[]
  ): Promise<QuizAttempt> {
    const attempt = await this.quizRepository.findById(attemptId);
    if (!attempt) {
      throw new Error('Quiz attempt not found');
    }

    // Check time limit
    const quiz = await this.quizRepository.findById(attempt.quizId);
    if (!quiz) {
      throw new QuizNotFoundError(attempt.quizId);
    }

    const timeElapsed = Date.now() - new Date(attempt.startedAt).getTime();
    const timeLimitMs = quiz.timeLimit * 60 * 1000;

    if (timeElapsed > timeLimitMs) {
      await this.quizRepository.completeAttempt(attemptId, answers, 0);
      throw new QuizTimeLimitError(attempt.quizId);
    }

    // Get questions for scoring
    const questions = await this.quizRepository.findWithQuestions(attempt.quizId);

    // Calculate score
    let totalPoints = 0;
    let earnedPoints = 0;

    const gradedAnswers = answers.map((answer) => {
      const question = questions?.questions.find(
        (q) => q.id === answer.questionId
      );

      if (question) {
        totalPoints += question.points;
        const isCorrect = this.checkAnswer(answer.answer, question.correctAnswer);
        if (isCorrect) {
          earnedPoints += question.points;
        }

        return {
          ...answer,
          isCorrect,
        };
      }

      return {
        ...answer,
        isCorrect: false,
      };
    });

    const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

    // Complete attempt
    const completedAttempt = await this.quizRepository.completeAttempt(
      attemptId,
      gradedAnswers,
      score
    );

    await this.publishEvent('quiz.attemptCompleted', {
      quizId: attempt.quizId,
      userId: attempt.userId,
      attemptId,
      score,
      passed: score >= (quiz?.passingScore || 70),
    });

    return completedAttempt;
  }

  private checkAnswer(
    userAnswer: string | string[],
    correctAnswer: string | string[]
  ): boolean {
    if (Array.isArray(correctAnswer)) {
      if (!Array.isArray(userAnswer)) return false;
      return (
        userAnswer.length === correctAnswer.length &&
        userAnswer.every((a) => correctAnswer.includes(a))
      );
    }

    if (Array.isArray(userAnswer)) return false;
    return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  }

  async getUserAttempts(
    quizId: string,
    userId: string
  ): Promise<QuizAttempt[]> {
    return this.quizRepository.getUserAttempts(quizId, userId);
  }

  async getQuizStatistics(quizId: string): Promise<QuizStatistics> {
    return this.quizRepository.getStatistics(quizId);
  }
}

interface QuizAnswer {
  questionId: string;
  answer: string | string[];
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

## Analytics Service

```typescript
// src/services/AnalyticsService.ts

import { BaseService } from './BaseService';
import { AnalyticsRepository } from '../repositories/AnalyticsRepository';
import {
  LearningEvent,
  UserAnalytics,
  CourseAnalytics,
  LearningGoal,
} from '../types/analytics.types';

export class AnalyticsService extends BaseService {
  private analyticsRepository: AnalyticsRepository;

  constructor(
    prisma: PrismaClient,
    redis: Redis,
    eventPublisher: EventPublisher,
    analyticsRepository: AnalyticsRepository
  ) {
    super(prisma, redis, eventPublisher);
    this.analyticsRepository = analyticsRepository;
  }

  async trackEvent(event: Omit<LearningEvent, 'id' | 'timestamp'>): Promise<void> {
    await this.analyticsRepository.createEvent({
      ...event,
      id: this.generateId(),
      timestamp: new Date(),
    });
  }

  async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    const cacheKey = `analytics:user:${userId}`;
    const cached = await this.getCached<UserAnalytics>(cacheKey);
    if (cached) return cached;

    const analytics = await this.analyticsRepository.getUserAnalytics(userId);
    await this.setCache(cacheKey, analytics, 300); // 5 minutes

    return analytics;
  }

  async getCourseAnalytics(courseId: string): Promise<CourseAnalytics> {
    const cacheKey = `analytics:course:${courseId}`;
    const cached = await this.getCached<CourseAnalytics>(cacheKey);
    if (cached) return cached;

    const analytics = await this.analyticsRepository.getCourseAnalytics(courseId);
    await this.setCache(cacheKey, analytics, 300);

    return analytics;
  }

  async getLessonAnalytics(lessonId: string): Promise<LessonAnalytics> {
    return this.analyticsRepository.getLessonAnalytics(lessonId);
  }

  async getTenantAnalytics(tenantId: string): Promise<TenantAnalytics> {
    return this.analyticsRepository.getTenantAnalytics(tenantId);
  }

  async getUserGoals(userId: string): Promise<LearningGoal[]> {
    return this.analyticsRepository.getUserGoals(userId);
  }

  async updateUserGoal(
    userId: string,
    goalId: string,
    progress: number
  ): Promise<LearningGoal> {
    return this.analyticsRepository.updateUserGoal(userId, goalId, progress);
  }

  async getEngagementMetrics(
    tenantId: string,
    startDate: Date,
    endDate: Date
  ): Promise<EngagementMetrics> {
    return this.analyticsRepository.getEngagementMetrics(
      tenantId,
      startDate,
      endDate
    );
  }

  async getLearningStreak(userId: string): Promise<number> {
    return this.analyticsRepository.getLearningStreak(userId);
  }

  async getLeaderboard(
    tenantId: string,
    metric: 'courses_completed' | 'hours_learned' | 'streak_days',
    limit: number = 10
  ): Promise<LeaderboardEntry[]> {
    return this.analyticsRepository.getLeaderboard(tenantId, metric, limit);
  }
}

interface LessonAnalytics {
  lessonId: string;
  viewCount: number;
  completionRate: number;
  averageTimeSpent: number;
  skipRate: number;
}

interface TenantAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  averageCompletionRate: number;
}

interface EngagementMetrics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  averageSessionDuration: number;
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  value: number;
}
```

---

## Notification Service

```typescript
// src/services/NotificationService.ts

import { BaseService } from './BaseService';
import { NotificationRepository } from '../repositories/NotificationRepository';
import { EmailService } from './EmailService';
import { PushService } from './PushService';
import {
  NotificationType,
  NotificationChannel,
  NotificationPriority,
} from '../types/notification.types';

export class NotificationService extends BaseService {
  private notificationRepository: NotificationRepository;
  private emailService: EmailService;
  private pushService: PushService;

  constructor(
    prisma: PrismaClient,
    redis: Redis,
    eventPublisher: EventPublisher,
    notificationRepository: NotificationRepository,
    emailService: EmailService,
    pushService: PushService
  ) {
    super(prisma, redis, eventPublisher);
    this.notificationRepository = notificationRepository;
    this.emailService = emailService;
    this.pushService = pushService;
  }

  async sendNotification(params: SendNotificationParams): Promise<Notification> {
    // Create notification record
    const notification = await this.notificationRepository.create({
      userId: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      data: params.data,
      channels: params.channels,
      priority: params.priority || 'medium',
      status: 'unread',
    });

    // Send via specified channels
    for (const channel of params.channels) {
      switch (channel) {
        case 'email':
          await this.sendEmailNotification(params);
          break;
        case 'push':
          await this.sendPushNotification(params);
          break;
        case 'in_app':
          // Already created above
          break;
      }
    }

    await this.publishEvent('notification.sent', {
      notificationId: notification.id,
      userId: params.userId,
      type: params.type,
    });

    return notification;
  }

  private async sendEmailNotification(
    params: SendNotificationParams
  ): Promise<void> {
    const user = await this.userRepository.findById(params.userId);
    if (!user) return;

    await this.emailService.send({
      to: user.email,
      subject: params.title,
      template: params.emailTemplate || 'default',
      data: params.data,
    });
  }

  private async sendPushNotification(
    params: SendNotificationParams
  ): Promise<void> {
    const user = await this.userRepository.findById(params.userId);
    if (!user) return;

    await this.pushService.send({
      userId: params.userId,
      title: params.title,
      body: params.message,
      data: params.data,
    });
  }

  async getUserNotifications(
    userId: string,
    options?: NotificationQueryOptions
  ): Promise<{ items: Notification[]; total: number }> {
    return this.notificationRepository.findByUser(userId, options);
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return this.notificationRepository.update(notificationId, {
      status: 'read',
      readAt: new Date(),
    });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.getUnreadCount(userId);
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await this.notificationRepository.delete(notificationId);
  }

  async sendBulkNotifications(
    userIds: string[],
    params: Omit<SendNotificationParams, 'userId'>
  ): Promise<void> {
    for (const userId of userIds) {
      await this.sendNotification({ ...params, userId });
    }
  }
}

interface SendNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  channels: NotificationChannel[];
  priority?: NotificationPriority;
  emailTemplate?: string;
}

interface NotificationQueryOptions {
  page?: number;
  limit?: number;
  status?: 'unread' | 'read';
  type?: NotificationType;
}
```

---

## Service Registration

```typescript
// src/services/index.ts

import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { EventPublisher } from '../events/EventPublisher';

// Repositories
import { UserRepository } from '../repositories/UserRepository';
import { CourseRepository } from '../repositories/CourseRepository';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { QuizRepository } from '../repositories/QuizRepository';
import { AnalyticsRepository } from '../repositories/AnalyticsRepository';
import { NotificationRepository } from '../repositories/NotificationRepository';

// Services
import { UserService } from './UserService';
import { CourseService } from './CourseService';
import { EnrollmentService } from './EnrollmentService';
import { AssessmentService } from './AssessmentService';
import { AnalyticsService } from './AnalyticsService';
import { NotificationService } from './NotificationService';
import { EmailService } from './EmailService';
import { PushService } from './PushService';

export function createServices(
  prisma: PrismaClient,
  redis: Redis,
  eventPublisher: EventPublisher
) {
  // Create repositories
  const userRepository = new UserRepository(prisma, redis);
  const courseRepository = new CourseRepository(prisma, redis);
  const enrollmentRepository = new EnrollmentRepository(prisma, redis);
  const quizRepository = new QuizRepository(prisma, redis);
  const analyticsRepository = new AnalyticsRepository(prisma, redis);
  const notificationRepository = new NotificationRepository(prisma, redis);

  // Create services
  const emailService = new EmailService();
  const pushService = new PushService();

  const userService = new UserService(
    prisma,
    redis,
    eventPublisher,
    userRepository
  );

  const courseService = new CourseService(
    prisma,
    redis,
    eventPublisher,
    courseRepository,
    userRepository
  );

  const enrollmentService = new EnrollmentService(
    prisma,
    redis,
    eventPublisher,
    enrollmentRepository,
    courseRepository,
    userRepository
  );

  const assessmentService = new AssessmentService(
    prisma,
    redis,
    eventPublisher,
    quizRepository
  );

  const analyticsService = new AnalyticsService(
    prisma,
    redis,
    eventPublisher,
    analyticsRepository
  );

  const notificationService = new NotificationService(
    prisma,
    redis,
    eventPublisher,
    notificationRepository,
    emailService,
    pushService
  );

  return {
    userService,
    courseService,
    enrollmentService,
    assessmentService,
    analyticsService,
    notificationService,
    emailService,
    pushService,
  };
}

export type Services = ReturnType<typeof createServices>;
```

---

## Best Practices

### 1. Keep Services Focused

```typescript
// Good - Single responsibility
class UserService {
  async createUser(input: CreateUserInput): Promise<User> { ... }
  async updateUser(userId: string, input: UpdateUserInput): Promise<User> { ... }
  async getUser(userId: string): Promise<User> { ... }
}

// Bad - Too many responsibilities
class UserService {
  async createUser(input: CreateUserInput): Promise<User> { ... }
  async createCourse(input: CreateCourseInput): Promise<Course> { ... }
  async processPayment(input: PaymentInput): Promise<Payment> { ... }
}
```

### 2. Use Transactions for Multi-Step Operations

```typescript
async enrollUser(userId: string, courseId: string): Promise<Enrollment> {
  return this.transaction(async (tx) => {
    const enrollment = await tx.enrollment.create({ ... });
    await tx.course.update({ ... });
    return enrollment;
  });
}
```

### 3. Validate at Service Level

```typescript
async createCourse(input: CreateCourseInput, instructorId: string): Promise<Course> {
  // Validate instructor exists and has correct role
  const instructor = await this.userRepository.findById(instructorId);
  if (!instructor) {
    throw new UserNotFoundError(instructorId);
  }

  if (instructor.role !== 'instructor' && instructor.role !== 'admin') {
    throw new InstructorRequiredError();
  }

  // Continue with business logic
}
```

### 4. Publish Events for Side Effects

```typescript
async enrollUser(userId: string, courseId: string): Promise<Enrollment> {
  const enrollment = await this.enrollmentRepository.create({ ... });

  // Publish event for notifications, analytics, etc.
  await this.publishEvent('enrollment.created', {
    enrollmentId: enrollment.id,
    userId,
    courseId,
  });

  return enrollment;
}
```

### 5. Use Dependency Injection

```typescript
// Constructor injection
class CourseService {
  constructor(
    private courseRepository: CourseRepository,
    private userRepository: UserRepository
  ) {}
}
```

---

## Security Considerations

### 1. Validate Ownership

```typescript
async updateCourse(courseId: string, input: UpdateCourseInput, userId: string): Promise<Course> {
  const course = await this.courseRepository.findById(courseId);
  if (course.instructorId !== userId) {
    throw new ForbiddenError('Not course owner');
  }
  // ...
}
```

### 2. Sanitize Output

```typescript
async getUser(userId: string): Promise<UserDTO> {
  const user = await this.userRepository.findById(userId);
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    // Never expose password hash
  };
}
```

### 3. Rate Limit Sensitive Operations

```typescript
// Apply rate limiting at route level
router.post('/auth/login', rateLimit({ max: 5, windowMs: 15 * 60 * 1000 }));
```

---

## References

- `src/services/` - All service implementations
- `src/services/BaseService.ts` - Base service class
- `src/repositories/` - Repository layer
- `src/events/` - Event publishing
- `src/types/` - Type definitions

---

*Last Updated: Phase 2.7 - LXP Service Layer Documentation*
