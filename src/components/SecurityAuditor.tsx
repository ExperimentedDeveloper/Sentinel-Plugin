
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, FileText, Download, RefreshCw, Server, Lock, Database, Shield } from 'lucide-react';
import { AuditReport } from '../types';

const SecurityAuditor: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [score, setScore] = useState(0);

  const runAudit = () => {
    setScanning(true);
    setReport(null);
    setScore(0);

    // Simulate scan process
    let currentScore = 0;
    const interval = setInterval(() => {
      currentScore += 5;
      if (currentScore <= 85) setScore(currentScore);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setScanning(false);
      setScore(88); // Final Score
      setReport({
        id: `AUDIT-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        score: 88,
        findings: MOCK_AUDIT_FINDINGS
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            Security Auditor
          </h2>
          <p className="text-slate-500 text-sm">Automated vulnerability scanning and configuration analysis.</p>
        </div>
        <button
          onClick={runAudit}
          disabled={scanning}
          className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${scanning ? 'bg-slate-800 text-slate-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'}`}
        >
          {scanning ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
          {scanning ? 'Scanning Infrastructure...' : 'Run Full Audit'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Score Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <div className="text-6xl font-mono font-bold text-slate-100 mb-2">{scanning ? score : (report?.score || '--')}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Security Score</div>
            
            <div className="w-full max-w-[200px] h-2 bg-slate-800 rounded-full overflow-hidden mx-auto">
               <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 transition-all duration-1000" style={{ width: `${scanning ? score : (report?.score || 0)}%` }}></div>
            </div>
            
            {!scanning && report && (
                <div className="mt-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-bold">
                    Passing - Grade A
                </div>
            )}
          </div>
        </div>

        {/* Findings List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-300">Audit Findings</h3>
                {report && (
                    <button className="text-xs flex items-center gap-2 text-slate-400 hover:text-white">
                        <Download className="w-3 h-3" /> Export PDF
                    </button>
                )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {!report && !scanning && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-50">
                        <Shield className="w-16 h-16 mb-4" />
                        <p>No audit report generated.</p>
                    </div>
                )}

                {scanning && (
                    <div className="space-y-4">
                        {[1,2,3].map(i => (
                            <div key={i} className="h-16 bg-slate-800/50 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                )}

                {report && report.findings.map((finding) => (
                    <div key={finding.id} className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-start gap-4 hover:border-slate-700 transition-colors">
                         <div className={`p-2 rounded-lg shrink-0 ${
                             finding.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500' :
                             finding.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500' :
                             finding.severity === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-500' :
                             'bg-emerald-500/10 text-emerald-500'
                         }`}>
                             {finding.severity === 'CRITICAL' || finding.severity === 'HIGH' ? <AlertTriangle className="w-5 h-5" /> : 
                              finding.severity === 'LOW' ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                         </div>
                         <div className="flex-1">
                             <div className="flex justify-between items-start mb-1">
                                 <h4 className="font-bold text-slate-200">{finding.title}</h4>
                                 <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                      finding.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                      finding.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                      'bg-slate-800 text-slate-400 border-slate-700'
                                 }`}>{finding.severity}</span>
                             </div>
                             <p className="text-sm text-slate-400 mb-2">{finding.description}</p>
                             <div className="p-2 bg-slate-900 rounded border border-slate-800 text-xs font-mono text-emerald-400">
                                 Fix: {finding.recommendation}
                             </div>
                         </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditor;
