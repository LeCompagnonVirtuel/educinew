'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, AlertTriangle, XCircle, Loader2, Shield, Eye, Palette, Image,
  Mail, Phone, Lock, Globe, Hash, ChevronDown, ChevronUp,
} from 'lucide-react';
import { getSupabase } from '@/lib/api/shared';

interface ValidationRule {
  id: string;
  field: string;
  type: 'format' | 'duplicate' | 'quality' | 'consistency' | 'security';
  status: 'pending' | 'checking' | 'valid' | 'invalid' | 'warning';
  message: string;
  suggestion?: string;
}

interface SmartValidationProps {
  data: Record<string, any>;
  onValidationChange: (rules: ValidationRule[]) => void;
}

const FIELD_ICONS: Record<string, React.ElementType> = {
  email: Mail,
  phone: Phone,
  schoolName: Hash,
  password: Lock,
  domain: Globe,
  image: Image,
  color: Palette,
  acronym: Hash,
};

function wcagContrastRatio(hex1: string, hex2: string): number {
  const luminance = (hex: string) => {
    const rgb = hex.replace('#', '').match(/.{2}/g)!.map(c => {
      const v = parseInt(c, 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function validateEmail(email: string): { valid: boolean; message: string } {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!email) return { valid: false, message: 'Email requis' };
  if (!re.test(email)) return { valid: false, message: 'Format d\'email invalide' };
  const tlds = ['.com', '.org', '.net', '.edu', '.fr', '.ci', '.cm', '.sn', '.ao', '.cd'];
  const hasTLD = tlds.some(t => email.toLowerCase().endsWith(t));
  if (!hasTLD && !email.includes('@')) return { valid: false, message: 'Domaine manquant' };
  return { valid: true, message: 'Email valide' };
}

function validatePhone(phone: string): { valid: boolean; message: string } {
  const cleaned = phone.replace(/[\s\-().]/g, '');
  if (!phone) return { valid: false, message: 'Téléphone requis' };
  if (!/^\+?\d{7,15}$/.test(cleaned)) {
    return { valid: false, message: 'Format international attendu (+225...)' };
  }
  if (!cleaned.startsWith('+') && cleaned.length < 10) {
    return { valid: false, message: 'Trop court pour un numéro international' };
  }
  return { valid: true, message: 'Numéro valide' };
}

function validatePassword(password: string): { valid: boolean; message: string; strength: number } {
  if (!password) return { valid: false, message: 'Mot de passe requis', strength: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { valid: false, message: 'Faible — ajoutez majuscules et chiffres', strength: score };
  if (score <= 3) return { valid: true, message: 'Moyen — renforcez avec des symboles', strength: score };
  return { valid: true, message: 'Fort', strength: score };
}

function validateDomain(code: string): { valid: boolean; message: string } {
  if (!code) return { valid: false, message: 'Code école requis' };
  const cleaned = code.toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (cleaned.length < 3) return { valid: false, message: 'Minimum 3 caractères' };
  if (cleaned.length > 20) return { valid: false, message: 'Maximum 20 caractères' };
  const reserved = ['admin', 'api', 'www', 'mail', 'ftp', 'educi', 'support', 'help'];
  if (reserved.includes(cleaned)) return { valid: false, message: 'Ce nom est réservé' };
  return { valid: true, message: `educi.live/${cleaned} disponible` };
}

function validateAcronym(acronym: string): { valid: boolean; message: string } {
  if (!acronym) return { valid: false, message: 'Acronyme requis' };
  if (acronym.length < 2) return { valid: false, message: 'Minimum 2 caractères' };
  if (acronym.length > 6) return { valid: false, message: 'Maximum 6 caractères' };
  if (!/^[A-Z]{2,6}$/.test(acronym)) return { valid: false, message: 'Uniquement des lettres majuscules' };
  return { valid: true, message: 'Acronyme valide' };
}

function validateColorContrast(primary: string, secondary: string): { valid: boolean; message: string; ratio: number } {
  const ratio = wcagContrastRatio(primary, secondary);
  const valid = ratio >= 4.5;
  return {
    valid,
    message: valid
      ? `Contraste ${ratio.toFixed(1)}:1 — conforme WCAG AA`
      : `Contraste ${ratio.toFixed(1)}:1 — minimum requis 4.5:1`,
    ratio,
  };
}

const StatusIcon = ({ status }: { status: ValidationRule['status'] }) => {
  switch (status) {
    case 'checking':
      return <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />;
    case 'valid':
      return <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />;
    case 'invalid':
      return <XCircle className="w-3.5 h-3.5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
    default:
      return <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />;
  }
};

const groupByField = (rules: ValidationRule[]) => {
  const grouped: Record<string, ValidationRule[]> = {};
  for (const rule of rules) {
    if (!grouped[rule.field]) grouped[rule.field] = [];
    grouped[rule.field].push(rule);
  }
  return grouped;
};

export default function SmartValidation({ data, onValidationChange }: SmartValidationProps) {
  const [rules, setRules] = useState<ValidationRule[]>([]);
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const updateRule = useCallback((id: string, update: Partial<ValidationRule>) => {
    setRules(prev => {
      const next = prev.map(r => r.id === id ? { ...r, ...update } : r);
      onValidationChange(next);
      return next;
    });
  }, [onValidationChange]);

  const checkDuplicate = useCallback(async (field: string, value: string): Promise<boolean> => {
    try {
      const supabase = getSupabase();
      if (field === 'email') {
        const { data } = await supabase.from('users').select('id').eq('email', value.toLowerCase()).limit(1);
        return (data && data.length > 0);
      }
      if (field === 'phone') {
        const { data } = await supabase.from('users').select('id').eq('phone', value.replace(/\s/g, '')).limit(1);
        return (data && data.length > 0);
      }
      if (field === 'schoolName') {
        const { data } = await supabase.from('schools').select('id').ilike('name', value).limit(1);
        return (data && data.length > 0);
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const newRules: ValidationRule[] = [];

    if (data.email) {
      newRules.push({ id: 'email-format', field: 'email', type: 'format', status: 'pending', message: '' });
      newRules.push({ id: 'email-dup', field: 'email', type: 'duplicate', status: 'pending', message: '' });
    }
    if (data.phone) {
      newRules.push({ id: 'phone-format', field: 'phone', type: 'format', status: 'pending', message: '' });
      newRules.push({ id: 'phone-dup', field: 'phone', type: 'duplicate', status: 'pending', message: '' });
    }
    if (data.schoolName) {
      newRules.push({ id: 'school-dup', field: 'schoolName', type: 'duplicate', status: 'pending', message: '' });
    }
    if (data.password) {
      newRules.push({ id: 'password-strength', field: 'password', type: 'security', status: 'pending', message: '' });
    }
    if (data.domain) {
      newRules.push({ id: 'domain-avail', field: 'domain', type: 'format', status: 'pending', message: '' });
    }
    if (data.acronym) {
      newRules.push({ id: 'acronym-valid', field: 'acronym', type: 'format', status: 'pending', message: '' });
    }
    if (data.primaryColor && data.secondaryColor) {
      newRules.push({ id: 'color-contrast', field: 'color', type: 'quality', status: 'pending', message: '' });
    }

    setRules(newRules);
    onValidationChange(newRules);

    const currentTimers = timersRef.current;
    currentTimers.forEach(t => clearTimeout(t));
    currentTimers.clear();

    const schedule = (id: string, delay: number, fn: () => void) => {
      const t = setTimeout(fn, delay);
      timersRef.current.set(id, t);
    };

    if (data.email) {
      updateRule('email-format', { status: 'checking', message: 'Vérification du format...' });
      schedule('email-format', 300, () => {
        const result = validateEmail(data.email);
        updateRule('email-format', {
          status: result.valid ? 'valid' : 'invalid',
          message: result.message,
        });
      });

      updateRule('email-dup', { status: 'checking', message: 'Recherche de doublons...' });
      schedule('email-dup', 800, async () => {
        const isDup = await checkDuplicate('email', data.email);
        updateRule('email-dup', {
          status: isDup ? 'warning' : 'valid',
          message: isDup ? 'Cet email est déjà utilisé' : 'Email unique',
          suggestion: isDup ? 'Essayez une adresse différente' : undefined,
        });
      });
    }

    if (data.phone) {
      updateRule('phone-format', { status: 'checking', message: 'Validation internationale...' });
      schedule('phone-format', 400, () => {
        const result = validatePhone(data.phone);
        updateRule('phone-format', {
          status: result.valid ? 'valid' : 'invalid',
          message: result.message,
        });
      });

      updateRule('phone-dup', { status: 'checking', message: 'Recherche de doublons...' });
      schedule('phone-dup', 900, async () => {
        const isDup = await checkDuplicate('phone', data.phone);
        updateRule('phone-dup', {
          status: isDup ? 'warning' : 'valid',
          message: isDup ? 'Ce numéro est déjà utilisé' : 'Numéro unique',
        });
      });
    }

    if (data.schoolName) {
      updateRule('school-dup', { status: 'checking', message: 'Vérification de l\'établissement...' });
      schedule('school-dup', 700, async () => {
        const isDup = await checkDuplicate('schoolName', data.schoolName);
        updateRule('school-dup', {
          status: isDup ? 'warning' : 'valid',
          message: isDup ? 'Un établissement similaire existe déjà' : 'Nom disponible',
        });
      });
    }

    if (data.password) {
      updateRule('password-strength', { status: 'checking', message: 'Analyse de la force...' });
      schedule('password-strength', 200, () => {
        const result = validatePassword(data.password);
        updateRule('password-strength', {
          status: result.valid ? 'valid' : result.strength > 0 ? 'warning' : 'invalid',
          message: result.message,
        });
      });
    }

    if (data.domain) {
      updateRule('domain-avail', { status: 'checking', message: 'Vérification de disponibilité...' });
      schedule('domain-avail', 600, () => {
        const result = validateDomain(data.domain);
        updateRule('domain-avail', {
          status: result.valid ? 'valid' : 'invalid',
          message: result.message,
        });
      });
    }

    if (data.acronym) {
      updateRule('acronym-valid', { status: 'checking', message: 'Validation...' });
      schedule('acronym-valid', 300, () => {
        const result = validateAcronym(data.acronym);
        updateRule('acronym-valid', {
          status: result.valid ? 'valid' : 'invalid',
          message: result.message,
        });
      });
    }

    if (data.primaryColor && data.secondaryColor) {
      updateRule('color-contrast', { status: 'checking', message: 'Analyse du contraste...' });
      schedule('color-contrast', 500, () => {
        const result = validateColorContrast(data.primaryColor, data.secondaryColor);
        updateRule('color-contrast', {
          status: result.valid ? 'valid' : 'warning',
          message: result.message,
        });
      });
    }

    return () => {
      currentTimers.forEach(t => clearTimeout(t));
      currentTimers.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.email, data.phone, data.schoolName, data.password, data.domain, data.acronym, data.primaryColor, data.secondaryColor]);

  const grouped = groupByField(rules);
  const fieldLabels: Record<string, string> = {
    email: 'Adresse email',
    phone: 'Téléphone',
    schoolName: 'Nom de l\'établissement',
    password: 'Mot de passe',
    domain: 'Domaine publique',
    acronym: 'Acronyme',
    color: 'Contraste des couleurs',
  };

  const getFieldStatus = (fieldRules: ValidationRule[]): ValidationRule['status'] => {
    if (fieldRules.some(r => r.status === 'checking')) return 'checking';
    if (fieldRules.some(r => r.status === 'invalid')) return 'invalid';
    if (fieldRules.some(r => r.status === 'warning')) return 'warning';
    if (fieldRules.every(r => r.status === 'valid')) return 'valid';
    return 'pending';
  };

  const toggleField = (field: string) => {
    setExpandedFields(prev => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      return next;
    });
  };

  const totalChecks = rules.length;
  const validChecks = rules.filter(r => r.status === 'valid').length;
  const invalidChecks = rules.filter(r => r.status === 'invalid').length;
  const warningChecks = rules.filter(r => r.status === 'warning').length;

  if (rules.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Validation intelligente</h3>
            <p className="text-[11px] text-gray-500">Vérification en temps réel</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {invalidChecks > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              <XCircle className="w-3 h-3" />
              {invalidChecks}
            </span>
          )}
          {warningChecks > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <AlertTriangle className="w-3 h-3" />
              {warningChecks}
            </span>
          )}
          <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3" />
            {validChecks}/{totalChecks}
          </span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: invalidChecks > 0 ? '#EF4444' : warningChecks > 0 ? '#F59E0B' : '#10B981',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${totalChecks > 0 ? (validChecks / totalChecks) * 100 : 0}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="space-y-1.5">
        {Object.entries(grouped).map(([field, fieldRules]) => {
          const FieldIcon = FIELD_ICONS[field] || Hash;
          const fieldStatus = getFieldStatus(fieldRules);
          const isExpanded = expandedFields.has(field);

          return (
            <div key={field} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleField(field)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: fieldStatus === 'valid' ? '#ECFDF5'
                      : fieldStatus === 'invalid' ? '#FEF2F2'
                      : fieldStatus === 'warning' ? '#FFFBEB'
                      : fieldStatus === 'checking' ? '#EEF2FF'
                      : '#F9FAFB',
                  }}>
                  <FieldIcon className="w-3.5 h-3.5" style={{
                    color: fieldStatus === 'valid' ? '#10B981'
                      : fieldStatus === 'invalid' ? '#EF4444'
                      : fieldStatus === 'warning' ? '#F59E0B'
                      : fieldStatus === 'checking' ? '#6366F1'
                      : '#9CA3AF',
                  }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[11px] font-medium text-gray-700">
                    {fieldLabels[field] || field}
                  </div>
                </div>
                <StatusIcon status={fieldStatus} />
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-2.5 pt-0.5 space-y-1.5">
                      {fieldRules.map((rule) => (
                        <motion.div
                          key={rule.id}
                          layout
                          className="flex items-start gap-2 px-2.5 py-2 rounded-lg"
                          style={{
                            backgroundColor: rule.status === 'valid' ? '#F0FDF4'
                              : rule.status === 'invalid' ? '#FEF2F2'
                              : rule.status === 'warning' ? '#FEFCE8'
                              : rule.status === 'checking' ? '#EEF2FF'
                              : '#F9FAFB',
                          }}
                        >
                          <StatusIcon status={rule.status} />
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-medium text-gray-700">{rule.message}</div>
                            {rule.suggestion && (
                              <div className="text-[9px] text-gray-400 mt-0.5">{rule.suggestion}</div>
                            )}
                          </div>
                          <span className="text-[9px] text-gray-300 shrink-0 capitalize">{rule.type}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
