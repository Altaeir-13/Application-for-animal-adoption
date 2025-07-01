/* Navbar.jsx
  Componente de Navegação do site, exibindo links para Home, Como Ajudar
  e Perfil do usuário. Permite acesso a funcionalidades administrativas se o usuário for um administrador.
  Exibe o nome do usuário e opções de gerenciamento de perfil. 
*/
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
  const profileMenuRef = useRef(null);

  useEffect(() => {
    setProfile(null);
    setIsAdmin(false);

    async function fetchProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, Telephone, role')
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
    await signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🐾 Adote Já</Link>
      
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/">Como Ajudar</Link> {/*Link to="/como-ajudar" ainda não implementado*/}

        {user ? (
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
                  <>
                    <Link to="/animal-cadastro" onClick={() => setIsProfileOpen(false)} className="dropdown-item admin">
                      Cadastrar Animal
                    </Link>
                    <Link to="/Users" onClick={() => setIsProfileOpen(false)} className="dropdown-item admin">
                      Painel de Utilizadores
                    </Link>
                    <Link to="/Pendencias" onClick={() => setIsProfileOpen(false)} className="dropdown-item admin">
                      Painel de Pendências
                    </Link>
                  </>
                )}
                
                <Link 
                  to={`/UserAdocoes/${user.id}`} onClick={() => setIsProfileOpen(false)} className="dropdown-item">
                  Minhas Adoções
                </Link>
                {/* O Link to = perfil ainda nao foi implemtado*/}
                <Link to="/" onClick={() => setIsProfileOpen(false)} className="dropdown-item">
                  Gerir Perfil
                </Link> 
                
                <button onClick={handleLogout} className="dropdown-item logout">
                  Terminar sessão
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-links">
            <Link to="/login">Entrar</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
