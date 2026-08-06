import React, { useState } from 'react';

interface EventModalProps {
  onClose: () => void;
  onSave: (event: any) => void;
  initialData?: any;
}

export const EventModal: React.FC<EventModalProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    date: 'MAY 15',
    day: 15,
    time: '12:00 - 14:00',
    type: 'Meeting',
    org: 'Global Nodes',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || Math.random().toString(36).substr(2, 9)
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300 font-display">
      <div className="bg-white border-[4px] border-black p-10 rounded-[24px] shadow-neo w-full max-w-[600px] relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 size-10 rounded-xl bg-white border-[3px] border-black hover:bg-pink-400 text-black flex items-center justify-center transition-all shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover">
          <span className="material-symbols-outlined font-black">close</span>
        </button>

        <div className="mb-10">
          <h2 className="text-4xl font-black tracking-tighter text-black uppercase mb-2 border-l-[4px] border-black pl-4">{initialData ? 'Modulate Event' : 'Schedule Action'}</h2>
          <p className="text-black text-xs tracking-widest uppercase font-bold pl-5">{initialData ? 'Update event parameters' : 'Register a new timeframe'}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-black font-black tracking-widest uppercase">Event Designation</label>
            <input 
              required 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="E.g., Quantum Computing Lab Focus" 
              className="w-full bg-[#fdfaf6] border-[3px] border-black rounded-xl px-4 py-4 outline-none text-black focus:bg-white shadow-neo-sm transition-colors font-bold uppercase tracking-tight"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-black font-black tracking-widest uppercase">Day (May 2026)</label>
              <input 
                required 
                type="number"
                min="1" max="31"
                value={formData.day} 
                onChange={e => setFormData({...formData, day: parseInt(e.target.value), date: `MAY ${e.target.value}`})} 
                className="w-full bg-[#fdfaf6] border-[3px] border-black rounded-xl px-4 py-4 outline-none text-black focus:bg-white shadow-neo-sm transition-colors font-bold uppercase tracking-tight"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-black font-black tracking-widest uppercase">Timeframe</label>
              <input 
                required 
                value={formData.time} 
                onChange={e => setFormData({...formData, time: e.target.value})} 
                placeholder="14:00 - 16:00"
                className="w-full bg-[#fdfaf6] border-[3px] border-black rounded-xl px-4 py-4 outline-none text-black focus:bg-white shadow-neo-sm transition-colors font-bold uppercase tracking-tight"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-black font-black tracking-widest uppercase">Operational Parameters (Description)</label>
            <textarea 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              placeholder="Define core objectives..." 
              className="w-full h-24 bg-[#fdfaf6] border-[3px] border-black rounded-xl px-4 py-4 outline-none text-black focus:bg-white shadow-neo-sm transition-colors font-bold resize-none"
            />
          </div>

          <div className="flex gap-4 mt-4">
             <button type="button" onClick={onClose} className="flex-1 py-4 bg-white border-[3px] border-black text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all">
               Cancel
             </button>
             <button type="submit" className="flex-1 py-4 bg-[#ffde00] border-[3px] border-black text-black font-black uppercase tracking-widest rounded-xl hover:bg-[#ffe633] shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all active:scale-[0.98]">
               {initialData ? 'Save Changes' : 'Transmit Record'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
