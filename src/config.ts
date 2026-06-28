// ── Authentication ──────────────────────────────────────────────
// Candidate access password  (shared with candidates before exam)
export const CANDIDATE_PASSWORD = 'euro2025';

// Admin password (only for evaluators)
export const ADMIN_PASSWORD = 'euroadmin@2025';

// ── Exam settings ───────────────────────────────────────────────
// Total exam duration in minutes
export const EXAM_DURATION_MINUTES = 120;

// Number of questions served per exam (randomly picked)
export const QUESTIONS_PER_EXAM = 15;

// LocalStorage keys
export const LS_KEYS = {
  SUBMISSIONS: 'euro_submissions',
  CURRENT_EXAM: 'euro_current_exam',
  ADMIN_AUTH: 'euro_admin_auth',
} as const;
