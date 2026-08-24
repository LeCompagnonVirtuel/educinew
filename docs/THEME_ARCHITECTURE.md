# Theme Architecture — EduCI Enterprise

## Design Token System

---

## 1. Token Hierarchy

```
CSS Custom Properties (:root / .dark)
    ↓
Tailwind Config (theme.extend)
    ↓
Component Classes (utility-first)
    ↓
Component Props (variant/size)
```

---

## 2. Files

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Token definitions, scales, breakpoints |
| `globals.css` | CSS custom properties, base styles, animations |
| `components/ui/` | Reusable component library |
| `components/layout/` | Layout shells (sidebar, topbar, role layout) |

---

## 3. Multi-tenant Theming

Schools can customize:
- Logo (via branding settings)
- School name
- Primary accent color (future)
- Favicon

The theme system supports this via:
- `BrandingProvider` context
- CSS custom properties (overridable per tenant)
- `useBranding()` hook for runtime theming

### Future Theme Variants
- EduCI Default (Orange/Green)
- School Custom (school's accent color)
- Government (formal blue/gold)
- Enterprise (neutral gray)

---

## 4. Dark Mode Implementation

Triggered by adding `class="dark"` to `<html>`.

### Token Mapping (Light → Dark)

| Token | Light | Dark |
|-------|-------|------|
| `--color-background` | #F8FAFC | #0C0F1A |
| `--color-surface` | #FFFFFF | #151926 |
| `--color-surface-muted` | #F1F5F9 | #1C2132 |
| `--color-text-primary` | #111827 | #F1F5F9 |
| `--color-text-secondary` | #64748B | #94A3B8 |
| `--color-border` | #E2E8F0 | #2D3348 |

### Rules
- Brand colors (orange, green) remain unchanged in dark mode
- Surfaces use deep navy/graphite (never pure black)
- Shadows become deeper with higher opacity
- Borders become more subtle

---

## 5. Breakpoint System

| Token | Pixels | Target |
|-------|--------|--------|
| xs | 375px | Small phones |
| sm | 640px | Large phones, landscape |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1440px | Large desktops |
| 3xl | 1920px | Ultra-wide |

---

## 6. Animation Tokens

| Name | Duration | Easing | Use |
|------|----------|--------|-----|
| `fade-in` | 400ms | spring | Element entrance |
| `slide-up` | 500ms | spring | Page content |
| `slide-down` | 300ms | spring | Dropdowns |
| `scale-in` | 300ms | spring | Modals, popovers |
| `shimmer` | 1500ms | linear | Skeleton loading |

All animations are disabled when `prefers-reduced-motion: reduce` is set.

---

## 7. Icon System

**Primary library:** Lucide React (212 files import it)
**Secondary:** Material Symbols (3 files — being phased out)
**Motion:** Framer Motion (28 files)

Rule: Use Lucide React exclusively for new components.

---

## 8. RTL / i18n Readiness

- Layouts use flexbox (direction-agnostic)
- No fixed `left:` / `right:` positioning on structural elements
- Text content via `useLanguage()` hook
- No hardcoded French strings in design tokens
