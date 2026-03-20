import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ArticlesTab = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArt, setEditingArt] = useState<any>(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: '', read_time: '' });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (!error && data) setArticles(data);
    setLoading(false);
  };

  const handleEdit = (art: any) => {
    setEditingArt(art);
    setForm({
      title: art.title, excerpt: art.excerpt, content: art.content,
      category: art.category, read_time: art.read_time
    });
    setFile(null);
  };

  const handleAddNew = () => {
    setEditingArt({ id: 'new' });
    setForm({ title: '', excerpt: '', content: '', category: '', read_time: '' });
    setFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus artikel ini?')) return;
    await supabase.from('articles').delete().eq('id', id);
    fetchArticles();
  };

  const uploadImage = async () => {
    if (!file) return editingArt?.image_url;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `article_${Math.random()}.${fileExt}`;
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('clinic-images').upload(filePath, file);
    if (uploadError) {
      alert('Gagal mengunggah foto');
      setUploading(false);
      return null;
    }

    const { data } = supabase.storage.from('clinic-images').getPublicUrl(filePath);
    setUploading(false);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl = await uploadImage();
    
    const payload = { ...form };
    if (imageUrl) (payload as any).image_url = imageUrl;

    if (editingArt.id === 'new') {
      await supabase.from('articles').insert([payload]);
    } else {
      await supabase.from('articles').update(payload).eq('id', editingArt.id);
    }
    
    setEditingArt(null);
    fetchArticles();
  };

  if (loading) return <div>Memuat data artikel...</div>;

  if (editingArt) {
    return (
      <div className="dash-form-card">
        <h3>{editingArt.id === 'new' ? 'Tambah Artikel Baru' : 'Edit Artikel'}</h3>
        <form onSubmit={handleSubmit} className="crud-form">
          <div className="form-group row">
            <div className="col">
              <label className="form-label">Judul Artikel</label>
              <input type="text" className="form-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            </div>
            <div className="col">
              <label className="form-label">Kategori</label>
              <input type="text" className="form-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label className="form-label">Waktu Baca (Misal: 5 Menit)</label>
              <input type="text" className="form-input" value={form.read_time} onChange={e => setForm({...form, read_time: e.target.value})} required />
            </div>
            <div className="col">
              <label className="form-label">Kutipan Singkat (Excerpt)</label>
              <input type="text" className="form-input" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Isi Artikel Lengkap</label>
            <textarea className="form-textarea" rows={6} value={form.content} onChange={e => setForm({...form, content: e.target.value})} required></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Gambar Cover <Upload size={14} style={{display:'inline', marginLeft:'5px'}} /></label>
            <input type="file" className="form-input" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
            {editingArt.image_url && !file && <p style={{fontSize:'0.8rem', marginTop:'5px'}}>Gambar saat ini sudah tersimpan.</p>}
          </div>
          <div className="form-actions" style={{marginTop: '20px'}}>
            <button type="button" className="btn btn-outline" onClick={() => setEditingArt(null)}>Batal</button>
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Menyimpan...' : 'Simpan Artikel'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="dash-tab-content">
      <div className="dash-table-header">
        <h3>Kelola Artikel</h3>
        <button className="btn btn-primary btn-sm" onClick={handleAddNew}><Plus size={16} /> Tambah Artikel</button>
      </div>
      <div className="dash-grid-list">
        {articles.map(a => (
          <div key={a.id} className="dash-list-card article-card-admin">
            {a.image_url && (
               <div className="art-cover" style={{backgroundImage: `url(${a.image_url})`, height: '120px', backgroundSize:'cover', borderRadius:'8px 8px 0 0'}}></div>
            )}
            <div className="doc-info" style={{padding: '15px'}}>
              <h4>{a.title}</h4>
              <p className="specialty">{a.category}</p>
              <p className="schedule" style={{fontSize:'0.85rem', color:'#64748b'}}>{a.excerpt}</p>
            </div>
            <div className="doc-actions" style={{padding: '0 15px 15px'}}>
              <button onClick={() => handleEdit(a)} className="action-btn action-edit" title="Edit"><Edit size={16} /></button>
              <button onClick={() => handleDelete(a.id)} className="action-btn action-cancel" title="Hapus"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesTab;
