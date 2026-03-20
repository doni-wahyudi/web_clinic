import { useState } from 'react';
import { CalendarCheck, Users, FileText, BarChart3, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import './Dashboard.css';

const mockReservations = [
  { id: 'RSV-001', name: 'Budi Santoso', doctor: 'dr. Ahmad Fauzi', date: '2026-03-21', time: '09:00', status: 'confirmed' },
  { id: 'RSV-002', name: 'Siti Aminah', doctor: 'drg. Budi Santoso', date: '2026-03-21', time: '10:00', status: 'pending' },
  { id: 'RSV-003', name: 'Andi Pratama', doctor: 'dr. Rina Kartika', date: '2026-03-21', time: '11:00', status: 'confirmed' },
  { id: 'RSV-004', name: 'Dewi Lestari', doctor: 'dr. Ahmad Fauzi', date: '2026-03-22', time: '08:00', status: 'pending' },
  { id: 'RSV-005', name: 'Rahmat Hidayat', doctor: 'drg. Budi Santoso', date: '2026-03-22', time: '14:00', status: 'cancelled' },
];

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [reservations, setReservations] = useState(mockReservations);

  const filtered = reservations.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: string, status: string) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
  };

  const stats = [
    { icon: <CalendarCheck size={24} />, value: reservations.length, label: 'Total Reservasi' },
    { icon: <CheckCircle size={24} />, value: reservations.filter(r => r.status === 'confirmed').length, label: 'Dikonfirmasi' },
    { icon: <Clock size={24} />, value: reservations.filter(r => r.status === 'pending').length, label: 'Menunggu' },
    { icon: <Users size={24} />, value: 3, label: 'Dokter Aktif' },
  ];

  return (
    <section className="section dashboard-page" id="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title"><BarChart3 size={28} /> Admin Dashboard</h1>
            <p className="dashboard-subtitle">Kelola reservasi dan data pasien klinik.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="dash-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="dash-stat-card">
              <div className="dash-stat-icon">{s.icon}</div>
              <div>
                <div className="dash-stat-value">{s.value}</div>
                <div className="dash-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Reservations Table */}
        <div className="dash-table-card">
          <div className="dash-table-header">
            <h3><FileText size={18} /> Daftar Reservasi</h3>
            <div className="dash-search">
              <Search size={16} />
              <input type="text" placeholder="Cari nama atau ID..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Pasien</th>
                  <th>Dokter</th>
                  <th>Tanggal</th>
                  <th>Waktu</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td className="td-id">{r.id}</td>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.doctor}</td>
                    <td>{r.date}</td>
                    <td>{r.time}</td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
