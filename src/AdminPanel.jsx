import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Проверяем, был ли уже введён пароль в этой сессии
  useEffect(() => {
    const adminAuth = sessionStorage.getItem('admin_auth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Пароль для входа в админку - смени на свой
    if (password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Неверный пароль!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.lockIcon}>🔒</div>
          <h2 style={styles.loginTitle}>Доступ ограничен</h2>
          <p style={styles.loginSubtitle}>Введите пароль для входа в админ-панель</p>
          <form onSubmit={handleLogin} style={styles.loginForm}>
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

  // Остальной код админ-панели (весь предыдущий код AdminPanel)
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadRequests = () => {
      const savedRequests = JSON.parse(localStorage.getItem('hotel_requests') || '[]');
      setRequests(savedRequests.reverse());
      setLoading(false);
    };

    loadRequests();

    const handleStorageChange = () => {
      loadRequests();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const deleteRequest = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      const updatedRequests = requests.filter(req => req.id !== id);
      setRequests(updatedRequests);
      localStorage.setItem('hotel_requests', JSON.stringify(updatedRequests));
    }
  };

  const clearAllRequests = () => {
    if (window.confirm('Вы уверены, что хотите удалить ВСЕ заказы?')) {
      setRequests([]);
      localStorage.setItem('hotel_requests', '[]');
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
          ...editFormData,
          guests: parseInt(editFormData.guests),
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    });
    
    setRequests(updatedRequests);
    localStorage.setItem('hotel_requests', JSON.stringify(updatedRequests));
    setEditingId(null);
    setEditFormData({});
    alert('Информация о госте обновлена!');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  const filteredRequests = requests.filter(req => {
    if (filterStatus === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return req.date === today;
    }
    return true;
  }).filter(req => {
    if (searchTerm) {
      return req.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             req.roomNumber.includes(searchTerm) ||
             req.requestCode.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Загрузка заказов...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <Link to="/" style={styles.logo}>MÖVENPICK</Link>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>На главную</Link>
            <Link to="/dadaluba" style={{...styles.navLink, ...styles.activeNavLink}}>Админ-панель</Link>
          </nav>
          <button 
            onClick={() => {
              sessionStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }} 
            style={styles.logoutAdminBtn}
          >
            Выйти из админки
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.contentContainer}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>📋 Административная панель</h1>
            <p style={styles.subtitle}>Управление бронированиями и заказами гостей</p>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📊</div>
              <div style={styles.statNumber}>{requests.length}</div>
              <div style={styles.statLabel}>Всего заказов</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <div style={styles.statNumber}>{requests.filter(r => r.date === new Date().toISOString().split('T')[0]).length}</div>
              <div style={styles.statLabel}>Заказов на сегодня</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.statNumber}>{requests.reduce((sum, r) => sum + (r.guests || 0), 0)}</div>
              <div style={styles.statLabel}>Всего гостей</div>
            </div>
          </div>

          <div style={styles.controlBar}>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="🔍 Поиск по имени, комнате или коду..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={styles.filterButtons}>
              <button
                onClick={() => setFilterStatus('all')}
                style={{...styles.filterBtn, ...(filterStatus === 'all' ? styles.activeFilter : {})}}
              >
                Все заказы
              </button>
              <button
                onClick={() => setFilterStatus('today')}
                style={{...styles.filterBtn, ...(filterStatus === 'today' ? styles.activeFilter : {})}}
              >
                На сегодня
              </button>
              {requests.length > 0 && (
                <button onClick={clearAllRequests} style={styles.clearAllBtn}>
                  🗑️ Очистить всё
                </button>
              )}
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📭</div>
              <h3 style={styles.emptyTitle}>Нет заказов</h3>
              <p style={styles.emptyText}>Здесь будут отображаться все бронирования гостей</p>
            </div>
          ) : (
            <div style={styles.ordersGrid}>
              {filteredRequests.map((req) => (
                <div key={req.id} style={styles.orderCard}>
                  <div style={styles.orderHeader}>
                    <div>
                      <div style={styles.orderCode}>{req.requestCode}</div>
                      <div style={styles.orderDate}>{formatDate(req.createdAt)}</div>
                    </div>
                    <div style={styles.orderActions}>
                      {editingId !== req.id && (
                        <button onClick={() => startEditing(req)} style={styles.editBtn} title="Редактировать">
                          ✏️
                        </button>
                      )}
                      <button onClick={() => deleteRequest(req.id)} style={styles.deleteBtn} title="Удалить">
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div style={styles.orderBody}>
                    {editingId === req.id ? (
                      <div style={styles.editForm}>
                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>👤 Имя гостя</label>
                          <input type="text" name="guestName" value={editFormData.guestName} onChange={handleEditChange} style={styles.formInput} />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>🚪 Номер комнаты</label>
                          <input type="text" name="roomNumber" value={editFormData.roomNumber} onChange={handleEditChange} style={styles.formInput} />
                        </div>
                        <div style={styles.formRow}>
                          <div style={styles.formGroup}>
                            <label style={styles.formLabel}>📅 Дата</label>
                            <input type="date" name="date" value={editFormData.date} onChange={handleEditChange} style={styles.formInput} />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.formLabel}>⏰ Время</label>
                            <input type="time" name="time" value={editFormData.time} onChange={handleEditChange} style={styles.formInput} />
                          </div>
                        </div>
                        <div style={styles.formRow}>
                          <div style={styles.formGroup}>
                            <label style={styles.formLabel}>👥 Гостей</label>
                            <input type="number" name="guests" min="1" value={editFormData.guests} onChange={handleEditChange} style={styles.formInput} />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.formLabel}>🎁 Доп. услуги</label>
                            <select name="extras" value={editFormData.extras} onChange={handleEditChange} style={styles.formInput}>
                              <option value="">Нет</option>
                              <option value="Flowers">Цветы (+500 THB)</option>
                              <option value="Cake">Торт (+800 THB)</option>
                              <option value="Champagne">Шампанское (+1,500 THB)</option>
                            </select>
                          </div>
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>💬 Комментарий</label>
                          <textarea name="comment" value={editFormData.comment} onChange={handleEditChange} style={styles.formTextarea} rows="2" />
                        </div>
                        <div style={styles.editActions}>
                          <button onClick={() => saveEditing(req.id)} style={styles.saveBtn}>💾 Сохранить</button>
                          <button onClick={cancelEditing} style={styles.cancelBtn}>❌ Отменить</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={styles.infoItem}>
                          <span style={styles.infoIcon}>👤</span>
                          <span style={styles.infoLabel}>Гость:</span>
                          <span style={styles.infoValue}>{req.guestName}</span>
                        </div>
                        <div style={styles.infoItem}>
                          <span style={styles.infoIcon}>🚪</span>
                          <span style={styles.infoLabel}>Комната:</span>
                          <span style={styles.infoValue}>{req.roomNumber}</span>
                        </div>
                        <div style={styles.infoItem}>
                          <span style={styles.infoIcon}>✨</span>
                          <span style={styles.infoLabel}>Услуга:</span>
                          <span style={styles.infoValue}>{req.service?.name || 'Не указана'}</span>
                        </div>
                        <div style={styles.infoItem}>
                          <span style={styles.infoIcon}>📅</span>
                          <span style={styles.infoLabel}>Дата:</span>
                          <span style={styles.infoValue}>{req.date}</span>
                        </div>
                        <div style={styles.infoItem}>
                          <span style={styles.infoIcon}>⏰</span>
                          <span style={styles.infoLabel}>Время:</span>
                          <span style={styles.infoValue}>{req.time}</span>
                        </div>
                        <div style={styles.infoItem}>
                          <span style={styles.infoIcon}>👥</span>
                          <span style={styles.infoLabel}>Гостей:</span>
                          <span style={styles.infoValue}>{req.guests}</span>
                        </div>
                        {req.extras && (
                          <div style={styles.infoItem}>
                            <span style={styles.infoIcon}>🎁</span>
                            <span style={styles.infoLabel}>Доп. услуги:</span>
                            <span style={styles.infoValue}>{req.extras}</span>
                          </div>
                        )}
                        {req.comment && (
                          <div style={styles.infoItem}>
                            <span style={styles.infoIcon}>💬</span>
                            <span style={styles.infoLabel}>Комментарий:</span>
                            <span style={styles.infoValue}>{req.comment}</span>
                          </div>
                        )}
                        {req.updatedAt && (
                          <div style={styles.infoItem}>
                            <span style={styles.infoIcon}>✏️</span>
                            <span style={styles.infoLabel}>Изменён:</span>
                            <span style={styles.infoValue}>{formatDate(req.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <p style={styles.footerText}>© 2025 Mövenpick Hotel. All rights reserved.</p>
          <p style={styles.footerText}>Административная панель управления заказами</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    padding: '20px'
  },
  loginCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  lockIcon: {
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
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  passwordInput: {
    padding: '14px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '16px',
    outline: 'none',
    textAlign: 'center'
  },
  errorMsg: {
    color: '#e74c3c',
    fontSize: '14px',
    margin: 0
  },
  loginBtn: {
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
  logoutAdminBtn: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  container: {
    minHeight: '100vh',
    background: '#f5f0e8',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: '#1a1a2e',
    padding: '20px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#c8a86b',
    textDecoration: 'none',
    letterSpacing: '2px'
  },
  nav: {
    display: 'flex',
    gap: '30px'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s'
  },
  activeNavLink: {
    color: '#c8a86b'
  },
  main: {
    flex: 1,
    padding: '40px 0'
  },
  contentContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  titleSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '36px',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    margin: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  statIcon: {
    fontSize: '32px',
    marginBottom: '10px'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#c8a86b'
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px'
  },
  controlBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '30px',
    padding: '20px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  searchBox: {
    flex: 1,
    minWidth: '250px'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  filterButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '10px 20px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  activeFilter: {
    background: '#c8a86b',
    color: 'white'
  },
  clearAllBtn: {
    padding: '10px 20px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px',
    background: 'white',
    borderRadius: '12px'
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '20px'
  },
  emptyTitle: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px'
  },
  emptyText: {
    fontSize: '16px',
    color: '#666'
  },
  ordersGrid: {
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
    alignItems: 'center'
  },
  orderCode: {
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#c8a86b'
  },
  orderDate: {
    fontSize: '12px',
    color: '#aaa',
    marginTop: '5px'
  },
  orderActions: {
    display: 'flex',
    gap: '10px'
  },
  editBtn: {
    background: '#3498db',
    border: 'none',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  deleteBtn: {
    background: '#e74c3c',
    border: 'none',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  orderBody: {
    padding: '20px'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  infoIcon: {
    width: '30px',
    fontSize: '16px'
  },
  infoLabel: {
    width: '100px',
    fontWeight: 'bold',
    color: '#555'
  },
  infoValue: {
    flex: 1,
    color: '#333'
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555'
  },
  formInput: {
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none'
  },
  formTextarea: {
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none'
  },
  editActions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '10px'
  },
  saveBtn: {
    padding: '10px 20px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  cancelBtn: {
    padding: '10px 20px',
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f0e8'
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '3px solid #f0f0f0',
    borderTop: '3px solid #c8a86b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    marginTop: '20px',
    color: '#666'
  },
  footer: {
    background: '#1a1a2e',
    padding: '30px 0',
    marginTop: '40px'
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center'
  },
  footerText: {
    color: '#aaa',
    margin: '5px 0',
    fontSize: '14px'
  }
};

// Добавляем анимацию
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default AdminPanel;