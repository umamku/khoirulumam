import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

import AdminLogin from './AdminLogin';
import AdminProfile from './AdminProfile';
import AdminServices from './AdminServices';
import AdminLinks from './AdminLinks';
import AdminPortfolio from './AdminPortfolio';

const AdminPage = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return <AdminLogin onLogin={() => supabase.auth.getSession().then(({ data }) => setSession(data.session))} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button className="mb-6 bg-red-500 text-white px-4 py-2 rounded" onClick={() => supabase.auth.signOut()}>Logout</button>
        <div className="space-y-8">
          <div className="bg-slate-100 p-4 rounded mb-4">
            <AdminProfile />
          </div>
          <div className="bg-slate-100 p-4 rounded mb-4">
            <AdminServices />
          </div>
          <div className="bg-slate-100 p-4 rounded mb-4">
            <AdminLinks />
          </div>
          <div className="bg-slate-100 p-4 rounded mb-4">
            <AdminPortfolio />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
