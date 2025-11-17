import React, { useState, useEffect, FormEvent } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { ChartBarIcon, UsersIcon, CashIcon, CheckCircleIcon, XCircleIcon, TrashIcon, EyeIcon, EyeOffIcon, ShieldCheckIcon, PlusIcon, UserIcon, MailIcon, PhoneIcon, HashtagIcon, LockIcon, ChevronDownIcon, XIcon } from '../components/icons';
import type { LeaderboardEntry, User } from '../types';
import InputField from '../components/InputField';

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
    const { participants, leaderboard, updateParticipant, registerParticipant } = useCompetition();
    
    const [localLeaderboard, setLocalLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [leaderboardMessage, setLeaderboardMessage] = useState('');
    const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});
    const [participantFilter, setParticipantFilter] = useState('all');

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormState, setAddFormState] = useState({
        username: '',
        fullName: '',
        email: '',
        phone: '',
        accountNumber: '',
        investorPassword: '',
        tradingPlatform: '',
    });
    const [addFormStatus, setAddFormStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
    const [addFormError, setAddFormError] = useState('');
    const [showAddFormInvestorPassword, setShowAddFormInvestorPassword] = useState(false);
    
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
    
    const handleLeaderboardChange = (index: number, field: 'name' | 'gain', value: string | number) => {
        const updated = [...localLeaderboard];
        if (field === 'gain') {
            const gainValue = parseFloat(String(value));
            updated[index] = { ...updated[index], [field]: isNaN(gainValue) ? 0 : gainValue };
        } else {
            updated[index] = { ...updated[index], [field]: String(value) };
        }
        setLocalLeaderboard(updated);
    };

    const handleLeaderboardSave = async () => {
        setLeaderboardMessage('Saving...');
        try {
            const updatePromises = localLeaderboard
                .filter(entry => {
                    const original = leaderboard.find(l => l.id === entry.id);
                    return original && original.gain !== entry.gain;
                })
                .map(entry => updateParticipant(entry.name, { gain: entry.gain }));

            await Promise.all(updatePromises);
            setLeaderboardMessage('Leaderboard updated successfully!');

        } catch (error) {
            console.error("Error updating leaderboard: ", error);
            setLeaderboardMessage('Error saving leaderboard.');
        } finally {
             setTimeout(() => setLeaderboardMessage(''), 3000);
        }
    };
    
    const handleTogglePayment = (user: User) => {
      updateParticipant(user.username, { paid: !user.paid });
    };

    const handleToggleVerification = (user: User) => {
      updateParticipant(user.username, { verified: !user.verified });
    };


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

    const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleAddParticipantSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setAddFormError('');
        setAddFormStatus('submitting');
        
        if (Object.values(addFormState).some(value => value === '')) {
            setAddFormError('All fields are required.');
            setAddFormStatus('error');
            return;
        }

        const success = await registerParticipant(addFormState);
        if (success) {
            setIsAddModalOpen(false);
            setAddFormState({
                username: '',
                fullName: '',
                email: '',
                phone: '',
                accountNumber: '',
                investorPassword: '',
                tradingPlatform: '',
            });
            setAddFormStatus('idle');
        } else {
            setAddFormError('Failed to add participant. Username or email may already exist.');
            setAddFormStatus('error');
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
                        <p className="text-sm text-gray-400 mb-4">Edit gains below. Ranks are automatically calculated based on paid & verified users.</p>
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
                                    {localLeaderboard.map((entry, index) => (
                                        <tr key={entry.id || index} className="border-b border-gray-700">
                                            <td className="px-4 py-2 font-bold text-gray-400">{entry.rank || '...'}</td>
                                            <td className="px-4 py-2">
                                                <input type="text" value={entry.name} readOnly className="w-full bg-gray-800 p-1 rounded-md border border-transparent"/>
                                            </td>
                                            <td className="px-4 py-2">
                                                <input type="number" step="0.01" value={entry.gain} onChange={(e) => handleLeaderboardChange(index, 'gain', e.target.value)} className="w-24 bg-gray-700 p-1 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         <div className="flex items-center justify-end mt-4">
                            <div className="flex items-center gap-4">
                                {leaderboardMessage && (
                                    <span className="text-green-400 text-sm flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5" /> {leaderboardMessage}
                                    </span>
                                )}
                                <button onClick={handleLeaderboardSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                                    Save Gains
                                </button>
                            </div>
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
                               <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-md transition bg-green-600 text-white hover:bg-green-700"
                                >
                                    <PlusIcon className="w-4 h-4" /> Add Participant
                                </button>
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
                                                          onClick={() => handleTogglePayment(user)}
                                                          className={`text-xs font-bold py-1 px-3 rounded-md transition w-full ${
                                                              user.paid
                                                                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                                                  : 'bg-green-600 hover:bg-green-700 text-white'
                                                          }`}
                                                      >
                                                          {user.paid ? 'Undo Pay' : 'Mark Paid'}
                                                      </button>
                                                       <button
                                                          onClick={() => handleToggleVerification(user)}
                                                          className={`text-xs font-bold py-1 px-3 rounded-md transition w-full ${
                                                              user.verified
                                                                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                          }`}
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
             {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Add New Participant</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddParticipantSubmit} className="space-y-4">
                            <InputField name="username" icon={<UserIcon className="h-5 w-5 text-gray-400"/>} type="text" placeholder="Username" value={addFormState.username} onChange={handleAddFormChange} />
                            <InputField name="fullName" icon={<UserIcon className="h-5 w-5 text-gray-400"/>} type="text" placeholder="Full Name (private)" value={addFormState.fullName} onChange={handleAddFormChange} />
                            <InputField name="email" icon={<MailIcon className="h-5 w-5 text-gray-400"/>} type="email" placeholder="Email address" value={addFormState.email} onChange={handleAddFormChange} />
                            <InputField name="phone" icon={<PhoneIcon className="h-5 w-5 text-gray-400"/>} type="tel" placeholder="Phone Number (e.g. +27...)" value={addFormState.phone} onChange={handleAddFormChange} />
                            <InputField name="accountNumber" icon={<HashtagIcon className="h-5 w-5 text-gray-400"/>} type="text" placeholder="Trading Account Number" value={addFormState.accountNumber} onChange={handleAddFormChange} />
                            <InputField
                                name="investorPassword"
                                icon={<LockIcon className="h-5 w-5 text-gray-400"/>}
                                type="password"
                                placeholder="Investor (Read-Only) Password"
                                value={addFormState.investorPassword}
                                onChange={handleAddFormChange}
                                isPassword
                                passwordVisible={showAddFormInvestorPassword}
                                onToggleVisibility={() => setShowAddFormInvestorPassword(!showAddFormInvestorPassword)}
                            />

                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><ChartBarIcon className="h-5 w-5 text-gray-400" /></span>
                                <select
                                    name="tradingPlatform"
                                    value={addFormState.tradingPlatform}
                                    onChange={handleAddFormChange}
                                    required
                                    className={`w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none ${!addFormState.tradingPlatform ? 'text-gray-400' : 'text-white'}`}
                                >
                                    <option value="" disabled>Select Trading Platform</option>
                                    <option value="OctaFX on MT4">OctaFX on MT4</option>
                                    <option value="OctaFX on MT5">OctaFX on MT5</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"><ChevronDownIcon className="w-5 h-5 text-gray-400"/></div>
                            </div>

                            {addFormStatus === 'error' && <p className="text-red-500 text-sm text-center">{addFormError}</p>}
                            
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                                <button type="submit" disabled={addFormStatus === 'submitting'} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800 disabled:cursor-not-allowed">
                                    {addFormStatus === 'submitting' ? 'Adding...' : 'Add Participant'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AdminDashboardPage;