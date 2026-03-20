import { useState, useEffect } from 'react';
import { Star, Calendar, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      const { data } = await supabase.from('doctors').select('*').order('id', { ascending: true });
      if (data) setDoctors(data);
      setLoading(false);
    };
    fetchDocs();
  }, []);

  return (
    <section className="section doctors-page" id="doctors-page">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Tim Medis</span>
          <h1 className="section-title">Dokter <span className="text-gradient">Spesialis</span> Kami</h1>
          <p className="section-subtitle">
            Tim dokter profesional dan berpengalaman yang siap memberikan pelayanan kesehatan terbaik.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center" style={{ padding: '3rem' }}>Memuat profil dokter...</div>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doc, i) => (
              <div key={doc.id} className="doctor-card animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="doctor-img-wrapper">
                  <img src={doc.image_url || 'https://placehold.co/400x400?text=' + doc.name} alt={doc.name} className="doctor-img" />
                  <div className="doctor-rating">
                    <Star size={14} fill="currentColor" /> {doc.rating || '5.0'}
                  </div>
                </div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{doc.name}</h3>
                  <span className="doctor-specialty">{doc.specialty}</span>
                  <p className="doctor-bio">{doc.bio}</p>
                  <div className="doctor-meta">
                    <span><Calendar size={14} /> {doc.schedule}</span>
                    <span><Award size={14} /> {doc.experience}</span>
                  </div>
                  <a href="/reservasi" className="btn btn-primary btn-sm doctor-cta">
                    Reservasi
                  </a>
                </div>
              </div>
            ))}
            {doctors.length === 0 && <div className="text-center" style={{gridColumn: '1/-1'}}>Belum ada data dokter.</div>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;
