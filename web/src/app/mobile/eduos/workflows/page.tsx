'use client';

import React, { useState, useCallback } from 'react';

const ENTITIES = [
  { id: '1', name: 'WorkflowNode', description: 'Modular workflow step execution engine', status: 'running', count: 8 },
  { id: '2', name: 'BPMNEngine', description: 'Business process modeler and executor', status: 'idle', count: 3 },
  { id: '3', name: 'StateMachine', description: 'Finite state machine for entity lifecycle', status: 'active', count: 15 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running': return 'bg-blue-600';
    case 'active': return 'bg-green-500';
    default: return 'bg-gray-300';
  }
};

export default function WorkflowsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [data] = useState(ENTITIES);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-2xl font-extrabold text-gray-900">Workflow Orchestration</h1>
        <p className="text-sm text-gray-500 mt-1">WorkflowNode · BPMNEngine · StateMachine</p>
      </div>
      <div className="flex mx-4 mb-4 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex-1 text-center">
          <div className="text-xl font-extrabold text-blue-600">{data.length}</div>
          <div className="text-xs text-gray-500 mt-1">Engines</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-xl font-extrabold text-blue-600">{data.reduce((a, b) => a + b.count, 0)}</div>
          <div className="text-xs text-gray-500 mt-1">Active Flows</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-xl font-extrabold text-green-500">99.8%</div>
          <div className="text-xs text-gray-500 mt-1">Success Rate</div>
        </div>
      </div>
      <button onClick={onRefresh} disabled={refreshing} className="w-full px-4 pb-2 text-right">
        <span className="text-xs text-blue-600">{refreshing ? 'Refreshing...' : 'Pull to refresh'}</span>
      </button>
      <div className="px-4 space-y-3">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">{item.name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(item.status)}`} />
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            <p className="text-xs text-blue-600 mt-2 font-semibold">{item.count} active instances</p>
          </div>
        ))}
      </div>
    </div>
  );
}
