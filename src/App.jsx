import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AdminPanel from './AdminPanel';
import { AuthProvider, useAuth } from './AuthContext';
import RegisterModal from './RegisterModal';
import GiftCard from './GiftCard';
import ChatBot from './ChatBot';
import Reviews from './Reviews';
import { getLanguage, setLanguage, getNightMode, setNightMode } from './dataService';
import { translations, languageList, getTranslation } from './translations';

// Данные услуг
const services = [
  {
    id: 1,
    nameKey: 'bbq',
    categoryKey: 'seafood',
    description: 'Luxurious beachfront BBQ with fresh seafood and stunning sunset views.',
    price: '1,500 THB',
    image: '/photo/ujin.jpg',
    features: ['Fresh seafood', 'Sunset view']
  },
  {
    id: 2,
    nameKey: 'spa',
    categoryKey: 'wellness',
    description: 'Traditional Thai massage, aromatic oils, and herbal baths for ultimate relaxation.',
    price: '2,000 THB',
    image: '/photo/spa.jpg',
    features: ['Thai massage', 'Aroma oils']
  },
  {
    id: 3,
    nameKey: 'transfer',
    categoryKey: 'transport',
    description: 'Premium vehicles with professional drivers for a seamless airport journey.',
    price: '1,200 THB',
    image: '/photo/transfer.jpeg',
    features: ['Luxury cars', '24/7 service']
  },
  {
    id: 4,
    nameKey: 'kids',
    categoryKey: 'family',
    description: 'Fun games, creative workshops, and supervised play for children of all ages.',
    price: '500 THB',
    image: '/photo/nana.jpg',
    features: ['Creative play', 'Supervised']
  },
  {
    id: 5,
    nameKey: 'romantic',
    categoryKey: 'special',
    description: 'Candlelight dinner under the stars or a curated local tour for unforgettable moments.',
    price: '2,500 THB',
    image: '/photo/romantic.jpg',
    features: ['Candlelight', 'Private tour']
  }
];

const galleryImages = [
  '/photo/XXXL.webp',
  '/photo/otel4.png',
  '/photo/otel3.png',
  '/photo/otel2.png',
  '/photo/otel.png'
];

