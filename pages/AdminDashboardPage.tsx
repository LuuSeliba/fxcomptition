
import React, { useState, useEffect } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { ChartBarIcon, UsersIcon, CashIcon, CheckCircleIcon, XCircleIcon, EyeIcon, EyeOffIcon, ShieldCheckIcon } from '../components/icons';
import type { LeaderboardEntry, User } from '../types';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-gray-800/50 p-6 rounded-xl flex items-center gap-4 border border-gray-700 hover:bg-gray-700/50 transition-colors duration-300">
        <div className="bg-blue-600/20 p-3 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);


const AdminDashboardPage: React.FC = () => {
    const { participants, leaderboard } = useCompetition();
    
    const [localLeaderboard, setLocalLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});
    const [participantFilter, setParticipantFilter] = useState('all');
    
    const paidParticipants = participants.filter(p => p.paid).length;
    const pendingVerification = participants.filter(p => !p.verified).length;
    const prizePool = (paidParticipants * 300 * 0.75).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });

    const filteredParticipants = participants.filter(p => {
        if (participantFilter === 'paid') return p.paid;
        if (participantFilter === 'unpaid') return !p.paid;
        if (participantFilter === 'verified') return p.verified;
        if (participantFilter === 'unverified') return !p.verified;
        return true;
    });

    useEffect(() => {
        setLocalLeaderboard([...leaderboard].sort((a,b) => a.rank - b.rank));
    }, [leaderboard]);

    const handleToggleReveal = (userId: string) => {
        if (!revealedPasswords[userId]) {
            const confirmed = window.confirm(
                'WARNING: You are about to reveal a sensitive password. Proceed with caution.'
            );
            if (confirmed) {
                setRevealedPasswords(prev => ({ ...prev, [userId]: true }));
            }
        } else {
             setRevealedPasswords(prev => ({ ...prev, [userId]: false }));
        }
    };
    
    const FilterButton: React.FC<{filter: string; label: string}> = ({ filter, label }) => (
      <button 
        onClick={() => setParticipantFilter(filter)}
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${participantFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
        {label}
      </button>
    );


    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Participants" value={participants.length} icon={<UsersIcon className="h-6 w-6 text-blue-300"/>} />
                    <StatCard title="Paid Registrations" value={paidParticipants} icon={<CheckCircleIcon className="h-6 w-6 text-blue-300"/>} />
                    <StatCard title="Pending Verification" value={pendingVerification} icon={<ShieldCheckIcon className="h-6 w-6 text-blue-300"/>} />
                    <StatCard title="Est. Prize Pool" value={prizePool} icon={<CashIcon className="h-6 w-6 text-blue-300"/>} />
                </div>

                <div className="space-y-8">
                    {/* Leaderboard Editor */}
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Manage Leaderboard Gains</h2>
                        <p className="text-sm text-gray-400 mb-4">View gains below. To edit, modify the data in the source code.</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-700/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Rank</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Gain (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {localLeaderboard.map((entry) => (
                                        <tr key={entry.id} className="border-b border-gray-700">
                                            <td className="px-4 py-2 font-bold text-gray-400">{entry.rank}</td>
                                            <td className="px-4 py-2">
                                                <input type="text" value={entry.name} readOnly className="w-full bg-gray-800 text-gray-300 p-1 rounded-md border border-transparent cursor-not-allowed"/>
                                            </td>
                                            <td className="px-4 py-2">
                                                <input type="number" step="0.01" value={entry.gain} readOnly className="w-24 bg-gray-700 p-1 rounded-md border border-gray-600 cursor-not-allowed"/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         <div className="flex items-center justify-end mt-4">
                            <button disabled className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition cursor-not-allowed">
                                Save Gains (Disabled)
                            </button>
                        </div>
                    </div>
                     {/* Registered Participants */}
                    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                            <h2 className="text-2xl font-bold text-white">Registered Participants</h2>
                            <div className="flex flex-wrap items-center gap-2">
                              <FilterButton filter="all" label="All" />
                              <FilterButton filter="paid" label="Paid" />
                              <FilterButton filter="unpaid" label="Unpaid" />
                              <FilterButton filter="verified" label="Verified" />
                              <FilterButton filter="unverified" label="Unverified" />
                            </div>
                        </div>
                         <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-700/50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Username</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Full Name</th>
                                        <th className="hidden lg:table-cell px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-300 uppercase">Investor Pass</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-300 uppercase">Payment</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-300 uppercase">Verified</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredParticipants.length > 0 ? (
                                        filteredParticipants.map((user) => (
                                            <tr key={user.id} className="border-b border-gray-700 text-sm text-gray-200 hover:bg-gray-700/50">
                                                <td className="px-4 py-3">{user.username}</td>
                                                <td className="px-4 py-3">{user.fullName}</td>
                                                <td className="hidden lg:table-cell px-4 py-3">{user.email}</td>
                                                <td className="px-4 py-3 font-mono text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span>
                                                            {revealedPasswords[user.id] ? user.investorPassword : '••••••••'}
                                                        </span>
                                                        <button onClick={() => handleToggleReveal(user.id)} className="text-gray-400 hover:text-white">
                                                            {revealedPasswords[user.id] ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {user.paid ? (
                                                        <span title="Paid"><CheckCircleIcon className="w-6 h-6 text-green-400 mx-auto" /></span>
                                                    ) : (
                                                        <span title="Not Paid"><XCircleIcon className="w-6 h-6 text-red-400 mx-auto" /></span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {user.verified ? (
                                                        <span title="Verified"><ShieldCheckIcon className="w-6 h-6 text-green-400 mx-auto" /></span>
                                                    ) : (
                                                         <span title="Pending Verification"><XCircleIcon className="w-6 h-6 text-yellow-400 mx-auto" /></span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col lg:flex-row gap-2">
                                                      <button
                                                          disabled
                                                          className="text-xs font-bold py-1 px-3 rounded-md transition w-full bg-gray-600 text-white cursor-not-allowed"
                                                      >
                                                          {user.paid ? 'Undo Pay' : 'Mark Paid'}
                                                      </button>
                                                       <button
                                                          disabled
                                                          className="text-xs font-bold py-1 px-3 rounded-md transition w-full bg-gray-600 text-white cursor-not-allowed"
                                                      >
                                                          {user.verified ? 'Un-Verify' : 'Verify'}
                                                      </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="text-center py-8 text-gray-400">
                                                No participants match the current filter.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboardPage;
