import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext.jsx'; // Importa o contexto de autenticação
// O AuthProvider é responsável por fornecer o estado de autenticação para toda a aplicação

import App from './App.jsx'; // O layout principal (com Navbar e Footer)
import HomePage from './pages/HomePage.jsx'; // Sua página Home
import LoginPage from './pages/LoginPage.jsx'; // Sua página de Login
import CadastroPage from './pages/CadastroUser.jsx'; // Sua página de Cadastro
import AnimalPage from './pages/Animal/AnimalPage.jsx'; // Sua página de detalhes do animal
import AnimalCadastroPage from './pages/CadastroAnimal.jsx'; // Sua página de cadastro de animal
import UsersPage from './pages/User/UsersPage.jsx';
import Pendencias from './pages/User/Pendencias.jsx'; // Sua página de pendências
import UserAdocoes from './pages/User/UserAdocoes.jsx'; // Sua página de Adocoes do 
import ComoAjudar from './pages/ComoAjudar.jsx'; // Sua página de Como Ajudar
import './index.css';

// O AuthProvider envolve o RouterProvider para que todas as rotas tenham acesso ao contexto de autenticação
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
      },
      {
        path: "animal-cadastro",
        element: <AnimalCadastroPage/>,
      },
      {
        path: "Users",
        element: <UsersPage/>
      },
      {
        path: "Pendencias",
        element: <Pendencias/>
      },
      {
        path: "UserAdocoes/:id",
        element: <UserAdocoes/>
      },
      {
        path: "ComoAjudar",
        element: <ComoAjudar/>
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* O AuthProvider envolve o RouterProvider para que todas as rotas tenham acesso ao contexto de autenticação */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
