import React, { useState } from "react";
import { Link } from "react-router-dom";
import './ComoAjudar.css'; // Mantenha a importação do seu CSS

const ComoAjudar = () => {
    // Hook de estado para controlar a visibilidade dos contatos
    const [mostrarContatos, setMostrarContatos] = useState(false);

    // Dados dos desenvolvedores para serem exibidos
    const devs = [
        {
          name: 'Altair',
          github: 'https://github.com/Altaeir-13',
        },
        {
          name: 'Gabriel',
          github: 'https://github.com/Gabirel2004', // Coloque o link do segundo dev aqui
        },
    ];

    const handleMostrarContatos = () => {
        setMostrarContatos(true); // Altera o estado para exibir os contatos
    };

    return (
        <div className="como-ajudar-container">
            <h1>Como Ajudar</h1>
            <p>
                Existem várias formas de ajudar animais em situação de vulnerabilidade. Veja abaixo algumas maneiras de contribuir:
            </p>
            <ul>
                <li><strong>Adote:</strong> Dê um lar amoroso para um animal que precisa.</li>
                <li><strong>Apadrinhe:</strong> Ajude financeiramente um animal até que ele seja adotado.</li>
                <li><strong>Doe:</strong> Contribua com ração, medicamentos, cobertores ou recursos financeiros.</li>
                <li><strong>Seja voluntário:</strong> Ajude em eventos, feiras de adoção ou no cuidado dos animais.</li>
                <li><strong>Divulgue:</strong> Compartilhe informações sobre adoção e cuidados com animais.</li>
            </ul>

            {/* --- BOTÕES COM AS NOVAS FUNÇÕES --- */}
            <div className="como-ajudar-links">
                {/* 1. Este botão agora leva para a página inicial */}
                <Link to="/" className="btn-ajudar">Quero Adotar</Link>

                {/* 2. Este botão agora revela os contatos abaixo */}
                <button onClick={handleMostrarContatos} className="btn-ajudar btn-secundario">
                    Quero Doar ou Ser Voluntário
                </button>
            </div>

            {/* --- SEÇÃO DE CONTATO QUE APARECE AO CLICAR --- */}
            {mostrarContatos && (
                <div className="contatos-devs-wrapper">
                    <h2>Entre em Contato</h2>
                    <p>Para doações ou para ser voluntário, fale com os desenvolvedores do projeto:</p>
                    <div className="devs-container">
                        {devs.map((dev) => (
                            <div className="dev-card" key={dev.name}>
                                <h3>{dev.name}</h3>
                                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                                    Perfil no GitHub
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComoAjudar;