import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Reviews = ({ lang, t }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    service: 'all'
  });
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Список услуг для фильтра
  const servicesList = [
    { id: 'all', name: t('all_services') || 'Все услуги' },
    { id: 'bbq', name: 'BBQ Dinner' },
    { id: 'spa', name: 'SPA Relax' },
    { id: 'transfer', name: 'Airport Transfer' },
    { id: 'kids', name: 'Kids Club' },
    { id: 'romantic', name: 'Romantic Dinner' },
    { id: 'hotel', name: t('hotel_services') || 'Отель в целом' }
  ];

  // Загрузка отзывов из localStorage
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    const savedReviews = JSON.parse(localStorage.getItem('hotel_reviews') || '[]');
    setReviews(savedReviews);
  };

  // Добавление отзыва
  const handleSubmitReview = (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError(t('please_login_to_review') || 'Пожалуйста, войдите в аккаунт, чтобы оставить отзыв');
      return;
    }

    if (!newReview.comment.trim()) {
      setError(t('enter_review_text') || 'Пожалуйста, напишите текст отзыва');
      return;
    }

    setIsSubmitting(true);

    const review = {
      id: Date.now(),
      userId: user.id,
      userName: newReview.name || user.name,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      service: newReview.service,
      date: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      reports: 0,
      status: 'active'
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('hotel_reviews', JSON.stringify(updatedReviews));

    setNewReview({
      name: '',
      rating: 5,
      comment: '',
      service: 'all'
    });
    setIsSubmitting(false);
    alert(t('review_added') || 'Ваш отзыв успешно добавлен!');
  };

  // Лайк отзыва
  const handleLike = (reviewId) => {
    if (!user) {
      alert(t('please_login_to_like') || 'Войдите, чтобы ставить лайки');
      return;
    }

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        const hasLiked = review.likedBy?.includes(user.id);
        return {
          ...review,
          likes: hasLiked ? review.likes - 1 : review.likes + 1,
          likedBy: hasLiked 
            ? review.likedBy.filter(id => id !== user.id)
            : [...(review.likedBy || []), user.id]
        };
      }
      return review;
    });

    setReviews(updatedReviews);
    localStorage.setItem('hotel_reviews', JSON.stringify(updatedReviews));
  };

  // Удаление отзыва (только для админа или автора)
  const handleDeleteReview = (reviewId) => {
    if (!user) return;
    
    const review = reviews.find(r => r.id === reviewId);
    if (review.userId !== user.id && !user.isAdmin) {
      alert(t('no_permission') || 'У вас нет прав на удаление этого отзыва');
      return;
    }

    if (window.confirm(t('delete_review_confirm') || 'Вы уверены, что хотите удалить отзыв?')) {
      const updatedReviews = reviews.filter(r => r.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem('hotel_reviews', JSON.stringify(updatedReviews));
    }
  };

  // Жалоба на отзыв
  const handleReport = (reviewId) => {
    if (!user) {
      alert(t('please_login_to_report') || 'Войдите, чтобы пожаловаться');
      return;
    }

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          reports: (review.reports || 0) + 1
        };
      }
      return review;
    });

    setReviews(updatedReviews);
    localStorage.setItem('hotel_reviews', JSON.stringify(updatedReviews));
    alert(t('report_sent') || 'Жалоба отправлена модераторам');
  };

  // Фильтрация и сортировка
  const filteredReviews = reviews
    .filter(review => {
      if (filter === 'all') return true;
      return review.service === filter;
    })
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date);
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sort === 'highest') return b.rating - a.rating;
      if (sort === 'lowest') return a.rating - b.rating;
      if (sort === 'popular') return b.likes - a.likes;
      return 0;
    });

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Перевод для рейтинга
  const getRatingText = (rating) => {
    const texts = {
      ru: ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'],
      en: ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'],
      zh: ['糟糕', '差', '一般', '好', '优秀'],
      ja: ['ひどい', '悪い', '普通', '良い', '素晴らしい'],
      ko: ['최악', '나쁨', '보통', '좋음', '최고'],
      ar: ['فظيع', 'سيئ', 'متوسط', 'جيد', 'ممتاز'],
      vi: ['Tệ', 'Kém', 'Trung bình', 'Tốt', 'Tuyệt vời']
    };
    return (texts[lang] || texts.en)[rating - 1] || '';
  };

  // Звёзды для рейтинга
  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={interactive ? () => onChange(star) : undefined}
            style={{
              color: star <= rating ? '#f5c842' : '#ddd',
              fontSize: interactive ? '30px' : '20px',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'transform 0.2s',
              userSelect: 'none'
            }}
            onMouseEnter={interactive ? (e) => e.target.style.transform = 'scale(1.2)' : undefined}
            onMouseLeave={interactive ? (e) => e.target.style.transform = 'scale(1)' : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Иконка услуги
  const getServiceIcon = (service) => {
    const icons = {
      bbq: '🍖',
      spa: '💆',
      transfer: '🚗',
      kids: '🧒',
      romantic: '🌹',
      hotel: '🏨'
    };
    return icons[service] || '📌';
  };

  return (
    <div style={styles.container}>
      {/* Заголовок */}
      <div style={styles.header}>
        <h1 style={styles.title}>💬 {t('guest_reviews') || 'Отзывы гостей'}</h1>
        <p style={styles.subtitle}>{t('share_experience') || 'Поделитесь своим опытом и помогите другим выбрать идеальный отдых'}</p>
      </div>

      {/* Форма добавления отзыва */}
      {user ? (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>{t('leave_review') || 'Оставить отзыв'}</h3>
          <form onSubmit={handleSubmitReview} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>{t('your_name') || 'Ваше имя'}</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder={user.name || t('your_name') || 'Ваше имя'}
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>{t('service') || 'Услуга'}</label>
                <select
                  value={newReview.service}
                  onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                  style={styles.formSelect}
                >
                  {servicesList.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{t('your_rating') || 'Ваша оценка'}</label>
              {renderStars(newReview.rating, true, (star) => setNewReview({ ...newReview, rating: star }))}
              <span style={styles.ratingText}>{getRatingText(newReview.rating)}</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{t('your_review') || 'Ваш отзыв'}</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder={t('review_placeholder') || 'Расскажите о своём опыте...'}
                rows="4"
                style={styles.formTextarea}
              />
            </div>

            {error && <p style={styles.errorMsg}>{error}</p>}

            <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
              {isSubmitting ? (t('sending') || 'Отправка...') : (t('publish_review') || 'Опубликовать отзыв')}
            </button>
          </form>
        </div>
      ) : (
        <div style={styles.loginPrompt}>
          <p>{t('login_to_review') || 'Войдите в аккаунт, чтобы оставить отзыв'}</p>
          <Link to="/" style={styles.loginLink}>{t('login_btn') || 'Войти'}</Link>
        </div>
      )}

      {/* Фильтры и сортировка */}
      <div style={styles.controls}>
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>{t('filter') || 'Фильтр'}:</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.filterSelect}>
            {servicesList.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div style={styles.sortGroup}>
          <span style={styles.filterLabel}>{t('sort') || 'Сортировка'}:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.filterSelect}>
            <option value="newest">{t('newest') || 'Сначала новые'}</option>
            <option value="oldest">{t('oldest') || 'Сначала старые'}</option>
            <option value="highest">{t('highest_rating') || 'Высший рейтинг'}</option>
            <option value="lowest">{t('lowest_rating') || 'Низший рейтинг'}</option>
            <option value="popular">{t('most_liked') || 'Самые популярные'}</option>
          </select>
        </div>
      </div>

      {/* Список отзывов */}
      <div style={styles.reviewsList}>
        {filteredReviews.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📝</div>
            <h3 style={styles.emptyTitle}>{t('no_reviews') || 'Пока нет отзывов'}</h3>
            <p style={styles.emptyText}>{t('be_first') || 'Станьте первым, кто оставит отзыв!'}</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <div style={styles.reviewerInfo}>
                  <span style={styles.reviewerName}>👤 {review.userName}</span>
                  <span style={styles.reviewDate}>{formatDate(review.date)}</span>
                </div>
                <div style={styles.reviewActions}>
                  {renderStars(review.rating)}
                  <span style={styles.ratingText}>{getRatingText(review.rating)}</span>
                </div>
              </div>

              <div style={styles.reviewService}>
                {getServiceIcon(review.service)} {servicesList.find(s => s.id === review.service)?.name || review.service}
              </div>

              <p style={styles.reviewComment}>{review.comment}</p>

              <div style={styles.reviewFooter}>
                <div style={styles.reviewStats}>
                  <button
                    onClick={() => handleLike(review.id)}
                    style={{
                      ...styles.likeBtn,
                      ...(review.likedBy?.includes(user?.id) ? styles.likedBtn : {})
                    }}
                  >
                    ❤️ {review.likes || 0}
                  </button>
                  {user && user.isAdmin && (
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      style={styles.deleteBtn}
                    >
                      🗑️
                    </button>
                  )}
                  <button
                    onClick={() => handleReport(review.id)}
                    style={styles.reportBtn}
                  >
                    ⚠️ {t('report') || 'Пожаловаться'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    background: '#f5f0e8',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '36px',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666'
  },
  formCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  formTitle: {
    fontSize: '20px',
    color: '#1a1a2e',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333'
  },
  formInput: {
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  formSelect: {
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    background: 'white'
  },
  formTextarea: {
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none'
  },
  ratingText: {
    fontSize: '14px',
    color: '#666'
  },
  submitBtn: {
    padding: '14px',
    background: '#c8a86b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  errorMsg: {
    color: '#e74c3c',
    fontSize: '14px',
    textAlign: 'center'
  },
  loginPrompt: {
    background: 'white',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  loginLink: {
    display: 'inline-block',
    padding: '10px 30px',
    background: '#c8a86b',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    marginTop: '10px'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '30px',
    padding: '15px 20px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sortGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  filterLabel: {
    fontSize: '14px',
    color: '#666'
  },
  filterSelect: {
    padding: '8px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  reviewCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '10px'
  },
  reviewerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap'
  },
  reviewerName: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#1a1a2e'
  },
  reviewDate: {
    fontSize: '12px',
    color: '#999'
  },
  reviewActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  reviewService: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px'
  },
  reviewComment: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '15px'
  },
  reviewFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    paddingTop: '15px',
    borderTop: '1px solid #f0f0f0'
  },
  reviewStats: {
    display: 'flex',
    gap: '15px'
  },
  likeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '5px 10px',
    borderRadius: '6px',
    transition: 'all 0.3s',
    color: '#666'
  },
  likedBtn: {
    color: '#e74c3c',
    background: '#fde8e8'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '5px 10px',
    borderRadius: '6px',
    color: '#e74c3c'
  },
  reportBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '5px 10px',
    borderRadius: '6px',
    color: '#999'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'white',
    borderRadius: '16px'
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
  }
};

export default Reviews;
