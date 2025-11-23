
import React, { useState, useEffect } from 'react';
import { Server, Database, Activity, Cpu, Network, HardDrive, CheckCircle, AlertTriangle, XCircle, Terminal, ShieldAlert, Lock } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_SERVICES, MOCK_API_LOGS, PACKET_DATA } from '../constants';

interface BackendMonitorProps {
  theme?: 'dark' | 'light';
}

const BackendMonitor: React.FC<BackendMonitorProps> = ({ theme = 'light' }) => {
  const [logs, setLogs] = useState(MOCK_API_LOGS);
  const isDark = theme === 'dark';

  // Simulate incoming API requests
  useEffect(() => {
    const interval = setInterval(() => {
        const methods = ['GET', 'POST', 'PUT'];
        const endpoints = ['/api/v1/auth', '/api/v1/data', '/api/v1/scan', '/api/v1/heartbeat'];
        const statuses = [200, 200, 200, 201, 401, 500];
        
        const newLog = {
            id: `req-${Date.now()}`,
            method: methods[Math.floor(Math.random() * methods.length)] as any,
            endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            latency: `${Math.floor(Math.random() * 50)}ms`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
        };
        
        setLogs(prev => [newLog, ...prev.slice(0, 14)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'OPERATIONAL': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
          case 'DEGRADED': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
          case 'DOWN': return 'text-red-400 bg-red-500/10 border-red-500/20';
          default: return 'text-slate-400 bg-slate-800';
      }
  };

  const getMethodColor = (method: string) => {
      switch(method) {
          case 'GET': return 'text-blue-400';
          case 'POST': return 'text-emerald-400';
          case 'DELETE': return 'text-red-400';
          case 'PUT': return 'text-yellow-400';
          case 'WEBSOCKET': return 'text-purple-400';
          default: return 'text-slate-400';
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
        <div className="flex justify-between items-center">
             <div>
                <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                    <Server className="w-8 h-8 text-blue-500" />
                    Backend Infrastructure
                </h2>
                <p className="text-slate-500 text-sm">Monitor API endpoints, Database pools, and Microservices health.</p>
             </div>
             <div className="flex gap-2">
                 <div className={`px-3 py-1 border rounded flex items-center gap-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                     <span className="text-xs font-mono text-emerald-400">API GATEWAY: ONLINE</span>
                 </div>
             </div>
        </div>

        {/* TOP METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`border p-4 rounded-xl flex items-center gap-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Network className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">API Requests</p>
                    <p className={`text-xl font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>2,401/s</p>
                </div>
            </div>
            <div className={`border p-4 rounded-xl flex items-center gap-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <Database className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">DB Connections</p>
                    <p className={`text-xl font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>42 Active</p>
                </div>
            </div>
             <div className={`border p-4 rounded-xl flex items-center gap-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Cpu className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Thread Pool</p>
                    <p className={`text-xl font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>8/16 Threads</p>
                </div>
            </div>
             <div className={`border p-4 rounded-xl flex items-center gap-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <Activity className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Avg Latency</p>
                    <p className={`text-xl font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>14ms</p>
                </div>
            </div>
        </div>

        {/* SECURITY GATEWAY */}
        <div className={`border rounded-xl p-4 flex items-center justify-between ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                </div>
                <div>
                    <h3 className={`font-bold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>API Security Gateway</h3>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1"><Lock className="w-3 h-3" /> JWT AUTH: ENFORCED</span>
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1"><Activity className="w-3 h-3" /> RATE LIMIT: 60/min</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Unauthorized Blocks (1h)</p>
                <p className="text-xl font-mono font-bold text-red-500">42</p>
            </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
            {/* SERVICE HEALTH */}
            <div className={`border rounded-xl p-6 flex flex-col ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <HardDrive className="w-4 h-4 text-slate-500" />
                    Microservices Status
                </h3>
                <div className="space-y-3">
                    {MOCK_SERVICES.map(srv => (
                        <div key={srv.id} className={`border rounded-lg p-3 flex justify-between items-center ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                            <div>
                                <h4 className={`font-bold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{srv.name}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] text-slate-500 font-mono">ID: {srv.id}</span>
                                    <span className="text-[10px] text-slate-500 font-mono">UP: {srv.uptime}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(srv.status)}`}>
                                    {srv.status}
                                </span>
                                <p className="text-[10px] text-slate-500 mt-1">{srv.latency}ms</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-auto pt-4 h-32 w-full">
                     <p className="text-[10px] text-slate-500 mb-2 uppercase font-bold">Load Balancer Traffic</p>
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={PACKET_DATA}>
                             <defs>
                                <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} vertical={false} />
                            <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0', color: isDark ? '#f1f5f9' : '#0f172a' }} />
                            <Area type="monotone" dataKey="packets" stroke="#3b82f6" fill="url(#colorApi)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* API LOGS */}
            <div className={`border rounded-xl p-4 flex flex-col shadow-2xl overflow-hidden ${isDark ? 'bg-black border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-800">
                    <h3 className="font-bold text-slate-300 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-500" />
                        HTTP Request Log
                    </h3>
                    <div className="flex items-center gap-2">
                         <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                         <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-1 font-mono text-xs">
                    {logs.map((log) => (
                        <div key={log.id} className="flex items-center gap-3 p-1.5 hover:bg-slate-800 rounded transition-colors group">
                            <span className="text-slate-600 min-w-[60px]">{log.timestamp}</span>
                            <span className={`font-bold min-w-[50px] ${getMethodColor(log.method)}`}>{log.method}</span>
                            <span className="text-slate-300 flex-1 truncate">{log.endpoint}</span>
                            <span className={`font-bold ${log.status >= 500 ? 'text-red-500' : log.status >= 400 ? 'text-yellow-500' : 'text-emerald-500'}`}>
                                {log.status}
                            </span>
                            <span className="text-slate-500 min-w-[40px] text-right">{log.latency}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default BackendMonitor;
