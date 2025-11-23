import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, UserCheck, ShieldCheck, AlertTriangle } from 'lucide-react';
import { WhitelistedPlayer } from '../types';

const WhitelistManager: React.FC = () => {
  const [players, setPlayers] = useState<WhitelistedPlayer[]>([]);
  const [newNickname, setNewNickname] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  // Simulate initial data load
  useEffect(() => {
    setPlayers([
      { id: '1', nickname: 'ServerOwner', addedBy: 'System', dateAdded: '2023-10-01' },
      { id: '2', nickname: 'Admin_User', addedBy: 'Console', dateAdded: '2023-11-15' }
    ]);
  }, []);

  const handleAdd = useCallback(() => {
    if (!newNickname.trim()) {
      setFeedback({ type: 'error', message: 'Nickname cannot be empty' });
      return;
    }
    
    if (players.some(p => p.nickname.toLowerCase() === newNickname.toLowerCase())) {
        setFeedback({ type: 'error', message: 'Player is already on the bypass list' });
        return;
    }

    const newPlayer: WhitelistedPlayer = {
      id: Math.random().toString(36).substr(2, 9),
      nickname: newNickname,
      addedBy: 'SentinelAdmin',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setPlayers(prev => [...prev, newPlayer]);
    setNewNickname('');
    setFeedback({ type: 'success', message: `Sentinel Bypass granted for ${newPlayer.nickname}` });

    setTimeout(() => setFeedback({ type: null, message: '' }), 3000);
  }, [newNickname, players]);

  const handleRemove = (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-6 opacity-5">
            <ShieldCheck className="w-32 h-32 text-emerald-500" />
        </div>

        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                Global Bypass Manager
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Players added to this list will <strong>completely bypass</strong> the <span className="text-emerald-400">AntiBot</span> and <span className="text-emerald-400">AntiVPN</span> modules.
              This is useful for staff members or trusted players connecting from restricted networks.
            </p>
          </div>
          <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-2">
             <AlertTriangle className="w-5 h-5 text-yellow-500" />
             <span className="text-xs font-medium text-yellow-500 uppercase tracking-wide">Admin Only</span>
          </div>
        </div>

        <div className="relative z-10 flex gap-3 mb-6">
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="Enter player nickname to bypass checks..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
          />
          <button
            onClick={handleAdd}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-900/20"
          >
            <Plus className="w-5 h-5" />
            Grant Immunity
          </button>
        </div>

        {feedback.message && (
            <div className={`mb-4 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {feedback.type === 'success' ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {feedback.message}
            </div>
        )}

        <div className="overflow-hidden rounded-lg border border-slate-800 relative z-10">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 font-medium">
              <tr>
                <th className="px-4 py-3">Bypassed Nickname</th>
                <th className="px-4 py-3">Added By</th>
                <th className="px-4 py-3">Date Added</th>
                <th className="px-4 py-3 text-right">Revoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/50">
              {players.length === 0 ? (
                <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500 italic">No active bypasses. Security is running at 100%.</td>
                </tr>
              ) : (
                  players.map((player) => (
                    <tr key={player.id} className="hover:bg-slate-800/80 transition-colors group">
                      <td className="px-4 py-3 font-bold text-emerald-400 flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        {player.nickname}
                      </td>
                      <td className="px-4 py-3 text-slate-400">{player.addedBy}</td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-xs">{player.dateAdded}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleRemove(player.id)}
                          className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded transition-all"
                          title="Revoke Bypass"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WhitelistManager;