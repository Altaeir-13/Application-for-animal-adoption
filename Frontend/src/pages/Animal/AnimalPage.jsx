// src/pages/AnimalPage/AnimalPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "../../supabaseClient";
// 1. Importamos o hook 'useAuth' para saber quem está logado
import { useAuth } from '../../contexts/AuthContext';
import './Animal.css';

export default function AnimalPage() {
    const { id } = useParams();
    const { user } = useAuth(); // 2. Obtemos o utilizador logado do nosso contexto
    const navigate = useNavigate();
    
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efeito para buscar os detalhes do animal (sem alterações)
    useEffect(() => {
        async function getAnimal() {
            try {
                setLoading(true); 
                setError(null);
        
                const { data, error: dbError } = await supabase
                    .from('pets')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (dbError) throw dbError;
        
                setAnimal(data)
            } catch (error) {
                console.error(error);
                setError("Não foi possível encontrar este animal.");
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            getAnimal();
        }
    }, [id]);

    // Função para lidar com o clique no botão "Quero Adotar"
    const handleAdoptionClick = async () => {
        // Primeiro, verificamos se há um utilizador logado
        if (!user) {
            alert("Você precisa de fazer login para se candidatar a uma adoção.");
            navigate('/login'); // Redireciona para a página de login
            return;
        }

        if (!window.confirm(`Tem a certeza que quer candidatar-se para adotar o(a) ${animal.name}?`)) {
            return;
        }

        try {
            const { error: insertError } = await supabase
                .from('adoption_applications')
                .insert([
                    { 
                        pet_id: animal.id, 
                        user_id: user.id // Usamos o ID do utilizador logado
                    }
                ]);

            if (insertError) {
                // O Supabase pode dar um erro se o utilizador já se candidatou (devido à restrição UNIQUE)
                if (insertError.code === '23505') { // Código de violação de chave única
                    throw new Error("Você já se candidatou para este animal.");
                }
                throw insertError;
            }

            alert("Candidatura enviada com sucesso! Entraremos em contacto em breve.");
            navigate('/'); // Volta para a página inicial

        } catch (err) {
            console.error("Erro ao criar candidatura:", err);
            alert(`Erro: ${err.message}`);
        }
    };

    if (loading) return <p className="status-message">A carregar detalhes...</p>;
    if (error) return <p className="status-message error">{error}</p>;
    if (!animal) return <p className="status-message">Animal não encontrado.</p>;
    
    return (
        <div className="animal-detail-container">
            <img
                // Garanta que o nome da prop corresponde à sua coluna no banco de dados
                src={animal.imag_url} 
                alt={`Foto de ${animal.name}`}
                className="detail-image"
            />
            <div className="detail-info">
                <h1>{animal.name}</h1>
                <h2>{animal.species} | {animal.breed || 'SRD'}</h2>
                <p><strong>Idade:</strong> {animal.age} anos</p>
                <p className="detail-description">{animal.description}</p>
                {/* 4. O botão agora chama a nossa nova função */}
                <button onClick={handleAdoptionClick} className="adopt-button large">
                    Quero Adotar {animal.name}!
                </button>
            </div>
        </div>
    );
}
