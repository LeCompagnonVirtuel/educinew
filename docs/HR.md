# Human Resources & Personnel Module - EduCI Enterprise

## Overview

The HR & Personnel module provides comprehensive human resource management for schools in Côte d'Ivoire and Africa. It handles employee lifecycle management, contracts, leaves, attendance, training, certifications, performance reviews, recruitment, disciplinary actions, payroll references, and HR analytics.

## Architecture

DDD pattern: Types → Validators → Repository → Services → Hooks → Pages → API

## API Routes (97 routes)

- `/api/hr/[schoolId]/employees` — Employee CRUD
- `/api/hr/[schoolId]/employees/[employeeId]` — Single employee
- `/api/hr/[schoolId]/employees/search` — Search employees
- `/api/hr/[schoolId]/employees/code` — Generate employee code
- `/api/hr/[schoolId]/employees/statistics` — Employee statistics
- `/api/hr/[schoolId]/employees/[employeeId]/documents` — Employee documents
- `/api/hr/[schoolId]/employees/[employeeId]/documents/[documentId]` — Single document
- `/api/hr/[schoolId]/employees/[employeeId]/schedules` — Employee schedules
- `/api/hr/[schoolId]/employees/[employeeId]/schedules/[scheduleId]` — Single schedule
- `/api/hr/[schoolId]/employees/[employeeId]/attendance` — Employee attendance
- `/api/hr/[schoolId]/employees/[employeeId]/contracts` — Employee contracts
- `/api/hr/[schoolId]/employees/[employeeId]/contracts/[contractId]` — Single contract
- `/api/hr/[schoolId]/employees/[employeeId]/leaves` — Employee leaves
- `/api/hr/[schoolId]/employees/[employeeId]/leaves/[leaveId]` — Single leave
- `/api/hr/[schoolId]/employees/[employeeId]/trainings` — Employee trainings
- `/api/hr/[schoolId]/employees/[employeeId]/certifications` — Employee certifications
- `/api/hr/[schoolId]/employees/[employeeId]/certifications/[certificationId]` — Single certification
- `/api/hr/[schoolId]/employees/[employeeId]/performance` — Performance reviews
- `/api/hr/[schoolId]/employees/[employeeId]/performance/[reviewId]` — Single review
- `/api/hr/[schoolId]/employees/[employeeId]/objectives` — Objectives
- `/api/hr/[schoolId]/employees/[employeeId]/objectives/[objectiveId]` — Single objective
- `/api/hr/[schoolId]/employees/[employeeId]/promotions` — Promotions
- `/api/hr/[schoolId]/employees/[employeeId]/promotions/[promotionId]` — Single promotion
- `/api/hr/[schoolId]/employees/[employeeId]/transfers` — Transfers
- `/api/hr/[schoolId]/employees/[employeeId]/transfers/[transferId]` — Single transfer
- `/api/hr/[schoolId]/employees/[employeeId]/terminations` — Terminations
- `/api/hr/[schoolId]/employees/[employeeId]/terminations/[terminationId]` — Single termination
- `/api/hr/[schoolId]/employees/[employeeId]/disciplinary` — Disciplinary actions
- `/api/hr/[schoolId]/employees/[employeeId]/disciplinary/[actionId]` — Single action
- `/api/hr/[schoolId]/employees/[employeeId]/rewards` — Rewards
- `/api/hr/[schoolId]/employees/[employeeId]/timeline` — Employee timeline
- `/api/hr/[schoolId]/departments` — Department CRUD
- `/api/hr/[schoolId]/departments/[departmentId]` — Single department
- `/api/hr/[schoolId]/positions` — Position CRUD
- `/api/hr/[schoolId]/positions/[positionId]` — Single position
- `/api/hr/[schoolId]/contracts` — Contract CRUD
- `/api/hr/[schoolId]/contracts/[contractId]` — Single contract
- `/api/hr/[schoolId]/leaves` — Leave CRUD
- `/api/hr/[schoolId]/leaves/[leaveId]` — Single leave
- `/api/hr/[schoolId]/leaves/[leaveId]/approve` — Approve leave
- `/api/hr/[schoolId]/leaves/pending` — Pending leaves
- `/api/hr/[schoolId]/trainings` — Training CRUD
- `/api/hr/[schoolId]/trainings/[trainingId]` — Single training
- `/api/hr/[schoolId]/trainings/[trainingId]/enrollments` — Training enrollments
- `/api/hr/[schoolId]/certifications` — Certification CRUD
- `/api/hr/[schoolId]/certifications/[certificationId]` — Single certification
- `/api/hr/[schoolId]/performance` — Performance review CRUD
- `/api/hr/[schoolId]/performance/[reviewId]` — Single review
- `/api/hr/[schoolId]/objectives` — Objective CRUD
- `/api/hr/[schoolId]/objectives/[objectiveId]` — Single objective
- `/api/hr/[schoolId]/promotions` — Promotion CRUD
- `/api/hr/[schoolId]/promotions/[promotionId]` — Single promotion
- `/api/hr/[schoolId]/transfers` — Transfer CRUD
- `/api/hr/[schoolId]/transfers/[transferId]` — Single transfer
- `/api/hr/[schoolId]/terminations` — Termination CRUD
- `/api/hr/[schoolId]/terminations/[terminationId]` — Single termination
- `/api/hr/[schoolId]/disciplinary` — Disciplinary action CRUD
- `/api/hr/[schoolId]/disciplinary/[actionId]` — Single action
- `/api/hr/[schoolId]/recruitments` — Recruitment CRUD
- `/api/hr/[schoolId]/recruitments/[recruitmentId]` — Single recruitment
- `/api/hr/[schoolId]/candidates` — Candidate CRUD
- `/api/hr/[schoolId]/candidates/[candidateId]` — Single candidate
- `/api/hr/[schoolId]/interviews` — Interview CRUD
- `/api/hr/[schoolId]/interviews/[interviewId]` — Single interview
- `/api/hr/[schoolId]/job-offers` — Job offer CRUD
- `/api/hr/[schoolId]/job-offers/[offerId]` — Single job offer
- `/api/hr/[schoolId]/documents` — All documents
- `/api/hr/[schoolId]/schedules` — Schedule CRUD
- `/api/hr/[schoolId]/schedules/[scheduleId]` — Single schedule
- `/api/hr/[schoolId]/shifts` — Shift CRUD
- `/api/hr/[schoolId]/shifts/[shiftId]` — Single shift
- `/api/hr/[schoolId]/attendance/clock-in` — Clock in
- `/api/hr/[schoolId]/attendance/clock-out` — Clock out
- `/api/hr/[schoolId]/attendance` — Attendance list
- `/api/hr/[schoolId]/benefits` — Benefit CRUD
- `/api/hr/[schoolId]/benefits/[benefitId]` — Single benefit
- `/api/hr/[schoolId]/deductions` — Deduction CRUD
- `/api/hr/[schoolId]/deductions/[deductionId]` — Single deduction
- `/api/hr/[schoolId]/allowances` — Allowance CRUD
- `/api/hr/[schoolId]/allowances/[allowanceId]` — Single allowance
- `/api/hr/[schoolId]/salary-scales` — Salary scale CRUD
- `/api/hr/[schoolId]/salary-scales/[scaleId]` — Single salary scale
- `/api/hr/[schoolId]/notifications` — HR notifications
- `/api/hr/[schoolId]/dashboard` — HR dashboard
- `/api/hr/[schoolId]/analytics` — HR analytics
- `/api/hr/[schoolId]/statistics` — HR statistics
- `/api/hr/[schoolId]/audit` — HR audit
- `/api/hr/[schoolId]/search` — HR search
- `/api/hr/[schoolId]/export` — HR export
- `/api/hr/[schoolId]/import` — HR import
- `/api/hr/[schoolId]/settings` — HR settings
- `/api/hr/[schoolId]/sync` — HR sync
- `/api/hr/[schoolId]/reports` — HR reports
- `/api/hr/[schoolId]/payroll-references` — Payroll reference CRUD
- `/api/hr/[schoolId]/payroll-references/[referenceId]` — Single payroll reference
- `/api/hr/[schoolId]/rewards` — Reward CRUD
- `/api/hr/[schoolId]/rewards/[rewardId]` — Single reward

