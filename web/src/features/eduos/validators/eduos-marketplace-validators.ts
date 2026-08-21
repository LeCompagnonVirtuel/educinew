import { z } from 'zod';

const schoolId = z.string().uuid();

// ── Marketplace Product ────────

export const marketplaceProductCreateSchema = z.object({
  school_id: schoolId,
  seller_id: z.string(),
  product_type: z.enum(['APP', 'PLUGIN', 'EXTENSION', 'COURSE', 'BOOK', 'AI_MODEL', 'TEMPLATE', 'SERVICE', 'CONSULTANT', 'TUTOR', 'DIGITAL_PRODUCT']),
  name: z.string(),
  description: z.string(),
  short_description: z.string(),
  category: z.enum(['LEARNING_MANAGEMENT', 'ASSESSMENT', 'COMMUNICATION', 'ANALYTICS', 'ADMINISTRATION', 'PARENT', 'STUDENT', 'TEACHER', 'AI_TOOL', 'CONTENT_CREATION']),
  tags: z.array(z.string()),
  price: z.number(),
  currency: z.string(),
  subscription_tier: z.enum(['FREE', 'BASIC', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM']),
  status: z.enum(['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'PUBLISHED', 'ARCHIVED', 'SUSPENDED']),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'SCHOOL_ONLY', 'REGIONAL', 'FEATURED']),
  icon_url: z.string().nullable(),
  screenshots: z.array(z.string()),
  demo_url: z.string().nullable(),
  documentation_url: z.string().nullable(),
  version: z.string(),
  downloads: z.number(),
  rating_average: z.number(),
  rating_count: z.number(),
});

export const marketplaceProductUpdateSchema = z.object({
  school_id: schoolId.optional(),
  seller_id: z.string().optional(),
  product_type: z.enum(['APP', 'PLUGIN', 'EXTENSION', 'COURSE', 'BOOK', 'AI_MODEL', 'TEMPLATE', 'SERVICE', 'CONSULTANT', 'TUTOR', 'DIGITAL_PRODUCT']).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  category: z.enum(['LEARNING_MANAGEMENT', 'ASSESSMENT', 'COMMUNICATION', 'ANALYTICS', 'ADMINISTRATION', 'PARENT', 'STUDENT', 'TEACHER', 'AI_TOOL', 'CONTENT_CREATION']).optional(),
  tags: z.array(z.string()).optional(),
  price: z.number().optional(),
  currency: z.string().optional(),
  subscription_tier: z.enum(['FREE', 'BASIC', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM']).optional(),
  status: z.enum(['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'PUBLISHED', 'ARCHIVED', 'SUSPENDED']).optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'SCHOOL_ONLY', 'REGIONAL', 'FEATURED']).optional(),
  icon_url: z.string().nullable().optional(),
  screenshots: z.array(z.string()).optional(),
  demo_url: z.string().nullable().optional(),
  documentation_url: z.string().nullable().optional(),
  version: z.string().optional(),
  downloads: z.number().optional(),
  rating_average: z.number().optional(),
  rating_count: z.number().optional(),
});

// ── Marketplace Plugin ────────

export const marketplacePluginCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  plugin_type: z.string(),
  api_version: z.string(),
  min_platform_version: z.string(),
  config_schema: z.record(z.unknown()),
  permissions: z.array(z.string()),
});

export const marketplacePluginUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  plugin_type: z.string().optional(),
  api_version: z.string().optional(),
  min_platform_version: z.string().optional(),
  config_schema: z.record(z.unknown()).optional(),
  permissions: z.array(z.string()).optional(),
});

// ── Marketplace Extension ────────

export const marketplaceExtensionCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  extension_point: z.string(),
  manifest: z.record(z.unknown()),
});

export const marketplaceExtensionUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  extension_point: z.string().optional(),
  manifest: z.record(z.unknown()).optional(),
});

// ── Marketplace Course ────────

export const marketplaceCourseCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  instructor_id: z.string().uuid(),
  duration_hours: z.number(),
  lessons_count: z.number(),
  enrollment_count: z.number(),
  difficulty: z.string(),
  language: z.string(),
  certificate_included: z.boolean(),
});

export const marketplaceCourseUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  instructor_id: z.string().uuid().optional(),
  duration_hours: z.number().optional(),
  lessons_count: z.number().optional(),
  enrollment_count: z.number().optional(),
  difficulty: z.string().optional(),
  language: z.string().optional(),
  certificate_included: z.boolean().optional(),
});

