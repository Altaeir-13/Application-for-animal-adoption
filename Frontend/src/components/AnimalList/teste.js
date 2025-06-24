// src/components/AnimalList/AnimalList.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; 
import AnimalCard from '../AnimalCard/AnimalCard.jsx';

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
        // CORRIGIDO: O valor do status deve ser exatamente igual ao do banco de dados
        .eq('status', 'disponível'); 
      
      // CORRIGIDO: Lança a variável de erro correta (dbError)
      if (dbError) {
        throw dbError;
      }

      setAnimais(data);

    } catch (err) {
      console.error("Erro ao buscar animais:", err);
      setError("Não foi possível carregar os animais. Tente novamente mais tarde.");
    } finally {
      // CORRIGIDO: setLoading(false) agora está em um bloco 'finally'
      // para garantir que seja executado em qualquer cenário (sucesso ou erro).
      setLoading(false); 
    }
  }

  useEffect(() => {
    getAnimais();
  }, []);

  // O seu código de renderização está ótimo!
  if (loading) {
    return <p className="status-message">Carregando nossos amigos...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  return (
    <div className="animal-list-container">
      <h2>Conheça Nossos Amigos</h2>
      <div className="grid-container">
        {animais.length > 0 ? (
          animais.map(animal => (
            <AnimalCard key={animal.id} {...animal} />
          ))
        ) : (
          <p className="status-message">Nenhum animal disponível para adoção no momento.</p>
        )}
      </div>
    </div>
  );
}
