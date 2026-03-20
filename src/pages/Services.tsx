import { Stethoscope, Smile, FlaskConical, Pill, HeartPulse, Baby, ArrowRight } from 'lucide-react';

import generalImg from '../assets/services/general.png';
import dentalImg from '../assets/services/dental.png';
import labImg from '../assets/services/laboratory.png';
import pharmacyImg from '../assets/services/pharmacy.png';
import './Services.css';

const services = [
  {
    icon: <Stethoscope size={28} />,
    title: 'Poli Umum',
    image: generalImg,
    desc: 'Layanan pemeriksaan dan konsultasi kesehatan umum oleh dokter berpengalaman. Menangani berbagai keluhan mulai dari demam, flu, hingga penyakit kronis.',
    features: ['Konsultasi Dokter', 'Pemeriksaan Fisik', 'Resep Obat', 'Surat Keterangan Sehat'],
  },
  {
    icon: <Smile size={28} />,
    title: 'Poli Gigi',
    image: dentalImg,
    desc: 'Perawatan gigi lengkap dengan teknologi modern. Mulai dari pembersihan, tambal, cabut, hingga perawatan estetika gigi.',
    features: ['Tambal Gigi', 'Cabut Gigi', 'Scaling & Polishing', 'Veneer & Bleaching'],
  },
  {
    icon: <FlaskConical size={28} />,
    title: 'Laboratorium',
    image: labImg,
    desc: 'Pemeriksaan laboratorium lengkap dengan peralatan canggih dan hasil yang akurat. Tersedia berbagai paket pemeriksaan.',
    features: ['Tes Darah Lengkap', 'Tes Urine', 'Tes Kolesterol', 'Tes Gula Darah'],
  },
  {
    icon: <Pill size={28} />,
    title: 'Apotek',
    image: pharmacyImg,
    desc: 'Apotek dengan koleksi obat lengkap dan farmasis profesional. Tersedia obat resep dan obat bebas.',
    features: ['Obat Resep', 'Obat Bebas', 'Suplemen & Vitamin', 'Konsultasi Farmasi'],
  },
  {
    icon: <HeartPulse size={28} />,
    title: 'Medical Check-Up',
    image: generalImg,
    desc: 'Paket pemeriksaan kesehatan menyeluruh untuk mendeteksi dini potensi masalah kesehatan.',
    features: ['Paket Basic', 'Paket Executive', 'Paket Pre-Wedding', 'Paket Korporasi'],
  },
  {
    icon: <Baby size={28} />,
    title: 'Poli Anak',
    image: dentalImg,
    desc: 'Layanan kesehatan anak dengan pendekatan ramah dan menyenangkan. Menangani tumbuh-kembang dan imunisasi.',
    features: ['Konsultasi Anak', 'Imunisasi', 'Tumbuh Kembang', 'Nutrisi Anak'],
  },
];

const Services = () => {
  return (
    <section className="section services-page" id="services-page">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Layanan Kami</span>
          <h1 className="section-title">Layanan Kesehatan <span className="text-gradient">Profesional</span></h1>
          <p className="section-subtitle">
            Kami menyediakan berbagai layanan kesehatan berkualitas untuk memenuhi kebutuhan kesehatan Anda dan keluarga.
          </p>
        </div>

        <div className="services-detail-grid">
          {services.map((svc, i) => (
            <div key={i} className={`service-detail-card ${i % 2 === 1 ? 'service-reversed' : ''}`}>
              <div className="service-detail-img">
                <img src={svc.image} alt={svc.title} />
              </div>
              <div className="service-detail-content">
                <div className="service-detail-icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <ul className="service-features">
                  {svc.features.map((f, j) => (
                    <li key={j}>✓ {f}</li>
                  ))}
                </ul>
                <a href="/reservasi" className="service-card-cta">
                  Reservasi <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
