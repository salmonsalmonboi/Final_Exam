function FilterPanel({ onFilterChange, filters }) {
  const categories = [
    'ทั้งหมด',
    'อาหารไทย',
    'อาหารตะวันตก',
    'อาหารญี่ปุ่น',
    'ฟาสต์ฟู้ด'
  ];

  const handleCategoryChange = (category) => {
    onFilterChange({
      category: category === 'ทั้งหมด' ? '' : category
    });
  };

  const handleMinRatingChange = (rating) => {
    onFilterChange({ minRating: rating || '' });
  };

  const handlePriceChange = (price) => {
    onFilterChange({ priceRange: price || '' });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>หมวดหมู่:</label>
        <select
          value={filters.category || 'ทั้งหมด'}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>คะแนนขั้นต่ำ:</label>
        <select
          value={filters.minRating || ''}
          onChange={(e) => handleMinRatingChange(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="3">3 ดาวขึ้นไป</option>
          <option value="4">4 ดาวขึ้นไป</option>
          <option value="5">5 ดาว</option>
        </select>
      </div>

      <div className="filter-group">
        <label>ช่วงราคา:</label>
        <select
          value={filters.priceRange || ''}
          onChange={(e) => handlePriceChange(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="1">฿ (ถูก)</option>
          <option value="2">฿฿ (ปานกลาง)</option>
          <option value="3">฿฿฿ (แพง)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;