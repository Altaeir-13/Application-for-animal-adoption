// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient'; // A sua conexão Supabase

// 1. Criamos o Contexto
const AuthContext = createContext();

// 2. Criamos o Provedor do Contexto (o nosso componente "Central")
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // 3. Tentamos obter a sessão atual quando a aplicação carrega
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 4. O onAuthStateChange é o "escutador" mágico.
    //    Ele é acionado sempre que alguém faz login ou logout.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // 5. Limpamos o "escutador" quando o componente é desmontado
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // 6. O valor que o nosso provedor vai fornecer a todos os componentes filhos
  const value = {
    session,
    user,
    signOut: () => supabase.auth.signOut(),
  };

  // 7. Renderizamos os componentes filhos apenas quando o carregamento inicial terminar
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 8. Criamos um hook personalizado para usar o nosso contexto de forma fácil
export function useAuth() {
  return useContext(AuthContext);
}
