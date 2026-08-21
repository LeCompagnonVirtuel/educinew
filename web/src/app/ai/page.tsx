'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, Brain, FileQuestion, Loader2, Trash2, GraduationCap, Calculator, Atom, Globe } from 'lucide-react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { sbAi } from '@/lib/api';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const QUICK_PROMPTS_FR = [
  { icon: BookOpen, label: 'Expliquer un cours', prompt: 'Peux-tu m\'expliquer le théorème de Pythagore de manière simple ?' },
  { icon: FileQuestion, label: 'Aide aux devoirs', prompt: 'J\'ai besoin d\'aide pour résoudre cette équation: 2x + 5 = 15' },
  { icon: Brain, label: 'Générer un quiz', prompt: 'Génère un quiz de 5 questions en Mathématiques niveau 3ème' },
  { icon: Calculator, label: 'Calculer', prompt: 'Comment calculer la dérivée de f(x) = 3x² + 2x - 5 ?' },
  { icon: Atom, label: 'Sciences', prompt: 'Explique-moi la photosynthèse avec un schéma simple' },
  { icon: Globe, label: 'Géographie', prompt: 'Quels sont les principaux fleuves d\'Afrique de l\'Ouest ?' },
];

const QUICK_PROMPTS_EN = [
  { icon: BookOpen, label: 'Explain a lesson', prompt: 'Can you explain the Pythagorean theorem simply?' },
  { icon: FileQuestion, label: 'Homework help', prompt: 'I need help solving this equation: 2x + 5 = 15' },
  { icon: Brain, label: 'Generate quiz', prompt: 'Generate a 5-question Math quiz for grade 9' },
  { icon: Calculator, label: 'Calculate', prompt: 'How do I calculate the derivative of f(x) = 3x² + 2x - 5 ?' },
  { icon: Atom, label: 'Science', prompt: 'Explain photosynthesis with a simple diagram' },
  { icon: Globe, label: 'Geography', prompt: 'What are the main rivers in West Africa?' },
];

