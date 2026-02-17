import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminPortfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', image: '', url: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    setLoading(true);
    const { data, error } = await supabase.from('portfolio').select('*').order('id', { ascending: true });
    if (!error) setPortfolio(data);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Upload gambar ke Supabase Storage
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 8)}.${fileExt}`;
    const { data, error } = await supabase.storage.from('portfolio-images').upload(fileName, file);
    if (!error) {
      const { data: publicUrlData } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
      setForm(f => ({ ...f, image: publicUrlData.publicUrl }));
    } else {
      alert('Upload gagal!');
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await supabase.from('portfolio').update(form).eq('id', editingId);
    } else {
      await supabase.from('portfolio').insert([form]);
    }
    setForm({ title: '', description: '', image: '', url: '' });
    setEditingId(null);
    fetchPortfolio();
    setLoading(false);
  }

  function handleEdit(item) {
    setForm({ title: item.title, description: item.description, image: item.image, url: item.url });
    setEditingId(item.id);
  }

  async function handleDelete(id) {
    setLoading(true);
    await supabase.from('portfolio').delete().eq('id', id);
    fetchPortfolio();
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Portfolio</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border px-2 py-1" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="border px-2 py-1" />
        <input name="url" value={form.url} onChange={handleChange} placeholder="Project URL" required className="border px-2 py-1" />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="border px-2 py-1" />
        {form.image && (
          <img src={form.image} alt="preview" className="w-16 h-16 object-cover rounded border" />
        )}
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={() => { setForm({ title: '', description: '', image: '', url: '' }); setEditingId(null); }} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>}
      </form>
      {loading && <div>Loading...</div>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">ID</th>
            <th className="border px-2">Title</th>
            <th className="border px-2">Description</th>
            <th className="border px-2">Image</th>
            <th className="border px-2">URL</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map(item => (
            <tr key={item.id}>
              <td className="border px-2">{item.id}</td>
              <td className="border px-2">{item.title}</td>
              <td className="border px-2">{item.description}</td>
              <td className="border px-2">{item.image}</td>
              <td className="border px-2">{item.url}</td>
              <td className="border px-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
