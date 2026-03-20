import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ReservationsTab = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('*, doctors(name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReservations(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('reservations').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } else {
      alert('Gagal mengupdate status reservasi');
    }
  };

  const filtered = reservations.filter(r =>
    r.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
    r.reservation_code?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Memuat data reservasi...</div>;

  return (
    <div className="dash-tab-content">
      <div className="dash-table-header">
        <h3>Daftar Reservasi</h3>
        <div className="dash-search">
          <Search size={16} />
          <input type="text" placeholder="Cari nama atau kode..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="dash-table-wrapper">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama Pasien</th>
              <th>Telepon</th>
              <th>Dokter</th>
              <th>Jadwal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td className="td-id">{r.reservation_code}</td>
                <td><strong>{r.patient_name}</strong></td>
                <td>{r.patient_phone}</td>
                <td>{r.doctors?.name || '-'}</td>
                <td>{r.reservation_date} <br/><small>{r.reservation_time}</small></td>
                <td>
                  <span className={`status-badge status-${r.status}`}>
                    {r.status === 'confirmed' ? 'Dikonfirmasi' : r.status === 'pending' ? 'Menunggu' : 'Dibatalkan'}
                  </span>
                </td>
                <td>
                  {r.status === 'pending' && (
                    <div className="action-btns">
                      <button className="action-btn action-confirm" onClick={() => updateStatus(r.id, 'confirmed')} title="Konfirmasi">
                        <CheckCircle size={16} />
                      </button>
                      <button className="action-btn action-cancel" onClick={() => updateStatus(r.id, 'cancelled')} title="Batalkan">
                        <XCircle size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center" style={{padding: '2rem'}}>Tidak ada reservasi ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsTab;
