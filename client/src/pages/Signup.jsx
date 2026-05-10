import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { MapPin, Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
    match: false
  });

  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password !== '' && password === confirmPassword
    });
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validations.length || !validations.uppercase || !validations.number || !validations.special || !validations.match) {
      setErrorMsg("Please ensure all password requirements are met.");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    const { data, error } = await registerUser(email, password, name);
    setLoading(false);
    
    if (error) {
      setErrorMsg(error.message || 'Failed to create account');
    } else {
      setSuccessMsg('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  const ValidationItem = ({ isValid, text }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isValid ? '#10B981' : '#94a3b8', fontSize: '0.85rem', transition: 'all 0.3s ease' }}>
      {isValid ? <CheckCircle2 size={14} /> : <Circle size={14} />}
      <span>{text}</span>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '2rem',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
        <ThemeToggle style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)' }} />
      </div>

      <div className="card animate-fade-up" style={{
        maxWidth: '500px',
        width: '100%',
        padding: '3rem 2.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.80)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            color: 'white',
            marginBottom: '1.25rem',
            boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
          }}>
            <MapPin size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif' }}>Join TravelLoop</h2>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>Create your premium account to start planning.</p>
        </div>

        {errorMsg && (
          <div style={{ 
            backgroundColor: '#fef2f2', 
            color: '#ef4444', 
            padding: '0.75rem', 
            borderRadius: '0.5rem', 
            marginBottom: '1.5rem', 
            fontSize: '0.9rem',
            textAlign: 'center',
            border: '1px solid #fca5a5'
          }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ 
            backgroundColor: '#f0fdf4', 
            color: '#16a34a', 
            padding: '0.75rem', 
            borderRadius: '0.5rem', 
            marginBottom: '1.5rem', 
            fontSize: '0.9rem',
            textAlign: 'center',
            border: '1px solid #86efac'
          }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: '#334155', fontWeight: 600 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#94a3b8' }}>
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: '#334155', fontWeight: 600 }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#94a3b8' }}>
                  <Phone size={18} />
                </div>
                <input 
                  type="tel" 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="+1 234 567 890"
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ color: '#334155', fontWeight: 600 }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#94a3b8' }}>
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }}
                placeholder="you@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: '#334155', fontWeight: 600 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#94a3b8' }}>
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  placeholder="••••••••"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <div 
                  style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '1rem', color: '#94a3b8', cursor: 'pointer' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: '#334155', fontWeight: 600 }}>Confirm</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#94a3b8' }}>
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="••••••••"
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(248,250,252,0.5)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
            <ValidationItem isValid={validations.length} text="8+ characters" />
            <ValidationItem isValid={validations.uppercase} text="1 uppercase letter" />
            <ValidationItem isValid={validations.number} text="1 number" />
            <ValidationItem isValid={validations.special} text="1 special character" />
            <ValidationItem isValid={validations.match} text="Passwords match" />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              height: '3.25rem', 
              fontSize: '1.05rem', 
            }} 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Premium Account'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.95rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>
            Log in instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
