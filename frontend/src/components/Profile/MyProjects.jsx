import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import ProjectCard from "../ProjectCard";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyProjects = () => {
    api
      .get("/projects/my-projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar seus projetos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta inovação?"))
      return;

    try {
      await api.delete(`/projects/${id}`);

      setProjects((prev) => prev.filter((p) => p.id !== id));
      alert("Projeto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      alert("Não foi possível excluir o projeto. Verifique sua conexão.");
    }
  };

  if (loading) {
    return (
      <p className="text-text-slate animate-pulse mt-4">
        Buscando suas inovações...
      </p>
    );
  }

  return (
    <section className="mt-10 pt-8 border-t border-dark/10 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-2xl text-dark">
          Meus Projetos Publicados
        </h2>

        {/* add project button */}
        <button
          onClick={() => navigate("/projects/submit")}
          className="bg-primary text-dark px-4 py-2 rounded-lg font-bold hover:bg-accent transition-colors flex items-center gap-2"
        >
          <span>+</span> Novo Projeto
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="relative group">
              <ProjectCard project={project} />

              {/* delete button */}
              <button
                onClick={() => handleDelete(project.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700"
                title="Excluir projeto"
              >
                <img
                  src="/trash-icon.svg"
                  alt="Ícone de lixeira"
                  className="w-5 h-5 brightness-0 invert"
                />
              </button>

              {/* edit button */}
              <div className="absolute top-2 right-12 flex gap-2">
                <button
                  onClick={() => navigate(`/projects/edit/${project.id}`)}
                  className="bg-accent text-dark p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-primary"
                  title="Editar projeto"
                >
                  <img src="/edit-icon.svg" 
                  alt="Ícone de lápis e papel para editar"
                  className="w-5 h-5 brightness-0 invert"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-secondary p-8 rounded-lg text-center border border-dashed border-dark/20">
          <p className="text-text-main mb-4">
            Você ainda não publicou nenhum projeto.
          </p>
          <button
            onClick={() => navigate("/submit")}
            className="text-primary font-bold hover:underline"
          >
            Que tal começar agora?
          </button>
        </div>
      )}
    </section>
  );
}
