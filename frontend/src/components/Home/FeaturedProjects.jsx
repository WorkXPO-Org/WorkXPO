import ProjectCard from "../ProjectCard";
import { PROJECTS } from "../../data/projects-data";

export default function FeaturedProjects() {
  
  // takes only the first 4 projects in the projects-data
  const featured = PROJECTS.slice(0, 4);
  
  return (
    <section className="card-project ">
      <h2 className="mb-5">Projetos Destacados</h2>
      <div className="grid grid-cols-2 gap-4">
        {featured.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            category={project.category}
            image={project.image}
          />
        ))}
      </div>
    </section>
  );
}
