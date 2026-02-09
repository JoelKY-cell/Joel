
import React, { useState } from 'react';
import { ICONS, MOCK_DEVICES, MOCK_EMPLOYEES } from '../constants';
import { Card, Badge, Button, Overlay, Input } from '../components/Shared';

export const BiometricModule: React.FC = () => {
  const [activeOverlay, setActiveOverlay] = useState<'employees' | 'history' | 'add' | 'add_device' | null>(null);
  const [enrollStep, setEnrollStep] = useState(1);
  
  const biometricDevices = MOCK_DEVICES.filter(d => d.type === 'fingerprint');

  const renderEnrollmentContent = () => {
    switch(enrollStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600">
                {ICONS.Shield}
              </div>
              <div>
                <p className="text-sm font-bold text-purple-900">Sécurité AES-256</p>
                <p className="text-xs text-purple-600">Les données biométriques sont hashées localement sur le boîtier.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Boîtier</label>
                <input disabled value="Salle Serveur (#BIO-002)" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Prénom" placeholder="Ex: Marie" />
                <Input label="Nom" placeholder="Ex: Curie" />
              </div>
              <p className="text-xs text-gray-500">32 emplacements d'empreintes restants sur ce boîtier.</p>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="ghost" onClick={() => setActiveOverlay(null)}>Annuler</Button>
              <Button onClick={() => setEnrollStep(2)}>Commencer l'enrôlement {ICONS.ArrowRight}</Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center py-10">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-purple-100 rounded-full animate-ping opacity-20" />
              <div className="relative w-32 h-32 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                {ICONS.Biometric}
              </div>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Posez votre doigt</h4>
            <p className="text-gray-500 max-w-xs mx-auto mb-8">Posez l'index sur le lecteur du boîtier #BIO-002 pour scanner l'empreinte.</p>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-8">
              <div className="bg-purple-600 h-full w-2/3 transition-all duration-1000" />
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => setEnrollStep(1)}>Retour</Button>
              <Button variant="success" onClick={() => setEnrollStep(3)}>Simuler Succès</Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              {ICONS.Check}
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Enrôlement réussi !</h4>
            <p className="text-gray-500 mb-10">L'empreinte a été sécurisée et associée à l'employé avec succès.</p>
            <div className="flex justify-center gap-3">
              <Button variant="secondary" onClick={() => setEnrollStep(1)}>Ajouter un autre</Button>
              <Button className="w-full" onClick={() => setActiveOverlay(null)}>Terminer</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">{ICONS.Biometric}</span>
            Empreinte Digitale
          </h1>
          <p className="text-gray-500">Gérez les enrôlements biométriques et suivez les accès sécurisés.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">{ICONS.Download} Exporter</Button>
          <Button onClick={() => setActiveOverlay('add_device')}>{ICONS.Plus} Ajouter boîtier</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-5 border-l-4 border-l-purple-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Enrôlements totaux</p>
          <p className="text-2xl font-bold text-gray-900">18</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Taux de match</p>
          <p className="text-2xl font-bold text-gray-900">99.8%</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Temps auth moy.</p>
          <p className="text-2xl font-bold text-gray-900">0.8s</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-red-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Alertes Sécurité</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {biometricDevices.map(device => (
          <Card key={device.id} className="overflow-hidden flex flex-col">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{device.name}</h3>
                  <p className="text-sm text-gray-400 font-mono">{device.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={device.status === 'active' ? 'success' : 'error'}>
                    {device.status === 'active' ? 'En ligne' : 'Inactif'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-50 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Inscrits</p>
                  <p className="font-semibold text-gray-900">{device.used}/{device.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Auth j.</p>
                  <p className="font-semibold text-gray-900">18</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Force</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3].map(i => <div key={i} className={`w-1 h-2.5 rounded-full ${device.signal >= i ? 'bg-purple-500' : 'bg-gray-200'}`} />)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="text-xs" onClick={() => setActiveOverlay('employees')}>
                  {ICONS.User} Utilisateurs
                </Button>
                <Button variant="secondary" className="text-xs" onClick={() => setActiveOverlay('history')}>
                  {ICONS.Activity} Historique
                </Button>
                <Button variant="outline" className="col-span-2 py-3 border-dashed border-2 hover:border-purple-400 hover:text-purple-500" onClick={() => { setEnrollStep(1); setActiveOverlay('add'); }}>
                  {ICONS.Plus} Nouvel enrôlement
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Overlay isOpen={activeOverlay === 'add_device'} onClose={() => setActiveOverlay(null)} title="Ajouter un lecteur biométrique" maxWidth="max-w-md">
        <div className="space-y-6">
          <Input label="Nom de l'unité" placeholder="Ex: Salle des Coffres" />
          <Input label="ID Unité / SN" placeholder="BIO-XXXX-XXXX" />
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="ghost" onClick={() => setActiveOverlay(null)}>Annuler</Button>
            <Button onClick={() => setActiveOverlay(null)}>Enregistrer</Button>
          </div>
        </div>
      </Overlay>

      <Overlay isOpen={activeOverlay === 'add'} onClose={() => setActiveOverlay(null)} title="Enrôlement Biométrique" maxWidth="max-w-md">
        {renderEnrollmentContent()}
      </Overlay>
    </div>
  );
};
