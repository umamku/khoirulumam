import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PortfolioDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase.from('portfolio').select('*').eq('id', id).single();
      if (!error && data) setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  // Data dummy jika project tidak ditemukan
  const dummy = {
    title: 'Contoh Project',
    description: 'Deskripsi project dummy. Edit dari admin.',
    image: '',
    url: '#',
    tech: [],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 py-12">
        {loading ? (
          <div className="text-center mt-10 text-slate-400">Loading...</div>
        ) : (
          <div className="relative max-w-3xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-0 border border-cyan-100 overflow-hidden">
            {/* Banner Image */}
            <div className="w-full h-64 md:h-96 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100">
              <img
                src={project && project.image ? project.image : dummy.image}
                alt={project ? project.title : dummy.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 text-center">
                {project ? project.title : dummy.title}
              </h1>
              <div className="mb-6 text-slate-600 text-center text-lg leading-relaxed">
                {project ? project.description : dummy.description}
              </div>
              {project && Array.isArray(project.tech) && project.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono text-cyan-700 bg-cyan-50 border border-cyan-100 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {project && project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg hover:shadow-cyan-400/30 transition-all transform hover:-translate-y-1 text-lg"
                >
                  Kunjungi Project
                </a>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
