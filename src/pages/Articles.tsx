import { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <section className="section articles-page" id="articles-page">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Blog</span>
          <h1 className="section-title">Artikel <span className="text-gradient">Kesehatan</span></h1>
          <p className="section-subtitle">
            Informasi dan tips kesehatan terkini dari tim medis kami untuk membantu 
            Anda menjaga kesehatan keluarga.
          </p>
        </div>

        {loading ? (
          <div className="text-center" style={{ padding: '3rem' }}>Memuat artikel...</div>
        ) : (
          <div className="articles-grid">
            {articles.map((article, i) => (
              <article key={article.id} className="article-card animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="article-img-wrapper">
                  <img src={article.image_url || 'https://placehold.co/600x400?text=Artikel'} alt={article.title} className="article-img" />
                  <span className="article-category">{article.category}</span>
                </div>
                <div className="article-content" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="article-meta">
                    <span style={{ fontSize: '0.85rem' }}>{new Date(article.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                    <span><Clock size={14} /> {article.read_time}</span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt flex-1">{article.excerpt}</p>
                  <a href="#" className="article-link" style={{ marginTop: 'auto' }}>
                    Baca Selengkapnya <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
            {articles.length === 0 && <div className="text-center" style={{gridColumn: '1/-1'}}>Belum ada artikel dipublikasikan.</div>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;
