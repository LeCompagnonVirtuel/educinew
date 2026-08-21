'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  SecurityDashboardService,
  ZeroTrustService,
  IAMService,
  SOCService,
  SIEMService,
  ThreatDetectionService,
  AppSecurityService,
  DataSecurityService,
  DeviceSecurityService,
  SOARService,
  BCPService,
  ComplianceService,
  CyberTwinService,
} from '../services';
import type { SecurityDashboardData } from '../services';

const QUERY_KEY = 'gestcrp-security-dashboard';

function createDashboardService(): SecurityDashboardService {
  return new SecurityDashboardService({
    zeroTrust: new ZeroTrustService(),
    iam: new IAMService(),
    soc: new SOCService(),
    siem: new SIEMService(),
    threats: new ThreatDetectionService(),
    appSecurity: new AppSecurityService(),
    dataSecurity: new DataSecurityService(),
    devices: new DeviceSecurityService(),
    soar: new SOARService(),
    bcp: new BCPService(),
    compliance: new ComplianceService(),
    cyberTwin: new CyberTwinService(),
  });
}

export function useSecurityMetrics(schoolId: string) {
  const service = useMemo(() => createDashboardService(), []);

  return useQuery<{ overall: number; breakdown: Record<string, number>; trend: 'IMPROVING' | 'STABLE' | 'DECLINING' }>({
    queryKey: [QUERY_KEY, 'score', schoolId],
    queryFn: () => service.getSecurityScore(schoolId),
    enabled: !!schoolId,
  });
}

export function useSecurityDashboard(schoolId: string) {
  const service = useMemo(() => createDashboardService(), []);

  return useQuery<SecurityDashboardData>({
    queryKey: [QUERY_KEY, 'dashboard', schoolId],
    queryFn: () => service.getDashboard(schoolId),
    enabled: !!schoolId,
    refetchInterval: 300000,
  });
}
