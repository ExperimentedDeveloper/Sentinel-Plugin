
import React, { useState, useEffect } from 'react';
import { MessageSquare, Lock, Trash2, Settings, ShieldCheck, AlertTriangle, EyeOff, Brain, Ban, AlignLeft, Percent, Repeat, CheckCircle, FlaskConical } from 'lucide-react';


const ChatGuard: React.FC = () => {
  const [chatLock, setChatLock] = useState(false);
  const [filterLevel, setFilterLevel] = useState<'LOW' | 'MEDIUM' | 'STRICT'>('STRICT');
  const [history, setHistory] = useState(MOCK_CHAT_HISTORY);
  
  // Sandbox State
  const [testMessage, setTestMessage] = useState('');
  const [testResult, setTestResult] = useState<{ blocked: boolean; reason?: string } | null>(null);

  const thresholds = {
      LOW: { caps: '80%', repeat: '5 chars', flood: '2s delay', color: 'text-slate-400' },
      MEDIUM: { caps: '40%', repeat: '3 chars', flood: '4s delay', color: 'text-yellow-400' },
      STRICT: { caps: '15%', repeat: '2 chars', flood: '6s delay', color: 'text-red-400' }
  };

  // Actual Logic definitions
  const limits = {
      LOW: { capsRatio: 0.8, maxRepeats: 5, regex: /(.)\1{5,}/ },
      MEDIUM: { capsRatio: 0.4, maxRepeats: 3, regex: /(.)\1{3,}/ },
      STRICT: { capsRatio: 0.15, maxRepeats: 2, regex: /(.)\1{2,}/ }
  };

  const checkContent = (content: string, level: 'LOW' | 'MEDIUM' | 'STRICT') => {
      const config = limits[level];
      const caps = (content.match(/[A-Z]/g) || []).length;
      const ratio = caps / content.length;
      
      if (content.length > 4 && ratio > config.capsRatio) {
           return { blocked: true, reason: `CAPS (${Math.round(ratio * 100)}%)` };
      }
      
      if (config.regex.test(content)) {
           return { blocked: true, reason: `REPEATS` };
      }
      return { blocked: false };
  };

  // Re-run checks on history when filter level changes
  useEffect(() => {
      setHistory(prevHistory => prevHistory.map(msg => {
          // Preserve manually flagged toxicity or admin messages for realism
          if (msg.sender === 'Admin' || msg.reason?.includes('TOXICITY')) return msg;
          
          const result = checkContent(msg.content, filterLevel);
          return {
              ...msg,
              flagged: result.blocked,
              reason: result.blocked ? `SPAM: ${result.reason}` : undefined
          };
      }));
  }, [filterLevel]);

  // Run sandbox test
  useEffect(() => {
      if (testMessage) {
          setTestResult(checkContent(testMessage, filterLevel));
      } else {
          setTestResult(null);
      }
  }, [testMessage, filterLevel]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value);
      let newLevel: 'LOW' | 'MEDIUM' | 'STRICT' = 'STRICT';
      if (val === 0) newLevel = 'LOW';
      if (val === 1) newLevel = 'MEDIUM';
      if (val === 2) newLevel = 'STRICT';
      
      setFilterLevel(newLevel);
  };

  const getSliderValue = () => {
      if (filterLevel === 'LOW') return 0;
      if (filterLevel === 'MEDIUM') return 1;
      return 2;
  };

  return (
    <div className="h-full flex gap-6 animate-in fade-in duration-500">
        {/* Main Chat Stream */}
        <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                <h2 className="font-bold text-slate-200 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                    Global Chat Stream
                </h2>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setChatLock(!chatLock)}
                        className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors ${chatLock ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <Lock className="w-3 h-3" />
                        {chatLock ? 'CHAT LOCKED' : 'Lock Chat'}
                    </button>
                    <button className="px-3 py-1.5 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded text-xs font-bold flex items-center gap-2 transition-colors border border-transparent hover:border-red-500/20">
                        <Trash2 className="w-3 h-3" />
                        Clear Chat
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-950/50 font-mono text-sm">
                {history.map((msg) => (
                    <div key={msg.id} className={`p-2 rounded border ${msg.flagged ? 'bg-red-500/5 border-red-500/20' : 'border-transparent hover:bg-slate-900'}`}>
                        <div className="flex items-start gap-3">
                             <span className="text-slate-600 text-xs min-w-[60px]">{msg.timestamp}</span>
                             <div className="flex-1">
                                 <span className={`font-bold ${msg.flagged ? 'text-red-400' : 'text-emerald-500'}`}>{msg.sender}: </span>
                                 <span className={msg.flagged ? 'text-slate-400 line-through decoration-red-500/50' : 'text-slate-300'}>{msg.content}</span>
                                 {msg.flagged && (
                                     <div className="mt-1 flex items-center gap-2">
                                         <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                                             <ShieldCheck className="w-3 h-3" /> BLOCKED: {msg.reason}
                                         </span>
                                     </div>
                                 )}
                             </div>
                             <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1" title="Ban Player">
                                 <BanIcon className="w-4 h-4" />
                             </button>
                             <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-purple-400 p-1" title="Shadow Mute">
                                 <EyeOff className="w-4 h-4" />
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Configuration Sidebar */}
        <div className="w-80 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-6">
            <div>
                <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-slate-500" />
                    Filter Settings
                </h3>
                
                <div className="space-y-4">
                    {/* Sentiment AI */}
                    <div className="p-3 bg-slate-950 rounded border border-slate-800">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-purple-400" />
                                Sentiment AI
                            </span>
                            <span className="text-xs text-emerald-500 font-mono">ACTIVE</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">Uses NLP to detect hostility (-1.0 to 1.0).</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">Strict</span>
                            <input type="range" className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                            <span className="text-[10px] text-slate-400">Loose</span>
                        </div>
                    </div>

                    {/* Regex Anti-Spam Slider */}
                    <div className="p-4 bg-slate-950 rounded border border-slate-800">
                         <div className="flex justify-between mb-4">
                            <span className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <AlignLeft className="w-4 h-4 text-blue-400" />
                                Regex Anti-Spam
                            </span>
                            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 ${thresholds[filterLevel].color}`}>
                                {filterLevel}
                            </span>
                        </div>
                        
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold uppercase px-1">
                            <span>Low</span>
                            <span>Strict</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="2" 
                            step="1" 
                            value={getSliderValue()} 
                            onChange={handleSliderChange}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-4"
                        />
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                <Percent className="w-3 h-3 text-slate-500 mx-auto mb-1" />
                                <p className="text-[9px] text-slate-500 uppercase">Caps Max</p>
                                <p className="text-xs font-bold text-slate-300">{thresholds[filterLevel].caps}</p>
                            </div>
                            <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                <Repeat className="w-3 h-3 text-slate-500 mx-auto mb-1" />
                                <p className="text-[9px] text-slate-500 uppercase">Repeats</p>
                                <p className="text-xs font-bold text-slate-300">{thresholds[filterLevel].repeat}</p>
                            </div>
                            <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                <MessageSquare className="w-3 h-3 text-slate-500 mx-auto mb-1" />
                                <p className="text-[9px] text-slate-500 uppercase">Flood</p>
                                <p className="text-xs font-bold text-slate-300">{thresholds[filterLevel].flood}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Filter Sandbox (Logic Test) */}
                    <div className="p-4 bg-slate-950 rounded border border-slate-800">
                        <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-2">
                            <FlaskConical className="w-3 h-3 text-emerald-500" />
                            Filter Sandbox
                        </h4>
                        <input 
                            type="text"
                            value={testMessage}
                            onChange={(e) => setTestMessage(e.target.value)}
                            placeholder="Type to test filter logic..."
                            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 mb-2 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <div className="min-h-[20px]">
                            {testMessage && testResult && (
                                <div className={`text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-left-2 ${testResult.blocked ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {testResult.blocked ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                    {testResult.blocked ? `BLOCKED: ${testResult.reason}` : 'ALLOWED'}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded border border-slate-800">
                         <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <EyeOff className="w-4 h-4 text-slate-400" />
                                Shadow Mute
                            </span>
                            <span className="text-xs text-emerald-500 font-mono">ON</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-1">Toxic messages are hidden from others but visible to the sender.</p>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-4 mt-auto">
                <h4 className="text-yellow-500 font-bold text-sm flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Word Blacklist
                </h4>
                <textarea 
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs font-mono text-slate-300 h-32 focus:outline-none focus:border-yellow-500/50 resize-none"
                    defaultValue={"nigg*\nfag*\ncheat*\nlag\nserver sucks"}
                ></textarea>
                <button className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 rounded text-xs font-bold transition-colors">
                    Update Blacklist
                </button>
            </div>
        </div>
    </div>
  );
};

const BanIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
)

export default ChatGuard;
