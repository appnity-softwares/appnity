import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Robustly extract the data array from the backend response.
 * The backend uses a consistent Response wrapper: { success: boolean, message: string, data: any }
 * For paginated results, 'data' is a PaginatedResponse: { data: [...], total: number, ... }
 */
const unwrap = (res: any) => {
  if (!res || !res.data) {
    console.error('API Error: No response data', res);
    return [];
  }

  const envelope = res.data;
  
  // If the backend returned an error envelope
  if (envelope.success === false) {
    console.error('API Error:', envelope.error || envelope.message);
    return [];
  }

  const payload = envelope.data;

  // 1. Check if payload itself is the array (e.g. from response.Success(..., slice, ...))
  if (Array.isArray(payload)) {
    return payload;
  }

  // 2. Check if it's a paginated envelope (e.g. from response.Paginated(..., slice, ...))
  if (payload && typeof payload === 'object' && 'data' in payload) {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    // Handle case where data might be null in paginated response
    if (payload.data === null || payload.data === undefined) {
      return [];
    }
  }

  // 3. If payload is null/undefined
  if (payload === null || payload === undefined) {
    return [];
  }

  // 4. If payload is an object but not paginated, return as is (for single objects like 'me' or 'stats')
  return payload;
};

export const publicApi = {
  getTheme: () => api.get('/theme').then(unwrap),
  getNavigation: () => api.get('/navigation').then(unwrap),
  getPage: (slug: string) => api.get(`/pages/${slug}`).then(unwrap),
  getBlogs: (page = 1, pageSize = 10) => api.get(`/blogs?page=${page}&page_size=${pageSize}`).then(unwrap),
  getBlogBySlug: (slug: string) => api.get(`/blogs/${slug}`).then(unwrap),
  getPortfolios: (category = '', page = 1, pageSize = 10) => api.get(`/portfolios?category=${category}&page=${page}&page_size=${pageSize}`).then(unwrap),
  getPortfolioBySlug: (slug: string) => api.get(`/portfolios/${slug}`).then(unwrap),
  getFeaturedPortfolios: () => api.get('/portfolios/featured').then(unwrap),
  getTeam: () => api.get('/team').then(unwrap),
  getServices: () => api.get('/services').then(unwrap),
  getFAQs: () => api.get('/faqs').then(unwrap),
  getPricing: () => api.get('/pricing').then(unwrap),
  getTestimonials: () => api.get('/testimonials').then(unwrap),
  getValues: () => api.get('/values').then(unwrap),
  submitContact: (data: { name?: string; email: string; service?: string; message: string }) => api.post('/contact', data).then(res => res.data),
};

export const adminApi = {
  login: (credentials: any) => api.post('/admin/auth/login', credentials).then(unwrap),
  getMe: () => api.get('/admin/auth/me').then(unwrap),
  getDashboardStats: () => api.get('/admin/dashboard/stats').then(unwrap),
  
  // Contacts/Leads
  getContacts: () => api.get('/admin/contacts').then(unwrap),
  updateContactStatus: (id: string, status: string) => api.put(`/admin/contacts/${id}`, { status }).then(res => res.data),
  deleteContact: (id: string) => api.delete(`/admin/contacts/${id}`).then(res => res.data),

  // Portfolios
  getPortfolios: () => api.get('/admin/portfolios').then(unwrap),
  createPortfolio: (data: any) => api.post('/admin/portfolios', data).then(res => res.data),
  updatePortfolio: (id: string, data: any) => api.put(`/admin/portfolios/${id}`, data).then(res => res.data),
  deletePortfolio: (id: string) => api.delete(`/admin/portfolios/${id}`).then(res => res.data),

  // Team
  getTeam: () => api.get('/admin/team').then(unwrap),
  createTeamMember: (data: any) => api.post('/admin/team', data).then(res => res.data),
  updateTeamMember: (id: string, data: any) => api.put(`/admin/team/${id}`, data).then(res => res.data),
  deleteTeamMember: (id: string) => api.delete(`/admin/team/${id}`).then(res => res.data),

  // Services
  getServices: () => api.get('/admin/services').then(unwrap),
  createService: (data: any) => api.post('/admin/services', data).then(res => res.data),
  updateService: (id: string, data: any) => api.put(`/admin/services/${id}`, data).then(res => res.data),
  deleteService: (id: string) => api.delete(`/admin/services/${id}`).then(res => res.data),
};

export default api;
