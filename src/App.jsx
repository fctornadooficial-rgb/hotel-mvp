import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AdminPanel from './AdminPanel';
import { AuthProvider, useAuth } from './AuthContext';
import RegisterModal from './RegisterModal';
import GiftCard from './GiftCard';

// Полные переводы для всех языков
const translations = {
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_gallery: 'Gallery',
    nav_gift: 'Gift Cards',
    hero_title: 'Welcome to Mövenpick Na Jomtien Siam Pattaya',
    hero_subtitle: 'Discover restaurants, spa, transfers and special experiences in one place.',
    hero_btn: 'Explore Hotel',
    gallery_title: 'Discover Our Hotel',
    services_title: 'Our Premium Services',
    book_now: 'Book Now',
    footer_social: 'Follow Us',
    footer_services: 'Our Services',
    footer_map: 'Find Us',
    footer_address: '55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, Thailand',
    footer_copyright: '© 2025 Mövenpick Hotel. All rights reserved.',
    modal_title: 'Booking Request',
    label_name: 'Guest Name',
    label_room: 'Room Number',
    label_service: 'Selected Service',
    label_date: 'Date',
    label_time: 'Time',
    label_guests: 'Number of Guests',
    label_extras: 'Additional Services',
    label_comment: 'Comment',
    generate_btn: 'Generate Request Code',
    success_title: 'Request Generated Successfully!',
    request_code_label: 'Your Request Code:',
    instruction_text: 'Please save this code. Show it to our staff when using the service.',
    new_request_btn: 'Make Another Request',
    register_btn: 'Register',
    logout_btn: 'Logout',
    night_mode: 'Night Mode',
    day_mode: 'Day Mode',
    welcome: 'Welcome',
    sign_in: 'Sign In',
    or_register: 'or register',
    by_phone: 'By Phone',
    by_email: 'By Email',
    phone_register: 'Phone Registration',
    email_register: 'Email Registration',
    your_name: 'Your Name',
    phone_number: 'Phone Number',
    email: 'Email',
    password: 'Password',
    get_code: 'Get Code',
    verify_code: 'Verify Code',
    enter_code: 'Enter 6-digit code',
    confirm: 'Confirm',
    back: 'Back',
    invalid_code: 'Invalid verification code',
    already_registered: 'Already registered',
    login: 'Login',
    identifier: 'Email or Phone',
    gift_cards: 'Gift Cards Mövenpick',
    gift_subtitle: 'Perfect gift for your loved ones',
    select_amount: 'Select amount',
    card_type_label: 'Card type',
    digital: 'Digital',
    physical: 'Physical',
    recipient_info: 'Recipient info',
    recipient_name: 'Recipient name',
    recipient_email: 'Recipient email',
    personal_message: 'Personal message',
    message_placeholder: 'Write a message...',
    delivery_date: 'Delivery date',
    delivery_address: 'Delivery address',
    address_placeholder: 'Street, house, apartment',
    city: 'City',
    postal_code: 'Postal code',
    customer: 'Customer',
    order_btn: 'Place order',
    order_complete: 'Gift card ordered!',
    gift_code: 'Gift card code:',
    amount: 'Amount',
    recipient: 'Recipient',
    card_type: 'Card type',
    order_again: 'Order again',
    back_home: 'Back to home',
    please_login: 'Please register first!',
    please_address: 'Please provide delivery address for physical card',
    register_required: 'Registration required',
    please_register: 'Please register to order a gift card',
    services: {
      bbq: 'BBQ Dinner by the Sea',
      spa: 'SPA Relax Package',
      transfer: 'Airport Transfer',
      kids: 'Kids Club Activities',
      romantic: 'Romantic Dinner / Tour'
    },
    categories: {
      seafood: 'Seafood & Grill',
      wellness: 'Wellness',
      transport: 'Transport',
      family: 'Family',
      special: 'Special'
    }
  },
  ru: {
    nav_home: 'Главная',
    nav_services: 'Услуги',
    nav_gallery: 'Галерея',
    nav_gift: 'Подарочные карты',
    hero_title: 'Добро пожаловать в Mövenpick Na Jomtien Siam Pattaya',
    hero_subtitle: 'Рестораны, спа, трансферы и особые впечатления в одном месте.',
    hero_btn: 'Исследовать отель',
    gallery_title: 'Откройте наш отель',
    services_title: 'Наши премиум-услуги',
    book_now: 'Заказать',
    footer_social: 'Мы в соцсетях',
    footer_services: 'Наши услуги',
    footer_map: 'Нас найти',
    footer_address: '55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, Таиланд',
    footer_copyright: '© 2025 Mövenpick Hotel. Все права защищены.',
    modal_title: 'Заявка на бронирование',
    label_name: 'Имя гостя',
    label_room: 'Номер комнаты',
    label_service: 'Выбранная услуга',
    label_date: 'Дата',
    label_time: 'Время',
    label_guests: 'Количество гостей',
    label_extras: 'Дополнительные услуги',
    label_comment: 'Комментарий',
    generate_btn: 'Сгенерировать код',
    success_title: 'Запрос успешно создан!',
    request_code_label: 'Ваш код запроса:',
    instruction_text: 'Сохраните этот код. Покажите его персоналу при использовании услуги.',
    new_request_btn: 'Создать новый запрос',
    register_btn: 'Регистрация',
    logout_btn: 'Выйти',
    night_mode: 'Ночной режим',
    day_mode: 'Дневной режим',
    welcome: 'Добро пожаловать',
    sign_in: 'Войти',
    or_register: 'или зарегистрироваться',
    by_phone: 'По телефону',
    by_email: 'По email',
    phone_register: 'Регистрация по телефону',
    email_register: 'Регистрация по email',
    your_name: 'Ваше имя',
    phone_number: 'Номер телефона',
    email: 'Email',
    password: 'Пароль',
    get_code: 'Получить код',
    verify_code: 'Подтвердить код',
    enter_code: 'Введите 6-значный код',
    confirm: 'Подтвердить',
    back: 'Назад',
    invalid_code: 'Неверный код подтверждения',
    already_registered: 'Уже зарегистрированы',
    login: 'Войти',
    identifier: 'Email или телефон',
    gift_cards: 'Подарочные карты Mövenpick',
    gift_subtitle: 'Идеальный подарок для ваших близких',
    select_amount: 'Выберите сумму',
    card_type_label: 'Тип карты',
    digital: 'Цифровая',
    physical: 'Физическая',
    recipient_info: 'Информация о получателе',
    recipient_name: 'Имя получателя',
    recipient_email: 'Email получателя',
    personal_message: 'Личное сообщение',
    message_placeholder: 'Напишите поздравление...',
    delivery_date: 'Дата доставки',
    delivery_address: 'Адрес доставки',
    address_placeholder: 'Улица, дом, квартира',
    city: 'Город',
    postal_code: 'Почтовый индекс',
    customer: 'Заказчик',
    order_btn: 'Оформить заказ',
    order_complete: 'Подарочная карта заказана!',
    gift_code: 'Код подарочной карты:',
    amount: 'Сумма',
    recipient: 'Получатель',
    card_type: 'Тип карты',
    order_again: 'Заказать ещё',
    back_home: 'На главную',
    please_login: 'Пожалуйста, сначала зарегистрируйтесь!',
    please_address: 'Пожалуйста, укажите адрес доставки для физической карты',
    register_required: 'Требуется регистрация',
    please_register: 'Пожалуйста, зарегистрируйтесь, чтобы заказать подарочную карту',
    services: {
      bbq: 'BBQ Ужин у моря',
      spa: 'SPA Релакс пакет',
      transfer: 'Трансфер из аэропорта',
      kids: 'Детский клуб',
      romantic: 'Романтический ужин/тур'
    },
    categories: {
      seafood: 'Морепродукты и гриль',
      wellness: 'Оздоровление',
      transport: 'Транспорт',
      family: 'Семейный',
      special: 'Особый'
    }
  },
  zh: {
    nav_home: '首页',
    nav_services: '服务',
    nav_gallery: '画廊',
    nav_gift: '礼品卡',
    hero_title: '欢迎来到 Mövenpick Na Jomtien Siam Pattaya',
    hero_subtitle: '探索餐厅、水疗、接送和特别体验。',
    hero_btn: '探索酒店',
    gallery_title: '发现我们的酒店',
    services_title: '我们的尊享服务',
    book_now: '立即预订',
    footer_social: '关注我们',
    footer_services: '我们的服务',
    footer_map: '位置',
    footer_address: '55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, 泰国',
    footer_copyright: '© 2025 Mövenpick Hotel. 版权所有',
    modal_title: '预订请求',
    label_name: '客人姓名',
    label_room: '房间号码',
    label_service: '选择的服务',
    label_date: '日期',
    label_time: '时间',
    label_guests: '客人数量',
    label_extras: '附加服务',
    label_comment: '备注',
    generate_btn: '生成请求代码',
    success_title: '请求成功生成！',
    request_code_label: '您的请求代码：',
    instruction_text: '请保存此代码。使用时请向工作人员出示。',
    new_request_btn: '创建新请求',
    register_btn: '注册',
    logout_btn: '退出',
    night_mode: '夜间模式',
    day_mode: '日间模式',
    welcome: '欢迎',
    sign_in: '登录',
    or_register: '或注册',
    by_phone: '通过电话',
    by_email: '通过邮箱',
    phone_register: '电话注册',
    email_register: '邮箱注册',
    your_name: '您的名字',
    phone_number: '电话号码',
    email: '邮箱',
    password: '密码',
    get_code: '获取验证码',
    verify_code: '验证码',
    enter_code: '输入6位验证码',
    confirm: '确认',
    back: '返回',
    invalid_code: '无效验证码',
    already_registered: '已注册',
    login: '登录',
    identifier: '邮箱或电话',
    gift_cards: '礼品卡 Mövenpick',
    gift_subtitle: '给亲人的完美礼物',
    select_amount: '选择金额',
    card_type_label: '卡类型',
    digital: '数字',
    physical: '实体',
    recipient_info: '收件人信息',
    recipient_name: '收件人姓名',
    recipient_email: '收件人邮箱',
    personal_message: '个人留言',
    message_placeholder: '写祝福语...',
    delivery_date: '送达日期',
    delivery_address: '送货地址',
    address_placeholder: '街道, 房屋, 公寓',
    city: '城市',
    postal_code: '邮政编码',
    customer: '客户',
    order_btn: '下订单',
    order_complete: '礼品卡已订购！',
    gift_code: '礼品卡代码：',
    amount: '金额',
    recipient: '收件人',
    card_type: '卡类型',
    order_again: '再次订购',
    back_home: '返回首页',
    please_login: '请先注册！',
    please_address: '请提供实体卡的送货地址',
    register_required: '需要注册',
    please_register: '请注册以订购礼品卡',
    services: {
      bbq: '海边烧烤晚餐',
      spa: '水疗放松套餐',
      transfer: '机场接送',
      kids: '儿童俱乐部活动',
      romantic: '浪漫晚餐/旅游'
    },
    categories: {
      seafood: '海鲜和烧烤',
      wellness: '健康养生',
      transport: '交通',
      family: '家庭',
      special: '特别'
    }
  },
  ja: {
    nav_home: 'ホーム',
    nav_services: 'サービス',
    nav_gallery: 'ギャラリー',
    nav_gift: 'ギフトカード',
    hero_title: 'Mövenpick Na Jomtien Siam Pattaya へようこそ',
    hero_subtitle: 'レストラン、スパ、送迎、特別な体験を一か所で。',
    hero_btn: 'ホテルを探索',
    gallery_title: 'ホテルを見る',
    services_title: 'プレミアムサービス',
    book_now: '予約する',
    footer_social: 'SNS',
    footer_services: 'サービス',
    footer_map: '場所',
    footer_address: '55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, タイ',
    footer_copyright: '© 2025 Mövenpick Hotel. 全著作権所有',
    modal_title: '予約リクエスト',
    label_name: 'ゲスト名',
    label_room: '部屋番号',
    label_service: '選択したサービス',
    label_date: '日付',
    label_time: '時間',
    label_guests: 'ゲスト数',
    label_extras: '追加サービス',
    label_comment: 'コメント',
    generate_btn: 'コードを生成',
    success_title: 'リクエストが生成されました！',
    request_code_label: 'リクエストコード：',
    instruction_text: 'このコードを保存してください。サービス利用時にスタッフに提示してください。',
    new_request_btn: '新しいリクエスト',
    register_btn: '登録',
    logout_btn: 'ログアウト',
    night_mode: 'ナイトモード',
    day_mode: 'デイモード',
    welcome: 'ようこそ',
    sign_in: 'サインイン',
    or_register: 'または登録',
    by_phone: '電話で',
    by_email: 'メールで',
    phone_register: '電話登録',
    email_register: 'メール登録',
    your_name: 'お名前',
    phone_number: '電話番号',
    email: 'メール',
    password: 'パスワード',
    get_code: 'コードを取得',
    verify_code: 'コードを確認',
    enter_code: '6桁のコードを入力',
    confirm: '確認',
    back: '戻る',
    invalid_code: '無効なコード',
    already_registered: '登録済み',
    login: 'ログイン',
    identifier: 'メールまたは電話',
    gift_cards: 'ギフトカード Mövenpick',
    gift_subtitle: '大切な人への完璧なギフト',
    select_amount: '金額を選択',
    card_type_label: 'カードタイプ',
    digital: 'デジタル',
    physical: '物理',
    recipient_info: '受取人情報',
    recipient_name: '受取人名',
    recipient_email: '受取人メール',
    personal_message: '個人的なメッセージ',
    message_placeholder: 'メッセージを書く...',
    delivery_date: '配達日',
    delivery_address: '配達先住所',
    address_placeholder: '番地、建物、アパート',
    city: '都市',
    postal_code: '郵便番号',
    customer: '顧客',
    order_btn: '注文する',
    order_complete: 'ギフトカードを注文しました！',
    gift_code: 'ギフトカードコード：',
    amount: '金額',
    recipient: '受取人',
    card_type: 'カードタイプ',
    order_again: '再注文',
    back_home: 'ホームに戻る',
    please_login: 'まず登録してください！',
    please_address: '物理カードの配達先住所を入力してください',
    register_required: '登録が必要です',
    please_register: 'ギフトカードを注文するには登録してください',
    services: {
      bbq: 'ビーチBBQディナー',
      spa: 'SPAリラックスパッケージ',
      transfer: '空港送迎',
      kids: 'キッズクラブ',
      romantic: 'ロマンチックディナー/ツアー'
    },
    categories: {
      seafood: 'シーフード＆グリル',
      wellness: 'ウェルネス',
      transport: '交通',
      family: 'ファミリー',
      special: 'スペシャル'
    }
  },
  ko: {
    nav_home: '홈',
    nav_services: '서비스',
    nav_gallery: '갤러리',
    nav_gift: '기프트 카드',
    hero_title: 'Mövenpick Na Jomtien Siam Pattaya에 오신 것을 환영합니다',
    hero_subtitle: '레스토랑, 스파, 교통편 및 특별 경험을 한곳에서.',
    hero_btn: '호텔 둘러보기',
    gallery_title: '호텔 둘러보기',
    services_title: '프리미엄 서비스',
    book_now: '예약하기',
    footer_social: '팔로우',
    footer_services: '서비스',
    footer_map: '위치',
    footer_address: '55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, 태국',
    footer_copyright: '© 2025 Mövenpick Hotel. 모든 권리 보유',
    modal_title: '예약 요청',
    label_name: '고객명',
    label_room: '객실 번호',
    label_service: '선택한 서비스',
    label_date: '날짜',
    label_time: '시간',
    label_guests: '인원 수',
    label_extras: '추가 서비스',
    label_comment: '요청사항',
    generate_btn: '코드 생성',
    success_title: '요청이 생성되었습니다!',
    request_code_label: '요청 코드:',
    instruction_text: '이 코드를 저장하세요. 서비스 이용 시 직원에게 제시하세요.',
    new_request_btn: '새 요청 만들기',
    register_btn: '등록',
    logout_btn: '로그아웃',
    night_mode: '야간 모드',
    day_mode: '일간 모드',
    welcome: '환영합니다',
    sign_in: '로그인',
    or_register: '또는 등록',
    by_phone: '전화로',
    by_email: '이메일로',
    phone_register: '전화 등록',
    email_register: '이메일 등록',
    your_name: '이름',
    phone_number: '전화번호',
    email: '이메일',
    password: '비밀번호',
    get_code: '코드 받기',
    verify_code: '코드 확인',
    enter_code: '6자리 코드 입력',
    confirm: '확인',
    back: '뒤로',
    invalid_code: '잘못된 코드',
    already_registered: '이미 등록됨',
    login: '로그인',
    identifier: '이메일 또는 전화',
    gift_cards: '기프트 카드 Mövenpick',
    gift_subtitle: '사랑하는 사람을 위한 완벽한 선물',
    select_amount: '금액 선택',
    card_type_label: '카드 유형',
    digital: '디지털',
    physical: '물리적',
    recipient_info: '수취인 정보',
    recipient_name: '수취인 이름',
    recipient_email: '수취인 이메일',
    personal_message: '개인 메시지',
    message_placeholder: '메시지 작성...',
    delivery_date: '배송 날짜',
    delivery_address: '배송 주소',
    address_placeholder: '거리, 건물, 아파트',
    city: '도시',
    postal_code: '우편번호',
    customer: '고객',
    order_btn: '주문하기',
    order_complete: '기프트 카드 주문 완료!',
    gift_code: '기프트 카드 코드:',
    amount: '금액',
    recipient: '수취인',
    card_type: '카드 유형',
    order_again: '다시 주문',
    back_home: '홈으로 돌아가기',
    please_login: '먼저 등록해주세요!',
    please_address: '실물 카드 배송 주소를 입력해주세요',
    register_required: '등록 필요',
    please_register: '기프트 카드를 주문하려면 등록해주세요',
    services: {
      bbq: '해변 BBQ 디너',
      spa: 'SPA 릴렉스 패키지',
      transfer: '공항 이동',
      kids: '키즈 클럽',
      romantic: '로맨틱 디너/투어'
    },
    categories: {
      seafood: '해산물 & 그릴',
      wellness: '웰니스',
      transport: '교통',
      family: '가족',
      special: '스페셜'
    }
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_services: 'الخدمات',
    nav_gallery: 'معرض',
    nav_gift: 'بطاقات الهدايا',
    hero_title: 'مرحباً بكم في موفنبيك نا جومتين سيام باتايا',
    hero_subtitle: 'اكتشف المطاعم والسبا والتنقلات والتجارب المميزة في مكان واحد.',
    hero_btn: 'استكشف الفندق',
    gallery_title: 'اكتشف فندقنا',
    services_title: 'خدماتنا المميزة',
    book_now: 'احجز الآن',
    footer_social: 'تابعنا',
    footer_services: 'خدماتنا',
    footer_map: 'موقعنا',
    footer_address: '55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, تايلاند',
    footer_copyright: '© 2025 Mövenpick Hotel. جميع الحقوق محفوظة',
    modal_title: 'طلب حجز',
    label_name: 'اسم الضيف',
    label_room: 'رقم الغرفة',
    label_service: 'الخدمة المختارة',
    label_date: 'التاريخ',
    label_time: 'الوقت',
    label_guests: 'عدد الضيوف',
    label_extras: 'خدمات إضافية',
    label_comment: 'تعليق',
    generate_btn: 'إنشاء رمز الطلب',
    success_title: 'تم إنشاء الطلب بنجاح!',
    request_code_label: 'رمز طلبك:',
    instruction_text: 'يرجى حفظ هذا الرمز. أظهره لموظفينا عند استخدام الخدمة.',
    new_request_btn: 'تقديم طلب آخر',
    register_btn: 'تسجيل',
    logout_btn: 'تسجيل الخروج',
    night_mode: 'الوضع الليلي',
    day_mode: 'الوضع النهاري',
    welcome: 'مرحباً',
    sign_in: 'تسجيل الدخول',
    or_register: 'أو التسجيل',
    by_phone: 'عن طريق الهاتف',
    by_email: 'عن طريق البريد',
    phone_register: 'التسجيل بالهاتف',
    email_register: 'التسجيل بالبريد',
    your_name: 'اسمك',
    phone_number: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    get_code: 'احصل على الرمز',
    verify_code: 'تحقق من الرمز',
    enter_code: 'أدخل رمز 6 أرقام',
    confirm: 'تأكيد',
    back: 'رجوع',
    invalid_code: 'رمز غير صحيح',
    already_registered: 'مسجل بالفعل',
    login: 'تسجيل الدخول',
    identifier: 'البريد أو الهاتف',
    gift_cards: 'بطاقات الهدايا Mövenpick',
    gift_subtitle: 'الهدية المثالية لأحبائك',
    select_amount: 'اختر المبلغ',
    card_type_label: 'نوع البطاقة',
    digital: 'رقمية',
    physical: 'مادية',
    recipient_info: 'معلومات المستلم',
    recipient_name: 'اسم المستلم',
    recipient_email: 'بريد المستلم',
    personal_message: 'رسالة شخصية',
    message_placeholder: 'اكتب رسالة...',
    delivery_date: 'تاريخ التسليم',
    delivery_address: 'عنوان التسليم',
    address_placeholder: 'الشارع، المنزل، الشقة',
    city: 'مدينة',
    postal_code: 'الرمز البريدي',
    customer: 'الزبون',
    order_btn: 'تقديم الطلب',
    order_complete: 'تم طلب بطاقة الهدية!',
    gift_code: 'رمز بطاقة الهدية:',
    amount: 'المبلغ',
    recipient: 'المستلم',
    card_type: 'نوع البطاقة',
    order_again: 'طلب مرة أخرى',
    back_home: 'العودة إلى الرئيسية',
    please_login: 'يرجى التسجيل أولاً!',
    please_address: 'يرجى تقديم عنوان التسليم للبطاقة المادية',
    register_required: 'التسجيل مطلوب',
    please_register: 'يرجى التسجيل لطلب بطاقة الهدية',
    services: {
      bbq: 'عشاء الشواء على البحر',
      spa: 'باقة استرخاء السبا',
      transfer: 'النقل من المطار',
      kids: 'نادي الأطفال',
      romantic: 'عشاء رومانسي / جولة'
    },
    categories: {
      seafood: 'المأكولات البحرية والشواء',
      wellness: 'العافية',
      transport: 'النقل',
      family: 'عائلي',
      special: 'خاص'
    }
  },
  vi: {
    nav_home: 'Trang chủ',
    nav_services: 'Dịch vụ',
    nav_gallery: 'Thư viện',
    nav_gift: 'Thẻ quà tặng',
    hero_title: 'Chào mừng đến Mövenpick Na Jomtien Siam Pattaya',
    hero_subtitle: 'Khám phá nhà hàng, spa, đưa đón và trải nghiệm đặc biệt trong một nơi.',
    hero_btn: 'Khám phá Khách sạn',
    gallery_title: 'Khám phá Khách sạn của Chúng tôi',
    services_title: 'Dịch vụ Cao cấp của Chúng tôi',
    book_now: 'Đặt ngay',
    footer_social: 'Theo dõi Chúng tôi',
    footer_services: 'Dịch vụ của Chúng tôi',
    footer_map: 'Tìm Chúng tôi',
    footer_address: '55 Moo 2, Na Jomtien, Sattahip, Chonburi 20250, Thái Lan',
    footer_copyright: '© 2025 Mövenpick Hotel. Đã đăng ký bản quyền.',
    modal_title: 'Yêu cầu Đặt phòng',
    label_name: 'Tên Khách',
    label_room: 'Số Phòng',
    label_service: 'Dịch vụ Đã chọn',
    label_date: 'Ngày',
    label_time: 'Giờ',
    label_guests: 'Số lượng Khách',
    label_extras: 'Dịch vụ Bổ sung',
    label_comment: 'Bình luận',
    generate_btn: 'Tạo Mã Yêu cầu',
    success_title: 'Yêu cầu Đã được Tạo Thành công!',
    request_code_label: 'Mã Yêu cầu của Bạn:',
    instruction_text: 'Vui lòng lưu mã này. Xuất trình cho nhân viên khi sử dụng dịch vụ.',
    new_request_btn: 'Tạo Yêu cầu Khác',
    register_btn: 'Đăng ký',
    logout_btn: 'Đăng xuất',
    night_mode: 'Chế độ tối',
    day_mode: 'Chế độ sáng',
    welcome: 'Chào mừng',
    sign_in: 'Đăng nhập',
    or_register: 'hoặc đăng ký',
    by_phone: 'Qua điện thoại',
    by_email: 'Qua email',
    phone_register: 'Đăng ký qua điện thoại',
    email_register: 'Đăng ký qua email',
    your_name: 'Tên của bạn',
    phone_number: 'Số điện thoại',
    email: 'Email',
    password: 'Mật khẩu',
    get_code: 'Lấy mã',
    verify_code: 'Xác minh mã',
    enter_code: 'Nhập mã 6 chữ số',
    confirm: 'Xác nhận',
    back: 'Quay lại',
    invalid_code: 'Mã xác minh không hợp lệ',
    already_registered: 'Đã đăng ký',
    login: 'Đăng nhập',
    identifier: 'Email hoặc điện thoại',
    gift_cards: 'Thẻ quà tặng Mövenpick',
    gift_subtitle: 'Món quà hoàn hảo cho người thân',
    select_amount: 'Chọn số tiền',
    card_type_label: 'Loại thẻ',
    digital: 'Kỹ thuật số',
    physical: 'Vật lý',
    recipient_info: 'Thông tin người nhận',
    recipient_name: 'Tên người nhận',
    recipient_email: 'Email người nhận',
    personal_message: 'Tin nhắn cá nhân',
    message_placeholder: 'Viết lời chúc...',
    delivery_date: 'Ngày giao hàng',
    delivery_address: 'Địa chỉ giao hàng',
    address_placeholder: 'Đường, nhà, căn hộ',
    city: 'Thành phố',
    postal_code: 'Mã bưu điện',
    customer: 'Khách hàng',
    order_btn: 'Đặt hàng',
    order_complete: 'Thẻ quà tặng đã đặt hàng!',
    gift_code: 'Mã thẻ quà tặng:',
    amount: 'Số tiền',
    recipient: 'Người nhận',
    card_type: 'Loại thẻ',
    order_again: 'Đặt hàng lại',
    back_home: 'Về trang chủ',
    please_login: 'Vui lòng đăng ký trước!',
    please_address: 'Vui lòng cung cấp địa chỉ giao hàng cho thẻ vật lý',
    register_required: 'Yêu cầu đăng ký',
    please_register: 'Vui lòng đăng ký để đặt thẻ quà tặng',
    services: {
      bbq: 'Tiệc BBQ bên biển',
      spa: 'Gói thư giãn SPA',
      transfer: 'Đưa đón sân bay',
      kids: 'Câu lạc bộ trẻ em',
      romantic: 'Bữa tối lãng mạn / Tour'
    },
    categories: {
      seafood: 'Hải sản & Nướng',
      wellness: 'Sức khỏe',
      transport: 'Vận chuyển',
      family: 'Gia đình',
      special: 'Đặc biệt'
    }
  }
};

