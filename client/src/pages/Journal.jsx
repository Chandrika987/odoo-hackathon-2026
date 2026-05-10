import { useState } from 'react';
import { BookOpen, Search, MapPin, Calendar, Plus, PenTool, Image as ImageIcon, Sparkles, Filter, Smile, ArrowRight, Heart } from 'lucide-react';
import './Dashboard.css';

const MOCK_NOTES = [
  {
    id: 1,
    title: 'Hidden Gem in Kyoto',
    preview: 'Found this amazing little matcha shop hidden in an alleyway near Gion. The owner was incredibly sweet and the tea was perfect.',
    date: 'Oct 14, 2026',
    trip: 'Kyoto Cultural Heritage',
    location: 'Kyoto, Japan',
    category: 'Memory',
    moodEmoji: '🍵',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'
  },
  {
    id: 2,
    title: 'Santorini Sunset Magic',
    preview: 'The most breathtaking sunset I have ever seen. The sky turned vibrant shades of orange and purple as the sun dipped below the Aegean sea.',
    date: 'Sep 22, 2026',
    trip: 'Santorini Sunset Retreat',
    location: 'Oia, Greece',
    category: 'Memory',
    moodEmoji: '🌅',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e'
  },
  {
    id: 3,
    title: 'Packing checklist reminder',
    preview: 'Do NOT forget the universal power adapter again! And maybe an extra power bank for the long hiking days.',
    date: 'Nov 02, 2026',
    trip: 'General Notes',
    location: '',
    category: 'Planning',
    moodEmoji: '📝',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05'
  },
  {
    id: 4,
    title: 'Best Coffee in Rome',
    preview: 'SantEustachio Il Caffè. Must go back before we leave. The espresso is completely different from what we get back home.',
    date: 'Aug 15, 2026',
    trip: 'Italian Summer',
    location: 'Rome, Italy',
    category: 'Food',
    moodEmoji: '☕',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096'
  }
];

const CATEGORIES = ['All', 'Memory', 'Planning', 'Food', 'Ideas'];

const Journal = () => {
  const [notes, setNotes] = useState(MOCK_NOTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCreating, setIsCreating] = useState(false);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || note.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (isCreating) {
    return (
      <div className="dashboard animate-fade-up">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button onClick={() => setIsCreating(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ← Back to Journal
            </button>
            <h1 style={{ fontSize: '2rem', fontFamily: 'Poppins, sans-serif', margin: 0, lineHeight: 1.2 }}>New Entry</h1>
          </div>
          <button className="btn btn-primary" onClick={() => setIsCreating(false)} style={{ padding: '0.75rem 2rem', borderRadius: '2rem' }}>
            Save Entry
          </button>
        </div>

        <div className="card" style={{ padding: '3rem', minHeight: '600px', background: 'var(--surface-light)', border: '1px solid var(--border-light)' }}>
          <input 
            type="text" 
            placeholder="Give your memory a title..." 
            style={{ width: '100%', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Poppins, sans-serif', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-dark)', marginBottom: '1.5rem' }}
          />
          
          <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', background: 'rgba(0,0,0,0.1)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
              <Calendar size={16} /> Today
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', background: 'rgba(0,0,0,0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', cursor: 'pointer' }}>
              <MapPin size={16} /> Add Location
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', background: 'rgba(0,0,0,0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', cursor: 'pointer' }}>
              <Smile size={16} /> Add Mood
            </div>
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', background: 'rgba(0,0,0,0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', cursor: 'pointer' }}>
              <ImageIcon size={16} /> Attach Cover
            </div>
          </div>

          <textarea 
            placeholder="Start writing your story..."
            style={{ width: '100%', minHeight: '400px', fontSize: '1.15rem', lineHeight: 1.8, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-dark)', resize: 'none' }}
          ></textarea>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard animate-fade-up">
      {/* Header & Hero */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 3rem', background: 'var(--surface-light)', border: '1px solid var(--border-light)', marginBottom: '2.5rem' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none' }}></div>
        
        <div className="flex justify-between items-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '600px' }}>
            <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--primary-color)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              <BookOpen size={16} /> Travel Diary
            </div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-dark)' }}>
              Document your <span style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>journey.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '0' }}>
              "Travel makes one modest. You see what a tiny place you occupy in the world."
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button className="btn btn-primary" onClick={() => setIsCreating(true)} style={{ padding: '0.85rem 1.75rem', borderRadius: '2rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}>
              <PenTool size={18} /> Write Entry
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-6" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div className="flex items-center gap-2" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', marginRight: '0.5rem' }}>
            <Filter size={16} />
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

        <div className="flex items-center gap-3" style={{ background: 'var(--input-bg)', padding: '0.4rem', borderRadius: '3rem', border: '1px solid var(--border-light)', width: '300px' }}>
          <Search size={18} className="text-muted" style={{ marginLeft: '1rem' }} />
          <input 
            type="text" 
            placeholder="Search notes..." 
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-dark)', fontSize: '0.95rem', padding: '0.5rem 0' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="card text-center" style={{ padding: '6rem 2rem', background: 'var(--surface-light)', border: '1px dashed var(--border-light)', marginTop: '2rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <BookOpen size={32} color="var(--primary-color)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your adventures deserve stories</h3>
          <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
            You haven't written any notes yet. Start documenting your journey, save important plans, or write down your favorite memories.
          </p>
          <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
            Create First Note
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredNotes.map(note => (
            <div 
              key={note.id} 
              className="card" 
              style={{ 
                padding: '0', 
                background: 'var(--surface-light)', 
                border: '1px solid var(--border-light)', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              {note.image && (
                <div style={{ height: '140px', width: '100%', backgroundImage: `url(${note.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                    <span style={{ fontSize: '1.1rem' }}>{note.moodEmoji}</span>
                  </div>
                </div>
              )}
              
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {!note.image && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {note.category}
                    </div>
                    <span style={{ fontSize: '1.5rem' }}>{note.moodEmoji}</span>
                  </div>
                )}
                
                {note.image && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {note.category}
                    </span>
                  </div>
                )}

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.3, color: 'var(--text-dark)' }}>{note.title}</h3>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {note.preview}
                </p>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> {note.date}
                  </div>
                  {note.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} /> {note.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
