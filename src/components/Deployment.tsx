import React, { useState } from 'react';
import { Download, Server, Layers, Globe, ShieldCheck, Box } from 'lucide-react';

const Deployment: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('paper');
  const [version, setVersion] = useState('1.20.4');

  const platforms = [
    { id: 'paper', name: 'PaperMC', icon: Layers, desc: 'High performance 1.20+' },
    { id: 'spigot', name: 'Spigot / Bukkit', icon: Box, desc: 'Standard API' },
    { id: 'velocity', name: 'Velocity', icon: Globe, desc: 'Modern Proxy' },
    { id: 'bungee', name: 'BungeeCord', icon: Server, desc: 'Legacy Proxy' },
    { id: 'purpur', name: 'Purpur', icon: Layers, desc: 'Advanced Features' },
  ];

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-100">Deploy SentinelCiberSecurity</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Select your server infrastructure to download the optimized <code>.jar</code> for your environment.
          Supports 1.20, 1.20.2, 1.20.4, and 1.21+.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selectedPlatform === platform.id;
          return (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`p-6 rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className={`w-8 h-8 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                {isSelected && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
              </div>
              <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {platform.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{platform.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="max-w-xl mx-auto bg-slate-900 rounded-xl border border-slate-800 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Version</label>
            <select 
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded text-slate-200 text-sm px-3 py-1 focus:outline-none focus:border-emerald-500"
            >
                <option>1.21 (Latest)</option>
                <option>1.20.4 (Stable)</option>
                <option>1.20.2</option>
                <option>1.20.1</option>
            </select>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Build #8492</p>
            <p className="text-xs text-emerald-500">Stable Release</p>
          </div>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 group">
          <Download className="w-6 h-6 group-hover:animate-bounce" />
          Download SentinelCore-{selectedPlatform}.jar
        </button>
        
        <div className="mt-4 p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-400">
          <p className="mb-2 text-slate-500"># Installation Instructions:</p>
          <p>1. Stop your server.</p>
          <p>2. Upload <span className="text-emerald-400">SentinelCore.jar</span> to <code>/plugins</code>.</p>
          <p>3. Start server to generate <code>config.yml</code>.</p>
          <p>4. Configure database and restart.</p>
        </div>
      </div>
    </div>
  );
};

export default Deployment;