
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ICONS, MOCK_DEVICES } from '../constants';
import { Card, Badge } from '../components/Shared';

const data = [
  { name: 'Lun', in: 400, out: 240 },
  { name: 'Mar', in: 300, out: 139 },
  { name: 'Mer', in: 200, out: 980 },
  { name: 'Jeu', in: 278, out: 390 },
  { name: 'Ven', in: 189, out: 480 },
  { name: 'Sam', in: 239, out: 380 },
  { name: 'Dim', in: 349, out: 430 },
];

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Bonjour, Admin 👋</h1>
        <p className="text-gray-500">Aujourd'hui, nous sommes le mardi 24 octobre 2023.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-b-4 border-b-[#B8860B]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">{ICONS.RFID}</div>
            <Badge variant="success">↑ 12%</Badge>
          </div>
          <p className="text-sm font-medium text-gray-500">RFID Présence</p>
          <p className="text-2xl font-bold text-gray-900">24 Employés</p>
        </Card>
        <Card className="p-6 border-b-4 border-b-[#D4AF37]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">{ICONS.Biometric}</div>
            <Badge variant="neutral">stable</Badge>
          </div>
          <p className="text-sm font-medium text-gray-500">Empreinte Digitale</p>
          <p className="text-2xl font-bold text-gray-900">18 Empreintes</p>
        </Card>
        <Card className="p-6 border-b-4 border-b-[#000000]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 text-gray-900 rounded-lg">{ICONS.Feedback}</div>
            <Badge variant="success">↑ 5%</Badge>
          </div>
          <p className="text-sm font-medium text-gray-500">Feedback Client</p>
          <p className="text-2xl font-bold text-gray-900">89% Satisfaction</p>
        </Card>
        <Card className="p-6 border-b-4 border-b-red-600">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">{ICONS.Shield}</div>
            <Badge variant="error">1 Alerte</Badge>
          </div>
          <p className="text-sm font-medium text-gray-500">Santé Systèmes</p>
          <p className="text-2xl font-bold text-gray-900">3 Actifs</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Graph */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-gray-900">Graphique de Présence</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-md">24h</button>
              <button className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-md">7j</button>
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-md">30j</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                  cursor={{stroke: '#D4AF37', strokeWidth: 2}}
                />
                <Line type="monotone" dataKey="in" stroke="#B8860B" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="out" stroke="#000000" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Activité Temps Réel</h3>
          <div className="space-y-6">
            {[
              { text: "Jean Dupont a pointé", time: "08:30", icon: ICONS.RFID, color: "text-amber-700", bg: "bg-amber-50" },
              { text: "Avis positif - Accueil", time: "09:12", icon: ICONS.Feedback, color: "text-gray-900", bg: "bg-gray-100" },
              { text: "Porte B12 ouverte par Marie", time: "10:45", icon: ICONS.Access, color: "text-emerald-600", bg: "bg-emerald-50" },
              { text: "Nouvelle empreinte ajoutée", time: "11:20", icon: ICONS.Biometric, color: "text-amber-600", bg: "bg-amber-50" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start relative">
                {idx !== 3 && <div className="absolute left-5 top-10 w-[1px] h-6 bg-gray-100" />}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 leading-tight">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-amber-700 font-medium hover:underline text-center">
            Voir tout l'historique
          </button>
        </Card>
      </div>

      {/* Recent Devices */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Boîtiers Récents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_DEVICES.slice(0, 3).map(device => (
            <Card key={device.id} className="p-4 flex items-center gap-4 card-hover cursor-pointer">
              <div className={`p-3 rounded-xl ${
                device.type === 'rfid' ? 'bg-amber-50 text-amber-700' :
                device.type === 'fingerprint' ? 'bg-amber-100 text-amber-800' :
                'bg-gray-100 text-gray-900'
              }`}>
                {device.type === 'rfid' ? ICONS.RFID : device.type === 'fingerprint' ? ICONS.Biometric : ICONS.Access}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{device.name}</h4>
                <p className="text-xs text-gray-500">{device.id}</p>
              </div>
              <Badge variant={device.status === 'active' ? 'success' : 'error'}>
                {device.status === 'active' ? '●' : '○'}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
