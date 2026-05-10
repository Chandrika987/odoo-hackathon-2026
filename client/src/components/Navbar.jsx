import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search as SearchIcon, Bell as BellIcon, Settings, Check, Mail, Copy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const profileLink = `https://travelloop.app/profile/${user?.id || 'guest'}`;

  // Clear search bar if we navigate away from my-trips manually
  useEffect(() => {
    if (!location.pathname.includes('/my-trips') && !location.search.includes('search=')) {
      setSearchQuery('');
    }
  }, [location.pathname, location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/my-trips?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      navigate(`/my-trips?search=${encodeURIComponent(val.trim())}`);
    } else {
      // If we are already searching, clear it
      if (location.pathname === '/my-trips' && location.search) {
        navigate(`/my-trips`);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <header className="navbar">
      <form className="search-bar" onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
        <SearchIcon size={18} className="search-icon" style={{ marginLeft: '1rem', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search destinations, activities, or trips..." 
          value={searchQuery}
          onChange={handleChange}
          style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, padding: '0.75rem 1rem' }}
        />
        <button type="submit" style={{ display: 'none' }}>Search</button>
      </form>
      
      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button 
          onClick={() => navigate('/create-trip')}
          style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Create Trip
        </button>
        
        <button 
          onClick={() => setIsShareModalOpen(true)}
          style={{ background: 'var(--surface-light)', color: 'var(--text-dark)', border: '1px solid var(--border-light)', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', width: '135px', justifyContent: 'center' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> Share Profile
        </button>
        
        <ThemeToggle />
        <button className="icon-btn" title="Notifications">
          <BellIcon size={20} />
        </button>
        <button className="icon-btn" title="Settings">
          <Settings size={20} />
        </button>
      </div>
    </header>

      {isShareModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setIsShareModalOpen(false)}>
          <div className="card animate-fade-up" style={{ width: '100%', maxWidth: '400px', background: 'var(--surface-light)', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-light)' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif', color: 'var(--text-dark)' }}>Share Profile</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>Share your travel profile with friends and family.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }} onClick={() => window.open(`https://wa.me/?text=Check out my TravelLoop profile: ${profileLink}`)}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>WhatsApp</span>
              </button>
              
              <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }} onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${profileLink}`)}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Facebook</span>
              </button>

              <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }} onClick={() => window.open(`https://twitter.com/intent/tweet?url=${profileLink}&text=Check out my TravelLoop profile!`)}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#1DA1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Twitter</span>
              </button>

              <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }} onClick={() => window.open(`mailto:?subject=My TravelLoop Profile&body=Check out my travel profile: ${profileLink}`)}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ea4335', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Mail size={24} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Email</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--input-bg)', border: '1px solid var(--border-light)', borderRadius: '0.5rem', padding: '0.5rem' }}>
              <input type="text" readOnly value={profileLink} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-dark)', fontSize: '0.9rem', padding: '0.5rem' }} />
              <button onClick={handleCopyLink} className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isCopied ? <Check size={16} /> : <Copy size={16} />} {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
