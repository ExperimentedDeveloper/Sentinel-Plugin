
import React, { useState, useEffect } from 'react';
import { Wifi, Shield, Cpu, Database, Lock, Users, Power, ChevronDown, ChevronUp, Sliders, Brain, Radio, Zap, Key, Waves, Timer, Skull, Play, Pause, Clock, Link, Map, Hammer, AlertTriangle, FileCode, EyeOff, Terminal, BookOpen, PenTool, Layout, Feather, Battery, MessageCircle, MessageSquare, RefreshCw, Server, Box, Coins, Languages, Image, Shuffle, UserX, Speaker, Gem, BarChart2, Crosshair, Fingerprint, Activity, MousePointer, Network, RefreshCcw, Monitor, Smartphone, Repeat, List, Filter, Coffee, Scan, DollarSign, ShoppingBag, Anchor, Globe, CloudLightning, HardDrive, Flame, Snowflake, Trash2, Slash, ZapOff, Layers, Heart, Ghost, Atom, Scale, GitMerge, Microscope, Video, ShieldCheck, Eye } from 'lucide-react';
import { MOCK_MODULES } from '../constants';
import { SecurityModuleStatus, SecurityModule } from '../types';

interface SecurityModulesProps {
    theme?: 'dark' | 'light';
}

const SecurityModules: React.FC<SecurityModulesProps> = ({ theme = 'light' }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showBenchmarks, setShowBenchmarks] = useState(false);
  const [benchmarkType, setBenchmarkType] = useState<'CHEAT' | 'VPN'>('CHEAT');
  const isDark = theme === 'dark';
  
  const [waveSettings, setWaveSettings] = useState({
      size: 50,
      cooldown: 15, // minutes
      auto: true
  });
  const [pendingBans, setPendingBans] = useState(142);

  // Augmented Mock Modules
  const extendedModules: SecurityModule[] = [
      { ...MOCK_MODULES[0], icon: 'lock' }, 
      { ...MOCK_MODULES[1], icon: 'link' },
      { 
        ...MOCK_MODULES[2], 
        stats: 'BGP/AS-Path Active', 
        icon: 'wifi',
        subModules: [
            { id: 'tcp_fingerprint', name: 'TCP/IP Fingerprint', enabled: true },
            { id: 'paid_vpn', name: 'Commercial DB Lookup', enabled: true },
            { id: 'bgp_analysis', name: 'BGP / AS-Path Tracing', enabled: true }, // NEW
            { id: 'resi_proxy', name: 'Residential Proxy Score', enabled: true }
        ]
      },
      { ...MOCK_MODULES[4], stats: 'Hybrid Engine', icon: 'brain' },
      // ... (Keep existing Apex modules)
      {
          id: 'quantum_rewind',
          name: 'Quantum Rewind (Grim+)',
          description: 'Post-Tick Simulation. Rewinds player hits + liquid physics to detect 3.0001 reach.',
          status: SecurityModuleStatus.ACTIVE,
          stats: '0.0ms Latency',
          icon: 'refresh-ccw'
      },
      {
          id: 'elastic_tx',
          name: 'Elastic Transactions (Vulcan+)',
          description: 'Packet prediction that adapts to player jitter.',
          status: SecurityModuleStatus.ACTIVE,
          stats: 'Synced',
          icon: 'activity'
      },
      {
          id: 'input_graph',
          name: 'Bio-Metric Input (Matrix+)',
          description: 'Analyzes raw Mouse Delta-X/Y for "Smooth Aim".',
          status: SecurityModuleStatus.ACTIVE,
          stats: 'Sampling',
          icon: 'mouse-pointer'
      },
  ];

  const getIcon = (iconName: string) => {
      switch(iconName) {
          case 'wifi': return Wifi;
          case 'shield': return Shield;
          case 'brain': return Brain;
          case 'database': return Database;
          case 'lock': return Key;
          case 'users': return Users;
          case 'link': return Link;
          case 'magnet': return Map;
          case 'microscope': return EyeOff;
          case 'activity': return Activity;
          case 'server': return Server;
          case 'box': return Box;
          case 'wallet': return Coins;
          case 'language': return Languages;
          case 'image': return Image;
          case 'shuffle': return Shuffle;
          case 'userx': return UserX;
          case 'speaker': return Speaker;
          case 'gem': return Gem;
          case 'timer': return Timer;
          case 'fingerprint': return Fingerprint;
          case 'crosshair': return Crosshair;
          case 'bar-chart': return BarChart2;
          case 'mouse-pointer': return MousePointer;
          case 'network': return Network;
          case 'refresh-ccw': return RefreshCcw;
          case 'monitor': return Monitor;
          case 'shield-alert': return ShieldCheck;
          case 'repeat': return Repeat;
          case 'smartphone': return Smartphone;
          case 'eye': return Eye;
          case 'clock': return Clock;
          case 'list': return List;
          case 'filter': return Filter;
          case 'power': return Power;
          case 'coffee': return Coffee;
          case 'scan': return Scan;
          case 'cpu': return Cpu;
          case 'globe': return Globe;
          case 'message': return MessageSquare;
          case 'hammer': return Hammer;
          case 'snowflake': return Snowflake;
          case 'ghost': return Ghost;
          case 'bed': return Layers;
          case 'feather': return Feather;
          case 'anchor': return Anchor;
          case 'book-open': return BookOpen;
          case 'type': return FileCode;
          case 'eye-off': return EyeOff;
          case 'terminal': return Terminal;
          case 'trash-2': return Trash2;
          case 'layers': return Layers;
          case 'droplet': return ZapOff;
          case 'atom': return Atom;
          default: return Shield;
      }
  };

  const getStatusColor = (status: SecurityModuleStatus) => {
    switch (status) {
      case SecurityModuleStatus.ACTIVE: return 'bg-emerald-500';
      case SecurityModuleStatus.WARNING: return 'bg-yellow-500';
      case SecurityModuleStatus.DISABLED: return 'bg-slate-400';
      case SecurityModuleStatus.LEARNING: return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
            <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                <GitMerge className="w-6 h-6 text-purple-500" />
                Apex Hybrid Architecture
            </h2>
            <p className="text-sm text-slate-500">Combines detection engines from Grim, Vulcan, Matrix, and Spartan.</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setShowBenchmarks(!showBenchmarks)}
                className={`text-xs px-4 py-2 rounded-lg font-bold transition-all border flex items-center gap-2 ${showBenchmarks ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
                <BarChart2 className="w-3 h-3" />
                Market Benchmark
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {extendedModules.map((module, idx) => {
          const Icon = getIcon(module.icon);
          const isActive = module.status === SecurityModuleStatus.ACTIVE;
          const isExpanded = expandedId === module.id;

          return (
            <div key={idx} className={`group rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl tilt-card ${isExpanded ? 'row-span-2 col-span-1 md:col-span-2' : ''} ${isDark ? 'bg-slate-900 border border-slate-800 hover:border-emerald-500/30' : 'glass-card hover:border-emerald-300'}`}>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg transition-all duration-500 ${isActive ? (isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600') : 'bg-slate-100 text-slate-400'}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(module.status)} ${isActive ? 'animate-pulse' : ''}`}></span>
                        <span className="text-xs font-mono text-slate-400">{module.status}</span>
                    </div>
                </div>
                
                <h3 className={`font-bold text-lg mb-1 transition-colors ${isDark ? 'text-slate-100 group-hover:text-emerald-400' : 'text-slate-800 group-hover:text-emerald-600'}`}>
                    {module.name}
                </h3>
                <p className="text-sm text-slate-500 h-10 line-clamp-2 mb-4 leading-relaxed">{module.description}</p>
                
                {isExpanded && module.subModules && (
                    <div className="mb-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
                        {module.subModules.map(sub => (
                            <div key={sub.id} className={`p-2 rounded border flex items-center justify-between ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                                <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{sub.name}</span>
                                <div className={`w-2 h-2 rounded-full ${sub.enabled ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className={`pt-4 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200/50'}`}>
                    <span className={`text-xs font-mono px-2 py-1 rounded border ${isDark ? 'text-slate-400 bg-slate-950 border-slate-800' : 'text-slate-600 bg-white border-slate-200'}`}>
                        {module.stats}
                    </span>
                    <button 
                        onClick={() => setExpandedId(isExpanded ? null : module.id)}
                        className={`p-1.5 rounded transition-colors ${isExpanded ? 'text-emerald-500' : 'text-slate-400 hover:bg-slate-100'}`}
                    >
                        <Sliders className="w-4 h-4" />
                    </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecurityModules;
