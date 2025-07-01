const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.error('fetchProducts error:', err);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch (err) {
    console.error('fetchProductById error:', err);
    return null;
  }
};

export const fetchRelatedProducts = async (category, excludeId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Failed to fetch related products');
    const data = await res.json();
    // Filter out the product with excludeId (usually product._id)
    return data.filter((p) => p._id !== excludeId).slice(0, 4);
  } catch (err) {
    console.error('fetchRelatedProducts error:', err);
    return [];
  }
};
