import React, { useState } from 'react';
import type { Club, ClubApplication } from '../../lib/clubManager';
import { updateClub, getApplications } from '../../lib/clubManager';

interface AdminEditModalProps {
  club: Club;
  onClose: () => void;
  onSaved: () => void;
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({ club, onClose, onSaved }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'info' | 'leads' | 'events' | 'criteria' | 'apps'>('info');

  const [description, setDescription] = useState(club.description || '');
  const [registrationOpen, setRegistrationOpen] = useState(club.registrationOpen ?? true);
  
  // Applications
  const [applications] = useState<ClubApplication[]>(() => getApplications(club.name));
  
  // Leads (Pres & VP typically first two)
  const [leads, setLeads] = useState<any[]>(club.clubLeads || []);
  
  // Events
  const [events, setEvents] = useState<any[]>(club.upcomingEvents || []);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });

  // Criteria
  const [criteria, setCriteria] = useState<any[]>(club.criteria || []);
  const [newCriterion, setNewCriterion] = useState({ title: '', desc: '', req: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = `${club.name.toLowerCase().replace(/\s+/g, '')}@2026`;
    if (password === expected) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  const handleSave = () => {
    const updated = { 
      ...club, 
      description,
      registrationOpen,
      clubLeads: leads,
      upcomingEvents: events,
      criteria
    };
    updateClub(updated);
    onSaved();
    onClose();
  };

  const updateLead = (index: number, field: string, value: string) => {
    const updated = [...leads];
    updated[index] = { ...updated[index], [field]: value };
    setLeads(updated);
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, newEvent]);
      setNewEvent({ title: '', date: '' });
    }
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const addCriterion = () => {
    if (newCriterion.title && newCriterion.desc && newCriterion.req) {
      setCriteria([...criteria, newCriterion]);
      setNewCriterion({ title: '', desc: '', req: '' });
    }
  };

  const removeCriterion = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const downloadApplicationsCSV = () => {
    if (applications.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Year', 'Role', 'Interest', 'Experience', 'Submitted At'];
    const rows = applications.map(app => [
      app.id, 
      `"${app.name.replace(/"/g, '""')}"`, 
      `"${app.email.replace(/"/g, '""')}"`, 
      app.year, 
      `"${app.role.replace(/"/g, '""')}"`, 
      `"${app.interest.replace(/"/g, '""')}"`, 
      `"${app.experience.replace(/"/g, '""')}"`, 
      app.submittedAt
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${club.name.replace(/\s+/g, '_')}_Applications.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <form onSubmit={handleLogin} className="bg-white border-[4px] border-black p-8 rounded-[24px] w-full max-w-sm text-black font-display shadow-neo">
          <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter border-l-[4px] border-black pl-4">Admin Auth</h2>
          <p className="text-sm font-bold mb-4">Enter the admin key for {club.name}</p>
          
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Passkey..."
            className="w-full bg-[#fdfaf6] border-[3px] border-black rounded-xl p-3 text-sm focus:bg-white outline-none shadow-neo-sm font-bold transition-all mb-4"
            autoFocus
          />
          {error && <p className="text-red-500 text-xs font-bold mb-4">{error}</p>}
          
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-black uppercase tracking-widest bg-white border-[3px] border-black hover:bg-gray-100 rounded-xl transition-all shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-black uppercase tracking-widest bg-pink-400 border-[3px] border-black hover:bg-pink-500 text-black rounded-xl transition-all shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover">
              Verify
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white border-[4px] border-black p-6 md:p-8 rounded-[24px] w-full max-w-3xl max-h-[90vh] overflow-y-auto text-black font-display shadow-neo">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b-4 border-black pb-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-black border-l-[4px] border-black pl-4">Admin Dashboard</h2>
          <div className="flex flex-wrap gap-2">
            {(['info', 'leads', 'events', 'criteria', 'apps'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border-[2px] border-black rounded-lg transition-all ${activeTab === tab ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
              >
                {tab === 'apps' ? 'Applications' : tab}
              </button>
            ))}
          </div>
        </div>
        
        {activeTab === 'info' && (
          <div className="animate-in fade-in">
            <div className="mb-8">
              <label className="block text-xs font-black text-black mb-3 uppercase tracking-widest">Club Description</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full h-32 bg-[#fdfaf6] border-[3px] border-black rounded-xl p-4 text-sm focus:bg-white outline-none resize-none shadow-neo-sm font-bold transition-all"
              />
            </div>
            <div className="mb-8 p-6 border-[3px] border-black rounded-xl bg-[#fdfaf6]">
               <div className="flex items-center justify-between">
                  <div>
                     <h3 className="text-lg font-black uppercase tracking-tighter">Registration Status</h3>
                     <p className="text-sm font-bold text-gray-600">Toggle whether the club is currently accepting applications.</p>
                  </div>
                  <button 
                    onClick={() => setRegistrationOpen(!registrationOpen)}
                    className={`px-6 py-3 font-black uppercase tracking-widest border-[3px] border-black rounded-xl transition-all shadow-neo-sm ${registrationOpen ? 'bg-[#a1ff00] hover:bg-[#8ade00]' : 'bg-red-400 hover:bg-red-500'}`}
                  >
                    {registrationOpen ? 'OPEN' : 'CLOSED'}
                  </button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="animate-in fade-in flex flex-col gap-6">
             {leads.map((lead, idx) => (
                <div key={idx} className="p-4 border-[3px] border-black rounded-xl bg-[#fdfaf6] flex flex-col md:flex-row gap-4 items-center">
                   <div className="flex-1 w-full">
                     <label className="block text-[10px] font-black mb-1 uppercase tracking-widest">{lead.role || 'Role'}</label>
                     <input 
                       value={lead.name || ''} 
                       onChange={(e) => updateLead(idx, 'name', e.target.value)}
                       className="w-full border-[2px] border-black rounded-lg p-2 text-sm font-bold"
                     />
                   </div>
                   <div className="flex-1 w-full">
                     <label className="block text-[10px] font-black mb-1 uppercase tracking-widest">Email</label>
                     <input 
                       value={lead.email || ''} 
                       onChange={(e) => updateLead(idx, 'email', e.target.value)}
                       className="w-full border-[2px] border-black rounded-lg p-2 text-sm font-bold"
                     />
                   </div>
                </div>
             ))}
             {leads.length === 0 && <p className="text-sm font-bold opacity-50">No leads found to edit.</p>}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="animate-in fade-in">
             <div className="flex flex-col gap-4 mb-8">
               {events.map((ev, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-[3px] border-black rounded-xl bg-white shadow-neo-sm">
                     <div>
                        <h4 className="font-black uppercase">{ev.title}</h4>
                        <p className="text-xs font-bold text-gray-500">{ev.date}</p>
                     </div>
                     <button onClick={() => removeEvent(idx)} className="text-red-500 hover:text-red-700 font-black">
                       <span className="material-symbols-outlined">delete</span>
                     </button>
                  </div>
               ))}
               {events.length === 0 && <p className="text-sm font-bold opacity-50">No events upcoming.</p>}
             </div>
             
             <div className="p-6 border-[3px] border-black rounded-xl bg-[#fdfaf6]">
               <h3 className="font-black uppercase tracking-tighter mb-4 text-lg">Add Event</h3>
               <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <input placeholder="Event Title (e.g. Code Sprint)" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="flex-1 border-[2px] border-black rounded-lg p-2 font-bold text-sm" />
                  <input placeholder="Date (e.g. MAY 20)" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="md:w-32 border-[2px] border-black rounded-lg p-2 font-bold text-sm" />
               </div>
               <button onClick={addEvent} className="w-full bg-[#ffde00] border-[2px] border-black py-2 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-yellow-400">Add Event</button>
             </div>
          </div>
        )}

        {activeTab === 'criteria' && (
          <div className="animate-in fade-in">
             <div className="flex flex-col gap-4 mb-8">
               {criteria.map((cr, idx) => (
                  <div key={idx} className="relative p-4 border-[3px] border-black rounded-xl bg-white shadow-neo-sm">
                     <button onClick={() => removeCriterion(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-black">
                       <span className="material-symbols-outlined">delete</span>
                     </button>
                     <h4 className="font-black uppercase mb-1">{cr.title}</h4>
                     <p className="text-xs font-bold text-gray-600 mb-2">{cr.desc}</p>
                     <span className="text-[10px] bg-pink-400 border-[2px] border-black px-2 py-1 rounded font-black uppercase">Req: {cr.req}</span>
                  </div>
               ))}
               {criteria.length === 0 && <p className="text-sm font-bold opacity-50 text-red-500">WARNING: No criteria found. The default matrix will be shown.</p>}
             </div>
             
             <div className="p-6 border-[3px] border-black rounded-xl bg-[#fdfaf6]">
               <h3 className="font-black uppercase tracking-tighter mb-4 text-lg">Add Criterion</h3>
               <div className="flex flex-col gap-4 mb-4">
                  <input placeholder="Title (e.g. DSA Fundamentals)" value={newCriterion.title} onChange={e => setNewCriterion({...newCriterion, title: e.target.value})} className="border-[2px] border-black rounded-lg p-2 font-bold text-sm" />
                  <input placeholder="Description" value={newCriterion.desc} onChange={e => setNewCriterion({...newCriterion, desc: e.target.value})} className="border-[2px] border-black rounded-lg p-2 font-bold text-sm" />
                  <input placeholder="Requirement (e.g. Arrays, Trees)" value={newCriterion.req} onChange={e => setNewCriterion({...newCriterion, req: e.target.value})} className="border-[2px] border-black rounded-lg p-2 font-bold text-sm" />
               </div>
               <button onClick={addCriterion} className="w-full bg-[#ffde00] border-[2px] border-black py-2 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-yellow-400">Add Criterion</button>
             </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <div className="animate-in fade-in">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tighter text-black">Applications Received</h3>
                  <p className="text-sm font-bold text-gray-600">Total: {applications.length}</p>
                </div>
                <button 
                  onClick={downloadApplicationsCSV}
                  disabled={applications.length === 0}
                  className="px-6 py-3 font-black uppercase tracking-widest border-[3px] border-black rounded-xl transition-all shadow-neo-sm bg-[#a1ff00] hover:bg-[#8ade00] text-black disabled:opacity-50 disabled:cursor-not-allowed text-xs flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download Data
                </button>
             </div>
             
             {applications.length === 0 ? (
                <div className="p-8 border-[3px] border-black rounded-xl bg-[#fdfaf6] text-center">
                   <p className="font-bold text-gray-500 uppercase tracking-widest text-sm">No applications received yet.</p>
                </div>
             ) : (
                <div className="border-[3px] border-black rounded-xl overflow-x-auto shadow-neo-sm">
                   <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-black text-white uppercase text-[10px] tracking-widest">
                           <th className="p-4 whitespace-nowrap">Name</th>
                           <th className="p-4 whitespace-nowrap">Role</th>
                           <th className="p-4 whitespace-nowrap">Year</th>
                           <th className="p-4">Interest</th>
                           <th className="p-4 whitespace-nowrap">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-sm font-bold text-black">
                        {applications.map((app, idx) => (
                           <tr key={app.id} className={idx !== applications.length - 1 ? "border-b-[2px] border-black" : ""}>
                             <td className="p-4 whitespace-nowrap">{app.name}</td>
                             <td className="p-4 whitespace-nowrap text-pink-500">{app.role}</td>
                             <td className="p-4 whitespace-nowrap">Year {app.year}</td>
                             <td className="p-4 min-w-[200px] truncate max-w-xs">{app.interest}</td>
                             <td className="p-4 whitespace-nowrap text-xs text-gray-500">{new Date(app.submittedAt).toLocaleDateString()}</td>
                           </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             )}
          </div>
        )}

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t-4 border-black">
          <button onClick={onClose} className="px-6 py-3 text-xs font-black uppercase tracking-widest bg-white border-[3px] border-black hover:bg-gray-100 rounded-xl transition-all shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover">
            Discard
          </button>
          <button onClick={handleSave} className="px-6 py-3 text-xs font-black uppercase tracking-widest bg-pink-400 border-[3px] border-black hover:bg-pink-500 text-black rounded-xl transition-all shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover">
            Save All Changes
          </button>
        </div>

      </div>
    </div>
  );
};
