import React, { useState } from 'react';
import { Star, Package, DollarSign } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    if (stock < 10) return { text: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-50' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
        )}

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-gray-900">
              {product.price.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Stock</p>
            <p className="text-sm font-semibold text-gray-700">{product.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};