const express = require('express');
const router = express.Router();
const db = require('../db/db');

// TODO: GET /api/restaurants - ดึงรีวิวทั้งหมด + filter
// - Parameter: search, category, minRating, priceRange
// - ส่ง restaurants array + average rating + total reviews
router.get('/', async (req, res) => {
  try {
    const { search, category, minRating, priceRange } = req.query;

    // ✅ เขียนโค้ด SQL query ด้านล่าง
    let sql = 'SELECT * FROM restaurants WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    const restaurants = await db.all(sql, params);

    // ✅ สำหรับแต่ละ restaurant ดึง reviews เพื่อคำนวณ average rating
    // - ใช้ JOIN หรือ query reviews table
    // - คำนวณ average rating
    // - คำนวณ total reviews
    // - filter ตาม minRating (ถ้ามี)

    // TODO: เพิ่ม average rating และ total reviews ให้กับแต่ละ restaurant
    for (let restaurant of restaurants) {
      const reviews = await db.all(
        'SELECT rating FROM reviews WHERE restaurant_id = ?',
        [restaurant.id]
      );

      if (reviews.length > 0) {
        const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
        restaurant.averageRating = parseFloat(avgRating);
        restaurant.totalReviews = reviews.length;
      } else {
        restaurant.averageRating = 0;
        restaurant.totalReviews = 0;
      }
    }

    // TODO: filter ตาม minRating (ถ้ามี)
    let filtered = restaurants;
    if (minRating) {
      filtered = restaurants.filter(r => r.averageRating >= parseFloat(minRating));
    }

    if (priceRange) {
      filtered = filtered.filter(r => r.price_range === parseInt(priceRange));
    }

    res.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurants'
    });
  }
});

// TODO: GET /api/restaurants/:id - ดึงรายละเอียดร้าน + reviews
// - Join กับ reviews table เพื่อดึง reviews
// - คำนวณ average rating
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ เขียนโค้ด
    const restaurant = await db.get(
      'SELECT * FROM restaurants WHERE id = ?',
      [id]
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // ✅ ดึง reviews จาก table
    const reviews = await db.all(
      'SELECT * FROM reviews WHERE restaurant_id = ? ORDER BY created_at DESC',
      [id]
    );

    // ✅ คำนวณ average rating
    let avgRating = 0;
    if (reviews.length > 0) {
      avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    }

    res.json({
      success: true,
      data: {
        ...restaurant,
        averageRating: parseFloat(avgRating),
        totalReviews: reviews.length,
        reviews
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurant'
    });
  }
});

// BONUS: GET /api/restaurants/category/:category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;

    // TODO: ดึง restaurants ตาม category
    const restaurants = await db.all(
      'SELECT * FROM restaurants WHERE category = ?',
      [category]
    );

    res.json({
      success: true,
      data: restaurants,
      total: restaurants.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurants by category'
    });
  }
});

module.exports = router;