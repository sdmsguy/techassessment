import { useState } from 'react';
import { ADMIN_PASSWORD } from '../config';
import EuromonitorLogo from './EuromonitorLogo';
import { Shield, ArrowRight, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onSuccess, onBack }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onSuccess();
      } else {
        setError('Invalid administrator credentials.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-euro-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-euro-dark to-[#16213E] p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-2xl bg-euro-orange flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-sm text-gray-400 mt-1">Evaluator access only</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-gray-200 text-euro-dark font-medium
                    focus:outline-none focus:border-euro-orange focus:ring-4 focus:ring-euro-orange/10 transition-all placeholder:text-gray-300"
                  autoFocus
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-4 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-euro-orange text-white rounded-xl font-bold text-sm shadow-lg shadow-euro-orange/20
                hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <button onClick={onBack} className="flex items-center gap-2 mx-auto mt-6 text-sm text-gray-500 hover:text-euro-orange transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="flex justify-center mt-8">
          <EuromonitorLogo size="sm" white />
        </div>
      </div>
    </div>
  );
}
