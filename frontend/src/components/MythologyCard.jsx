import React from 'react';
import { Eye } from 'lucide-react';

const MythologyCard = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 max-w-4xl mx-auto my-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 text-slate-100">
        <Eye className="w-32 h-32 opacity-50" strokeWidth={1} />
      </div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-500" />
          Why "Argus"?
        </h3>
        <blockquote className="border-l-4 border-indigo-200 pl-4 text-slate-600 italic leading-relaxed">
          Argus is named after Argus Panoptes, the many-eyed giant from Greek mythology. Known for his constant vigilance, Argus could watch everything at once, with some of his hundred eyes always remaining open. Inspired by this idea, Argus continuously watches GitHub services and alerts users whenever changes occur.
        </blockquote>
      </div>
    </div>
  );
};

export default MythologyCard;
