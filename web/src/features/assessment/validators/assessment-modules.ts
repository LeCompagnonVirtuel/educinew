import { z } from 'zod';

const schoolId = z.string().uuid();

// ── School Accreditation ─────────────────────────────────────────────────

export const schoolAccreditationCreateSchema = z.object({
  school_id: schoolId,
  school_name: z.string().min(1).max(300),
  accreditation_type: z.enum(['initial', 'renewal', 'interim', 'full']),
  accrediting_body: z.string().min(1).max(200),
  requested_date: z.string().datetime(),
  standards: z.array(z.string().max(200)).min(1),
  self_study_report_url: z.string().url().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'denied', 'conditional']).optional(),
  assigned_reviewer_id: z.string().uuid().optional(),
  site_visit_date: z.string().datetime().optional(),
  evidence_documents: z.array(z.string().url()).optional(),
  notes: z.string().max(5000).optional(),
});

export const schoolAccreditationUpdateSchema = z.object({
  school_id: schoolId,
  school_name: z.string().min(1).max(300).optional(),
  accreditation_type: z.enum(['initial', 'renewal', 'interim', 'full']).optional(),
  accrediting_body: z.string().min(1).max(200).optional(),
  requested_date: z.string().datetime().optional(),
  standards: z.array(z.string().max(200)).optional(),
  self_study_report_url: z.string().url().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'denied', 'conditional']).optional(),
  assigned_reviewer_id: z.string().uuid().optional(),
  site_visit_date: z.string().datetime().optional(),
  evidence_documents: z.array(z.string().url()).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Teacher Accreditation ────────────────────────────────────────────────

export const teacherAccreditationCreateSchema = z.object({
  school_id: schoolId,
  teacher_id: z.string().uuid(),
  accreditation_program: z.string().min(1).max(200),
  qualification_level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  subject_areas: z.array(z.string().max(100)).min(1),
  application_date: z.string().datetime(),
  supporting_documents: z.array(z.string().url()).optional(),
  status: z.enum(['pending', 'under_review', 'approved', 'denied', 'suspended']).optional(),
  renewal_due_date: z.string().datetime().optional(),
  cpd_hours_completed: z.number().int().min(0).optional(),
  cpd_hours_required: z.number().int().min(0).optional(),
  mentor_teacher_id: z.string().uuid().optional(),
  notes: z.string().max(5000).optional(),
});

export const teacherAccreditationUpdateSchema = z.object({
  school_id: schoolId,
  teacher_id: z.string().uuid().optional(),
  accreditation_program: z.string().min(1).max(200).optional(),
  qualification_level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  subject_areas: z.array(z.string().max(100)).optional(),
  application_date: z.string().datetime().optional(),
  supporting_documents: z.array(z.string().url()).optional(),
  status: z.enum(['pending', 'under_review', 'approved', 'denied', 'suspended']).optional(),
  renewal_due_date: z.string().datetime().optional(),
  cpd_hours_completed: z.number().int().min(0).optional(),
  cpd_hours_required: z.number().int().min(0).optional(),
  mentor_teacher_id: z.string().uuid().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Program Accreditation ────────────────────────────────────────────────

export const programAccreditationCreateSchema = z.object({
  school_id: schoolId,
  program_name: z.string().min(1).max(300),
  program_code: z.string().min(1).max(50),
  accreditation_body: z.string().min(1).max(200),
  program_level: z.enum(['certificate', 'diploma', 'bachelor', 'master', 'doctorate']),
  duration_years: z.number().int().min(1).max(10),
  application_date: z.string().datetime(),
  curriculum_documents: z.array(z.string().url()).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'denied', 'conditional']).optional(),
  accreditation_valid_until: z.string().datetime().optional(),
  conditions: z.array(z.string().max(500)).optional(),
  review_panel_members: z.array(z.string().uuid()).optional(),
  notes: z.string().max(5000).optional(),
});

export const programAccreditationUpdateSchema = z.object({
  school_id: schoolId,
  program_name: z.string().min(1).max(300).optional(),
  program_code: z.string().min(1).max(50).optional(),
  accreditation_body: z.string().min(1).max(200).optional(),
  program_level: z.enum(['certificate', 'diploma', 'bachelor', 'master', 'doctorate']).optional(),
  duration_years: z.number().int().min(1).max(10).optional(),
  application_date: z.string().datetime().optional(),
  curriculum_documents: z.array(z.string().url()).optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'denied', 'conditional']).optional(),
  accreditation_valid_until: z.string().datetime().optional(),
  conditions: z.array(z.string().max(500)).optional(),
  review_panel_members: z.array(z.string().uuid()).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Audit Framework ──────────────────────────────────────────────────────

export const auditFrameworkCreateSchema = z.object({
  school_id: schoolId,
  framework_name: z.string().min(1).max(200),
  framework_type: z.enum(['internal', 'external', 'regulatory', 'voluntary']),
  scope: z.string().min(1).max(1000),
  applicable_standards: z.array(z.string().max(200)).min(1),
  audit_frequency: z.enum(['annual', 'biennial', 'triennial', 'continuous']),
  effective_date: z.string().datetime(),
  review_cycle_months: z.number().int().min(1).max(60),
  responsible_department: z.string().max(200).optional(),
  status: z.enum(['active', 'draft', 'archived', 'under_revision']).optional(),
  approval_authority: z.string().max(200).optional(),
  notes: z.string().max(5000).optional(),
});

