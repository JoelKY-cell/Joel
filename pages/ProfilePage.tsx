
import React, { useState } from 'react';
import { ICONS, MOCK_DEVICES } from '../constants';
import { Card, Badge, Button, Input } from '../components/Shared';

export const ProfilePage: React.FC = () => {
  const [is2FA, setIs2FA] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex items-center gap-8 bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
        <div className="relative group">
          <img src="https://i.pravatar.cc/150?u=admin" className="w-24 h-24 rounded-3xl border-4 border-white shadow-xl" alt="Profile" />
          <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
            {ICONS.Plus}
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Alex Admin</h1>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            {ICONS.Globe} Administrateur Global • ControlHub HQ
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="blue">Compte Pro</Badge>
            <Badge variant="success">Vérifié</Badge>
          </div>
        </div>
        <Button variant="outline">Modifier le profil</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h3 className="font-bold text-gray-900 px-1">Paramètres Sécurité</h3>
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Double authentification (2FA)</p>
                <p className="text-xs text-gray-500">Ajoute une couche de sécurité par SMS ou App.</p>
              </div>
              <button 
                onClick={() => setIs2FA(!is2FA)}
                className={`w-12 h-6 rounded-full transition-colors relative ${is2FA ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${is2FA ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="pt-4 border-t border-gray-50">
              <p className="text-xs font-bold text-gray-400 uppercase mb-4">Changer le mot de passe</p>
              <div className="space-y-4">
                <Input label="Ancien mot de passe" type="password" placeholder="••••••••" />
                <Input label="Nouveau mot de passe" type="password" placeholder="••••••••" />
                <Button className="w-full">Mettre à jour le mot de passe</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <h3 className="font-bold text-gray-900 px-1">Matériel Possédé</h3>
          <div className="space-y-4">
            {MOCK_DEVICES.slice(0, 3).map(device => (
              <Card key={device.id} className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  {ICONS.Device}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{device.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{device.id}</p>
                </div>
                <Badge variant="neutral">Garanti</Badge>
              </Card>
            ))}
            <Button variant="secondary" className="w-full">Acheter du matériel supplémentaire</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
