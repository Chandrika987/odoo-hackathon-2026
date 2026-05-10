import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { Mail, Lock, Eye, EyeOff, Compass, Star } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    const { error } = await loginUser(email, password);
    setLoading(false);
    
    if (error) {
      setErrorMsg(error.message || 'Failed to sign in');
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1000,
      backgroundColor: '#0f172a',
      fontFamily: 'Poppins, sans-serif'
    }}>
      {/* Left Side: Image & Branding */}
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.8)), url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '0.5rem', backdropFilter: 'blur(4px)' }}>
            <Compass size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>TravelLoop</h2>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.8, margin: 0, fontWeight: 600 }}>PREMIUM PLANNER</p>
          </div>
        </div>

        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0', maxWidth: '600px' }}>
            "The journey itself is the destination.<br/>Experience travel planning redefined."
          </h1>
        </div>
      </div>

      {/* Right Side: Form */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        backgroundColor: '#0b1120',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
          <ThemeToggle style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }} />
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem', color: '#f8fafc' }}>Welcome back</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Enter your credentials to access your luxury travel dashboard.</p>
        </div>

        {errorMsg && (
          <div style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            color: '#ef4444', 
            padding: '0.75rem', 
            borderRadius: '0.5rem', 
            marginBottom: '1.5rem', 
            fontSize: '0.9rem',
            textAlign: 'center',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#64748b' }}>
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                style={{ 
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  color: 'white',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="name@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Password</label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.8rem', color: '#38bdf8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Forgot password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#64748b' }}>
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                style={{ 
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 2.75rem',
                  color: 'white',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <div 
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '1rem', color: '#64748b', cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              height: '3rem', 
              backgroundColor: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem', 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.39)'
            }} 
            disabled={loading}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0284c7'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0ea5e9'}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
