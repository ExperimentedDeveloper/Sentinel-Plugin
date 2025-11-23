
import React, { useState } from 'react';
import { Shield, LayoutDashboard, Terminal, Users, Settings, Lock, Download, ChevronLeft, Server, RefreshCw, Sliders, AlertOctagon, Microscope, UserSearch, Activity, MessageSquare, Gavel, Bug, BookOpen, HelpCircle, Scale, Globe, Network, HardDrive, Star, ChevronDown, ChevronRight, Command, ShieldCheck, Scan } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  serverName: string;
  onSwitchServer: () => void;
  theme: 'dark' | 'light';
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, serverName, onSwitchServer, theme }) => {
  const isDark = theme === 'dark';
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({ backend: false, frontend: false, support: false });
  const [favorites, setFavorites] = useState<string[]>(['dashboard', 'logs', 'modules']);

  const toggleSection = (sec: string) => {
      setCollapsedSections(prev => ({...prev, [sec]: !prev[sec]}));
  };

  const backendItems = [
    { id: 'backend', label: 'Backend API Monitor', icon: Server },
    { id: 'auditor', label: 'Security Auditor', icon: ShieldCheck },
    { id: 'modules', label: 'Plugin Modules', icon: Shield },
    { id: 'config', label: 'Server Config (YAML)', icon: Lock },
    { id: 'logs', label: 'Server Console', icon: Terminal },
    { id: 'exploits', label: 'Zero-Day Hunter', icon: Bug },
    { id: 'forensics', label: 'Packet Inspector', icon: Microscope },
    { id: 'monitor', label: 'Resource Monitor', icon: Activity },
  ];

  const frontendItems = [
    { id: 'dashboard', label: 'Web Dashboard', icon: LayoutDashboard },
    { id: 'deepscan', label: 'DeepScan (PC)', icon: Scan },
    { id: 'settings', label: 'Client Settings', icon: Sliders },
    { id: 'intel', label: 'Player Intel (OSINT)', icon: UserSearch },
    { id: 'chat', label: 'Chat Guard UI', icon: MessageSquare },
    { id: 'staff', label: 'Staff Operations UI', icon: Gavel },
    { id: 'whitelist', label: 'Bypass Manager', icon: Users },
  ];

  const supportItems = [
      { id: 'docs', label: 'Documentation', icon: BookOpen },
      { id: 'faq', label: 'Help & FAQ', icon: HelpCircle },
      { id: 'legal', label: 'Legal & Terms', icon: Scale },
      { id: 'updates', label: 'Update Center', icon: RefreshCw },
      { id: 'install', label: 'Installation', icon: Download },
  ];

  return (
    <div className={`w-64 border-r flex flex-col h-full relative z-30 shadow-2xl transition-colors duration-300 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className={`p-6 flex items-center space-x-3 border-b ${isDark ? 'border-slate-800/50 bg-slate-900/20' : 'border-slate-100 bg-slate-50'}`}>
        <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur opacity-20 rounded-lg animate-pulse"></div>
            <div className={`p-2 rounded-lg border relative liquid-drop ${isDark ? 'bg-slate-900 border-emerald-500/20' : 'bg-white border-emerald-200'}`}>
                <Shield className="w-6 h-6 text-emerald-500" />
            </div>
        </div>
        <div>
          <h1 className={`font-bold tracking-tight leading-none text-lg ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>SENTINEL</h1>
          <p className="text-[9px] text-emerald-500 font-mono mt-1 tracking-widest uppercase">CyberSecurity</p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        <button 
            onClick={onSwitchServer}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all border hover:shadow-md ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900 border-transparent hover:border-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200'}`}
        >
            <ChevronLeft className="w-3 h-3" />
            Switch Server
        </button>

        {/* QUICK SEARCH / COMMAND PALETTE */}
        <button className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
             <div className="flex items-center gap-2">
                 <Command className="w-3 h-3" />
                 <span>Quick Search...</span>
             </div>
             <span className="text-[9px] border px-1 rounded bg-slate-800/50 border-slate-700">Ctrl K</span>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
        
        {/* FAVORITES */}
        <div className="space-y-1.5">
            <div className="px-4 pb-1 flex items-center gap-2">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Favorites</p>
            </div>
             {favorites.map(id => {
                 const item = [...frontendItems, ...backendItems, ...supportItems].find(i => i.id === id);
                 if (!item) return null;
                 const Icon = item.icon;
                 const isActive = activeTab === item.id;
                 return (
                    <button
                        key={`fav-${item.id}`}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
                            isActive
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                            : isDark ? 'text-slate-400 hover:bg-slate-900' : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="font-medium text-xs">{item.label}</span>
                    </button>
                 )
             })}
        </div>

        {/* FRONTEND SECTION */}
        <div className="space-y-1.5">
            <button onClick={() => toggleSection('frontend')} className="w-full px-4 pb-2 flex items-center justify-between group">
                <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-blue-400" />
                    <p className={`text-[10px] font-bold uppercase tracking-wider group-hover:text-blue-400 transition-colors ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Frontend (Client)</p>
                </div>
                {collapsedSections['frontend'] ? <ChevronRight className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
            </button>
            
            {!collapsedSections['frontend'] && frontendItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                    isActive
                    ? 'bg-blue-500/5 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : isDark 
                        ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
                >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-400' : isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <span className="font-medium text-sm relative z-10">{item.label}</span>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500"></div>}
                </button>
            );
            })}
        </div>

        {/* BACKEND SECTION */}
        <div className="space-y-1.5">
            <button onClick={() => toggleSection('backend')} className="w-full px-4 pb-2 flex items-center justify-between group">
                <div className="flex items-center gap-2">
                    <HardDrive className="w-3 h-3 text-emerald-400" />
                    <p className={`text-[10px] font-bold uppercase tracking-wider group-hover:text-emerald-400 transition-colors ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Backend (Server)</p>
                </div>
                {collapsedSections['backend'] ? <ChevronRight className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
            </button>

            {!collapsedSections['backend'] && backendItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                    isActive
                    ? 'bg-emerald-500/5 text-emerald-600 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : isDark 
                        ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
                >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-500' : isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <span className="font-medium text-sm relative z-10">{item.label}</span>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500"></div>}
                </button>
            );
            })}
        </div>

        {/* SUPPORT SECTION */}
        <div className="space-y-1.5">
             <button onClick={() => toggleSection('support')} className="w-full px-4 pb-2 flex items-center justify-between group">
                 <div className="flex items-center gap-2">
                    <p className={`text-[10px] font-bold uppercase tracking-wider group-hover:text-slate-300 transition-colors ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Knowledge Base</p>
                 </div>
                 {collapsedSections['support'] ? <ChevronRight className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />}
            </button>

            {!collapsedSections['support'] && supportItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : isDark 
                        ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
                >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <span className="font-medium text-sm">{item.label}</span>
                </button>
            );
            })}
        </div>
      </nav>

      <div className={`p-4 border-t space-y-3 ${isDark ? 'border-slate-800/50 bg-slate-900/20' : 'border-slate-100 bg-slate-50'}`}>
        {/* Threat Level Indicator */}
        <div className={`rounded-lg p-3 border flex items-center justify-between shadow-sm ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Threat Level</p>
                <p className="text-xs font-bold text-emerald-500">DEFCON 5 (LOW)</p>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-full animate-pulse">
                <AlertOctagon className="w-4 h-4 text-emerald-500" />
            </div>
        </div>

        <div className={`rounded-lg p-3 border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">System Status</p>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
          </div>
          <div className="flex items-center gap-2 text-emerald-500">
            <Server className="w-3 h-3" />
            <span className="text-xs font-mono font-bold truncate max-w-[120px]">{serverName}</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-500 w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
