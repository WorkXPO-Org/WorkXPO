import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import Header from "../Header";
import MyProjects from "./MyProjects";

export default function ProfileDetails() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // this endpoint allow us to see the user info details
    api
      .get("/user/details")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar perfil:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  // function to delete the user account
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir sua conta permanentemente? Essa ação é permanente e excluirá todos os seus dados e projetos.",
      )
    )
      return;

    try {
      await api.delete("/user");

      localStorage.removeItem("supabase_token");
      alert("Sua conta e seus projetos foram deletados com sucesso.");
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir a conta: ", error);
      alert("Não foi possível excluir sua conta. Verifique sua conexão");
    }
  };

  if (loading)
    return <div className="p-10 text-text-main">Carregando perfil...</div>;

  return (
    <div className="min-h-screen ">
      <Header />

      <main className="max-w-4xl mx-auto p-10">
        <div className="bg-white rounded-lg shadow-md p-8 border border-dark/10">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-4xl font-semibold text-dark uppercase tracking-wider">
              Meu Perfil
            </h1>

            
            <div className="flex gap-4">
              {/* button that sends us to the edit page */}
              <button
                onClick={() => navigate("/profile/edit")}
                className="bg-primary text-text-main px-6 py-2 rounded font-sans font-bold hover:bg-accent transition-colors"
              >
                Editar Perfil
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-6 py-2 rounded font-sans font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                {/* delete button */}
                <img
                  src="/trash-icon.svg"
                  alt="Ícone de lixeira"
                  className="w-5 h-5 brightness-0 invert"
                />
                Excluir Conta
              </button>
            </div>
          </div>

          <div className="space-y-6 font-sans">
            <div>
              <label className="text-text-slate text-sm font-bold block mb-1 uppercase">
                Nome Completo
              </label>
              <p className="text-xl text-text-main">
                {profile?.username || "Não informado"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-text-slate text-sm font-bold block mb-1 uppercase">
                  Instituição
                </label>
                <p className="text-lg text-text-main uppercase">
                  {profile?.institution || "Não informada"}
                </p>
              </div>
              <div>
                <label className="text-text-slate text-sm font-bold block mb-1 uppercase">
                  Curso
                </label>
                <p className="text-lg text-text-main capitalize">
                  {profile?.course || "Não informado"}
                </p>
              </div>
            </div>

            <div>
              <label className="text-text-slate text-sm font-bold block mb-1 uppercase">
                E-mail
              </label>
              <p className="text-lg text-text-main">{profile?.email}</p>
            </div>

            <div>
              <label className="text-text-slate text-sm font-bold block mb-1 uppercase">
                Biografia / Descrição
              </label>
              <p className="text-lg text-text-main leading-relaxed italic">
                "{profile?.description || "Estudante focado em inovação."}"
              </p>
            </div>

            {profile?.linkedinUrl && (
              <div>
                <label className="text-text-slate text-sm font-bold block mb-1 uppercase">
                  LinkedIn
                </label>
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

        {/* this component shows the projects made by the user */}
        <MyProjects />
      </main>
    </div>
  );
}