// ── Marketplace Book ────────

export const marketplaceBookCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  author: z.string(),
  isbn: z.string().nullable(),
  page_count: z.number(),
  format: z.string(),
  language: z.string(),
});

export const marketplaceBookUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  author: z.string().optional(),
  isbn: z.string().nullable().optional(),
  page_count: z.number().optional(),
  format: z.string().optional(),
  language: z.string().optional(),
});

// ── Marketplace AI Model ────────

export const marketplaceAIModelCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  model_type: z.string(),
  model_size: z.string(),
  inference_time_ms: z.number(),
  accuracy: z.number(),
  api_endpoint: z.string().nullable(),
});

export const marketplaceAIModelUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  model_type: z.string().optional(),
  model_size: z.string().optional(),
  inference_time_ms: z.number().optional(),
  accuracy: z.number().optional(),
  api_endpoint: z.string().nullable().optional(),
});

// ── Marketplace Template ────────

export const marketplaceTemplateCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  template_type: z.string(),
  preview_url: z.string().nullable(),
  customizable: z.boolean(),
});

export const marketplaceTemplateUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  template_type: z.string().optional(),
  preview_url: z.string().nullable().optional(),
  customizable: z.boolean().optional(),
});

// ── Marketplace Service ────────

export const marketplaceServiceCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  provider_id: z.string().uuid(),
  service_type: z.string(),
  delivery_method: z.string(),
  sla: z.record(z.unknown()),
});

export const marketplaceServiceUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  provider_id: z.string().uuid().optional(),
  service_type: z.string().optional(),
  delivery_method: z.string().optional(),
  sla: z.record(z.unknown()).optional(),
});

// ── Marketplace Consultant ────────

export const marketplaceConsultantCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  consultant_id: z.string().uuid(),
  expertise: z.array(z.string()),
  hourly_rate: z.number(),
  availability: z.string(),
  rating: z.number(),
});

export const marketplaceConsultantUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  consultant_id: z.string().uuid().optional(),
  expertise: z.array(z.string()).optional(),
  hourly_rate: z.number().optional(),
  availability: z.string().optional(),
  rating: z.number().optional(),
});

// ── Marketplace Tutor ────────

export const marketplaceTutorCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  tutor_id: z.string().uuid(),
  subjects: z.array(z.string()),
  grade_levels: z.array(z.string()),
  hourly_rate: z.number(),
  rating: z.number(),
  sessions_completed: z.number(),
});

export const marketplaceTutorUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  tutor_id: z.string().uuid().optional(),
  subjects: z.array(z.string()).optional(),
  grade_levels: z.array(z.string()).optional(),
  hourly_rate: z.number().optional(),
  rating: z.number().optional(),
  sessions_completed: z.number().optional(),
});

// ── Digital Product ────────

export const digitalProductCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  file_url: z.string(),
  file_type: z.string(),
  file_size_bytes: z.number(),
  download_limit: z.number().nullable(),
});

export const digitalProductUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  file_url: z.string().optional(),
  file_type: z.string().optional(),
  file_size_bytes: z.number().optional(),
  download_limit: z.number().nullable().optional(),
});

// ── Product Subscription ────────

export const productSubscriptionCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  tier: z.enum(['FREE', 'BASIC', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM']),
  start_date: z.string(),
  end_date: z.string().nullable(),
  auto_renew: z.boolean(),
  status: z.string(),
});

export const productSubscriptionUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  tier: z.enum(['FREE', 'BASIC', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM']).optional(),
  start_date: z.string().optional(),
  end_date: z.string().nullable().optional(),
  auto_renew: z.boolean().optional(),
  status: z.string().optional(),
});

// ── Product Review ────────

export const productReviewCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  user_id: z.string().uuid(),
  rating: z.number(),
  title: z.string(),
  review_text: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  helpful_count: z.number(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED']),
});

export const productReviewUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  rating: z.number().optional(),
  title: z.string().optional(),
  review_text: z.string().optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  helpful_count: z.number().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED']).optional(),
});

// ── Product Rating ────────

export const productRatingCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  average_rating: z.number(),
  total_ratings: z.number(),
  distribution: z.record(z.number()),
  last_updated: z.string(),
});

export const productRatingUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  average_rating: z.number().optional(),
  total_ratings: z.number().optional(),
  distribution: z.record(z.number()).optional(),
  last_updated: z.string().optional(),
});

// ── Product License ────────

