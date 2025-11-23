import React, { useState, useEffect, useRef } from 'react';
import { Network, Server, Shield, Clock, Zap, Cpu, Search, Filter } from 'lucide-react';

// --- DEFINICIONES INTERNAS (Solución para la dependencia faltante) ---

type PacketProtocol = 'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'DNS';
type PacketStatus = 'NORMAL' | 'ALERT' | 'DROPPED';

interface Packet {
    id: number;
    timestamp: string;
    source: string;
    destination: string;
    protocol: PacketProtocol;
    length: number;
    summary: string;
    status: PacketStatus;
}

const MOCK_PACKETS: Packet[] = [
    { id: 1, timestamp: '10:00:01.012', source: '10.0.1.15', destination: '172.16.0.1', protocol: 'DNS', length: 72, summary: 'Standard query A www.google.com', status: 'NORMAL' },
    { id: 2, timestamp: '10:00:01.234', source: '192.168.1.5', destination: '54.21.0.1', protocol: 'TCP', length: 1500, summary: '[SYN] Port 443 (HTTPS)', status: 'NORMAL' },
    { id: 3, timestamp: '10:00:01.567', source: '54.21.0.1', destination: '192.168.1.5', protocol: 'TCP', length: 60, summary: '[SYN ACK] Port 443', status: 'NORMAL' },
    { id: 4, timestamp: '10:00:02.109', source: '10.0.1.2', destination: '203.0.113.4', protocol: 'ICMP', length: 42, summary: 'Echo (ping) request', status: 'NORMAL' },
    { id: 5, timestamp: '10:00:02.400', source: '172.16.0.1', destination: '10.0.1.15', protocol: 'DNS', length: 128, summary: 'Standard query response www.google.com', status: 'NORMAL' },
];

// --- FIN DE DEFINICIONES INTERNAS ---


const PacketInspector: React.FC = () => {
    const [packets, setPackets] = useState<Packet[]>(MOCK_PACKETS);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSniffing, setIsSniffing] = useState(true);

    // Auto-scroll to the bottom
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [packets]);

    // Simulate packet sniffing
    useEffect(() => {
        if (!isSniffing) return;

        let nextId = packets.length + 1;
        const interval = setInterval(() => {
            const newPacket: Packet = generateRandomPacket(nextId++);
            
            setPackets(prev => [...prev, newPacket]);
        }, 500); // Faster stream simulation

        return () => clearInterval(interval);
    }, [isSniffing]);

    const generateRandomPacket = (id: number): Packet => {
        const protocols: PacketProtocol[] = ['TCP', 'UDP', 'HTTP', 'DNS'];
        const summaries = [
            'HTTP GET request /api/data',
            'TLS Client Hello',
            'UDP stream data packet',
            'ICMP Destination Unreachable',
            'DNS AAAA query api.service.local',
        ];
        const statuses: PacketStatus[] = ['NORMAL', 'NORMAL', 'NORMAL', 'ALERT']; // Mostly normal, occasional alert

        const protocol = protocols[Math.floor(Math.random() * protocols.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        return {
            id,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, second: '2-digit', fractionalSecond: '3-digit' }),
            source: `10.0.2.${Math.floor(Math.random() * 255)}`,
            destination: status === 'ALERT' ? `192.168.10.${Math.floor(Math.random() * 255)}` : `172.31.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            protocol: protocol,
            length: Math.floor(Math.random() * 1400) + 60,
            summary: summaries[Math.floor(Math.random() * summaries.length)],
            status: status,
        };
    };

    const getStatusClass = (status: PacketStatus): string => {
        switch (status) {
            case 'ALERT': return 'bg-red-900/50 text-red-400 font-bold border-red-700';
            case 'DROPPED': return 'bg-yellow-900/50 text-yellow-400 border-yellow-700';
            case 'NORMAL':
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <Network className="w-8 h-8 text-indigo-400" />
                        Network Packet Inspector
                    </h2>
                    <p className="text-slate-500 text-sm">Real-time deep packet inspection (DPI) and traffic analysis.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsSniffing(prev => !prev)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
                            isSniffing
                                ? 'bg-red-700/50 hover:bg-red-700 border border-red-700 text-white'
                                : 'bg-green-700/50 hover:bg-green-700 border border-green-700 text-white'
                        }`}
                    >
                        {isSniffing ? (
                            <>
                                <StopCircleIcon className="w-4 h-4" /> Stop Sniffing
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" /> Start Sniffing
                            </>
                        )}
                    </button>
                    <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
                        <Filter className="w-4 h-4" /> Apply Filters
                    </button>
                </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl flex-1 min-h-0 flex flex-col">
                {/* Header Row */}
                <div className="flex font-bold text-xs uppercase text-slate-500 bg-slate-900 border-b border-slate-800 sticky top-0 p-3">
                    <div className="w-20">Time</div>
                    <div className="w-24">Source</div>
                    <div className="w-24">Destination</div>
                    <div className="w-16">Proto</div>
                    <div className="w-12 text-right">Len</div>
                    <div className="flex-1 px-2">Summary</div>
                    <div className="w-20 text-center">Status</div>
                </div>

                {/* Packet List */}
                <div 
                    ref={containerRef} 
                    className="flex-1 overflow-y-auto font-mono text-xs"
                >
                    {packets.map((p) => (
                        <div key={p.id} className={`flex border-b border-slate-900 hover:bg-slate-800/30 transition-colors p-3 ${getStatusClass(p.status)}`}>
                            <div className="w-20 flex items-center gap-1 text-[10px] text-slate-500">
                                <Clock className="w-3 h-3"/>
                                {p.timestamp.split('.')[0]}
                            </div>
                            <div className="w-24 text-indigo-300">{p.source}</div>
                            <div className="w-24 text-amber-300">{p.destination}</div>
                            <div className="w-16 font-bold">{p.protocol}</div>
                            <div className="w-12 text-right text-slate-400">{p.length}</div>
                            <div className="flex-1 px-2 text-slate-300 truncate">{p.summary}</div>
                            <div className="w-20 text-center">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                    p.status === 'ALERT' ? 'bg-red-600/20 text-red-400' :
                                    p.status === 'DROPPED' ? 'bg-yellow-600/20 text-yellow-400' :
                                    'bg-slate-700/50 text-slate-300'
                                }`}>
                                    {p.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    {isSniffing && (
                         <div className="flex justify-center items-center p-4 bg-slate-900/50 text-slate-600">
                            <Zap className="w-4 h-4 mr-2 animate-pulse text-indigo-400"/> Sniffing traffic...
                         </div>
                    )}
                </div>

                {/* Footer/Stats */}
                 <div className="p-3 border-t border-slate-800 bg-slate-900 flex justify-between text-xs text-slate-500">
                    <span>Total Packets: <span className="text-slate-300 font-mono">{packets.length}</span></span>
                    <span>Alerts: <span className="text-red-400 font-mono">{packets.filter(p => p.status === 'ALERT').length}</span></span>
                    <span>Protocol Distribution: <span className="text-slate-300 font-mono">TCP ({packets.filter(p => p.protocol === 'TCP').length}) / DNS ({packets.filter(p => p.protocol === 'DNS').length})</span></span>
                 </div>
            </div>
        </div>
    );
};

// Componentes Icono Auxiliares necesarios
const StopCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><rect width="6" height="6" x="9" y="9"/></svg>
)

export default PacketInspector;