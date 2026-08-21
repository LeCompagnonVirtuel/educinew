import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList, Switch } from 'react-native';

interface GroupMember {
  id: string;
  name: string;
  role: 'admin' | 'member';
  avatarColor: string;
  isOnline: boolean;
}

interface GroupDetail {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
  color: string;
  settings: {
    notifications: boolean;
    pinMessages: boolean;
    mediaSharing: boolean;
  };
}

interface GroupDetailProps {
  groupId: string;
}

const GroupDetailScreen: React.FC<GroupDetailProps> = ({ groupId }) => {
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroupDetail();
  }, [groupId]);

  const fetchGroupDetail = async () => {
    try {
      setLoading(true);
      const mockGroup: GroupDetail = {
        id: groupId,
        name: 'Math Department',
        description: 'Collaboration space for math educators to share resources, discuss curriculum, and coordinate department activities.',
        memberCount: 12,
        createdAt: 'September 2023',
        color: '#3b82f6',
        settings: {
          notifications: true,
          pinMessages: true,
          mediaSharing: true,
        },
      };
      const mockMembers: GroupMember[] = [
        { id: '1', name: 'Dr. Smith', role: 'admin', avatarColor: '#3b82f6', isOnline: true },
        { id: '2', name: 'Sarah Johnson', role: 'admin', avatarColor: '#22c55e', isOnline: true },
        { id: '3', name: 'Michael Chen', role: 'member', avatarColor: '#8b5cf6', isOnline: false },
        { id: '4', name: 'Lisa Wang', role: 'member', avatarColor: '#f59e0b', isOnline: true },
        { id: '5', name: 'James Wilson', role: 'member', avatarColor: '#ef4444', isOnline: false },
      ];
      setGroup(mockGroup);
      setMembers(mockMembers);
    } catch (err) {
      setError('Failed to fetch group details');
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = (key: keyof GroupDetail['settings']) => {
    if (!group) return;
    setGroup({
      ...group,
      settings: { ...group.settings, [key]: !group.settings[key] },
    });
  };

  const renderMember = ({ item }: { item: GroupMember }) => (
    <View style={styles.memberItem}>
      <View style={styles.memberInfo}>
        <View style={[styles.memberAvatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.memberAvatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.memberName}>{item.name}</Text>
          <Text style={styles.memberRole}>{item.role}</Text>
        </View>
      </View>
      <View style={[styles.onlineIndicator, item.isOnline && styles.online]} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !group) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Group not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <View style={[styles.groupIcon, { backgroundColor: group.color }]}>
          <Text style={styles.groupIconText}>{group.name.charAt(0)}</Text>
        </View>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
        <View style={styles.groupStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{group.memberCount}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{group.createdAt}</Text>
            <Text style={styles.statLabel}>Created</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>
        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch value={group.settings.notifications} onValueChange={() => toggleSetting('notifications')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Pin Messages</Text>
            <Switch value={group.settings.pinMessages} onValueChange={() => toggleSetting('pinMessages')} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Media Sharing</Text>
            <Switch value={group.settings.mediaSharing} onValueChange={() => toggleSetting('mediaSharing')} />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Members ({members.length})</Text>
          <TouchableOpacity style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>+ Invite</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.membersCard}>
          <FlatList
            data={members}
            renderItem={renderMember}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  groupIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupIconText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  groupStats: {
    flexDirection: 'row',
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inviteButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingLabel: {
    fontSize: 16,
  },
  membersCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
  },
  memberRole: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#d1d5db',
  },
  online: {
    backgroundColor: '#22c55e',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default GroupDetailScreen;
