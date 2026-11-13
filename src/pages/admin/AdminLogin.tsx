import React, { useState } from 'react';
import { Shield, Key, Mail, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useLanguage } from '../../locales/LanguageContext';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
  navigate: (path: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, navigate }) => {
  const { t } = useLanguage();
  const [user, setUser] = useState('admin@fkr.cu');
  const [pass, setPass] = useState('FKR_Energia_2026!');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.login(user, pass);
      if (res.success && res.token) {
        localStorage.setItem('fkr_admin_token', res.token);
        onLoginSuccess(res.token);
      } else {
        setError(res.error || 'Credenciales inválidas');
      }
    } catch {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101317] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-dark opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg bg-[#16191D] border border-[#2F3131] p-8 sm:p-10 shadow-2xl space-y-7">
        
        {/* Top Header with Enlarged Typography */}
        <div className="flex items-center justify-between pb-5 border-b border-[#262B33]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-[#D20A11] flex items-center justify-center text-white shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-headline font-bold text-xl sm:text-2xl text-white leading-none">
                FKR SURL
              </h1>
              <span className="text-xs font-headline font-bold text-[#D20A11] tracking-widest uppercase mt-1 block">
                PANEL ADMINISTRATIVO
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-xs sm:text-sm text-[#9CA3AF] hover:text-white flex items-center gap-1.5 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Web pública</span>
          </button>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-4 bg-[#1F242C] border border-[#373D47] text-sm text-[#D1D5DB] space-y-1.5">
          <div className="flex items-center gap-2 font-headline font-bold text-[#D20A11] uppercase tracking-wider text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Credenciales de Acceso</span>
          </div>
          <div className="font-mono text-xs sm:text-sm text-[#E5E7EB] space-y-1 pt-1">
            <div>Usuario: <strong className="text-white">admin@fkr.cu</strong></div>
            <div>Contraseña: <strong className="text-white">FKR_Energia_2026!</strong></div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-950/50 border border-red-500/50 text-sm text-red-300 flex items-center gap-2.5 font-medium">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-headline font-bold uppercase tracking-wider text-[#D1D5DB] mb-2">
              Usuario o Correo
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm sm:text-base bg-[#101317] border border-[#373D47] text-white focus:outline-none focus:border-[#D20A11]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-headline font-bold uppercase tracking-wider text-[#D1D5DB] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Key className="w-5 h-5 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm sm:text-base bg-[#101317] border border-[#373D47] text-white focus:outline-none focus:border-[#D20A11]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="fkr-btn fkr-btn-primary w-full justify-center py-3.5 text-sm sm:text-base tracking-wider font-bold shadow-md"
          >
            {loading ? 'Accediendo...' : 'Iniciar Sesión en Panel'}
          </button>
        </form>

        <div className="pt-4 border-t border-[#262B33] text-center text-xs text-[#9CA3AF]">
          FKR SURL · Plataforma de Control Interno de Catálogo
        </div>

      </div>
    </div>
  );
};
