export const ministryConfig = {
  enabled: true,
  ministry: {
    levels: ['national', 'regional', 'departmental'],
    departments: { maxCount: 50, autoSync: true },
    directorates: { hierarchy: 'strict', approval: true },
    inspectorates: { zones: 100, autoAssign: true },
    circulars: { approvalWorkflow: true, distribution: 'broadcast' },
    committees: { maxMembers: 20, quorum: 0.5 },
    tasks: { priority: 'high', delegation: true },
    meetings: { recurrence: true, minutes: true },
    decisions: { votingThreshold: 0.6, appealWindow: 30 },
    reports: { frequency: 'monthly', templates: true },
    correspondence: { tracking: true, encryption: true },
    archive: { retentionYears: 10, autoArchive: true },
    personnel: { headcount: 5000, hrmIntegration: true },
    budget: { fiscalYear: 'january', approvalChain: 3 },
    procurement: { threshold: 1000000, tenderRequired: true },
    assets: { tracking: true, depreciation: true },
    compliance: { auditFrequency: 'quarterly', penalties: true },
    international: { treaties: true, bilateral: true },
    communications: { internal: true, external: true, press: true },
    digitalServices: { portal: true, mobileApp: true, api: true },
    dataGovernance: { classification: true, dpo: true },
    qualityManagement: { iso: true, continuousImprovement: true },
    strategicPlanning: { balancedScorecard: true, kpis: true },
    changeManagement: { framework: true, training: true },
    riskManagement: { framework: true, register: true, mitigation: true },
    performanceManagement: { appraisal: true, objectives: true },
    knowledgeManagement: { repository: true, lessonsLearned: true },
    stakeholderEngagement: { consultation: true, feedback: true },
    publicRelations: { mediaRelations: true, crisisCommunication: true },
    legalAffairs: { drafting: true, review: true, compliance: true },
    statisticsUnit: { dataCollection: true, analysis: true, reporting: true },
    modernization: { digitization: true, processReengineering: true },
    decentralization: { delegation: true, oversight: true, coordination: true },
    monitoring: { indicators: true, dashboards: true, alerts: true },
    evaluation: { methodology: true, thirdParty: true },
    training: { programs: true, certification: true, tracking: true },
    library: { digital: true, physical: true, catalog: true },
    protocol: { ceremonies: true, visits: true, diplomatic: true },
    security: { accessControl: true, surveillance: true, emergency: true },
    sustainability: { environmental: true, social: true, governance: true },
    innovation: { lab: true, hackathons: true, pilots: true },
    transparency: { openData: true, freedomOfInfo: true },
    partnerships: { publicPrivate: true, civilSociety: true },
    regional: { coordination: true, harmonization: true, support: true },
    planning: { annual: true, mediumTerm: true, longTerm: true },
    reporting: { templates: true, schedules: true, distribution: true },
    approval: { workflow: true, escalation: true, delegation: true },
    archival: { digital: true, physical: true, retention: true },
    legal: { compliance: true, audit: true, review: true },
    finance: { budgeting: true, accounting: true, treasury: true },
    hr: { recruitment: true, payroll: true, benefits: true },
    it: { infrastructure: true, security: true, support: true },
    collaboration: { tools: true, platforms: true, protocols: true },
    documentation: { templates: true, versioning: true, access: true },
    events: { planning: true, execution: true, followUp: true },
    surveys: { design: true, collection: true, analysis: true },
    mapping: { gis: true, spatial: true, overlays: true },
    forecasting: { models: true, scenarios: true, projections: true },
    benchmarking: { national: true, international: true, sectoral: true },
    advocacy: { campaigns: true, awareness: true, mobilization: true },
    coordination2: { interMinisterial: true, interAgency: true, local: true },
    oversight: { internal: true, external: true, parliamentary: true },
    capacity: { building: true, mentoring: true, coaching: true },
    resilience: { planning: true, testing: true, recovery: true },
    inclusivity: { gender: true, disability: true, youth: true },
    accessibility: { physical: true, digital: true, communication: true },
    gender: { mainstreaming: true, equality: true, empowerment: true },
    youth: { engagement: true, programs: true, leadership: true },
    community: { engagement: true, participation: true, development: true },
    environment: { protection: true, conservation: true, sustainability: true },
    health: { safety: true, wellness: true, occupational: true },
    education: { training: true, development: true, certification: true },
    culture: { preservation: true, promotion: true, heritage: true },
    sports: { programs: true, facilities: true, events: true },
    tourism: { promotion: true, development: true, marketing: true },
    agriculture: { policy: true, support: true, modernization: true },
    industry: { development: true, regulation: true, promotion: true },
    trade: { policy: true, facilitation: true, agreements: true },
    energy: { policy: true, renewable: true, efficiency: true },
    transport: { infrastructure: true, regulation: true, safety: true },
    housing: { policy: true, construction: true, affordability: true },
    water: { supply: true, sanitation: true, conservation: true },
    telecom: { infrastructure: true, regulation: true, universal: true },
    justice: { courts: true, legalAid: true, reform: true },
    defense: { policy: true, coordination: true, veteran: true },
    foreign: { policy: true, diplomacy: true, consular: true },
    immigration: { policy: true, visas: true, citizenship: true },
    customs: { facilitation: true, enforcement: true, valuation: true },
    tax: { policy: true, collection: true, enforcement: true },
    treasury: { management: true, debt: true, investment: true },
    audit: { internal: true, external: true, performance: true },
    standards: { quality: true, safety: true, metrology: true },
    patent: { filing: true, examination: true, enforcement: true },
    copyright: { registration: true, protection: true, licensing: true },
    competition: { policy: true, enforcement: true, merger: true },
    consumer: { protection: true, education: true, redress: true },
    cybersecurity: { strategy: true, incident: true, awareness: true },
    digitalIdentity: { authentication: true, verification: true, privacy: true },
    eGovernment: { portal: true, services: true, integration: true },
    openData: { policy: true, standards: true, publishing: true },
    smartCity: { infrastructure: true, services: true, governance: true },
    artificialIntelligence: { strategy: true, ethics: true, adoption: true },
    blockchain: { strategy: true, pilots: true, governance: true },
    iot: { strategy: true, standards: true, security: true },
    cloud: { strategy: true, migration: true, security: true },
    bigData: { strategy: true, analytics: true, governance: true },
  },
  notifications: {
    email: { enabled: true, templates: 50, rateLimit: 100 },
    sms: { enabled: true, provider: 'orange', costTracking: true },
    push: { enabled: true, platforms: ['ios', 'android', 'web'] },
    inApp: { enabled: true, realTime: true, history: true },
    webhook: { enabled: true, retryPolicy: 3, timeout: 30 },
    broadcast: { enabled: true, channels: 10, scheduling: true },
    emergency: { enabled: true, priority: 'critical', escalation: true },
    digest: { enabled: true, frequency: 'daily', customization: true },
    announcement: { enabled: true, targeting: true, scheduling: true },
    alert: { enabled: true, severity: ['low', 'medium', 'high', 'critical'] },
  },
  security: {
    authentication: { mfa: true, biometric: true, sso: true },
    authorization: { rbac: true, abac: true, hierarchical: true },
    encryption: { atRest: true, inTransit: true, keyRotation: 90 },
    session: { timeout: 30, maxConcurrent: 5, renewal: true },
    password: { minLength: 12, complexity: true, history: 12 },
    lockout: { attempts: 5, duration: 15, progressive: true },
    audit: { login: true, dataAccess: true, adminActions: true },
    compliance: { gdpr: true, hipaa: false, sox: true },
    vulnerability: { scanning: true, patching: true, reporting: true },
    incident: { response: true, forensics: true, notification: true },
    backup: { frequency: 'daily', retention: 90, offsite: true },
    disaster: { recovery: true, rto: 4, rpo: 1, testing: true },
    monitoring: { siem: true, ids: true, ips: true },
    firewall: { enabled: true, rules: 500, review: 'monthly' },
    ddos: { protection: true, mitigation: true, scaling: true },
    api: { rateLimit: 1000, throttling: true, versioning: true },
    dataLoss: { prevention: true, classification: true, monitoring: true },
    access: { control: true, review: 'quarterly', approval: true },
    privacy: { impactAssessment: true, byDesign: true, officer: true },
    governance: { policy: true, framework: true, metrics: true },
  },
  integrations: {
    erp: { enabled: true, biDirectional: true, realTime: true },
    lms: { enabled: true, standards: 'xAPI', scorm: true },
    sis: { enabled: true, sync: 'realTime', validation: true },
    hrSystem: { enabled: true, payroll: true, benefits: true },
    financial: { enabled: true, accounting: true, treasury: true },
    crm: { enabled: true, segments: true, automation: true },
    email: { provider: 'sendgrid', templates: true, analytics: true },
    payment: { gateway: 'moneyFusion', currencies: ['XOF', 'USD'] },
    sms: { provider: 'orange', bulk: true, international: true },
    storage: { provider: 'supabase', encryption: true, cdn: true },
    analytics: { provider: 'plausible', realTime: true, export: true },
    monitoring: { provider: 'datadog', apm: true, logs: true },
    ciCd: { provider: 'github', actions: true, secrets: true },
    container: { orchestration: 'kubernetes', registry: true, helm: true },
    cache: { provider: 'redis', cluster: true, persistence: true },
    queue: { provider: 'rabbitmq', clustering: true, deadLetter: true },
    search: { provider: 'elasticsearch', indexing: true, fullText: true },
    email2: { provider: 'mailgun', tracking: true, webhooks: true },
    calendar: { provider: 'google', sync: true, booking: true },
    maps: { provider: 'mapbox', geocoding: true, routing: true },
    notification: { provider: 'firebase', topics: true, segmentation: true },
    biometric: { fingerprint: true, face: true, voice: true },
    blockchain: { network: 'ethereum', smartContracts: true, ipfs: true },
    ai: { provider: 'deepseek', models: ['gpt4', 'claude'], fineTuning: true },
    ml: { training: true, inference: true, monitoring: true },
    iot: { protocol: 'mqtt', deviceRegistry: true, edge: true },
    video: { streaming: true, recording: true, transcription: true },
    voice: { recognition: true, synthesis: true, telephony: true },
    ar: { enabled: true, markers: true, overlay: true },
    vr: { enabled: true, environments: true, collaboration: true },
    qrCode: { generation: true, scanning: true, analytics: true },
    barcode: { generation: true, scanning: true, inventory: true },
    nfc: { enabled: true, payments: true, identification: true },
    bluetooth: { enabled: true, beacons: true, tracking: true },
    gps: { tracking: true, geofencing: true, routing: true },
    camera: { capture: true, video: true, analysis: true },
    ocr: { enabled: true, languages: ['fr', 'en'], accuracy: 99 },
    translation: { provider: 'deepl', languages: 50, realtime: true },
    currency: { converter: true, providers: ['ecb', 'openex'], caching: true },
    weather: { provider: 'openweather', forecast: true, alerts: true },
    news: { aggregation: true, filtering: true, sentiment: true },
    social: { platforms: ['twitter', 'linkedin', 'facebook'], moderation: true },
    marketplace: { enabled: true, vendors: 100, commission: 0.1 },
    survey: { provider: 'typeform', nps: true, analytics: true },
    form: { builder: true, validation: true, submission: true },
    workflow: { engine: 'temporal', visual: true, automation: true },
    rpa: { enabled: true, bots: 10, monitoring: true },
    bi: { dashboards: true, reports: true, export: true },
    dataWarehouse: { enabled: true, etl: true, warehousing: true },
    masterData: { management: true, governance: true, quality: true },
  },
  analytics: {
    realTime: { enabled: true, latency: 100, retention: 30 },
    historical: { enabled: true, retention: 365, aggregation: true },
    predictive: { enabled: true, models: 20, retraining: 'weekly' },
    prescriptive: { enabled: true, recommendations: true, automation: true },
    descriptive: { enabled: true, dashboards: true, reports: true },
    diagnostic: { enabled: true, drillDown: true, correlation: true },
    cohort: { enabled: true, segments: 50, retention: true },
    funnel: { enabled: true, stages: 20, visualization: true },
    path: { enabled: true, visualization: true, optimization: true },
    retention: { enabled: true, prediction: true, cohorts: true },
    engagement: { scoring: true, segmentation: true, automation: true },
    sentiment: { enabled: true, languages: ['fr', 'en'], realtime: true },
    attribution: { model: 'multiTouch', channels: 20, window: 30 },
    ab: { testing: true, significance: 0.95, minSample: 1000 },
    heatmaps: { enabled: true, recording: true, analysis: true },
    funnel2: { conversion: true, dropoff: true, optimization: true },
    cohort2: { acquisition: true, behavioral: true, predictive: true },
    rfm: { enabled: true, segments: 8, automation: true },
    ltv: { enabled: true, prediction: true, optimization: true },
    churn: { prediction: true, prevention: true, scoring: true },
    crossSell: { enabled: true, recommendations: true, automation: true },
    upsell: { enabled: true, triggers: true, automation: true },
    personalization: { engine: true, rules: 100, realtime: true },
    recommendation: { collaborative: true, content: true, hybrid: true },
    anomaly: { detection: true, alerting: true, investigation: true },
    fraud: { detection: true, prevention: true, investigation: true },
    compliance: { monitoring: true, reporting: true, automation: true },
    quality: { scoring: true, monitoring: true, improvement: true },
    performance: { benchmarking: true, optimization: true, alerting: true },
    cost: { tracking: true, optimization: true, forecasting: true },
    revenue: { forecasting: true, optimization: true, attribution: true },
    customer: { segmentation: true, profiling: true, scoring: true },
    market: { analysis: true, trends: true, forecasting: true },
    competitive: { analysis: true, benchmarking: true, intelligence: true },
    brand: { tracking: true, sentiment: true, awareness: true },
    content: { performance: true, optimization: true, recommendation: true },
    social: { listening: true, sentiment: true, engagement: true },
    email: { performance: true, deliverability: true, optimization: true },
    seo: { ranking: true, keywords: true, optimization: true },
    ppc: { performance: true, optimization: true, automation: true },
    display: { performance: true, targeting: true, optimization: true },
    video: { engagement: true, completion: true, optimization: true },
    mobile: { engagement: true, retention: true, optimization: true },
    web: { performance: true, usability: true, optimization: true },
    app: { engagement: true, retention: true, optimization: true },
    api: { performance: true, usage: true, optimization: true },
    database: { performance: true, optimization: true, monitoring: true },
    infrastructure: { performance: true, capacity: true, optimization: true },
    security: { monitoring: true, threat: true, compliance: true },
    operational: { efficiency: true, productivity: true, quality: true },
  },
  reporting: {
    scheduled: { enabled: true, frequencies: ['daily', 'weekly', 'monthly'] },
    adhoc: { enabled: true, export: ['pdf', 'xlsx', 'csv'], maxRows: 100000 },
    realtime: { enabled: true, dashboards: true, alerts: true },
    compliance: { enabled: true, templates: 50, automation: true },
    financial: { enabled: true, consolidation: true, multiCurrency: true },
    operational: { enabled: true, kpis: true, benchmarking: true },
    executive: { enabled: true, summary: true, drilldown: true },
    board: { enabled: true, packaging: true, presentation: true },
    regulatory: { enabled: true, filing: true, tracking: true },
    audit: { enabled: true, trail: true, evidence: true },
    tax: { enabled: true, filing: true, reconciliation: true },
    statutory: { enabled: true, filing: true, deadlines: true },
    management: { enabled: true, variance: true, forecasting: true },
    departmental: { enabled: true, budgeting: true, performance: true },
    project: { enabled: true, tracking: true, milestones: true },
    risk: { enabled: true, assessment: true, mitigation: true },
    incident: { enabled: true, tracking: true, escalation: true },
    quality: { enabled: true, scoring: true, improvement: true },
    customer: { enabled: true, satisfaction: true, feedback: true },
    vendor: { enabled: true, performance: true, compliance: true },
    hr: { enabled: true, headcount: true, turnover: true },
    payroll: { enabled: true, reconciliation: true, tax: true },
    benefits: { enabled: true, enrollment: true, utilization: true },
    training: { enabled: true, completion: true, effectiveness: true },
    recruitment: { enabled: true, pipeline: true, metrics: true },
    performance: { enabled: true, reviews: true, goals: true },
    succession: { enabled: true, planning: true, readiness: true },
    diversity: { enabled: true, metrics: true, goals: true },
    engagement: { enabled: true, surveys: true, action: true },
    retention: { enabled: true, prediction: true, intervention: true },
    compensation: { enabled: true, benchmarking: true, equity: true },
    benefits2: { enabled: true, cost: true, utilization: true },
    health: { enabled: true, incidents: true, wellness: true },
    safety: { enabled: true, incidents: true, compliance: true },
    environment: { enabled: true, emissions: true, sustainability: true },
    social: { enabled: true, impact: true, reporting: true },
    governance: { enabled: true, compliance: true, ethics: true },
    esg: { enabled: true, metrics: true, benchmarking: true },
    sustainability: { enabled: true, targets: true, progress: true },
    innovation: { enabled: true, pipeline: true, roi: true },
    research: { enabled: true, output: true, impact: true },
    partnership: { enabled: true, performance: true, roi: true },
    community: { enabled: true, engagement: true, impact: true },
    media: { enabled: true, coverage: true, sentiment: true },
    brand: { enabled: true, awareness: true, equity: true },
    digital: { enabled: true, channels: true, performance: true },
    ai: { enabled: true, model: true, performance: true },
    data: { enabled: true, quality: true, governance: true },
    cloud: { enabled: true, cost: true, performance: true },
    security2: { enabled: true, incidents: true, compliance: true },
  },
  workflow: {
    engine: { type: 'stateMachine', persistence: true, versioning: true },
    designer: { visual: true, templates: true, export: true },
    execution: { parallel: true, timeout: 3600, retry: true },
    approval: { levels: 5, delegation: true, escalation: true },
    notification: { channels: ['email', 'sms', 'push'], batching: true },
    forms: { builder: true, validation: true, conditional: true },
    routing: { rules: 100, conditions: true, fallback: true },
    automation: { triggers: 50, actions: 100, conditions: true },
    integration: { webhooks: true, api: true, batch: true },
    monitoring: { realtime: true, alerts: true, analytics: true },
    versioning: { enabled: true, rollback: true, diff: true },
    testing: { sandbox: true, simulation: true, validation: true },
    governance: { access: true, audit: true, compliance: true },
    optimization: { bottleneck: true, throughput: true, efficiency: true },
    ai: { optimization: true, prediction: true, automation: true },
  },
};

