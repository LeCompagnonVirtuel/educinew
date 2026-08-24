# Accessibility — EduCI Enterprise

## WCAG 2.2 AA Compliance Guide

---

## 1. Current State

| Metric | Value | Target |
|--------|-------|--------|
| aria-attributes | 164 occurrences / 111 files | All interactive elements |
| Focus-visible | Global via globals.css | Maintained |
| Touch targets | 44px on mobile (enforced) | 44px minimum |
| Reduced motion | Supported via media query | All animations |
| Dark mode contrast | Partial | WCAG AA 4.5:1 |

---

## 2. Color Contrast Requirements

### Light Mode

| Pair | Ratio | Status |
|------|-------|--------|
| Text (#111827) on Background (#F8FAFC) | 15.4:1 | PASS |
| Secondary text (#64748B) on White | 5.1:1 | PASS |
| Muted text (#94A3B8) on White | 3.2:1 | FAIL (decorative only) |
| Orange (#F77F00) on White | 3.1:1 | Use only for large text/icons |
| Green (#009E60) on White | 4.6:1 | PASS |
| White on Orange (#F77F00) | 3.1:1 | PASS for large text + icons |

### Dark Mode

| Pair | Ratio | Status |
|------|-------|--------|
| Text (#F1F5F9) on Surface (#151926) | 14.2:1 | PASS |
| Secondary (#94A3B8) on Surface | 5.8:1 | PASS |
| Orange (#F77F00) on Surface | 5.2:1 | PASS |

---

## 3. Keyboard Navigation

All interactive elements must be:
- Focusable via Tab
- Activatable via Enter/Space
- Navigable via arrow keys (menus, tabs)
- Dismissable via Escape (modals, dropdowns)

Focus ring: 2px solid orange, 2px offset.

---

## 4. Screen Reader Support

### Required ARIA Patterns

| Component | Required Attributes |
|-----------|-------------------|
| Button | Implicit role, aria-label if icon-only |
| Modal | role="dialog", aria-modal="true", aria-label |
| Tabs | role="tablist", role="tab", aria-selected |
| Alert | role="alert" |
| Progress | role="progressbar", aria-valuenow |
| Switch | role="switch", aria-checked |
| Table | Semantic HTML (thead/tbody) |
| Navigation | aria-label, aria-current |

---

## 5. Form Accessibility

- Labels associated via `htmlFor`/`id`
- Required fields: `aria-required="true"` + visual asterisk
- Error messages: `aria-invalid="true"` + `aria-describedby`
- Hint text: linked via `aria-describedby`
- Error announcements: `role="alert"`

---

## 6. Motion and Animation

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

All animations are purely decorative and disable completely for users who prefer reduced motion.

---

## 7. Touch Targets

Mobile enforced minimum:
```css
@media (max-width: 768px) {
  button, a[role="button"], [role="tab"] {
    min-height: 44px;
    min-width: 44px;
  }
}
```

---

## 8. Images

- All images use `alt` text
- Decorative images use `alt=""`
- Icons within interactive elements have `aria-label` on parent
- SVG icons: `aria-hidden="true"` when redundant with text
