'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface SOCIncidentDetail {
  id: string;
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'NEW' | 'TRIAGED' | 'INVESTIGATING' | 'CONTAINED' | 'ERADICATED' | 'RECOVERED' | 'CLOSED';
  category: string;
  source: string;
  affected_systems: string[];
  affected_users: string[];
  risk_score: number;
  estimated_impact: number;
  timeline: { timestamp: string; action: string; actor: string }[];
}

function getSeverityColor(sev: string): string {
  switch (sev) {
    case 'CRITICAL': return 'text-red-700 bg-red-50';
    case 'HIGH': return 'text-orange-700 bg-orange-50';
    case 'MEDIUM': return 'text-yellow-700 bg-yellow-50';
    case 'LOW': return 'text-green-700 bg-green-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function SOCIncidentDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [incident, setIncident] = useState<SOCIncidentDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/security/soc/incidents/${id}`);
        if (!res.ok) throw new Error('Incident introuvable');
        setIncident(await res.json());
      } catch {
        setIncident(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Incident introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Incident Detail</p>
        <h1 className="text-xl font-bold text-gray-900">{incident.title}</h1>
        <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Severity</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${getSeverityColor(incident.severity)}`}>
            {incident.severity}
          </span>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Status</p>
          <p className="text-sm font-bold text-gray-900 mt-1">{incident.status.replace(/_/g, ' ')}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Risk Score</p>
          <p className="text-lg font-bold text-red-600">{incident.risk_score}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Est. Impact</p>
          <p className="text-lg font-bold text-orange-600">{incident.estimated_impact}</p>
        </div>
      </div>

      {incident.affected_systems && incident.affected_systems.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Affected Systems</h2>
          <div className="flex flex-wrap gap-2">
            {incident.affected_systems.map((sys) => (
              <span key={sys} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">{sys}</span>
            ))}
          </div>
        </div>
      )}

      {incident.affected_users && incident.affected_users.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Affected Users</h2>
          <div className="flex flex-wrap gap-2">
            {incident.affected_users.map((user) => (
              <span key={user} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">{user}</span>
            ))}
          </div>
        </div>
      )}

      {incident.timeline && incident.timeline.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Timeline</h2>
          <div className="space-y-3">
            {incident.timeline.map((event, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  {idx < incident.timeline.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="pb-3">
                  <p className="text-sm font-medium text-gray-900">{event.action}</p>
                  <p className="text-xs text-gray-500">{event.actor} · {new Date(event.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
