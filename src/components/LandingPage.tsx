import EuromonitorLogo from './EuromonitorLogo';
import { Shield, Clock, Code2, BarChart3, Users, Lock } from 'lucide-react';

interface Props {
  onStartExam: () => void;
  onAdminLogin: () => void;
}

export default function LandingPage({ onStartExam, onAdminLogin }: Props) {
  return (
    <div className="min-h-screen bg-euro-light flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <EuromonitorLogo size="sm" />
          <button
            onClick={onAdminLogin}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-euro-orange transition-colors rounded-lg hover:bg-euro-orange-50"
          >
            <Lock className="w-4 h-4" />
            Admin Panel
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-euro-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-euro-orange/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Exam badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-euro-orange/10 border border-euro-orange/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-euro-orange animate-pulse" />
            <span className="text-sm font-semibold text-euro-orange">Online Technical Assessment</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-euro-dark leading-[1.1] mb-5">
            Java Developer
            <br />
            <span className="bg-gradient-to-r from-euro-orange to-euro-orange-dark bg-clip-text text-transparent">
              Coding Assessment
            </span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Demonstrate your proficiency in Data Structures, Algorithms, and
            Object-Oriented Programming through practical coding challenges.
          </p>

          <button
            onClick={onStartExam}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-euro-orange to-euro-orange-dark text-white rounded-2xl
              font-bold text-lg shadow-xl shadow-euro-orange/25 hover:shadow-2xl hover:shadow-euro-orange/30
              hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            <Code2 className="w-5 h-5" />
            Begin Assessment
          </button>
        </div>

        {/* Info Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl w-full">
          {[
            { icon: Clock, label: '2 Hour Time Limit', desc: 'Timed examination', color: 'text-blue-600 bg-blue-50' },
            { icon: Code2, label: '15 Questions', desc: 'DSA & OOP problems', color: 'text-euro-orange bg-euro-orange-50' },
            { icon: BarChart3, label: 'Auto Compile', desc: 'Validate your logic', color: 'text-emerald-600 bg-emerald-50' },
            { icon: Shield, label: 'Secure Exam', desc: 'Password protected', color: 'text-purple-600 bg-purple-50' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="font-bold text-euro-dark text-sm">{item.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-euro-dark py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-euro-orange flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white/80">euromonitor</span>
          </div>
          <p className="text-xs text-gray-500">© 2025 Euromonitor International. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
