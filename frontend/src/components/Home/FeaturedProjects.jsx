import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard";
import api from "../../services/axios"; // Sua instância centralizada do Axios

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api.get("/projects")
      .then((response) => {
        // we take only the first four projects
        setProjects(response.data.slice(0, 4));
      })
      .catch((error) => {
        console.error("Erro ao carregar projetos destacados:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-dark">Carregando inovações...</p>;
  }

  return (
    <section className="card-project">
      <h2 className="mb-5">Projetos Recentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}