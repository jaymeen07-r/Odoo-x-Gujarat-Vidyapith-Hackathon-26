import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Trips from './pages/Trips';
import Drivers from './pages/Drivers';
import Maintenance from './pages/Maintenance';
import Costs from './pages/Costs';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

// In Routes:
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Layout activePage="dashboard" userRole="manager">
      <Dashboard />
    </Layout>
  </ProtectedRoute>
} />


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route path="/dashboard" element={
          <Layout activePage="dashboard" userRole="manager">
            <Dashboard />
          </Layout>
        } />
        <Route path="/vehicles" element={
          <Layout activePage="vehicles" userRole="manager">
            <Vehicles />
          </Layout>
        } />
        <Route path="/trips" element={
          <Layout activePage="trips" userRole="dispatcher">
            <Trips />
          </Layout>
        } />
        <Route path="/drivers" element={
          <Layout activePage="drivers" userRole="safety">
            <Drivers />
          </Layout>
        } />
        <Route path="/maintenance" element={
          <Layout activePage="maintenance" userRole="maintenance">
            <Maintenance />
          </Layout>
        } />
        <Route path="/costs" element={
          <Layout activePage="costs" userRole="manager">
            <Costs />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
