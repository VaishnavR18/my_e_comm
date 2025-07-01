
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/products'; 

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);



  const categories = [...new Set(allProducts.map((product) => product.category).filter(Boolean))];
  
  useEffect(() => {
  async function loadProducts() {
    try {
      setLoading(true);
      const data = await fetchProducts();
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


  useEffect(() => {
  let result = allProducts;

  if (searchQuery) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  if (selectedCategory) {
    result = result.filter((product) => product.category === selectedCategory);
  }

  result = result.filter(
    (product) => product.price >= priceRange.min && product.price <= priceRange.max
  );

  setFilteredProducts(result);
}, [searchQuery, selectedCategory, priceRange, allProducts]);


  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 300 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">
            Discover our curated collection of premium products
          </p>
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

          {/* Filters Sidebar */}
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
                      placeholder="Search products..."
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

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="mr-2 h-4 w-4 text-primary"
                        />
                        <label htmlFor={category} className="text-sm text-gray-600">
                          {category}
                        </label>
                      </div>
                    ))}
                    {selectedCategory && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCategory('')}
                        className="text-xs text-gray-500 p-0 h-auto"
                      >
                        Clear selection
                      </Button>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Price Range</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      ${priceRange.min} - ${priceRange.max}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      min="0"
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: Number(e.target.value) })
                      }
                      className="w-1/2"
                    />
                    <Input
                      type="number"
                      min={priceRange.min}
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: Number(e.target.value) })
                      }
                      className="w-1/2"
                    />
                  </div>
                </div>

                {/* Applied Filters */}
                {(searchQuery || selectedCategory || priceRange.min > 0 || priceRange.max < 300) && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Applied Filters</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Search: {searchQuery}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => setSearchQuery('')}
                          />
                        </Badge>
                      )}
                      {selectedCategory && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Category: {selectedCategory}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => setSelectedCategory('')}
                          />
                        </Badge>
                      )}
                      {(priceRange.min > 0 || priceRange.max < 300) && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Price: ${priceRange.min} - ${priceRange.max}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => setPriceRange({ min: 0, max: 300 })}
                          />
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
           {/* Products Grid & States */}
          <div className="lg:w-3/4">
            {/* Loading */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading products...</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {/* Products */}
            {!loading && !error && (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {allProducts.length} products
                  </p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <select className="border rounded-md p-1 text-sm">
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
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product._id} product={product} index={index} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button onClick={handleClearFilters}>Clear All Filters</Button>
                  </motion.div>
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
