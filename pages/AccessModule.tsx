
import React, { useState } from 'react';
import { ICONS, MOCK_DEVICES, MOCK_EMPLOYEES } from '../constants';
import { Card, Badge, Button, Overlay, Input } from '../components/Shared';

export const AccessModule: React.FC = () => {
  const [activeOverlay, setActiveOverlay] = useState<'employees' | 'history' | 'add_card' | 'add_door' | null>(null);
  const [unlocking, setUnlocking] = useState<string | null>(null);
  const [addStep, setAddStep] = useState(1);
  
  const devices = MOCK_DEVICES.filter(d => d.type === 'door');

  const handleUnlock = (id: string) => {
    setUnlocking(id);
    setTimeout(() => setUnlocking(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">{ICONS.Access}</span>
            Contrôle d'Accès Porte
          </h1>
          <p className="text-gray-500 mt-1">Supervisez et contrôlez les accès physiques de vos sites.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setActiveOverlay('history')}>{ICONS.History} Journal d'audit</Button>
          <Button onClick={() => setActiveOverlay('add_door')}>{ICONS.Plus} Ajouter une porte</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Entrées Aujourd'hui</p>
          <p className="text-2xl font-bold text-gray-900">86</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-red-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Échecs Tentatives</p>
          <p className="text-2xl font-bold text-gray-900">2</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Portes Actives</p>
          <p className="text-2xl font-bold text-gray-900">{devices.length}</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-gray-900">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">État Système</p>
          <p className="text-2xl font-bold text-emerald-600 tracking-tight">ONLINE</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            {ICONS.MapPin} Portes sous contrôle
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {devices.map(device => (
              <Card key={device.id} className="p-0 overflow-hidden border-2 hover:border-emerald-100 transition-colors">
                <div className="p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${device.status === 'alert' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {device.status === 'alert' ? ICONS.Shield : ICONS.Access}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 text-lg">{device.name}</h4>
                        <Badge variant={device.status === 'active' ? 'success' : 'error'}>{device.status === 'active' ? 'Opérationnel' : 'Alerte'}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{device.site} • {device.id}</p>
                    </div>
                    <Button 
                      variant={unlocking === device.id ? 'success' : 'primary'} 
                      onClick={() => handleUnlock(device.id)}
                      className="min-w-[140px]"
                    >
                      {unlocking === device.id ? (
                        <><span className="animate-spin">{ICONS.Zap}</span>...</>
                      ) : (
                        <>{ICONS.Lock} Actionner</>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="secondary" className="text-xs py-2" onClick={() => setActiveOverlay('employees')}>
                      {ICONS.User} Employés
                    </Button>
                    <Button variant="secondary" className="text-xs py-2" onClick={() => setActiveOverlay('history')}>
                      {ICONS.Activity} Historique
                    </Button>
                    <Button variant="outline" className="text-xs py-2 border-dashed" onClick={() => setActiveOverlay('add_card')}>
                      {ICONS.Plus} Badge
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6 flex flex-col h-fit sticky top-32">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              {ICONS.Activity} Activité Temps Réel
            </h3>
            <Badge variant="blue">LIVE</Badge>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { user: "Jean Dupont", action: "Accès autorisé", time: "16:42", door: "Porte B12" },
              { user: "Inconnu", action: "Tentative échouée", time: "16:38", door: "Porte B12", alert: true },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${log.alert ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{log.user}</p>
                  <p className={`text-xs ${log.alert ? 'text-red-600' : 'text-gray-500'}`}>{log.action} • {log.door}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Overlay isOpen={activeOverlay === 'add_door'} onClose={() => setActiveOverlay(null)} title="Ajouter une nouvelle porte" maxWidth="max-w-md">
        <div className="space-y-6">
          <Input label="Nom de la porte" placeholder="Ex: Bureau Direction" />
          <Input label="Site" placeholder="Paris HQ" />
          <Input label="IP Contrôleur" placeholder="IP-CTRL-XXXX" />
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="ghost" onClick={() => setActiveOverlay(null)}>Annuler</Button>
            <Button onClick={() => setActiveOverlay(null)}>Initialiser l'accès</Button>
          </div>
        </div>
      </Overlay>
    </div>
  );
};
