import api from '../api';
import { ApiResponse, PaginatedResponse, Product } from '@/types/api';

export const productService = {
  async getAll(params?: { page?: number; limit?: number; categoryId?: string }) {
    const response = await api.get<PaginatedResponse<Product[]>>('/products', { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await api.post<ApiResponse<Product>>('/products', product);
    return response.data;
  },

  async update(id: string, product: Partial<Product>) {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete<ApiResponse<void>>(`/products/${id}`);
    return response.data;
  }
}; 