## Services (35 services)

EmployeeService, DepartmentService, PositionService, ContractService, LeaveService, AttendanceHrService, ShiftService, TrainingService, CertificationService, RecruitmentService, CandidateService, InterviewService, PerformanceService, ObjectiveService, PromotionService, TransferService, TerminationService, DisciplinaryService, RewardService, DocumentService, NotificationService, DashboardService, AnalyticsService, StatisticsService, AuditService, PermissionService, SearchService, ValidationService, TimelineService, ImportService, ExportService, SettingsService, SyncService, ReportService, PayrollReferenceService

## Hooks (38 hooks)

All HR operations are exposed through React hooks for seamless UI integration.

## Configuration (35 sections)

HR_EMPLOYEE_STATUSES, HR_CONTRACT_TYPES, HR_DEPARTMENT_TYPES, HR_LEAVE_TYPES, HR_LEAVE_STATUSES, HR_PERFORMANCE_STATUSES, HR_PERFORMANCE_LEVELS, HR_RECRUITMENT_STATUSES, HR_INTERVIEW_STATUSES, HR_TRAINING_STATUSES, HR_DOCUMENT_TYPES, HR_SHIFT_TYPES, HR_TERMINATION_REASONS, HR_PROMOTION_STATUSES, HR_TRANSFER_STATUSES, HR_DISCIPLINARY_STATUSES, HR_DISCIPLINARY_TYPES, HR_RECRUITMENT_PIPELINES, HR_EMPLOYEE_GENDERS, HR_MARITAL_STATUSES, HR_BENEFIT_TYPES, HR_DEDUCTION_TYPES, HR_PERMISSIONS, HR_NOTIFICATIONS, HR_EXPORT, HR_IMPORT, HR_SYNC, HR_ANALYTICS, HR_REPORTS

## Mobile Support

React Native screens for employee management, leave requests, attendance, training, performance reviews, and HR dashboard.