export const productLicenseCreateSchema = z.object({
  school_id: schoolId,
  product_id: z.string().uuid(),
  license_type: z.enum(['FREE', 'TRIAL', 'STANDARD', 'PREMIUM', 'ENTERPRISE', 'OPEN_SOURCE', 'CUSTOM']),
  license_key: z.string(),
  max_users: z.number().nullable(),
  valid_from: z.string(),
  valid_until: z.string().nullable(),
  status: z.string(),
});

export const productLicenseUpdateSchema = z.object({
  school_id: schoolId.optional(),
  product_id: z.string().uuid().optional(),
  license_type: z.enum(['FREE', 'TRIAL', 'STANDARD', 'PREMIUM', 'ENTERPRISE', 'OPEN_SOURCE', 'CUSTOM']).optional(),
  license_key: z.string().optional(),
  max_users: z.number().nullable().optional(),
  valid_from: z.string().optional(),
  valid_until: z.string().nullable().optional(),
  status: z.string().optional(),
});

// ── Marketplace Analytics ────────

export const marketplaceAnalyticsCreateSchema = z.object({
  school_id: schoolId,
  period: z.string(),
  total_products: z.number(),
  total_downloads: z.number(),
  total_revenue: z.number(),
  top_products: z.array(z.string()),
  generated_at: z.string(),
});

export const marketplaceAnalyticsUpdateSchema = z.object({
  school_id: schoolId.optional(),
  period: z.string().optional(),
  total_products: z.number().optional(),
  total_downloads: z.number().optional(),
  total_revenue: z.number().optional(),
  top_products: z.array(z.string()).optional(),
  generated_at: z.string().optional(),
});

// ── Product Category ────────

export const productCategoryCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  parent_id: z.string().uuid().nullable(),
  product_count: z.number(),
  icon: z.string(),
});

export const productCategoryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  parent_id: z.string().uuid().nullable().optional(),
  product_count: z.number().optional(),
  icon: z.string().optional(),
});

// ── Seller Profile ────────

export const sellerProfileCreateSchema = z.object({
  school_id: schoolId,
  user_id: z.string().uuid(),
  display_name: z.string(),
  description: z.string(),
  avatar_url: z.string(),
  products_count: z.number(),
  total_sales: z.number(),
  rating: z.number(),
  verified: z.boolean(),
});

export const sellerProfileUpdateSchema = z.object({
  school_id: schoolId.optional(),
  user_id: z.string().uuid().optional(),
  display_name: z.string().optional(),
  description: z.string().optional(),
  avatar_url: z.string().optional(),
  products_count: z.number().optional(),
  total_sales: z.number().optional(),
  rating: z.number().optional(),
  verified: z.boolean().optional(),
});

// ── Board ────────

export const boardCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  description: z.string(),
  board_type: z.string(),
  members: z.array(z.object({
    user_id: z.string().uuid(),
    name: z.string(),
    role: z.string(),
    join_date: z.string(),
    term_end_date: z.string().nullable(),
  })),
  status: z.enum(['ACTIVE', 'DISSOLVED', 'SUSPENDED']),
  established_date: z.string(),
  meeting_frequency: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL', 'AD_HOC']),
});

export const boardUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  board_type: z.string().optional(),
  members: z.array(z.object({
    user_id: z.string().uuid(),
    name: z.string(),
    role: z.string(),
    join_date: z.string(),
    term_end_date: z.string().nullable(),
  })).optional(),
  status: z.enum(['ACTIVE', 'DISSOLVED', 'SUSPENDED']).optional(),
  established_date: z.string().optional(),
  meeting_frequency: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL', 'AD_HOC']).optional(),
});

// ── Board Meeting ────────

export const boardMeetingCreateSchema = z.object({
  school_id: schoolId,
  board_id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  agenda: z.array(z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    presenter: z.string(),
    duration_minutes: z.number(),
    order: z.number(),
  })),
  attendees: z.array(z.object({
    user_id: z.string().uuid(),
    name: z.string(),
    role: z.string(),
    attended: z.boolean(),
    apology: z.boolean(),
  })),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'POSTPONED']),
  minutes_url: z.string().nullable(),
});

export const boardMeetingUpdateSchema = z.object({
  school_id: schoolId.optional(),
  board_id: z.string().uuid().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  agenda: z.array(z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    presenter: z.string(),
    duration_minutes: z.number(),
    order: z.number(),
  })).optional(),
  attendees: z.array(z.object({
    user_id: z.string().uuid(),
    name: z.string(),
    role: z.string(),
    attended: z.boolean(),
    apology: z.boolean(),
  })).optional(),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'POSTPONED']).optional(),
  minutes_url: z.string().nullable().optional(),
});

