
import React, { useState, useEffect, useRef } from 'react';
import { Gavel, MessageSquare, Eye, EyeOff, Shield, Zap, AlertTriangle, CheckCircle, Ghost, Snowflake, Scan, Crosshair, Map, Navigation, Lock, Key, Layers, RefreshCw, History, Archive, Bell, User, Settings, Binary, Wand2, MousePointer2, Compass, Flame, CloudLightning, Box, Grid, Hammer, Ban, Bot } from 'lucide-react';
import { MOCK_STAFF, MOCK_REPORTS, MOCK_SNAPSHOTS } from '../constants';
import { InventorySnapshot } from '../types';

interface StaffMessage {
    id: number;
    sender: string;
    rank: string;
    content: string;
    isDecrypted: boolean;
    cipherText?: string;
    runes?: string; // Cicada 3301 Visuals
    self: boolean;
    channel?: 'GLOBAL' | 'ADMIN' | 'MOD';
}

const RUNES = "ᚠᚢᚦᚨᚱᚲᚺᚾᛁᛃᛋᛏᛒᛖᛗᛚᛜᛞᛟ";

const StaffDashboard: React.FC = () => {
  const [staffMode, setStaffMode] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<StaffMessage[]>([
    { id: 1, sender: 'Owner_Dave', rank: 'OD', content: 'Quantum Link Established.', isDecrypted: true, self: false, channel: 'GLOBAL' },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Tool States
  const [phaseMode, setPhaseMode] = useState(false);
  const [silentTp, setSilentTp] = useState(true);
  const [minerVisor, setMinerVisor] = useState(false);
  const [vanishLevel, setVanishLevel] = useState<'SILENT' | 'TOTAL' | 'GHOST'>('TOTAL');

  // Staff Items State
  const [activeTools, setActiveTools] = useState<string[]>([]);

  // Player Control State
  const [targetPlayer, setTargetPlayer] = useState('');
  const [showRollback, setShowRollback] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Bot Tester State
  const [botActive, setBotActive] = useState(false);
  const [botMode, setBotMode] = useState('KILLAURA');

  // Chat Settings
  const [showChatSettings, setShowChatSettings] = useState(false);
  const [keyRotationInterval, setKeyRotationInterval] = useState(60);
  const [strictSignature, setStrictSignature] = useState(true);
  const [activeChannel, setActiveChannel] = useState<'GLOBAL' | 'ADMIN' | 'MOD'>('GLOBAL');

  // Key Rotation Simulation
  const [keyRotation, setKeyRotation] = useState(0);
  const [sessionHash, setSessionHash] = useState('A1B2-C3D4');

  useEffect(() => {
      const interval = setInterval(() => {
          setKeyRotation(prev => prev + 1);
          // Generate new fake hash to simulate key rotation
          setSessionHash(Math.random().toString(16).substr(2, 4).toUpperCase() + '-' + Math.random().toString(16).substr(2, 4).toUpperCase());
      }, keyRotationInterval * 1000);
      return () => clearInterval(interval);
  }, [keyRotationInterval]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateRandomRunes = (len: number) => {
      let res = '';
      for(let i=0; i<len; i++) res += RUNES.charAt(Math.floor(Math.random() * RUNES.length));
      return res;
  };

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if(!chatInput.trim()) return;

      const originalText = chatInput;
      const runes = generateRandomRunes(originalText.length);
      
      const newMessage: StaffMessage = {
          id: Date.now(),
          sender: 'You',
          rank: 'You',
          content: originalText,
          isDecrypted: false,
          cipherText: runes, // Uses Runes initially
          runes: runes,
          self: true,
          channel: activeChannel
      };

      setMessages(prev => [...prev, newMessage]);
      setChatInput('');

      // Simulate Decryption Delay with Wavefunction Collapse effect
      setTimeout(() => {
          setMessages(prev => prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, isDecrypted: true } : msg
          ));
      }, 1200); // 1.2s decryption time for visual effect
  };

  const showToast = (msg: string) => {
      setFeedback(msg);
      setTimeout(() => setFeedback(null), 3000);
  };

  const handleFreeze = () => {
      if(!targetPlayer) return;
      showToast(`❄️ ${targetPlayer} has been FROZEN. Notification Sent.`);
  };

  const handleTP = () => {
      if(!targetPlayer) return;
      showToast(`🚀 Teleporting to ${targetPlayer} (Silent: ${silentTp ? 'ON' : 'OFF'})...`);
  };

  const handleRollback = (snap: InventorySnapshot) => {
      showToast(`♻️ Restoring Inventory State: ${snap.id} (${snap.timestamp})`);
      setShowRollback(false);
  };

  const toggleTool = (tool: string) => {
      if (activeTools.includes(tool)) {
          setActiveTools(prev => prev.filter(t => t !== tool));
          showToast(`Removed ${tool} from inventory.`);
      } else {
          setActiveTools(prev => [...prev, tool]);
          showToast(`Equipped ${tool}.`);
      }
  };

  const toggleBot = () => {
      setBotActive(!botActive);
      if (!botActive) {
          showToast(`🤖 Spawning Test Bot [Mode: ${botMode}]... Watching for detections.`);
      } else {
          showToast(`🛑 Removed Test Bot.`);
      }
  }

  const executePunishment = (type: string) => {
      if (!targetPlayer) return;
      showToast(`⚖️ Executing ${type} on ${targetPlayer}...`);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500 relative">
        {/* TOAST */}
        {feedback && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2 animate-in slide-in-from-top-2 fade-in">
                <CheckCircle className="w-4 h-4" />
                {feedback}
            </div>
        )}

        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Gavel className="w-6 h-6 text-purple-500" />
                    Staff Operations Center
                </h2>
                <p className="text-slate-500 text-sm">Tactical dashboard for moderators and admins.</p>
            </div>
            
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${staffMode ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
                <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Staff Mode</p>
                    <p className={`text-sm font-bold ${staffMode ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {staffMode ? 'ACTIVE' : 'DISABLED'}
                    </p>
                </div>
                <button 
                    onClick={() => setStaffMode(!staffMode)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${staffMode ? 'bg-emerald-500' : 'bg-slate-600'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${staffMode ? 'left-7' : 'left-1'}`}></div>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* Left: Quick Tools & Player Control */}
            <div className="space-y-4 flex flex-col overflow-hidden">
                
                {/* DIRECT INTERVENTION */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative">
                    <div className="flex justify-between items-start mb-4">
                         <h3 className="font-bold text-slate-300 flex items-center gap-2 text-xs uppercase tracking-wider">
                            <Crosshair className="w-4 h-4 text-red-500" />
                            Direct Intervention
                        </h3>
                    </div>
                    
                    <div className="space-y-3">
                         <div className="relative">
                             <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                             <input 
                                type="text" 
                                placeholder="Target Username..." 
                                value={targetPlayer}
                                onChange={(e) => setTargetPlayer(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-red-500 transition-colors"
                             />
                         </div>

                         <div className="grid grid-cols-2 gap-2">
                             <button 
                                onClick={handleFreeze}
                                disabled={!targetPlayer}
                                className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 py-2 rounded font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                 <Snowflake className="w-3 h-3" /> Freeze
                             </button>
                             <button 
                                onClick={handleTP}
                                disabled={!targetPlayer}
                                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2 rounded font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                 <Navigation className="w-3 h-3" /> Teleport
                             </button>
                         </div>

                         {/* PUNISHMENT MATRIX */}
                         <div className="pt-3 mt-3 border-t border-slate-800">
                             <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Rapid Punishment Matrix</p>
                             <div className="grid grid-cols-3 gap-1">
                                 <button onClick={() => executePunishment('WARN')} disabled={!targetPlayer} className="p-1 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 rounded text-[10px] font-bold disabled:opacity-30">WARN</button>
                                 <button onClick={() => executePunishment('MUTE 1h')} disabled={!targetPlayer} className="p-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/20 rounded text-[10px] font-bold disabled:opacity-30">MUTE 1h</button>
                                 <button onClick={() => executePunishment('KICK')} disabled={!targetPlayer} className="p-1 bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600 rounded text-[10px] font-bold disabled:opacity-30">KICK</button>
                                 <button onClick={() => executePunishment('BAN 1d')} disabled={!targetPlayer} className="p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded text-[10px] font-bold disabled:opacity-30">BAN 1d</button>
                                 <button onClick={() => executePunishment('BAN 30d')} disabled={!targetPlayer} className="p-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/20 rounded text-[10px] font-bold disabled:opacity-30">BAN 30d</button>
                                 <button onClick={() => executePunishment('PERM BAN')} disabled={!targetPlayer} className="p-1 bg-red-900/20 hover:bg-red-900/40 text-red-600 border border-red-900/40 rounded text-[10px] font-bold disabled:opacity-30 flex items-center justify-center"><Ban className="w-3 h-3" /></button>
                             </div>
                         </div>
                    </div>
                </div>

                {/* BOT SPAWNER (SPARTAN FEATURE) */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex-1">
                    <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
                        <Bot className="w-4 h-4 text-yellow-500" />
                        Test Bot Spawner
                    </h3>
                    <div className="p-3 bg-slate-950 rounded border border-slate-800 mb-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-400 font-bold">Hack Mode</span>
                            <select 
                                value={botMode}
                                onChange={(e) => setBotMode(e.target.value)}
                                className="bg-slate-900 border border-slate-700 text-[10px] rounded px-2 py-1 text-slate-200 outline-none"
                            >
                                <option value="KILLAURA">KillAura (Rotation)</option>
                                <option value="FLY">Fly (Velocity)</option>
                                <option value="REACH">Reach (3.5 Blocks)</option>
                                <option value="SPEED">Speed (B-Hop)</option>
                            </select>
                        </div>
                        <p className="text-[9px] text-slate-500">Spawns an NPC to trigger specific checks.</p>
                    </div>
                    <button 
                        onClick={toggleBot}
                        className={`w-full py-2 rounded font-bold text-xs flex items-center justify-center gap-2 transition-colors ${botActive ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
                    >
                        <Bot className="w-3 h-3" />
                        {botActive ? 'DESPAWN BOT' : 'SPAWN HACKER BOT'}
                    </button>
                </div>
            </div>

            {/* Middle: Staff Chat */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden relative">
                {/* Simplified chat code for brevity - same as before */}
                <div className="p-4 border-b border-slate-800 bg-purple-500/5 flex justify-between items-center">
                     <h3 className="font-bold text-purple-200 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Quantum Secured Chat
                    </h3>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50 relative z-10 scrollbar-thin scrollbar-thumb-purple-900">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.self ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="w-8 h-8 rounded border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs bg-purple-900/20">
                                {msg.rank}
                            </div>
                            <div className="max-w-[80%]">
                                <p className="text-xs text-purple-300 font-bold mb-1">{msg.sender}</p>
                                <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs">
                                    {msg.isDecrypted ? msg.content : msg.runes}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-3 bg-slate-900 border-t border-slate-800">
                    <form onSubmit={handleSend}>
                        <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Broadcast Secure Message..."
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
                        />
                    </form>
                </div>
            </div>

            {/* Right: Staff Items */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                <div>
                    <h3 className="font-bold text-slate-300 mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                        <Archive className="w-4 h-4 text-yellow-500" />
                        Staff Loadout
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                         <button onClick={() => toggleTool('Freeze Gun')} className={`p-2 border rounded flex items-center gap-2 transition-colors ${activeTools.includes('Freeze Gun') ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                             <Flame className="w-4 h-4" />
                             <span className="text-xs font-bold">Freeze Gun</span>
                         </button>
                         <button onClick={() => toggleTool('WorldEdit Wand')} className={`p-2 border rounded flex items-center gap-2 transition-colors ${activeTools.includes('WorldEdit Wand') ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                             <Wand2 className="w-4 h-4" />
                             <span className="text-xs font-bold">Visualizer</span>
                         </button>
                         <button onClick={() => toggleTool('Thru Compass')} className={`p-2 border rounded flex items-center gap-2 transition-colors ${activeTools.includes('Thru Compass') ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                             <Compass className="w-4 h-4" />
                             <span className="text-xs font-bold">Thru Walls</span>
                         </button>
                         <button onClick={() => toggleTool('CPS Counter')} className={`p-2 border rounded flex items-center gap-2 transition-colors ${activeTools.includes('CPS Counter') ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                             <MousePointer2 className="w-4 h-4" />
                             <span className="text-xs font-bold">CPS Check</span>
                         </button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3">
                    {MOCK_REPORTS.map((report, i) => (
                        <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-red-500/30 transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                                    {report.reason}
                                </span>
                                <span className="text-[10px] text-slate-500">{report.timestamp}</span>
                            </div>
                            <p className="text-sm text-slate-300 mb-1">
                                <span className="text-red-400 font-bold">{report.suspect}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default StaffDashboard;
