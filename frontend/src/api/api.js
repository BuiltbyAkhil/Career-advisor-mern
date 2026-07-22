const API_BASE_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('signin')) {
        window.location.href = '/signin';
      }
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, message: 'Network error occurred' };
  }
}

const api = {
  get(endpoint) {
    return request(endpoint);
  },
  post(endpoint, body) {
    return request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  },
  put(endpoint, body) {
    return request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  },
  delete(endpoint) {
    return request(endpoint, { method: 'DELETE' });
  },
};

export default api;