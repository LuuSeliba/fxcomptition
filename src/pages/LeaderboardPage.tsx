import React from 'react';
import { useCompetition } from '../context/CompetitionContext';

const LeaderboardPage: React.FC = () => {
    const { leaderboard } = useCompetition();

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1: return 'bg-yellow-500/20 text-yellow-300';
            case 2: return 'bg-gray-400/20 text-gray-200';
            case 3: return 'bg-orange-600/20 text-orange-400';
            default: return 'bg-gray-800';
        }
    };
    
    return (
        <div className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">Competition Leaderboard</h1>
                    <p className="mt-4 text-lg text-gray-400">Track the top performers in real-time.</p>
                </div>

                <div className="bg-gray-900 shadow-2xl rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Gain (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.length > 0 ? (
                                    leaderboard.map((entry) => (
                                        <tr key={entry.rank} className={`border-b border-gray-700 transition-colors duration-200 hover:bg-gray-800/50 ${getRankColor(entry.rank)}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-lg font-bold ${entry.rank <=3 ? 'p-2 rounded-full' : ''}`}>{entry.rank}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">{entry.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-lg font-semibold ${entry.gain > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {entry.gain.toFixed(2)}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-12 text-gray-400">
                                            The competition has not started yet. The leaderboard is currently empty.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
