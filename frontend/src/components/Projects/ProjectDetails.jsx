import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/axios";
import Header from "../Header";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((err) => console.error("Erro ao carregar detalhes:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center p-10 text-text-main">Carregando detalhes da inovação...</div>;
  if (!project) return <div className="text-center p-10 text-text-main">Projeto não encontrado.</div>;

  // placeholder url
  const categoryText = encodeURIComponent(project.category || "Projeto");
  const placeholderUrl = `https://placehold.co/1200x675/164e63/ecfeff?text=Inovação+de+${categoryText}`;

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="container mx-auto px-5 py-10 max-w-5xl">
        {/* project header */}
        <section className="mb-10 text-center">
          <span className="bg-primary text-dark px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <h1 className="text-5xl font-bold text-dark mt-4 mb-6 leading-tight">
            {project.title.toUpperCase()}
          </h1>
        </section>

        {/* project image */}
        <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-xl mb-12 border border-dark/5">
          <img 
            src={project.imageUrl ? project.imageUrl : placeholderUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => { if (e.target.src !== placeholderUrl) e.target.src = placeholderUrl; }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* project description and statuses */}
          <div className="md:col-span-2 space-y-10 font-sans">
            <div>
              <h2 className="text-2xl font-semibold text-dark mb-4 border-b border-primary/30 pb-2">Sobre o Projeto</h2>
              <p className="text-text-main leading-relaxed whitespace-pre-wrap text-lg">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-dark/5">
                <h3 className="text-sm font-bold text-text-slate uppercase mb-2">Status de Andamento</h3>
                <span className="text-dark font-semibold text-lg">{project.projectStatus}</span>
              </div>
              <div className="bg-white p-6 rounded-xl border border-dark/5">
                <h3 className="text-sm font-bold text-text-slate uppercase mb-2">Auxílio Necessário</h3>
                <span className="text-dark font-semibold text-lg">{project.helpStatus}</span>
              </div>
            </div>
          </div>

          {/* additional info */}
          <aside className="bg-dark text-text-light p-8 rounded-2xl shadow-lg h-fit space-y-6 font-sans">
            <h2 className="text-2xl mb-4 border-b border-primary/20 pb-2 text-primary">Informações Técnicas</h2>
            
            <div>
              <p className="text-xs text-primary font-bold uppercase tracking-tighter">Instituição Realizada</p>
              <p className="text-lg">{project.institution || "Não informada"}</p>
            </div>

            <div>
              <p className="text-xs text-primary font-bold uppercase tracking-tighter">Orientador / Mentor</p>
              <p className="text-lg">{project.advisor || "Sem orientador"}</p>
            </div>

            <div>
              <p className="text-xs text-primary font-bold uppercase tracking-tighter">Líder do Grupo</p>
              <p className="text-lg font-bold">{project.studentLeader?.username}</p>
            </div>

            <div>
              <p className="text-xs text-primary font-bold uppercase tracking-tighter">Grupo de Estudantes</p>
              <ul className="list-disc list-inside text-sm mt-1 opacity-90">
                {project.studentsGroup?.length > 0 ? (
                  project.studentsGroup.map(student => (
                    <li key={student.id}>{student.fullname}</li>
                  ))
                ) : (
                  <li className="list-none italic">Apenas o líder</li>
                )}
              </ul>
            </div>

            <div className="pt-4 space-y-3">
              {project.readmeUrl && (
                <a href={project.readmeUrl} target="_blank" rel="noreferrer" 
                   className="block w-full text-center bg-primary text-dark py-3 rounded-lg font-bold hover:bg-accent transition-colors">
                  Acessar Documentação (README)
                </a>
              )}
              
              <a href={`mailto:${project.contactLink}`} 
                 className="block w-full text-center border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary/10 transition-colors">
                Contatar para Auxílio
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}