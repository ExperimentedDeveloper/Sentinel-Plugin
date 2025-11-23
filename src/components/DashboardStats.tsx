
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShieldAlert, Radio, Zap, Database, Server, Activity, TrendingUp } from 'lucide-react';
import { PACKET_DATA } from '../constants';

interface DashboardStatsProps {
  theme?: 'dark' | 'light';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  
  // Mock sparkline data
  const sparkData = [10, 25, 15, 35, 20, 45, 40];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Threats Neutralized" 
          value="2,401" 
          sub="Last 24 hours" 
          icon={ShieldAlert} 
          color="text-red-400" 
          bg="bg-red-500/10"
          borderColor="border-red-500/20"
          isDark={isDark}
          sparkline={sparkData}
        />
        <StatCard 
          title="Active Tunnels" 
          value="142" 
          sub="Encrypted Sessions" 
          icon={Radio} 
          color="text-blue-400" 
          bg="bg-blue-500/10"
          borderColor="border-blue-500/20"
          isDark={isDark}
          delay="0.2s"
          sparkline={sparkData}
        />
        <StatCard 
          title="Inbound PPS" 
          value="450" 
          sub="DDoS Filter Active" 
          icon={Zap} 
          color="text-yellow-400" 
          bg="bg-yellow-500/10"
          borderColor="border-yellow-500/20"
          isDark={isDark}
          delay="0.4s"
          sparkline={sparkData}
        />
        <StatCard 
          title="MySQL Latency" 
          value="2ms" 
          sub="AES-256-GCM Pool" 
          icon={Database} 
          color="text-emerald-400" 
          bg="bg-emerald-500/10"
          borderColor="border-emerald-500/20"
          isDark={isDark}
          delay="0.6s"
          sparkline={sparkData}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 border rounded-xl p-6 shadow-2xl relative overflow-hidden group tilt-card ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    <Activity className="w-5 h-5 text-emerald-400" />
                    Network Traffic Analysis
                </h2>
                <p className="text-xs text-slate-500">Real-time packet entropy & DDoS mitigation.</p>
            </div>
            <div className="flex items-center space-x-2">
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-400 ring-1 ring-inset ring-emerald-500/20 animate-pulse">
                    LIVE
                </span>
            </div>
            </div>
            <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PACKET_DATA}>
                <defs>
                    <linearGradient id="colorPackets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorThreshold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                    contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0', borderRadius: '8px', color: isDark ? '#f1f5f9' : '#0f172a' }}
                    itemStyle={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                />
                <Area type="monotone" dataKey="packets" stroke="#10b981" fillOpacity={1} fill="url(#colorPackets)" strokeWidth={2} name="Packets/sec" />
                <Area type="monotone" dataKey="threshold" stroke="#ef4444" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorThreshold)" strokeWidth={2} name="Mitigation Cap" />
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </div>

        <div className={`border rounded-xl p-6 flex flex-col relative overflow-hidden tilt-card ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
             <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                 <Server className="w-5 h-5 text-blue-400" />
                 System Load
             </h3>
             
             <div className="space-y-6 flex-1">
                 <div>
                     <div className="flex justify-between text-xs mb-2">
                         <span className="text-slate-400 font-bold">CPU Usage</span>
                         <span className="text-emerald-400 font-mono">12%</span>
                     </div>
                     <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                         <div className="h-full bg-emerald-500 w-[12%] liquid-bg"></div>
                     </div>
                 </div>

                 <div>
                     <div className="flex justify-between text-xs mb-2">
                         <span className="text-slate-400 font-bold">RAM (Heap)</span>
                         <span className="text-blue-400 font-mono">4.2 GB / 16 GB</span>
                     </div>
                     <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                         <div className="h-full bg-blue-500 w-[26%] liquid-bg"></div>
                     </div>
                 </div>

                 <div>
                     <div className="flex justify-between text-xs mb-2">
                         <span className="text-slate-400 font-bold">Disk I/O (Logs)</span>
                         <span className="text-purple-400 font-mono">45 MB/s</span>
                     </div>
                     <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                         <div className="h-full bg-purple-500 w-[15%] liquid-bg"></div>
                     </div>
                 </div>

                 <div className="mt-auto pt-4">
                     <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} float-card`}>
                         <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Next Backup</p>
                         <div className="flex justify-between items-center">
                             <span className={`text-sm font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>04:00:00 AM</span>
                             <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">AES-256</span>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, icon: Icon, color, bg, borderColor, isDark, delay, sparkline }: any) => (
  <div className={`p-6 rounded-xl border relative overflow-hidden rgb-card tilt-card ${isDark ? `bg-slate-900 ${borderColor}` : 'bg-white border-slate-200'}`} style={{ animationDelay: delay }}>
    <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
      <Icon className="w-16 h-16" />
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
            <Icon className={`w-5 h-5 ${color}`} />
        </div>
        {sparkline && (
             <div className="w-24 h-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparkline.map((v: number, i: number) => ({ val: v, i }))}>
                        <Line type="monotone" dataKey="val" stroke={color.includes('red') ? '#ef4444' : color.includes('blue') ? '#3b82f6' : '#eab308'} strokeWidth={2} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
             </div>
        )}
      </div>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className={`text-2xl font-bold font-mono ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{value}</h3>
      <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
        <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')} animate-pulse`}></div>
        {sub}
      </p>
    </div>
  </div>
);

export default DashboardStats;
