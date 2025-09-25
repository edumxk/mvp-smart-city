import React from 'react';
import { useData } from '../contexts/DataContext.jsx';

// Componente para a tag de status colorida
const StatusTag = ({ status }) => {
  const statusStyles = {
    Recebido: 'bg-yellow-100 text-yellow-800',
    Resolvido: 'bg-green-100 text-green-800',
    Rejeitado: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default function MyReports() {
  const { getUserReports } = useData();
  const myReports = getUserReports();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-brand-green-dark mb-4">Meus Reportes</h1>
      {myReports.length === 0 ? (
        <p className="text-gray-500">Você ainda não fez nenhum reporte.</p>
      ) : (
        <div className="space-y-4">
          {myReports.map(report => (
            <div key={report.id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
              <img src={report.photo} alt={report.type} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold">{report.type}</h2>
                  <StatusTag status={report.status} />
                </div>
                <p className="text-sm text-gray-500">Severidade: {report.severity}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(report.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
