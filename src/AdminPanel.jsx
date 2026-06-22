import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);

  // Проверяем пароль и статус блокировки
  useEffect(() => {
    const adminAuth = sessionStorage.getItem('admin_auth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      loadRequests();
    }
    const blocked = localStorage.getItem('booking_blocked') === 'true';
    setIsBlocked(blocked);
  }, []);

  const loadRequests = () => {
    const savedRequests = JSON.parse(localStorage.getItem('hotel_requests') || '[]');
    setRequests(savedRequests.reverse());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'DaDaLuba123') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
      loadRequests();
    } else {
      setError('Неверный пароль!');
    }
  };

  const deleteRequest = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      const updated = requests.filter(req => req.id !== id);
      setRequests(updated);
      localStorage.setItem('hotel_requests', JSON.stringify(updated));
    }
  };

  const startEditing = (request) => {
    setEditingId(request.id);
    setEditFormData({
      guestName: request.guestName,
      roomNumber: request.roomNumber,
      date: request.date,
      time: request.time,
      guests: request.guests,
      extras: request.extras || '',
      comment: request.comment || ''
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const saveEditing = (id) => {
    const updatedRequests = requests.map(req => {
      if (req.id === id) {
        return {
          ...req,
          guestName: editFormData.guestName,
          roomNumber: editFormData.roomNumber,
          date: editFormData.date,
          time: editFormData.time,
          guests: parseInt(editFormData.guests),
          extras: editFormData.extras,
          comment: editFormData.comment,
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    });
    
    setRequests(updatedRequests);
    localStorage.setItem('hotel_requests', JSON.stringify(updatedRequests));
    setEditingId(null);
    setEditFormData({});
    alert('✅ Информация о заказе обновлена!');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleBookingBlock = () => {
    const newStatus = !isBlocked;
    setIsBlocked(newStatus);
    localStorage.setItem('booking_blocked', newStatus ? 'true' : 'false');
    alert(newStatus ? '🔒 Бронирования временно приостановлены' : '🔓 Бронирования снова доступны');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
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
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <Link to="/" style={{ color: '#c8a86b', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>
          MÖVENPICK
        </Link>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>🏠 На главную</Link>
          <button
            onClick={toggleBookingBlock}
            style={{
              background: isBlocked ? '#e74c3c' : '#27ae60',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {isBlocked ? '🔒 Заявки приостановлены' : '🔓 Бронирования открыты'}
          </button>
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
        <h1 style={{ textAlign: 'center', color: '#1a1a2e', fontSize: '32px' }}>📋 Административная панель</h1>
        <p style={{ textAlign: 'center', color: '#555', fontSize: '16px' }}>Управление бронированиями и заказами гостей</p>

        {/* Статистика */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          margin: '20px 0'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#c8a86b' }}>{requests.length}</div>
            <div style={{ color: '#555' }}>Всего заказов</div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#c8a86b' }}>
              {requests.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
            </div>
            <div style={{ color: '#555' }}>Заказов на сегодня</div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#c8a86b' }}>
              {requests.reduce((sum, r) => sum + (r.guests || 0), 0)}
            </div>
            <div style={{ color: '#555' }}>Всего гостей</div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: isBlocked ? '#e74c3c' : '#27ae60' }}>
              {isBlocked ? '🔒' : '✅'}
            </div>
            <div style={{ color: '#555' }}>{isBlocked ? 'Заявки приостановлены' : 'Приём заявок открыт'}</div>
          </div>
        </div>

        {/* Список заказов */}
        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '64px' }}>📭</div>
            <h3 style={{ color: '#333' }}>Нет заказов</h3>
            <p style={{ color: '#666' }}>Здесь будут отображаться все бронирования гостей</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {requests.map((req) => (
              <div key={req.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{
                  background: '#1a1a2e',
                  color: 'white',
                  padding: '15px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <span style={{ color: '#c8a86b', fontWeight: 'bold', fontSize: '16px' }}>{req.requestCode}</span>
                    <span style={{ color: '#aaa', fontSize: '12px', marginLeft: '15px' }}>{formatDate(req.createdAt)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {editingId !== req.id && (
                      <button
                        onClick={() => startEditing(req)}
                        style={{
                          background: '#3498db',
                          border: 'none',
                          color: 'white',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => deleteRequest(req.id)}
                      style={{
                        background: '#e74c3c',
                        border: 'none',
                        color: 'white',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  {editingId === req.id ? (
                    // Режим редактирования
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                          <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>👤 Имя гостя</label>
                          <input
                            type="text"
                            name="guestName"
                            value={editFormData.guestName}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                          />
                        </div>
                        <div>
                          <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>🚪 Номер комнаты</label>
                          <input
                            type="text"
                            name="roomNumber"
                            value={editFormData.roomNumber}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                          />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                          <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>📅 Дата</label>
                          <input
                            type="date"
                            name="date"
                            value={editFormData.date}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                          />
                        </div>
                        <div>
                          <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>⏰ Время</label>
                          <input
                            type="time"
                            name="time"
                            value={editFormData.time}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                          />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                          <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>👥 Гостей</label>
                          <input
                            type="number"
                            name="guests"
                            min="1"
                            value={editFormData.guests}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                          />
                        </div>
                        <div>
                          <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>🎁 Доп. услуги</label>
                          <select
                            name="extras"
                            value={editFormData.extras}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                          >
                            <option value="">Нет</option>
                            <option value="Flowers">Цветы (+500 THB)</option>
                            <option value="Cake">Торт (+800 THB)</option>
                            <option value="Champagne">Шампанское (+1,500 THB)</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>💬 Комментарий</label>
                        <textarea
                          name="comment"
                          value={editFormData.comment}
                          onChange={handleEditChange}
                          rows="2"
                          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => saveEditing(req.id)}
                          style={{
                            background: '#27ae60',
                            color: 'white',
                            border: 'none',
                            padding: '10px 25px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          💾 Сохранить
                        </button>
                        <button
                          onClick={cancelEditing}
                          style={{
                            background: '#95a5a6',
                            color: 'white',
                            border: 'none',
                            padding: '10px 25px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          ❌ Отменить
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Режим просмотра
                    <div>
                      <p style={{ color: '#333', margin: '5px 0' }}><strong>👤 Гость:</strong> {req.guestName}</p>
                      <p style={{ color: '#333', margin: '5px 0' }}><strong>🚪 Комната:</strong> {req.roomNumber}</p>
                      <p style={{ color: '#333', margin: '5px 0' }}><strong>✨ Услуга:</strong> {req.service?.name || 'Не указана'}</p>
                      <p style={{ color: '#333', margin: '5px 0' }}><strong>📅 Дата:</strong> {req.date}</p>
                      <p style={{ color: '#333', margin: '5px 0' }}><strong>⏰ Время:</strong> {req.time}</p>
                      <p style={{ color: '#333', margin: '5px 0' }}><strong>👥 Гостей:</strong> {req.guests}</p>
                      {req.extras && <p style={{ color: '#333', margin: '5px 0' }}><strong>🎁 Доп. услуги:</strong> {req.extras}</p>}
                      {req.comment && <p style={{ color: '#333', margin: '5px 0' }}><strong>💬 Комментарий:</strong> {req.comment}</p>}
                      {req.updatedAt && <p style={{ color: '#666', margin: '5px 0', fontSize: '12px' }}>✏️ Изменён: {formatDate(req.updatedAt)}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Футер */}
      <div style={{ background: '#1a1a2e', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ color: '#aaa' }}>© 2025 Mövenpick Hotel. All rights reserved.</p>
        <p style={{ color: '#666', fontSize: '12px' }}>Административная панель управления заказами</p>
      </div>
    </div>
  );
};

export default AdminPanel;
