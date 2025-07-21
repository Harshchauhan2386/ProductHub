export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface NewProduct {
  title: string;
  price: number;
  category: string;
  stock: number;
  thumbnail: string;
  description?: string;
  brand?: string;
}

export type SortField = 'title' | 'price' | 'stock' | 'category';
export type SortOrder = 'asc' | 'desc';