export const registryConfig = {
  enabled: true,
  nationalRegistry: {
    population: { tracking: true, biometric: true, deduplication: true },
    identity: { documentTypes: 20, verification: true, blockchain: true },
    census: { frequency: 10, realtime: true, api: true },
    vitalRecords: { birth: true, death: true, marriage: true, divorce: true },
    address: { management: true, geocoding: true, validation: true },
    citizenship: { acquisition: true, renunciation: true, dual: false },
    immigration: { visas: true, permits: true, residency: true },
    demographics: { tracking: true, analytics: true, forecasting: true },
    household: { management: true, linking: true, headcount: true },
    education: { records: true, credentials: true, verification: true },
    employment: { records: true, verification: true, history: true },
    health: { records: true, vaccination: true, insurance: true },
    property: { ownership: true, transactions: true, valuation: true },
    vehicle: { registration: true, ownership: true, inspection: true },
    business: { registration: true, licensing: true, compliance: true },
    tax: { registration: true, filing: true, compliance: true },
    social: { benefits: true, eligibility: true, disbursement: true },
    electoral: { registration: true, verification: true, history: true },
    criminal: { records: true, background: true, clearance: true },
    judicial: { records: true, cases: true, decisions: true },
    financial: { credit: true, banking: true, investment: true },
    insurance: { policies: true, claims: true, verification: true },
    pension: { enrollment: true, benefits: true, tracking: true },
    land: { registry: true, transactions: true, valuation: true },
    water: { rights: true, allocation: true, monitoring: true },
    mining: { rights: true, concessions: true, compliance: true },
    forestry: { concessions: true, monitoring: true, compliance: true },
    fisheries: { licenses: true, quotas: true, compliance: true },
    aviation: { licenses: true, registrations: true, safety: true },
    maritime: { vessels: true, crews: true, safety: true },
    telecommunications: { licenses: true, spectrum: true, compliance: true },
    energy: { licenses: true, production: true, distribution: true },
    tourism: { licenses: true, inspections: true, compliance: true },
    media: { licenses: true, content: true, compliance: true },
    agriculture: { subsidies: true, inspections: true, compliance: true },
    health2: { facilities: true, professionals: true, compliance: true },
    education2: { institutions: true, accreditation: true, compliance: true },
    construction: { permits: true, inspections: true, compliance: true },
    environmental: { permits: true, monitoring: true, compliance: true },
    food: { safety: true, inspections: true, compliance: true },
    pharmaceutical: { registration: true, monitoring: true, compliance: true },
    chemical: { registration: true, safety: true, compliance: true },
    nuclear: { licenses: true, safety: true, monitoring: true },
    defense: { procurement: true, inventory: true, compliance: true },
    foreign: { treaties: true, agreements: true, compliance: true },
    customs: { declarations: true, valuation: true, compliance: true },
    trade: { agreements: true, quotas: true, compliance: true },
    investment: { registration: true, incentives: true, compliance: true },
    immigration2: { quotas: true, skills: true, compliance: true },
    refugee: { registration: true, services: true, compliance: true },
    stateless: { registration: true, resolution: true, compliance: true },
  },
  dataQuality: {
    validation: { rules: 1000, automated: true, manual: true },
    cleansing: { deduplication: true, standardization: true, enrichment: true },
    monitoring: { realtime: true, alerts: true, dashboards: true },
    governance: { policies: true, roles: true, workflows: true },
    profiling: { automated: true, continuous: true, reporting: true },
    matching: { algorithm: 'probabilistic', threshold: 0.9, fuzzy: true },
    deduplication: { algorithm: 'ml', confidence: 0.95, manual: true },
    enrichment: { sources: 10, automated: true, validation: true },
    standardization: { formats: 50, international: true, realtime: true },
    monitoring2: { completeness: true, accuracy: true, timeliness: true },
  },
  interoperability: {
    standards: { hl7: true, fhir: true, openEHR: true, cda: true },
    protocols: { rest: true, soap: true, graphql: true, grpc: true },
    formats: { json: true, xml: true, csv: true, hl7v2: true },
    authentication: { oauth2: true, saml: true, jwt: true, api_key: true },
    encryption: { tls: true, aes: true, rsa: true },
    validation: { schema: true, business: true, cross: true },
    transformation: { mapping: true, normalization: true, aggregation: true },
    routing: { rules: 100, conditions: true, fallback: true },
    monitoring: { realtime: true, alerts: true, analytics: true },
    governance: { policies: true, sla: true, compliance: true },
  },
  consent: {
    management: { granular: true, revocable: true, portable: true },
    collection: { digital: true, paper: true, verbal: true },
    storage: { encrypted: true, auditable: true, retrievable: true },
    sharing: { purposes: 50, recipients: 100, restrictions: true },
    withdrawal: { easy: true, immediate: true, notification: true },
    audit: { trail: true, reporting: true, compliance: true },
    guardianship: { minors: true, incapacitated: true, delegation: true },
    research: { optIn: true, anonymization: true, ethics: true },
    commercial: { optIn: true, targeting: true, profiling: true },
    thirdParty: { agreements: true, monitoring: true, compliance: true },
  },
  notifications2: {
    email: { enabled: true, templates: 20, rateLimit: 50 },
    sms: { enabled: true, provider: 'orange', costTracking: true },
    push: { enabled: true, platforms: ['ios', 'android', 'web'] },
    inApp: { enabled: true, realTime: true, history: true },
    webhook: { enabled: true, retryPolicy: 3, timeout: 30 },
    broadcast: { enabled: true, channels: 5, scheduling: true },
    emergency: { enabled: true, priority: 'critical', escalation: true },
    digest: { enabled: true, frequency: 'daily', customization: true },
  },
  security2: {
    authentication: { mfa: true, biometric: true, sso: true },
    authorization: { rbac: true, abac: true, hierarchical: true },
    encryption: { atRest: true, inTransit: true, keyRotation: 90 },
    session: { timeout: 30, maxConcurrent: 5, renewal: true },
    password: { minLength: 12, complexity: true, history: 12 },
    lockout: { attempts: 5, duration: 15, progressive: true },
    audit: { login: true, dataAccess: true, adminActions: true },
    compliance: { gdpr: true, hipaa: false, sox: true },
    vulnerability: { scanning: true, patching: true, reporting: true },
    incident: { response: true, forensics: true, notification: true },
    backup: { frequency: 'daily', retention: 90, offsite: true },
    disaster: { recovery: true, rto: 4, rpo: 1, testing: true },
    monitoring: { siem: true, ids: true, ips: true },
    privacy: { impactAssessment: true, byDesign: true, officer: true },
  },
  analytics2: {
    realTime: { enabled: true, latency: 100, retention: 30 },
    historical: { enabled: true, retention: 365, aggregation: true },
    predictive: { enabled: true, models: 10, retraining: 'monthly' },
    descriptive: { enabled: true, dashboards: true, reports: true },
    diagnostic: { enabled: true, drillDown: true, correlation: true },
    cohort: { enabled: true, segments: 20, retention: true },
    demographic: { enabled: true, age: true, gender: true, location: true },
    geographic: { enabled: true, mapping: true, heatmaps: true },
    temporal: { enabled: true, trends: true, seasonality: true },
    comparative: { enabled: true, benchmarking: true, ranking: true },
  },
};

