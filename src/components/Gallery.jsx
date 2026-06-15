import React, { useState, useEffect, useRef } from 'react';

const Gallery = ({ t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef(null);
  
  const images = [
    "/photo/XXXL.webp",
    "/photo/otel4.png",
    "/photo/otel3.png",
    "/photo/otel2.png",
    "/photo/otel.png"
  ];
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };
  
  const nextSlide = () => {
    goToSlide((currentSlide + 1) % images.length);
  };
  
  const prevSlide = () => {
    goToSlide((currentSlide - 1 + images.length) % images.length);
  };
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  return (
    <section className="hotel-gallery" id="gallery">
      <div className="container">
        <h2 className="hotel-gallery__title">{t('gallery_title')}</h2>
      </div>
      <div className="carousel">
        <div className="carousel__track" ref={trackRef}>
          {images.map((img, index) => (
            <div className="carousel__slide" key={index}>
              <img src={img} alt={`Hotel view ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
        <button className="carousel__btn carousel__btn--prev" onClick={prevSlide}>❮</button>
        <button className="carousel__btn carousel__btn--next" onClick={nextSlide}>❯</button>
      </div>
      <div className="carousel__dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel__dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;