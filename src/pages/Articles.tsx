import { Clock, ArrowRight } from 'lucide-react';
import galleryConsultation from '../assets/gallery/consultation.png';
import galleryCheckup from '../assets/gallery/checkup.png';
import galleryExterior from '../assets/gallery/exterior.png';
import './Articles.css';

const articles = [
  {
    title: 'Tips Menjaga Kesehatan di Musim Hujan',
    excerpt: 'Musim hujan sering membawa berbagai penyakit. Berikut tips efektif menjaga daya tahan tubuh Anda dan keluarga.',
    image: galleryConsultation,
    date: '15 Maret 2026',
    category: 'Tips Kesehatan',
    readTime: '5 menit',
  },
  {
    title: 'Pentingnya Medical Check-Up Rutin',
    excerpt: 'Pemeriksaan kesehatan berkala sangat penting untuk deteksi dini penyakit. Ketahui kapan waktu yang tepat untuk check-up.',
    image: galleryCheckup,
    date: '10 Maret 2026',
    category: 'Edukasi',
    readTime: '7 menit',
  },
  {
    title: 'Panduan Perawatan Gigi untuk Keluarga',
    excerpt: 'Kesehatan gigi yang baik dimulai dari kebiasaan sehari-hari. Simak panduan lengkap perawatan gigi untuk seluruh anggota keluarga.',
    image: galleryExterior,
    date: '5 Maret 2026',
    category: 'Poli Gigi',
    readTime: '6 menit',
  },
];

const Articles = () => {
  return (
    <section className="section articles-page" id="articles-page">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Blog</span>
          <h1 className="section-title">Artikel <span className="text-gradient">Kesehatan</span></h1>
          <p className="section-subtitle">
            Informasi dan tips kesehatan terkini dari tim medis kami untuk membantu 
            Anda menjaga kesehatan keluarga.
          </p>
        </div>

        <div className="articles-grid">
          {articles.map((article, i) => (
            <article key={i} className="article-card animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="article-img-wrapper">
                <img src={article.image} alt={article.title} className="article-img" />
                <span className="article-category">{article.category}</span>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span>{article.date}</span>
                  <span><Clock size={14} /> {article.readTime}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <a href="#" className="article-link">
                  Baca Selengkapnya <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
