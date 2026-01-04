// Service pour gérer le stockage local des données

const STORAGE_KEYS = {
  RESOURCES: 'electricien_resources',
  CATEGORIES: 'electricien_categories',
  USERS: 'electricien_users',
  COURSES: 'electricien_courses'
};

// ============ RESSOURCES ============

// Sauvegarder les ressources
export const saveResources = (resources) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des ressources:', error);
    return false;
  }
};

// Charger les ressources
export const loadResources = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors du chargement des ressources:', error);
    return null;
  }
};

// ============ CATÉGORIES ============

// Sauvegarder les catégories
export const saveCategories = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des catégories:', error);
    return false;
  }
};

// Charger les catégories
export const loadCategories = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors du chargement des catégories:', error);
    return null;
  }
};

// ============ UTILISATEURS ============

// Sauvegarder les utilisateurs
export const saveUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des utilisateurs:', error);
    return false;
  }
};

// Charger les utilisateurs
export const loadUsers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error);
    return null;
  }
};

// ============ COURS ============

// Sauvegarder les cours
export const saveCourses = (courses) => {
  try {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des cours:', error);
    return false;
  }
};

// Charger les cours
export const loadCourses = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COURSES);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors du chargement des cours:', error);
    return null;
  }
};

// ============ UTILITAIRES ============

// Convertir un fichier en Base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Effacer toutes les données
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RESOURCES);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression des données:', error);
    return false;
  }
};