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

  return (
    <section className="mb-32 pt-20">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
        <div>
           <div className="flex items-center gap-4 mb-4">
             <div className="w-4 h-12 bg-black"></div>
             <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black">Have a Query?</h2>
           </div>
           <p className="text-gray-700 font-bold max-w-xl text-sm">
             Ask the club leadership anything before joining.
           </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        
        {/* Contact Cards */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {leads.map((lead, i) => (
             <div key={i} className="bg-white border-[4px] border-black shadow-neo-sm rounded-[24px] p-6 flex items-center gap-6 hover:-translate-y-1 hover:shadow-neo transition-all group">
               <div className="size-16 rounded-full overflow-hidden shrink-0 border-[3px] border-black bg-gray-100">
                  <img src={lead.img} alt={lead.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               </div>
               <div className="flex flex-col flex-1 min-w-0">
                 <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#ffde00] px-2 py-1 rounded border-[2px] border-black w-fit mb-2">{lead.role}</span>
                 <h4 className="text-xl font-black text-black uppercase tracking-tighter mb-2 truncate">{lead.name}</h4>
                 <div className="flex flex-col gap-1 text-gray-700 text-xs font-bold font-mono">
                   <a href={`tel:${lead.phone}`} className="hover:text-black transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[14px] shrink-0">call</span> <span className="truncate">{lead.phone}</span></a>
                   <a href={`mailto:${lead.email}`} className="hover:text-black transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[14px] shrink-0">mail</span> <span className="truncate">{lead.email}</span></a>
                 </div>
               </div>
               <div className="shrink-0 size-10 rounded-full bg-white border-[3px] border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors cursor-pointer shadow-neo-sm">
                 <span className="material-symbols-outlined text-sm">chat</span>
               </div>
             </div>
          ))}
        </div>

        {/* Message Form */}
        <div className="lg:col-span-3 bg-white border-[4px] border-black shadow-neo rounded-[32px] p-8 md:p-10 relative overflow-hidden">
          {status === 'success' ? (
            <div className="absolute inset-0 bg-[#ffde00] flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 z-10 border-l-[4px] border-black">
              <div className="size-16 rounded-full border-[4px] border-black bg-white flex items-center justify-center mb-6 shadow-neo-sm">
                <span className="material-symbols-outlined text-black font-black text-3xl">check</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-black mb-2">Message Transmitted</h3>
              <p className="text-gray-800 font-bold text-sm max-w-sm">Your query has been sent to the {clubName} leads. Await response via email.</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-0">
             <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black bg-white px-2 py-1 rounded border-[2px] border-black w-fit">Your Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="John Doe" className="bg-white border-[3px] border-black shadow-neo-sm rounded-xl px-4 py-4 text-black focus:outline-none focus:-translate-y-1 focus:shadow-neo transition-all text-sm font-bold placeholder:font-bold placeholder:text-gray-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black bg-white px-2 py-1 rounded border-[2px] border-black w-fit">Your Mail</label>
                  <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="john@tribe.edu" className="bg-white border-[3px] border-black shadow-neo-sm rounded-xl px-4 py-4 text-black focus:outline-none focus:-translate-y-1 focus:shadow-neo transition-all text-sm font-bold placeholder:font-bold placeholder:text-gray-400" />
                </div>
             </div>
             <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-black bg-white px-2 py-1 rounded border-[2px] border-black w-fit">Query Payload</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="State your inquiry..." className="bg-white border-[3px] border-black shadow-neo-sm rounded-xl px-4 py-4 text-black focus:outline-none focus:-translate-y-1 focus:shadow-neo transition-all text-sm font-bold resize-none h-32 placeholder:font-bold placeholder:text-gray-400" />
             </div>
             
             <button disabled={status === 'submitting'} type="submit" className="mt-2 py-4 rounded-xl bg-black text-white font-black uppercase text-xs tracking-[0.2em] border-[3px] border-black hover:bg-white hover:text-black transition-all active:scale-95 flex items-center justify-center gap-3 shadow-neo-sm disabled:opacity-50">
               {status === 'submitting' ? (
                 <><span className="animate-spin size-4 border-2 border-white border-t-transparent rounded-full" /> Transmitting...</>
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
