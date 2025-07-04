
import axios from 'axios';

// 1. O URL do seu backend na Render foi atualizado.
const API_URL = 'https://application-for-animal-adoption.onrender.com/api';

// 2. Cria a instância do Axios com o novo URL base.
const api = axios.create({
  baseURL: API_URL,
});

export default api;

// 3. Configura o Axios para enviar o token de autenticação em cada requisição, se disponível.