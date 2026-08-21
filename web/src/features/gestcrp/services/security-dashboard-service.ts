import { GestcrpSecurityDashboardError } from '@educi/errors';
import { ZeroTrustService } from './zero-trust-service';
import { IAMService } from './iam-service';
import { SOCService } from './soc-service';
import { SIEMService } from './siem-service';
import { ThreatDetectionService } from './threat-detection-service';
import { AppSecurityService } from './app-security-service';
import { DataSecurityService } from './data-security-service';
import { DeviceSecurityService } from './device-security-service';
import { SOARService } from './soar-service';
import { BCPService } from './bcp-service';
import { ComplianceService } from './compliance-service';
import { CyberTwinService } from './cyber-twin-service';
import type { BaseGestcrpService, GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Security Dashboard Aggregator Service
// ============================================================================

export interface SecurityDashboardData {
  overview: SecurityOverview;
  zeroTrust: ZeroTrustDashboard;
  soc: SOCDashboard;
  siem: SIEMDashboard;
  threats: ThreatDashboard;
  appSecurity: AppSecurityDashboard;
  dataSecurity: DataSecurityDashboard;
  devices: DeviceDashboard;
  soar: SOARDashboard;
  bcp: BCPDashboard;
  compliance: ComplianceDashboard;
  cyberTwin: CyberTwinDashboard;
  lastUpdated: string;
}

export interface SecurityOverview {
  overallScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  openIncidents: number;
  activeThreats: number;
  complianceRate: number;
  deviceComplianceRate: number;
}

export interface ZeroTrustDashboard {
  totalPolicies: number;
  activePolicies: number;
  averageRiskScore: number;
}

export interface SOCDashboard {
  openIncidents: number;
  criticalIncidents: number;
  averageResolutionTime: number;
}

export interface SIEMDashboard {
  totalEvents: number;
  highSeverityEvents: number;
  activeRules: number;
}

export interface ThreatDashboard {
  totalIndicators: number;
  activeFeeds: number;
  averageConfidence: number;
}

export interface AppSecurityDashboard {
  totalVulnerabilities: number;
  criticalVulnerabilities: number;
  openVulnerabilities: number;
}

export interface DataSecurityDashboard {
  activeDLPPolicies: number;
  unreviewedIncidents: number;
  activeEncryptionKeys: number;
}

export interface DeviceDashboard {
  totalDevices: number;
  onlineDevices: number;
  compromisedDevices: number;
  complianceRate: number;
}

export interface SOARDashboard {
  activePlaybooks: number;
  totalExecutions: number;
  successRate: number;
}

export interface BCPDashboard {
  activePlans: number;
  totalBackupJobs: number;
  failedBackupJobs: number;
}

export interface ComplianceDashboard {
  overallScore: number;
  activePolicies: number;
  openRisks: number;
}

export interface CyberTwinDashboard {
  totalTwins: number;
  completedTwins: number;
  averageScore: number;
}

export class SecurityDashboardService extends BaseGestcrpService {
  private readonly services: {
    zeroTrust: ZeroTrustService;
    iam: IAMService;
    soc: SOCService;
    siem: SIEMService;
    threats: ThreatDetectionService;
    appSecurity: AppSecurityService;
    dataSecurity: DataSecurityService;
    devices: DeviceSecurityService;
    soar: SOARService;
    bcp: BCPService;
    compliance: ComplianceService;
    cyberTwin: CyberTwinService;
  };

  constructor(
    services: {
      zeroTrust: ZeroTrustService;
      iam: IAMService;
      soc: SOCService;
      siem: SIEMService;
      threats: ThreatDetectionService;
      appSecurity: AppSecurityService;
      dataSecurity: DataSecurityService;
      devices: DeviceSecurityService;
      soar: SOARService;
      bcp: BCPService;
      compliance: ComplianceService;
      cyberTwin: CyberTwinService;
    },
    config?: GestcrpServiceConfig,
  ) {
    super(config);
    this.services = services;
  }

  async getDashboard(schoolId: string): Promise<SecurityDashboardData> {
    this.validateSchoolId(schoolId);

    const results = await Promise.allSettled([
      this.services.zeroTrust.getPolicyStats(schoolId),
      this.services.iam.getSessionStats(schoolId),
      this.services.soc.getIncidentStats(schoolId),
      this.services.siem.getEventStats(schoolId),
      this.services.threats.getIndicatorStats(schoolId),
      this.services.appSecurity.getVulnerabilityStats(schoolId),
      this.services.dataSecurity.getDLPStats(schoolId),
      this.services.devices.getDeviceStats(schoolId),
      this.services.soar.getExecutionStats(schoolId),
      this.services.bcp.getBCPStats(schoolId),
      this.services.compliance.getComplianceStats(schoolId),
      this.services.cyberTwin.getTwinStats(schoolId),
    ]);

    const failedCount = results.filter((r) => r.status === 'rejected').length;
    if (failedCount > 6) {
      throw new GestcrpSecurityDashboardError(
        `Plus de la moitié des services sécurité ont échoué (${failedCount}/12)`,
      );
    }

    const getValue = <T>(result: PromiseSettledResult<T>, fallback: T): T =>
      result.status === 'fulfilled' ? result.value : fallback;

    const zeroTrustStats = getValue(results[0], { total: 0, active: 0, inactive: 0, byEnforcementMode: {} });
    const iamSessionStats = getValue(results[1], { totalActive: 0, totalExpired: 0, byAuthMethod: {}, averageRiskScore: 0 });
    const socIncidentStats = getValue(results[2], { total: 0, open: 0, closed: 0, bySeverity: {}, byStatus: {}, averageRiskScore: 0 });
    const siemEventStats = getValue(results[3], { total: 0, bySeverity: {}, bySource: {}, normalizedCount: 0, iocMatchCount: 0 });
    const threatIndicatorStats = getValue(results[4], { total: 0, byType: {}, bySeverity: {}, byCategory: {}, averageConfidence: 0, expiredCount: 0 });
    const vulnStats = getValue(results[5], { total: 0, bySeverity: {}, byStatus: {}, criticalCount: 0, exploitableCount: 0, patchAvailableCount: 0, averageRiskScore: 0 });
    const dlpStats = getValue(results[6], { totalPolicies: 0, activePolicies: 0, totalIncidents: 0, unreviewedIncidents: 0, blockedCount: 0, byClassification: {} });
    const deviceStats = getValue(results[7], { total: 0, online: 0, offline: 0, compromised: 0, quarantined: 0, byPlatform: {}, byStatus: {} });
    const soarStats = getValue(results[8], { total: 0, running: 0, completed: 0, failed: 0, cancelled: 0, averageDuration: 0 });
    const bcpStats = getValue(results[9], { totalPlans: 0, activePlans: 0, totalBackupPolicies: 0, activeBackupPolicies: 0, totalBackupJobs: 0, failedBackupJobs: 0, lastDRTestSuccess: null });
    const complianceStats = getValue(results[10], { totalAssessments: 0, compliant: 0, partiallyCompliant: 0, nonCompliant: 0, overallScore: 0 });
    const cyberTwinStats = getValue(results[11], { total: 0, byStatus: {}, bySimulationType: {}, completedCount: 0, averageScore: 0 });

    const complianceRate = deviceStats.total > 0 ? ((deviceStats.total - deviceStats.compromised) / deviceStats.total) * 100 : 100;

    const overallScore = this.calculateOverallScore({
      zeroTrustActive: zeroTrustStats.active,
      socOpenIncidents: socIncidentStats.open,
      siemHighEvents: siemEventStats.bySeverity['HIGH'] ?? 0,
      vulnCritical: vulnStats.criticalCount,
      dlpUnreviewed: dlpStats.unreviewedIncidents,
      deviceCompromised: deviceStats.compromised,
      complianceScore: complianceStats.overallScore,
    });

    const riskLevel = this.determineRiskLevel(overallScore);

    return {
      overview: {
        overallScore,
        riskLevel,
        openIncidents: socIncidentStats.open,
        activeThreats: threatIndicatorStats.total,
        complianceRate,
        deviceComplianceRate: complianceRate,
      },
      zeroTrust: {
        totalPolicies: zeroTrustStats.total,
        activePolicies: zeroTrustStats.active,
        averageRiskScore: iamSessionStats.averageRiskScore,
      },
      soc: {
        openIncidents: socIncidentStats.open,
        criticalIncidents: socIncidentStats.bySeverity['CRITICAL'] ?? 0,
        averageResolutionTime: 0,
      },
      siem: {
        totalEvents: siemEventStats.total,
        highSeverityEvents: (siemEventStats.bySeverity['HIGH'] ?? 0) + (siemEventStats.bySeverity['CRITICAL'] ?? 0),
        activeRules: 0,
      },
      threats: {
        totalIndicators: threatIndicatorStats.total,
        activeFeeds: 0,
        averageConfidence: threatIndicatorStats.averageConfidence,
      },
      appSecurity: {
        totalVulnerabilities: vulnStats.total,
        criticalVulnerabilities: vulnStats.criticalCount,
        openVulnerabilities: vulnStats.byStatus['NEW'] ?? 0,
      },
      dataSecurity: {
        activeDLPPolicies: dlpStats.activePolicies,
        unreviewedIncidents: dlpStats.unreviewedIncidents,
        activeEncryptionKeys: 0,
      },
      devices: {
        totalDevices: deviceStats.total,
        onlineDevices: deviceStats.online,
        compromisedDevices: deviceStats.compromised,
        complianceRate,
      },
      soar: {
        activePlaybooks: 0,
        totalExecutions: soarStats.completed + soarStats.failed,
        successRate: soarStats.completed > 0 ? (soarStats.completed / (soarStats.completed + soarStats.failed)) * 100 : 100,
      },
      bcp: {
        activePlans: bcpStats.activePlans,
        totalBackupJobs: bcpStats.totalBackupJobs,
        failedBackupJobs: bcpStats.failedBackupJobs,
      },
      compliance: {
        overallScore: complianceStats.overallScore,
        activePolicies: 0,
        openRisks: 0,
      },
      cyberTwin: {
        totalTwins: cyberTwinStats.total,
        completedTwins: cyberTwinStats.completedCount,
        averageScore: cyberTwinStats.averageScore,
      },
      lastUpdated: new Date().toISOString(),
    };
  }

  async getSecurityScore(schoolId: string): Promise<{
    overall: number;
    breakdown: Record<string, number>;
    trend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  }> {
    this.validateSchoolId(schoolId);

    const dashboard = await this.getDashboard(schoolId);

    const breakdown: Record<string, number> = {
      zeroTrust: dashboard.zeroTrust.totalPolicies > 0 ? (dashboard.zeroTrust.activePolicies / dashboard.zeroTrust.totalPolicies) * 100 : 100,
      soc: dashboard.soc.openIncidents === 0 ? 100 : Math.max(0, 100 - dashboard.soc.openIncidents * 10),
      siem: dashboard.siem.highSeverityEvents === 0 ? 100 : Math.max(0, 100 - dashboard.siem.highSeverityEvents),
      threats: dashboard.threats.totalIndicators === 0 ? 100 : Math.max(0, 100 - dashboard.threats.totalIndicators),
      appSecurity: dashboard.appSecurity.criticalVulnerabilities === 0 ? 100 : Math.max(0, 100 - dashboard.appSecurity.criticalVulnerabilities * 20),
      dataSecurity: dashboard.dataSecurity.unreviewedIncidents === 0 ? 100 : Math.max(0, 100 - dashboard.dataSecurity.unreviewedIncidents * 10),
      devices: dashboard.devices.complianceRate,
      soar: dashboard.soar.successRate,
      bcp: dashboard.bcp.failedBackupJobs === 0 ? 100 : Math.max(0, 100 - dashboard.bcp.failedBackupJobs * 20),
      compliance: dashboard.compliance.overallScore,
    };

    const overall = Math.round(
      Object.values(breakdown).reduce((sum, v) => sum + v, 0) / Object.keys(breakdown).length,
    );

    return {
      overall,
      breakdown,
      trend: 'STABLE',
    };
  }

  private calculateOverallScore(data: {
    zeroTrustActive: number;
    socOpenIncidents: number;
    siemHighEvents: number;
    vulnCritical: number;
    dlpUnreviewed: number;
    deviceCompromised: number;
    complianceScore: number;
  }): number {
    let score = 100;

    if (data.zeroTrustActive === 0) score -= 10;
    score -= Math.min(30, data.socOpenIncidents * 5);
    score -= Math.min(20, data.siemHighEvents * 2);
    score -= Math.min(20, data.vulnCritical * 10);
    score -= Math.min(10, data.dlpUnreviewed * 5);
    score -= Math.min(20, data.deviceCompromised * 10);

    const complianceFactor = data.complianceScore / 100;
    score = score * 0.7 + complianceFactor * 100 * 0.3;

    return Math.round(Math.max(0, Math.min(100, score)));
  }

  private determineRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (score >= 80) return 'LOW';
    if (score >= 60) return 'MEDIUM';
    if (score >= 40) return 'HIGH';
    return 'CRITICAL';
  }
}
