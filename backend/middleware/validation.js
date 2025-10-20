// TODO: สร้าง validation middleware สำหรับ review
const validateReview = (req, res, next) => {
  const { restaurantId, userName, rating, comment } = req.body;
  const errors = [];

  // ✅ เขียนโค้ด validation ด้านล่าง
  // 1. ตรวจสอบ restaurantId - ต้องเป็น number
  // 2. ตรวจสอบ userName - 2-50 characters, ไม่มี special chars
  // 3. ตรวจสอบ rating - 1-5 เท่านั้น
  // 4. ตรวจสอบ comment - 10-500 characters

  if (!restaurantId || isNaN(restaurantId)) {
    errors.push('Restaurant ID is required and must be a number');
  }

  if (!userName || userName.trim().length < 2 || userName.trim().length > 50) {
    errors.push('User name must be 2-50 characters');
  }

  if (!rating || rating < 1 || rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }

  if (!comment || comment.trim().length < 10 || comment.trim().length > 500) {
    errors.push('Comment must be 10-500 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = { validateReview };