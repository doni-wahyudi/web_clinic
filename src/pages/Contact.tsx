import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section className="section contact-page" id="contact-page">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Hubungi Kami</span>
          <h1 className="section-title">Kontak & <span className="text-gradient">Lokasi</span></h1>
          <p className="section-subtitle">
            Hubungi kami untuk konsultasi atau informasi lebih lanjut. Kami siap melayani Anda.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info-col">
            <div className="contact-card">
              <div className="contact-icon"><Phone size={24} /></div>
              <div>
                <h4>Telepon</h4>
                <a href="tel:+6281234567890">0812-3456-7890</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><FaWhatsapp size={24} /></div>
              <div>
                <h4>WhatsApp</h4>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">0812-3456-7890</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><Mail size={24} /></div>
              <div>
                <h4>Email</h4>
                <a href="mailto:info@kliniksehat.com">info@kliniksehat.com</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><MapPin size={24} /></div>
              <div>
                <h4>Alamat</h4>
                <p>Jl. Sehat Sejahtera No. 123, Jakarta Selatan</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><Clock size={24} /></div>
              <div>
                <h4>Jam Operasional</h4>
                <p>Senin - Sabtu: 08:00 - 21:00</p>
                <p>Minggu: 09:00 - 15:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-col">
            <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Pesan terkirim! Terima kasih.'); }}>
              <h3 className="contact-form-title">Kirim Pesan</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nama</label>
                  <input type="text" className="form-input" placeholder="Nama lengkap" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Telepon</label>
                  <input type="tel" className="form-input" placeholder="08xx-xxxx-xxxx" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="email@contoh.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Pesan</label>
                <textarea className="form-textarea" placeholder="Tulis pesan Anda..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                <Send size={16} /> Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="contact-map">
          <iframe
            title="Lokasi KlinikSehat"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJakarta!5e0!3m2!1sid!2sid!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
