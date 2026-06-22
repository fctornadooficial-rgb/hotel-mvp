import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const RegisterModal = ({ isOpen, onClose, lang }) => {
  const { registerByPhone, registerByEmail, login } = useAuth();
  const [step, setStep] = useState('method');
  const [phoneData, setPhoneData] = useState({ phone: '', name: '' });
  const [emailData, setEmailData] = useState({ email: '', name: '', password: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });

  if (!isOpen) return null;

  // Переводы для модального окна
  const t = (key) => {
    const translations = {
      en: {
        welcome: 'Welcome',
        sign_in: 'Sign In',
        or_register: 'or register',
        by_phone: 'By Phone',
        by_email: 'By Email',
        phone_register: 'Phone Registration',
        email_register: 'Email Registration',
        your_name: 'Your Name',
        phone_number: 'Phone Number',
        email: 'Email',
        password: 'Password',
        get_code: 'Get Code',
        verify_code: 'Verify Code',
        enter_code: 'Enter 6-digit code',
        confirm: 'Confirm',
        back: 'Back',
        invalid_code: 'Invalid verification code',
        already_registered: 'Already registered',
        login: 'Login',
        identifier: 'Email or Phone',
        logout_btn: 'Logout'
      },
      ru: {
        welcome: 'Добро пожаловать',
        sign_in: 'Войти',
        or_register: 'или зарегистрироваться',
        by_phone: 'По телефону',
        by_email: 'По email',
        phone_register: 'Регистрация по телефону',
        email_register: 'Регистрация по email',
        your_name: 'Ваше имя',
        phone_number: 'Номер телефона',
        email: 'Email',
        password: 'Пароль',
        get_code: 'Получить код',
        verify_code: 'Подтвердить код',
        enter_code: 'Введите 6-значный код',
        confirm: 'Подтвердить',
        back: 'Назад',
        invalid_code: 'Неверный код подтверждения',
        already_registered: 'Уже зарегистрированы',
        login: 'Войти',
        identifier: 'Email или телефон',
        logout_btn: 'Выйти'
      },
      zh: {
        welcome: '欢迎',
        sign_in: '登录',
        or_register: '或注册',
        by_phone: '通过电话',
        by_email: '通过邮箱',
        phone_register: '电话注册',
        email_register: '邮箱注册',
        your_name: '您的名字',
        phone_number: '电话号码',
        email: '邮箱',
        password: '密码',
        get_code: '获取验证码',
        verify_code: '验证码',
        enter_code: '输入6位验证码',
        confirm: '确认',
        back: '返回',
        invalid_code: '无效验证码',
        already_registered: '已注册',
        login: '登录',
        identifier: '邮箱或电话',
        logout_btn: '退出'
      },
      ja: {
        welcome: 'ようこそ',
        sign_in: 'サインイン',
        or_register: 'または登録',
        by_phone: '電話で',
        by_email: 'メールで',
        phone_register: '電話登録',
        email_register: 'メール登録',
        your_name: 'お名前',
        phone_number: '電話番号',
        email: 'メール',
        password: 'パスワード',
        get_code: 'コードを取得',
        verify_code: 'コードを確認',
        enter_code: '6桁のコードを入力',
        confirm: '確認',
        back: '戻る',
        invalid_code: '無効なコード',
        already_registered: '登録済み',
        login: 'ログイン',
        identifier: 'メールまたは電話',
        logout_btn: 'ログアウト'
      },
      ko: {
        welcome: '환영합니다',
        sign_in: '로그인',
        or_register: '또는 등록',
        by_phone: '전화로',
        by_email: '이메일로',
        phone_register: '전화 등록',
        email_register: '이메일 등록',
        your_name: '이름',
        phone_number: '전화번호',
        email: '이메일',
        password: '비밀번호',
        get_code: '코드 받기',
        verify_code: '코드 확인',
        enter_code: '6자리 코드 입력',
        confirm: '확인',
        back: '뒤로',
        invalid_code: '잘못된 코드',
        already_registered: '이미 등록됨',
        login: '로그인',
        identifier: '이메일 또는 전화',
        logout_btn: '로그아웃'
      },
      ar: {
        welcome: 'مرحباً',
        sign_in: 'تسجيل الدخول',
        or_register: 'أو التسجيل',
        by_phone: 'عن طريق الهاتف',
        by_email: 'عن طريق البريد',
        phone_register: 'التسجيل بالهاتف',
        email_register: 'التسجيل بالبريد',
        your_name: 'اسمك',
        phone_number: 'رقم الهاتف',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        get_code: 'احصل على الرمز',
        verify_code: 'تحقق من الرمز',
        enter_code: 'أدخل رمز 6 أرقام',
        confirm: 'تأكيد',
        back: 'رجوع',
        invalid_code: 'رمز غير صحيح',
        already_registered: 'مسجل بالفعل',
        login: 'تسجيل الدخول',
        identifier: 'البريد أو الهاتف',
        logout_btn: 'تسجيل الخروج'
      },
      vi: {
        welcome: 'Chào mừng',
        sign_in: 'Đăng nhập',
        or_register: 'hoặc đăng ký',
        by_phone: 'Qua điện thoại',
        by_email: 'Qua email',
        phone_register: 'Đăng ký qua điện thoại',
        email_register: 'Đăng ký qua email',
        your_name: 'Tên của bạn',
        phone_number: 'Số điện thoại',
        email: 'Email',
        password: 'Mật khẩu',
        get_code: 'Lấy mã',
        verify_code: 'Xác minh mã',
        enter_code: 'Nhập mã 6 chữ số',
        confirm: 'Xác nhận',
        back: 'Quay lại',
        invalid_code: 'Mã xác minh không hợp lệ',
        already_registered: 'Đã đăng ký',
        login: 'Đăng nhập',
        identifier: 'Email hoặc điện thoại',
        logout_btn: 'Đăng xuất'
      }
    };
    return translations[lang]?.[key] || translations['en'][key];
  };

  const sendVerificationCode = (type, value) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    alert(`${t('verify_code')}: ${code}\n`);
    if (type === 'phone') {
      setStep('phoneVerify');
    } else {
      setStep('emailVerify');
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setError('');
    sendVerificationCode('phone', phoneData.phone);
  };

  const handlePhoneVerify = (e) => {
    e.preventDefault();
    try {
      registerByPhone(phoneData.phone, phoneData.name, verificationCode, enteredCode);
      onClose();
      resetForm();
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    sendVerificationCode('email', emailData.email);
  };

  const handleEmailVerify = (e) => {
    e.preventDefault();
    try {
      registerByEmail(emailData.email, emailData.name, emailData.password, verificationCode, enteredCode);
      onClose();
      resetForm();
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    try {
      login(loginData.identifier, loginData.password);
      onClose();
      resetForm();
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setStep('method');
    setPhoneData({ phone: '', name: '' });
    setEmailData({ email: '', name: '', password: '' });
    setVerificationCode('');
    setEnteredCode('');
    setError('');
    setLoginData({ identifier: '', password: '' });
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>

        {step === 'method' && (
          <div>
            <div style={styles.header}>
              <div style={styles.icon}>🔐</div>
              <h2 style={styles.title}>{t('welcome')}</h2>
              <p style={styles.subtitle}>{t('sign_in')} {t('or_register')}</p>
            </div>

            <div style={styles.methods}>
              <button onClick={() => setStep('loginForm')} style={{...styles.methodBtn, ...styles.loginMethodBtn}}>
                <span style={styles.methodIcon}>🔑</span>
                <span>{t('sign_in')}</span>
              </button>
              
              <div style={styles.divider}>{t('or_register')}</div>
              
              <button onClick={() => setStep('phone')} style={styles.methodBtn}>
                <span style={styles.methodIcon}>📱</span>
                <span>{t('by_phone')}</span>
              </button>
              
              <button onClick={() => setStep('email')} style={styles.methodBtn}>
                <span style={styles.methodIcon}>📧</span>
                <span>{t('by_email')}</span>
              </button>
            </div>
          </div>
        )}

        {step === 'loginForm' && (
          <div>
            <button onClick={() => setStep('method')} style={styles.backBtn}>← {t('back')}</button>
            <div style={styles.header}>
              <div style={styles.icon}>🔑</div>
              <h2 style={styles.title}>{t('sign_in')}</h2>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder={t('identifier')}
                value={loginData.identifier}
                onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder={t('password')}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                style={styles.input}
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>{t('sign_in')}</button>
            </form>
          </div>
        )}

        {step === 'phone' && (
          <div>
            <button onClick={() => setStep('method')} style={styles.backBtn}>← {t('back')}</button>
            <div style={styles.header}>
              <div style={styles.icon}>📱</div>
              <h2 style={styles.title}>{t('phone_register')}</h2>
            </div>
            <form onSubmit={handlePhoneSubmit}>
              <input
                type="text"
                placeholder={t('your_name')}
                value={phoneData.name}
                onChange={(e) => setPhoneData({ ...phoneData, name: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="tel"
                placeholder={t('phone_number')}
                value={phoneData.phone}
                onChange={(e) => setPhoneData({ ...phoneData, phone: e.target.value })}
                required
                style={styles.input}
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>{t('get_code')}</button>
            </form>
          </div>
        )}

        {step === 'phoneVerify' && (
          <div>
            <button onClick={() => setStep('phone')} style={styles.backBtn}>← {t('back')}</button>
            <div style={styles.header}>
              <div style={styles.icon}>📱</div>
              <h2 style={styles.title}>{t('verify_code')}</h2>
              <p style={styles.subtitle}>{t('enter_code')}</p>
            </div>
            <form onSubmit={handlePhoneVerify}>
              <input
                type="text"
                placeholder={t('enter_code')}
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                required
                style={styles.input}
                maxLength="6"
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>{t('confirm')}</button>
            </form>
          </div>
        )}

        {step === 'email' && (
          <div>
            <button onClick={() => setStep('method')} style={styles.backBtn}>← {t('back')}</button>
            <div style={styles.header}>
              <div style={styles.icon}>📧</div>
              <h2 style={styles.title}>{t('email_register')}</h2>
            </div>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="text"
                placeholder={t('your_name')}
                value={emailData.name}
                onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="email"
                placeholder={t('email')}
                value={emailData.email}
                onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder={t('password')}
                value={emailData.password}
                onChange={(e) => setEmailData({ ...emailData, password: e.target.value })}
                required
                style={styles.input}
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>{t('get_code')}</button>
            </form>
          </div>
        )}

        {step === 'emailVerify' && (
          <div>
            <button onClick={() => setStep('email')} style={styles.backBtn}>← {t('back')}</button>
            <div style={styles.header}>
              <div style={styles.icon}>📧</div>
              <h2 style={styles.title}>{t('verify_code')}</h2>
              <p style={styles.subtitle}>{t('enter_code')}</p>
            </div>
            <form onSubmit={handleEmailVerify}>
              <input
                type="text"
                placeholder={t('enter_code')}
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                required
                style={styles.input}
                maxLength="6"
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>{t('confirm')}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    width: '90%',
    maxWidth: '450px',
    position: 'relative',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#999'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#c8a86b',
    marginBottom: '20px',
    padding: 0
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  icon: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  title: {
    fontSize: '24px',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#666'
  },
  methods: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  methodBtn: {
    padding: '15px',
    background: '#f5f5f5',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    transition: 'all 0.3s'
  },
  loginMethodBtn: {
    background: '#c8a86b',
    color: 'white',
    border: 'none'
  },
  methodIcon: {
    fontSize: '24px'
  },
  divider: {
    textAlign: 'center',
    color: '#999',
    fontSize: '12px',
    margin: '5px 0'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: '#c8a86b',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  errorMsg: {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center'
  }
};

export default RegisterModal;
