import React, { useState } from 'react';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { login } from '../services/authService';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simuler un délai de connexion
    setTimeout(() => {
      const result = login(email, password);
      
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.message);
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '48px',
        width: '100%',
        maxWidth: '450px'
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#4f46e5',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Lock size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: '0 0 8px 0'
          }}>
            Connexion Admin
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '16px',
            margin: 0
          }}>
            Bibliothèque Électricien
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={20} color="#dc2626" />
            <span style={{ color: '#dc2626', fontSize: '14px' }}>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{
                position: 'absolute',
                left: '12px',
                top: '12px',
                color: '#9ca3af'
              }} size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@electricien.com"
                style={{
                  width: '100%',
                  paddingLeft: '44px',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{
                position: 'absolute',
                left: '12px',
                top: '12px',
                color: '#9ca3af'
              }} size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  paddingLeft: '44px',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9ca3af' : '#4f46e5',
              color: 'white',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = '#4338ca';
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = '#4f46e5';
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>

        {/* Info Box */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            margin: '0 0 8px 0',
            fontWeight: '600'
          }}>
            🔑 Identifiants par défaut :
          </p>
          <p style={{
            fontSize: '12px',
            color: '#374151',
            margin: '0 0 4px 0'
          }}>
            <strong>Email :</strong> admin@electricien.com
          </p>
          <p style={{
            fontSize: '12px',
            color: '#374151',
            margin: 0
          }}>
            <strong>Mot de passe :</strong> admin123
          </p>
        </div>
      </div>
    </div>
  );
}