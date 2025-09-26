// src/pages/Home.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useData } from "../contexts/DataContext.jsx";
import L from "leaflet";
import { Heart } from "lucide-react";

const statusIcons = {
  Recebido: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
  Resolvido: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
  Rejeitado: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
};

export default function Home() {
  const { reports, addLike } = useData();

  return (
    // --- ALTERAÇÃO AQUI ---
    // A altura foi reduzida para criar mais espaço no topo.
    // 80px (navbar) + 40px (espaço extra) = 120px
    <div className="flex flex-col h-[calc(100vh-120px)] mt-4 mx-2 rounded-2xl overflow-hidden shadow-lg bg-gray-50 font-sans">
      <header className="bg-white p-4">
        <h1 className="text-2xl font-extrabold text-green-800">Ocorrências</h1>
      </header>
      <div className="flex-1">
        <MapContainer center={[-10.185, -48.330]} zoom={13} className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {reports.map((report) => (
            <Marker key={report.id} position={[report.location.lat, report.location.lng]} icon={statusIcons[report.status] || statusIcons.Recebido}>
              <Popup>
                <div className="text-sm font-sans">
                  <img src={report.photo} alt={report.type} className="w-full h-24 object-cover rounded-md mb-2" />
                  <strong className="text-base text-gray-800">{report.type}</strong>
                  <p className="text-gray-600">Severidade: {report.severity}</p>
                  <p className="text-gray-500 text-xs">por: {report.author}</p>
                  <button onClick={() => addLike(report.id)} className="mt-3 w-full flex items-center justify-center gap-2 text-red-500 bg-red-100 hover:bg-red-200 font-bold py-2 px-3 rounded-lg transition-colors">
                    <Heart size={16} />
                    <span>{report.likes}</span>
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}