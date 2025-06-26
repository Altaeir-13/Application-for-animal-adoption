/*  Página de Gestão de Utilizadores 
    Permite aos administradores visualizar, pesquisar e modificar os utilizadores do sistema.
    Inclui funcionalidades para promover ou revogar privilégios de administrador.
    Utiliza o Supabase para autenticação e gestão de dados.
*/
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; // Importa o cliente Supabase
import { useAuth } from '../../contexts/AuthContext'; // Importa o contexto de autenticação
import api from '../../server/server' // Importa a API personalizada para requisições
import './Users.css';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { user: currentUser } = useAuth(); // Obtém o utilizador autenticado do contexto
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa

    async function getUsers() {
        try {
            setError(null); // Limpa erros antigos antes de buscar novos dados

            const { data, error: dbError } = await supabase
                .from('profiles')
                .select('*')
                .order('full_name', { ascending: true });// Busca todos os perfis de utilizadores            

            if (dbError) throw dbError; // Lança um erro se houver um problema com a consulta

            setUsers(data);

        } catch (err) {
            console.error("Erro ao buscar Utilizadores do Supabase:", err);
            setError("Não foi possível carregar os utilizadores. Verifique as suas políticas de RLS e a consola.");
        }
    }

    async function putUser(id, newRole) {
        await api.put(`/users/${id}`, { role: newRole });

        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, []);

    if (error) {
        return <p className="status-message error">{error}</p>;
    }

    // 2. Filtra a lista de utilizadores com base no 'searchTerm'
    const filteredUsers = users.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-container">
            <h1>Gestão de Utilizadores</h1>

            {/* O elemento JSX para a caixa de busca */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="users-list">
                {users.length > 0 ? (filteredUsers.map((user) => (
                    <div key={user.id} className="user-card">
                        <div className="user-info">
                            <p><strong>Nome:</strong> {user.full_name || 'Não definido'}</p>
                            <p><strong>Telefone:</strong> {user.Telephone || 'Não definido'}</p>
                            <p><strong>Função:</strong> <span className={`role-badge role-${user.role}`}>{user.role}</span></p>
                        </div>
                        {currentUser && user.id !== currentUser.id && (
                            user.role !== 'admin' ? (
                                <div className="user-actions">
                                    <button onClick={() => putUser(user.id, 'admin')} className="action-button">Promover a Admin</button>
                                </div>
                            ) : (
                                    <div className="user-actions">
                                        <button onClick={() => putUser(user.id, 'user')} className="action-button">Revogar Admin</button>
                                    </div>
                            )
                        )}
                    </div>
                ))
                ) : (
                    <p>Nenhum utilizador encontrado.</p>
                )}
            </div>
        </div>
    );
}
