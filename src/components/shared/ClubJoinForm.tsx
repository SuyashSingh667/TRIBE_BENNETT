import React, { useState } from 'react';
import { saveApplication } from '../../lib/clubManager';

interface ClubJoinFormProps {
  clubName: string;
  category: string;
  originType: string;
  onClose: () => void;
}

export const ClubJoinForm: React.FC<ClubJoinFormProps> = ({ clubName, category, originType, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', year: '', dept: '', role: '', interest: '', experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to local storage
    saveApplication({
      clubName,
      name: formData.name,
      email: formData.email,
      year: formData.year,
      role: formData.role,
      interest: formData.interest,
      experience: formData.experience
    });

    // Mock submission delay for UI effect
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[500] bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant p-10 rounded-[40px] flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 to-transparent blur-3xl pointer-events-none opacity-60" />
          <div className="absolute top-0 right-0 indian-motif-pattern w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay border-b border-tertiary/10"></div>
          
          <div className="size-24 rounded-full border border-primary/30 flex items-center justify-center mb-6 shadow-sm bg-primary/10 relative z-10">
            <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
          </div>
          <h2 className="text-3xl font-headline-md text-on-surface tracking-tight mb-3 relative z-10">Application Sent</h2>
          <p className="text-body-md text-on-surface-variant mb-10 relative z-10 px-4">
            Your telemetry profile has been submitted to the {clubName} core node for evaluation.
          </p>
          <button 
            onClick={onClose}
            className="w-full py-4 rounded-full bg-primary text-on-primary font-semibold uppercase text-xs tracking-widest hover:bg-primary/90 transition-all active:scale-95 relative z-10 shadow-md"
          >
            Return to Node
          </button>
        </div>
      </div>
    );
  }

  // Generate appropriate roles based on club type
  const roles = originType === 'technical' 
    ? ['Junior Core', 'Senior Core', 'Open Source Contributor']
    : originType === 'cultural'
    ? ['Core Performer', 'Event Management', 'Creative Design']
    : originType === 'sports'
    ? ['Varsity Player', 'Training Squad', 'Management Core']
    : ['General Member', 'Core Member'];

  return (
    <div className="fixed inset-0 z-[500] bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[800px] my-auto bg-surface-container-lowest border border-outline-variant rounded-[40px] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Background motif */}
        <div className="absolute top-0 right-0 indian-motif-pattern w-full h-full opacity-[0.02] pointer-events-none mix-blend-overlay"></div>

        {/* Header */}
        <div className="p-8 md:p-10 border-b border-outline-variant flex justify-between items-start bg-surface-container relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-primary text-on-primary rounded-full text-[10px] font-semibold uppercase tracking-widest shadow-sm">{category}</span>
              <span className="text-[10px] font-label-caps uppercase tracking-widest text-tertiary">Integration Request</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-headline-lg text-on-surface tracking-tight">{clubName}</h2>
          </div>
          <button onClick={onClose} className="size-12 shrink-0 rounded-full bg-surface hover:bg-primary text-on-surface-variant hover:text-on-primary border border-outline-variant flex items-center justify-center transition-all group shadow-sm">
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-10 relative z-10">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-right-10 fade-in">
                <h3 className="col-span-full text-[10px] font-label-caps uppercase tracking-widest text-tertiary mb-2 border-b border-outline-variant pb-4">Operator Details</h3>
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase font-label-caps tracking-widest text-on-surface">FullName / Designation</label>
                  <input required type="text" className="bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary transition-colors focus:outline-none" placeholder="Enter Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase font-label-caps tracking-widest text-on-surface">Link Email</label>
                  <input required type="email" className="bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary transition-colors focus:outline-none" placeholder="student@institute.edu" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase font-label-caps tracking-widest text-on-surface">Current Year</label>
                  <select required className="bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary transition-colors focus:outline-none appearance-none" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                    <option value="" disabled>Select Year...</option>
                    <option value="1">1st Year (Freshman)</option>
                    <option value="2">2nd Year (Sophomore)</option>
                    <option value="3">3rd Year (Junior)</option>
                    <option value="4">4th Year (Senior)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase font-label-caps tracking-widest text-on-surface">Target Role</label>
                  <select required className="bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary transition-colors focus:outline-none appearance-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="" disabled>Select Role...</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-right-10 fade-in">
                <h3 className="text-[10px] font-label-caps uppercase tracking-widest text-tertiary mb-2 border-b border-outline-variant pb-4">Background & Intent</h3>
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase font-label-caps tracking-widest text-on-surface">Statement of Purpose</label>
                  <textarea required className="bg-surface border border-outline-variant rounded-3xl px-6 py-5 text-body-md text-on-surface focus:border-primary transition-colors focus:outline-none min-h-[140px] resize-none" placeholder="Why are you initiating a link with this node?" value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})} />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase font-label-caps tracking-widest text-on-surface">Prior Experience / Portfolio Link</label>
                  <textarea className="bg-surface border border-outline-variant rounded-3xl px-6 py-5 text-body-md text-on-surface focus:border-primary transition-colors focus:outline-none min-h-[100px] resize-none" placeholder="Provide GitHub, Behance, or past project summaries..." value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-8 border-t border-outline-variant mt-2">
              {step > 1 ? (
                 <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-3.5 rounded-full bg-surface-variant text-on-surface-variant font-semibold tracking-widest uppercase hover:bg-surface-variant/80 transition-colors shadow-sm text-xs">
                   Back
                 </button>
              ) : <div></div>}

              {step === 1 ? (
                <button type="button" onClick={() => {
                  if (formData.name && formData.email && formData.year && formData.role) setStep(2);
                }} className="px-10 py-3.5 rounded-full bg-primary text-on-primary font-semibold uppercase text-xs tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-md disabled:opacity-50">
                  Next Step
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-3 px-10 py-3.5 rounded-full bg-secondary text-on-secondary font-semibold uppercase text-xs tracking-widest hover:bg-secondary/90 transition-all active:scale-95 shadow-md disabled:opacity-50">
                  {isSubmitting ? (
                    <><span className="animate-spin size-4 border-2 border-on-secondary border-t-transparent rounded-full" /> Transmitting...</>
                  ) : 'Submit Protocol'}
                </button>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