export const examsConfig = {
  enabled: true,
  examinationAuthority: {
    examinationTypes: {
      national: { BEPC: true, BAC: true, BTS: true, DUT: true },
      professional: { CQP: true, CAP: true, BEP: true },
      competitive: { entrance: true, promotion: true, certification: true },
      continuous: { formative: true, certificative: true, summative: true },
    },
    registration: {
      online: true, deadline: 30, lateFee: true, verification: true,
    },
    scheduling: {
      conflictDetection: true, roomAllocation: true, invigilatorAssignment: true,
    },
    questionBank: {
      types: ['qcm', 'open', 'practical', 'oral'],
      difficulty: ['easy', 'medium', 'hard'],
      bloom: ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'],
      versioning: true, randomization: true, security: true,
    },
    examGeneration: {
      templates: true, algorithm: 'adaptive', balancing: true,
    },
    grading: {
      automatic: true, manual: true, blind: true, doubleMarking: true,
    },
    analysis: {
      itemAnalysis: true, difficultyIndex: true, discriminationIndex: true,
    },
    results: {
      publication: true, appeals: true, statistics: true,
    },
    security: {
      antiCheat: true, proctoring: true, identityVerification: true,
    },
    certificates: {
      generation: true, verification: true, blockchain: true,
    },
    archive: {
      digital: true, physical: true, retention: 50, access: 'restricted',
    },
    subjects: {
      mathematics: { levels: 5, coefficient: 4, hours: 200 },
      french: { levels: 5, coefficient: 3, hours: 180 },
      english: { levels: 5, coefficient: 2, hours: 150 },
      physics: { levels: 3, coefficient: 3, hours: 120 },
      chemistry: { levels: 3, coefficient: 2, hours: 100 },
      biology: { levels: 3, coefficient: 2, hours: 100 },
      history: { levels: 5, coefficient: 2, hours: 120 },
      geography: { levels: 5, coefficient: 1, hours: 80 },
      civicEducation: { levels: 5, coefficient: 1, hours: 60 },
      philosophy: { levels: 2, coefficient: 2, hours: 100 },
      computerScience: { levels: 3, coefficient: 2, hours: 100 },
      economics: { levels: 3, coefficient: 2, hours: 100 },
      literature: { levels: 5, coefficient: 2, hours: 120 },
      arts: { levels: 5, coefficient: 1, hours: 60 },
      music: { levels: 5, coefficient: 1, hours: 40 },
      sports: { levels: 5, coefficient: 1, hours: 80 },
      technical: { levels: 3, coefficient: 3, hours: 150 },
      vocational: { levels: 2, coefficient: 4, hours: 200 },
    },
    statistics: {
      passRate: true, averageScore: true, distribution: true,
      correlationAnalysis: true, trendAnalysis: true,
    },
    qualityAssurance: {
      itemReview: true, examReview: true, externalValidation: true,
    },
  },
  proctoring: {
    ai: { enabled: true, cheating: true, behavior: true },
    human: { enabled: true, ratio: 25, training: true },
    hybrid: { enabled: true, escalation: true, review: true },
    identity: { photo: true, id: true, biometric: true },
    environment: { audio: true, video: true, screen: true },
    communication: { realtime: true, chat: true, alert: true },
    evidence: { recording: true, screenshots: true, logs: true },
    review: { queue: true, priority: true, automation: true },
  },
  results2: {
    publication: { delay: 14, channels: ['web', 'sms', 'email'] },
    appeals: { deadline: 7, fee: 5000, review: true },
    certificates: { digital: true, physical: true, verification: true },
    transcript: { digital: true, official: true, api: true },
    statistics: { school: true, regional: true, national: true },
    analysis: { performance: true, trends: true, prediction: true },
    notification: { channels: ['email', 'sms', 'push'], batch: true },
    export: { formats: ['pdf', 'xlsx', 'csv'], bulk: true },
  },
  questionBank2: {
    totalQuestions: 50000, categories: 100, difficulty: 3,
    metadata: { bloom: true, keywords: true, standards: true },
    quality: { review: true, validation: true, rating: true },
    versioning: { enabled: true, history: true, rollback: true },
    access: { roleBased: true, restrictions: true, audit: true },
    analytics: { usage: true, performance: true, recommendations: true },
  },
};

