import React, { useState, useEffect } from 'react';
import AnimalCard from '../AnimalCard/AnimalCard.jsx';
import { supabase } from '../../supabaseClient.js';

// Este componente é o "pai" que organiza e exibe a lista de cards.
export default function AnimalList() {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getAnimais() {
    try {
      setLoading(true); 
      setError(null);

      const { data, error: dbError } = await supabase
        .from('pets')
        .select('*')
        .eq('status', 'disponível'); 
      
      if (dbError) throw dbError;

      setAnimais(data)
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
      setError("Não foi possível carregar os animais. Tente novamente mais tarde.");
    } finally {
      setLoading (false)
    }
  }
 

  useEffect(() => {getAnimais();},[]);

  if (loading) return <p>Carregando nossos amigos</p>;

  if (error) return <p>{error}</p>

  return (
    <div className="animal-list">
      <h2>Conheça Nossos Amigos</h2>

      <div className="cards-grid">
        {animais.length > 0 ? (animais.map(animal => (<AnimalCard key={animal.id} {...animal} />))
        ) : (
        <p className="status-message">Nenhum animal disponível para adoção no momento.</p>
        )}
      </div>
    </div>
  );
}