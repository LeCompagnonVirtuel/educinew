import { z } from 'zod'

const schoolId = z.string().uuid()

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - ESG Dashboard
// ============================================================================

const ESGDashboardSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  overallScore: z.number().min(0).max(100),
  environmentalScore: z.number().min(0).max(100),
  socialScore: z.number().min(0).max(100),
  governanceScore: z.number().min(0).max(100),
  esgRating: z.enum(['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC']),
  carbonFootprint: z.number().min(0),
  energyConsumption: z.number().min(0),
  waterConsumption: z.number().min(0),
  wasteGenerated: z.number().min(0),
  renewableEnergyShare: z.number().min(0).max(100),
  activeGoals: z.number().int().min(0),
  completedGoals: z.number().int().min(0),
  alerts: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    title: z.string(),
    message: z.string(),
    severity: z.enum(['INFO', 'WARNING', 'CRITICAL', 'EMERGENCY']),
    category: z.enum(['ENVIRONMENTAL', 'SOCIAL', 'GOVERNANCE']),
    metric: z.string(),
    currentValue: z.number(),
    threshold: z.number(),
    acknowledged: z.boolean(),
    acknowledgedBy: z.string().uuid().optional(),
    acknowledgedAt: z.string().optional(),
    createdAt: z.string(),
  })),
  trends: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    metric: z.string(),
    category: z.enum(['ENVIRONMENTAL', 'SOCIAL', 'GOVERNANCE']),
    direction: z.enum(['INCREASING', 'DECREASING', 'STABLE', 'FLUCTUATING']),
    changePercent: z.number(),
    currentValue: z.number(),
    previousValue: z.number(),
    period: z.string(),
  })),
  benchmarks: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    metric: z.string(),
    value: z.number(),
    benchmarkValue: z.number(),
    benchmarkType: z.enum(['INDUSTRY_AVERAGE', 'BEST_PRACTICE', 'PREVIOUS_YEAR', 'INTERNAL_TARGET', 'REGULATORY']),
    unit: z.string(),
    performance: z.enum(['ABOVE', 'AT', 'BELOW']),
    gap: z.number(),
  })),
  generatedAt: z.string(),
})

const CreateESGDashboardSchema = ESGDashboardSchema.omit({ id: true })
const UpdateESGDashboardSchema = ESGDashboardSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Carbon Footprint
// ============================================================================

const CarbonFootprintSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  reportingPeriod: z.enum(['MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL']),
  year: z.number().int().min(2000).max(2100),
  scope1Total: z.number().min(0),
  scope2Total: z.number().min(0),
  scope3Total: z.number().min(0),
  grandTotal: z.number().min(0),
  emissions: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    scope: z.enum(['SCOPE_1', 'SCOPE_2', 'SCOPE_3']),
    source: z.enum(['ELECTRICITY', 'HEATING', 'COOLING', 'TRANSPORT', 'WASTE', 'SUPPLY_CHAIN', 'EMPLOYEE_COMMUTE', 'BUSINESS_TRAVEL', 'IT_INFRASTRUCTURE', 'CAMPUS_FACILITIES']),
    category: z.string(),
    quantity: z.number().min(0),
    unit: z.string(),
    emissionFactor: z.number().min(0),
    co2Equivalent: z.number().min(0),
    dataCollectionMethod: z.enum(['AUTOMATED', 'MANUAL', 'IoT_SENSOR', 'UTILITY_BILL', 'ESTIMATE', 'CALCULATION']),
    period: z.string(),
    notes: z.string().optional(),
    createdAt: z.string(),
  })),
  offsets: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['TREE_PLANTING', 'RENEWABLE_PROJECTS', 'METHANE_CAPTURE', 'CARBON_CREDITS', 'SOIL_CARBON', 'BLUE_CARBON']),
    projectName: z.string(),
    provider: z.string(),
    creditsPurchased: z.number().int().min(0),
    creditsRetired: z.number().int().min(0),
    pricePerCredit: z.number().min(0),
    totalCost: z.number().min(0),
    verificationStandard: z.string(),
    vintage: z.number().int().min(2000).max(2100),
    retirementDate: z.string(),
    createdAt: z.string(),
  })),
  netEmissions: z.number(),
  trend: z.enum(['INCREASING', 'DECREASING', 'STABLE', 'FLUCTUATING']),
  yoyChange: z.number(),
  calculatedAt: z.string(),
})

