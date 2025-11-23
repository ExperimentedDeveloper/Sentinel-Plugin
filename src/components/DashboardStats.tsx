import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, Server, BarChart, Bug, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

// --- DEFINICIONES INTERNAS (Solución para la dependencia faltante) ---
// Reusing types from sibling components for consistency

type PacketStatus = 'NORMAL' | 'ALERT' | 'DROPPED';
type LogLevel = 'INFO' | 'WARN' | 'ERROR';
type VulnerabilitySeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM';

interface Metric {
    id: string;
    title: string;
    value: string | number;
    unit: string;
    icon: React.ElementType;
    color: string;
    trend: 'up' | 'down' | 'neutral';
}

const MOCK_METRICS: Metric[] = [
    {
        id: 'alerts',
        title: 'Active Alerts (Network)',
        value: 12,
        unit: 'alerts',
        icon: ShieldAlert,
        color: 'text-red-400',
        trend: 'up',
    },
    {
        id: 'cves',
        title: 'Critical Vulnerabilities',
        value: 2,
        unit: 'CVEs',
        icon: Bug,
        color: 'text-orange-400',
        trend: 'up',
    },
    {
        id: 'errors',
        title: 'Log Stream Errors',
        value: 45,
        unit: '/min',
        icon: Zap,
        color: 'text-yellow-400',
        trend: 'down',
    },
    {
        id: 'traffic',
        title: 'Network Traffic Rate',
        value: 1.4,
        unit: 'Gbps',
        icon: BarChart,
        color: 'text-green-400',
        trend: 'up',
    },
];

// --- FIN DE DEFINICIONES INTERNAS ---

const DashboardStats: React.FC = () => {
    const [metrics, setMetrics] = useState<Metric[]>(MOCK_METRICS);

    // Simulate real-time metric updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prevMetrics => prevMetrics.map(metric => {
                if (metric.id === 'alerts') {
                    // Alerts fluctuate
                    const newValue = Math.max(0, metric.value as number + Math.floor(Math.random() * 3) - 1);
                    return { ...metric, value: newValue, trend: newValue > metric.value ? 'up' : newValue < metric.value ? 'down' : 'neutral' };
                }
                if (metric.id === 'traffic') {
                    // Traffic slowly rises/falls
                    const currentRate = metric.value as number;
                    const change = (Math.random() * 0.2 - 0.1); // +/- 0.1 Gbps
                    const newRate = Math.max(0.5, parseFloat((currentRate + change).toFixed(1)));
                    return { ...metric, value: newRate, trend: newRate > currentRate ? 'up' : newRate < currentRate ? 'down' : 'neutral' };
                }
                return metric;
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
        if (trend === 'up') {
            return <ArrowUp className="w-4 h-4 text-red-500" />;
        }
        if (trend === 'down') {
            return <ArrowDown className="w-4 h-4 text-green-500" />;
        }
        return null;
    };

    const getTrendClass = (trend: 'up' | 'down' | 'neutral') => {
        if (trend === 'up') return 'text-red-500 bg-red-900/20';
        if (trend === 'down') return 'text-green-500 bg-green-900/20';
        return 'text-slate-500 bg-slate-900/20';
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <Server className="w-8 h-8 text-emerald-500" />
                        Operational Dashboard Summary
                    </h2>
                    <p className="text-slate-500 text-sm">Key metrics and security posture snapshot.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                    <div key={metric.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl transition-all hover:border-indigo-500/50 hover:shadow-indigo-900/20">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold uppercase text-slate-500">{metric.title}</span>
                            <div className={`p-2 rounded-lg ${metric.color} bg-slate-800`}>
                                <metric.icon className="w-5 h-5" />
                            </div>
                        </div>
                        
                        <div className="flex items-end justify-between">
                            <div className="text-4xl font-extrabold text-slate-100">
                                {metric.value}
                                <span className="text-base font-normal text-slate-500 ml-1">{metric.unit}</span>
                            </div>
                            
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${getTrendClass(metric.trend)}`}>
                                {getTrendIcon(metric.trend)}
                                {metric.trend === 'up' && 'Rising'}
                                {metric.trend === 'down' && 'Stable'}
                                {metric.trend === 'neutral' && 'Steady'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-400 text-sm flex items-center gap-3 mt-6">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <p>System health is **Nominal**. Current alert count is 12, primarily due to non-critical DNS anomalies. **No immediate intervention required.**</p>
            </div>
        </div>
    );
};

export default DashboardStats;