// Данные услуг
const services = [
  {
    id: 1,
    nameKey: 'bbq',
    categoryKey: 'seafood',
    description: 'Luxurious beachfront BBQ with fresh seafood and stunning sunset views.',
    price: '1,500 THB',
    image: '/photo/ujin.jpg',
    features: ['Fresh seafood', 'Sunset view']
  },
  {
    id: 2,
    nameKey: 'spa',
    categoryKey: 'wellness',
    description: 'Traditional Thai massage, aromatic oils, and herbal baths for ultimate relaxation.',
    price: '2,000 THB',
    image: '/photo/spa.jpg',
    features: ['Thai massage', 'Aroma oils']
  },
  {
    id: 3,
    nameKey: 'transfer',
    categoryKey: 'transport',
    description: 'Premium vehicles with professional drivers for a seamless airport journey.',
    price: '1,200 THB',
    image: '/photo/transfer.jpeg',
    features: ['Luxury cars', '24/7 service']
  },
  {
    id: 4,
    nameKey: 'kids',
    categoryKey: 'family',
    description: 'Fun games, creative workshops, and supervised play for children of all ages.',
    price: '500 THB',
    image: '/photo/nana.jpg',
    features: ['Creative play', 'Supervised']
  },
  {
    id: 5,
    nameKey: 'romantic',
    categoryKey: 'special',
    description: 'Candlelight dinner under the stars or a curated local tour for unforgettable moments.',
    price: '2,500 THB',
    image: '/photo/romantic.jpg',
    features: ['Candlelight', 'Private tour']
  }
];

