// src/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service, onBookNow }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onBookNow(service);
  };

  return (
    <div className="service-card">
      <img 
        src={service.image} 
        alt={service.title} 
        className="service-card__img" 
        loading="lazy" 
      />
      <div className="service-card__body">
        <div className="service-card__category">
          {service.category}
        </div>
        <h3 className="service-card__title">
          {service.title}
        </h3>
        <p className="service-card__desc">
          {service.description}
        </p>
        <ul className="service-card__features">
          {service.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
        <div className="service-card__footer">
          <span className="service-card__price">
            {service.price}
          </span>
          <button 
            className="btn btn--outline service-card__btn"
            onClick={handleClick}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;