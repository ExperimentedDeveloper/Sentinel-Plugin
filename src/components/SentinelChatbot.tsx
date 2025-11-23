import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Zap, MessageSquare, Loader2, RefreshCw } from 'lucide-react';

// --- DEFINICIONES INTERNAS (Solución para la dependencia faltante) ---

type ChatRole = 'user' | 'bot';

interface ChatMessage {
    id: number;
    role: ChatRole;
    text: string;
    timestamp: string;
}

const MOCK_HISTORY: ChatMessage[] = [
    { id: 1, role: 'bot', text: 'Hello! I am Sentinel, your operational AI assistant. How can I help you secure your infrastructure today?', timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) },
    { id: 2, role: 'user', text: 'I see a high number of TCP SYN packets on port 8080. Is this normal for the API gateway?', timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) },
    { id: 3, role: 'bot', text: 'Analyzing real-time Packet Inspector data... The current SYN rate is within the baseline for the API gateway under peak load. No immediate threat detected, but I will monitor the anomaly score.', timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) },
];

// --- FIN DE DEFINICIONES INTERNAS ---


const SentinelChatbot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(MOCK_HISTORY);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom of the chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim() === '' || isThinking) return;

        const userMessage: ChatMessage = {
            id: messages.length + 1,
            role: 'user',
            text: input.trim(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsThinking(true);

        // Simulate AI Response
        setTimeout(() => {
            const botResponseText = generateBotResponse(userMessage.text);
            const botMessage: ChatMessage = {
                id: messages.length + 2,
                role: 'bot',
                text: botResponseText,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsThinking(false);
        }, 1500 + Math.random() * 1000); // 1.5 to 2.5 seconds delay
    };

    const generateBotResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('vulnerability') || lowerQuery.includes('cve')) {
            return "Based on the latest scan, I'm showing 3 active vulnerabilities. The most critical one is CVE-2021-44228 (Log4Shell exploitation path). Would you like to initiate a hotfix injection on that specific library?";
        }
        if (lowerQuery.includes('log') || lowerQuery.includes('error')) {
            return "I'm detecting a recurring WARN log from the 'SCHEDULER' component regarding a low priority thread queue overflow. The system is still stable, but performance degradation is expected if not addressed. I recommend checking the `Live Operational Stream` for details.";
        }
        if (lowerQuery.includes('packet') || lowerQuery.includes('network')) {
            return "The Packet Inspector shows an ALERT status packet originating from 10.0.2.X targeting an internal subnet. Protocol is mostly UDP. This looks anomalous. A firewall rule update might be required.";
        }
        if (lowerQuery.includes('thank')) {
            return "You're welcome! Ensuring your security is my primary directive. Is there anything else I can analyze for you?";
        }
        return "That is an interesting query. I'm running a deep analysis on that request across all modules (Vulnerability, Logs, Network). Please wait a moment while I aggregate the actionable intelligence.";
    };

    const getRoleIcon = (role: ChatRole) => {
        return role === 'bot' 
            ? <Bot className="w-5 h-5 text-cyan-400" /> 
            : <User className="w-5 h-5 text-indigo-400" />;
    };

    const getRoleClass = (role: ChatRole) => {
        return role === 'bot' 
            ? 'bg-slate-900 border-l-4 border-cyan-500' 
            : 'bg-slate-800 border-r-4 border-indigo-500';
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-cyan-500" />
                        Sentinel AI Chatbot
                    </h2>
                    <p className="text-slate-500 text-sm">Ask security and operational questions using natural language.</p>
                </div>
                <button
                    onClick={() => setMessages(MOCK_HISTORY)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all"
                >
                    <RefreshCw className="w-4 h-4" /> Reset Chat
                </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl flex-1 min-h-0 flex flex-col">
                {/* Chat Display Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ minHeight: '100px' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-start gap-3 p-3 rounded-lg ${getRoleClass(msg.role)}`}>
                            <div className="flex-shrink-0 pt-1">
                                {getRoleIcon(msg.role)}
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-mono uppercase opacity-70 mb-1 flex justify-between items-center">
                                    <span className={msg.role === 'bot' ? 'text-cyan-300' : 'text-indigo-300'}>
                                        {msg.role === 'bot' ? 'Sentinel AI' : 'User'}
                                    </span>
                                    <span className="text-slate-500">{msg.timestamp}</span>
                                </div>
                                <p className="text-sm text-slate-300 whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isThinking && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border-l-4 border-cyan-500 animate-pulse">
                            <Bot className="w-5 h-5 text-cyan-400" />
                            <div className="text-sm text-slate-400 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-400"/>
                                Sentinel is generating response...
                                <Loader2 className="w-4 h-4 animate-spin"/>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-900">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Sentinel to scan, monitor, or explain..."
                            className="flex-1 p-3 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors disabled:opacity-50"
                            disabled={isThinking}
                        />
                        <button
                            type="submit"
                            disabled={input.trim() === '' || isThinking}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-lg font-bold flex items-center justify-center transition-colors disabled:bg-slate-700 disabled:text-slate-500"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SentinelChatbot;