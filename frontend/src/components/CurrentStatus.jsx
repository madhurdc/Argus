import React, { useEffect, useState } from 'react';
import api from '../api';
import { StatusIcon, getStatusBgColor } from '../utils';
import { Loader2 } from 'lucide-react';

const CurrentStatus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/status/current')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load status.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>;
  if (error) return <div className="p-8 bg-red-50 text-red-600 rounded-2xl text-center border border-red-100">{error}</div>;

  const { mainStatus, timestamp } = data;
  const bgColor = getStatusBgColor(mainStatus);

  return (
    <div className={`rounded-2xl p-8 border ${bgColor} shadow-sm max-w-4xl mx-auto my-8`}>
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Overall GitHub Status</h3>
      <div className="flex items-center gap-4">
        <StatusIcon status={mainStatus} className="w-10 h-10" />
        <div>
          <p className="text-2xl font-bold">{mainStatus}</p>
          <p className="text-sm opacity-75 mt-1">
            Last updated: {timestamp ? new Date(timestamp).toLocaleString() : 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentStatus;
