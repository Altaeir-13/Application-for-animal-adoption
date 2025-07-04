// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import './Navbar.css';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Seus estados locais para perfil e admin
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Estados para controlar os menus
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Novo estado para o menu hambúrguer
  const profileMenuRef = useRef(null);

  // Seu useEffect para buscar o perfil (sem alterações)
  useEffect(() => {
    setProfile(null);
    setIsAdmin(false);

    async function fetchProfile() {
        if (!user) return;
        try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', user.id)
          .single();
        if (error) throw error;
        if (data) {
          setProfile(data);
          setIsAdmin(data.role === 'admin');
        }
        } catch (error) {
            console.error("Erro ao buscar perfil na Navbar:", error);
        } 
    }
    
    fetchProfile();
  }, [user]);

  // Seu useEffect para fechar o menu de perfil (sem alterações)
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuRef]);

  // Função para fechar todos os menus ao navegar
  const handleLinkClick = () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };
  
  const handleLogout = async () => {
    handleLinkClick(); // Fecha os menus
    await signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🐾 Adote Já</Link>

      {/* Botão Hambúrguer (só aparece em telemóveis - controlado via CSS) */}
      <button 
        className="hamburger-menu" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Abrir menu"
      >
        &#9776; {/* Caractere do ícone hambúrguer */}
      </button>

      {/* A classe 'open' é adicionada condicionalmente para mostrar o menu em telemóveis */}
      <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/ComoAjudar" onClick={handleLinkClick}>Como Ajudar</Link>

        {user ? (
          <div className="profile-menu-container" ref={profileMenuRef}>
            { !isMobileMenuOpen  && (    
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                className="profile-icon-button"
                aria-label="Abrir menu do perfil"
              />
            )}
            {isProfileOpen || isMobileMenuOpen  && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span>Olá, {profile?.full_name || user.email.split('@')[0]}!</span>
                  <small>{user.email}</small>
                </div>
                {isAdmin && (
                  <>
                    <Link to="/animal-cadastro" onClick={handleLinkClick} className="dropdown-item admin">Cadastrar Animal</Link>
                    <Link to="/Users" onClick={handleLinkClick} className="dropdown-item admin">Painel de Utilizadores</Link>
                    <Link to="/Pendencias" onClick={handleLinkClick} className="dropdown-item admin">Painel de Pendências</Link>
                  </>
                )}
                <Link to={`/UserAdocoes/${user.id}`} onClick={handleLinkClick} className="dropdown-item">Minhas Adoções</Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Terminar sessão
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" onClick={handleLinkClick}>Entrar</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
