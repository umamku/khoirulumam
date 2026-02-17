import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminLinks() {
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState({ name: '', url: '', icon: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    setLoading(true);
    const { data, error } = await supabase.from('links').select('*').order('id', { ascending: true });
    if (!error) setLinks(data);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await supabase.from('links').update(form).eq('id', editingId);
    } else {
      await supabase.from('links').insert([form]);
    }
    setForm({ name: '', url: '', icon: '', description: '' });
    setEditingId(null);
    fetchLinks();
    setLoading(false);
  }

  function handleEdit(link) {
    setForm({ name: link.name, url: link.url, icon: link.icon, description: link.description || '' });
    setEditingId(link.id);
  }

  async function handleDelete(id) {
    setLoading(true);
    await supabase.from('links').delete().eq('id', id);
    fetchLinks();
    setLoading(false);
  }

  // Fungsi untuk seed data dummy
  async function seedDummyLinks() {
    setLoading(true);
    const dummyLinks = [
      { name: 'Website Pribadi', icon: '🌐', url: 'https://khoirulumam.id', description: 'Ini adalah website pribadi Khoirul Umam.' },
      { name: 'GitHub', icon: '🐙', url: 'https://github.com/khoirulumam', description: 'Kumpulan project open source saya di GitHub.' },
      { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/khoirulumam', description: 'Profil profesional dan pengalaman kerja saya.' },
      { name: 'Instagram', icon: '📸', url: 'https://instagram.com/khoirulumam', description: 'Berbagi foto, aktivitas, dan inspirasi harian.' },
      { name: 'Blog', icon: '✍️', url: 'https://blog.khoirulumam.id', description: 'Artikel, tutorial, dan catatan pengembangan diri.' },
    ];
    await supabase.from('links').insert(dummyLinks);
    fetchLinks();
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-2">
        <h2 className="text-xl font-bold">Links</h2>
      </div>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border px-2 py-1" />
        <input name="url" value={form.url} onChange={handleChange} placeholder="URL" required className="border px-2 py-1" />
        <input name="icon" value={form.icon} onChange={handleChange} placeholder="Icon" required className="border px-2 py-1" />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border px-2 py-1 w-64 h-16 resize rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={() => { setForm({ name: '', url: '', icon: '', description: '' }); setEditingId(null); }} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>}
      </form>
      {loading && <div>Loading...</div>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">ID</th>
            <th className="border px-2">Name</th>
            <th className="border px-2">URL</th>
            <th className="border px-2">Icon</th>
            <th className="border px-2">Description</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => (
            <tr key={link.id}>
              <td className="border px-2">{link.id}</td>
              <td className="border px-2">{link.name}</td>
              <td className="border px-2">{link.url}</td>
              <td className="border px-2">{link.icon}</td>
              <td className="border px-2">{link.description}</td>
              <td className="border px-2">
                <button onClick={() => handleEdit(link)} className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(link.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
