
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Code2, TrendingUp, Users } from 'lucide-react';

const ICONS = { Code2, TrendingUp, Users };

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select('*').order('id');
      if (!error) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Expertise</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </div>
        {loading ? (
          <div className="text-center text-slate-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = ICONS[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-cyan-300 hover:shadow-md transition-all group"
                >
                  <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                    {Icon && <Icon className={
                      service.icon === 'Code2' ? 'w-8 h-8 text-cyan-600' :
                      service.icon === 'TrendingUp' ? 'w-8 h-8 text-purple-600' :
                      'w-8 h-8 text-pink-600'} />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
