import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTripById } from '../services/tripService';
import { MapPin, Calendar, Clock, DollarSign, Plus, Map, List, GripVertical, CheckCircle2, Navigation, Coffee, Bed, Camera } from 'lucide-react';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, map

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      const { data, error } = await getTripById(id);
      if (error) {
        console.error("Error fetching trip:", error);
      } else {
        setTrip(data);
      }
      setLoading(false);
    };
    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-light)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="card text-center" style={{ padding: '5rem' }}>
        <h2>Trip not found</h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    );
  }

  const startDate = new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const endDate = new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Mock Itinerary Data for UI demonstration
  const itinerary = [
    { id: 1, time: '09:00 AM', title: 'Arrival & Check-in', type: 'stay', location: 'Grand Hotel', icon: <Bed size={18} /> },
    { id: 2, time: '11:30 AM', title: 'City Walking Tour', type: 'activity', location: 'Downtown', icon: <Navigation size={18} /> },
    { id: 3, time: '01:00 PM', title: 'Lunch at Local Cafe', type: 'food', location: 'Market Square', icon: <Coffee size={18} /> },
    { id: 4, time: '03:00 PM', title: 'Museum Visit', type: 'activity', location: 'National Museum', icon: <Camera size={18} /> },
  ];

  return (
    <div className="animate-fade-up">
      {/* Premium Hero Banner */}
      <div style={{ 
        height: '350px', 
        borderRadius: 'var(--radius-xl)', 
        background: `linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 100%), url(${trip.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '3rem',
        color: 'white',
        marginBottom: '3rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {trip.is_public && (
          <div style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
            Publicly Shared
          </div>
        )}
        <h1 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '0.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.3)', fontFamily: 'Poppins, sans-serif' }}>
          {trip.title}
        </h1>
        <div className="flex gap-6 mt-4 text-sm" style={{ fontWeight: 500 }}>
          <div className="flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.15)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(4px)' }}><MapPin size={18}/> {trip.destination}</div>
          <div className="flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.15)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(4px)' }}><Calendar size={18}/> {startDate} - {endDate}</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', background: 'var(--surface-light)', padding: '0.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <button 
            onClick={() => setViewMode('timeline')}
            style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: viewMode === 'timeline' ? 'var(--primary-color)' : 'transparent', color: viewMode === 'timeline' ? 'white' : 'var(--text-muted)', fontWeight: 600, transition: 'all 0.3s' }}
          >
            <List size={18}/> Timeline
          </button>
          <button 
            onClick={() => setViewMode('map')}
            style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: viewMode === 'map' ? 'var(--primary-color)' : 'transparent', color: viewMode === 'map' ? 'white' : 'var(--text-muted)', fontWeight: 600, transition: 'all 0.3s' }}
          >
            <Map size={18}/> Map View
          </button>
        </div>
        
        <button className="btn btn-primary">
          <Plus size={18}/> Add Activity
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        {/* Main Content Area */}
        {viewMode === 'timeline' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'Poppins, sans-serif' }}>Day 1: Arrival</h2>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{startDate}</span>
            </div>
            
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Timeline Line */}
              <div style={{ position: 'absolute', left: '0', top: '1rem', bottom: '0', width: '2px', background: 'var(--border-light)' }}></div>
              
              {itinerary.map((item, index) => (
                <div key={item.id} className="card" style={{ marginBottom: '1.5rem', position: 'relative', transition: 'all 0.3s ease', cursor: 'pointer', ':hover': { transform: 'translateX(10px)' } }}>
                  {/* Timeline Dot */}
                  <div style={{ position: 'absolute', left: '-2.45rem', top: '1.5rem', width: '16px', height: '16px', borderRadius: '50%', background: 'white', border: '4px solid var(--primary-color)', zIndex: 10 }}></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ cursor: 'grab', color: 'var(--text-muted)' }}>
                        <GripVertical size={18} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{item.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          <span className="flex items-center gap-1"><Clock size={14}/> {item.time}</span>
                          <span className="flex items-center gap-1"><MapPin size={14}/> {item.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.5rem', 
                      background: item.type === 'food' ? 'rgba(249, 115, 22, 0.1)' : item.type === 'stay' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(79, 70, 229, 0.1)', 
                      color: item.type === 'food' ? '#F97316' : item.type === 'stay' ? '#10B981' : '#4F46E5', 
                      padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 
                    }}>
                      {item.icon} {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="btn btn-outline" style={{ width: '100%', borderStyle: 'dashed', padding: '1.5rem', background: 'rgba(248, 250, 252, 0.5)' }}>
                <Plus size={18} /> Add New Activity to Day 1
              </button>
            </div>
          </div>
        ) : (
          <div style={{ height: '600px', background: 'var(--border-light)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)' }}>
            <Map size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>Interactive Map Integration</p>
            <small>Requires Google Maps API Key</small>
          </div>
        )}
        
        {/* Right Sidebar */}
        <div>
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, var(--surface-light) 0%, rgba(255,255,255,0.4) 100%)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign className="text-primary"/> Budget Analytics
            </h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <div className="flex justify-between mb-2">
                <span className="text-muted">Total Budget</span>
                <span className="font-semibold" style={{ fontSize: '1.1rem' }}>₹{trip.budget?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted">Estimated Expenses</span>
                <span className="font-semibold" style={{ color: 'var(--accent-color)', fontSize: '1.1rem' }}>₹850</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', marginTop: '1rem', overflow: 'hidden' }}>
                <div style={{ width: '35%', height: '100%', background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))', borderRadius: '4px' }}></div>
              </div>
              <p style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>35% of budget allocated</p>
            </div>

            <hr style={{ borderColor: 'var(--border-light)', margin: '1.5rem 0' }}/>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-muted">Remaining Balance</span>
              <span className="font-bold" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>₹{(trip.budget - 850).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Trip Notes</h3>
            {trip.description ? (
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{trip.description}</p>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No notes provided for this journey.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
