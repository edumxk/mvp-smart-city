import React, { useMemo, useState } from 'react';
import { useData } from '../contexts/DataContext.jsx';
import { MapPin, TrendingUp, ThumbsUp, AlertCircle, BarChart2, CheckCircle, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

// Ícone para o minimapa
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Função para calcular a pontuação de prioridade de cada ocorrência
const calculatePriorityScore = (report) => {
  let score = 0;
  if (report.status === 'Resolvido') return 0; // Itens resolvidos não têm prioridade
  
  switch (report.severity) {
    case 'Alto': score += 50; break;
    case 'Médio': score += 25; break;
    case 'Baixo': score += 10; break;
  }
  score += report.likes;
  const daysOpen = (Date.now() - report.timestamp) / (1000 * 60 * 60 * 24);
  score += Math.floor(daysOpen);
  return Math.round(score);
};

// Componente para um card de estatística (agora é um botão)
const StatCard = ({ icon, title, value, color, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 text-left w-full transition-all duration-200 ${color} ${isActive ? 'ring-2 ring-blue-500 shadow-md' : 'ring-0 ring-transparent hover:shadow-md'}`}
  >
    <div className="bg-opacity-10 p-3 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </button>
);

// Componente para cada item da lista
const PriorityItem = ({ report, onResolve, onSelect, isSelected }) => {
  // ... (Componente PriorityItem não precisa de alterações)
  return (
    <div className="p-3 rounded-lg border border-gray-100 transition-all duration-300 ease-in-out">
      <div className="cursor-pointer" onClick={() => onSelect(report.id)}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-800">{report.type}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={12} /> {report.address || `${report.location.lat.toFixed(3)}, ${report.location.lng.toFixed(3)}`}
            </p>
          </div>
          {report.status === 'Recebido' && (
            <div className="text-right">
              <p className="font-extrabold text-lg text-red-500 flex items-center gap-1"><TrendingUp size={16} /> {report.priorityScore}</p>
              <p className="text-xs text-gray-400">Urgência</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600 mt-2 pt-2 border-t border-gray-100">
          <span className={`font-semibold px-2 py-0.5 rounded-full ${report.severity === 'Alto' ? 'bg-red-100 text-red-700' : report.severity === 'Médio' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
            {report.severity}
          </span>
          <span className="flex items-center gap-1"><ThumbsUp size={12} /> {report.likes} Likes</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {Math.floor((Date.now() - report.timestamp) / 86400000)} dias</span>
        </div>
      </div>
      
      {isSelected && report.status === 'Recebido' && (
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
          <div className="h-40 w-full rounded-lg overflow-hidden">
            <MapContainer center={[report.location.lat, report.location.lng]} zoom={15} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[report.location.lat, report.location.lng]} icon={markerIcon}></Marker>
            </MapContainer>
          </div>
          <button onClick={() => onResolve(report.id)} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors">
            <CheckCircle size={16} /> Concluir Solicitação
          </button>
        </div>
      )}
    </div>
  );
};


export default function Dashboard() {
  const { reports, resolveReport } = useData();
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Abertas'); // Estado para o filtro, padrão 'Abertas'

  // Memoiza os cálculos para otimizar a performance
  const { filteredReports, totalOpen, totalResolved, averageLikes } = useMemo(() => {
    const openReports = reports.filter(r => r.status === 'Recebido');
    const resolvedReports = reports.filter(r => r.status === 'Resolvido');
    
    let listToFilter = [];
    if (activeFilter === 'Abertas') {
      listToFilter = openReports;
    } else if (activeFilter === 'Resolvidas') {
      listToFilter = resolvedReports;
    } else { // Total
      listToFilter = reports;
    }

    const reportsWithScore = listToFilter
      .map(report => ({ ...report, priorityScore: calculatePriorityScore(report) }))
      .sort((a, b) => b.priorityScore - a.priorityScore);

    const avgLikes = reports.length > 0 ? (reports.reduce((sum, r) => sum + r.likes, 0) / reports.length).toFixed(1) : 0;

    return {
      filteredReports: reportsWithScore,
      totalOpen: openReports.length,
      totalResolved: resolvedReports.length,
      averageLikes: avgLikes,
    };
  }, [reports, activeFilter]); // Recalcula quando os reports ou o filtro mudam

  const handleSelectReport = (id) => {
    setSelectedReportId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-800">Dashboard de Gestão</h1>
        <p className="text-gray-500">Ocorrências priorizadas para ação imediata.</p>
      </header>

      {/* Estatísticas Gerais Interativas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<AlertCircle size={24} />} title="Abertas" value={totalOpen} color="text-yellow-600" isActive={activeFilter === 'Abertas'} onClick={() => setActiveFilter('Abertas')} />
        <StatCard icon={<CheckCircle size={24} />} title="Resolvidas" value={totalResolved} color="text-green-600" isActive={activeFilter === 'Resolvidas'} onClick={() => setActiveFilter('Resolvidas')} />
        <StatCard icon={<BarChart2 size={24} />} title="Total" value={reports.length} color="text-gray-600" isActive={activeFilter === 'Total'} onClick={() => setActiveFilter('Total')} />
        <StatCard icon={<ThumbsUp size={24} />} title="Média de Likes" value={averageLikes} color="text-blue-600" />
      </div>

      {/* Lista de Ocorrências Filtradas */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-3">Lista de Prioridades ({activeFilter})</h2>
        <div className="space-y-3">
          {filteredReports.length > 0 ? (
            filteredReports.map(report => (
              <PriorityItem
                key={report.id}
                report={report}
                onResolve={resolveReport}
                onSelect={handleSelectReport}
                isSelected={selectedReportId === report.id}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">Nenhuma ocorrência encontrada para este filtro.</p>
          )}
        </div>
      </div>
    </div>
  );
}

