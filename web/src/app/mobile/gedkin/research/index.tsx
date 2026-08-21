'use client';

import { useState, useCallback } from 'react';
import { useResearchProjects, usePublications, useResearcherProfiles } from '@/features/gedkin/hooks';

interface ResearchProject {
  id: string;
  title: string;
  status: string;
  progress: number;
  researchers_count: number;
  start_date: string;
}

const FALLBACK_PROJECTS: ResearchProject[] = [
  { id: '1', title: 'Impact of Digital Learning on Student Outcomes', status: 'active', progress: 0.65, researchers_count: 5, start_date: '2025-09-01' },
  { id: '2', title: 'Teacher Retention in Rural Schools', status: 'active', progress: 0.42, researchers_count: 3, start_date: '2025-11-15' },
  { id: '3', title: 'Gender Parity in STEM Education', status: 'completed', progress: 1.0, researchers_count: 4, start_date: '2025-03-01' },
  { id: '4', title: 'Parental Engagement and Academic Performance', status: 'active', progress: 0.28, researchers_count: 2, start_date: '2026-01-10' },
];

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50';
    case 'completed': return 'text-blue-600 bg-blue-50';
    case 'paused': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getProgressColor(progress: number): string {
  if (progress >= 0.8) return 'bg-green-500';
  if (progress >= 0.5) return 'bg-blue-500';
  if (progress >= 0.3) return 'bg-yellow-500';
  return 'bg-gray-400';
}

export default function ResearchPage() {
  const [refreshing, setRefreshing] = useState(false);
  const projectsQuery = useResearchProjects('current-school');
  const publicationsQuery = usePublications('current-school');
  const profilesQuery = useResearcherProfiles('current-school');

  const isLoading = projectsQuery.isLoading || publicationsQuery.isLoading || profilesQuery.isLoading;
  const hasError = projectsQuery.error || publicationsQuery.error || profilesQuery.error;

  const projects = projectsQuery.data?.data ?? FALLBACK_PROJECTS;
  const totalPublications = publicationsQuery.data?.total ?? 12;
  const totalResearchers = profilesQuery.data?.total ?? 8;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([projectsQuery.refetch(), publicationsQuery.refetch(), profilesQuery.refetch()])
      .finally(() => setRefreshing(false));
  }, [projectsQuery, publicationsQuery, profilesQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load research data</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching research intelligence</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  const activeCount = projects.filter((p) => p.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Research Intelligence</h1>
          <p className="text-sm text-gray-500">{activeCount} active projects</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{projects.length}</p>
          <p className="text-xs text-gray-500">Projects</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalPublications}</p>
          <p className="text-xs text-gray-500">Publications</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{totalResearchers}</p>
          <p className="text-xs text-gray-500">Researchers</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Research Projects</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {projects.map((project) => (
            <div key={project.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900 flex-1 mr-2">{project.title}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span>{project.researchers_count} researchers</span>
                <span>&middot;</span>
                <span>Started {project.start_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${getProgressColor(project.progress)}`} style={{ width: `${project.progress * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{(project.progress * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
