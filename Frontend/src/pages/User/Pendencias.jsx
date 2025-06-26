/*  Pendentes.jsx
    Componente para listar e gerenciar candidaturas pendentes de adoção.
    Permite aprovar ou rejeitar candidaturas, além de buscar por nome do candidato ou animal.
*/
import React, { useState, useEffect } from 'react';
import api from '../../server/server'; 
import './Users.css'; // A usar o seu ficheiro CSS existente

export default function Pendentes() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Função para buscar as candidaturas pendentes da API
    async function getSolicitacoes() {
        try {
            setLoading(true);
            setError(null);
            // Chama a rota do backend que busca apenas as candidaturas pendentes
            const response = await api.get('/admin/solicitacoes');
            setApplications(response.data);
        } catch (err) {
            console.error("Erro ao buscar candidaturas:", err);
            setError("Não foi possível carregar as candidaturas pendentes.");
        } finally {
            setLoading(false);
        }
    }

    // Função para APROVAR ou REJEITAR uma candidatura
    async function putSolicitacoes(id, newStatus) {
        const action = newStatus === 'aprovada' ? 'aprovar' : 'rejeitar';

        try {
            // Chama a rota PUT correta para atualizar a candidatura
            await api.put(`/admin/solicitacao/${id}`, { status: newStatus });
            alert(`Candidatura ${newStatus} com sucesso!`);
            // Atualiza a lista para remover a candidatura que foi processada
            getSolicitacoes();
        } catch (err) {
            console.error(`Erro ao ${action} a candidatura:`, err);
            alert(`Falha ao ${action} a candidatura.`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSolicitacoes();
    }, []);

    //Filtra as candidaturas com base no termo de busca
    const filtro = applications.filter(app => {
        const candidateName = app.profiles?.full_name || '';
        const petName = app.pets?.name || '';
        return candidateName.toLowerCase().includes(searchTerm.toLowerCase()) || 
               petName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) return <p className="status-message">A carregar candidaturas pendentes...</p>;
    if (error) return <p className="status-message error">{error}</p>;

    return (
        <div className="admin-container">
            <h1>Candidaturas Pendentes</h1>
            
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Buscar por nome do candidato ou animal..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="users-list"> 
                {filtro.length > 0 ? (
                    filtro.map((app) => (
                        <div key={app.id} className="user-card"> 
                            <div className="user-info">
                                <p>
                                    <strong>Candidato:</strong> {app.profiles?.full_name || 'Utilizador desconhecido'}
                                </p>
                                <p>
                                    <strong>Animal:</strong> {app.pets?.name || 'Animal desconhecido'}
                                </p>
                                <p>
                                    <strong>Id Animal:</strong> {app.pets?.id || 'ID desconhecido'}
                                </p>
                                <p>
                                    <strong>Tel Usuário:</strong> {app.profiles?.Telephone || 'Telefone desconhecido'}
                                </p>
                                <p>
                                    <strong>Data:</strong> {new Date(app.application_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="user-actions">
                                <button onClick={() => putSolicitacoes(app.id, 'aprovada')} className="action-button approve">
                                    Aprovar
                                </button>
                                <button onClick={() => putSolicitacoes(app.id, 'rejeitada')} className="action-button reject">
                                    Rejeitar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="status-message">Não há candidaturas pendentes no momento.</p>
                )}
            </div>
        </div>
    );
}