export const financeConfig = {
  enabled: true,
  publicFinance: {
    budget: {
      planning: { annual: true, multiYear: true, participatory: true },
      preparation: { templates: true, guidelines: true, timeline: true },
      execution: { tracking: true, variance: true, adjustments: true },
      monitoring: { realtime: true, alerts: true, dashboards: true },
      reporting: { monthly: true, quarterly: true, annual: true },
      audit: { internal: true, external: true, performance: true },
    },
    accounting: {
      standards: 'ohada', doubleEntry: true, chartOfAccounts: true,
      consolidation: true, multiCurrency: true, interCompany: true,
    },
    treasury: {
      cashManagement: true, forecasting: true, investment: true,
      debt: true, bankReconciliation: true, payment: true,
    },
    procurement: {
      threshold: { low: 500000, medium: 5000000, high: 50000000 },
      methods: ['direct', 'requestForProposal', 'tender', 'auction'],
      evaluation: { criteria: true, scoring: true, committee: true },
      contract: { management: true, compliance: true, renewal: true },
    },
    taxation: {
      types: ['income', 'vat', 'property', 'customs', 'excise'],
      rates: { vat: 18, income: 25, property: 0.5 },
      compliance: { filing: true, payment: true, audit: true },
      exemptions: { categories: 20, approval: true, monitoring: true },
    },
    grants: {
      tracking: true, disbursement: true, reporting: true,
      compliance: true, audit: true,
    },
    loans: {
      management: true, amortization: true, collateral: true,
      tracking: true, reporting: true,
    },
    investments: {
      portfolio: true, performance: true, risk: true,
      compliance: true, reporting: true,
    },
    assets: {
      management: true, depreciation: true, disposal: true,
      tracking: true, audit: true,
    },
    liabilities: {
      management: true, tracking: true, reconciliation: true,
      reporting: true,
    },
    equity: {
      management: true, tracking: true, reporting: true,
    },
    revenue: {
      collection: true, reconciliation: true, forecasting: true,
      analysis: true,
    },
    expenditure: {
      authorization: true, tracking: true, analysis: true,
      optimization: true,
    },
    cost: {
      allocation: true, analysis: true, optimization: true,
      benchmarking: true,
    },
    performance: {
      budgeting: true, kpis: true, benchmarking: true,
      reporting: true,
    },
    compliance2: {
      regulatory: true, internal: true, external: true,
      audit: true, reporting: true,
    },
    risk: {
      identification: true, assessment: true, mitigation: true,
      monitoring: true, reporting: true,
    },
    forecasting: {
      revenue: true, expenditure: true, cashFlow: true,
      scenario: true, sensitivity: true,
    },
    consolidation: {
      interCompany: true, multiCurrency: true, elimination: true,
      reporting: true,
    },
    reporting2: {
      statutory: true, management: true, regulatory: true,
      adhoc: true, scheduled: true,
    },
    automation: {
      workflows: true, approvals: true, notifications: true,
      integration: true, rpa: true,
    },
    security: {
      access: true, segregation: true, audit: true,
      compliance: true, encryption: true,
    },
    audit2: {
      trail: true, monitoring: true, reporting: true,
      investigation: true, remediation: true,
    },
    mobile: {
      approvals: true, reporting: true, notifications: true,
      expenses: true,
    },
    analytics: {
      dashboards: true, reports: true, forecasting: true,
      benchmarking: true, optimization: true,
    },
    integration: {
      erp: true, banking: true, tax: true, reporting: true,
    },
  },
};

