import React, { useState, useEffect } from 'react';
import { Shield, Zap, Bug, Users, Clock, Database, Server, AlertTriangle, Cpu } from 'lucide-react';

// --- ICONOS AUXILIARES (DEFINIDOS EN LA PARTE SUPERIOR) ---

// Icono auxiliar: CheckCircleIcon
const CheckCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
)

// Icono auxiliar: Network
const Network = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 11h10"/><path d="M7 15h10"/></svg>
)

// --- 1. DashboardCard Component ---
interface CardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend: string;
}

const DashboardCard: React.FC<CardProps> = ({ title, value, icon, color, trend }) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50">
            <div className={`p-3 rounded-full w-fit ${color}/20 text-${color}-400 mb-4`}>
                {icon}
            </div>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
            <div className="flex items-end justify-between mt-1">
                <span className="text-3xl font-bold text-slate-100">{value}</span>
                <span className={`text-xs font-medium ${trend.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {trend} vs last 7 days
                </span>
            </div>
        </div>
    );
};

// --- 2. RecentActivityItem Component ---
interface Activity {
    id: number;
    timestamp: string;
    type: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const MOCK_ACTIVITY: Activity[] = [
    { id: 1, timestamp: '10:45 AM', type: 'VULN_PATCH', description: 'Hotfix applied for CVE-2021-44228.', icon: <Shield className="w-4 h-4" />, color: 'text-emerald-500' },
    { id: 2, timestamp: '10:30 AM', type: 'NET_ALERT', description: 'High volume TCP SYN detected on port 8080.', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-500' },
    { id: 3, timestamp: '09:15 AM', type: 'USER_LOGIN', description: 'Administrator Jane Doe logged in.', icon: <Users className="w-4 h-4" />, color: 'text-indigo-400' },
    { id: 4, timestamp: '08:00 AM', type: 'SYSTEM_CHK', description: 'Daily system health check completed.', icon: <CheckCircleIcon className="w-4 h-4" />, color: 'text-blue-400' },
    { id: 5, timestamp: '07:30 AM', type: 'DB_SYNC', description: 'Database cluster synchronization successful.', icon: <Database className="w-4 h-4" />, color: 'text-yellow-400' },
];

const RecentActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
    return (
        <div className="flex items-start space-x-4 p-3 hover:bg-slate-800/50 rounded-lg transition-colors border-b border-slate-800 last:border-b-0">
            <div className={`p-2 rounded-full w-fit ${activity.color}/20 ${activity.color}`}>
                {activity.icon}
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-slate-200">{activity.type}</p>
                <p className="text-xs text-slate-400">{activity.description}</p>
            </div>
            <span className="text-xs font-mono text-slate-500 flex-shrink-0">{activity.timestamp}</span>
        </div>
    );
};

// --- 3. SystemHealthChart Component (Mock) ---
const SystemHealthChart: React.FC = () => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col h-full">
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-pink-400" />
                System Resource Usage (Live)
            </h3>
            <div className="flex-1 relative">
                {/* Placeholder para un gráfico de área en tiempo real */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 rounded-lg border border-dashed border-slate-700">
                    <p className="text-slate-600 italic">Placeholder para Gráfico de Rendimiento (CPU, RAM, Disco)</p>
                </div>
            </div>
        </div>
    );
};


// --- DASHBOARD PRINCIPAL ---

const DashboardStats: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return (
        // ***********************************************
        // CORRECCIÓN CLAVE: Agregado h-full y overflow-y-auto 
        // para garantizar el desplazamiento en contenedores fijos.
        // ***********************************************
        <div className="p-6 md:p-10 space-y-10 bg-slate-950 text-white min-h-screen h-full overflow-y-auto">
            <header className="flex justify-between items-center pb-4 border-b border-slate-800 sticky top-0 bg-slate-950 z-10">
                <h1 className="text-4xl font-extrabold text-slate-100 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-emerald-400" />
                    Sentinel Dashboard
                </h1>
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono text-sm">{formattedTime}</span>
                    </div>
                    <span className="text-sm font-semibold bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-600">
                        OPERATIONAL
                    </span>
                </div>
            </header>

            {/* Grid de Métricas Clave */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard 
                    title="Critical Alerts" 
                    value={3} 
                    icon={<Zap className="w-6 h-6" />} 
                    color="red" 
                    trend="+1" 
                />
                <DashboardCard 
                    title="Open Vulnerabilities" 
                    value={7} 
                    icon={<Bug className="w-6 h-6" />} 
                    color="orange" 
                    trend="-2" 
                />
                <DashboardCard 
                    title="Traffic Anomalies" 
                    value="4.2K" 
                    icon={<Network className="w-6 h-6" />} 
                    color="indigo" 
                    trend="+15%" 
                />
                <DashboardCard 
                    title="Active Agents" 
                    value={12} 
                    icon={<Server className="w-6 h-6" />} 
                    color="cyan" 
                    trend="0%" 
                />
            </div>

            {/* Secciones de Rendimiento y Actividad */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Gráfico de Rendimiento (2/3 ancho) */}
                <div className="lg:col-span-2 h-[400px]">
                    <SystemHealthChart />
                </div>

                {/* 2. Actividad Reciente (1/3 ancho) */}
                <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col h-[400px]">
                    <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-slate-400" />
                        Recent Security Activity
                    </h3>
                    <div className="flex-1 overflow-y-auto">
                        {MOCK_ACTIVITY.map(activity => (
                            <RecentActivityItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Sección de Resumen Adicional para forzar el scroll */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                    <Database className="w-6 h-6 text-yellow-400" />
                    Data Integrity Summary
                </h3>
                <p className="text-slate-400">
                    All critical data stores report 100% integrity check successful as of the last validation run (1:00 AM UTC). 
                    The redundancy replication factor is currently set to 3 across geo-distributed nodes. 
                    Next integrity check scheduled for 2:00 AM UTC. This long paragraph ensures there is more content 
                    to scroll past the initial screen view, guaranteeing the scroll functionality is tested properly.
                    This extra text is intentionally long to ensure that the dashboard content extends beyond the initial viewport.
                </p>
            </div>
            {/* Otro bloque largo para asegurar el scroll */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                    <Server className="w-6 h-6 text-red-400" />
                    Endpoint Protection Status
                </h3>
                <p className="text-slate-400">
                    Endpoint protection is active on 100% of managed devices. We have detected 4 minor attempts 
                    of policy violation in the last 24 hours, all automatically blocked by the Sentinel agent. 
                    The security posture remains high. Review the `VulnerabilityScanner` for deeper threat intelligence.
                    The continuous monitoring ensures that even new threats are quickly analyzed and mitigated by the 
                    automated response systems. Scroll down to see the end of the page!
                </p>
            </div>
        </div>
    );
};