import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/6281234567890?text=Halo%20KlinikSehat,%20saya%20ingin%20bertanya..."
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      id="floating-whatsapp"
      aria-label="Chat WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
};

export default FloatingWhatsApp;
