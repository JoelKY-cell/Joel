
import React from 'react';
import { 
  LayoutDashboard, Smartphone, Fingerprint, DoorClosed, MessageSquare, 
  ShoppingCart, Settings, User, Activity, LogOut, Bell, Search, Plus, 
  ArrowRight, Shield, Zap, Clock, ExternalLink, ChevronRight, ChevronLeft, Filter, 
  Download, MoreVertical, CheckCircle2, Menu, X, Lock, Eye, EyeOff, 
  ThumbsUp, ThumbsDown, MinusCircle, TrendingUp, ShoppingBag, CreditCard,
  MapPin, Globe, History, Smartphone as DeviceIcon, Sun, Moon, Layout
} from 'lucide-react';
import { Device, Product, Employee } from './types';

export const ICONS = {
  Dashboard: <LayoutDashboard size={20} />,
  RFID: <Smartphone size={20} />,
  Biometric: <Fingerprint size={20} />,
  Access: <DoorClosed size={20} />,
  Feedback: <MessageSquare size={20} />,
  Marketplace: <ShoppingCart size={20} />,
  Settings: <Settings size={20} />,
  User: <User size={20} />,
  Activity: <Activity size={20} />,
  Logout: <LogOut size={20} />,
  Bell: <Bell size={20} />,
  Search: <Search size={20} />,
  Plus: <Plus size={20} />,
  ArrowRight: <ArrowRight size={20} />,
  Shield: <Shield size={20} />,
  Zap: <Zap size={20} />,
  Clock: <Clock size={20} />,
  External: <ExternalLink size={20} />,
  ChevronRight: <ChevronRight size={20} />,
  ChevronLeft: <ChevronLeft size={20} />,
  Filter: <Filter size={16} />,
  Download: <Download size={16} />,
  More: <MoreVertical size={16} />,
  Check: <CheckCircle2 size={16} />,
  Menu: <Menu size={20} />,
  X: <X size={20} />,
  Lock: <Lock size={20} />,
  Eye: <Eye size={20} />,
  EyeOff: <EyeOff size={20} />,
  ThumbsUp: <ThumbsUp size={18} />,
  ThumbsDown: <ThumbsDown size={18} />,
  Neutral: <MinusCircle size={18} />,
  TrendingUp: <TrendingUp size={18} />,
  ShoppingBag: <ShoppingBag size={18} />,
  CreditCard: <CreditCard size={18} />,
  MapPin: <MapPin size={18} />,
  Globe: <Globe size={18} />,
  History: <History size={18} />,
  Device: <DeviceIcon size={18} />,
  Sun: <Sun size={20} />,
  Moon: <Moon size={20} />,
  Layout: <Layout size={20} />,
};

export const MOCK_DEVICES: Device[] = [
  { id: '#RFID-001', name: 'Entrée Principale', site: 'Paris HQ', type: 'rfid', status: 'active', signal: 3, lastActivity: '14:30', used: 3, capacity: 5 },
  { id: '#BIO-002', name: 'Salle Serveur', site: 'Paris HQ', type: 'fingerprint', status: 'active', signal: 2, lastActivity: '12:15', used: 18, capacity: 50 },
  { id: '#DOOR-003', name: 'Porte B12', site: 'Lyon Tech', type: 'door', status: 'alert', signal: 1, lastActivity: '09:45' },
  { id: '#FEED-001', name: 'Accueil Client', site: 'Paris HQ', type: 'feedback', status: 'active', signal: 3, lastActivity: '15:10', stats: { positive: 85, neutral: 10, negative: 5 } },
  { id: '#FEED-002', name: 'Guichet 1', site: 'Bordeaux South', type: 'feedback', status: 'active', signal: 2, lastActivity: '15:45', stats: { positive: 72, neutral: 18, negative: 10 } },
  { id: '#DOOR-004', name: 'Entrée Staff', site: 'Lyon Tech', type: 'door', status: 'active', signal: 3, lastActivity: '16:20' },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'p1', name: 'Boîtier RFID Présence Pro', category: 'rfid', price: 299, originalPrice: 399, 
    rating: 4.8, reviews: 124, badge: 'Populaire', 
    description: '5 cartes incluses + Connexion Wi-Fi haute portée.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p2', name: 'Lecteur Biométrique S300', category: 'biometric', price: 499, 
    rating: 4.9, reviews: 86, badge: 'Nouveau', 
    description: 'Capteur d\'empreintes haute précision AES-256.',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'p3', name: 'Contrôleur de Porte IP', category: 'access', price: 349, 
    rating: 4.5, reviews: 42, 
    description: 'Gestion centralisée via Ethernet/PoE.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400' 
  },
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', firstName: 'Jean', lastName: 'Dupont', cardId: '0012345678', lastScan: '08:30', status: 'present', avatar: 'https://i.pravatar.cc/150?u=1', role: 'Dev Backend' },
  { id: '2', firstName: 'Marie', lastName: 'Curie', cardId: '0098765432', lastScan: '08:45', status: 'present', avatar: 'https://i.pravatar.cc/150?u=2', role: 'Data Scientist' },
  { id: '3', firstName: 'Luc', lastName: 'Skywalker', cardId: '0055443322', lastScan: '14:20', status: 'absent', avatar: 'https://i.pravatar.cc/150?u=3', role: 'Pilote' },
];
