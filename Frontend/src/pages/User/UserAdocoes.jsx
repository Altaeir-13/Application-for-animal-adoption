import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import api from '../../server/server'; 
import './Users.css'; 

export default function MyApplicationsPage() {
    const { user, loading: authLoading } = useAuth(); 
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // A função para buscar os dados usar o Supabase diretamente,
    async function getSolicitacoes() {
        if (!user) return;
        try {
            setError(null);
            const { data, error: dbError } = await supabase
                .from('adoption_applications')
                .select('id, status, application_date, pets(id, name, species, breed, imag_url)')
                .eq('user_id', user.id);

            if (dbError) throw dbError;
            
            setApplications(data || []);
        } catch (err) {
            console.error("Erro ao buscar as suas candidaturas:", err);
            setError("Não foi possível carregar as suas candidaturas.");
        }
    }

    useEffect(() => {
        if (authLoading) return;
        getSolicitacoes();
    }, [user, authLoading]);


    // --- FUNÇÃO DE REMOÇÃO ---
    async function deleteSolicitacao(id) {
        try {
           
            await api.delete(`/solicitacoes/${id}`);

            getSolicitacoes(); 

        } catch (err) {
            console.error("Erro ao remover candidatura:", err);
            // Mostra uma mensagem de erro mais detalhada vinda da API, se disponível
            const errorMessage = err.response?.data?.error || "Não foi possível remover a candidatura.";
            alert(errorMessage);
        }
    }


    if (authLoading) return <p className="status-message">A carregar...</p>;
    if (error) return <p className="status-message error">{error}</p>;

    return (
        <div className="admin-container"> 
            <h1>Minhas Candidaturas de Adoção</h1>
            <div className="users-list"> 
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <div key={app.id} className={`user-card status-border-${app.status}`}> 
                            <div className="user-info">
                                <h3>{app.pets?.name || 'Indisponivel'}</h3>
                                <p>{app.pets?.breed || 'Indisponviel'} | {app.pets?.species}</p>
                                <p>Situação: {app.status || 'Indisponivel'}</p>
                                <p>Candidatura enviada em: {new Date(app.application_date).toLocaleDateString()}</p>
                            </div>
                            <div className="user-actions">
                                <button onClick={() => navigate(`/animal/${app.pets.id}`)}>Ver Pet</button>
                                <button onClick={() =>  deleteSolicitacao(app.id)}>Remover</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="status-message">Você ainda não se candidatou para nenhuma adoção.</p>
                )}
            </div>
        </div>
    );
}
