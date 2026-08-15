import React, { useState } from 'react';

interface EventRegistrationFormProps {
  eventTitle: string;
  event?: any;
  onClose: () => void;
}

export const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ eventTitle, event, onClose }) => {
  const [formData, setFormData] = useState(() => {
    const profile = localStorage.getItem('tribe_user_profile');
    if(profile) {
      try {
        const parsed = JSON.parse(profile);
        return { name: parsed.name || '', email: parsed.email || '', year: parsed.year || '', dept: parsed.department || '', phone: parsed.phone || '', reason: '', experience: '' };
      } catch (e) {}
    }
    return { name: '', email: '', year: '', dept: '', phone: '', reason: '', experience: '' };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      // Save data locally
      const savedRegex = localStorage.getItem('tribe_event_registrations');
      const records = savedRegex ? JSON.parse(savedRegex) : [];
      records.push({
         formData,
         event: event || { title: eventTitle, __cat: 'Unknown', date: 'TBD', time: 'TBD' },
         timestamp: new Date().toISOString()
      });
      localStorage.setItem('tribe_event_registrations', JSON.stringify(records));
      window.dispatchEvent(new Event('registration_added'));

      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[600] bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-full max-w-md bg-surface border border-tertiary/20 p-12 rounded-[40px] flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
           {/* Subtle Heritage Graphic */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 to-transparent pointer-events-none"></div>
           <div className="absolute inset-0 indian-motif-pattern opacity-5 mix-blend-overlay pointer-events-none"></div>

           <div className="size-24 rounded-full border-2 border-primary/30 flex items-center justify-center mb-8 bg-primary/5 relative z-10">
             <span className="material-symbols-outlined text-primary text-5xl">check</span>
           </div>
           <h2 className="text-4xl font-headline-md text-on-surface tracking-tight mb-4 relative z-10">Registration Confirmed</h2>
           <p className="text-body-md text-on-surface-variant mb-10 relative z-10 leading-relaxed">
             Your application for <span className="font-semibold text-primary">{eventTitle}</span> has been successfully logged into the event manifest.
           </p>
           <button 
             onClick={onClose}
             className="w-full py-4 rounded-full bg-primary text-on-primary font-semibold uppercase text-[10px] tracking-widest hover:bg-primary/90 transition-all active:scale-95 relative z-10 shadow-md"
           >
             Return to Dashboard
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[600] bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[700px] my-auto bg-surface border border-tertiary/20 rounded-[40px] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Subtle Heritage Pattern */}
        <div className="absolute top-0 right-0 indian-motif-pattern w-full h-48 opacity-[0.03] pointer-events-none border-b border-tertiary/10"></div>

        {/* Header */}
        <div className="p-8 md:p-12 border-b border-outline-variant flex justify-between items-start bg-surface-container-lowest relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] font-semibold uppercase tracking-widest">Event Registration</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline-lg text-on-surface leading-tight tracking-tight">{eventTitle}</h2>
          </div>
          <button onClick={onClose} className="size-12 shrink-0 rounded-full bg-surface hover:bg-primary text-on-surface-variant hover:text-on-primary border border-outline-variant flex items-center justify-center transition-all group">
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-12 bg-surface relative z-10">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-right-10 fade-in">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-semibold tracking-widest text-on-surface-variant">FullName</label>
                <input required type="text" className="bg-surface-container border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all focus:outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-semibold tracking-widest text-on-surface-variant">Link Email</label>
                <input required type="email" className="bg-surface-container border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all focus:outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-semibold tracking-widest text-on-surface-variant">Department</label>
                 <select required className="bg-surface-container border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all focus:outline-none appearance-none" value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})}>
                    <option value="" disabled>Select Department...</option>
                    <option value="CS">Computer Science</option>
                    <option value="IT">Information Tech</option>
                    <option value="ME">Mechanical</option>
                    <option value="EC">Electronics</option>
                    <option value="Other">Other</option>
                  </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase font-semibold tracking-widest text-on-surface-variant">Year</label>
                 <select required className="bg-surface-container border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all focus:outline-none appearance-none" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                    <option value="" disabled>Select Year...</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
              </div>
              <div className="flex flex-col gap-3 md:col-span-2">
                <label className="text-[10px] uppercase font-semibold tracking-widest text-on-surface-variant">Phone (Optional)</label>
                <input type="tel" className="bg-surface-container border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all focus:outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="flex flex-col gap-3 md:col-span-2">
                <label className="text-[10px] uppercase font-semibold tracking-widest text-on-surface-variant">Why do you want to attend?</label>
                <textarea required className="bg-surface-container border border-outline-variant rounded-2xl px-5 py-5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all focus:outline-none min-h-[120px] resize-none" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-8 border-t border-outline-variant mt-4">
              <button type="button" onClick={onClose} className="px-8 py-4 rounded-full border border-outline-variant text-on-surface text-[10px] font-semibold tracking-widest uppercase hover:bg-surface-variant transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-on-primary font-semibold uppercase text-xs tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-md disabled:opacity-50">
                {isSubmitting ? (
                   <><span className="animate-spin size-4 border-2 border-white border-t-transparent rounded-full" /> Submitting</>
                ) : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
