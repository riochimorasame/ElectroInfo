import React, { useState, useEffect } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import PublicPage from './pages/PublicPage';
import PublicCoursesPage from './pages/PublicCoursesPage';
import { isAuthenticated, getCurrentUser, logout } from './services/authService';
import { Shield } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('public');

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getCurrentUser());
      setCurrentPage('admin');
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentPage('public');
  };

  const goToAdmin = () => {
    if (user) {
      setCurrentPage('admin');
    } else {
      setCurrentPage('login');
    }
  };

  const goToPublic = () => {
    setCurrentPage('public');
  };

  const goToCourses = () => {
    setCurrentPage('courses');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #4f46e5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6b7280' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  const FloatingAdminButton = () => (
    <button
      onClick={goToAdmin}
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.6)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.4)';
      }}
      title="Accéder à l'administration"
    >
      <Shield size={28} />
    </button>
  );

  if (currentPage === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentPage === 'admin' && user) {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  if (currentPage === 'courses') {
    return (
      <>
        <PublicCoursesPage />
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 1000
        }}>
          <button
            onClick={goToPublic}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
            }}
            title="Retour à l'accueil"
          >
            🏠
          </button>
          <FloatingAdminButton />
        </div>
      </>
    );
  }

  return (
    <>
      <PublicPage />
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 1000
      }}>
        <button
          onClick={goToCourses}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#764ba2',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(118, 75, 162, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 6px 20px rgba(118, 75, 162, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(118, 75, 162, 0.4)';
          }}
          title="Voir les cours"
        >
          🎓
        </button>
        <FloatingAdminButton />
      </div>
    </>
  );
}

export default App;