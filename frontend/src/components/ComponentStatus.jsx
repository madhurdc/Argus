import React, { useEffect, useState } from 'react';
import api from '../api';
import { getStatusColor } from '../utils';
import { Loader2 } from 'lucide-react';

const ComponentStatus = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/status/components')
      .then(res => {
        setComponents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load components.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>;
  if (error) return <div className="p-8 bg-red-50 text-red-600 rounded-2xl text-center border border-red-100">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto my-12">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Component Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((comp, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:border-slate-300 transition">
            <span className="font-medium text-slate-800">{comp.name}</span>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-slate-50 ${getStatusColor(comp.status)}`}>
              {comp.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentStatus;
