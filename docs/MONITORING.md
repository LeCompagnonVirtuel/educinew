# Monitoring — EduCI Enterprise

## Overview

Real-time monitoring of all EduCI system components including API, database, storage, realtime, email, SMS, and cron jobs.

## Monitored Services

- API (response time, error rate)
- Database (connections, query time)
- Storage (usage, bandwidth)
- Realtime (connections, latency)
- Email (delivery rate, bounces)
- SMS (delivery rate, costs)
- Cron Jobs (success rate, duration)

## Health Checks

- `GET /api/enterprise/monitoring/health` — System health status
- `GET /api/enterprise/health` — Health check endpoint

## Events

- `GET /api/enterprise/monitoring/events` — List events
- `POST /api/enterprise/monitoring/events` — Create event
- `POST /api/enterprise/monitoring/events/[eventId]/resolve` — Resolve event

## Alerts

- CPU > 80%
- RAM > 85%
- Disk > 90%
- Response Time > 2000ms
- Error Rate > 5%

## Maintenance

- `GET /api/enterprise/maintenance` — List windows
- `POST /api/enterprise/maintenance` — Create window
- Automatic notifications 24h before maintenance

## Mobile

MonitoringScreen provides real-time status on mobile.
