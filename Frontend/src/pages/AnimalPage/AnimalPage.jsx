// src/pages/AnimalPage/AnimalPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../../supabaseClient";
import './Animal.css';

export default function AnimalPage() {
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getAnimal() {
            try {
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
            }
        }
        if (id) {
            getAnimal();
        }
    }, [id]);

    if (!animal) { 
        return (
            <div className="loading-container">
                {error ? <p className="error-message">{error}</p> : <p>Carregando...</p>}
            </div>
        );
    }

   
    return (
        <div className="animal-detail-container">
            <img
                
                src={animal.imag_url} 
                alt={`Foto de ${animal.name}`}
                className="detail-image"
            />
            <div className="detail-info">
                <h1>{animal.name}</h1>
                <h2>{animal.species} | {animal.breed || 'SRD'}</h2>
                <p><strong>Idade:</strong> {animal.age} anos</p>
                <p className="detail-description">{animal.description}</p>
                <button className="adopt-button large" >Quero Adotar {animal.name}!</button>
            </div>
        </div>
    );
}
