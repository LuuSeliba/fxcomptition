
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { LeaderboardEntry, User } from '../types';

interface CompetitionContextType {
  participants: User[];
  spotsFilled: number;
  totalSpots: number;
  leaderboard: LeaderboardEntry[];
  updateParticipant: (username: string, updates: Partial<User>) => Promise<boolean>;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

// --- MANUAL DATA MANAGEMENT ---
// To manage participants and the leaderboard, edit the 'mockParticipants' array below.
const mockParticipants: User[] = [
  { id: 'tradermaster', username: 'tradermaster', fullName: 'Alex Doe', email: 'alex@example.com', phone: '+1234567890', tradingPlatform: 'OctaFX on MT5', accountNumber: '12345', investorPassword: 'pass', paid: true, verified: true, gain: 15.75 },
  { id: 'forexking', username: 'forexking', fullName: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', tradingPlatform: 'OctaFX on MT4', accountNumber: '67890', investorPassword: 'pass', paid: true, verified: true, gain: 12.50 },
  { id: 'pipsniper', username: 'pipsniper', fullName: 'Peter Jones', email: 'peter@example.com', phone: '+1234567892', tradingPlatform: 'OctaFX on MT5', accountNumber: '11121', investorPassword: 'pass', paid: true, verified: true, gain: 8.20 },
  { id: 'chartwizard', username: 'chartwizard', fullName: 'Mary Johnson', email: 'mary@example.com', phone: '+1234567893', tradingPlatform: 'OctaFX on MT4', accountNumber: '31415', investorPassword: 'pass', paid: true, verified: false, gain: 5.10 },
  { id: 'newtrader', username: 'newtrader', fullName: 'Sam Wilson', email: 'sam@example.com', phone: '+1234567894', tradingPlatform: 'OctaFX on MT5', accountNumber: '16180', investorPassword: 'pass', paid: false, verified: false, gain: 0.00 },
];
// ----------------------------

export const CompetitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [participants] = useState<User[]>(mockParticipants);
  
  const paidAndVerifiedParticipants = participants.filter(p => p.paid && p.verified);

  const [leaderboard] = useState<LeaderboardEntry[]>(
    paidAndVerifiedParticipants
      .sort((a, b) => (b.gain ?? 0) - (a.gain ?? 0))
      .map((p, index) => ({
        id: p.id,
        rank: index + 1,
        name: p.username,
        gain: p.gain ?? 0,
      }))
  );

  const [spotsFilled] = useState(participants.filter(p => p.paid).length);
  const totalSpots = 20;

  const updateParticipant = async (username: string, updates: Partial<User>): Promise<boolean> => {
    alert("Manual update mode is enabled. Please edit the data directly in the 'context/CompetitionContext.tsx' file.");
    console.log(`Update attempt for ${username} with`, updates);
    return false;
  };

  const value = { participants, spotsFilled, totalSpots, leaderboard, updateParticipant };

  return <CompetitionContext.Provider value={value}>{children}</CompetitionContext.Provider>;
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};