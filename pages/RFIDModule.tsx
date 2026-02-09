
import React, { useState } from 'react';
import { ICONS, MOCK_DEVICES, MOCK_EMPLOYEES } from '../constants';
import { Card, Badge, Button, Overlay, Input } from '../components/Shared';

export const RFIDModule: React.FC = () => {
  const [activeOverlay, setActiveOverlay] = useState<'employees' | 'history' | 'add' | 'add_device' | null>(null);
  const [addStep, setAddStep] = useState(1);

  const rfidDevices = MOCK_DEVICES.filter(d => d.type === 'rfid');

  const renderAddContent = () => {
    if (addStep === 1) {
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Boîtier</label>
              <input disabled value="Boîtier Entrée Principale (#RFID-001)" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Prénom" placeholder="Ex: Jean" />
              <Input label="Nom" placeholder="Ex: Dupont" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Carte RFID</label>
              <div className="flex gap-2">
                <input placeholder="0012345678" className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <Button variant="outline">Scanner</Button>
              </div>
              <p className="mt-2 text-xs text-gray-500">2 emplacements restants sur ce boîtier.</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="ghost" onClick={() => setActiveOverlay(null)}>Annuler</Button>
            <Button onClick={() => setAddStep(2)}>Suivant {ICONS.ArrowRight}</Button>
          </div>
        </div>
      );
    }
    if (addStep === 2) {
      return (
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="animate-ping absolute w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
            {ICONS.RFID}
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Confirmation de détection</h4>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Veuillez approcher la carte RFID du boîtier #RFID-001 pour tester l'enrôlement.</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setAddStep(1)}>Retour</Button>
            <Button onClick={() => setAddStep(3)}>Confirmer la carte</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          {ICONS.Check}
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Carte ajoutée avec succès !</h4>
        <p className="text-gray-500 mb-8">Jean Dupont peut désormais pointer sur ce boîtier.</p>
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={() => setAddStep(1)}>Ajouter un autre</Button>
          <Button onClick={() => setActiveOverlay(null)}>Retour au dashboard</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            {ICONS.RFID} RFID Présence
          </h1>
          <p className="text-gray-500">Gérez les badges et suivez la présence de vos employés en temps réel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">{ICONS.Download} Exporter</Button>
          <Button onClick={() => setActiveOverlay('add_device')}>{ICONS.Plus} Ajouter boîtier</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-5 border-l-4 border-l-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Présence Moyenne</p>
          <p className="text-2xl font-bold text-gray-900">94%</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Scans totaux (24h)</p>
          <p className="text-2xl font-bold text-gray-900">142</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-amber-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Retards détectés</p>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-red-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Alertes Badges</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {rfidDevices.map(device => (
          <Card key={device.id} className="overflow-hidden flex flex-col">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{device.name}</h3>
                  <p className="text-sm text-gray-400 font-mono">{device.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-1 h-3 rounded-full ${device.signal >= i ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <Badge variant={device.status === 'active' ? 'success' : 'error'}>
                    {device.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-50 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Cartes</p>
                  <p className="font-semibold text-gray-900">{device.used}/{device.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Scans j.</p>
                  <p className="font-semibold text-gray-900">42</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Dernier</p>
                  <p className="font-semibold text-gray-900">{device.lastActivity}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="text-xs" onClick={() => setActiveOverlay('employees')}>
                  {ICONS.User} Employés
                </Button>
                <Button variant="secondary" className="text-xs" onClick={() => setActiveOverlay('history')}>
                  {ICONS.Activity} Historique
                </Button>
                <Button variant="outline" className="col-span-2 py-3 border-dashed border-2 hover:border-blue-400 hover:text-blue-500" onClick={() => { setAddStep(1); setActiveOverlay('add'); }}>
                  {ICONS.Plus} Ajouter une carte
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Overlay isOpen={activeOverlay === 'employees'} onClose={() => setActiveOverlay(null)} title="Employés - Boîtier #RFID-001">
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">{ICONS.Search}</div>
              <input placeholder="Rechercher un employé..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <Button variant="outline">{ICONS.Filter} Filtres</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 font-semibold text-gray-600 text-sm">Employé</th>
                  <th className="py-4 font-semibold text-gray-600 text-sm">ID Carte</th>
                  <th className="py-4 font-semibold text-gray-600 text-sm">Statut</th>
                  <th className="py-4 font-semibold text-gray-600 text-sm">Dernier scan</th>
                  <th className="py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_EMPLOYEES.map(emp => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} className="w-8 h-8 rounded-full border border-gray-100" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{emp.firstName} {emp.lastName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-xs text-gray-500">{emp.cardId}</td>
                    <td className="py-4">
                      <Badge variant={emp.status === 'present' ? 'success' : 'neutral'}>
                        {emp.status === 'present' ? 'Présent' : 'Absent'}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{emp.lastScan}</td>
                    <td className="py-4 text-right">
                      <button className="p-1 text-gray-400 hover:text-gray-600">{ICONS.More}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Overlay>

      <Overlay isOpen={activeOverlay === 'add_device'} onClose={() => setActiveOverlay(null)} title="Ajouter un nouveau boîtier RFID" maxWidth="max-w-md">
        <div className="space-y-6">
          <div className="space-y-4">
            <Input label="Nom du boîtier" placeholder="Ex: Entrée Secondaire" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site d'installation</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none">
                <option>Paris HQ</option>
                <option>Lyon Tech</option>
                <option>Bordeaux South</option>
              </select>
            </div>
            <Input label="Numéro de série" placeholder="SN-XXXX-XXXX" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="ghost" onClick={() => setActiveOverlay(null)}>Annuler</Button>
            <Button onClick={() => setActiveOverlay(null)}>Activer le boîtier</Button>
          </div>
        </div>
      </Overlay>

      <Overlay isOpen={activeOverlay === 'add'} onClose={() => setActiveOverlay(null)} title="Ajouter une carte RFID" maxWidth="max-w-md">
        {renderAddContent()}
      </Overlay>
    </div>
  );
};
