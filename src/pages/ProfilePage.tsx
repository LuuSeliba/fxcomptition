import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useCompetition } from '../context/CompetitionContext';
import { TrophyIcon } from '../components/icons';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { leaderboard } = useCompetition();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <p>Loading...</p>
      </div>
    );
  }

  const DetailItem: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b border-gray-700">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );

  const getRankColor = (rank: number) => {
    switch (rank) {
        case 1: return 'bg-yellow-500/20 text-yellow-300';
        case 2: return 'bg-gray-400/20 text-gray-200';
        case 3: return 'bg-orange-600/20 text-orange-400';
        default: return 'bg-gray-800/10';
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Participant Dashboard</h1>
            
            <div className="space-y-2">
                <DetailItem label="Username" value={currentUser.username} />
                <DetailItem label="Full Name" value={currentUser.fullName} />
                <DetailItem label="Email" value={currentUser.email} />
                <DetailItem label="Phone" value={currentUser.phone} />
                <DetailItem label="Account Number" value={currentUser.accountNumber} />
                <DetailItem label="Trading Platform" value={currentUser.tradingPlatform} />
                <DetailItem label="Payment Status" value={
                    currentUser.paid ? (
                        <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">Paid</span>
                    ) : (
                        <div className="flex items-center gap-2">
                             <span className="px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded-full">Pending</span>
                             <Link to="/payment" className="text-blue-400 hover:underline text-sm">Pay Now</Link>
                        </div>
                    )
                }/>
            </div>
            
            <div className="mt-8 text-center">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  Logout
                </button>
            </div>
        </div>
        
        <div className="mt-8 bg-gray-800 rounded-xl shadow-2xl p-8">
            <div className="flex items-center justify-center gap-4 mb-4">
                <TrophyIcon className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white text-center">Prize Pool Information</h2>
            </div>
             <ul className="list-decimal list-inside space-y-2 pl-2 font-semibold text-white text-center">
                <li>1st Place: <span className="text-yellow-300">R5,000 cash</span></li>
                <li>2nd Place: <span className="text-gray-200">R2,000 cash</span></li>
                <li>3rd Place: <span className="text-orange-400">R1,500 cash</span></li>
                <li>4th Place: R1,000 cash</li>
                <li>5th Place: R500 cash</li>
            </ul>
        </div>

        <div className="mt-8">
            <h2 className="text-2xl font-bold text-white text-center mb-4">Top 5 Traders</h2>
            <div className="bg-gray-800/50 shadow-lg rounded-lg overflow-hidden border border-gray-700">
                <table className="min-w-full">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Rank</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Gain (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.length > 0 ? (
                            leaderboard.slice(0, 5).map((entry) => (
                                <tr key={entry.rank} className={`border-b border-gray-700 ${getRankColor(entry.rank)}`}>
                                    <td className="px-4 py-3 font-bold">{entry.rank}</td>
                                    <td className="px-4 py-3">{entry.name}</td>
                                    <td className={`px-4 py-3 font-semibold ${entry.gain > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {entry.gain.toFixed(2)}%
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center py-6 text-gray-400">
                                    Leaderboard is not yet available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
             <div className="text-center mt-4">
                <Link to="/leaderboard" className="font-medium text-blue-400 hover:text-blue-300">
                    View Full Leaderboard
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
