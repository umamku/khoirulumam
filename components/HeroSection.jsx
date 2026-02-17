
import React, { useEffect, useState } from 'react';
import ParticleNetwork from './ParticleNetwork';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';


const HeroSection = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.from('profile').select('*').limit(1).single();
      if (!error) setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      <ParticleNetwork />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {loading ? (
            <div className="text-center text-slate-400">Loading...</div>
          ) : profile ? (
            <>
              <div className="flex flex-col items-center justify-center mb-4">
                <img src="/assets/foto.jpeg" alt="Foto Profil" className="w-32 h-32 rounded-full object-cover shadow-lg mb-4 border-4 border-white" />
                <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-cyan-700 uppercase bg-cyan-100 rounded-full border border-cyan-200">
                  {profile.role}
                </div>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Tech</span>,<br />
                Growing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Business</span>.
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                {profile.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#portfolio" className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-1">
                  Lihat Portfolio
                </a>
                <a href="#links" className="px-8 py-3 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 hover:text-cyan-600 transition-all shadow-sm">
                  Daftar Aplikasi
                </a>
              </div>
            </>
          ) : (
            <div className="text-center text-red-400">Profile not found</div>
          )}
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
