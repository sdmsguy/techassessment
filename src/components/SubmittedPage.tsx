import EuromonitorLogo from './EuromonitorLogo';
import type { CandidateInfo } from '../types';
import { CheckCircle2, Mail, Clock, FileText } from 'lucide-react';

interface Props {
  candidate: CandidateInfo;
  attempted: number;
  total: number;
  passedCompile: number;
}

export default function SubmittedPage({ candidate, attempted, total, passedCompile }: Props) {
  return (
    <div className="min-h-screen bg-euro-light flex items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in text-center">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          {/* Confetti-style header */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-10 relative overflow-hidden">
            {/* decorative circles */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-white/20 rounded-full" />
            <div className="absolute top-12 right-12 w-2 h-2 bg-white/30 rounded-full" />
            <div className="absolute bottom-6 left-16 w-4 h-4 bg-white/10 rounded-full" />
            <div className="absolute top-8 right-24 w-2.5 h-2.5 bg-yellow-300/30 rounded-full" />
            <div className="absolute bottom-10 right-8 w-3 h-3 bg-yellow-300/20 rounded-full" />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Exam Submitted!</h1>
              <p className="text-sm text-white/70 mt-1">Thank you for completing the assessment</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 space-y-6">
            {/* Candidate */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Candidate</p>
              <p className="text-lg font-bold text-euro-dark">{candidate.fullName}</p>
              <p className="text-sm text-gray-500">{candidate.email}</p>
              <p className="text-xs text-gray-400 mt-1">{candidate.position}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-euro-orange-50 rounded-xl p-3 text-center">
                <FileText className="w-4 h-4 text-euro-orange mx-auto mb-1" />
                <div className="text-lg font-bold text-euro-dark">{attempted}/{total}</div>
                <div className="text-[10px] text-gray-500 font-medium">Attempted</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                <div className="text-lg font-bold text-euro-dark">{passedCompile}</div>
                <div className="text-[10px] text-gray-500 font-medium">Compiled</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <div className="text-lg font-bold text-euro-dark">Done</div>
                <div className="text-[10px] text-gray-500 font-medium">Status</div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">What happens next?</p>
                  <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                    Your answers have been recorded and will be reviewed by the evaluation
                    team at Euromonitor. You will be contacted regarding next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="flex justify-center mt-8">
          <EuromonitorLogo size="sm" />
        </div>
      </div>
    </div>
  );
}
