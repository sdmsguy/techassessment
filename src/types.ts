import type { Question } from './data/questions';

export interface CandidateInfo {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  graduationYear: string;
  position: string;
}

export interface ExamAnswer {
  questionId: number;
  code: string;
  compileResult: 'not_tested' | 'pass' | 'partial' | 'fail';
  lastCompiled: number | null;        // timestamp
}

export interface ExamSession {
  id: string;
  candidate: CandidateInfo;
  questions: Question[];               // the random subset served
  answers: Record<number, ExamAnswer>; // keyed by questionId
  startedAt: number;                   // timestamp
  submittedAt: number | null;          // timestamp
  timeAllotted: number;                // seconds
}

export interface Submission {
  id: string;
  candidate: CandidateInfo;
  answers: {
    questionId: number;
    questionTitle: string;
    category: string;
    difficulty: string;
    code: string;
    compileResult: string;
    expectedOutput: string;
  }[];
  startedAt: number;
  submittedAt: number;
  totalQuestions: number;
  attempted: number;
  passedCompile: number;
  score: string; // admin-assigned or auto
}

export type AppView =
  | 'landing'
  | 'login'
  | 'register'
  | 'exam'
  | 'submitted'
  | 'admin-login'
  | 'admin-dashboard';
