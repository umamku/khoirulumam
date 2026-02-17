
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { AnimatePresence, motion } from 'framer-motion';
import { Smartphone, Layout, Users, ChevronRight } from 'lucide-react';

const LinkHubSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data, error } = await supabase.from('links').select('*').order('id');
      if (!error) setLinks(data);
      setLoading(false);
    };
    fetchLinks();
  }, []);

  const filteredLinks = activeTab === 'all' ? links : links.filter(link => link.category === activeTab);

  return (
    <section id="links" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Link Hub</h2>
          <p className="text-slate-600">Akses cepat ke produk, jadwal training, dan komunitas.</p>
        </div>
        <div className="flex justify-center space-x-2 mb-8 overflow-x-auto pb-2">
          {['all', 'apps', 'training', 'community'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all whitespace-nowrap border ${
                activeTab === tab
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-500/20'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              {tab === 'apps' ? 'SaaS / Apps' : tab}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center text-slate-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={`/link/${link.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="block group"
                >
                  <div className={`bg-white border border-slate-200 hover:border-cyan-400 p-4 rounded-xl flex items-center justify-between transition-all hover:shadow-md`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg border ${
                        link.category === 'apps'
                          ? 'bg-blue-50 text-blue-600 border-blue-100'
                          : link.category === 'training'
                          ? 'bg-orange-50 text-orange-600 border-orange-100'
                          : 'bg-green-50 text-green-600 border-green-100'
                      }`}>
                        {link.category === 'apps' ? <Smartphone size={20} /> : link.category === 'training' ? <Layout size={20} /> : <Users size={20} />}
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-semibold group-hover:text-cyan-600 transition-colors">{link.title}</h4>
                        <p className="text-xs text-slate-500">{link.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {link.status && (
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                            link.status === 'Live'
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : link.status === 'Beta'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {link.status}
                        </span>
                      )}
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default LinkHubSection;
