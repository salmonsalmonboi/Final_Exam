function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="no-reviews">ยังไม่มีรีวิว</p>;
  }

  return (
    <div className="review-list">
      <h3>รีวิว ({reviews.length})</h3>
      {reviews.map(review => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <span className="reviewer-name">{review.user_name}</span>
            <span className="review-rating">
              {'⭐'.repeat(review.rating)}
            </span>
          </div>
          <p className="review-comment">{review.comment}</p>
          <p className="review-date">
            วันที่เข้าชิม: {new Date(review.visit_date).toLocaleDateString('th-TH')}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;