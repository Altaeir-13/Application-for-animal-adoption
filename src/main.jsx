import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'; // O layout principal (com Navbar e Footer)
import HomePage from './pages/HomePage.jsx'; // Sua página Home
import LoginPage from './pages/LoginPage.jsx'; // Sua página de Login
import CadastroPage from './pages/CadastroPage.jsx'; // Sua página de Cadastro
import './index.css';

// Cria o roteador e defina a hierarquia de rotas
const router = createBrowserRouter([
  {
    path: "/", // Esta é a rota "pai"
    element: <App />, // Ela renderiza o layout principal <App />
    // As "children" são as páginas que serão renderizadas dentro do <Outlet /> do App
    children: [
      {
        index: true,
        element: <HomePage />, // Define a HomePage como a página padrão da rota pai ("/")
      },
      {
        path: "login", // Quando a URL for "/login"
        element: <LoginPage />, // Renderiza a LoginPage
      },
      {
        path: "cadastro",
        element: <CadastroPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);