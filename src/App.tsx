import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Reservation from './pages/Reservation';
import QRCodePage from './pages/QRCode';
import Doctors from './pages/Doctors';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="layanan" element={<Services />} />
          <Route path="reservasi" element={<Reservation />} />
          <Route path="qr-code" element={<QRCodePage />} />
          <Route path="dokter" element={<Doctors />} />
          <Route path="artikel" element={<Articles />} />
          <Route path="kontak" element={<Contact />} />
          <Route path="tentang" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
