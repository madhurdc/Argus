import React from 'react';
import Hero from './components/Hero';
import MythologyCard from './components/MythologyCard';
import CurrentStatus from './components/CurrentStatus';
import ComponentStatus from './components/ComponentStatus';
import ActiveIncidents from './components/ActiveIncidents';
import SubscriptionForm from './components/SubscriptionForm';
import DemoForm from './components/DemoForm';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-1 px-4 py-8">
        <Hero />
        <MythologyCard />
        
        <div className="my-16">
          <CurrentStatus />
          <ComponentStatus />
          <ActiveIncidents />
        </div>
        
        <SubscriptionForm />
        <DemoForm />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
