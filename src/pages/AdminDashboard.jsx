import React, { useState, useEffect } from 'react';
import { Shield, Book, Users, Settings, Plus, Edit2, Trash2, Save, X, Search, Eye, EyeOff, LogOut, GraduationCap } from 'lucide-react';
import { saveResources, loadResources, saveCategories, loadCategories, saveUsers, loadUsers } from '../services/storageService';
import CoursesManager from './CoursesManager';

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('resources');
  
  const [resources, setResources] = useState(() => {
    const saved = loadResources();
    return saved || [
      {
        id: 1,
        title: "Norme NF C 15-100",
        category: "Normes",
        description: "Installations électriques basse tension",
        url: "https://www.promotelec.com",
        visible: true,
        createdAt: "2025-01-01"
      },
      {
        id: 2,
        title: "Guide du calcul de section de câbles",
        category: "Guides",
        description: "Méthodologie pour dimensionner les conducteurs",
        url: "",
        visible: true,
        createdAt: "2025-01-02"
      }
    ];
  });

  const [users, setUsers] = useState(() => {
    const saved = loadUsers();
    return saved || [
      { id: 1, name: "Jean Dupont", email: "jean@example.com", role: "Admin", status: "Actif" },
      { id: 2, name: "Marie Martin", email: "marie@example.com", role: "Utilisateur", status: "Actif" }
    ];
  });

  const [categories, setCategories] = useState(() => {
    const saved = loadCategories();
    return saved || ["Normes", "Guides", "Schémas", "Calculs", "Sécurité", "Vidéos"];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Normes',
    description: '',
    url: '',
    visible: true
  });

  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    saveResources(resources);
  }, [resources]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const filteredResources = resources.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (!formData.title || !formData.description) return;
    
    if (editingId) {
      setResources(resources.map(r => 
        r.id === editingId ? { ...formData, id: editingId, createdAt: r.createdAt } : r
      ));
      setEditingId(null);
    } else {
      setResources([...resources, { 
        ...formData, 
        id: Date.now(), 
        createdAt: new Date().toISOString().split('T')[0]
      }]);
    }
    
    setFormData({ title: '', category: 'Normes', description: '', url: '', visible: true });
    setIsEditing(false);
  };

  const handleEdit = (resource) => {
    setFormData(resource);
    setEditingId(resource.id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const toggleVisibility = (id) => {
    setResources(resources.map(r =>
      r.id === id ? { ...r, visible: !r.visible } : r
    ));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: '', category: 'Normes', description: '', url: '', visible: true });
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const deleteCategory = (cat) => {
    if (window.confirm(`Supprimer la catégorie "${cat}" ?`)) {
      setCategories(categories.filter(c => c !== cat));
    }
  };

  const stats = {
    totalResources: resources.length,
    visibleResources: resources.filter(r => r.visible).length,
    totalUsers: users.length,
    totalCategories: categories.length
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ backgroundColor: '#4f46e5', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Shield size={32} />
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Panneau d'Administration</h1>
                <p style={{ color: '#c7d2fe', fontSize: '14px', margin: 0 }}>Bibliothèque Électricien</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', color: '#c7d2fe', margin: 0 }}>Connecté en tant que</p>
                <p style={{ fontWeight: '600', margin: 0 }}>{user?.name || 'Administrateur'}</p>
              </div>
              <button
                onClick={onLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { id: 'resources', icon: Book, label: 'Ressources' },
              { id: 'courses', icon: GraduationCap, label: 'Cours & Exercices' },
              { id: 'users', icon: Users, label: 'Utilisateurs' },
              { id: 'settings', icon: Settings, label: 'Paramètres' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px',
                  fontWeight: '500',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
                  color: activeTab === tab.id ? '#4f46e5' : '#6b7280',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Ressources totales</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4f46e5', margin: 0 }}>{stats.totalResources}</p>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Ressources visibles</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>{stats.visibleResources}</p>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Utilisateurs</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>{stats.totalUsers}</p>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Catégories</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#a855f7', margin: 0 }}>{stats.totalCategories}</p>
          </div>
        </div>

        {activeTab === 'resources' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {!isEditing ? (
              <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}
                >
                  <Plus size={20} />
                  Ajouter une ressource
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>
                  {editingId ? 'Modifier la ressource' : 'Nouvelle ressource'}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      Titre *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      placeholder="Titre de la ressource"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Catégorie *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '8px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Visibilité
                      </label>
                      <select
                        value={formData.visible ? 'visible' : 'hidden'}
                        onChange={(e) => setFormData({...formData, visible: e.target.value === 'visible'})}
                        style={{
                          width: '100%',
                          padding: '8px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      >
                        <option value="visible">Visible</option>
                        <option value="hidden">Masqué</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px',
                        minHeight: '100px'
                      }}
                      placeholder="Description détaillée de la ressource"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      URL (optionnel)
                    </label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      placeholder="https://exemple.com"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
                    <button
                      onClick={handleSubmit}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      <Save size={20} />
                      Enregistrer
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 24px',
                        backgroundColor: '#e5e7eb',
                        color: '#374151',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={20} />
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une ressource..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '44px',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <tr>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Titre</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Catégorie</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Statut</th>
                    <th style={{ padding: '12px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map(resource => (
                    <tr key={resource.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: '500', color: '#1f2937' }}>{resource.title}</div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {resource.description}
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{
                          padding: '4px 12px',
                          backgroundColor: '#eef2ff',
                          color: '#4f46e5',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {resource.category}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{resource.createdAt}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <button
                          onClick={() => toggleVisibility(resource.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: resource.visible ? '#d1fae5' : '#e5e7eb',
                            color: resource.visible ? '#065f46' : '#374151'
                          }}
                        >
                          {resource.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                          {resource.visible ? 'Visible' : 'Masqué'}
                        </button>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleEdit(resource)}
                            style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(resource.id)}
                            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <CoursesManager />
        )}

        {activeTab === 'users' && (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Gestion des utilisateurs</h2>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Nom</th>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Email</th>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Rôle</th>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#1f2937' }}>{user.name}</td>
                    <td style={{ padding: '16px 24px', color: '#6b7280' }}>{user.email}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: user.role === 'Admin' ? '#f3e8ff' : '#dbeafe',
                        color: user.role === 'Admin' ? '#7c3aed' : '#2563eb'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>Gestion des catégories</h2>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nouvelle catégorie"
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              <button
                onClick={addCategory}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                <Plus size={20} />
                Ajouter
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {categories.map(cat => (
                <div key={cat} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f9fafb',
                  padding: '12px 16px',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontWeight: '500', color: '#374151' }}>{cat}</span>
                  <button
                    onClick={() => deleteCategory(cat)}
                    style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}