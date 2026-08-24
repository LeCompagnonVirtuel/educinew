# EduCI Enterprise Design System

## Ivorian Premium Identity

Version: 2.0
Status: Active

---

## 1. Brand Colors

### Primary — Ivorian Orange
The primary action color, inspired by the Ivorian flag.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-50` | #FFF7ED | Backgrounds, highlights |
| `primary-100` | #FFEDD5 | Hover states |
| `primary-500` | #F77F00 | **Primary CTA**, active elements |
| `primary-600` | #EA580C | Hover on primary |
| `primary-700` | #C2410C | Pressed state |
| `primary-900` | #7C2D12 | Dark text on light orange bg |

### Secondary — Ivorian Green
Success, validation, growth indicators.

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary-50` | #ECFDF5 | Success backgrounds |
| `secondary-500` | #009E60 | **Success states**, positive data |
| `secondary-600` | #059669 | Hover |
| `secondary-700` | #047857 | Pressed |

### Neutrals

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | #F8FAFC | Page background |
| `surface-bright` | #FFFFFF | Cards, elevated surfaces |
| `surface-muted` | #F1F5F9 | Subtle backgrounds |
| `foreground` | #111827 | Primary text |
| `foreground-secondary` | #64748B | Secondary text |
| `foreground-muted` | #94A3B8 | Muted text, placeholders |
| `border` | #E2E8F0 | Default borders |

### Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | #009E60 | Confirmation, positive |
| `warning` | #F59E0B | Caution, attention |
| `danger` | #DC2626 | Errors, destructive |
| `info` | #2563EB | Informational |
| `ai` | #8B5CF6 | AI features accent |

---

## 2. Typography

**Primary Font:** Inter (body, labels, captions)
**Display Font:** Plus Jakarta Sans (headings, KPIs)
**Mono Font:** JetBrains Mono (code, tabular data)

### Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 3rem | 800 | 1.1 | Hero sections |
| `h1` | 2.25rem | 700 | 1.2 | Page titles |
| `h2` | 1.875rem | 700 | 1.25 | Section titles |
| `h3` | 1.5rem | 600 | 1.3 | Card titles |
| `h4` | 1.25rem | 600 | 1.4 | Subsections |
| `body-lg` | 1.125rem | 400 | 1.6 | Featured text |
| `body` | 0.9375rem | 400 | 1.6 | Default body |
| `body-sm` | 0.8125rem | 400 | 1.5 | Compact text |
| `caption` | 0.75rem | 500 | 1.4 | Labels, metadata |
| `label` | 0.8125rem | 500 | 1.0 | Form labels |

---

## 3. Spacing

Based on 4px unit:

| Token | Value |
|-------|-------|
| `1` | 4px |
| `2` | 8px |
| `3` | 12px |
| `4` | 16px |
| `5` | 20px |
| `6` | 24px |
| `8` | 32px |
| `10` | 40px |
| `12` | 48px |
| `16` | 64px |
| `20` | 80px |
| `24` | 96px |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 6px | Badges, tags, small elements |
| `md` | 10px | Buttons, inputs, cards |
| `lg` | 14px | Cards, panels |
| `xl` | 20px | Modals, large panels |
| `2xl` | 28px | Hero elements |

---

## 5. Shadows

| Token | Usage |
|-------|-------|
| `xs` | Subtle depth |
| `sm` | Default cards |
| `md` | Hover states |
| `lg` | Dropdowns, popovers |
| `xl` | Modals, overlays |
| `card` | Default card shadow |
| `card-hover` | Card hover with orange tint |
| `float` | Floating elements |

---

## 6. Motion

| Token | Duration | Usage |
|-------|----------|-------|
| `fast` | 150ms | Hover, active states |
| `normal` | 250ms | Standard transitions |
| `slow` | 400ms | Page transitions, modals |
| `ease-spring` | cubic-bezier(0.16, 1, 0.3, 1) | Spring animations |
| `ease-smooth` | cubic-bezier(0.4, 0, 0.2, 1) | Standard ease |

---

## 7. Components

### Available in `@/components/ui`:

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, danger, ghost, outline variants |
| `Card` | Surface container with CardHeader, CardContent, CardFooter |
| `Badge` | Status indicators with dot variant |
| `Modal` | Dialog with title, description, footer |
| `DataTable` | Searchable, paginated data table |
| `EmptyState` | Zero-state with icon, title, action |
| `Skeleton` | Loading placeholder with shimmer |
| `StatCard` | KPI card with trend indicator |
| `Input` | Form input with label, error, hint |
| `Alert` | Info, success, warning, danger alerts |
| `Tabs` | Tabbed navigation with badges |
| `Toast` | Notification toast |
| `Progress` | Progress bar |
| `Avatar` | User avatar with initials fallback |
| `Tooltip` | Hover tooltip |
| `Switch` | Toggle switch |

---

## 8. Dark Mode

Activated via `class="dark"` on `<html>`.

Dark mode uses deep navy/graphite surfaces (not pure black):
- Background: #0C0F1A
- Surface: #151926
- Raised: #1E2335
- Borders: #2D3348

---

## 9. Responsive Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `xs` | 375px | Small phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1440px | Large desktops |
| `3xl` | 1920px | Ultra-wide |

---

## 10. Accessibility

- All interactive elements have `focus-visible` outlines (orange ring)
- Touch targets minimum 44px on mobile
- `prefers-reduced-motion` disables all animations
- WCAG AA contrast ratios enforced
- Semantic HTML + ARIA attributes on all components
