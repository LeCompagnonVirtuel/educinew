'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbMessaging } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { getAuthenticatedSchoolId } from '@/lib/api/secure';
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeMessages } from '@/hooks/useRealtime';
import {
  Search, MoreVertical, Image as ImageIcon, Paperclip, Smile,
  CheckCheck, Plus, Users, Bell, Settings, Phone, Video, X, ChevronDown,
  ChevronLeft, ChevronRight, GraduationCap, User, UserPlus, UsersRound,
  Megaphone, Clock, Check, Filter, Archive, Trash2, Pin, Volume2, VolumeX,
  MessageSquare, ArrowLeft, SendHorizontal, Send, Mail, FileText,
  Download, Eye, Edit, Save, Copy, StickyNote, Layout, Upload, Loader2,
  List, Users2, BookOpen, GraduationCap as GradIcon
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: { name: string; type: string; url: string }[];
}

interface Conversation {
  id: string;
  type: 'individual' | 'group' | 'class' | 'announcement';
  name: string;
  avatar?: string;
  role?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  members?: { id: string; name: string; avatar?: string }[];
  isOnline?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'parents' | 'teachers' | 'groups' | 'announcements'>('all');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLayoutModal, setShowLayoutModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
  const [schoolUsers, setSchoolUsers] = useState<{ id: string; name: string; email: string; role: string }[]>([]);
  const [newMessageRecipient, setNewMessageRecipient] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Message templates - loaded from school settings with fallback defaults
  const [messageLayouts, setMessageLayouts] = useState<any[]>([
    { id: '1', name: 'Notification bulletin', category: 'Scolarité', content: 'Bonjour, le bulletin de {student_name} pour {period} est disponible. Merci de votre confiance.' },
    { id: '2', name: 'Rappel paiement', category: 'Paiement', content: 'Bonjour, nous vous rappelons que la scolarité de {student_name} ({amount} FCFA) est due depuis le {due_date}.' },
    { id: '3', name: 'Absence', category: 'Présence', content: 'Bonjour, {student_name} était absent(e) aujourd\'hui. Merci de justifier cette absence.' },
    { id: '4', name: 'Réunion parents', category: 'Événement', content: 'Bonjour, une réunion des parents est prévue le {date} à {time}. Votre présence est souhaitée.' },
    { id: '5', name: 'Message personnalisé', category: 'Autre', content: '' },
  ]);
  const [selectedLayout, setSelectedLayout] = useState<any>(null);
  const [templateContent, setLayoutContent] = useState('');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');

  const [conversationsLoading, setConversationsLoading] = useState(true);

  // Attachments
  const [attachments, setAttachments] = useState<any[]>([]);
  const [attachmentPreview, setAttachmentPreview] = useState<any>(null);

