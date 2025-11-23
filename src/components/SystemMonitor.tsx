
import React from 'react';
import { Activity, Cpu, HardDrive, Trash, Layers, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SystemMonitor: React.FC = () => {
  const tpsData = Array.from({ length: 20 }, (_, i) => ({ time: i, tps: 19.8 + Math.random() * 0.2 }));
  const ramData = Array.from({ length: 20 }, (_, i) => ({ time: i, mb: 4000 + Math.random() * 2000 }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-emerald-500" />
                    System Monitor (LagGuard)
                </h2>
                <p className="text-slate-500 text-sm">Real-time telemetry. Auto-adjusts view distance if TPS drops.</p>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all">
                <Trash className="w-4 h-4" />
                Run Garbage Collector
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatBox label="TPS (Ticks Per Second)" value="19.98" sub="Stable" color="text-emerald-400" icon={Clock} />
            <StatBox label="RAM Usage (Heap)" value="4.2 GB" sub="Max: 16 GB" color="text-blue-400" icon={HardDrive} />
            <StatBox label="CPU Load (System)" value="12%" sub="i9-14900K" color="text-purple-400" icon={Cpu} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[300px]">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
                <h3 className="font-bold text-slate-300 mb-4 text-sm">TPS History (1m)</h3>
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={tpsData}>
                             <defs>
                                <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <YAxis domain={[15, 20]} hide />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Area type="monotone" dataKey="tps" stroke="#10b981" fill="url(#colorTps)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
                 <h3 className="font-bold text-slate-300 mb-4 text-sm">RAM Usage (GC Cycle)</h3>
                 <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ramData}>
                             <defs>
                                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <YAxis hide />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Area type="monotone" dataKey="mb" stroke="#3b82f6" fill="url(#colorRam)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
                 <div>
                     <p className="text-sm font-bold text-slate-300">Loaded Chunks</p>
                     <p className="text-2xl font-mono text-emerald-400">4,201</p>
                 </div>
                 <Layers className="w-8 h-8 text-slate-700" />
             </div>
             <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
                 <div>
                     <p className="text-sm font-bold text-slate-300">Entities</p>
                     <p className="text-2xl font-mono text-yellow-400">892</p>
                 </div>
                 <button className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700 hover:text-white">Kill Mobs</button>
             </div>
        </div>
    </div>
  );
};

const StatBox = ({ label, value, sub, color, icon: Icon }: any) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
            <Icon className="w-12 h-12" />
        </div>
        <p className="text-xs font-bold uppercase text-slate-500 mb-1">{label}</p>
        <h3 className={`text-3xl font-bold ${color} mb-1`}>{value}</h3>
        <p className="text-xs text-slate-400 font-mono">{sub}</p>
    </div>
);

export default SystemMonitor;
