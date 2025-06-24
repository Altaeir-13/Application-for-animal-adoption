import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import './Navbar.css';

export default function Navbar() {
  // Obtemos o utilizador básico e a função signOut do contexto.
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // 3. Criamos estados LOCAIS dentro da Navbar para guardar o perfil e a função de admin.
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Estados para controlar o menu dropdown.
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // 4. ESTA É A LÓGICA PRINCIPAL:
  //    Um useEffect que "escuta" por mudanças no 'user'.
  //    Quando o 'user' muda (alguém faz login), ele busca os dados do perfil.
  useEffect(() => {
    // Limpa o perfil antigo sempre que o utilizador muda.
    setProfile(null);
    setIsAdmin(false);

    async function fetchProfile() {
      if (!user) return; // Se não houver utilizador, não faz nada.

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, Telephone, role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          // Atualiza os estados locais com os dados do banco.
          setProfile(data);
          setIsAdmin(data.role === 'admin');
        }
      } catch (error) {
        console.error("Erro ao buscar perfil na Navbar:", error);
      }
    }

    fetchProfile();
  }, [user]); // A dependência [user] garante que isto roda sempre que o utilizador muda.

  // Efeito para fechar o menu (sem alterações).
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
        <Link to="/">Animais</Link>
        <Link to="/como-ajudar">Como Ajudar</Link>

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
                  {/* Agora usa o estado local 'profile' */}
                  <span>Olá, {profile?.full_name || user.email.split('@')[0]}!</span>
                  <small>{user.email}</small>
                </div>

                {/* Agora usa o estado local 'isAdmin' */}
                {isAdmin && (
                  <Link to="/admin/users" onClick={() => setIsProfileOpen(false)} className="dropdown-item admin">
                    Painel Admin
                  </Link>
                )}
                
                <Link to="/perfil/editar" onClick={() => setIsProfileOpen(false)} className="dropdown-item">
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
