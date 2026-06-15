import React, { useState } from 'react';
import api from '../api';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const DemoForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Strict client-side validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    try {
      await api.post('/demo', { email });
      setStatus('success');
      setMessage('Demo alert sent successfully. Check your inbox!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.error || 'Failed to send demo alert.');
    }
  };

  return (
    <div id="demo-section" className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-2xl mx-auto my-12 text-center">
      <div className="flex justify-center mb-4">
        <Send className="w-10 h-10 text-indigo-500" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Test the System</h3>
      <p className="text-slate-500 mb-6">Receive a sample GitHub status alert email generated from the latest stored snapshot.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          required
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-6 py-3 rounded-lg transition disabled:opacity-70 flex items-center justify-center min-w-[150px]"
        >
          {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> : 'Send Demo Alert'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 py-2 px-4 rounded-lg inline-flex mx-auto">
          <CheckCircle2 className="w-4 h-4" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 border border-red-100 py-2 px-4 rounded-lg inline-flex mx-auto">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
    </div>
  );
};

export default DemoForm;
