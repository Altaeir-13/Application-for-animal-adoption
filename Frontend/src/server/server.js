// Conexão com o servidor Node.js usando Axios
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001", // URL do servidor Node.js
});

export default api;
