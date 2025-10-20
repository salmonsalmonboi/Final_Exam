const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { validateReview } = require('../middleware/validation');

// TODO: GET /api/reviews/:restaurantId - ดึงรีวิวของร้าน
router.get('/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // ✅ เขียนโค้ด query reviews
    const reviews = await db.all(
      'SELECT * FROM reviews WHERE restaurant_id = ? ORDER BY created_at DESC',
      [restaurantId]
    );

    res.json({
      success: true,
      data: reviews,
      total: reviews.length
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews'
    });
  }
});

// TODO: POST /api/reviews - เพิ่มรีวิว
// - ต้อง validate ก่อน
// - อัปเดต average rating ของร้าน (ตัวเลือก)
router.post('/', validateReview, async (req, res) => {
  try {
    const { restaurantId, userName, rating, comment, visitDate } = req.body;

    // ✅ ตรวจสอบว่า restaurant มีอยู่
    const restaurant = await db.get(
      'SELECT id FROM restaurants WHERE id = ?',
      [restaurantId]
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // ✅ เขียนโค้ด INSERT review
    const result = await db.run(
      `INSERT INTO reviews (restaurant_id, user_name, rating, comment, visit_date)
       VALUES (?, ?, ?, ?, ?)`,
      [restaurantId, userName.trim(), rating, comment.trim(), visitDate || new Date().toISOString().split('T')[0]]
    );

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: {
        id: result.id
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding review'
    });
  }
});

module.exports = router;