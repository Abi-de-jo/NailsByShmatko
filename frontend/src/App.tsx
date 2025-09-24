import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/index';
import Home from './pages/Home';
import Services from './pages/Services';
 import TopBar from './components/topbar/index';
import Logo from './components/logo/Logo';
import Gallery from './pages/Gallery';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import { TranslationProvider } from './contexts/TranslationContext';
  import LoginPage from './components/admin/LoginPage';
  import AdminDashboard from './pages/AdminDashboard';
const App: React.FC = () => {
  return (
     <TranslationProvider>
    <Router>
      <div className="font-sans">
        <TopBar />
        <div className='sticky top-0 z-50 bg-[#e7e4ff]/60 backdrop-blur-xl border-b border-[#9929ea]/10'>
  <Logo />
  <Navbar />
</div>
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
           <Route path="/admin/login" element={<LoginPage />} />
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
    </TranslationProvider>
  );
};

export default App;
