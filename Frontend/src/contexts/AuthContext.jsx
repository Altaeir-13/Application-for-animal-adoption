// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // EFEITO 1: Apenas escuta por mudanças na autenticação (login/logout)
  useEffect(() => {
    // O onAuthStateChange já nos dá a sessão inicial quando carrega
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      // O loading principal é gerido pelo segundo useEffect
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // EFEITO 2: Reage a mudanças no 'user' para buscar o perfil
  // Este useEffect só roda quando o 'user' muda (de null para um utilizador, ou vice-versa)
  useEffect(() => {
    // Se não há utilizador, limpamos tudo e paramos de carregar
    if (!user) {
      setProfile(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // Se há um utilizador, buscamos o seu perfil
    async function fetchProfile() {
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
        console.error("Erro ao buscar o perfil do utilizador:", error);
        setProfile(null);
        setIsAdmin(false);
      } finally {
        // Marcamos o carregamento como completo após a busca do perfil
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]); // A dependência [user] é a chave para esta lógica

  const value = {
    session,
    user,
    profile,
    isAdmin,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
