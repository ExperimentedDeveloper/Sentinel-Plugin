
import React, { useState } from 'react';
import { Bell, Shield, Save, RefreshCw, Trash2, Globe, Smartphone, AlertTriangle, Fingerprint, Cpu, Database, Moon, Sun, Code, HardDrive, Link, Check, Lock, FileKey, Languages, Binary, Zap, Eye, Sparkles } from 'lucide-react';

interface SettingsProps {
    theme?: 'dark' | 'light';
    setTheme?: (theme: 'dark' | 'light') => void;
}

const Settings: React.FC<SettingsProps> = ({ theme = 'dark', setTheme }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [encryptionMode, setEncryptionMode] = useState('AES256');
  const [zenMode, setZenMode] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'general':
        return <GeneralSettings theme={theme} setTheme={setTheme} zenMode={zenMode} setZenMode={setZenMode} />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings encryptionMode={encryptionMode} setEncryptionMode={setEncryptionMode} />;
      case 'data':
        return <DataSettings />;
      case 'performance':
        return <PerformanceSettings />;
      case 'api':
        return <APISettings />;
      default:
        return <GeneralSettings theme={theme} setTheme={setTheme} zenMode={zenMode} setZenMode={setZenMode} />;
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="animate-in fade-in duration-500 flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)]">
      {/* Settings Navigation Sidebar */}
      <div className="w-full lg:w-64 shrink-0 space-y-2">
        <h2 className={`text-xl font-bold mb-6 px-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Panel Settings</h2>
        
        <NavButton id="general" label="General & Localization" icon={Languages} active={activeSection} set={setActiveSection} isDark={isDark} />
        <NavButton id="security" label="Quantum Cryptography" icon={Binary} active={activeSection} set={setActiveSection} isDark={isDark} />
        <NavButton id="notifications" label="Alerts & Webhooks" icon={Bell} active={activeSection} set={setActiveSection} isDark={isDark} />
        <NavButton id="performance" label="Performance Tuning" icon={Cpu} active={activeSection} set={setActiveSection} isDark={isDark} />
        <NavButton id="api" label="API Integrations" icon={Code} active={activeSection} set={setActiveSection} isDark={isDark} />
        <NavButton id="data" label="Backup & Maintenance" icon={HardDrive} active={activeSection} set={setActiveSection} isDark={isDark} />

        <div className="pt-8 px-2">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-bold text-xs uppercase">Panic Mode</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-3">Instantly lockdown the server. Whitelisted IPs only.</p>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded transition-colors shadow-lg shadow-red-900/20">
                    TRIGGER LOCKDOWN
                </button>
            </div>
        </div>
      </div>

      {/* Main Settings Content */}
      <div className={`flex-1 border rounded-xl overflow-hidden flex flex-col shadow-lg ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex-1 overflow-y-auto p-8">
            {renderSection()}
        </div>
        <div className={`p-4 border-t flex justify-end gap-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <button className={`px-4 py-2 text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Discard Changes</button>
            <button 
                onClick={handleSave}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
            >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Encrypting & Saving...' : 'Save Configuration'}
            </button>
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ id, label, icon: Icon, active, set, isDark }: any) => (
    <button
        onClick={() => set(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
            active === id 
            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
            : isDark 
                ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
        }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

/* --- SUB SECTIONS --- */

const GeneralSettings = ({ theme, setTheme, zenMode, setZenMode }: any) => {
    const languages = [
        { code: "en_US", name: "English (US)" },
        { code: "es_ES", name: "Español (España)" },
        { code: "de_DE", name: "Deutsch (Deutschland)" },
        { code: "fr_FR", name: "Français (France)" },
        { code: "it_IT", name: "Italiano (Italia)" },
        { code: "pt_BR", name: "Português (Brasil)" },
        { code: "ru_RU", name: "Русский (Россия)" },
        { code: "zh_CN", name: "中文 (Simplified)" },
        { code: "ja_JP", name: "日本語 (Japan)" },
        { code: "ko_KR", name: "한국어 (Korea)" },
        { code: "tr_TR", name: "Türkçe (Turkey)" },
        { code: "pl_PL", name: "Polski (Poland)" },
        { code: "nl_NL", name: "Nederlands (Netherlands)" },
        { code: "sv_SE", name: "Svenska (Sweden)" },
        { code: "ar_SA", name: "العربية (Arabia)" },
        { code: "hi_IN", name: "हिन्दी (India)" },
        { code: "vi_VN", name: "Tiếng Việt (Vietnam)" }
    ];

    return (
    <div className="space-y-8">
        <div>
            <h3 className="text-lg font-bold mb-1">Global Localization (Multi-Lang)</h3>
            <p className="text-sm text-slate-500 mb-4">Select the plugin's output language. Updates <code>messages.yml</code> instantly.</p>
            
            <div className="bg-slate-950/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Globe className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                         <label className="text-xs font-bold text-slate-400 uppercase">Active Language</label>
                         <div className="relative mt-1">
                             <select className="w-64 bg-slate-900 border border-slate-700 rounded px-3 py-2 focus:border-emerald-500 outline-none appearance-none text-slate-200 font-mono text-sm">
                                {languages.map(lang => <option key={lang.code} value={lang.code}>[{lang.code}] {lang.name}</option>)}
                            </select>
                            <div className="absolute right-3 top-2.5 pointer-events-none">
                                <Languages className="w-4 h-4 text-slate-500" />
                            </div>
                         </div>
                    </div>
                </div>
                <p className="text-xs text-slate-500 italic border-t border-slate-800 pt-3">
                    *Changing this will automatically reload the message cache on all proxy nodes.
                </p>
            </div>
        </div>

        <div className="pt-6 border-t border-slate-800/50">
            <h3 className="text-lg font-bold mb-1">Appearance & Visuals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Alert Sound</label>
                    <select className="w-full bg-slate-950/50 border border-slate-700/50 rounded px-3 py-2 focus:border-emerald-500 outline-none text-slate-300">
                        <option>BLOCK_NOTE_BLOCK_BASS</option>
                        <option>ENTITY_WITHER_SPAWN</option>
                        <option>CICADA_3301_CHIRP</option>
                    </select>
                </div>
                <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-400 uppercase">Theme Mode</label>
                     <div className="flex bg-slate-950/50 border border-slate-700/50 rounded p-1">
                         <button 
                            onClick={() => setTheme && setTheme('dark')}
                            className={`flex-1 flex items-center justify-center gap-2 py-1 rounded text-xs font-bold transition-colors ${theme === 'dark' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                         >
                             <Moon className="w-3 h-3" /> Dark
                         </button>
                         <button 
                             onClick={() => setTheme && setTheme('light')}
                             className={`flex-1 flex items-center justify-center gap-2 py-1 rounded text-xs font-bold transition-colors ${theme === 'light' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-300'}`}
                         >
                             <Sun className="w-3 h-3" /> Light
                         </button>
                     </div>
                </div>
                <div className="space-y-2">
                     <div className="flex justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase">Zen Mode</label>
                        <span className={`text-[9px] font-bold uppercase ${zenMode ? 'text-emerald-500' : 'text-slate-500'}`}>{zenMode ? 'Enabled' : 'Disabled'}</span>
                     </div>
                     <button 
                        onClick={() => setZenMode(!zenMode)}
                        className={`w-full p-2 rounded border transition-all flex items-center justify-center gap-2 ${zenMode ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}
                     >
                         <Eye className="w-4 h-4" />
                         Focus View
                     </button>
                </div>
                 <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-400 uppercase">Visual FX</label>
                     <button className="w-full p-2 rounded border bg-purple-500/10 border-purple-500/30 text-purple-500 flex items-center justify-center gap-2">
                         <Sparkles className="w-4 h-4" />
                         Cosmic Dust Particles
                     </button>
                </div>
            </div>
        </div>
    </div>
)};

const NotificationSettings = () => {
    return (
    <div className="space-y-8">
         <div>
            <h3 className="text-lg font-bold mb-1">Discord Integration</h3>
            <p className="text-sm text-slate-500 mb-4">Configure Webhooks and OAuth2 for player linking.</p>
            
            <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Webhook URL (Alerts)</label>
                    <input type="password" placeholder="https://discord.com/api/webhooks/..." className="w-full bg-slate-950/50 border border-slate-700/50 rounded px-3 py-2 focus:border-emerald-500 outline-none text-slate-300" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Toggle label="Alert on Bans" defaultChecked />
                    <Toggle label="Alert on DDoS" defaultChecked />
                    <Toggle label="Sync Roles" description="Sync VIP/Staff roles in-game." defaultChecked />
                </div>
            </div>
        </div>
    </div>
    );
};

const SecuritySettings = ({ encryptionMode, setEncryptionMode }: any) => (
    <div className="space-y-8">
        <div className={`border p-6 rounded-lg relative overflow-hidden group transition-all duration-500 ${encryptionMode === 'CICADA' ? 'bg-slate-950 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-slate-900 border-slate-700'}`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
            {encryptionMode === 'CICADA' && <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-all animate-pulse"></div>}
            
            <div className="flex justify-between items-center relative z-10">
                <div>
                    <h3 className={`font-bold flex items-center gap-2 text-lg ${encryptionMode === 'CICADA' ? 'text-emerald-400' : 'text-slate-200'}`}>
                        <Binary className="w-6 h-6" />
                        Post-Quantum Lattice
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-lg">
                        Enables <strong>Kyber-1024 (NIST PQC)</strong> encryption. 
                        Simulates <span className="font-mono text-emerald-500">Liber Primus</span> prime sieves for key generation.
                        Homomorphic analysis allows threat detection on encrypted memory.
                    </p>
                </div>
                <div className="text-right">
                    <button 
                        onClick={() => setEncryptionMode(encryptionMode === 'CICADA' ? 'AES256' : 'CICADA')}
                        className={`text-xs px-3 py-1.5 rounded border font-bold uppercase tracking-wider transition-all ${encryptionMode === 'CICADA' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-800 text-slate-400 border-slate-600'}`}
                    >
                        {encryptionMode === 'CICADA' ? 'QUANTUM STATE: ACTIVE' : 'STANDARD AES-256'}
                    </button>
                </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
                 <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                     <span className="text-xs font-mono text-slate-400">Algorithm: Kyber-1024</span>
                     <Check className={`w-4 h-4 ${encryptionMode === 'CICADA' ? 'text-emerald-500' : 'text-slate-600'}`} />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                     <span className="text-xs font-mono text-slate-400">Riemann Zeta Seed</span>
                     <Check className={`w-4 h-4 ${encryptionMode === 'CICADA' ? 'text-emerald-500' : 'text-slate-600'}`} />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                     <span className="text-xs font-mono text-slate-400">Lattice Trapdoor</span>
                     <Check className={`w-4 h-4 ${encryptionMode === 'CICADA' ? 'text-emerald-500' : 'text-slate-600'}`} />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                     <span className="text-xs font-mono text-slate-400">Homomorphic RAM</span>
                     <Check className={`w-4 h-4 ${encryptionMode === 'CICADA' ? 'text-emerald-500' : 'text-slate-600'}`} />
                 </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-bold mb-4">Access Control (ZKP)</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <Fingerprint className="w-5 h-5 text-slate-400" />
                        <div>
                            <p className="font-bold text-sm">Zero-Knowledge Proof Login</p>
                            <p className="text-xs text-slate-500">Prove identity without transmitting password hash (Schnorr Protocol).</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-emerald-500 font-bold">ACTIVE</span>
                        <Toggle defaultChecked />
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <FileKey className="w-5 h-5 text-slate-400" />
                        <div>
                            <p className="font-bold text-sm">Strict HSTS / HTTPS</p>
                            <p className="text-xs text-slate-500">Force TLS 1.3 with forward secrecy.</p>
                        </div>
                    </div>
                    <Toggle defaultChecked />
                </div>
            </div>
        </div>
    </div>
);

const PerformanceSettings = () => (
    <div className="space-y-8">
        <div>
            <h3 className="text-lg font-bold mb-4">Thread Optimization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/30 border border-slate-800/50 rounded-lg">
                     <div className="flex justify-between mb-2">
                         <label className="text-sm font-bold">Async Packet Processing</label>
                         <span className="text-xs text-emerald-500 font-mono">ENABLED</span>
                     </div>
                     <p className="text-xs text-slate-500 mb-3">Offloads packet checks to netty threads.</p>
                     <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>
        </div>
    </div>
);

const DataSettings = () => (
    <div className="space-y-8">
         <div>
            <h3 className="text-lg font-bold mb-4">Database Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/30 border border-slate-800/50 rounded-lg">
                    <h4 className="font-bold mb-1">Log Retention</h4>
                    <p className="text-xs text-slate-500 mb-4">Automatically delete old logs to save space.</p>
                    <select className="w-full bg-slate-900/50 border border-slate-700/50 rounded px-3 py-2 text-sm outline-none text-slate-300">
                        <option>30 Days</option>
                        <option>60 Days</option>
                        <option>90 Days</option>
                        <option>Forever (Not Recommended)</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
);

const APISettings = () => (
    <div className="space-y-6">
        <div className="p-4 bg-slate-950/30 border border-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded">
                    <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <h4 className="font-bold">CloudFlare API</h4>
                    <p className="text-xs text-slate-500">Sync IP bans with CloudFlare Firewall.</p>
                </div>
            </div>
             <input type="password" placeholder="CF_API_KEY_..." className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs" />
        </div>
    </div>
);

const Toggle = ({ label, description, defaultChecked }: any) => {
    const [checked, setChecked] = useState(defaultChecked || false);
    return (
        <div className="flex items-center justify-between p-3 bg-slate-950/30 border border-slate-800/50 rounded-lg">
            <div>
                <p className="text-sm font-bold text-slate-300">{label}</p>
                {description && <p className="text-[10px] text-slate-500">{description}</p>}
            </div>
            <button 
                onClick={() => setChecked(!checked)}
                className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-emerald-600' : 'bg-slate-700'}`}
            >
                <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${checked ? 'left-6' : 'left-1'}`}></div>
            </button>
        </div>
    )
};

export default Settings;
