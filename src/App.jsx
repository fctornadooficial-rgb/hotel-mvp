import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AdminPanel from './AdminPanel';
import { AuthProvider, useAuth } from './AuthContext';
import RegisterModal from './RegisterModal';
import GiftCard from './GiftCard';

// 7 языков: en, ru, zh, ja, ko, ar, vi
const translations = {
  en: {
    nav_home: 'Home', nav_services: 'Services', hero_title: 'Welcome to Mövenpick Na Jomtien Siam Pattaya',
    hero_subtitle: 'Discover restaurants, spa, transfers and special experiences in one place.',
    hero_btn: 'Explore Hotel', gallery_title: 'Discover Our Hotel', services_title: 'Our Premium Services',
    book_now: 'Book Now', footer_social: 'Follow Us', footer_services: 'Our Services', footer_map: 'Find Us',
    modal_title: 'Booking Request', label_name: 'Guest Name', label_room: 'Room Number', label_service: 'Selected Service',
    label_date: 'Date', label_time: 'Time', label_guests: 'Number of Guests', label_extras: 'Additional Services',
    label_comment: 'Comment', generate_btn: 'Generate Request Code', success_title: 'Request Generated Successfully!',
    request_code_label: 'Your Request Code:', instruction_text: 'Please save this code. Show it to our staff when using the service.',
    new_request_btn: 'Make Another Request'
  },
  ru: {
    nav_home: 'Главная', nav_services: 'Услуги', hero_title: 'Добро пожаловать в Mövenpick Na Jomtien Siam Pattaya',
    hero_subtitle: 'Рестораны, спа, трансферы и особые впечатления в одном месте.',
    hero_btn: 'Исследовать отель', gallery_title: 'Откройте наш отель', services_title: 'Наши премиум-услуги',
    book_now: 'Заказать', footer_social: 'Мы в соцсетях', footer_services: 'Наши услуги', footer_map: 'Нас найти',
    modal_title: 'Заявка на бронирование', label_name: 'Имя гостя', label_room: 'Номер комнаты', label_service: 'Выбранная услуга',
    label_date: 'Дата', label_time: 'Время', label_guests: 'Количество гостей', label_extras: 'Дополнительные услуги',
    label_comment: 'Комментарий', generate_btn: 'Сгенерировать код', success_title: 'Запрос успешно создан!',
    request_code_label: 'Ваш код запроса:', instruction_text: 'Сохраните этот код. Покажите его персоналу при использовании услуги.',
    new_request_btn: 'Создать новый запрос'
  },
  zh: {
    nav_home: '首页', nav_services: '服务', hero_title: '欢迎来到 Mövenpick Na Jomtien Siam Pattaya',
    hero_subtitle: '探索餐厅、水疗、接送和特别体验。',
    hero_btn: '探索酒店', gallery_title: '发现我们的酒店', services_title: '我们的尊享服务',
    book_now: '立即预订', footer_social: '关注我们', footer_services: '我们的服务', footer_map: '位置',
    modal_title: '预订请求', label_name: '客人姓名', label_room: '房间号码', label_service: '选择的服务',
    label_date: '日期', label_time: '时间', label_guests: '客人数量', label_extras: '附加服务',
    label_comment: '备注', generate_btn: '生成请求代码', success_title: '请求成功生成！',
    request_code_label: '您的请求代码：', instruction_text: '请保存此代码。使用时请向工作人员出示。',
    new_request_btn: '创建新请求'
  },
  ja: {
    nav_home: 'ホーム', nav_services: 'サービス', hero_title: 'Mövenpick Na Jomtien Siam Pattaya へようこそ',
    hero_subtitle: 'レストラン、スパ、送迎、特別な体験を一か所で。',
    hero_btn: 'ホテルを探索', gallery_title: 'ホテルを見る', services_title: 'プレミアムサービス',
    book_now: '予約する', footer_social: 'SNS', footer_services: 'サービス', footer_map: '場所',
    modal_title: '予約リクエスト', label_name: 'ゲスト名', label_room: '部屋番号', label_service: '選択したサービス',
    label_date: '日付', label_time: '時間', label_guests: 'ゲスト数', label_extras: '追加サービス',
    label_comment: 'コメント', generate_btn: 'コードを生成', success_title: 'リクエストが生成されました！',
    request_code_label: 'リクエストコード：', instruction_text: 'このコードを保存してください。サービス利用時にスタッフに提示してください。',
    new_request_btn: '新しいリクエスト'
  },
  ko: {
    nav_home: '홈', nav_services: '서비스', hero_title: 'Mövenpick Na Jomtien Siam Pattaya에 오신 것을 환영합니다',
    hero_subtitle: '레스토랑, 스파, 교통편 및 특별 경험을 한곳에서.',
    hero_btn: '호텔 둘러보기', gallery_title: '호텔 둘러보기', services_title: '프리미엄 서비스',
    book_now: '예약하기', footer_social: '팔로우', footer_services: '서비스', footer_map: '위치',
    modal_title: '예약 요청', label_name: '고객명', label_room: '객실 번호', label_service: '선택한 서비스',
    label_date: '날짜', label_time: '시간', label_guests: '인원 수', label_extras: '추가 서비스',
    label_comment: '요청사항', generate_btn: '코드 생성', success_title: '요청이 생성되었습니다!',
    request_code_label: '요청 코드:', instruction_text: '이 코드를 저장하세요. 서비스 이용 시 직원에게 제시하세요.',
    new_request_btn: '새 요청 만들기'
  },
  ar: {
    nav_home: 'الرئيسية', nav_services: 'الخدمات', hero_title: 'مرحباً بكم في موفنبيك نا جومتين سيام باتايا',
    hero_subtitle: 'اكتشف المطاعم والسبا والتنقلات والتجارب المميزة في مكان واحد.',
    hero_btn: 'استكشف الفندق', gallery_title: 'اكتشف فندقنا', services_title: 'خدماتنا المميزة',
    book_now: 'احجز الآن', footer_social: 'تابعنا', footer_services: 'خدماتنا', footer_map: 'موقعنا',
    modal_title: 'طلب حجز', label_name: 'اسم الضيف', label_room: 'رقم الغرفة', label_service: 'الخدمة المختارة',
    label_date: 'التاريخ', label_time: 'الوقت', label_guests: 'عدد الضيوف', label_extras: 'خدمات إضافية',
    label_comment: 'تعليق', generate_btn: 'إنشاء رمز الطلب', success_title: 'تم إنشاء الطلب بنجاح!',
    request_code_label: 'رمز طلبك:', instruction_text: 'يرجى حفظ هذا الرمز. أظهره لموظفينا عند استخدام الخدمة.',
    new_request_btn: 'تقديم طلب آخر'
  },
  vi: {
    nav_home: 'Trang chủ', nav_services: 'Dịch vụ', hero_title: 'Chào mừng đến Mövenpick Na Jomtien Siam Pattaya',
    hero_subtitle: 'Khám phá nhà hàng, spa, đưa đón và trải nghiệm đặc biệt trong một nơi.',
    hero_btn: 'Khám phá Khách sạn', gallery_title: 'Khám phá Khách sạn của Chúng tôi', services_title: 'Dịch vụ Cao cấp của Chúng tôi',
    book_now: 'Đặt ngay', footer_social: 'Theo dõi Chúng tôi', footer_services: 'Dịch vụ của Chúng tôi', footer_map: 'Tìm Chúng tôi',
    modal_title: 'Yêu cầu Đặt phòng', label_name: 'Tên Khách', label_room: 'Số Phòng', label_service: 'Dịch vụ Đã chọn',
    label_date: 'Ngày', label_time: 'Giờ', label_guests: 'Số lượng Khách', label_extras: 'Dịch vụ Bổ sung',
    label_comment: 'Bình luận', generate_btn: 'Tạo Mã Yêu cầu', success_title: 'Yêu cầu Đã được Tạo Thành công!',
    request_code_label: 'Mã Yêu cầu của Bạn:', instruction_text: 'Vui lòng lưu mã này. Xuất trình cho nhân viên khi sử dụng dịch vụ.',
    new_request_btn: 'Tạo Yêu cầu Khác'
  }
};

