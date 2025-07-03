import React from "react";
import { Link } from "react-router-dom";
import "./ComoAjudar.css";

const ComoAjudar = () => {
    return (
        <div className="como-ajudar-container">
            <h1>Como Ajudar</h1>
            <p>
                Existem várias formas de ajudar animais em situação de vulnerabilidade. Veja abaixo algumas maneiras de contribuir:
            </p>
            <ul>
                <li>
                    <strong>Adote:</strong> Dê um lar amoroso para um animal que precisa.
                </li>
                <li>
                    <strong>Apadrinhe:</strong> Ajude financeiramente um animal até que ele seja adotado.
                </li>
                <li>
                    <strong>Doe:</strong> Contribua com ração, medicamentos, cobertores ou recursos financeiros.
                </li>
                <li>
                    <strong>Seja voluntário:</strong> Ajude em eventos, feiras de adoção ou no cuidado dos animais.
                </li>
                <li>
                    <strong>Divulgue:</strong> Compartilhe informações sobre adoção e cuidados com animais em suas redes sociais.
                </li>
            </ul>
            <div className="como-ajudar-links">
                <Link to="/adotar" className="btn-ajudar">Quero Adotar</Link>
                <Link to="/contato" className="btn-ajudar">Quero Doar ou Ser Voluntário</Link>
            </div>
        </div>
    );
};

export default ComoAjudar;