import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LinkDetail() {
  const { id } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLink() {
      const { data, error } = await supabase.from('links').select('*').eq('id', id).single();
      if (!error && data) setLink(data);
      setLoading(false);
    }
    fetchLink();
  }, [id]);

  // Data dummy jika link tidak ditemukan
  const dummy = {
    name: 'Contoh Link',
    icon: '🔗',
    description: 'Ini adalah halaman deskripsi link dummy. Anda bisa mengedit deskripsi ini dari halaman admin.',
    url: 'https://contoh.com',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 py-12">
        {loading ? (
          <div className="text-center mt-10 text-slate-400">Loading...</div>
        ) : (
          <div className="relative max-w-2xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-cyan-100 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-100 rounded-full blur-2xl opacity-60 z-0"></div>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-cyan-50 border-4 border-cyan-200 shadow mb-4 text-4xl">
                {dummy.icon}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 text-center">
                {link ? link.title : dummy.name}
              </h1>
              <div className="mb-6 text-slate-600 text-center text-lg leading-relaxed">
                {link ? link.desc : dummy.description}
              </div>
              <a
                href={link ? link.url : dummy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg hover:shadow-cyan-400/30 transition-all transform hover:-translate-y-1 text-lg"
              >
                Kunjungi Link
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
