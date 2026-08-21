export const zeroTrustConfig = {
  enabled: true,
  defaultZone: 'IDENTIFY',
  evaluationInterval: 300,
  riskThresholds: { low: 30, medium: 60, high: 80, critical: 90 },
  enforcementModes: {
    STRICT: { blockOnFailure: true, logAllDecisions: true },
    MODERATE: { blockOnFailure: false, logAllDecisions: true },
    ADVISORY: { blockOnFailure: false, logAllDecisions: false },
  },
};

export const iamConfig = {
  maxSessionsPerUser: 5,
  sessionTimeout: 3600,
  refreshTokenExpiry: 86400,
  mfaGracePeriod: 86400,
  maxLoginAttempts: 5,
  lockoutDuration: 1800,
  passwordPolicy: { minLength: 12, maxLength: 128, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSpecialChars: true, preventReuse: 12, maxAge: 90 },
  credentialRotation: {
    PASSWORD: { rotationDays: 90, alertDays: 14, enforce: true },
    API_KEY: { rotationDays: 365, alertDays: 30, enforce: true },
    CERTIFICATE: { rotationDays: 365, alertDays: 60, enforce: true },
    TOKEN: { rotationDays: 30, alertDays: 7, enforce: true },
    ENCRYPTION_KEY: { rotationDays: 365, alertDays: 30, enforce: true },
  },
};

export const socConfig = {
  enabled: true,
  retentionDays: 365,
  incidentTimeout: 86400,
  maxIncidentsPerPage: 50,
  severityWeights: { LOW: 1, MEDIUM: 3, HIGH: 7, CRITICAL: 15, EMERGENCY: 25 },
  responseTimes: {
    LOW: { detect: 3600, respond: 7200, resolve: 86400 },
    MEDIUM: { detect: 1800, respond: 3600, resolve: 43200 },
    HIGH: { detect: 900, respond: 1800, resolve: 14400 },
    CRITICAL: { detect: 300, respond: 600, resolve: 7200 },
    EMERGENCY: { detect: 60, respond: 300, resolve: 3600 },
  },
};

export const siemConfig = {
  enabled: true,
  maxEventsPerSecond: 10000,
  retentionDays: 90,
  alertRetentionDays: 365,
  batchSize: 1000,
  flushInterval: 5,
  ruleMaxConditions: 20,
  ruleMaxActions: 10,
  correlationWindow: 300,
  correlationThreshold: 3,
};

export const threatDetectionConfig = {
  enabled: true,
  maxIndicators: 100000,
  feedRefreshInterval: 3600,
  indicatorExpiryDays: 90,
  confidenceThreshold: 50,
  autoBlockThreshold: 85,
  mitreAttackMapping: true,
};

export const appSecurityConfig = {
  enabled: true,
  scanFrequency: 'WEEKLY',
  maxScans: 10,
  scanTimeout: 3600,
  vulnerabilityRetentionDays: 365,
  autoRemediation: false,
  apiSecurity: {
    maxRateLimit: 10000,
    defaultRateLimit: 100,
    defaultRateLimitWindow: 60,
    corsMaxAge: 86400,
    inputValidationStrict: true,
    wafRules: ['SQL_INJECTION', 'XSS', 'CSRF', 'PATH_TRAVERSAL', 'COMMAND_INJECTION', 'LDAP_INJECTION', 'XXE'],
  },
};

export const dataSecurityConfig = {
  enabled: true,
  maxPolicies: 100,
  maxIncidents: 10000,
  incidentRetentionDays: 365,
  autoRemediation: false,
  encryption: {
    algorithms: ['AES-256-GCM', 'AES-256-CBC', 'RSA-4096', 'ECDSA-P384', 'ChaCha20-Poly1305'],
    keySize: 256,
    rotateKeys: true,
    keyRotationDays: 90,
    backupKeys: true,
  },
};

export const deviceSecurityConfig = {
  enabled: true,
  maxDevices: 10000,
  deviceRefreshInterval: 300,
  complianceCheckInterval: 3600,
  quarantineTimeout: 86400,
  mdm: {
    maxCommands: 100,
    commandTimeout: 300,
    maxRetries: 3,
  },
};

export const soarConfig = {
  enabled: true,
  maxPlaybooks: 100,
  maxExecutions: 10000,
  executionRetentionDays: 365,
  maxStepsPerPlaybook: 50,
  executionTimeout: 3600,
  maxRetries: 3,
  retryDelay: 60,
};

export const bcpConfig = {
  enabled: true,
  maxPlans: 50,
  maxProceduresPerPlan: 20,
  testingFrequency: 'QUARTERLY',
  reviewFrequency: 'SEMI_ANNUAL',
  backup: {
    maxPolicies: 100,
    maxConcurrentJobs: 5,
    retentionDays: 365,
    verifyAfterBackup: true,
    encryptionRequired: true,
    compressionEnabled: true,
  },
};

export const complianceConfig = {
  enabled: true,
  maxAssessments: 100,
  assessmentRetentionDays: 365,
  maxPolicies: 200,
  policyReviewFrequency: 'SEMI_ANNUAL',
  riskRegister: {
    maxRisks: 500,
    reassessmentFrequency: 'QUARTERLY',
    riskMatrixSize: 5,
    scoringMethod: 'QUANTITATIVE',
  },
};

export const cyberDigitalTwinConfig = {
  enabled: true,
  maxTwins: 10,
  maxScenarios: 50,
  maxResults: 1000,
  resultRetentionDays: 365,
  simulationTimeout: 7200,
  maxConcurrentSimulations: 3,
};

export const gestcrpConfig = {
  zeroTrust: zeroTrustConfig,
  iam: iamConfig,
  soc: socConfig,
  siem: siemConfig,
  threatDetection: threatDetectionConfig,
  appSecurity: appSecurityConfig,
  dataSecurity: dataSecurityConfig,
  deviceSecurity: deviceSecurityConfig,
  soar: soarConfig,
  bcp: bcpConfig,
  compliance: complianceConfig,
  cyberDigitalTwin: cyberDigitalTwinConfig,
};
