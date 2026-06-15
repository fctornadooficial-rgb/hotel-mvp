import React from 'react';

const Footer = ({ t }) => {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <h4 className="footer__title">{t('footer_social')}</h4>
          <div className="footer__social">
            <a href="https://www.facebook.com/movenpickpattaya" target="_blank" className="social-link" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/movenpickpattaya" target="_blank" className="social-link" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer__col">
          <h4 className="footer__title">{t('footer_services')}</h4>
          <ul className="footer__links">
            <li><a href="bbq.html">BBQ Dinner by the Sea</a></li>
            <li><a href="spa.html">SPA Relax Package</a></li>
            <li><a href="transfer.html">Airport Transfer</a></li>
            <li><a href="kids.html">Kids Club Activities</a></li>
            <li><a href="romantic.html">Romantic Dinner / Tour</a></li>
          </ul>
        </div>
        <div className="footer__col footer__map-col">
          <h4 className="footer__title">{t('footer_map')}</h4>
          <div className="footer__map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.837982114338!2d100.9307614153388!3d12.880984990931414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102965e5c98f1d1%3A0x8c18e7f3e651d123!2sM%C3%B6venpick%20Siam%20Hotel%20Na%20Jomtien%20Pattaya!5e0!3m2!1sen!2sth!4v1680000000000" 
              allowFullScreen="" 
              loading="lazy" 
              title="Hotel Location"
            ></iframe>
          </div>
          <p className="footer__address">55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, Thailand</p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© 2025 Mövenpick Na Jomtien Siam Pattaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;