import React, { useEffect, useState } from 'react';
import api from '../api';
import { AlertCircle, Loader2 } from 'lucide-react';

const ActiveIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/status/incidents')
      .then(res => {
        setIncidents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load incidents.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>;
  if (error) return <div className="p-8 bg-red-50 text-red-600 rounded-2xl text-center border border-red-100">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto my-12">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Active Incidents</h3>
      {incidents.length === 0 ? (
        <div className="bg-emerald-50 text-emerald-700 p-6 rounded-xl border border-emerald-100 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-emerald-500" />
          <p className="font-medium">No current unresolved incidents.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-red-50 p-6 rounded-xl border border-red-200">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-red-900 text-lg">{incident.name || incident.title}</h4>
                <span className="bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {incident.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveIncidents;
