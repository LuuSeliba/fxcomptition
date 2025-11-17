import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { LeaderboardEntry, User } from '../types';

interface CompetitionContextType {
  participants: User[];
  spotsFilled: number;
  totalSpots: number;
  leaderboard: LeaderboardEntry[];
  updateParticipant: (username: string, updates: Partial<User>) => Promise<boolean>;
  registerParticipant: (details: Omit<User, 'id' | 'paid' | 'verified' | 'isAdmin' | 'password' | 'gain'>) => Promise<boolean>;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

const ENDPOINT = "https://script.google.com/macros/s/AKfycbynCoN5UVev1yhLn3EFaFbLeXdWsMNleOvVnhzd7k4/exec";

export const CompetitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [spotsFilled, setSpotsFilled] = useState(0);
  const totalSpots = 20;

  const fetchData = async () => {
      try {
          const res = await fetch(ENDPOINT);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          
          const usersData: User[] = data.map((d: any) => {
              const rawGain = d['Gain%'];
              const gain = !isNaN(parseFloat(rawGain)) ? parseFloat(rawGain) : 0;

              return {
                  id: d.username,
                  username: d.username,
                  fullName: d.fullName,
                  email: d.email,
                  phone: d.phone,
                  tradingPlatform: d.broker,
                  accountNumber: d.accountNumber,
                  investorPassword: d.investorPassword,
                  paid: String(d.Paid).toUpperCase() === 'TRUE',
                  verified: String(d.Verified).toUpperCase() === 'TRUE',
                  gain: gain,
              };
          });
          setParticipants(usersData);

          const leaderboardData = usersData
              .filter(p => p.paid && p.verified)
              .sort((a, b) => (b.gain ?? 0) - (a.gain ?? 0))
              .map((p, index) => ({
                  id: p.id,
                  rank: index + 1,
                  name: p.username,
                  gain: p.gain ?? 0,
              }));
          setLeaderboard(leaderboardData);

          // Derive spots filled directly from paid participants for accuracy
          setSpotsFilled(usersData.filter(u => u.paid).length);
          
      } catch (err) {
          console.error("Failed to fetch competition data:", err);
      }
  };

  useEffect(() => {
      fetchData();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
  }, []);

  const updateParticipant = async (username: string, updates: Partial<User>) => {
      try {
          const res = await fetch(ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'update', username, ...updates })
          });
          const data = await res.json();
          if(data.status === 'updated') {
              await fetchData();
              return true;
          }
          alert(data.message || 'Update failed');
          return false;
      } catch(err) {
          console.error('Update participant error:', err);
          alert('Error connecting to server for update.');
          return false;
      }
  };

  const registerParticipant = async (details: Omit<User, 'id' | 'paid' | 'verified' | 'isAdmin' | 'password' | 'gain'>) => {
      try {
          const payload: any = {
              ...details,
              broker: details.tradingPlatform,
              accountBalance: 2000,
              action: 'register'
          };
          delete payload.tradingPlatform;

          const res = await fetch(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await res.json();
          if(data.status === 'success') {
            await fetchData();
            return true;
          } else {
            alert(data.message || 'Registration failed.');
            return false;
          }
      } catch(err) {
          console.error('Registration error:', err);
          alert('Error connecting to server for registration.');
          return false;
      }
  };
  
  const value = { participants, spotsFilled, totalSpots, leaderboard, updateParticipant, registerParticipant };

  return <CompetitionContext.Provider value={value}>{children}</CompetitionContext.Provider>;
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};