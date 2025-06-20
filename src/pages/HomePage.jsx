import React from 'react';
import AnimalList from '../components/AnimalList/AnimalList.jsx';

// Este é o componente que representa a página inicial completa.
export default function HomePage() {
  return (
    <div className="container">
      <h1>Adote um Amigo Fiel</h1>
      <p>Encontre seu novo companheiro e transforme uma vida para sempre.</p>
      <AnimalList />
    </div>
  );
}