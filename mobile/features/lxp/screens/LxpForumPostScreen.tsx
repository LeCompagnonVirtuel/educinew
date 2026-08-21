import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: { id: string; content: string; author: string; createdAt: string; }[];
}

export const LxpForumPostScreen: React.FC<{ navigation: unknown; route: { params: { forumId: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<ForumPost | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/lxp/forums/${route.params.forumId}/posts`);
      const json = await response.json();
      setPost(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!post) return <View style={styles.container}><Text>Post not found</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.postCard}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postAuthor}>by {post.author} • {post.createdAt}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
        <Text style={styles.repliesTitle}>Replies ({post.replies.length})</Text>
        {post.replies.map((reply) => (
          <View key={reply.id} style={styles.replyCard}>
            <Text style={styles.replyAuthor}>{reply.author} • {reply.createdAt}</Text>
            <Text style={styles.replyContent}>{reply.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.replyInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Write a reply..."
          value={replyText}
          onChangeText={setReplyText}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1 },
  postCard: { backgroundColor: '#fff', padding: 16, margin: 16, borderRadius: 8 },
  postTitle: { fontSize: 18, fontWeight: '700' },
  postAuthor: { fontSize: 12, color: '#666', marginTop: 4 },
  postContent: { fontSize: 14, color: '#333', marginTop: 12, lineHeight: 20 },
  repliesTitle: { fontSize: 16, fontWeight: '600', padding: 16 },
  replyCard: { backgroundColor: '#fff', padding: 12, marginHorizontal: 16, marginBottom: 8, borderRadius: 8 },
  replyAuthor: { fontSize: 12, color: '#666' },
  replyContent: { fontSize: 14, color: '#333', marginTop: 4 },
  replyInput: { flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  textInput: { flex: 1, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  sendButton: { backgroundColor: '#2196F3', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, justifyContent: 'center' },
  sendButtonText: { color: '#fff', fontWeight: '600' },
});
