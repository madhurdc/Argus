import React from 'react';

const Hero = () => {
  return (
    <section className="py-20 text-center max-w-4xl mx-auto px-4">
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
        Argus
      </h1>
      <h2 className="text-2xl font-semibold text-slate-600 mb-6">
        Real-Time GitHub Status Monitoring & Alerting
      </h2>
      <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
        Argus continuously monitors GitHub Status, tracks service disruptions, stores historical snapshots, and automatically sends email alerts whenever changes are detected.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button 
          onClick={() => document.getElementById('subscribe-section').scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition shadow-sm w-full sm:w-auto"
        >
          Subscribe for Alerts
        </button>
        <button 
          onClick={() => document.getElementById('demo-section').scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-3 rounded-full bg-white text-slate-700 border border-slate-200 font-medium hover:bg-slate-50 transition shadow-sm w-full sm:w-auto"
        >
          Send Demo Alert
        </button>
      </div>
    </section>
  );
};

export default Hero;