export const analyticsConfig = {
  enabled: true,
  nationalAnalytics: {
    dataCollection: {
      sources: 50, frequency: 'realtime', validation: true,
    },
    dataWarehousing: {
      provider: 'supabase', schema: 'star', partitioning: true,
    },
    etl: {
      provider: 'airflow', scheduling: 'hourly', monitoring: true,
    },
    dashboards: {
      executive: true, operational: true, financial: true,
      hr: true, marketing: true, sales: true,
    },
    reports: {
      standard: 100, custom: true, scheduling: true,
    },
    machineLearning: {
      models: 20, training: true, deployment: true,
      monitoring: true, retraining: 'weekly',
    },
    naturalLanguage: {
      processing: true, generation: true, translation: true,
      sentiment: true, summarization: true,
    },
    computerVision: {
      imageRecognition: true, ocr: true, videoAnalysis: true,
    },
    timeSeries: {
      forecasting: true, anomalyDetection: true, decomposition: true,
    },
    graphAnalytics: {
      networkAnalysis: true, communityDetection: true, centrality: true,
    },
    spatialAnalytics: {
      mapping: true, geocoding: true, spatialClustering: true,
    },
    textAnalytics: {
      topicModeling: true, keywordExtraction: true, classification: true,
    },
    predictive: {
      churn: true, ltv: true, conversion: true, demand: true,
    },
    prescriptive: {
      optimization: true, simulation: true, recommendation: true,
    },
    realTime: {
      streaming: true, alerts: true, dashboards: true,
    },
    governance: {
      policies: true, quality: true, security: true, compliance: true,
    },
    privacy: {
      anonymization: true, pseudonymization: true, differential: true,
    },
    visualization: {
      charts: true, maps: true, networks: true, custom: true,
    },
    collaboration: {
      sharing: true, annotation: true, versioning: true,
    },
    export: {
      formats: ['pdf', 'xlsx', 'csv', 'json', 'api'],
    },
    ai: {
      autoMl: true, explainability: true, fairness: true,
    },
    benchmarking: {
      national: true, international: true, historical: true,
    },
    alerting: {
      rules: 100, channels: ['email', 'sms', 'push'], escalation: true,
    },
    monitoring: {
      dataQuality: true, systemHealth: true, performance: true,
    },
    optimization: {
      queries: true, caching: true, partitioning: true,
    },
    security2: {
      encryption: true, access: true, audit: true, compliance: true,
    },
    mobile: {
      dashboards: true, reports: true, alerts: true,
    },
    api: {
      rest: true, graphql: true, websocket: true,
    },
    documentation: {
      api: true, data: true, governance: true,
    },
    training: {
      programs: true, certification: true, support: true,
    },
  },
};