// ── Committee ────────

export const committeeCreateSchema = z.object({
  school_id: schoolId,
  board_id: z.string().uuid().nullable(),
  name: z.string(),
  committee_type: z.enum(['ACADEMIC', 'FINANCE', 'DISCIPLINARY', 'HR', 'INFRASTRUCTURE', 'TECHNOLOGY', 'PARENT', 'STUDENT']),
  description: z.string(),
  chair_id: z.string().uuid(),
  members: z.array(z.object({
    user_id: z.string().uuid(),
    name: z.string(),
    role: z.string(),
    join_date: z.string(),
  })),
  status: z.string(),
});

export const committeeUpdateSchema = z.object({
  school_id: schoolId.optional(),
  board_id: z.string().uuid().nullable().optional(),
  name: z.string().optional(),
  committee_type: z.enum(['ACADEMIC', 'FINANCE', 'DISCIPLINARY', 'HR', 'INFRASTRUCTURE', 'TECHNOLOGY', 'PARENT', 'STUDENT']).optional(),
  description: z.string().optional(),
  chair_id: z.string().uuid().optional(),
  members: z.array(z.object({
    user_id: z.string().uuid(),
    name: z.string(),
    role: z.string(),
    join_date: z.string(),
  })).optional(),
  status: z.string().optional(),
});

// ── Voting ────────

export const votingCreateSchema = z.object({
  school_id: schoolId,
  meeting_id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  options: z.array(z.object({
    id: z.string().uuid(),
    label: z.string(),
    votes_count: z.number(),
  })),
  deadline: z.string(),
  status: z.enum(['OPEN', 'CLOSED', 'CANCELLED', 'QUORUM_NOT_MET']),
  quorum_percentage: z.number(),
  voters_count: z.number(),
});

export const votingUpdateSchema = z.object({
  school_id: schoolId.optional(),
  meeting_id: z.string().uuid().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  options: z.array(z.object({
    id: z.string().uuid(),
    label: z.string(),
    votes_count: z.number(),
  })).optional(),
  deadline: z.string().optional(),
  status: z.enum(['OPEN', 'CLOSED', 'CANCELLED', 'QUORUM_NOT_MET']).optional(),
  quorum_percentage: z.number().optional(),
  voters_count: z.number().optional(),
});

// ── Resolution ────────

export const resolutionCreateSchema = z.object({
  school_id: schoolId,
  meeting_id: z.string().uuid().nullable(),
  title: z.string(),
  description: z.string(),
  proposed_by: z.string().uuid(),
  status: z.enum(['PROPOSED', 'DISCUSSED', 'APPROVED', 'REJECTED', 'IMPLEMENTED', 'ARCHIVED']),
  implementation_deadline: z.string().nullable(),
  assigned_to: z.string().uuid().nullable(),
});

export const resolutionUpdateSchema = z.object({
  school_id: schoolId.optional(),
  meeting_id: z.string().uuid().nullable().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  proposed_by: z.string().uuid().optional(),
  status: z.enum(['PROPOSED', 'DISCUSSED', 'APPROVED', 'REJECTED', 'IMPLEMENTED', 'ARCHIVED']).optional(),
  implementation_deadline: z.string().nullable().optional(),
  assigned_to: z.string().uuid().nullable().optional(),
});

// ── School Policy ────────

export const schoolPolicyCreateSchema = z.object({
  school_id: schoolId,
  title: z.string(),
  description: z.string(),
  policy_number: z.string(),
  category: z.string(),
  effective_date: z.string(),
  review_date: z.string().nullable(),
  status: z.enum(['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'RETIRED', 'ARCHIVED']),
  version: z.number(),
  document_url: z.string().nullable(),
});

export const schoolPolicyUpdateSchema = z.object({
  school_id: schoolId.optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  policy_number: z.string().optional(),
  category: z.string().optional(),
  effective_date: z.string().optional(),
  review_date: z.string().nullable().optional(),
  status: z.enum(['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'RETIRED', 'ARCHIVED']).optional(),
  version: z.number().optional(),
  document_url: z.string().nullable().optional(),
});

// ── Compliance Check ────────

export const complianceCheckCreateSchema = z.object({
  school_id: schoolId,
  policy_id: z.string().uuid().nullable(),
  check_name: z.string(),
  description: z.string(),
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'UNDER_REVIEW', 'EXEMPT']),
  last_checked: z.string(),
  next_check: z.string(),
  findings: z.array(z.string()),
});

export const complianceCheckUpdateSchema = z.object({
  school_id: schoolId.optional(),
  policy_id: z.string().uuid().nullable().optional(),
  check_name: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'UNDER_REVIEW', 'EXEMPT']).optional(),
  last_checked: z.string().optional(),
  next_check: z.string().optional(),
  findings: z.array(z.string()).optional(),
});

