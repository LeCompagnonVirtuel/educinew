import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CertificateItem {
  id: string;
  title: string;
  issuedDate: string;
  expiryDate: string;
  issuer: string;
}

export const LxpCertificateListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/lxp/certificates');
      const json = await response.json();
      setCertificates(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {certificates.map((cert) => (
        <TouchableOpacity key={cert.id} style={styles.card} onPress={() => navigation.navigate('CertificateDetail', { id: cert.id })}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🏆</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{cert.title}</Text>
            <Text style={styles.meta}>Issued: {cert.issuedDate}</Text>
            <Text style={styles.meta}>By: {cert.issuer}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  icon: { fontSize: 24 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 12, color: '#666', marginTop: 4 },
});
