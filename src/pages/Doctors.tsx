import { Star, Calendar, Award } from 'lucide-react';
import doctorMale from '../assets/doctors/doctor_male.png';
import doctorFemale from '../assets/doctors/doctor_female.png';
import doctorSpecialist from '../assets/doctors/doctor_specialist.png';
import './Doctors.css';

const doctors = [
  {
    name: 'dr. Ahmad Fauzi, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam',
    image: doctorMale,
    schedule: 'Senin - Jumat, 08:00 - 14:00',
    experience: '15 Tahun',
    rating: 4.9,
    bio: 'Berpengalaman dalam menangani penyakit dalam dengan pendekatan holistik dan teknologi modern.',
  },
  {
    name: 'dr. Rina Kartika, Sp.A',
    specialty: 'Spesialis Anak',
    image: doctorFemale,
    schedule: 'Senin - Sabtu, 09:00 - 16:00',
    experience: '12 Tahun',
    rating: 4.8,
    bio: 'Dokter anak dengan pendekatan ramah anak dan perhatian khusus pada tumbuh kembang optimal.',
  },
  {
    name: 'drg. Budi Santoso',
    specialty: 'Dokter Gigi',
    image: doctorSpecialist,
    schedule: 'Selasa, Kamis, Sabtu, 10:00 - 17:00',
    experience: '8 Tahun',
    rating: 4.9,
    bio: 'Ahli dalam perawatan gigi estetika dan restorasi dengan teknologi dental terkini.',
  },
];

const Doctors = () => {
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
        <div className="doctors-grid">
          {doctors.map((doc, i) => (
            <div key={i} className="doctor-card animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="doctor-img-wrapper">
                <img src={doc.image} alt={doc.name} className="doctor-img" />
                <div className="doctor-rating">
                  <Star size={14} fill="currentColor" /> {doc.rating}
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
                  Buat Janji
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
