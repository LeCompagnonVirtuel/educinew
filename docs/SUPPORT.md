# Support Center — EduCI Enterprise

## Overview

Ticket-based support system with priority, SLA, assignment, escalation, and internal notes.

## Ticket Lifecycle

1. Open → In Progress → Resolved → Closed
2. Open → Escalated → In Progress → Resolved → Closed
3. Open → Waiting → In Progress → Resolved → Closed

## Priorities & SLA

| Priority | SLA Response |
|----------|-------------|
| Low | 72 hours |
| Medium | 24 hours |
| High | 8 hours |
| Urgent | 4 hours |
| Critical | 1 hour |

## Categories

- Bug
- Feature Request
- Account
- Billing
- Technical
- Training
- Other

## API

- `GET /api/enterprise/tickets` — List tickets
- `POST /api/enterprise/tickets` — Create ticket
- `GET /api/enterprise/tickets/[id]` — Single ticket
- `PUT /api/enterprise/tickets/[id]` — Update ticket
- `POST /api/enterprise/tickets/[id]/assign` — Assign
- `POST /api/enterprise/tickets/[id]/escalate` — Escalate
- `POST /api/enterprise/tickets/[id]/resolve` — Resolve
- `POST /api/enterprise/tickets/[id]/close` — Close
- `GET /api/enterprise/tickets/[id]/messages` — Messages
- `POST /api/enterprise/tickets/[id]/messages` — Add message

## Mobile

TicketListScreen and TicketDetailScreen provide full support on mobile.
