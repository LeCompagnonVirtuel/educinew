# Subscriptions — EduCI Enterprise

## Plans

| Plan | Max Users | Max Students | Storage | API Quota | Monthly Price |
|------|-----------|-------------|---------|-----------|---------------|
| Starter | 25 | 250 | 5 GB | 10K | 29,000 XOF |
| Professional | 100 | 1,000 | 20 GB | 100K | 79,000 XOF |
| Business | 250 | 2,500 | 50 GB | 500K | 149,000 XOF |
| Enterprise | 500 | 5,000 | 100 GB | 1M | 299,000 XOF |
| Custom | Unlimited | Unlimited | Unlimited | Unlimited | Custom |

## Management

- Create subscription
- Cancel subscription
- Renew subscription
- Change plan (upgrade only)
- Apply coupons/discounts
- Trial period (14 days default)

## Billing

- Monthly/Quarterly/Annual cycles
- Automatic invoicing
- Payment gateway integration (Stripe, PayPal, Wave, Orange Money, MTN Money)
- Dunning for failed payments

## API

- `GET /api/enterprise/subscriptions` — List
- `POST /api/enterprise/subscriptions` — Create
- `GET /api/enterprise/subscriptions/[id]` — Single
- `PUT /api/enterprise/subscriptions/[id]` — Update
- `POST /api/enterprise/subscriptions/[id]/cancel` — Cancel
- `POST /api/enterprise/subscriptions/[id]/renew` — Renew
- `POST /api/enterprise/subscriptions/[id]/change-plan` — Change plan
