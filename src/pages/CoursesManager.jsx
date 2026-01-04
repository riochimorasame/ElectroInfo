import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Save, X, Upload, FileText } from 'lucide-react';
import { saveCourses, loadCourses, fileToBase64 } from '../services/storageService';

export default function CoursesManager() {
  const [courses, setCourses] = useState(() => {
    const saved = loadCourses();
    return saved || [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Normes',
    level: 'Seconde',
    description: '',
    coursePdf: null,
    moreInfoUrl: '',
    exercisePdf: null,
    exerciseVisualUrl: '',
    visible: true
  });

  const categories = ['Normes', 'Guides', 'Schémas', 'Calculs', 'Sécurité', 'Installation'];
  const levels = ['Seconde', 'Première', 'Terminale', '1ère année', '2ème année', '3ème année'];

  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Seuls les fichiers PDF sont acceptés');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Le fichier est trop volumineux (max 10MB)');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setFormData({
        ...formData,
        [field]: {
          name: file.name,
          data: base64
        }
      });
    } catch (error) {
      alert('Erreur lors du chargement du fichier');
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (editingId) {
      setCourses(courses.map(c => 
        c.id === editingId ? { ...formData, id: editingId, createdAt: c.createdAt } : c
      ));
      setEditingId(null);
    } else {
      setCourses([...courses, { 
        ...formData, 
        id: Date.now(), 
        createdAt: new Date().toISOString().split('T')[0]
      }]);
    }

    setFormData({
      title: '',
      category: 'Normes',
      level: 'Seconde',
      description: '',
      coursePdf: null,
      moreInfoUrl: '',
      exercisePdf: null,
      exerciseVisualUrl: '',
      visible: true
    });
    setIsEditing(false);
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditingId(course.id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Normes',
      level: 'Seconde',
      description: '',
      coursePdf: null,
      moreInfoUrl: '',
      exercisePdf: null,
      exerciseVisualUrl: '',
      visible: true
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
          Gestion des Cours & Exercices
        </h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Ajoutez et gérez vos cours avec PDF et liens externes
        </p>
      </div>

      {!isEditing ? (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#667eea',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
          >
            <Plus size={20} />
            Ajouter un cours
          </button>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          padding: '32px'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
            {editingId ? 'Modifier le cours' : 'Nouveau cours'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Titre du cours *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Installation électrique résidentielle"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Catégorie *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '16px'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Niveau *
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '16px'
                  }}
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description du cours..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                📄 PDF du cours
              </label>
              <div style={{
                border: '2px dashed #d1d5db',
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: '#f9fafb'
              }}>
                {formData.coursePdf ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={32} color="#667eea" />
                      <span style={{ fontWeight: '600' }}>{formData.coursePdf.name}</span>
                    </div>
                    <button
                      onClick={() => setFormData({...formData, coursePdf: null})}
                      style={{
                        padding: '8px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload size={40} color="#9ca3af" style={{ margin: '0 auto 12px' }} />
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'coursePdf')}
                      style={{ display: 'none' }}
                      id="coursePdfInput"
                    />
                    <label
                      htmlFor="coursePdfInput"
                      style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Choisir un PDF
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                🔗 Lien "Plus d'explications" (optionnel)
              </label>
              <input
                type="url"
                value={formData.moreInfoUrl}
                onChange={(e) => setFormData({...formData, moreInfoUrl: e.target.value})}
                placeholder="https://exemple.com/cours-complet"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                ✏️ PDF des exercices (optionnel)
              </label>
              <div style={{
                border: '2px dashed #d1d5db',
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: '#f9fafb'
              }}>
                {formData.exercisePdf ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={32} color="#667eea" />
                      <span style={{ fontWeight: '600' }}>{formData.exercisePdf.name}</span>
                    </div>
                    <button
                      onClick={() => setFormData({...formData, exercisePdf: null})}
                      style={{
                        padding: '8px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload size={40} color="#9ca3af" style={{ margin: '0 auto 12px' }} />
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'exercisePdf')}
                      style={{ display: 'none' }}
                      id="exercisePdfInput"
                    />
                    <label
                      htmlFor="exercisePdfInput"
                      style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Choisir un PDF
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                🎯 Lien "Exercice visuel" (optionnel)
              </label>
              <input
                type="url"
                value={formData.exerciseVisualUrl}
                onChange={(e) => setFormData({...formData, exerciseVisualUrl: e.target.value})}
                placeholder="https://exemple.com/exercice-interactif"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Visibilité
              </label>
              <select
                value={formData.visible ? 'visible' : 'hidden'}
                onChange={(e) => setFormData({...formData, visible: e.target.value === 'visible'})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '16px'
                }}
              >
                <option value="visible">Visible</option>
                <option value="hidden">Masqué</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <button
                onClick={handleSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600'
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
                  padding: '12px 24px',
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  borderRadius: '10px',
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {courses.map(course => (
          <div
            key={course.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              padding: '24px',
              transition: 'transform 0.3s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{
                padding: '6px 16px',
                backgroundColor: '#eef2ff',
                color: '#667eea',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                {course.level}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(course)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#dbeafe',
                    color: '#3b82f6',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
              {course.title}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 12px 0' }}>
              {course.description}
            </p>
            <div style={{ fontSize: '13px', color: '#9ca3af' }}>
              📚 {course.category} • {course.createdAt}
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && !isEditing && (
        <div style={{
          textAlign: 'center',
          padding: '64px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <BookOpen size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', margin: '0 0 8px 0' }}>
            Aucun cours pour le moment
          </h3>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Commencez par ajouter votre premier cours !
          </p>
        </div>
      )}
    </div>
  );
}