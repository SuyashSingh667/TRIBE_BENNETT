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
      <div className="fixed inset-0 z-[500] bg-[#0a0a0a]/90 backdrop-blur-3xl flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-full max-w-md bg-[#111] border border-[#222] p-10 rounded-[32px] flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="size-20 rounded-full border-[2px] border-red-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(220,38,38,0.4)] bg-[#050505] relative z-10">
            <span className="material-symbols-outlined text-white text-3xl">check</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 relative z-10">Application Sent</h2>
          <p className="text-sm font-medium text-slate-400 mb-8 relative z-10">
            Your telemetry profile has been submitted to the {clubName} core node for evaluation.
          </p>
          <button 
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all active:scale-95 relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
    <div className="fixed inset-0 z-[500] bg-[#0a0a0a]/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[800px] my-auto bg-[#111] border border-[#222] rounded-[32px] overflow-hidden flex flex-col shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative">
        
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-[#222] flex justify-between items-start bg-[#0a0a0a] relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-red-600 border border-red-500/50 rounded-sm text-white text-[9px] font-black uppercase tracking-widest">{category}</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Integration Request</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{clubName}</h2>
          </div>
          <button onClick={onClose} className="size-10 shrink-0 rounded-full bg-[#1a1a1a] hover:bg-red-600 text-slate-400 hover:text-white border border-[#333] flex items-center justify-center transition-all group">
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-10 relative z-10">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-right-10 fade-in">
                <h3 className="col-span-full text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2 border-b border-[#222] pb-4">Operator Details</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">FullName / Designation</label>
                  <input required type="text" className="bg-[#050505] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-white transition-colors focus:outline-none" placeholder="Enter Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Link Email</label>
                  <input required type="email" className="bg-[#050505] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-white transition-colors focus:outline-none" placeholder="student@institute.edu" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Current Year</label>
                  <select required className="bg-[#050505] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-white transition-colors focus:outline-none appearance-none" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                    <option value="" disabled>Select Year...</option>
                    <option value="1">1st Year (Freshman)</option>
                    <option value="2">2nd Year (Sophomore)</option>
                    <option value="3">3rd Year (Junior)</option>
                    <option value="4">4th Year (Senior)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Target Role</label>
                  <select required className="bg-[#050505] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-white transition-colors focus:outline-none appearance-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="" disabled>Select Role...</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-right-10 fade-in">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2 border-b border-[#222] pb-4">Background & Intent</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Statement of Purpose</label>
                  <textarea required className="bg-[#050505] border border-[#333] rounded-xl px-4 py-4 text-white focus:border-white transition-colors focus:outline-none min-h-[120px] resize-none" placeholder="Why are you initiating a link with this node?" value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Prior Experience / Portfolio Link</label>
                  <textarea className="bg-[#050505] border border-[#333] rounded-xl px-4 py-4 text-white focus:border-white transition-colors focus:outline-none min-h-[80px] resize-none" placeholder="Provide GitHub, Behance, or past project summaries..." value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-8 border-t border-[#222] mt-4">
              {step > 1 ? (
                 <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-full border border-[#333] text-white text-[10px] font-black tracking-widest uppercase hover:bg-white/5 transition-colors">
                   Back
                 </button>
              ) : <div></div>}

              {step === 1 ? (
                <button type="button" onClick={() => {
                  if (formData.name && formData.email && formData.year && formData.role) setStep(2);
                }} className="px-8 py-3 rounded-xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50">
                  Next Step
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-red-600 text-white font-black uppercase text-xs tracking-widest hover:bg-red-500 transition-all active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50">
                  {isSubmitting ? (
                    <><span className="animate-spin size-4 border-2 border-white border-t-transparent rounded-full" /> Transmitting...</>
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
