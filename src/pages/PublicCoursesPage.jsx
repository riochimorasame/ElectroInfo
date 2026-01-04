import React, { useState, useEffect } from 'react';
import { BookOpen, Filter, GraduationCap, FileText, ExternalLink, X, Eye } from 'lucide-react';
import { loadCourses } from '../services/storageService';

export default function PublicCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedLevel, setSelectedLevel] = useState('Tous');
  const [viewingPdf, setViewingPdf] = useState(null);

  const categories = ['Tous', 'Normes', 'Guides', 'Schémas', 'Calculs', 'Sécurité', 'Installation'];
  const levels = ['Tous', 'Seconde', 'Première', 'Terminale', '1ère année', '2ème année', '3ème année'];

  useEffect(() => {
    const allCourses = loadCourses() || [];
    const visibleCourses = allCourses.filter(c => c.visible);
    setCourses(visibleCourses);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'Tous' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Tous' || course.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const openPdfViewer = (pdfData, title) => {
    setViewingPdf({ data: pdfData, title });
  };

  const closePdfViewer = () => {
    setViewingPdf(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <GraduationCap size={40} />
            </div>
            
            <h1 style={{
              fontSize: '48px',
              fontWeight: '800',
              margin: '0 0 16px 0',
              letterSpacing: '-1px'
            }}>
              Cours & Exercices
            </h1>
            
            <p style={{
              fontSize: '20px',
              margin: 0,
              opacity: 0.95,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Apprenez et progressez avec nos cours structurés par niveau
            </p>
          </div>
        </div>
      </header>

      <section style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '32px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <Filter size={20} color="#6b7280" />
              <span style={{ fontWeight: '600', color: '#374151', fontSize: '16px' }}>
                Catégorie :
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    backgroundColor: selectedCategory === cat ? '#667eea' : '#ffffff',
                    color: selectedCategory === cat ? 'white' : '#374151',
                    boxShadow: selectedCategory === cat ? '0 4px 12px rgba(102, 126, 234, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <GraduationCap size={20} color="#6b7280" />
              <span style={{ fontWeight: '600', color: '#374151', fontSize: '16px' }}>
                Niveau :
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    backgroundColor: selectedLevel === level ? '#764ba2' : '#ffffff',
                    color: selectedLevel === level ? 'white' : '#374151',
                    boxShadow: selectedLevel === level ? '0 4px 12px rgba(118, 75, 162, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '12px 20px',
            backgroundColor: '#f3f4f6',
            borderRadius: '10px',
            display: 'inline-block'
          }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>
              {filteredCourses.length} cours trouvé{filteredCourses.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 32px' }}>
        {filteredCourses.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <BookOpen size={64} color="#d1d5db" style={{ margin: '0 auto 24px' }} />
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#374151',
              margin: '0 0 12px 0'
            }}>
              Aucun cours trouvé
            </h3>
            <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
              Essayez de modifier vos filtres
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '28px'
          }}>
            {filteredCourses.map(course => (
              <div
                key={course.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  padding: '28px',
                  transition: 'all 0.3s',
                  border: '2px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = '#667eea';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '0 0 0 100%',
                  opacity: 0.05
                }}></div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', position: 'relative' }}>
                  <span style={{
                    padding: '8px 18px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}>
                    {course.level}
                  </span>
                  <span style={{
                    padding: '8px 18px',
                    backgroundColor: '#eef2ff',
                    color: '#667eea',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '700'
                  }}>
                    {course.category}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {course.title}
                </h3>

                <p style={{
                  color: '#6b7280',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  margin: '0 0 24px 0'
                }}>
                  {course.description}
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingTop: '20px',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  {course.coursePdf && (
                    <button
                      onClick={() => openPdfViewer(course.coursePdf.data, `${course.title} - Cours`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px',
                        transition: 'transform 0.3s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <FileText size={18} />
                      Voir le cours PDF
                    </button>
                  )}

                  {course.moreInfoUrl ? (
                    <a
                      href={course.moreInfoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '15px',
                        transition: 'transform 0.3s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <ExternalLink size={18} />
                      Plus d'explications
                    </a>
                  ) : (
                    <div style={{
                      padding: '12px 20px',
                      backgroundColor: '#f3f4f6',
                      color: '#9ca3af',
                      borderRadius: '10px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontStyle: 'italic'
                    }}>
                      Pas plus d'explications pour ce cours
                    </div>
                  )}

                  {course.exercisePdf && (
                    <button
                      onClick={() => openPdfViewer(course.exercisePdf.data, `${course.title} - Exercices`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px',
                        transition: 'transform 0.3s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <FileText size={18} />
                      Voir les exercices PDF
                    </button>
                  )}

                  {course.exerciseVisualUrl && (
                    <a
                      href={course.exerciseVisualUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '15px',
                        transition: 'transform 0.3s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Eye size={18} />
                      Exercice visuel
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {viewingPdf && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '1200px',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                {viewingPdf.title}
              </h3>
              <button
                onClick={closePdfViewer}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <iframe
                src={viewingPdf.data}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}