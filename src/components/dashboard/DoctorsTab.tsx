import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const DoctorsTab = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [form, setForm] = useState({ name: '', specialty: '', schedule: '', experience: '', bio: '' });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('doctors').select('*').order('id', { ascending: true });
    if (!error && data) setDoctors(data);
    setLoading(false);
  };

  const handleEdit = (doc: any) => {
    setEditingDoc(doc);
    setForm({
      name: doc.name, specialty: doc.specialty, schedule: doc.schedule,
      experience: doc.experience, bio: doc.bio
    });
    setFile(null);
  };

  const handleAddNew = () => {
    setEditingDoc({ id: 'new' });
    setForm({ name: '', specialty: '', schedule: '', experience: '', bio: '' });
    setFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus profil dokter ini?')) return;
    await supabase.from('doctors').delete().eq('id', id);
    fetchDoctors();
  };

  const uploadImage = async () => {
    if (!file) return editingDoc?.image_url;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `doctors/${fileName}`;

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
    
    const payload = { ...form, rating: editingDoc.rating || 5.0 };
    if (imageUrl) (payload as any).image_url = imageUrl;

    if (editingDoc.id === 'new') {
      await supabase.from('doctors').insert([payload]);
    } else {
      await supabase.from('doctors').update(payload).eq('id', editingDoc.id);
    }
    
    setEditingDoc(null);
    fetchDoctors();
  };

  if (loading) return <div>Memuat data dokter...</div>;

  if (editingDoc) {
    return (
      <div className="dash-form-card">
        <h3>{editingDoc.id === 'new' ? 'Tambah Dokter Baru' : 'Edit Profil Dokter'}</h3>
        <form onSubmit={handleSubmit} className="crud-form">
          <div className="form-group row">
            <div className="col">
              <label className="form-label">Nama Lengkap</label>
              <input type="text" className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="col">
              <label className="form-label">Spesialisasi</label>
              <input type="text" className="form-input" value={form.specialty} onChange={e => setForm({...form, specialty: e.target.value})} required />
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label className="form-label">Jadwal Praktik</label>
              <input type="text" className="form-input" value={form.schedule} onChange={e => setForm({...form, schedule: e.target.value})} required />
            </div>
            <div className="col">
              <label className="form-label">Pengalaman (Misal: 10 Tahun)</label>
              <input type="text" className="form-input" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Biografi Singkat</label>
            <textarea className="form-textarea" rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})}></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Foto Profil <Upload size={14} style={{display:'inline', marginLeft:'5px'}} /></label>
            <input type="file" className="form-input" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
            {editingDoc.image_url && !file && <p style={{fontSize:'0.8rem', marginTop:'5px'}}>Foto saat ini sudah tersimpan.</p>}
          </div>
          <div className="form-actions" style={{marginTop: '20px'}}>
            <button type="button" className="btn btn-outline" onClick={() => setEditingDoc(null)}>Batal</button>
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Menyimpan...' : 'Simpan Profil'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="dash-tab-content">
      <div className="dash-table-header">
        <h3>Kelola Dokter</h3>
        <button className="btn btn-primary btn-sm" onClick={handleAddNew}><Plus size={16} /> Tambah Dokter</button>
      </div>
      <div className="dash-grid-list">
        {doctors.map(d => (
          <div key={d.id} className="dash-list-card">
            <div className="doc-avatar">
              <img src={d.image_url || 'https://placehold.co/100x100?text=' + d.name[0]} alt={d.name} />
            </div>
            <div className="doc-info">
              <h4>{d.name}</h4>
              <p className="specialty">{d.specialty}</p>
              <p className="schedule">{d.schedule}</p>
            </div>
            <div className="doc-actions">
              <button onClick={() => handleEdit(d)} className="action-btn action-edit" title="Edit"><Edit size={16} /></button>
              <button onClick={() => handleDelete(d.id)} className="action-btn action-cancel" title="Hapus"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsTab;
