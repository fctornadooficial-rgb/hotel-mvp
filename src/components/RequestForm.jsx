// src/components/RequestForm.jsx
import React, { useState } from 'react';

const RequestForm = ({ service, t, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    roomNumber: '',
    service: service.title,
    date: '',
    time: '',
    guests: 2,
    extras: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <button className="modal__close" onClick={onCancel}>&times;</button>
        <h3 className="modal__title">{t('modal_title')}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('label_name')} *</label>
            <input 
              type="text" 
              name="guestName" 
              value={formData.guestName}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>{t('label_room')} *</label>
            <input 
              type="text" 
              name="roomNumber" 
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="e.g., 1205"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>{t('label_service')}</label>
            <input 
              type="text" 
              value={service.title}
              disabled
              style={{ background: '#f0f0f0' }}
            />
          </div>
          
          <div className="form-group">
            <label>{t('label_date')} *</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>{t('label_time')} *</label>
            <input 
              type="time" 
              name="time" 
              value={formData.time}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>{t('label_guests')} *</label>
            <input 
              type="number" 
              name="guests" 
              min="1" 
              max="20"
              value={formData.guests}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>{t('label_extras')}</label>
            <select name="extras" value={formData.extras} onChange={handleChange}>
              <option value="">{t('label_extras')}</option>
              <option value="Flowers">Flowers (+500 THB)</option>
              <option value="Cake">Celebration Cake (+800 THB)</option>
              <option value="Champagne">Champagne (+1,500 THB)</option>
              <option value="Decor">Room Decoration (+1,200 THB)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>{t('label_comment')}</label>
            <textarea 
              name="comment" 
              rows="3"
              value={formData.comment}
              onChange={handleChange}
              placeholder={t('label_comment')}
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn--accent" style={{ width: '100%' }}>
            {t('generate_btn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;