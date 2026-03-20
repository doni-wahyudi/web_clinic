import { ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroDoctor from '../../assets/hero/hero_doctor.png';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero" id="hero-section">
      {/* Background layers */}
      <div className="hero-bg-split"></div>
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="hero-pattern"></div>

      <div className="container hero-grid">
        {/* Left: Doctor Image */}
        <div className="hero-image-side animate-slide-left">
          <div className="hero-img-wrapper">
            <img src={heroDoctor} alt="Dokter KlinikSehat" className="hero-doctor-img" />
          </div>
          {/* Floating badge */}
          <div className="hero-float-badge hero-badge-1 animate-float">
            <Shield size={20} />
            <div>
              <strong>Terpercaya</strong>
              <span>Tenaga Medis Bersertifikat</span>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="hero-text-side animate-slide-right">
          <div className="hero-pill">
            <Clock size={14} />
            <span>Buka Setiap Hari • 08:00 - 21:00</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-light">Klinik Kesehatan</span>
            <span className="hero-title-bold text-gradient">Modern</span>
            <span className="hero-title-bold">&amp; Terpercaya</span>
          </h1>

          <p className="hero-desc">
            Layanan kesehatan profesional dengan dokter spesialis berpengalaman, 
            fasilitas modern, dan sistem reservasi online yang mudah untuk kenyamanan Anda.
          </p>

          <div className="hero-cta-row">
            <Link to="/reservasi" className="btn btn-primary btn-lg" id="hero-cta-reservasi">
              Buat Janji Temu <ArrowRight size={18} />
            </Link>
            <Link to="/layanan" className="btn btn-ghost btn-lg" id="hero-cta-layanan">
              Lihat Layanan
            </Link>
          </div>

          {/* Stats strip */}
          <div className="hero-stats-strip">
            <div className="hero-stat">
              <Users size={18} />
              <div>
                <strong>15,000+</strong>
                <span>Pasien Terlayani</span>
              </div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <Shield size={18} />
              <div>
                <strong>10+</strong>
                <span>Tahun Pengalaman</span>
              </div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <Clock size={18} />
              <div>
                <strong>24 Jam</strong>
                <span>Layanan Darurat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact strip at the bottom */}
      <div className="hero-contact-strip">
        <div className="container hero-contact-inner">
          <a href="tel:+6281234567890" className="hero-contact-item">
            📞 0812-3456-7890
          </a>
          <span className="hero-contact-item">
            📍 Jl. Sehat Sejahtera No. 123, Jakarta
          </span>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hero-contact-item hero-contact-wa">
            💬 Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