const CreateCarbonFootprintSchema = CarbonFootprintSchema.omit({ id: true })
const UpdateCarbonFootprintSchema = CarbonFootprintSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Energy Analytics
// ============================================================================

const EnergyAnalyticsSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  totalConsumption: z.number().min(0),
  unit: z.string(),
  breakdown: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['ELECTRICITY', 'GAS', 'SOLAR', 'WIND', 'BIOMASS', 'GEOTHERMAL', 'DIESEL', 'FUEL_OIL']),
    source: z.enum(['NATIONAL_GRID', 'SOLAR_PANELS', 'WIND_TURBINES', 'GENERATORS', 'BATTERY']),
    consumption: z.number().min(0),
    unit: z.string(),
    cost: z.number().min(0),
    period: z.string(),
    buildingId: z.string().uuid().optional(),
    intensity: z.number().min(0),
  })),
  renewableShare: z.number().min(0).max(100),
  intensityPerStudent: z.number().min(0),
  intensityPerSqM: z.number().min(0),
  cost: z.number().min(0),
  costPerUnit: z.number().min(0),
  peakDemand: z.number().min(0),
  loadFactor: z.number().min(0).max(100),
  trend: z.enum(['INCREASING', 'DECREASING', 'STABLE', 'FLUCTUATING']),
  forecast: z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    model: z.enum(['LINEAR', 'ARIMA', 'PROPHET', 'LSTM', 'ENSEMBLE']),
    historicalData: z.array(z.number()),
    predictions: z.array(z.number()),
    confidenceInterval: z.array(z.tuple([z.number(), z.number()])),
    periods: z.array(z.string()),
    accuracy: z.number().min(0).max(100),
    generatedAt: z.string(),
  }),
  renewableAssets: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['SOLAR', 'WIND', 'HYDRO', 'GEOTHERMAL', 'BIOMASS', 'HYDROGEN']),
    capacity: z.number().min(0),
    unit: z.string(),
    annualGeneration: z.number().min(0),
    installDate: z.string(),
    status: z.string(),
    cost: z.number().min(0),
    paybackPeriod: z.number().min(0),
  })),
  generatedAt: z.string(),
})

const CreateEnergyAnalyticsSchema = EnergyAnalyticsSchema.omit({ id: true })
const UpdateEnergyAnalyticsSchema = EnergyAnalyticsSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Water Analytics
// ============================================================================

const WaterAnalyticsSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  totalConsumption: z.number().min(0),
  unit: z.string(),
  breakdown: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['POTABLE', 'RECYCLED', 'RAINWATER', 'GROUNDWATER', 'INDUSTRIAL', 'IRRIGATION']),
    source: z.enum(['MUNICIPAL', 'WELL', 'RIVER', 'RAINWATER', 'RECYCLED']),
    consumption: z.number().min(0),
    unit: z.string(),
    cost: z.number().min(0),
    period: z.string(),
    buildingId: z.string().uuid().optional(),
    intensity: z.number().min(0),
  })),
  recycledWaterShare: z.number().min(0).max(100),
  intensityPerStudent: z.number().min(0),
  cost: z.number().min(0),
  costPerUnit: z.number().min(0),
  leakageRate: z.number().min(0).max(100),
  rainwaterHarvested: z.number().min(0),
  trend: z.enum(['INCREASING', 'DECREASING', 'STABLE', 'FLUCTUATING']),
  forecast: z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    model: z.enum(['LINEAR', 'ARIMA', 'PROPHET', 'LSTM', 'ENSEMBLE']),
    historicalData: z.array(z.number()),
    predictions: z.array(z.number()),
    confidenceInterval: z.array(z.tuple([z.number(), z.number()])),
    periods: z.array(z.string()),
    accuracy: z.number().min(0).max(100),
    generatedAt: z.string(),
  }),
  conservationMeasures: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['RAINWATER_HARVESTING', 'GREYWATER_REUSE', 'LOW_FLOW_FIXTURES', 'IRRIGATION_OPTIMIZATION', 'LEAK_DETECTION', 'WATER_AUDIT']),
    description: z.string(),
    capacity: z.number().min(0),
    annualSavings: z.number().min(0),
    installDate: z.string(),
    status: z.string(),
    cost: z.number().min(0),
    paybackPeriod: z.number().min(0),
  })),
  generatedAt: z.string(),
})

