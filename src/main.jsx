import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { DataProvider } from './contexts/DataContext.jsx';
import App from './App.jsx';
import './index.css';

// Importando as páginas
import Onboarding from './pages/Onboarding.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import NewReport from "./pages/NewReport.jsx";
import MyReports from './pages/MyReports.jsx';
import Profile from './pages/Profile.jsx';
import Dashboard from './pages/Dashboard.jsx'; // Nova importação
import ProtectedRoute from './components/ProtectedRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            
            {/* Rotas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas Protegidas aninhadas dentro do App Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/new-report" element={<NewReport />} />
              <Route path="/my-reports" element={<MyReports />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} /> {/* Nova Rota */}
            </Route>
            
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

