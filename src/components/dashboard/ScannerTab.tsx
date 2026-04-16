import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import type { IScannerProps } from '@yudiel/react-qr-scanner';
import { Search, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './ScannerTab.css';

const ScannerTab = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleDecode = async (text: string) => {
    if (loading || text === scannedCode) return;
    
    setScannedCode(text);
    setLoading(true);
    setErrorMsg('');
    setStatusMsg('');
    setReservation(null);

    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*, doctors(name)')
        .eq('reservation_code', text)
        .single();
        
      if (error || !data) {
        setErrorMsg('Reservasi tidak ditemukan.');
      } else {
        setReservation(data);
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan pencarian.');
    } finally {
      setLoading(false);
    }
  };

  const manualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scannedCode.trim()) {
      handleDecode(scannedCode.trim());
    }
  };

  const handleCheckIn = async () => {
    if (!reservation) return;
    setLoading(true);
    
    const { error } = await supabase
      .from('reservations')
      .update({ status: 'confirmed' })
      .eq('id', reservation.id);
      
    if (!error) {
      setReservation({ ...reservation, status: 'confirmed' });
      setStatusMsg('Pasien berhasil di-check-in!');
    } else {
      setErrorMsg('Gagal melakukan check-in.');
    }
    setLoading(false);
  };

  const resetScanner = () => {
    setScannedCode('');
    setReservation(null);
    setErrorMsg('');
    setStatusMsg('');
  };

  const scannerSettings: IScannerProps = {
    onScan: (result: any) => {
      if (result && result.length > 0 && result[0].rawValue) {
        handleDecode(result[0].rawValue);
      }
    },
    onError: (error: any) => {
      console.log('Scanner error:', error);
    },
    styles: {
      container: { width: '100%', maxWidth: '400px', margin: '0 auto', borderRadius: '12px' },
      video: { borderRadius: '12px', objectFit: 'cover' }
    }
  };

  return (
    <div className="dash-tab-content scanner-tab">
      <div className="dash-table-header">
        <h3>Check-In Scanner</h3>
      </div>
      
      <div className="scanner-layout">
        {/* Left Side: Camera / Input */}
        <div className="scanner-section">
          <div className="camera-box">
            {!reservation ? (
              <>
                <div className="camera-view">
                  <Scanner {...scannerSettings} />
                </div>
                <p className="scanner-help">
                  <Smartphone size={16} /> Arahkan kamera ke QR Code Pasien
                </p>
              </>
            ) : (
              <div className="camera-placeholder">
                <CheckCircle size={48} className="text-secondary" />
                <p>QR Code berhasil dibaca</p>
                <button className="btn btn-outline btn-sm" onClick={resetScanner}>Scan Ulang</button>
              </div>
            )}
          </div>
          
          <div className="manual-input-box">
            <span className="divider-text">ATAU</span>
            <form onSubmit={manualSubmit} className="manual-input-form">
              <label>Ketik Nomor Reservasi (USB Scanner / Manual)</label>
              <div className="input-group">
                <input 
                  type="text" 
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  className="form-input" 
                  placeholder="RSV-XXXXXX" 
                />
                <button type="submit" className="btn btn-primary" disabled={loading || !scannedCode}>
                  {loading ? 'Cari...' : <Search size={18} />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="scanner-result">
          {loading && !reservation && (
            <div className="result-card loading-card">
              Mencari data reservasi...
            </div>
          )}
          
          {errorMsg && (
            <div className="result-card error-card">
              <AlertCircle size={24} />
              <p>{errorMsg}</p>
              <button className="btn btn-outline btn-sm" onClick={resetScanner}>Coba Lagi</button>
            </div>
          )}
          
          {reservation && (
            <div className="result-card success-card animate-fade-in">
              <div className="res-card-header">
                <CheckCircle size={24} className="text-secondary" />
                <h4>Data Ditemukan</h4>
              </div>
              <div className="res-details">
                <div className="res-row"><span>Kode</span><strong>{reservation.reservation_code}</strong></div>
                <div className="res-row"><span>Nama</span><strong>{reservation.patient_name}</strong></div>
                <div className="res-row"><span>Telepon</span><strong>{reservation.patient_phone}</strong></div>
                <div className="res-row"><span>Dokter</span><strong>{reservation.doctors?.name}</strong></div>
                <div className="res-row">
                  <span>Jadwal</span>
                  <strong>{reservation.reservation_date} pukul {reservation.reservation_time}</strong>
                </div>
                <div className="res-row">
                  <span>Status Saat Ini</span>
                  <strong className={`status-badge status-${reservation.status}`}>
                    {reservation.status === 'confirmed' ? 'Dikonfirmasi (Selesai Check-in)' : reservation.status === 'pending' ? 'Menunggu' : 'Dibatalkan'}
                  </strong>
                </div>
              </div>
              
              <div className="res-actions">
                {reservation.status === 'pending' ? (
                  <button className="btn btn-primary btn-lg" onClick={handleCheckIn} disabled={loading}>
                    {loading ? 'Memproses...' : 'Proses Check-In Selesai'}
                  </button>
                ) : (
                  <p className="already-status-msg">
                    Pasien ini sudah {reservation.status === 'confirmed' ? 'proses Check-in.' : 'dibatalkan.'}
                  </p>
                )}
                
                {statusMsg && (
                  <div className="status-success-alert">
                     <CheckCircle size={16} /> {statusMsg}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {!loading && !reservation && !errorMsg && (
            <div className="result-card empty-card">
              <p>Belum ada data di-scan.</p>
              <span>Silakan scan QR Code pasien di samping.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScannerTab;
