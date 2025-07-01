import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const AdminPanelPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    imageUrl: '',
    description: '',
    category: '',
    rating: '',
    reviewCount: '',
    stock: '',
    discount: '',
    features: '',
    colors: '',
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // 👈 get admin token

    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      reviewCount: Number(form.reviewCount),
      stock: Number(form.stock),
      discount: Number(form.discount),
      features: form.features ? form.features.split(',').map(f => f.trim()) : [],
      colors: form.colors ? form.colors.split(',').map(c => c.trim()) : [],
    };

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/products/${editingId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/products`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setForm({
        name: '', price: '', imageUrl: '', description: '', category: '',
        rating: '', reviewCount: '', stock: '', discount: '',
        features: '', colors: ''
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
      imageUrl: product.imageUrl,
      description: product.description,
      category: product.category,
      rating: product.rating ?? '',
      reviewCount: product.reviewCount ?? '',
      stock: product.stock ?? '',
      discount: product.discount ?? '',
      features: product.features ? product.features.join(', ') : '',
      colors: product.colors ? product.colors.join(', ') : '',
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      const token = localStorage.getItem('token'); // 👈 get token
      try {
        await axios.delete(
          `${API_BASE_URL}/products/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        loadProducts();
      } catch (err) {
        console.error('Error deleting product:', err.response?.data || err.message);
        alert('Error deleting product: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="mt-10 text-3xl font-bold mb-6 text-center">🛠 Admin Panel</h1>

      {/* Add/Edit Product */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="border rounded p-2" />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="border rounded p-2" />
          <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} required className="border rounded p-2" />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="border rounded p-2" />
          <input name="rating" type="number" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} className="border rounded p-2" />
          <input name="reviewCount" type="number" placeholder="Review Count" value={form.reviewCount} onChange={handleChange} className="border rounded p-2" />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="border rounded p-2" />
          <input name="discount" type="number" placeholder="Discount (%)" value={form.discount} onChange={handleChange} className="border rounded p-2" />
          <input name="features" placeholder="Features (comma separated)" value={form.features} onChange={handleChange} className="border rounded p-2 md:col-span-2" />
          <input name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} className="border rounded p-2 md:col-span-2" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border rounded p-2 md:col-span-2" />

          <div className="flex space-x-2 md:col-span-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
            {editingId && (
              <button type="button" onClick={() => {
                setEditingId(null);
                setForm({
                  name: '', price: '', imageUrl: '', description: '', category: '',
                  rating: '', reviewCount: '', stock: '', discount: '', features: '', colors: ''
                });
              }} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* All Products */}
      <section>
        <h2 className="text-xl font-semibold mb-3">📦 All Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p._id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">${p.price}</p>
                  <p className="text-xs text-gray-400">Stock: {p.stock ?? 'N/A'} | Rating: {p.rating ?? '-'}</p>
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
