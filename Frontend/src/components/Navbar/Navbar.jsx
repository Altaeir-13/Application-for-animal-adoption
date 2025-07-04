import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import './Navbar.css';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfileLoading(false);
        return;
      }
      
      setProfileLoading(true);
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
      } finally {
        setProfileLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

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
    await signOut();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🐾 Adote Já</Link>
      
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/ComoAjudar">Como Ajudar</Link>

        {user ? (
          <div className="profile-menu-container" ref={profileMenuRef}>
            {/* BOTÃO DE PERFIL ALTERADO PARA ÍCONE */}
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="profile-icon-button"
              aria-label="Abrir menu do perfil"
            >
              {/* O ícone é renderizado via CSS */}
            </button>

            {isProfileOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span>Olá, {profile?.full_name || user.email.split('@')[0]}!</span>
                  <small>{user.email}</small>
                </div>

                {isAdmin && (
                  <>
                    <Link to="/animal-cadastro" className="dropdown-item admin">Cadastrar Animal</Link>
                    <Link to="/Users" className="dropdown-item admin">Painel de Utilizadores</Link>
                    <Link to="/Pendencias" className="dropdown-item admin">Painel de Pendências</Link>
                  </>
                )}
                
                <Link to={`/UserAdocoes/${user.id}`} className="dropdown-item">Minhas Adoções</Link>
                <Link to="/" className="dropdown-item">Gerir Perfil</Link> 
                
                <button onClick={handleLogout} className="dropdown-item logout">
                  Terminar sessão
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Entrar</Link>
          </div>
        )}
      </div>
    </nav>
  );
}