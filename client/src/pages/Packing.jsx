import { useState } from 'react';
import { CheckSquare, Plus, Search, MapPin, CheckCircle2, Circle, Star, X } from 'lucide-react';
import './Dashboard.css';

const MOCK_ITEMS = [
  { id: 1, name: 'Thermal Jackets (x2)', category: 'Clothing', packed: true },
  { id: 2, name: 'Hiking Boots', category: 'Clothing', packed: false },
  { id: 3, name: 'Universal Power Adapter', category: 'Electronics', packed: true },
  { id: 4, name: 'Power Bank (20000mAh)', category: 'Electronics', packed: false },
  { id: 5, name: 'Passport & Visa Copies', category: 'Documents', packed: true },
  { id: 6, name: 'Travel Insurance Documents', category: 'Documents', packed: false },
  { id: 7, name: 'Sunscreen (SPF 50+)', category: 'Toiletries', packed: false },
  { id: 8, name: 'First Aid Kit', category: 'Medicines', packed: false },
];

const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: null },
  { id: 'clothing', name: 'Clothing', color: '#3b82f6' },
  { id: 'electronics', name: 'Electronics', color: '#a855f7' },
  { id: 'documents', name: 'Documents', color: '#eab308' },
  { id: 'toiletries', name: 'Toiletries', color: '#06b6d4' },
  { id: 'essentials', name: 'Essentials', color: '#10b981' },
  { id: 'medicines', name: 'Medicines', color: '#ef4444' }
];

const Packing = () => {
  const [items, setItems] = useState(MOCK_ITEMS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const packedCount = items.filter(i => i.packed).length;
  const totalCount = items.length;
  const progressPercent = Math.round((packedCount / totalCount) * 100) || 0;

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category.toLowerCase() === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dashboard animate-fade-up">
      {/* Header */}
      <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="flex items-center gap-3">
          <div style={{ background: 'var(--primary-color)', color: 'white', padding: '0.5rem', borderRadius: '0.75rem', display: 'flex' }}>
            <CheckSquare size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontFamily: 'Poppins, sans-serif', margin: 0, marginBottom: '0.25rem', lineHeight: 1.2 }}>Packing Checklist</h1>
            <p className="text-muted" style={{ fontSize: '1.05rem', margin: 0 }}>Stay organized and never forget travel essentials.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div style={{ position: 'relative' }}>
            <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select 
              className="form-input" 
              style={{ paddingLeft: '2.5rem', paddingRight: '2rem', width: '220px', cursor: 'pointer', appearance: 'none' }}
              defaultValue="alps"
            >
              <option value="alps">Summer in the Alps</option>
              <option value="bali">Bali Retreat</option>
            </select>
          </div>
          <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <Plus size={18} /> Add Item
          </button>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '3rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle 
              cx="60" cy="60" r="54" 
              fill="none" 
              stroke="#06b6d4" 
              strokeWidth="8" 
              strokeDasharray="339.292" 
              strokeDashoffset={339.292 - (339.292 * progressPercent) / 100}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{progressPercent}%</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.1em', marginTop: '0.25rem' }}>PACKED</span>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.75rem', color: 'white', marginBottom: '0.5rem', lineHeight: 1.2 }}>Packing in progress</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '1.5rem' }}>You have packed <strong style={{ color: 'white' }}>{packedCount}</strong> out of <strong style={{ color: 'white' }}>{totalCount}</strong> items. Keep going!</p>
          
          <div className="flex gap-4">
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1.25rem', borderRadius: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>TO PACK</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{totalCount - packedCount}</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1.25rem', borderRadius: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>PACKED</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{packedCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        
        {/* Sidebar */}
        <div>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>Categories</h3>
          
          <div className="flex flex-col" style={{ gap: '0.25rem', marginBottom: '1.5rem' }}>
            {CATEGORIES.map(cat => {
              const count = cat.id === 'all' 
                ? items.length 
                : items.filter(i => i.category.toLowerCase() === cat.id).length;
                
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 1rem',
                    borderRadius: '0.5rem',
                    background: activeCategory === cat.id ? 'var(--surface-light)' : 'transparent',
                    border: 'none',
                    color: activeCategory === cat.id ? 'var(--text-dark)' : 'var(--text-muted)',
                    fontWeight: activeCategory === cat.id ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    {cat.color && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color }}></div>}
                    {!cat.color && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>}
                    {cat.name}
                  </div>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.1)', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Smart Suggestions Box */}
          <div style={{ background: 'var(--surface-light)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid var(--border-light)' }}>
            <div className="flex items-center gap-2 mb-3" style={{ color: '#06b6d4', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
              <Star size={16} fill="currentColor" /> SMART SUGGESTIONS
            </div>
            
            <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <p style={{ margin: '0 0 0.25rem 0', fontWeight: 600, fontSize: '0.95rem' }}>Carry warm clothes for Alps.</p>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expected Temp: -2°C to 5°C</p>
              <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>+ Add to list</button>
            </div>
            
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontWeight: 600, fontSize: '0.95rem' }}>Raincoat recommended.</p>
              <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>+ Add to list</button>
            </div>
          </div>
        </div>

        {/* Checklist View */}
        <div style={{ background: 'var(--surface-light)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid var(--border-light)' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search items..." 
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingTop: '0.6rem', paddingBottom: '0.6rem', margin: 0, borderRadius: '2rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {packedCount} / {totalCount} packed
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {filteredItems.map(item => {
              const categoryColor = CATEGORIES.find(c => c.name === item.category)?.color || 'var(--primary-color)';
              return (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderBottom: '1px solid var(--border-light)',
                    transition: 'var(--transition-fast)',
                    opacity: item.packed ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleItem(item.id)} style={{ flex: 1 }}>
                    {item.packed ? (
                      <CheckCircle2 size={22} color="#06b6d4" />
                    ) : (
                      <Circle size={22} color="var(--border-light)" />
                    )}
                    <span style={{ 
                      fontSize: '1rem', 
                      fontWeight: item.packed ? 400 : 500,
                      textDecoration: item.packed ? 'line-through' : 'none',
                      color: item.packed ? 'var(--text-muted)' : 'var(--text-dark)'
                    }}>
                      {item.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span style={{ 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      color: categoryColor,
                      border: `1px solid ${categoryColor}`,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {item.category}
                    </span>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <X size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
            
            {filteredItems.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No items found. Try a different search or add a new item.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packing;
