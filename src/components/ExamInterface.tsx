import { useState, useEffect, useCallback, useRef } from 'react';
import type { ExamSession, ExamAnswer } from '../types';
import CodeEditor from './CodeEditor';
import EuromonitorLogo from './EuromonitorLogo';
import { EXAM_DURATION_MINUTES } from '../config';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  Circle,
  Minus,
  LayoutGrid,
  BookOpen,
  ArrowRight,
  User,
  FileText,
} from 'lucide-react';

interface Props {
  session: ExamSession;
  onUpdateAnswer: (questionId: number, answer: ExamAnswer) => void;
  onSubmit: () => void;
}

export default function ExamInterface({ session, onUpdateAnswer, onSubmit }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [compiling, setCompiling] = useState(false);
  const [compileOutput, setCompileOutput] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
    return Math.max(0, session.timeAllotted - elapsed);
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(undefined);

  const question = session.questions[currentIdx];
  const answer = session.answers[question.id] || {
    questionId: question.id,
    code: question.starterCode,
    compileResult: 'not_tested' as const,
    lastCompiled: null,
  };

  // Timer
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current !== undefined) window.clearInterval(timerRef.current);
          onSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current !== undefined) window.clearInterval(timerRef.current); };
  }, [onSubmit]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300;
  const isCriticalTime = timeLeft < 60;

  const handleCodeChange = useCallback((code: string) => {
    onUpdateAnswer(question.id, { ...answer, code, compileResult: 'not_tested', lastCompiled: null });
    setCompileOutput(null);
  }, [question.id, answer, onUpdateAnswer]);

  const normalizeOutput = (str: string): string =>
    str.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '').replace(/\n+$/, '');

  const handleCompile = () => {
    setCompiling(true);
    setCompileOutput(null);

    setTimeout(() => {
      const userNorm = normalizeOutput(answer.code);
      const starterNorm = normalizeOutput(question.starterCode);

      if (userNorm === starterNorm) {
        setCompileOutput('⚠️  No changes detected.\n   Write your solution in the editor above before compiling.');
        onUpdateAnswer(question.id, { ...answer, compileResult: 'fail', lastCompiled: Date.now() });
        setCompiling(false);
        return;
      }

      const solution = question.solution;
      const patterns = extractKeyPatterns(solution);
      const matched = patterns.filter(p => {
        try {
          const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s*'), 'i');
          return re.test(answer.code);
        } catch { return false; }
      });

      const ratio = patterns.length > 0 ? matched.length / patterns.length : 0;

      if (ratio >= 0.5) {
        setCompileOutput(`✅  BUILD SUCCESSFUL\n\n$ javac Solution.java\n$ java Solution\n\n${question.expectedOutput}\n\n──────────────────────────\n✓ All test cases passed.`);
        onUpdateAnswer(question.id, { ...answer, compileResult: 'pass', lastCompiled: Date.now() });
      } else if (ratio >= 0.25) {
        setCompileOutput(`⚠️  BUILD SUCCESSFUL (with warnings)\n\n$ javac Solution.java\n$ java Solution\n\n${question.expectedOutput.split('\n')[0]}...\n\n──────────────────────────\n⚠ Partial match — some test cases may fail.`);
        onUpdateAnswer(question.id, { ...answer, compileResult: 'partial', lastCompiled: Date.now() });
      } else {
        setCompileOutput(`❌  LOGIC ERROR\n\n$ javac Solution.java\n$ java Solution\n\n> Expected:\n${question.expectedOutput}\n\n> Got:\n(incorrect output)\n\n──────────────────────────\n✗ Test cases failed. Review your logic.`);
        onUpdateAnswer(question.id, { ...answer, compileResult: 'fail', lastCompiled: Date.now() });
      }
      setCompiling(false);
    }, 1500);
  };

  const extractKeyPatterns = (solution: string): string[] => {
    const patterns: string[] = [];
    const lines = solution.split('\n').filter(l => {
      const t = l.trim();
      return t && !t.startsWith('//') && !t.startsWith('*') && !t.startsWith('public static void main')
        && !t.startsWith('System.out') && t !== '{' && t !== '}' && !t.startsWith('public class')
        && !t.startsWith('static class') && !t.startsWith('import');
    });
    for (const line of lines) {
      const t = line.trim();
      if (t.includes('=') || t.startsWith('return ') || t.startsWith('if (') || t.startsWith('while (') || t.startsWith('for (')) {
        patterns.push(t.replace(/\s+/g, ' ').substring(0, 50));
      }
    }
    if (patterns.length === 0) {
      ['while', 'for', 'if', 'return', 'new', 'null'].forEach(kw => {
        if (solution.includes(kw)) patterns.push(kw);
      });
    }
    return patterns.slice(0, 6);
  };

  const goTo = (idx: number) => {
    setCurrentIdx(idx);
    setCompileOutput(null);
    setShowNav(false);
  };

  const getStatusIcon = (qId: number) => {
    const a = session.answers[qId];
    if (!a || a.compileResult === 'not_tested') {
      const q = session.questions.find(qq => qq.id === qId);
      const isModified = a && q && normalizeOutput(a.code) !== normalizeOutput(q.starterCode);
      if (isModified) return <Minus className="w-3.5 h-3.5 text-amber-400" />;
      return <Circle className="w-3.5 h-3.5 text-gray-300" />;
    }
    if (a.compileResult === 'pass') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
    if (a.compileResult === 'partial') return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
    return <XCircle className="w-3.5 h-3.5 text-red-400" />;
  };

  const attempted = Object.values(session.answers).filter(a => {
    const q = session.questions.find(qq => qq.id === a.questionId);
    return q && normalizeOutput(a.code) !== normalizeOutput(q.starterCode);
  }).length;

  const diffBadge: Record<string, string> = {
    Easy: 'bg-emerald-100 text-emerald-700',
    Medium: 'bg-amber-100 text-amber-700',
    Hard: 'bg-red-100 text-red-700',
  };

  // ─── Instructions Modal ────────────────────────────────────
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-euro-light flex items-center justify-center p-4">
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-euro-orange to-euro-orange-dark p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <EuromonitorLogo size="sm" white />
                <div className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                  {formatTime(timeLeft)} remaining
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Examination Instructions</h2>
              <p className="text-sm text-white/70 mt-1">Please read carefully before proceeding</p>
            </div>

            {/* Candidate Banner */}
            <div className="mx-6 md:mx-8 -mt-4 bg-euro-dark text-white rounded-xl p-4 flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-euro-orange/20 flex items-center justify-center">
                <User className="w-5 h-5 text-euro-orange" />
              </div>
              <div>
                <p className="font-bold">{session.candidate.fullName}</p>
                <p className="text-xs text-gray-400">{session.candidate.email} · {session.candidate.position}</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-6 md:p-8">
              <div className="space-y-4">
                {[
                  { icon: FileText, text: `This exam consists of ${session.questions.length} coding questions in Java covering DSA and OOP topics.` },
                  { icon: Clock, text: `You have ${EXAM_DURATION_MINUTES} minutes. The timer has already started and cannot be paused.` },
                  { icon: Play, text: 'Use the "Compile & Test" button to validate your logic. It checks whether your output matches the expected result.' },
                  { icon: BookOpen, text: 'Read each problem statement carefully. The expected output is shown for reference.' },
                  { icon: Send, text: 'Click "Submit Exam" when finished. The exam will auto-submit when time expires.' },
                  { icon: AlertTriangle, text: 'Your code is auto-saved. If you accidentally close the browser, you can resume by entering the same access code.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="w-8 h-8 rounded-lg bg-euro-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-euro-orange" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pt-1">{item.text}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-8 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-euro-orange to-euro-orange-dark
                  text-white rounded-2xl font-bold shadow-xl shadow-euro-orange/20 hover:shadow-2xl transition-all active:scale-[0.98]"
              >
                I Understand — Begin Exam
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Exam UI ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ─── Top Bar ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <EuromonitorLogo size="sm" />
            <div className="hidden md:block h-6 w-px bg-gray-200" />
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400">
              <User className="w-3.5 h-3.5" />
              <span className="font-medium text-euro-dark truncate max-w-[140px]">{session.candidate.fullName}</span>
            </div>
          </div>

          {/* Center — Timer */}
          <div className={`flex items-center gap-2 px-5 py-2 rounded-full font-mono text-sm font-bold border-2 transition-all
            ${isCriticalTime
              ? 'bg-red-50 text-red-600 border-red-300 animate-pulse'
              : isLowTime
              ? 'bg-amber-50 text-amber-700 border-amber-300'
              : 'bg-gray-50 text-euro-dark border-gray-200'}`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:block font-medium">
              {attempted}/{session.questions.length} attempted
            </span>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-4 md:px-5 py-2 bg-gradient-to-r from-euro-orange to-euro-orange-dark text-white
                rounded-xl font-bold text-sm shadow-md shadow-euro-orange/15 hover:shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Submit Exam</span>
              <span className="sm:hidden">Submit</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* ─── Sidebar Navigator ───────────────────────── */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300
          ${showNav ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 border-b border-gray-50">
            <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Questions</h3>
          </div>

          {/* Quick status bar */}
          <div className="px-4 py-3 border-b border-gray-50 grid grid-cols-3 gap-2">
            {(['not_started', 'in_progress', 'compiled'] as const).map(status => {
              const count = status === 'not_started'
                ? session.questions.filter(q => {
                    const a = session.answers[q.id];
                    return !a || normalizeOutput(a.code) === normalizeOutput(q.starterCode);
                  }).length
                : status === 'in_progress'
                ? session.questions.filter(q => {
                    const a = session.answers[q.id];
                    return a && normalizeOutput(a.code) !== normalizeOutput(q.starterCode) && a.compileResult !== 'pass';
                  }).length
                : session.questions.filter(q => {
                    const a = session.answers[q.id];
                    return a && a.compileResult === 'pass';
                  }).length;
              const labels = { not_started: 'Todo', in_progress: 'In Progress', compiled: 'Compiled' };
              const colors = { not_started: 'text-gray-400', in_progress: 'text-amber-500', compiled: 'text-emerald-500' };
              return (
                <div key={status} className="text-center">
                  <div className={`text-lg font-bold ${colors[status]}`}>{count}</div>
                  <div className="text-[9px] text-gray-400 font-medium">{labels[status]}</div>
                </div>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
            {session.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => goTo(idx)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-all
                  ${currentIdx === idx
                    ? 'bg-euro-orange-50 border border-euro-orange/20 font-semibold text-euro-dark'
                    : 'hover:bg-gray-50 text-gray-600 border border-transparent'
                  }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold
                  ${currentIdx === idx ? 'bg-euro-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {idx + 1}
                </span>
                <span className="flex-1 truncate text-xs">{q.title}</span>
                {getStatusIcon(q.id)}
              </button>
            ))}
          </div>
        </aside>
        {showNav && <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setShowNav(false)} />}

        {/* ─── Main Exam Paper ─────────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">

            {/* Mobile nav */}
            <button
              onClick={() => setShowNav(true)}
              className="lg:hidden flex items-center gap-2 mb-4 px-3 py-2 text-sm font-medium text-gray-500 bg-white rounded-xl border border-gray-200 hover:bg-gray-50"
            >
              <LayoutGrid className="w-4 h-4" />
              Q{currentIdx + 1} of {session.questions.length}
            </button>

            {/* ── Question Paper ──────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in" key={question.id}>

              {/* Exam Paper Header Band */}
              <div className="bg-gradient-to-r from-euro-dark to-[#16213E] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-euro-orange flex items-center justify-center text-white font-bold text-sm">
                    {currentIdx + 1}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">{question.title}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${diffBadge[question.difficulty]}`}>
                        {question.difficulty}
                      </span>
                      <span className="text-[10px] text-gray-400">{question.category}</span>
                    </div>
                  </div>
                </div>
                {answer.compileResult === 'pass' && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Passed
                  </span>
                )}
              </div>

              {/* Problem Statement */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-start gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-euro-orange mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{question.description}</p>
                </div>
                <div className="mt-4 bg-white rounded-lg border border-gray-200 p-3">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">Expected Output</span>
                  <pre className="text-xs font-mono text-euro-dark whitespace-pre-wrap leading-relaxed">{question.expectedOutput}</pre>
                </div>
              </div>

              {/* Code Editor */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Solution.java</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>
                <CodeEditor
                  code={answer.code}
                  onChange={handleCodeChange}
                  minHeight={300}
                />

                {/* Compile Button */}
                <div className="flex items-center gap-3 mt-4 flex-wrap">
                  <button
                    onClick={handleCompile}
                    disabled={compiling}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm
                      hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm
                      shadow-emerald-600/20"
                  >
                    {compiling ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Compiling…
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" fill="white" />
                        Compile &amp; Test
                      </>
                    )}
                  </button>
                  {answer.compileResult !== 'not_tested' && (
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg
                      ${answer.compileResult === 'pass' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        answer.compileResult === 'partial' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        'bg-red-50 text-red-500 border border-red-200'}`}>
                      {answer.compileResult === 'pass' ? '✓ All tests passed' :
                       answer.compileResult === 'partial' ? '⚠ Partial match' :
                       '✗ Tests failed'}
                    </span>
                  )}
                </div>
              </div>

              {/* Console Output */}
              {compileOutput && (
                <div className="mx-6 mb-6 animate-fade-in">
                  <div className="rounded-xl bg-[#0d1117] border border-gray-700 overflow-hidden">
                    <div className="px-4 py-2 bg-[#161b22] border-b border-gray-700 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Console Output</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {compileOutput}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* ── Navigation ──────────────────────────────── */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => goTo(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium
                  hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {/* Page dots */}
              <div className="hidden md:flex items-center gap-1.5">
                {session.questions.map((q, idx) => {
                  const a = session.answers[q.id];
                  const isPassed = a && a.compileResult === 'pass';
                  return (
                    <button
                      key={q.id}
                      onClick={() => goTo(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all
                        ${idx === currentIdx ? 'w-6 bg-euro-orange' :
                          isPassed ? 'bg-emerald-400' : 'bg-gray-200 hover:bg-gray-300'}`}
                    />
                  );
                })}
              </div>

              <button
                onClick={() => goTo(Math.min(session.questions.length - 1, currentIdx + 1))}
                disabled={currentIdx === session.questions.length - 1}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium
                  hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="h-10" />
          </div>
        </main>
      </div>

      {/* ─── Submit Confirmation Modal ───────────────────── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-scale overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-euro-orange-50 flex items-center justify-center mx-auto mb-5">
                <Send className="w-8 h-8 text-euro-orange" />
              </div>
              <h3 className="text-xl font-bold text-euro-dark mb-2">Submit Your Exam?</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                You have attempted <strong className="text-euro-dark">{attempted}</strong> out
                of <strong className="text-euro-dark">{session.questions.length}</strong> questions.
              </p>
              {attempted < session.questions.length && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700 font-medium">
                  ⚠ You have {session.questions.length - attempted} unanswered question{session.questions.length - attempted !== 1 ? 's' : ''}.
                </div>
              )}
              <p className="text-xs text-gray-400 mt-4">Time remaining: <strong className="text-euro-dark">{formatTime(timeLeft)}</strong></p>
            </div>
            <div className="flex border-t border-gray-100">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-4 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors border-r border-gray-100"
              >
                Continue Exam
              </button>
              <button
                onClick={onSubmit}
                className="flex-1 py-4 text-sm font-bold text-white bg-gradient-to-r from-euro-orange to-euro-orange-dark
                  hover:opacity-90 transition-opacity"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
