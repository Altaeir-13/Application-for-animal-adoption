import React, { useState } from "react";

export default function CadastroPage() {
    // Seus estados continuam os mesmos
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [telefone, setTelefone] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nome || !email || !password || !confirmPassword || !telefone) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        console.log('Cadastro realizado com sucesso:', { nome, email, telefone, password });
        setError('');
    };
    
    return (
        // A classe 'login-container' e 'login-box' podem ser reutilizadas para o estilo principal
        <div className="cadastro-container">
            <div className="cadastro-box">
                <h1>Cadastre-se</h1>
                <p>Crie sua conta no Adote já!</p>
                <form onSubmit={handleSubmit}>
                    
                    {/* Campo de Nome Completo */}
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Nome Completo" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
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
                        <span>@exemplo.com</span>
                    </div>

                    {/* 1. AQUI ESTÁ A MUDANÇA: Criamos uma div "pai" para os campos de senha */}
                    <div className="form-row">
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
                    </div>
                    
                    {/* Campo de Telefone */}
                    <div className="input-group">
                        <input 
                            type="tel" 
                            placeholder="Telefone" 
                            value={telefone} 
                            onChange={(e) => setTelefone(e.target.value)} 
                            required 
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    {/* Pequena correção: a classe do botão deve ser "login-button" para usar o mesmo estilo */}
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
