
import React, { useState } from 'react';
import { BookOpen, Code, Terminal, Server, Shield, ChevronRight, FileText, Cpu, Globe } from 'lucide-react';

const Documentation: React.FC = () => {
    const [activeSection, setActiveSection] = useState('getting-started');

    const sections = [
        { id: 'getting-started', label: 'Getting Started', icon: PlayIcon },
        { id: 'installation', label: 'Installation', icon: Server },
        { id: 'configuration', label: 'Configuration (YAML)', icon: FileText },
        { id: 'modules', label: 'Security Modules', icon: Shield },
        { id: 'api', label: 'Developer API', icon: Code },
        { id: 'commands', label: 'Commands & Perms', icon: Terminal },
    ];

    return (
        <div className="h-full flex gap-6 animate-in fade-in duration-500">
            {/* Sidebar Doc Nav */}
            <div className="w-64 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shrink-0 flex flex-col">
                <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                    <h3 className="font-bold text-slate-200 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-500" />
                        Docs Navigator
                    </h3>
                </div>
                <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {sections.map(section => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === section.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-4 h-4" />
                                    {section.label}
                                </div>
                                {activeSection === section.id && <ChevronRight className="w-3 h-3" />}
                            </button>
                        )
                    })}
                </div>
                <div className="p-4 border-t border-slate-800 bg-slate-950/30">
                    <p className="text-[10px] text-slate-500">Sentinel Docs v3.0.0</p>
                    <p className="text-[10px] text-slate-600">Updated: 2 hours ago</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-3xl mx-auto space-y-8">
                        
                        {activeSection === 'getting-started' && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-100 mb-2">SentinelCiberSecurity Documentation</h1>
                                    <p className="text-lg text-slate-400">The complete manual for operating the ultimate Minecraft security fortress.</p>
                                </div>
                                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex gap-4">
                                    <Shield className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-emerald-400 font-bold mb-1">Enterprise Grade</h4>
                                        <p className="text-sm text-slate-400">Sentinel is designed for high-performance networks. It replaces all other security plugins, acting as a unified firewall, anti-cheat, and administration suite.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                                        <h4 className="font-bold text-slate-200 mb-2">Requirements</h4>
                                        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                                            <li>Java 17 or newer</li>
                                            <li>Spigot/Paper 1.20.1+</li>
                                            <li>2GB RAM (Allocated)</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                                        <h4 className="font-bold text-slate-200 mb-2">Supported Platforms</h4>
                                        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                                            <li>PaperMC / Purpur</li>
                                            <li>Velocity Proxy</li>
                                            <li>BungeeCord</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'api' && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Developer API</h1>
                                    <p className="text-slate-400">Hook into Sentinel to create custom addons or bridge with your webstore.</p>
                                </div>
                                
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-200">Maven Dependency</h3>
                                    <div className="bg-black rounded-lg border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                                        <pre>{`<repository>
    <id>sentinel-repo</id>
    <url>https://repo.sentinelguard.net/releases</url>
</repository>

<dependency>
    <groupId>com.sentinel</groupId>
    <artifactId>sentinel-api</artifactId>
    <version>3.0.0</version>
    <scope>provided</scope>
</dependency>`}</pre>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-200">Event Listening</h3>
                                    <p className="text-sm text-slate-400">Listen for security events to trigger custom logic.</p>
                                    <div className="bg-black rounded-lg border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                                        <pre>{`@EventHandler
public void onPunish(SentinelPunishEvent event) {
    Player p = event.getTarget();
    String reason = event.getReason();
    
    // Custom logic...
    DiscordWebhook.send("Player " + p.getName() + " was banned for " + reason);
}`}</pre>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'commands' && (
                             <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Commands & Permissions</h1>
                                    <p className="text-slate-400">Reference for all administrative commands.</p>
                                </div>

                                <div className="overflow-hidden border border-slate-800 rounded-lg">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-950 text-slate-300 font-bold">
                                            <tr>
                                                <th className="p-3 border-b border-slate-800">Command</th>
                                                <th className="p-3 border-b border-slate-800">Permission</th>
                                                <th className="p-3 border-b border-slate-800">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            <tr className="hover:bg-slate-800/50">
                                                <td className="p-3 font-mono text-emerald-400">/sentinel menu</td>
                                                <td className="p-3 font-mono text-slate-400">sentinel.admin</td>
                                                <td className="p-3 text-slate-300">Opens main GUI</td>
                                            </tr>
                                             <tr className="hover:bg-slate-800/50">
                                                <td className="p-3 font-mono text-emerald-400">/sentinel scan &lt;player&gt;</td>
                                                <td className="p-3 font-mono text-slate-400">sentinel.scan</td>
                                                <td className="p-3 text-slate-300">Run AI heuristics on target</td>
                                            </tr>
                                             <tr className="hover:bg-slate-800/50">
                                                <td className="p-3 font-mono text-emerald-400">/staff</td>
                                                <td className="p-3 font-mono text-slate-400">sentinel.staff</td>
                                                <td className="p-3 text-slate-300">Toggle Staff Mode (Vanish/Tools)</td>
                                            </tr>
                                             <tr className="hover:bg-slate-800/50">
                                                <td className="p-3 font-mono text-emerald-400">/freeze &lt;player&gt;</td>
                                                <td className="p-3 font-mono text-slate-400">sentinel.freeze</td>
                                                <td className="p-3 text-slate-300">Immobilize a player</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                             </div>
                        )}

                        {/* Default Fallback for other sections */}
                        {['installation', 'configuration', 'modules'].includes(activeSection) && (
                             <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                 <Cpu className="w-16 h-16 mb-4 opacity-20" />
                                 <h2 className="text-xl font-bold">Content Loading...</h2>
                                 <p className="text-sm">This documentation section is being fetched from the secure repository.</p>
                             </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

const PlayIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>
)

export default Documentation;
