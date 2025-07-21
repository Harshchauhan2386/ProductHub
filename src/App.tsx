import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductFilters } from './components/ProductFilters';
import { ProductGrid } from './components/ProductGrid';
import { AddProductModal } from './components/AddProductModal';
import { Product, NewProduct, SortField, SortOrder } from './types';
import { productService } from './services/productService';

function App() {
  // State management for products and UI
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Derived state
  const categories = productService.getCategories(products);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await productService.fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let result = productService.filterProducts(products, searchQuery, selectedCategory);
    result = productService.sortProducts(result, sortField, sortOrder);
    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortField, sortOrder]);

  // Handle adding new product (simulated)
  const handleAddProduct = (newProductData: NewProduct) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now(), // Simple ID generation for demo
      description: newProductData.description || '',
      discountPercentage: 0,
      rating: 0,
      brand: newProductData.brand || '',
      images: [newProductData.thumbnail],
    };

    setProducts(prev => [newProduct, ...prev]);
    setShowAddModal(false);
  };

  // Handle sorting changes
  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddProduct={() => setShowAddModal(true)}
        totalProducts={products.length}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters Section */}
        <div className="mb-8">
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Products' : 
                   `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing {filteredProducts.length} of {products.length} products
                  {searchQuery && (
                    <span className="ml-2">
                      for "<span className="font-medium">{searchQuery}</span>"
                    </span>
                  )}
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{categories.length}</div>
                  <div>Categories</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                  </div>
                  <div>Total Value</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} loading={loading} />
      </main>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProduct}
        categories={categories}
      />
    </div>
  );
}

export default App;