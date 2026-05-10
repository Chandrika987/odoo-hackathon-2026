import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';
import Budget from './pages/Budget';
import EditTrip from './pages/EditTrip';
import MyTrips from './pages/MyTrips';
import Packing from './pages/Packing';
import Discover from './pages/Discover';
import Journal from './pages/Journal';
import Shared from './pages/Shared';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        
        <div className={isAuthenticated ? "main-content" : "full-content"}>
          {isAuthenticated && <Navbar />}
          
          <main className="page-content">
            <Routes>
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
              <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/my-trips" element={isAuthenticated ? <MyTrips /> : <Navigate to="/login" />} />
              <Route path="/discover" element={isAuthenticated ? <Discover /> : <Navigate to="/login" />} />
              <Route path="/packing" element={isAuthenticated ? <Packing /> : <Navigate to="/login" />} />
              <Route path="/journal" element={isAuthenticated ? <Journal /> : <Navigate to="/login" />} />
              <Route path="/shared" element={isAuthenticated ? <Shared /> : <Navigate to="/login" />} />
              <Route path="/create-trip" element={isAuthenticated ? <CreateTrip /> : <Navigate to="/login" />} />
              <Route path="/edit-trip/:id" element={isAuthenticated ? <EditTrip /> : <Navigate to="/login" />} />
              <Route path="/trip/:id" element={isAuthenticated ? <TripDetails /> : <Navigate to="/login" />} />
              <Route path="/budget" element={isAuthenticated ? <Budget /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;