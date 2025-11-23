import React, { useState, useEffect } from 'react';
import { Shield, Zap, Bug, Users, Clock, Database, Server, AlertTriangle, Cpu, LogIn, Settings } from 'lucide-react';

// ICONO CHECK
const CheckCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <path d="m9 11 3 3L22 4"/>
    </svg>
);

// ICONO NETWORK
const Network = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M7 7h10"/>
        <path d="M7 11h10"/>
        <path d="M7 15h10"/>
    </svg>
);

// TARJETAS DEL DASHBOARD
interface CardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend: string;
}

// ✔ Tailwind seguro (no dinámico)
const colorMap: Record<string, string> = {
    red: "text-red-400 bg-red-500/20",
    orange: "text-orange-400 bg-orange-500/20",
    indigo: "text-indigo-400 bg-indigo-500/20",
    cyan: "text-cyan-400 bg-cyan-500/20",
};

const DashboardCard: React.FC<CardProps> = ({ title, value, icon, color, trend }) => {
    const safeColor = colorMap[color] || "text-slate-400 bg-slate-700/20";

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className={`p-3 rounded-full w-fit mb-4 ${safeColor}`}>
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

// ACTIVIDAD RECIENTE
interface Activity {
    id: number;
    timestamp: string;
    type: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const MOCK_ACTIVITY: Activity[] = [
    { id: 1, timestamp: '10:45 AM', type: 'VULN_PATCH', description: 'Hotfix applied.', icon: <Shield className="w-4 h-4"/>, color: 'text-emerald-500' },
    { id: 2, timestamp: '10:30 AM', type: 'NET_ALERT', description: 'High volume TCP SYN detected.', icon: <AlertTriangle className="w-4 h-4"/>, color: 'text-red-500' },
    { id: 3, timestamp: '09:15 AM', type: 'USER_LOGIN', description: 'Administrator logged in.', icon: <Users className="w-4 h-4"/>, color: 'text-indigo-400' },
];

const RecentActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
    <div className="flex items-start space-x-4 p-3 hover:bg-slate-800/50 rounded-lg border-b border-slate-800 last:border-b-0">
        <div className={`p-2 rounded-full w-fit ${activity.color} bg-slate-700/20`}>
            {activity.icon}
        </div>
        <div className="flex-1">
            <p className="text-sm font-semibold text-slate-200">{activity.type}</p>
            <p className="text-xs text-slate-400">{activity.description}</p>
        </div>
        <span className="text-xs text-slate-500">{activity.timestamp}</span>
    </div>
);

// GRAFICO MOCK
const SystemHealthChart: React.FC = () => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg h-full">
        <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-pink-400"/> System Resource Usage
        </h3>
        <div className="h-full border border-dashed border-slate-700 flex items-center justify-center">
            <p className="text-slate-600 italic">Chart Placeholder</p>
        </div>
    </div>
);


// ----------------------------------------------------------------------
// 💯 DASHBOARD PRINCIPAL CON SCROLL FUNCIONANDO PERFECTAMENTE
// ----------------------------------------------------------------------

const DashboardStats: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString();

    return (
        <div className="h-screen overflow-y-auto bg-slate-950 text-white p-6 space-y-10">

            {/* Header fijo arriba */}
            <header className="sticky top-0 bg-slate-950 py-4 z-20 border-b border-slate-800">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Shield className="w-8 h-8 text-emerald-400"/> Sentinel Dashboard
                    </h1>
                    <div className="flex items-center gap-4 text-slate-400">
                        <Clock className="w-5 h-5"/>
                        <span className="font-mono text-sm">{formattedTime}</span>
                    </div>
                </div>
            </header>

            {/* TARJETAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Critical Alerts" value={3} icon={<Zap/>} color="red" trend="+1"/>
                <DashboardCard title="Open Vulnerabilities" value={7} icon={<Bug/>} color="orange" trend="-2"/>
                <DashboardCard title="Traffic Anomalies" value="4.2K" icon={<Network/>} color="indigo" trend="+15%"/>
                <DashboardCard title="Active Agents" value={12} icon={<Server/>} color="cyan" trend="0%"/>
            </div>

            {/* GRAFICO + ACTIVIDAD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[350px]">
                    <SystemHealthChart/>
                </div>
                <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-5 h-[350px] flex flex-col">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Clock/> Recent Activity
                    </h3>
                    <div className="overflow-y-auto flex-1">
                        {MOCK_ACTIVITY.map(a => <RecentActivityItem key={a.id} activity={a}/>)}
                    </div>
                </div>
            </div>

            {/* BLOQUES EXTRAS PARA SCROLL */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2"><Database className="inline-block mr-2 text-yellow-400"/>Data Integrity Summary</h3>
                <p className="text-slate-400">
                    Información larga para asegurar scroll...
                </p>
            </div>

            <div className="bg-slate-800 border-t-4 border-indigo-500 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-indigo-400 flex items-center gap-3">
                    <LogIn/> Authentication & Settings
                </h3>
            </div>

        </div>
    );
};

export default DashboardStats;
