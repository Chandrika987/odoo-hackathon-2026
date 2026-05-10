import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTripById, updateTrip } from '../services/tripService';

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    start_date: '',
    end_date: '',
    budget: '',
    description: '',
    is_public: false
  });

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    setFetching(true);
    const { data, error } = await getTripById(id);
    if (!error && data) {
      setFormData({
        title: data.title || '',
        destination: data.destination || '',
        start_date: data.start_date || '',
        end_date: data.end_date || '',
        budget: data.budget || '',
        description: data.description || '',
        is_public: data.is_public || false
      });
    } else {
      alert("Failed to load trip details. Perhaps it was deleted?");
      navigate('/');
    }
    setFetching(false);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const tripToSave = { ...formData, budget: Number(formData.budget) };
    
    try {
      const { data, error } = await updateTrip(id, tripToSave);
      if (error) throw error;
      
      navigate('/');
    } catch (err) {
      console.error("Error updating trip:", err);
      alert("Something went wrong updating the trip.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="max-w-3xl mx-auto"><p>Loading trip data...</p></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-4">Edit Trip</h1>
      <p className="text-muted mb-4">Update the details of your upcoming adventure.</p>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Trip Title</label>
            <input type="text" name="title" className="form-input" value={formData.title} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Destination</label>
            <input type="text" name="destination" className="form-input" value={formData.destination} onChange={handleChange} required />
          </div>
          
          <div className="flex gap-4 mb-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Start Date</label>
              <input type="date" name="start_date" className="form-input" value={formData.start_date} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">End Date</label>
              <input type="date" name="end_date" className="form-input" value={formData.end_date} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Estimated Budget (₹)</label>
            <input type="number" name="budget" className="form-input" value={formData.budget} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea name="description" className="form-input" rows="4" value={formData.description} onChange={handleChange}></textarea>
          </div>
          
          <div className="form-group flex items-center gap-2">
            <input type="checkbox" name="is_public" id="is_public" checked={formData.is_public} onChange={handleChange} />
            <label htmlFor="is_public" style={{ fontWeight: 500 }}>Make this itinerary public</label>
          </div>
          
          <div className="flex gap-4 mt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrip;
