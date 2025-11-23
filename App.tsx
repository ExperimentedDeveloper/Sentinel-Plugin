
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import SecurityModules from './components/SecurityModules';
import WhitelistManager from './components/WhitelistManager';
import LiveLog from './components/LiveLog';
import ConfigEditor from './components/ConfigEditor';
import Deployment from './components/Deployment';
import Auth from './components/Auth';
import ServerSelector from './components/ServerSelector';
import Settings from './components/Settings';
import Updates from './components/Updates';
import PacketInspector from './components/PacketInspector';
import PlayerIntel from './components/PlayerIntel';
import SystemMonitor from './components/SystemMonitor';
import StaffDashboard from './components/StaffDashboard';
import ChatGuard from './components/ChatGuard';
import VulnerabilityScanner from './components/VulnerabilityScanner';
import Documentation from './components/Documentation';
import FAQ from './components/FAQ';
import Legal from './components/Legal';
import BackendMonitor from './components/BackendMonitor';
import SecurityAuditor from './components/SecurityAuditor';
import SentinelChatbot from './components/SentinelChatbot';
import PCScanner from './components/PCScanner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{username: string, email: string} | null>(null);
  const [selectedServer, setSelectedServer] = useState<{id: string, name: string, key: string} | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Update body class for global scrollbar styles
  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.remove('liquid-light-bg', 'text-slate-800');
        body.classList.add('bg-slate-950', 'text-slate-200');
    } else {
        body.classList.remove('bg-slate-950', 'text-slate-200');
        body.classList.add('liquid-light-bg', 'text-slate-800');
    }
  }, [theme]);

  const handleLogin = (user: {username: string, email: string}) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSelectedServer(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats theme={theme} />;
      case 'backend':
        return <BackendMonitor theme={theme} />;
      case 'modules':
        return <SecurityModules theme={theme} />;
      case 'auditor':
        return <SecurityAuditor />;
      case 'exploits':
        return <VulnerabilityScanner />;
      case 'forensics':
        return <PacketInspector />;
      case 'intel':
        return <PlayerIntel />;
      case 'monitor':
        return <SystemMonitor />;
      case 'chat':
        return <ChatGuard />;
      case 'staff':
        return <StaffDashboard />;
      case 'whitelist':
        return <WhitelistManager />;
      case 'logs':
        return <LiveLog />;
      case 'config':
        return <ConfigEditor serverName={selectedServer?.name || 'Global'} theme={theme} />;
      case 'install':
        return <Deployment />;
      case 'settings':
        return <Settings theme={theme} setTheme={setTheme} />;
      case 'updates':
        return <Updates />;
      case 'docs':
        return <Documentation />;
      case 'faq':
        return <FAQ />;
      case 'legal':
        return <Legal />;
      case 'deepscan':
        return <PCScanner />;
      default:
        return <DashboardStats theme={theme} />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  if (!selectedServer) {
    return <ServerSelector user={currentUser} onSelectServer={setSelectedServer} onLogout={handleLogout} />;
  }

  return (
    <div className={`flex h-screen overflow-hidden font-sans ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'liquid-light-bg text-slate-800'}`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        serverName={selectedServer.name}
        onSwitchServer={() => setSelectedServer(null)}
        theme={theme}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className={`h-16 border-b flex items-center justify-between px-6 shrink-0 z-20 ${theme === 'dark' ? 'bg-slate-950/80 border-slate-800 backdrop-blur' : 'bg-white/80 border-slate-200 backdrop-blur'}`}>
          <h2 className="text-lg font-bold tracking-tight">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="flex items-center gap-4">
             <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-100 text-emerald-600 border border-emerald-200'}`}>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                System Optimal
             </div>
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                 {currentUser?.username.charAt(0).toUpperCase()}
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 relative z-10">
          {renderContent()}
        </div>

        {/* Floating AI Chatbot */}
        <SentinelChatbot />
      </main>
    </div>
  );
}
