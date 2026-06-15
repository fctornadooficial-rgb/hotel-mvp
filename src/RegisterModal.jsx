import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const RegisterModal = ({ isOpen, onClose }) => {
  const { registerByPhone, registerByEmail, login } = useAuth();
  const [step, setStep] = useState('method');
  const [phoneData, setPhoneData] = useState({ phone: '', name: '' });
  const [emailData, setEmailData] = useState({ email: '', name: '', password: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });

  if (!isOpen) return null;

  const sendVerificationCode = (type, value) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    alert(`Ваш проверочный код: ${code}\n(В реальном приложении код придет на ${type === 'phone' ? 'телефон' : 'email'})`);
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
              <h2 style={styles.title}>Добро пожаловать</h2>
              <p style={styles.subtitle}>Войдите или зарегистрируйтесь</p>
            </div>

            <div style={styles.methods}>
              <button onClick={() => setStep('loginForm')} style={{...styles.methodBtn, ...styles.loginMethodBtn}}>
                <span style={styles.methodIcon}>🔑</span>
                <span>Войти в аккаунт</span>
              </button>
              
              <div style={styles.divider}>или зарегистрироваться</div>
              
              <button onClick={() => setStep('phone')} style={styles.methodBtn}>
                <span style={styles.methodIcon}>📱</span>
                <span>По номеру телефона</span>
              </button>
              
              <button onClick={() => setStep('email')} style={styles.methodBtn}>
                <span style={styles.methodIcon}>📧</span>
                <span>По email</span>
              </button>
            </div>
          </div>
        )}

        {/* Форма входа */}
        {step === 'loginForm' && (
          <div>
            <button onClick={() => setStep('method')} style={styles.backBtn}>← Назад</button>
            <div style={styles.header}>
              <div style={styles.icon}>🔑</div>
              <h2 style={styles.title}>Вход в аккаунт</h2>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Email или номер телефона"
                value={loginData.identifier}
                onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                style={styles.input}
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>Войти</button>
            </form>
          </div>
        )}

        {/* Форма регистрации по телефону */}
        {step === 'phone' && (
          <div>
            <button onClick={() => setStep('method')} style={styles.backBtn}>← Назад</button>
            <div style={styles.header}>
              <div style={styles.icon}>📱</div>
              <h2 style={styles.title}>Регистрация по телефону</h2>
            </div>
            <form onSubmit={handlePhoneSubmit}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={phoneData.name}
                onChange={(e) => setPhoneData({ ...phoneData, name: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="tel"
                placeholder="Номер телефона"
                value={phoneData.phone}
                onChange={(e) => setPhoneData({ ...phoneData, phone: e.target.value })}
                required
                style={styles.input}
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>Получить код</button>
            </form>
          </div>
        )}

        {/* Верификация телефона */}
        {step === 'phoneVerify' && (
          <div>
            <button onClick={() => setStep('phone')} style={styles.backBtn}>← Назад</button>
            <div style={styles.header}>
              <div style={styles.icon}>📱</div>
              <h2 style={styles.title}>Подтверждение телефона</h2>
              <p style={styles.subtitle}>Введите код, отправленный на {phoneData.phone}</p>
            </div>
            <form onSubmit={handlePhoneVerify}>
              <input
                type="text"
                placeholder="Введите 6-значный код"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                required
                style={styles.input}
                maxLength="6"
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>Подтвердить</button>
            </form>
          </div>
        )}

        {/* Форма регистрации по email */}
        {step === 'email' && (
          <div>
            <button onClick={() => setStep('method')} style={styles.backBtn}>← Назад</button>
            <div style={styles.header}>
              <div style={styles.icon}>📧</div>
              <h2 style={styles.title}>Регистрация по email</h2>
            </div>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={emailData.name}
                onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                value={emailData.email}
                onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={emailData.password}
                onChange={(e) => setEmailData({ ...emailData, password: e.target.value })}
                required
                style={styles.input}
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>Получить код</button>
            </form>
          </div>
        )}

        {/* Верификация email */}
        {step === 'emailVerify' && (
          <div>
            <button onClick={() => setStep('email')} style={styles.backBtn}>← Назад</button>
            <div style={styles.header}>
              <div style={styles.icon}>📧</div>
              <h2 style={styles.title}>Подтверждение email</h2>
              <p style={styles.subtitle}>Введите код, отправленный на {emailData.email}</p>
            </div>
            <form onSubmit={handleEmailVerify}>
              <input
                type="text"
                placeholder="Введите 6-значный код"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                required
                style={styles.input}
                maxLength="6"
              />
              {error && <p style={styles.errorMsg}>{error}</p>}
              <button type="submit" style={styles.submitBtn}>Подтвердить</button>
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
