const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("cn_token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: getHeaders(),
    ...options,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

// Generic API
export const api = {
  get: (path) => request(path),

  post: (path, body) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (path, body) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (path) =>
    request(path, {
      method: "DELETE",
    }),
};

// Domain APIs
export const doctorsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/doctors${query ? `?${query}` : ""}`);
  },

  getById: (id) => api.get(`/doctors/${id}`),
};

export const pharmacyApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/pharmacies${query ? `?${query}` : ""}`);
  },

  getById: (id) => api.get(`/pharmacies/${id}`),

  updateMedicine: (id, body) => api.put(`/medicines/${id}`, body),

  addMedicine: (body) => api.post(`/medicines`, body),
};

export const prescriptionApi = {
  create: (body) => api.post(`/prescriptions`, body),

  getAll: () => api.get(`/prescriptions`),

  getById: (id) => api.get(`/prescriptions/${id}`),
};

export const authApi = {
  sendOtp: (phone, role) =>
    api.post(`/auth/send-otp`, { phone, role }),

  verifyOtp: (phone, otp, role) =>
    api.post(`/auth/verify-otp`, { phone, otp, role }),

  getProfile: () => api.get(`/auth/profile`),

  updateProfile: (body) =>
    api.put(`/auth/profile`, body),
};