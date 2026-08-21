import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
  endorsements: number;
}

export const LxpSkillListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<SkillItem[]>([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/lxp/skills');
      const json = await response.json();
      setSkills(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {skills.map((skill) => (
        <TouchableOpacity key={skill.id} style={styles.card} onPress={() => navigation.navigate('SkillDetail', { id: skill.id })}>
          <View style={styles.header}>
            <Text style={styles.name}>{skill.name}</Text>
            <Text style={styles.level}>Level {skill.level}</Text>
          </View>
          <Text style={styles.category}>{skill.category}</Text>
          <Text style={styles.endorsements}>{skill.endorsements} endorsements</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600' },
  level: { fontSize: 12, color: '#9C27B0', fontWeight: '500' },
  category: { fontSize: 14, color: '#666', marginTop: 4 },
  endorsements: { fontSize: 12, color: '#999', marginTop: 4 },
});