// ── Legal Document ────────

export const legalDocumentCreateSchema = z.object({
  school_id: schoolId,
  document_type: z.enum(['CONTRACT', 'POLICY', 'BYLAWS', 'REGULATION', 'MEMORANDUM', 'AGREEMENT', 'CERTIFICATE', 'LICENSE']),
  title: z.string(),
  description: z.string(),
  file_url: z.string(),
  effective_date: z.string(),
  expiry_date: z.string().nullable(),
  status: z.string(),
});

export const legalDocumentUpdateSchema = z.object({
  school_id: schoolId.optional(),
  document_type: z.enum(['CONTRACT', 'POLICY', 'BYLAWS', 'REGULATION', 'MEMORANDUM', 'AGREEMENT', 'CERTIFICATE', 'LICENSE']).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  file_url: z.string().optional(),
  effective_date: z.string().optional(),
  expiry_date: z.string().nullable().optional(),
  status: z.string().optional(),
});

// ── Decision Tracking ────────

export const decisionTrackingCreateSchema = z.object({
  school_id: schoolId,
  title: z.string(),
  description: z.string(),
  decision_by: z.string().uuid(),
  decision_date: z.string(),
  status: z.enum(['PROPOSED', 'UNDER_CONSIDERATION', 'APPROVED', 'REJECTED', 'IMPLEMENTED']),
  rationale: z.string(),
  impact_assessment: z.string(),
});

export const decisionTrackingUpdateSchema = z.object({
  school_id: schoolId.optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  decision_by: z.string().uuid().optional(),
  decision_date: z.string().optional(),
  status: z.enum(['PROPOSED', 'UNDER_CONSIDERATION', 'APPROVED', 'REJECTED', 'IMPLEMENTED']).optional(),
  rationale: z.string().optional(),
  impact_assessment: z.string().optional(),
});

// ── Risk Register ────────

export const riskRegisterCreateSchema = z.object({
  school_id: schoolId,
  title: z.string(),
  description: z.string(),
  risk_level: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  probability: z.number(),
  impact: z.number(),
  risk_score: z.number(),
  mitigation: z.string(),
  owner: z.string().uuid(),
  status: z.string(),
  review_date: z.string(),
});

export const riskRegisterUpdateSchema = z.object({
  school_id: schoolId.optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  risk_level: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  probability: z.number().optional(),
  impact: z.number().optional(),
  risk_score: z.number().optional(),
  mitigation: z.string().optional(),
  owner: z.string().uuid().optional(),
  status: z.string().optional(),
  review_date: z.string().optional(),
});

// ── Internal Control ────────

export const internalControlCreateSchema = z.object({
  school_id: schoolId,
  control_type: z.enum(['PREVENTIVE', 'DETECTIVE', 'CORRECTIVE', 'COMPENSATING']),
  name: z.string(),
  description: z.string(),
  effectiveness: z.string(),
  last_reviewed: z.string(),
  owner: z.string().uuid(),
});

export const internalControlUpdateSchema = z.object({
  school_id: schoolId.optional(),
  control_type: z.enum(['PREVENTIVE', 'DETECTIVE', 'CORRECTIVE', 'COMPENSATING']).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  effectiveness: z.string().optional(),
  last_reviewed: z.string().optional(),
  owner: z.string().uuid().optional(),
});

// ── Governance Analytics ────────

export const governanceAnalyticsCreateSchema = z.object({
  school_id: schoolId,
  period: z.string(),
  meetings_held: z.number(),
  resolutions_passed: z.number(),
  policies_reviewed: z.number(),
  compliance_score: z.number(),
  risk_summary: z.record(z.number()),
  generated_at: z.string(),
});

export const governanceAnalyticsUpdateSchema = z.object({
  school_id: schoolId.optional(),
  period: z.string().optional(),
  meetings_held: z.number().optional(),
  resolutions_passed: z.number().optional(),
  policies_reviewed: z.number().optional(),
  compliance_score: z.number().optional(),
  risk_summary: z.record(z.number()).optional(),
  generated_at: z.string().optional(),
});
