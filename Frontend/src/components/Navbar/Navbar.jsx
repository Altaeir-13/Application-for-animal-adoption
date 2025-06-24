import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        {/* 2. Usamos <Link> em vez de <a> e 'to' em vez de 'href' */}
        <Link to="/" className="navbar-brand">🐾 Adote Já</Link>

        <ul className="navbar-nav">
          <li><Link to="/" className="nav-link">Animais</Link></li>
          <li><Link to="/como-ajudar" className="nav-link">Como Ajudar</Link></li>
          <li><Link to="/login" className="nav-link">Entrar</Link></li>
          <li><Link to="/cadastro" className="nav-link">Cadastre-se</Link></li>
        </ul>
      </div>
    </nav>
  );
}