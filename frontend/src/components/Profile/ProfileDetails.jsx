import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import Header from '../Header';

export default function ProfileDetails() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // this endpoint allow us to see the user info details
    api.get('/user/details')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error("Erro ao carregar perfil:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-text-main">Carregando perfil...</div>;

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <main className="max-w-4xl mx-auto p-10">
        <div className="bg-white rounded-lg shadow-md p-8 border border-dark/10">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-4xl font-semibold text-dark uppercase tracking-wider">
              Meu Perfil
            </h1>

            {/* button that sends us to the edit page */}
            <button 
              onClick={() => navigate('/profile/edit')}
              className="bg-primary text-text-main px-6 py-2 rounded font-sans font-bold hover:bg-accent transition-colors"
            >
              Editar Perfil
            </button>
          </div>

          <div className="space-y-6 font-sans">
            <div>
              <label className="text-text-slate text-sm font-bold block mb-1 uppercase">Nome Completo</label>
              <p className="text-xl text-text-main">{profile?.username || "Não informado"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-text-slate text-sm font-bold block mb-1 uppercase">Instituição</label>
                <p className="text-lg text-text-main">{profile?.institution || "Não informada"}</p>
              </div>
              <div>
                <label className="text-text-slate text-sm font-bold block mb-1 uppercase">Curso</label>
                <p className="text-lg text-text-main">{profile?.course || "Não informado"}</p>
              </div>
            </div>

            <div>
              <label className="text-text-slate text-sm font-bold block mb-1 uppercase">E-mail</label>
              <p className="text-lg text-text-main">{profile?.email}</p>
            </div>

            <div>
              <label className="text-text-slate text-sm font-bold block mb-1 uppercase">Biografia / Descrição</label>
              <p className="text-lg text-text-main leading-relaxed italic">
                "{profile?.description || "Estudante focado em inovação e aderência à ODS 9."}"
              </p>
            </div>

            {profile?.linkedinUrl && (
              <div>
                <label className="text-text-slate text-sm font-bold block mb-1 uppercase">LinkedIn</label>
                <a 
                  href={profile.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Ver perfil profissional
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}