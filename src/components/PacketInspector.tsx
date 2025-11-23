
import React, { useState } from 'react';
import { Microscope, Search, AlertTriangle, FileText, Ban, ShieldAlert } from 'lucide-react';
import { MOCK_CAPTURED_PACKETS } from '../constants';
import { CapturedPacket } from '../types';

const PacketInspector: React.FC = () => {
  const [selectedPacket, setSelectedPacket] = useState<CapturedPacket | null>(null);

  // Function to render Hex Dump
  const renderHex = (hex: string) => {
      const bytes = hex.split(' ');
      const rows = [];
      for (let i = 0; i < bytes.length; i += 16) {
          const chunk = bytes.slice(i, i + 16);
          const offset = i.toString(16).padStart(8, '0');
          const hexStr = chunk.join(' ').padEnd(47, ' ');
          const asciiStr = chunk.map(b => {
              const code = parseInt(b, 16);
              return (code >= 32 && code <= 126) ? String.fromCharCode(code) : '.';
          }).join('');
          rows.push({ offset, hexStr, asciiStr });
      }
      return rows;
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <Microscope className="w-8 h-8 text-emerald-500" />
                    Deep Packet Inspection
                </h2>
                <p className="text-slate-500 text-sm">Forensic analysis of captured malicious payloads.</p>
            </div>
            <div className="flex gap-2">
                <div className="bg-slate-900 border border-slate-800 rounded-lg flex items-center px-3 py-2">
                    <Search className="w-4 h-4 text-slate-500 mr-2" />
                    <input type="text" placeholder="Filter Protocol ID..." className="bg-transparent outline-none text-sm text-slate-300 w-48" />
                </div>
            </div>
        </div>

        <div className="flex-1 flex gap-6 overflow-hidden">
            {/* LEFT: Packet List */}
            <div className="w-1/3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
                <div className="p-3 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-slate-500">Captured Events</span>
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">LIVE CAPTURE</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {MOCK_CAPTURED_PACKETS.map(pkt => (
                        <button 
                            key={pkt.id} 
                            onClick={() => setSelectedPacket(pkt)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${selectedPacket?.id === pkt.id ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${pkt.riskLevel === 'CRITICAL' ? 'bg-red-500 text-white' : pkt.riskLevel === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                                    {pkt.riskLevel}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">{pkt.timestamp}</span>
                            </div>
                            <p className="text-slate-200 font-mono text-sm font-bold truncate">{pkt.name}</p>
                            <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
                                <span>ID: {pkt.id}</span>
                                <span>{pkt.size} B</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT: Hex Editor / Details */}
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl flex flex-col overflow-hidden relative">
                {!selectedPacket ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                        <Microscope className="w-16 h-16 mb-4 opacity-20" />
                        <p>Select a packet to inspect byte structure.</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-slate-800 rounded border border-slate-700">
                                    <FileText className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-200">{selectedPacket.name} (0x{selectedPacket.protocolId.toString(16)})</h3>
                                    <p className="text-xs text-slate-500 font-mono">Sender: {selectedPacket.sender} | Size: {selectedPacket.size} bytes</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white rounded font-bold text-sm transition-colors flex items-center gap-2">
                                <Ban className="w-4 h-4" />
                                Create Signature Ban
                            </button>
                        </div>

                        {/* Hex View */}
                        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs leading-relaxed">
                            <div className="grid grid-cols-[80px_1fr_200px] gap-4 text-slate-500 border-b border-slate-800 pb-2 mb-2 select-none">
                                <div>OFFSET</div>
                                <div>HEXADECIMAL REPRESENTATION</div>
                                <div>ASCII</div>
                            </div>
                            {renderHex(selectedPacket.hexDump).map((row, i) => (
                                <div key={i} className="grid grid-cols-[80px_1fr_200px] gap-4 hover:bg-slate-900">
                                    <div className="text-slate-600 select-none">{row.offset}</div>
                                    <div className="text-emerald-500/80">{row.hexStr}</div>
                                    <div className="text-slate-400">{row.asciiStr}</div>
                                </div>
                            ))}
                        </div>

                        {/* Alert Footer */}
                        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                            <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-red-400">Heuristic Analysis Result</h4>
                                    <p className="text-xs text-slate-400 mt-1">
                                        This packet contains a <span className="text-white">CustomPayload exploit</span> designed to crash the Netty thread. 
                                        The payload exceeds the vanilla buffer limit (32KB).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};

export default PacketInspector;