export const identityConfig = {
  enabled: true,
  digitalIdentity: {
    authentication: {
      methods: ['password', 'biometric', 'otp', 'sso', 'certificate'],
      mfa: { enabled: true, methods: ['sms', 'email', 'totp', 'push'] },
      passwordless: { enabled: true, methods: ['biometric', 'otp', 'push'] },
      session: { timeout: 30, maxConcurrent: 5, renewal: true },
    },
    authorization: {
      rbac: { enabled: true, roles: 50, permissions: 500 },
      abac: { enabled: true, policies: 100, evaluation: 'realtime' },
      hierarchical: { enabled: true, levels: 10, inheritance: true },
    },
    biometric: {
      fingerprint: { enabled: true, minQuality: 80, deduplication: true },
      face: { enabled: true, liveness: true, antiSpoofing: true },
      iris: { enabled: false, accuracy: 99.9, enrollment: true },
      voice: { enabled: true, verification: true, antiSpoofing: true },
    },
    documents: {
      nationalId: { enabled: true, chip: true, biometric: true },
      passport: { enabled: true, mrz: true, chip: true },
      driversLicense: { enabled: true, categories: 15, renewal: true },
      birthCertificate: { enabled: true, digital: true, verification: true },
      voterCard: { enabled: true, verification: true, api: true },
    },
    verification: {
      realTime: true, batch: true, manual: true,
      confidence: 0.95, fallback: 'manual',
    },
    privacy: {
      dataMinimization: true, purposeLimitation: true,
      consentManagement: true, rightToErasure: true,
      dataPortability: true, transparency: true,
    },
    compliance: {
      standards: ['iso27001', 'soc2', 'gdpr', 'local'],
      audit: { frequency: 'quarterly', external: true },
      reporting: { automated: true, regulatory: true },
    },
    lifecycle: {
      enrollment: { online: true, inPerson: true, assisted: true },
      activation: { immediate: true, verification: true },
      suspension: { manual: true, automatic: true, reasons: 10 },
      reinstatement: { verification: true, approval: true },
      expiration: { renewal: true, notification: true, gracePeriod: 30 },
      deactivation: { permanent: true, reversible: true, audit: true },
    },
    federation: {
      saml: { enabled: true, idp: 10, sp: 50 },
      oauth2: { enabled: true, flows: 5, scopes: 100 },
      oidc: { enabled: true, providers: 10, discovery: true },
    },
    directory: {
      users: { maxCount: 1000000, attributes: 100, search: true },
      groups: { maxCount: 10000, nesting: true, delegation: true },
      roles: { maxCount: 500, inheritance: true, delegation: true },
      attributes: { custom: true, schema: true, validation: true },
    },
    audit: {
      login: true, logout: true, failedAttempts: true,
      dataAccess: true, adminActions: true, changes: true,
      retention: 365, immutable: true, searchable: true,
    },
    api: {
      rest: true, graphql: true, grpc: true,
      versioning: true, documentation: true, sdk: true,
    },
    sdk: {
      web: true, mobile: true, desktop: true,
      languages: ['typescript', 'python', 'java', 'csharp'],
    },
    monitoring: {
      realtime: true, alerts: true, dashboards: true,
      performance: true, security: true, compliance: true,
    },
  },
};

