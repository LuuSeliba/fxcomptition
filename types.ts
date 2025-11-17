export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  accountNumber: string;
  investorPassword: string;
  tradingPlatform: string;
  paid: boolean;
  verified: boolean;
  isAdmin?: boolean;
  gain?: number;
}

export interface LeaderboardEntry {
  id?: string;
  rank: number;
  name: string;
  gain: number;
}