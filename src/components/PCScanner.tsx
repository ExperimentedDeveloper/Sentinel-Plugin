
import React, { useState, useEffect } from 'react';
import { Scan, ShieldAlert, FileCode, Activity, User, HardDrive, Search, AlertOctagon, CheckCircle, Cpu, Layers, Eye, Share2 } from 'lucide-react';
import { PCScanReport } from '../types';

const PCScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<PCScanReport | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState('Ready');

  const startScan = () => {
    setIsScanning(true);
    setReport(null);
    setProgress(0);
    
    const actions = [
        'Initializing Kernel Driver (Ring 0)...',
        'Mapping Physical Memory...',
        'Scanning Process Heap...',
        'Analyzing USN Journal...',
        'Verifying Prefetch Hashes...',
        'Querying Cloud Heuristics (Hyena)...',
        'Finalizing Verdict...'
    ];

    let step = 0;
    const interval = setInterval(() => {
        step++;
        setProgress(Math.round((step / actions.length) * 100));
        setCurrentAction(actions[step] || 'Processing...');

        if (step >= actions.length) {
            clearInterval(interval);
            setTimeout(() => {
                setIsScanning(false);
                setReport(MOCK_PC_SCAN_REPORT);
            }, 500);
        }
    }, 800);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <Scan className="w-8 h-8 text-emerald-500" />
                    DeepScan Forensic Engine
                </h2>
                <p className="text-slate-500 text-sm">Client-side analysis tool. Detects injected code, macros, and deleted cheats.</p>
            </div>
            <div className="flex gap-2">
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-400">DRIVER: LOADED</span>
                </div>
                <button 
                    onClick={startScan}
                    disabled={isScanning}
                    className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${isScanning ? 'bg-slate-800 text-slate-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'}`}
                >
                    {isScanning ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    {isScanning ? 'Scanning Target...' : 'Start Remote Scan'}
                </button>
            </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-hidden flex flex-col">
            {isScanning ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                    <div className="w-32 h-32 relative">
                        <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-emerald-500 border-r-emerald-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-emerald-500 text-xl">
                            {progress}%
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-200 mb-2">Forensic Analysis in Progress</h3>
                        <p className="text-emerald-400 font-mono text-sm animate-pulse">{currentAction}</p>
                    </div>
                </div>
            ) : !report ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                    <Scan className="w-24 h-24 mb-4 opacity-20" />
                    <p className="text-lg">Waiting for target connection...</p>
                    <p className="text-sm">Initiate a scan to analyze the connected client.</p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                    {/* VERDICT BANNER */}
                    <div className={`p-6 rounded-xl border flex items-center justify-between ${report.verdict === 'DETECTED' ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-full ${report.verdict === 'DETECTED' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                {report.verdict === 'DETECTED' ? <ShieldAlert className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold ${report.verdict === 'DETECTED' ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {report.verdict}
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    Risk Score: <span className="text-white font-bold">{report.riskScore}/100</span> • Scan ID: {report.scanId}
                                </p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                            <Share2 className="w-4 h-4" /> Share Report
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* SYSTEM INFO */}
                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                            <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                                <HardDrive className="w-4 h-4 text-blue-400" /> System Fingerprint
                            </h4>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between p-2 bg-slate-900 rounded">
                                    <span className="text-slate-500">Operating System</span>
                                    <span className="text-slate-200">{report.systemInfo.os}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-slate-900 rounded">
                                    <span className="text-slate-500">CPU Model</span>
                                    <span className="text-slate-200">{report.systemInfo.cpu}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-slate-900 rounded">
                                    <span className="text-slate-500">RAM</span>
                                    <span className="text-slate-200">{report.systemInfo.ram}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-slate-900 rounded">
                                    <span className="text-slate-500">Running Processes</span>
                                    <span className="text-slate-200">{report.systemInfo.processes}</span>
                                </div>
                                <div className="mt-4 pt-2 border-t border-slate-800">
                                    <p className="text-slate-500 mb-2">Linked Alts (HWID):</p>
                                    <div className="flex flex-wrap gap-2">
                                        {report.linkedAccounts.map((alt, i) => (
                                            <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">
                                                {alt}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DETECTIONS LIST */}
                        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col">
                            <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                                <AlertOctagon className="w-4 h-4 text-red-500" /> Forensic Evidence
                            </h4>
                            <div className="flex-1 overflow-y-auto space-y-2">
                                {report.detections.map(evidence => (
                                    <div key={evidence.id} className="p-3 bg-slate-900 rounded border border-slate-800 hover:border-red-500/30 transition-all group">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                                evidence.severity === 'CRITICAL' ? 'bg-red-500 text-white' : 
                                                evidence.severity === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-yellow-500 text-black'
                                            }`}>
                                                {evidence.type}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-mono">{evidence.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-slate-200 font-bold truncate font-mono">{evidence.path}</p>
                                        <p className="text-xs text-slate-400 mt-1">{evidence.details}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* GAME PREVIEW PLACEHOLDER */}
                    <div className="bg-black rounded-lg overflow-hidden border border-slate-800 relative h-48 flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[url('https://www.minecraft.net/content/dam/games/minecraft/key-art/Minecraft-xbox-one-edition_box-art.jpg')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all"></div>
                        <div className="relative z-10 bg-black/80 px-4 py-2 rounded border border-slate-700 flex items-center gap-2 text-xs text-slate-300">
                            <Eye className="w-4 h-4" />
                            Game Process Capture (Window Handle: 0x0042A)
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default PCScanner;
