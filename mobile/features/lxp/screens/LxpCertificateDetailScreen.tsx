import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CertificateDetail {
  id: string;
  title: string;
  description: string;
  issuedDate: string;
  expiryDate: string;
  issuer: string;
  credentialId: string;
  verificationUrl: string;
}

export const LxpCertificateDetailScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<CertificateDetail | null>(null);

  useEffect(() => {
    fetchCertificateDetail();
  }, []);

  const fetchCertificateDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/certificates/${route.params.id}`);
      const json = await response.json();
      setCertificate(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!certificate) return <View style={styles.container}><Text>Certificate not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.certificateCard}>
        <Text style={styles.icon}>🏆</Text>
        <Text style={styles.title}>{certificate.title}</Text>
        <Text style={styles.description}>{certificate.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Issued:</Text>
          <Text style={styles.infoValue}>{certificate.issuedDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Expires:</Text>
          <Text style={styles.infoValue}>{certificate.expiryDate || 'Never'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Issuer:</Text>
          <Text style={styles.infoValue}>{certificate.issuer}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Credential ID:</Text>
          <Text style={styles.infoValue}>{certificate.credentialId}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Verify Certificate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  certificateCard: { backgroundColor: '#fff', padding: 24, margin: 16, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: '#FFD700' },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  description: { fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center' },
  section: { backgroundColor: '#fff', padding: 16, margin: 16, marginTop: 0, borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoLabel: { fontSize: 14, color: '#666' },
  infoValue: { fontSize: 14, fontWeight: '500' },
  verifyButton: { backgroundColor: '#2196F3', margin: 16, padding: 16, borderRadius: 8, alignItems: 'center' },
  verifyButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  shareButton: { backgroundColor: '#fff', margin: 16, marginTop: 0, padding: 16, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#2196F3' },
  shareButtonText: { color: '#2196F3', fontSize: 16, fontWeight: '600' },
});
