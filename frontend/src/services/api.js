const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
      ...options.headers,
    },
  });


  // Handle empty responses (like DELETE 204)
  if (response.status === 204) {
    return null;
  }

  
  return response.json();
};