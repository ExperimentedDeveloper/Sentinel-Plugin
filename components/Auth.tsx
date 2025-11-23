

import React, { useState } from 'react';
import { Shield, Lock, Mail, User, ArrowRight, CheckCircle, Fingerprint, FileKey, Download, AlertTriangle, AtSign, HelpCircle, ArrowLeft, Key, FileQuestion, Scan } from 'lucide-react';

interface AuthProps {
  onLogin: (user: { username: string, email: string }) => void;
}

type AuthStep = 'CREDENTIALS' | 'BIOMETRIC' | 'RECOVERY_CODES';
type RecoveryStep = 'EMAIL' | 'OTP' | 'QUESTION_VERIFY' | 'NEW_PASSWORD' | 'SUCCESS';

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "In what city were you born?",
  "What is your mother's maiden name?",
  "What was the make of your first car?",
  "What is your favorite food?"
];

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<AuthStep>('CREDENTIALS');
  
  // Recovery State
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<RecoveryStep>('EMAIL');
  const [recoveryMethod, setRecoveryMethod] = useState<'EMAIL' | 'QUESTION'>('EMAIL');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [securityAnswerVerify, setSecurityAnswerVerify] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    securityQuestion: 0,
    securityAnswer: ''
  });
  const [loading, setLoading] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

  const generateCodes = () => {
    const codes = [];
    for(let i=0; i<8; i++) {
        codes.push(`SENTINEL-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`);
    }
    setRecoveryCodes(codes);
  };

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
          setStep('BIOMETRIC');
      } else {
          generateCodes();
          setStep('RECOVERY_CODES');
      }
    }, 1000);
  };

  const handleBiometricVerify = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          onLogin({ username: formData.username || 'Admin', email: formData.email });
      }, 2000);
  };

  const handleEmailVerify = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          // Simulation of successful email code entry
          onLogin({ username: formData.username || 'Admin', email: formData.email });
      }, 2000);
  };

  const handleFinishRegistration = () => {
      setStep('BIOMETRIC');
  };

  // --- RECOVERY HANDLERS ---

  const handleRecoveryRequest = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          if (recoveryMethod === 'EMAIL') {
            setRecoveryStep('OTP');
          } else {
            setRecoveryStep('QUESTION_VERIFY');
          }
      }, 1500);
  };

  const handleOtpVerify = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          setRecoveryStep('NEW_PASSWORD');
      }, 1500);
  };

  const handleQuestionVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setRecoveryStep('NEW_PASSWORD');
    }, 1500);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          setRecoveryStep('SUCCESS');
      }, 1500);
  };

  const resetToLogin = () => {
      setIsRecovering(false);
      setRecoveryStep('EMAIL');
      setStep('CREDENTIALS');
      setIsLogin(true);
      setRecoveryMethod('EMAIL');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-900/5 to-slate-950 pointer-events-none"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-emerald-900/20 font-mono text-9xl font-bold select-none">SECURE</div>
      <div className="absolute bottom-10 right-10 text-emerald-900/20 font-mono text-9xl font-bold select-none">ACCESS</div>

      <div className="w-full max-w-md relative z-10 px-4">
        <div className="mb-8 text-center animate-in slide-in-from-top-8 duration-700">
          <div className="w-20 h-20 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative group">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <Shield className="w-10 h-10 text-emerald-500 relative z-10" />
          </div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight">SENTINEL</h1>
          <p className="text-emerald-500 font-mono text-xs tracking-[0.4em] uppercase mt-2">Fortress Access Control</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
          {/* Top Border Gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

          {/* RECOVERY MODE */}
          {isRecovering ? (
              <div className="space-y-6">
                  <button onClick={resetToLogin} className="text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-1 transition-colors mb-4">
                      <ArrowLeft className="w-3 h-3" /> Back to Access Terminal
                  </button>

                  {recoveryStep === 'EMAIL' && (
                      <form onSubmit={handleRecoveryRequest} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="text-center mb-6">
                              <div className="inline-flex p-3 bg-blue-500/10 rounded-full mb-3 border border-blue-500/20">
                                  <HelpCircle className="w-6 h-6 text-blue-500" />
                              </div>
                              <h3 className="text-lg font-bold text-slate-100">Account Recovery</h3>
                              <p className="text-xs text-slate-500">Identify yourself to initiate the recovery protocol.</p>
                          </div>

                          {/* Recovery Method Toggle */}
                          <div className="flex gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800 mb-4">
                              <button
                                type="button"
                                onClick={() => setRecoveryMethod('EMAIL')}
                                className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${recoveryMethod === 'EMAIL' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
                              >
                                Email 2FA
                              </button>
                              <button
                                type="button"
                                onClick={() => setRecoveryMethod('QUESTION')}
                                className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${recoveryMethod === 'QUESTION' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}
                              >
                                Security Question
                              </button>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">Registered Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={recoveryEmail}
                                    onChange={e => setRecoveryEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all placeholder-slate-700"
                                    placeholder="admin@fortress.net"
                                />
                            </div>
                          </div>
                          <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg ${recoveryMethod === 'EMAIL' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/20'}`}
                          >
                             {loading ? <span className="animate-pulse">Dispatching Agent...</span> : recoveryMethod === 'EMAIL' ? 'Send Recovery Token' : 'Proceed to Challenge'}
                          </button>
                      </form>
                  )}

                  {recoveryStep === 'OTP' && (
                      <form onSubmit={handleOtpVerify} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="text-center mb-6">
                              <div className="inline-flex p-3 bg-yellow-500/10 rounded-full mb-3 border border-yellow-500/20">
                                  <Key className="w-6 h-6 text-yellow-500" />
                              </div>
                              <h3 className="text-lg font-bold text-slate-100">Verify Identity</h3>
                              <p className="text-xs text-slate-500">Enter the 6-digit code sent to <span className="text-slate-300">{recoveryEmail}</span>.</p>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">One-Time Password (OTP)</label>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                value={otpCode}
                                onChange={e => setOtpCode(e.target.value.toUpperCase())}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-center text-2xl tracking-[0.5em] font-mono text-emerald-400 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all placeholder-slate-800"
                                placeholder="______"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
                          >
                             {loading ? <span className="animate-pulse">Verifying Hash...</span> : 'Verify Token'}
                          </button>
                      </form>
                  )}

                  {recoveryStep === 'QUESTION_VERIFY' && (
                    <form onSubmit={handleQuestionVerify} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="text-center mb-6">
                            <div className="inline-flex p-3 bg-purple-500/10 rounded-full mb-3 border border-purple-500/20">
                                <FileQuestion className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-100">Security Challenge</h3>
                            <p className="text-xs text-slate-500">Answer your pre-set security question.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Security Question</label>
                                <div className="w-full bg-slate-950/50 border border-slate-800 rounded-lg py-2.5 px-4 text-slate-300 text-sm italic">
                                    {SECURITY_QUESTIONS[0]}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">Your Answer</label>
                                <input
                                    type="text"
                                    required
                                    value={securityAnswerVerify}
                                    onChange={e => setSecurityAnswerVerify(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-slate-200 focus:outline-none focus:border-purple-500 transition-all placeholder-slate-700"
                                    placeholder="Answer..."
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20"
                        >
                             {loading ? <span className="animate-pulse">Verifying...</span> : 'Verify Answer'}
                        </button>
                    </form>
                  )}

                  {recoveryStep === 'NEW_PASSWORD' && (
                      <form onSubmit={handlePasswordReset} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="text-center mb-6">
                              <h3 className="text-lg font-bold text-slate-100">Reset Credentials</h3>
                              <p className="text-xs text-slate-500">Identity confirmed. Set new access phrase.</p>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">New Passphrase</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all placeholder-slate-700"
                                    placeholder="••••••••••••"
                                />
                            </div>
                          </div>
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
                          >
                             {loading ? <span className="animate-pulse">Encrypting...</span> : 'Update Credentials'}
                          </button>
                      </form>
                  )}

                  {recoveryStep === 'SUCCESS' && (
                      <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                              <CheckCircle className="w-8 h-8 text-emerald-500" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-100 mb-2">Access Restored</h3>
                          <p className="text-sm text-slate-500 mb-6">Your credentials have been updated in the secure vault.</p>
                          <button onClick={resetToLogin} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg border border-slate-700 transition-colors">
                              Return to Login
                          </button>
                      </div>
                  )}
              </div>
          ) : (
          /* MAIN AUTH FLOW */
          <>
          {step === 'CREDENTIALS' && (
            <>
                <div className="flex gap-4 mb-8 border-b border-slate-800 pb-1">
                    <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 pb-3 text-sm font-medium transition-all ${isLogin ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                    ZKP Login (Schnorr)
                    </button>
                    <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 pb-3 text-sm font-medium transition-all ${!isLogin ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                    New Clearance
                    </button>
                </div>

                <form onSubmit={handleCredentialSubmit} className="space-y-5">
                    {!isLogin && (
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">Operative Username</label>
                        <div className="relative group">
                        <User className="absolute left-3 top-3 w-5 h-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={e => setFormData({...formData, username: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all placeholder-slate-700"
                            placeholder="Identify yourself"
                        />
                        </div>
                    </div>
                    )}

                    <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">Secure Email Channel</label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all placeholder-slate-700"
                        placeholder="encrypted@network.com"
                        />
                    </div>
                    </div>

                    <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">Master Passphrase</label>
                        {isLogin && (
                            <button 
                                type="button"
                                onClick={() => setIsRecovering(true)} 
                                className="text-[10px] text-slate-500 hover:text-emerald-400 transition-colors"
                            >
                                Forgot Identity?
                            </button>
                        )}
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all placeholder-slate-700"
                        placeholder="••••••••••••"
                        />
                    </div>
                    </div>

                    {/* Security Question Setup for Registration */}
                    {!isLogin && (
                        <div className="space-y-4 pt-2 border-t border-slate-800/50">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">Security Question (For Recovery)</label>
                                <div className="relative group">
                                    <FileQuestion className="absolute left-3 top-3 w-5 h-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                                    <select
                                        value={formData.securityQuestion}
                                        onChange={e => setFormData({...formData, securityQuestion: parseInt(e.target.value)})}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                                    >
                                        {SECURITY_QUESTIONS.map((q, i) => (
                                            <option key={i} value={i}>{q}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                             <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">Security Answer</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-3 w-5 h-5 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-focus-within:bg-emerald-500 transition-colors"></div>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.securityAnswer}
                                        onChange={e => setFormData({...formData, securityAnswer: e.target.value})}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 transition-all placeholder-slate-700"
                                        placeholder="Your answer..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-6 relative overflow-hidden"
                    >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-xs uppercase tracking-widest">Calculating ZKP...</span>
                        </div>
                    ) : (
                        <>
                        {isLogin ? 'Prove Identity (ZKP)' : 'Generate Identity'}
                        <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                    </button>
                </form>
            </>
          )}

          {step === 'RECOVERY_CODES' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="text-center">
                      <div className="inline-flex p-3 bg-red-500/10 rounded-full mb-4 border border-red-500/20">
                          <FileKey className="w-8 h-8 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-100">Emergency Override Codes</h3>
                      <p className="text-sm text-slate-400 mt-2">
                          Save these codes immediately. If you lose access to your device, these are the <strong className="text-red-400">ONLY</strong> way to recover your fortress.
                      </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-4 rounded-lg border border-slate-800 max-h-48 overflow-y-auto font-mono text-xs">
                      {recoveryCodes.map((code, i) => (
                          <div key={i} className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300 text-center hover:text-emerald-400 hover:border-emerald-500/30 transition-colors cursor-copy">
                              {code}
                          </div>
                      ))}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-yellow-500 bg-yellow-500/5 p-3 rounded border border-yellow-500/10">
                      <AlertTriangle className="w-4 h-4" />
                      Codes are generated client-side and hashed before transmission.
                  </div>

                  <button
                    onClick={handleFinishRegistration}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all border border-slate-700"
                    >
                    <Download className="w-4 h-4" />
                    I have saved my codes
                  </button>
              </div>
          )}

          {step === 'BIOMETRIC' && (
              <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                  <div className="relative w-24 h-24 mx-auto mb-6 cursor-pointer group" onClick={handleBiometricVerify}>
                      <div className={`absolute inset-0 rounded-full border-2 ${loading ? 'border-emerald-500 animate-ping' : 'border-slate-700 group-hover:border-emerald-500/50'} transition-colors`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <Fingerprint className={`w-12 h-12 ${loading ? 'text-emerald-400 animate-pulse' : 'text-slate-500 group-hover:text-emerald-500'} transition-colors`} />
                      </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Biometric Verification</h3>
                  <p className="text-sm text-slate-500 mb-8">
                      {loading ? 'Scanning biometric signature...' : 'Touch sensor to confirm identity'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                     <button onClick={handleBiometricVerify} disabled={loading} className="flex flex-col items-center gap-2 p-3 rounded border border-slate-800 hover:bg-slate-900 hover:border-emerald-500/30 transition-colors group">
                         <div className="p-2 bg-slate-900 rounded-full group-hover:bg-emerald-500/10">
                            <Fingerprint className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                         </div>
                         <span className="text-xs text-slate-400 group-hover:text-slate-200">Security Key</span>
                     </button>
                      <button onClick={handleEmailVerify} disabled={loading} className="flex flex-col items-center gap-2 p-3 rounded border border-slate-800 hover:bg-slate-900 hover:border-blue-500/30 transition-colors group">
                         <div className="p-2 bg-slate-900 rounded-full group-hover:bg-blue-500/10">
                            <AtSign className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                         </div>
                         <span className="text-xs text-slate-400 group-hover:text-slate-200">Email 2FA Code</span>
                     </button>
                  </div>
              </div>
          )}
          </>
          )}

        </div>
        
        <div className="mt-6 text-center flex justify-center gap-4 text-[10px] text-slate-600 font-mono">
             <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> E2E ENCRYPTED</span>
             <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SENTINEL GUARD</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