// Данные услуг
const services = [
  {
    id: 1,
    name: 'BBQ Dinner by the Sea',
    category: 'Seafood & Grill',
    description: 'Luxurious beachfront BBQ with fresh seafood and stunning sunset views.',
    price: '1,500 THB',
    image: '/photo/ujin.jpg',
    features: ['Fresh seafood', 'Sunset view']
  },
  {
    id: 2,
    name: 'SPA Relax Package',
    category: 'Wellness',
    description: 'Traditional Thai massage, aromatic oils, and herbal baths for ultimate relaxation.',
    price: '2,000 THB',
    image: '/photo/spa.jpg',
    features: ['Thai massage', 'Aroma oils']
  },
  {
    id: 3,
    name: 'Airport Transfer',
    category: 'Transport',
    description: 'Premium vehicles with professional drivers for a seamless airport journey.',
    price: '1,200 THB',
    image: '/photo/transfer.jpeg',
    features: ['Luxury cars', '24/7 service']
  },
  {
    id: 4,
    name: 'Kids Club Activities',
    category: 'Family',
    description: 'Fun games, creative workshops, and supervised play for children of all ages.',
    price: '500 THB',
    image: '/photo/nana.jpg',
    features: ['Creative play', 'Supervised']
  },
  {
    id: 5,
    name: 'Romantic Dinner / Tour',
    category: 'Special',
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

// 7 языков для отображения
const languageList = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
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
    const savedLang = localStorage.getItem('ml');
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang);
    }
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('ml', lang);
  };

  const t = (key) => translations[currentLang]?.[key] || translations.en[key];

  const generateRequestCode = () => {
    const prefix = selectedService?.name.substring(0, 3).toUpperCase() || 'REQ';
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
      <div>
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
  <a href="#gallery">Gallery</a>
  <Link to="/gift-card">🎁 Подарочные карты</Link>
  {/* Удали эту строку: <Link to="/dadaluba" style={{ color: '#c8a86b' }}>Admin</Link> */}
</nav>
            
            <div className="header__actions">
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: '#c8a86b' }}>👤 {user.name}</span>
                  <button onClick={logout} style={styles.logoutBtn}>Выйти</button>
                </div>
              ) : (
                <button onClick={() => setShowRegister(true)} style={styles.registerBtn}>
                  🔐 Регистрация
                </button>
              )}
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
              {services.map(service => (
                <div key={service.id} className="service-card">
                  <img src={service.image} alt={service.name} className="service-card__img" />
                  <div className="service-card__body">
                    <div className="service-card__category">{service.category}</div>
                    <h3 className="service-card__title">{service.name}</h3>
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
              ))}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer__grid">
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_social')}</h4>
              <div className="footer__social">
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">📺 YouTube</a>
              </div>
            </div>
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_services')}</h4>
              <ul className="footer__links">
                {services.map(service => (
                  <li key={service.id}><a href="#">{service.name}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_map')}</h4>
              <p className="footer__address">55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, Thailand</p>
            </div>
          </div>
          <div className="footer__bottom">
            <p>© 2025 Mövenpick Hotel. All rights reserved.</p>
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
                  <input type="text" value={selectedService?.name} disabled style={{ background: '#f0f0f0' }} />
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
                <p><strong>{t('label_service')}:</strong> {selectedService?.name}</p>
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
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/dadaluba" element={<AdminPanel />} />
          <Route path="/gift-card" element={<GiftCard />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
        <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
      </Router>
    </AuthProvider>
  );
}

export default App;