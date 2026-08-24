# Phase 2.7 LXP Hook Layer Documentation

## Executive Summary

The EduCI LXP hook layer comprises 300 React hooks providing state management, data fetching, and business logic integration across the frontend application. This documentation covers hook patterns, custom hooks, state management, and best practices for React hook development.

---

## Hook Architecture

### Hook Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                      Hook Categories                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Data Fetching  │  │    Form         │  │    UI State     │ │
│  │    Hooks        │  │    Hooks        │  │    Hooks        │ │
│  │                 │  │                 │  │                 │ │
│  │ - useQuery      │  │ - useForm       │  │ - useModal      │ │
│  │ - useMutation   │  │ - useField      │  │ - useToast      │ │
│  │ - useInfinite   │  │ - useValidation │  │ - useTheme      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Authentication │  │    Domain       │  │    Utility      │ │
│  │    Hooks        │  │    Hooks        │  │    Hooks        │ │
│  │                 │  │                 │  │                 │ │
│  │ - useAuth       │  │ - useCourse     │  │ - useDebounce   │ │
│  │ - useUser       │  │ - useEnrollment │  │ - useLocalStorage│ │
│  │ - usePermission │  │ - useQuiz       │  │ - useMediaQuery │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Fetching Hooks

### useQuery Hook

```typescript
// src/hooks/useQuery.ts

import { useState, useEffect, useCallback } from 'react';
import { APIResponse } from '../types/api.types';

interface UseQueryOptions<T> {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  staleTime?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseQueryResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<void>;
}

export function useQuery<T>(
  key: string,
  fetcher: () => Promise<APIResponse<T>>,
  options: UseQueryOptions<T> = {}
): UseQueryResult<T> {
  const {
    enabled = true,
    refetchOnWindowFocus = false,
    refetchInterval,
    staleTime = 5 * 60 * 1000, // 5 minutes
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetcher();

      if (response.success && response.data) {
        setData(response.data);
        onSuccess?.(response.data);
      } else {
        throw new Error(response.error?.message || 'Failed to fetch data');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [key, enabled, fetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      fetchData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, fetchData]);

  // Refetch interval
  useEffect(() => {
    if (!refetchInterval) return;

    const interval = setInterval(fetchData, refetchInterval);
    return () => clearInterval(interval);
  }, [refetchInterval, fetchData]);

  return {
    data,
    error,
    isLoading,
    isError: error !== null,
    isSuccess: data !== null && error === null,
    refetch: fetchData,
  };
}
```

### useMutation Hook

```typescript
// src/hooks/useMutation.ts

import { useState, useCallback } from 'react';
import { APIResponse } from '../types/api.types';

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (data: TData | null, error: Error | null, variables: TVariables) => void;
}

interface UseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<void>;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | null;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export function useMutation<TData, TVariables = void>(
  mutator: (variables: TVariables) => Promise<APIResponse<TData>>,
  options: UseMutationOptions<TData, TVariables> = {}
): UseMutationResult<TData, TVariables> {
  const { onSuccess, onError, onSettled } = options;

  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutateAsync = useCallback(
    async (variables: TVariables): Promise<TData> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await mutator(variables);

        if (response.success && response.data) {
          setData(response.data);
          onSuccess?.(response.data, variables);
          onSettled?.(response.data, null, variables);
          return response.data;
        } else {
          throw new Error(response.error?.message || 'Mutation failed');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error, variables);
        onSettled?.(null, error, variables);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [mutator, onSuccess, onError, onSettled]
  );

  const mutate = useCallback(
    async (variables: TVariables): Promise<void> => {
      await mutateAsync(variables);
    },
    [mutateAsync]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    mutate,
    mutateAsync,
    data,
    error,
    isLoading,
    isError: error !== null,
    isSuccess: data !== null && error === null,
    reset,
  };
}
```

### useInfiniteQuery Hook

