
import React from 'react';
import { ICONS, MOCK_PRODUCTS } from '../constants';
import { Button, Card, Badge } from '../components/Shared';

export const LandingPage: React.FC<{ onStart: () => void, onLogin: () => void }> = ({ onStart, onLogin }) => {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 btn-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
            <span className="font-bold text-xl">T</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">TANGA GROUP</h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Fonctionnalités</a>
          <a href="#marketplace" className="hover:text-blue-600 transition-colors">Marketplace</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Tarifs</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onLogin} className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2">Se connecter</button>
          <Button onClick={onStart}>Commencer gratuitement</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-8 animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          NOUVEAU : MODULE BIOMÉTRIQUE S300
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight animate-slide-up">
          Centralisez vos systèmes physiques dans une <span className="text-transparent bg-clip-text btn-gradient">plateforme unique</span>
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          RFID, biométrie, contrôle d'accès et feedback client. Achetez votre matériel, profitez de la plateforme gratuitement à vie.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button className="px-8 py-4 text-lg shadow-xl" onClick={onStart}>Commencer gratuitement</Button>
          <Button variant="outline" className="px-8 py-4 text-lg">Voir la démo</Button>
        </div>

        {/* Floating Dashboard Preview */}
        <div className="mt-20 relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
          <div className="bg-gray-900 rounded-[24px] p-4 shadow-2xl border border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Dashboard" className="rounded-xl opacity-80" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Une solution complète pour votre entreprise</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Gérez tous vos périphériques ControlHub depuis une interface web intuitive et performante.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "RFID Présence", icon: "📱", color: "blue", points: ["5 cartes incluses", "Historique temps réel", "Export PDF/Excel"] },
              { title: "Empreinte Digitale", icon: "👆", color: "purple", points: ["5 empreintes", "Sécurité AES-256", "Enrôlement guidé"] },
              { title: "RFID Porte", icon: "🚪", color: "emerald", points: ["Contrôle d'accès", "Planning horaire", "Journal d'audit"] },
              { title: "Feedback Client", icon: "💬", color: "amber", points: ["Multi-emplacements", "Stats temps réel", "Alertes satisfaction"] },
            ].map((feature, i) => (
              <Card key={i} className="p-8 card-hover border-none shadow-sm">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {p}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section id="marketplace" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à équiper vos locaux ?</h2>
              <p className="text-gray-500">Achat unique. Pas d'abonnement. Accès illimité.</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">Voir toute la boutique {ICONS.ArrowRight}</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.map(product => (
              <Card key={product.id} className="group overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                </div>
                <div className="p-6">
                  <Badge variant="blue">{product.badge || 'Matériel'}</Badge>
                  <h3 className="text-lg font-bold text-gray-900 mt-3">{product.name}</h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-bold text-gray-900">{product.price}€</span>
                    <Button variant="secondary" className="px-3">{ICONS.Marketplace}</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 btn-gradient rounded-xl flex items-center justify-center text-white">
                <span className="font-bold text-xl">T</span>
              </div>
              <h1 className="text-xl font-bold">TANGA GROUP</h1>
            </div>
            <p className="text-gray-400 text-sm">Le futur de la gestion physique de votre entreprise est ici.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Plateforme</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Société</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Légal</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CGV</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2026 TANGA GROUP. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};