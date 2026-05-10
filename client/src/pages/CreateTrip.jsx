import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../services/tripService';
import { MapPin, Calendar, IndianRupee, Image as ImageIcon, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    start_date: '',
    end_date: '',
    budget: '',
    description: '',
    image: '',
    is_public: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    
    // Convert budget to number
    const tripToSave = { ...formData, budget: Number(formData.budget) };
    
    try {
      const { data, error } = await createTrip(tripToSave);
      if (error) throw error;
      
      navigate('/');
    } catch (err) {
      console.error("Error creating trip:", err);
      alert("Something went wrong while creating the trip.");
    } finally {
      setLoading(false);
    }
  };

  const renderProgress = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', gap: '1rem' }}>
        {[1, 2, 3].map((num) => (
          <div key={num} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700,
              background: step >= num ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)' : 'var(--border-light)',
              color: step >= num ? 'white' : 'var(--text-muted)',
              transition: 'all 0.4s ease'
            }}>
              {step > num ? <CheckCircle size={18} /> : num}
            </div>
            {num < 3 && (
              <div style={{ 
                width: '60px', height: '3px', margin: '0 0.5rem',
                background: step > num ? 'var(--primary-color)' : 'var(--border-light)',
                transition: 'all 0.4s ease'
              }}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-up" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Craft Your Journey
        </h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>Let's build a premium itinerary for your next adventure.</p>
      </div>
      
      {renderProgress()}

      <div className="card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background blur */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin className="text-primary" /> Where are we going?
              </h2>
              <div className="form-group">
                <label className="form-label">Destination</label>
                <input type="text" name="destination" className="form-input" style={{ fontSize: '1.25rem', padding: '1.25rem' }} placeholder="e.g. Kyoto, Japan" value={formData.destination} onChange={handleChange} required autoFocus />
              </div>
              <div className="form-group">
                <label className="form-label">Trip Title</label>
                <input type="text" name="title" className="form-input" placeholder="e.g. Autumn in Kyoto" value={formData.title} onChange={handleChange} required />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar className="text-primary" /> When and how much?
              </h2>
              <div className="flex gap-6 mb-2">
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Start Date</label>
                  <input type="date" name="start_date" className="form-input" value={formData.start_date} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">End Date</label>
                  <input type="date" name="end_date" className="form-input" value={formData.end_date} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group mt-4">
                <label className="form-label flex items-center gap-2"><IndianRupee size={18}/> Estimated Budget (₹)</label>
                <input type="number" name="budget" className="form-input" style={{ fontSize: '1.25rem' }} placeholder="2500" value={formData.budget} onChange={handleChange} required />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ImageIcon className="text-primary" /> The finer details
              </h2>
              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input type="url" name="image" className="form-input" placeholder="https://images.unsplash.com/..." value={formData.image} onChange={handleChange} />
                <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Provide a beautiful Unsplash image URL for your trip cover.</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea name="description" className="form-input" rows="4" placeholder="What are your goals for this trip?" value={formData.description} onChange={handleChange}></textarea>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(79, 70, 229, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                <input type="checkbox" name="is_public" id="is_public" style={{ width: '20px', height: '20px', accentColor: 'var(--primary-color)' }} checked={formData.is_public} onChange={handleChange} />
                <label htmlFor="is_public" style={{ fontWeight: 600, color: 'var(--text-dark)', cursor: 'pointer' }}>Make this itinerary public</label>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
            {step > 1 ? (
              <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={18} /> Back
              </button>
            ) : <div></div>}
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {step < 3 ? (
                <>Next Step <ArrowRight size={18} /></>
              ) : loading ? (
                'Creating Journey...'
              ) : (
                'Finalize Journey'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
