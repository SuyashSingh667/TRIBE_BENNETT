import React, { useState, useMemo } from 'react';
import { mockData } from '../data/mockData';
import { Link } from 'react-router-dom';
import EventModal from '../components/shared/EventModal';
import { EventDetailDrawer } from '../components/shared/EventDetailDrawer';
import { ClubDiscoveryAssistant } from '../components/shared/ClubDiscoveryAssistant';
import { ProfilePanel } from '../components/shared/ProfilePanel';
import SidebarLayout from '../components/layout/SidebarLayout';
import { getCollisionFreeMasterEvents } from '../lib/clubManager';
import type { TribeEvent as SharedTribeEvent } from '../lib/clubManager';

interface DashboardProps {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export type TribeEvent = SharedTribeEvent;

export const Dashboard: React.FC<DashboardProps> = ({
  className = '',
  ...props
}) => {
  const { dashboard } = mockData;

  const masterEvents = useMemo(() => {
    return getCollisionFreeMasterEvents();
  }, []);

  const [events, setEvents] = useState<TribeEvent[]>(() => {
    const saved = localStorage.getItem('tribe_events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...masterEvents, ...parsed].filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
      } catch {
        return masterEvents;
      }
    }
    return masterEvents;
  });

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState<TribeEvent | null>(null);
  const [viewingEvent, setViewingEvent] = useState<TribeEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDiscoveryAssistant, setShowDiscoveryAssistant] = useState(false);

  const saveEvents = (newEvents: TribeEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem('tribe_events', JSON.stringify(newEvents));
  };

  const handleSaveEvent = (eventData: TribeEvent) => {
    const exists = events.find((e) => e.id === eventData.id);
    let updated;
    if (exists) {
      updated = events.map((e) => e.id === eventData.id ? eventData : e);
    } else {
      updated = [...events, eventData];
    }
    saveEvents(updated);
    setShowEventModal(false);
  };

  return (
    <SidebarLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] rounded-xl overflow-hidden flex items-center justify-center text-center shadow-md animate-in fade-in duration-700">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover" style={{ backgroundImage: "url('/dashboard_bg_new.jpg')", backgroundPosition: 'center 60%' }}></div>
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          <div className="texture-overlay"></div>
        </div>
        <div className="relative z-10 px-6 py-12 bg-background/80 backdrop-blur-sm border border-outline-variant rounded-lg max-w-2xl shadow-xl">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-[1px] w-12 bg-tertiary"></div>
            <span className="text-label-caps font-label-caps text-tertiary tracking-widest">ACTIVE CONTROL CENTER</span>
            <div className="h-[1px] w-12 bg-tertiary"></div>
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-primary mb-6">Explore Your Realm</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
             {dashboard.hero.description}
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-gutter mt-16 animate-in slide-in-from-bottom-8 duration-700 delay-100">
        {dashboard.cards.map((card, index) => {
          
          const isPrimary = index === 1; // Middle card Cultural is Primary
          const cardBgClass = isPrimary ? 'bg-primary' : 'bg-surface';
          const textColor = isPrimary ? 'text-on-primary' : 'text-on-surface';
          const textVariant = isPrimary ? 'text-on-primary/80' : 'text-on-surface-variant';
          const buttonHover = isPrimary ? 'group-hover:text-tertiary-fixed' : 'group-hover:text-tertiary';
          const bgOpacity = isPrimary ? 'opacity-30 group-hover:opacity-40' : 'opacity-40 group-hover:opacity-30';
          
          const bgImages = [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMDhSo1D3sk0bVJ2AmFebVD--C5kACEYSCXthiV_0SjP985w_vq15esoeRUJgiF7Rh8PspvwubUBIaSN3M-cH_xjUWQz0fBA5-TKQxxoF1dMb_kiSKV-x1afwSqRQy1gwsI3MTEry7549hERl95cNqcXxpn2tLGyDCxJtqodvkfk6jPn_cqDQ4vDCM4KuKIlL98z0R3-fRgT4-V-E9fym64y1HaWEuN2rHd8sm0k2TMQqdwFlzfqhh6ZSRPiFX7cuDvTk',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDD3oqKY0RxMUl6S0TqVoFzdJ6WoCmc6j684NbFQIHh5DjlNr85YB_g5FdjCv6ijEUeuQnP-eUBAZhCnUS5IMy7KB3gWxpUveJioHEoeVbmOrmamkUbKe7HNO0C1I_OvmD1LEKdBtyTpMBoXSeV1uSE8_mr8sabF21UCwWpZdgkdds5P1_lo_ePBHny0TQjGog5xcsnJ7GZZyxIi5t4F3ZGWTWjwyCRHeCn0m80vwVUAiVx-lvuRmwk-g',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBlDITCcXQOMtpkCSbD8dseZ5HbeUlFO0F0ROrWe1cY2RazIxIuzR2CQF6wq44lF3P1dTMP5Jv_7ZLjPdoGsIX_ypIaCbsbbHjj5EoByer4n-VK7QMHHSVcJGFpUG3d8mcuU8mBhuTwlaJtVWyp2fOugZFjJUkeYdcgtqlCU_c6-bs8o6QG-U8hxBkt0O1waCgWHfTVPkwS-E6HQkMu42t5OAbWERfG6qo2Pz7F2acC-yexLpKMjciLIA'
          ];
          
          const customStyle = index === 0 
            ? { backgroundImage: `url('${bgImages[index]}')`, backgroundBlendMode: 'multiply' as any, backgroundColor: '#1a2e1a' }
            : { backgroundImage: `url('${bgImages[index]}')` };

          return (
            <Link
              key={card.id}
              to={card.path}
              className={`group relative h-[400px] arch-card gold-border overflow-hidden ${cardBgClass} flex flex-col items-center justify-center text-center p-8 transition-transform hover:-translate-y-2 duration-300 shadow-md hover:shadow-xl`}
            >
              <div className={`absolute inset-0 transition-opacity ${bgOpacity}`}>
                <div className="w-full h-full bg-cover bg-center" style={customStyle}></div>
              </div>
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="w-16 h-16 rounded-full border border-tertiary flex items-center justify-center bg-background text-primary shadow-sm">
                  <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                </div>
                <h2 className={`text-headline-md font-headline-md ${textColor}`}>{card.title}</h2>
                <p className={`text-body-md font-body-md ${textVariant} max-w-[200px]`}>{card.description}</p>
                <div className={`mt-8 flex items-center space-x-2 ${isPrimary ? 'text-on-primary' : 'text-primary'} font-label-caps text-label-caps ${buttonHover} transition-colors`}>
                  <span>{card.actionText || 'EXPLORE'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Intelligence Section */}
      <section className="bg-surface-container-low rounded-xl border border-outline-variant p-8 md:p-12 mt-24 shadow-sm relative">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary mb-2">Global Intel</h2>
            <div className="flex items-center space-x-4">
              <div className="h-[1px] w-12 bg-tertiary"></div>
              <span className="text-label-caps font-label-caps text-tertiary tracking-widest">EVENT CALENDAR</span>
            </div>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-master-calendar'))} className="mt-6 md:mt-0 bg-primary text-on-primary px-6 py-3 text-label-caps font-label-caps rounded-sm hover:bg-surface-tint transition-colors flex items-center space-x-2 shadow-sm">
            <span>EXECUTE MASTER VIEW</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calendar (Mockup) */}
          <div className="lg:col-span-1 bg-background rounded-lg border border-outline-variant p-6 h-fit shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-md font-headline-md text-on-surface">May 2026</h3>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors" onClick={() => window.dispatchEvent(new Event('open-master-calendar'))}>open_in_new</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-label-caps font-label-caps text-on-surface-variant mb-4">
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-body-sm font-body-md text-on-surface">
              <div className="p-2 text-outline">26</div><div className="p-2 text-outline">27</div><div className="p-2 text-outline">28</div><div className="p-2 text-outline">29</div><div className="p-2 text-outline">30</div>
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const dayEvents = events.filter(e => e.day === day);
                const isSelected = selectedDate === day;
                const hasEvent = dayEvents.length > 0;
                
                let dayClasses = "p-2 cursor-pointer hover:bg-surface-variant rounded-full transition-colors";
                if (isSelected) dayClasses = "p-2 rounded-full bg-primary-container text-on-primary-container font-semibold shadow-sm";
                else if (hasEvent) dayClasses = "p-2 rounded-full bg-surface-variant text-on-surface font-semibold";
                
                return (
                  <div 
                    key={day} 
                    onClick={() => {
                       if(hasEvent) setSelectedDate(day);
                       else window.dispatchEvent(new Event('open-master-calendar'));
                    }}
                    className={dayClasses}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event List */}
          <div className="lg:col-span-2 space-y-4 flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-tertiary/20 pb-2">
               <div className="text-label-caps font-label-caps text-tertiary">UPCOMING ARCHITECTURE</div>
               {selectedDate && (
                 <button onClick={() => setSelectedDate(null)} className="text-[10px] font-label-caps text-error hover:underline uppercase">Clear Filter</button>
               )}
            </div>
            
            <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4 pr-2">
              {events.filter(e => selectedDate ? e.day === selectedDate : true).length === 0 ? (
                <div className="p-12 text-center border border-dashed border-outline-variant rounded-lg">
                   <p className="text-on-surface-variant font-label-caps">No events found.</p>
                </div>
              ) : (
                events.filter(e => selectedDate ? e.day === selectedDate : true).slice(0, selectedDate ? undefined : 4).map((ev, i) => (
                  <div key={ev.id || i} onClick={() => setViewingEvent(ev)} className="flex items-center justify-between p-6 bg-background rounded-lg border border-outline-variant hover:border-tertiary transition-colors group cursor-pointer shadow-sm">
                    <div className="flex items-center space-x-6">
                      <div className="text-center pr-6 border-r border-outline-variant group-hover:border-tertiary/50 transition-colors">
                        <div className="text-headline-md font-headline-md text-primary">{String(ev.day).padStart(2, '0')}</div>
                        <div className="text-label-caps font-label-caps text-on-surface-variant">MAY</div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full border border-tertiary/30 bg-tertiary/5 text-tertiary text-[10px] font-label-caps font-semibold uppercase">{ev.type || 'Event'}</span>
                          <span className="text-label-caps font-label-caps text-on-surface-variant uppercase">{ev.org || 'System'}</span>
                        </div>
                        <h4 className="text-body-lg font-body-lg text-on-surface font-medium">{ev.title}</h4>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-all">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {showEventModal && <EventModal onClose={() => setShowEventModal(false)} onSave={handleSaveEvent} initialData={editingEvent} />}
      {viewingEvent && <EventDetailDrawer event={viewingEvent} onClose={() => setViewingEvent(null)} />}
      {showDiscoveryAssistant && <ClubDiscoveryAssistant onClose={() => setShowDiscoveryAssistant(false)} />}
    </SidebarLayout>
  );
};

export default Dashboard;
