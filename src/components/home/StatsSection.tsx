import { useState, useEffect, useRef } from 'react';
import { Users, Award, Clock, Building } from 'lucide-react';
import './StatsSection.css';

const stats = [
  { icon: <Users size={28} />, value: 15000, suffix: '+', label: 'Pasien Terlayani' },
  { icon: <Award size={28} />, value: 10, suffix: '+', label: 'Tahun Pengalaman' },
  { icon: <Building size={28} />, value: 6, suffix: '', label: 'Poli Spesialis' },
  { icon: <Clock size={28} />, value: 24, suffix: '/7', label: 'Layanan Darurat' },
];

const StatsSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section section-dark" id="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">
                {visible ? <CountUp end={stat.value} /> : '0'}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count.toLocaleString()}</>;
};

export default StatsSection;
