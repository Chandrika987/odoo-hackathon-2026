import { useState } from 'react';
import { Search, MapPin, Compass, Heart, Star, Sparkles, Filter } from 'lucide-react';
import './Dashboard.css';

const DISCOVER_TRIPS = [
  {
    id: 'd1',
    title: 'Santorini Sunset Retreat',
    destination: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    duration: '5 Days',
    estBudget: '₹120,000',
    category: 'Romantic',
    rating: 4.9
  },
  {
    id: 'd2',
    title: 'Kyoto Cultural Heritage',
    destination: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    duration: '7 Days',
    estBudget: '₹145,000',
    category: 'Cultural',
    rating: 4.8
  },
  {
    id: 'd3',
    title: 'Machu Picchu Expedition',
    destination: 'Cusco, Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
    duration: '10 Days',
    estBudget: '₹180,000',
    category: 'Adventure',
    rating: 4.9
  },
  {
    id: 'd4',
    title: 'Banff Wilderness Explorer',
    destination: 'Alberta, Canada',
    image: 'https://images.unsplash.com/photo-1600208638062-85093557d344',
    duration: '6 Days',
    estBudget: '₹110,000',
    category: 'Nature',
    rating: 4.7
  },
  {
    id: 'd5',
    title: 'Amalfi Coast Road Trip',
    destination: 'Amalfi, Italy',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88',
    duration: '8 Days',
    estBudget: '₹165,000',
    category: 'Road Trip',
    rating: 4.8
  },
  {
    id: 'd6',
    title: 'Maldives Overwater Oasis',
    destination: 'Malé, Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    duration: '5 Days',
    estBudget: '₹200,000',
    category: 'Luxury',
    rating: 5.0
  }
];

const CATEGORIES = ['All', 'Adventure', 'Cultural', 'Nature', 'Romantic', 'Luxury', 'Road Trip'];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTrips = DISCOVER_TRIPS.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || trip.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard animate-fade-up">
      {/* Header & Hero */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden', padding: '4rem 3rem', background: 'var(--surface-light)', border: '1px solid var(--border-light)', marginBottom: '2.5rem' }}>
        {/* Background Decorative Blur */}
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
          <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--primary-color)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem' }}>
            <Sparkles size={16} /> Get Inspired
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-dark)' }}>
            Find your next <br /> <span style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>great adventure.</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.15rem', marginBottom: '2rem' }}>
            Explore curated itineraries, trending destinations, and hidden gems around the world.
          </p>
          
          <div className="flex items-center gap-3" style={{ background: 'var(--input-bg)', padding: '0.5rem', borderRadius: '3rem', border: '1px solid var(--border-light)', maxWidth: '450px' }}>
            <Search size={20} className="text-muted" style={{ marginLeft: '1rem' }} />
            <input 
              type="text" 
              placeholder="Search destinations, experiences..." 
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-dark)', fontSize: '1rem', padding: '0.5rem 0' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '2rem' }}>Explore</button>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-3" style={{ overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', marginRight: '1rem' }}>
          <Filter size={16} /> Filter:
        </div>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '2rem',
              border: '1px solid var(--border-light)',
              background: activeCategory === category ? 'var(--primary-color)' : 'var(--surface-light)',
              color: activeCategory === category ? 'white' : 'var(--text-dark)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition-fast)'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Trending Destinations Grid */}
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Poppins, sans-serif' }}>Trending Now</h2>
      </div>

      {filteredTrips.length === 0 ? (
        <div className="card text-center" style={{ padding: '5rem 2rem', background: 'var(--surface-light)', border: '1px dashed var(--border-light)', marginBottom: '2rem' }}>
          <Compass size={48} className="text-muted mb-4" style={{ opacity: 0.5, margin: '0 auto' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No destinations found</h3>
          <p className="text-muted">Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="trips-grid">
          {filteredTrips.map(trip => (
            <div 
              key={trip.id} 
              className="trip-card-v2" 
              style={{ backgroundImage: `url(${trip.image})` }}
            >
              <div className="trip-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {trip.category}
                </div>
                <button 
                  className="heart-btn" 
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  <Heart size={18} />
                </button>
              </div>
              
              <div className="trip-card-bottom">
                <div className="trip-card-destination">
                  <MapPin size={12}/> {trip.destination}
                </div>
                <h3 className="trip-card-title">{trip.title}</h3>
                
                <div className="trip-card-stats">
                  <span>{trip.duration}</span>
                  <span>•</span>
                  <span>Est. {trip.estBudget}</span>
                </div>

                <div className="trip-card-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <button className="btn-sm" style={{ background: 'white', color: '#0f172a', padding: '0.5rem 1rem', borderRadius: '2rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                    View Itinerary
                  </button>
                  <div className="flex items-center gap-1" style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem', background: 'rgba(0,0,0,0.4)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', backdropFilter: 'blur(4px)' }}>
                    <Star size={14} fill="currentColor" /> {trip.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discover;
