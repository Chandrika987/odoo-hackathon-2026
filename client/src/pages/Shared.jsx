import { useState } from 'react';
import { Users, Link as LinkIcon, Plus, UserPlus, CheckCircle, Clock, Calendar, MapPin, Search, ArrowRight, Activity, Copy, Send } from 'lucide-react';
import './Dashboard.css';

const MOCK_SHARED_TRIPS = [
  {
    id: 1,
    title: 'Bali Villa Retreat',
    destination: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    dates: 'Dec 15 - Dec 28, 2026',
    status: 'Planning',
    progress: 65,
    budget: '₹450,000 Group',
    collaborators: [
      { id: 'u1', name: 'You', avatar: 'https://i.pravatar.cc/150?img=68', role: 'Organizer' },
      { id: 'u2', name: 'Sarah J.', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Editor' },
      { id: 'u3', name: 'Mike T.', avatar: 'https://i.pravatar.cc/150?img=11', role: 'Editor' },
      { id: 'u5', name: 'Elena R.', avatar: 'https://i.pravatar.cc/150?img=32', role: 'Viewer' }
    ],
    pendingTasks: 3
  },
  {
    id: 2,
    title: 'Eurotrip Summer 2027',
    destination: 'Multiple Countries',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
    dates: 'Jun 10 - Jul 05, 2027',
    status: 'Early Ideas',
    progress: 15,
    budget: '₹800,000 Group',
    collaborators: [
      { id: 'u4', name: 'Emma W.', avatar: 'https://i.pravatar.cc/150?img=5', role: 'Organizer' },
      { id: 'u1', name: 'You', avatar: 'https://i.pravatar.cc/150?img=68', role: 'Editor' }
    ],
    pendingTasks: 12
  }
];

const MOCK_ACTIVITIES = [
  { id: 1, user: 'Sarah J.', action: 'updated the itinerary for', target: 'Bali Villa Retreat', time: '2 hours ago', icon: Calendar, color: '#3b82f6' },
  { id: 2, user: 'Mike T.', action: 'added a new hotel booking to', target: 'Bali Villa Retreat', time: '5 hours ago', icon: CheckCircle, color: '#10b981' },
  { id: 3, user: 'Emma W.', action: 'invited 2 friends to', target: 'Eurotrip Summer 2027', time: '1 day ago', icon: UserPlus, color: '#a855f7' },
  { id: 4, user: 'You', action: 'completed packing task for', target: 'Bali Villa Retreat', time: '2 days ago', icon: CheckCircle, color: '#10b981' }
];

const Shared = () => {
  const [trips, setTrips] = useState(MOCK_SHARED_TRIPS);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard animate-fade-up">
      {/* Header & Hero */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 3rem', background: 'var(--surface-light)', border: '1px solid var(--border-light)', marginBottom: '2.5rem' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none' }}></div>
        
        <div className="flex justify-between items-center" style={{ position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: '600px' }}>
            <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--primary-color)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              <Users size={16} /> Collaborative Planning
            </div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-dark)' }}>
              Travel is better <br/>
              <span style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>when shared.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '0' }}>
              Coordinate itineraries, split budgets, and plan unforgettable group adventures together in one workspace.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button className="btn btn-primary" onClick={() => setIsInviteModalOpen(true)} style={{ padding: '0.85rem 1.75rem', borderRadius: '2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)', width: '220px' }}>
              <UserPlus size={18} /> Invite Friends
            </button>
            <button className="btn btn-outline" style={{ padding: '0.85rem 1.75rem', borderRadius: '2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '220px' }}>
              <LinkIcon size={18} /> Join via Link
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Main Content: Shared Trips */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>Active Workspaces</h2>
            
            <div className="flex items-center gap-2" style={{ background: 'var(--input-bg)', padding: '0.4rem', borderRadius: '3rem', border: '1px solid var(--border-light)', width: '250px' }}>
              <Search size={16} className="text-muted" style={{ marginLeft: '1rem' }} />
              <input 
                type="text" 
                placeholder="Search trips..." 
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-dark)', fontSize: '0.9rem', padding: '0.4rem 0' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredTrips.length === 0 ? (
            <div className="card text-center" style={{ padding: '5rem 2rem', background: 'var(--surface-light)', border: '1px dashed var(--border-light)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <Users size={32} color="var(--primary-color)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No shared trips yet</h3>
              <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                Start planning a group trip or ask a friend to send you an invite link.
              </p>
              <button className="btn btn-primary" onClick={() => setIsInviteModalOpen(true)}>
                Start Group Trip
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredTrips.map(trip => (
                <div 
                  key={trip.id} 
                  className="card" 
                  style={{ 
                    padding: '0', 
                    background: 'var(--surface-light)', 
                    border: '1px solid var(--border-light)', 
                    overflow: 'hidden', 
                    display: 'flex',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                >
                  {/* Image Column */}
                  <div style={{ width: '220px', backgroundImage: `url(${trip.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  
                  {/* Content Column */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={14} className="text-primary" />
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {trip.destination}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{trip.title}</h3>
                      </div>
                      <div style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)', padding: '0.35rem 0.85rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                        {trip.status}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <div className="flex items-center gap-1"><Calendar size={14} /> {trip.dates}</div>
                      <div className="flex items-center gap-1">• {trip.budget}</div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Collaborators Avatars */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {trip.collaborators.slice(0, 3).map((collab, index) => (
                          <div 
                            key={collab.id} 
                            style={{ 
                              width: '32px', height: '32px', borderRadius: '50%', 
                              border: '2px solid var(--surface-light)',
                              backgroundImage: `url(${collab.avatar})`, backgroundSize: 'cover',
                              marginLeft: index > 0 ? '-10px' : '0',
                              zIndex: 10 - index,
                              position: 'relative'
                            }}
                            title={`${collab.name} (${collab.role})`}
                          ></div>
                        ))}
                        {trip.collaborators.length > 3 && (
                          <div style={{ 
                            width: '32px', height: '32px', borderRadius: '50%', 
                            border: '2px solid var(--surface-light)',
                            background: 'var(--border-light)',
                            color: 'var(--text-dark)', fontSize: '0.75rem', fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginLeft: '-10px', zIndex: 1
                          }}>
                            +{trip.collaborators.length - 3}
                          </div>
                        )}
                        <button style={{ marginLeft: '10px', width: '32px', height: '32px', borderRadius: '50%', border: '1px dashed var(--text-muted)', background: 'transparent', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '150px' }}>
                        <div style={{ flex: 1, height: '6px', background: 'rgba(0,0,0,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${trip.progress}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '3px' }}></div>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{trip.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Activity Feed */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'Poppins, sans-serif', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} className="text-primary" /> Recent Activity
          </h2>
          
          <div className="card" style={{ padding: '1.5rem', background: 'var(--surface-light)', border: '1px solid var(--border-light)' }}>
            <div className="flex flex-col gap-4">
              {MOCK_ACTIVITIES.map((activity, index) => (
                <div key={activity.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                  {/* Timeline connecting line */}
                  {index !== MOCK_ACTIVITIES.length - 1 && (
                    <div style={{ position: 'absolute', left: '15px', top: '35px', bottom: '-15px', width: '2px', background: 'var(--border-light)', zIndex: 0 }}></div>
                  )}
                  
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${activity.color}15`, color: activity.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                    <activity.icon size={16} />
                  </div>
                  
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.4 }}>
                      <strong style={{ fontWeight: 600 }}>{activity.user}</strong> {activity.action} <strong style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{activity.target}</strong>.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      <Clock size={12} /> {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', background: 'transparent', border: '1px solid var(--border-light)', borderRadius: '0.5rem', color: 'var(--text-dark)', fontWeight: 600, cursor: 'pointer', transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.background = 'var(--border-light)'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
              View All Activity
            </button>
          </div>
          
          {/* Quick Tasks Widget */}
          <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)', border: '1px solid rgba(79, 70, 229, 0.2)', marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-color)' }}>Your Pending Tasks</h3>
            
            <div className="flex flex-col gap-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '2px solid var(--primary-color)', cursor: 'pointer' }}></div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>Book airport transfer (Bali)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '2px solid var(--primary-color)', cursor: 'pointer' }}></div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>Review Eurotrip itinerary draft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal (Simplified UI overlay) */}
      {isInviteModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setIsInviteModalOpen(false)}>
          <div className="card animate-fade-up" style={{ width: '100%', maxWidth: '500px', background: 'var(--background-light)', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif' }}>Invite Collaborators</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>Share your trip link to plan together with friends and family.</p>
            
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--input-bg)', border: '1px solid var(--border-light)', borderRadius: '0.5rem', padding: '0.5rem', marginBottom: '2rem' }}>
              <input type="text" readOnly value="https://travelloop.app/invite/t-x8j9q1z" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-dark)', fontSize: '0.9rem', padding: '0.5rem' }} />
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Copy size={16} /> Copy
              </button>
            </div>
            
            <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-light)', zIndex: 0 }}></div>
              <span style={{ background: 'var(--background-light)', padding: '0 1rem', color: 'var(--text-muted)', fontSize: '0.85rem', position: 'relative', zIndex: 1 }}>OR SEND INVITE</span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="email" placeholder="friend@example.com" className="form-input" style={{ flex: 1, margin: 0 }} />
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1.5rem' }}>
                <Send size={18} />
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setIsInviteModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shared;
