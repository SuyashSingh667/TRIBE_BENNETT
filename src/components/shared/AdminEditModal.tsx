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
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-inverse-surface/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
        <form onSubmit={handleLogin} className="bg-surface-container-lowest border border-outline-variant p-10 rounded-[32px] w-full max-w-md shadow-2xl relative overflow-hidden">
          {/* Subtle background motif */}
          <div className="absolute top-0 right-0 indian-motif-pattern w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
               <h2 className="text-3xl font-headline-md text-on-surface tracking-tight">Admin Auth</h2>
            </div>
            <p className="text-body-md text-on-surface-variant mb-6">Enter the administrative passkey to configure node settings for <strong className="text-on-surface">{club.name}</strong>.</p>
            
            <div className="mb-6">
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Secure Passkey..."
                className="w-full bg-surface-container border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
                autoFocus
              />
              {error && <p className="text-error text-xs font-semibold mt-3 ml-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> {error}</p>}
            </div>
            
            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={onClose} className="px-6 py-2.5 text-label-caps font-label-caps uppercase bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80 rounded-full transition-colors shadow-sm">
                Cancel
              </button>
              <button type="submit" className="px-8 py-2.5 text-label-caps font-label-caps uppercase bg-primary text-on-primary hover:bg-primary/90 rounded-full transition-all shadow-md active:scale-95 flex items-center gap-2">
                Verify Identity <span className="material-symbols-outlined text-[16px]">key</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-inverse-surface/60 backdrop-blur-md p-4 md:p-6 animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest border border-outline-variant p-8 md:p-10 rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative overflow-hidden custom-scrollbar">
        
        {/* Background motif */}
        <div className="absolute top-0 right-0 indian-motif-pattern w-full h-full opacity-[0.02] pointer-events-none mix-blend-overlay"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-outline-variant pb-6">
          <div className="flex items-center gap-4">
             <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
               <span className="material-symbols-outlined">tune</span>
             </div>
             <div>
               <h2 className="text-3xl font-headline-lg text-on-surface tracking-tight mb-1">Configuration</h2>
               <p className="text-[10px] font-label-caps uppercase tracking-widest text-tertiary">Node: {club.name}</p>
             </div>
          </div>
          <div className="flex flex-wrap gap-2 bg-surface-container p-1.5 rounded-full border border-outline-variant">
            {(['info', 'leads', 'events', 'criteria', 'apps'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all ${activeTab === tab ? 'bg-primary text-on-primary shadow-sm' : 'bg-transparent text-on-surface-variant hover:text-on-surface'}`}
              >
                {tab === 'apps' ? 'Applications' : tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 min-h-[400px]">
          {activeTab === 'info' && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="mb-8">
                <label className="block text-xs font-label-caps text-tertiary mb-3 uppercase tracking-widest">Node Description</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full h-32 bg-surface-container border border-outline-variant rounded-2xl p-5 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none transition-all"
                />
              </div>
              <div className="mb-8 p-6 md:p-8 border border-outline-variant rounded-3xl bg-surface-container flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <h3 className="text-xl font-headline-sm text-on-surface mb-1">Intake Status</h3>
                    <p className="text-sm text-on-surface-variant">Toggle whether the node is currently accepting applications.</p>
                 </div>
                 <button 
                   onClick={() => setRegistrationOpen(!registrationOpen)}
                   className={`px-8 py-3 font-semibold uppercase tracking-widest rounded-full transition-all shadow-sm ${registrationOpen ? 'bg-primary text-on-primary hover:bg-primary/90' : 'bg-error text-on-error hover:bg-error/90'}`}
                 >
                   {registrationOpen ? 'OPEN (ACCEPTING)' : 'CLOSED (LOCKED)'}
                 </button>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex flex-col gap-6">
               {leads.map((lead, idx) => (
                  <div key={idx} className="p-6 md:p-8 border border-outline-variant rounded-3xl bg-surface-container flex flex-col md:flex-row gap-6 items-center hover:border-primary/50 transition-colors">
                     <div className="flex-1 w-full">
                       <label className="block text-[10px] text-tertiary font-label-caps mb-2 uppercase tracking-widest">{lead.role || 'Role'}</label>
                       <input 
                         value={lead.name || ''} 
                         onChange={(e) => updateLead(idx, 'name', e.target.value)}
                         className="w-full bg-surface border border-outline-variant rounded-full px-5 py-2.5 text-body-md text-on-surface focus:border-primary outline-none transition-colors"
                       />
                     </div>
                     <div className="flex-1 w-full">
                       <label className="block text-[10px] text-tertiary font-label-caps mb-2 uppercase tracking-widest">Email Vector</label>
                       <input 
                         value={lead.email || ''} 
                         onChange={(e) => updateLead(idx, 'email', e.target.value)}
                         className="w-full bg-surface border border-outline-variant rounded-full px-5 py-2.5 text-body-md text-on-surface focus:border-primary outline-none transition-colors"
                       />
                     </div>
                  </div>
               ))}
               {leads.length === 0 && <p className="text-sm font-medium text-tertiary text-center py-10 border border-dashed border-outline-variant rounded-3xl">No administrative leads assigned.</p>}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-300">
               <div className="flex flex-col gap-4 mb-8">
                 {events.map((ev, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 border border-outline-variant rounded-2xl bg-surface-container hover:border-primary/50 transition-colors group">
                       <div>
                          <h4 className="font-headline-sm text-on-surface mb-1">{ev.title}</h4>
                          <p className="text-xs font-semibold text-tertiary uppercase tracking-widest">{ev.date}</p>
                       </div>
                       <button onClick={() => removeEvent(idx)} className="text-error/70 hover:text-error transition-colors size-10 rounded-full flex items-center justify-center hover:bg-error/10">
                         <span className="material-symbols-outlined">delete</span>
                       </button>
                    </div>
                 ))}
                 {events.length === 0 && <p className="text-sm font-medium text-tertiary text-center py-6">No scheduled operations.</p>}
               </div>
               
               <div className="p-8 border border-outline-variant rounded-3xl bg-surface-container">
                 <h3 className="font-headline-sm text-on-surface mb-6">Schedule New Operation</h3>
                 <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input placeholder="Event Title (e.g. Code Sprint)" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="flex-1 bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary outline-none transition-colors" />
                    <input placeholder="Date (e.g. MAY 20)" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="md:w-48 bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary outline-none transition-colors" />
                 </div>
                 <button onClick={addEvent} className="w-full bg-secondary text-on-secondary py-3 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
                   <span className="material-symbols-outlined text-sm">add</span> Add Operation
                 </button>
               </div>
            </div>
          )}

          {activeTab === 'criteria' && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-300">
               <div className="flex flex-col gap-4 mb-8">
                 {criteria.map((cr, idx) => (
                    <div key={idx} className="relative p-6 border border-outline-variant rounded-3xl bg-surface-container group hover:border-primary/50 transition-colors">
                       <button onClick={() => removeCriterion(idx)} className="absolute top-6 right-6 text-error/70 hover:text-error transition-colors size-8 rounded-full flex items-center justify-center hover:bg-error/10">
                         <span className="material-symbols-outlined text-sm">delete</span>
                       </button>
                       <h4 className="font-headline-sm text-on-surface mb-2 pr-10">{cr.title}</h4>
                       <p className="text-sm text-on-surface-variant mb-4">{cr.desc}</p>
                       <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full font-semibold uppercase tracking-widest">Target: {cr.req}</span>
                    </div>
                 ))}
                 {criteria.length === 0 && <p className="text-sm font-medium text-error flex items-center gap-2 p-4 bg-error/10 border border-error/20 rounded-2xl"><span className="material-symbols-outlined">warning</span> Warning: No criteria defined. Default matrix will be employed.</p>}
               </div>
               
               <div className="p-8 border border-outline-variant rounded-3xl bg-surface-container">
                 <h3 className="font-headline-sm text-on-surface mb-6">Define Matrix Criterion</h3>
                 <div className="flex flex-col gap-4 mb-6">
                    <input placeholder="Title (e.g. Logic Paradigms)" value={newCriterion.title} onChange={e => setNewCriterion({...newCriterion, title: e.target.value})} className="bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary outline-none transition-colors" />
                    <input placeholder="Description" value={newCriterion.desc} onChange={e => setNewCriterion({...newCriterion, desc: e.target.value})} className="bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary outline-none transition-colors" />
                    <input placeholder="Requirement (e.g. Proficiency in TS)" value={newCriterion.req} onChange={e => setNewCriterion({...newCriterion, req: e.target.value})} className="bg-surface border border-outline-variant rounded-full px-5 py-3 text-body-md text-on-surface focus:border-primary outline-none transition-colors" />
                 </div>
                 <button onClick={addCriterion} className="w-full bg-secondary text-on-secondary py-3 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
                   <span className="material-symbols-outlined text-sm">add</span> Inject Criterion
                 </button>
               </div>
            </div>
          )}

          {activeTab === 'apps' && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-300">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-headline-md text-on-surface mb-1">Intake Queue</h3>
                    <p className="text-sm text-tertiary uppercase tracking-widest font-semibold">Total Processed: {applications.length}</p>
                  </div>
                  <button 
                    onClick={downloadApplicationsCSV}
                    disabled={applications.length === 0}
                    className="px-6 py-3 font-semibold uppercase tracking-widest bg-primary text-on-primary hover:bg-primary/90 rounded-full transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:shadow-none text-xs flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Export CSV
                  </button>
               </div>
               
               {applications.length === 0 ? (
                  <div className="py-12 border border-dashed border-outline-variant rounded-3xl text-center flex flex-col items-center">
                     <span className="material-symbols-outlined text-4xl text-tertiary mb-3 opacity-50">inbox</span>
                     <p className="font-semibold text-tertiary uppercase tracking-widest text-sm">No profiles in queue.</p>
                  </div>
               ) : (
                  <div className="border border-outline-variant rounded-3xl overflow-x-auto shadow-sm bg-surface">
                     <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-surface-variant/50 text-on-surface-variant uppercase text-[10px] tracking-widest border-b border-outline-variant">
                             <th className="p-5 font-semibold whitespace-nowrap">Candidate Name</th>
                             <th className="p-5 font-semibold whitespace-nowrap">Target Role</th>
                             <th className="p-5 font-semibold whitespace-nowrap">Academic Year</th>
                             <th className="p-5 font-semibold">Primary Objective</th>
                             <th className="p-5 font-semibold whitespace-nowrap">Timestamp</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm text-on-surface">
                          {applications.map((app, idx) => (
                             <tr key={app.id} className={idx !== applications.length - 1 ? "border-b border-outline-variant/50" : ""}>
                               <td className="p-5 font-medium whitespace-nowrap">{app.name}</td>
                               <td className="p-5 whitespace-nowrap"><span className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest">{app.role}</span></td>
                               <td className="p-5 whitespace-nowrap text-on-surface-variant">Year {app.year}</td>
                               <td className="p-5 min-w-[250px] max-w-xs"><p className="truncate text-on-surface-variant" title={app.interest}>{app.interest}</p></td>
                               <td className="p-5 whitespace-nowrap text-xs text-tertiary">{new Date(app.submittedAt).toLocaleDateString()}</td>
                             </tr>
                          ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>
          )}
        </div>

        <div className="relative z-10 flex justify-end gap-4 mt-10 pt-8 border-t border-outline-variant">
          <button onClick={onClose} className="px-8 py-3 text-xs font-semibold uppercase tracking-widest bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80 rounded-full transition-colors shadow-sm">
            Discard
          </button>
          <button onClick={handleSave} className="px-8 py-3 text-xs font-semibold uppercase tracking-widest bg-primary text-on-primary hover:bg-primary/90 rounded-full transition-all shadow-md active:scale-95 flex items-center gap-2">
            Commit Changes <span className="material-symbols-outlined text-sm">check_circle</span>
          </button>
        </div>

      </div>
    </div>
  );
};
