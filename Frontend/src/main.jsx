// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// 1. Importe o seu AuthProvider do ficheiro de contexto
import { AuthProvider } from './contexts/AuthContext.jsx'; 

import App from './App.jsx'; // O layout principal (com Navbar e Footer)
import HomePage from './pages/HomePage.jsx'; // Sua página Home
import LoginPage from './pages/LoginPage.jsx'; // Sua página de Login
import CadastroPage from './pages/CadastroPage.jsx'; // Sua página de Cadastro
import AnimalPage from './pages/AnimalPage/AnimalPage.jsx'; // Sua página de detalhes do animal
import './index.css';

// A sua configuração de rotas permanece exatamente a mesma, está perfeita
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "cadastro",
        element: <CadastroPage />
      },
      {
        path: "animal/:id",
        element: <AnimalPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. AQUI ESTÁ A CORREÇÃO:
        Envolvemos o RouterProvider com o nosso AuthProvider.
        Agora, toda a aplicação tem acesso ao contexto de autenticação.
    */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
