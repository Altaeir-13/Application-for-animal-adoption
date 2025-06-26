/*  Cadastro de Animal
 *  Esta página permite que um administrador cadastre um novo animal para adoção.
  *  Inclui campos para nome, espécie, raça, idade, descrição e link da imagem.
  *  O formulário é validado e os dados são enviados para o servidor.
  *  Utiliza o React para gerenciar o estado e a navegação.
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../server/server.js';

export default function CadastroAnimal() {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Cachorro');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const animalData = {
      nome: name,
      age: Number(age),
      species: species,
      breed: breed,
      description: description,
      imagelink: imageUrl,
    };

    try {
      await api.post('/admin/pets', animalData);

      alert('Animal cadastrado com sucesso!');
      navigate('/'); 

    } catch (err) {
      console.error("Erro ao cadastrar animal:", err);
      const errorMessage = err.response?.data?.error || 'Falha ao cadastrar o animal.';
      setError(errorMessage);
    } finally {
      // Este bloco é executado sempre, quer o Plano A ou B tenha acontecido.
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h1>Cadastrar Novo Animal</h1>
        <p>Preencha os dados do novo animal para adoção.</p>
        
        <form onSubmit={handleSubmit}>
          
          {/* Campo Nome */}
          <div className="input-group">
            <input 
              type="text"
              placeholder="Nome do Animal" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          
          {/* Campo Espécie */}
          <div className="input-group">
            <select value={species} onChange={(e) => setSpecies(e.target.value)} required>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Campo Raça */}
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Raça (ex: SRD, Poodle)" 
              value={breed} 
              onChange={(e) => setBreed(e.target.value)} 
            />
          </div>

          {/* Campo Idade */}
          <div className="input-group">
            <input 
              type="number" 
              placeholder="Idade (anos)" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
            />
          </div>
          
          {/* Campo Link da Imagem */}
          <div className="input-group">
            <input 
              type="url" 
              placeholder="URL da imagem do animal" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
            />
          </div>

          {/* Campo Descrição */}
          <div className="input-group">
             <input
                type="text"
                placeholder="Descrição do animal (comportamento, história, etc.)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
             />
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="adopt-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Animal'}
          </button>
        </form>
      </div>
    </div>
  );
}
