
export type AppState = 'landing' | 'login' | 'dashboard' | 'rfid' | 'biometric' | 'access' | 'feedback' | 'marketplace' | 'profile' | 'settings';

export interface Device {
  id: string;
  name: string;
  site: string;
  type: 'rfid' | 'fingerprint' | 'door' | 'feedback';
  status: 'active' | 'inactive' | 'alert';
  signal: number; // 0-3
  lastActivity: string;
  capacity?: number;
  used?: number;
  stats?: {
    positive?: number;
    neutral?: number;
    negative?: number;
  };
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  cardId: string;
  lastScan: string;
  status: 'present' | 'absent';
  avatar: string;
  role: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'rfid' | 'biometric' | 'access' | 'other';
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: 'Populaire' | 'Nouveau';
  description: string;
  image: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  company: string;
  avatar: string;
  isTwoFactorEnabled: boolean;
}
