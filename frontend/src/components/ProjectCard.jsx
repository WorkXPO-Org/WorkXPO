import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  
  
  // desctruct the JSON
  const { id, title, category, imageUrl } = project;

  // dinamic imageURL placeholder based on the category
  const categoryText = encodeURIComponent(category || "Projeto");
  const placeholderUrl = `https://placehold.co/600x400?text=Inovação+de+${categoryText}`;

  return (
    <article className="bg-secondary rounded-lg overflow-hidden border border-dark/10 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative h-35 w-full overflow-hidden border-b border-dark/5">
        <img 
          // if imageURL is null, we use the placeholder
          src={imageUrl ? imageUrl : placeholderUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          
          // if the url exists but it bugs, we throw an error
          onError={(e) => { 
            if (e.target.src !== placeholderUrl) {
              e.target.src = placeholderUrl; 
            }
          }}
        />
        <span className="absolute top-3 left-3 bg-primary text-dark text-[10px] uppercase tracking-wider px-2 py-1 rounded shadow-lg font-bold">
          {category}
        </span>
      </div>

      <div className="p-5 flex flex-col grow">
        <h3 className="text-lg font-bold leading-tight text-text-main mb-4 line-clamp-2 grow">
          {title}
        </h3>

        <Link 
          to={`/projects/${id}`} 
          className="inline-flex items-center text-sm text-primary font-bold hover:text-dark transition-colors"
        >
          Ver detalhes →
        </Link>
      </div>
    </article>
  );
}