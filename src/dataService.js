// dataService.js
// Сервис для управления данными (заказы и отзывы) с сохранением в localStorage

const STORAGE_KEYS = {
  REQUESTS: 'hotel_requests',
  REVIEWS: 'hotel_reviews',
  USERS: 'hotel_users',
  USER: 'hotel_user',
  BOOKING_BLOCKED: 'booking_blocked',
  NIGHT_MODE: 'night_mode',
  LANGUAGE: 'ml'
};

// ============ ЗАКАЗЫ (БРОНИРОВАНИЯ) ============

export const getRequests = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading requests:', error);
    return [];
  }
};

export const saveRequests = (requests) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return true;
  } catch (error) {
    console.error('Error saving requests:', error);
    return false;
  }
};

export const addRequest = (request) => {
  try {
    const requests = getRequests();
    const newRequest = {
      id: Date.now(),
      ...request,
      createdAt: new Date().toISOString()
    };
    requests.push(newRequest);
    saveRequests(requests);
    return newRequest;
  } catch (error) {
    console.error('Error adding request:', error);
    return null;
  }
};

export const updateRequest = (id, updatedData) => {
  try {
    const requests = getRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    requests[index] = {
      ...requests[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveRequests(requests);
    return requests[index];
  } catch (error) {
    console.error('Error updating request:', error);
    return null;
  }
};

export const deleteRequest = (id) => {
  try {
    const requests = getRequests();
    const filtered = requests.filter(r => r.id !== id);
    saveRequests(filtered);
    return true;
  } catch (error) {
    console.error('Error deleting request:', error);
    return false;
  }
};

export const getRequestById = (id) => {
  try {
    const requests = getRequests();
    return requests.find(r => r.id === id) || null;
  } catch (error) {
    console.error('Error getting request:', error);
    return null;
  }
};

export const getRequestsByRoom = (roomNumber) => {
  try {
    const requests = getRequests();
    return requests.filter(r => r.roomNumber === roomNumber);
  } catch (error) {
    console.error('Error getting requests by room:', error);
    return [];
  }
};

export const getRequestsByDate = (date) => {
  try {
    const requests = getRequests();
    return requests.filter(r => r.date === date);
  } catch (error) {
    console.error('Error getting requests by date:', error);
    return [];
  }
};

export const getTodayRequests = () => {
  const today = new Date().toISOString().split('T')[0];
  return getRequestsByDate(today);
};

export const getRequestsStats = () => {
  const requests = getRequests();
  const today = new Date().toISOString().split('T')[0];
  const todayRequests = requests.filter(r => r.date === today);
  
  return {
    total: requests.length,
    today: todayRequests.length,
    totalGuests: requests.reduce((sum, r) => sum + (r.guests || 0), 0),
    todayGuests: todayRequests.reduce((sum, r) => sum + (r.guests || 0), 0)
  };
};

// ============ ОТЗЫВЫ ============

export const getReviews = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading reviews:', error);
    return [];
  }
};

export const saveReviews = (reviews) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return true;
  } catch (error) {
    console.error('Error saving reviews:', error);
    return false;
  }
};

export const addReview = (review) => {
  try {
    const reviews = getReviews();
    const newReview = {
      id: Date.now(),
      ...review,
      date: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      reports: 0,
      status: 'active'
    };
    reviews.push(newReview);
    saveReviews(reviews);
    return newReview;
  } catch (error) {
    console.error('Error adding review:', error);
    return null;
  }
};

export const updateReview = (id, updatedData) => {
  try {
    const reviews = getReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    reviews[index] = {
      ...reviews[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveReviews(reviews);
    return reviews[index];
  } catch (error) {
    console.error('Error updating review:', error);
    return null;
  }
};

export const deleteReview = (id) => {
  try {
    const reviews = getReviews();
    const filtered = reviews.filter(r => r.id !== id);
    saveReviews(filtered);
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
};

export const getReviewById = (id) => {
  try {
    const reviews = getReviews();
    return reviews.find(r => r.id === id) || null;
  } catch (error) {
    console.error('Error getting review:', error);
    return null;
  }
};

export const getReviewsByService = (service) => {
  try {
    const reviews = getReviews();
    if (service === 'all') return reviews;
    return reviews.filter(r => r.service === service);
  } catch (error) {
    console.error('Error getting reviews by service:', error);
    return [];
  }
};

export const getReviewsByUser = (userId) => {
  try {
    const reviews = getReviews();
    return reviews.filter(r => r.userId === userId);
  } catch (error) {
    console.error('Error getting reviews by user:', error);
    return [];
  }
};

export const likeReview = (reviewId, userId) => {
  try {
    const reviews = getReviews();
    const index = reviews.findIndex(r => r.id === reviewId);
    if (index === -1) return null;
    
    const review = reviews[index];
    const hasLiked = review.likedBy?.includes(userId);
    
    reviews[index] = {
      ...review,
      likes: hasLiked ? review.likes - 1 : review.likes + 1,
      likedBy: hasLiked 
        ? review.likedBy.filter(id => id !== userId)
        : [...(review.likedBy || []), userId]
    };
    saveReviews(reviews);
    return reviews[index];
  } catch (error) {
    console.error('Error liking review:', error);
    return null;
  }
};

export const reportReview = (reviewId) => {
  try {
    const reviews = getReviews();
    const index = reviews.findIndex(r => r.id === reviewId);
    if (index === -1) return null;
    
    reviews[index] = {
      ...reviews[index],
      reports: (reviews[index].reports || 0) + 1
    };
    saveReviews(reviews);
    return reviews[index];
  } catch (error) {
    console.error('Error reporting review:', error);
    return null;
  }
};

export const getReviewsStats = () => {
  const reviews = getReviews();
  const activeReviews = reviews.filter(r => r.status === 'active');
  
  // Средний рейтинг
  const avgRating = activeReviews.length > 0
    ? activeReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / activeReviews.length
    : 0;
  
  // Распределение оценок
  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  activeReviews.forEach(r => {
    if (r.rating && ratingDistribution[r.rating] !== undefined) {
      ratingDistribution[r.rating]++;
    }
  });
  
  return {
    total: reviews.length,
    active: activeReviews.length,
    avgRating: Math.round(avgRating * 10) / 10,
    totalLikes: activeReviews.reduce((sum, r) => sum + (r.likes || 0), 0),
    ratingDistribution
  };
};

// ============ ПОЛЬЗОВАТЕЛИ ============

export const getUsers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
};

export const getUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading current user:', error);
    return null;
  }
};

