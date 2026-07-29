import axios from "axios";

// Set VITE_API_URL in a .env file when deploying (e.g. your Vercel backend URL).
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL: `${baseURL}/api` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Uploaded media (images/videos) is served from the backend's /uploads route,
// not the frontend, so any mediaUrl coming back from the API (e.g. "/uploads/xyz.png")
// needs to be prefixed with the backend's origin to actually load.
export function getMediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${baseURL}${path}`;
}

export default api;