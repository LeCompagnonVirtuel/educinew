import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface MicroCredentialItem {
  id: string;
  title: string;
  description: string;
  skills: string[];
  progress: number;
}

export const LxpMicroCredentialListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState<MicroCredentialItem[]>([]);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await fetch('/api/lxp/micro-credentials');
      const json = await response.json();
      setCredentials(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {credentials.map((cred) => (
        <TouchableOpacity key={cred.id} style={styles.card} onPress={() => navigation.navigate('MicroCredentialDetail', { id: cred.id })}>
          <Text style={styles.title}>{cred.title}</Text>
          <Text style={styles.description}>{cred.description}</Text>
          <View style={styles.skillsContainer}>
            {cred.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${cred.progress}%` }]} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 8 },
  skillBadge: { backgroundColor: '#E3F2FD', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  skillText: { fontSize: 12, color: '#1976D2' },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#3F51B5', borderRadius: 2 },
});
