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

  const languageList = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' }
  ];

  const amounts = [
    { value: '500', label: '500 THB', icon: '🎁' },
    { value: '1000', label: '1000 THB', icon: '🎉' },
    { value: '2000', label: '2000 THB', icon: '🌟' },
    { value: '5000', label: '5000 THB', icon: '💎' }
  ];

  const translations = {
    en: {
      gift_cards: 'Gift Cards Mövenpick',
      gift_subtitle: 'Perfect gift for your loved ones',
      select_amount: 'Select amount',
      card_type_label: 'Card type',
      digital: 'Digital',
      physical: 'Physical',
      recipient_info: 'Recipient info',
      recipient_name: 'Recipient name',
      recipient_email: 'Recipient email',
      personal_message: 'Personal message',
      message_placeholder: 'Write a message...',
      delivery_date: 'Delivery date',
      delivery_address: 'Delivery address',
      address_placeholder: 'Street, house, apartment',
      city: 'City',
      postal_code: 'Postal code',
      customer: 'Customer',
      order_btn: 'Place order',
      order_complete: 'Gift card ordered!',
      gift_code: 'Gift card code:',
      amount: 'Amount',
      recipient: 'Recipient',
      card_type: 'Card type',
      order_again: 'Order again',
      back_home: 'Back to home',
      please_login: 'Please register first!',
      please_address: 'Please provide delivery address for physical card',
      register_required: 'Registration required',
      please_register: 'Please register to order a gift card'
    },
    ru: {
      gift_cards: 'Подарочные карты Mövenpick',
      gift_subtitle: 'Идеальный подарок для ваших близких',
      select_amount: 'Выберите сумму',
      card_type_label: 'Тип карты',
      digital: 'Цифровая',
      physical: 'Физическая',
      recipient_info: 'Информация о получателе',
      recipient_name: 'Имя получателя',
      recipient_email: 'Email получателя',
      personal_message: 'Личное сообщение',
      message_placeholder: 'Напишите поздравление...',
      delivery_date: 'Дата доставки',
      delivery_address: 'Адрес доставки',
      address_placeholder: 'Улица, дом, квартира',
      city: 'Город',
      postal_code: 'Почтовый индекс',
      customer: 'Заказчик',
      order_btn: 'Оформить заказ',
      order_complete: 'Подарочная карта заказана!',
      gift_code: 'Код подарочной карты:',
      amount: 'Сумма',
      recipient: 'Получатель',
      card_type: 'Тип карты',
      order_again: 'Заказать ещё',
      back_home: 'На главную',
      please_login: 'Пожалуйста, сначала зарегистрируйтесь!',
      please_address: 'Пожалуйста, укажите адрес доставки для физической карты',
      register_required: 'Требуется регистрация',
      please_register: 'Пожалуйста, зарегистрируйтесь, чтобы заказать подарочную карту'
    },
    zh: {
      gift_cards: '礼品卡 Mövenpick',
      gift_subtitle: '给亲人的完美礼物',
      select_amount: '选择金额',
      card_type_label: '卡类型',
      digital: '数字',
      physical: '实体',
      recipient_info: '收件人信息',
      recipient_name: '收件人姓名',
      recipient_email: '收件人邮箱',
      personal_message: '个人留言',
      message_placeholder: '写祝福语...',
      delivery_date: '送达日期',
      delivery_address: '送货地址',
      address_placeholder: '街道, 房屋, 公寓',
      city: '城市',
      postal_code: '邮政编码',
      customer: '客户',
      order_btn: '下订单',
      order_complete: '礼品卡已订购！',
      gift_code: '礼品卡代码：',
      amount: '金额',
      recipient: '收件人',
      card_type: '卡类型',
      order_again: '再次订购',
      back_home: '返回首页',
      please_login: '请先注册！',
      please_address: '请提供实体卡的送货地址',
      register_required: '需要注册',
      please_register: '请注册以订购礼品卡'
    },
    ja: {
      gift_cards: 'ギフトカード Mövenpick',
      gift_subtitle: '大切な人への完璧なギフト',
      select_amount: '金額を選択',
      card_type_label: 'カードタイプ',
      digital: 'デジタル',
      physical: '物理',
      recipient_info: '受取人情報',
      recipient_name: '受取人名',
      recipient_email: '受取人メール',
      personal_message: '個人的なメッセージ',
      message_placeholder: 'メッセージを書く...',
      delivery_date: '配達日',
      delivery_address: '配達先住所',
      address_placeholder: '番地、建物、アパート',
      city: '都市',
      postal_code: '郵便番号',
      customer: '顧客',
      order_btn: '注文する',
      order_complete: 'ギフトカードを注文しました！',
      gift_code: 'ギフトカードコード：',
      amount: '金額',
      recipient: '受取人',
      card_type: 'カードタイプ',
      order_again: '再注文',
      back_home: 'ホームに戻る',
      please_login: 'まず登録してください！',
      please_address: '物理カードの配達先住所を入力してください',
      register_required: '登録が必要です',
      please_register: 'ギフトカードを注文するには登録してください'
    },
    ko: {
      gift_cards: '기프트 카드 Mövenpick',
      gift_subtitle: '사랑하는 사람을 위한 완벽한 선물',
      select_amount: '금액 선택',
      card_type_label: '카드 유형',
      digital: '디지털',
      physical: '물리적',
      recipient_info: '수취인 정보',
      recipient_name: '수취인 이름',
      recipient_email: '수취인 이메일',
      personal_message: '개인 메시지',
      message_placeholder: '메시지 작성...',
      delivery_date: '배송 날짜',
      delivery_address: '배송 주소',
      address_placeholder: '거리, 건물, 아파트',
      city: '도시',
      postal_code: '우편번호',
      customer: '고객',
      order_btn: '주문하기',
      order_complete: '기프트 카드 주문 완료!',
      gift_code: '기프트 카드 코드:',
      amount: '금액',
      recipient: '수취인',
      card_type: '카드 유형',
      order_again: '다시 주문',
      back_home: '홈으로 돌아가기',
      please_login: '먼저 등록해주세요!',
      please_address: '실물 카드 배송 주소를 입력해주세요',
      register_required: '등록 필요',
      please_register: '기프트 카드를 주문하려면 등록해주세요'
    },
    ar: {
      gift_cards: 'بطاقات الهدايا Mövenpick',
      gift_subtitle: 'الهدية المثالية لأحبائك',
      select_amount: 'اختر المبلغ',
      card_type_label: 'نوع البطاقة',
      digital: 'رقمية',
      physical: 'مادية',
      recipient_info: 'معلومات المستلم',
      recipient_name: 'اسم المستلم',
      recipient_email: 'بريد المستلم',
      personal_message: 'رسالة شخصية',
      message_placeholder: 'اكتب رسالة...',
      delivery_date: 'تاريخ التسليم',
      delivery_address: 'عنوان التسليم',
      address_placeholder: 'الشارع، المنزل، الشقة',
      city: 'مدينة',
      postal_code: 'الرمز البريدي',
      customer: 'الزبون',
      order_btn: 'تقديم الطلب',
      order_complete: 'تم طلب بطاقة الهدية!',
      gift_code: 'رمز بطاقة الهدية:',
      amount: 'المبلغ',
      recipient: 'المستلم',
      card_type: 'نوع البطاقة',
      order_again: 'طلب مرة أخرى',
      back_home: 'العودة إلى الرئيسية',
      please_login: 'يرجى التسجيل أولاً!',
      please_address: 'يرجى تقديم عنوان التسليم للبطاقة المادية',
      register_required: 'التسجيل مطلوب',
      please_register: 'يرجى التسجيل لطلب بطاقة الهدية'
    },
    vi: {
      gift_cards: 'Thẻ quà tặng Mövenpick',
      gift_subtitle: 'Món quà hoàn hảo cho người thân',
      select_amount: 'Chọn số tiền',
      card_type_label: 'Loại thẻ',
      digital: 'Kỹ thuật số',
      physical: 'Vật lý',
      recipient_info: 'Thông tin người nhận',
      recipient_name: 'Tên người nhận',
      recipient_email: 'Email người nhận',
      personal_message: 'Tin nhắn cá nhân',
      message_placeholder: 'Viết lời chúc...',
      delivery_date: 'Ngày giao hàng',
      delivery_address: 'Địa chỉ giao hàng',
      address_placeholder: 'Đường, nhà, căn hộ',
      city: 'Thành phố',
      postal_code: 'Mã bưu điện',
      customer: 'Khách hàng',
      order_btn: 'Đặt hàng',
      order_complete: 'Thẻ quà tặng đã đặt hàng!',
      gift_code: 'Mã thẻ quà tặng:',
      amount: 'Số tiền',
      recipient: 'Người nhận',
      card_type: 'Loại thẻ',
      order_again: 'Đặt hàng lại',
      back_home: 'Về trang chủ',
      please_login: 'Vui lòng đăng ký trước!',
      please_address: 'Vui lòng cung cấp địa chỉ giao hàng cho thẻ vật lý',
      register_required: 'Yêu cầu đăng ký',
      please_register: 'Vui lòng đăng ký để đặt thẻ quà tặng'
    },
    az: {
      gift_cards: 'Hədiyyə kartları Mövenpick',
      gift_subtitle: 'Sevdikləriniz üçün mükəmməl hədiyyə',
      select_amount: 'Məbləği seçin',
      card_type_label: 'Kart növü',
      digital: 'Rəqəmsal',
      physical: 'Fiziki',
      recipient_info: 'Alıcı məlumatları',
      recipient_name: 'Alıcının adı',
      recipient_email: 'Alıcının emaili',
      personal_message: 'Şəxsi mesaj',
      message_placeholder: 'Təbrik yazın...',
      delivery_date: 'Çatdırılma tarixi',
      delivery_address: 'Çatdırılma ünvanı',
      address_placeholder: 'Küçə, ev, mənzil',
      city: 'Şəhər',
      postal_code: 'Poçt indeksi',
      customer: 'Müştəri',
      order_btn: 'Sifariş et',
      order_complete: 'Hədiyyə kartı sifariş olundu!',
      gift_code: 'Hədiyyə kartı kodu:',
      amount: 'Məbləğ',
      recipient: 'Alıcı',
      card_type: 'Kart növü',
      order_again: 'Yenidən sifariş et',
      back_home: 'Ana səhifəyə qayıt',
      please_login: 'Zəhmət olmasa, əvvəlcə qeydiyyatdan keçin!',
      please_address: 'Zəhmət olmasa, fiziki kart üçün çatdırılma ünvanını daxil edin',
      register_required: 'Qeydiyyat tələb olunur',
      please_register: 'Hədiyyə kartı sifariş etmək üçün qeydiyyatdan keçin'
    }
  };

  const gt = (key) => {
    return translations[lang]?.[key] || translations.en[key];
  };

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
      alert(gt('please_login'));
      return;
    }

    if (giftData.cardType === 'physical') {
      if (!giftData.deliveryAddress || !giftData.deliveryCity) {
        alert(gt('please_address'));
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
          <h2 style={styles.title}>{gt('register_required')}</h2>
          <p style={styles.text}>{gt('please_register')}</p>
          <Link to="/" style={styles.registerBtn}>{gt('register_btn') || 'Зарегистрироваться'}</Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={styles.successTitle}>{gt('order_complete')}</h2>
          <div style={styles.codeBox}>
            <p style={styles.codeLabel}>{gt('gift_code')}</p>
            <div style={styles.code}>{giftCode}</div>
          </div>
          <div style={styles.orderDetails}>
            <p><strong>{gt('amount')}:</strong> {giftData.amount} THB</p>
            <p><strong>{gt('recipient')}:</strong> {giftData.recipientName}</p>
            <p><strong>{gt('card_type')}:</strong> {giftData.cardType === 'digital' ? gt('digital') : gt('physical')}</p>
            {giftData.cardType === 'physical' && (
              <>
                <p><strong>{gt('delivery_address')}:</strong></p>
                <p>{giftData.deliveryAddress}</p>
                <p>{giftData.deliveryCity}, {giftData.deliveryPostalCode}</p>
                <p>{giftData.deliveryCountry}</p>
              </>
            )}
          </div>
          <div style={styles.buttonsRow}>
            <button onClick={resetForm} style={styles.newOrderBtn}>{gt('order_again')}</button>
            <Link to="/" style={styles.homeBtn}>🏠 {gt('back_home')}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.headerTop}>
          <Link to="/" style={styles.homeLink}>🏠 {gt('back_home')}</Link>
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
          <h1 style={styles.mainTitle}>{gt('gift_cards')}</h1>
          <p style={styles.subtitle}>{gt('gift_subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <label style={styles.sectionLabel}>{gt('select_amount')}</label>
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
            <label style={styles.sectionLabel}>{gt('card_type_label')}</label>
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
                <span>{gt('digital')}</span>
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
                <span>{gt('physical')}</span>
              </button>
            </div>
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>{gt('recipient_info')}</label>
            <input
              type="text"
              name="recipientName"
              placeholder={gt('recipient_name')}
              value={giftData.recipientName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="recipientEmail"
              placeholder={gt('recipient_email')}
              value={giftData.recipientEmail}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>{gt('personal_message')}</label>
            <textarea
              name="message"
              placeholder={gt('message_placeholder')}
              value={giftData.message}
              onChange={handleChange}
              rows="3"
              style={styles.textarea}
            />
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>{gt('delivery_date')}</label>
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
              <label style={styles.sectionLabel}>📍 {gt('delivery_address')}</label>
              <input
                type="text"
                name="deliveryAddress"
                placeholder={gt('address_placeholder')}
                value={giftData.deliveryAddress}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <div style={styles.addressRow}>
                <input
                  type="text"
                  name="deliveryCity"
                  placeholder={gt('city')}
                  value={giftData.deliveryCity}
                  onChange={handleChange}
                  required
                  style={{...styles.input, flex: 1}}
                />
                <input
                  type="text"
                  name="deliveryPostalCode"
                  placeholder={gt('postal_code')}
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
            <p style={styles.userInfoText}>👤 {gt('customer')}: {user.name}</p>
            <p style={styles.userInfoText}>
              {user.phone ? `📞 ${user.phone}` : user.email ? `📧 ${user.email}` : ''}
            </p>
          </div>

          <button type="submit" style={styles.submitBtn}>
            {gt('order_btn')}
          </button>
        </form>

        <div style={styles.footerLinks}>
          <Link to="/" style={styles.footerLink}>🏠 {gt('back_home')}</Link>
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
