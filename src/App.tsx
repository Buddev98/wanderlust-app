import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NewTripPage from './pages/NewTripPage';
import TripDetailsPage from './pages/TripDetailsPage';
import EditTripPage from './pages/EditTripPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <TripProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/new-trip" element={<NewTripPage />} />
              <Route path="/trip/:id" element={<TripDetailsPage />} />
              <Route path="/trip/:id/edit" element={<EditTripPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TripProvider>
  );
}

export default App;
