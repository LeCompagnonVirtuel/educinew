# Interoperability — Transcripts & Academic Records

> Version : 1.0
> Statut : Validé

---

## 1. Standards Supportés

| Standard | Format | Usage |
|----------|--------|-------|
| PESC | XML | Transfert international |
| EDI | EDIFACT | Systèmes legacy |
| CSV | CSV standard | Import simple |
| JSON | JSON Schema | API native |
| W3C VC | JSON-LD | Certificats vérifiables |

---

## 2. Transcript Data Model

```typescript
interface AcademicTranscript {
  metadata: {
    institution: {
      name: string;
      code: string;
      country: string;
      accreditation: string;
    };
    student: {
      id: string;
      national_id?: string;
      date_of_birth: string;
      place_of_birth?: string;
    };
    program: {
      name: string;
      level: string;
      field?: string;
      start_date: string;
      end_date?: string;
    };
    generated_at: string;
    transcript_id: string;
  };
  records: AcademicRecord[];
  summary: TranscriptSummary;
}

interface AcademicRecord {
  period: string;
  courses: CourseRecord[];
  period_average: number;
  period_rank?: number;
  credits_earned: number;
  status: "pass" | "fail" | "conditional" | "in_progress";
}

interface CourseRecord {
  course_id: string;
  course_name: string;
  credits: number;
  teacher?: string;
  assessments: Assessment[];
  final_grade: number;
  grade_scale: string;
  letter_grade?: string;
  status: "pass" | "fail" | "absent" | "excused";
}

interface Assessment {
  type: "exam" | "homework" | "participation" | "project" | "oral";
  name: string;
  weight: number;
  score: number;
  max_score: number;
  date: string;
}

interface TranscriptSummary {
  total_credits: number;
  credits_earned: number;
  overall_average: number;
  overall_rank?: number;
  class_size?: number;
  honors?: string;
  date_issued: string;
}
```

---

## 3. Transcript Export

### 3.1 PESC XML Format

```typescript
class PESCExporter {
  export(transcript: AcademicTranscript): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Transcript>
  <Header>
    <TranscriptID>${transcript.metadata.transcript_id}</TranscriptID>
    <GeneratedDate>${transcript.metadata.generated_at}</GeneratedDate>
  </Header>
  <Student>
    <StudentID>${transcript.metadata.student.id}</StudentID>
    ${transcript.metadata.student.national_id
      ? `<NationalID>${transcript.metadata.student.national_id}</NationalID>`
      : ""}
    <DateOfBirth>${transcript.metadata.student.date_of_birth}</DateOfBirth>
  </Student>
  <Institution>
    <InstitutionName>${transcript.metadata.institution.name}</InstitutionName>
    <InstitutionCode>${transcript.metadata.institution.code}</InstitutionCode>
    <Country>${transcript.metadata.institution.country}</Country>
  </Institution>
  <Program>
    <ProgramName>${transcript.metadata.program.name}</ProgramName>
    <Level>${transcript.metadata.program.level}</Level>
  </Program>
  <Records>
    ${transcript.records.map(period => `
    <Period>
      <PeriodName>${period.period}</PeriodName>
      <Courses>
        ${period.courses.map(course => `
        <Course>
          <CourseName>${course.course_name}</CourseName>
          <Credits>${course.credits}</Credits>
          <FinalGrade>${course.final_grade}</FinalGrade>
          <Status>${course.status}</Status>
        </Course>`).join("")}
      </Courses>
      <PeriodAverage>${period.period_average}</PeriodAverage>
    </Period>`).join("")}
  </Records>
  <Summary>
    <TotalCredits>${transcript.summary.total_credits}</TotalCredits>
    <OverallAverage>${transcript.summary.overall_average}</OverallAverage>
    <DateIssued>${transcript.summary.date_issued}</DateIssued>
  </Summary>
</Transcript>`;

    return xml;
  }
}
```

### 3.2 W3C Verifiable Transcript

```typescript
class VerifiableTranscriptIssuer {
  async issue(transcript: AcademicTranscript): Promise<Credential> {
    return this.credentialIssuer.issueCredential({
      type: ["VerifiableCredential", "AcademicTranscript"],
      subject_id: transcript.metadata.student.id,
      subject_did: await this.resolveDID(transcript.metadata.student.id),
      claims: {
        institution: transcript.metadata.institution,
        program: transcript.metadata.program,
        records: transcript.records,
        summary: transcript.summary
      },
      expiration: this.calculateExpiration(transcript)
    });
  }
}
```

---

## 4. API Endpoints

### 4.1 Generate Transcript

```http
POST /api/v1/interop/transcripts/generate
```

**Request Body:**
```json
{
  "student_id": "student_456",
  "school_id": "school_123",
  "format": "pesc_xml",
  "periods": ["2025-S1", "2025-S2", "2026-S1"],
  "include_details": true,
  "language": "fr"
}
```

**Response 200:**
```json
{
  "transcript_id": "trans_abc123",
  "format": "pesc_xml",
  "download_url": "https://api.educi.com/v1/interop/transcripts/trans_abc123/download",
  "expires_at": "2026-08-14T14:00:00Z",
  "file_size": 15420,
  "checksum_sha256": "a1b2c3d4..."
}
```

### 4.2 Export All Formats

```http
POST /api/v1/interop/transcripts/export
```

**Request Body:**
```json
{
  "student_id": "student_456",
  "school_id": "school_123",
  "formats": ["pesc_xml", "json", "pdf", "verifiable"],
  "periods": ["2025-S1", "2025-S2", "2026-S1"]
}
```

**Response 200:**
```json
{
  "export_id": "export_xyz789",
  "formats": {
    "pesc_xml": {
      "url": "https://api.educi.com/v1/interop/transcripts/export/export_xyz789/pesc.xml",
      "size": 15420
    },
    "json": {
      "url": "https://api.educi.com/v1/interop/transcripts/export/export_xyz789/transcript.json",
      "size": 8230
    },
    "pdf": {
      "url": "https://api.educi.com/v1/interop/transcripts/export/export_xyz789/transcript.pdf",
      "size": 42100
    },
    "verifiable": {
      "credential_id": "cred_abc123",
      "verification_url": "https://educi.com/verify/cred_abc123"
    }
  }
}
```

### 4.3 Import Transcript

```http
POST /api/v1/interop/transcripts/import
```

**Request Body (multipart/form-data):**
```
file: [PESC XML or CSV]
school_id: school_123
mapping: {
  "student_id_column": "StudentID",
  "course_column": "CourseName",
  "grade_column": "FinalGrade"
}
```

**Response 200:**
```json
{
  "import_id": "import_def456",
  "status": "processing",
  "records_found": 150,
  "records_valid": 148,
  "errors": [
    {
      "row": 42,
      "error": "Student not found: STU_999"
    },
    {
      "row": 87,
      "error": "Invalid grade value: XYZ"
    }
  ]
}
```

---

## 5. Grade Scale Mapping

```typescript
const GRADE_SCALES = {
  french: {
    name: "Système français",
    grades: [
      { min: 16, max: 20, letter: "A", label: "Très Bien", gpa: 4.0 },
      { min: 14, max: 15.99, letter: "B", label: "Bien", gpa: 3.5 },
      { min: 12, max: 13.99, letter: "C", label: "Assez Bien", gpa: 3.0 },
      { min: 10, max: 11.99, letter: "D", label: "Passable", gpa: 2.0 },
      { min: 0, max: 9.99, letter: "F", label: "Insuffisant", gpa: 0.0 }
    ]
  },
  usa: {
    name: "US GPA System",
    grades: [
      { min: 90, max: 100, letter: "A", gpa: 4.0 },
      { min: 80, max: 89.99, letter: "B", gpa: 3.0 },
      { min: 70, max: 79.99, letter: "C", gpa: 2.0 },
      { min: 60, max: 69.99, letter: "D", gpa: 1.0 },
      { min: 0, max: 59.99, letter: "F", gpa: 0.0 }
    ]
  }
};

