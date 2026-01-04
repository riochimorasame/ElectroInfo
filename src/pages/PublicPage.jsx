import React, { useState, useEffect } from 'react';
import { Book, Search, ExternalLink, Filter, Zap, Download, Star, TrendingUp, ArrowRight, Menu, X } from 'lucide-react';
import { loadResources, loadCategories } from '../services/storageService';

export default function PublicPage() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const allResources = loadResources() || [];
    const visibleResources = allResources.filter(r => r.visible);
    setResources(visibleResources);
    
    const cats = loadCategories() || [];
    setCategories(['Tous', ...cats]);
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: 'Ressources', value: resources.length, icon: Book },
    { label: 'Catégories', value: categories.length - 1, icon: Filter },
    { label: 'Téléchargements', value: '500+', icon: Download },
    { label: 'Satisfait', value: '98%', icon: Star }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Top Navigation Bar */}
      <nav style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={24} color="white" />
            </div>
            <span style={{
              fontSize: '22px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Électricien Pro
            </span>
          </div>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#ressources" style={{
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'color 0.3s'
            }}>
              Ressources
            </a>
            <a href="#categories" style={{
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'color 0.3s'
            }}>
              Catégories
            </a>
            <a href="#apropos" style={{
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'color 0.3s'
            }}>
              À propos
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '100px 32px',
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
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '30px',
              marginBottom: '24px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>
                🎯 Plateforme professionnelle pour électriciens
              </span>
            </div>
            
            <h1 style={{
              fontSize: '56px',
              fontWeight: '800',
              margin: '0 0 24px 0',
              lineHeight: '1.2',
              letterSpacing: '-1px'
            }}>
              Votre bibliothèque technique<br />
              nouvelle génération
            </h1>
            
            <p style={{
              fontSize: '20px',
              margin: '0 auto 40px',
              maxWidth: '700px',
              opacity: 0.95,
              lineHeight: '1.6'
            }}>
              Accédez instantanément à toutes les normes, guides et schémas électriques. 
              Une ressource complète pour vos projets professionnels.
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="#ressources" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                backgroundColor: 'white',
                color: '#667eea',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Explorer les ressources <ArrowRight size={20} />
              </a>
              
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#667eea';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.target.style.color = 'white';
              }}
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #f0f0f0',
        padding: '60px 32px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}>
                <stat.icon size={28} color="white" />
              </div>
              <div style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '15px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter Section */}
      <section id="ressources" style={{
        backgroundColor: '#f9fafb',
        padding: '60px 32px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 16px 0'
            }}>
              Explorez nos ressources
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              margin: 0
            }}>
              Trouvez rapidement ce dont vous avez besoin
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ position: 'relative' }}>
                <Search style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} size={22} />
                <input
                  type="text"
                  placeholder="Rechercher une norme, un guide, un schéma..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '56px',
                    padding: '18px 24px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '14px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                backgroundColor: '#f3f4f6',
                borderRadius: '14px',
                fontWeight: '600',
                color: '#374151',
                minWidth: '120px',
                justifyContent: 'center'
              }}>
                {filteredResources.length} résultat{filteredResources.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <Filter size={20} color="#6b7280" />
              <span style={{ color: '#6b7280', fontWeight: '500', fontSize: '15px' }}>
                Filtrer par :
              </span>
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
                  onMouseOver={(e) => {
                    if (selectedCategory !== cat) {
                      e.target.style.backgroundColor = '#f3f4f6';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedCategory !== cat) {
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 24px',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 24px',
                backgroundColor: '#f3f4f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Book size={48} color="#d1d5db" />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#374151',
                margin: '0 0 12px 0'
              }}>
                Aucune ressource trouvée
              </h3>
              <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                Essayez de modifier votre recherche ou vos filtres
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '28px'
            }}>
              {filteredResources.map(resource => (
                <div
                  key={resource.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    padding: '28px',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
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

                  <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 18px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '700',
                      letterSpacing: '0.5px'
                    }}>
                      <Star size={14} />
                      {resource.category}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: '0 0 12px 0',
                    lineHeight: '1.3'
                  }}>
                    {resource.title}
                  </h3>

                  <p style={{
                    color: '#6b7280',
                    fontSize: '15px',
                    lineHeight: '1.7',
                    margin: '0 0 20px 0'
                  }}>
                    {resource.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '20px',
                    borderTop: '1px solid #f3f4f6'
                  }}>
                    <span style={{
                      fontSize: '13px',
                      color: '#9ca3af',
                      fontWeight: '500'
                    }}>
                      📅 {resource.createdAt}
                    </span>
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 16px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: '600',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          transition: 'transform 0.3s'
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        Accéder <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        padding: '60px 32px 32px',
        marginTop: '80px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px',
            marginBottom: '48px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={24} />
                </div>
                <span style={{ fontSize: '20px', fontWeight: '700' }}>Électricien Pro</span>
              </div>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
                Votre référence professionnelle pour toutes vos ressources électriques.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Liens rapides</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }}>Accueil</a>
                <a href="#ressources" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }}>Ressources</a>
                <a href="#categories" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }}>Catégories</a>
                <a href="#apropos" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }}>À propos</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#9ca3af' }}>
                <p style={{ margin: 0 }}>📧 contact@electricienpro.com</p>
                <p style={{ margin: 0 }}>📞 +33 1 23 45 67 89</p>
                <p style={{ margin: 0 }}>📍 Paris, France</p>
              </div>
            </div>
          </div>

          <div style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
              © 2025 Électricien Pro. Tous droits réservés. | Conçu avec ❤️ pour les professionnels
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}