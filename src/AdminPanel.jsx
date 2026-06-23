import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRequests, deleteRequest, updateRequest, getBookingBlocked, setBookingBlocked } from './dataService';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const adminAuth = sessionStorage.getItem('admin_auth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      loadRequests();
    }
    setIsBlocked(getBookingBlocked());
  }, []);

  const loadRequests = () => {
    const savedRequests = getRequests();
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

  const deleteRequestHandler = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      if (deleteRequest(id)) {
        setRequests(prev => prev.filter(req => req.id !== id));
      }
    }
  };

  const clearAllRequests = () => {
    if (window.confirm('Вы уверены, что хотите удалить ВСЕ заказы?')) {
      localStorage.setItem('hotel_requests', '[]');
      setRequests([]);
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
    const updated = updateRequest(id, {
      guestName: editFormData.guestName,
      roomNumber: editFormData.roomNumber,
      date: editFormData.date,
      time: editFormData.time,
      guests: parseInt(editFormData.guests),
      extras: editFormData.extras,
      comment: editFormData.comment
    });
    
    if (updated) {
      setRequests(prev => prev.map(req => req.id === id ? updated : req));
      setEditingId(null);
      setEditFormData({});
      alert('✅ Информация о заказе обновлена!');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleBookingBlock = () => {
    const newStatus = !isBlocked;
    setIsBlocked(newStatus);
    setBookingBlocked(newStatus);
    alert(newStatus ? '🔒 Бронирования временно приостановлены' : '🔓 Бронирования снова доступны');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  // Страница входа
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.loginIcon}>🔒</div>
          <h2 style={styles.loginTitle}>Доступ ограничен</h2>
          <p style={styles.loginSubtitle}>Введите пароль для входа в админ-панель</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.passwordInput}
              autoFocus
            />
            {error && <p style={styles.errorMsg}>{error}</p>}
            <button type="submit" style={styles.loginBtn}>Войти</button>
          </form>
          <Link to="/" style={styles.backLink}>← Вернуться на главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/" style={styles.logo}>MÖVENPICK</Link>
        <div style={styles.headerActions}>
          <Link to="/" style={styles.headerLink}>🏠 На главную</Link>
          <button onClick={toggleBookingBlock} style={isBlocked ? styles.blockBtn : styles.openBtn}>
            {isBlocked ? '🔒 Заявки приостановлены' : '🔓 Бронирования открыты'}
          </button>
          <button onClick={() => { sessionStorage.removeItem('admin_auth'); setIsAuthenticated(false); }} style={styles.logoutBtn}>
            Выйти
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <h1 style={styles.mainTitle}>📋 Административная панель</h1>
        <p style={styles.subtitle}>Управление бронированиями и заказами гостей</p>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{requests.length}</div>
            <div style={styles.statLabel}>Всего заказов</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {requests.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
            </div>
            <div style={styles.statLabel}>Заказов на сегодня</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {requests.reduce((sum, r) => sum + (r.guests || 0), 0)}
            </div>
            <div style={styles.statLabel}>Всего гостей</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statNumber, color: isBlocked ? '#e74c3c' : '#27ae60'}}>
              {isBlocked ? '🔒' : '✅'}
            </div>
            <div style={styles.statLabel}>{isBlocked ? 'Заявки приостановлены' : 'Приём заявок открыт'}</div>
          </div>
        </div>

        {requests.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <h3 style={styles.emptyTitle}>Нет заказов</h3>
            <p style={styles.emptyText}>Здесь будут отображаться все бронирования гостей</p>
          </div>
        ) : (
          <div style={styles.ordersList}>
            {requests.map((req) => (
              <div key={req.id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div>
                    <span style={styles.orderCode}>{req.requestCode}</span>
                    <span style={styles.orderDate}>{formatDate(req.createdAt)}</span>
                  </div>
                  <div style={styles.orderActions}>
                    {editingId !== req.id && (
                      <button onClick={() => startEditing(req)} style={styles.editBtn}>✏️</button>
                    )}
                    <button onClick={() => deleteRequestHandler(req.id)} style={styles.deleteBtn}>🗑️</button>
                  </div>
                </div>

                <div style={styles.orderBody}>
                  {editingId === req.id ? (
                    <div>
                      <div style={styles.editRow}>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}>👤 Имя гостя</label>
                          <input type="text" name="guestName" value={editFormData.guestName} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}>🚪 Номер комнаты</label>
                          <input type="text" name="roomNumber" value={editFormData.roomNumber} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                      </div>
                      <div style={styles.editRow}>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}>📅 Дата</label>
                          <input type="date" name="date" value={editFormData.date} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}>⏰ Время</label>
                          <input type="time" name="time" value={editFormData.time} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                      </div>
                      <div style={styles.editRow}>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}>👥 Гостей</label>
                          <input type="number" name="guests" min="1" value={editFormData.guests} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}>🎁 Доп. услуги</label>
                          <select name="extras" value={editFormData.extras} onChange={handleEditChange} style={styles.editInput}>
                            <option value="">Нет</option>
                            <option value="Flowers">Цветы (+500 THB)</option>
                            <option value="Cake">Торт (+800 THB)</option>
                            <option value="Champagne">Шампанское (+1,500 THB)</option>
                          </select>
                        </div>
                      </div>
                      <div style={styles.editGroup}>
                        <label style={styles.editLabel}>💬 Комментарий</label>
                        <textarea name="comment" value={editFormData.comment} onChange={handleEditChange} rows="2" style={styles.editTextarea} />
                      </div>
                      <div style={styles.editActions}>
                        <button onClick={() => saveEditing(req.id)} style={styles.saveBtn}>💾 Сохранить</button>
                        <button onClick={cancelEditing} style={styles.cancelBtn}>❌ Отменить</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p style={styles.infoItem}><strong>👤 Гость:</strong> {req.guestName}</p>
                      <p style={styles.infoItem}><strong>🚪 Комната:</strong> {req.roomNumber}</p>
                      <p style={styles.infoItem}><strong>✨ Услуга:</strong> {req.service?.name || 'Не указана'}</p>
                      <p style={styles.infoItem}><strong>📅 Дата:</strong> {req.date}</p>
                      <p style={styles.infoItem}><strong>⏰ Время:</strong> {req.time}</p>
                      <p style={styles.infoItem}><strong>👥 Гостей:</strong> {req.guests}</p>
                      {req.extras && <p style={styles.infoItem}><strong>🎁 Доп. услуги:</strong> {req.extras}</p>}
                      {req.comment && <p style={styles.infoItem}><strong>💬 Комментарий:</strong> {req.comment}</p>}
                      {req.updatedAt && <p style={styles.updatedText}>✏️ Изменён: {formatDate(req.updatedAt)}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <p>© 2025 Mövenpick Hotel. All rights reserved.</p>
        <p style={styles.footerSub}>Административная панель управления заказами</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f0e8',
    display: 'flex',
    flexDirection: 'column'
  },
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a1a2e',
    padding: '20px'
  },
  loginCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%'
  },
  loginIcon: {
    fontSize: '48px',
    marginBottom: '20px'
  },
  loginTitle: {
    fontSize: '24px',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  loginSubtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px'
  },
  passwordInput: {
    width: '100%',
    padding: '14px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '16px',
    marginBottom: '15px',
    boxSizing: 'border-box'
  },
  loginBtn: {
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
  backLink: {
    display: 'block',
    marginTop: '20px',
    color: '#666',
    textDecoration: 'none',
    fontSize: '14px'
  },
  errorMsg: {
    color: '#e74c3c',
    marginBottom: '15px'
  },
  header: {
    background: '#1a1a2e',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  },
  logo: {
    color: '#c8a86b',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    letterSpacing: '2px'
  },
  headerActions: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  headerLink: {
    color: '#fff',
    textDecoration: 'none'
  },
  blockBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  openBtn: {
    background: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  logoutBtn: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    width: '100%',
    flex: 1
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#555'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#c8a86b',
    marginBottom: '5px'
  },
  statLabel: {
    color: '#555',
    fontSize: '14px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '20px'
  },
  emptyTitle: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px'
  },
  emptyText: {
    color: '#666',
    fontSize: '16px'
  },
  ordersList: {
    display: 'grid',
    gap: '20px'
  },
  orderCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  orderHeader: {
    background: '#1a1a2e',
    color: 'white',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },
  orderCode: {
    color: '#c8a86b',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  orderDate: {
    color: '#aaa',
    fontSize: '12px',
    marginLeft: '15px'
  },
  orderActions: {
    display: 'flex',
    gap: '10px'
  },
  editBtn: {
    background: '#3498db',
    border: 'none',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  deleteBtn: {
    background: '#e74c3c',
    border: 'none',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  orderBody: {
    padding: '20px'
  },
  infoItem: {
    margin: '5px 0',
    color: '#333'
  },
  updatedText: {
    color: '#666',
    fontSize: '12px',
    marginTop: '10px'
  },
  editRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '15px'
  },
  editGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  editLabel: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  editInput: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box'
  },
  editTextarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  editActions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '15px'
  },
  saveBtn: {
    background: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  cancelBtn: {
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  footer: {
    background: '#1a1a2e',
    padding: '20px',
    textAlign: 'center',
    marginTop: '40px'
  },
  footerSub: {
    color: '#666',
    fontSize: '12px',
    marginTop: '5px'
  }
};

export default AdminPanel;
