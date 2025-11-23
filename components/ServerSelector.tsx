
import React, { useState } from 'react';
import { Server, Plus, LogOut, Copy, Check, Terminal, Shield } from 'lucide-react';

interface ServerSelectorProps {
  user: { username: string, email: string } | null;
  onSelectServer: (server: { id: string, name: string, key: string }) => void;
  onLogout: () => void;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ user, onSelectServer, onLogout }) => {
  const [servers, setServers] = useState([
    { id: 'SRV-9921', name: 'Survival Main', key: 'SENTINEL-88A2-BB91-MAIN' },
    { id: 'SRV-4421', name: 'BoxPvP Arena', key: 'SENTINEL-77B3-CC02-PVP' }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newServerName, setNewServerName] = useState('');
  const [justCopied, setJustCopied] = useState(false);

  const handleAddServer = (e: React.FormEvent) => {
    e.preventDefault();
    const newKey = `SENTINEL-${Math.random().toString(16).substr(2, 4).toUpperCase()}-${Math.random().toString(16).substr(2, 4).toUpperCase()}`;
    setServers([...servers, { id: `SRV-${Math.floor(Math.random()*9000)}`, name: newServerName, key: newKey }]);
    setNewServerName('');
    setShowAddModal(false);
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-100">Welcome, {user?.username}</h1>
                <p className="text-slate-500">Select a server to manage its security.</p>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm">
                <LogOut className="w-4 h-4" /> Logout
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Existing Servers */}
            {servers.map((server) => (
                <div key={server.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                        <Server className="w-24 h-24 text-emerald-500" />
                     </div>
                     <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-emerald-500/10 rounded-lg">
                                <Server className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">
                                {server.id}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-200 mb-1">{server.name}</h3>
                        <div className="flex items-center gap-2 text-emerald-400 text-sm mb-6">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            Protected
                        </div>

                        <div className="space-y-2">
                            <button 
                                onClick={() => onSelectServer(server)}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition-colors"
                            >
                                Manage Dashboard
                            </button>
                            
                            <div className="bg-slate-950 border border-slate-800 rounded p-2 flex justify-between items-center group/key">
                                <div className="font-mono text-xs text-slate-500 truncate px-1">
                                    Key: <span className="blur-[2px] group-hover/key:blur-0 transition-all">{server.key}</span>
                                </div>
                                <button 
                                    onClick={() => copyToClipboard(server.key)}
                                    className="text-slate-400 hover:text-white p-1" 
                                    title="Copy License Key"
                                >
                                    {justCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                </button>
                            </div>
                        </div>
                     </div>
                </div>
            ))}

            {/* Add New Server Button */}
            <button 
                onClick={() => {
                    setNewServerName('New Server');
                    setShowAddModal(true);
                }}
                className="bg-slate-900/50 border border-slate-800 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-900 hover:border-emerald-500/30 transition-all text-slate-500 hover:text-emerald-400 min-h-[280px]"
            >
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                </div>
                <span className="font-bold">Add New Server</span>
            </button>
        </div>
      </div>

      {/* Add Server Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                    <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        Link New Server
                    </h3>
                    <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-white">✕</button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Server Name</label>
                        <input 
                            type="text" 
                            value={newServerName}
                            onChange={(e) => setNewServerName(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="e.g. Skyblock Alpha"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                            autoFocus
                        />
                    </div>

                    <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                            <Terminal className="w-4 h-4" />
                            How to Link
                        </h4>
                        <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
                            <li>Create the server here to generate a <strong>License Key</strong>.</li>
                            <li>Download the plugin and put it in your <code>/plugins</code> folder.</li>
                            <li>Open <code>config.yml</code> and paste the key in <code>license_key</code>.</li>
                            <li>Restart your server. It will appear as "Online".</li>
                        </ol>
                    </div>

                    <button 
                        onClick={handleAddServer}
                        disabled={!newServerName || newServerName === 'New Server'}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Generate Key & Create
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ServerSelector;
