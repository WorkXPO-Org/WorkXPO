import { Link } from "react-router-dom";

export default function ProjectCard({ id, title, category, image }) {
  return (
    <article id={id} className="project-card-container">
      <div className="relative h-24 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover"/>
        <span className="absolute top-3 left-3 bg-primary/90 text-xs px-2 py-1 rounded text-white font-bold">{category}</span>
      </div>

      <div className="px-4 flex flex-col grow">
        <h3 className="text-base font-bold leading-tight text-text-main mb-3 grow">{title}</h3>

        <Link to={`/projects/${id}`} className="text-sm text-blue-500 font-bold hover:underline pb-4">
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
