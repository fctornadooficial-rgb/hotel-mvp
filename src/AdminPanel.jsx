import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);

  // Проверяем пароль
  useEffect(() => {
    const adminAuth = sessionStorage.getItem('admin_auth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      loadRequests();
    }
  }, []);

  const loadRequests = () => {
    const savedRequests = JSON.parse(localStorage.getItem('hotel_requests') || '[]');
    setRequests(savedRequests.reverse());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
      loadRequests();
    } else {
      setError('Неверный пароль!');
    }
  };

  const deleteRequest = (id) => {
    if (window.confirm('Удалить заказ?')) {
      const updated = requests.filter(req => req.id !== id);
      setRequests(updated);
      localStorage.setItem('hotel_requests', JSON.stringify(updated));
    }
  };

  // Страница входа
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a2e',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
          <h2 style={{ fontSize: '24px', color: '#1a1a2e', marginBottom: '10px' }}>Доступ ограничен</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>Введите пароль для входа в админ-панель</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px',
                marginBottom: '15px',
                boxSizing: 'border-box'
              }}
              autoFocus
            />
            {error && <p style={{ color: '#e74c3c', marginBottom: '15px' }}>{error}</p>}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: '#c8a86b',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Войти
            </button>
          </form>
          <Link to="/" style={{ display: 'block', marginTop: '20px', color: '#666', textDecoration: 'none' }}>
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  // Админ-панель
  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8' }}>
      {/* Шапка */}
      <div style={{
        background: '#1a1a2e',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link to="/" style={{ color: '#c8a86b', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>
          MÖVENPICK
        </Link>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>На главную</Link>
          <button
            onClick={() => {
              sessionStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Выйти
          </button>
        </div>
      </div>

      {/* Контент */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#1a1a2e' }}>📋 Админ-панель</h1>
        <p style={{ textAlign: 'center', color: '#666' }}>Управление заказами</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          margin: '20px 0'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', color: '#c8a86b' }}>{requests.length}</div>
            <div style={{ color: '#666' }}>Всего заказов</div>
          </div>
        </div>

        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}>
            <div style={{ fontSize: '64px' }}>📭</div>
            <h3>Нет заказов</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {requests.map((req) => (
              <div key={req.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{
                  background: '#1a1a2e',
                  color: 'white',
                  padding: '15px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#c8a86b', fontWeight: 'bold' }}>{req.requestCode}</span>
                  <button
                    onClick={() => deleteRequest(req.id)}
                    style={{
                      background: '#e74c3c',
                      border: 'none',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <div style={{ padding: '20px' }}>
                  <p><strong>👤 Гость:</strong> {req.guestName}</p>
                  <p><strong>🚪 Комната:</strong> {req.roomNumber}</p>
                  <p><strong>✨ Услуга:</strong> {req.service?.name || 'Не указана'}</p>
                  <p><strong>📅 Дата:</strong> {req.date}</p>
                  <p><strong>⏰ Время:</strong> {req.time}</p>
                  <p><strong>👥 Гостей:</strong> {req.guests}</p>
                  {req.extras && <p><strong>🎁 Доп. услуги:</strong> {req.extras}</p>}
                  {req.comment && <p><strong>💬 Комментарий:</strong> {req.comment}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Футер */}
      <div style={{ background: '#1a1a2e', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ color: '#aaa' }}>© 2025 Mövenpick Hotel. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
