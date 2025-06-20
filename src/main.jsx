import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Importa os estilos globais

// Encontra o elemento 'root' no DOM, que está no arquivo index.html.
// Este é o ponto onde toda a nossa aplicação React será montada.
const rootElement = document.getElementById('root');

// Cria a raiz da aplicação React dentro do elemento 'root'.
// O modo StrictMode ajuda a identificar potenciais problemas na aplicação.
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

