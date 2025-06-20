import React,  {useState} from 'react';

export default function LoginPage() {
    // Estados para armazenar os valores dos campos de email e senha
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Função chamada quando o formulário é enviado
    const handleSubmit = (event) => {
        event.preventDefault(); // Previne o recarregamento da página
    
        // Validação simples
        if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
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
            <button type="submit" className="button">Entrar</button>
            <button type="button" className='link-button'>Esqueci minha senha</button>
            <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
            </form>     
        </div>
        </div>
    );  
}