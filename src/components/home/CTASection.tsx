import { ArrowRight, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section" id="cta-section">
      <div className="cta-glow"></div>
      <div className="container cta-container">
        <div className="cta-content">
          <CalendarCheck size={40} className="cta-icon" />
          <h2 className="cta-title">Butuh Konsultasi Dokter?</h2>
          <p className="cta-desc">
            Buat janji temu secara online dan dapatkan pelayanan kesehatan terbaik tanpa antri. 
            Tersedia juga QR Code untuk check-in cepat di klinik.
          </p>
          <div className="cta-buttons">
            <Link to="/reservasi" className="btn btn-white btn-lg" id="cta-reservasi">
              Reservasi Sekarang <ArrowRight size={18} />
            </Link>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20KlinikSehat,%20saya%20ingin%20buat%20janji%20temu" 
              target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
              id="cta-whatsapp"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
