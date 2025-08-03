import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/products';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortOption, setSortOption] = useState('Featured');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        console.log('Fetched products:', data);
        setAllProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        console.error('Load products failed:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];

  useEffect(() => {
    let result = [...allProducts];

    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }

    result = result.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    if (sortOption === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, sortOption, allProducts]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 100000 });
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Explore UPS Systems</h1>
          <p className="text-gray-600">Reliable Power Backup for Every Need</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Filter Sidebar */}
          <AnimatePresence>
            {(isFilterOpen || windowWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search UPS..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center text-sm">
                        <input
                          type="radio"
                          name="category"
                          className="mr-2"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Price Range</h3>
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: Number(e.target.value) })
                      }
                      className="w-1/2"
                    />
                    <Input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: Number(e.target.value) })
                      }
                      className="w-1/2"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading products...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {allProducts.length} UPS
                  </p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="border rounded-md p-1 text-sm"
                    >
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>

                {filteredProducts.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                  >
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product._id} product={product} index={index} />
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search or filters
                    </p>
                    <Button onClick={handleClearFilters}>Clear All Filters</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