export const auditFrameworkUpdateSchema = z.object({
  school_id: schoolId,
  framework_name: z.string().min(1).max(200).optional(),
  framework_type: z.enum(['internal', 'external', 'regulatory', 'voluntary']).optional(),
  scope: z.string().min(1).max(1000).optional(),
  applicable_standards: z.array(z.string().max(200)).optional(),
  audit_frequency: z.enum(['annual', 'biennial', 'triennial', 'continuous']).optional(),
  effective_date: z.string().datetime().optional(),
  review_cycle_months: z.number().int().min(1).max(60).optional(),
  responsible_department: z.string().max(200).optional(),
  status: z.enum(['active', 'draft', 'archived', 'under_revision']).optional(),
  approval_authority: z.string().max(200).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Compliance Check ─────────────────────────────────────────────────────

export const complianceCheckCreateSchema = z.object({
  school_id: schoolId,
  framework_id: z.string().uuid(),
  check_name: z.string().min(1).max(300),
  check_type: z.enum(['documentary', 'procedural', 'outcome', 'financial', 'safety']),
  standard_reference: z.string().min(1).max(200),
  check_date: z.string().datetime(),
  auditor_id: z.string().uuid(),
  result: z.enum(['compliant', 'non_compliant', 'partial', 'not_applicable']).optional(),
  findings: z.array(z.string().max(1000)).optional(),
  evidence_urls: z.array(z.string().url()).optional(),
  risk_level: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  corrective_action_required: z.boolean().optional(),
  due_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const complianceCheckUpdateSchema = z.object({
  school_id: schoolId,
  framework_id: z.string().uuid().optional(),
  check_name: z.string().min(1).max(300).optional(),
  check_type: z.enum(['documentary', 'procedural', 'outcome', 'financial', 'safety']).optional(),
  standard_reference: z.string().min(1).max(200).optional(),
  check_date: z.string().datetime().optional(),
  auditor_id: z.string().uuid().optional(),
  result: z.enum(['compliant', 'non_compliant', 'partial', 'not_applicable']).optional(),
  findings: z.array(z.string().max(1000)).optional(),
  evidence_urls: z.array(z.string().url()).optional(),
  risk_level: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  corrective_action_required: z.boolean().optional(),
  due_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Evidence Collection ──────────────────────────────────────────────────

export const evidenceCollectionCreateSchema = z.object({
  school_id: schoolId,
  check_id: z.string().uuid(),
  evidence_type: z.enum(['document', 'photo', 'video', 'data_export', 'testimonial', 'policy']),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  file_url: z.string().url().optional(),
  file_name: z.string().max(255).optional(),
  file_size: z.number().int().min(0).optional(),
  mime_type: z.string().max(100).optional(),
  collected_by: z.string().uuid(),
  collected_date: z.string().datetime(),
  verified: z.boolean().optional(),
  verified_by: z.string().uuid().optional(),
  tags: z.array(z.string().max(50)).optional(),
  notes: z.string().max(5000).optional(),
});

export const evidenceCollectionUpdateSchema = z.object({
  school_id: schoolId,
  check_id: z.string().uuid().optional(),
  evidence_type: z.enum(['document', 'photo', 'video', 'data_export', 'testimonial', 'policy']).optional(),
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  file_url: z.string().url().optional(),
  file_name: z.string().max(255).optional(),
  file_size: z.number().int().min(0).optional(),
  mime_type: z.string().max(100).optional(),
  collected_by: z.string().uuid().optional(),
  collected_date: z.string().datetime().optional(),
  verified: z.boolean().optional(),
  verified_by: z.string().uuid().optional(),
  tags: z.array(z.string().max(50)).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Accreditation Report ─────────────────────────────────────────────────

export const accreditationReportCreateSchema = z.object({
  school_id: schoolId,
  accreditation_id: z.string().uuid(),
  report_type: z.enum(['self_study', 'site_visit', 'progress', 'annual', 'final']),
  title: z.string().min(1).max(300),
  executive_summary: z.string().max(5000),
  methodology: z.string().max(3000).optional(),
  findings_summary: z.string().max(5000),
  recommendations: z.array(z.string().max(500)).optional(),
  compliance_status: z.enum(['compliant', 'partially_compliant', 'non_compliant']),
  overall_rating: z.enum(['excellent', 'good', 'satisfactory', 'needs_improvement', 'unsatisfactory']),
  report_date: z.string().datetime(),
  author_id: z.string().uuid(),
  reviewer_id: z.string().uuid().optional(),
  published: z.boolean().optional(),
  notes: z.string().max(5000).optional(),
});

export const accreditationReportUpdateSchema = z.object({
  school_id: schoolId,
  accreditation_id: z.string().uuid().optional(),
  report_type: z.enum(['self_study', 'site_visit', 'progress', 'annual', 'final']).optional(),
  title: z.string().min(1).max(300).optional(),
  executive_summary: z.string().max(5000).optional(),
  methodology: z.string().max(3000).optional(),
  findings_summary: z.string().max(5000).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  compliance_status: z.enum(['compliant', 'partially_compliant', 'non_compliant']).optional(),
  overall_rating: z.enum(['excellent', 'good', 'satisfactory', 'needs_improvement', 'unsatisfactory']).optional(),
  report_date: z.string().datetime().optional(),
  author_id: z.string().uuid().optional(),
  reviewer_id: z.string().uuid().optional(),
  published: z.boolean().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Accreditation Recommendation ─────────────────────────────────────────

export const accreditationRecommendationCreateSchema = z.object({
  school_id: schoolId,
  accreditation_id: z.string().uuid(),
  recommendation_type: z.enum(['approve', 'approve_with_conditions', 'defer', 'deny', 'revoke']),
  conditions: z.array(z.string().max(500)).optional(),
  rationale: z.string().min(1).max(3000),
  validity_period_months: z.number().int().min(1).max(120).optional(),
  follow_up_date: z.string().datetime().optional(),
  recommended_by: z.string().uuid(),
  review_panel_votes: z.object({
    approve: z.number().int().min(0),
    deny: z.number().int().min(0),
    abstain: z.number().int().min(0),
  }).optional(),
  notes: z.string().max(5000).optional(),
});

export const accreditationRecommendationUpdateSchema = z.object({
  school_id: schoolId,
  accreditation_id: z.string().uuid().optional(),
  recommendation_type: z.enum(['approve', 'approve_with_conditions', 'defer', 'deny', 'revoke']).optional(),
  conditions: z.array(z.string().max(500)).optional(),
  rationale: z.string().min(1).max(3000).optional(),
  validity_period_months: z.number().int().min(1).max(120).optional(),
  follow_up_date: z.string().datetime().optional(),
  recommended_by: z.string().uuid().optional(),
  review_panel_votes: z.object({
    approve: z.number().int().min(0),
    deny: z.number().int().min(0),
    abstain: z.number().int().min(0),
  }).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Corrective Action ────────────────────────────────────────────────────

export const correctiveActionCreateSchema = z.object({
  school_id: schoolId,
  accreditation_id: z.string().uuid(),
  check_id: z.string().uuid().optional(),
  action_title: z.string().min(1).max(300),
  description: z.string().min(1).max(3000),
  action_type: z.enum(['immediate', 'short_term', 'long_term', 'preventive']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  assigned_to: z.string().uuid(),
  due_date: z.string().datetime(),
  status: z.enum(['pending', 'in_progress', 'completed', 'overdue', 'cancelled']).optional(),
  completion_date: z.string().datetime().optional(),
  verification_required: z.boolean().optional(),
  verified_by: z.string().uuid().optional(),
  verification_date: z.string().datetime().optional(),
  evidence_urls: z.array(z.string().url()).optional(),
  notes: z.string().max(5000).optional(),
});

export const correctiveActionUpdateSchema = z.object({
  school_id: schoolId,
  accreditation_id: z.string().uuid().optional(),
  check_id: z.string().uuid().optional(),
  action_title: z.string().min(1).max(300).optional(),
  description: z.string().min(1).max(3000).optional(),
  action_type: z.enum(['immediate', 'short_term', 'long_term', 'preventive']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().datetime().optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'overdue', 'cancelled']).optional(),
  completion_date: z.string().datetime().optional(),
  verification_required: z.boolean().optional(),
  verified_by: z.string().uuid().optional(),
  verification_date: z.string().datetime().optional(),
  evidence_urls: z.array(z.string().url()).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Renewal Workflow ─────────────────────────────────────────────────────

export const renewalWorkflowCreateSchema = z.object({
  school_id: schoolId,
  accreditation_id: z.string().uuid(),
  workflow_name: z.string().min(1).max(200),
  renewal_type: z.enum(['expiring', 'conditional', 'voluntary', 'mandatory']),
  start_date: z.string().datetime(),
  deadline: z.string().datetime(),
  steps: z.array(z.object({
    step_name: z.string().max(200),
    step_type: z.enum(['document_submission', 'self_assessment', 'peer_review', 'site_visit', 'decision']),
    status: z.enum(['pending', 'in_progress', 'completed', 'skipped']),
    assigned_to: z.string().uuid().optional(),
    due_date: z.string().datetime().optional(),
  })),
  current_step: z.number().int().min(0).optional(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'expired', 'cancelled']).optional(),
  notes: z.string().max(5000).optional(),
});

export const renewalWorkflowUpdateSchema = z.object({
  school_id: schoolId,
  accreditation_id: z.string().uuid().optional(),
  workflow_name: z.string().min(1).max(200).optional(),
  renewal_type: z.enum(['expiring', 'conditional', 'voluntary', 'mandatory']).optional(),
  start_date: z.string().datetime().optional(),
  deadline: z.string().datetime().optional(),
  steps: z.array(z.object({
    step_name: z.string().max(200),
    step_type: z.enum(['document_submission', 'self_assessment', 'peer_review', 'site_visit', 'decision']),
    status: z.enum(['pending', 'in_progress', 'completed', 'skipped']),
    assigned_to: z.string().uuid().optional(),
    due_date: z.string().datetime().optional(),
  })).optional(),
  current_step: z.number().int().min(0).optional(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'expired', 'cancelled']).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Plagiarism Detection ─────────────────────────────────────────────────

export const plagiarismDetectionCreateSchema = z.object({
  school_id: schoolId,
  submission_id: z.string().uuid(),
  student_id: z.string().uuid(),
  assignment_id: z.string().uuid(),
  content_text: z.string().max(100000).optional(),
  file_url: z.string().url().optional(),
  scan_engine: z.enum(['turnitin', 'copyleaks', 'quetext', 'internal', 'custom']),
  similarity_threshold: z.number().min(0).max(100).optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  overall_similarity_score: z.number().min(0).max(100).optional(),
  matched_sources: z.array(z.object({
    source_url: z.string().url(),
    source_title: z.string().max(500).optional(),
    match_percentage: z.number().min(0).max(100),
    matched_text: z.string().max(2000),
    matched_indices: z.array(z.number().int().min(0)).optional(),
  })).optional(),
  flagged_passages: z.array(z.string().max(1000)).optional(),
  scan_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const plagiarismDetectionUpdateSchema = z.object({
  school_id: schoolId,
  submission_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  assignment_id: z.string().uuid().optional(),
  content_text: z.string().max(100000).optional(),
  file_url: z.string().url().optional(),
  scan_engine: z.enum(['turnitin', 'copyleaks', 'quetext', 'internal', 'custom']).optional(),
  similarity_threshold: z.number().min(0).max(100).optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  overall_similarity_score: z.number().min(0).max(100).optional(),
  matched_sources: z.array(z.object({
    source_url: z.string().url(),
    source_title: z.string().max(500).optional(),
    match_percentage: z.number().min(0).max(100),
    matched_text: z.string().max(2000),
    matched_indices: z.array(z.number().int().min(0)).optional(),
  })).optional(),
  flagged_passages: z.array(z.string().max(1000)).optional(),
  scan_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Similarity Detection ─────────────────────────────────────────────────

export const similarityDetectionCreateSchema = z.object({
  school_id: schoolId,
  source_submission_id: z.string().uuid(),
  target_submission_id: z.string().uuid(),
  source_student_id: z.string().uuid(),
  target_student_id: z.string().uuid(),
  detection_method: z.enum(['text_matching', 'structural_analysis', 'stylometry', 'ai_model']),
  similarity_score: z.number().min(0).max(100),
  matched_sections: z.array(z.object({
    source_start: z.number().int().min(0),
    source_end: z.number().int().min(0),
    target_start: z.number().int().min(0),
    target_end: z.number().int().min(0),
    text: z.string().max(2000),
  })),
  temporal_analysis: z.object({
    source_submitted_at: z.string().datetime(),
    target_submitted_at: z.string().datetime(),
    time_difference_minutes: z.number(),
  }).optional(),
  status: z.enum(['detected', 'investigating', 'confirmed', 'dismissed']).optional(),
  reviewed_by: z.string().uuid().optional(),
  notes: z.string().max(5000).optional(),
});

export const similarityDetectionUpdateSchema = z.object({
  school_id: schoolId,
  source_submission_id: z.string().uuid().optional(),
  target_submission_id: z.string().uuid().optional(),
  source_student_id: z.string().uuid().optional(),
  target_student_id: z.string().uuid().optional(),
  detection_method: z.enum(['text_matching', 'structural_analysis', 'stylometry', 'ai_model']).optional(),
  similarity_score: z.number().min(0).max(100).optional(),
  matched_sections: z.array(z.object({
    source_start: z.number().int().min(0),
    source_end: z.number().int().min(0),
    target_start: z.number().int().min(0),
    target_end: z.number().int().min(0),
    text: z.string().max(2000),
  })).optional(),
  temporal_analysis: z.object({
    source_submitted_at: z.string().datetime(),
    target_submitted_at: z.string().datetime(),
    time_difference_minutes: z.number(),
  }).optional(),
  status: z.enum(['detected', 'investigating', 'confirmed', 'dismissed']).optional(),
  reviewed_by: z.string().uuid().optional(),
  notes: z.string().max(5000).optional(),
});

// ── AI Generated Content Detection ───────────────────────────────────────

export const aIGeneratedContentDetectionCreateSchema = z.object({
  school_id: schoolId,
  submission_id: z.string().uuid(),
  student_id: z.string().uuid(),
  assignment_id: z.string().uuid(),
  content_text: z.string().max(100000).optional(),
  file_url: z.string().url().optional(),
  detection_model: z.enum(['gpt_detector', 'turnitin_ai', 'copyleaks_ai', 'internal_model', 'ensemble']),
  ai_probability: z.number().min(0).max(1),
  confidence_score: z.number().min(0).max(1).optional(),
  flagged_sentences: z.array(z.object({
    text: z.string().max(500),
    ai_probability: z.number().min(0).max(1),
    start_index: z.number().int().min(0),
    end_index: z.number().int().min(0),
  })).optional(),
  human_rewrite_probability: z.number().min(0).max(1).optional(),
  paraphrase_detected: z.boolean().optional(),
  status: z.enum(['pending', 'completed', 'flagged', 'dismissed']).optional(),
  reviewed_by: z.string().uuid().optional(),
  scan_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const aIGeneratedContentDetectionUpdateSchema = z.object({
  school_id: schoolId,
  submission_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  assignment_id: z.string().uuid().optional(),
  content_text: z.string().max(100000).optional(),
  file_url: z.string().url().optional(),
  detection_model: z.enum(['gpt_detector', 'turnitin_ai', 'copyleaks_ai', 'internal_model', 'ensemble']).optional(),
  ai_probability: z.number().min(0).max(1).optional(),
  confidence_score: z.number().min(0).max(1).optional(),
  flagged_sentences: z.array(z.object({
    text: z.string().max(500),
    ai_probability: z.number().min(0).max(1),
    start_index: z.number().int().min(0),
    end_index: z.number().int().min(0),
  })).optional(),
  human_rewrite_probability: z.number().min(0).max(1).optional(),
  paraphrase_detected: z.boolean().optional(),
  status: z.enum(['pending', 'completed', 'flagged', 'dismissed']).optional(),
  reviewed_by: z.string().uuid().optional(),
  scan_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Citation Checker ─────────────────────────────────────────────────────

export const citationCheckerCreateSchema = z.object({
  school_id: schoolId,
  submission_id: z.string().uuid(),
  student_id: z.string().uuid(),
  content_text: z.string().max(100000).optional(),
  file_url: z.string().url().optional(),
  citation_style: z.enum(['apa', 'mla', 'chicago', 'harvard', 'ieee', 'vancouver', 'turabian']),
  check_references: z.boolean().optional(),
  check_in_text: z.boolean().optional(),
  check_bibliography: z.boolean().optional(),
  total_citations_found: z.number().int().min(0).optional(),
  valid_citations: z.number().int().min(0).optional(),
  invalid_citations: z.number().int().min(0).optional(),
  missing_citations: z.array(z.string().max(500)).optional(),
  formatting_issues: z.array(z.object({
    citation_text: z.string().max(500),
    issue_type: z.enum(['missing_author', 'missing_date', 'wrong_format', 'mismatch', 'duplicate']),
    suggestion: z.string().max(500).optional(),
  })).optional(),
  overall_score: z.number().min(0).max(100).optional(),
  status: z.enum(['pending', 'completed', 'failed']).optional(),
  scan_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const citationCheckerUpdateSchema = z.object({
  school_id: schoolId,
  submission_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  content_text: z.string().max(100000).optional(),
  file_url: z.string().url().optional(),
  citation_style: z.enum(['apa', 'mla', 'chicago', 'harvard', 'ieee', 'vancouver', 'turabian']).optional(),
  check_references: z.boolean().optional(),
  check_in_text: z.boolean().optional(),
  check_bibliography: z.boolean().optional(),
  total_citations_found: z.number().int().min(0).optional(),
  valid_citations: z.number().int().min(0).optional(),
  invalid_citations: z.number().int().min(0).optional(),
  missing_citations: z.array(z.string().max(500)).optional(),
  formatting_issues: z.array(z.object({
    citation_text: z.string().max(500),
    issue_type: z.enum(['missing_author', 'missing_date', 'wrong_format', 'mismatch', 'duplicate']),
    suggestion: z.string().max(500).optional(),
  })).optional(),
  overall_score: z.number().min(0).max(100).optional(),
  status: z.enum(['pending', 'completed', 'failed']).optional(),
  scan_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Academic Integrity ───────────────────────────────────────────────────

export const academicIntegrityCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  violation_type: z.enum(['plagiarism', 'cheating', 'fabrication', 'facilitation', 'sabotage', 'ai_misuse', 'identity_fraud']),
  severity: z.enum(['minor', 'moderate', 'major', 'critical']),
  incident_date: z.string().datetime(),
  reported_by: z.string().uuid(),
  assignment_id: z.string().uuid().optional(),
  exam_id: z.string().uuid().optional(),
  description: z.string().min(1).max(5000),
  evidence_urls: z.array(z.string().url()).optional(),
  witness_statements: z.array(z.string().max(2000)).optional(),
  prior_violations: z.number().int().min(0).optional(),
  status: z.enum(['reported', 'investigating', 'hearing', 'resolved', 'appealed', 'closed']).optional(),
  outcome: z.enum(['no_action', 'warning', 'grading_penalty', 'suspension', 'expulsion', 'revocation']).optional(),
  resolution_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const academicIntegrityUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  violation_type: z.enum(['plagiarism', 'cheating', 'fabrication', 'facilitation', 'sabotage', 'ai_misuse', 'identity_fraud']).optional(),
  severity: z.enum(['minor', 'moderate', 'major', 'critical']).optional(),
  incident_date: z.string().datetime().optional(),
  reported_by: z.string().uuid().optional(),
  assignment_id: z.string().uuid().optional(),
  exam_id: z.string().uuid().optional(),
  description: z.string().min(1).max(5000).optional(),
  evidence_urls: z.array(z.string().url()).optional(),
  witness_statements: z.array(z.string().max(2000)).optional(),
  prior_violations: z.number().int().min(0).optional(),
  status: z.enum(['reported', 'investigating', 'hearing', 'resolved', 'appealed', 'closed']).optional(),
  outcome: z.enum(['no_action', 'warning', 'grading_penalty', 'suspension', 'expulsion', 'revocation']).optional(),
  resolution_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Fraud Detection ──────────────────────────────────────────────────────

export const fraudDetectionCreateSchema = z.object({
  school_id: schoolId,
  detection_type: z.enum(['identity_fraud', 'grade_fraud', 'credential_fraud', 'enrollment_fraud', 'financial_aid_fraud']),
  subject_type: z.enum(['student', 'teacher', 'staff', 'institution']),
  subject_id: z.string().uuid(),
  detection_method: z.enum(['algorithm', 'tip_off', 'audit', 'random_check', 'ai_model']),
  risk_score: z.number().min(0).max(1),
  indicators: z.array(z.object({
    indicator: z.string().max(200),
    weight: z.number().min(0).max(1),
    evidence: z.string().max(1000),
  })),
  description: z.string().min(1).max(5000),
  detected_date: z.string().datetime(),
  detected_by: z.string().uuid().optional(),
  status: z.enum(['detected', 'investigating', 'confirmed', 'false_positive', 'resolved']).optional(),
  investigation_notes: z.string().max(5000).optional(),
  resolution_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const fraudDetectionUpdateSchema = z.object({
  school_id: schoolId,
  detection_type: z.enum(['identity_fraud', 'grade_fraud', 'credential_fraud', 'enrollment_fraud', 'financial_aid_fraud']).optional(),
  subject_type: z.enum(['student', 'teacher', 'staff', 'institution']).optional(),
  subject_id: z.string().uuid().optional(),
  detection_method: z.enum(['algorithm', 'tip_off', 'audit', 'random_check', 'ai_model']).optional(),
  risk_score: z.number().min(0).max(1).optional(),
  indicators: z.array(z.object({
    indicator: z.string().max(200),
    weight: z.number().min(0).max(1),
    evidence: z.string().max(1000),
  })).optional(),
  description: z.string().min(1).max(5000).optional(),
  detected_date: z.string().datetime().optional(),
  detected_by: z.string().uuid().optional(),
  status: z.enum(['detected', 'investigating', 'confirmed', 'false_positive', 'resolved']).optional(),
  investigation_notes: z.string().max(5000).optional(),
  resolution_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Forgery Detection ────────────────────────────────────────────────────

export const forgeryDetectionCreateSchema = z.object({
  school_id: schoolId,
  document_type: z.enum(['certificate', 'transcript', 'diploma', 'id_card', 'report_card', 'other']),
  document_id: z.string().uuid().optional(),
  file_url: z.string().url(),
  file_name: z.string().max(255),
  detection_method: z.enum(['visual_inspection', 'digital_forensic', 'metadata_analysis', 'ai_model', 'watermark_check']),
  indicators: z.array(z.object({
    indicator: z.string().max(200),
    confidence: z.number().min(0).max(1),
    description: z.string().max(500),
  })),
  forgery_probability: z.number().min(0).max(1),
  submitted_by: z.string().uuid().optional(),
  submitted_date: z.string().datetime().optional(),
  detected_by: z.string().uuid(),
  detected_date: z.string().datetime(),
  status: z.enum(['detected', 'investigating', 'confirmed', 'dismissed', 'resolved']).optional(),
  notes: z.string().max(5000).optional(),
});

export const forgeryDetectionUpdateSchema = z.object({
  school_id: schoolId,
  document_type: z.enum(['certificate', 'transcript', 'diploma', 'id_card', 'report_card', 'other']).optional(),
  document_id: z.string().uuid().optional(),
  file_url: z.string().url().optional(),
  file_name: z.string().max(255).optional(),
  detection_method: z.enum(['visual_inspection', 'digital_forensic', 'metadata_analysis', 'ai_model', 'watermark_check']).optional(),
  indicators: z.array(z.object({
    indicator: z.string().max(200),
    confidence: z.number().min(0).max(1),
    description: z.string().max(500),
  })).optional(),
  forgery_probability: z.number().min(0).max(1).optional(),
  submitted_by: z.string().uuid().optional(),
  submitted_date: z.string().datetime().optional(),
  detected_by: z.string().uuid().optional(),
  detected_date: z.string().datetime().optional(),
  status: z.enum(['detected', 'investigating', 'confirmed', 'dismissed', 'resolved']).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Identity Verification ────────────────────────────────────────────────

export const identityVerificationCreateSchema = z.object({
  school_id: schoolId,
  person_id: z.string().uuid(),
  person_type: z.enum(['student', 'teacher', 'staff', 'candidate']),
  verification_method: z.enum(['photo_id', 'biometric', 'video_call', 'document_upload', 'institutional_record', 'multi_factor']),
  id_document_type: z.enum(['passport', 'national_id', 'drivers_license', 'student_id', 'other']).optional(),
  id_document_url: z.string().url().optional(),
  selfie_url: z.string().url().optional(),
  liveness_check: z.boolean().optional(),
  face_match_score: z.number().min(0).max(1).optional(),
  verification_result: z.enum(['verified', 'failed', 'pending', 'manual_review']).optional(),
  verified_by: z.string().uuid().optional(),
  verified_at: z.string().datetime().optional(),
  expiration_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const identityVerificationUpdateSchema = z.object({
  school_id: schoolId,
  person_id: z.string().uuid().optional(),
  person_type: z.enum(['student', 'teacher', 'staff', 'candidate']).optional(),
  verification_method: z.enum(['photo_id', 'biometric', 'video_call', 'document_upload', 'institutional_record', 'multi_factor']).optional(),
  id_document_type: z.enum(['passport', 'national_id', 'drivers_license', 'student_id', 'other']).optional(),
  id_document_url: z.string().url().optional(),
  selfie_url: z.string().url().optional(),
  liveness_check: z.boolean().optional(),
  face_match_score: z.number().min(0).max(1).optional(),
  verification_result: z.enum(['verified', 'failed', 'pending', 'manual_review']).optional(),
  verified_by: z.string().uuid().optional(),
  verified_at: z.string().datetime().optional(),
  expiration_date: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Behavior Analysis ────────────────────────────────────────────────────

export const behaviorAnalysisCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  exam_id: z.string().uuid().optional(),
  session_id: z.string().uuid().optional(),
  analysis_type: z.enum(['cheating_pattern', 'anomaly_detection', 'behavioral_biometrics', 'temporal_analysis', 'collusion_detection']),
  time_range_start: z.string().datetime(),
  time_range_end: z.string().datetime(),
  data_sources: z.array(z.enum(['keyboard', 'mouse', 'webcam', 'screen', 'audio', 'network', 'timing'])),
  anomalies_detected: z.array(z.object({
    anomaly_type: z.string().max(200),
    timestamp: z.string().datetime(),
    severity: z.enum(['low', 'medium', 'high']),
    description: z.string().max(500),
    confidence: z.number().min(0).max(1),
  })).optional(),
  risk_score: z.number().min(0).max(1).optional(),
  status: z.enum(['analyzing', 'completed', 'flagged', 'dismissed']).optional(),
  analyst_id: z.string().uuid().optional(),
  notes: z.string().max(5000).optional(),
});

export const behaviorAnalysisUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  exam_id: z.string().uuid().optional(),
  session_id: z.string().uuid().optional(),
  analysis_type: z.enum(['cheating_pattern', 'anomaly_detection', 'behavioral_biometrics', 'temporal_analysis', 'collusion_detection']).optional(),
  time_range_start: z.string().datetime().optional(),
  time_range_end: z.string().datetime().optional(),
  data_sources: z.array(z.enum(['keyboard', 'mouse', 'webcam', 'screen', 'audio', 'network', 'timing'])).optional(),
  anomalies_detected: z.array(z.object({
    anomaly_type: z.string().max(200),
    timestamp: z.string().datetime(),
    severity: z.enum(['low', 'medium', 'high']),
    description: z.string().max(500),
    confidence: z.number().min(0).max(1),
  })).optional(),
  risk_score: z.number().min(0).max(1).optional(),
  status: z.enum(['analyzing', 'completed', 'flagged', 'dismissed']).optional(),
  analyst_id: z.string().uuid().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Integrity Risk Score ─────────────────────────────────────────────────

export const integrityRiskScoreCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  assessment_period: z.string().max(50),
  risk_factors: z.array(z.object({
    factor_name: z.string().max(200),
    factor_value: z.number(),
    weight: z.number().min(0).max(1),
    category: z.enum(['academic', 'behavioral', 'biometric', 'network', 'historical']),
  })),
  overall_risk_score: z.number().min(0).max(1),
  risk_level: z.enum(['low', 'moderate', 'high', 'critical']),
  trend: z.enum(['improving', 'stable', 'worsening']),
  recommendations: z.array(z.string().max(500)).optional(),
  calculation_date: z.string().datetime(),
  model_version: z.string().max(50).optional(),
  notes: z.string().max(5000).optional(),
});

export const integrityRiskScoreUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  assessment_period: z.string().max(50).optional(),
  risk_factors: z.array(z.object({
    factor_name: z.string().max(200),
    factor_value: z.number(),
    weight: z.number().min(0).max(1),
    category: z.enum(['academic', 'behavioral', 'biometric', 'network', 'historical']),
  })).optional(),
  overall_risk_score: z.number().min(0).max(1).optional(),
  risk_level: z.enum(['low', 'moderate', 'high', 'critical']).optional(),
  trend: z.enum(['improving', 'stable', 'worsening']).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  calculation_date: z.string().datetime().optional(),
  model_version: z.string().max(50).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Integrity Report ─────────────────────────────────────────────────────

export const integrityReportCreateSchema = z.object({
  school_id: schoolId,
  report_type: z.enum(['incident', 'trend_analysis', 'system_audit', 'compliance', 'annual']),
  title: z.string().min(1).max(300),
  summary: z.string().min(1).max(5000),
  period_start: z.string().datetime().optional(),
  period_end: z.string().datetime().optional(),
  total_incidents: z.number().int().min(0).optional(),
  incidents_by_type: z.record(z.number().int().min(0)).optional(),
  incidents_by_severity: z.record(z.number().int().min(0)).optional(),
  resolution_rate: z.number().min(0).max(100).optional(),
  average_resolution_days: z.number().min(0).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  author_id: z.string().uuid(),
  report_date: z.string().datetime(),
  published: z.boolean().optional(),
  notes: z.string().max(5000).optional(),
});

export const integrityReportUpdateSchema = z.object({
  school_id: schoolId,
  report_type: z.enum(['incident', 'trend_analysis', 'system_audit', 'compliance', 'annual']).optional(),
  title: z.string().min(1).max(300).optional(),
  summary: z.string().min(1).max(5000).optional(),
  period_start: z.string().datetime().optional(),
  period_end: z.string().datetime().optional(),
  total_incidents: z.number().int().min(0).optional(),
  incidents_by_type: z.record(z.number().int().min(0)).optional(),
  incidents_by_severity: z.record(z.number().int().min(0)).optional(),
  resolution_rate: z.number().min(0).max(100).optional(),
  average_resolution_days: z.number().min(0).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  author_id: z.string().uuid().optional(),
  report_date: z.string().datetime().optional(),
  published: z.boolean().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Student Portfolio ────────────────────────────────────────────────────

export const studentPortfolioCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  portfolio_name: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  portfolio_type: z.enum(['academic', 'creative', 'professional', 'competency', 'mixed']),
  visibility: z.enum(['private', 'school', 'public']).optional(),
  template_id: z.string().uuid().optional(),
  banner_image_url: z.string().url().optional(),
  tags: z.array(z.string().max(50)).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  created_at: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const studentPortfolioUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  portfolio_name: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  portfolio_type: z.enum(['academic', 'creative', 'professional', 'competency', 'mixed']).optional(),
  visibility: z.enum(['private', 'school', 'public']).optional(),
  template_id: z.string().uuid().optional(),
  banner_image_url: z.string().url().optional(),
  tags: z.array(z.string().max(50)).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Teacher Portfolio ────────────────────────────────────────────────────

export const teacherPortfolioCreateSchema = z.object({
  school_id: schoolId,
  teacher_id: z.string().uuid(),
  portfolio_name: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  portfolio_type: z.enum(['teaching', 'research', 'professional_development', 'leadership', 'mixed']),
  visibility: z.enum(['private', 'school', 'public']).optional(),
  teaching_philosophy: z.string().max(5000).optional(),
  certifications: z.array(z.string().max(200)).optional(),
  publications: z.array(z.string().max(500)).optional(),
  awards: z.array(z.string().max(200)).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  notes: z.string().max(5000).optional(),
});

export const teacherPortfolioUpdateSchema = z.object({
  school_id: schoolId,
  teacher_id: z.string().uuid().optional(),
  portfolio_name: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  portfolio_type: z.enum(['teaching', 'research', 'professional_development', 'leadership', 'mixed']).optional(),
  visibility: z.enum(['private', 'school', 'public']).optional(),
  teaching_philosophy: z.string().max(5000).optional(),
  certifications: z.array(z.string().max(200)).optional(),
  publications: z.array(z.string().max(500)).optional(),
  awards: z.array(z.string().max(200)).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Competency Portfolio ─────────────────────────────────────────────────

export const competencyPortfolioCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  portfolio_id: z.string().uuid().optional(),
  competency_framework: z.string().min(1).max(200),
  competencies: z.array(z.object({
    competency_name: z.string().max(200),
    competency_code: z.string().max(50),
    level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert']),
    score: z.number().min(0).max(100).optional(),
    evidence_ids: z.array(z.string().uuid()).optional(),
    assessed_date: z.string().datetime().optional(),
    assessed_by: z.string().uuid().optional(),
  })),
  overall_level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert']).optional(),
  assessment_date: z.string().datetime(),
  next_review_date: z.string().datetime().optional(),
  status: z.enum(['draft', 'finalized', 'archived']).optional(),
  notes: z.string().max(5000).optional(),
});

export const competencyPortfolioUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  portfolio_id: z.string().uuid().optional(),
  competency_framework: z.string().min(1).max(200).optional(),
  competencies: z.array(z.object({
    competency_name: z.string().max(200),
    competency_code: z.string().max(50),
    level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert']),
    score: z.number().min(0).max(100).optional(),
    evidence_ids: z.array(z.string().uuid()).optional(),
    assessed_date: z.string().datetime().optional(),
    assessed_by: z.string().uuid().optional(),
  })).optional(),
  overall_level: z.enum(['novice', 'beginner', 'intermediate', 'advanced', 'expert']).optional(),
  assessment_date: z.string().datetime().optional(),
  next_review_date: z.string().datetime().optional(),
  status: z.enum(['draft', 'finalized', 'archived']).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Project ──────────────────────────────────────────────────────────────

export const projectCreateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid(),
  student_id: z.string().uuid(),
  project_name: z.string().min(1).max(300),
  description: z.string().max(5000).optional(),
  project_type: z.enum(['research', 'practical', 'creative', 'community_service', 'internship', 'capstone']),
  subject_area: z.string().max(200).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  status: z.enum(['planning', 'in_progress', 'completed', 'archived']).optional(),
  supervisor_id: z.string().uuid().optional(),
  grade: z.string().max(20).optional(),
  score: z.number().min(0).max(100).optional(),
  file_urls: z.array(z.string().url()).optional(),
  image_urls: z.array(z.string().url()).optional(),
  tags: z.array(z.string().max(50)).optional(),
  featured: z.boolean().optional(),
  notes: z.string().max(5000).optional(),
});

export const projectUpdateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  project_name: z.string().min(1).max(300).optional(),
  description: z.string().max(5000).optional(),
  project_type: z.enum(['research', 'practical', 'creative', 'community_service', 'internship', 'capstone']).optional(),
  subject_area: z.string().max(200).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  status: z.enum(['planning', 'in_progress', 'completed', 'archived']).optional(),
  supervisor_id: z.string().uuid().optional(),
  grade: z.string().max(20).optional(),
  score: z.number().min(0).max(100).optional(),
  file_urls: z.array(z.string().url()).optional(),
  image_urls: z.array(z.string().url()).optional(),
  tags: z.array(z.string().max(50)).optional(),
  featured: z.boolean().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Research Entry ───────────────────────────────────────────────────────

export const researchEntryCreateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid(),
  student_id: z.string().uuid(),
  title: z.string().min(1).max(300),
  abstract: z.string().max(5000).optional(),
  research_area: z.string().max(200),
  methodology: z.string().max(2000).optional(),
  findings: z.string().max(5000).optional(),
  conclusions: z.string().max(3000).optional(),
  publication_status: z.enum(['draft', 'submitted', 'under_review', 'published', 'rejected']).optional(),
  journal_name: z.string().max(300).optional(),
  doi: z.string().max(100).optional(),
  publication_date: z.string().datetime().optional(),
  co_authors: z.array(z.string().max(200)).optional(),
  supervisor_id: z.string().uuid().optional(),
  file_urls: z.array(z.string().url()).optional(),
  tags: z.array(z.string().max(50)).optional(),
  notes: z.string().max(5000).optional(),
});

export const researchEntryUpdateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  title: z.string().min(1).max(300).optional(),
  abstract: z.string().max(5000).optional(),
  research_area: z.string().max(200).optional(),
  methodology: z.string().max(2000).optional(),
  findings: z.string().max(5000).optional(),
  conclusions: z.string().max(3000).optional(),
  publication_status: z.enum(['draft', 'submitted', 'under_review', 'published', 'rejected']).optional(),
  journal_name: z.string().max(300).optional(),
  doi: z.string().max(100).optional(),
  publication_date: z.string().datetime().optional(),
  co_authors: z.array(z.string().max(200)).optional(),
  supervisor_id: z.string().uuid().optional(),
  file_urls: z.array(z.string().url()).optional(),
  tags: z.array(z.string().max(50)).optional(),
  notes: z.string().max(5000).optional(),
});

// ── Internship ───────────────────────────────────────────────────────────

export const internshipCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  portfolio_id: z.string().uuid().optional(),
  company_name: z.string().min(1).max(300),
  company_address: z.string().max(500).optional(),
  position_title: z.string().min(1).max(200),
  department: z.string().max(200).optional(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional(),
  duration_weeks: z.number().int().min(1).max(52).optional(),
  supervisor_name: z.string().max(200).optional(),
  supervisor_email: z.string().email().optional(),
  description: z.string().max(5000).optional(),
  learning_objectives: z.array(z.string().max(300)).optional(),
  skills_developed: z.array(z.string().max(200)).optional(),
  hours_worked: z.number().int().min(0).optional(),
  status: z.enum(['planned', 'active', 'completed', 'cancelled']).optional(),
  evaluation_score: z.number().min(0).max(100).optional(),
  evaluation_notes: z.string().max(5000).optional(),
  certificate_url: z.string().url().optional(),
  notes: z.string().max(5000).optional(),
});

export const internshipUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  portfolio_id: z.string().uuid().optional(),
  company_name: z.string().min(1).max(300).optional(),
  company_address: z.string().max(500).optional(),
  position_title: z.string().min(1).max(200).optional(),
  department: z.string().max(200).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  duration_weeks: z.number().int().min(1).max(52).optional(),
  supervisor_name: z.string().max(200).optional(),
  supervisor_email: z.string().email().optional(),
  description: z.string().max(5000).optional(),
  learning_objectives: z.array(z.string().max(300)).optional(),
  skills_developed: z.array(z.string().max(200)).optional(),
  hours_worked: z.number().int().min(0).optional(),
  status: z.enum(['planned', 'active', 'completed', 'cancelled']).optional(),
  evaluation_score: z.number().min(0).max(100).optional(),
  evaluation_notes: z.string().max(5000).optional(),
  certificate_url: z.string().url().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Media Item ───────────────────────────────────────────────────────────

export const mediaItemCreateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid(),
  student_id: z.string().uuid(),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  media_type: z.enum(['image', 'video', 'audio', 'document', 'presentation', 'code', 'link']),
  file_url: z.string().url(),
  thumbnail_url: z.string().url().optional(),
  file_name: z.string().max(255).optional(),
  file_size: z.number().int().min(0).optional(),
  mime_type: z.string().max(100).optional(),
  display_order: z.number().int().min(0).optional(),
  tags: z.array(z.string().max(50)).optional(),
  linked_project_id: z.string().uuid().optional(),
  linked_competency_ids: z.array(z.string().uuid()).optional(),
  featured: z.boolean().optional(),
  notes: z.string().max(5000).optional(),
});

export const mediaItemUpdateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  media_type: z.enum(['image', 'video', 'audio', 'document', 'presentation', 'code', 'link']).optional(),
  file_url: z.string().url().optional(),
  thumbnail_url: z.string().url().optional(),
  file_name: z.string().max(255).optional(),
  file_size: z.number().int().min(0).optional(),
  mime_type: z.string().max(100).optional(),
  display_order: z.number().int().min(0).optional(),
  tags: z.array(z.string().max(50)).optional(),
  linked_project_id: z.string().uuid().optional(),
  linked_competency_ids: z.array(z.string().uuid()).optional(),
  featured: z.boolean().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Portfolio Sharing ────────────────────────────────────────────────────

export const portfolioSharingCreateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid(),
  owner_id: z.string().uuid(),
  shared_with_type: z.enum(['user', 'group', 'school', 'public_link']),
  shared_with_id: z.string().uuid().optional(),
  permission_level: z.enum(['view', 'comment', 'edit', 'admin']),
  share_token: z.string().max(100).optional(),
  expires_at: z.string().datetime().optional(),
  access_count: z.number().int().min(0).optional(),
  max_access_count: z.number().int().min(1).optional(),
  status: z.enum(['active', 'expired', 'revoked']).optional(),
  shared_by: z.string().uuid(),
  shared_at: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const portfolioSharingUpdateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid().optional(),
  owner_id: z.string().uuid().optional(),
  shared_with_type: z.enum(['user', 'group', 'school', 'public_link']).optional(),
  shared_with_id: z.string().uuid().optional(),
  permission_level: z.enum(['view', 'comment', 'edit', 'admin']).optional(),
  share_token: z.string().max(100).optional(),
  expires_at: z.string().datetime().optional(),
  access_count: z.number().int().min(0).optional(),
  max_access_count: z.number().int().min(1).optional(),
  status: z.enum(['active', 'expired', 'revoked']).optional(),
  shared_by: z.string().uuid().optional(),
  shared_at: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Public Portfolio ─────────────────────────────────────────────────────

export const publicPortfolioCreateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid(),
  student_id: z.string().uuid(),
  public_url: z.string().url().optional(),
  custom_slug: z.string().min(1).max(100).optional(),
  title: z.string().min(1).max(300),
  bio: z.string().max(3000).optional(),
  profile_image_url: z.string().url().optional(),
  contact_email: z.string().email().optional(),
  social_links: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }).optional(),
  featured_sections: z.array(z.string().max(200)).optional(),
  theme: z.enum(['default', 'minimal', 'professional', 'creative', 'academic']).optional(),
  custom_css: z.string().max(10000).optional(),
  meta_description: z.string().max(500).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  view_count: z.number().int().min(0).optional(),
  last_viewed_at: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

export const publicPortfolioUpdateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  public_url: z.string().url().optional(),
  custom_slug: z.string().min(1).max(100).optional(),
  title: z.string().min(1).max(300).optional(),
  bio: z.string().max(3000).optional(),
  profile_image_url: z.string().url().optional(),
  contact_email: z.string().email().optional(),
  social_links: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }).optional(),
  featured_sections: z.array(z.string().max(200)).optional(),
  theme: z.enum(['default', 'minimal', 'professional', 'creative', 'academic']).optional(),
  custom_css: z.string().max(10000).optional(),
  meta_description: z.string().max(500).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  view_count: z.number().int().min(0).optional(),
  last_viewed_at: z.string().datetime().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Portfolio Export ─────────────────────────────────────────────────────

export const portfolioExportCreateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid(),
  student_id: z.string().uuid(),
  export_format: z.enum(['pdf', 'html', 'json', 'docx', 'static_site']),
  include_sections: z.array(z.string().max(200)).optional(),
  include_media: z.boolean().optional(),
  include_metadata: z.boolean().optional(),
  custom_branding: z.boolean().optional(),
  password_protected: z.boolean().optional(),
  export_password: z.string().max(100).optional(),
  file_url: z.string().url().optional(),
  file_size: z.number().int().min(0).optional(),
  generated_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  requested_by: z.string().uuid(),
  notes: z.string().max(5000).optional(),
});

export const portfolioExportUpdateSchema = z.object({
  school_id: schoolId,
  portfolio_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  export_format: z.enum(['pdf', 'html', 'json', 'docx', 'static_site']).optional(),
  include_sections: z.array(z.string().max(200)).optional(),
  include_media: z.boolean().optional(),
  include_metadata: z.boolean().optional(),
  custom_branding: z.boolean().optional(),
  password_protected: z.boolean().optional(),
  export_password: z.string().max(100).optional(),
  file_url: z.string().url().optional(),
  file_size: z.number().int().min(0).optional(),
  generated_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  requested_by: z.string().uuid().optional(),
  notes: z.string().max(5000).optional(),
});
