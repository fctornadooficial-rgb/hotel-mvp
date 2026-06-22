import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lang, setLang] = useState('en');
  const messagesEndRef = useRef(null);

  // Языки для чата
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  // Приветственные сообщения на разных языках
  const welcomeMessages = {
    en: "👋 Hello! I'm your AI assistant. How can I help you with your stay at Mövenpick Hotel?",
    ru: '👋 Привет! Я ваш AI-помощник. Чем могу помочь вам в Mövenpick Hotel?',
    zh: '👋 你好！我是您的AI助手。关于Mövenpick酒店，我能帮您什么？',
    ja: '👋 こんにちは！私はAIアシスタントです。Mövenpick Hotelについて何かお手伝いできますか？',
    ko: '👋 안녕하세요! 저는 AI 도우미입니다. Mövenpick Hotel에 대해 무엇을 도와드릴까요?',
    ar: '👋 مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك في فندق موفنبيك؟',
    vi: '👋 Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn tại Mövenpick Hotel?',
    th: '👋 สวัสดี! ฉันคือผู้ช่วย AI มีอะไรให้ฉันช่วยคุณที่ Mövenpick Hotel ไหม?',
    es: '👋 ¡Hola! Soy tu asistente AI. ¿Cómo puedo ayudarte en Mövenpick Hotel?',
    fr: '👋 Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider à Mövenpick Hotel ?',
    de: '👋 Hallo! Ich bin dein KI-Assistent. Wie kann ich dir im Mövenpick Hotel helfen?',
    it: '👋 Ciao! Sono il tuo assistente AI. Come posso aiutarti al Mövenpick Hotel?'
  };

  // Ответы на частые вопросы на разных языках
  const responses = {
    en: {
      services: 'We offer: BBQ Dinner by the Sea, SPA Relax Package, Airport Transfer, Kids Club Activities, and Romantic Dinner/Tour.',
      hours: 'Our services are available from 8:00 AM to 10:00 PM daily.',
      location: 'We are located at 55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, Thailand.',
      spa: 'Our SPA offers traditional Thai massage, aromatic oils, and herbal baths.',
      bbq: 'BBQ Dinner by the Sea includes fresh seafood and stunning sunset views.',
      transfer: 'We provide premium vehicles with professional drivers for airport transfer.',
      kids: 'Kids Club offers fun games, creative workshops, and supervised play.',
      romantic: 'Romantic Dinner includes candlelight dinner under the stars.',
      price: 'Prices vary by service. BBQ: 1,500 THB, SPA: 2,000 THB, Transfer: 1,200 THB, Kids: 500 THB, Romantic: 2,500 THB.',
      booking: 'You can book services through our website or by scanning the QR code.',
      default: "I'm not sure about that. Please contact our front desk or ask a different question. We offer: BBQ, SPA, Transfer, Kids Club, and Romantic Dinner.",
    },
    ru: {
      services: 'Мы предлагаем: BBQ ужин у моря, SPA релакс-пакет, трансфер из аэропорта, детский клуб и романтический ужин/тур.',
      hours: 'Наши услуги доступны ежедневно с 8:00 до 22:00.',
      location: 'Мы находимся по адресу: 55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, Таиланд.',
      spa: 'Наш SPA предлагает традиционный тайский массаж, ароматические масла и травяные ванны.',
      bbq: 'BBQ ужин у моря включает свежие морепродукты и потрясающий вид на закат.',
      transfer: 'Мы предоставляем премиальные автомобили с профессиональными водителями.',
      kids: 'Детский клуб предлагает весёлые игры, творческие мастерские и присмотр.',
      romantic: 'Романтический ужин включает ужин при свечах под звёздами.',
      price: 'Цены зависят от услуги. BBQ: 1500 THB, SPA: 2000 THB, Трансфер: 1200 THB, Детский: 500 THB, Романтический: 2500 THB.',
      booking: 'Вы можете забронировать услуги через наш сайт или по QR-коду.',
      default: 'Я не уверен в этом. Пожалуйста, свяжитесь с ресепшеном или задайте другой вопрос. У нас есть: BBQ, SPA, Трансфер, Детский клуб и Романтический ужин.',
    },
    // Добавьте другие языки по аналогии...
  };

  useEffect(() => {
    // Приветственное сообщение при открытии
    if (isOpen && messages.length === 0) {
      const welcome = welcomeMessages[lang] || welcomeMessages.en;
      setMessages([{ text: welcome, sender: 'bot', timestamp: new Date() }]);
    }
  }, [isOpen, lang]);

  useEffect(() => {
    // Автоматическая прокрутка вниз
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    const langResponses = responses[lang] || responses.en;

    // Ищем ключевые слова в сообщении
    if (msg.includes('service') || msg.includes('услуг') || msg.includes('сервис') || msg.includes('service') || msg.includes('dịch vụ')) {
      return langResponses.services;
    }
    if (msg.includes('hour') || msg.includes('время') || msg.includes('работа') || msg.includes('time') || msg.includes('giờ')) {
      return langResponses.hours;
    }
    if (msg.includes('location') || msg.includes('адрес') || msg.includes('находится') || msg.includes('address') || msg.includes('địa chỉ')) {
      return langResponses.location;
    }
    if (msg.includes('spa') || msg.includes('массаж') || msg.includes('massage')) {
      return langResponses.spa;
    }
    if (msg.includes('bbq') || msg.includes('grill') || msg.includes('барбекю') || msg.includes('шашлык')) {
      return langResponses.bbq;
    }
    if (msg.includes('transfer') || msg.includes('трансфер') || msg.includes('аэропорт') || msg.includes('airport') || msg.includes('sân bay')) {
      return langResponses.transfer;
    }
    if (msg.includes('kids') || msg.includes('child') || msg.includes('детский') || msg.includes('ребенок') || msg.includes('children')) {
      return langResponses.kids;
    }
    if (msg.includes('romantic') || msg.includes('романтический') || msg.includes('candle') || msg.includes('свечи') || msg.includes('lãng mạn')) {
      return langResponses.romantic;
    }
    if (msg.includes('price') || msg.includes('цена') || msg.includes('стоимость') || msg.includes('cost') || msg.includes('giá')) {
      return langResponses.price;
    }
    if (msg.includes('book') || msg.includes('бронирование') || msg.includes('заказ') || msg.includes('reservation') || msg.includes('đặt')) {
      return langResponses.booking;
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('привет') || msg.includes('здравствуйте') || msg.includes('chào')) {
      return welcomeMessages[lang] || welcomeMessages.en;
    }

    return langResponses.default;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Добавляем сообщение пользователя
    const userMsg = { text: inputMessage, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Имитация задержки ответа бота
    setTimeout(() => {
      const response = getBotResponse(inputMessage);
      const botMsg = { text: response, sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const changeLanguage = (newLang) => {
    setLang(newLang);
    // При смене языка обновляем приветствие
    const welcome = welcomeMessages[newLang] || welcomeMessages.en;
    setMessages([{ text: welcome, sender: 'bot', timestamp: new Date() }]);
  };

  return (
    <>
      {/* Кнопка чата */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isOpen ? '#dc3545' : '#c8a86b',
          color: 'white',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {isOpen ? '✖' : '💬'}
      </button>

      {/* Окно чата */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '30px',
            width: '380px',
            height: '520px',
            maxHeight: '80vh',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9999,
            animation: 'slideUp 0.3s ease'
          }}
        >
          {/* Шапка чата */}
          <div
            style={{
              background: '#1a1a2e',
              color: 'white',
              padding: '15px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                🤖 AI Помощник
              </div>
              <div style={{ fontSize: '12px', color: '#aaa' }}>
                {languages.find(l => l.code === lang)?.flag || '🇬🇧'} {languages.find(l => l.code === lang)?.name || 'English'}
              </div>
            </div>
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid #555',
                borderRadius: '8px',
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '12px',
                maxWidth: '120px'
              }}
            >
              {languages.map(l => (
                <option key={l.code} value={l.code} style={{ color: '#333' }}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Сообщения */}
          <div
            style={{
              flex: 1,
              padding: '15px 20px',
              overflowY: 'auto',
              background: '#f5f5f5'
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '10px'
                }}
              >
                <div
                  style={{
                    maxWidth: '75%',
                    padding: '10px 15px',
                    borderRadius: '15px',
                    background: msg.sender === 'user' ? '#c8a86b' : 'white',
                    color: msg.sender === 'user' ? 'white' : '#333',
                    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
                    wordWrap: 'break-word'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                <div
                  style={{
                    background: 'white',
                    padding: '10px 15px',
                    borderRadius: '15px',
                    boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
                  }}
                >
                  <span style={{ animation: 'typing 1.4s infinite' }}>.</span>
                  <span style={{ animation: 'typing 1.4s infinite 0.2s' }}>.</span>
                  <span style={{ animation: 'typing 1.4s infinite 0.4s' }}>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода */}
          <div
            style={{
              padding: '15px 20px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '10px',
              flexShrink: 0,
              background: 'white'
            }}
          >
            <input
              type="text"
              placeholder="Напишите сообщение..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                flex: 1,
                padding: '10px 15px',
                border: '1px solid #e0e0e0',
                borderRadius: '25px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: '10px 20px',
                background: '#c8a86b',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Добавляем CSS анимации */}
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes typing {
            0%, 60%, 100% { opacity: 0.3; }
            30% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default ChatBot;
