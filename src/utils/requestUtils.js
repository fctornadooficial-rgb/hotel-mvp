// src/utils/requestUtils.js

// Генерация случайного 4-значного числа
const generateRandomNumber = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Генерация уникального кода запроса
export const generateRequestCode = (serviceName, roomNumber) => {
  // Берем первые 3 буквы услуги (заглавные)
  const servicePrefix = serviceName.substring(0, 3).toUpperCase();
  // Берем номер комнаты (последние 4 цифры)
  const roomSuffix = roomNumber.toString().slice(-4);
  // Генерируем случайное число
  const randomNum = generateRandomNumber();
  
  return `${servicePrefix}-${roomSuffix}-${randomNum}`;
};

// Сохранение запроса в localStorage
export const saveRequest = (requestData) => {
  const requests = JSON.parse(localStorage.getItem('hotel_requests') || '[]');
  const newRequest = {
    id: Date.now(),
    ...requestData,
    createdAt: new Date().toISOString()
  };
  requests.push(newRequest);
  localStorage.setItem('hotel_requests', JSON.stringify(requests));
  return newRequest;
};

// Получение всех запросов
export const getRequests = () => {
  return JSON.parse(localStorage.getItem('hotel_requests') || '[]');
};

// Получение запроса по ID
export const getRequestById = (id) => {
  const requests = getRequests();
  return requests.find(r => r.id === parseInt(id));
};