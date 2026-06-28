import { useState, useCallback } from 'react';
import type { AppView, CandidateInfo, ExamSession, ExamAnswer, Submission } from './types';
import { questions } from './data/questions';
import { EXAM_DURATION_MINUTES, QUESTIONS_PER_EXAM, LS_KEYS } from './config';

import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import RegistrationForm from './components/RegistrationForm';
import ExamInterface from './components/ExamInterface';
import SubmittedPage from './components/SubmittedPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// ── Helpers ────────────────────────────────────────────────────
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function pickRandomQuestions(n: number) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

function loadSubmissions(): Submission[] {
  try {
    const raw = localStorage.getItem(LS_KEYS.SUBMISSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSubmissions(subs: Submission[]) {
  localStorage.setItem(LS_KEYS.SUBMISSIONS, JSON.stringify(subs));
}

function loadSession(): ExamSession | null {
  try {
    const raw = localStorage.getItem(LS_KEYS.CURRENT_EXAM);
    if (!raw) return null;
    const session: ExamSession = JSON.parse(raw);
    // Check if already submitted
    if (session.submittedAt) return null;
    // Check if expired
    const elapsed = (Date.now() - session.startedAt) / 1000;
    if (elapsed > session.timeAllotted + 30) return null; // 30s grace
    return session;
  } catch { return null; }
}

function saveSession(session: ExamSession | null) {
  if (session) {
    localStorage.setItem(LS_KEYS.CURRENT_EXAM, JSON.stringify(session));
  } else {
    localStorage.removeItem(LS_KEYS.CURRENT_EXAM);
  }
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  // Try to resume an existing session
  const existing = loadSession();

  const [view, setView] = useState<AppView>(existing ? 'exam' : 'landing');
  const [session, setSession] = useState<ExamSession | null>(existing);
  const [submissions, setSubmissions] = useState<Submission[]>(loadSubmissions);
  const [submittedInfo, setSubmittedInfo] = useState<{
    candidate: CandidateInfo;
    attempted: number;
    total: number;
    passedCompile: number;
  } | null>(null);

  // ── Candidate flow ────────────────────────────────────────
  const handleLoginSuccess = () => setView('register');

  const handleRegister = (candidate: CandidateInfo) => {
    const examQuestions = pickRandomQuestions(QUESTIONS_PER_EXAM);
    const newSession: ExamSession = {
      id: generateId(),
      candidate,
      questions: examQuestions,
      answers: {},
      startedAt: Date.now(),
      submittedAt: null,
      timeAllotted: EXAM_DURATION_MINUTES * 60,
    };
    setSession(newSession);
    saveSession(newSession);
    setView('exam');
  };

  const handleUpdateAnswer = useCallback((questionId: number, answer: ExamAnswer) => {
    setSession(prev => {
      if (!prev) return prev;
      const updated = { ...prev, answers: { ...prev.answers, [questionId]: answer } };
      saveSession(updated);
      return updated;
    });
  }, []);

  const normalizeOutput = (str: string): string =>
    str.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '').replace(/\n+$/, '');

  const handleSubmitExam = useCallback(() => {
    if (!session) return;

    const now = Date.now();
    const answersArray = session.questions.map(q => {
      const ans = session.answers[q.id];
      const code = ans?.code || q.starterCode;
      const isModified = normalizeOutput(code) !== normalizeOutput(q.starterCode);
      return {
        questionId: q.id,
        questionTitle: q.title,
        category: q.category,
        difficulty: q.difficulty,
        code,
        compileResult: ans?.compileResult || 'not_tested',
        expectedOutput: q.expectedOutput,
        attempted: isModified,
      };
    });

    const attempted = answersArray.filter(a => a.attempted).length;
    const passedCompile = answersArray.filter(a => a.compileResult === 'pass').length;

    const submission: Submission = {
      id: session.id,
      candidate: session.candidate,
      answers: answersArray.map(({ attempted: _a, ...rest }) => rest),
      startedAt: session.startedAt,
      submittedAt: now,
      totalQuestions: session.questions.length,
      attempted,
      passedCompile,
      score: `${passedCompile}/${session.questions.length}`,
    };

    const updatedSubs = [...loadSubmissions(), submission];
    saveSubmissions(updatedSubs);
    setSubmissions(updatedSubs);

    setSubmittedInfo({
      candidate: session.candidate,
      attempted,
      total: session.questions.length,
      passedCompile,
    });

    // Clean up session
    saveSession(null);
    setSession(null);
    setView('submitted');
  }, [session]);

  // ── Admin flow ────────────────────────────────────────────
  const handleAdminLoginSuccess = () => setView('admin-dashboard');

  const handleDeleteSubmission = (id: string) => {
    const updated = submissions.filter(s => s.id !== id);
    saveSubmissions(updated);
    setSubmissions(updated);
  };

  // ── Render ────────────────────────────────────────────────
  switch (view) {
    case 'landing':
      return (
        <LandingPage
          onStartExam={() => setView('login')}
          onAdminLogin={() => setView('admin-login')}
        />
      );

    case 'login':
      return (
        <LoginScreen
          onSuccess={handleLoginSuccess}
          onBack={() => setView('landing')}
        />
      );

    case 'register':
      return (
        <RegistrationForm
          onSubmit={handleRegister}
          onBack={() => setView('login')}
        />
      );

    case 'exam':
      return session ? (
        <ExamInterface
          session={session}
          onUpdateAnswer={handleUpdateAnswer}
          onSubmit={handleSubmitExam}
        />
      ) : (
        <LandingPage
          onStartExam={() => setView('login')}
          onAdminLogin={() => setView('admin-login')}
        />
      );

    case 'submitted':
      return submittedInfo ? (
        <SubmittedPage
          candidate={submittedInfo.candidate}
          attempted={submittedInfo.attempted}
          total={submittedInfo.total}
          passedCompile={submittedInfo.passedCompile}
        />
      ) : (
        <LandingPage
          onStartExam={() => setView('login')}
          onAdminLogin={() => setView('admin-login')}
        />
      );

    case 'admin-login':
      return (
        <AdminLogin
          onSuccess={handleAdminLoginSuccess}
          onBack={() => setView('landing')}
        />
      );

    case 'admin-dashboard':
      return (
        <AdminDashboard
          submissions={submissions}
          onLogout={() => setView('landing')}
          onDeleteSubmission={handleDeleteSubmission}
        />
      );

    default:
      return null;
  }
}
