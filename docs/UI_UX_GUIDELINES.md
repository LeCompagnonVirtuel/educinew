# EduCI UI/UX Guidelines

## Enterprise Design Principles

---

## 1. Visual Hierarchy

Every page must follow this information hierarchy:

1. **KPIs** — Key numbers at a glance
2. **Charts/Trends** — Visual data evolution
3. **Recent Activity** — What happened recently
4. **Quick Actions** — What can be done now
5. **Secondary Info** — Details and metadata

---

## 2. Color Usage Rules

### Primary (Orange #F77F00)
- CTA buttons
- Active navigation items
- Progress indicators
- Selected states
- Brand elements

### Secondary (Green #009E60)
- Success messages
- Positive trends
- Validation checkmarks
- Growth indicators

### Never
- Don't use orange for error states
- Don't use more than 2 accent colors per view
- Don't use raw hex values — always use tokens

---

## 3. Component Patterns

### Cards
- Always use `rounded-lg` (14px)
- Border: `border-border` (subtle)
- Shadow: `shadow-card` (minimal)
- Hover: `shadow-card-hover` (orange tint on interactive)
- Padding: `p-5` or `p-6`

### Buttons
- Primary: Orange background, white text
- Secondary: Green (use sparingly)
- Ghost: For toolbar actions
- Outline: For secondary actions
- Always include loading state
- Min height 44px on mobile

### Tables
- Rounded border container
- Sticky header (bg-surface-muted)
- Hover rows: subtle primary tint
- Always paginate (10 items default)
- Search bar above table
- Empty state when no data

### Forms
- Label above input
- Required fields marked with red asterisk
- Error messages below input (red)
- Hint text below input (muted)
- Group related fields
- Max 3 columns on desktop

---

## 4. Responsive Rules

### Mobile (< 640px)
- Single column layout
- Tables convert to cards/lists
- Bottom navigation visible
- Sidebar becomes drawer
- Touch targets >= 44px
- No hover-only interactions

### Tablet (768px - 1024px)
- 2 column grids
- Sidebar collapsed by default
- Tables scrollable horizontally

### Desktop (> 1024px)
- Full sidebar
- 3-4 column grids for KPIs
- Tables with all columns visible

---

## 5. Dark Mode

- Use CSS custom properties for all colors
- Never use hardcoded colors (#fff, #000)
- Dark surfaces: deep navy, not pure black
- Maintain WCAG AA contrast in both modes
- Borders become lighter/more subtle in dark mode

---

## 6. Loading States

Every async operation must show:
1. **Skeleton** for initial page loads
2. **Spinner** inside buttons during actions
3. **Progress** for multi-step operations
4. **Optimistic updates** where possible

Never show a blank page.

---

## 7. Empty States

Every list/table must have an empty state with:
1. Relevant icon (not generic)
2. Clear title ("Aucun eleve")
3. Helpful description
4. Action button ("Ajouter un eleve")

---

## 8. Error States

- Inline errors for form fields
- Toast for action errors
- Alert banner for page-level errors
- Never show raw error messages to users
- Always provide a recovery action

---

## 9. Animation Rules

- Duration: 150-400ms max
- Easing: `ease-spring` for entrances
- Purpose: guide attention, confirm actions
- Never: decorative, slow, blocking
- Respect `prefers-reduced-motion`

---

## 10. AI Feature Identity

AI features use a subtle purple accent (#8B5CF6):
- AI badge/tag on AI-generated content
- Sparkle icon for AI features
- Don't overuse — AI is a tool, not the brand
