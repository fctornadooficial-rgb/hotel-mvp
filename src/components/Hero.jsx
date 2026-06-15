import React from 'react';

const Hero = ({ t }) => {
  return (
    <section style={{
      backgroundImage: 'url(/photo/XXXL.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}></div>
      <div style={{
        position: 'relative',
        textAlign: 'center',
        color: 'white',
        padding: '20px',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          textShadow: '2px 2px 8px black'
        }}>
          {t('hero_title')}
        </h1>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          textShadow: '1px 1px 4px black'
        }}>
          {t('hero_subtitle')}
        </p>
        <a 
          href="#gallery" 
          style={{
            padding: '14px 35px',
            textDecoration: 'none',
            borderRadius: '50px',
            display: 'inline-block',
            backgroundColor: '#c8a86b',
            color: 'white',
            fontSize: '1.1rem'
          }}
        >
          {t('hero_btn')}
        </a>
      </div>
    </section>
  );
};

export default Hero;