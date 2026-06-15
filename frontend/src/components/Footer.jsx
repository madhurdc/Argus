import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xl mb-4">
          <Shield className="w-6 h-6" />
          Argus Monitoring System
        </div>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Named after Argus Panoptes, the vigilant giant of Greek mythology. Created as a backend monitoring and alerting project.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
          <span className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">Node.js</span>
          <span className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">Express</span>
          <span className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">Supabase</span>
          <span className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">Cheerio</span>
          <span className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">Resend</span>
          <span className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">node-cron</span>
        </div>
        
        <div className="mt-12 text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Argus Project.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