const CreateWaterAnalyticsSchema = WaterAnalyticsSchema.omit({ id: true })
const UpdateWaterAnalyticsSchema = WaterAnalyticsSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Waste Analytics
// ============================================================================

const WasteAnalyticsSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  totalGenerated: z.number().min(0),
  unit: z.string(),
  breakdown: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['ORGANIC', 'RECYCLABLE', 'HAZARDOUS', 'ELECTRONIC', 'CONSTRUCTION', 'MEDICAL', 'GENERAL', 'E_WASTE']),
    stream: z.enum(['COLLECTION', 'SORTING', 'PROCESSING', 'DISPOSAL', 'RECOVERY']),
    quantity: z.number().min(0),
    unit: z.string(),
    destination: z.string(),
    cost: z.number().min(0),
    period: z.string(),
    buildingId: z.string().uuid().optional(),
  })),
  recyclingRate: z.number().min(0).max(100),
  diversionRate: z.number().min(0).max(100),
  landfillRate: z.number().min(0).max(100),
  compostRate: z.number().min(0).max(100),
  hazardousWaste: z.number().min(0),
  cost: z.number().min(0),
  costPerUnit: z.number().min(0),
  trend: z.enum(['INCREASING', 'DECREASING', 'STABLE', 'FLUCTUATING']),
  recyclingMetrics: z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    totalRecycled: z.number().min(0),
    recyclingRate: z.number().min(0).max(100),
    materialBreakdown: z.array(z.object({
      material: z.enum(['PAPER', 'PLASTIC', 'GLASS', 'METAL', 'ELECTRONIC', 'ORGANIC', 'TEXTILE', 'CONSTRUCTION']),
      quantity: z.number().min(0),
      unit: z.string(),
      percentage: z.number().min(0).max(100),
      revenue: z.number().min(0),
    })),
    contaminationRate: z.number().min(0).max(100),
    revenue: z.number().min(0),
    period: z.string(),
  }),
  generatedAt: z.string(),
})

const CreateWasteAnalyticsSchema = WasteAnalyticsSchema.omit({ id: true })
const UpdateWasteAnalyticsSchema = WasteAnalyticsSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Environmental KPIs
// ============================================================================

const EnvironmentalKPISchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  name: z.string(),
  category: z.enum(['ENVIRONMENTAL', 'SOCIAL', 'GOVERNANCE']),
  metric: z.enum(['ENERGY_INTENSITY', 'WATER_INTENSITY', 'WASTE_DIVERSION', 'CARBON_INTENSITY', 'RENEWABLE_SHARE', 'GREEN_BUILDING_SCORE', 'TRANSPORT_EMISSIONS', 'SUPPLY_CHAIN_SCORE']),
  value: z.number(),
  unit: z.enum(['TONNES_CO2', 'KWH', 'M3', 'KG', 'PERCENTAGE', 'LITERS', 'MJ', 'USD']),
  target: z.number(),
  benchmark: z.number(),
  benchmarkType: z.enum(['INDUSTRY_AVERAGE', 'BEST_PRACTICE', 'PREVIOUS_YEAR', 'INTERNAL_TARGET', 'REGULATORY']),
  achievement: z.number().min(0).max(100),
  trend: z.enum(['INCREASING', 'DECREASING', 'STABLE', 'FLUCTUATING']),
  period: z.string(),
  dataCollectionMethod: z.enum(['AUTOMATED', 'MANUAL', 'IoT_SENSOR', 'UTILITY_BILL', 'ESTIMATE', 'CALCULATION']),
  lastUpdated: z.string(),
})

const CreateEnvironmentalKPISchema = EnvironmentalKPISchema.omit({ id: true })
const UpdateEnvironmentalKPISchema = EnvironmentalKPISchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Goals & Initiatives
// ============================================================================

const SustainabilityGoalRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  goal: z.enum(['CARBON_NEUTRAL', 'NET_ZERO', 'ZERO_WASTE', 'WATER_POSITIVE', 'RENEWABLE_ENERGY_100', 'BIODIVERSITY_NET_GAIN', 'GREEN_CAMPUS', 'CIRCULAR_ECONOMY', 'SOCIAL_EQUITY', 'CLIMATE_ADAPTATION']),
  title: z.string(),
  description: z.string(),
  targetValue: z.number(),
  currentValue: z.number(),
  unit: z.string(),
  startDate: z.string(),
  targetDate: z.string(),
  status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
  progress: z.number().min(0).max(100),
  milestones: z.array(z.object({
    id: z.string().uuid(),
    goalId: z.string().uuid(),
    title: z.string(),
    targetDate: z.string(),
    completedAt: z.string().optional(),
    isCompleted: z.boolean(),
  })),
  assignedTo: z.array(z.string().uuid()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateSustainabilityGoalRecordSchema = SustainabilityGoalRecordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateSustainabilityGoalRecordSchema = SustainabilityGoalRecordSchema.partial().required({ id: true })

const SustainabilityInitiativeSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  name: z.string(),
  type: z.enum(['TREE_PLANTING', 'CLEAN_UP', 'EDUCATION', 'COMMUNITY_GARDEN', 'RENEWABLE_INSTALL', 'ENERGY_AUDIT']),
  description: z.string(),
  status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
  budget: z.number().min(0),
  spent: z.number().min(0),
  expectedImpact: z.string(),
  measuredImpact: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  participants: z.number().int().min(0),
  carbonReduction: z.number().min(0),
  costSavings: z.number().min(0),
  roi: z.number(),
  lead: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateSustainabilityInitiativeSchema = SustainabilityInitiativeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateSustainabilityInitiativeSchema = SustainabilityInitiativeSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Green Campus
// ============================================================================

const GreenCampusSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  overallScore: z.number().min(0).max(100),
  greenBuilding: z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['LEED', 'BREEAM', 'GRIHA', 'EDGE', 'WELL', 'PASSIVE_HOUSE', 'LIVING_BUILDING']),
    level: z.string(),
    score: z.number().min(0).max(100),
    certifiedDate: z.string(),
    expiryDate: z.string(),
    assessor: z.string(),
    credits: z.array(z.object({
      category: z.string(),
      credit: z.string(),
      points: z.number().int().min(0),
      maxPoints: z.number().int().min(0),
      achieved: z.boolean(),
    })),
  }),
  renewableEnergy: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['SOLAR', 'WIND', 'HYDRO', 'GEOTHERMAL', 'BIOMASS', 'HYDROGEN']),
    capacity: z.number().min(0),
    unit: z.string(),
    annualGeneration: z.number().min(0),
    installDate: z.string(),
    status: z.string(),
    cost: z.number().min(0),
    paybackPeriod: z.number().min(0),
  })),
  waterConservation: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['RAINWATER_HARVESTING', 'GREYWATER_REUSE', 'LOW_FLOW_FIXTURES', 'IRRIGATION_OPTIMIZATION', 'LEAK_DETECTION', 'WATER_AUDIT']),
    description: z.string(),
    capacity: z.number().min(0),
    annualSavings: z.number().min(0),
    installDate: z.string(),
    status: z.string(),
    cost: z.number().min(0),
    paybackPeriod: z.number().min(0),
  })),
  wasteManagement: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.string(),
    description: z.string(),
    capacity: z.number().min(0),
    annualProcessing: z.number().min(0),
    installDate: z.string(),
    status: z.string(),
    cost: z.number().min(0),
  })),
  greenSpaces: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    name: z.string(),
    area: z.number().min(0),
    type: z.string(),
    biodiversityScore: z.number().min(0).max(100),
    treesCount: z.number().int().min(0),
    lastMaintenance: z.string(),
  })),
  transportInitiatives: z.array(z.object({
    id: z.string().uuid(),
    schoolId: schoolId,
    type: z.enum(['ELECTRIC_VEHICLE', 'BICYCLE', 'WALKING', 'PUBLIC_TRANSPORT', 'CARPOOL', 'SHUTTLE']),
    description: z.string(),
    participants: z.number().int().min(0),
    annualEmissionsSaved: z.number().min(0),
    status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
  })),
  biodiversityScore: z.number().min(0).max(100),
  lastAuditDate: z.string(),
  nextAuditDate: z.string(),
})

const CreateGreenCampusSchema = GreenCampusSchema.omit({ id: true })
const UpdateGreenCampusSchema = GreenCampusSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Environmental Audit
// ============================================================================

const EnvironmentalAuditRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['INTERNAL', 'EXTERNAL', 'REGULATORY', 'CERTIFICATION']),
  auditor: z.string(),
  scope: z.string(),
  findings: z.array(z.object({
    id: z.string().uuid(),
    area: z.string(),
    severity: z.enum(['INFO', 'WARNING', 'CRITICAL', 'EMERGENCY']),
    description: z.string(),
    recommendation: z.string(),
    status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
  })),
  overallRating: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  nextAuditDate: z.string(),
  reportUrl: z.string().url().optional(),
  status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
})

const CreateEnvironmentalAuditRecordSchema = EnvironmentalAuditRecordSchema.omit({ id: true })
const UpdateEnvironmentalAuditRecordSchema = EnvironmentalAuditRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Compliance & Reporting
// ============================================================================

const ComplianceReportSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  standard: z.enum(['GRI', 'SASB', 'TCFD', 'CDP', 'UN_SDGS', 'ISO_14001', 'ISO_50001', 'EU_TAXONOMY']),
  period: z.enum(['MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL']),
  year: z.number().int().min(2000).max(2100),
  complianceScore: z.number().min(0).max(100),
  requirements: z.array(z.object({
    id: z.string().uuid(),
    requirement: z.string(),
    description: z.string(),
    isMet: z.boolean(),
    evidence: z.string().optional(),
    notes: z.string().optional(),
  })),
  gaps: z.array(z.object({
    id: z.string().uuid(),
    requirement: z.string(),
    description: z.string(),
    riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'NEGLIGIBLE']),
    remediation: z.string(),
    targetDate: z.string(),
  })),
  status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
  submittedAt: z.string().optional(),
  verifiedAt: z.string().optional(),
})

const CreateComplianceReportSchema = ComplianceReportSchema.omit({ id: true })
const UpdateComplianceReportSchema = ComplianceReportSchema.partial().required({ id: true })

const SustainabilityReportRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['ANNUAL_ESG', 'CARBON_DISCLOSURE', 'WATER_DISCLOSURE', 'WASTE_REPORT', 'PROGRESS_REPORT']),
  period: z.enum(['MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL']),
  year: z.number().int().min(2000).max(2100),
  status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
  content: z.string(),
  publishedAt: z.string().optional(),
  complianceStandards: z.array(z.enum(['GRI', 'SASB', 'TCFD', 'CDP', 'UN_SDGS', 'ISO_14001', 'ISO_50001', 'EU_TAXONOMY'])),
  generatedBy: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const CreateSustainabilityReportRecordSchema = SustainabilityReportRecordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

const UpdateSustainabilityReportRecordSchema = SustainabilityReportRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Biodiversity & Environment
// ============================================================================

const BiodiversityTrackerSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  speciesCount: z.number().int().min(0),
  speciesList: z.array(z.object({
    name: z.string(),
    type: z.string(),
    status: z.string(),
    population: z.number().int().min(0),
    trend: z.enum(['INCREASING', 'DECREASING', 'STABLE', 'FLUCTUATING']),
  })),
  habitatArea: z.number().min(0),
  greenSpaceArea: z.number().min(0),
  treesPlanted: z.number().int().min(0),
  treesLost: z.number().int().min(0),
  impact: z.enum(['POSITIVE', 'NEGATIVE', 'NEUTRAL', 'NET_GAIN', 'NET_LOSS']),
  score: z.number().min(0).max(100),
  lastSurveyDate: z.string(),
  nextSurveyDate: z.string(),
})

const CreateBiodiversityTrackerSchema = BiodiversityTrackerSchema.omit({ id: true })
const UpdateBiodiversityTrackerSchema = BiodiversityTrackerSchema.partial().required({ id: true })

const AirQualityMonitorSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  location: z.string(),
  aqi: z.number().int().min(0).max(500),
  status: z.enum(['EXCELLENT', 'GOOD', 'MODERATE', 'POOR', 'HAZARDOUS']),
  pm25: z.number().min(0),
  pm10: z.number().min(0),
  co2: z.number().min(0),
  no2: z.number().min(0),
  so2: z.number().min(0),
  o3: z.number().min(0),
  temperature: z.number(),
  humidity: z.number().min(0).max(100),
  lastReading: z.string(),
  readings: z.array(z.object({
    timestamp: z.string(),
    aqi: z.number().int().min(0).max(500),
    pm25: z.number().min(0),
    pm10: z.number().min(0),
  })),
})

