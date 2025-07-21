import axios from 'axios';
import { Product, ProductsResponse } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

export const productService = {
  // Fetch all products from the API
  async fetchProducts(): Promise<Product[]> {
    try {
      // First, get the total count of products
      const initialResponse = await axios.get<ProductsResponse>(`${API_BASE_URL}/products?limit=0`);
      const totalProducts = initialResponse.data.total;
      
      // Then fetch all products
      const response = await axios.get<ProductsResponse>(`${API_BASE_URL}/products?limit=${totalProducts}`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },

  // Get unique categories from products
  getCategories(products: Product[]): string[] {
    const categories = products.map(product => product.category);
    return Array.from(new Set(categories)).sort();
  },

  // Filter products based on search query and category
  filterProducts(
    products: Product[], 
    searchQuery: string, 
    selectedCategory: string
  ): Product[] {
    return products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  },

  // Sort products by specified field and order
  sortProducts(
    products: Product[], 
    sortField: string, 
    sortOrder: 'asc' | 'desc'
  ): Product[] {
    return [...products].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'stock':
          aValue = a.stock;
          bValue = b.stock;
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
};