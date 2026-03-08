import axios from "axios";

const api = axios.create({
  baseURL: "http://10.241.135.97:5000/api",
  withCredentials: true
});

export default api;