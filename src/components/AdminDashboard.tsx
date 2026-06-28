import { useState } from 'react';
import type { Submission } from '../types';
import { questions } from '../data/questions';
import EuromonitorLogo from './EuromonitorLogo';
import {
  Users,
  LogOut,
  Eye,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  FileText,
  Search,
  BarChart3,
  Trash2,
  Code2,
  Download,
} from 'lucide-react';

interface Props {
  submissions: Submission[];
  onLogout: () => void;
  onDeleteSubmission: (id: string) => void;
}

export default function AdminDashboard({ submissions, onLogout, onDeleteSubmission }: Props) {
  const [selected, setSelected] = useState<Submission | null>(null);
  const [expandedAnswer, setExpandedAnswer] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filtered = submissions.filter(s =>
    s.candidate.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.candidate.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'University', 'Position', 'Attempted', 'Compiled', 'Total', 'Submitted At'];
    const rows = submissions.map(s => [
      s.candidate.fullName,
      s.candidate.email,
      s.candidate.phone,
      s.candidate.university,
      s.candidate.position,
      s.attempted.toString(),
      s.passedCompile.toString(),
      s.totalQuestions.toString(),
      new Date(s.submittedAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `euromonitor-submissions-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Detail View ──────────────────────────────────────────
  if (selected) {
    const findQuestion = (qId: number) => questions.find(q => q.id === qId);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <button
              onClick={() => { setSelected(null); setExpandedAnswer(null); }}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-euro-orange transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to All Submissions
            </button>
            <EuromonitorLogo size="sm" />
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Candidate Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-euro-dark">{selected.candidate.fullName}</h2>
                <p className="text-sm text-gray-500 mt-1">{selected.candidate.email} · {selected.candidate.phone}</p>
                <p className="text-xs text-gray-400 mt-1">{selected.candidate.university} · {selected.candidate.position} · Grad {selected.candidate.graduationYear}</p>
              </div>
              <div className="flex gap-3">
                <div className="bg-euro-orange-50 rounded-xl p-3 text-center min-w-[70px]">
                  <div className="text-xl font-bold text-euro-orange">{selected.attempted}</div>
                  <div className="text-[10px] text-gray-500">Attempted</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center min-w-[70px]">
                  <div className="text-xl font-bold text-emerald-600">{selected.passedCompile}</div>
                  <div className="text-[10px] text-gray-500">Compiled</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center min-w-[70px]">
                  <div className="text-xl font-bold text-euro-dark">{selected.totalQuestions}</div>
                  <div className="text-[10px] text-gray-500">Total</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              Submitted: {new Date(selected.submittedAt).toLocaleString()}
              <span className="mx-2">·</span>
              Started: {new Date(selected.startedAt).toLocaleString()}
              <span className="mx-2">·</span>
              Duration: {Math.round((selected.submittedAt - selected.startedAt) / 60000)} minutes
            </div>
          </div>

          {/* Answers */}
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
            Submitted Answers ({selected.answers.length})
          </h3>
          <div className="space-y-3">
            {selected.answers.map((ans, idx) => {
              const q = findQuestion(ans.questionId);
              const isExpanded = expandedAnswer === idx;
              const statusColors: Record<string, string> = {
                pass: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                partial: 'bg-amber-50 border-amber-200 text-amber-700',
                fail: 'bg-red-50 border-red-200 text-red-600',
                not_tested: 'bg-gray-50 border-gray-200 text-gray-500',
              };
              const StatusIcon = ans.compileResult === 'pass' ? CheckCircle2 :
                ans.compileResult === 'partial' ? AlertTriangle :
                ans.compileResult === 'fail' ? XCircle : FileText;

              return (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedAnswer(isExpanded ? null : idx)}
                    className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${statusColors[ans.compileResult]}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {ans.compileResult === 'pass' ? 'Pass' :
                       ans.compileResult === 'partial' ? 'Partial' :
                       ans.compileResult === 'fail' ? 'Fail' : 'Not Tested'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-euro-dark truncate">
                        Q{idx + 1}. {ans.questionTitle}
                      </p>
                      <p className="text-xs text-gray-400">{ans.category} · {ans.difficulty}</p>
                    </div>
                    <Code2 className="w-4 h-4 text-gray-400" />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100 animate-fade-in">
                      {/* Candidate's code */}
                      <div className="p-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Candidate's Code</p>
                        <pre className="bg-[#0d1117] text-gray-300 text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed whitespace-pre">
                          {ans.code}
                        </pre>
                      </div>

                      {/* Expected output */}
                      <div className="px-4 pb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Expected Output</p>
                        <code className="text-xs font-mono text-euro-dark bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 block whitespace-pre-wrap">
                          {ans.expectedOutput}
                        </code>
                      </div>

                      {/* Solution (admin only) */}
                      {q && (
                        <div className="p-4 bg-emerald-50/50 border-t border-gray-100">
                          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            Reference Solution (Admin Only)
                          </p>
                          <pre className="bg-[#0d1117] text-emerald-300 text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed whitespace-pre">
                            {q.solution}
                          </pre>
                          <div className="mt-3 bg-white rounded-lg p-3 border border-emerald-200">
                            <p className="text-xs font-bold text-emerald-700 mb-1">Explanation</p>
                            <p className="text-xs text-gray-600 leading-relaxed">{q.explanation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── List View ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-euro-dark">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <EuromonitorLogo size="sm" white />
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-euro-dark">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Review candidate submissions and solutions</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              disabled={submissions.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-600 rounded-xl
                hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <Users className="w-5 h-5 text-euro-orange mb-2" />
            <div className="text-2xl font-bold text-euro-dark">{submissions.length}</div>
            <div className="text-xs text-gray-400">Total Submissions</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <BarChart3 className="w-5 h-5 text-emerald-500 mb-2" />
            <div className="text-2xl font-bold text-euro-dark">
              {submissions.length > 0
                ? Math.round(submissions.reduce((s, sub) => s + sub.passedCompile, 0) / submissions.length * 10) / 10
                : 0}
            </div>
            <div className="text-xs text-gray-400">Avg. Compiled Questions</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <FileText className="w-5 h-5 text-blue-500 mb-2" />
            <div className="text-2xl font-bold text-euro-dark">
              {submissions.length > 0
                ? Math.round(submissions.reduce((s, sub) => s + sub.attempted, 0) / submissions.length * 10) / 10
                : 0}
            </div>
            <div className="text-xs text-gray-400">Avg. Attempted</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <Clock className="w-5 h-5 text-purple-500 mb-2" />
            <div className="text-2xl font-bold text-euro-dark">
              {submissions.length > 0
                ? Math.round(submissions.reduce((s, sub) => s + (sub.submittedAt - sub.startedAt), 0) / submissions.length / 60000)
                : 0}m
            </div>
            <div className="text-xs text-gray-400">Avg. Duration</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm
              focus:outline-none focus:border-euro-orange focus:ring-4 focus:ring-euro-orange/10 transition-all"
          />
        </div>

        {/* Submissions Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-400">No Submissions Yet</h3>
            <p className="text-sm text-gray-300 mt-1">Submissions will appear here when candidates complete their exams.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Candidate</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Position</th>
                    <th className="text-center px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Attempted</th>
                    <th className="text-center px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Compiled</th>
                    <th className="text-center px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Duration</th>
                    <th className="text-center px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(sub => (
                    <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-euro-dark">{sub.candidate.fullName}</p>
                        <p className="text-xs text-gray-400">{sub.candidate.email}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{sub.candidate.position}</td>
                      <td className="px-5 py-4 text-center">
                        <span className="font-bold text-euro-dark">{sub.attempted}</span>
                        <span className="text-gray-400">/{sub.totalQuestions}</span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold
                          ${sub.passedCompile >= sub.totalQuestions * 0.6
                            ? 'bg-emerald-50 text-emerald-600'
                            : sub.passedCompile >= sub.totalQuestions * 0.3
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-red-50 text-red-500'
                          }`}>
                          {sub.passedCompile}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center text-gray-500 hidden sm:table-cell">
                        {Math.round((sub.submittedAt - sub.startedAt) / 60000)}m
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelected(sub)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-euro-orange text-white rounded-lg text-xs font-bold
                              hover:bg-euro-orange-dark transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            Review
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(sub.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in-scale p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-euro-dark mb-2">Delete Submission?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2.5 text-sm font-medium text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteSubmission(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
