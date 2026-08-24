# Phase 2.7 LXP Testing Documentation

## Executive Summary

The EduCI LXP testing strategy encompasses unit tests, integration tests, end-to-end tests, and performance tests across all platform layers. This documentation covers test architecture, mocking patterns, coverage targets, and best practices for maintaining a robust test suite.

---

## Testing Architecture

### Test Pyramid

```
┌─────────────────────────────────────────────────────────────────┐
│                        Test Pyramid                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                          ╱╲                                     │
│                         ╱  ╲                                    │
│                        ╱ E2E╲                                   │
│                       ╱ Tests╲                                  │
│                      ╱────────╲                                 │
│                     ╱          ╲                                │
│                    ╱ Integration╲                               │
│                   ╱    Tests     ╲                              │
│                  ╱────────────────╲                             │
│                 ╱                  ╲                            │
│                ╱     Unit Tests     ╲                           │
│               ╱______________________╲                          │
│                                                                  │
│  Layer          Count        Coverage    Speed                   │
│  ─────────────────────────────────────────────                  │
│  E2E            50+          70%         Slow (minutes)          │
│  Integration    200+         80%         Medium (seconds)        │
│  Unit           1000+        90%         Fast (milliseconds)     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Test Configuration

### Jest Configuration

```typescript
// jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  // Test environment
  testEnvironment: 'node',

  // Root directories
  roots: ['<rootDir>/src', '<rootDir>/tests'],

  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
  ],

  // Transform configuration
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // Module name mapping
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },

  // Setup files
  setupFiles: ['<rootDir>/tests/setup.ts'],
  setupFilesAfterFramework: ['<rootDir>/tests/setupAfterFramework.ts'],

  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/types/**',
    '!src/config/**',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90,
    },
  },

  // Timeouts
  testTimeout: 30000,

  // Verbose output
  verbose: true,

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after tests
  restoreMocks: true,
};

export default config;
```

### Vitest Configuration (Frontend)

```typescript
// vitest.config.ts

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/types/',
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
```

---

## Unit Testing

### Service Tests

```typescript
// src/services/__tests__/CourseService.test.ts

import { CourseService } from '../CourseService';
import { CourseRepository } from '../../repositories/CourseRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { EventPublisher } from '../../events/EventPublisher';
import {
  CourseNotFoundError,
  DuplicateEntryError,
  InstructorRequiredError,
} from '../../errors';

// Mock dependencies
jest.mock('../../repositories/CourseRepository');
jest.mock('../../repositories/UserRepository');
jest.mock('../../events/EventPublisher');

describe('CourseService', () => {
  let courseService: CourseService;
  let mockCourseRepository: jest.Mocked<CourseRepository>;
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockEventPublisher: jest.Mocked<EventPublisher>;

  beforeEach(() => {
    mockCourseRepository = new CourseRepository() as jest.Mocked<CourseRepository>;
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    mockEventPublisher = new EventPublisher() as jest.Mocked<EventPublisher>;

    courseService = new CourseService(
      mockCourseRepository,
      mockUserRepository,
      mockEventPublisher
    );

    jest.clearAllMocks();
  });

  describe('createCourse', () => {
    const validInput = {
      title: 'Test Course',
      slug: 'test-course',
      description: 'A test course',
      categoryId: 'category-1',
      level: 'beginner',
      language: 'en',
      price: 99.99,
      currency: 'USD',
    };

    it('should create a course successfully', async () => {
      const instructorId = 'instructor-1';
      const mockInstructor = {
        id: instructorId,
        role: 'instructor',
        email: 'instructor@test.com',
      };
      const mockCourse = {
        id: 'course-1',
        ...validInput,
        instructorId,
        status: 'draft',
        enrolledCount: 0,
        rating: 0,
        reviewCount: 0,
      };

      mockUserRepository.findById.mockResolvedValue(mockInstructor);
      mockCourseRepository.findBySlug.mockResolvedValue(null);
      mockCourseRepository.create.mockResolvedValue(mockCourse);
      mockEventPublisher.publish.mockResolvedValue();

      const result = await courseService.createCourse(validInput, instructorId);

      expect(result).toEqual(mockCourse);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(instructorId);
      expect(mockCourseRepository.findBySlug).toHaveBeenCalledWith(validInput.slug);
      expect(mockCourseRepository.create).toHaveBeenCalled();
      expect(mockEventPublisher.publish).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'course.created',
        })
      );
    });

    it('should throw error if instructor not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(
        courseService.createCourse(validInput, 'nonexistent-id')
      ).rejects.toThrow(UserNotFoundError);
    });

    it('should throw error if user is not instructor', async () => {
      const mockStudent = {
        id: 'student-1',
        role: 'student',
      };

      mockUserRepository.findById.mockResolvedValue(mockStudent);

      await expect(
        courseService.createCourse(validInput, 'student-1')
      ).rejects.toThrow(InstructorRequiredError);
    });

    it('should throw error if slug already exists', async () => {
      const mockInstructor = {
        id: 'instructor-1',
        role: 'instructor',
      };
      const existingCourse = {
        id: 'existing-course',
        slug: 'test-course',
      };

      mockUserRepository.findById.mockResolvedValue(mockInstructor);
      mockCourseRepository.findBySlug.mockResolvedValue(existingCourse);

      await expect(
        courseService.createCourse(validInput, 'instructor-1')
      ).rejects.toThrow(DuplicateEntryError);
    });
  });

  describe('getCourse', () => {
    it('should return course if found', async () => {
      const mockCourse = {
        id: 'course-1',
        title: 'Test Course',
      };

      mockCourseRepository.findById.mockResolvedValue(mockCourse);

      const result = await courseService.getCourse('course-1');

      expect(result).toEqual(mockCourse);
      expect(mockCourseRepository.findById).toHaveBeenCalledWith('course-1');
    });

    it('should throw error if course not found', async () => {
      mockCourseRepository.findById.mockResolvedValue(null);

      await expect(courseService.getCourse('nonexistent')).rejects.toThrow(
        CourseNotFoundError
      );
    });
  });
});
```

### Repository Tests

```typescript
// src/repositories/__tests__/UserRepository.test.ts

import { UserRepository } from '../UserRepository';
import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';

// Mock Prisma and Redis
jest.mock('@prisma/client');
jest.mock('ioredis');

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let mockRedis: jest.Mocked<Redis>;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    mockRedis = new Redis() as jest.Mocked<Redis>;

    userRepository = new UserRepository(mockPrisma, mockRedis);

    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should return user if found', async () => {
      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      };

      mockRedis.get.mockResolvedValue(null);
      mockPrisma.user.findFirst.mockResolvedValue(mockUser);
      mockRedis.setex.mockResolvedValue('OK');

      const result = await userRepository.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(mockRedis.setex).toHaveBeenCalled();
    });

    it('should return cached user if available', async () => {
      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
      };

      mockRedis.get.mockResolvedValue(JSON.stringify(mockUser));

      const result = await userRepository.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findFirst).not.toHaveBeenCalled();
    });

    it('should return null if user not found', async () => {
      mockRedis.get.mockResolvedValue(null);
      mockPrisma.user.findFirst.mockResolvedValue(null);

      const result = await userRepository.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create user successfully', async () => {
      const userData = {
        email: 'new@example.com',
        firstName: 'New',
        lastName: 'User',
        role: 'student',
      };

      const mockUser = {
        id: 'user-2',
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.user.create.mockResolvedValue(mockUser);
      mockRedis.keys.mockResolvedValue([]);
      mockRedis.del.mockResolvedValue(1);

      const result = await userRepository.create(userData);

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });
  });

  describe('search', () => {
    it('should search users by query', async () => {
      const mockUsers = [
        { id: 'user-1', email: 'john@example.com', firstName: 'John' },
        { id: 'user-2', email: 'jane@example.com', firstName: 'Jane' },
      ];

      mockPrisma.user.findMany.mockResolvedValue(mockUsers);
      mockPrisma.user.count.mockResolvedValue(2);

      const result = await userRepository.search('john', 'tenant-1');

      expect(result.items).toEqual(mockUsers);
      expect(result.total).toBe(2);
      expect(mockPrisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              { email: { contains: 'john', mode: 'insensitive' } },
              { firstName: { contains: 'john', mode: 'insensitive' } },
            ]),
          }),
        })
      );
    });
  });
});
```

---

## Integration Testing

### API Integration Tests

```typescript
// tests/integration/courses.test.ts

import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/lib/prisma';
import { redis } from '../../src/lib/redis';
import { createTestUser, createTestCourse, getAuthToken } from '../helpers';

describe('Courses API', () => {
  let authToken: string;
  let testUser: any;

  beforeAll(async () => {
    // Create test user
    testUser = await createTestUser({
      email: 'test@example.com',
      role: 'instructor',
    });

    // Get auth token
    authToken = await getAuthToken(testUser);
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.course.deleteMany();
    await prisma.user.deleteMany();
    await redis.quit();
    await prisma.$disconnect();
  });

  describe('POST /api/v1/courses', () => {
    it('should create a course', async () => {
      const courseData = {
        title: 'Integration Test Course',
        slug: 'integration-test-course',
        description: 'A course for integration testing',
        categoryId: 'category-1',
        level: 'beginner',
        language: 'en',
        price: 99.99,
        currency: 'USD',
      };

      const response = await request(app)
        .post('/api/v1/courses')
        .set('Authorization', `Bearer ${authToken}`)
        .send(courseData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(courseData.title);
      expect(response.body.data.slug).toBe(courseData.slug);
      expect(response.body.data.status).toBe('draft');
    });

    it('should return 401 without auth token', async () => {
      await request(app)
        .post('/api/v1/courses')
        .send({})
        .expect(401);
    });

    it('should return 400 with invalid data', async () => {
      const invalidData = {
        title: '',
        slug: 'invalid slug with spaces',
      };

      await request(app)
        .post('/api/v1/courses')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);
    });
  });

  describe('GET /api/v1/courses', () => {
    it('should list courses', async () => {
      // Create test courses
      await createTestCourse({ title: 'Course 1' });
      await createTestCourse({ title: 'Course 2' });

      const response = await request(app)
        .get('/api/v1/courses')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(2);
      expect(response.body.meta.total).toBe(2);
    });

    it('should filter courses by level', async () => {
      await createTestCourse({ title: 'Beginner', level: 'beginner' });
      await createTestCourse({ title: 'Advanced', level: 'advanced' });

      const response = await request(app)
        .get('/api/v1/courses?level=beginner')
        .expect(200);

      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].level).toBe('beginner');
    });

    it('should paginate courses', async () => {
      // Create 15 test courses
      for (let i = 0; i < 15; i++) {
        await createTestCourse({ title: `Course ${i}` });
      }

      const response = await request(app)
        .get('/api/v1/courses?page=1&limit=10')
        .expect(200);

      expect(response.body.data.items).toHaveLength(10);
      expect(response.body.meta.total).toBe(15);
      expect(response.body.meta.totalPages).toBe(2);
    });
  });

  describe('GET /api/v1/courses/:id', () => {
    it('should get course by id', async () => {
      const course = await createTestCourse({ title: 'Test Course' });

      const response = await request(app)
        .get(`/api/v1/courses/${course.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(course.id);
    });

    it('should return 404 for nonexistent course', async () => {
      await request(app)
        .get('/api/v1/courses/nonexistent')
        .expect(404);
    });
  });

  describe('PUT /api/v1/courses/:id', () => {
    it('should update course', async () => {
      const course = await createTestCourse({
        title: 'Original Title',
        instructorId: testUser.id,
      });

      const response = await request(app)
        .put(`/api/v1/courses/${course.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Updated Title' })
        .expect(200);

      expect(response.body.data.title).toBe('Updated Title');
    });

    it('should return 403 if not course owner', async () => {
      const otherUser = await createTestUser({ role: 'instructor' });
      const course = await createTestCourse({
        instructorId: otherUser.id,
      });

      await request(app)
        .put(`/api/v1/courses/${course.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Hacked Title' })
        .expect(403);
    });
  });

  describe('POST /api/v1/courses/:id/publish', () => {
    it('should publish course', async () => {
      const course = await createTestCourse({
        instructorId: testUser.id,
      });

      const response = await request(app)
        .post(`/api/v1/courses/${course.id}/publish`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.data.status).toBe('published');
      expect(response.body.data.publishedAt).toBeDefined();
    });
  });
});
```

### Database Integration Tests

```typescript
// tests/integration/database.test.ts

import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../src/repositories/UserRepository';
import { Redis } from 'ioredis';

describe('Database Integration', () => {
  let prisma: PrismaClient;
  let redis: Redis;
  let userRepository: UserRepository;

  beforeAll(async () => {
    prisma = new PrismaClient();
    redis = new Redis(process.env.REDIS_TEST_URL);
    userRepository = new UserRepository(prisma, redis);

    // Run migrations
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  });

  afterAll(async () => {
    await redis.quit();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up test data
    await prisma.user.deleteMany();
    await redis.flushdb();
  });

  describe('User CRUD Operations', () => {
    it('should create and retrieve user', async () => {
      const userData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'student',
      };

      const createdUser = await userRepository.create(userData);
      expect(createdUser.id).toBeDefined();

      const foundUser = await userRepository.findById(createdUser.id);
      expect(foundUser).not.toBeNull();
      expect(foundUser?.email).toBe(userData.email);
    });

    it('should update user', async () => {
      const userData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      };

      const createdUser = await userRepository.create(userData);
      const updatedUser = await userRepository.update(createdUser.id, {
        firstName: 'Updated',
      });

      expect(updatedUser.firstName).toBe('Updated');
    });

    it('should delete user', async () => {
      const userData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      };

      const createdUser = await userRepository.create(userData);
      await userRepository.delete(createdUser.id);

      const foundUser = await userRepository.findById(createdUser.id);
      expect(foundUser).toBeNull();
    });
  });

  describe('Query Operations', () => {
    it('should search users', async () => {
      await userRepository.create({
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      await userRepository.create({
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
      });

      const results = await userRepository.search('john', 'tenant-1');
      expect(results.items).toHaveLength(1);
      expect(results.items[0].email).toBe('john@example.com');
    });

    it('should paginate results', async () => {
      // Create 25 users
      for (let i = 0; i < 25; i++) {
        await userRepository.create({
          email: `user${i}@example.com`,
          firstName: `User${i}`,
          lastName: 'Test',
        });
      }

      const page1 = await userRepository.findMany({}, { page: 1, limit: 10 });
      expect(page1.items).toHaveLength(10);
      expect(page1.total).toBe(25);

      const page3 = await userRepository.findMany({}, { page: 3, limit: 10 });
      expect(page3.items).toHaveLength(5);
    });
  });

  describe('Caching', () => {
    it('should cache user after first fetch', async () => {
      const userData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      };

      const createdUser = await userRepository.create(userData);

      // First fetch - should hit database
      const user1 = await userRepository.findById(createdUser.id);
      expect(user1).not.toBeNull();

      // Second fetch - should hit cache
      const user2 = await userRepository.findById(createdUser.id);
      expect(user2).toEqual(user1);

      // Verify cache was used
      const cachedUser = await redis.get(`user:${createdUser.id}`);
      expect(cachedUser).not.toBeNull();
    });

    it('should invalidate cache on update', async () => {
      const userData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      };

      const createdUser = await userRepository.create(userData);

      // Cache user
      await userRepository.findById(createdUser.id);

      // Update user
      await userRepository.update(createdUser.id, { firstName: 'Updated' });

      // Cache should be invalidated
      const cachedUser = await redis.get(`user:${createdUser.id}`);
      expect(cachedUser).toBeNull();
    });
  });
});
```

---

## End-to-End Testing

### Cypress Tests

```typescript
// cypress/e2e/courses.cy.ts

describe('Course Management', () => {
  beforeEach(() => {
    cy.login('instructor@example.com', 'password123');
    cy.visit('/courses');
  });

  describe('Create Course', () => {
    it('should create a new course', () => {
      cy.get('[data-testid="create-course-button"]').click();

      cy.get('[data-testid="course-title"]').type('E2E Test Course');
      cy.get('[data-testid="course-description"]').type('This is a test course');
      cy.get('[data-testid="course-category"]').select('Programming');
      cy.get('[data-testid="course-level"]').select('Beginner');
      cy.get('[data-testid="course-price"]').type('99.99');

      cy.get('[data-testid="submit-course"]').click();

      cy.url().should('include', '/courses/');
      cy.get('[data-testid="course-title"]').should('contain', 'E2E Test Course');
    });

    it('should show validation errors', () => {
      cy.get('[data-testid="create-course-button"]').click();

      cy.get('[data-testid="submit-course"]').click();

      cy.get('[data-testid="error-title"]').should('be.visible');
      cy.get('[data-testid="error-description"]').should('be.visible');
    });
  });

  describe('Edit Course', () => {
    it('should update course details', () => {
      // Create a course first
      cy.createCourse('Original Course');

      cy.get('[data-testid="edit-course-button"]').click();

      cy.get('[data-testid="course-title"]')
        .clear()
        .type('Updated Course');

      cy.get('[data-testid="save-course"]').click();

      cy.get('[data-testid="course-title"]').should('contain', 'Updated Course');
    });
  });

  describe('Publish Course', () => {
    it('should publish a draft course', () => {
      cy.createCourse('Draft Course');

      cy.get('[data-testid="publish-course-button"]').click();

      cy.get('[data-testid="confirm-publish"]').click();

      cy.get('[data-testid="course-status"]').should('contain', 'Published');
    });
  });

  describe('Delete Course', () => {
    it('should delete a course', () => {
      cy.createCourse('Course to Delete');

      cy.get('[data-testid="delete-course-button"]').click();

      cy.get('[data-testid="confirm-delete"]').click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}/courses`);
      cy.get('[data-testid="course-list"]').should(
        'not.contain',
        'Course to Delete'
      );
    });
  });
});
```

### Playwright Tests

```typescript
// tests/e2e/courses.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Course Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'instructor@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');

    // Navigate to courses
    await page.goto('/courses');
  });

  test('should display course list', async ({ page }) => {
    await expect(page.locator('[data-testid="course-card"]')).toHaveCount(3);
  });

  test('should create a new course', async ({ page }) => {
    await page.click('[data-testid="create-course-button"]');

    await page.fill('[data-testid="course-title"]', 'Playwright Test Course');
    await page.fill(
      '[data-testid="course-description"]',
      'This course was created by Playwright'
    );
    await page.selectOption('[data-testid="course-category"]', 'programming');
    await page.selectOption('[data-testid="course-level"]', 'intermediate');
    await page.fill('[data-testid="course-price"]', '149.99');

    await page.click('[data-testid="submit-course"]');

    await expect(page).toHaveURL(/\/courses\/[a-f0-9-]+/);
    await expect(
      page.locator('[data-testid="course-title"]')
    ).toContainText('Playwright Test Course');
  });

  test('should edit course', async ({ page }) => {
    // Create a course first
    await page.click('[data-testid="create-course-button"]');
    await page.fill('[data-testid="course-title"]', 'Original Title');
    await page.fill('[data-testid="course-description"]', 'Description');
    await page.selectOption('[data-testid="course-category"]', 'programming');
    await page.selectOption('[data-testid="course-level"]', 'beginner');
    await page.fill('[data-testid="course-price"]', '99.99');
    await page.click('[data-testid="submit-course"]');

    // Edit the course
    await page.click('[data-testid="edit-course-button"]');
    await page.fill('[data-testid="course-title"]', 'Edited Title');
    await page.click('[data-testid="save-course"]');

    await expect(
      page.locator('[data-testid="course-title"]')
    ).toContainText('Edited Title');
  });
});
```

---

## Mocking Patterns

### API Mocking

```typescript
// tests/mocks/api.ts

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  // Course endpoints
  rest.get('/api/v1/courses', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          items: [
            { id: '1', title: 'Mock Course 1' },
            { id: '2', title: 'Mock Course 2' },
          ],
          meta: { total: 2, page: 1, limit: 10 },
        },
      })
    );
  }),

  rest.get('/api/v1/courses/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        success: true,
        data: { id, title: 'Mock Course' },
      })
    );
  }),

  rest.post('/api/v1/courses', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: { id: '3', ...req.body },
      })
    );
  }),

  // User endpoints
  rest.get('/api/v1/users/me', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
        },
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Database Mocking

```typescript
// tests/mocks/database.ts

import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Usage in tests
describe('UserService', () => {
  it('should find user by id', async () => {
    const mockUser = {
      id: 'user-1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
    };

    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    const result = await userService.getUser('user-1');

    expect(result).toEqual(mockUser);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
    });
  });
});
```

---

## Test Utilities

```typescript
// tests/utils/testUtils.ts

import { prisma } from '../../src/lib/prisma';
import { redis } from '../../src/lib/redis';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function createTestUser(overrides = {}) {
  const defaultUser = {
    email: `test-${Date.now()}@example.com`,
    password: await bcrypt.hash('password123', 10),
    firstName: 'Test',
    lastName: 'User',
    role: 'student',
    status: 'active',
    ...overrides,
  };

  return prisma.user.create({ data: defaultUser });
}

export async function createTestCourse(overrides = {}) {
  const defaultCourse = {
    title: `Test Course ${Date.now()}`,
    slug: `test-course-${Date.now()}`,
    description: 'Test course description',
    categoryId: 'category-1',
    level: 'beginner',
    language: 'en',
    price: 99.99,
    currency: 'USD',
    status: 'draft',
    enrolledCount: 0,
    rating: 0,
    reviewCount: 0,
    ...overrides,
  };

  return prisma.course.create({ data: defaultCourse });
}

export async function getAuthToken(user: any) {
  return jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      tenantId: 'test-tenant',
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export async function cleanupDatabase() {
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
  await redis.flushdb();
}
```

---

## Coverage Targets

| Layer | Statements | Branches | Functions | Lines |
|-------|------------|----------|-----------|-------|
| Services | 95% | 90% | 95% | 95% |
| Repositories | 90% | 85% | 90% | 90% |
| Controllers | 90% | 85% | 90% | 90% |
| Middleware | 95% | 90% | 95% | 95% |
| Validators | 85% | 80% | 85% | 85% |
| Hooks | 90% | 85% | 90% | 90% |
| Components | 85% | 80% | 85% | 85% |
| **Overall** | **90%** | **85%** | **90%** | **90%** |

---

## Best Practices

### 1. Test One Thing at a Time

```typescript
// Bad
it('should create user and send email and update stats', async () => {
  // Too many assertions
});

// Good
it('should create user', async () => {
  const user = await createUser(userData);
  expect(user.id).toBeDefined();
});

it('should send welcome email', async () => {
  await createUser(userData);
  expect(emailService.send).toHaveBeenCalled();
});

it('should update user stats', async () => {
  await createUser(userData);
  expect(statsService.increment).toHaveBeenCalled();
});
```

### 2. Use Descriptive Test Names

```typescript
// Bad
it('works', () => {});

// Good
it('should return 404 when course does not exist', () => {});
```

### 3. Follow AAA Pattern

```typescript
it('should calculate course statistics', async () => {
  // Arrange
  const course = await createTestCourse();
  await createTestEnrollments(course.id, 10);

  // Act
  const stats = await courseService.getStatistics(course.id);

  // Assert
  expect(stats.totalEnrollments).toBe(10);
  expect(stats.averageProgress).toBeGreaterThan(0);
});
```

### 4. Clean Up After Tests

```typescript
afterEach(async () => {
  await cleanupDatabase();
});
```

### 5. Use Factory Functions

```typescript
const userFactory = {
  build: (overrides = {}) => ({
    email: `user-${Date.now()}@example.com`,
    firstName: 'Test',
    lastName: 'User',
    ...overrides,
  }),

  create: async (overrides = {}) => {
    const userData = userFactory.build(overrides);
    return prisma.user.create({ data: userData });
  },
};
```

---

## References

- `tests/` - Test files
- `tests/unit/` - Unit tests
- `tests/integration/` - Integration tests
- `tests/e2e/` - End-to-end tests
- `tests/mocks/` - Mock files
- `tests/utils/` - Test utilities
- `jest.config.ts` - Jest configuration
- `vitest.config.ts` - Vitest configuration

---

*Last Updated: Phase 2.7 - LXP Testing Documentation*
