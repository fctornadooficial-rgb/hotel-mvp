import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hotel_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Проверка существования номера телефона
  const isPhoneRegistered = (phone) => {
    const users = JSON.parse(localStorage.getItem('hotel_users') || '[]');
    return users.some(u => u.phone === phone);
  };

  // Проверка существования email
  const isEmailRegistered = (email) => {
    const users = JSON.parse(localStorage.getItem('hotel_users') || '[]');
    return users.some(u => u.email === email);
  };

  // Генерация проверочного кода
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Регистрация по номеру телефона с верификацией
  const registerByPhone = (phone, name, verificationCode, enteredCode) => {
    if (verificationCode !== enteredCode) {
      throw new Error('Неверный проверочный код');
    }
    
    if (isPhoneRegistered(phone)) {
      throw new Error('Этот номер телефона уже зарегистрирован');
    }

    const newUser = {
      id: Date.now(),
      name,
      phone,
      email: null,
      provider: 'phone',
      createdAt: new Date().toISOString()
    };
    
    const users = JSON.parse(localStorage.getItem('hotel_users') || '[]');
    users.push(newUser);
    localStorage.setItem('hotel_users', JSON.stringify(users));
    localStorage.setItem('hotel_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  // Регистрация по email с верификацией
  const registerByEmail = (email, name, password, verificationCode, enteredCode) => {
    if (verificationCode !== enteredCode) {
      throw new Error('Неверный проверочный код');
    }
    
    if (isEmailRegistered(email)) {
      throw new Error('Этот email уже зарегистрирован');
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phone: null,
      provider: 'email',
      createdAt: new Date().toISOString()
    };
    
    const users = JSON.parse(localStorage.getItem('hotel_users') || '[]');
    users.push(newUser);
    localStorage.setItem('hotel_users', JSON.stringify(users));
    localStorage.setItem('hotel_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  // Регистрация через соцсети
  const registerByGoogle = (name, email) => {
    const newUser = {
      id: Date.now(),
      name: name || 'Google User',
      email: email || 'user@gmail.com',
      provider: 'google',
      createdAt: new Date().toISOString()
    };
    
    const users = JSON.parse(localStorage.getItem('hotel_users') || '[]');
    users.push(newUser);
    localStorage.setItem('hotel_users', JSON.stringify(users));
    localStorage.setItem('hotel_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const registerByFacebook = (name, email) => {
    const newUser = {
      id: Date.now(),
      name: name || 'Facebook User',
      email: email || 'user@facebook.com',
      provider: 'facebook',
      createdAt: new Date().toISOString()
    };
    
    const users = JSON.parse(localStorage.getItem('hotel_users') || '[]');
    users.push(newUser);
    localStorage.setItem('hotel_users', JSON.stringify(users));
    localStorage.setItem('hotel_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const registerByVK = (name, email) => {
    const newUser = {
      id: Date.now(),
      name: name || 'VK User',
      email: email || 'user@vk.com',
      provider: 'vk',
      createdAt: new Date().toISOString()
    };
    
    const users = JSON.parse(localStorage.getItem('hotel_users') || '[]');
    users.push(newUser);
    localStorage.setItem('hotel_users', JSON.stringify(users));
    localStorage.setItem('hotel_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  // Вход в аккаунт
  const login = (identifier, password) => {
    const users = JSON.parse(localStorage.getItem('hotel_users') || '[]');
    
    const user = users.find(u => 
      (u.email === identifier || u.phone === identifier) && u.password === password
    );
    
    if (!user) {
      throw new Error('Неверный email/телефон или пароль');
    }
    
    localStorage.setItem('hotel_user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('hotel_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      registerByPhone,
      registerByEmail,
      registerByGoogle,
      registerByFacebook,
      registerByVK,
      login,
      logout,
      isPhoneRegistered,
      isEmailRegistered,
      generateVerificationCode
    }}>
      {children}
    </AuthContext.Provider>
  );
};