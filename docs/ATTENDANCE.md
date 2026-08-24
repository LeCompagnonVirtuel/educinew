# Module Présences — EduCI

## Architecture

Le module de gestion des présences suit l'architecture DDD avec Repository Pattern, Service Layer, et Hook Layer.

### Structure des fichiers

```
features/attendance/
├── types.ts                    # Types du module
├── validators/
│   ├── schemas.ts             # 30 schémas Zod
│   └── index.ts
├── repositories/
│   ├── attendance.repository.ts # Repository Supabase (50+ méthodes)
│   └── index.ts
├── services/                   # 20 services
│   ├── attendance.service.ts
│   ├── student-attendance.service.ts
│   ├── teacher-attendance.service.ts
│   ├── session.service.ts
│   ├── qr.service.ts
│   ├── gps.service.ts
│   ├── nfc.service.ts
│   ├── face.service.ts
│   ├── validation.service.ts
│   ├── analytics.service.ts
│   ├── statistics.service.ts
│   ├── dashboard.service.ts
│   ├── notification.service.ts
│   ├── alert.service.ts
│   ├── timeline.service.ts
│   ├── correction.service.ts
│   ├── report.service.ts
│   ├── import.service.ts
│   ├── export.service.ts
│   ├── audit.service.ts
│   └── index.ts
└── hooks/                      # 60 hooks React
    ├── useAttendance.ts
    ├── useAttendances.ts
    ├── useCreateAttendance.ts
    ├── ... (60 hooks)
    └── index.ts
```

### API Routes

```
api/attendance/
├── route.ts                   # GET/POST
├── [id]/route.ts              # GET/PATCH/DELETE
├── bulk/route.ts              # POST
├── teacher/route.ts           # GET/POST
├── session/route.ts           # GET/POST
├── session/[id]/route.ts      # GET/DELETE
├── session/[id]/end/route.ts  # POST
├── qr/validate/route.ts       # POST
├── gps/validate/route.ts      # POST
├── nfc/validate/route.ts      # POST
├── face/validate/route.ts     # POST
├── sync/route.ts              # GET/POST
├── correction/route.ts        # GET/POST
├── correction/[id]/approve/route.ts
├── correction/[id]/reject/route.ts
├── justification/route.ts     # GET/POST
├── import/route.ts            # POST
├── export/route.ts            # POST
├── history/route.ts           # GET
├── analytics/route.ts         # GET
├── alerts/route.ts            # GET
├── alerts/consecutive/route.ts
├── alerts/low/route.ts
├── alerts/late/route.ts
├── alerts/[id]/resolve/route.ts
├── notifications/route.ts     # GET
├── notifications/[id]/read/route.ts
├── settings/route.ts          # GET/PUT
├── policy/route.ts            # GET
├── statistics/route.ts        # GET
├── dashboard/route.ts         # GET
├── timeline/route.ts          # GET
├── report/route.ts            # GET/POST
├── device/route.ts            # GET
├── device/[id]/route.ts       # GET
├── location/route.ts          # GET
├── location/[id]/route.ts     # GET
├── rate/route.ts              # GET
├── class-rate/route.ts        # GET
├── level-rate/route.ts        # GET
├── map/route.ts               # GET
├── heatmap/route.ts           # GET
├── trend/route.ts             # GET
├── comparison/route.ts        # GET
├── breakdown/route.ts         # GET
├── by-day/route.ts            # GET
├── by-week/route.ts           # GET
├── by-month/route.ts          # GET
├── audit/route.ts             # GET
├── audit/recent/route.ts      # GET
└── audit/history/route.ts     # GET
```

## Types principaux

- `Attendance` — Présence d'un élève
- `TeacherAttendance` — Présence d'un enseignant
- `AttendanceSession` — Session de prise de présence
- `AttendanceStatistics` — Statistiques globales
- `AttendanceDashboard` — Tableau de bord
- `AttendanceTimeline` — Chronologie
- `AttendanceReport` — Rapport
- `AttendanceAlert` — Alerte
- `AttendanceNotification` — Notification
- `AttendanceCorrection` — Correction de présence
- `AttendanceJustification` — Justification d'absence

## Méthodes de pointage

1. **Manuel** — Saisie par l'enseignant
2. **QR Code** — Scan par l'élève
3. **GPS** — Géolocalisation
4. **NFC** — Badgeage
5. **Reconnaissance faciale** — Caméra

## Configuration

- `ATTENDANCE_THRESHOLDS` — Seuils d'alerte (absences consécutives, taux faible)
- `ATTENDANCE_GPS` — Rayon de validité GPS
- `ATTENDANCE_QR` — Expiration des QR codes
- `ATTENDANCE_NOTIFICATIONS` — Paramètres de notification
- `ATTENDANCE_PERMISSIONS` — Permissions par rôle

## Tests

419 tests couvrant :
- Types (38 tests)
- Erreurs (34 tests)
- Configuration (36 tests)
- Validators (48 tests)
- Permissions (11 tests)
- Data flow (16 tests)
- Services (29 tests)
- Repositories (12 tests)
- Hooks (20 tests)
- API routes (20 tests)
- Import/Export (15 tests)
- Analytics (10 tests)
- Sessions/QR/GPS/NFC (22 tests)
- Offline sync (18 tests)
- Notifications (16 tests)
- Dashboard (9 tests)
- Reports (9 tests)
- Statistics (9 tests)
- Audit (8 tests)
