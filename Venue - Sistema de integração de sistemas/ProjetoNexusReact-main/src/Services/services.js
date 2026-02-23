// src/services/api.js
import axios from "axios";

// Cria uma instância do Axios
const api = axios.create({
  baseURL: "https://localhost:7079/api"
});


export default api;
