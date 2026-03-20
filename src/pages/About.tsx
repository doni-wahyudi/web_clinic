import { CheckCircle2, HeartPulse, ShieldCheck, Clock } from 'lucide-react';
import galleryExterior from '../assets/gallery/exterior.png';
import './About.css';

const About = () => {
  return (
    <section className="section about-page" id="about-page">
      <div className="container">
        
        {/* Header Title */}
        <div className="section-header">
          <span className="section-badge">Profil Klinik</span>
          <h1 className="section-title">Tentang <span className="text-gradient">KlinikSehat</span></h1>
          <p className="section-subtitle">
            Dedikasi penuh untuk kesehatan Anda dan keluarga, menghadirkan layanan medis 
            terbaik dengan teknologi modern dan sentuhan kasih sayang.
          </p>
        </div>

        {/* Main Story Grid */}
        <div className="about-grid">
          <div className="about-image-wrapper animate-fade-in">
            <img src={galleryExterior} alt="Gedung KlinikSehat" className="about-img main-img" />
            <div className="about-img-badge">
              <span className="badge-number">10+</span>
              <span className="badge-text">Tahun Melayani<br/>Masyarakat</span>
            </div>
          </div>
          
          <div className="about-content animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="about-heading">Kesehatan Anda adalah Prioritas Utama Kami</h2>
            <p className="about-text">
              Didirikan sejak tahun 2016, <strong>KlinikSehat</strong> telah berkomitmen untuk menjadi fasilitas layanan kesehatan primer terdepan. Kami percaya bahwa setiap individu berhak mendapatkan perawatan medis yang berkualitas, aman, dan nyaman.
            </p>
            <p className="about-text">
              Dengan didukung oleh tim dokter spesialis yang ahli, perawat yang ramah, serta fasilitas medis modern yang lengkap, kami siap menangani berbagai kebutuhan medis Anda secara komprehensif mulai dari pencegahan, pengobatan, hingga pemulihan.
            </p>
            
            <div className="mission-box">
              <h3>Visi & Misi</h3>
              <ul>
                <li><CheckCircle2 size={18} className="icon-check" /> <strong>Visi:</strong> Menjadi klinik pilihan utama keluarga dengan layanan standar internasional.</li>
                <li><CheckCircle2 size={18} className="icon-check" /> <strong>Misi:</strong> Memberikan pelayanan prima yang berpusat pada keselamatan dan kenyamanan pasien.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-choose-us">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>Mengapa Memilih Kami?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><HeartPulse size={32} /></div>
              <h3>Pelayanan Ramah</h3>
              <p>Staf dan perawat kami dilatih khusus untuk memberikan pelayanan dengan empati dan senyuman.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={32} /></div>
              <h3>Dokter Berpengalaman</h3>
              <p>Penanganan langsung oleh dokter umum dan spesialis dengan jam terbang tinggi dan sertifikasi profesional.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Clock size={32} /></div>
              <h3>Fleksibilitas Waktu</h3>
              <p>Jam layanan yang panjang memudahkan Anda melakukan kunjungan di luar jam kerja normal.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
