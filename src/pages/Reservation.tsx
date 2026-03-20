import { useState } from 'react';
import { CalendarCheck, User, Clock, FileText, CheckCircle } from 'lucide-react';
import './Reservation.css';

const doctors = [
  { id: 1, name: 'dr. Ahmad Fauzi, Sp.PD', specialty: 'Poli Umum' },
  { id: 2, name: 'drg. Siti Nurhaliza', specialty: 'Poli Gigi' },
  { id: 3, name: 'dr. Rina Kartika, Sp.A', specialty: 'Poli Anak' },
];

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00'];

const Reservation = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', phone: '', doctor: '', date: '', time: '', complaint: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section reservation-page">
        <div className="container">
          <div className="reservation-success">
            <CheckCircle size={64} className="success-icon" />
            <h2>Reservasi Berhasil!</h2>
            <p>Terima kasih, <strong>{form.name}</strong>. Reservasi Anda telah tercatat.</p>
            <div className="success-details">
              <div className="detail-row"><span>Dokter</span><strong>{doctors.find(d => d.id === Number(form.doctor))?.name}</strong></div>
              <div className="detail-row"><span>Tanggal</span><strong>{form.date}</strong></div>
              <div className="detail-row"><span>Waktu</span><strong>{form.time}</strong></div>
              <div className="detail-row"><span>Keluhan</span><strong>{form.complaint || '-'}</strong></div>
            </div>
            <p className="success-note">Silakan datang 15 menit sebelum jadwal. Anda juga dapat menggunakan QR Code untuk check-in cepat.</p>
            <div className="success-actions">
              <a href="/qr-code" className="btn btn-primary">Lihat QR Code</a>
              <button className="btn btn-outline" onClick={() => { setSubmitted(false); setStep(1); setForm({ name: '', phone: '', doctor: '', date: '', time: '', complaint: '' }); }}>
                Buat Reservasi Lagi
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section reservation-page" id="reservation-page">
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><CalendarCheck size={14} /> Reservasi Online</span>
          <h1 className="section-title">Buat <span className="text-gradient">Janji Temu</span></h1>
          <p className="section-subtitle">
            Reservasi secara online untuk mendapatkan pelayanan tanpa antri. 
            Pilih dokter dan jadwal yang sesuai.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="steps-indicator">
          {[1, 2, 3].map(s => (
            <div key={s} className={`step-dot ${step >= s ? 'step-active' : ''}`}>
              <span>{s}</span>
              <p>{s === 1 ? 'Data Pasien' : s === 2 ? 'Pilih Dokter' : 'Konfirmasi'}</p>
            </div>
          ))}
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          {/* Step 1: Patient Data */}
          {step === 1 && (
            <div className="form-step animate-fade-in">
              <h3 className="form-step-title"><User size={20} /> Data Pasien</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Masukkan nama lengkap" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Nomor Telepon</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="08xx-xxxx-xxxx" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Keluhan (Opsional)</label>
                <textarea name="complaint" value={form.complaint} onChange={handleChange} className="form-textarea" placeholder="Deskripsikan keluhan Anda..." />
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setStep(2)} disabled={!form.name || !form.phone}>
                Selanjutnya <FileText size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Choose Doctor & Time */}
          {step === 2 && (
            <div className="form-step animate-fade-in">
              <h3 className="form-step-title"><Clock size={20} /> Pilih Dokter & Jadwal</h3>
              <div className="form-group">
                <label className="form-label">Dokter</label>
                <select name="doctor" value={form.doctor} onChange={handleChange} className="form-select" required>
                  <option value="">-- Pilih Dokter --</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
                  ))}
                </select>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Tanggal</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Waktu</label>
                  <select name="time" value={form.time} onChange={handleChange} className="form-select" required>
                    <option value="">-- Pilih Waktu --</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Kembali</button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(3)} disabled={!form.doctor || !form.date || !form.time}>
                  Selanjutnya
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="form-step animate-fade-in">
              <h3 className="form-step-title"><CheckCircle size={20} /> Konfirmasi Reservasi</h3>
              <div className="confirm-card">
                <div className="confirm-row"><span>Nama</span><strong>{form.name}</strong></div>
                <div className="confirm-row"><span>Telepon</span><strong>{form.phone}</strong></div>
                <div className="confirm-row"><span>Dokter</span><strong>{doctors.find(d => d.id === Number(form.doctor))?.name}</strong></div>
                <div className="confirm-row"><span>Tanggal</span><strong>{form.date}</strong></div>
                <div className="confirm-row"><span>Waktu</span><strong>{form.time}</strong></div>
                <div className="confirm-row"><span>Keluhan</span><strong>{form.complaint || '-'}</strong></div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>Kembali</button>
                <button type="submit" className="btn btn-primary btn-lg">
                  Konfirmasi Reservasi <CalendarCheck size={18} />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Reservation;
