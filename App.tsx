import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CompetitionProvider } from './context/CompetitionContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';
import RulesPage from './pages/RulesPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';

function App() {
  return (
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
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/registration-success" element={<RegistrationSuccessPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </CompetitionProvider>
  );
}

export default App;