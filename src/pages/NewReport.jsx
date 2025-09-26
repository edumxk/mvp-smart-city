import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext.jsx";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Camera, MapPin, Loader } from 'lucide-react';

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Componente para buscar a localização e o endereço
function LocationPicker({ setLocation, fetchAddress }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation([lat, lng]);
      fetchAddress(lat, lng); // Busca o endereço ao clicar
    },
  });
  return null;
}

export default function NewReport() {
  const { addReport } = useData();
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState([-10.185, -48.330]);
  const [address, setAddress] = useState("Clique no mapa para definir a localização");
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  // Função para buscar o endereço usando a API do Nominatim
  const fetchAddress = async (lat, lng) => {
    setIsFetchingAddress(true);
    setAddress("A procurar endereço...");
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.address) {
        const road = data.address.road || '';
        const suburb = data.address.suburb || 'Bairro não encontrado';
        setAddress(`${road}, ${suburb}`);
      } else {
        setAddress("Endereço não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      setAddress("Erro ao buscar endereço.");
    } finally {
      setIsFetchingAddress(false);
    }
  };

  // Busca o endereço inicial quando o componente é montado
  useEffect(() => {
    fetchAddress(location[0], location[1]);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || !severity || !location || !photo || isFetchingAddress) {
      alert("Por favor, preencha todos os campos e aguarde a busca do endereço.");
      return;
    }
    const reportData = {
      type,
      severity,
      photo,
      location: { lat: location[0], lng: location[1] },
      address, // Adiciona o endereço ao report
    };
    addReport(reportData);
    navigate("/my-reports");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-green-800">Novo Reporte</h1>
      
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2">Tipo de Ocorrência</label>
        <div className="grid grid-cols-3 gap-2">
          {["Buraco", "Lâmpada queimada", "Lixo"].map(opt => (
            <button type="button" key={opt} onClick={() => setType(opt)}
              className={`p-3 rounded-lg text-center font-semibold border-2 transition-all ${
                type === opt ? "bg-green-800 text-white border-green-800" : "border-gray-300 bg-white text-gray-700"
              }`}
            >{opt}</button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2">Foto</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
        {photo && <img src={photo} alt="Preview" className="mt-4 rounded-lg w-full h-48 object-cover"/>}
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2">Severidade</label>
        <div className="grid grid-cols-3 gap-2">
          {["Baixo", "Médio", "Alto"].map(opt => (
            <button type="button" key={opt} onClick={() => setSeverity(opt)}
              className={`p-3 rounded-lg font-semibold border-2 transition-all ${
                severity === opt
                  ? opt === "Baixo" ? "bg-blue-500 text-white border-blue-500"
                  : opt === "Médio" ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-red-500 text-white border-red-500"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
            >{opt}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2">Localização</label>
        <div className="flex items-center gap-2 text-sm text-gray-700 bg-white p-3 rounded-lg mb-2 border">
            <MapPin size={16} className="text-gray-400" />
            {isFetchingAddress ? <Loader size={16} className="animate-spin" /> : <span>{address}</span>}
        </div>
        <div className="h-64 rounded-lg overflow-hidden border">
          <MapContainer center={location} zoom={14} className="w-full h-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker setLocation={setLocation} fetchAddress={fetchAddress} />
            {location && <Marker position={location} icon={markerIcon} />}
          </MapContainer>
        </div>
      </div>

      <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-green-900 font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105">
        Enviar Reporte
      </button>
    </form>
  );
}
