import { useState, useEffect } from 'react';
import { getTrips, deleteTrip } from '../services/tripService';
import { MapPin, Calendar, Trash2, Edit, Plus, Compass, Heart, ArrowRight, IndianRupee, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Explorer';
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    const { data, error } = await getTrips();
    
    if (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    } else {
      setTrips(data || []);
    }
    
    setLoading(false);
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this trip?")) {
      const { error } = await deleteTrip(id);
      if (!error) {
        setTrips(trips.filter(t => t.id !== id));
      } else {
        alert("Failed to delete trip.");
      }
    }
  };

  const handleEdit = (id, e) => {
    if (e) e.stopPropagation();
    navigate(`/edit-trip/${id}`);
  };

  const getTripStatus = (trip) => {
    const now = new Date();
    const start = new Date(trip.start_date);
    const end = trip.end_date ? new Date(trip.end_date) : start;
    if (start > now) return { label: 'Upcoming', color: '#10b981', bg: 'rgba(16, 185, 129, 0.2)' };
    if (end < now) return { label: 'Past', color: 'rgba(255,255,255,0.8)', bg: 'rgba(255,255,255,0.1)' };
    return { label: 'Active', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)' };
  };

  return (
    <div className="dashboard animate-fade-up">
      <div className="dashboard-header" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--text-dark) 0%, var(--primary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
            Your journeys, beautifully organized.
          </h1>
          <p className="text-muted" style={{ fontSize: '1.15rem', fontWeight: 500 }}>
            Welcome back, {userName}. Every trip begins with a story. Let's write the next one.
          </p>
        </div>
        <Link to="/create-trip" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
          <Plus size={20} /> Plan a New Adventure
        </Link>
      </div>

      <div className="stats-row mt-4">
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
              <Briefcase size={18} />
            </div>
            <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Total Trips</h3>
          </div>
          <div className="stat-value">{trips.length}</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent-color)' }}>
              <Calendar size={18} />
            </div>
            <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Upcoming</h3>
          </div>
          <div className="stat-value">{trips.filter(t => new Date(t.start_date) > new Date()).length}</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <IndianRupee size={18} />
            </div>
            <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Total Budget</h3>
          </div>
          <div className="stat-value">₹{trips.reduce((acc, t) => acc + (Number(t.budget) || 0), 0).toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 mb-4">
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'Poppins, sans-serif' }}>Recent Journeys</h2>
        {trips.length > 0 && (
          <Link to="/my-trips" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
            View All Trips <ArrowRight size={16} />
          </Link>
        )}
      </div>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-light)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : trips.length === 0 ? (
        <div className="card text-center" style={{ padding: '5rem 2rem', background: 'var(--surface-light)', border: '1px dashed var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
            <Compass size={40} />
          </div>
          <h3 className="mb-4" style={{ fontSize: '1.5rem' }}>No adventures yet</h3>
          <p className="text-muted mb-4" style={{ maxWidth: '400px' }}>Your travel diary is empty. Start planning your first premium journey today.</p>
          <Link to="/create-trip" className="btn btn-primary" style={{ marginTop: '1rem' }}><Plus size={20}/> Start Planning</Link>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.slice(0, 3).map(trip => {
            const status = getTripStatus(trip);
            return (
            <div 
              key={trip.id} 
              className="trip-card-v2" 
              style={{ backgroundImage: `url(${trip.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'})` }}
              onClick={() => navigate(`/trip/${trip.id}`)}
            >
              <div className="trip-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: status.bg, color: status.color, padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {status.label}
                </div>
                <button 
                  className="heart-btn" 
                  onClick={(e) => { e.stopPropagation(); /* Future: toggle favorite */ }}
                >
                  <Heart size={18} />
                </button>
              </div>
              
              <div className="trip-card-bottom">
                <div className="trip-card-destination">
                  <MapPin size={12}/> {trip.destination || 'Unspecified'}
                </div>
                <h3 className="trip-card-title">{trip.title}</h3>
                
                <div className="trip-card-stats">
                  <span>{new Date(trip.start_date || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{trip.travelers || 1} Travelers</span>
                  {trip.budget > 0 && (
                    <>
                      <span>•</span>
                      <span style={{ fontWeight: 600, color: '#e2e8f0' }}>₹{trip.budget.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </div>

                <div className="trip-card-actions" onClick={(e) => e.stopPropagation()}>
                  <Link to={`/trip/${trip.id}`} className="btn-sm">
                    View Details
                  </Link>
                  <div style={{ flex: 1 }}></div>
                  <button className="icon-btn-card" onClick={(e) => handleEdit(trip.id, e)} title="Edit Trip">
                    <Edit size={16} />
                  </button>
                  <button className="icon-btn-card danger" onClick={(e) => handleDelete(trip.id, e)} title="Delete Trip">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
