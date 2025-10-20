const API_URL = 'http://localhost:3000/api';

// TODO: ทำให้ครบ 50% - ต้อง implement สำหรับ students
export const getRestaurants = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/restaurants?${query}`);
    
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    // TODO: implement
    const response = await fetch(`${API_URL}/restaurants/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getReviewsByRestaurant = async (restaurantId) => {
  try {
    // TODO: implement
    const response = await fetch(`${API_URL}/reviews/${restaurantId}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const addReview = async (reviewData) => {
  try {
    // TODO: implement POST
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add review');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    // TODO: implement
    const response = await fetch(`${API_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};