```typescript
// src/hooks/useInfiniteQuery.ts

import { useState, useCallback } from 'react';
import { APIResponse } from '../types/api.types';

interface InfiniteData<T> {
  items: T[];
  page: number;
  hasNext: boolean;
}

interface UseInfiniteQueryOptions<T> {
  initialPage?: number;
  onSuccess?: (data: T[], page: number) => void;
  onError?: (error: Error) => void;
}

interface UseInfiniteQueryResult<T> {
  data: T[];
  isLoading: boolean;
  isLoadingMore: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useInfiniteQuery<T>(
  fetcher: (page: number) => Promise<APIResponse<InfiniteData<T>>>,
  options: UseInfiniteQueryOptions<T> = {}
): UseInfiniteQueryResult<T> {
  const { initialPage = 1, onSuccess, onError } = options;

  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPage = useCallback(
    async (pageNum: number, isLoadMore: boolean = false) => {
      try {
        if (isLoadMore) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        const response = await fetcher(pageNum);

        if (response.success && response.data) {
          const newItems = response.data.items;

          if (isLoadMore) {
            setData((prev) => [...prev, ...newItems]);
          } else {
            setData(newItems);
          }

          setHasNextPage(response.data.hasNext);
          setPage(pageNum);
          onSuccess?.(newItems, pageNum);
        } else {
          throw new Error(response.error?.message || 'Failed to fetch data');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [fetcher, onSuccess, onError]
  );

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || isLoadingMore) return;
    await fetchPage(page + 1, true);
  }, [hasNextPage, isLoadingMore, page, fetchPage]);

  const refetch = useCallback(async () => {
    await fetchPage(initialPage, false);
  }, [fetchPage, initialPage]);

  // Initial fetch
  useState(() => {
    fetchPage(initialPage, false);
  });

  return {
    data,
    isLoading,
    isLoadingMore,
    isError: error !== null,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
}
```

---

## Authentication Hooks

### useAuth Hook

```typescript
// src/hooks/useAuth.ts

import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import { User, UserRole } from '../types/user.types';
import { authAPI } from '../api/auth.api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, tenantId?: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  refreshToken: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await authAPI.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string, tenantId?: string) => {
      const response = await authAPI.login({ email, password, tenantId });

      if (response.success && response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setUser(response.data.user);
        router.push('/dashboard');
      } else {
        throw new Error(response.error?.message || 'Login failed');
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  const register = useCallback(
    async (data: RegisterInput) => {
      const response = await authAPI.register(data);

      if (response.success && response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setUser(response.data.user);
        router.push('/dashboard');
      } else {
        throw new Error(response.error?.message || 'Registration failed');
      }
    },
    [router]
  );

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const response = await authAPI.refreshToken(refreshToken);

    if (response.success && response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
    } else {
      throw new Error('Token refresh failed');
    }
  }, []);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;
      // Check user permissions based on role
      return user.role === 'admin' || user.permissions?.includes(permission);
    },
    [user]
  );

  const hasRole = useCallback(
    (role: UserRole | UserRole[]): boolean => {
      if (!user) return false;
      if (Array.isArray(role)) {
        return role.includes(user.role);
      }
      return user.role === role;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        refreshToken,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}
```

---

## Domain Hooks

### useCourse Hook

```typescript
// src/hooks/useCourse.ts

import { useQuery, useMutation } from '../hooks';
import { courseAPI } from '../api/course.api';
import { Course, CreateCourseInput, UpdateCourseInput } from '../types/course.types';

export function useCourse(courseId: string) {
  const {
    data: course,
    isLoading,
    error,
    refetch,
  } = useQuery<Course>(
    `course-${courseId}`,
    () => courseAPI.getCourse(courseId),
    { enabled: !!courseId }
  );

  const updateMutation = useMutation<Course, UpdateCourseInput>(
    (input) => courseAPI.updateCourse(courseId, input),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const publishMutation = useMutation<Course, void>(
    () => courseAPI.publishCourse(courseId),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const archiveMutation = useMutation<Course, void>(
    () => courseAPI.archiveCourse(courseId),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const deleteMutation = useMutation<void, void>(
    () => courseAPI.deleteCourse(courseId),
    {
      onSuccess: () => {
        // Navigate to courses list
      },
    }
  );

  return {
    course,
    isLoading,
    error,
    refetch,
    update: updateMutation.mutate,
    updateAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isLoading,
    publish: publishMutation.mutate,
    isPublishing: publishMutation.isLoading,
    archive: archiveMutation.mutate,
    isArchiving: archiveMutation.isLoading,
    delete: deleteMutation.mutate,
    isDeleting: deleteMutation.isLoading,
  };
}

export function useCourses(filters?: CourseFilters) {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<{ items: Course[]; total: number }>(
    'courses',
    () => courseAPI.listCourses(filters),
    { enabled: true }
  );

  return {
    courses: data?.items || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
  };
}

export function useCreateCourse() {
  return useMutation<Course, CreateCourseInput>(
    (input) => courseAPI.createCourse(input)
  );
}

export function useCourseSearch(query: string, tenantId: string) {
  return useQuery<{ items: Course[]; total: number }>(
    `course-search-${query}`,
    () => courseAPI.searchCourses(query, tenantId),
    { enabled: query.length > 0 }
  );
}

interface CourseFilters {
  category?: string;
  level?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}
```

