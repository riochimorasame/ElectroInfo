// Service d'authentification

const AUTH_KEY = 'electricien_auth';

// Utilisateur admin par défaut
const DEFAULT_ADMIN = {
  email: 'admin@electricien.com',
  password: 'admin123',
  name: 'Administrateur',
  role: 'Admin'
};

// Vérifier les identifiants
export const login = (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    const user = {
      email: DEFAULT_ADMIN.email,
      name: DEFAULT_ADMIN.name,
      role: DEFAULT_ADMIN.role,
      isAuthenticated: true
    };
    
    // Sauvegarder la session
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { success: true, user };
  }
  
  return { success: false, message: 'Email ou mot de passe incorrect' };
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user !== null;
};

// Obtenir l'utilisateur connecté
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};