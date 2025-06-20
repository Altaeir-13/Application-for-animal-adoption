import React, { useState } from 'react';

// --- Dados Iniciais dos Animais ---
// Em uma aplicação real, estes dados viriam de uma API (backend).
const animaisIniciais = [
  {
    id: 1,
    nome: 'Bolinha',
    raca: 'Vira-lata Caramelo',
    imagem: 'https://placehold.co/400x400/E63946/F1FAEE?text=Bolinha',
    descricao: 'Um cãozinho muito enérgico e brincalhão. Adora correr e é um ótimo companheiro para caminhadas.'
  },
  {
    id: 2,
    nome: 'Frajola',
    raca: 'Siamês Misturado',
    imagem: 'https://placehold.co/400x400/457B9D/F1FAEE?text=Frajola',
    descricao: 'Um gato calmo e carinhoso que adora um bom sofá e um cafuné. Perfeito para quem busca um amigo tranquilo.'
  },
  {
    id: 3,
    nome: 'Rex',
    raca: 'Labrador Retriever',
    imagem: 'https://placehold.co/400x400/1D3557/F1FAEE?text=Rex',
    descricao: 'Um filhotão cheio de amor para dar. É muito inteligente, dócil e se dá bem com crianças e outros animais.'
  },
   {
    id: 4,
    nome: 'Luna',
    raca: 'Angorá',
    imagem: 'https://placehold.co/400x400/A8DADC/1D3557?text=Luna',
    descricao: 'Luna é uma gata conversadora e muito apegada aos donos. Gosta de seguir as pessoas pela casa e observar tudo.'
  }
];

// --- Componentes ---

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="navbar-brand">🐾 Adote Já</a>
        <ul className="navbar-nav">
          <li><a href="/" className="nav-link">Animais</a></li>
          <li><a href="/" className="nav-link">Como Ajudar</a></li>
          <li><a href="/" className="nav-link">Contato</a></li>
        </ul>
      </div>
    </nav>
  );
}

function AnimalCard({ nome, raca, imagem, descricao }) {
  // O CSS para o botão é .adopt-button, então aplicamos essa classe.
  return (
    <div className="animal-card">
      <img src={imagem} alt={`Foto de ${nome}`} className="animal-image" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/ccc/fff?text=Imagem+N%C3%A3o+Dispon%C3%ADvel'; }} />
      <div className="animal-info">
        <h3>{nome}</h3>
        <p><strong>Raça:</strong> {raca}</p>
        <p>{descricao}</p>
        <button className="adopt-button">Quero Adotar</button>
      </div>
    </div>
  );
}

function AnimalList() {
  const [animais, setAnimais] = useState(animaisIniciais);

  return (
    <div className="animal-list">
      <h2>Conheça Nossos Amigos</h2>
      <div className="cards-grid">
        {animais.map(animal => (
          // Usando o spread operator para passar todas as propriedades do animal
          <AnimalCard key={animal.id} {...animal} />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Adote Já. Todos os direitos reservados.</p>
        <p>Promovendo o amor e a adoção de animais em Paraibano, MA.</p>
      </div>
    </footer>
  );
}

// --- Componente Principal da Aplicação ---

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <div className="container">
          <h1>Adote um Amigo Fiel</h1>
          <p>Encontre seu novo companheiro e transforme uma vida para sempre.</p>
          <AnimalList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