  // Email integration - defaults come from school settings
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailSettings, setEmailSettings] = useState({ sender: user?.school?.email || 'admin@ecole.ci', signature: user?.school?.name || 'École' });

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Layout handlers
  const handleSelectLayout = (template: any) => {
    setSelectedLayout(template);
    setLayoutContent(template.content);
    setInput(template.content);
  };

  const handleSaveLayout = (newLayout: any) => {
    if (newLayout.id) {
      setMessageLayouts(messageLayouts.map(t => t.id === newLayout.id ? newLayout : t));
    } else {
      setMessageLayouts([...messageLayouts, { ...newLayout, id: Date.now().toString() }]);
    }
    showToast('Modèle sauvegardé', 'success');
    setShowLayoutModal(false);
  };

  const handleDeleteLayout = (templateId: string) => {
    setMessageLayouts(messageLayouts.filter(t => t.id !== templateId));
    showToast('Modèle supprimé');
  };

  // Attachment handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newAttachments = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    setAttachments([...attachments, ...newAttachments]);
    showToast(`${newAttachments.length} fichier(s) ajouté(s)`, 'success');
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    setAttachments(attachments.filter(a => a.id !== attachmentId));
  };

  const handleViewAttachment = (attachment: any) => {
    setAttachmentPreview(attachment);
  };

  // Message sending
  const handleSendMessage = async () => {
    if (!input.trim() && attachments.length === 0) {
      showToast('Veuillez saisir un message ou joindre un fichier', 'error');
      return;
    }
    if (!newMessageRecipient) {
      showToast('Veuillez sélectionner un destinataire', 'error');
      return;
    }
    if (schoolUsers.length > 0 && !schoolUsers.some(u => u.id === newMessageRecipient)) {
      showToast('Destinataire invalide', 'error');
      return;
    }
    setSending(true);
    try {
      await sbMessaging.send(newMessageRecipient, input.trim());
      setInput('');
      setAttachments([]);
      setNewMessageRecipient('');
      setShowNewMessage(false);
      showToast('Message envoyé', 'success');
      loadConversations();
    } catch (err) {
      showToast('Erreur lors de l\'envoi', 'error');
    } finally {
      setSending(false);
    }
  };

  // Send with different channels
  const handleSendMultiChannel = async (channels: { email?: boolean; sms?: boolean }) => {
    if (!input.trim()) {
      showToast('Veuillez saisir un message', 'error');
      return;
    }
    if (!newMessageRecipient) {
      showToast('Veuillez sélectionner un destinataire', 'error');
      return;
    }
    setSending(true);
    try {
      await sbMessaging.send(newMessageRecipient, input.trim());
      const sentChannels: string[] = ['messagerie'];
      if (channels.email) sentChannels.push('email');
      if (channels.sms) sentChannels.push('SMS');
      showToast(`Message envoyé par ${sentChannels.join(' et ')}`, 'success');
      setShowNewMessage(false);
      setInput('');
      setNewMessageRecipient('');
      loadConversations();
    } catch (err) {
      showToast('Erreur lors de l\'envoi', 'error');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    loadConversations();
    loadSchoolUsers();
  }, [user?.id]);

  const selectedConvRef = useRef(selectedConversation);
  selectedConvRef.current = selectedConversation;

  useRealtimeMessages(useCallback((msg: any) => {
    loadConversations();
    const conv = selectedConvRef.current;
    if (conv && (conv.id === msg.sender_id || conv.id === msg.receiver_id)) {
      loadMessages(conv.id);
    }
  }, []));

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadSchoolUsers = async () => {
    try {
      const schoolId = await getAuthenticatedSchoolId();
      if (!schoolId || !user?.id) return;
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, role')
        .eq('school_id', schoolId)
        .neq('id', user.id);
      if (error) throw error;
      setSchoolUsers(data || []);
    } catch (_) {
      // silently fail
    }
  };

  const loadConversations = async () => {
    setConversationsLoading(true);
    try {
      const inbox = await sbMessaging.getInbox();
      if (!inbox || inbox.length === 0) {
        setConversations([]);
        return;
      }

      const currentUserId = user?.id;
      if (!currentUserId) return;

      // Group messages by the OTHER user (the conversation partner)
      const grouped: Record<string, any[]> = {};
      for (const msg of inbox) {
        const otherUserId = msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
        if (!grouped[otherUserId]) grouped[otherUserId] = [];
        grouped[otherUserId].push(msg);
      }

      const convos: Conversation[] = Object.entries(grouped).map(([otherUserId, msgs]) => {
        // Messages are already sorted descending from API, first is most recent
        const lastMsg = msgs[0];
        const otherUser = lastMsg.senderId === currentUserId ? lastMsg.receiver : lastMsg.sender;
        const unreadCount = msgs.filter((m: any) => m.receiverId === currentUserId && !m.isRead).length;

        const roleLabel = otherUser?.role === 'PARENT' ? 'Parent' :
          otherUser?.role === 'TEACHER' ? 'Professeur' :
          otherUser?.role === 'ADMIN' ? 'Administration' :
          otherUser?.role === 'COMPTABLE' ? 'Comptable' :
          otherUser?.role === 'SECRETAIRE' ? 'Secrétaire' :
          otherUser?.role === 'CENSEUR' ? 'Censeur' :
          otherUser?.role || '';

        // Format time
        const createdAt = new Date(lastMsg.createdAt);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        let timeLabel: string;
        if (diffDays === 0) {
          timeLabel = createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
          timeLabel = 'Hier';
        } else if (diffDays < 7) {
          timeLabel = createdAt.toLocaleDateString('fr-FR', { weekday: 'short' });
        } else {
          timeLabel = createdAt.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
        }

        return {
          id: otherUserId,
          type: 'individual' as const,
          name: otherUser?.name || otherUser?.email || 'Utilisateur',
          role: roleLabel,
          lastMessage: lastMsg.content,
          lastMessageTime: timeLabel,
          unreadCount,
          isOnline: false,
          isPinned: false,
        };
      });

      // Sort by most recent message first
      convos.sort((a, b) => {
        const aIdx = inbox.findIndex((m: any) => (m.senderId === a.id || m.receiverId === a.id));
        const bIdx = inbox.findIndex((m: any) => (m.senderId === b.id || m.receiverId === b.id));
        return aIdx - bIdx;
      });

      setConversations(convos);
    } catch (_) {
      showToast('Erreur lors du chargement des conversations', 'error');
    } finally {
      setConversationsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const msgs = await sbMessaging.getConversation(conversationId);
      if (!msgs || msgs.length === 0) {
        setMessages([]);
        return;
      }

      const currentUserId = user?.id;
      const mapped: Message[] = msgs.map((msg: any) => {
        const createdAt = new Date(msg.createdAt);
        const timestamp = createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const isMe = msg.senderId === currentUserId;

        return {
          id: msg.id,
          senderId: msg.senderId,
          senderName: msg.sender?.name || msg.sender?.email || 'Utilisateur',
          content: msg.content,
          timestamp,
          status: isMe ? (msg.isRead ? 'read' : 'delivered') : 'read',
        };
      });

      setMessages(mapped);
    } catch (_) {
      showToast('Erreur lors du chargement des messages', 'error');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const content = input.trim();
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || '',
      senderName: user?.name || 'Moi',
      content,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      if (selectedConversation) {
        await sbMessaging.send(selectedConversation.id, content);
        setMessages(prev =>
          prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' as const } : m)
        );
      }
    } catch (_) {
      showToast('Erreur lors de l\'envoi', 'error');
      setMessages(prev => prev.filter(m => m.id !== newMessage.id));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (conv.role || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (filterType === 'parents') matchesFilter = conv.type === 'individual' && !!conv.role?.includes('Parent');
    if (filterType === 'teachers') matchesFilter = conv.type === 'individual' && !!conv.role?.includes('Professeur');
    if (filterType === 'groups') matchesFilter = conv.type === 'group' || conv.type === 'class';
    if (filterType === 'announcements') matchesFilter = conv.type === 'announcement';
    
    return matchesSearch && matchesFilter;
  });

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const getConversationIcon = (type: Conversation['type']) => {
    switch (type) {
      case 'group': return UsersRound;
      case 'class': return GraduationCap;
      case 'announcement': return Megaphone;
      default: return User;
    }
  };

  const getConversationColor = (type: Conversation['type']) => {
    switch (type) {
      case 'group': return 'bg-indigo-100 text-indigo-600';
      case 'class': return 'bg-emerald-100 text-emerald-600';
      case 'announcement': return 'bg-amber-100 text-amber-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Messages' }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="h-[calc(100vh-8rem)] flex bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* ==================== SIDEBAR ==================== */}
        <div className={`w-80 border-r border-slate-200 flex flex-col bg-slate-50 ${selectedConversation ? 'hidden lg:flex' : ''}`}>
          {/* Header */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-slate-800">Messages</h1>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowSettings(true)}
                  className="p-2 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <Settings size={20} className="text-slate-500" />
                </button>
                <button 
                  onClick={() => setShowNewMessage(true)}
                  className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl transition-colors"
                >
                  <Plus size={20} className="text-white" />
                </button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 py-2 border-b border-slate-200 overflow-x-auto">
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'Tous' },
                { key: 'parents', label: 'Parents' },
                { key: 'teachers', label: 'Professeurs' },
                { key: 'groups', label: 'Groupes' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilterType(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterType === tab.key ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversationsLoading && (
              <div className="p-4 space-y-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 bg-slate-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-3/4" />
                      <div className="h-2 bg-slate-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Pinned */}
            {!conversationsLoading && filteredConversations.filter(c => c.isPinned).length > 0 && (
              <div className="p-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <Pin size={12} className="text-slate-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase">Épinglés</span>
                </div>
                {filteredConversations.filter(c => c.isPinned).map(conv => {
                  const Icon = getConversationIcon(conv.type);
                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        selectedConversation?.id === conv.id ? 'bg-indigo-100' : 'hover:bg-white'
                      }`}
                    >
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl ${getConversationColor(conv.type)} flex items-center justify-center`}>
                          <Icon size={20} />
                        </div>
                        {conv.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-50 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-800 truncate">{conv.name}</h3>
                          <span className="text-xs text-slate-400">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="w-5 h-5 bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* All Conversations */}
            {!conversationsLoading && <div className="p-2">
              {filteredConversations.filter(c => !c.isPinned).length > 0 && (
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Messages</span>
                </div>
              )}
              {filteredConversations.filter(c => !c.isPinned).map(conv => {
                const Icon = getConversationIcon(conv.type);
                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                      selectedConversation?.id === conv.id ? 'bg-indigo-100' : 'hover:bg-white'
                    }`}
                  >
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl ${getConversationColor(conv.type)} flex items-center justify-center`}>
                        <Icon size={20} />
                      </div>
                      {conv.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-50 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-800 truncate">{conv.name}</h3>
                        <span className="text-xs text-slate-400">{conv.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{conv.role}</p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>}
          </div>
        </div>

        {/* ==================== CHAT AREA ==================== */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedConversation(null)}
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-xl"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl ${getConversationColor(selectedConversation.type)} flex items-center justify-center`}>
                    {(() => {
                      const Icon = getConversationIcon(selectedConversation.type);
                      return <Icon size={20} />;
                    })()}
                  </div>
                  {selectedConversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">{selectedConversation.name}</h2>
                  <p className="text-xs text-slate-500">
                    {selectedConversation.role}
                    {selectedConversation.isOnline !== undefined && (
                      <span className="ml-2 text-emerald-500">
                        {selectedConversation.isOnline ? '• En ligne' : '• Hors ligne'}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => showToast('Bientôt disponible', 'info')} className="p-2 hover:bg-slate-100 rounded-xl">
                  <Phone size={20} className="text-slate-500" />
                </button>
                <button onClick={() => showToast('Bientôt disponible', 'info')} className="p-2 hover:bg-slate-100 rounded-xl">
                  <Video size={20} className="text-slate-500" />
                </button>
                <button onClick={() => showToast('Bientôt disponible', 'info')} className="p-2 hover:bg-slate-100 rounded-xl">
                  <MoreVertical size={20} className="text-slate-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {/* Date Divider */}
              <div className="flex justify-center">
                <span className="px-4 py-1 bg-white rounded-full text-xs font-medium text-slate-500 shadow-sm">
                  Aujourd'hui
                </span>
              </div>

              {messages.map((msg, i) => {
                const isMe = msg.senderId === (user?.id || 'admin');
                const showAvatar = !isMe && (i === 0 || messages[i - 1]?.senderId !== msg.senderId);
                
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] flex ${isMe ? '' : 'items-end gap-2'}`}>
                      {!isMe && showAvatar && (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                          {msg.senderName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                      )}
                      {!isMe && !showAvatar && <div className="w-8" />}
                      <div className="space-y-1">
                        {showAvatar && !isMe && (
                          <p className="text-xs font-medium text-slate-500 ml-1">{msg.senderName}</p>
                        )}
                        <div className={`p-4 rounded-2xl ${
                          isMe 
                            ? 'bg-indigo-500 text-white rounded-tr-none' 
                            : 'bg-white text-slate-800 rounded-tl-none shadow-sm'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                        <div className={`flex items-center gap-1 ${isMe ? 'justify-end mr-1' : 'ml-1'}`}>
                          <span className={`text-[10px] ${isMe ? 'text-slate-400' : 'text-slate-400'}`}>
                            {msg.timestamp}
                          </span>
                          {isMe && (
                            <CheckCheck size={14} className={
                              msg.status === 'read' ? 'text-indigo-400' : 
                              msg.status === 'delivered' ? 'text-slate-400' : 'text-slate-300'
                            } />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                    ...
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                    <ImageIcon size={20} className="text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                    <Paperclip size={20} className="text-slate-400" />
                  </button>
                </div>
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Écrire un message..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={1}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 rounded-xl transition-colors"
                >
                  <SendHorizontal size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={40} className="text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Messages</h3>
              <p className="text-slate-500 mb-4">Sélectionnez une conversation pour commencer</p>
              <button
                onClick={() => setShowNewMessage(true)}
                className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600"
              >
                Nouveau message
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Nouveau message</h3>
              <button onClick={() => setShowNewMessage(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Channel Selection */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${emailEnabled ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-400' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}
                >
                  <Mail size={16} /> Email
                </button>
                <button 
                  onClick={() => setSmsEnabled(!smsEnabled)}
                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${smsEnabled ? 'bg-green-100 text-green-600 border-2 border-green-400' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}
                >
                  <MessageSquare size={16} /> SMS
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Destinataire</label>
                <select
                  value={newMessageRecipient}
                  onChange={(e) => setNewMessageRecipient(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                >
                  <option value="">Sélectionner...</option>
                  {(() => {
                    const parents = schoolUsers.filter(u => u.role === 'PARENT');
                    const teachers = schoolUsers.filter(u => u.role === 'TEACHER');
                    const staff = schoolUsers.filter(u => !['PARENT', 'TEACHER'].includes(u.role));
                    return (
                      <>
                        {parents.length > 0 && (
                          <optgroup label="Parents">
                            {parents.map(u => (
                              <option key={u.id} value={u.id}>{u.name || u.email}</option>
                            ))}
                          </optgroup>
                        )}
                        {teachers.length > 0 && (
                          <optgroup label="Professeurs">
                            {teachers.map(u => (
                              <option key={u.id} value={u.id}>{u.name || u.email}</option>
                            ))}
                          </optgroup>
                        )}
                        {staff.length > 0 && (
                          <optgroup label="Personnel">
                            {staff.map(u => (
                              <option key={u.id} value={u.id}>{u.name || u.email}</option>
                            ))}
                          </optgroup>
                        )}
                      </>
                    );
                  })()}
                </select>
              </div>

              {/* Layout Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-600">Modèle de message</label>
                  <button onClick={() => setShowLayoutModal(true)} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                    <Plus size={12} /> Nouveau modèle
                  </button>
                </div>
                <select 
                  value={selectedLayout?.id || ''}
                  onChange={(e) => {
                    const template = messageLayouts.find(t => t.id === e.target.value);
                    if (template) handleSelectLayout(template);
                  }}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                >
                  <option value="">Sélectionner un modèle...</option>
                  {messageLayouts.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Message</label>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm h-32 resize-none"
                  placeholder="Écrire votre message..."
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Pièces jointes</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4">
                  {attachments.length === 0 ? (
                    <label className="flex flex-col items-center cursor-pointer">
                      <Upload size={24} className="text-slate-400 mb-2" />
                      <span className="text-sm text-slate-500">Glissez des fichiers ici ou cliquez</span>
                      <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
                    </label>
                  ) : (
                    <div className="space-y-2">
                      {attachments.map(attachment => (
                        <div key={attachment.id} className="flex items-center justify-between bg-slate-50 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-slate-400" />
                            <span className="text-sm text-slate-600 truncate max-w-[200px]">{attachment.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleViewAttachment(attachment)} className="p-1 hover:bg-slate-200 rounded">
                              <Eye size={14} className="text-slate-400" />
                            </button>
                            <button onClick={() => handleRemoveAttachment(attachment.id)} className="p-1 hover:bg-red-50 rounded">
                              <X size={14} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <label className="flex items-center justify-center gap-2 text-sm text-indigo-600 cursor-pointer hover:text-indigo-700 mt-2">
                        <Plus size={14} /> Ajouter d'autres fichiers
                        <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowNewMessage(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium">
                Annuler
              </button>
              <button 
                onClick={() => handleSendMultiChannel({ email: emailEnabled, sms: smsEnabled })} 
                disabled={sending}
                className="flex-1 py-2.5 bg-indigo-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-indigo-600 disabled:opacity-50"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Layout Modal */}
      {showLayoutModal && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Gérer les modèles</h3>
              <button onClick={() => setShowLayoutModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {messageLayouts.map(template => (
                <div key={template.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-800">{template.name}</p>
                    <p className="text-xs text-slate-500">{template.category}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { setSelectedLayout(template); setLayoutContent(template.content); setShowLayoutModal(false); }} className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDeleteLayout(template.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <h4 className="text-sm font-semibold text-slate-600 mb-2">Créer un nouveau modèle</h4>
              <input 
                type="text" 
                placeholder="Nom du modèle"
                value={newTemplateName}
                onChange={e => setNewTemplateName(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm mb-2"
              />
              <textarea 
                placeholder="Contenu du message..."
                value={newTemplateContent}
                onChange={e => setNewTemplateContent(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm h-20 resize-none"
              />
              <button 
                onClick={() => {
                  if (!newTemplateName.trim()) {
                    showToast('Veuillez entrer un nom de modèle', 'error');
                    return;
                  }
                  if (!newTemplateContent.trim()) {
                    showToast('Veuillez entrer le contenu du modèle', 'error');
                    return;
                  }
                  setMessageLayouts(prev => [...prev, {
                    id: `layout-${Date.now()}`,
                    name: newTemplateName.trim(),
                    category: 'Personnalisé',
                    content: newTemplateContent.trim(),
                  }]);
                  setNewTemplateName('');
                  setNewTemplateContent('');
                  showToast('Modèle créé', 'success');
                }} 
                className="mt-2 w-full py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium"
              >
                Créer le modèle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attachment Preview Modal */}
      {attachmentPreview && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">{attachmentPreview.name}</h3>
              <button onClick={() => setAttachmentPreview(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="bg-slate-100 rounded-xl p-8 text-center">
              <FileText size={48} className="mx-auto text-slate-400 mb-4" />
              <p className="text-sm text-slate-500">{(attachmentPreview.size / 1024).toFixed(1)} KB</p>
              <div className="flex gap-2 mt-4 justify-center">
                <a href={attachmentPreview.url} download={attachmentPreview.name} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                  <Download size={14} /> Télécharger
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Paramètres</h3>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Notifications</span>
                </div>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-6 rounded-full transition-colors ${isMuted ? 'bg-slate-300' : 'bg-indigo-500'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${isMuted ? '' : 'translate-x-6'}`} />
                </button>
              </div>

              <button className="w-full flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <Archive size={20} className="text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Messages archivés</span>
              </button>

              <button className="w-full flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-red-50 transition-colors">
                <Trash2 size={20} className="text-red-500" />
                <span className="text-sm font-medium text-red-500">Supprimer la conversation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