export const portalConfig = {
  enabled: true,
  publicServicesPortal: {
    services: {
      total: 200, categories: 20, subcategories: 100,
    },
    navigation: {
      search: true, filters: true, breadcrumbs: true,
      favorites: true, recent: true, recommendations: true,
    },
    forms: {
      builder: true, validation: true, conditional: true,
      saveResume: true, autoSave: true, templates: 50,
    },
    documents: {
      upload: true, validation: true, storage: true,
      maxFileSize: 10, allowedTypes: ['pdf', 'jpg', 'png', 'docx'],
    },
    payment: {
      gateway: 'moneyFusion', methods: ['card', 'mobile', 'bank'],
      receipts: true, refunds: true, reconciliation: true,
    },
    tracking: {
      status: true, timeline: true, notifications: true,
      history: true,
    },
    feedback: {
      rating: true, comments: true, surveys: true,
      complaints: true, suggestions: true,
    },
    accessibility: {
      wcag: 'AA', screenReader: true, keyboard: true,
      contrast: true, textScaling: true,
    },
    multilingual: {
      languages: ['fr', 'en', 'dioula', 'baoule'],
      autoDetect: true, switching: true,
    },
    mobile: {
      responsive: true, pwa: true, offline: true,
    },
    security: {
      captcha: true, rateLimit: true, encryption: true,
      audit: true,
    },
    performance: {
      caching: true, cdn: true, compression: true,
      lazyLoading: true, optimization: true,
    },
    analytics: {
      usage: true, satisfaction: true, performance: true,
      conversion: true,
    },
    integration: {
      backend: true, thirdParty: true, realTime: true,
    },
    governance: {
      sla: true, monitoring: true, reporting: true,
      improvement: true,
    },
  },
};

export const openDataConfig = {
  enabled: true,
  openDataPlatform: {
    datasets: {
      total: 1000, categories: 50, updateFrequency: 'daily',
    },
    metadata: {
      standard: 'dcat', schema: true, validation: true,
    },
    publishing: {
      formats: ['csv', 'json', 'xml', 'rdf', 'geojson'],
      apis: true, bulk: true, realTime: true,
    },
    discovery: {
      search: true, filters: true, tags: true,
      categories: true, organizations: true,
    },
    visualization: {
      charts: true, maps: true, tables: true,
      custom: true, embed: true,
    },
    download: {
      formats: ['csv', 'xlsx', 'json', 'xml'],
      bulk: true, api: true, scheduled: true,
    },
    api: {
      rest: true, graphql: true, streaming: true,
      versioning: true, documentation: true,
    },
    governance: {
      policies: true, standards: true, quality: true,
      privacy: true, security: true,
    },
    community: {
      forums: true, feedback: true, contributions: true,
      hackathons: true,
    },
    analytics: {
      usage: true, downloads: true, popularity: true,
      impact: true,
    },
    quality: {
      completeness: true, accuracy: true, timeliness: true,
      consistency: true, validity: true,
    },
    licensing: {
      types: ['open', 'restricted', 'commercial'],
      terms: true, attribution: true,
    },
    metadata2: {
      DublinCore: true, schemaOrg: true, dcat: true,
    },
    interoperability: {
      standards: true, protocols: true, formats: true,
    },
    monitoring: {
      uptime: true, performance: true, quality: true,
    },
    backup: {
      frequency: 'daily', retention: 90, offsite: true,
    },
  },
};

export const observatoryConfig = {
  enabled: true,
  educationObservatory: {
    indicators: {
      total: 500, categories: 20, sources: 50,
    },
    benchmarks: {
      national: true, regional: true, international: true,
      historical: true, custom: true,
    },
    dashboards: {
      executive: true, operational: true, strategic: true,
      realtime: true, customizable: true,
    },
    reports: {
      standard: 100, custom: true, scheduled: true,
      adhoc: true,
    },
    research: {
      studies: true, publications: true, collaboration: true,
    },
    surveys: {
      design: true, collection: true, analysis: true,
      longitudinal: true, crossSectional: true,
    },
    dataCollection: {
      sources: 30, frequency: 'monthly', validation: true,
    },
    analysis: {
      statistical: true, predictive: true, prescriptive: true,
      comparative: true, longitudinal: true,
    },
    forecasting: {
      enrollment: true, graduation: true, employment: true,
      demographic: true, economic: true,
    },
    evaluation: {
      policy: true, program: true, institutional: true,
      impact: true, effectiveness: true,
    },
    monitoring: {
      realtime: true, alerts: true, dashboards: true,
      compliance: true, performance: true,
    },
    visualization: {
      charts: true, maps: true, networks: true,
      infographics: true, interactive: true,
    },
    dissemination: {
      publications: true, presentations: true, media: true,
      stakeholder: true, public: true,
    },
    collaboration: {
      national: true, international: true, academic: true,
      government: true, private: true,
    },
    quality: {
      methodology: true, peerReview: true, validation: true,
      transparency: true, reproducibility: true,
    },
    governance: {
      policies: true, committee: true, ethics: true,
      independence: true, accountability: true,
    },
  },
};