const galleryImages = [
  '/photo/XXXL.webp',
  '/photo/otel4.png',
  '/photo/otel3.png',
  '/photo/otel2.png',
  '/photo/otel.png'
];

const languageList = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
];

function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [requestCode, setRequestCode] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    roomNumber: '',
    date: '',
    time: '',
    guests: 2,
    extras: '',
    comment: ''
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('ml');
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang);
    }

    const savedNightMode = localStorage.getItem('night_mode');
    if (savedNightMode === 'true') {
      setNightMode(true);
      document.body.classList.add('night-mode');
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('ml', lang);
  };

  const toggleNightMode = () => {
    setNightMode(!nightMode);
    document.body.classList.toggle('night-mode');
    localStorage.setItem('night_mode', !nightMode ? 'true' : 'false');
  };

  const t = (key) => translations[currentLang]?.[key] || translations.en[key];

  const generateRequestCode = () => {
    const prefix = selectedService?.nameKey?.substring(0, 3).toUpperCase() || 'REQ';
    const random = Math.floor(1000 + Math.random() * 9000);
    const room = formData.roomNumber.slice(-4) || '0000';
    return `${prefix}-${room}-${random}`;
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const code = generateRequestCode();
    setRequestCode(code);
    setShowForm(false);
    setShowSuccess(true);

    const requests = JSON.parse(localStorage.getItem('hotel_requests') || '[]');
    requests.push({
      id: Date.now(),
      ...formData,
      service: selectedService,
      requestCode: code,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('hotel_requests', JSON.stringify(requests));
  };

  const handleNewRequest = () => {
    setShowSuccess(false);
    setSelectedService(null);
    setFormData({
      guestName: '',
      roomNumber: '',
      date: '',
      time: '',
      guests: 2,
      extras: '',
      comment: ''
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Hero компонент
  const HeroSection = () => (
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

  // Компонент главной страницы
  const MainPage = () => {
    const { user, logout } = useAuth();

    return (
      <div className={nightMode ? 'night-mode' : ''}>
        <header className="header">
          <div className="container">
            <Link to="/" className="header__logo">MÖVENPICK</Link>

            <button
              className={`burger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span><span></span><span></span>
            </button>

            <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/">{t('nav_home')}</Link>
              <a href="#services">{t('nav_services')}</a>
              <a href="#gallery">{t('nav_gallery')}</a>
              <Link to="/gift-card">{t('nav_gift')}</Link>
            </nav>

            <div className="header__actions">
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: '#c8a86b' }}>👤 {user.name}</span>
                  <button onClick={logout} style={styles.logoutBtn}>{t('logout_btn')}</button>
                </div>
              ) : (
                <button onClick={() => setShowRegister(true)} style={styles.registerBtn}>
                  {t('register_btn')}
                </button>
              )}
              <button onClick={toggleNightMode} style={styles.nightModeBtn}>
                {nightMode ? '☀️' : '🌙'}
              </button>
              <select
                className="lang-btn"
                value={currentLang}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                {languageList.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <HeroSection />

        <section className="hotel-gallery" id="gallery">
          <div className="container">
            <h2 className="hotel-gallery__title">{t('gallery_title')}</h2>
          </div>
          <div className="carousel">
            <div className="carousel__track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {galleryImages.map((img, index) => (
                <div className="carousel__slide" key={index}>
                  <img src={img} alt={`Slide ${index}`} />
                </div>
              ))}
            </div>
            <button className="carousel__btn carousel__btn--prev" onClick={prevSlide}>❮</button>
            <button className="carousel__btn carousel__btn--next" onClick={nextSlide}>❯</button>
          </div>
          <div className="carousel__dots">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`carousel__dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        <section className="services" id="services">
          <div className="container">
            <h2 className="services__title">{t('services_title')}</h2>
            <div className="services__grid">
              {services.map(service => {
                const serviceName = t('services')[service.nameKey] || service.nameKey;
                const categoryName = t('categories')[service.categoryKey] || service.categoryKey;

                return (
                  <div key={service.id} className="service-card">
                    <img src={service.image} alt={serviceName} className="service-card__img" />
                    <div className="service-card__body">
                      <div className="service-card__category">{categoryName}</div>
                      <h3 className="service-card__title">{serviceName}</h3>
                      <p className="service-card__desc">{service.description}</p>
                      <ul className="service-card__features">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                      <div className="service-card__footer">
                        <span className="service-card__price">{service.price}</span>
                        <button
                          className="btn btn--outline service-card__btn"
                          onClick={() => handleBookNow(service)}
                        >
                          {t('book_now')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer__grid">
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_social')}</h4>
              <div className="footer__social">
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  📺
                </a>
              </div>
            </div>
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_services')}</h4>
              <ul className="footer__links">
                {services.map(service => {
                  const serviceName = t('services')[service.nameKey] || service.nameKey;
                  return (
                    <li key={service.id}><a href="#">{serviceName}</a></li>
                  );
                })}
              </ul>
            </div>
            <div className="footer__col">
              <h4 className="footer__title">{t('footer_map')}</h4>
              <p className="footer__address">{t('footer_address')}</p>
            </div>
          </div>
          <div className="footer__bottom">
            <p>{t('footer_copyright')}</p>
          </div>
        </footer>

        {showForm && (
          <div className="modal-overlay active">
            <div className="modal">
              <button className="modal__close" onClick={() => setShowForm(false)}>&times;</button>
              <h3 className="modal__title">{t('modal_title')}</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>{t('label_name')} *</label>
                  <input type="text" name="guestName" value={formData.guestName} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>{t('label_room')} *</label>
                  <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleFormChange} placeholder="e.g., 1205" required />
                </div>
                <div className="form-group">
                  <label>{t('label_service')}</label>
                  <input type="text" value={selectedService ? t('services')[selectedService.nameKey] : ''} disabled style={{ background: '#f0f0f0' }} />
                </div>
                <div className="form-group">
                  <label>{t('label_date')} *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>{t('label_time')} *</label>
                  <input type="time" name="time" value={formData.time} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>{t('label_guests')} *</label>
                  <input type="number" name="guests" min="1" max="20" value={formData.guests} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>{t('label_extras')}</label>
                  <select name="extras" value={formData.extras} onChange={handleFormChange}>
                    <option value="">None</option>
                    <option value="Flowers">Flowers (+500 THB)</option>
                    <option value="Cake">Celebration Cake (+800 THB)</option>
                    <option value="Champagne">Champagne (+1,500 THB)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('label_comment')}</label>
                  <textarea name="comment" rows="3" value={formData.comment} onChange={handleFormChange}></textarea>
                </div>
                <button type="submit" className="btn btn--accent" style={{ width: '100%' }}>{t('generate_btn')}</button>
              </form>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-modal">
              <div className="success-icon">✓</div>
              <h2 className="success-title">{t('success_title')}</h2>
              <div className="request-code-box">
                <p className="request-code-label">{t('request_code_label')}</p>
                <div className="request-code">{requestCode}</div>
              </div>
              <div className="success-details">
                <p><strong>{t('label_service')}:</strong> {selectedService ? t('services')[selectedService.nameKey] : ''}</p>
                <p><strong>{t('label_guests')}:</strong> {formData.guests}</p>
                <p className="instruction-text">{t('instruction_text')}</p>
              </div>
              <button onClick={handleNewRequest} className="btn btn--accent">{t('new_request_btn')}</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const styles = {
    registerBtn: {
      background: '#c8a86b',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    logoutBtn: {
      background: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '12px'
    },
    nightModeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '5px 10px'
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/dadaluba" element={<AdminPanel />} />
          <Route path="/gift-card" element={
            <GiftCard
              lang={currentLang}
              setLang={changeLanguage}
              t={t}
            />
          } />
          <Route path="/" element={<MainPage />} />
        </Routes>
        <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} lang={currentLang} />
      </Router>
    </AuthProvider>
  );
}

export default App;
