import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'Winniefsq@outlook.com';
const ADMIN_PASSWORD = '198910Lorraine';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, pass: string): Promise<boolean> => {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASSWORD) {
        const adminUser: User = {
          id: 'admin-user',
          username: 'Winniefsq',
          fullName: 'Administrator',
          email: ADMIN_EMAIL,
          phone: 'N/A',
          accountNumber: 'N/A',
          investorPassword: 'N/A',
          tradingPlatform: 'N/A',
          paid: true,
          verified: true,
          isAdmin: true,
        };
        setCurrentUser(adminUser);
        return true;
    }
    console.error("Invalid admin credentials provided.");
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};