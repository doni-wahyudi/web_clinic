import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* brand */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand">
              <span className="brand-icon">🏥</span>
              <div className="brand-text">
                <span className="brand-name">KlinikSehat</span>
                <span className="brand-tagline">Modern & Terpercaya</span>
              </div>
            </div>
            <p className="footer-desc">
              Memberikan pelayanan kesehatan terbaik dengan fasilitas modern dan tenaga medis profesional untuk keluarga Indonesia.
            </p>
            <div className="footer-socials">
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-link"><FaWhatsapp /></a>
              <a href="#" aria-label="Instagram" className="social-link"><FaInstagram /></a>
              <a href="#" aria-label="Facebook" className="social-link"><FaFacebookF /></a>
            </div>
          </div>

          {/* quick links */}
          <div className="footer-col">
            <h4 className="footer-heading">Menu</h4>
            <ul className="footer-links">
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/layanan">Layanan Kami</Link></li>
              <li><Link to="/reservasi">Reservasi Online</Link></li>
              <li><Link to="/dokter">Dokter Kami</Link></li>
              <li><Link to="/artikel">Artikel Kesehatan</Link></li>
              <li><Link to="/kontak">Kontak Kami</Link></li>
            </ul>
          </div>

          {/* services */}
          <div className="footer-col">
            <h4 className="footer-heading">Layanan</h4>
            <ul className="footer-links">
              <li><a href="#">Poli Umum</a></li>
              <li><a href="#">Poli Gigi</a></li>
              <li><a href="#">Laboratorium</a></li>
              <li><a href="#">Apotek</a></li>
              <li><a href="#">Medical Check-Up</a></li>
            </ul>
          </div>

          {/* contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Kontak</h4>
            <ul className="footer-contact">
              <li><Phone size={16} /> <a href="tel:+6281234567890">0812-3456-7890</a></li>
              <li><Mail size={16} /> <a href="mailto:info@kliniksehat.com">info@kliniksehat.com</a></li>
              <li><MapPin size={16} /> Jl. Sehat Sejahtera No. 123, Jakarta</li>
              <li><Clock size={16} /> Senin - Sabtu: 08:00 - 21:00</li>
            </ul>
          </div>
        </div>

        {/* bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} KlinikSehat. Semua hak cipta dilindungi.</p>
          <Link to="/reservasi" className="footer-cta">
            Buat Janji Temu <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
