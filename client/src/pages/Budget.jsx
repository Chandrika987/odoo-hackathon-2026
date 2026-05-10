import { useState } from 'react';
import { 
  Wallet, Plus, MapPin, TrendingUp, AlertCircle, CheckCircle2, 
  Coffee, Train, Ticket, ArrowUpRight, ArrowDownRight, CreditCard, Activity 
} from 'lucide-react';
import './Dashboard.css';

const MOCK_EXPENSES = [
  { id: 1, name: 'Dinner at Swiss Chalet', time: 'Today, 8:45 PM', category: 'Food', icon: Coffee, amount: 3200, color: '#ef4444' },
  { id: 2, name: 'Train to Zermatt', time: 'Today, 2:15 PM', category: 'Transport', icon: Train, amount: 4500, color: '#3b82f6' },
  { id: 3, name: 'Ski Pass (3 Days)', time: 'Yesterday, 10:00 AM', category: 'Activities', icon: Ticket, amount: 12000, color: '#a855f7' },
];

const Budget = () => {
  return (
    <div className="dashboard animate-fade-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-6" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div className="flex items-center gap-3">
          <div style={{ background: 'var(--primary-color)', color: 'white', padding: '0.5rem', borderRadius: '0.75rem', display: 'flex' }}>
            <Wallet size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontFamily: 'Poppins, sans-serif', margin: 0, marginBottom: '0.25rem', lineHeight: 1.2 }}>Budget Analytics</h1>
            <p className="text-muted" style={{ fontSize: '1.05rem', margin: 0 }}>Track and manage your travel expenses elegantly.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div style={{ position: 'relative' }}>
            <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select 
              className="form-input" 
              style={{ paddingLeft: '2.5rem', paddingRight: '2rem', width: '220px', cursor: 'pointer', appearance: 'none', margin: 0 }}
              defaultValue="alps"
            >
              <option value="alps">Summer in the Alps</option>
              <option value="bali">Bali Retreat</option>
            </select>
          </div>
          <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <Plus size={18} /> Add Expense
          </button>
        </div>
      </div>

      {/* Stats Row (4 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="stat-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
              <Wallet size={18} />
            </div>
            <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Total Budget</h3>
          </div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>₹150,000</div>
        </div>
        <div className="stat-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <ArrowUpRight size={18} />
            </div>
            <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Current Spending</h3>
          </div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>₹92,450</div>
        </div>
        <div className="stat-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <ArrowDownRight size={18} />
            </div>
            <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Remaining Budget</h3>
          </div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>₹57,550</div>
        </div>
        <div className="stat-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
              <Activity size={18} />
            </div>
            <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Daily Average</h3>
          </div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>₹8,400</div>
        </div>
      </div>

      {/* Spending Pace & Insights */}
      <div className="card mb-6" style={{ background: 'var(--surface-light)', padding: '2rem', border: '1px solid var(--border-light)' }}>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.25rem 0', fontFamily: 'Poppins, sans-serif' }}>Spending Pace</h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Expected VS Actual</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1 }}>₹92,450</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
            <CheckCircle2 size={18} /> On Track
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem', overflow: 'hidden', marginBottom: '0.5rem' }}>
          <div style={{ width: '61.6%', height: '100%', background: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)', borderRadius: '1rem' }}></div>
        </div>
        <div className="flex justify-between" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '2rem' }}>
          <span>₹0</span>
          <span>61.6% Used</span>
          <span>₹150,000 Limit</span>
        </div>

        {/* Insights Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '0.25rem' }}>Food expenses are running high.</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>You are spending 25% more on food than your daily allocated limit.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <TrendingUp size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '0.25rem' }}>Transport is well within budget.</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>You saved ₹3,000 on trains by booking early.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Columns: Recent Expenses & Category Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Recent Expenses */}
        <div className="card" style={{ padding: '2rem', background: 'var(--surface-light)' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Recent Expenses</h2>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}>View All</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {MOCK_EXPENSES.map((expense) => {
              const Icon = expense.icon;
              return (
                <div key={expense.id} className="flex justify-between items-center" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                  <div className="flex items-center gap-4">
                    <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: `rgba(${expense.color === '#ef4444' ? '239,68,68' : expense.color === '#3b82f6' ? '59,130,246' : '168,85,247'}, 0.1)`, color: expense.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>{expense.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{expense.time} • {expense.category}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dark)' }}>
                    ₹{expense.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="card" style={{ padding: '2rem', background: 'var(--surface-light)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', textAlign: 'left', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.25rem 0' }}>Category Breakdown</h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Where your money goes</p>
          </div>
          
          {/* Custom SVG Donut Chart */}
          <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '2rem' }}>
            <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
              {/* Shopping (Yellow) */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#eab308" strokeWidth="25" strokeDasharray="502" strokeDashoffset="450" />
              {/* Activities (Purple) */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#a855f7" strokeWidth="25" strokeDasharray="502" strokeDashoffset="350" />
              {/* Food (Green) */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="25" strokeDasharray="502" strokeDashoffset="200" />
              {/* Transport (Blue) */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="25" strokeDasharray="502" strokeDashoffset="0" />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CreditCard size={24} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>Total</span>
            </div>
          </div>
          
          {/* Chart Legend */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex justify-between items-center" style={{ fontSize: '0.85rem' }}>
              <div className="flex items-center gap-2"><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div> Transport</div>
              <div style={{ fontWeight: 600 }}>₹35,000 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>38%</span></div>
            </div>
            <div className="flex justify-between items-center" style={{ fontSize: '0.85rem' }}>
              <div className="flex items-center gap-2"><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div> Food</div>
              <div style={{ fontWeight: 600 }}>₹28,500 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>30%</span></div>
            </div>
            <div className="flex justify-between items-center" style={{ fontSize: '0.85rem' }}>
              <div className="flex items-center gap-2"><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#a855f7' }}></div> Activities</div>
              <div style={{ fontWeight: 600 }}>₹19,000 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>21%</span></div>
            </div>
            <div className="flex justify-between items-center" style={{ fontSize: '0.85rem' }}>
              <div className="flex items-center gap-2"><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></div> Shopping</div>
              <div style={{ fontWeight: 600 }}>₹9,950 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>11%</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Budget;
