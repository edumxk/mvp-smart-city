import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { DataProvider } from './contexts/DataContext.jsx';

import App from './App.jsx';
import './index.css';

import Onboarding from './pages/Onboarding.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import MyReports from './pages/MyReports.jsx';
import Profile from './pages/Profile.jsx';
import NewReport from './pages/NewReport.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* --- ORDEM DOS PROVIDERS CORRIGIDA --- */}
      {/* AuthProvider deve ser o provedor mais externo */}
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/onboarding" replace />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
              <Route path="home" element={<Home />} />
              <Route path="my-reports" element={<MyReports />} />
              <Route path="profile" element={<Profile />} />
              <Route path="new-report" element={<NewReport />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