export const emergencyConfig = {
  enabled: true,
  emergencyManagement: {
    prevention: {
      riskAssessment: true, mitigation: true, planning: true,
      education: true, drills: true,
    },
    preparedness: {
      plans: true, stockpiles: true, training: true,
      communication: true, coordination: true,
    },
    response: {
      protocols: true, teams: true, equipment: true,
      communication: true, coordination: true,
    },
    recovery: {
      plans: true, funding: true, psychological: true,
      infrastructure: true, community: true,
    },
    mitigation: {
      infrastructure: true, policy: true, education: true,
      technology: true, insurance: true,
    },
    alert: {
      levels: ['green', 'yellow', 'orange', 'red'],
      channels: ['sms', 'email', 'push', 'siren', 'tv', 'radio'],
      targeting: true, escalation: true,
    },
    communication: {
      public: true, media: true, social: true,
      internal: true, international: true,
    },
    coordination: {
      interAgency: true, intergovernmental: true,
      international: true, private: true,
    },
    resources: {
      inventory: true, deployment: true, logistics: true,
      volunteers: true, donations: true,
    },
    documentation: {
      reporting: true, archiving: true, lessons: true,
    },
    simulation: {
      scenarios: true, drills: true, analysis: true,
    },
    health: {
      medical: true, psychological: true, sanitation: true,
    },
    infrastructure: {
      assessment: true, repair: true, temporary: true,
    },
    community: {
      engagement: true, resilience: true, training: true,
    },
    technology: {
      drones: true, satellite: true, iot: true,
      ai: true, blockchain: true,
    },
    finance: {
      emergency: true, insurance: true, fundraising: true,
      accounting: true,
    },
    legal: {
      authority: true, liability: true, compensation: true,
    },
    international: {
      coordination: true, treaties: true, aid: true,
    },
    monitoring: {
      realtime: true, alerts: true, dashboards: true,
    },
    evaluation: {
      afterAction: true, lessons: true, improvement: true,
    },
  },
};

export const cooperationConfig = {
  enabled: true,
  internationalCooperation: {
    bilateral: {
      agreements: true, projects: true, funding: true,
      monitoring: true, evaluation: true,
    },
    multilateral: {
      organizations: true, treaties: true, contributions: true,
      participation: true,
    },
    development: {
      aid: true, projects: true, capacity: true,
      technical: true, southSouth: true,
    },
    exchange: {
      programs: true, students: true, professionals: true,
      research: true, culture: true,
    },
    knowledge: {
      transfer: true, technology: true, bestPractices: true,
      research: true, innovation: true,
    },
    funding: {
      sources: 20, allocation: true, tracking: true,
      reporting: true, impact: true,
    },
    projects: {
      management: true, monitoring: true, evaluation: true,
      reporting: true, coordination: true,
    },
    partnership: {
      identification: true, negotiation: true, management: true,
      evaluation: true, renewal: true,
    },
    diplomatic: {
      relations: true, protocols: true, ceremonies: true,
    },
    trade: {
      agreements: true, facilitation: true, promotion: true,
    },
    security: {
      cooperation: true, intelligence: true, peacekeeping: true,
    },
    cultural: {
      exchange: true, preservation: true, promotion: true,
    },
    environmental: {
      treaties: true, cooperation: true, projects: true,
    },
    health: {
      cooperation: true, pandemics: true, research: true,
    },
    education: {
      partnerships: true, exchanges: true, accreditation: true,
    },
    science: {
      research: true, collaboration: true, innovation: true,
    },
    technology: {
      transfer: true, cooperation: true, standards: true,
    },
    legal: {
      treaties: true, extradition: true, mutual: true,
    },
    monitoring: {
      realtime: true, reporting: true, dashboards: true,
    },
    evaluation: {
      impact: true, effectiveness: true, efficiency: true,
    },
  },
};

export const digitalTwinConfig = {
  enabled: true,
  nationalDigitalTwin: {
    infrastructure: {
      smart: true, iot: true, sensors: true,
      edge: true, cloud: true,
    },
    modeling: {
      threeD: true, simulation: true, prediction: true,
      realTime: true, interactive: true,
    },
    data: {
      sources: 100, realtime: true, historical: true,
      quality: true, governance: true,
    },
    integration: {
      gis: true, bim: true, cad: true,
      iot: true, api: true,
    },
    simulation: {
      scenarios: true, forecasting: true, optimization: true,
      stress: true, whatIf: true,
    },
    visualization: {
      threeD: true, ar: true, vr: true,
      interactive: true, mobile: true,
    },
    analytics: {
      realtime: true, predictive: true, prescriptive: true,
      anomaly: true, optimization: true,
    },
    governance: {
      policies: true, standards: true, quality: true,
      security: true, privacy: true,
    },
    collaboration: {
      multiStakeholder: true, realTime: true, versioning: true,
    },
    deployment: {
      cloud: true, edge: true, hybrid: true,
      scaling: true, monitoring: true,
    },
    security: {
      encryption: true, access: true, audit: true,
      compliance: true, monitoring: true,
    },
    performance: {
      latency: 100, throughput: 10000, availability: 99.9,
    },
    maintenance: {
      updates: true, patches: true, backup: true,
      disaster: true, monitoring: true,
    },
    api: {
      rest: true, graphql: true, websocket: true,
      versioning: true, documentation: true,
    },
    mobile: {
      apps: true, offline: true, sync: true,
      gps: true, camera: true,
    },
    ai: {
      prediction: true, optimization: true, automation: true,
      naturalLanguage: true, computerVision: true,
    },
    blockchain: {
      enabled: true, smartContracts: true, tokenization: true,
    },
    digital: {
      identity: true, payments: true, signatures: true,
    },
    citizen: {
      engagement: true, feedback: true, participation: true,
    },
    reporting: {
      dashboards: true, alerts: true, scheduled: true,
      adhoc: true, compliance: true,
    },
    innovation: {
      lab: true, pilots: true, scaling: true,
      partnership: true, research: true,
    },
    capacity: {
      training: true, certification: true, support: true,
      documentation: true, community: true,
    },
  },
};

export const govConfig = {
  ministry: ministryConfig,
  registry: registryConfig,
  exams: examsConfig,
  finance: financeConfig,
  analytics: analyticsConfig,
  identity: identityConfig,
  portal: portalConfig,
  openData: openDataConfig,
  observatory: observatoryConfig,
  emergency: emergencyConfig,
  cooperation: cooperationConfig,
  digitalTwin: digitalTwinConfig,
};

export type GovConfig = typeof govConfig;
export type MinistryConfig = typeof ministryConfig;
export type RegistryConfig = typeof registryConfig;
export type ExamsConfig = typeof examsConfig;
export type FinanceConfig = typeof financeConfig;
export type AnalyticsConfig = typeof analyticsConfig;
export type IdentityConfig = typeof identityConfig;
export type PortalConfig = typeof portalConfig;
export type OpenDataConfig = typeof openDataConfig;
export type ObservatoryConfig = typeof observatoryConfig;
export type EmergencyConfig = typeof emergencyConfig;
export type CooperationConfig = typeof cooperationConfig;
export type DigitalTwinConfig = typeof digitalTwinConfig;