### useEnrollment Hook

```typescript
// src/hooks/useEnrollment.ts

import { useQuery, useMutation } from '../hooks';
import { enrollmentAPI } from '../api/enrollment.api';
import { Enrollment } from '../types/enrollment.types';

export function useEnrollment(userId: string, courseId: string) {
  const {
    data: enrollment,
    isLoading,
    error,
    refetch,
  } = useQuery<Enrollment | null>(
    `enrollment-${userId}-${courseId}`,
    () => enrollmentAPI.getEnrollment(userId, courseId),
    { enabled: !!userId && !!courseId }
  );

  const enrollMutation = useMutation<Enrollment, void>(
    () => enrollmentAPI.enroll(userId, courseId),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const unenrollMutation = useMutation<void, { reason?: string }>(
    (data) => enrollmentAPI.unenroll(userId, courseId, data.reason),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const updateProgressMutation = useMutation<
    Enrollment,
    { lessonId: string; timeSpent: number }
  >(
    (data) =>
      enrollmentAPI.updateProgress(enrollment!.id, data.lessonId, data.timeSpent),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return {
    enrollment,
    isLoading,
    error,
    refetch,
    enroll: enrollMutation.mutate,
    isEnrolling: enrollMutation.isLoading,
    unenroll: unenrollMutation.mutate,
    isUnenrolling: unenrollMutation.isLoading,
    updateProgress: updateProgressMutation.mutate,
    isUpdatingProgress: updateProgressMutation.isLoading,
    isEnrolled: !!enrollment,
    isCompleted: enrollment?.status === 'completed',
    progress: enrollment?.progress?.percentage || 0,
  };
}

export function useUserEnrollments(userId: string) {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<{ items: Enrollment[]; total: number }>(
    `user-enrollments-${userId}`,
    () => enrollmentAPI.getUserEnrollments(userId),
    { enabled: !!userId }
  );

  return {
    enrollments: data?.items || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
    activeEnrollments: data?.items?.filter((e) => e.status === 'active') || [],
    completedEnrollments: data?.items?.filter((e) => e.status === 'completed') || [],
  };
}

export function useCanEnroll(userId: string, courseId: string) {
  return useQuery<boolean>(
    `can-enroll-${userId}-${courseId}`,
    () => enrollmentAPI.canEnroll(userId, courseId),
    { enabled: !!userId && !!courseId }
  );
}
```

### useQuiz Hook

```typescript
// src/hooks/useQuiz.ts

import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '../hooks';
import { quizAPI } from '../api/quiz.api';
import { Quiz, QuizAttempt, QuizAnswer } from '../types/assessment.types';

export function useQuiz(quizId: string) {
  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery<Quiz>(
    `quiz-${quizId}`,
    () => quizAPI.getQuiz(quizId),
    { enabled: !!quizId }
  );

  const startAttemptMutation = useMutation<QuizAttempt, void>(
    () => quizAPI.startAttempt(quizId),
  );

  const submitAttemptMutation = useMutation<QuizAttempt, QuizAnswer[]>(
    (answers) => quizAPI.submitAttempt(quizId, answers),
  );

  return {
    quiz,
    isLoading,
    error,
    startAttempt: startAttemptMutation.mutate,
    startAttemptAsync: startAttemptMutation.mutateAsync,
    isStarting: startAttemptMutation.isLoading,
  };
}

export function useQuizAttempt(attemptId: string) {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const {
    data: attempt,
    isLoading,
    error,
  } = useQuery<QuizAttempt>(
    `quiz-attempt-${attemptId}`,
    () => quizAPI.getAttempt(attemptId),
    { enabled: !!attemptId }
  );

  const submitMutation = useMutation<QuizAttempt, QuizAnswer[]>(
    (answers) => quizAPI.submitAttempt(attemptId, answers),
  );

  const answerQuestion = useCallback(
    (questionId: string, answer: string | string[]) => {
      setAnswers((prev) => {
        const existing = prev.find((a) => a.questionId === questionId);
        if (existing) {
          return prev.map((a) =>
            a.questionId === questionId ? { ...a, answer } : a
          );
        }
        return [...prev, { questionId, answer }];
      });
    },
    []
  );

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestion((prev) => prev + 1);
  }, []);

  const goToPreviousQuestion = useCallback(() => {
    setCurrentQuestion((prev) => prev - 1);
  }, []);

  const submit = useCallback(async () => {
    return submitMutation.mutateAsync(answers);
  }, [answers, submitMutation]);

  return {
    attempt,
    answers,
    currentQuestion,
    isLoading,
    error,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    submit,
    isSubmitting: submitMutation.isLoading,
    result: submitMutation.data,
  };
}
```

