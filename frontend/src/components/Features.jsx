import React from 'react';
import { Activity, Database, GitCompare, AlertTriangle, Mail, History } from 'lucide-react';

const Features = () => {
  const featureList = [
    { title: "Continuous Monitoring", icon: Activity, desc: "Cron job runs every minute to fetch the latest GitHub status." },
    { title: "Snapshot Storage", icon: Database, desc: "Saves precise payload hashes and data to Supabase." },
    { title: "Change Detection", icon: GitCompare, desc: "Compares new snapshots against the last saved state." },
    { title: "Incident Tracking", icon: AlertTriangle, desc: "Monitors unresolved incidents and their impact levels." },
    { title: "Email Alerts", icon: Mail, desc: "Automatically emails subscribed users using the Resend API." },
    { title: "Historical Records", icon: History, desc: "Maintains a full timeline of status changes in PostgreSQL." }
  ];

  return (
    <div className="max-w-4xl mx-auto my-20">
      <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">System Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-indigo-500">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{f.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
