export default function ProjectCard({ title, category, image, description }) {
  return (
    <article className="project-card-container">
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={title}/>
        <span>{category}</span>
      </div>

      <div className="px-5 pb-5">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
