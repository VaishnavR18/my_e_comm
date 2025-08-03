import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const AdminPanelPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    name: '', price: '', imageUrls: '', description: '', category: '',
    brand: '', capacity: '', backupTime: '', warranty: '',
    rating: '', reviewCount: '', stock: '', discount: '',
    features: '', isRecommended: false
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      reviewCount: Number(form.reviewCount),
      stock: Number(form.stock),
      discount: Number(form.discount),
      features: form.features ? form.features.split(',').map(f => f.trim()) : [],
      imageUrls: form.imageUrls ? form.imageUrls.split(',').map(url => url.trim()) : []
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/products/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE_URL}/products`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({
        name: '', price: '', imageUrls: '', description: '', category: '',
        brand: '', capacity: '', backupTime: '', warranty: '',
        rating: '', reviewCount: '', stock: '', discount: '',
        features: '', isRecommended: false
      });
      setEditingId(null);
      loadProducts();
    } catch (err) {
      console.error('Error saving product:', err.response?.data || err.message);
      alert('Error saving product: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      imageUrls: product.imageUrls ? product.imageUrls.join(', ') : '',
      description: product.description,
      category: product.category,
      brand: product.brand ?? '',
      capacity: product.capacity ?? '',
      backupTime: product.backupTime ?? '',
      warranty: product.warranty ?? '',
      rating: product.rating ?? '',
      reviewCount: product.reviewCount ?? '',
      stock: product.stock ?? '',
      discount: product.discount ?? '',
      features: product.features ? product.features.join(', ') : '',
      isRecommended: product.isRecommended || false
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        loadProducts();
      } catch (err) {
        alert('Error deleting product: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6 mt-20">🛠 Admin Product Manager</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
      </div>

      {/* Add/Edit Product Form */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">{editingId ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="border p-2 rounded" />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="border p-2 rounded" />
          <input name="imageUrls" placeholder="Image URLs (comma separated)" value={form.imageUrls} onChange={handleChange} required className="border p-2 rounded" />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="border p-2 rounded" />
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required className="border p-2 rounded" />
          <input name="capacity" placeholder="Capacity (e.g., 1000VA)" value={form.capacity} onChange={handleChange} required className="border p-2 rounded" />
          <input name="backupTime" placeholder="Backup Time (e.g., 30 mins)" value={form.backupTime} onChange={handleChange} className="border p-2 rounded" />
          <input name="warranty" placeholder="Warranty (e.g., 2 years)" value={form.warranty} onChange={handleChange} className="border p-2 rounded" />
          <input name="rating" type="number" placeholder="Rating" value={form.rating} onChange={handleChange} className="border p-2 rounded" />
          <input name="reviewCount" type="number" placeholder="Review Count" value={form.reviewCount} onChange={handleChange} className="border p-2 rounded" />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-2 rounded" />
          <input name="discount" type="number" placeholder="Discount %" value={form.discount} onChange={handleChange} className="border p-2 rounded" />
          <input name="features" placeholder="Features (comma separated)" value={form.features} onChange={handleChange} className="border p-2 rounded col-span-2" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded col-span-2" />
          <label className="col-span-2">
            <input
              type="checkbox"
              name="isRecommended"
              checked={form.isRecommended}
              onChange={handleChange}
              className="mr-2"
            />
            Mark as Smart Recommendation
          </label>

          <div className="flex space-x-2 col-span-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    name: '', price: '', imageUrls: '', description: '', category: '',
                    brand: '', capacity: '', backupTime: '', warranty: '',
                    rating: '', reviewCount: '', stock: '', discount: '',
                    features: '', colors: '', isRecommended: false
                  });
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Image Preview */}
        {form.imageUrls && form.imageUrls.split(',')[0] && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Preview:</p>
            <img src={form.imageUrls.split(',')[0].trim()} alt="Preview" className="h-40 rounded shadow" />
          </div>
        )}
      </section>

      {/* Product List */}
      <section>
        <h2 className="text-xl font-semibold mb-3">📦 All Products ({filtered.length})</h2>
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((p) => (
              <div key={p._id} className="border p-4 rounded flex justify-between items-center bg-white shadow-sm">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">₹{p.price} | Stock: {p.stock}</p>
                  {p.isRecommended && <p className="text-xs text-green-600">🌟 Smart Recommended</p>}
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanelPage;
