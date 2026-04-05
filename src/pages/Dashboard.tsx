import { useState } from 'react';
import { BarChart3, CalendarCheck, Users, FileText, ScanBarcode } from 'lucide-react';
import ReservationsTab from '../components/dashboard/ReservationsTab';
import DoctorsTab from '../components/dashboard/DoctorsTab';
import ArticlesTab from '../components/dashboard/ArticlesTab';
import ScannerTab from '../components/dashboard/ScannerTab';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'doctors' | 'articles' | 'scanner'>('reservations');

  return (
    <section className="section dashboard-page" id="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title"><BarChart3 size={28} /> Admin Dashboard</h1>
            <p className="dashboard-subtitle">Kelola reservasi, dokter, dan artikel klinik.</p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="dash-tabs">
          <button 
            className={`dash-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            <CalendarCheck size={18} /> Reservasi
          </button>
          <button 
            className={`dash-tab-btn ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            <Users size={18} /> Dokter
          </button>
          <button 
            className={`dash-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            <FileText size={18} /> Artikel
          </button>
          <button 
            className={`dash-tab-btn ${activeTab === 'scanner' ? 'active' : ''}`}
            onClick={() => setActiveTab('scanner')}
          >
            <ScanBarcode size={18} /> Scanner
          </button>
        </div>

        {/* Tab Content */}
        <div className="dash-content-area animate-fade-in">
          {activeTab === 'reservations' && <ReservationsTab />}
          {activeTab === 'doctors' && <DoctorsTab />}
          {activeTab === 'articles' && <ArticlesTab />}
          {activeTab === 'scanner' && <ScannerTab />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