function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [requestCode, setRequestCode] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    roomNumber: '',
    date: '',
    time: '',
    guests: 2,
    extras: '',
    comment: ''
  });

  useEffect(() => {
    const savedLang = getLanguage();
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang);
    }

    const savedNightMode = getNightMode();
    if (savedNightMode) {
      setNightMode(true);
      document.body.classList.add('night-mode');
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    setLanguage(lang);
  };

  const toggleNightMode = () => {
    const newMode = !nightMode;
    setNightMode(newMode);
    document.body.classList.toggle('night-mode');
    setNightMode(newMode);
  };

  const t = (key) => {
    return getTranslation(currentLang, key);
  };

  const generateRequestCode = () => {
    const prefix = selectedService?.nameKey?.substring(0, 3).toUpperCase() || 'REQ';
    const random = Math.floor(1000 + Math.random() * 9000);
    const room = formData.roomNumber.slice(-4) || '0000';
    return `${prefix}-${room}-${random}`;
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isBlocked = localStorage.getItem('booking_blocked') === 'true';
    if (isBlocked) {
      alert('Уважаемые гости! 💫\n\nВ настоящий момент мы временно не принимаем новые бронирования. Приносим свои извинения за доставленные неудобства. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.\n\nС уважением,\nКоманда Mövenpick Hotel');
      return;
    }

    const code = generateRequestCode();
    setRequestCode(code);
    setShowForm(false);
    setShowSuccess(true);

    const requests = JSON.parse(localStorage.getItem('hotel_requests') || '[]');
    requests.push({
      id: Date.now(),
      ...formData,
      service: selectedService,
      requestCode: code,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('hotel_requests', JSON.stringify(requests));
  };

  const handleNewRequest = () => {
    setShowSuccess(false);
    setSelectedService(null);
    setFormData({
      guestName: '',
      roomNumber: '',
      date: '',
      time: '',
      guests: 2,
      extras: '',
      comment: ''
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Hero компонент
  const HeroSection = () => (
    <section style={{
      backgroundImage: 'url(/photo/XXXL.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}></div>
      <div style={{
        position: 'relative',
        textAlign: 'center',
        color: 'white',
        padding: '20px',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          textShadow: '2px 2px 8px black'
        }}>
          {t('hero_title')}
        </h1>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          textShadow: '1px 1px 4px black'
        }}>
          {t('hero_subtitle')}
        </p>
        <a
          href="#gallery"
          style={{
            padding: '14px 35px',
            textDecoration: 'none',
            borderRadius: '50px',
            display: 'inline-block',
            backgroundColor: '#c8a86b',
            color: 'white',
            fontSize: '1.1rem'
          }}
        >
          {t('hero_btn')}
        </a>
      </div>
    </section>
  );

  // Компонент главной страницы
  const MainPage = () => {
    const { user, logout } = useAuth();

    return (
      <div className={nightMode ? 'night-mode' : ''}>
        <header className="header">
          <div className="container">
            <Link to="/" className="header__logo">MÖVENPICK</Link>

            <button
              className={`burger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span><span></span><span></span>
            </button>

            <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/">{t('nav_home')}</Link>
              <a href="#services">{t('nav_services')}</a>
              <a href="#gallery">{t('nav_gallery')}</a>
              <Link to="/gift-card">{t('nav_gift')}</Link>
              <Link to="/reviews">{t('nav_reviews')}</Link>
            </nav>

            <div className="header__actions">
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: '#c8a86b' }}>👤 {user.name}</span>
                  <button onClick={logout} style={styles.logoutBtn}>{t('logout_btn')}</button>
                </div>
              ) : (
                <button onClick={() => setShowRegister(true)} style={styles.registerBtn}>
                  {t('register_btn')}
                </button>
              )}
              <button onClick={toggleNightMode} style={styles.nightModeBtn}>
                {nightMode ? '☀️' : '🌙'}
              </button>
              <select
                className="lang-btn"
                value={currentLang}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                {languageList.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <HeroSection />

        <section className="hotel-gallery" id="gallery">
          <div className="container">
            <h2 className="hotel-gallery__title">{t('gallery_title')}</h2>
          </div>
          <div className="carousel">
            <div className="carousel__track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {galleryImages.map((img, index) => (
                <div className="carousel__slide" key={index}>
                  <img src={img} alt={`Slide ${index}`} />
                </div>
              ))}
            </div>
            <button className="carousel__btn carousel__btn--prev" onClick={prevSlide}>❮</button>
            <button className="carousel__btn carousel__btn--next" onClick={nextSlide}>❯</button>
          </div>
          <div className="carousel__dots">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`carousel__dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        <section className="services" id="services">
          <div className="container">
            <h2 className="services__title">{t('services_title')}</h2>
            <div className="services__grid">
              {services.map(service => {
                const serviceName = t('services.' + service.nameKey) || service.nameKey;
                const categoryName = t('categories.' + service.categoryKey) || service.categoryKey;

                return (
                  <div key={service.id} className="service-card">
                    <img src={service.image} alt={serviceName} className="service-card__img" />
                    <div className="service-card__body">
                      <div className="service-card__category">{categoryName}</div>
                      <h3 className="service-card__title">{serviceName}</h3>
                      <p className="service-card__desc">{service.description}</p>
                      <ul className="service-card__features">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                      <div className="service-card__footer">
                        <span className="service-card__price">{service.price}</span>
                        <button
                          className="btn btn--outline service-card__btn"
                          onClick={() => handleBookNow(service)}
                        >
                          {t('book_now')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer__grid">
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_social')}</h4>
              <div className="footer__social">
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  📺 YouTube
                </a>
              </div>
            </div>
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_services')}</h4>
              <ul className="footer__links">
                {services.map(service => {
                  const serviceName = t('services.' + service.nameKey) || service.nameKey;
                  return (
                    <li key={service.id}><a href="#">{serviceName}</a></li>
                  );
                })}
              </ul>
            </div>
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_map')}</h4>
              <p className="footer__address">{t('footer_address')}</p>
            </div>
          </div>
          <div className="footer__bottom">
            <p>{t('footer_copyright')}</p>
          </div>
        </footer>

        {showForm && (
          <div className="modal-overlay active">
            <div className="modal">
              <button className="modal__close" onClick={() => setShowForm(false)}>&times;</button>
              <h3 className="modal__title">{t('modal_title')}</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>{t('label_name')} *</label>
                  <input type="text" name="guestName" value={formData.guestName} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>{t('label_room')} *</label>
                  <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleFormChange} placeholder="e.g., 1205" required />
                </div>
                <div className="form-group">
                  <label>{t('label_service')}</label>
                  <input type="text" value={selectedService ? t('services.' + selectedService.nameKey) : ''} disabled style={{ background: '#f0f0f0' }} />
                </div>
                <div className="form-group">
                  <label>{t('label_date')} *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>{t('label_time')} *</label>
                  <input type="time" name="time" value={formData.time} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>{t('label_guests')} *</label>
                  <input type="number" name="guests" min="1" max="20" value={formData.guests} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>{t('label_extras')}</label>
                  <select name="extras" value={formData.extras} onChange={handleFormChange}>
                    <option value="">None</option>
                    <option value="Flowers">Flowers (+500 THB)</option>
                    <option value="Cake">Celebration Cake (+800 THB)</option>
                    <option value="Champagne">Champagne (+1,500 THB)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('label_comment')}</label>
                  <textarea name="comment" rows="3" value={formData.comment} onChange={handleFormChange}></textarea>
                </div>
                <button type="submit" className="btn btn--accent" style={{ width: '100%' }}>{t('generate_btn')}</button>
              </form>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-modal">
              <div className="success-icon">✓</div>
              <h2 className="success-title">{t('success_title')}</h2>
              <div className="request-code-box">
                <p className="request-code-label">{t('request_code_label')}</p>
                <div className="request-code">{requestCode}</div>
              </div>
              <div className="success-details">
                <p><strong>{t('label_service')}:</strong> {selectedService ? t('services.' + selectedService.nameKey) : ''}</p>
                <p><strong>{t('label_guests')}:</strong> {formData.guests}</p>
                <p className="instruction-text">{t('instruction_text')}</p>
              </div>
              <button onClick={handleNewRequest} className="btn btn--accent">{t('new_request_btn')}</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const styles = {
    registerBtn: {
      background: '#c8a86b',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    logoutBtn: {
      background: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '12px'
    },
    nightModeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '5px 10px'
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/dadaluba" element={<AdminPanel />} />
          <Route path="/gift-card" element={<GiftCard lang={currentLang} setLang={changeLanguage} t={t} />} />
          <Route path="/reviews" element={<Reviews lang={currentLang} t={t} />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
        <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} lang={currentLang} />
        <ChatBot />
      </Router>
    </AuthProvider>
  );
}

export default App;
