import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', job: '', avatar: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    const { data, error } = await supabase.from('profile').select('*').limit(1).single();
    if (!error && data) setProfile(data);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (profile) {
      await supabase.from('profile').update(form).eq('id', profile.id);
    } else {
      await supabase.from('profile').insert([form]);
    }
    setEditing(false);
    setForm({ name: '', job: '', avatar: '' });
    fetchProfile();
    setLoading(false);
  }

  function handleEdit() {
    setForm({ name: profile.name, job: profile.job, avatar: profile.avatar });
    setEditing(true);
  }

  async function handleDelete() {
    if (profile) {
      setLoading(true);
      await supabase.from('profile').delete().eq('id', profile.id);
      setProfile(null);
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      {editing ? (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border px-2 py-1" />
          <input name="job" value={form.job} onChange={handleChange} placeholder="Job" required className="border px-2 py-1" />
          <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL" required className="border px-2 py-1" />
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">{profile ? 'Update' : 'Add'}</button>
          <button type="button" onClick={() => setEditing(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
        </form>
      ) : (
        <div className="mb-4">
          {profile ? (
            <div className="flex items-center gap-4">
              <img src={profile.avatar} alt="avatar" className="w-16 h-16 rounded-full" />
              <div>
                <div className="font-bold">{profile.name}</div>
                <div>{profile.job}</div>
              </div>
              <button onClick={handleEdit} className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-3 py-1 rounded">Add Profile</button>
          )}
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
}
