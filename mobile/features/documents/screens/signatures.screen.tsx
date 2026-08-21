import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ScrollView,
} from 'react-native';

interface SignatureRequest {
  id: string;
  documentName: string;
  requestedBy: string;
  requestedAt: string;
  status: 'pending' | 'signed' | 'expired' | 'declined';
  dueDate: string;
  signers: { name: string; status: string }[];
}

interface AuditEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

const SignaturesScreen: React.FC = () => {
  const [requests, setRequests] = useState<SignatureRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'expired'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<SignatureRequest | null>(null);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>([]);

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    try {
      setLoading(true);
      const mockData: SignatureRequest[] = [
        { id: '1', documentName: 'Employment Contract - J. Davis', requestedBy: 'HR Department', requestedAt: '2 hours ago', status: 'pending', dueDate: 'Aug 1, 2024', signers: [{ name: 'J. Davis', status: 'pending' }, { name: 'Dr. Smith', status: 'signed' }] },
        { id: '2', documentName: 'Budget Approval Form', requestedBy: 'Finance Team', requestedAt: '1 day ago', status: 'pending', dueDate: 'Jul 30, 2024', signers: [{ name: 'Finance Dir.', status: 'pending' }, { name: 'Principal', status: 'pending' }] },
        { id: '3', documentName: 'Parent Consent Form', requestedBy: 'Admin Office', requestedAt: '3 days ago', status: 'pending', dueDate: 'Aug 5, 2024', signers: [{ name: 'Parent', status: 'pending' }] },
        { id: '4', documentName: 'Curriculum Agreement', requestedBy: 'Dr. Smith', requestedAt: '1 week ago', status: 'signed', dueDate: 'Jul 20, 2024', signers: [{ name: 'Dr. Smith', status: 'signed' }, { name: 'Ms. Johnson', status: 'signed' }] },
        { id: '5', documentName: 'Vendor Contract', requestedBy: 'Admin', requestedAt: '2 weeks ago', status: 'signed', dueDate: 'Jul 15, 2024', signers: [{ name: 'Admin', status: 'signed' }] },
        { id: '6', documentName: 'Old Policy Renewal', requestedBy: 'Legal', requestedAt: '1 month ago', status: 'expired', dueDate: 'Jun 1, 2024', signers: [{ name: 'Legal', status: 'expired' }] },
        { id: '7', documentName: 'Amendment Request', requestedBy: 'HR', requestedAt: '3 weeks ago', status: 'declined', dueDate: 'Jul 10, 2024', signers: [{ name: 'Employee', status: 'declined' }] },
      ];
      setRequests(mockData);
    } catch (err) {
      setError('Failed to fetch signatures');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSignatures();
  }, []);

  const handleSign = (id: string) => {
    Alert.alert('Sign', 'Confirm signature?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign', onPress: () => {
        setRequests(requests.map((r) => r.id === id ? { ...r, status: 'signed' } : r));
        setSelectedRequest(null);
      }},
    ]);
  };

  const handleDecline = (id: string) => {
    Alert.alert('Decline', 'Are you sure you want to decline?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Decline', style: 'destructive', onPress: () => {
        setRequests(requests.map((r) => r.id === id ? { ...r, status: 'declined' } : r));
        setSelectedRequest(null);
      }},
    ]);
  };

  const showAuditTrail = (request: SignatureRequest) => {
    const mockAudit: AuditEntry[] = [
      { id: '1', action: 'Request Created', user: request.requestedBy, timestamp: request.requestedAt, details: 'Signature request initiated' },
      { id: '2', action: 'Document Sent', user: 'System', timestamp: request.requestedAt, details: 'Email notification sent to all signers' },
      { id: '3', action: 'Opened', user: request.signers[0]?.name || 'Unknown', timestamp: '1 hour ago', details: 'Document viewed' },
    ];
    setAuditTrail(mockAudit);
    setSelectedRequest(request);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'expired': return '#6b7280';
      case 'declined': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (activeTab === 'pending') return r.status === 'pending';
    if (activeTab === 'completed') return r.status === 'signed';
    return r.status === 'expired' || r.status === 'declined';
  });

  const renderItem = ({ item }: { item: SignatureRequest }) => (
    <TouchableOpacity style={styles.requestItem} onPress={() => showAuditTrail(item)}>
      <View style={styles.requestHeader}>
        <Text style={styles.requestName} numberOfLines={1}>{item.documentName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.requestMeta}>From: {item.requestedBy} · {item.requestedAt}</Text>
      <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
      <View style={styles.signersRow}>
        {item.signers.map((signer, idx) => (
          <View key={idx} style={styles.signerChip}>
            <View style={[styles.signerDot, { backgroundColor: getStatusColor(signer.status) }]} />
            <Text style={styles.signerName}>{signer.name}</Text>
          </View>
        ))}
      </View>
      {item.status === 'pending' && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.declineBtn} onPress={() => handleDecline(item.id)}>
            <Text style={styles.declineBtnText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signBtn} onPress={() => handleSign(item.id)}>
            <Text style={styles.signBtnText}>Sign</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signatures</Text>

      <View style={styles.tabBar}>
        {(['pending', 'completed', 'expired'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {selectedRequest && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Audit Trail</Text>
              <TouchableOpacity onPress={() => setSelectedRequest(null)}>
                <Text style={styles.modalClose}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDocName}>{selectedRequest.documentName}</Text>
            <ScrollView>
              {auditTrail.map((entry) => (
                <View key={entry.id} style={styles.auditItem}>
                  <View style={styles.auditDot} />
                  <View style={styles.auditContent}>
                    <Text style={styles.auditAction}>{entry.action}</Text>
                    <Text style={styles.auditDetails}>{entry.details}</Text>
                    <Text style={styles.auditMeta}>{entry.user} · {entry.timestamp}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  requestItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  requestName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  requestMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: '500',
    marginBottom: 8,
  },
  signersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  signerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  signerName: {
    fontSize: 12,
    color: '#374151',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  declineBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
  },
  declineBtnText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  signBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  signBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalClose: {
    fontSize: 18,
    color: '#6b7280',
  },
  modalDocName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  auditItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  auditDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    marginRight: 12,
    marginTop: 4,
  },
  auditContent: {
    flex: 1,
  },
  auditAction: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  auditDetails: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  auditMeta: {
    fontSize: 11,
    color: '#9ca3af',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default SignaturesScreen;
