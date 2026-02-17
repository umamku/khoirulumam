import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', icon: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data
  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const { data, error } = await supabase.from('services').select('*').order('id', { ascending: true });
    if (!error) setServices(data);
    setLoading(false);
  }

  // Handle form change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Add or update service
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await supabase.from('services').update(form).eq('id', editingId);
    } else {
      await supabase.from('services').insert([form]);
    }
    setForm({ title: '', description: '', icon: '' });
    setEditingId(null);
    fetchServices();
    setLoading(false);
  }

  // Edit
  function handleEdit(service) {
    setForm({ title: service.title, description: service.description, icon: service.icon });
    setEditingId(service.id);
  }

  // Delete
  async function handleDelete(id) {
    setLoading(true);
    await supabase.from('services').delete().eq('id', id);
    fetchServices();
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Services</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border px-2 py-1" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="border px-2 py-1" />
        <input name="icon" value={form.icon} onChange={handleChange} placeholder="Icon" required className="border px-2 py-1" />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={() => { setForm({ title: '', description: '', icon: '' }); setEditingId(null); }} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>}
      </form>
      {loading && <div>Loading...</div>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">ID</th>
            <th className="border px-2">Title</th>
            <th className="border px-2">Description</th>
            <th className="border px-2">Icon</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td className="border px-2">{service.id}</td>
              <td className="border px-2">{service.title}</td>
              <td className="border px-2">{service.description}</td>
              <td className="border px-2">{service.icon}</td>
              <td className="border px-2">
                <button onClick={() => handleEdit(service)} className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(service.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
