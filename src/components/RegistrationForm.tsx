import { useState } from 'react';
import type { CandidateInfo } from '../types';
import EuromonitorLogo from './EuromonitorLogo';
import { EXAM_DURATION_MINUTES, QUESTIONS_PER_EXAM } from '../config';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  onSubmit: (info: CandidateInfo) => void;
  onBack: () => void;
}

export default function RegistrationForm({ onSubmit, onBack }: Props) {
  const [form, setForm] = useState<CandidateInfo>({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    graduationYear: '',
    position: 'Junior Java Developer',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CandidateInfo, string>>>({});
  const [agreed, setAgreed] = useState(false);

  const set = (key: keyof CandidateInfo, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.university.trim()) e.university = 'University / college is required';
    if (!form.graduationYear.trim()) e.graduationYear = 'Graduation year is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const fields: { key: keyof CandidateInfo; label: string; icon: typeof User; type?: string; placeholder: string }[] = [
    { key: 'fullName',       label: 'Full Name',              icon: User,          placeholder: 'John Doe' },
    { key: 'email',          label: 'Email Address',          icon: Mail,          type: 'email', placeholder: 'john@example.com' },
    { key: 'phone',          label: 'Phone Number',           icon: Phone,         type: 'tel',   placeholder: '+1 234 567 890' },
    { key: 'university',     label: 'University / College',   icon: GraduationCap, placeholder: 'MIT' },
    { key: 'graduationYear', label: 'Graduation Year',        icon: Calendar,      placeholder: '2025' },
    { key: 'position',       label: 'Position Applied For',   icon: Briefcase,     placeholder: 'Junior Java Developer' },
  ];

  return (
    <div className="min-h-screen bg-euro-light flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl animate-fade-in">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-euro-dark to-[#16213E] p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <EuromonitorLogo size="sm" white />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" />
                Registration
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mt-2">Candidate Registration</h2>
            <p className="text-sm text-gray-400 mt-1">
              Please fill in your details before starting the assessment.
            </p>
          </div>

          {/* Exam Info Banner */}
          <div className="mx-6 md:mx-8 -mt-4 bg-euro-orange-50 border border-euro-orange/20 rounded-xl p-4 flex flex-wrap gap-6 relative z-10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-euro-orange" />
              <span className="text-sm font-semibold text-euro-dark">{EXAM_DURATION_MINUTES} Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-euro-orange" />
              <span className="text-sm font-semibold text-euro-dark">{QUESTIONS_PER_EXAM} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-euro-orange" />
              <span className="text-sm font-semibold text-euro-dark">Cannot be paused</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map(f => (
                <div key={f.key} className={f.key === 'fullName' || f.key === 'email' ? 'md:col-span-2' : ''}>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    <f.icon className="w-3.5 h-3.5" />
                    {f.label}
                  </label>
                  <input
                    type={f.type || 'text'}
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-euro-dark
                      focus:outline-none focus:ring-4 transition-all placeholder:text-gray-300
                      ${errors[f.key]
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                        : 'border-gray-200 focus:border-euro-orange focus:ring-euro-orange/10'
                      }`}
                  />
                  {errors[f.key] && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors[f.key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Agreement */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                    ${agreed
                      ? 'bg-euro-orange border-euro-orange'
                      : 'border-gray-300 group-hover:border-euro-orange/50'
                    }`}
                  >
                    {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-euro-dark">I acknowledge the exam rules</span>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    I understand that once the exam starts it cannot be paused.
                    The timer will run continuously for {EXAM_DURATION_MINUTES} minutes.
                    My code submissions will be recorded and reviewed by the evaluation team.
                    I confirm all information provided is accurate.
                  </p>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-500 hover:text-euro-dark transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                type="submit"
                disabled={!agreed}
                className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-euro-orange to-euro-orange-dark text-white rounded-xl
                  font-bold text-sm shadow-lg shadow-euro-orange/20 hover:shadow-xl transition-all
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Start Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
