
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
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

const API_BASE_URL = '/api';

export const CompetitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [spotsFilled, setSpotsFilled] = useState(0);
  const totalSpots = 20;

  const fetchData = useCallback(async () => {
      try {
          const res = await fetch(`${API_BASE_URL}/participants`);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const usersData: User[] = await res.json();
          
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
          
          setSpotsFilled(usersData.filter(u => u.paid).length);

      } catch (err) {
          console.error("Failed to fetch competition data:", err);
      }
  }, []);

  useEffect(() => {
      fetchData();
      const interval = setInterval(fetchData, 30000); // Keep polling for updates
      return () => clearInterval(interval);
  }, [fetchData]);

  const updateParticipant = async (username: string, updates: Partial<User>): Promise<boolean> => {
      try {
          const res = await fetch(`${API_BASE_URL}/participants/${username}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates)
          });
          const data = await res.json();
          if(res.ok && data.status === 'updated') {
              await fetchData(); // Refresh data after update
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

  const registerParticipant = async (details: Omit<User, 'id' | 'paid' | 'verified' | 'isAdmin' | 'password' | 'gain'>): Promise<boolean> => {
      try {
          const res = await fetch(`${API_BASE_URL}/participants`, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await res.json();
          if(res.ok && data.status === 'success') {
            await fetchData(); // Refresh data after registration
            return true;
          } else {
            // Use message from server if available
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
