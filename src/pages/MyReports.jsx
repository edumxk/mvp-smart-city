// src/pages/MyReports.jsx
import React from 'react';
import { useData } from '../contexts/DataContext.jsx';
import { CheckCircle } from 'lucide-react';

const StatusTag = ({ status }) => {
  const statusStyles = {
    Recebido: 'bg-yellow-100 text-yellow-800',
    Resolvido: 'bg-green-100 text-green-800',
    Rejeitado: 'bg-red-100 text-red-800',
  };
  return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>{status}</span>;
};

export default function MyReports() {
  const { getUserReports, resolveReport } = useData(); // Pega a nova função
  const myReports = getUserReports();

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6">Meus Reportes</h1>
      {myReports.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">Você ainda não fez nenhum reporte.</p>
      ) : (
        <div className="space-y-4">
          {myReports.map(report => (
            <div key={report.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <img src={report.photo} alt={report.type} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h2 className="text-lg font-bold text-gray-800">{report.type}</h2>
                    <StatusTag status={report.status} />
                  </div>
                  <p className="text-sm text-gray-600">Severidade: {report.severity}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(report.timestamp).toLocaleDateString()}</p>
                </div>
              </div>

              {/* --- BOTÃO CONDICIONAL --- */}
              {/* Aparece apenas se o status NÃO for 'Resolvido' */}
              {report.status !== 'Resolvido' && (
                <button
                  onClick={() => resolveReport(report.id)}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-lg transition-colors"
                >
                  <CheckCircle size={18} />
                  <span>Marcar como Resolvido</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}