export const saveUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving current user:', error);
    return false;
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

export const isPhoneRegistered = (phone) => {
  const users = getUsers();
  return users.some(u => u.phone === phone);
};

export const isEmailRegistered = (email) => {
  const users = getUsers();
  return users.some(u => u.email === email);
};

export const registerUser = (userData) => {
  try {
    const users = getUsers();
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    saveUser(newUser);
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

export const loginUser = (identifier, password) => {
  try {
    const users = getUsers();
    const user = users.find(u => 
      (u.email === identifier || u.phone === identifier) && u.password === password
    );
    if (user) {
      saveUser(user);
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

// ============ НАСТРОЙКИ ============

export const getBookingBlocked = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.BOOKING_BLOCKED) === 'true';
  } catch (error) {
    console.error('Error getting booking blocked status:', error);
    return false;
  }
};

export const setBookingBlocked = (blocked) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKING_BLOCKED, blocked ? 'true' : 'false');
    return true;
  } catch (error) {
    console.error('Error setting booking blocked status:', error);
    return false;
  }
};

export const getLanguage = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';
  } catch (error) {
    console.error('Error getting language:', error);
    return 'en';
  }
};

export const setLanguage = (lang) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    return true;
  } catch (error) {
    console.error('Error setting language:', error);
    return false;
  }
};

export const getNightMode = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.NIGHT_MODE) === 'true';
  } catch (error) {
    console.error('Error getting night mode:', error);
    return false;
  }
};

export const setNightMode = (enabled) => {
  try {
    localStorage.setItem(STORAGE_KEYS.NIGHT_MODE, enabled ? 'true' : 'false');
    return true;
  } catch (error) {
    console.error('Error setting night mode:', error);
    return false;
  }
};

// ============ ОЧИСТКА ДАННЫХ ============

export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

export const getDataSize = () => {
  let total = 0;
  Object.values(STORAGE_KEYS).forEach(key => {
    const data = localStorage.getItem(key);
    if (data) total += data.length;
  });
  return total;
};

// ============ ЭКСПОРТ ДАННЫХ ============

export const exportAllData = () => {
  try {
    const data = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    });
    return data;
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

export const importAllData = (data) => {
  try {
    Object.keys(data).forEach(key => {
      if (Object.values(STORAGE_KEYS).includes(key)) {
        localStorage.setItem(key, JSON.stringify(data[key]));
      }
    });
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// ============ СТАТИСТИКА ============

export const getFullStats = () => {
  const requestsStats = getRequestsStats();
  const reviewsStats = getReviewsStats();
  const users = getUsers();
  
  return {
    requests: requestsStats,
    reviews: reviewsStats,
    users: {
      total: users.length,
      registeredToday: users.filter(u => {
        const today = new Date().toISOString().split('T')[0];
        return u.createdAt?.startsWith(today);
      }).length
    }
  };
};

// Экспорт по умолчанию для удобства
export default {
  // Заказы
  getRequests,
  saveRequests,
  addRequest,
  updateRequest,
  deleteRequest,
  getRequestById,
  getRequestsByRoom,
  getRequestsByDate,
  getTodayRequests,
  getRequestsStats,
  
  // Отзывы
  getReviews,
  saveReviews,
  addReview,
  updateReview,
  deleteReview,
  getReviewById,
  getReviewsByService,
  getReviewsByUser,
  likeReview,
  reportReview,
  getReviewsStats,
  
  // Пользователи
  getUsers,
  saveUsers,
  getUser,
  saveUser,
  logoutUser,
  isPhoneRegistered,
  isEmailRegistered,
  registerUser,
  loginUser,
  
  // Настройки
  getBookingBlocked,
  setBookingBlocked,
  getLanguage,
  setLanguage,
  getNightMode,
  setNightMode,
  
  // Экспорт/Импорт
  exportAllData,
  importAllData,
  clearAllData,
  getDataSize,
  getFullStats
};
