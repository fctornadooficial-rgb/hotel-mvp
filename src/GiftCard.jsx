import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const GiftCard = ({ lang, setLang, t }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [giftData, setGiftData] = useState({
    amount: '1000',
    recipientName: '',
    recipientEmail: '',
    message: '',
    deliveryDate: '',
    cardType: 'digital',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryPostalCode: '',
    deliveryCountry: 'Thailand'
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [giftCode, setGiftCode] = useState('');

  // Список языков для переключения
  const languageList = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
  ];

  const amounts = [
    { value: '500', label: '500 THB', icon: '🎁' },
    { value: '1000', label: '1000 THB', icon: '🎉' },
    { value: '2000', label: '2000 THB', icon: '🌟' },
    { value: '5000', label: '5000 THB', icon: '💎' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGiftData(prev => ({ ...prev, [name]: value }));
  };

  const generateGiftCode = () => {
    const prefix = 'GIFT';
    const random = Math.floor(100000 + Math.random() * 900000);
    const date = new Date().getFullYear();
    return `${prefix}-${random}-${date}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert(t('please_login') || 'Пожалуйста, сначала зарегистрируйтесь!');
      return;
    }

    if (giftData.cardType === 'physical') {
      if (!giftData.deliveryAddress || !giftData.deliveryCity) {
        alert(t('please_address') || 'Пожалуйста, укажите адрес доставки для физической карты');
        return;
      }
    }

    const code = generateGiftCode();
    setGiftCode(code);
    
    const giftOrders = JSON.parse(localStorage.getItem('gift_orders') || '[]');
    giftOrders.push({
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      ...giftData,
      giftCode: code,
      status: 'active',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('gift_orders', JSON.stringify(giftOrders));
    
    setOrderComplete(true);
  };

  const resetForm = () => {
    setStep(1);
    setOrderComplete(false);
    setGiftData({
      amount: '1000',
      recipientName: '',
      recipientEmail: '',
      message: '',
      deliveryDate: '',
      cardType: 'digital',
      deliveryAddress: '',
      deliveryCity: '',
      deliveryPostalCode: '',
      deliveryCountry: 'Thailand'
    });
    setGiftCode('');
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.icon}>🔐</div>
          <h2 style={styles.title}>{t('register_required') || 'Требуется регистрация'}</h2>
          <p style={styles.text}>{t('please_register') || 'Пожалуйста, зарегистрируйтесь, чтобы заказать подарочную карту'}</p>
          <Link to="/" style={styles.registerBtn}>{t('register_btn') || 'Зарегистрироваться'}</Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={styles.successTitle}>{t('order_complete') || 'Подарочная карта заказана!'}</h2>
          <div style={styles.codeBox}>
            <p style={styles.codeLabel}>{t('gift_code') || 'Код подарочной карты:'}</p>
            <div style={styles.code}>{giftCode}</div>
          </div>
          <div style={styles.orderDetails}>
            <p><strong>{t('amount') || 'Сумма'}:</strong> {giftData.amount} THB</p>
            <p><strong>{t('recipient') || 'Получатель'}:</strong> {giftData.recipientName}</p>
            <p><strong>{t('card_type') || 'Тип карты'}:</strong> {giftData.cardType === 'digital' ? (t('digital') || 'Цифровая') : (t('physical') || 'Физическая')}</p>
            {giftData.cardType === 'physical' && (
              <>
                <p><strong>{t('delivery_address') || 'Адрес доставки'}:</strong></p>
                <p>{giftData.deliveryAddress}</p>
                <p>{giftData.deliveryCity}, {giftData.deliveryPostalCode}</p>
                <p>{giftData.deliveryCountry}</p>
              </>
            )}
          </div>
          <div style={styles.buttonsRow}>
            <button onClick={resetForm} style={styles.newOrderBtn}>{t('order_again') || 'Заказать ещё'}</button>
            <Link to="/" style={styles.homeBtn}>🏠 {t('back_home') || 'На главную'}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Шапка с переключателем языка и кнопкой "На главную" */}
        <div style={styles.headerTop}>
          <Link to="/" style={styles.homeLink}>🏠 {t('back_home') || 'На главную'}</Link>
          <div style={styles.langSelector}>
            {languageList.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  ...styles.langBtn,
                  ...(lang === l.code ? styles.langBtnActive : {})
                }}
                title={l.name}
              >
                {l.flag}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.header}>
          <div style={styles.headerIcon}>🎁</div>
          <h1 style={styles.mainTitle}>{t('gift_cards') || 'Подарочные карты Mövenpick'}</h1>
          <p style={styles.subtitle}>{t('gift_subtitle') || 'Идеальный подарок для ваших близких'}</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <label style={styles.sectionLabel}>{t('select_amount') || 'Выберите сумму'}</label>
            <div style={styles.amountGrid}>
              {amounts.map(amount => (
                <button
                  key={amount.value}
                  type="button"
                  onClick={() => setGiftData(prev => ({ ...prev, amount: amount.value }))}
                  style={{
                    ...styles.amountBtn,
                    ...(giftData.amount === amount.value ? styles.amountBtnActive : {})
                  }}
                >
                  <span style={styles.amountIcon}>{amount.icon}</span>
                  <span style={styles.amountValue}>{amount.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>{t('card_type_label') || 'Тип карты'}</label>
            <div style={styles.typeGrid}>
              <button
                type="button"
                onClick={() => setGiftData(prev => ({ ...prev, cardType: 'digital' }))}
                style={{
                  ...styles.typeBtn,
                  ...(giftData.cardType === 'digital' ? styles.typeBtnActive : {})
                }}
              >
                <span>📧</span>
                <span>{t('digital') || 'Цифровая'}</span>
              </button>
              <button
                type="button"
                onClick={() => setGiftData(prev => ({ ...prev, cardType: 'physical' }))}
                style={{
                  ...styles.typeBtn,
                  ...(giftData.cardType === 'physical' ? styles.typeBtnActive : {})
                }}
              >
                <span>💳</span>
                <span>{t('physical') || 'Физическая'}</span>
              </button>
            </div>
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>{t('recipient_info') || 'Информация о получателе'}</label>
            <input
              type="text"
              name="recipientName"
              placeholder={t('recipient_name') || 'Имя получателя'}
              value={giftData.recipientName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="recipientEmail"
              placeholder={t('recipient_email') || 'Email получателя'}
              value={giftData.recipientEmail}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>{t('personal_message') || 'Личное сообщение'}</label>
            <textarea
              name="message"
              placeholder={t('message_placeholder') || 'Напишите поздравление...'}
              value={giftData.message}
              onChange={handleChange}
              rows="3"
              style={styles.textarea}
            />
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>{t('delivery_date') || 'Дата доставки'}</label>
            <input
              type="date"
              name="deliveryDate"
              value={giftData.deliveryDate}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {giftData.cardType === 'physical' && (
            <div style={styles.section}>
              <label style={styles.sectionLabel}>📍 {t('delivery_address') || 'Адрес доставки'}</label>
              <input
                type="text"
                name="deliveryAddress"
                placeholder={t('address_placeholder') || 'Улица, дом, квартира'}
                value={giftData.deliveryAddress}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <div style={styles.addressRow}>
                <input
                  type="text"
                  name="deliveryCity"
                  placeholder={t('city') || 'Город'}
                  value={giftData.deliveryCity}
                  onChange={handleChange}
                  required
                  style={{...styles.input, flex: 1}}
                />
                <input
                  type="text"
                  name="deliveryPostalCode"
                  placeholder={t('postal_code') || 'Почтовый индекс'}
                  value={giftData.deliveryPostalCode}
                  onChange={handleChange}
                  style={{...styles.input, width: '120px'}}
                />
              </div>
              <select
                name="deliveryCountry"
                value={giftData.deliveryCountry}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Thailand">Таиланд</option>
                <option value="Russia">Россия</option>
                <option value="China">Китай</option>
                <option value="Japan">Япония</option>
                <option value="Korea">Корея</option>
                <option value="Vietnam">Вьетнам</option>
              </select>
            </div>
          )}

          <div style={styles.userInfo}>
            <p style={styles.userInfoText}>👤 {t('customer') || 'Заказчик'}: {user.name}</p>
            <p style={styles.userInfoText}>
              {user.phone ? `📞 ${user.phone}` : user.email ? `📧 ${user.email}` : ''}
            </p>
          </div>

          <button type="submit" style={styles.submitBtn}>
            {t('order_btn') || 'Оформить заказ'}
          </button>
        </form>

        <div style={styles.footerLinks}>
          <Link to="/" style={styles.footerLink}>🏠 {t('back_home') || 'На главную'}</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    background: '#f5f0e8'
  },
  card: {
    maxWidth: '600px',
    width: '100%',
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  homeLink: {
    color: '#c8a86b',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '8px 16px',
    background: '#f5f0e8',
    borderRadius: '20px',
    transition: 'background 0.3s'
  },
  langSelector: {
    display: 'flex',
    gap: '5px',
    flexWrap: 'wrap'
  },
  langBtn: {
    background: 'none',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '5px 8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s'
  },
  langBtnActive: {
    borderColor: '#c8a86b',
    background: '#fef5e8',
    transform: 'scale(1.1)'
  },
  successCard: {
    maxWidth: '500px',
    width: '100%',
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  headerIcon: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  mainTitle: {
    fontSize: '28px',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#666'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  sectionLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333'
  },
  amountGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '10px'
  },
  amountBtn: {
    padding: '15px',
    background: '#f5f5f5',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    transition: 'all 0.3s'
  },
  amountBtnActive: {
    borderColor: '#c8a86b',
    background: '#fef5e8'
  },
  amountIcon: {
    fontSize: '24px'
  },
  amountValue: {
    fontSize: '14px',
    fontWeight: 'bold'
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  typeBtn: {
    padding: '15px',
    background: '#f5f5f5',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '16px',
    transition: 'all 0.3s'
  },
  typeBtnActive: {
    borderColor: '#c8a86b',
    background: '#fef5e8'
  },
  input: {
    padding: '12px 15px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  textarea: {
    padding: '12px 15px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none'
  },
  addressRow: {
    display: 'flex',
    gap: '10px'
  },
  userInfo: {
    padding: '15px',
    background: '#f5f0e8',
    borderRadius: '10px'
  },
  userInfoText: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#555'
  },
  submitBtn: {
    padding: '15px',
    background: '#c8a86b',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  successIcon: {
    fontSize: '64px',
    marginBottom: '20px'
  },
  successTitle: {
    fontSize: '24px',
    color: '#1a1a2e',
    marginBottom: '20px'
  },
  codeBox: {
    background: '#f5f0e8',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px'
  },
  codeLabel: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '5px'
  },
  code: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#c8a86b',
    fontFamily: 'monospace'
  },
  orderDetails: {
    textAlign: 'left',
    padding: '15px',
    background: '#f5f5f5',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  buttonsRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  newOrderBtn: {
    padding: '12px 25px',
    background: '#c8a86b',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  homeBtn: {
    padding: '12px 25px',
    background: '#1a1a2e',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    display: 'inline-block'
  },
  registerBtn: {
    display: 'inline-block',
    padding: '12px 25px',
    background: '#c8a86b',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    marginTop: '20px'
  },
  icon: {
    fontSize: '48px',
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  text: {
    fontSize: '14px',
    color: '#666'
  },
  footerLinks: {
    textAlign: 'center',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #eee'
  },
  footerLink: {
    color: '#c8a86b',
    textDecoration: 'none',
    fontSize: '14px'
  }
};

export default GiftCard;
