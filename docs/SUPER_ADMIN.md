# Super Admin Dashboard — EduCI Enterprise

## Overview

The Super Admin Dashboard provides global visibility across all EduCI schools with real-time KPIs, revenue metrics, growth analytics, and system health monitoring.

## KPIs

- Total Schools
- Active Schools
- Total Students
- Total Teachers
- Total Users
- Active Subscriptions
- Trial Subscriptions
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- Revenue Growth
- Expired Schools
- Suspended Schools
- Storage Used
- API Requests This Month
- System Errors
- Average Response Time
- Server Load

## Access

Role: `super_admin` only.

## API

- `GET /api/enterprise/dashboard` — Returns EnterpriseDashboard object
- `GET /api/enterprise/statistics` — Returns EnterpriseStatistics
- `GET /api/enterprise/analytics/snapshot?date=YYYY-MM-DD` — Daily snapshot
- `GET /api/enterprise/analytics/range?start=YYYY-MM-DD&end=YYYY-MM-DD` — Range analytics

## Mobile

EnterpriseDashboardScreen provides the same KPIs on mobile.
