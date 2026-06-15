import React, { useState } from 'react';
import api from '../api';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const SubscriptionForm = () => {
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
      await api.post('/subscribe', { email });
      setStatus('success');
      setMessage('You will now receive GitHub status alerts.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.error || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <div id="subscribe-section" className="bg-slate-900 text-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto my-12 text-center">
      <div className="flex justify-center mb-4">
        <Mail className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Subscribe to Alerts</h3>
      <p className="text-slate-400 mb-6">Receive real-time notifications when GitHub components go down.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          required
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-70 flex items-center justify-center min-w-[120px]"
        >
          {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 bg-emerald-400/10 py-2 px-4 rounded-lg inline-flex mx-auto">
          <CheckCircle2 className="w-4 h-4" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-4 flex items-center justify-center gap-2 text-red-400 bg-red-400/10 py-2 px-4 rounded-lg inline-flex mx-auto">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionForm;
