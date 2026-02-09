
import React, { useState } from 'react';
import { ICONS, MOCK_DEVICES } from '../constants';
import { Card, Badge, Button, Overlay, Input } from '../components/Shared';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const FeedbackModule: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const feedbackDevices = MOCK_DEVICES.filter(d => d.type === 'feedback');

  const barData = [
    { name: '08h', val: 12 }, { name: '10h', val: 45 }, { name: '12h', val: 28 },
    { name: '14h', val: 65 }, { name: '16h', val: 54 }, { name: '18h', val: 32 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            {ICONS.Feedback} Feedback Client
          </h1>
          <p className="text-gray-500">Analysez la satisfaction de vos clients en temps réel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">{ICONS.Download} Rapport</Button>
          <Button onClick={() => setIsAddDeviceOpen(true)}>{ICONS.Plus} Nouveau boîtier</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Satisfaction (NPS)</p>
          <p className="text-2xl font-bold text-gray-900">+72</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-blue-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Avis totaux (30j)</p>
          <p className="text-2xl font-bold text-gray-900">1,248</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-emerald-400">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Sentiment +</p>
          <p className="text-2xl font-bold text-gray-900">89%</p>
        </Card>
        <Card className="p-5 border-l-4 border-l-amber-500">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Points de contact</p>
          <p className="text-2xl font-bold text-gray-900">{feedbackDevices.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackDevices.map(device => (
          <Card key={device.id} className="p-6 card-hover cursor-pointer" onClick={() => setSelectedDevice(device.id)}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-gray-900">{device.name}</h3>
                <p className="text-xs text-gray-400 font-mono">{device.id}</p>
              </div>
              <Badge variant="success">● LIVE</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{device.stats?.positive}%</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Positif</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{device.stats?.neutral}%</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Neutre</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{device.stats?.negative}%</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Négatif</p>
              </div>
            </div>

            <div className="h-1.5 w-full bg-gray-100 rounded-full flex overflow-hidden mb-6">
              <div style={{ width: `${device.stats?.positive}%` }} className="bg-emerald-500 h-full" />
              <div style={{ width: `${device.stats?.neutral}%` }} className="bg-blue-500 h-full" />
              <div style={{ width: `${device.stats?.negative}%` }} className="bg-red-500 h-full" />
            </div>

            <Button variant="secondary" className="w-full text-xs">
              Détails Statistiques
            </Button>
          </Card>
        ))}
      </div>

      <Overlay isOpen={isAddDeviceOpen} onClose={() => setIsAddDeviceOpen(null)} title="Ajouter un nouveau boîtier Feedback" maxWidth="max-w-md">
        <div className="space-y-6">
          <Input label="Emplacement / Nom" placeholder="Ex: Caisse Centrale" />
          <Input label="Site" placeholder="Lyon Tech" />
          <Input label="SN Boîtier" placeholder="FB-XXXX-XXXX" />
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="ghost" onClick={() => setIsAddDeviceOpen(false)}>Annuler</Button>
            <Button onClick={() => setIsAddDeviceOpen(false)}>Activer le boîtier</Button>
          </div>
        </div>
      </Overlay>

      <Overlay isOpen={!!selectedDevice} onClose={() => setSelectedDevice(null)} title={`Détails Feedback - ${selectedDevice}`} maxWidth="max-w-4xl">
        <div className="space-y-8">
          <Card className="p-6">
            <h4 className="font-bold text-gray-900 mb-6">Volume de réponses par heure</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                  <Bar dataKey="val" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSelectedDevice(null)}>Fermer</Button>
            <Button>{ICONS.Download} Exporter CSV</Button>
          </div>
        </div>
      </Overlay>
    </div>
  );
};
