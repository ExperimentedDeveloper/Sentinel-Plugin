
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
    const [search, setSearch] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "Does Sentinel support Bedrock Edition (GeyserMC)?",
            a: "Yes. Sentinel automatically detects Geyser players by their UUID prefix and Floodgate handshake. It adjusts movement checks (AntiCheat) to be more lenient with Bedrock packets to prevent false positives."
        },
        {
            q: "How does the 'AES-256 Encrypted Database' work?",
            a: "Sentinel intercepts all data write operations (bans, logs, reports). Before saving to MySQL or YAML, it encrypts the string using AES-256-GCM with a rotating key stored in your config. Even if your database is leaked, the data is unreadable."
        },
        {
            q: "Can I use this with other AntiCheats like Vulcan or Grim?",
            a: "Technically yes, but it is not recommended. Sentinel is a full-suite solution. Running two movement checks simultaneously will double the server load and may cause conflict loops. We suggest disabling Sentinel's 'Movement' modules if you wish to use another AC."
        },
        {
            q: "Does the AntiVPN block residential proxies?",
            a: "Yes. Our 'Resi-Guard' technology analyzes the TCP/IP fingerprint (MTU size, TCP Window, Hop Count) to distinguish between a real home connection and a residential proxy tunnel used by attackers."
        },
        {
            q: "What happens if I lose my 2FA device?",
            a: "You must use the 'Recovery Codes' generated during registration. If you lost those too, you will need console access to delete your 'user_data.dat' file or manually remove the 2FA entry from the encrypted config."
        },
        {
            q: "Is the Neural Network (AI) performance heavy?",
            a: "No. The AI runs on a separate asynchronous thread (`Netty EventLoop`). It samples 1 out of every 5 packets for analysis, ensuring it has zero impact on the main server TPS."
        },
        {
            q: "How do I link my Discord bot?",
            a: "Go to the Developer Portal, create a bot, and paste the Token in the Settings tab. Then invite the bot to your server. Sentinel handles the rest via the `/link` command."
        }
    ];

    const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <HelpCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100">Frequently Asked Questions</h2>
                <p className="text-slate-400 mt-2">Answers regarding installation, security mechanics, and troubleshooting.</p>
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    placeholder="Search knowledge base..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                    <div className="text-center p-12 border border-dashed border-slate-800 rounded-xl">
                        <p className="text-slate-500">No results found for "{search}".</p>
                    </div>
                ) : (
                    filteredFaqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`bg-slate-900 border rounded-xl transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-slate-800 hover:border-slate-700'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                            >
                                <span className={`font-bold text-lg ${openIndex === index ? 'text-emerald-400' : 'text-slate-200'}`}>
                                    {faq.q}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-emerald-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-500" />
                                )}
                            </button>
                            
                            {openIndex === index && (
                                <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2">
                                    <div className="h-px w-full bg-slate-800 mb-4"></div>
                                    <p className="text-slate-400 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-slate-200">Still need help?</h4>
                    <p className="text-sm text-slate-500">Our enterprise support team is available 24/7 for premium license holders.</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default FAQ;
