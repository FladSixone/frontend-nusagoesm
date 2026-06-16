import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // e.g. http://localhost:8000
  withCredentials: true,       // Required: sends session cookies cross-origin
  withXSRFToken: true,         // Required: Axios auto-reads XSRF-TOKEN cookie and sends it as X-XSRF-TOKEN header
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
