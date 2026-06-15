// src/components/SuccessScreen.jsx
import React from 'react';

const SuccessScreen = ({ requestCode, service, t, onNewRequest }) => {
  return (
    <div className="success-overlay">
      <div className="success-modal">
        <div className="success-icon">✓</div>
        <h2 className="success-title">{t('success_title')}</h2>
        
        <div className="request-code-box">
          <p className="request-code-label">{t('request_code_label')}</p>
          <div className="request-code">{requestCode}</div>
        </div>
        
        <div className="success-details">
          <p><strong>{t('label_service')}:</strong> {service.title}</p>
          <p><strong>{t('label_guests')}:</strong> {service.price}</p>
          <p className="instruction-text">
            {t('instruction_text')}
          </p>
        </div>
        
        <button onClick={onNewRequest} className="btn btn--accent">
          {t('new_request_btn')}
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;