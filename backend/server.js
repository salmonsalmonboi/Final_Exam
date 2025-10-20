const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Restaurant Review API (SQLite)',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      reviews: '/api/reviews',
      stats: '/api/stats'
    }
  });
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// TODO: GET /api/stats - สถิติระบบ
// - จำนวนร้านทั้งหมด
// - จำนวนรีวิวทั้งหมด
// - average rating ทั้งระบบ
// - Top 5 restaurants
app.get('/api/stats', async (req, res) => {
  try {
    const db = require('./db/db');
    const totalRestaurants = await db.get('SELECT COUNT(*) AS total FROM restaurants');
    const totalReviews = await db.get('SELECT COUNT(*) AS total FROM reviews');
    const averageRating = await db.get('SELECT AVG(rating) AS average FROM reviews');
    const top5Restaurants = await db.all(
      `SELECT r.id, r.name, AVG(rv.rating) AS avgRating
       FROM restaurants r
       JOIN reviews rv ON r.id = rv.restaurant_id
       GROUP BY r.id
       ORDER BY avgRating DESC
       LIMIT 5`
    );
    res.json({
      success: true,
      data: {
        // TODO: เพิ่มข้อมูล
        totalRestaurants: totalRestaurants.total,
        totalReviews: totalReviews.total,
        averageRating: parseFloat(averageRating.average).toFixed(1),
        top5Restaurants: top5Restaurants
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats'
    });
  }
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});