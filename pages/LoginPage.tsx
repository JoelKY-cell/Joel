
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Button, Card } from '../components/Shared';

export const LoginPage: React.FC<{ onLogin: () => void, onBack: () => void }> = ({ onLogin, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="absolute top-8 left-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium">
          ← Retour à l'accueil
        </button>
      </div>
      
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-10">
          <div className="w-16 h-16 btn-gradient rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl mb-6">
            <span className="font-bold text-3xl">C</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Content de vous revoir</h1>
          <p className="text-gray-500 mt-2">Accédez à votre console ControlHub</p>
        </div>

        <Card className="p-8 shadow-2xl bg-white/80 backdrop-blur-xl border-white">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse Email</label>
              <input 
                type="email" 
                placeholder="nom@entreprise.fr" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Mot de passe</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Oublié ?</a>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? ICONS.EyeOff : ICONS.Eye}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember" className="text-sm text-gray-600">Rester connecté</label>
            </div>

            <Button className="w-full py-4 text-lg font-bold shadow-lg" onClick={onLogin}>
              Se connecter
            </Button>
          </form>
        </Card>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Pas encore de compte ? <a href="#" className="font-bold text-blue-600 hover:underline">Acheter un boîtier</a>
        </p>
      </div>
    </div>
  );
};
