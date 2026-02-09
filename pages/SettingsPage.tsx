
import React from 'react';
import { ICONS } from '../constants';
import { Card, Button, Input, Badge } from '../components/Shared';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Paramètres de la plateforme</h1>
        <p className="text-gray-500">Gérez les préférences globales et les intégrations de votre compte entreprise.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* General Settings */}
        <Card className="p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            {ICONS.Settings} Préférences Générales
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nom de l'entreprise" placeholder="ControlHub Inc." />
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Fuseau horaire</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none">
                  <option>(GMT+01:00) Paris, Bruxelles, Madrid</option>
                  <option>(GMT+00:00) Londres, Lisbonne</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-bold text-gray-900">Notifications Email</p>
                <p className="text-xs text-gray-500">Recevoir un rapport hebdomadaire d'activité.</p>
              </div>
              <input type="checkbox" className="w-6 h-6 rounded text-blue-600 focus:ring-blue-500" defaultChecked />
            </div>
          </div>
        </Card>

        {/* Security & Access */}
        <Card className="p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            {ICONS.Shield} Sécurité des Modules
          </h3>
          <div className="space-y-6">
            <div className="p-4 border border-blue-50 bg-blue-50/30 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-blue-900">Chiffrement AES-256</p>
                <Badge variant="success">Activé</Badge>
              </div>
              <p className="text-sm text-blue-700">Toutes les données biométriques et RFID sont chiffrées de bout en bout avant synchronisation.</p>
            </div>
            <Button variant="outline" className="w-full">Régénérer les clés API de communication</Button>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="ghost">Réinitialiser</Button>
          <Button>Enregistrer les modifications</Button>
        </div>
      </div>
    </div>
  );
};