const CreateAirQualityMonitorSchema = AirQualityMonitorSchema.omit({ id: true })
const UpdateAirQualityMonitorSchema = AirQualityMonitorSchema.partial().required({ id: true })

const NoiseMonitorSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  location: z.string(),
  currentLevel: z.number().min(0),
  status: z.enum(['SILENT', 'QUIET', 'MODERATE', 'LOUD', 'EXCESSIVE']),
  averageLevel: z.number().min(0),
  peakLevel: z.number().min(0),
  readings: z.array(z.object({
    timestamp: z.string(),
    level: z.number().min(0),
  })),
  lastReading: z.string(),
})

const CreateNoiseMonitorSchema = NoiseMonitorSchema.omit({ id: true })
const UpdateNoiseMonitorSchema = NoiseMonitorSchema.partial().required({ id: true })

const SoilQualityRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  location: z.string(),
  quality: z.enum(['EXCELLENT', 'GOOD', 'MODERATE', 'DEGRADED', 'CONTAMINATED']),
  ph: z.number().min(0).max(14),
  organicMatter: z.number().min(0).max(100),
  contaminants: z.array(z.string()),
  lastTested: z.string(),
})

const CreateSoilQualityRecordSchema = SoilQualityRecordSchema.omit({ id: true })
const UpdateSoilQualityRecordSchema = SoilQualityRecordSchema.partial().required({ id: true })

const LandUseRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  area: z.number().min(0),
  type: z.enum(['CONSERVATION', 'RECREATIONAL', 'AGRICULTURAL', 'BUILT_UP', 'MIXED']),
  description: z.string(),
  environmentalValue: z.number().min(0).max(100),
  lastAssessed: z.string(),
})

const CreateLandUseRecordSchema = LandUseRecordSchema.omit({ id: true })
const UpdateLandUseRecordSchema = LandUseRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Additional Records
// ============================================================================

const SustainableProcurementRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  category: z.string(),
  criteria: z.enum(['ECO_LABEL', 'LIFE_CYCLE_ASSESSMENT', 'LOCAL_SOURCING', 'FAIR_TRADE', 'GREEN_CERTIFIED']),
  vendor: z.string(),
  product: z.string(),
  greenScore: z.number().min(0).max(100),
  cost: z.number().min(0),
  savings: z.number().min(0),
  certification: z.string().optional(),
  date: z.string(),
})

const CreateSustainableProcurementRecordSchema = SustainableProcurementRecordSchema.omit({ id: true })
const UpdateSustainableProcurementRecordSchema = SustainableProcurementRecordSchema.partial().required({ id: true })

const CircularEconomyRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['REUSE', 'REPAIR', 'REMANUFACTURE', 'RECYCLE', 'RECOVER']),
  item: z.string(),
  quantity: z.number().int().min(0),
  costSaved: z.number().min(0),
  wasteDiverted: z.number().min(0),
  date: z.string(),
})

const CreateCircularEconomyRecordSchema = CircularEconomyRecordSchema.omit({ id: true })
const UpdateCircularEconomyRecordSchema = CircularEconomyRecordSchema.partial().required({ id: true })

const SocialImpactRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['COMMUNITY_DEVELOPMENT', 'EDUCATION_ACCESS', 'HEALTH_WELLNESS', 'EMPLOYMENT', 'DIVERSITY', 'WELLBEING']),
  initiative: z.string(),
  description: z.string(),
  beneficiaries: z.number().int().min(0),
  investment: z.number().min(0),
  outcome: z.string(),
  impactScore: z.number().min(0).max(100),
  date: z.string(),
})

const CreateSocialImpactRecordSchema = SocialImpactRecordSchema.omit({ id: true })
const UpdateSocialImpactRecordSchema = SocialImpactRecordSchema.partial().required({ id: true })

const ClimateActionRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['MITIGATION', 'ADAPTATION', 'CARBON_NEUTRALITY', 'TRANSITION', 'FINANCE']),
  action: z.string(),
  description: z.string(),
  status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
  carbonImpact: z.number(),
  costImpact: z.number(),
  startDate: z.string(),
  endDate: z.string().optional(),
})