---

## UI State Hooks

### useModal Hook

```typescript
// src/hooks/useModal.ts

import { useState, useCallback } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialState: boolean = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}
```

### useToast Hook

```typescript
// src/hooks/useToast.ts

import { useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface UseToastReturn {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (type: ToastType, message: string, duration: number = 5000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast: Toast = { id, type, message, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return { toasts, addToast, removeToast, clearAll };
}
```

### useTheme Hook

```typescript
// src/hooks/useTheme.ts

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const getResolvedTheme = (): 'light' | 'dark' => {
      if (theme === 'system') {
        return mediaQuery.matches ? 'dark' : 'light';
      }
      return theme;
    };

    setResolvedTheme(getResolvedTheme());

    const handleChange = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }, [resolvedTheme, setTheme]);

  return { theme, resolvedTheme, setTheme, toggleTheme };
}
```

---

## Utility Hooks

### useDebounce Hook

```typescript
// src/hooks/useDebounce.ts

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### useLocalStorage Hook

```typescript
// src/hooks/useLocalStorage.ts

import { useState, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
```

### useMediaQuery Hook

```typescript
// src/hooks/useMediaQuery.ts

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query, matches]);

  return matches;
}

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
```

---

## Form Hooks

### useForm Hook

```typescript
// src/hooks/useForm.ts

import { useState, useCallback } from 'react';
import { ZodSchema } from 'zod';

interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: ZodSchema<T>;
  onSubmit: (values: T) => Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  handleChange: (field: keyof T, value: unknown) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
  setFieldValue: (field: keyof T, value: unknown) => void;
  setFieldError: (field: keyof T, error: string) => void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback(
    (values: T): Record<string, string> => {
      if (!validationSchema) return {};

      const result = validationSchema.safeParse(values);
      if (result.success) return {};

      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        const field = error.path.join('.');
        fieldErrors[field] = error.message;
      });
      return fieldErrors;
    },
    [validationSchema]
  );

  const handleChange = useCallback((field: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field as string]: true }));
  }, []);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field as string]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field as string]: error }));
  }, []);

  const currentErrors = validate(values);
  const isValid = Object.keys(currentErrors).length === 0;
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  };
}
```

---

## Best Practices

### 1. Custom Hook Naming

```typescript
// Always start with "use"
useAuth();           // Good
useCourse();         // Good
getAuth();           // Bad
```

### 2. Keep Hooks Focused

```typescript
// Good - Single responsibility
function useUser(userId: string) { ... }
function useUserCourses(userId: string) { ... }

// Bad - Too many responsibilities
function useEverything(userId: string) { ... }
```

### 3. Use TypeScript Generics

```typescript
function useQuery<T>(key: string, fetcher: () => Promise<T>): QueryResult<T> { ... }
```

### 4. Clean Up Effects

```typescript
useEffect(() => {
  const subscription = someService.subscribe(handler);
  return () => subscription.unsubscribe();
}, []);
```

### 5. Memoize Callbacks

```typescript
const handleSubmit = useCallback(async (values: FormValues) => {
  // ...
}, [dependency]);
```

---

## References

- `src/hooks/` - All custom hooks
- `src/hooks/useAuth.ts` - Authentication hooks
- `src/hooks/useQuery.ts` - Data fetching hooks
- `src/types/` - Type definitions

---

*Last Updated: Phase 2.7 - LXP Hook Layer Documentation*
