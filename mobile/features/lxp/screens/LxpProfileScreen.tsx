import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ProfileData {
  id: string;
  name: string;
  email: string;
  bio: string;
  joinDate: string;
  totalCourses: number;
  completedCourses: number;
  certificates: number;
}

export const LxpProfileScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/lxp/profile');
      const json = await response.json();
      setProfile(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!profile) return <View style={styles.container}><Text>Profile not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{profile.totalCourses}</Text>
          <Text style={styles.statLabel}>Enrolled</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{profile.completedCourses}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{profile.certificates}</Text>
          <Text style={styles.statLabel}>Certificates</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <Text style={styles.joinDate}>Member since {profile.joinDate}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.menuText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#fff', padding: 24, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '600' },
  name: { fontSize: 20, fontWeight: '700', marginTop: 12 },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  statsGrid: { flexDirection: 'row', padding: 16, gap: 12 },
  statCard: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 8, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700', color: '#2196F3' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  bio: { fontSize: 14, color: '#333', lineHeight: 20 },
  joinDate: { fontSize: 12, color: '#999', marginTop: 8 },
  menuItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuText: { fontSize: 16 },
});
