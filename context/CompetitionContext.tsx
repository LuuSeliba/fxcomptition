
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import type { LeaderboardEntry, User } from '../types';

// Hardcoded leaderboard data to seed participants
// The user will add participant data here manually.
const initialLeaderboardData: LeaderboardEntry[] = [];

const initialParticipants: User[] = initialLeaderboardData.map(entry => ({
    id: entry.id || entry.name,
    username: entry.name,
    fullName: `${entry.name} Full`,
    email: `${entry.name.toLowerCase()}@example.com`,
    phone: '+27123456789',
    accountNumber: String(Math.floor(Math.random() * 100000000)),
    investorPassword: 'password',
    tradingPlatform: 'OctaFX on MT5',
    paid: true,
    verified: true,
    isAdmin: false,
    gain: entry.gain,
}));

interface CompetitionContextType {
  participants: User[];
  spotsFilled: number;
  totalSpots: number;
  leaderboard: LeaderboardEntry[];
  updateParticipant: (username: string, updates: Partial<User>) => Promise<boolean>;
  registerParticipant: (details: Omit<User, 'id' | 'paid' | 'verified' | 'isAdmin' | 'password' | 'gain'>) => Promise<boolean>;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export const CompetitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [participants, setParticipants] = useState<User[]>(initialParticipants);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [spotsFilled, setSpotsFilled] = useState(0);
  const totalSpots = 20;

  useEffect(() => {
    // Recalculate leaderboard and spots filled when participants change
    const newLeaderboard = participants
      .filter(p => p.paid && p.verified)
      .sort((a, b) => (b.gain ?? 0) - (a.gain ?? 0))
      .map((p, index) => ({
          id: p.id,
          rank: index + 1,
          name: p.username,
          gain: p.gain ?? 0,
      }));
    setLeaderboard(newLeaderboard);
    setSpotsFilled(participants.filter(p => p.paid).length);
  }, [participants]);


  const updateParticipant = async (username: string, updates: Partial<User>): Promise<boolean> => {
    setParticipants(prev =>
      prev.map(p => {
        if (p.username.toLowerCase() === username.toLowerCase()) {
          return { ...p, ...updates };
        }
        return p;
      })
    );
    return true; // Simulate success
  };
  
  const registerParticipant = async (details: Omit<User, 'id' | 'paid' | 'verified' | 'isAdmin' | 'password' | 'gain'>): Promise<boolean> => {
    const existing = participants.find(p => p.username.toLowerCase() === details.username.toLowerCase() || p.email.toLowerCase() === details.email.toLowerCase());
    if (existing) {
        console.error("User already exists");
        return false; // Simulate failure
    }
    const newUser: User = {
        id: details.username,
        ...details,
        paid: false,
        verified: false,
        isAdmin: false,
        gain: 0,
    };
    setParticipants(prev => [...prev, newUser]);
    return true; // Simulate success
  };

  const value = { 
    participants,
    leaderboard,
    spotsFilled, 
    totalSpots,
    updateParticipant,
    registerParticipant,
  };

  return <CompetitionContext.Provider value={value}>{children}</CompetitionContext.Provider>;
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};
