import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompetitionProvider } from './context/CompetitionContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import LeaderboardPage from './pages/LeaderboardPage';
import PaymentPage from './pages/PaymentPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import RulesPage from './pages/RulesPage';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  return (
    <AuthProvider>
      <CompetitionProvider>
        <HashRouter>
          <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </CompetitionProvider>
    </AuthProvider>
  );
}

export default App;