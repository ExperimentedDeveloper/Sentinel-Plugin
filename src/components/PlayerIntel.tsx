
import React, { useState } from 'react';
import { Search, User, ShieldAlert, MapPin, Globe, Ban, Box, Users, FileText, CheckCircle, Link, RefreshCw, Trash2, Copy, Check } from 'lucide-react';
import { MOCK_PLAYER_PROFILE } from '../constants';

const PlayerIntel: React.FC = () => {
  const [search, setSearch] = useState('');
  const [profile, setProfile] = useState(MOCK_PLAYER_PROFILE);
  
  // Linking State
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleUnlink = () => {
      if (confirm('Are you sure you want to unlink this Discord account? This will remove "Subscriber" roles in-game.')) {
        setProfile(prev => ({ ...prev, discord: undefined }));
      }
  };

  const generateToken = () => {
      setIsGeneratingLink(true);
      // Simulate API call
      setTimeout(() => {
          setLinkToken(`LINK-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`);
          setIsGeneratingLink(false);
      }, 600);
  };

  const copyToken = () => {
      if (linkToken) {
          navigator.clipboard.writeText(`/link ${linkToken}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      }
  };

  // Simulate a user completing the link
  const simulateUserLink = () => {
      setLinkToken(null);
      setProfile(prev => ({
          ...prev,
          discord: {
              tag: 'LinkedUser#8821',
              id: '999888777666',
              linkedDate: new Date().toISOString().split('T')[0]
          }
      }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
        <div className="flex items-center justify-between">
             <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <User className="w-6 h-6 text-emerald-500" />
                    Player Intelligence (OSINT)
                </h2>
                <p className="text-slate-500 text-sm">View live inventories, alt accounts, and trust scores.</p>
             </div>
             <div className="bg-slate-900 border border-slate-800 rounded-lg flex items-center px-3 py-2 w-64">
                <Search className="w-4 h-4 text-slate-500 mr-2" />
                <input 
                    type="text" 
                    placeholder="Search Player/UUID..." 
                    className="bg-transparent outline-none text-sm text-slate-300 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
            {/* Left: Profile Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-6">
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-slate-950 rounded-lg border-2 border-slate-800 relative mb-4 group overflow-hidden">
                         {/* Placeholder for skin render */}
                         <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600 text-xs font-mono">
                             SKIN RENDER
                         </div>
                         <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-1 font-bold">
                             {profile.username}
                         </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{profile.username}</h3>
                    <p className="text-xs font-mono text-slate-500 mb-4">{profile.uuid}</p>
                    
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                        <ShieldAlert className="w-3 h-3 text-red-500" />
                        <span className="text-xs font-bold text-red-400">Risk Score: 88/100</span>
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between p-3 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-500 flex items-center gap-2"><MapPin className="w-3 h-3" /> IP Address</span>
                        <span className="text-slate-300 font-mono blur-sm hover:blur-0 transition-all cursor-help">{profile.ip}</span>
                    </div>
                     <div className="flex justify-between p-3 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-500 flex items-center gap-2"><Globe className="w-3 h-3" /> Country</span>
                        <span className="text-slate-300">{profile.country}</span>
                    </div>
                    
                    {/* DISCORD LINKING SECTION */}
                     <div className={`p-3 rounded border transition-all ${profile.discord ? 'bg-[#5865F2]/10 border-[#5865F2]/20' : 'bg-slate-950 border-slate-800'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <span className={`font-bold flex items-center gap-2 ${profile.discord ? 'text-[#5865F2]' : 'text-slate-400'}`}>
                                Discord Identity
                            </span>
                            {profile.discord ? (
                                <button 
                                    onClick={handleUnlink}
                                    className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors" 
                                    title="Unlink Account"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            ) : (
                                <span className="text-[10px] bg-slate-800 text-slate-500 px-1.5 rounded">UNLINKED</span>
                            )}
                        </div>
                        
                        {profile.discord ? (
                             <div className="text-right">
                                <span className="text-slate-200 block text-xs font-bold">{profile.discord.tag}</span>
                                <span className="text-[#5865F2] text-[10px]">ID: {profile.discord.id}</span>
                                <div className="mt-1 text-[9px] text-slate-500">Linked: {profile.discord.linkedDate}</div>
                            </div>
                        ) : (
                            <div className="mt-2">
                                {linkToken ? (
                                    <div className="space-y-2 animate-in zoom-in-95">
                                        <div className="bg-slate-900 p-2 rounded border border-dashed border-slate-700 flex justify-between items-center group">
                                            <code className="text-xs text-emerald-400 font-mono">{linkToken}</code>
                                            <button onClick={copyToken} className="text-slate-500 hover:text-white">
                                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                            </button>
                                        </div>
                                        <p className="text-[9px] text-slate-500 text-center">
                                            Ask player to run <span className="text-slate-300 font-mono">/link {linkToken}</span>
                                        </p>
                                        <button 
                                            onClick={simulateUserLink} 
                                            className="w-full text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-400 py-1 rounded"
                                        >
                                            [DEBUG] Simulate User Input
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={generateToken}
                                        disabled={isGeneratingLink}
                                        className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors"
                                    >
                                        {isGeneratingLink ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Link className="w-3 h-3" />}
                                        Generate Link Token
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto space-y-2">
                    <button className="w-full bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 py-2 rounded font-bold text-sm transition-colors flex items-center justify-center gap-2">
                        <Ban className="w-4 h-4" />
                        Ban Player
                    </button>
                    <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded font-bold text-sm transition-colors">
                        Freeze
                    </button>
                </div>
            </div>

            {/* Middle: Inventory & Effects */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col">
                <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                    <Box className="w-4 h-4 text-emerald-500" />
                    Live Inventory
                </h3>
                
                {/* Inventory Grid Simulation */}
                <div className="grid grid-cols-9 gap-1 mb-6 p-4 bg-slate-950 rounded-lg border border-slate-800">
                    {Array.from({ length: 27 }).map((_, i) => { // Main Inv
                        const item = profile.inventory.find(x => x.slot === i + 9); // Offset for hotbar logic
                        return (
                            <div key={i} className={`aspect-square bg-slate-900 border ${item ? 'border-emerald-500/50' : 'border-slate-800'} rounded flex items-center justify-center relative group cursor-pointer hover:bg-slate-800`}>
                                {item && (
                                    <>
                                        <div className={`w-4 h-4 ${item.enchanted ? 'bg-purple-500 animate-pulse' : 'bg-emerald-600'} rounded-sm shadow-[0_0_5px_currentColor]`}></div>
                                        <span className="absolute bottom-0 right-0.5 text-[8px] font-bold text-white drop-shadow-md">{item.count}</span>
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black/90 text-white text-[9px] p-1 rounded z-50 whitespace-nowrap border border-slate-700">
                                            {item.item}
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                    {/* Hotbar Divider */}
                    <div className="col-span-9 h-2"></div>
                     {Array.from({ length: 9 }).map((_, i) => {
                        const item = profile.inventory.find(x => x.slot === i);
                        return (
                             <div key={i} className={`aspect-square bg-slate-900 border ${item ? 'border-emerald-500/50' : 'border-slate-800'} rounded flex items-center justify-center relative group cursor-pointer hover:bg-slate-800`}>
                                {item && (
                                    <>
                                        <div className={`w-4 h-4 ${item.enchanted ? 'bg-purple-500 animate-pulse' : 'bg-emerald-600'} rounded-sm shadow-[0_0_5px_currentColor]`}></div>
                                        <span className="absolute bottom-0 right-0.5 text-[8px] font-bold text-white drop-shadow-md">{item.count}</span>
                                    </>
                                )}
                            </div>
                        )
                     })}
                </div>

                <h3 className="font-bold text-slate-200 mb-2 text-sm">Active Potions</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.activeEffects.map((effect, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                            {effect}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right: Alts & History */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col">
                {/* ALT ACCOUNTS */}
                 <h3 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    Detected Alt Accounts (HWID)
                </h3>
                <div className="max-h-32 overflow-y-auto space-y-2 bg-slate-950 rounded-lg p-2 border border-slate-800 mb-6">
                    {profile.alts.map((alt, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800 hover:border-slate-600 transition-colors">
                             <div className="flex items-center gap-2">
                                 <div className={`w-2 h-2 rounded-full ${alt.banned ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                                 <span className={`text-sm font-medium ${alt.banned ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{alt.username}</span>
                             </div>
                             {alt.risk === 'HIGH' && (
                                 <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 text-[9px] font-bold border border-red-500/20 rounded uppercase">High Risk</span>
                             )}
                        </div>
                    ))}
                </div>
                
                {/* CASE HISTORY */}
                <h3 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-yellow-500" />
                    Problematic User History (YAML)
                </h3>
                <div className="flex-1 overflow-y-auto space-y-2 bg-slate-950 rounded-lg p-2 border border-slate-800">
                    {profile.cases.map((c, i) => (
                        <div key={i} className="p-2 bg-slate-900 rounded border border-slate-800">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] text-slate-500 font-mono">#{c.id} • {c.date}</span>
                                <span className={`text-[9px] font-bold px-1.5 rounded ${c.severity === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {c.severity}
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 italic mb-1">"{c.note}"</p>
                            <div className="flex items-center gap-1 text-[9px] text-slate-500">
                                <CheckCircle className="w-3 h-3" />
                                Filed by {c.staff}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PlayerIntel;
