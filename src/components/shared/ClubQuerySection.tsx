import React, { useState } from 'react';

interface ClubQuerySectionProps {
  clubName: string;
  leadName?: string;
  accentBgClass?: string;
  clubLeads?: any[];
}

export const ClubQuerySection: React.FC<ClubQuerySectionProps> = ({ clubName, leadName, clubLeads }) => {
  const [formData, setFormData] = useState(() => {
    const profile = localStorage.getItem('tribe_user_profile');
    if(profile) {
      try {
        const parsed = JSON.parse(profile);
        return { name: parsed.name || '', email: parsed.email || '', message: '' };
      } catch (e) {}
    }
    return { name: '', email: '', message: '' };
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const leads = clubLeads || [
    {
      role: 'President',
      name: leadName || 'Alex Chen',
      phone: '+1 (555) 019-2041',
      email: 'lead@tribe.edu',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      role: 'Vice President',
      name: 'Sarah Jenkins',
      phone: '+1 (555) 019-2042',
      email: 'vp@tribe.edu',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Trigger mail client
    const president = leads?.find(l => l.role.toLowerCase().includes('president')) || leads?.[0];
    const emailTo = president?.email || 'lead@tribe.edu';
    
    const subject = encodeURIComponent(`Query regarding ${clubName}`);
    const body = encodeURIComponent(`Sender: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };


  return (
    <section className="mb-32 pt-20">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
        <div>
           <div className="flex items-center space-x-4 mb-6">
             <div className="h-[1px] w-12 bg-tertiary"></div>
             <h2 className="text-headline-lg font-headline-lg text-primary uppercase">Have a Query?</h2>
           </div>
           <p className="text-on-surface-variant font-body-md max-w-xl text-sm italic">
             Ask the club leadership anything before joining.
           </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        
        {/* Contact Cards */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {leads.map((lead, i) => (
             <div key={i} className="bg-surface border border-outline-variant shadow-sm rounded-2xl p-6 flex items-center gap-6 hover:-translate-y-1 hover:shadow-md transition-all group">
               <div className="size-16 rounded-full overflow-hidden shrink-0 border border-tertiary bg-surface-container">
                  <img src={lead.img} alt={lead.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="flex flex-col flex-1 min-w-0">
                 <span className="text-[10px] font-label-caps uppercase tracking-widest text-tertiary bg-tertiary/10 px-2 py-1 rounded-full border border-tertiary/30 w-fit mb-2">{lead.role}</span>
                 <h4 className="text-xl font-headline-md text-primary uppercase tracking-tight mb-2 truncate">{lead.name}</h4>
                 <div className="flex flex-col gap-1 text-on-surface-variant text-xs font-body-md">
                   <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[14px] shrink-0">call</span> <span className="truncate">{lead.phone}</span></a>
                   <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[14px] shrink-0">mail</span> <span className="truncate">{lead.email}</span></a>
                 </div>
               </div>
               <div className="shrink-0 size-10 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors cursor-pointer shadow-sm">
                 <span className="material-symbols-outlined text-sm">chat</span>
               </div>
             </div>
          ))}
        </div>

        {/* Message Form */}
        <div className="lg:col-span-3 bg-surface border border-outline-variant shadow-sm rounded-[32px] p-8 md:p-10 relative overflow-hidden">
          {status === 'success' ? (
            <div className="absolute inset-0 bg-primary/10 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 z-10 border-l border-primary">
              <div className="size-16 rounded-full border border-primary bg-surface flex items-center justify-center mb-6 shadow-md">
                <span className="material-symbols-outlined text-primary text-3xl">check</span>
              </div>
              <h3 className="text-2xl font-headline-md uppercase tracking-tight text-primary mb-2">Message Transmitted</h3>
              <p className="text-on-surface-variant font-body-md text-sm max-w-sm italic">Your query has been sent to the {clubName} leads. Await response via email.</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-0">
             <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-label-caps tracking-widest text-tertiary ml-2">Your Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="John Doe" className="bg-surface-container border border-outline-variant shadow-sm rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:-translate-y-1 focus:border-tertiary focus:shadow-md transition-all text-sm font-body-md placeholder:text-on-surface-variant/50" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-label-caps tracking-widest text-tertiary ml-2">Your Mail</label>
                  <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="john@tribe.edu" className="bg-surface-container border border-outline-variant shadow-sm rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:-translate-y-1 focus:border-tertiary focus:shadow-md transition-all text-sm font-body-md placeholder:text-on-surface-variant/50" />
                </div>
             </div>
             <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-label-caps tracking-widest text-tertiary ml-2">Query Payload</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="State your inquiry..." className="bg-surface-container border border-outline-variant shadow-sm rounded-xl px-4 py-4 text-on-surface focus:outline-none focus:-translate-y-1 focus:border-tertiary focus:shadow-md transition-all text-sm font-body-md resize-none h-32 placeholder:text-on-surface-variant/50" />
             </div>
             
             <button disabled={status === 'submitting'} type="submit" className="mt-2 py-4 rounded-full bg-primary text-on-primary font-label-caps uppercase text-xs tracking-[0.2em] hover:bg-surface-tint transition-all active:scale-95 flex items-center justify-center gap-3 shadow-md disabled:opacity-50 border border-primary/20">
               {status === 'submitting' ? (
                 <><span className="animate-spin size-4 border-2 border-on-primary border-t-transparent rounded-full" /> Transmitting...</>
               ) : (
                 <>Transmit Query <span className="material-symbols-outlined text-sm">send</span></>
               )}
             </button>
          </form>
        </div>

      </div>
    </section>
  );
};
