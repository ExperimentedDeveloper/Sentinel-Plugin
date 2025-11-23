
import React, { useState } from 'react';
import { Scale, Shield, FileText, Lock } from 'lucide-react';

const Legal: React.FC = () => {
    const [tab, setTab] = useState<'TOS' | 'PRIVACY' | 'EULA'>('EULA');

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <Scale className="w-8 h-8 text-slate-400" />
                    Legal Hub & Compliance
                </h2>
                <p className="text-slate-500 text-sm mt-1">Official agreements, licensing terms, and data privacy policies for SentinelCiberSecurity software.</p>
            </div>

            <div className="flex gap-4 border-b border-slate-800 mb-6">
                <button 
                    onClick={() => setTab('EULA')}
                    className={`pb-3 px-2 text-sm font-bold transition-all flex items-center gap-2 ${tab === 'EULA' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <FileText className="w-4 h-4" /> End User License Agreement
                </button>
                <button 
                    onClick={() => setTab('PRIVACY')}
                    className={`pb-3 px-2 text-sm font-bold transition-all flex items-center gap-2 ${tab === 'PRIVACY' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Lock className="w-4 h-4" /> Privacy Policy
                </button>
                <button 
                    onClick={() => setTab('TOS')}
                    className={`pb-3 px-2 text-sm font-bold transition-all flex items-center gap-2 ${tab === 'TOS' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Shield className="w-4 h-4" /> Terms of Service
                </button>
            </div>

            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-8 overflow-y-auto shadow-inner">
                <div className="max-w-4xl mx-auto prose prose-invert prose-slate">
                    {tab === 'EULA' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">Sentinel Software License Agreement</h3>
                            <p className="text-slate-400 text-sm">Last Updated: October 24, 2023</p>
                            
                            <div className="space-y-4 text-sm text-slate-300">
                                <p>IMPORTANT: PLEASE READ THIS LICENSE AGREEMENT CAREFULLY BEFORE INSTALLING OR USING THE SOFTWARE.</p>
                                
                                <h4 className="text-lg font-bold text-white mt-6">1. Grant of License</h4>
                                <p>SentinelCiberSecurity ("Licensor") grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Software solely for your personal or commercial Minecraft server purposes strictly in accordance with the terms of this Agreement.</p>
                                
                                <h4 className="text-lg font-bold text-white mt-6">2. Restrictions</h4>
                                <p>You agree not to, and you will not permit others to:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Software.</li>
                                    <li>Modify, make derivative works of, disassemble, decrypt, reverse compile or reverse engineer any part of the Software. (Strictly enforced via "GhostMode" integrity checks).</li>
                                    <li>Remove, alter or obscure any proprietary notice (including any copyright notice or trademark) of SentinelCiberSecurity.</li>
                                </ul>

                                <h4 className="text-lg font-bold text-white mt-6">3. Anti-Cheat Data Collection</h4>
                                <p>The Software automatically collects technical telemetry regarding player movement, packet patterns, and client modifications ("Cheat Data"). This data is processed locally on your server. Cloud sync features (BGP Analysis) transmit IP hashes to our central threat database.</p>

                                <h4 className="text-lg font-bold text-white mt-6">4. Termination</h4>
                                <p>This Agreement is effective until terminated. Your rights under this Agreement will terminate immediately without notice from SentinelCiberSecurity if you fail to comply with any provision of this Agreement.</p>
                            </div>
                        </div>
                    )}

                    {tab === 'PRIVACY' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">Data Privacy & Encryption Standard</h3>
                            
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                                    <Lock className="w-4 h-4" /> Zero-Knowledge Architecture
                                </h4>
                                <p className="text-xs text-emerald-100/70">Sentinel is built on a "Zero-Knowledge" principle. We do not possess the keys to decrypt your specific user database. Your AES-256 keys are stored locally in your `config.yml`.</p>
                            </div>

                            <div className="space-y-4 text-sm text-slate-300">
                                <h4 className="text-lg font-bold text-white">1. Information We Collect</h4>
                                <p>When utilizing the "Global Ban Sync" or "ASN Lookup" features, the following data is hashed and transmitted:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Server License Key (for validation)</li>
                                    <li>Attacker IP Address (SHA-256 Hashed)</li>
                                    <li>Detected Cheat Signature (e.g., "KillAura Type B")</li>
                                </ul>
                                <p>We DO NOT collect: Player Chat Logs, Passwords, Inventory Data, or Map Geometry.</p>

                                <h4 className="text-lg font-bold text-white mt-6">2. How We Use Information</h4>
                                <p>Aggregated threat data is used to improve the "CombatAI" neural network models and update the global VPN blacklist.</p>
                                
                                <h4 className="text-lg font-bold text-white mt-6">3. Third-Party Services</h4>
                                <p>The Software may integrate with Discord (via Webhooks). Please refer to Discord's Privacy Policy for data handling regarding those transmissions.</p>
                            </div>
                        </div>
                    )}

                    {tab === 'TOS' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">Terms of Service</h3>
                            
                             <div className="space-y-4 text-sm text-slate-300">
                                <h4 className="text-lg font-bold text-white">1. Acceptance of Terms</h4>
                                <p>By accessing or using the Sentinel Web Admin Panel, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

                                <h4 className="text-lg font-bold text-white mt-6">2. Account Security</h4>
                                <p>You are responsible for safeguarding the password and 2FA codes used to access the Service. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

                                <h4 className="text-lg font-bold text-white mt-6">3. Limitation of Liability</h4>
                                <p>In no event shall SentinelCiberSecurity, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service.</p>
                                
                                <h4 className="text-lg font-bold text-white mt-6">4. Governing Law</h4>
                                <p>These Terms shall be governed and construed in accordance with the laws of United States, without regard to its conflict of law provisions.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-4 text-center">
                <p className="text-[10px] text-slate-600">
                    &copy; 2024 SentinelCiberSecurity Inc. All rights reserved. "Minecraft" is a trademark of Mojang Synergies AB.
                </p>
            </div>
        </div>
    );
};

export default Legal;
