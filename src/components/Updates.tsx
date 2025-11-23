import React, { useState } from 'react';
import { GitCommit, CheckCircle, Clock, ArrowRight, Zap, Globe, ShieldAlert, MessageSquare, DownloadCloud, Fingerprint, QrCode, RefreshCcw, EyeOff, Lock, Database, Activity, Radio, UserCheck, Shield } from 'lucide-react';

const Updates: React.FC = () => {
    const [activeTab, setActiveTab] = useState('changelog');

    return (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
            {/* Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-1">Sentinel Updater</h2>
                    <p className="text-slate-400 text-sm">Manage plugin versions and view upcoming features.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold">Current Version</p>
                        <p className="text-xl font-mono font-bold text-emerald-400">v3.0.0</p>
                    </div>
                    <div className="w-px h-10 bg-slate-800"></div>
                    <div className="text-left">
                         <p className="text-xs text-slate-500 uppercase font-bold">Latest Build</p>
                         <p className="text-xl font-mono font-bold text-slate-200">v3.0.0</p>
                    </div>
                    <button className="bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-bold ml-2 transition-colors">
                        Check for Updates
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-800 pb-1">
                <button 
                    onClick={() => setActiveTab('changelog')}
                    className={`pb-3 px-2 text-sm font-medium transition-all ${activeTab === 'changelog' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    Changelog
                </button>
                <button 
                    onClick={() => setActiveTab('roadmap')}
                    className={`pb-3 px-2 text-sm font-medium transition-all ${activeTab === 'roadmap' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    Roadmap (15 Ideas)
                </button>
            </div>

            {/* Content */}
            {activeTab === 'changelog' ? <Changelog /> : <Roadmap />}
        </div>
    );
};

const Changelog = () => {
    const changes = [
        {
            version: 'v3.0.0',
            date: 'Today',
            type: 'Major Release',
            features: [
                'Added full Web Panel integration with React frontend.',
                'Implemented AES-256 Database encryption for all storage.',
                'New Anti-Bot "Fortress Mode" (L7 Filter).',
                'Patched 14 new crash exploits (NBT Overflow).',
                'Added "Bypass Manager" for trusted staff.'
            ]
        },
        {
            version: 'v2.9.5',
            date: 'Last Week',
            type: 'Security Patch',
            features: [
                'Fixed a false positive in KillAura check.',
                'Improved Bedrock Edition (Geyser) compatibility.',
                'Optimized Netty Injection to reduce RAM usage by 15%.'
            ]
        }
    ];

    return (
        <div className="space-y-8 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800"></div>
            {changes.map((change, idx) => (
                <div key={idx} className="relative pl-12">
                    <div className={`absolute left-[11px] top-1 w-3 h-3 rounded-full border-2 border-slate-950 ${idx === 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`}></div>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-100">{change.version}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${idx === 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                                        {change.type}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Released: {change.date}
                                </p>
                            </div>
                            <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded transition-all">
                                <DownloadCloud className="w-5 h-5" />
                            </button>
                        </div>
                        <ul className="space-y-2">
                            {change.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <CheckCircle className="w-4 h-4 text-emerald-500/50 shrink-0 mt-0.5" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Roadmap = () => {
    const ideas = [
        // ORIGINAL 5 IDEAS
        {
            title: 'Hardware ID (HWID) Bans',
            desc: 'Ban the physical computer, not just the IP address. Prevents VPN bypass completely.',
            icon: Fingerprint,
            status: 'In Development'
        },
        {
            title: 'Geo-Fencing',
            desc: 'Block connection attempts from entire countries (e.g., high-risk botnet regions).',
            icon: Globe,
            status: 'Planned'
        },
        {
            title: 'AI Chat Filter',
            desc: 'Use Machine Learning to detect toxicity and spam based on context, not just word lists.',
            icon: MessageSquare,
            status: 'Concept'
        },
        {
            title: 'Discord Live-Link',
            desc: 'Real-time bi-directional communication. Control the console from Discord.',
            icon: Zap,
            status: 'Planned'
        },
        {
            title: 'Shadowban Dimension',
            desc: 'Send hackers to a fake world where they can only see other hackers.',
            icon: ShieldAlert,
            status: 'Concept'
        },

        // 10 NEW GOD TIER SUGGESTIONS
        {
            title: 'Staff Map QR Auth',
            desc: 'Staff must scan a QR code on a Map Item with their phone to login (2FA).',
            icon: QrCode,
            status: 'Concept'
        },
        {
            title: 'Inventory Rollback Snapshots',
            desc: 'Takes NBT snapshots of inventories every minute. Rollback griefing instantly.',
            icon: RefreshCcw,
            status: 'Concept'
        },
        {
            title: 'Ore Obfuscation Engine v2',
            desc: 'Send fake diamond blocks to X-Ray users that turn into stone when mined.',
            icon: EyeOff,
            status: 'Planned'
        },
        {
            title: 'End-to-End Chat Encryption',
            desc: 'Encrypts private messages using AES before they even hit the console logs.',
            icon: Lock,
            status: 'Concept'
        },
        {
            title: 'Packet Replay Block',
            desc: 'Prevents "Instant-Break" hacks by signing every packet with a timestamp.',
            icon: Activity,
            status: 'In Development'
        },
        {
            title: 'Residential IP Detection',
            desc: 'Distinguishes between Home IPs and Datacenter IPs to block commercial VPNs.',
            icon: Radio,
            status: 'Planned'
        },
        {
            title: 'Client Mod Audit (Fabric)',
            desc: 'Analyzes the Handshake packet to list all mods installed on the client.',
            icon: Database,
            status: 'In Development'
        },
        {
            title: 'Layer 4 UDP Filter',
            desc: 'Native Netty filter to drop malformed UDP packets before the main thread.',
            icon: Shield,
            status: 'Planned'
        },
        {
            title: 'Global Ban List Sync',
            desc: 'Share ban data with other Sentinel servers to preemptively block known hackers.',
            icon: Globe,
            status: 'Concept'
        },
        {
            title: 'Behavioral Analysis AI',
            desc: 'Tracks mouse movement patterns to detect "KillAura" with 99.9% accuracy.',
            icon: UserCheck,
            status: 'Concept'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ideas.map((idea, idx) => {
                const Icon = idea.icon;
                return (
                    <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-900 transition-all group">
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                                <Icon className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded uppercase">
                                {idea.status}
                            </span>
                        </div>
                        <h3 className="font-bold text-slate-200 mb-2">{idea.title}</h3>
                        <p className="text-sm text-slate-500">{idea.desc}</p>
                        <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center text-emerald-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            Vote for this feature <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Updates;