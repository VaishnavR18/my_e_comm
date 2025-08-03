import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import { fetchProductById, fetchRelatedProducts } from '../api/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);

        if (!fetchedProduct.images?.length && fetchedProduct.imageUrls.length > 0) {
          fetchedProduct.images = [fetchedProduct.imageUrls];
        }

        setProduct(fetchedProduct);

        if (fetchedProduct?.category) {
          const related = await fetchRelatedProducts(
            fetchedProduct.category,
            fetchedProduct._id
          );
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({ ...product, quantity });
    }
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleImageNavigation = (direction) => {
    const imagesCount = product?.images?.length || 0;
    if (imagesCount === 0) return;

    if (direction === 'next') {
      setActiveImageIndex((prev) => (prev + 1) % imagesCount);
    } else {
      setActiveImageIndex((prev) => (prev - 1 + imagesCount) % imagesCount);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <Skeleton className="w-full h-[400px] rounded-xl" />
              <div className="flex gap-2 mt-4">
                {[1, 2, 3].map((_, index) => (
                  <Skeleton key={index} className="w-20 h-20 rounded-md" />
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <Skeleton className="w-3/4 h-10 mb-4" />
              <Skeleton className="w-1/4 h-6 mb-6" />
              <Skeleton className="w-1/3 h-8 mb-6" />
              <Skeleton className="w-full h-32 mb-6" />
              <Skeleton className="w-full h-12" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span onClick={() => navigate('/')} className="cursor-pointer hover:text-primary">
            Home
          </span>
          <span className="mx-2">/</span>
          <span onClick={() => navigate('/products')} className="cursor-pointer hover:text-primary">
            Products
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product Images */}
          <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative bg-gray-100 rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={activeImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="aspect-square relative">
                  <img
                    className="w-full h-full object-cover"
                    alt={`${product.name} - ${activeImageIndex + 1}`}
                    src={
                      product.images?.length > 0
                        ? product.images[activeImageIndex]
                        : product.imageUrl || '/fallback.jpg'
                    }
                  />
                </motion.div>
              </AnimatePresence>

              {product.images?.length > 1 && (
                <>
                  <button onClick={() => handleImageNavigation('prev')} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleImageNavigation('next')} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {product.images?.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((image, index) => (
                  <div key={index} onClick={() => setActiveImageIndex(index)} className={`cursor-pointer rounded-md overflow-hidden border-2 ${activeImageIndex === index ? 'border-primary' : 'border-transparent'}`}>
                    <img className="w-20 h-20 object-cover" alt={`${product.name} thumbnail ${index + 1}`} src={image || '/fallback.jpg'} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                {product.discount > 0 && (
                  <span className="text-gray-500 line-through mr-2">
                    ₹{(product.price / (1 - product.discount / 100)).toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                In Stock: {product.stock} available
              </Badge>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {product.features?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="px-3 py-1 border-r hover:bg-gray-100 disabled:opacity-50">-</button>
                <span className="px-4 py-1">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock} className="px-3 py-1 border-l hover:bg-gray-100 disabled:opacity-50">+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Truck className="h-5 w-5 text-primary mr-2" />
                  <div className="text-sm">
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-gray-500">On orders over ₹500</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <div className="text-sm">
                    <p className="font-medium">2 Year Warranty</p>
                    <p className="text-gray-500">Full coverage</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center">
                  <RotateCcw className="h-5 w-5 text-primary mr-2" />
                  <div className="text-sm">
                    <p className="font-medium">30 Day Returns</p>
                    <p className="text-gray-500">Hassle-free returns</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p._id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
