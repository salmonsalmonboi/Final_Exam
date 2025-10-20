import { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { getRestaurantById } from '../services/api';

function RestaurantDetail({ restaurantId, onBack }) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      // TODO: เรียก getRestaurantById
      const result = await getRestaurantById(restaurantId);
      setRestaurant(result.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = () => {
    fetchRestaurant();
  };

  if (loading) return <div className="loading">กำลังโหลด...</div>;
  if (!restaurant) return <div className="error">ไม่พบร้านอาหาร</div>;

  return (
    <div className="restaurant-detail">
      <button className="back-button" onClick={onBack}>
        ← กลับ
      </button>

      <div className="detail-header">
        <img src={restaurant.image_url} alt={restaurant.name} />
        <div className="detail-info">
          <h1>{restaurant.name}</h1>
          <p className="category">{restaurant.category}</p>
          <p className="description">{restaurant.description}</p>
          <div className="info-row">
            <span>📍 {restaurant.location}</span>
            <span>📞 {restaurant.phone}</span>
            <span>🕐 {restaurant.open_hours}</span>
          </div>
          <div className="rating-info">
            <span className="rating">
              ⭐ {restaurant.averageRating || 0}
            </span>
            <span className="price">
              {'฿'.repeat(restaurant.price_range)}
            </span>
            <span className="total-reviews">
              ({restaurant.totalReviews} รีวิว)
            </span>
          </div>
        </div>
      </div>

      <ReviewForm
        restaurantId={restaurantId}
        onReviewAdded={handleReviewAdded}
      />

      <ReviewList reviews={restaurant.reviews || []} />
    </div>
  );
}

export default RestaurantDetail;