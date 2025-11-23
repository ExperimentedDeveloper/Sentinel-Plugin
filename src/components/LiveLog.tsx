import React, { useEffect, useRef, useState } from 'react';
import { INITIAL_LOGS } from '../constants';
import { LogEntry } from '../types';
import { Terminal, Activity, Send, ChevronRight, AlertOctagon } from 'lucide-react';

const LiveLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [command, setCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Background simulation logs
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) return; 

      const actions = [
        { msg: 'DDoS Mitigation: Dropped 450 packets.', src: 'DDoS-Shield', type: 'SUCCESS' as const },
        { msg: 'X-Ray Monitor: Player "MinerSteve" found 3 Diamonds in 10s.', src: 'AntiXray', type: 'WARN' as const },
        { msg: 'PacketLimiter: Cancelling high-rate packet stream.', src: 'Core', type: 'WARN' as const },
        { msg: 'StaffMode: Admin_Sarah enabled Vanish mode.', src: 'StaffOps', type: 'STAFF' as const },
      ];
      
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      addLog(randomAction.type, randomAction.msg, randomAction.src);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addLog = (level: LogEntry['level'], message: string, source: string) => {
    setLogs(prev => [...prev.slice(-99), {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level,
        message,
        source
    }]);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command.trim();
    setCommand('');
    addLog('CMD', `> ${cmd}`, 'Admin');
    setIsTyping(true);
    setTimeout(() => {
        processCommand(cmd);
        setIsTyping(false);
        inputRef.current?.focus();
    }, 600 + Math.random() * 500);
  };

  const processCommand = (cmd: string) => {
      const parts = cmd.split(' ');
      const base = parts[0].toLowerCase();

      switch(base) {
          case '/sentinel':
              if (parts[1] === 'alerts') {
                  addLog('SUCCESS', 'Toggled Admin Alerts: [ENABLED]', 'Core');
                  addLog('OUTPUT', 'You will now see: Hack Violations, X-Ray Alerts, Failed Logins.', 'Core');
              } else if (parts[1] === 'xray') {
                  const target = parts[2];
                  if (!target) {
                      addLog('WARN', 'Usage: /sentinel xray <player>', 'Core');
                  } else {
                      addLog('INFO', `Fetching Mining Stats for ${target}...`, 'AntiXray');
                      setTimeout(() => {
                          addLog('OUTPUT', `--- X-RAY ANALYSIS: ${target} ---`, 'AntiXray');
                          addLog('OUTPUT', `Diamond Ore: 42 (Rate: HIGH)`, 'AntiXray');
                          addLog('OUTPUT', `Netherite: 12 (Rate: NORMAL)`, 'AntiXray');
                          addLog('OUTPUT', `Stone Mined: 405 (Ratio: 10%)`, 'AntiXray');
                          addLog('OUTPUT', `Verdict: PROBABLE X-RAY`, 'AntiXray');
                      }, 800);
                  }
              } else if (parts[1] === 'scan') {
                  addLog('INFO', 'Scanning...', 'System');
              } else {
                  addLog('WARN', 'Unknown command. Try /sentinel alerts, /sentinel xray, /staff', 'System');
              }
              break;
          default:
              addLog('WARN', `Unknown command: ${base}`, 'System');
      }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-blue-400';
      case 'WARN': return 'text-yellow-400';
      case 'CRITICAL': return 'text-red-500 font-bold';
      case 'SUCCESS': return 'text-emerald-400';
      case 'CMD': return 'text-white font-bold';
      case 'OUTPUT': return 'text-slate-400';
      case 'STAFF': return 'text-pink-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-[600px] shadow-2xl relative font-mono">
      <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-300">Sentinel C2 Terminal</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-400">ONLINE</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto text-xs space-y-1 bg-[#0d1117] relative z-10" onClick={() => inputRef.current?.focus()}>
        {logs.map((log) => (
          <div key={log.id} className={`flex items-start gap-3 p-0.5 ${log.level === 'CMD' ? 'mt-4 mb-2' : ''}`}>
            <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
            {log.level !== 'CMD' && log.level !== 'OUTPUT' && (
                <span className="text-slate-600 shrink-0 w-24 text-right border-r border-slate-800 mr-2 pr-2 select-none">{log.source}</span>
            )}
            <span className={`break-all ${getLevelColor(log.level)}`}>
                {log.level === 'OUTPUT' && <span className="text-slate-600 mr-2">↳</span>}
                {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 relative z-30">
        <ChevronRight className="w-4 h-4 text-emerald-500 animate-pulse" />
        <form onSubmit={handleCommandSubmit} className="flex-1">
            <input 
                ref={inputRef}
                type="text" 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-200 text-sm placeholder-slate-600"
                placeholder="Try /sentinel alerts or /sentinel xray <player>..."
                autoFocus
                autoComplete="off"
            />
        </form>
      </div>
    </div>
  );
};

export default LiveLog;