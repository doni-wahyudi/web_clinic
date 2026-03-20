import { useState } from 'react';
import { QrCode, Download, Printer, RefreshCw } from 'lucide-react';
import './QRCode.css';

const QRCodePage = () => {
  const [inputData, setInputData] = useState('');
  const [qrData, setQrData] = useState('');

  const generateQR = () => {
    if (inputData.trim()) {
      setQrData(inputData.trim());
    }
  };

  const qrImageUrl = qrData 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`
    : '';

  return (
    <section className="section qr-page" id="qr-page">
      <div className="container">
        <div className="section-header">
          <span className="section-badge"><QrCode size={14} /> QR Code</span>
          <h1 className="section-title">QR Code <span className="text-gradient">Check-In</span></h1>
          <p className="section-subtitle">
            Gunakan QR Code untuk check-in cepat di klinik. Tunjukkan QR Code kepada petugas 
            resepsionis atau scan di mesin check-in.
          </p>
        </div>

        <div className="qr-layout">
          {/* Input Form */}
          <div className="qr-input-card">
            <h3 className="qr-card-title">Generate QR Code</h3>
            <p className="qr-card-desc">
              Masukkan nomor reservasi atau data untuk membuat QR Code check-in Anda.
            </p>
            <div className="form-group">
              <label className="form-label">Nomor Reservasi / Nama Pasien</label>
              <input
                type="text"
                value={inputData}
                onChange={e => setInputData(e.target.value)}
                className="form-input"
                placeholder="Contoh: RSV-20260320-001 atau Nama Anda"
              />
            </div>
            <button className="btn btn-primary" onClick={generateQR} disabled={!inputData.trim()}>
              <QrCode size={18} /> Generate QR Code
            </button>

            <div className="qr-info-box">
              <h4>📋 Cara Menggunakan:</h4>
              <ol>
                <li>Masukkan nomor reservasi Anda</li>
                <li>Klik "Generate QR Code"</li>
                <li>Simpan atau cetak QR Code</li>
                <li>Tunjukkan QR Code saat registrasi di klinik</li>
              </ol>
            </div>
          </div>

          {/* QR Display */}
          <div className="qr-display-card">
            {qrData ? (
              <div className="qr-result animate-fade-in">
                <div className="qr-image-frame">
                  <img src={qrImageUrl} alt={`QR Code: ${qrData}`} className="qr-image" />
                </div>
                <p className="qr-data-text">{qrData}</p>
                <div className="qr-actions">
                  <a href={qrImageUrl} download={`qr-kliniksehat-${qrData}.png`} className="btn btn-sm btn-primary">
                    <Download size={16} /> Simpan
                  </a>
                  <button className="btn btn-sm btn-outline" onClick={() => window.print()}>
                    <Printer size={16} /> Cetak
                  </button>
                  <button className="btn btn-sm btn-outline" onClick={() => { setQrData(''); setInputData(''); }}>
                    <RefreshCw size={16} /> Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="qr-empty">
                <QrCode size={80} className="qr-empty-icon" />
                <p>QR Code akan muncul di sini</p>
                <span>Masukkan data dan klik generate</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodePage;
