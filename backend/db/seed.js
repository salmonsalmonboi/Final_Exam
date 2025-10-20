const db = require('./db');

const sampleRestaurants = [
  {
    name: 'ส้มตำนำ้อง',
    category: 'อาหารไทย',
    description: 'ร้านส้มตำอร่อยแบบดั้งเดิม',
    location: 'ตลาดนัดสวนจตุจักร',
    price_range: 1,
    phone: '02-123-4567',
    image_url: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400',
    open_hours: '10:00-20:00'
  },
  {
    name: 'ชาบูชิ',
    category: 'ชาบู',
    description: 'ชาบูคุณภาพดี น้ำซุปเข้มข้น',
    location: 'สยามสแควร์',
    price_range: 3,
    phone: '02-765-4321',
    image_url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400',
    open_hours: '11:00-22:00'
  },
  {
    name: 'พิซซ่าฮัท',
    category: 'อาหารตะวันตก',
    description: 'พิซซ่าสไตล์อเมริกันแป้งบางกรอบ',
    location: 'เซ็นทรัลเวิลด์',
    price_range: 2,
    phone: '02-555-1234',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=400',
    open_hours: '12:00-23:00'
  },
  {
    name: 'ซูชิซัง',
    category: 'อาหารญี่ปุ่น',
    description: 'ซูชิสดใหม่จากทะเล',
    location: 'เอ็มควอเทียร์',
    price_range: 3,
    phone: '02-888-7777',
    image_url: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=400',
    open_hours: '11:00-21:00'
  }
];

const sampleReviews = [
  {
    restaurantId: 1,
    userName: 'สมชาย ใจดี',
    rating: 5,
    comment: 'อร่อยมากครับ ส้มตำสดใหม่เสมอ',
    visitDate: '2024-10-01'
  },
  {
    restaurantId: 1,
    userName: 'สายฝน แสนสุข',
    rating: 4,
    comment: 'รสชาติดี แต่เผ็ดไปนิด',
    visitDate: '2024-10-05'
  },
  {
    restaurantId: 2,
    userName: 'นที นักชิม',
    rating: 5,
    comment: 'ชาบูอร่อย น้ำซุปเข้มข้นมาก',
    visitDate: '2024-09-20'
  },
  {
    restaurantId: 3,
    userName: 'พิชญา พิซซ่าเลิฟเวอร์',
    rating: 4,
    comment: 'พิซซ่าแป้งบางกรอบ รสชาติดี',
    visitDate: '2024-08-15'
  }
];

async function seed() {
  try {
    // INSERT restaurants
    for (let restaurant of sampleRestaurants) {
      await db.run(
        `INSERT INTO restaurants (name, category, description, location, price_range, phone, image_url, open_hours)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          restaurant.name,
          restaurant.category,
          restaurant.description,
          restaurant.location,
          restaurant.price_range,
          restaurant.phone,
          restaurant.image_url,
          restaurant.open_hours
        ]
      );
    }

    // INSERT reviews
    for (let review of sampleReviews) {
      await db.run(
        `INSERT INTO reviews (restaurant_id, user_name, rating, comment, visit_date)
         VALUES (?, ?, ?, ?, ?)`,
        [
          review.restaurantId,
          review.userName,
          review.rating,
          review.comment,
          review.visitDate
        ]
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();