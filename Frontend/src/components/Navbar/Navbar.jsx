// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para o menu hambúrguer
  const profileMenuRef = useRef(null);

  // Efeito para fechar o menu de perfil ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuRef]);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    await signOut();
    navigate('/');
  };

  // Função para fechar todos os menus ao navegar
  const handleLinkClick = () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🐾 Adote Já</Link>

      {/* Botão Hambúrguer (só aparece em telemóveis - controlado via CSS) */}
      <button 
        className="hamburger-menu" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Abrir menu"
      >
        &#9776; {/* Este é o caractere do ícone hambúrguer */}
      </button>

      {/* A classe 'open' é adicionada condicionalmente para mostrar o menu em telemóveis */}
      <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={handleLinkClick}>Animais</Link>
        <Link to="/como-ajudar" onClick={handleLinkClick}>Como Ajudar</Link>

        {user ? (
          // Container do perfil para utilizadores logados
          <div className="profile-menu-container" ref={profileMenuRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="navbar-button"
            >
              Perfil
            </button>

            {isProfileOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span>Olá, {profile?.full_name || user.email.split('@')[0]}!</span>
                  <small>{user.email}</small>
                </div>
                {isAdmin && (
                  <Link to="/admin/users" onClick={handleLinkClick} className="dropdown-item admin">
                    Painel Admin
                  </Link>
                )}
                <Link to="/perfil/editar" onClick={handleLinkClick} className="dropdown-item">
                  Gerir Perfil
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Terminar sessão
                </button>
              </div>
            )}
          </div>
        ) : (
          // Botões para utilizadores não logados
          <div className="auth-buttons">
            <Link to="/login" onClick={handleLinkClick} className='navbar-button'>Entrar</Link>
            <Link to="/cadastro" onClick={handleLinkClick} className="navbar-button-primary">Cadastre-se</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
