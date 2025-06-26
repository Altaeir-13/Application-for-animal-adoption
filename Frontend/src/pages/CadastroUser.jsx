/*  CadastroPage.jsx
    Página de cadastro de usuários.
    Permite que novos usuários se registrem no sistema.
    Inclui campos para nome completo, email, senha, confirmação de senha e telefone.
    Utiliza o Supabase para autenticação e armazenamento de dados.
*/
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function CadastroPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (!fullName || !email || !password || !confirmPassword || !telephone) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!email.includes('@')) {
        setError('Digite um email válido');
        return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            telephone: telephone, // CORRIGIDO AQUI: para corresponder à coluna do banco de dados
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      alert('Cadastro realizado com sucesso!');
      navigate('/login');

    } catch (err) {
      console.error('Erro no cadastro:', err);
      // Mostra a mensagem de erro específica do Supabase, que é mais útil
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h1>Cadastre-se</h1>
        <p>Crie sua conta no Adote já!</p>
        <form onSubmit={handleSignUp}> {/* Corrigido nome da função */}
          {/* Campo de Nome Completo */}
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Nome Completo" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
          </div>
          
          {/* Campo de Email */}
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {/* Campo de Senha */}
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {/* Campo de Confirmar Senha */}
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Confirme sua Senha" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          
          {/* Campo de Telefone */}
          <div className="input-group">
            <input 
              type="tel" 
              placeholder="Telefone" 
              value={telephone} 
              onChange={(e) => setTelephone(e.target.value)} 
              required 
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="adopt-button" disabled={loading}>
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
