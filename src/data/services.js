// src/data/services.js
export const services = [
  {
    id: 1,
    link: "bbq.html",
    image: "/photo/ujin.jpg",
    categoryKey: "cat_bbq",
    titleKey: "bbq_title",
    descKey: "bbq_short",
    features: [
      { text: "Fresh seafood", key: "feat_bbq_1" },
      { text: "Sunset view", key: "feat_bbq_2" }
    ],
    price: "1,500 THB"
  },
  {
    id: 2,
    link: "spa.html",
    image: "/photo/spa.jpg",
    categoryKey: "cat_spa",
    titleKey: "spa_title",
    descKey: "spa_short",
    features: [
      { text: "Thai massage", key: "feat_spa_1" },
      { text: "Aroma oils", key: "feat_spa_2" }
    ],
    price: "2,000 THB"
  },
  {
    id: 3,
    link: "transfer.html",
    image: "/photo/transfer.jpeg",
    categoryKey: "cat_transfer",
    titleKey: "transfer_title",
    descKey: "transfer_short",
    features: [
      { text: "Luxury cars", key: "feat_transfer_1" },
      { text: "24/7 service", key: "feat_transfer_2" }
    ],
    price: "1,200 THB"
  },
  {
    id: 4,
    link: "kids.html",
    image: "/photo/nana.jpg",
    categoryKey: "cat_kids",
    titleKey: "kids_title",
    descKey: "kids_short",
    features: [
      { text: "Creative play", key: "feat_kids_1" },
      { text: "Supervised", key: "feat_kids_2" }
    ],
    price: "500 THB"
  },
  {
    id: 5,
    link: "romantic.html",
    image: "/photo/romantic.jpg",
    categoryKey: "cat_romantic",
    titleKey: "romantic_title",
    descKey: "romantic_short",
    features: [
      { text: "Candlelight", key: "feat_romantic_1" },
      { text: "Private tour", key: "feat_romantic_2" }
    ],
    price: "2,500 THB"
  }
];