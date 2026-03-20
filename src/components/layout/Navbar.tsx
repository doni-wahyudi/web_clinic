import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock, MapPin } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/layanan', label: 'Layanan' },
  { to: '/reservasi', label: 'Reservasi' },
  { to: '/dokter', label: 'Dokter' },
  { to: '/artikel', label: 'Artikel' },
  { to: '/kontak', label: 'Kontak' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Info Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <Phone size={14} /> <a href="tel:+6281234567890">0812-3456-7890</a>
            </span>
            <span className="top-bar-item top-bar-desktop">
              <Clock size={14} /> Senin - Sabtu: 08:00 - 21:00
            </span>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-item">
              <MapPin size={14} /> Jl. Sehat Sejahtera No. 123
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-nav">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand" id="navbar-brand">
            <span className="brand-icon">🏥</span>
            <div className="brand-text">
              <span className="brand-name">KlinikSehat</span>
              <span className="brand-tagline">Modern & Terpercaya</span>
            </div>
          </Link>

          <div className={`navbar-menu ${isOpen ? 'navbar-menu-open' : ''}`} id="navbar-menu">
            <div className="navbar-links">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${location.pathname === link.to ? 'nav-link-active' : ''}`}
                  id={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link to="/reservasi" className="btn btn-primary btn-sm navbar-cta" id="nav-cta-reservasi">
              Buat Janji
            </Link>
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            id="navbar-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
