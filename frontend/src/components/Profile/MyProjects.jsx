import { useState, useEffect } from 'react';
import api from '../../services/axios';
import ProjectCard from '../ProjectCard';

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get the projects posted by the user
    api.get('/projects/my-projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar seus projetos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-text-slate animate-pulse mt-4">Buscando suas inovações...</p>;
  }

  return (
    <section className="mt-10 pt-8 border-t border-dark/10 w-full">
      <h2 className="font-semibold text-2xl text-dark mb-6">Meus Projetos Publicados</h2>
      
      {/* if we have any projects, we execute the projectCard component, if not, we render another div  */}
      {projects.length > 0 ? 
      (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) 
      : 
      (
        <div className="bg-secondary p-8 rounded-lg text-center border border-dashed border-dark/20">
          <p className="text-text-main mb-4">Você ainda não publicou nenhum projeto.</p>
          <a href="/create-project" className="text-primary font-bold hover:underline">
            Que tal começar agora?
          </a>
        </div>
      )}
    </section>
  );
}