const CreateClimateActionRecordSchema = ClimateActionRecordSchema.omit({ id: true })
const UpdateClimateActionRecordSchema = ClimateActionRecordSchema.partial().required({ id: true })

const EnvironmentalPolicyRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['ENVIRONMENTAL_MANAGEMENT', 'CLIMATE_COMMITMENT', 'WATER_STEWARDSHIP', 'WASTE_REDUCTION', 'BIODIVERSITY', 'POLLUTION_PREVENTION']),
  title: z.string(),
  version: z.string(),
  effectiveDate: z.string(),
  status: z.enum(['ON_TRACK', 'AHEAD', 'BEHIND', 'AT_RISK', 'COMPLETED', 'NOT_STARTED']),
  approvedBy: z.string().uuid(),
  reviewDate: z.string(),
  complianceRate: z.number().min(0).max(100),
})

const CreateEnvironmentalPolicyRecordSchema = EnvironmentalPolicyRecordSchema.omit({ id: true })
const UpdateEnvironmentalPolicyRecordSchema = EnvironmentalPolicyRecordSchema.partial().required({ id: true })

const CarbonCreditRecordSchema = z.object({
  id: z.string().uuid(),
  schoolId: schoolId,
  type: z.enum(['VERIFIED_CREDITS', 'GOLD_STANDARD', 'VCS', 'CDM', 'VOLUNTARY']),
  projectName: z.string(),
  provider: z.string(),
  vintage: z.number().int().min(2000).max(2100),
  quantity: z.number().int().min(0),
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
  retirementDate: z.string().optional(),
  verificationBody: z.string(),
  serialNumber: z.string(),
})

const CreateCarbonCreditRecordSchema = CarbonCreditRecordSchema.omit({ id: true })
const UpdateCarbonCreditRecordSchema = CarbonCreditRecordSchema.partial().required({ id: true })

// ============================================================================
// MODULE 10: SUSTAINABILITY PLATFORM - Exports
// ============================================================================

export {
  CreateESGDashboardSchema,
  UpdateESGDashboardSchema,
  CreateCarbonFootprintSchema,
  UpdateCarbonFootprintSchema,
  CreateEnergyAnalyticsSchema,
  UpdateEnergyAnalyticsSchema,
  CreateWaterAnalyticsSchema,
  UpdateWaterAnalyticsSchema,
  CreateWasteAnalyticsSchema,
  UpdateWasteAnalyticsSchema,
  CreateEnvironmentalKPISchema,
  UpdateEnvironmentalKPISchema,
  CreateSustainabilityGoalRecordSchema,
  UpdateSustainabilityGoalRecordSchema,
  CreateSustainabilityInitiativeSchema,
  UpdateSustainabilityInitiativeSchema,
  CreateGreenCampusSchema,
  UpdateGreenCampusSchema,
  CreateEnvironmentalAuditRecordSchema,
  UpdateEnvironmentalAuditRecordSchema,
  CreateComplianceReportSchema,
  UpdateComplianceReportSchema,
  CreateSustainabilityReportRecordSchema,
  UpdateSustainabilityReportRecordSchema,
  CreateBiodiversityTrackerSchema,
  UpdateBiodiversityTrackerSchema,
  CreateAirQualityMonitorSchema,
  UpdateAirQualityMonitorSchema,
  CreateNoiseMonitorSchema,
  UpdateNoiseMonitorSchema,
  CreateSoilQualityRecordSchema,
  UpdateSoilQualityRecordSchema,
  CreateLandUseRecordSchema,
  UpdateLandUseRecordSchema,
  CreateSustainableProcurementRecordSchema,
  UpdateSustainableProcurementRecordSchema,
  CreateCircularEconomyRecordSchema,
  UpdateCircularEconomyRecordSchema,
  CreateSocialImpactRecordSchema,
  UpdateSocialImpactRecordSchema,
  CreateClimateActionRecordSchema,
  UpdateClimateActionRecordSchema,
  CreateEnvironmentalPolicyRecordSchema,
  UpdateEnvironmentalPolicyRecordSchema,
  CreateCarbonCreditRecordSchema,
  UpdateCarbonCreditRecordSchema,
}