function AIContent() {
  const { user, isAuthenticated } = useAuth();
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = lang === 'fr' ? QUICK_PROMPTS_FR : QUICK_PROMPTS_EN;

  // Load conversation from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('educi-ai-chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch {}
    }
    // Default welcome message
    const welcome = lang === 'fr'
      ? `Bonjour${user?.name ? ' ' + user.name.split(' ')[0] : ''} ! Je suis EduCI AI, votre assistant éducatif intelligent. Je peux vous aider à comprendre vos cours, résoudre des exercices, ou générer des quiz de révision. Que souhaitez-vous faire aujourd'hui ?`
      : `Hello${user?.name ? ' ' + user.name.split(' ')[0] : ''}! I am EduCI AI, your intelligent educational assistant. I can help you understand lessons, solve exercises, or generate revision quizzes. What would you like to do today?`;
    setMessages([{ role: 'assistant', content: welcome, timestamp: Date.now() }]);
  }, [lang, user]);

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('educi-ai-chat', JSON.stringify(messages.slice(-50)));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const buildContext = (): string => {
    const parts: string[] = [];
    if (user?.name) parts.push(`Nom: ${user.name}`);
    if (user?.role) parts.push(`Rôle: ${user.role}`);
    if (selectedSubject) parts.push(`Matière actuelle: ${selectedSubject}`);
    parts.push(`Langue: ${lang === 'fr' ? 'Français' : 'English'}`);

    // Add last 6 messages as conversation history
    const recent = messages.slice(-6).map(m => `${m.role === 'user' ? 'Élève' : 'EduCI'}: ${m.content}`).join('\n');
    if (recent) parts.push(`Historique récent:\n${recent}`);

    return parts.join(' | ');
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    const userMsg: ChatMessage = { role: 'user', content: userMessage, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const context = buildContext();
      const data = await sbAi.chat(userMessage, context);
      const aiMsg: ChatMessage = { role: 'assistant', content: data.response, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        role: 'assistant',
        content: lang === 'fr'
          ? `Désolé, une erreur s'est produite: ${err.message || 'Veuillez réessayer.'}`
          : `Sorry, an error occurred: ${err.message || 'Please try again.'}`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem('educi-ai-chat');
    const welcome = lang === 'fr'
      ? 'Conversation réinitialisée. Comment puis-je vous aider ?'
      : 'Conversation reset. How can I help you?';
    setMessages([{ role: 'assistant', content: welcome, timestamp: Date.now() }]);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject === selectedSubject ? null : subject);
  };

  const handleExamSelect = (exam: string) => {
    const prompt = lang === 'fr'
      ? `Peux-tu me donner 5 questions de révision pour l'examen ${exam} en ${selectedSubject || 'Mathématiques'} ?`
      : `Can you give me 5 revision questions for the ${exam} exam in ${selectedSubject || 'Mathematics'}?`;
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="text-[#4F46E5]" size={28} />
            EduCI AI
          </h1>
          <p className="text-slate-500 mt-1">
            {lang === 'fr'
              ? 'Votre assistant éducatif intelligent'
              : 'Your intelligent educational assistant'}
          </p>
        </div>
        <button
          onClick={handleClearChat}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title={lang === 'fr' ? 'Nouvelle conversation' : 'New conversation'}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-3">
              {lang === 'fr' ? 'Actions rapides' : 'Quick Actions'}
            </h3>
            <div className="space-y-1">
              {quickPrompts.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickPrompt(item.prompt)}
                  className="w-full flex items-center gap-3 p-2.5 text-left text-sm text-slate-600 hover:bg-[#e2dfff] hover:text-[#4F46E5] rounded-xl transition-colors"
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-3">
              {lang === 'fr' ? 'Matières' : 'Subjects'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Maths', 'Français', 'Anglais', 'Sciences', 'Histoire', 'SVT'].map((subject) => (
                <button
                  key={subject}
                  onClick={() => handleSubjectSelect(subject)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    selectedSubject === subject
                      ? 'bg-[#4F46E5] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-[#e2dfff] hover:text-[#4F46E5]'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Exams */}
          <div className="bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] rounded-2xl p-4 text-white">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <GraduationCap size={18} />
              {lang === 'fr' ? 'Examens' : 'Exams'}
            </h3>
            <p className="text-indigo-200 text-xs mb-3">
              {lang === 'fr'
                ? 'Révisez avec les annales CEPE, BEPC et BAC'
                : 'Revise with CEPE, BEPC and BAC past papers'}
            </p>
            <div className="space-y-2">
              {['CEPE', 'BEPC', 'BAC'].map((exam) => (
                <button
                  key={exam}
                  onClick={() => handleExamSelect(exam)}
                  className="w-full text-left px-3 py-2 text-sm bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
            <h3 className="font-semibold text-amber-800 text-sm mb-2">
              💡 {lang === 'fr' ? 'Conseil' : 'Tip'}
            </h3>
            <p className="text-amber-700 text-xs">
              {lang === 'fr'
                ? 'Sélectionnez une matière pour que l\'assistant adapte ses réponses à votre programme.'
                : 'Select a subject so the assistant adapts its answers to your curriculum.'}
            </p>
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-[#4F46E5]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-[#4F46E5] text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-[#4F46E5]" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center">
                  <Bot size={16} className="text-[#4F46E5]" />
                </div>
                <div className="bg-slate-100 rounded-2xl px-4 py-3">
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
          <div className="border-t border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={lang === 'fr' ? 'Posez votre question à EduCI AI...' : 'Ask your question to EduCI AI...'}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent outline-none text-sm"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="p-3 bg-[#4F46E5] text-white rounded-xl hover:bg-[#4338CA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              {lang === 'fr'
                ? 'EduCI AI peut faire des erreurs. Vérifiez les informations importantes.'
                : 'EduCI AI may make mistakes. Verify important information.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIPage() {
  return (
    <RoleLayout role="admin">
      <AIContent />
    </RoleLayout>
  );
}
