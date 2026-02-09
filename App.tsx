
import React, { useState, useEffect } from 'react';
import { ICONS } from './constants';
import { AppState } from './types';
import { Button } from './components/Shared';
import { DashboardHome } from './pages/DashboardHome';
import { RFIDModule } from './pages/RFIDModule';
import { BiometricModule } from './pages/BiometricModule';
import { AccessModule } from './pages/AccessModule';
import { FeedbackModule } from './pages/FeedbackModule';
import { Marketplace } from './pages/Marketplace';
import { ProfilePage } from './pages/ProfilePage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SettingsPage } from './pages/SettingsPage';

type Theme = 'light' | 'dark' | 'mixed';

const SidebarLink: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  onClick: () => void,
  collapsed?: boolean,
  badge?: number
}> = ({ icon, label, active, onClick, collapsed, badge }) => (
  <button 
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative ${
      active 
        ? 'bg-[#B8860B] text-white shadow-xl shadow-amber-900/20 scale-[1.02]' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    } ${collapsed ? 'justify-center' : ''}`}
  >
    <span className={active ? 'text-white' : 'text-gray-400 group-hover:text-[#D4AF37] transition-colors'}>{icon}</span>
    {!collapsed && <span className="font-bold text-sm tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>}
    {badge && !collapsed && (
      <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-red-50 text-red-600 animate-pulse'}`}>
        {badge}
      </span>
    )}
    {badge && collapsed && (
      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
    )}
  </button>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState<AppState>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSite, setCurrentSite] = useState('Tous les sites');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (isLoggedIn && (page === 'landing' || page === 'login')) {
      setPage('dashboard');
    }
  }, [isLoggedIn, page]);

  useEffect(() => {
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark', 'theme-mixed');
    body.classList.add(`theme-${theme}`);
  }, [theme]);

  const renderContent = () => {
    if (page === 'landing') return <LandingPage onStart={() => setPage('login')} onLogin={() => setPage('login')} />;
    if (page === 'login') return <LoginPage onLogin={() => { setIsLoggedIn(true); setPage('dashboard'); }} onBack={() => setPage('landing')} />;

    switch (page) {
      case 'dashboard': return <DashboardHome />;
      case 'rfid': return <RFIDModule />;
      case 'biometric': return <BiometricModule />;
      case 'access': return <AccessModule />;
      case 'feedback': return <FeedbackModule />;
      case 'marketplace': return <Marketplace />;
      case 'profile': return <ProfilePage />;
      case 'settings': return <SettingsPage />;
      default: return null;
    }
  };

  if (page === 'landing' || page === 'login') return renderContent();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('mixed');
    else setTheme('light');
  };

  const sidebarWidth = isSidebarCollapsed ? 'lg:w-[90px]' : 'lg:w-[300px]';

  return (
    <div className="min-h-screen flex text-gray-900 selection:bg-amber-100 selection:text-amber-700 bg-[#F9FAFB] overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(true)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-50 ${sidebarWidth} w-[280px] bg-white border-r border-gray-100 flex flex-col p-5 transition-all duration-500 ease-in-out transform ${isSidebarOpen ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
        
        {/* Sidebar Header Container */}
        <div className={`flex items-center mb-12 ${isSidebarCollapsed ? 'flex-col gap-4' : 'justify-between px-1'}`}>
          <div className={`flex items-center gap-3 group cursor-pointer`} onClick={() => setPage('dashboard')}>
            <div className="w-11 h-11 btn-gradient rounded-xl flex items-center justify-center text-white shadow-xl shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="font-black text-xl">T</span>
            </div>
            {!isSidebarCollapsed && (
              <div className="animate-in fade-in duration-500 slide-in-from-left-2">
                <h1 className="text-lg font-black tracking-tighter text-gray-900 leading-none">TANGA GROUP</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Système complet</span>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Toggle Button (Inside Header) */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? "Développer" : "Réduire"}
            className="hidden lg:flex w-9 h-9 btn-gradient rounded-lg items-center justify-center text-white shadow-lg shadow-amber-500/20 hover:scale-110 active:scale-95 transition-all flex-shrink-0"
          >
            {isSidebarCollapsed ? ICONS.ChevronRight : ICONS.Menu}
          </button>
          
          {/* Mobile Close Button */}
          <button className="lg:hidden p-2 text-gray-400 hover:text-gray-900" onClick={() => setIsSidebarOpen(true)}>
            {ICONS.X}
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar -mx-2 px-2">
          {!isSidebarCollapsed && <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] px-4 mb-3">Principal</p>}
          <SidebarLink icon={ICONS.Dashboard} label="Vue d'ensemble" active={page === 'dashboard'} onClick={() => setPage('dashboard')} collapsed={isSidebarCollapsed} />
          
          <div className="h-6" />
          {!isSidebarCollapsed && <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] px-4 mb-3">Modules Physiques</p>}
          <SidebarLink icon={ICONS.RFID} label="RFID Présence" active={page === 'rfid'} onClick={() => setPage('rfid')} collapsed={isSidebarCollapsed} />
          <SidebarLink icon={ICONS.Biometric} label="Biométrie" active={page === 'biometric'} onClick={() => setPage('biometric')} collapsed={isSidebarCollapsed} />
          <SidebarLink icon={ICONS.Access} label="Accès Portes" active={page === 'access'} onClick={() => setPage('access')} badge={1} collapsed={isSidebarCollapsed} />
          <SidebarLink icon={ICONS.Feedback} label="Feedback Client" active={page === 'feedback'} onClick={() => setPage('feedback')} collapsed={isSidebarCollapsed} />
          
          <div className="h-6" />
          {!isSidebarCollapsed && <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] px-4 mb-3">Configuration</p>}
          <SidebarLink icon={ICONS.User} label="Profil Entreprise" active={page === 'profile'} onClick={() => setPage('profile')} collapsed={isSidebarCollapsed} />
          <SidebarLink icon={ICONS.Settings} label="Paramètres" active={page === 'settings'} onClick={() => setPage('settings')} collapsed={isSidebarCollapsed} />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <SidebarLink icon={ICONS.Marketplace} label="Marketplace" active={page === 'marketplace'} onClick={() => setPage('marketplace')} collapsed={isSidebarCollapsed} />
          <button 
            onClick={() => { setIsLoggedIn(false); setPage('landing'); }}
            title={isSidebarCollapsed ? "Déconnexion" : undefined}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 group mt-1 ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <span className="group-hover:rotate-12 transition-transform flex-shrink-0">{ICONS.Logout}</span>
            {!isSidebarCollapsed && <span className="font-bold text-sm">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300">
        <header className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20 px-4 md:px-8 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2.5 bg-gray-50 text-gray-500 hover:text-amber-600 rounded-xl transition-all" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {ICONS.Menu}
            </button>
            <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
               <span className="text-gray-400">{ICONS.MapPin}</span>
               <select 
                 value={currentSite} 
                 onChange={(e) => setCurrentSite(e.target.value)}
                 className="bg-transparent text-xs font-bold text-gray-700 outline-none cursor-pointer"
               >
                 <option>Tous les sites</option>
                 <option>Wemtenga</option>
                 <option>Patte D'oie</option>
                 <option>Ouaga 2000</option>
               </select>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-5">
            <div className="hidden md:flex items-center relative">
              <span className="absolute left-4 text-gray-400">{ICONS.Search}</span>
              <input 
                placeholder="Rechercher... (⌘K)" 
                className="pl-11 pr-5 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-amber-200 focus:ring-4 focus:ring-amber-500/5 transition-all w-[200px] lg:w-[300px] shadow-sm" 
              />
            </div>
            
            <div className="flex items-center gap-1.5">
              <button 
                onClick={cycleTheme}
                className="p-2.5 text-gray-400 hover:text-[#B8860B] hover:bg-amber-50 rounded-xl transition-all"
              >
                {theme === 'light' ? ICONS.Sun : theme === 'dark' ? ICONS.Moon : ICONS.Layout}
              </button>
              <button className="p-2.5 text-gray-400 hover:text-[#B8860B] hover:bg-amber-50 rounded-xl transition-all relative">
                {ICONS.Bell}
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-px h-6 bg-gray-100 mx-1 md:mx-2" />
              <button onClick={() => setPage('profile')} className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 transition-all">
                <img src="https://i.pravatar.cc/150?u=admin" className="w-9 h-9 rounded-lg border border-gray-100 shadow-sm" alt="Admin" />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-black text-gray-900 leading-none">Alex Admin</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-5 md:p-10 max-w-7xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
