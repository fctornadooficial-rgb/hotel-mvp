import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SVG иконки
const Icons = {
  Lock: () => (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#c8a86b" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  Stats: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#c8a86b" strokeWidth="2">
      <path d="M21 12v-2a5 5 0 00-5-5H8a5 5 0 00-5 5v2" />
      <circle cx="12" cy="16" r="5" />
      <path d="M12 11v5" />
      <path d="M9 16l3-3 3 3" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#c8a86b" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#c8a86b" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Blocked: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#e74c3c" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  Open: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#27ae60" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Delete: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  Save: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2">
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  Cancel: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Home: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Guest: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#333" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Room: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#333" strokeWidth="2">
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <line x1="8" y1="21" x2="8" y2="15" />
      <line x1="16" y1="21" x2="16" y2="15" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  Service: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#333" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Date: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#333" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Time: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#333" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Extras: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#333" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Comment: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#333" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
};

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
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.loginIcon}><Icons.Lock /></div>
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

  // Админ-панель
  return (
    <div style={styles.container}>
      {/* Шапка */}
      <div style={styles.header}>
        <Link to="/" style={styles.logo}>MÖVENPICK</Link>
        <div style={styles.headerActions}>
          <Link to="/" style={styles.headerLink}><Icons.Home /> На главную</Link>
          <button onClick={toggleBookingBlock} style={isBlocked ? styles.blockBtn : styles.openBtn}>
            {isBlocked ? <Icons.Blocked /> : <Icons.Open />}
            {isBlocked ? 'Заявки приостановлены' : 'Бронирования открыты'}
          </button>
          <button onClick={() => { sessionStorage.removeItem('admin_auth'); setIsAuthenticated(false); }} style={styles.logoutBtn}>
            <Icons.Logout /> Выйти
          </button>
        </div>
      </div>

      {/* Контент */}
      <div style={styles.content}>
        <div style={styles.titleSection}>
          <h1 style={styles.mainTitle}>Административная панель</h1>
          <p style={styles.subtitle}>Управление бронированиями и заказами гостей</p>
        </div>

        {/* Статистика */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <Icons.Stats />
            <div style={styles.statNumber}>{requests.length}</div>
            <div style={styles.statLabel}>Всего заказов</div>
          </div>
          <div style={styles.statCard}>
            <Icons.Calendar />
            <div style={styles.statNumber}>
              {requests.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
            </div>
            <div style={styles.statLabel}>Заказов на сегодня</div>
          </div>
          <div style={styles.statCard}>
            <Icons.Users />
            <div style={styles.statNumber}>
              {requests.reduce((sum, r) => sum + (r.guests || 0), 0)}
            </div>
            <div style={styles.statLabel}>Всего гостей</div>
          </div>
          <div style={styles.statCard}>
            {isBlocked ? <Icons.Blocked /> : <Icons.Open />}
            <div style={{...styles.statNumber, color: isBlocked ? '#e74c3c' : '#27ae60'}}>
              {isBlocked ? '🔒' : '✅'}
            </div>
            <div style={styles.statLabel}>{isBlocked ? 'Заявки приостановлены' : 'Приём заявок открыт'}</div>
          </div>
        </div>

        {/* Список заказов */}
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
                      <button onClick={() => startEditing(req)} style={styles.editBtn}>
                        <Icons.Edit />
                      </button>
                    )}
                    <button onClick={() => deleteRequest(req.id)} style={styles.deleteBtn}>
                      <Icons.Delete />
                    </button>
                  </div>
                </div>

                <div style={styles.orderBody}>
                  {editingId === req.id ? (
                    // Режим редактирования
                    <div>
                      <div style={styles.editRow}>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}><Icons.Guest /> Имя гостя</label>
                          <input type="text" name="guestName" value={editFormData.guestName} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}><Icons.Room /> Номер комнаты</label>
                          <input type="text" name="roomNumber" value={editFormData.roomNumber} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                      </div>
                      <div style={styles.editRow}>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}><Icons.Date /> Дата</label>
                          <input type="date" name="date" value={editFormData.date} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}><Icons.Time /> Время</label>
                          <input type="time" name="time" value={editFormData.time} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                      </div>
                      <div style={styles.editRow}>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}><Icons.Users /> Гостей</label>
                          <input type="number" name="guests" min="1" value={editFormData.guests} onChange={handleEditChange} style={styles.editInput} />
                        </div>
                        <div style={styles.editGroup}>
                          <label style={styles.editLabel}><Icons.Extras /> Доп. услуги</label>
                          <select name="extras" value={editFormData.extras} onChange={handleEditChange} style={styles.editInput}>
                            <option value="">Нет</option>
                            <option value="Flowers">Цветы (+500 THB)</option>
                            <option value="Cake">Торт (+800 THB)</option>
                            <option value="Champagne">Шампанское (+1,500 THB)</option>
                          </select>
                        </div>
                      </div>
                      <div style={styles.editGroup}>
                        <label style={styles.editLabel}><Icons.Comment /> Комментарий</label>
                        <textarea name="comment" value={editFormData.comment} onChange={handleEditChange} rows="2" style={styles.editTextarea} />
                      </div>
                      <div style={styles.editActions}>
                        <button onClick={() => saveEditing(req.id)} style={styles.saveBtn}><Icons.Save /> Сохранить</button>
                        <button onClick={cancelEditing} style={styles.cancelBtn}><Icons.Cancel /> Отменить</button>
                      </div>
                    </div>
                  ) : (
                    // Режим просмотра
                    <div>
                      <p style={styles.infoItem}><Icons.Guest /> <strong>Гость:</strong> {req.guestName}</p>
                      <p style={styles.infoItem}><Icons.Room /> <strong>Комната:</strong> {req.roomNumber}</p>
                      <p style={styles.infoItem}><Icons.Service /> <strong>Услуга:</strong> {req.service?.name || 'Не указана'}</p>
                      <p style={styles.infoItem}><Icons.Date /> <strong>Дата:</strong> {req.date}</p>
                      <p style={styles.infoItem}><Icons.Time /> <strong>Время:</strong> {req.time}</p>
                      <p style={styles.infoItem}><Icons.Users /> <strong>Гостей:</strong> {req.guests}</p>
                      {req.extras && <p style={styles.infoItem}><Icons.Extras /> <strong>Доп. услуги:</strong> {req.extras}</p>}
                      {req.comment && <p style={styles.infoItem}><Icons.Comment /> <strong>Комментарий:</strong> {req.comment}</p>}
                      {req.updatedAt && <p style={styles.infoItem} style={styles.updatedText}>✏️ Изменён: {formatDate(req.updatedAt)}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Футер */}
      <div style={styles.footer}>
        <p>© 2025 Mövenpick Hotel. All rights reserved.</p>
        <p style={styles.footerSub}>Административная панель управления заказами</p>
      </div>
    </div>
  );
};

const styles = {
  // Контейнеры
  container: {
    minHeight: '100vh',
    background: '#f5f0e8',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    width: '100%',
    flex: 1
  },

  // Шапка
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
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  blockBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  openBtn: {
    background: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  logoutBtn: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },

  // Заголовки
  titleSection: {
    textAlign: 'center',
    margin: '30px 0'
  },
  mainTitle: {
    fontSize: '32px',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#555'
  },

  // Статистика
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
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#c8a86b',
    margin: '10px 0 5px'
  },
  statLabel: {
    color: '#555',
    fontSize: '14px'
  },

  // Пустое состояние
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

  // Карточки заказов
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
    fontSize: '16px',
    fontFamily: 'monospace'
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
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  deleteBtn: {
    background: '#e74c3c',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  orderBody: {
    padding: '20px'
  },

  // Информация в заказе
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '5px 0',
    color: '#333'
  },
  updatedText: {
    color: '#666',
    fontSize: '12px',
    marginTop: '10px'
  },

  // Редактирование
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
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
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
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  cancelBtn: {
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  // Логин
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

  // Футер
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
