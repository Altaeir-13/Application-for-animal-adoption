import React, { useState } from 'react';
import { animaisIniciais } from '../../data/Animais.js'; 
import AnimalCard from '../AnimalCard/AnimalCard.jsx';

// Este componente é o "pai" que organiza e exibe a lista de cards.
export default function AnimalList() {
  // Usa o hook 'useState' para guardar a lista de animais no estado do componente.
  // Isso permite que a lista seja atualizada no futuro (ex: com filtros ou buscas).
  const [animais, setAnimais] = useState(animaisIniciais);

  return (
    <div className="animal-list">
      <h2>Conheça Nossos Amigos</h2>

      <div className="cards-grid">
        {/* Usa o método .map() para criar um componente <AnimalCard> para cada 
            animal existente no estado 'animais'.
        */}
        {animais.map(animal => (
          // - 'key' é uma prop especial e obrigatória que o React usa para otimizar a lista.
          // - '{...animal}' é o spread operator. Ele passa todas as propriedades do 
          //   objeto 'animal' (id, nome, raca, etc.) como props para o AnimalCard.
          <AnimalCard key={animal.id} {...animal} />
        ))}
      </div>
    </div>
  );
}