
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { ExternalLink, Database, ChevronRight } from 'lucide-react';

const PortfolioSection = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase.from('portfolio').select('*').order('id');
      if (!error) setPortfolio(data);
      setLoading(false);
    };
    fetchPortfolio();
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Featured Projects</h2>
            <p className="text-slate-600">Beberapa studi kasus terpilih.</p>
          </div>
          <a href="#" className="hidden md:flex items-center text-cyan-600 font-medium hover:text-cyan-700 transition-colors mt-4 md:mt-0">
            Lihat Semua <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
        {loading ? (
          <div className="text-center text-slate-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.map((project) => (
              <div key={project.id} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-xl transition-all duration-300">
                <a href={`/portfolio/${project.id}`} className="block group">
                  <div className="h-64 bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors overflow-hidden border-b border-slate-100">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                    ) : (
                      <Database size={64} className="text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(project.tech) ? project.tech.map((t) => (
                        <span key={t} className="text-xs font-mono text-cyan-700 bg-cyan-50 border border-cyan-100 px-2 py-1 rounded">
                          {t}
                        </span>
                      )) : null}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{project.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{project.desc}</p>
                    <span className="inline-flex items-center text-sm font-bold text-slate-900 group-hover:text-cyan-600">
                      Lihat Detail Project <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-flex items-center text-cyan-600 font-medium hover:text-cyan-700 transition-colors">
            Lihat Semua <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
