'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbMessaging } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getInitials, formatDate } from '@/lib/utils';
import {
  Search, Send, Video, Phone, MoreVertical, Image as ImageIcon,
  Paperclip, Smile, CheckCheck, ListFilter, Plus,
} from 'lucide-react';

export default function TeacherMessagesPage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const msg = t.messages;

  useEffect(() => {
    async function loadInbox() {
      setLoading(true);
      try {
        const inbox = await sbMessaging.getInbox();
        setConversations(inbox || []);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadInbox();
  }, []);

  const selectConversation = async (userId: string, userData: any) => {
    setSelectedUser(userData);
    try {
      const msgs = await sbMessaging.getConversation(userId);
      setMessages(msgs);
    } catch (err) {
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedUser) return;
    try {
      await sbMessaging.send(selectedUser.id, input.trim());
      const msgs = await sbMessaging.getConversation(selectedUser.id);
      setMessages(msgs);
      setInput('');
    } catch (err) {
    }
  };

  const filterTabs = [
    { key: 'all', label: msg.allChats },
    { key: 'parents', label: lang === 'fr' ? 'Parents' : 'Parents' },
    { key: 'admin', label: msg.admin },
    { key: 'students', label: lang === 'fr' ? 'Élèves' : 'Students' },
  ];

  return (
    <RoleLayout role="teacher">
      <div className="flex h-[calc(100vh-8rem)] -m-8">
        {/* Conversations List */}
        <div className="w-80 border-r border-[#edeeef] bg-white flex flex-col">
          <div className="p-6 pb-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-[#191c1d]">{msg.title}</h2>
              <button className="p-2 bg-[#f3f4f5] rounded-full text-[#3525cd]">
                <ListFilter size={18} />
              </button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={msg.search}
                className="w-full bg-white border-none rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#3525cd] shadow-card"
              />
            </div>
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                    filter === tab.key
                      ? 'bg-[#3525cd] text-white'
                      : 'bg-white text-[#464555] hover:bg-indigo-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-6 custom-scrollbar">
            {loading ? (
              <div className="text-center py-8 text-slate-400">{lang === 'fr' ? 'Chargement...' : 'Loading...'}</div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8 text-slate-400">{lang === 'fr' ? 'Aucune conversation' : 'No conversations'}</div>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.user?.id}
                  onClick={() => selectConversation(conv.user.id, conv.user)}
                  className={`w-full p-4 mb-2 rounded-2xl text-left transition-all ${
                    selectedUser?.id === conv.user?.id
                      ? 'bg-[#f3f4f5] shadow-card border-l-4 border-[#3525cd]'
                      : 'hover:bg-[#e7e8e9]'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] font-bold text-sm">
                        {getInitials(conv.user?.name || '?')}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h3 className="text-sm font-bold text-[#191c1d] truncate">{conv.user?.name}</h3>
                        <span className="text-[10px] font-medium text-slate-400">
                          {lang === 'fr' ? 'À l\'instant' : 'Just now'}
                        </span>
                      </div>
                      <p className="text-xs text-[#464555] truncate">{conv.lastMessage?.content}</p>
                      {conv.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-[#3525cd] text-white text-[10px] font-bold rounded-full mt-2">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="px-8 py-5 flex items-center justify-between border-b border-[#edeeef]">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] font-bold">
                      {getInitials(selectedUser.name || '?')}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#191c1d]">{selectedUser.name}</h2>
                    <p className="text-xs text-green-500 font-medium">{msg.online}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 hover:bg-slate-50 rounded-full text-slate-500"><Video size={18} /></button>
                  <button className="p-2.5 hover:bg-slate-50 rounded-full text-slate-500"><Phone size={18} /></button>
                  <button className="p-2.5 hover:bg-slate-50 rounded-full text-slate-500"><MoreVertical size={18} /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                <div className="flex justify-center">
                  <span className="px-4 py-1 bg-[#edeeef] text-[10px] font-bold uppercase tracking-widest text-[#464555] rounded-full">
                    {lang === 'fr' ? "Aujourd'hui" : 'Today'}
                  </span>
                </div>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : ''}`}>
                    <div className={`max-w-[70%] ${msg.senderId === user?.id ? '' : 'flex items-end gap-3'}`}>
                      {msg.senderId !== user?.id && (
                        <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] font-bold text-xs flex-shrink-0">
                          {getInitials(msg.sender?.name || '?')}
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className={`p-4 rounded-2xl ${
                          msg.senderId === user?.id
                            ? 'bg-gradient-to-br from-[#3525cd] to-[#4f46e5] text-white rounded-br-none shadow-lg shadow-indigo-100'
                            : 'bg-[#f3f4f5] text-[#191c1d] rounded-bl-none shadow-card'
                        }`}>
                          <p className="text-[15px] leading-relaxed">{msg.content}</p>
                        </div>
                        <div className={`flex items-center gap-1 ${msg.senderId === user?.id ? 'justify-end mr-1' : 'ml-1'}`}>
                          <span className="text-[10px] text-slate-400">{formatDate(msg.createdAt)}</span>
                          {msg.senderId === user?.id && <CheckCheck size={14} className="text-[#3525cd]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-6 bg-white border-t border-[#c7c4d8]/10">
                <div className="relative bg-[#f8f9fa] p-2 rounded-2xl shadow-card border border-[#c7c4d8]/20 focus-within:ring-2 focus-within:ring-[#3525cd]/20">
                  <div className="flex items-center gap-2 px-2 mb-2">
                    <button className="p-2 text-slate-400 hover:text-[#3525cd] hover:bg-indigo-50 rounded-lg"><ImageIcon size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-[#3525cd] hover:bg-indigo-50 rounded-lg"><Paperclip size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-[#3525cd] hover:bg-indigo-50 rounded-lg"><Smile size={18} /></button>
                  </div>
                  <div className="flex items-end gap-4">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-2 resize-none outline-none"
                      placeholder={msg.typeMessage}
                      rows={1}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="bg-[#3525cd] text-white p-3 rounded-xl shadow-lg shadow-indigo-200 hover:bg-[#4f46e5] disabled:opacity-50 active:scale-95"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-5xl text-indigo-400">chat_bubble</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {lang === 'fr' ? 'Aucun message' : 'No messages yet'}
                </h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  {lang === 'fr'
                    ? 'Commencez une nouvelle conversation avec un parent ou un élève.'
                    : 'Start a new conversation with a parent or student.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAB for New Message */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#3525cd] text-white rounded-2xl shadow-xl shadow-indigo-300 flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus size={24} />
      </button>
    </RoleLayout>
  );
}
