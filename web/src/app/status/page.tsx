'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  GraduationCap, CheckCircle, AlertTriangle, XCircle, Clock,
  LayoutDashboard, Globe, Smartphone, FolderOpen, Bot, CreditCard, Sparkles, TrendingUp,
} from 'lucide-react';


const serviceIcons = [LayoutDashboard, Globe, Smartphone, FolderOpen, Bot, CreditCard];

const services = [
  { status: 'operational', uptime: '99.98%' },
  { status: 'operational', uptime: '99.95%' },
  { status: 'operational', uptime: '99.92%' },
  { status: 'operational', uptime: '99.99%' },
  { status: 'operational', uptime: '99.96%' },
  { status: 'operational', uptime: '99.97%' },
];

const incidents = [
  { status: 'operational', date: '2025-03-20', duration: '2h 15m' },
  { status: 'operational', date: '2025-03-15', duration: '45m' },
  { status: 'operational', date: '2025-03-08', duration: '15m' },
  { status: 'operational', date: '2025-02-28', duration: '3h 30m' },
  { status: 'operational', date: '2025-02-10', duration: '5m' },
];

export default function StatusPage() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      badge: 'Statut système',
      title: 'Statut des services',
      desc: 'Surveillance en temps réel de nos systèmes',
      overallStatus: 'Tous les systèmes opérationnels',
      overallDesc: 'Dernière vérification il y a 2 minutes',
      servicesTitle: 'Services',
      servicesList: [
        { name: 'API', desc: 'Services API principaux' },
        { name: 'Application Web', desc: 'Interface web educi.ai' },
        { name: 'Application Mobile', desc: 'Apps iOS & Android' },
        { name: 'Base de données', desc: 'Stockage et requêtes' },
        { name: 'Service IA', desc: 'Assistant IA éducatif' },
        { name: 'Paiements', desc: 'Traitement des paiements' },
      ],
      operational: 'Opérationnel',
      degraded: 'Dégradé',
      down: 'Hors service',
      incidentsTitle: 'Historique des incidents',
      incident: 'Incident',
      date: 'Date',
      duration: 'Durée',
      status: 'Statut',
      resolved: 'Résolu',
      incidentsList: [
        { title: 'Latence API élevée', desc: 'Temps de réponse API augmenté temporairement' },
        { title: 'Maintenance planifiée', desc: 'Mise à jour de la base de données' },
        { title: 'Notification push en retard', desc: 'Retard dans l\'envoi des notifications' },
        { title: 'Service IA intermittent', desc: 'L\'assistant IA a connu des interruptions' },
        { title: 'Maintenance serveur', desc: 'Mise à jour de sécurité' },
      ],
    },
    en: {
      badge: 'System Status',
      title: 'Service Status',
      desc: 'Real-time monitoring of our systems',
      overallStatus: 'All Systems Operational',
      overallDesc: 'Last checked 2 minutes ago',
      servicesTitle: 'Services',
      servicesList: [
        { name: 'API', desc: 'Core API services' },
        { name: 'Web App', desc: 'Web interface educi.ai' },
        { name: 'Mobile App', desc: 'iOS & Android apps' },
        { name: 'Database', desc: 'Storage & queries' },
        { name: 'AI Service', desc: 'Educational AI assistant' },
        { name: 'Payments', desc: 'Payment processing' },
      ],
      operational: 'Operational',
      degraded: 'Degraded',
      down: 'Down',
      incidentsTitle: 'Incident History',
      incident: 'Incident',
      date: 'Date',
      duration: 'Duration',
      status: 'Status',
      resolved: 'Resolved',
      incidentsList: [
        { title: 'High API latency', desc: 'API response times temporarily increased' },
        { title: 'Scheduled maintenance', desc: 'Database update' },
        { title: 'Push notification delay', desc: 'Notification delivery delayed' },
        { title: 'Intermittent AI service', desc: 'AI assistant experienced interruptions' },
        { title: 'Server maintenance', desc: 'Security update' },
      ],
    },
  };

  const t = content[lang];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            {t.operational}
          </span>
        );
      case 'degraded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-full">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            {t.degraded}
          </span>
        );
      case 'down':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-bold rounded-full">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            {t.down}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold text-[#111827]">EduCI</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/about" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'À propos' : 'About'}</a>
            <a href="/help" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Aide' : 'Help'}</a>
            <a href="/status" className="text-sm font-semibold text-[#4F46E5]">{lang === 'fr' ? 'Statut' : 'Status'}</a>

            <a href="/login" className="px-5 py-2.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              {lang === 'fr' ? 'Connexion' : 'Login'}
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#4F46E5] via-indigo-700 to-[#60A5FA] py-16 relative overflow-hidden">
        <div className="absolute top-16 right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <TrendingUp size={14} />
            {t.badge}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">{t.title}</h1>
          <p className="text-lg text-white/80">{t.desc}</p>
        </div>
      </section>

      {/* Overall Status */}
      <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-premium p-6 border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={24} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#111827]">{t.overallStatus}</p>
            <p className="text-sm text-[#6B7280] flex items-center gap-1">
              <Clock size={14} />
              {t.overallDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-xl font-extrabold text-[#111827] mb-6">{t.servicesTitle}</h2>
        <div className="space-y-3">
          {t.servicesList.map((service, i) => {
            const Icon = serviceIcons[i];
            const svc = services[i];
            return (
              <div key={i} className="bg-white rounded-xl shadow-premium p-5 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    svc.status === 'operational' ? 'bg-emerald-50 text-emerald-500' :
                    svc.status === 'degraded' ? 'bg-amber-50 text-amber-500' :
                    'bg-red-50 text-red-500'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">{service.name}</p>
                    <p className="text-xs text-[#6B7280]">{service.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-[#111827]">{svc.uptime}</span>
                  {getStatusBadge(svc.status)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Incident History */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-extrabold text-[#111827] mb-6">{t.incidentsTitle}</h2>
        <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-[#f8f9fa]">
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">{t.incident}</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">{t.date}</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">{t.duration}</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">{t.status}</th>
                </tr>
              </thead>
              <tbody>
                {t.incidentsList.map((inc, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-b-0">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-[#111827]">{inc.title}</p>
                      <p className="text-xs text-[#6B7280]">{inc.desc}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{incidents[i].date}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{incidents[i].duration}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                        <CheckCircle size={12} />
                        {t.resolved}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap size={24} />
            <span className="font-bold">EduCI</span>
          </div>
          <p className="text-sm text-slate-400">© 2025 EduCI. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <div className="flex gap-6">
            <a href="/help" className="text-sm text-slate-400 hover:text-white">{lang === 'fr' ? 'Aide' : 'Help'}</a>
            <a href="/status" className="text-sm text-slate-400 hover:text-white">{lang === 'fr' ? 'Statut' : 'Status'}</a>
            <a href="/contact" className="text-sm text-slate-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