class GradeScaleMapper {
  convertGrade(
    grade: number,
    from: string,
    to: string
  ): { letter: string; gpa: number; value: number } {
    const source = GRADE_SCALES[from];
    const target = GRADE_SCALES[to];

    const sourceGrade = source.grades.find(
      g => grade >= g.min && grade <= g.max
    );

    if (!sourceGrade) throw new Error("Invalid grade for scale");

    // Map via GPA
    const targetGrade = target.grades.find(
      g => sourceGrade.gpa >= g.min / (to === "french" ? 5 : 25)
    );

    return {
      letter: targetGrade?.letter || "F",
      gpa: sourceGrade.gpa,
      value: this.calculateValue(sourceGrade.gpa, target)
    };
  }
}
```

---

## 6. International Standards

| Country | Standard | Agency | Notes |
|---------|----------|--------|-------|
| USA | PESC/CeeB | PESC | XML standard |
| France | Eduscol | Ministère | Format national |
| Canada | PESC | MEESQC | Québec |
| UK | HESA | HESA | UCAS format |
| International | W3C VC | W3C | Verifiable |

---

## 7. Database Schema

```sql
CREATE TABLE transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  student_id UUID NOT NULL REFERENCES students(id),
  format TEXT NOT NULL CHECK (format IN ('pesc_xml','json','pdf','verifiable','csv')),
  content JSONB,
  file_url TEXT,
  file_size INTEGER,
  checksum TEXT,
  periods TEXT[] NOT NULL,
  status TEXT NOT NULL DEFAULT 'generated',
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  downloaded_count INTEGER DEFAULT 0
);

CREATE TABLE transcript_imports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  import_file_url TEXT NOT NULL,
  format TEXT NOT NULL,
  records_total INTEGER,
  records_valid INTEGER,
  records_failed INTEGER,
  errors JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'processing',
  imported_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transcripts_student ON transcripts(student_id, school_id);
CREATE INDEX idx_transcripts_status ON transcripts(status, generated_at DESC);
```
