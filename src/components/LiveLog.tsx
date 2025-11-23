import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Zap, Terminal, AlertTriangle, Cloud, Code } from 'lucide-react';

// --- DEFINICIONES INTERNAS (Solución para la dependencia faltante) ---

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'SUCCESS';

interface LogEntry {
    id: number;
    timestamp: string;
    level: LogLevel;
    message: string;
    component: string;
}

const MOCK_LOGS: LogEntry[] = [
    { id: 1, timestamp: '10:00:01', level: 'INFO', message: 'System startup initiated.', component: 'CORE' },
    { id: 2, timestamp: '10:00:02', level: 'SUCCESS', message: 'Network adapter initialized on port 8080.', component: 'NET' },
    { id: 3, timestamp: '10:00:03', level: 'DEBUG', message: 'Checking resource utilization: CPU 12%, RAM 4GB.', component: 'MONITOR' },
    { id: 4, timestamp: '10:00:05', level: 'WARN', message: 'Low priority thread queue exceeded maximum capacity (120/100).', component: 'SCHEDULER' },
    { id: 5, timestamp: '10:00:06', level: 'INFO', message: 'Incoming connection established from IP 192.168.1.50.', component: 'NET' },
];

// --- FIN DE DEFINICIONES INTERNAS ---


const LiveLog: React.FC = () => {
    const [liveLogs, setLiveLogs] = useState<LogEntry[]>(MOCK_LOGS);
    const logContainerRef = useRef<HTMLDivElement>(null);
    const [isRunning, setIsRunning] = useState(true);

    // Auto-scroll to the bottom of the logs
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [liveLogs]);

    // Simulate real-time log stream
    useEffect(() => {
        if (!isRunning) return;

        let nextId = liveLogs.length + 1;
        const interval = setInterval(() => {
            const newLog: LogEntry = {
                id: nextId++,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                level: ['INFO', 'DEBUG', 'WARN', 'SUCCESS'][Math.floor(Math.random() * 4)] as LogLevel,
                message: generateRandomMessage(),
                component: generateRandomComponent(),
            };
            
            setLiveLogs(prev => [...prev, newLog]);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    const generateRandomMessage = (): string => {
        const messages = [
            'Processing incoming telemetry data...',
            'Security policy enforcement check passed.',
            'Database transaction commit successful.',
            'Garbage Collection cycle initiated.',
            'Attempting connection reconnection...',
            'Service mesh health check OK.',
            'User session updated.',
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const generateRandomComponent = (): string => {
        const components = ['API_GATEWAY', 'DB_HANDLER', 'AUTH_SVC', 'TELEMETRY', 'NET'];
        return components[Math.floor(Math.random() * components.length)];
    };

    const getLevelClass = (level: LogLevel): string => {
        switch (level) {
            case 'INFO': return 'text-blue-400';
            case 'WARN': return 'text-yellow-400';
            case 'ERROR': return 'text-red-500 font-bold';
            case 'DEBUG': return 'text-gray-500';
            case 'SUCCESS': return 'text-green-400';
            default: return 'text-white';
        }
    };

    const getIcon = (level: LogLevel) => {
        switch (level) {
            case 'INFO': return <Terminal className="w-3 h-3 text-blue-400" />;
            case 'WARN': return <AlertTriangle className="w-3 h-3 text-yellow-400" />;
            case 'ERROR': return <Zap className="w-3 h-3 text-red-500" />;
            case 'DEBUG': return <Code className="w-3 h-3 text-gray-500" />;
            case 'SUCCESS': return <CheckCircleIcon className="w-3 h-3 text-green-400" />;
            default: return <Terminal className="w-3 h-3 text-white" />;
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <Terminal className="w-8 h-8 text-cyan-500" />
                        Live Operational Stream
                    </h2>
                    <p className="text-slate-500 text-sm">Real-time log aggregation and streaming from Sentinel agents.</p>
                </div>
                <button
                    onClick={() => setIsRunning(prev => !prev)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
                        isRunning 
                            ? 'bg-red-700/50 hover:bg-red-700 border border-red-700 text-white' 
                            : 'bg-green-700/50 hover:bg-green-700 border border-green-700 text-white'
                    }`}
                >
                    {isRunning ? (
                        <>
                            <StopCircleIcon className="w-4 h-4" /> Pause Stream
                        </>
                    ) : (
                        <>
                            <PlayIcon className="w-4 h-4" /> Start Stream
                        </>
                    )}
                </button>
            </div>

            <div className="bg-black border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl flex-1 min-h-0">
                <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Cloud className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-300">Log Stream Endpoint: tcp://log-aggregator.internal:6000</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">Events: {liveLogs.length}</span>
                </div>
                
                <div 
                    ref={logContainerRef} 
                    className="flex-1 p-4 font-mono text-[10px] sm:text-xs text-green-400 overflow-y-auto space-y-0.5"
                    style={{ lineHeight: '1.4' }}
                >
                    {liveLogs.map((log) => (
                        <div key={log.id} className="flex gap-2 animate-in fade-in duration-150 whitespace-nowrap">
                            <span className="text-slate-600">{log.timestamp}</span>
                            <span className={`font-bold ${getLevelClass(log.level)}`}>[{log.component}]</span>
                            <span className={`${getLevelClass(log.level)}`}>{log.level}</span>
                            <span className="text-slate-300 flex items-center gap-1">
                                {getIcon(log.level)}
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Componentes Icono Auxiliares (ya que no se exportan de lucide-react por defecto)
const PlayIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>
)

const StopCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><rect width="6" height="6" x="9" y="9"/></svg>
)

const CheckCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
)

export default LiveLog;