import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { useDocumentDetail } from '@/features/documents/hooks';

interface DocumentVersion {
  id: string;
  version: string;
  author: string;
  createdAt: string;
  size: string;
  comment: string;
}

interface DocumentPermission {
  id: string;
  userName: string;
  role: string;
  access: 'view' | 'edit' | 'admin';
}

interface DocumentComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatarColor: string;
}

interface DocumentActivity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

interface DocumentDetail {
  id: string;
  name: string;
  type: string;
  category: string;
  status: string;
  tags: string[];
  size: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  versions: DocumentVersion[];
  permissions: DocumentPermission[];
  comments: DocumentComment[];
  activities: DocumentActivity[];
}

const DocumentDetailScreen: React.FC = () => {
  const [document, setDocument] = useState<DocumentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'versions' | 'permissions' | 'comments' | 'activity'>('info');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchDocumentDetail();
  }, []);

  const fetchDocumentDetail = async () => {
    try {
      setLoading(true);
      const mockData: DocumentDetail = {
        id: '1',
        name: 'Curriculum Plan 2024.pdf',
        type: 'pdf',
        category: 'Academic',
        status: 'published',
        tags: ['Important', 'Curriculum'],
        size: '2.4 MB',
        author: 'Dr. Smith',
        createdAt: 'Jan 15, 2024',
        updatedAt: '2 hours ago',
        description: 'Comprehensive curriculum plan for the 2024 academic year covering all departments and grade levels.',
        versions: [
          { id: '1', version: '3.0', author: 'Dr. Smith', createdAt: '2 hours ago', size: '2.4 MB', comment: 'Final revisions and approvals' },
          { id: '2', version: '2.0', author: 'Dr. Smith', createdAt: '3 days ago', size: '2.3 MB', comment: 'Updated based on department feedback' },
          { id: '3', version: '1.0', author: 'Dr. Smith', createdAt: '2 weeks ago', size: '2.1 MB', comment: 'Initial draft' },
        ],
        permissions: [
          { id: '1', userName: 'Dr. Smith', role: 'Principal', access: 'admin' },
          { id: '2', userName: 'Ms. Johnson', role: 'Vice Principal', access: 'edit' },
          { id: '3', userName: 'Math Dept', role: 'Department', access: 'view' },
          { id: '4', userName: 'All Teachers', role: 'Staff', access: 'view' },
        ],
        comments: [
          { id: '1', author: 'Ms. Johnson', content: 'Looks great! Minor changes needed on page 12.', createdAt: '1 hour ago', avatarColor: '#3b82f6' },
          { id: '2', author: 'Mr. Lee', content: 'Math section needs review before publishing.', createdAt: '3 hours ago', avatarColor: '#22c55e' },
          { id: '3', author: 'Dr. Smith', content: 'Updated based on feedback. Ready for review.', createdAt: 'Yesterday', avatarColor: '#f59e0b' },
        ],
        activities: [
          { id: '1', action: 'Updated to version 3.0', user: 'Dr. Smith', timestamp: '2 hours ago' },
          { id: '2', action: 'Comment added', user: 'Ms. Johnson', timestamp: '1 hour ago' },
          { id: '3', action: 'Shared with Math Dept', user: 'Dr. Smith', timestamp: 'Yesterday' },
          { id: '4', action: 'Created', user: 'Dr. Smith', timestamp: '2 weeks ago' },
        ],
      };
      setDocument(mockData);
    } catch (err) {
      setError('Failed to fetch document details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    Alert.alert('Download', 'Document download started');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share options opened');
  };

  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this document?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive' },
    ]);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setNewComment('');
    }
  };

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'admin': return '#ef4444';
      case 'edit': return '#f59e0b';
      case 'view': return '#22c55e';
      default: return '#6b7280';
    }
  };

  if (loading) {
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

  if (!document) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{document.name}</Text>
        <Text style={styles.subtitle}>{document.author} · {document.updatedAt}</Text>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleDownload}>
          <Text style={styles.actionIcon}>⬇</Text>
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
          <Text style={styles.actionIcon}>↗</Text>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={handleDelete}>
          <Text style={styles.actionIcon}>🗑</Text>
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        {(['info', 'versions', 'permissions', 'comments', 'activity'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'info' && (
          <View>
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Description</Text>
              <Text style={styles.infoValue}>{document.description}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>{document.type.toUpperCase()}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{document.category}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Size</Text>
                <Text style={styles.infoValue}>{document.size}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={styles.infoValue}>{document.status}</Text>
              </View>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Tags</Text>
              <View style={styles.tagsContainer}>
                {document.tags.map((tag) => (
                  <View key={tag} style={styles.tagBadge}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'versions' && (
          <View>
            {document.versions.map((version) => (
              <View key={version.id} style={styles.versionItem}>
                <View style={styles.versionHeader}>
                  <Text style={styles.versionNumber}>v{version.version}</Text>
                  <Text style={styles.versionDate}>{version.createdAt}</Text>
                </View>
                <Text style={styles.versionComment}>{version.comment}</Text>
                <Text style={styles.versionMeta}>{version.author} · {version.size}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'permissions' && (
          <View>
            {document.permissions.map((perm) => (
              <View key={perm.id} style={styles.permissionItem}>
                <View style={styles.permissionInfo}>
                  <Text style={styles.permissionName}>{perm.userName}</Text>
                  <Text style={styles.permissionRole}>{perm.role}</Text>
                </View>
                <View style={[styles.accessBadge, { backgroundColor: getAccessColor(perm.access) }]}>
                  <Text style={styles.accessText}>{perm.access}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'comments' && (
          <View>
            {document.comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={[styles.commentAvatar, { backgroundColor: comment.avatarColor }]}>
                  <Text style={styles.commentAvatarText}>{comment.author.charAt(0)}</Text>
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentTime}>{comment.createdAt}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            ))}
            <View style={styles.commentInput}>
              <TextInput
                style={styles.commentField}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity style={styles.commentSend} onPress={handleAddComment}>
                <Text style={styles.commentSendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'activity' && (
          <View>
            {document.activities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityMeta}>{activity.user} · {activity.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    gap: 4,
  },
  deleteBtn: {
    backgroundColor: '#fef2f2',
  },
  actionIcon: {
    fontSize: 14,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  deleteText: {
    color: '#ef4444',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 13,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  tabTextActive: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 15,
    color: '#111827',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e0e7ff',
  },
  tagText: {
    fontSize: 12,
    color: '#3730a3',
  },
  versionItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  versionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  versionDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  versionComment: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  versionMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  permissionInfo: {},
  permissionName: {
    fontSize: 15,
    fontWeight: '600',
  },
  permissionRole: {
    fontSize: 13,
    color: '#6b7280',
  },
  accessBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accessText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  commentItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  commentAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
  },
  commentTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
  },
  commentInput: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  commentField: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
  },
  commentSend: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  commentSendText: {
    color: '#fff',
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    marginRight: 12,
    marginTop: 4,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  activityMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default DocumentDetailScreen;
