import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser, saveUser, logoutUser, registerUser, isPhoneRegistered, isEmailRegistered, loginUser } from './dataService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const registerByPhone = (phone, name, verificationCode, enteredCode) => {
    if (verificationCode !== enteredCode) {
      throw new Error('Неверный проверочный код');
    }
    
    if (isPhoneRegistered(phone)) {
      throw new Error('Этот номер телефона уже зарегистрирован');
    }

    const newUser = registerUser({
      name,
      phone,
      email: null,
      provider: 'phone'
    });
    
    if (newUser) {
      setUser(newUser);
      return newUser;
    }
    throw new Error('Ошибка регистрации');
  };

  const registerByEmail = (email, name, password, verificationCode, enteredCode) => {
    if (verificationCode !== enteredCode) {
      throw new Error('Неверный проверочный код');
    }
    
    if (isEmailRegistered(email)) {
      throw new Error('Этот email уже зарегистрирован');
    }

    const newUser = registerUser({
      name,
      email,
      password,
      phone: null,
      provider: 'email'
    });
    
    if (newUser) {
      setUser(newUser);
      return newUser;
    }
    throw new Error('Ошибка регистрации');
  };

  const login = (identifier, password) => {
    const user = loginUser(identifier, password);
    if (user) {
      setUser(user);
      return user;
    }
    throw new Error('Неверный email/телефон или пароль');
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      registerByPhone,
      registerByEmail,
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
