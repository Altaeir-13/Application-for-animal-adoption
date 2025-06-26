/* Página de Login
    * Esta página permite que os usuários façam login no sistema.
    * Inclui campos para email e senha, com validação básica.
    * Utiliza o Supabase para autenticação.
    * Exibe mensagens de erro em caso de falha no login.
    * O estado de carregamento é gerenciado para desabilitar o botão durante o processo de login.
    * Após o login bem-sucedido, o usuário é redirecionado para a página inicial.
 */
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    // Estados para armazenar os valores dos campos de email e senha
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    const navigator = useNavigate();

    // Função chamada quando o formulário é enviado
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previne o recarregamento da página
        setError(''); // Limpa erros antigos

        // Validação simples
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            // Tenta fazer o login com email e senha
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (signInError) {
                throw signInError;
            }

            console.log('Login Bem-sucedido')
            navigator('/')

        } catch (error) {
            setError('Erro ao fazer login: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <p>Bem-vindo de volta ao Adote já!</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span>@exemplo.com</span>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="adopt-button" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entra'}</button>
                    <button type="button" className='link-button' disabled={loading}>Esqueci minha senha</button>
                    <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
                </form>
            </div>
        </div>
    );
}