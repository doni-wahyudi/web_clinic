import { Stethoscope, Smile, FlaskConical, Pill, HeartPulse, Baby } from 'lucide-react';
import './ServicesPreview.css';

const services = [
  { icon: <Stethoscope size={32} />, title: 'Poli Umum', desc: 'Pemeriksaan kesehatan umum oleh dokter berpengalaman untuk segala keluhan.' },
  { icon: <Smile size={32} />, title: 'Poli Gigi', desc: 'Perawatan gigi lengkap: tambal, cabut, pembersihan karang gigi, dan estetika.' },
  { icon: <FlaskConical size={32} />, title: 'Laboratorium', desc: 'Pemeriksaan darah, urine, dan tes laboratorium dengan hasil akurat dan cepat.' },
  { icon: <Pill size={32} />, title: 'Apotek', desc: 'Apotek lengkap dengan obat-obatan berkualitas dan harga terjangkau.' },
  { icon: <HeartPulse size={32} />, title: 'Medical Check-Up', desc: 'Paket pemeriksaan kesehatan menyeluruh untuk deteksi dini penyakit.' },
  { icon: <Baby size={32} />, title: 'Poli Anak', desc: 'Layanan kesehatan anak dengan pendekatan ramah dan menyenangkan.' },
];

const ServicesPreview = () => {
  return (
    <section className="section section-alt" id="services-preview">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Layanan Kami</span>
          <h2 className="section-title">Layanan Kesehatan <span className="text-gradient">Terlengkap</span></h2>
          <p className="section-subtitle">
            Kami menyediakan berbagai layanan kesehatan profesional dengan peralatan modern
            dan tenaga medis yang berpengalaman.
          </p>
        </div>
        <div className="services-grid">
          {services.map((svc, i) => (
            <div key={i} className="service-card animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="service-icon">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
